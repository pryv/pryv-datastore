/**
 * @license
 * Copyright (C) 2012–2022 Pryv S.A. https://pryv.com - All Rights Reserved
 * This program is free software; you can redistribute it and/or modify it
 * under the terms of the 3-Clause BSD License
 * SPDX-License-Identifier: BSD-3-Clause
 */

module.exports = PryvDataStoreError;

/**
 * Constructor for data store errors.
 * @param {string} id
 * @param {string} message
 * @param {*} [data]
 * @param {Error} [innerError]
 */
function PryvDataStoreError (id, message, data = null, innerError = null) {
  Error.call(this, message);
  this.id = id;
  this.data = data;
  this.innerError = innerError;
}

PryvDataStoreError.prototype = Object.create(Error.prototype);
