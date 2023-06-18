import DataStore = require("./DataStore");
import UserStreams = require("./UserStreams");
import UserEvents = require("./UserEvents");
import defaults = require("./defaults");
import errors = require("./errors");
/**
 * Create a new data store object with the given implementation.
 * @param {Object} implementation An object implementing {@link DataStore} methods
 * @returns {DataStore}
 */
export declare function createDataStore(implementation: any): {
    init(params: DataStore.StoreInitializationParams): Promise<any>;
    streams: {
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
        getDeletions(userId: string, deletionsSince: number): Promise<UserStreams.StreamDeletionItem>;
        create(userId: string, streamData: any): Promise<any>;
        createDeleted(userId: string, streamData: any): Promise<any>;
        update(userId: string, updateData: any): Promise<any>;
        delete(userId: string, streamId: string): Promise<any>;
    };
    events: {
        getOne(userId: string, eventId: string): Promise<any>;
        get(userId: string, query: UserEvents.EventsQuery, options: {
            skip: any;
            limit: any;
            sort: any;
        }): Promise<any[]>;
        getStreamed(userId: string, query: UserEvents.EventsQuery, options: {
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
        addAttachment(userId: string, eventId: string, attachmentItem: UserEvents.AttachmentItem): Promise<any>;
        getAttachment(userId: string, eventId: string, fileId: string): Promise<ReadableStream<any>>;
        deleteAttachment(userId: string, eventId: string, fileId: string): Promise<any>;
        update(userId: string, eventData: any): Promise<boolean>;
        delete(userId: string, eventId: string): Promise<any>;
    };
    deleteUser(userId: string): Promise<never>;
};
/**
 * Create a new user streams object with the given implementation.
 * @param {Object} implementation An object implementing {@link UserStreams} methods
 * @returns {UserStreams}
 */
export declare function createUserStreams(implementation: any): {
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
    getDeletions(userId: string, deletionsSince: number): Promise<UserStreams.StreamDeletionItem>;
    create(userId: string, streamData: any): Promise<any>;
    createDeleted(userId: string, streamData: any): Promise<any>;
    update(userId: string, updateData: any): Promise<any>;
    delete(userId: string, streamId: string): Promise<any>;
};
/**
 * Create a new user events object with the given implementation.
 * @param {Object} implementation An object implementing {@link UserEvents} methods
 * @returns {UserEvents}
 */
export declare function createUserEvents(implementation: any): {
    getOne(userId: string, eventId: string): Promise<any>;
    get(userId: string, query: UserEvents.EventsQuery, options: {
        skip: any;
        limit: any;
        sort: any;
    }): Promise<any[]>;
    getStreamed(userId: string, query: UserEvents.EventsQuery, options: {
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
    addAttachment(userId: string, eventId: string, attachmentItem: UserEvents.AttachmentItem): Promise<any>;
    getAttachment(userId: string, eventId: string, fileId: string): Promise<ReadableStream<any>>;
    deleteAttachment(userId: string, eventId: string, fileId: string): Promise<any>;
    update(userId: string, eventData: any): Promise<boolean>;
    delete(userId: string, eventId: string): Promise<any>;
};
export { defaults, errors };
