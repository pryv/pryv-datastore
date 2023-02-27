/**
 * @license
 * Copyright (C) 2012–2022 Pryv S.A. https://pryv.com - All Rights Reserved
 * This program is free software; you can redistribute it and/or modify it
 * under the terms of the 3-Clause BSD License
 * SPDX-License-Identifier: BSD-3-Clause
 */

/**
 * Data store prototype object.
 * All data store implementations inherit from this via {@link datastore#createDataStore}.
 * @exports DataStore
 */
const DataStore = module.exports = {
  /**
   * Initialize the store.
   * @param {object} settings The data store's configuration settings (loaded from platform settings at creation).
   * @param {KeyValueDB} keyValueDB A store-specific key-value database for user data (e.g. credentials or settings).
   * @returns {Promise<DataStore>} The data store object itself (for method chaining).
   */
  async init (settings, keyValueDB) { throw new Error('Not implemented'); },

  /**
   * The {@link UserStreams} implementation. Must be set in {@link init}.
   * @type {UserStreams}
   */
  streams: null,

  /**
   * The {@link UserEvents} implementation. Must be set in {@link init}.
   * @type {UserEvents}
   */
  events: null,

  /**
   * Called when the given user is deleted from Pryv.io, to let the store delete the related data if appropriate.
   * @param {identifier} userId
   */
  async deleteUser (userId) { throw new Error('Not implemented'); }, // eslint-disable-line no-unused-vars

  /**
   * Return the total amount of storage used by the given user, in bytes.
   * @param {identifier} userId
   * @returns {Promise<number>}
   */
  async getUserStorageSize (userId) { throw new Error('Not implemented'); } // eslint-disable-line no-unused-vars
};

// limit tampering on existing properties
for (const propName of Object.getOwnPropertyNames(DataStore)) {
  Object.defineProperty(DataStore, propName, { configurable: false });
}

/**
 * @typedef {string} identifier - A string uniquely identifying an object (user, event, stream, etc.)
 */

/**
 * @typedef {number} timestamp - A positive floating-point number representing the number of seconds since a reference time (Unix epoch time).
 */

/** @typedef {import('./UserStreams')} UserStreams */
/** @typedef {import('./UserEvents')} UserEvents */

/**
 * @callback FnKeyValueGetAll
 * @param {identifier} userId
 * @returns {object}
 */

/**
 * @callback FnKeyValueGet
 * @param {identifier} userId
 * @param {string} key
 * @returns {*}
 */

/**
 * @callback FnKeyValueSet
 * @param {identifier} userId
 * @param {string} key
 * @param {*} value
 * @returns {void}
 */

/**
 * @typedef {object} KeyValueDB
 * @property {FnKeyValueGetAll} getAll Get all key-value data for the given user.
 * @property {FnKeyValueGet} get Get key-value data for the given user.
 * @property {FnKeyValueSet} set Set key-value data for the given user.
 */
