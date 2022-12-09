/**
 * @typedef {
 *  rootStream: string
 *  allows: callback
 * } streamQueryEntry
 */

/**
 * Utility for streamqueries when the storage support isChildOf fast resolution.
 * @param {*} streamQuery - a StreamQuery
 * @param {*} isChildOf - a Function taking two parameters
 * @returns { entries: Array<streamQueryEntry> }
 */
module.exports = function streamsInspectorForStreamQuery (streamQuery, isChildOf) {
  const entries = [];
  for (const block of streamQuery) {
    const blockEntryStreams = preProcessQueryForSingleStreamQuery(block, isChildOf);
    for (const rootStream of Object.keys(blockEntryStreams)) {
      const andQuery = streamQuery;

      function allows (testedStream) {
        // must be a child
        if (!isChildOf(testedStream, rootStream)) return false;
        if (andQuery == null) return true;
        return andQuerytest(testedStream, andQuery, isChildOf);
      }
      entries.push({ rootStream, allows });
    }
  }
  return { entries };
};

// return false if one of the test is false
// true otherwise
function andQuerytest (testedStream, andQueryArray, isChildOf) {
  for (const andQueryItem of andQueryArray) {
    for (const andQueryItemKey of Object.keys(andQueryItem)) {
      if (andQueryItemKey === 'any') {
        if (!anyQueryTest(testedStream, andQueryItem.any, isChildOf)) return false;
      }
      if (andQueryItemKey === 'not') {
        if (!notQueryTest(testedStream, andQueryItem.not, isChildOf)) return false;
      }
    }
  }
  return true;
}

// return true if one item match the any line
function anyQueryTest (testedStream, anyQueryArray, isChildOf) {
  let anyOK = false;
  // one should be a child or Equal to the streamPath
  for (const anyStreamPathItem of anyQueryArray) {
    if (anyStreamPathItem === testedStream || isChildOf(testedStream, anyStreamPathItem)) {
      anyOK = true;
    }
  }
  return anyOK;
}

// return true if none item match the any line
function notQueryTest (testedStream, notQueryArray, isChildOf) {
  // none should be a parent or Equal to the streamPath
  for (const notStreamPathItem of notQueryArray) {
    if (isChildOf(testedStream, notStreamPathItem)) {
      return false;
    }
  }
  return true;
}

function preProcessQueryForSingleStreamQuery (block, isChildOf) {
  const entryStreams = {}; // list of streams to start looking for events.

  // Only keep the parents if an ANY query contains childs and parents.
  if (block.any && block.any.length > 0) {
    if (block.any[0] === '*') {
      entryStreams['*'] = []; // all streams - no need to look further.
    } else {
      for (const anyItem of block.any) {
        let addItem = true;
        for (const item of Object.keys(entryStreams)) {
          if (isChildOf(anyItem, item)) { // no need to add
            addItem = false;
          } else if (isChildOf(item, anyItem)) { // replace extisting parent
            delete entryStreams[item];
            entryStreams[anyItem] = [];
            addItem = false; // no need to add twice
          }
        }
        if (addItem) entryStreams[anyItem] = [];
      }
    }
  }
  return entryStreams;
}
