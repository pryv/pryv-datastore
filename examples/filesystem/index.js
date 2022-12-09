const fs = require('fs-extra');
const ds = require('../../src'); // datastore
const path = require('path');
const zlib = require('zlib');
const mrmime = require('mrmime');

const streamsInspectorForStreamQuery = require('../../src/utils/streamsInspectorForStreamQuery');

/**
 * Map a filesystem and exposes to Pryv
 * expected settings
 * @property {settings} Object
 * @property {settings.basePath} string - the path to map
 */
module.exports = ds.createDataStore({

  async init () {
    this.streams = createFSUserStreams(this);
    this.events = createFSUserEvents(this);
    try {
      if (!this.settings.basePath) throw new Error('Null settings.basePath parameter');
      if (!fs.existsSync(this.settings.basePath)) throw new Error('Non existant path settings.basePath: ' + this.settings.basePath);
    } catch (err) {
      throw ds.errors.invalidRequestStructure('Missing or invalid baseUrl setting', this.settings.basePath, err);
    }
    return this;
  },

  /**
   * get the full path of this itemId
   * @param {string} userId
   * @param {string} itemName
   * @returns {FullPath}
   */
  fullPathForSub (userId, itemName) {
    itemName = itemName || '';
    return path.join(this.settings.basePath, userId, itemName);
  },

  async deleteUser (userId) { // eslint-disable-line no-unused-vars
    await fs.emptyDir(this.fullPathForSub(userId));
  },

  /**
   * @param {string} userId
   * @param {path} directory
   * @param {int} depth
   * @param {Function} inspector - called for each directory params (dir, depth)
   */
  async inspect (userId, directory, depth, inspector) {

  },

  subPathForFull (userId, fullPath) {
    return fullPath.substring(this.fullPathForSub(userId).length + 1);
  },

  /**
   * Generates a reversible id matching to the file path
   * @param {*} userId
   * @param {*} fullPath
   * @returns
   */
  idForFullPath (userId, fullPath) {
    // remove basePath
    const subPath = this.subPathForFull(userId, fullPath);
    return idForSubPath(subPath);
  },

  fullPathForId (userId, itemId) {
    const subPath = subPathForId(itemId);
    return this.fullPathForSub(userId, subPath);
  },

  async getUserStorageSize (userId) { // eslint-disable-line no-unused-vars
    return 0;
  },

  async dirToStream (userId, parentFullPath, dirFullPath, dirName) {
    const stats = await fs.promises.stat(dirFullPath);
    return {
      id: this.idForFullPath(userId, dirFullPath),
      parentId: this.idForFullPath(userId, parentFullPath),
      name: dirName,
      created: stats.birthtimeMs / 1000,
      modified: stats.ctimeMs / 1000,
      clientData: {
        path: this.subPathForFull(userId, dirFullPath)
      }
    };
  },

  async fileToEvent (userId, parentSubPath, fileName, streamId = null) {
    streamId = streamId || idForSubPath(streamId);
    const fileSubPath = path.join(parentSubPath, fileName);
    const fileFullPath = this.fullPathForSub(userId, fileSubPath);
    const stats = await fs.promises.stat(fileFullPath);
    const eventId = idForSubPath(fileSubPath);
    return {
      id: eventId,
      streamIds: [streamId],
      created: stats.birthtimeMs / 1000,
      modified: stats.ctimeMs / 1000,
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
});

// ----- streams implementation --//

function createFSUserStreams (fsds) {
  return ds.createUserStreams({
    async get (userId, params) {
      const parentFullPath = fsds.fullPathForSub(userId, params.id);
      const maxDepth = params.expandChildren || 0;
      const excludedIds = params.excludedIds || [];
      return await loop(parentFullPath, maxDepth);

      async function loop (dirPath, depth) {
        const streams = [];
        const dir = await fs.promises.opendir(dirPath);
        for await (const dirent of dir) {
          if (dirent.isDirectory()) {
            const subDirPath = path.join(dirPath, dirent.name);
            const stream = await fsds.dirToStream(userId, dirPath, subDirPath, dirent.name);

            // ignore excluded Ids;
            if (excludedIds.includes(stream.id)) continue;

            // add childrens (or not)
            if (depth !== 0) {
              stream.children = await loop(subDirPath, depth - 1);
            } else {
              stream.children = [];
              stream.hiddenChildren = true;
            }
            streams.push(stream);
          }
        }
        return streams;
      }
    },

    async create (userId, streamData) {
      if (streamData.id != null) {
        throw ds.errors.invalidItemId(`Stream.id is read only : [${streamData.id}]`, streamData);
      }
      if (streamData.clientData != null) {
        throw ds.errors.invalidRequestStructure(`Stream.clientData is read only : [${streamData.id}]`);
      }
      const parentFullPath = fsds.fullPathForId(userId, streamData.parentId);
      const parentSubPath = fsds.subPathForFull(userId, parentFullPath);
      if (!(await fs.pathExists(parentFullPath))) {
        throw ds.errors.invalidRequestStructure(`Parent directory with id: [${streamData.parentId}] and path: [${parentSubPath}] does not exists.`);
      }
      if (!(await (fs.promises.stat(parentFullPath))).isDirectory()) {
        throw ds.errors.invalidRequestStructure(`Parent directory with id: [${streamData.parentId}] and path: [${parentSubPath}] is already used by an event.`);
      }
      const dirFullPath = path.join(parentFullPath, streamData.name);
      if ((await fs.pathExists(dirFullPath))) {
        throw ds.errors.itemAlreadyExists(`Item alredy exists with name: ${streamData.name}`, { name: streamData.name });
      }
      await fs.mkdir(dirFullPath);
      const stream = fsds.dirToStream(userId, parentFullPath, dirFullPath, streamData.name);
      stream.children = [];
    },

    async update (userId, streamData) {
    },

    async updateDelete (userId, streamId) {

    },

    async deleteAll (userId) {

    },

    async getDeletions (userId, deletionsSince) {

    },

    async createDeleted (userId, streamData) {

    },

    async delete (userId, streamId) {

    }
  });
}

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

function createFSUserEvents (fsds) {
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
              const event = await fsds.fileToEvent(userId, dirSubPath, dirent.name, streamId);
              // filter event HERE
              addEvent(event);
            }
          }
        }
      }

      return events;

      /**
       * Add event in an ordered way
       * @param {Event} eventToAdd
       */
      function addEvent (eventToAdd) {
        for (let i = 0; i < events.length; i++) {
          if (events[i].time < eventToAdd.time) {
            events.splice(i + 1, 0, eventToAdd); // insert at the right position
            break;
          }
        }
        events.push(eventToAdd);
      }
    },

    async getStreamed (userId, params) {

    },

    async getOne (userId, eventId) {
    },

    async create (userId, eventData) {

    },

    // async saveAttachedFiles (userId, partialEventData, attachmentsItems) { throw errors.unsupportedOperation('events.saveAttachedFiles'); },
    // async getAttachedFile (userId, eventData, fileId) { throw errors.unsupportedOperation('events.getAttachedFile'); },
    // async deleteAttachedFile (userId, eventData, fileId) { throw errors.unsupportedOperation('events.deleteAttachedFile'); },

    async update (userId, eventData) {

    },
    async delete (userId, eventId, params) {

    }
  });
}

// --- utils --- //

function subPathForId (itemId) {
  if (itemId == null || itemId === '*') return '';
  return zlib.inflateSync(Buffer.from(itemId, 'base64url')).toString();
}

function idForSubPath (subPath) {
  if (!subPath || subPath.length === 0) return null;
  return zlib.deflateSync(subPath).toString('base64url');
}

function isChildOf (childPath, parentPath) {
  if (parentPath === '*') return true;
  return childPath.startsWith(parentPath);
}
