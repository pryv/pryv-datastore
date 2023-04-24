/**
 * @license
 * Copyright (C) 2021–2023 Pryv S.A. https://pryv.com - All Rights Reserved
 * This program is free software; you can redistribute it and/or modify it
 * under the terms of the 3-Clause BSD License
 * SPDX-License-Identifier: BSD-3-Clause
 */

const errors = require('./errors');

/**
 * @typedef {string} identifier
 */

/**
 * // time in UNIX time (seconds)
 * @typedef {number} timestamp
 */

/**
 * @typedef {object} Stream
 */

/**
 * @typedef {object} StreamDeletionItem
 * @property {identifier} id
 * @property {timestamp} deleted
 */

/**
 * Prototype object for per-user streams data.
 * {@link DataStore#streams} must return an implementation that inherits from this via {@link datastore#createUserStreams}.
 * @exports UserStreams
 */
const UserStreams = module.exports = {
  /* eslint-disable no-unused-vars */


  /**
   * Get a stream 
   * @param {identifier} userId
   * @param {object} query
   * @param {identifier} query.id '*', means root streamId. Notice parentId is not implemented by stores
   * @param {number} [query.childrenDepth=0] 0 = NO; -1 = ALL; 1.. Gives the number of levels to expand
   * @param {identifier[]} [query.excludeIds] list of streamIds to exclude from query. if childrenDepth is >0 or < 0, children of excludedIds should be excludded too
   * @param {boolean} [query.includeTrashed] (equivalent to state = 'all')
   * @returns {Promise<Stream|null>} - the stream or null if not found:
   */
  async getOne (userId, streamId, query) { throw errors.unsupportedOperation('streams.get'); },

  /**
   * Query streams 
   * @param {identifier} userId
   * @param {object} query
   * @param {identifier} [query.parentId] '*' or `null`, means root streamId. 
   * @param {number} [query.childrenDepth=0] 0 = NO; -1 = ALL; 1.. Gives the number of levels to expand
   * @param {identifier[]} [query.excludeIds] list of streamIds to exclude from query. if childrenDepth is >0 or < 0, children of excludedIds should be excludded too
   * @param {boolean} [query.includeTrashed] (equivalent to state = 'all')
   * @returns {Promise<Stream[]>} - an array of streams
   */
  async get (userId, query) { throw errors.unsupportedOperation('streams.get'); },

  /**
   * Get a list of deleted ids since
   * @param {identifier} userId
   * @param {timestamp} deletionsSince
   * @returns {Promise<StreamDeletionItem>}
   */
  async getDeletions (userId, deletionsSince) { throw errors.unsupportedOperation('streams.getDeletions'); },

  /**
   * @see https://api.pryv.com/reference/#create-stream
   * @param {identifier} userId
   * @param {Stream} streamData
   * @throws item-already-exists (if item is deleted, id can be re-used)
   * @throws invalid-item-id
   * @throws resource-is-readonly <=== Thrown either because Storage or Parent stream is readonly
   * @returns {Promise<Stream>} - The created Stream
   */
  async create (userId, streamData) { throw errors.unsupportedOperation('streams.create'); },

  /**
   * (Optional used by tests only)
   * @param {identifier} userId
   * @param {Stream} streamData
   * @throws resource-is-readonly <=== Thrown either because Storage or Parent stream is readonly
   * @returns {Promise<Stream>} - The created Stream
   */
  async createDeleted (userId, streamData) { throw errors.unsupportedOperation('streams.createDeleted'); },

  /**
   * @see https://api.pryv.com/reference/#update-stream
   * @param {identifier} userId
   * @param {Object} updateData  
   * @throws item-already-exists
   * @throws resource-is-readonly <=== Thrown because item cannot be updated
   * @returns {Promise<Stream>} - The update Stream
   */
  async update (userId, updateData) { throw errors.unsupportedOperation('streams.update'); },

  /**
   * @see https://api.pryv.com/reference/#delete-stream
   * @param {identifier} userId
   * @param {identifier} streamId
   * @throws resource-is-readonly <=== Thrown because item cannot be updated
   * @returns {Promise<Stream|StreamDeletionItem>} - The trashed Stream
   */
  async delete (userId, streamId) { throw errors.unsupportedOperation('streams.delete'); }
};

// limit tampering on existing properties
for (const propName of Object.getOwnPropertyNames(UserStreams)) {
  Object.defineProperty(UserStreams, propName, { configurable: false });
}
