/**
 * @license
 * Copyright (C) 2021–2023 Pryv S.A. https://pryv.com - All Rights Reserved
 * This program is free software; you can redistribute it and/or modify it
 * under the terms of the 3-Clause BSD License
 * SPDX-License-Identifier: BSD-3-Clause
 */
const fs = require('fs-extra');
const ds = require('../../'); // datastore
const path = require('path');

const createFSUserEvents = require('./fs-events');
const createFSUserStreams = require('./fs-streams');
const { idForSubPath, subPathForId } = require('./pathUtils');

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
      throw ds.errors.invalidRequestStructure('Missing or invalid baseURL setting', this.settings.basePath, err);
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
  }
});
