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
  events.forEach(applyOnEvent);
}

/**
 * Adds missing mandatory properties to the given stream and its children (if present).
 * **Note**: mutates the stream object.
 * @param {Object} stream
 * @param {string} [parentId]  - for parentId of the stream
 */
function applyOnStream (stream, parentId = null) {
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
  streams.forEach(stream => applyOnStream(stream, parentId));
}
