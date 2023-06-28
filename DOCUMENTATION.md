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
<dt><a href="#UserStreams">UserStreams</a> : <code>undefined</code></dt>
<dd></dd>
<dt><a href="#UserEvents">UserEvents</a> : <code>undefined</code></dt>
<dd></dd>
<dt><a href="#FnKeyValueGetAll">FnKeyValueGetAll</a> ⇒ <code>object</code></dt>
<dd></dd>
<dt><a href="#FnKeyValueGet">FnKeyValueGet</a> ⇒ <code>*</code></dt>
<dd></dd>
<dt><a href="#FnKeyValueSet">FnKeyValueSet</a> ⇒ <code>void</code></dt>
<dd></dd>
<dt><a href="#KeyValueData">KeyValueData</a> : <code>object</code></dt>
<dd></dd>
<dt><a href="#StoreInitializationParams">StoreInitializationParams</a> : <code>object</code></dt>
<dd></dd>
<dt><a href="#FnLog">FnLog</a> : <code>function</code></dt>
<dd></dd>
<dt><a href="#Logger">Logger</a></dt>
<dd></dd>
<dt><a href="#identifier">identifier</a> : <code>string</code></dt>
<dd></dd>
<dt><a href="#timestamp">timestamp</a> : <code>number</code></dt>
<dd></dd>
<dt><a href="#integrity">integrity</a> : <code>string</code></dt>
<dd></dd>
<dt><a href="#Event">Event</a> : <code>object</code></dt>
<dd></dd>
<dt><a href="#EventsQuery">EventsQuery</a> : <code>object</code></dt>
<dd></dd>
<dt><a href="#StreamQueryItem">StreamQueryItem</a> : <code>object</code></dt>
<dd></dd>
<dt><a href="#EventDeletionItem">EventDeletionItem</a> : <code>object</code></dt>
<dd></dd>
<dt><a href="#AttachmentItem">AttachmentItem</a> : <code>object</code></dt>
<dd><p>Object to pass when creating events with attachments or adding attachments to events</p>
</dd>
<dt><a href="#AttachmentResponseItem">AttachmentResponseItem</a> : <code>object</code></dt>
<dd><p>Informations sent by the store after saving attachment</p>
</dd>
<dt><a href="#identifier">identifier</a> : <code>string</code></dt>
<dd></dd>
<dt><a href="#timestamp">timestamp</a> : <code>number</code></dt>
<dd><p>// time in UNIX time (seconds)</p>
</dd>
<dt><a href="#Stream">Stream</a> : <code>object</code></dt>
<dd></dd>
<dt><a href="#StreamDeletionItem">StreamDeletionItem</a> : <code>object</code></dt>
<dd></dd>
</dl>

<a name="module_DataStore"></a>

## DataStore
Data store prototype object.
All data store implementations inherit from this via [datastore#createDataStore](datastore#createDataStore).


* [DataStore](#module_DataStore)
    * [.streams](#module_DataStore.streams) : [<code>UserStreams</code>](#UserStreams)
    * [.events](#module_DataStore.events) : [<code>UserEvents</code>](#UserEvents)
    * [.init(params)](#module_DataStore.init) ⇒ [<code>Promise.&lt;DataStore&gt;</code>](#DataStore)
    * [.deleteUser(userId)](#module_DataStore.deleteUser)

<a name="module_DataStore.streams"></a>

### DataStore.streams : [<code>UserStreams</code>](#UserStreams)
The [UserStreams](#UserStreams) implementation. Must be set in [init](init).

**Kind**: static property of [<code>DataStore</code>](#module_DataStore)  
<a name="module_DataStore.events"></a>

### DataStore.events : [<code>UserEvents</code>](#UserEvents)
The [UserEvents](#UserEvents) implementation. Must be set in [init](init).

**Kind**: static property of [<code>DataStore</code>](#module_DataStore)  
<a name="module_DataStore.init"></a>

### DataStore.init(params) ⇒ [<code>Promise.&lt;DataStore&gt;</code>](#DataStore)
Initialize the store.

**Kind**: static method of [<code>DataStore</code>](#module_DataStore)  
**Returns**: [<code>Promise.&lt;DataStore&gt;</code>](#DataStore) - The data store object itself (for method chaining).  

| Param | Type |
| --- | --- |
| params | [<code>StoreInitializationParams</code>](#StoreInitializationParams) | 

<a name="module_DataStore.deleteUser"></a>

### DataStore.deleteUser(userId)
Called when the given user is deleted from Pryv.io, to let the store delete the related data if appropriate.

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
    * [.unsupportedOperation(message, [data], [innerError])](#module_errors.unsupportedOperation) ⇒ [<code>PryvDataStoreError</code>](#PryvDataStoreError)

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

### errors.unsupportedOperation(message, [data], [innerError]) ⇒ [<code>PryvDataStoreError</code>](#PryvDataStoreError)
**Kind**: static method of [<code>errors</code>](#module_errors)  

| Param | Type |
| --- | --- |
| message | <code>string</code> | 
| [data] | <code>\*</code> | 
| [innerError] | <code>Error</code> | 

<a name="module_datastore"></a>

## datastore

* [datastore](#module_datastore)
    * [.createDataStore(implementation)](#module_datastore.createDataStore) ⇒ [<code>DataStore</code>](#DataStore)
    * [.createUserStreams(implementation)](#module_datastore.createUserStreams) ⇒ [<code>UserStreams</code>](#UserStreams)
    * [.createUserEvents(implementation)](#module_datastore.createUserEvents) ⇒ [<code>UserEvents</code>](#UserEvents)

<a name="module_datastore.createDataStore"></a>

### datastore.createDataStore(implementation) ⇒ [<code>DataStore</code>](#DataStore)
Create a new data store object with the given implementation.

**Kind**: static method of [<code>datastore</code>](#module_datastore)  

| Param | Type | Description |
| --- | --- | --- |
| implementation | <code>Object</code> | An object implementing [DataStore](#DataStore) methods |

<a name="module_datastore.createUserStreams"></a>

### datastore.createUserStreams(implementation) ⇒ [<code>UserStreams</code>](#UserStreams)
Create a new user streams object with the given implementation.

**Kind**: static method of [<code>datastore</code>](#module_datastore)  

| Param | Type | Description |
| --- | --- | --- |
| implementation | <code>Object</code> | An object implementing [UserStreams](#UserStreams) methods |

<a name="module_datastore.createUserEvents"></a>

### datastore.createUserEvents(implementation) ⇒ [<code>UserEvents</code>](#UserEvents)
Create a new user events object with the given implementation.

**Kind**: static method of [<code>datastore</code>](#module_datastore)  

| Param | Type | Description |
| --- | --- | --- |
| implementation | <code>Object</code> | An object implementing [UserEvents](#UserEvents) methods |

<a name="module_UserEvents"></a>

## UserEvents
Prototype object for per-user events data.
[DataStore#events](DataStore#events) must return an implementation that inherits from this via [datastore#createUserEvents](datastore#createUserEvents).


* [UserEvents](#module_UserEvents)
    * [.getOne(userId, eventId)](#module_UserEvents.getOne) ⇒ <code>Promise.&lt;(Event\|null)&gt;</code>
    * [.get(userId, query, options)](#module_UserEvents.get) ⇒ <code>Promise.&lt;Array.&lt;Event&gt;&gt;</code>
    * [.getStreamed(userId, query, options)](#module_UserEvents.getStreamed) ⇒ <code>Promise.&lt;ReadableStream.&lt;Event&gt;&gt;</code>
    * [.getDeletionsStreamed(userId, query, [options])](#module_UserEvents.getDeletionsStreamed) ⇒ <code>Promise.&lt;ReadableStream.&lt;EventDeletionItem&gt;&gt;</code>
    * [.getHistory(userId, eventId)](#module_UserEvents.getHistory) ⇒ <code>Promise.&lt;Array.&lt;Event&gt;&gt;</code>
    * [.create(userId, eventData)](#module_UserEvents.create) ⇒ [<code>Promise.&lt;Event&gt;</code>](#Event)
    * [.addAttachment(userId, eventId, attachmentItem)](#module_UserEvents.addAttachment) ⇒ [<code>Promise.&lt;Event&gt;</code>](#Event)
    * [.getAttachment(userId, eventId, fileId)](#module_UserEvents.getAttachment) ⇒ <code>Promise.&lt;ReadableStream&gt;</code>
    * [.deleteAttachment(userId, eventId, fileId)](#module_UserEvents.deleteAttachment) ⇒ [<code>Promise.&lt;AttachmentResponseItem&gt;</code>](#AttachmentResponseItem)
    * [.update(userId, eventData)](#module_UserEvents.update) ⇒ <code>Promise.&lt;boolean&gt;</code>
    * [.delete(userId, eventId)](#module_UserEvents.delete) ⇒ <code>Promise.&lt;(Event\|EventDeletionItem)&gt;</code>

<a name="module_UserEvents.getOne"></a>

### UserEvents.getOne(userId, eventId) ⇒ <code>Promise.&lt;(Event\|null)&gt;</code>
**Kind**: static method of [<code>UserEvents</code>](#module_UserEvents)  

| Param | Type |
| --- | --- |
| userId | [<code>identifier</code>](#identifier) | 
| eventId | [<code>identifier</code>](#identifier) | 

<a name="module_UserEvents.get"></a>

### UserEvents.get(userId, query, options) ⇒ <code>Promise.&lt;Array.&lt;Event&gt;&gt;</code>
Get events for this user.

**Kind**: static method of [<code>UserEvents</code>](#module_UserEvents)  

| Param | Type | Description |
| --- | --- | --- |
| userId | [<code>identifier</code>](#identifier) |  |
| query | [<code>EventsQuery</code>](#EventsQuery) | Event query |
| options | <code>Object</code> |  |

<a name="module_UserEvents.getStreamed"></a>

### UserEvents.getStreamed(userId, query, options) ⇒ <code>Promise.&lt;ReadableStream.&lt;Event&gt;&gt;</code>
Get events as a stream for this user.

**Kind**: static method of [<code>UserEvents</code>](#module_UserEvents)  

| Param | Type | Description |
| --- | --- | --- |
| userId | [<code>identifier</code>](#identifier) |  |
| query | [<code>EventsQuery</code>](#EventsQuery) | Event query |
| options | <code>Object</code> |  |

<a name="module_UserEvents.getDeletionsStreamed"></a>

### UserEvents.getDeletionsStreamed(userId, query, [options]) ⇒ <code>Promise.&lt;ReadableStream.&lt;EventDeletionItem&gt;&gt;</code>
**Kind**: static method of [<code>UserEvents</code>](#module_UserEvents)  

| Param | Type |
| --- | --- |
| userId | [<code>identifier</code>](#identifier) | 
| query | <code>Object</code> | 
| [options] | <code>Object</code> | 

<a name="module_UserEvents.getHistory"></a>

### UserEvents.getHistory(userId, eventId) ⇒ <code>Promise.&lt;Array.&lt;Event&gt;&gt;</code>
**Kind**: static method of [<code>UserEvents</code>](#module_UserEvents)  

| Param | Type |
| --- | --- |
| userId | [<code>identifier</code>](#identifier) | 
| eventId | [<code>identifier</code>](#identifier) | 

<a name="module_UserEvents.create"></a>

### UserEvents.create(userId, eventData) ⇒ [<code>Promise.&lt;Event&gt;</code>](#Event)
**Kind**: static method of [<code>UserEvents</code>](#module_UserEvents)  
**Returns**: [<code>Promise.&lt;Event&gt;</code>](#Event) - - The created event  
**Throws**:

- [<code>PryvDataStoreError</code>](#PryvDataStoreError) with id `item-already-exists`
- [<code>PryvDataStoreError</code>](#PryvDataStoreError) with id `invalid-item-id`
- [<code>PryvDataStoreError</code>](#PryvDataStoreError) with id `resource-is-readonly` if either storage or parent stream is read-only

**See**: [Create events in Pryv.io API reference](https://api.pryv.com/reference/#create-event)  

| Param | Type |
| --- | --- |
| userId | [<code>identifier</code>](#identifier) | 
| eventData | <code>object</code> | 

<a name="module_UserEvents.addAttachment"></a>

### UserEvents.addAttachment(userId, eventId, attachmentItem) ⇒ [<code>Promise.&lt;Event&gt;</code>](#Event)
Add the given file to the event.

**Kind**: static method of [<code>UserEvents</code>](#module_UserEvents)  
**Returns**: [<code>Promise.&lt;Event&gt;</code>](#Event) - - The updated event  
**Throws**:

- [<code>PryvDataStoreError</code>](#PryvDataStoreError) with id `item-already-exists`
- [<code>PryvDataStoreError</code>](#PryvDataStoreError) with id `invalid-item-id`
- [<code>PryvDataStoreError</code>](#PryvDataStoreError) with id `resource-is-readonly` if either storage or parent stream is read-only


| Param | Type | Description |
| --- | --- | --- |
| userId | [<code>identifier</code>](#identifier) |  |
| eventId | [<code>identifier</code>](#identifier) |  |
| attachmentItem | [<code>AttachmentItem</code>](#AttachmentItem) | The file's information and data |

<a name="module_UserEvents.getAttachment"></a>

### UserEvents.getAttachment(userId, eventId, fileId) ⇒ <code>Promise.&lt;ReadableStream&gt;</code>
Retrieve the specified file as a stream.

**Kind**: static method of [<code>UserEvents</code>](#module_UserEvents)  

| Param | Type |
| --- | --- |
| userId | [<code>identifier</code>](#identifier) | 
| eventId | [<code>identifier</code>](#identifier) | 
| fileId | [<code>identifier</code>](#identifier) | 

<a name="module_UserEvents.deleteAttachment"></a>

### UserEvents.deleteAttachment(userId, eventId, fileId) ⇒ [<code>Promise.&lt;AttachmentResponseItem&gt;</code>](#AttachmentResponseItem)
Delete the specified file.

**Kind**: static method of [<code>UserEvents</code>](#module_UserEvents)  
**Returns**: [<code>Promise.&lt;AttachmentResponseItem&gt;</code>](#AttachmentResponseItem) - - The ids and other information related to the attachments  
**Throws**:

- [<code>PryvDataStoreError</code>](#PryvDataStoreError) with id `invalid-item-id`
- [<code>PryvDataStoreError</code>](#PryvDataStoreError) with id `resource-is-readonly` if either storage or parent stream is read-only


| Param | Type |
| --- | --- |
| userId | [<code>identifier</code>](#identifier) | 
| eventId | [<code>identifier</code>](#identifier) | 
| fileId | [<code>identifier</code>](#identifier) | 

<a name="module_UserEvents.update"></a>

### UserEvents.update(userId, eventData) ⇒ <code>Promise.&lt;boolean&gt;</code>
Update the specified event with new data (the given event data replaces the original data).

**Kind**: static method of [<code>UserEvents</code>](#module_UserEvents)  
**Returns**: <code>Promise.&lt;boolean&gt;</code> - - true if an event was updated  
**Throws**:

- [<code>PryvDataStoreError</code>](#PryvDataStoreError) with id `resource-is-readonly` if either storage or parent stream is read-only


| Param | Type | Description |
| --- | --- | --- |
| userId | [<code>identifier</code>](#identifier) |  |
| eventData | [<code>Event</code>](#Event) | New event data |

<a name="module_UserEvents.delete"></a>

### UserEvents.delete(userId, eventId) ⇒ <code>Promise.&lt;(Event\|EventDeletionItem)&gt;</code>
**Kind**: static method of [<code>UserEvents</code>](#module_UserEvents)  
**Returns**: <code>Promise.&lt;(Event\|EventDeletionItem)&gt;</code> - - The trashed Event  
**Throws**:

- [<code>PryvDataStoreError</code>](#PryvDataStoreError) with id `item-already-exists`
- [<code>PryvDataStoreError</code>](#PryvDataStoreError) with id `resource-is-readonly` if either storage or parent stream is read-only

**See**: https://api.pryv.com/reference/#delete-event  

| Param | Type |
| --- | --- |
| userId | [<code>identifier</code>](#identifier) | 
| eventId | [<code>identifier</code>](#identifier) | 

<a name="module_UserStreams"></a>

## UserStreams
Prototype object for per-user streams data.
[DataStore#streams](DataStore#streams) must return an implementation that inherits from this via [datastore#createUserStreams](datastore#createUserStreams).


* [UserStreams](#module_UserStreams)
    * [.getOne(userId, query)](#module_UserStreams.getOne) ⇒ <code>Promise.&lt;(Stream\|null)&gt;</code>
    * [.get(userId, query)](#module_UserStreams.get) ⇒ <code>Promise.&lt;Array.&lt;Stream&gt;&gt;</code>
    * [.getDeletions(userId, deletionsSince)](#module_UserStreams.getDeletions) ⇒ [<code>Promise.&lt;StreamDeletionItem&gt;</code>](#StreamDeletionItem)
    * [.create(userId, streamData)](#module_UserStreams.create) ⇒ [<code>Promise.&lt;Stream&gt;</code>](#Stream)
    * [.createDeleted(userId, streamData)](#module_UserStreams.createDeleted) ⇒ [<code>Promise.&lt;Stream&gt;</code>](#Stream)
    * [.update(userId, updateData)](#module_UserStreams.update) ⇒ [<code>Promise.&lt;Stream&gt;</code>](#Stream)
    * [.delete(userId, streamId)](#module_UserStreams.delete) ⇒ <code>Promise.&lt;(Stream\|StreamDeletionItem)&gt;</code>

<a name="module_UserStreams.getOne"></a>

### UserStreams.getOne(userId, query) ⇒ <code>Promise.&lt;(Stream\|null)&gt;</code>
Get a stream

**Kind**: static method of [<code>UserStreams</code>](#module_UserStreams)  
**Returns**: <code>Promise.&lt;(Stream\|null)&gt;</code> - - the stream or null if not found:  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| userId | [<code>identifier</code>](#identifier) |  |  |
| query | <code>object</code> |  |  |
| query.id | [<code>identifier</code>](#identifier) |  | '*', means root streamId. Notice parentId is not implemented by stores |
| [query.childrenDepth] | <code>number</code> | <code>0</code> | 0 = NO; -1 = ALL; 1.. Gives the number of levels to expand |
| [query.excludeIds] | [<code>Array.&lt;identifier&gt;</code>](#identifier) |  | list of streamIds to exclude from query. if childrenDepth is >0 or < 0, children of excludedIds should be excludded too |
| [query.includeTrashed] | <code>boolean</code> |  | (equivalent to state = 'all') |

<a name="module_UserStreams.get"></a>

### UserStreams.get(userId, query) ⇒ <code>Promise.&lt;Array.&lt;Stream&gt;&gt;</code>
Query streams

**Kind**: static method of [<code>UserStreams</code>](#module_UserStreams)  
**Returns**: <code>Promise.&lt;Array.&lt;Stream&gt;&gt;</code> - - an array of streams  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| userId | [<code>identifier</code>](#identifier) |  |  |
| query | <code>object</code> |  |  |
| [query.parentId] | [<code>identifier</code>](#identifier) |  | '*' or `null`, means root streamId. |
| [query.childrenDepth] | <code>number</code> | <code>0</code> | 0 = NO; -1 = ALL; 1.. Gives the number of levels to expand |
| [query.excludeIds] | [<code>Array.&lt;identifier&gt;</code>](#identifier) |  | list of streamIds to exclude from query. if childrenDepth is >0 or < 0, children of excludedIds should be excludded too |
| [query.includeTrashed] | <code>boolean</code> |  | (equivalent to state = 'all') |

<a name="module_UserStreams.getDeletions"></a>

### UserStreams.getDeletions(userId, deletionsSince) ⇒ [<code>Promise.&lt;StreamDeletionItem&gt;</code>](#StreamDeletionItem)
Get a list of deleted ids since

**Kind**: static method of [<code>UserStreams</code>](#module_UserStreams)  

| Param | Type |
| --- | --- |
| userId | [<code>identifier</code>](#identifier) | 
| deletionsSince | [<code>timestamp</code>](#timestamp) | 

<a name="module_UserStreams.create"></a>

### UserStreams.create(userId, streamData) ⇒ [<code>Promise.&lt;Stream&gt;</code>](#Stream)
**Kind**: static method of [<code>UserStreams</code>](#module_UserStreams)  
**Returns**: [<code>Promise.&lt;Stream&gt;</code>](#Stream) - - The created Stream  
**Throws**:

- item-already-exists (if item is deleted, id can be re-used)
- invalid-item-id
- resource-is-readonly <=== Thrown either because Storage or Parent stream is readonly

**See**: https://api.pryv.com/reference/#create-stream  

| Param | Type |
| --- | --- |
| userId | [<code>identifier</code>](#identifier) | 
| streamData | [<code>Stream</code>](#Stream) | 

<a name="module_UserStreams.createDeleted"></a>

### UserStreams.createDeleted(userId, streamData) ⇒ [<code>Promise.&lt;Stream&gt;</code>](#Stream)
(Optional used by tests only)

**Kind**: static method of [<code>UserStreams</code>](#module_UserStreams)  
**Returns**: [<code>Promise.&lt;Stream&gt;</code>](#Stream) - - The created Stream  
**Throws**:

- resource-is-readonly <=== Thrown either because Storage or Parent stream is readonly


| Param | Type |
| --- | --- |
| userId | [<code>identifier</code>](#identifier) | 
| streamData | [<code>Stream</code>](#Stream) | 

<a name="module_UserStreams.update"></a>

### UserStreams.update(userId, updateData) ⇒ [<code>Promise.&lt;Stream&gt;</code>](#Stream)
**Kind**: static method of [<code>UserStreams</code>](#module_UserStreams)  
**Returns**: [<code>Promise.&lt;Stream&gt;</code>](#Stream) - - The update Stream  
**Throws**:

- item-already-exists
- resource-is-readonly <=== Thrown because item cannot be updated

**See**: https://api.pryv.com/reference/#update-stream  

| Param | Type |
| --- | --- |
| userId | [<code>identifier</code>](#identifier) | 
| updateData | <code>Object</code> | 

<a name="module_UserStreams.delete"></a>

### UserStreams.delete(userId, streamId) ⇒ <code>Promise.&lt;(Stream\|StreamDeletionItem)&gt;</code>
**Kind**: static method of [<code>UserStreams</code>](#module_UserStreams)  
**Returns**: <code>Promise.&lt;(Stream\|StreamDeletionItem)&gt;</code> - - The trashed Stream  
**Throws**:

- resource-is-readonly <=== Thrown because item cannot be updated

**See**: https://api.pryv.com/reference/#delete-stream  

| Param | Type |
| --- | --- |
| userId | [<code>identifier</code>](#identifier) | 
| streamId | [<code>identifier</code>](#identifier) | 

<a name="ErrorIds"></a>

## ErrorIds
Identifier constants for data store errors.

**Kind**: global constant  
<a name="PryvDataStoreError"></a>

## PryvDataStoreError
**Kind**: global constant  
**License**: Copyright (C) 2021–2023 Pryv S.A. https://pryv.com - All Rights Reserved
This program is free software; you can redistribute it and/or modify it
under the terms of the 3-Clause BSD License
SPDX-License-Identifier: BSD-3-Clause  
<a name="DataStore"></a>

## DataStore
**Kind**: global constant  
**License**: Copyright (C) 2021–2023 Pryv S.A. https://pryv.com - All Rights Reserved
This program is free software; you can redistribute it and/or modify it
under the terms of the 3-Clause BSD License
SPDX-License-Identifier: BSD-3-Clause  
<a name="errors"></a>

## errors
**Kind**: global constant  
**License**: Copyright (C) 2021–2023 Pryv S.A. https://pryv.com - All Rights Reserved
This program is free software; you can redistribute it and/or modify it
under the terms of the 3-Clause BSD License
SPDX-License-Identifier: BSD-3-Clause  
<a name="errors"></a>

## errors
**Kind**: global constant  
**License**: Copyright (C) 2021–2023 Pryv S.A. https://pryv.com - All Rights Reserved
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
<a name="UserStreams"></a>

## UserStreams : <code>undefined</code>
**Kind**: global typedef  
<a name="UserEvents"></a>

## UserEvents : <code>undefined</code>
**Kind**: global typedef  
<a name="FnKeyValueGetAll"></a>

## FnKeyValueGetAll ⇒ <code>object</code>
**Kind**: global typedef  

| Param | Type |
| --- | --- |
| userId | [<code>identifier</code>](#identifier) | 

<a name="FnKeyValueGet"></a>

## FnKeyValueGet ⇒ <code>\*</code>
**Kind**: global typedef  

| Param | Type |
| --- | --- |
| userId | [<code>identifier</code>](#identifier) | 
| key | <code>string</code> | 

<a name="FnKeyValueSet"></a>

## FnKeyValueSet ⇒ <code>void</code>
**Kind**: global typedef  

| Param | Type |
| --- | --- |
| userId | [<code>identifier</code>](#identifier) | 
| key | <code>string</code> | 
| value | <code>\*</code> | 

<a name="KeyValueData"></a>

## KeyValueData : <code>object</code>
**Kind**: global typedef  
**Properties**

| Name | Type | Description |
| --- | --- | --- |
| getAll | [<code>FnKeyValueGetAll</code>](#FnKeyValueGetAll) | Get all key-value data for the given user. |
| get | [<code>FnKeyValueGet</code>](#FnKeyValueGet) | Get key-value data for the given user. |
| set | [<code>FnKeyValueSet</code>](#FnKeyValueSet) | Set key-value data for the given user. |

<a name="StoreInitializationParams"></a>

## StoreInitializationParams : <code>object</code>
**Kind**: global typedef  
**Properties**

| Name | Type | Description |
| --- | --- | --- |
| id | [<code>identifier</code>](#identifier) | The store's id as defined in the Pryv.io platform configuration (for information) |
| name | <code>string</code> | The store's name as defined in the Pryv.io platform configuration (for information; names the root stream representing the store) |
| settings | <code>object</code> | The store's settings as defined in the Pryv.io platform configuration |
| storeKeyValueData | [<code>KeyValueData</code>](#KeyValueData) | Utility to save per-user data |
| logger | [<code>Logger</code>](#Logger) | Logger for the store (messages will appear in the Pryv.io core logs) |

<a name="FnLog"></a>

## FnLog : <code>function</code>
**Kind**: global typedef  

| Param | Type | Description |
| --- | --- | --- |
| message | <code>string</code> | The log message |
| ...context | <code>any</code> | Any additional contextual information |

<a name="Logger"></a>

## Logger
**Kind**: global typedef  
**Properties**

| Name | Type | Description |
| --- | --- | --- |
| log | [<code>FnLog</code>](#FnLog) | Log message with 'info' level |
| warn | [<code>FnLog</code>](#FnLog) | Log message with 'warning' level |
| error | [<code>FnLog</code>](#FnLog) | Log message with 'error' level |
| debug | [<code>FnLog</code>](#FnLog) | Log message with 'debug' level |

<a name="identifier"></a>

## identifier : <code>string</code>
**Kind**: global typedef  
<a name="timestamp"></a>

## timestamp : <code>number</code>
**Kind**: global typedef  
<a name="integrity"></a>

## integrity : <code>string</code>
**Kind**: global typedef  
<a name="Event"></a>

## Event : <code>object</code>
**Kind**: global typedef  
<a name="EventsQuery"></a>

## EventsQuery : <code>object</code>
**Kind**: global typedef  
**Properties**

| Name | Type | Description |
| --- | --- | --- |
| [state] | <code>string</code> | The events' state: `default` (i.e. not trashed), `trashed` or `all` |
| [fromTime] | [<code>timestamp</code>](#timestamp) | The start time of the timeframe to retrieve events for. Default is 24 hours before `toTime` if the latter is set; otherwise it is not taken into account. |
| [toTime] | [<code>timestamp</code>](#timestamp) | The end time of the timeframe to retrieve events for. Default is the current time if fromTime is set. |
| [streams] | [<code>Array.&lt;StreamQueryItem&gt;</code>](#StreamQueryItem) | Streams query: an array of stream query items (see related documentation). |
| [types] | <code>Array.&lt;string&gt;</code> | If set, only events of any of the listed types will be returned. |
| [running] | <code>boolean</code> | If `true`, only running period events will be returned. |
| [modifiedSince] | [<code>timestamp</code>](#timestamp) | If specified, only events modified since that time will be returned. |

<a name="StreamQueryItem"></a>

## StreamQueryItem : <code>object</code>
**Kind**: global typedef  
<a name="EventDeletionItem"></a>

## EventDeletionItem : <code>object</code>
**Kind**: global typedef  
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
| [integrity] | [<code>integrity</code>](#integrity) | The integrity checksum of the attachment |

<a name="AttachmentResponseItem"></a>

## AttachmentResponseItem : <code>object</code>
Informations sent by the store after saving attachment

**Kind**: global typedef  

| Param | Type | Description |
| --- | --- | --- |
| id | <code>string</code> | mandatory id of the attachement - unique - per event |

<a name="identifier"></a>

## identifier : <code>string</code>
**Kind**: global typedef  
<a name="timestamp"></a>

## timestamp : <code>number</code>
// time in UNIX time (seconds)

**Kind**: global typedef  
<a name="Stream"></a>

## Stream : <code>object</code>
**Kind**: global typedef  
<a name="StreamDeletionItem"></a>

## StreamDeletionItem : <code>object</code>
**Kind**: global typedef  
**Properties**

| Name | Type |
| --- | --- |
| id | [<code>identifier</code>](#identifier) | 
| deleted | [<code>timestamp</code>](#timestamp) | 

