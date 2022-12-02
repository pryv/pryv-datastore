## Modules

<dl>
<dt><a href="#module_DataStore">DataStore</a></dt>
<dd><p>Data store prototype object.
All data store implementations inherit from this via <a href="datastore#createDataStore">datastore#createDataStore</a>.</p>
</dd>
<dt><a href="#module_defaults">defaults</a></dt>
<dd><p>Data store constants and helper methods.</p>
</dd>
<dt><a href="#module_errors">errors</a></dt>
<dd><p>Helper &quot;factory&quot; methods for data store errors (see error ids).</p>
</dd>
<dt><a href="#module_datastore">datastore</a></dt>
<dd></dd>
<dt><a href="#module_UserEvents">UserEvents</a></dt>
<dd><p>Prototype object for per-user events data.
<a href="DataStore#events">DataStore#events</a> must return an implementation that inherits from this via <a href="datastore#createUserEvents">datastore#createUserEvents</a>.</p>
</dd>
<dt><a href="#module_UserStreams">UserStreams</a></dt>
<dd><p>Prototype object for per-user streams data.
<a href="DataStore#streams">DataStore#streams</a> must return an implementation that inherits from this via <a href="datastore#createUserStreams">datastore#createUserStreams</a>.</p>
</dd>
</dl>

## Constants

<dl>
<dt><a href="#ErrorIds">ErrorIds</a></dt>
<dd><p>Identifier constants for data store errors.</p>
</dd>
<dt><a href="#PryvDataStoreError">PryvDataStoreError</a></dt>
<dd></dd>
<dt><a href="#DataStore">DataStore</a></dt>
<dd></dd>
<dt><a href="#errors">errors</a></dt>
<dd></dd>
<dt><a href="#errors">errors</a></dt>
<dd></dd>
</dl>

## Functions

<dl>
<dt><a href="#PryvDataStoreError">PryvDataStoreError(id, message, [data], [innerError])</a></dt>
<dd><p>Constructor for data store errors.</p>
</dd>
</dl>

## Typedefs

<dl>
<dt><a href="#identifier">identifier</a> : <code>string</code></dt>
<dd><p>A string uniquely identifying an object (user, event, stream, etc.)</p>
</dd>
<dt><a href="#timestamp">timestamp</a> : <code>number</code></dt>
<dd><p>A positive floating-point number representing the number of seconds since a reference time (Unix epoch time).</p>
</dd>
<dt><a href="#PryvDataStoreError">PryvDataStoreError</a></dt>
<dd></dd>
<dt><a href="#AttachmentItem">AttachmentItem</a> : <code>object</code></dt>
<dd><p>Object to pass when creating events with attachments or adding attachments to events</p>
</dd>
<dt><a href="#AttachmentResponseItem">AttachmentResponseItem</a> : <code>object</code></dt>
<dd><p>Informations sent by the store after saving attachment</p>
</dd>
</dl>

<a name="module_DataStore"></a>

## DataStore
Data store prototype object.
All data store implementations inherit from this via [datastore#createDataStore](datastore#createDataStore).


* [DataStore](#module_DataStore)
    * [.id](#module_DataStore.id) : <code>string</code>
    * [.name](#module_DataStore.name) : <code>string</code>
    * [.settings](#module_DataStore.settings) : <code>object</code>
    * [.streams](#module_DataStore.streams) : <code>UserStreams</code>
    * [.events](#module_DataStore.events) : <code>UserEvents</code>
    * [.init()](#module_DataStore.init) ⇒ [<code>DataStore</code>](#DataStore)
    * [.setUserData(userId, data)](#module_DataStore.setUserData)
    * [.getUserData(userId)](#module_DataStore.getUserData) ⇒ <code>object</code>
    * [.deleteUser(userId)](#module_DataStore.deleteUser)
    * [.getUserStorageSize(userId)](#module_DataStore.getUserStorageSize) ⇒ <code>number</code>

<a name="module_DataStore.id"></a>

### DataStore.id : <code>string</code>
The data store's unique identifier (loaded from Pryv.io platform settings at creation).

**Kind**: static property of [<code>DataStore</code>](#module_DataStore)  
<a name="module_DataStore.name"></a>

### DataStore.name : <code>string</code>
The data store's name (loaded from Pryv.io platform settings at creation).

**Kind**: static property of [<code>DataStore</code>](#module_DataStore)  
<a name="module_DataStore.settings"></a>

### DataStore.settings : <code>object</code>
The data store's configuration settings (loaded from platform settings at creation).

**Kind**: static property of [<code>DataStore</code>](#module_DataStore)  
<a name="module_DataStore.streams"></a>

### DataStore.streams : <code>UserStreams</code>
The [UserStreams](UserStreams) implementation.

**Kind**: static property of [<code>DataStore</code>](#module_DataStore)  
<a name="module_DataStore.events"></a>

### DataStore.events : <code>UserEvents</code>
The [UserEvents](UserEvents) implementation.

**Kind**: static property of [<code>DataStore</code>](#module_DataStore)  
<a name="module_DataStore.init"></a>

### DataStore.init() ⇒ [<code>DataStore</code>](#DataStore)
Initialize the store.

**Kind**: static method of [<code>DataStore</code>](#module_DataStore)  
**Returns**: [<code>DataStore</code>](#DataStore) - The data store object itself (for method chaining).  
<a name="module_DataStore.setUserData"></a>

### DataStore.setUserData(userId, data)
TODO: implement
Set store-specific key-value data (e.g. credentials or settings) for the given user.
This is called for both creating and updating the data.

**Kind**: static method of [<code>DataStore</code>](#module_DataStore)  

| Param | Type |
| --- | --- |
| userId | [<code>identifier</code>](#identifier) | 
| data | <code>object</code> | 

<a name="module_DataStore.getUserData"></a>

### DataStore.getUserData(userId) ⇒ <code>object</code>
TODO: implement
Get store-specific key-value data for the given user.
This should never return secrets such as passwords, tokens etc. which should be write-only via [#setUserData](#setUserData).

**Kind**: static method of [<code>DataStore</code>](#module_DataStore)  

| Param | Type |
| --- | --- |
| userId | [<code>identifier</code>](#identifier) | 

<a name="module_DataStore.deleteUser"></a>

### DataStore.deleteUser(userId)
Called when the given user is deleted from Pryv.io, to let the store delete the related data if appropriate.

**Kind**: static method of [<code>DataStore</code>](#module_DataStore)  

| Param | Type |
| --- | --- |
| userId | [<code>identifier</code>](#identifier) | 

<a name="module_DataStore.getUserStorageSize"></a>

### DataStore.getUserStorageSize(userId) ⇒ <code>number</code>
Return the total amount of storage used by the given user, in bytes.

**Kind**: static method of [<code>DataStore</code>](#module_DataStore)  

| Param | Type |
| --- | --- |
| userId | [<code>identifier</code>](#identifier) | 

<a name="module_defaults"></a>

## defaults
Data store constants and helper methods.


* [defaults](#module_defaults)
    * _static_
        * [.UnknownDate](#module_defaults.UnknownDate) : <code>number</code>
        * [.SystemAccessId](#module_defaults.SystemAccessId) : <code>string</code>
        * [.UnknownAccessId](#module_defaults.UnknownAccessId) : <code>string</code>
        * [.ExternalAccessIdPrefix](#module_defaults.ExternalAccessIdPrefix) : <code>string</code>
    * _inner_
        * [~applyOnEvent(event)](#module_defaults..applyOnEvent)
        * [~applyOnEvents(events)](#module_defaults..applyOnEvents)
        * [~applyOnStream(stream, [parentId])](#module_defaults..applyOnStream)
        * [~applyOnStreams(streams, [parentId])](#module_defaults..applyOnStreams)

<a name="module_defaults.UnknownDate"></a>

### defaults.UnknownDate : <code>number</code>
Timestamp representing an unknown creation/modification time.

**Kind**: static property of [<code>defaults</code>](#module_defaults)  
<a name="module_defaults.SystemAccessId"></a>

### defaults.SystemAccessId : <code>string</code>
'System' access id for created by / modified by.

**Kind**: static property of [<code>defaults</code>](#module_defaults)  
<a name="module_defaults.UnknownAccessId"></a>

### defaults.UnknownAccessId : <code>string</code>
'Unknown' access id for created by / modified by.

**Kind**: static property of [<code>defaults</code>](#module_defaults)  
<a name="module_defaults.ExternalAccessIdPrefix"></a>

### defaults.ExternalAccessIdPrefix : <code>string</code>
Access id prefix used to tag external identifiers for created by / modified by.

**Kind**: static property of [<code>defaults</code>](#module_defaults)  
<a name="module_defaults..applyOnEvent"></a>

### defaults~applyOnEvent(event)
Adds missing mandatory properties to the given event.
**Note**: mutates the event object.

**Kind**: inner method of [<code>defaults</code>](#module_defaults)  

| Param | Type |
| --- | --- |
| event | <code>Object</code> | 

<a name="module_defaults..applyOnEvents"></a>

### defaults~applyOnEvents(events)
Adds missing mandatory properties to the given events.
**Note**: mutates the event objects.

**Kind**: inner method of [<code>defaults</code>](#module_defaults)  

| Param | Type |
| --- | --- |
| events | <code>Array.&lt;Object&gt;</code> | 

<a name="module_defaults..applyOnStream"></a>

### defaults~applyOnStream(stream, [parentId])
Adds missing mandatory properties to the given stream and its children (if present).
**Note**: mutates the stream object.

**Kind**: inner method of [<code>defaults</code>](#module_defaults)  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| stream | <code>Object</code> |  |  |
| [parentId] | <code>string</code> | <code>null</code> | for parentId of the stream |

<a name="module_defaults..applyOnStreams"></a>

### defaults~applyOnStreams(streams, [parentId])
Adds missing mandatory properties to the given streams and their children (if present).
**Note**: mutates the stream objects.

**Kind**: inner method of [<code>defaults</code>](#module_defaults)  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| streams | <code>Array.&lt;Object&gt;</code> |  |  |
| [parentId] | <code>string</code> | <code>null</code> | for parentId of the stream |

<a name="module_errors"></a>

## errors
Helper "factory" methods for data store errors (see error ids).


* [errors](#module_errors)
    * [.unexpectedError(message, data, innerError)](#module_errors.unexpectedError) ⇒ [<code>PryvDataStoreError</code>](#PryvDataStoreError)
    * [.invalidRequestStructure(message, data, innerError)](#module_errors.invalidRequestStructure) ⇒ [<code>PryvDataStoreError</code>](#PryvDataStoreError)
    * [.unknownResource(resourceType, id, innerError)](#module_errors.unknownResource) ⇒ [<code>PryvDataStoreError</code>](#PryvDataStoreError)
    * [.itemAlreadyExists(resourceType, conflictingKeys, innerError)](#module_errors.itemAlreadyExists) ⇒ [<code>PryvDataStoreError</code>](#PryvDataStoreError)
    * [.invalidItemId(message, data, innerError)](#module_errors.invalidItemId) ⇒ [<code>PryvDataStoreError</code>](#PryvDataStoreError)
    * [.unsupportedOperation(message, data, innerError)](#module_errors.unsupportedOperation) ⇒ [<code>PryvDataStoreError</code>](#PryvDataStoreError)

<a name="module_errors.unexpectedError"></a>

### errors.unexpectedError(message, data, innerError) ⇒ [<code>PryvDataStoreError</code>](#PryvDataStoreError)
**Kind**: static method of [<code>errors</code>](#module_errors)  

| Param | Type |
| --- | --- |
| message | <code>string</code> | 
| data | <code>\*</code> | 
| innerError | <code>Error</code> | 

<a name="module_errors.invalidRequestStructure"></a>

### errors.invalidRequestStructure(message, data, innerError) ⇒ [<code>PryvDataStoreError</code>](#PryvDataStoreError)
**Kind**: static method of [<code>errors</code>](#module_errors)  

| Param | Type |
| --- | --- |
| message | <code>string</code> | 
| data | <code>\*</code> | 
| innerError | <code>Error</code> | 

<a name="module_errors.unknownResource"></a>

### errors.unknownResource(resourceType, id, innerError) ⇒ [<code>PryvDataStoreError</code>](#PryvDataStoreError)
**Kind**: static method of [<code>errors</code>](#module_errors)  

| Param | Type |
| --- | --- |
| resourceType | <code>string</code> | 
| id | <code>string</code> | 
| innerError | <code>Error</code> | 

<a name="module_errors.itemAlreadyExists"></a>

### errors.itemAlreadyExists(resourceType, conflictingKeys, innerError) ⇒ [<code>PryvDataStoreError</code>](#PryvDataStoreError)
**Kind**: static method of [<code>errors</code>](#module_errors)  

| Param | Type |
| --- | --- |
| resourceType | <code>string</code> | 
| conflictingKeys | <code>Array.&lt;string&gt;</code> | 
| innerError | <code>Error</code> | 

<a name="module_errors.invalidItemId"></a>

### errors.invalidItemId(message, data, innerError) ⇒ [<code>PryvDataStoreError</code>](#PryvDataStoreError)
**Kind**: static method of [<code>errors</code>](#module_errors)  

| Param | Type |
| --- | --- |
| message | <code>string</code> | 
| data | <code>\*</code> | 
| innerError | <code>Error</code> | 

<a name="module_errors.unsupportedOperation"></a>

### errors.unsupportedOperation(message, data, innerError) ⇒ [<code>PryvDataStoreError</code>](#PryvDataStoreError)
**Kind**: static method of [<code>errors</code>](#module_errors)  

| Param | Type |
| --- | --- |
| message | <code>string</code> | 
| data | <code>\*</code> | 
| innerError | <code>Error</code> | 

<a name="module_datastore"></a>

## datastore

* [datastore](#module_datastore)
    * [.createDataStore(implementation)](#module_datastore.createDataStore) ⇒ [<code>DataStore</code>](#DataStore)
    * [.createUserStreams(implementation)](#module_datastore.createUserStreams) ⇒ <code>UserStreams</code>
    * [.createUserEvents(implementation)](#module_datastore.createUserEvents) ⇒ <code>UserEvents</code>

<a name="module_datastore.createDataStore"></a>

### datastore.createDataStore(implementation) ⇒ [<code>DataStore</code>](#DataStore)
Create a new data store object with the given implementation.

**Kind**: static method of [<code>datastore</code>](#module_datastore)  

| Param | Type | Description |
| --- | --- | --- |
| implementation | <code>Object</code> | An object implementing [DataStore](#DataStore) methods |

<a name="module_datastore.createUserStreams"></a>

### datastore.createUserStreams(implementation) ⇒ <code>UserStreams</code>
Create a new user streams object with the given implementation.

**Kind**: static method of [<code>datastore</code>](#module_datastore)  

| Param | Type | Description |
| --- | --- | --- |
| implementation | <code>Object</code> | An object implementing [UserStreams](UserStreams) methods |

<a name="module_datastore.createUserEvents"></a>

### datastore.createUserEvents(implementation) ⇒ <code>UserEvents</code>
Create a new user events object with the given implementation.

**Kind**: static method of [<code>datastore</code>](#module_datastore)  

| Param | Type | Description |
| --- | --- | --- |
| implementation | <code>Object</code> | An object implementing [UserEvents](UserEvents) methods |

<a name="module_UserEvents"></a>

## UserEvents
Prototype object for per-user events data.
[DataStore#events](DataStore#events) must return an implementation that inherits from this via [datastore#createUserEvents](datastore#createUserEvents).


* [UserEvents](#module_UserEvents)
    * [.get(userId, params)](#module_UserEvents.get) ⇒ <code>Array.&lt;Event&gt;</code>
    * [.getStreamed(userId, params)](#module_UserEvents.getStreamed) ⇒ <code>ReadableStream</code>
    * [.getOne(userId, eventId)](#module_UserEvents.getOne)
    * [.create(userId, eventData)](#module_UserEvents.create) ⇒ <code>Event</code>
    * [.saveAttachedFiles(userId, partialEventData, attachmentsItems)](#module_UserEvents.saveAttachedFiles) ⇒ [<code>AttachmentResponseItem</code>](#AttachmentResponseItem)
    * [.getAttachedFile(userId, eventData, fileId)](#module_UserEvents.getAttachedFile) ⇒ <code>stream.Readable</code>
    * [.deleteAttachedFile(userId, eventData, fileId)](#module_UserEvents.deleteAttachedFile) ⇒ [<code>AttachmentResponseItem</code>](#AttachmentResponseItem)
    * [.update(userId, eventData)](#module_UserEvents.update) ⇒ <code>boolean</code>
    * [.delete(userId, eventId, params)](#module_UserEvents.delete) ⇒ <code>Event</code> \| <code>EventDeletionItem</code>

<a name="module_UserEvents.get"></a>

### UserEvents.get(userId, params) ⇒ <code>Array.&lt;Event&gt;</code>
Get events for this user.

**Kind**: static method of [<code>UserEvents</code>](#module_UserEvents)  
**See**: [Get events in Pryv.io API reference](https://api.pryv.com/reference/#get-events)  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| userId | [<code>identifier</code>](#identifier) |  |  |
| params | <code>object</code> |  | Query parameters |
| [params.withDeletions] | <code>boolean</code> | <code>false</code> | Include event deletions in the results. |
| [params.deletedSince] | [<code>timestamp</code>](#timestamp) | <code></code> | Only return deleted events, sorted by deletion date descending. |
| [params.includeHistory] | <code>boolean</code> | <code>false</code> | Include change history for events. |

<a name="module_UserEvents.getStreamed"></a>

### UserEvents.getStreamed(userId, params) ⇒ <code>ReadableStream</code>
Get events as a stream for this user.

**Kind**: static method of [<code>UserEvents</code>](#module_UserEvents)  
**See**: [Get events in Pryv.io API reference](https://api.pryv.com/reference/#get-events)  

| Param | Type | Description |
| --- | --- | --- |
| userId | [<code>identifier</code>](#identifier) |  |
| params | <code>object</code> | event query |

<a name="module_UserEvents.getOne"></a>

### UserEvents.getOne(userId, eventId)
TODO: implement

**Kind**: static method of [<code>UserEvents</code>](#module_UserEvents)  

| Param | Type |
| --- | --- |
| userId | [<code>identifier</code>](#identifier) | 
| eventId | [<code>identifier</code>](#identifier) | 

<a name="module_UserEvents.create"></a>

### UserEvents.create(userId, eventData) ⇒ <code>Event</code>
**Kind**: static method of [<code>UserEvents</code>](#module_UserEvents)  
**Returns**: <code>Event</code> - - The created event  
**Throws**:

- [<code>PryvDataStoreError</code>](#PryvDataStoreError) with id `item-already-exists`
- [<code>PryvDataStoreError</code>](#PryvDataStoreError) with id `invalid-item-id`
- [<code>PryvDataStoreError</code>](#PryvDataStoreError) with id `resource-is-readonly` if either storage or parent stream is read-only

**See**: [Create events in Pryv.io API reference](https://api.pryv.com/reference/#create-event)  

| Param | Type |
| --- | --- |
| userId | [<code>identifier</code>](#identifier) | 
| eventData | <code>EventData</code> | 

<a name="module_UserEvents.saveAttachedFiles"></a>

### UserEvents.saveAttachedFiles(userId, partialEventData, attachmentsItems) ⇒ [<code>AttachmentResponseItem</code>](#AttachmentResponseItem)
**Kind**: static method of [<code>UserEvents</code>](#module_UserEvents)  
**Returns**: [<code>AttachmentResponseItem</code>](#AttachmentResponseItem) - - The ids and other information related to the attachments  
**Throws**:

- [<code>PryvDataStoreError</code>](#PryvDataStoreError) with id `item-already-exists`
- [<code>PryvDataStoreError</code>](#PryvDataStoreError) with id `invalid-item-id`
- [<code>PryvDataStoreError</code>](#PryvDataStoreError) with id `resource-is-readonly` if either storage or parent stream is read-only


| Param | Type | Description |
| --- | --- | --- |
| userId | [<code>identifier</code>](#identifier) |  |
| partialEventData | <code>any</code> | eventData (without the new attachments and integrity property) |
| attachmentsItems | [<code>Array.&lt;AttachmentItem&gt;</code>](#AttachmentItem) | Array of attachments informations. |

<a name="module_UserEvents.getAttachedFile"></a>

### UserEvents.getAttachedFile(userId, eventData, fileId) ⇒ <code>stream.Readable</code>
Retrieve the specified file as a stream.

**Kind**: static method of [<code>UserEvents</code>](#module_UserEvents)  

| Param | Type |
| --- | --- |
| userId | [<code>identifier</code>](#identifier) | 
| eventData | <code>\*</code> | 
| fileId | [<code>identifier</code>](#identifier) | 

<a name="module_UserEvents.deleteAttachedFile"></a>

### UserEvents.deleteAttachedFile(userId, eventData, fileId) ⇒ [<code>AttachmentResponseItem</code>](#AttachmentResponseItem)
Delete the specified file.

**Kind**: static method of [<code>UserEvents</code>](#module_UserEvents)  
**Returns**: [<code>AttachmentResponseItem</code>](#AttachmentResponseItem) - - The ids and other information related to the attachments  
**Throws**:

- [<code>PryvDataStoreError</code>](#PryvDataStoreError) with id `invalid-item-id`
- [<code>PryvDataStoreError</code>](#PryvDataStoreError) with id `resource-is-readonly` if either storage or parent stream is read-only


| Param | Type |
| --- | --- |
| userId | [<code>identifier</code>](#identifier) | 
| eventData | <code>any</code> | 
| fileId | [<code>identifier</code>](#identifier) | 

<a name="module_UserEvents.update"></a>

### UserEvents.update(userId, eventData) ⇒ <code>boolean</code>
Fully replace an event with new Data

**Kind**: static method of [<code>UserEvents</code>](#module_UserEvents)  
**Returns**: <code>boolean</code> - - true if an event was updated  
**Throws**:

- [<code>PryvDataStoreError</code>](#PryvDataStoreError) with id `resource-is-readonly` if either storage or parent stream is read-only


| Param | Type | Description |
| --- | --- | --- |
| userId | [<code>identifier</code>](#identifier) |  |
| eventData | <code>any</code> | New event data |

<a name="module_UserEvents.delete"></a>

### UserEvents.delete(userId, eventId, params) ⇒ <code>Event</code> \| <code>EventDeletionItem</code>
**Kind**: static method of [<code>UserEvents</code>](#module_UserEvents)  
**Returns**: <code>Event</code> \| <code>EventDeletionItem</code> - - The trashed Event  
**Throws**:

- [<code>PryvDataStoreError</code>](#PryvDataStoreError) with id `item-already-exists`
- [<code>PryvDataStoreError</code>](#PryvDataStoreError) with id `resource-is-readonly` if either storage or parent stream is read-only

**See**: https://api.pryv.com/reference/#delete-event  

| Param | Type |
| --- | --- |
| userId | [<code>identifier</code>](#identifier) | 
| eventId | [<code>identifier</code>](#identifier) | 
| params | <code>object</code> | 

<a name="module_UserStreams"></a>

## UserStreams
Prototype object for per-user streams data.
[DataStore#streams](DataStore#streams) must return an implementation that inherits from this via [datastore#createUserStreams](datastore#createUserStreams).


* [UserStreams](#module_UserStreams)
    * [.get(userId, params)](#module_UserStreams.get) ⇒ <code>Stream</code> \| <code>null</code>
    * [.getDeletions(userId, deletionSince)](#module_UserStreams.getDeletions)
    * [.create(userId)](#module_UserStreams.create) ⇒ <code>Stream</code>
    * [.update(userId)](#module_UserStreams.update) ⇒ <code>Stream</code>
    * [.delete(userId, streamId, params)](#module_UserStreams.delete) ⇒ <code>Stream</code> \| <code>StreamDeletionItem</code>

<a name="module_UserStreams.get"></a>

### UserStreams.get(userId, params) ⇒ <code>Stream</code> \| <code>null</code>
Get the stream that will be set as root for all Stream Structure of this Data Store.

**Kind**: static method of [<code>UserStreams</code>](#module_UserStreams)  
**Returns**: <code>Stream</code> \| <code>null</code> - - the stream or null if not found:  
**See**: https://api.pryv.com/reference/#get-streams  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| userId | [<code>identifier</code>](#identifier) |  |  |
| params | <code>object</code> |  |  |
| [params.id] | [<code>identifier</code>](#identifier) |  | null, means root streamId. Notice parentId is not implemented by stores |
| [params.expandChildren] | <code>number</code> | <code>false</code> | ← TODO check if correct |
| [params.excludeIds] | [<code>Array.&lt;identifier&gt;</code>](#identifier) |  | list of streamIds to exclude from query. if expandChildren is >0 or < 0, children of excludedIds should be excludded too |
| [params.includeTrashed] | <code>boolean</code> |  | (equivalent to state = 'all') |

<a name="module_UserStreams.getDeletions"></a>

### UserStreams.getDeletions(userId, deletionSince)
Get a list of deleted ids since

**Kind**: static method of [<code>UserStreams</code>](#module_UserStreams)  

| Param | Type |
| --- | --- |
| userId | [<code>identifier</code>](#identifier) | 
| deletionSince | [<code>timestamp</code>](#timestamp) | 

<a name="module_UserStreams.create"></a>

### UserStreams.create(userId) ⇒ <code>Stream</code>
**Kind**: static method of [<code>UserStreams</code>](#module_UserStreams)  
**Returns**: <code>Stream</code> - - The created Stream  
**Throws**:

- item-already-exists
- invalid-item-id
- resource-is-readonly <=== Thrown either because Storage or Parent stream is readonly

**See**: https://api.pryv.com/reference/#create-stream  

| Param | Type |
| --- | --- |
| userId | [<code>identifier</code>](#identifier) | 

<a name="module_UserStreams.update"></a>

### UserStreams.update(userId) ⇒ <code>Stream</code>
**Kind**: static method of [<code>UserStreams</code>](#module_UserStreams)  
**Returns**: <code>Stream</code> - - The update Stream  
**Throws**:

- item-already-exists
- resource-is-readonly <=== Thrown because item cannot be updated

**See**: https://api.pryv.com/reference/#update-stream  

| Param | Type |
| --- | --- |
| userId | [<code>identifier</code>](#identifier) | 

<a name="module_UserStreams.delete"></a>

### UserStreams.delete(userId, streamId, params) ⇒ <code>Stream</code> \| <code>StreamDeletionItem</code>
**Kind**: static method of [<code>UserStreams</code>](#module_UserStreams)  
**Returns**: <code>Stream</code> \| <code>StreamDeletionItem</code> - - The trashed Stream  
**Throws**:

- item-already-exists
- resource-is-readonly <=== Thrown because item cannot be updated

**See**: https://api.pryv.com/reference/#delete-stream  

| Param | Type |
| --- | --- |
| userId | [<code>identifier</code>](#identifier) | 
| streamId | [<code>identifier</code>](#identifier) | 
| params | <code>object</code> | 

<a name="ErrorIds"></a>

## ErrorIds
Identifier constants for data store errors.

**Kind**: global constant  
<a name="PryvDataStoreError"></a>

## PryvDataStoreError
**Kind**: global constant  
**License**: Copyright (C) 2012–2022 Pryv S.A. https://pryv.com - All Rights Reserved
This program is free software; you can redistribute it and/or modify it
under the terms of the 3-Clause BSD License
SPDX-License-Identifier: BSD-3-Clause  
<a name="DataStore"></a>

## DataStore
**Kind**: global constant  
**License**: Copyright (C) 2012–2022 Pryv S.A. https://pryv.com - All Rights Reserved
This program is free software; you can redistribute it and/or modify it
under the terms of the 3-Clause BSD License
SPDX-License-Identifier: BSD-3-Clause  
<a name="errors"></a>

## errors
**Kind**: global constant  
**License**: Copyright (C) 2012–2022 Pryv S.A. https://pryv.com - All Rights Reserved
This program is free software; you can redistribute it and/or modify it
under the terms of the 3-Clause BSD License
SPDX-License-Identifier: BSD-3-Clause  
<a name="errors"></a>

## errors
**Kind**: global constant  
**License**: Copyright (C) 2012–2022 Pryv S.A. https://pryv.com - All Rights Reserved
This program is free software; you can redistribute it and/or modify it
under the terms of the 3-Clause BSD License
SPDX-License-Identifier: BSD-3-Clause  
<a name="PryvDataStoreError"></a>

## PryvDataStoreError(id, message, [data], [innerError])
Constructor for data store errors.

**Kind**: global function  

| Param | Type | Default |
| --- | --- | --- |
| id | <code>string</code> |  | 
| message | <code>string</code> |  | 
| [data] | <code>\*</code> | <code></code> | 
| [innerError] | <code>Error</code> | <code></code> | 

<a name="identifier"></a>

## identifier : <code>string</code>
A string uniquely identifying an object (user, event, stream, etc.)

**Kind**: global typedef  
<a name="timestamp"></a>

## timestamp : <code>number</code>
A positive floating-point number representing the number of seconds since a reference time (Unix epoch time).

**Kind**: global typedef  
<a name="PryvDataStoreError"></a>

## PryvDataStoreError
**Kind**: global typedef  
**Properties**

| Type |
| --- |
| <code>id</code> | 
| <code>message</code> | 
| <code>data</code> | 
| <code>innerError</code> | 

<a name="AttachmentItem"></a>

## AttachmentItem : <code>object</code>
Object to pass when creating events with attachments or adding attachments to events

**Kind**: global typedef  
**Properties**

| Name | Type | Description |
| --- | --- | --- |
| filename | <code>string</code> | fileName |
| [size] | <code>number</code> | The size of the attachment |
| attachmentData | <code>ReadableStream</code> |  |
| [integrity] | <code>integrity</code> | The integrity checksum of the attachment |

<a name="AttachmentResponseItem"></a>

## AttachmentResponseItem : <code>object</code>
Informations sent by the store after saving attachment

**Kind**: global typedef  

| Param | Type | Description |
| --- | --- | --- |
| id | <code>string</code> | mandatory id of the attachement - unique - per event |

