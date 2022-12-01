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

const errors = require('./errors');

/**
 * Object to pass when creating events with attachments or adding attachments to events
 * @typedef {object} AttachmentItem
 * @property {string} filename fileName
 * @property {number} [size] - The size of the attachment
 * @property {ReadableStream} attachmentData
 * @property {integrity} [integrity] - The integrity checksum of the attachment
 */

/**
 * Informations sent by the store after saving attachment
 * @typedef {object} AttachmentResponseItem
 * @param {string} id - mandatory id of the attachement - unique - per event
 */

/**
 * Prototype object for per-user events data.
 * {@link DataStore#events} must return an implementation that inherits from this via {@link datastore#createUserEvents}.
 * @exports UserEvents
 */
const UserEvents = module.exports = {
  /* eslint-disable no-unused-vars */

  /**
   * Get events for this user.
   * @see [Get events in Pryv.io API reference](https://api.pryv.com/reference/#get-events)
   * @param {identifier} userId
   * @param {object} params - Query parameters
   * @param {boolean} [params.withDeletions=false] - Include event deletions in the results.
   * @param {timestamp} [params.deletedSince=null] -  Only return deleted events, sorted by deletion date descending.
   * @param {boolean} [params.includeHistory=false] - Include change history for events.
   * @returns {Event[]}
   */
  async get (userId, params) { throw errors.unsupportedOperation('events.get'); },

  /**
   * Get events as a stream for this user.
   * @see [Get events in Pryv.io API reference](https://api.pryv.com/reference/#get-events)
   * @param {identifier} userId
   * @param {object} params - event query
   * @returns {ReadableStream}
   */
  async getStreamed (userId, params) { throw errors.unsupportedOperation('events.getStreamed'); },

  /**
   * TODO: implement
   * @param {identifier} userId
   * @param {identifier} eventId
   */
  async getOne (userId, eventId) { throw errors.unsupportedOperation('events.getOne'); },

  /**
   * @see [Create events in Pryv.io API reference](https://api.pryv.com/reference/#create-event)
   * @param {identifier} userId
   * @param {EventData} eventData
   * @throws {PryvDataStoreError} with id `item-already-exists`
   * @throws {PryvDataStoreError} with id `invalid-item-id`
   * @throws {PryvDataStoreError} with id `resource-is-readonly` if either storage or parent stream is read-only
   * @returns {Event} - The created event
   */
  async create (userId, eventData) { throw errors.unsupportedOperation('events.create'); },

  /**
   * @param {identifier} userId
   * @param {any} partialEventData - eventData (without the new attachments and integrity property)
   * @param {AttachmentItem[]} attachmentsItems - Array of attachments informations.
   * @throws {PryvDataStoreError} with id `item-already-exists`
   * @throws {PryvDataStoreError} with id `invalid-item-id`
   * @throws {PryvDataStoreError} with id `resource-is-readonly` if either storage or parent stream is read-only
   * @returns {AttachmentResponseItem} - The ids and other information related to the attachments
   */
  async saveAttachedFiles (userId, partialEventData, attachmentsItems) { throw errors.unsupportedOperation('events.saveAttachedFiles'); },

  /**
   * Retrieve the specified file as a stream.
   * @param {identifier} userId
   * @param {*} eventData
   * @param {identifier} fileId
   * @returns {stream.Readable}
   */
  async getAttachedFile (userId, eventData, fileId) { throw errors.unsupportedOperation('events.getAttachedFile'); },

  /**
   * Delete the specified file.
   * @param {identifier} userId
   * @param {any} eventData
   * @param {identifier} fileId
   * @throws {PryvDataStoreError} with id `invalid-item-id`
   * @throws {PryvDataStoreError} with id `resource-is-readonly` if either storage or parent stream is read-only
   * @returns {AttachmentResponseItem} - The ids and other information related to the attachments
   */
  async deleteAttachedFile (userId, eventData, fileId) { throw errors.unsupportedOperation('events.deleteAttachedFile'); },

  /**
   * Fully replace an event with new Data
   * @param {identifier} userId
   * @param {any} eventData - New event data
   * @throws {PryvDataStoreError} with id `resource-is-readonly` if either storage or parent stream is read-only
   * @returns {boolean} - true if an event was updated
   */
  async update (userId, eventData) { throw errors.unsupportedOperation('events.replace'); },

  /**
   * @see https://api.pryv.com/reference/#delete-event
   * @param {identifier} userId
   * @param {identifier} eventId
   * @param {object} params
   * @throws {PryvDataStoreError} with id `item-already-exists`
   * @throws {PryvDataStoreError} with id `resource-is-readonly` if either storage or parent stream is read-only
   * @returns {Event|EventDeletionItem} - The trashed Event
   */
  async delete (userId, eventId, params) { throw errors.unsupportedOperation('events.delete'); }
};

// limit tampering on existing properties
for (const propName of Object.getOwnPropertyNames(UserEvents)) {
  Object.defineProperty(UserEvents, propName, { configurable: false });
}
