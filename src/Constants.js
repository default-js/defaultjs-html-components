import {GLOBAL as importedGlobal} from "@default-js/defaultjs-extdom/src/utils/Utils.js"

/**
 * @module Constants
 *
 * Shared constants and runtime settings used across the component toolbox.
 */

/**
 * The global object shared with `defaultjs-extdom` (e.g. `window` in the browser).
 *
 * @type {Object}
 */
export const GLOBAL = importedGlobal;

/**
 * Mutable runtime settings. Change these before components are created to
 * influence the generated event names.
 *
 * @type {Object}
 * @property {string} eventSeparator - separator used between the node name and
 *   the event type when building component event names (see {@link module:utils/EventHelper}).
 */
export const SETTING = {
    eventSeparator: "--"
};

/**
 * Default tag-name prefix for custom elements (e.g. `d-button`).
 *
 * @type {string}
 */
export const componentPrefix = "d-";

/**
 * Prefix used when building the event name for an attribute change.
 *
 * @type {string}
 */
export const attributeChangeEventPrefix = "attribute";

/**
 * Delay in milliseconds before the initial `init()` is triggered.
 *
 * @type {number}
 */
export const initTimeout = 10;

/**
 * Delay in milliseconds used when triggering component events.
 *
 * @type {number}
 */
export const triggerTimeout = 10;
