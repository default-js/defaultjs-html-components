import {attributeChangeEventPrefix, SETTING} from "../Constants.js";

/**
 * @module utils/EventHelper
 *
 * Helpers to build the event names dispatched by components.
 */

/**
 * Creates the event name for a component event, composed of the node's tag
 * name, the `separator` and the `eventType`.
 *
 * @param {string} eventType - the event type, e.g. `"change"`.
 * @param {string|HTMLElement|Component} node - the node the event belongs to.
 *   A string is used verbatim as node name; an {@link HTMLElement} contributes
 *   its `nodeName`; any other object must expose a string `NODENAME`.
 * @param {string} [separator=SETTING.eventSeparator] - separator between node name and event type; defaults to `"--"`.
 * @returns {string} the lower-cased event name.
 * @throws {Error} when `node` is not a supported type.
 */
export const componentEventname = (eventType, node, separator = SETTING.eventSeparator ) => {
	let nodename = "unsupported";
	if(typeof node === "string")
		nodename = node;
	else if(node instanceof HTMLElement)
		nodename = node.nodeName;
	else if(typeof node.NODENAME === "string")
		nodename = node.NODENAME;
	else throw new Error(`${typeof node} is not supported as parameter "node"!`);

   return `${nodename.toLowerCase()}${separator}${eventType}`;
};

/**
 * Creates the event name dispatched when a component's attribute changes,
 * e.g. `d-button--attribute--disabled`.
 *
 * @param {string} attribute - the name of the changed attribute.
 * @param {string|HTMLElement|Component} node - the node the event belongs to (see {@link componentEventname}).
 * @param {string} [separator=SETTING.eventSeparator] - separator used within the event name; defaults to `"--"`.
 * @returns {string} the attribute-change event name.
 */
export const attributeChangeEventname = (attribute, node, separator = SETTING.eventSeparator  ) => {
    return componentEventname(`${attributeChangeEventPrefix}${separator}${attribute}`, node, separator);
};

export default {componentEventname, attributeChangeEventname}
