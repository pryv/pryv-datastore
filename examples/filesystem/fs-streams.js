const fs = require('fs-extra');
const path = require('path');

const ds = require('../../'); // datastore

module.exports = function createFSUserStreams (fsds) {
  return ds.createUserStreams({
    async get (userId, params) {
      const parentFullPath = fsds.fullPathForSub(userId, params.id);
      const maxDepth = params.childrenDepth || 0;
      const excludedIds = params.excludedIds || [];
      return await loop(parentFullPath, maxDepth);

      async function loop (dirPath, depth) {
        const streams = [];
        const dir = await fs.promises.opendir(dirPath);
        for await (const dirent of dir) {
          if (dirent.isDirectory()) {
            const subDirPath = path.join(dirPath, dirent.name);
            const stream = await dirToStream(userId, dirPath, subDirPath, dirent.name);

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
      const stream = dirToStream(userId, parentFullPath, dirFullPath, streamData.name);
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

  async function dirToStream (userId, parentFullPath, dirFullPath, dirName) {
    const stats = await fs.promises.stat(dirFullPath);
    return {
      id: fsds.idForFullPath(userId, dirFullPath),
      parentId: fsds.idForFullPath(userId, parentFullPath),
      name: dirName,
      created: stats.birthtimeMs / 1000,
      modified: stats.ctimeMs / 1000,
      clientData: {
        path: fsds.subPathForFull(userId, dirFullPath)
      }
    };
  }
};
