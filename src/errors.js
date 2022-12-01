/**
 * @license
 * Copyright (C) 2012–2022 Pryv S.A. https://pryv.com - All Rights Reserved
 *
 * Redistribution and use in source and binary forms, with or without
 * modification, are permitted provided that the following conditions are met:
 *
 * 1. Redistributions of source code must retain the above copyright notice,
 *   this list of conditions and the following disclaimer.
 *
 * 2. Redistributions in binary form must reproduce the above copyright notice,
 *   this list of conditions and the following disclaimer in the documentation
 *   and/or other materials provided with the distribution.
 *
 * 3. Neither the name of the copyright holder nor the names of its contributors
 *   may be used to endorse or promote products derived from this software
 *   without specific prior written permission.
 *
 * THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS"
 * AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE
 * IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE
 * DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT HOLDER OR CONTRIBUTORS BE LIABLE
 * FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL
 * DAMAGES (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR
 * SERVICES; LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER
 * CAUSED AND ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY,
 * OR TORT (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE
 * OF THIS SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
 *
 * SPDX-License-Identifier: BSD-3-Clause
 */

const PryvDataStoreError = require('./PryvDataStoreError');
const ErrorIds = require('./ErrorIds');

/**
 * @typedef PryvDataStoreError
 * @property {id}
 * @property {message}
 * @property {data}
 * @property {innerError}
 */

/**
 * Helper "factory" methods for data store errors (see error ids).
 * @exports errors
 */
module.exports = {
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
    return new PryvDataStoreError(ErrorIds.UnknownResource, message, null, innerError);
  },

  /**
   * @param {string} resourceType
   * @param {string[]} conflictingKeys
   * @param {Error} innerError
   * @returns {PryvDataStoreError}
   */
  itemAlreadyExists (resourceType, conflictingKeys, innerError) {
    const message = `${resourceType || 'Resource'} already exists with conflicting key(s): ${JSON.stringify(conflictingKeys)}`;
    return new PryvDataStoreError(ErrorIds.ItemAlreadyExists, message, { conflictingKeys }, innerError);
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
   * @param {*} data
   * @param {Error} innerError
   * @returns {PryvDataStoreError}
   */
  unsupportedOperation (message, data, innerError) {
    return new PryvDataStoreError(ErrorIds.UnsupportedOperation, message, data, innerError);
  }
};
