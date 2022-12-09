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
