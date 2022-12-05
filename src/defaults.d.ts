/**
 * Adds missing mandatory properties to the given event.
 * **Note**: mutates the event object.
 * @param {Object} event
 */
export function applyOnEvent(event: any): void;
/**
 * Adds missing mandatory properties to the given events.
 * **Note**: mutates the event objects.
 * @param {Object[]} events
 */
export function applyOnEvents(events: any[]): void;
/**
 * Adds missing mandatory properties to the given stream and its children (if present).
 * **Note**: mutates the stream object.
 * @param {Object} stream
 * @param {string} [parentId]  - for parentId of the stream
 */
export function applyOnStream(stream: any, parentId?: string): void;
/**
 * Adds missing mandatory properties to the given streams and their children (if present).
 * **Note**: mutates the stream objects.
 * @param {Object[]} streams
 * @param {string} [parentId]  - for parentId of the stream
 */
export function applyOnStreams(streams: any[], parentId?: string): void;
export declare const UnknownDate: number;
export declare const SystemAccessId: string;
export declare const UnknownAccessId: string;
export declare const ExternalAccessIdPrefix: string;
