import PryvDataStoreError = require("./PryvDataStoreError");
/**
 * @param {string} message
 * @param {*} data
 * @param {Error} innerError
 * @returns {PryvDataStoreError}
 */
export function unexpectedError(message: string, data: any, innerError: Error): PryvDataStoreError;
/**
 * @param {string} message
 * @param {*} data
 * @param {Error} innerError
 * @returns {PryvDataStoreError}
 */
export function invalidRequestStructure(message: string, data: any, innerError: Error): PryvDataStoreError;
/**
 * @param {string} resourceType
 * @param {string} id
 * @param {Error} innerError
 * @returns {PryvDataStoreError}
 */
export function unknownResource(resourceType: string, id: string, innerError: Error): PryvDataStoreError;
/**
 * @param {string} resourceType
 * @param {string[]} conflictingKeys
 * @param {Error} innerError
 * @returns {PryvDataStoreError}
 */
export function itemAlreadyExists(resourceType: string, conflictingKeys: string[], innerError: Error): PryvDataStoreError;
/**
 * @param {string} message
 * @param {*} data
 * @param {Error} innerError
 * @returns {PryvDataStoreError}
 */
export function invalidItemId(message: string, data: any, innerError: Error): PryvDataStoreError;
/**
 * @param {string} message
 * @param {*} [data]
 * @param {Error} [innerError]
 * @returns {PryvDataStoreError}
 */
export function unsupportedOperation(message: string, data?: any, innerError?: Error): PryvDataStoreError;