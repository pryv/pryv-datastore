/**
 * - A string uniquely identifying an object (user, event, stream, etc.)
 */
export type identifier = string;
/**
 * - A positive floating-point number representing the number of seconds since a reference time (Unix epoch time).
 */
export type timestamp = number;
export type UserStreams = {
    get(userId: string, params: {
        id?: string;
        childrenDepth?: number;
        excludeIds?: string[];
        includeTrashed?: boolean;
    }): Promise<any>;
    getDeletions(userId: string, deletionsSince: number): Promise<never>;
    create(userId: string, params: any): Promise<any>;
    update(userId: string, streamId: any, params: any): Promise<any>;
    delete(userId: string, streamId: string, params: any): Promise<any>;
};
export type UserEvents = {
    get(userId: string, params: {
        withDeletions?: boolean;
        deletedSince?: number;
        includeHistory?: boolean;
    }): Promise<any[]>;
    getStreamed(userId: string, params: any): Promise<ReadableStream<any>>;
    getOne(userId: string, eventId: string): Promise<never>;
    create(userId: string, eventData: any): Promise<any>;
    saveAttachedFiles(userId: string, partialEventData: any, attachmentsItems: import("./UserEvents").AttachmentItem[]): Promise<any>;
    getAttachedFile(userId: string, eventData: any, fileId: string): Promise<ReadableStream<any>>;
    deleteAttachedFile(userId: string, eventData: any, fileId: string): Promise<any>;
    update(userId: string, eventData: any): Promise<boolean>;
    delete(userId: string, eventId: string, params: any): Promise<any>;
};
export type FnKeyValueGetAll = (userId: identifier) => object;
export type FnKeyValueGet = (userId: identifier, key: string) => any;
export type FnKeyValueSet = (userId: identifier, key: string, value: any) => void;
export type KeyValueData = {
    /**
     * Get all key-value data for the given user.
     */
    getAll: FnKeyValueGetAll;
    /**
     * Get key-value data for the given user.
     */
    get: FnKeyValueGet;
    /**
     * Set key-value data for the given user.
     */
    set: FnKeyValueSet;
};
declare const id: string;
declare const name: string;
declare const settings: object;
/**
 * Initialize the store.
 * @param {KeyValueData} keyValueData A store-specific key-value database for user data (e.g. credentials or settings).
 * @returns {Promise<DataStore>} The data store object itself (for method chaining).
 */
declare function init(keyValueData: KeyValueData): Promise<any>;
declare const streams: UserStreams;
declare const events: UserEvents;
/**
 * Called when the given user is deleted from Pryv.io, to let the store delete the related data if appropriate.
 * @param {identifier} userId
 */
declare function deleteUser(userId: string): Promise<never>;
export {};
