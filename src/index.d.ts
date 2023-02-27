import DataStore = require("./DataStore");
import UserEvents = require("./UserEvents");
import defaults = require("./defaults");
import errors = require("./errors");
/**
 * Create a new data store object with the given implementation.
 * @param {Object} implementation An object implementing {@link DataStore} methods
 * @returns {DataStore}
 */
export declare function createDataStore(implementation: any): {
    readonly id: string;
    readonly name: string;
    readonly settings: any;
    init(keyValueDB: DataStore.KeyValueDB): Promise<any>;
    streams: {
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
    events: {
        get(userId: string, params: {
            withDeletions?: boolean;
            deletedSince?: number;
            includeHistory?: boolean;
        }): Promise<any[]>;
        getStreamed(userId: string, params: any): Promise<ReadableStream<any>>;
        getOne(userId: string, eventId: string): Promise<never>;
        create(userId: string, eventData: any): Promise<any>;
        saveAttachedFiles(userId: string, partialEventData: any, attachmentsItems: UserEvents.AttachmentItem[]): Promise<any>;
        getAttachedFile(userId: string, eventData: any, fileId: string): Promise<ReadableStream<any>>;
        deleteAttachedFile(userId: string, eventData: any, fileId: string): Promise<any>;
        update(userId: string, eventData: any): Promise<boolean>;
        delete(userId: string, eventId: string, params: any): Promise<any>;
    };
    deleteUser(userId: string): Promise<never>;
    getUserStorageSize(userId: string): Promise<number>;
};
/**
 * Create a new user streams object with the given implementation.
 * @param {Object} implementation An object implementing {@link UserStreams} methods
 * @returns {UserStreams}
 */
export declare function createUserStreams(implementation: any): {
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
/**
 * Create a new user events object with the given implementation.
 * @param {Object} implementation An object implementing {@link UserEvents} methods
 * @returns {UserEvents}
 */
export declare function createUserEvents(implementation: any): {
    get(userId: string, params: {
        withDeletions?: boolean;
        deletedSince?: number;
        includeHistory?: boolean;
    }): Promise<any[]>;
    getStreamed(userId: string, params: any): Promise<ReadableStream<any>>;
    getOne(userId: string, eventId: string): Promise<never>;
    create(userId: string, eventData: any): Promise<any>;
    saveAttachedFiles(userId: string, partialEventData: any, attachmentsItems: UserEvents.AttachmentItem[]): Promise<any>;
    getAttachedFile(userId: string, eventData: any, fileId: string): Promise<ReadableStream<any>>;
    deleteAttachedFile(userId: string, eventData: any, fileId: string): Promise<any>;
    update(userId: string, eventData: any): Promise<boolean>;
    delete(userId: string, eventId: string, params: any): Promise<any>;
};
export { defaults, errors };
