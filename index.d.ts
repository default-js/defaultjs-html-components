/**
 * Type definitions for @default-js/defaultjs-html-components
 *
 * Public API surface exported from `index.js`. The component instances also
 * carry the DOM-extension methods (`attr`, `find`, `trigger`, `parent`, …)
 * added globally by `@default-js/defaultjs-extdom`; those are provided by that
 * package's own augmentation and are intentionally not redeclared here.
 */

// #region shared types

/**
 * A promise whose settlement can be triggered from the outside and that
 * exposes a `resolved` flag. Created by {@link Ready}.
 */
export interface LazyPromise<T = any> extends Promise<T> {
	/** Resolves the promise with the given value. */
	resolve(value?: T): void;
	/** Rejects the promise with the given reason. */
	reject(reason?: any): void;
	/** `true` once the promise has settled. */
	readonly resolved: boolean;
}

/** Node-like value accepted when building component event names. */
export type EventNameNode = string | HTMLElement | { readonly NODENAME: string };

/** Options accepted by the {@link Component} constructor. */
export interface ComponentOptions {
	/** When `true` an open shadow root is attached. Defaults to `false`. */
	shadowRoot?: boolean;
	/**
	 * Content appended to the component's root. A function receives the
	 * component instance and returns the content. Defaults to `null`.
	 */
	content?: Node | string | ((component: Component) => Node | string) | null;
	/** When `true` a unique `id` attribute is assigned during {@link Component.init}. Defaults to `false`. */
	createUID?: boolean;
	/** Prefix used for the generated id when `createUID` is `true`. Defaults to `"id-"`. */
	uidPrefix?: string;
	/** Suffix used for the generated id when `createUID` is `true`. Defaults to `""`. */
	uidSuffix?: string;
	/** Additional post-construct functions run during {@link Component.init}. */
	postConstructs?: Array<(component: Component) => void | Promise<any>> | null;
	/**
	 * @deprecated misspelled alias of {@link ComponentOptions.postConstructs};
	 * use `postConstructs` instead. Still honored for backwards compatibility.
	 */
	postConstucts?: Array<(component: Component) => void | Promise<any>> | null;
}

// #endregion

// #region Component

/**
 * Instance shape of an asynchronous web component. Concrete instances also
 * extend the underlying HTML element type (see {@link componentBaseOf}).
 */
export interface Component {
	/** Post-construct functions run during {@link Component.init}. */
	readonly postConstructs: Array<Function>;
	/** The render root: the shadow root when present, otherwise the component itself. */
	readonly root: HTMLElement | ShadowRoot;
	/** Promise that resolves once {@link Component.init} has completed. */
	readonly ready: LazyPromise;
	/** Runs all post-construct functions in order. */
	init(): Promise<void>;
	/** Resets the `ready` promise so the component can be initialized again. */
	destroy(): Promise<void>;
	connectedCallback(): void;
	adoptedCallback(): void;
	attributeChangedCallback(name: string, oldValue: string | null, newValue: string | null): void;
	disconnectedCallback(): void;
}

/**
 * Constructor produced by {@link componentBaseOf}. Carries the static members
 * of the extended HTML element type plus the component-specific statics.
 */
export type ComponentConstructor<TBase extends typeof HTMLElement = typeof HTMLElement> =
	// keep the static members of the base type but drop its construct signature,
	// so the component construct signature below is the only one.
	{ [K in keyof TBase]: TBase[K] } & {
		new (options?: ComponentOptions): InstanceType<TBase> & Component;
		/** Tag name used to register the component; must be overridden on concrete classes. */
		readonly NODENAME: string;
		/** Registers this component class as a custom element. */
		define: typeof define;
		/** Attributes observed for {@link Component.attributeChangedCallback}. */
		readonly observedAttributes: string[];
	};

/**
 * Returns the component base class for the given HTML element type. Classes are
 * cached, so repeated calls with the same base type return the same class.
 *
 * @param htmlBaseType - the HTML element class to extend.
 * @returns the (cached) component class extending `htmlBaseType`.
 */
export function componentBaseOf<TBase extends typeof HTMLElement>(htmlBaseType: TBase): ComponentConstructor<TBase>;

/** Default component base class extending {@link HTMLElement}. */
export const Component: ComponentConstructor<typeof HTMLElement>;

/**
 * Creates a document-unique id by combining an optional prefix and suffix with
 * a generated uuid. Retries up to 100 times; logs an error and returns the last
 * candidate when no unique id can be produced.
 *
 * @param prefix - text prepended to the generated uuid.
 * @param suffix - text appended to the generated uuid.
 * @returns a (best-effort) document-unique id.
 */
export function createUUID(prefix?: string, suffix?: string): string;

// #endregion

// #region utils

/**
 * Registers a component class as a custom element, using its static `NODENAME`
 * as tag name. Registration is skipped when the name is already taken.
 *
 * @param clazz - the component class to register; must expose a static `NODENAME`.
 * @param options - options forwarded to `customElements.define`.
 */
export function define(clazz: ComponentConstructor<any>, options?: ElementDefinitionOptions): void;

/**
 * Builds a custom-element tag name by prefixing `name`.
 *
 * @param name - the base name of the element.
 * @param prefix - the prefix to use; defaults to `"d-"` when omitted.
 * @returns the prefixed tag name.
 */
declare function toNodeName(name: string, prefix?: string): string;

/**
 * Creates the event name for a component event, composed of the node's tag
 * name, the separator and the event type.
 *
 * @param eventType - the event type, e.g. `"change"`.
 * @param node - the node the event belongs to.
 * @param separator - separator between node name and event type; defaults to `SETTING.eventSeparator`.
 * @returns the lower-cased event name.
 */
declare function componentEventname(eventType: string, node: EventNameNode, separator?: string): string;

/**
 * Creates the event name dispatched when a component's attribute changes.
 *
 * @param attribute - the name of the changed attribute.
 * @param node - the node the event belongs to.
 * @param separator - separator used within the event name; defaults to `SETTING.eventSeparator`.
 * @returns the attribute-change event name.
 */
declare function attributeChangeEventname(attribute: string, node: EventNameNode, separator?: string): string;

/**
 * Walks up the ancestor chain and returns the first ancestor matching `check`.
 *
 * @param node - the node to start from.
 * @param check - predicate applied to each ancestor.
 * @returns the first matching ancestor, or `null`.
 */
declare function findParent(node: Node, check: (node: Node) => boolean): Node | null;

/**
 * Searches the descendants of `node` and returns the matching node closest to
 * it (smallest depth).
 *
 * @param node - the root of the search.
 * @param check - predicate applied to each descendant.
 * @returns the shallowest matching descendant, or `null`.
 */
declare function findClosestInDepth(node: Node, check: (node: Node) => boolean): Node | null;

/** Name of the global variable holding the base path for component stylesheets. */
declare const CSS_BASE_PATH_VAR: string;

/**
 * Clones the `<style>` and `<link rel="stylesheet">` elements of `source` into
 * `target`.
 *
 * @param source - the node to read the style elements from.
 * @param target - the node the cloned styles are added to.
 * @param append - when `true` (default) styles are appended, otherwise prepended.
 */
declare function copyStyles(source: Element, target: Element, append?: boolean): void;

/**
 * Appends a `<link rel="stylesheet">` to `target` pointing at the stylesheet
 * named after the target's tag name.
 *
 * @param target - the element the stylesheet link is added to.
 */
declare function loadComponentStyle(target: Element): void;

/**
 * A per-reference data store backed by a {@link WeakMap}. Data is
 * garbage-collected automatically once the reference is no longer reachable.
 */
declare class WeakData {
	constructor();
	/** Returns the data object associated with `reference`, creating one on first access. */
	data(reference: object): Record<string, any>;
	/** Reads the value stored under `key` for `reference`. */
	value(reference: object, key: string): any;
	/** Writes `value` under `key`, or deletes the key when `value` is `undefined`. */
	value(reference: object, key: string, value: any): void;
	/** Removes all data associated with `reference`. */
	destroy(reference: object): void;
}

/** Aggregated helper modules of the component toolbox. */
export const utils: {
	DefineComponentHelper: typeof define;
	EventHelper: {
		componentEventname: typeof componentEventname;
		attributeChangeEventname: typeof attributeChangeEventname;
	};
	NodeHelper: {
		findParent: typeof findParent;
		findClosestInDepth: typeof findClosestInDepth;
	};
	StyleHelper: {
		CSS_BASE_PATH_VAR: string;
		copyStyles: typeof copyStyles;
		loadComponentStyle: typeof loadComponentStyle;
	};
	WeakData: typeof WeakData;
};

// #endregion

/** Factory for a {@link LazyPromise}; re-exported from `Ready.js`. */
export const Ready: <T = any>() => LazyPromise<T>;

/** Mutable runtime settings influencing generated event names. */
export const SETTING: {
	/** Separator between node name and event type. Defaults to `"--"`. */
	eventSeparator: string;
};
