export type identifier = string;
export type timestamp = number;
export type Stream = object;
export type StreamDeletionItem = object;
/**
 * Get the stream that will be set as root for all Stream Structure of this Data Store.
 * @see https://api.pryv.com/reference/#get-streams
 * @param {identifier} userId
 * @param {object} params
 * @param {identifier} [params.id] null, means root streamId. Notice parentId is not implemented by stores
 * @param {number} [params.expandChildren=0] 0 = NO; -1 = ALL; 1.. Gives the number of levels to expand
 * @param {identifier[]} [params.excludeIds] list of streamIds to exclude from query. if expandChildren is >0 or < 0, children of excludedIds should be excludded too
 * @param {boolean} [params.includeTrashed] (equivalent to state = 'all')
 * @returns {Promise<Stream|null>} - the stream or null if not found:
 */
export declare function get(userId: string, params: {
    id?: string;
    expandChildren?: number;
    excludeIds?: string[];
    includeTrashed?: boolean;
}): Promise<any>;
/**
 * Get a list of deleted ids since
 * @param {identifier} userId
 * @param {timestamp} deletionsSince
 */
export declare function getDeletions(userId: string, deletionsSince: number): Promise<never>;
/**
 * @see https://api.pryv.com/reference/#create-stream
 * @param {identifier} userId
 * @throws item-already-exists
 * @throws invalid-item-id
 * @throws resource-is-readonly <=== Thrown either because Storage or Parent stream is readonly
 * @returns {Promise<Stream>} - The created Stream
 */
export declare function create(userId: string, params: any): Promise<any>;
/**
 * @see https://api.pryv.com/reference/#update-stream
 * @param {identifier} userId
 * @throws item-already-exists
 * @throws resource-is-readonly <=== Thrown because item cannot be updated
 * @returns {Promise<Stream>} - The update Stream
 */
export declare function update(userId: string, streamId: any, params: any): Promise<any>;
/**
 * @see https://api.pryv.com/reference/#delete-stream
 * @param {identifier} userId
 * @param {identifier} streamId
 * @param {object} params
 * @throws item-already-exists
 * @throws resource-is-readonly <=== Thrown because item cannot be updated
 * @returns {Promise<Stream|StreamDeletionItem>} - The trashed Stream
 */
declare function _delete(userId: string, streamId: string, params: any): Promise<any>;
export { _delete as delete };
