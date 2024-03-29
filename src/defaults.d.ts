/**
 * Adds missing mandatory properties to the given event.
 * **Note**: mutates the event object.
 * @param {Object} event
 */
export function applyOnEvent(event: any): any;
/**
 * Adds missing mandatory properties to the given events.
 * **Note**: mutates the event objects.
 * @param {Object[]} events
 */
export function applyOnEvents(events: any[]): any;
/**
 * Adds missing mandatory properties to the given stream and its children (if present).
 * **Note**: mutates the stream object.
 * @param {Object} stream
 * @param {string} [parentId]  - for parentId of the stream
 */
export function applyOnStream(stream: any, parentId?: string): any;
/**
 * Adds missing mandatory properties to the given streams and their children (if present).
 * **Note**: mutates the stream objects.
 * @param {Object[]} streams
 * @param {string} [parentId]  - for parentId of the stream
 */
export function applyOnStreams(streams: any[], parentId?: string): any;
export declare let UnknownDate: number;
export declare let SystemAccessId: string;
export declare let UnknownAccessId: string;
export declare let ExternalAccessIdPrefix: string;
