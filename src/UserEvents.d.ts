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
 * Get events for this user.
 * @see [Get events in Pryv.io API reference](https://api.pryv.com/reference/#get-events)
 * @param {identifier} userId
 * @param {object} params - Query parameters
 * @param {boolean} [params.withDeletions=false] - Include event deletions in the results.
 * @param {timestamp} [params.deletedSince=null] -  Only return deleted events, sorted by deletion date descending.
 * @param {boolean} [params.includeHistory=false] - Include change history for events.
 * @returns {Promise<Event[]>}
 */
export declare function get(userId: string, params: {
    withDeletions?: boolean;
    deletedSince?: number;
    includeHistory?: boolean;
}): Promise<any[]>;
/**
 * Get events as a stream for this user.
 * @see [Get events in Pryv.io API reference](https://api.pryv.com/reference/#get-events)
 * @param {identifier} userId
 * @param {object} params - event query
 * @returns {Promise<ReadableStream>}
 */
export declare function getStreamed(userId: string, params: any): Promise<ReadableStream<any>>;
/**
 * TODO: implement
 * @param {identifier} userId
 * @param {identifier} eventId
 */
export declare function getOne(userId: string, eventId: string): Promise<never>;
/**
 * @see [Create events in Pryv.io API reference](https://api.pryv.com/reference/#create-event)
 * @param {identifier} userId
 * @param {object} eventData
 * @throws {PryvDataStoreError} with id `item-already-exists`
 * @throws {PryvDataStoreError} with id `invalid-item-id`
 * @throws {PryvDataStoreError} with id `resource-is-readonly` if either storage or parent stream is read-only
 * @returns {Promise<Event>} - The created event
 */
export declare function create(userId: string, eventData: any): Promise<any>;
/**
 * @param {identifier} userId
 * @param {object} partialEventData - eventData (without the new attachments and integrity property)
 * @param {AttachmentItem[]} attachmentsItems - Array of attachments informations.
 * @throws {PryvDataStoreError} with id `item-already-exists`
 * @throws {PryvDataStoreError} with id `invalid-item-id`
 * @throws {PryvDataStoreError} with id `resource-is-readonly` if either storage or parent stream is read-only
 * @returns {Promise<AttachmentResponseItem>} - The ids and other information related to the attachments
 */
export declare function saveAttachedFiles(userId: string, partialEventData: any, attachmentsItems: AttachmentItem[]): Promise<any>;
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
export declare function deleteAttachedFile(userId: string, eventData: any, fileId: string): Promise<any>;
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
 * @param {object} params
 * @throws {PryvDataStoreError} with id `item-already-exists`
 * @throws {PryvDataStoreError} with id `resource-is-readonly` if either storage or parent stream is read-only
 * @returns {Promise<Event|EventDeletionItem>} - The trashed Event
 */
declare function _delete(userId: string, eventId: string, params: any): Promise<any>;
export { _delete as delete };
