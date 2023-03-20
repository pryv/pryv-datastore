export type identifier = string;
export type timestamp = number;
export type integrity = string;
export type Event = object;
export type EventDeletionItem = object;
/**
 * Object to pass when creating events with attachments or adding attachments to events
 */
export type AttachmentItem = {
    /**
     * fileName
     */
    filename: string;
    /**
     * - The size of the attachment
     */
    size?: number;
    attachmentData: ReadableStream;
    /**
     * - The integrity checksum of the attachment
     */
    integrity?: integrity;
};
/**
 * Informations sent by the store after saving attachment
 */
export type AttachmentResponseItem = object;

/**
 * @param {identifier} userId
 * @param {identifier} eventId
 * @return {Promise<Event|null>}
 */
export declare function getOne(userId: string, eventId: string): Promise<Event|null>;

/**
 * Get events for this user.
 * @param {identifier} userId
 * @param {GetEventQuery} query Event query
 * @param {{skip, limit, sort}} options
 * @returns {Promise<Event[]>}
 */
export declare function get(userId: string, query: GetEventQuery, options: GetEventOptions): Promise<Events[]>;
/**
 * Get events as a stream for this user.
 * @param {identifier} userId
 * @param {GetEventQuery} query Event query
 * @param {{skip, limit, sort}} options
 * @returns {Promise<ReadableStream<Event>>}
 */
export declare function getStreamed(userId: string, query: GetEventQuery, options: GetEventOptions): Promise<ReadableStream<Event>>;

/**
 * @param {identifier} userId
 * @param {{deletedSince: timestamp}} query
 * @param {{skip: number, limit: number, sortAscending: boolean}} [options]
 * @returns {Promise<ReadableStream<EventDeletionItem>>}
 */
export declare function  getDeletionsStreamed (userId:string, query: {deletedSince: timestamp} , options: {skip: number, limit: number, sortAscending: boolean}): Promise<ReadableStream<EventDeletionItem>>;

/**
 * Get history of this event
 * @param {identifier} userId
 * @param {identifier} eventId
 * @returns {Promise<Event[]>}
 */
export declare function getHistory(userId: string, eventsId: string): Promise<Events[]>

/**
 * @see [Create events in Pryv.io API reference](https://api.pryv.com/reference/#create-event)
 * @param {identifier} userId
 * @param {object} eventData
 * @throws {PryvDataStoreError} with id `item-already-exists`
 * @throws {PryvDataStoreError} with id `invalid-item-id`
 * @throws {PryvDataStoreError} with id `resource-is-readonly` if either storage or parent stream is read-only
 * @returns {Promise<Event>} - The created event
 */
export declare function create(userId: string, eventData: any): Promise<Event>;
/**
 * @param {identifier} userId
 * @param {identifier} eventId
 * @param {AttachmentItem[]} attachmentsItems - Array of attachments informations.
 * @throws {PryvDataStoreError} with id `item-already-exists`
 * @throws {PryvDataStoreError} with id `invalid-item-id`
 * @throws {PryvDataStoreError} with id `resource-is-readonly` if either storage or parent stream is read-only
 * @returns {Promise<AttachmentResponseItem>} - The ids and other information related to the attachments
 */
export declare function saveAttachedFiles(userId: string, eventId: string, attachmentsItems: AttachmentItem[]): Promise<AttachmentResponseItem>;
/**
 * Retrieve the specified file as a stream.
 * @param {identifier} userId
 * @param {object} eventData
 * @param {identifier} fileId
 * @returns {Promise<ReadableStream>}
 */
export declare function getAttachedFile(userId: string, eventData: any, fileId: string): Promise<ReadableStream<any>>;
/**
 * Delete the specified file.
 * @param {identifier} userId
 * @param {any} eventData
 * @param {identifier} fileId
 * @throws {PryvDataStoreError} with id `invalid-item-id`
 * @throws {PryvDataStoreError} with id `resource-is-readonly` if either storage or parent stream is read-only
 * @returns {Promise<AttachmentResponseItem>} - The ids and other information related to the attachments
 */
export declare function deleteAttachedFile(userId: string, eventData: any, fileId: string): Promise<AttachmentResponseItem>;
/**
 * Fully replace an event with new Data
 * @param {identifier} userId
 * @param {any} eventData - New event data
 * @throws {PryvDataStoreError} with id `resource-is-readonly` if either storage or parent stream is read-only
 * @returns {Promise<boolean>} - true if an event was updated
 */
export declare function update(userId: string, eventData: any): Promise<boolean>;
/**
 * @see https://api.pryv.com/reference/#delete-event
 * @param {identifier} userId
 * @param {identifier} eventId
 * @throws {PryvDataStoreError} with id `item-already-exists`
 * @throws {PryvDataStoreError} with id `resource-is-readonly` if either storage or parent stream is read-only
 * @returns {Promise<Event|EventDeletionItem>} - The trashed Event
 */
declare function _delete(userId: string, eventId: string): Promise<any>;
export { _delete as delete };
