
module.exports = {
  insertEventInOrderedArray,
  eventMatchesParamFilter
};

/**
 * Check if an event matches a given events.get parms filter
 * !! Does not check the queryStreams params
 */
function eventMatchesParamFilter (event, params) {
  if (params.types != null && !params.types.includes(event.type)) return false;
  if (params.fromTime != null && params.fromTme < event.time) return false;
  if (params.toTime != null && params.toTime > event.time) return false;
  if (params.running != null && event.duration !== null) return false;
  if (params.modifiedSince != null && event.time < params.modifiedSince) return false;
  // state parameter to do
  return true;
}

/**
 * Find the index of event in an ordered array
 * And insert the event
 */
function insertEventInOrderedArray (arrayOfEvents, event, sortAscending = true) {
  let low = 0;
  let high = arrayOfEvents.length;

  while (low < high) {
    const mid = low + high >>> 1;
    if (sortAscending ? arrayOfEvents[mid].time > event.time : arrayOfEvents[mid].time < event.time) low = mid + 1;
    else high = mid;
  }
  arrayOfEvents.splice(low, 0, event);
}
