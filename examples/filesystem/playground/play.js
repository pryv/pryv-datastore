const fsds = require('../index.js');
const path = require('path');

fsds.id = 'fsds';
fsds.name = 'File System';
fsds.settings = { basePath: path.resolve(__dirname, '../../../') };

// ovverride iPath
fsds.iPath = iPath;
function iPath (userId, itemId) {
  itemId = itemId || '';
  return path.join(fsds.settings.basePath, itemId);
}

(async () => {
  await fsds.init();
  console.log(await fsds.streams.get('bob', { id: null, expandChildren: 1 }));
})();
