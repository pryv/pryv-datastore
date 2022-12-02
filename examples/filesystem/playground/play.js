const fsds = require('../index.js');
const path = require('path');

fsds.id = 'fsds';
fsds.name = 'File System';
fsds.settings = { basePath: path.resolve(__dirname, '../../../') };

// ovverride fullPathForSub
fsds.fullPathForSub = fullPathForSub;
function fullPathForSub (userId, itemName) {
  itemName = itemName || '';
  return path.join(fsds.settings.basePath, itemName);
}

(async () => {
  await fsds.init();
  console.log(await fsds.streams.get('bob', {
    id: 'examples',
    excludedIds: ['eJxLrUjMLchJLdYvSi0uAQAlPAVN'],
    expandChildren: 1
  }));

  try {
    console.log(await fsds.streams.create('bob', {
      name: 'temp'
    }));
  } catch (err) {
    console.log(err, err.messsage);
  }
})();
