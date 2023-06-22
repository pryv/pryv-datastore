/**
 * @license
 * Copyright (C) 2021–2023 Pryv S.A. https://pryv.com - All Rights Reserved
 * This program is free software; you can redistribute it and/or modify it
 * under the terms of the 3-Clause BSD License
 * SPDX-License-Identifier: BSD-3-Clause
 */

const PryvDataStoreError = require('./PryvDataStoreError');
const ErrorIds = require('./ErrorIds');

/**
 * Helper "factory" methods for data store errors (see error ids).
 * @exports errors
 */
const factory = module.exports = {
  /**
   * @param {string} message
   * @param {*} data
   * @param {Error} innerError
   * @returns {PryvDataStoreError}
   */
  unexpectedError (message, data, innerError) {
    return new PryvDataStoreError(ErrorIds.UnexpectedError, message, data, innerError);
  },

  /**
   * @param {string} message
   * @param {*} data
   * @param {Error} innerError
   * @returns {PryvDataStoreError}
   */
  invalidRequestStructure (message, data, innerError) {
    return new PryvDataStoreError(ErrorIds.InvalidRequestStructure, message, data, innerError);
  },

  /**
   * @param {string} resourceType
   * @param {string} id
   * @param {Error} innerError
   * @returns {PryvDataStoreError}
   */
  unknownResource (resourceType, id, innerError) {
    const message = `Unknown ${resourceType || 'resource'} ${id ? `"${id}"` : ''}`;
    return new PryvDataStoreError(ErrorIds.UnknownResource, message, { resourceType, id }, innerError);
  },

  /**
   * @param {string} resourceType
   * @param {string[]} conflictingKeys
   * @param {Error} innerError
   * @returns {PryvDataStoreError}
   */
  itemAlreadyExists (resourceType, conflictingKeys, innerError) {
    const message = `${resourceType || 'Resource'} already exists with conflicting key(s): ${JSON.stringify(conflictingKeys)}`;
    return new PryvDataStoreError(ErrorIds.ItemAlreadyExists, message, { resourceType, conflictingKeys }, innerError);
  },

  /**
   * @param {string} message
   * @param {*} data
   * @param {Error} innerError
   * @returns {PryvDataStoreError}
   */
  invalidItemId (message, data, innerError) {
    return new PryvDataStoreError(ErrorIds.InvalidItemId, message, data, innerError);
  },

  /**
   * @param {string} message
   * @param {*} [data]
   * @param {Error} [innerError]
   * @returns {PryvDataStoreError}
   */
  unsupportedOperation (message, data, innerError) {
    return new PryvDataStoreError(ErrorIds.UnsupportedOperation, message, data, innerError);
  }
};
