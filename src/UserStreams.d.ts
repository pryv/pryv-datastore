export type identifier = string;
export type timestamp = number;
export type Stream = object;
export type StreamDeletionItem = object;

/**
 * Get a stream 
 * @param {identifier} userId
 * @param {object} query
 * @param {identifier} query.id '*', means root streamId. Notice parentId is not implemented by stores
 * @param {number} [query.childrenDepth=0] 0 = NO; -1 = ALL; 1.. Gives the number of levels to expand
 * @param {identifier[]} [query.excludeIds] list of streamIds to exclude from query. if childrenDepth is >0 or < 0, children of excludedIds should be excludded too
 * @param {boolean} [query.includeTrashed] (equivalent to state = 'all')
 * @returns {Promise<Stream|null>} - the stream or null if not found:
 */
export declare function getOne (userId: string, streamId: string, query: {
    childrenDepth?: number;
    excludeIds?: string[];
    includeTrashed?: boolean;
}): Promise<Stream|null>;
/**
 * Query streams 
 * @param {identifier} userId
 * @param {object} query
 * @param {identifier} [query.parentId] '*' or `null`, means root streamId. 
 * @param {number} [query.childrenDepth=0] 0 = NO; -1 = ALL; 1.. Gives the number of levels to expand
 * @param {identifier[]} [query.excludeIds] list of streamIds to exclude from query. if childrenDepth is >0 or < 0, children of excludedIds should be excludded too
 * @param {boolean} [query.includeTrashed] (equivalent to state = 'all')
 * @returns {Promise<Stream[]>} - an array of streams
 */
export declare function get(userId: string, query: {
    id?: string;
    childrenDepth?: number;
    excludeIds?: string[];
    includeTrashed?: boolean;
}): Promise<Stream[]>;
/**
 * Get a list of deleted ids since
 * @param {identifier} userId
 * @param {timestamp} deletionsSince
 * @returns {Promise<StreamDeletionItem>}
 */
export declare function getDeletions(userId: string, deletionsSince: number): Promise<StreamDeletionItem>;
/**
 * @see https://api.pryv.com/reference/#create-stream
 * @param {identifier} userId
 * @param {Stream} streamData
 * @throws item-already-exists
 * @throws invalid-item-id
 * @throws resource-is-readonly <=== Thrown either because Storage or Parent stream is readonly
 * @returns {Promise<Stream>} - The created Stream
 */
export declare function create(userId: string, streamData: Stream): Promise<Stream>;
/**
 * @see https://api.pryv.com/reference/#update-stream
 * @param {identifier} userId
 * @param {Stream} updateData
 * @throws item-already-exists
 * @throws resource-is-readonly <=== Thrown because item cannot be updated
 * @returns {Promise<Stream>} - The update Stream
 */
export declare function update(userId: string, updateData: any): Promise<Stream>;
/**
 * @see https://api.pryv.com/reference/#delete-stream
 * @param {identifier} userId
 * @param {identifier} streamId
 * @throws item-already-exists
 * @throws resource-is-readonly <=== Thrown because item cannot be updated
 * @returns {Promise<Stream|StreamDeletionItem>} - The trashed Stream
 */
export declare function _delete(userId: string, streamId: string): Promise<any>;
export { _delete as delete };
