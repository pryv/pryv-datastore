/**
 * @license
 * Copyright (C) 2021–2023 Pryv S.A. https://pryv.com - All Rights Reserved
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
   * @param {StoreInitializationParams} params
   * @returns {Promise<DataStore>} The data store object itself (for method chaining).
   */
  async init (params) { throw new Error('Not implemented'); },

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
   * Returns information on storage used
   * @param {identifier} userId
   * @returns {Promise<UserStorageInfos>}
   */
  async getUserStorageInfos (userId) { throw new Error('Not implemented'); }, // eslint-disable-line no-unused-vars

  /**
   * Declare the optional capabilities this store implements, per feature.
   * Stores not overriding this support no optional feature; partial
   * support is fine (e.g. a subset of query operators).
   * The returned object is surfaced to API clients in the `clientData`
   * of the store's root stream — it must be JSON-serializable and must
   * not contain secrets.
   * @returns {StoreSupports}
   * @example
   * supports () {
   *   return {
   *     contentQueries: { // events.get content/clientData conditions
   *       fields: ['content', 'clientData'],
   *       operators: ['eq', 'in', 'prefix'] // subset of: eq neq in exists gt gte lt lte prefix
   *     }
   *   };
   * }
   */
  supports () { return {}; }

};

// limit tampering on existing properties
for (const propName of Object.getOwnPropertyNames(DataStore)) {
  Object.defineProperty(DataStore, propName, { configurable: false });
}

/**
 * @typedef {string} identifier - A string uniquely identifying an object (user, event, stream, etc.)
 */

/**
 * @typedef {Object} StoreSupports - Optional-capability declaration, keyed by feature.
 * @property {Object} [contentQueries] - Support for events.get `content`/`clientData` query conditions.
 * @property {string[]} [contentQueries.fields] - Supported condition fields ('content', 'clientData').
 * @property {string[]} [contentQueries.operators] - Supported operators (subset of: eq, neq, in, exists, gt, gte, lt, lte, prefix).
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
 * @typedef {object} UserStorageInfos - All infos are optional, infos can be extended with custom properties
 * @property {number} [totalSizeKb] total storage used in Kb
 * @property {Object} [streams]
 * @property {number} [streams.count] number of streams
 * @property {number} [streams.sizeKb] size used by stream in Kb
 * @property {number} [events.count] number of events
 * @property {number} [events.sizeKb] size used by events in Kb
 * @property {number} [files.count] number of files
 * @property {number} [files.sizeKb] size used by files in Kb
 */

/**
 * @typedef {object} KeyValueData
 * @property {FnKeyValueGetAll} getAll Get all key-value data for the given user.
 * @property {FnKeyValueGet} get Get key-value data for the given user.
 * @property {FnKeyValueSet} set Set key-value data for the given user.
 */

/**
 * @typedef {object} StoreInitializationParams
 * @property {identifier} id The store's id as defined in the Pryv.io platform configuration (for information)
 * @property {string} name The store's name as defined in the Pryv.io platform configuration (for information; names the root stream representing the store)
 * @property {object} settings The store's settings as defined in the Pryv.io platform configuration
 * @property {KeyValueData} storeKeyValueData Utility to save per-user data
 * @property {Logger} logger Logger for the store (messages will appear in the Pryv.io core logs)
 */

/**
 * @callback FnLog
 * @param {string} message The log message
 * @param {...any} context Any additional contextual information
 */

/**
 * @typedef Logger
 * @property {FnLog} log Log message with 'info' level
 * @property {FnLog} warn Log message with 'warning' level
 * @property {FnLog} error Log message with 'error' level
 * @property {FnLog} debug Log message with 'debug' level
 */
