/**
 * - A string uniquely identifying an object (user, event, stream, etc.)
 */
export type identifier = string;
/**
 * - A positive floating-point number representing the number of seconds since a reference time (Unix epoch time).
 */
export type timestamp = number;
export type UserStreams = {
    getOne(userId: string, streamId: any, query: {
        id: string;
        childrenDepth?: number;
        excludeIds?: string[];
        includeTrashed?: boolean;
    }): Promise<any>;
    get(userId: string, query: {
        parentId?: string;
        childrenDepth?: number;
        excludeIds?: string[];
        includeTrashed?: boolean;
    }): Promise<any[]>;
    getDeletions(userId: string, deletionsSince: number): Promise<import("./UserStreams").StreamDeletionItem>;
    create(userId: string, streamData: any): Promise<any>;
    createDeleted(userId: string, streamData: any): Promise<any>;
    update(userId: string, updateData: any): Promise<any>;
    delete(userId: string, streamId: string): Promise<any>;
};
export type UserEvents = {
    getOne(userId: string, eventId: string): Promise<any>;
    get(userId: string, query: import("./UserEvents").EventsQuery, options: {
        skip: any;
        limit: any;
        sort: any;
    }): Promise<any[]>;
    getStreamed(userId: string, query: import("./UserEvents").EventsQuery, options: {
        skip: any;
        limit: any;
        sort: any;
    }): Promise<ReadableStream<any>>;
    getDeletionsStreamed(userId: string, query: {
        deletedSince: number;
    }, options?: {
        skip: number;
        limit: number;
        sortAscending: boolean;
    }): Promise<ReadableStream<any>>;
    getHistory(userId: string, eventId: string): Promise<any[]>;
    create(userId: string, eventData: any): Promise<any>;
    addAttachment(userId: string, eventId: string, attachmentItem: import("./UserEvents").AttachmentItem): Promise<any>;
    getAttachment(userId: string, eventId: string, fileId: string): Promise<ReadableStream<any>>;
    deleteAttachment(userId: string, eventId: string, fileId: string): Promise<any>;
    update(userId: string, eventData: any): Promise<boolean>;
    delete(userId: string, eventId: string): Promise<any>;
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
export type StoreInitializationParams = {
    /**
     * The store's id as defined in the Pryv.io platform configuration (for information)
     */
    id: identifier;
    /**
     * The store's name as defined in the Pryv.io platform configuration (for information; names the root stream representing the store)
     */
    name: string;
    /**
     * The store's settings as defined in the Pryv.io platform configuration
     */
    settings: object;
    /**
     * Utility to save per-user data
     */
    storeKeyValueData: KeyValueData;
    /**
     * Logger for the store (messages will appear in the Pryv.io core logs)
     */
    logger: Logger;
};
export type FnLog = (message: string, ...context: any[]) => any;
export type Logger = {
    /**
     * Log message with 'info' level
     */
    log: FnLog;
    /**
     * Log message with 'warning' level
     */
    warn: FnLog;
    /**
     * Log message with 'error' level
     */
    error: FnLog;
    /**
     * Log message with 'debug' level
     */
    debug: FnLog;
};
/**
 * Initialize the store.
 * @param {StoreInitializationParams} params
 * @returns {Promise<DataStore>} The data store object itself (for method chaining).
 */
declare function init(params: StoreInitializationParams): Promise<any>;
declare let streams: UserStreams;
declare let events: UserEvents;
/**
 * Called when the given user is deleted from Pryv.io, to let the store delete the related data if appropriate.
 * @param {identifier} userId
 */
declare function deleteUser(userId: string): Promise<never>;
export {};
