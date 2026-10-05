/**
 * - A string uniquely identifying an object (user, event, stream, etc.)
 */
export type identifier = string;
/**
 * - Optional-capability declaration, keyed by feature.
 */
export type StoreSupports = {
    /**
     * - Support for events.get `content`/`clientData` query conditions.
     */
    contentQueries?: {
        fields?: string[];
        operators?: string[];
    };
};
/**
 * - A positive floating-point number representing the number of seconds since a reference time (Unix epoch time).
 */
export type timestamp = number;
export type UserStreams = {
    getOne(userId: string, streamId: any, query: {
        id: string;
        childrenDepth?: number;
        excludedIds?: string[];
        includeTrashed?: boolean;
    }): Promise<any>;
    get(userId: string, query: {
        parentId?: string;
        childrenDepth?: number;
        excludedIds?: string[];
        includeTrashed?: boolean;
    }): Promise<any[]>;
    getDeletions(userId: string, deletionsSince: number): Promise<import("./UserStreams").StreamDeletionItem>;
    create(userId: string, streamData: any): Promise<any>;
    createDeleted(userId: string, streamData: any): Promise<any>;
    update(userId: string, updateData: any): Promise<any>;
    delete(userId: string, streamId: string): Promise<any>;
    exportAll(userId: string): Promise<AsyncIterable<any>>;
    importAll(userId: string, items: any[] | AsyncIterable<any>): Promise<void>;
    clearAll(userId: string): Promise<void>;
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
    exportAll(userId: string): Promise<AsyncIterable<any>>;
    importAll(userId: string, items: any[] | AsyncIterable<any>): Promise<void>;
    clearAll(userId: string): Promise<void>;
};
export type FnKeyValueGetAll = (userId: identifier) => object;
export type FnKeyValueGet = (userId: identifier, key: string) => any;
export type FnKeyValueSet = (userId: identifier, key: string, value: any) => void;
/**
 * - All infos are optional, infos can be extended with custom properties
 */
export type UserStorageInfos = {
    /**
     * total storage used in Kb
     */
    totalSizeKb?: number;
    streams?: {
        count?: number;
        sizeKb?: number;
    };
    /**
     * number of events
     */
    count?: number;
    /**
     * size used by events in Kb
     */
    sizeKb?: number;
};
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
/**
 * Returns information on storage used
 * @param {identifier} userId
 * @returns {Promise<UserStorageInfos>}
 */
declare function getUserStorageInfos(userId: string): Promise<UserStorageInfos>;
/**
 * Declare the optional capabilities this store implements, per feature.
 * Stores not overriding this support no optional feature; partial
 * support is fine (e.g. a subset of query operators).
 * The returned object is surfaced to API clients in the `clientData`
 * of the store's root stream — it must be JSON-serializable and must
 * not contain secrets.
 * @returns {StoreSupports}
 * @example
 * supports () {
 *   return {
 *     contentQueries: { // events.get content/clientData conditions
 *       fields: ['content', 'clientData'],
 *       operators: ['eq', 'in', 'prefix'] // subset of: eq neq in exists gt gte lt lte prefix
 *     }
 *   };
 * }
 */
declare function supports(): StoreSupports;
export {};
