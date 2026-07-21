/**
 * @module utils/WeakData
 */

/**
 * A per-reference data store backed by a {@link WeakMap}. Data associated with
 * a reference is garbage-collected automatically once the reference itself is
 * no longer reachable, which makes it safe for storing state for DOM nodes.
 */
export default class WeakData {

	#weakmap = new WeakMap();

	constructor() {
	}

	/**
	 * Returns the data object associated with the given reference, creating an
	 * empty one on first access.
	 *
	 * @param {Object} reference - the key the data is associated with.
	 * @returns {Object} the (possibly newly created) data object.
	 */
	data(reference) {
		let data = this.#weakmap.get(reference);
		if (!data) {
			data = {};
			this.#weakmap.set(reference, data);
		}
		return data;
	}

	/**
	 * Reads, writes or deletes a single value on a reference's data object.
	 *
	 * - called with `(reference, key)` it returns the stored value;
	 * - called with `(reference, key, undefined)` it deletes the key;
	 * - called with `(reference, key, value)` it stores the value.
	 *
	 * @param {Object} reference - the key the data is associated with.
	 * @param {string} key - the property name to read, write or delete.
	 * @param {*} [value] - the value to store; pass `undefined` to delete the key.
	 * @returns {*} the stored value when used as a getter, otherwise `undefined`.
	 * @throws {Error} when called with fewer than two arguments.
	 */
	value(reference, key, value) {
		if (arguments.length < 2) throw new Error("reference and key required")
		if (arguments.length == 2) return this.data(reference)[key];
		else if(typeof value === "undefined") delete this.data(reference)[key];
		else this.data(reference)[key] = value;
	}

	/**
	 * Removes all data associated with the given reference.
	 *
	 * @param {Object} reference - the key whose data should be discarded.
	 */
	destroy(reference){
		this.#weakmap.delete(reference);
	}
};
