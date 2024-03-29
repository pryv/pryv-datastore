/**
 * @license
 * Copyright (C) 2021–2023 Pryv S.A. https://pryv.com - All Rights Reserved
 * This program is free software; you can redistribute it and/or modify it
 * under the terms of the 3-Clause BSD License
 * SPDX-License-Identifier: BSD-3-Clause
 */
const { PassThrough, Transform, Readable } = require('stream');

const ds = require('../../src'); // datastore
const superagent = require('superagent');
const ErrorsIds = require('../../src/ErrorIds');
const inspect = require('util').inspect;

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
    await this.delete(userId, '');
  },

  async getUserStorageSize (userId) { // eslint-disable-line no-unused-vars
    const result = await this.get(userId, '/storageSize');
    return result || 0;
  },

  // handle error here
  apiError (e) {
    if ((e instanceof Error) && e.response?.body) {
      const body = e.response?.body;
      const dsError = errorFromJSON(body);
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
      this.debugLog('POST', { userId, path, content, body: res.body });
      return res.body;
    } catch (e) {
      this.debugLog('POST ERROR', { userId, path, content, e });
      this.apiError(e);
    }
  },

  postAndPipe (userId, path, content, writeableStream) {
    superagent.post(this.url(userId) + path).set(this.headers(userId)).send(content).pipe(writeableStream);
  },

  async postDataStream (userId, path, keyValue, readableStream) {
    this.debugLog('postDataStream START', { userId, path, keyValue });
    return new Promise((resolve, reject) => {
      const request = superagent.post(this.url(userId) + path).set(this.headers(userId)).query(keyValue);
      readableStream.pipe(request);
      request.on('error', (e) => {
        this.debugLog('postDataStream ERROR', { e });
        reject(e);
      });
      request.on('end', () => {
        try {
          // @ts-ignore
          const result = JSON.parse(request.res?.text);
          this.debugLog('postDataStream RESULT', { result });
          resolve(result);
        } catch (e) {
          this.debugLog('postDataStream ERROR', { e });
          reject(e);
        }
      });
    });
  },

  async get (userId, path, query = {}) {
    try {
      const res = await superagent.get(this.url(userId) + path).set(this.headers(userId)).query(query);
      this.debugLog('GET', { userId, path, query, body: res.body });
      return res.body;
    } catch (e) {
      this.debugLog('GET ERROR', { userId, path, query, e });
      this.apiError(e);
    }
  },

  getAndPipe (userId, path, query, writeableStream) {
    superagent.get(this.url(userId) + path).set(this.headers(userId)).query(query).pipe(writeableStream);
  },

  async put (userId, path, content) {
    try {
      const res = await superagent.put(this.url(userId) + path).set(this.headers(userId)).send(content);
      this.debugLog('PUT', { userId, path, content, body: res.body });
      return res.body;
    } catch (e) {
      this.debugLog('PUT ERROR', { userId, path, content, e });
      this.apiError(e);
    }
  },

  async delete (userId, path, query) {
    try {
      const res = await superagent.delete(this.url(userId) + path).set(this.headers(userId)).query(query);
      this.debugLog('DELETE', { userId, path, query, body: res.body });
      return res.body;
    } catch (e) {
      this.debugLog('DELETE ERROR', { userId, path, query, e });
      this.apiError(e);
    }
  },

  debugLog (message, info) {
    if (!this.settings.debug) return;
    const content = message + ': ' + inspect(info, false, 10, true);
    console.log('[REST DATASTORE] ' + content);
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

    async getDeletions (userId, query) {
      const deletions = await rs.get(userId, '/streamsDeletions', query);
      return deletions;
    },

    async createDeleted (userId, streamData) {
      const result = await rs.post(userId, '/streamsDeletions', streamData);
      return result;
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
      if (rs.settings.mockEventGetStreaming) {
        rs.debugLog('EVENT GET STREAM MOCK');
        const events = await this.get(userId, query, options);
        const readable = Readable.from(events);
        return readable;
      }
      const streamedEvents = new JSONStreamedItems(rs.debugLog.bind(rs));
      rs.debugLog('EVENT GET STREAM START', { userId, query, options });
      rs.postAndPipe(userId, '/eventsGETStreamed', { query, options }, streamedEvents);
      return streamedEvents;
    },

    async getDeletionsStreamed (userId, query, options) {
      const streamedEvents = new JSONStreamedItems(rs.debugLog.bind(rs));
      rs.debugLog('EVENTDELETION GET STREAM START', { userId, query, options });
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
     * @param {AttachmentItem} attachmentItem
     * @param {Transaction} transaction
     * @returns {Promise<any[]>}
     */
    async addAttachment (userId, eventId, attachmentItem, transaction) {
      const keyValue = {
        fileName: attachmentItem.fileName,
        type: attachmentItem.type,
        size: attachmentItem.size,
        integrity: attachmentItem.integrity
      };
      const newEvent = await rs.postDataStream(userId, '/events/' + eventId + '/attachment', keyValue, attachmentItem.attachmentData);
      return newEvent;
    },

    /**
     * @param {string} userId
     * @param {string} fileId
     * @returns {Promise<any>}
     */
    async getAttachment (userId, eventId, fileId) {
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
    async deleteAttachment (userId, eventId, fileId, transaction) {
      return await rs.delete(userId, '/events/' + eventId + '/attachments/' + fileId);
    },

    async update (userId, eventData) {
      const event = await rs.put(userId, '/events', eventData);
      ds.defaults.applyOnEvent(event);
      // $$({userId, eventData, event});
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
  debugLog;
  constructor (debugLog) {
    super({ readableObjectMode: true });
    this.debugLog = debugLog || function () {};
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
      this.debugLog('STREAMING EVENT', { event });
      ds.defaults.applyOnEvent(event);
      this.push(event);
      this.count++;
    }
    callback();
  }
}

// error utils

/**
 * @param {string} jsonString
 * @returns {PryvDataStoreError}
 */
function errorFromJSON (jsonString) {
  let holder = null;
  try {
    holder = JSON.parse(jsonString);
  } catch (e) {}

  // if parsing JSON fails or has no id keeps mess
  if (holder == null || holder.id === null) {
    holder = {
      id: ErrorsIds.UnexpectedError,
      message: jsonString,
      data: null,
      innerError: null
    };
  }
  switch (holder.id) {
    case ErrorsIds.InvalidRequestStructure:
      return ds.errors.invalidRequestStructure(holder.message, holder.data, holder.innerError);
    case ErrorsIds.UnknownResource:
      return ds.errors.unknownResource(holder.data.ressourceType, holder.data.id, holder.innerError);
    case ErrorsIds.ItemAlreadyExists:
      return ds.errors.itemAlreadyExists(holder.data.ressourceType, holder.data.conflictingKeys, holder.innerError);
    case ErrorsIds.InvalidItemId:
      return ds.errors.invalidItemId(holder.message, holder.data, holder.innerError);
    case ErrorsIds.UnsupportedOperation:
      return ds.errors.unsupportedOperation(holder.message, holder.data, holder.innerError);
  }

  return ds.errors.unexpectedError(holder.message, holder.data, holder.innerError);
}
