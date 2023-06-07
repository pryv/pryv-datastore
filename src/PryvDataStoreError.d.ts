export = PryvDataStoreError;
/**
 * Constructor for data store errors.
 * @param {string} id
 * @param {string} message
 * @param {*} [data]
 * @param {Error} [innerError]
 */
declare function PryvDataStoreError(id: string, message: string, data?: any, innerError?: Error): void;
declare class PryvDataStoreError {
    /**
     * Constructor for data store errors.
     * @param {string} id
     * @param {string} message
     * @param {*} [data]
     * @param {Error} [innerError]
     */
    constructor(id: string, message: string, data?: any, innerError?: Error);
    id: string;
    data: any;
    innerError: Error;
    name: string;
}
