const fs = require('fs-extra');
const ds = require('../../src'); // datastore
const path = require('path');

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

  iPath (userId, itemId) {
    itemId = itemId || '';
    return path.join(this.settings.basePath, userId);
  },

  async deleteUser (userId) { // eslint-disable-line no-unused-vars
    await fs.emptyDir(this.iPath(userId));
  },

  /**
   * 
   * @param {string} userId 
   * @param {path} directory 
   * @param {int} depth 
   * @param {Function} inspector - called for each directory params (dir, depth)
   */
  async inspect (userId, directory, depth, inspector) {

  },

  idForPath (userId, path) {
    // remove basePath
    const id = path.substring(this.iPath(userId).length + 1);
    if (id.length === 0) return null; 
    return id;
  },

  async getUserStorageSize (userId) { // eslint-disable-line no-unused-vars
    return 0;
  },

  async dirToStream (userId, parentPath, dirPath, dirName) {
    const stats = await fs.promises.stat(dirPath);
    return {
      id: this.idForPath(userId, dirPath),
      parentId: this.idForPath(userId, parentPath),
      name: dirName,
      created: stats.birthtimeMs / 1000,
      modified: stats.ctimeMs / 1000
    };
  }
});

// ----- streams implementation --//

function createFSUserStreams (fsds) {
  return ds.createUserStreams({
    async get (userId, params) {
      const rootDir = fsds.iPath(userId, params.id);
      const maxDepth = params.expandChildren || 0;
      return await loop(rootDir, maxDepth);

      async function loop (dirPath, depth) {
        const streams = [];
        const dir = await fs.promises.opendir(dirPath);
        for await (const dirent of dir) {
          if (dirent.isDirectory()) {
            const subDirPath = path.join(dirPath, dirent.name);
            const stream = await fsds.dirToStream(userId, dirPath, subDirPath, dirent.name);
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

function createFSUserEvents (rs) {
  return ds.createUserEvents({
    async get (userId, params) {
     
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


