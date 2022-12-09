/**
 * @license
 * Copyright (C) 2012–2022 Pryv S.A. https://pryv.com - All Rights Reserved
 * This program is free software; you can redistribute it and/or modify it
 * under the terms of the 3-Clause BSD License
 * SPDX-License-Identifier: BSD-3-Clause
 */

/**
 * Identifier constants for data store errors.
 */
const ErrorIds = module.exports = {
  UnexpectedError: 'unexpected-error',
  InvalidRequestStructure: 'invalid-request-structure',
  UnknownResource: 'unknown-resource',
  ItemAlreadyExists: 'item-already-exists',
  InvalidItemId: 'invalid-item-id',
  UnsupportedOperation: 'unsupported-operation'
};
Object.freeze(ErrorIds);
