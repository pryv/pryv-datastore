/**
 * @license
 * Copyright (C) 2021–2023 Pryv S.A. https://pryv.com - All Rights Reserved
 * This program is free software; you can redistribute it and/or modify it
 * under the terms of the 3-Clause BSD License
 * SPDX-License-Identifier: BSD-3-Clause
 */
const Transform = require('stream').Transform;

const ds = require('../../src'); // datastore
const superagent = require('superagent');

/**
 * Pass-through store that forwards all calls to an API
 * expected settings
 * @property {settings} Object
 * @property {settings.baseURL} string - an url with {userId} to be replaced
 * @property {settings.baseHeaders} [Object] - an object representing headers to be sent
 */
module.exports = ds.createDataStore({

  async init (params) {
    this.settings = params.settings;
    this.streams = createRestUserStreams(this);
    this.events = createRestUserEvents(this);

    try {
      if (!this.settings.baseURL) throw new Error('Null settings.baseURL parameter');
      if (this.settings.baseURL.indexOf('{userId}') < 0) throw new Error('Missing {userId} in settings.baseURL parameter');
      // eslint-disable-next-line no-new
      new URL(this.url('dummyuser')); // will throw error if Invalid URL
    } catch (err) {
      throw ds.errors.invalidRequestStructure('Missing or invalid baseURL setting: ' + this.settings.baseURL + ' >' + err.message);
    }
    return this;
  },

  url (userId) {
    return this.settings.baseURL.replace('{userId}', userId);
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
  },

  /**
   * Wrapper for superagent
   * POST content to server
   * @param {string} userId
   * @param {string} path
   * @param {Object} content
   * @return {Object} - result
   */
  async post (userId, path, content) {
    try {
      const res = await superagent
        .post(this.url(userId) + path)
        .set(this.headers(userId))
        .set('accept', 'json')
        .send(content);
      return res.body;
    } catch (e) {
      $$(e);
      throw(e);
    }
  }
});

// ----- streams implementation --//

function createRestUserStreams (rs) {
  return ds.createUserStreams({
    async getOne (userId, query, options) {
      const stream = await rs.post(userId, '/streamGET', { query, options });
      ds.defaults.applyOnStream(stream);
      return stream;
    },

    async get (userId, query, options) {
      const streams = await rs.post(userId, '/streamsGET', { query, options });
      ds.defaults.applyOnStreams(streams);
      return streams;
    },

    async create (userId, streamData) {
      const stream = await rs.post(userId, '/streams', streamData);
      ds.defaults.applyOnStream(stream);
      return stream;
    },

    async update (userId, streamData) {
      const updateData = Object.assign({}, streamData);
      delete updateData.id;
      const result = await superagent
        .put(rs.url(userId) + '/streams/' + encodeURIComponent(streamData.id))
        .set(rs.headers(userId))
        .set('accept', 'json')
        .send(updateData);
      return result.body;
    },

    async updateDelete (userId, streamId) {
      const result = await superagent
        .delete(rs.url(userId) + '/streams/' + encodeURIComponent(streamId))
        .set(rs.headers(userId))
        .set('accept', 'json')
        .send({ deleted: Date.now() / 1000 });
      return result.body;
    },

    async deleteAll (userId) {
      const result = await superagent
        .delete(rs.url(userId) + '/streams')
        .set(rs.headers(userId))
        .set('accept', 'json');
      return result.body;
    },

    async getDeletions (userId, deletionsSince) {
      const deletions = await superagent
        .get(rs.url(userId) + '/streamsDeletions')
        .set(rs.headers(userId))
        .set('accept', 'json')
        .query({ deletionsSince });
      return deletions.body;
    },

    async createDeleted (userId, streamData) {
      const result = await superagent
        .post(rs.url(userId) + '/streamsDeletions')
        .set(rs.headers(userId))
        .set('accept', 'json')
        .send(streamData);
      return result.body;
    },

    async delete (userId, streamId) {
      const result = await superagent
        .delete(rs.url(userId) + '/streamsDeletions/' + encodeURIComponent(streamId))
        .set(rs.headers(userId))
        .set('accept', 'json');
      return result.body;
    }
  });
}

function createRestUserEvents (rs) {
  return ds.createUserEvents({
    async get (userId, query, options) {
      const events = await rs.post(userId, '/eventsGET', { query, options });
      ds.defaults.applyOnEvents(events);
      return events;
    },

    async getStreamed (userId, query, options) {
      const streamEvent = new StreamEvents();
      superagent.post(rs.url(userId) + '/eventsGETStreamed')
        .set(rs.headers(userId))
        .set('accept', 'json')
        .send({ query, options })
        .pipe(streamEvent);
      return streamEvent;
    },

    async getDeletionsStreamed (userId, query, options) {
      const streamEvent = new StreamEvents();
      superagent.post(rs.url(userId) + '/eventsGETDeletionsStreamed')
        .set(rs.headers(userId))
        .set('accept', 'json')
        .send({ query, options })
        .pipe(streamEvent);
      return streamEvent;
    },

    async getHistory (userId, eventId) {
      const res = await superagent.get(rs.url(userId) + '/events/' + eventId + '/history')
        .set(rs.headers(userId))
        .set('accept', 'json');
      const events = res.body;
      ds.defaults.applyOnEvents(events);
      return events;
    },

    async getOne (userId, eventId) {
      const res = await superagent.get(rs.url(userId) + '/events/' + eventId)
        .set(rs.headers(userId))
        .set('accept', 'json');
      const event = res.body;
      ds.defaults.applyOnEvent(event);
      return event;
    },

    async create (userId, eventData) {
      const event = await rs.post(userId, '/events', eventData);
      ds.defaults.applyOnEvents([event]);
      return event;
    },

    // async saveAttachedFiles (userId, partialEventData, attachmentsItems) { throw errors.unsupportedOperation('events.saveAttachedFiles'); },
    // async getAttachedFile (userId, eventData, fileId) { throw errors.unsupportedOperation('events.getAttachedFile'); },
    // async deleteAttachedFile (userId, eventData, fileId) { throw errors.unsupportedOperation('events.deleteAttachedFile'); },

    async update (userId, eventData) {
      const res = await superagent.put(rs.url(userId) + '/events')
        .set(rs.headers(userId))
        .set('accept', 'json')
        .send(eventData);
      const event = res.body;
      ds.defaults.applyOnEvents([event]);
      return event;
    },
    async delete (userId, originalEvent) {
      const eventDeletion = await rs.post(userId, '/eventsDELETE/' + originalEvent.id, originalEvent);
      ds.defaults.applyOnEvent(eventDeletion);
      return eventDeletion;
    },

    // not to be implemented
    async removeAllNonAccountEventsForUser (userId) {
      await superagent.get(rs.url(userId) + '/removeAllNonAccountEventsForUser/')
        .set(rs.headers(userId));
    }
  });
}

class StreamEvents extends Transform {
  buffer;
  count;
  constructor () {
    super({ readableObjectMode: true });
    this.buffer = '';
    this.count = 0;
  }

  /**
   * @returns {void}
   */
  _transform (data, encoding, callback) {
    this.buffer += data.toString('utf-8');
    let n = 0;
    while ((n = this.buffer.indexOf('\n')) > 0) {
      const eventStr = this.buffer.substring(0, n);
      this.buffer = this.buffer.substring(n + 1);
      const event = JSON.parse(eventStr);
      ds.defaults.applyOnEvent(event);
      this.push(event);
      this.count++;
    }
    callback();
  }
}