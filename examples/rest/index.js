/**
 * @license
 * Copyright (C) 2021–2023 Pryv S.A. https://pryv.com - All Rights Reserved
 * This program is free software; you can redistribute it and/or modify it
 * under the terms of the 3-Clause BSD License
 * SPDX-License-Identifier: BSD-3-Clause
 */
const { PassThrough, Transform } = require('stream');

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
      throw ds.errors.invalidRequestStructure('Missing or invalid baseURL setting: ' + this.settings.baseURL + ' >' + err.message, this.settings, err);
    }
    return this;
  },

  url (userId) {
    return this.settings.baseURL.replace('{userId}', userId);
  },

  headers (userId) {
    const headers = Object.assign({ accept: 'json' }, this.settings.baseHeaders || {});
    return headers;
  },

  async deleteUser (userId) {
    try {
      await superagent.delete(this.url(userId)).set(this.headers(userId));
    } catch (err) {
      // should we do something here ?
    }
  },

  async getUserStorageSize (userId) { // eslint-disable-line no-unused-vars
    return 0;
  },

  // handle error here
  apiError (e) {
    if ((e instanceof Error) && e.response?.body) {
      const body = e.response?.body;
      const dsError = ds.errors.fromJSON(body);
      throw dsError;
    }

    throw e;
  },

  /**
   * Wrapper for superagent
   * POST content to server
   * @param {string} userId
   * @param {string} path
   * @param {Object} content
   * @return {Promise<any>} - result
   */
  async post (userId, path, content) {
    try {
      const res = await superagent.post(this.url(userId) + path).set(this.headers(userId)).send(content);
      return res.body;
    } catch (e) { this.apiError(e); }
  },

  postAndPipe (userId, path, content, writeableStream) {
    superagent.post(this.url(userId) + path).set(this.headers(userId)).send(content).pipe(writeableStream);
  },

  async postDataStream (userId, path, readableStream) {
    return new Promise((resolve, reject) => {
      const request = superagent.post(this.url(userId) + path).set(this.headers(userId));
      readableStream.pipe(request);
      request.on('error', (e) => { reject(e); });
      request.on('end', () => {
        try {
          // @ts-ignore
          const result = JSON.parse(request.res?.text);
          resolve(result);
        } catch (e) {
          reject(e);
        }
      });
    });
  },

  async get (userId, path, query = {}) {
    try {
      const res = await superagent.get(this.url(userId) + path).set(this.headers(userId)).query(query);
      return res.body;
    } catch (e) { this.apiError(e); }
  },

  getAndPipe (userId, path, query, writeableStream) {
    superagent.get(this.url(userId) + path).set(this.headers(userId)).query(query).pipe(writeableStream);
  },

  async put (userId, path, content) {
    try {
      const res = await superagent.put(this.url(userId) + path).set(this.headers(userId)).send(content);
      return res.body;
    } catch (e) { this.apiError(e); }
  },

  async delete (userId, path, query) {
    try {
      const res = await superagent.delete(this.url(userId) + path).set(this.headers(userId)).query(query);
      return res.body;
    } catch (e) { this.apiError(e); }
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
      const stream = await rs.put(userId, '/streams/' + encodeURIComponent(streamData.id), updateData);
      return stream;
    },

    async deleteAll (userId) {
      const result = await rs.delete(userId, '/streams');
      return result;
    },

    async getDeletions (userId, deletionsSince) {
      const deletions = await rs.get(userId, '/streamsDeletions', { deletionsSince });
      return deletions;
    },

    async createDeleted (userId, streamData) {
      const result = await rs.post(userId, '/streamsDeletions', streamData);
      return result.body;
    },

    async delete (userId, streamId) {
      const result = await rs.delete(userId, '/streamsDeletions/' + encodeURIComponent(streamId));
      return result;
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
      const streamedEvents = new JSONStreamedItems();
      rs.postAndPipe(userId, '/eventsGETStreamed', { query, options }, streamedEvents);
      return streamedEvents;
    },

    async getDeletionsStreamed (userId, query, options) {
      const streamedEvents = new JSONStreamedItems();
      rs.postAndPipe(userId, '/eventsGETDeletionsStreamed', { query, options }, streamedEvents);
      return streamedEvents;
    },

    async getHistory (userId, eventId) {
      const events = await rs.get(userId, '/events/' + eventId + '/history');
      ds.defaults.applyOnEvents(events);
      return events;
    },

    async getOne (userId, eventId) {
      const event = await rs.get(userId, '/events/' + eventId);
      ds.defaults.applyOnEvent(event);
      return event;
    },

    async create (userId, eventData) {
      const event = await rs.post(userId, '/events', eventData);
      ds.defaults.applyOnEvents([event]);
      return event;
    },

    /**
     * @param {string} userId
     * @param {Array<AttachmentItem>} attachmentsItems
     * @param {Transaction} transaction
     * @returns {Promise<any[]>}
     */
    async saveAttachedFiles (userId, eventId, attachmentsItems, transaction) {
      const attachmentsResponse = [];
      for (const attachment of attachmentsItems) {
        const fileId = await rs.postDataStream(userId, '/events/' + eventId + '/attachment', attachment.attachmentData);
        attachmentsResponse.push({ id: fileId });
      }
      return attachmentsResponse;
    },

    /**
     * @param {string} userId
     * @param {string} fileId
     * @returns {Promise<any>}
     */
    async getAttachedFile (userId, eventId, fileId) {
      const readableStream = new PassThrough();
      rs.getAndPipe(userId, '/events/' + eventId + '/attachments/' + fileId, {}, readableStream);
      return readableStream;
    },

    /**
     * @param {string} userId
     * @param {string} fileId
     * @param {Transaction} transaction
     * @returns {Promise<any>}
     */
    async deleteAttachedFile (userId, eventId, fileId, transaction) {
      return await rs.delete(userId, '/events/' + eventId + '/attachments/' + fileId);
    },

    async update (userId, eventData) {
      const event = await rs.put(userId, '/events', eventData);
      ds.defaults.applyOnEvent(event);
      return event;
    },
    async delete (userId, originalEvent) {
      const eventDeletion = await rs.post(userId, '/eventsDELETE/' + originalEvent.id, originalEvent);
      ds.defaults.applyOnEvent(eventDeletion);
      return eventDeletion;
    },

    // not to be implemented
    async removeAllNonAccountEventsForUser (userId) {
      return await rs.get(userId, '/removeAllNonAccountEventsForUser/');
    }
  });
}

class JSONStreamedItems extends Transform {
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
