export type identifier = string;
export type timestamp = number;
export type integrity = string;
export type Event = object;
export type EventsQuery = {
    /**
     * The events' state: `default` (i.e. not trashed), `trashed` or `all`
     */
    state?: string;
    /**
     * The start time of the timeframe to retrieve events for. Default is 24 hours before `toTime` if the latter is set; otherwise it is not taken into account.
     */
    fromTime?: timestamp;
    /**
     * The end time of the timeframe to retrieve events for. Default is the current time if fromTime is set.
     */
    toTime?: timestamp;
    /**
     * Streams query: an array of stream query items (see related documentation).
     */
    streams?: StreamQueryItem[];
    /**
     * If set, only events of any of the listed types will be returned.
     */
    types?: string[];
    /**
     * If `true`, only running period events will be returned.
     */
    running?: boolean;
    /**
     * If specified, only events modified since that time will be returned.
     */
    modifiedSince?: timestamp;
};
export type StreamQueryItem = object;
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
export declare function getOne(userId: string, eventId: string): Promise<any>;
/**
 * Get events for this user.
 * @param {identifier} userId
 * @param {EventsQuery} query Event query
 * @param {{skip, limit, sort}} options
 * @returns {Promise<Event[]>}
 */
export declare function get(userId: string, query: EventsQuery, options: {
    skip: any;
    limit: any;
    sort: any;
}): Promise<any[]>;
/**
 * Get events as a stream for this user.
 * @param {identifier} userId
 * @param {EventsQuery} query Event query
 * @param {{skip, limit, sort}} options
 * @returns {Promise<ReadableStream<Event>>}
 */
export declare function getStreamed(userId: string, query: EventsQuery, options: {
    skip: any;
    limit: any;
    sort: any;
}): Promise<ReadableStream<any>>;
/**
 * @param {identifier} userId
 * @param {{deletedSince: timestamp}} query
 * @param {{skip: number, limit: number, sortAscending: boolean}} [options]
 * @returns {Promise<ReadableStream<EventDeletionItem>>}
 */
export declare function getDeletionsStreamed(userId: string, query: {
    deletedSince: number;
}, options?: {
    skip: number;
    limit: number;
    sortAscending: boolean;
}): Promise<ReadableStream<any>>;
/**
 * @param {identifier} userId
 * @param {identifier} eventId
 * @returns {Promise<Event[]>}
 */
export declare function getHistory(userId: string, eventId: string): Promise<any[]>;
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
 * @param {identifier} eventId
 * @param {AttachmentItem[]} attachmentsItems - Array of attachments informations.
 * @throws {PryvDataStoreError} with id `item-already-exists`
 * @throws {PryvDataStoreError} with id `invalid-item-id`
 * @throws {PryvDataStoreError} with id `resource-is-readonly` if either storage or parent stream is read-only
 * @returns {Promise<AttachmentResponseItem>} - The ids and other information related to the attachments
 */
export declare function saveAttachedFiles(userId: string, eventId: string, attachmentsItems: AttachmentItem[]): Promise<any>;
/**
 * Retrieve the specified file as a stream.
 * @param {identifier} userId
 * @param {identifier} eventId
 * @param {identifier} fileId
 * @returns {Promise<ReadableStream>}
 */
export declare function getAttachedFile(userId: string, eventId: string, fileId: string): Promise<ReadableStream<any>>;
/**
 * Delete the specified file.
 * @param {identifier} userId
 * @param {identifier} eventId
 * @param {identifier} fileId
 * @throws {PryvDataStoreError} with id `invalid-item-id`
 * @throws {PryvDataStoreError} with id `resource-is-readonly` if either storage or parent stream is read-only
 * @returns {Promise<AttachmentResponseItem>} - The ids and other information related to the attachments
 */
export declare function deleteAttachedFile(userId: string, eventId: string, fileId: string): Promise<any>;
/**
 * Fully replace an event with new Data
 * @param {identifier} userId
 * @param {Event} eventData - New event data
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
