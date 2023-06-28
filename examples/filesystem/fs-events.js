/**
 * @license
 * Copyright (C) 2021–2023 Pryv S.A. https://pryv.com - All Rights Reserved
 * This program is free software; you can redistribute it and/or modify it
 * under the terms of the 3-Clause BSD License
 * SPDX-License-Identifier: BSD-3-Clause
 */
const fs = require('fs-extra');
const path = require('path');

const mrmime = require('mrmime');

const ds = require('../../src'); // datastore

const { isChildOf, idForSubPath, subPathForId } = require('./pathUtils');
const streamsInspectorForStreamQuery = require('../utils/streamsInspectorForStreamQuery');
const {
  insertEventInOrderedArray,
  eventMatchesParamFilter,
  stripArrayResultFromParams
} = require('../utils/eventResultsUtils');

module.exports = function createFSUserEvents (fsds) {
  return ds.createUserEvents({
    async get (userId, params) {
      // get initial list streams inspect with excluded ids
      // NOTES
      // - "AND" can be handled only if on of the stream is a substream of the other
      const streamPathQuery = params.streams.map(streamPathQueryForStreamQuery);
      const streamInspector = streamsInspectorForStreamQuery(streamPathQuery, isChildOf);

      // holds all events.
      const events = [];
      const eventsCollectedForStreamPath = {}; // keep track of streams on which we already collected events

      for (const entryStream of streamInspector.entries) {
        await inspect(entryStream.rootStream, entryStream);
      }

      async function inspect (dirSubPath, entryStream) {
        const dirFullPath = fsds.fullPathForSub(userId, dirSubPath);
        const dir = await fs.promises.opendir(dirFullPath);
        const collectEvents = !eventsCollectedForStreamPath[dirSubPath];
        eventsCollectedForStreamPath[dirSubPath] = true;
        const streamId = idForSubPath(dirSubPath);
        for await (const dirent of dir) {
          if (dirent.isDirectory()) {
            const potentialStreamSubPath = path.join(dirSubPath, dirent.name);
            // if this streamPath matches the entryStream, inspect it
            if (entryStream.allows(potentialStreamSubPath)) await inspect(potentialStreamSubPath, entryStream);
          } else {
            if (collectEvents) {
              const event = await fileToEvent(userId, dirSubPath, dirent.name, streamId);
              addEvent(event);
            }
          }
        }
      }

      return stripArrayResultFromParams(events, params);

      /**
       * Add event in an ordered way
       * @param {Event} event
       */
      function addEvent (event) {
        if (!eventMatchesParamFilter(event, params)) return;
        // warning trashed not yet handled
        insertEventInOrderedArray(events, event, params.sortAscending);
        return true;
      }
    },

    async getStreamed (userId, params) {

    },

    async getOne (userId, eventId) {
    },

    async create (userId, eventData) {

    },

    // async addAttachment (userId, eventId, attachmentItem) { throw errors.unsupportedOperation('events.addAttachment'); },
    // async getAttachment (userId, eventId, fileId) { throw errors.unsupportedOperation('events.getAttachment'); },
    // async deleteAttachment (userId, eventId, fileId) { throw errors.unsupportedOperation('events.deleteAttachment'); },

    async update (userId, eventData) {

    },
    async delete (userId, eventId, params) {

    }
  });

  /**
   * Convert a file to an event
   */
  async function fileToEvent (userId, parentSubPath, fileName, streamId = null) {
    streamId = streamId || idForSubPath(streamId);
    const fileSubPath = path.join(parentSubPath, fileName);
    const fileFullPath = fsds.fullPathForSub(userId, fileSubPath);
    const stats = await fs.promises.stat(fileFullPath);
    const eventId = idForSubPath(fileSubPath);
    return {
      id: eventId,
      streamIds: [streamId],
      created: stats.birthtimeMs / 1000,
      modified: stats.ctimeMs / 1000,
      time: stats.ctimeMs / 1000,
      type: 'file/attached',
      content: null,
      attachments: [{
        id: 'a:' + eventId, // theis only one attachment per file
        fileName,
        type: mrmime.lookup(fileName),
        size: stats.size
      }],
      clientData: {
        path: fileSubPath
      }
    };
  }
};

/**
 * convert a streamQuery with Ids to streamQuery with subPath
 */
function streamPathQueryForStreamQuery (streamQuery) {
  const streamPathQuery = {};
  for (const key of Object.keys(streamQuery)) {
    if (key === 'and') {
      streamPathQuery.and = streamPathQueryForStreamQuery(streamQuery.and);
    } else { // any || not
      streamPathQuery[key] = streamQuery[key].map(subPathForId);
    }
  }
  return streamPathQuery;
}
