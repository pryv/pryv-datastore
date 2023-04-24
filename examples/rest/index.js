/**
 * @license
 * Copyright (C) 2021–2023 Pryv S.A. https://pryv.com - All Rights Reserved
 * This program is free software; you can redistribute it and/or modify it
 * under the terms of the 3-Clause BSD License
 * SPDX-License-Identifier: BSD-3-Clause
 */
const Readable = require('stream').Readable;

const ds = require('../../src'); // datastore
const superagent = require('superagent');

/**
 * Pass-through store that forwards all calls to an API
 * expected settings
 * @property {settings} Object
 * @property {settings.baseUrl} string - an url with {userId} to be replaced
 * @property {settings.baseHeaders} [Object] - an object representing headers to be sent
 */
module.exports = ds.createDataStore({

  async init () {
    this.streams = createRestUserStreams(this);
    this.events = createRestUserEvents(this);
    try {
      if (!this.settings.baseURL) throw new Error('Null settings.baseURL parameter');
      if (this.settings.baseURL.indexOf('{userId}') < 0) throw new Error('Missing {userId} in settings.baseURL parameter');
      // eslint-disable-next-line no-new
      new URL(this.settings.baseURL); // will throw error if Invalid URL
    } catch (err) {
      throw ds.errors.invalidRequestStructure('Missing or invalid baseUrl setting', this.settings.baseUrl, err);
    }
    return this;
  },

  url (userId) {
    return this.settings.baseUrl.replace('{userId}', userId);
  },

  headers (userId) {
    return this.settings.baseHeaders || {};
  },

  async deleteUser (userId) { // eslint-disable-line no-unused-vars
    try {
      await superagent.delete(this.url(userId)).set(this.headers(userId));
    } catch (err) {

    }
  },

  async getUserStorageSize (userId) { // eslint-disable-line no-unused-vars
    return 0;
  }
});

// ----- streams implementation --//

function createRestUserStreams (rs) {
  return ds.createUserStreams({
    async get (userId, params) {
      const streams = await superagent
        .get(rs.url(userId) + '/streams')
        .set(rs.headers)
        .set('accept', 'json')
        .query(params);
      ds.defaults.applyOnStreams(streams);
      return streams;
    },

    async create (userId, streamData) {
      const result = await superagent
        .post(rs.url(userId) + '/streams')
        .set(rs.headers)
        .set('accept', 'json')
        .send(streamData);
      return result;
    },

    async update (userId, streamData) {
      const updateData = Object.assign({}, streamData);
      delete updateData.id;
      const result = await superagent
        .put(rs.url(userId) + '/streams/' + encodeURIComponent(streamData.id))
        .set(rs.headers)
        .set('accept', 'json')
        .send(updateData);
      return result;
    },

    async updateDelete (userId, streamId) {
      const result = await superagent
        .delete(rs.url(userId) + '/streams/' + encodeURIComponent(streamId))
        .set(rs.headers)
        .set('accept', 'json')
        .send({ deleted: Date.now() / 1000 });
      return result;
    },

    async deleteAll (userId) {
      const result = await superagent
        .delete(rs.url(userId) + '/streams')
        .set(rs.headers)
        .set('accept', 'json');
      return result;
    },

    async getDeletions (userId, deletionsSince) {
      const deletions = await superagent
        .get(rs.url(userId) + '/streamsDeletions')
        .set(rs.headers)
        .set('accept', 'json')
        .query({ deletionsSince });
      return deletions;
    },

    async createDeleted (userId, streamData) {
      const result = await superagent
        .post(rs.url(userId) + '/streamsDeletions')
        .set(rs.headers)
        .set('accept', 'json')
        .send(streamData);
      return result;
    },

    async delete (userId, streamId) {
      const result = await superagent
        .delete(rs.url(userId) + '/streamsDeletions/' + encodeURIComponent(streamId))
        .set(rs.headers)
        .set('accept', 'json');
      return result;
    }
  });
}

function createRestUserEvents (rs) {
  return ds.createUserEvents({
    async get (userId, params) {
      const events = await superagent.get(rs.url(userId))
        .set(rs.headers(userId) + '/events')
        .set('accept', 'json')
        .query(params);
      ds.defaults.applyOnEvents(events);
      return events;
    },

    async getStreamed (userId, params) {
      const readable = new Readable({ objectMode: true, highWaterMark: 4000 });
      superagent.get(rs.url(userId) + '/eventsStreamed')
        .set(rs.headers(userId))
        .set('accept', 'json')
        .query(params)
        .buffer(false)
        .parse(myParser((event) => { readable.push(event); }));
      return readable;
    },

    async getOne (userId, eventId) {
      const event = await superagent.get(rs.url(userId) + '/events/' + eventId)
        .set(rs.headers(userId))
        .set('accept', 'json');
      ds.defaults.applyOnEvents([event]);
      return event;
    },

    async create (userId, eventData) {
      const event = await superagent.post(rs.url(userId) + '/events')
        .set(rs.headers(userId))
        .set('accept', 'json')
        .send(eventData);
      ds.defaults.applyOnEvents([event]);
      return event;
    },

    // async saveAttachedFiles (userId, partialEventData, attachmentsItems) { throw errors.unsupportedOperation('events.saveAttachedFiles'); },
    // async getAttachedFile (userId, eventData, fileId) { throw errors.unsupportedOperation('events.getAttachedFile'); },
    // async deleteAttachedFile (userId, eventData, fileId) { throw errors.unsupportedOperation('events.deleteAttachedFile'); },

    async update (userId, eventData) {
      const event = await superagent.put(rs.url(userId) + '/events')
        .set(rs.headers(userId))
        .set('accept', 'json')
        .send(eventData);
      ds.defaults.applyOnEvents([event]);
      return event;
    },
    async delete (userId, eventId, params) {
      const event = await superagent.delete(rs.url(userId) + '/events/' + eventId)
        .set(rs.headers(userId))
        .set('accept', 'json')
        .query(params);
      ds.defaults.applyOnEvents([event]);
      return event;
    }
  });
}

/**
 * Expects a result with one event per line
 */
function myParser (foreachEvent) {
  return function (res, fn) {
    let buffer = ''; // temp data

    res.setEncoding('utf8'); // Already UTF8 in browsers
    res.on('data', chunk => {
      buffer += chunk;
      let n = 0;
      while ((n = buffer.indexOf('\n')) > 0) {
        const eventStr = buffer.substring(0, n);
        buffer = buffer.substring(n + 1);
        foreachEvent(JSON.stringify(eventStr));
      }
    });
    res.on('end', () => {
      const err = null;
      foreachEvent(null);
      fn(err, {});
    });
  };
}
