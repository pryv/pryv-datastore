/**
 * @license
 * Copyright (C) 2012–2022 Pryv S.A. https://pryv.com - All Rights Reserved
 * This program is free software; you can redistribute it and/or modify it
 * under the terms of the 3-Clause BSD License
 * SPDX-License-Identifier: BSD-3-Clause
 */

const errors = require('./errors');

/**
 * @typedef {string} identifier
 */

/**
 * @typedef {number} timestamp
 */

/**
 * @typedef {object} Stream
 */

/**
 * @typedef {object} StreamDeletionItem
 */

/**
 * Prototype object for per-user streams data.
 * {@link DataStore#streams} must return an implementation that inherits from this via {@link datastore#createUserStreams}.
 * @exports UserStreams
 */
const UserStreams = module.exports = {
  /* eslint-disable no-unused-vars */

  /**
   * Get the stream that will be set as root for all Stream Structure of this Data Store.
   * @see https://api.pryv.com/reference/#get-streams
   * @param {identifier} userId
   * @param {object} params
   * @param {identifier} [params.id] null, means root streamId. Notice parentId is not implemented by stores
   * @param {number} [params.expandChildren=0] 0 = NO; -1 = ALL; 1.. Gives the number of levels to expand
   * @param {identifier[]} [params.excludeIds] list of streamIds to exclude from query. if expandChildren is >0 or < 0, children of excludedIds should be excludded too
   * @param {boolean} [params.includeTrashed] (equivalent to state = 'all')
   * @returns {Promise<Stream|null>} - the stream or null if not found:
   */
  async get (userId, params) { throw errors.unsupportedOperation('streams.get'); },

  /**
   * Get a list of deleted ids since
   * @param {identifier} userId
   * @param {timestamp} deletionsSince
   */
  async getDeletions (userId, deletionsSince) { throw errors.unsupportedOperation('streams.getDeletions'); },

  /**
   * @see https://api.pryv.com/reference/#create-stream
   * @param {identifier} userId
   * @throws item-already-exists
   * @throws invalid-item-id
   * @throws resource-is-readonly <=== Thrown either because Storage or Parent stream is readonly
   * @returns {Promise<Stream>} - The created Stream
   */
  async create (userId, params) { throw errors.unsupportedOperation('streams.create'); },

  /**
   * @see https://api.pryv.com/reference/#update-stream
   * @param {identifier} userId
   * @throws item-already-exists
   * @throws resource-is-readonly <=== Thrown because item cannot be updated
   * @returns {Promise<Stream>} - The update Stream
   */
  async update (userId, streamId, params) { throw errors.unsupportedOperation('streams.update'); },

  /**
   * @see https://api.pryv.com/reference/#delete-stream
   * @param {identifier} userId
   * @param {identifier} streamId
   * @param {object} params
   * @throws item-already-exists
   * @throws resource-is-readonly <=== Thrown because item cannot be updated
   * @returns {Promise<Stream|StreamDeletionItem>} - The trashed Stream
   */
  async delete (userId, streamId, params) { throw errors.unsupportedOperation('streams.delete'); }
};

// limit tampering on existing properties
for (const propName of Object.getOwnPropertyNames(UserStreams)) {
  Object.defineProperty(UserStreams, propName, { configurable: false });
}
