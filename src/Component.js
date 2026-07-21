import { lazyPromise } from "@default-js/defaultjs-common-utils/src/PromiseUtils.js";
import {define} from "./utils/DefineComponentHelper.js";
import { uuid } from "@default-js/defaultjs-common-utils/src/UUID.js";
import { triggerTimeout } from "./Constants.js";
import { attributeChangeEventname, componentEventname } from "./utils/EventHelper.js";

/**
 * @module Component
 *
 * Factory and base class for asynchronous web components. A component exposes a
 * `ready` promise that resolves once all post-construct steps of {@link Component#init}
 * have run.
 */

/**
 * Creates a document-unique id by combining an optional prefix and suffix with
 * a generated {@link uuid}. It retries up to 100 times until the id is not yet
 * present in the document; if no unique id can be produced it logs an error and
 * returns the last generated id.
 *
 * @param {string} [prefix] - text prepended to the generated uuid.
 * @param {string} [suffix] - text appended to the generated uuid.
 * @returns {string} a (best-effort) document-unique id.
 */
export const createUUID = (prefix, suffix) => {
	let count = 0;
	let id = null;
	while (count < 100) {
		id = `${prefix ? prefix : ""}${uuid()}${suffix ? suffix : ""}`;
		if (!document.getElementById(id)) return id;

		count++;
	}
	console.error(new Error("To many retries to create an unique id - created id is not unique!"));
	return id;
};

/**
 * @typedef {Object} ComponentOptions
 * @property {boolean} [shadowRoot=false] - when `true` an open shadow root is attached.
 * @property {Node|string|function(Component): (Node|string)} [content=null] - content appended to the component's root; a function receives the component and returns the content.
 * @property {boolean} [createUID=false] - when `true` a unique `id` attribute is assigned during {@link Component#init}.
 * @property {string} [uidPrefix="id-"] - prefix used for the generated id when `createUID` is `true`.
 * @property {string} [uidSuffix=""] - suffix used for the generated id when `createUID` is `true`.
 * @property {Array<function(Component): (void|Promise)>} [postConstructs=null] - additional post-construct functions run during {@link Component#init}.
 * @property {Array<function(Component): (void|Promise)>} [postConstucts=null] - deprecated misspelled alias of `postConstructs`; use `postConstructs` instead.
 */

/**
 * Builds a component base class extending the given HTML element type.
 *
 * @param {typeof HTMLElement} htmlBaseType - the HTML element class to extend.
 * @returns {typeof HTMLElement} a component class extending `htmlBaseType`.
 */
const buildClass = (htmlBaseType) => {
	/**
	 * Asynchronous web component base class.
	 *
	 * @class Component
	 * @extends HTMLElement
	 */
	const clazz = class Component extends htmlBaseType {

		/**
		 * Tag name used to register the component. Must be overridden as a
		 * static getter on the concrete component class.
		 *
		 * @static
		 * @type {string}
		 * @throws {Error} always, on the base class.
		 */
		static get NODENAME() {throw new Error("NODENAME must be defined as static on component class!");}

		/**
		 * Registers this component class as a custom element.
		 *
		 * @static
		 * @type {typeof import("./utils/DefineComponentHelper.js").define}
		 */
		static define = define;

		/**
		 * Attributes observed for {@link Component#attributeChangedCallback}.
		 * Override to observe attributes.
		 *
		 * @static
		 * @readonly
		 * @type {Array<string>}
		 */
		static get observedAttributes() {
			return [];
		}

		#ready = null;
		#postConstructs = [];

		/**
		 * @param {ComponentOptions} [options={}] - configuration for the component.
		 */
		constructor({ shadowRoot = false, content = null, createUID = false, uidPrefix = "id-", uidSuffix = "", postConstructs = null, postConstucts = null } = {}) {
			super();
			this.#ready = lazyPromise();
			if (createUID) this.#postConstructs.push(async () => this.attr("id", createUUID(uidPrefix, uidSuffix)));

			if (shadowRoot) this.attachShadow({ mode: "open" });

			if (content) this.root.append(typeof content === "function" ? content(this) : content);

			// `postConstucts` is the deprecated (misspelled) alias of `postConstructs`
			if (postConstructs == null && postConstucts != null) {
				console.warn(`Component option "postConstucts" is deprecated - use "postConstructs" instead.`);
				postConstructs = postConstucts;
			}

			if(postConstructs instanceof Array)
				for(let post of postConstructs)
					if(typeof post === "function")
						this.#postConstructs.push(post)
		}


		/**
		 * Array of post construct functions
		 *
		 * @readonly
		 * @type {Array<Function>}
		 */
		get postConstructs(){
			return this.#postConstructs;
		}


		/**
		 * The render root of the component: the shadow root when present,
		 * otherwise the component itself.
		 *
		 * @readonly
		 * @type {HTMLElement|ShadowRoot}
		 */
		get root() {
			return this.shadowRoot || this;
		}


		/**
		 * Promise that resolves once {@link Component#init} has completed.
		 *
		 * @readonly
		 * @type {Promise}
		 */
		get ready() {
			return this.#ready;
		}

		/**
		 * Framework-internal initialization orchestrator: runs every post-construct
		 * function in order and then the overridable {@link Component#init} hook.
		 * Driven exclusively by {@link Component#connectedCallback} and
		 * {@link Component#reinit}; being private, the full lifecycle can never be
		 * triggered partially or by accident (e.g. a manual `init()` call).
		 *
		 * @async
		 * @returns {Promise} resolves with the return value of {@link Component#init}.
		 */
		async #runInit() {
			for (let func of this.#postConstructs) await func(this);
			return await this.init();
		}

		/**
		 * Runs the initialization orchestrator and settles {@link Component#ready}
		 * with its result.
		 *
		 * @returns {Promise} the {@link Component#ready} promise.
		 */
		#settle() {
			this.#runInit()
				.then((value) => this.#ready.resolve(value))
				.catch((error) => this.#ready.resolve(error));
			return this.#ready;
		}

		/**
		 * Override hook for asynchronous component setup. It runs automatically
		 * after the post-construct functions once the component is connected, and
		 * its return value settles {@link Component#ready}. `this.root` already
		 * points at the render root when it runs.
		 *
		 * Subclasses override this freely and **must not** call `super.init()` -
		 * the post-construct hooks are executed by the framework before this hook.
		 *
		 * @async
		 * @returns {*} an optional value used to resolve `ready`.
		 */
		async init() {
		}

		/**
		 * Resets the `ready` promise so the component can be initialized again.
		 * Invoked automatically from {@link Component#disconnectedCallback}.
		 *
		 * @async
		 * @returns {Promise}
		 */
		async destroy() {
			if (this.ready.resolved) this.#ready = lazyPromise();
		}

		/**
		 * Explicitly re-runs the full initialization (post-construct hooks and
		 * {@link Component#init}) on an already-created component, resetting
		 * {@link Component#ready} first when it had already settled.
		 *
		 * @returns {Promise} the (possibly new) {@link Component#ready} promise.
		 */
		reinit() {
			if (this.#ready.resolved) this.#ready = lazyPromise();
			return this.#settle();
		}

		/**
		 * Custom element lifecycle callback. Runs the initialization when the
		 * component is connected to the main document and settles the `ready`
		 * promise with the result.
		 */
		connectedCallback() {
			if (this.ownerDocument == document && this.isConnected)
				this.#settle();
		}

		/**
		 * Custom element lifecycle callback. Re-runs {@link Component#connectedCallback}
		 * when the component is adopted into another document.
		 */
		adoptedCallback() {
			this.connectedCallback();
		}

		/**
		 * Custom element lifecycle callback. Dispatches the attribute-change and
		 * component-change events when an observed attribute changes.
		 *
		 * @param {string} name - the name of the changed attribute.
		 * @param {?string} oldValue - the previous attribute value.
		 * @param {?string} newValue - the new attribute value.
		 */
		attributeChangedCallback(name, oldValue, newValue) {
			if (oldValue != newValue && this.isConnected) {
				this.trigger(triggerTimeout, attributeChangeEventname(name, this));
				this.trigger(triggerTimeout, componentEventname("change", this));
			}
		}

		/**
		 * Custom element lifecycle callback. Runs {@link Component#destroy} when
		 * the component is removed from the DOM.
		 */
		disconnectedCallback() {
			this.destroy();
		}
	};

	return clazz;
};

const CLAZZMAP = new Map();

/**
 * Returns the component base class for the given HTML element type. Classes are
 * cached, so repeated calls with the same base type return the same class.
 *
 * @param {typeof HTMLElement} htmlBaseType - the HTML element class to extend.
 * @returns {typeof HTMLElement} the (cached) component class extending `htmlBaseType`.
 */
export const componentBaseOf = (htmlBaseType) => {
	let clazz = CLAZZMAP.get(htmlBaseType);
	if (clazz == null) {
		clazz = buildClass(htmlBaseType);
		CLAZZMAP.set(htmlBaseType, clazz);
	}

	return clazz;
};

/**
 * Default component base class extending {@link HTMLElement}.
 *
 * @type {typeof HTMLElement}
 */
const Component = componentBaseOf(HTMLElement);

export default Component;
