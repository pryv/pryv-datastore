/**
 * @license
 * Copyright (C) 2021–2023 Pryv S.A. https://pryv.com - All Rights Reserved
 * This program is free software; you can redistribute it and/or modify it
 * under the terms of the 3-Clause BSD License
 * SPDX-License-Identifier: BSD-3-Clause
 */

const DataStore = require('./DataStore');
const UserStreams = require('./UserStreams');
const UserEvents = require('./UserEvents');
const defaults = require('./defaults');
const errors = require('./errors');

/**
 * @exports datastore
 */
module.exports = {
  /**
   * Create a new data store object with the given implementation.
   * @param {Object} implementation An object implementing {@link DataStore} methods
   * @returns {DataStore}
   */
  createDataStore (implementation) {
    return Object.assign(Object.create(DataStore), implementation);
  },

  /**
   * Create a new user streams object with the given implementation.
   * @param {Object} implementation An object implementing {@link UserStreams} methods
   * @returns {UserStreams}
   */
  createUserStreams (implementation) {
    return Object.assign(Object.create(UserStreams), implementation);
  },

  /**
   * Create a new user events object with the given implementation.
   * @param {Object} implementation An object implementing {@link UserEvents} methods
   * @returns {UserEvents}
   */
  createUserEvents (implementation) {
    return Object.assign(Object.create(UserEvents), implementation);
  },

  defaults,

  errors
};
