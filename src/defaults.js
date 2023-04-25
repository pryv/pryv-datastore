/**
 * @license
 * Copyright (C) 2021–2023 Pryv S.A. https://pryv.com - All Rights Reserved
 * This program is free software; you can redistribute it and/or modify it
 * under the terms of the 3-Clause BSD License
 * SPDX-License-Identifier: BSD-3-Clause
 */

/**
 * Data store constants and helper methods.
 * @exports defaults
 */
const defaults = module.exports = {
  /**
   * Timestamp representing an unknown creation/modification time.
   * @type {number}
   */
  UnknownDate: 10000000.00000001,
  /**
   * 'System' access id for created by / modified by.
   * @type {string}
   */
  SystemAccessId: 'system',
  /**
   * 'Unknown' access id for created by / modified by.
   * @type {string}
   */
  UnknownAccessId: 'unknown',
  /**
   * Access id prefix used to tag external identifiers for created by / modified by.
   * @type {string}
   */
  ExternalAccessIdPrefix: 'external-',

  applyOnEvent,
  applyOnEvents,
  applyOnStream,
  applyOnStreams
};
Object.freeze(defaults);

/**
 * Adds missing mandatory properties to the given event.
 * **Note**: mutates the event object.
 * @param {Object} event
 */
function applyOnEvent (event) {
  if (event == null) return null;
  if (typeof event.created === 'undefined') { event.created = defaults.UnknownDate; }
  if (typeof event.modified === 'undefined') { event.modified = defaults.UnknownDate; }
  if (typeof event.createdBy === 'undefined') { event.createdBy = defaults.UnknownAccessId; }
  if (typeof event.modifiedBy === 'undefined') { event.modifiedBy = defaults.UnknownAccessId; }
}
/**
 * Adds missing mandatory properties to the given events.
 * **Note**: mutates the event objects.
 * @param {Object[]} events
 */
function applyOnEvents (events) {
  if (events == null) return null;
  events.forEach(applyOnEvent);
}

/**
 * Adds missing mandatory properties to the given stream and its children (if present).
 * **Note**: mutates the stream object.
 * @param {Object} stream
 * @param {string} [parentId]  - for parentId of the stream
 */
function applyOnStream (stream, parentId = null) {
  if (stream == null) return null;
  if (typeof stream.created === 'undefined') { stream.created = defaults.UnknownDate; }
  if (typeof stream.modified === 'undefined') { stream.modified = defaults.UnknownDate; }
  if (typeof stream.createdBy === 'undefined') { stream.createdBy = defaults.UnknownAccessId; }
  if (typeof stream.modifiedBy === 'undefined') { stream.modifiedBy = defaults.UnknownAccessId; }
  if (stream.children == null) { stream.children = []; }
  if (stream.children.length > 0) { applyOnStreams(stream.children, stream.id); }
  stream.parentId = parentId;
}

/**
 * Adds missing mandatory properties to the given streams and their children (if present).
 * **Note**: mutates the stream objects.
 * @param {Object[]} streams
 * @param {string} [parentId]  - for parentId of the stream
 */
function applyOnStreams (streams, parentId = null) {
  if (streams == null) return null;
  streams.forEach(stream => applyOnStream(stream, parentId));
}
