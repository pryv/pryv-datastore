/**
 * - A string uniquely identifying an object (user, event, stream, etc.)
 */
export type identifier = string;
/**
 * - A positive floating-point number representing the number of seconds since a reference time (Unix epoch time).
 */
export type timestamp = number;
declare const id: string;
declare const name: string;
declare const settings: object;
/**
 * Initialize the store.
 * @returns {DataStore} The data store object itself (for method chaining).
 */
declare function init(): any;
declare const streams: {
    get(userId: string, params: {
        id?: string;
        expandChildren?: number;
        excludeIds?: string[];
        includeTrashed?: boolean;
    }): Promise<any>;
    getDeletions(userId: string, deletionsSince: number): Promise<never>;
    create(userId: string, params: any): Promise<any>;
    update(userId: string, streamId: any, params: any): Promise<any>;
    delete(userId: string, streamId: string, params: any): Promise<any>;
};
declare const events: {
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
/**
 * TODO: implement
 * Set store-specific key-value data (e.g. credentials or settings) for the given user.
 * This is called for both creating and updating the data.
 * @param {identifier} userId
 * @param {object} data
 */
declare function setUserData(userId: string, data: any): Promise<never>;
/**
 * TODO: implement
 * Get store-specific key-value data for the given user.
 * This should never return secrets such as passwords, tokens etc. which should be write-only via {@link #setUserData}.
 * @param {identifier} userId
 * @returns {Promise<object>}
 */
declare function getUserData(userId: string): Promise<any>;
/**
 * Called when the given user is deleted from Pryv.io, to let the store delete the related data if appropriate.
 * @param {identifier} userId
 */
declare function deleteUser(userId: string): Promise<never>;
/**
 * Return the total amount of storage used by the given user, in bytes.
 * @param {identifier} userId
 * @returns {Promise<number>}
 */
declare function getUserStorageSize(userId: string): Promise<number>;
export {};
