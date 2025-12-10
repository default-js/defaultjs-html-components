export default class WeakData {

	#weakmap = new WeakMap();

	constructor() {
	}

	data(reference) {
		let data = this.#weakmap.get(reference);
		if (!data) {
			data = {};
			this.#weakmap.set(reference, data);
		}
		return data;
	}

	value(reference, key, value) {
		if (arguments.length == 2) return this.data(reference)[key];
		else if(typeof value === "undefined") delete this.data(reference)[key];
		else this.data(reference)[key] = value;
	}

	destroy(){
		this.#weakmap.delete(reference);
	}
};

