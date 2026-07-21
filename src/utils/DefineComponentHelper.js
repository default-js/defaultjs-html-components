import { componentPrefix } from "../Constants.js";

/**
 * @module utils/DefineComponentHelper
 *
 * Helpers to build tag names and register custom elements.
 */

/**
 * Builds a custom-element tag name by prefixing `name`.
 *
 * @param {string} name - the base name of the element.
 * @param {string} [prefix] - the prefix to use; defaults to {@link componentPrefix} (`"d-"`) when omitted.
 * @returns {string} the prefixed tag name.
 */
export const toNodeName = (name, prefix) => {
	if(typeof prefix === "string")
		return prefix + name;

	return componentPrefix + name;
};

/**
 * Registers a component class as a custom element, using its static `NODENAME`
 * as tag name. Registration is skipped when an element with that name already
 * exists.
 *
 * @param {CustomElementConstructor} clazz - the component class to register; must expose a static `NODENAME`.
 * @param {ElementDefinitionOptions} [options] - options forwarded to `customElements.define`.
 */
export const define = function(clazz, options) {
	const nodename = clazz.NODENAME;
	if (!customElements.get(nodename)) {
		customElements.define(nodename, clazz, options);
	}
};


export default define;
