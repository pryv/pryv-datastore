/**
 * @license
 * Copyright (C) 2021–2023 Pryv S.A. https://pryv.com - All Rights Reserved
 * This program is free software; you can redistribute it and/or modify it
 * under the terms of the 3-Clause BSD License
 * SPDX-License-Identifier: BSD-3-Clause
 */
const zlib = require('zlib');

module.exports = {
  subPathForId,
  idForSubPath,
  isChildOf
};

function subPathForId (itemId) {
  if (itemId == null || itemId === '*') return '';
  return zlib.inflateSync(Buffer.from(itemId, 'base64url')).toString();
}

function idForSubPath (subPath) {
  if (!subPath || subPath.length === 0) return null;
  return zlib.deflateSync(subPath).toString('base64url');
}

function isChildOf (childPath, parentPath) {
  if (parentPath === '*') return true;
  return childPath.startsWith(parentPath);
}
