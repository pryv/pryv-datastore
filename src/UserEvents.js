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
 * @typedef {number} timestamp
 */

/**
 * @typedef {string} integrity
 */

/**
 * @typedef {object} Event
 */

/**
 * @typedef {object} EventDeletionItem
 */

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
   * @param {identifier} userId
   * @param {identifier} eventId
   * @return {Promise<Event|null>}
   */
  async getOne (userId, eventId) { throw errors.unsupportedOperation('events.getOne'); },

  /**
   * Get events for this user.
   * @param {identifier} userId
   * @param {GetEventQuery} query Event query
   * @param {{skip, limit, sort}} options
   * @returns {Promise<Event[]>}
   */
  async get (userId, query, options) { throw errors.unsupportedOperation('events.get'); },

  /**
   * Get events as a stream for this user.
   * @param {identifier} userId
   * @param {GetEventQuery} query Event query
   * @param {{skip, limit, sort}} options
   * @returns {Promise<ReadableStream<Event>>}
   */
  async getStreamed (userId, query, options) { throw errors.unsupportedOperation('events.getStreamed'); },

  /**
   * @param {identifier} userId
   * @param {{deletedSince: timestamp}} query
   * @param {{skip: number, limit: number, sortAscending: boolean}} [options]
   * @returns {Promise<ReadableStream<EventDeletionItem>>}
   */
  async getDeletionsStreamed (userId, query, options) {
    throw errors.unsupportedOperation('events.getDeletionsStreamed');
  },

  /**
   * @param {identifier} userId
   * @param {identifier} eventId
   * @returns {Promise<Event[]>}
   */
  async getHistory (userId, eventId) {
    throw errors.unsupportedOperation('events.getHistory');
  },

  /**
   * @see [Create events in Pryv.io API reference](https://api.pryv.com/reference/#create-event)
   * @param {identifier} userId
   * @param {object} eventData
   * @throws {PryvDataStoreError} with id `item-already-exists`
   * @throws {PryvDataStoreError} with id `invalid-item-id`
   * @throws {PryvDataStoreError} with id `resource-is-readonly` if either storage or parent stream is read-only
   * @returns {Promise<Event>} - The created event
   */
  async create (userId, eventData) { throw errors.unsupportedOperation('events.create'); },

  /**
   * @param {identifier} userId
   * @param {identifier} eventId
   * @param {AttachmentItem[]} attachmentsItems - Array of attachments informations.
   * @throws {PryvDataStoreError} with id `item-already-exists`
   * @throws {PryvDataStoreError} with id `invalid-item-id`
   * @throws {PryvDataStoreError} with id `resource-is-readonly` if either storage or parent stream is read-only
   * @returns {Promise<AttachmentResponseItem>} - The ids and other information related to the attachments
   */
  async saveAttachedFiles (userId, eventId, attachmentsItems) { throw errors.unsupportedOperation('events.saveAttachedFiles'); },

  /**
   * Retrieve the specified file as a stream.
   * @param {identifier} userId
   * @param {identifier} eventId
   * @param {identifier} fileId
   * @returns {Promise<ReadableStream>}
   */
  async getAttachedFile (userId, eventId, fileId) { throw errors.unsupportedOperation('events.getAttachedFile'); },

  /**
   * Delete the specified file.
   * @param {identifier} userId
   * @param {identifier} eventId
   * @param {identifier} fileId
   * @throws {PryvDataStoreError} with id `invalid-item-id`
   * @throws {PryvDataStoreError} with id `resource-is-readonly` if either storage or parent stream is read-only
   * @returns {Promise<AttachmentResponseItem>} - The ids and other information related to the attachments
   */
  async deleteAttachedFile (userId, eventId, fileId) { throw errors.unsupportedOperation('events.deleteAttachedFile'); },

  /**
   * Fully replace an event with new Data
   * @param {identifier} userId
   * @param {Event} eventData - New event data
   * @throws {PryvDataStoreError} with id `resource-is-readonly` if either storage or parent stream is read-only
   * @returns {Promise<boolean>} - true if an event was updated
   */
  async update (userId, eventData) { throw errors.unsupportedOperation('events.replace'); },

  /**
   * @see https://api.pryv.com/reference/#delete-event
   * @param {identifier} userId
   * @param {identifier} eventId
   * @throws {PryvDataStoreError} with id `item-already-exists`
   * @throws {PryvDataStoreError} with id `resource-is-readonly` if either storage or parent stream is read-only
   * @returns {Promise<Event|EventDeletionItem>} - The trashed Event
   */
  async delete (userId, eventId) { throw errors.unsupportedOperation('events.delete'); }
};

// limit tampering on existing properties
for (const propName of Object.getOwnPropertyNames(UserEvents)) {
  Object.defineProperty(UserEvents, propName, { configurable: false });
}
