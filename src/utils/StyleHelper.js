import Global from "@default-js/defaultjs-common-utils/src/Global.js";

/**
 * @module utils/StyleHelper
 *
 * Helpers to copy existing styles between nodes and to load a component's
 * stylesheet by convention.
 */

/**
 * Clones all `<style type="text/css">` and `<link rel="stylesheet">` elements
 * found in `source` and adds them to `target`.
 *
 * @param {Node} source - the node to read the style elements from.
 * @param {Node} target - the node the cloned styles are added to.
 * @param {boolean} [append=true] - when `true` the styles are appended, otherwise prepended.
 */
export const copyStyles = (source, target, append = true) => {
	const styles = Array.from(source.find(`style[type="text/css"], link[rel="stylesheet"]`))
		.map((style) => style.cloneNode(true));

	if (append)
		target.append(...styles);
	else
		target.prepend(...styles);
}

/**
 * Name of the global variable holding the base path used by
 * {@link loadComponentStyle} to resolve component stylesheets.
 *
 * @type {string}
 */
export const CSS_BASE_PATH_VAR = "CSS_BASE_PATH";

/**
 * Appends a `<link rel="stylesheet">` to `target` pointing at the stylesheet
 * named after the target's tag name. The directory is taken from the global
 * {@link CSS_BASE_PATH_VAR} variable and defaults to `"css"`.
 *
 * @param {HTMLElement} target - the element the stylesheet link is added to.
 */
export const loadComponentStyle = (target) => {
	const path = `${Global[CSS_BASE_PATH_VAR] || "css"}/${target.nodeName.toLowerCase()}.css`;
	target.append(`<link rel="stylesheet" href="${path}"/>`);
}

export default { CSS_BASE_PATH_VAR, copyStyles, loadComponentStyle };
