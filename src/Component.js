import { initTimeout, triggerTimeout } from "./Constants";
import "@default-js/defaultjs-extdom";
import { attributeChangeEventname, componentEventname } from "./utils/EventHelper";
import WeakData from "./utils/WeakData";

const TIMEOUTS = new WeakData();

const init = (component) => {
	const data = TIMEOUTS.data(component);
	if (data.initialize) clearTimeout(data.initialize);

	data.initialize = setTimeout(async () => {
		delete data.initialize;

		Promise.resolve(component.init()).then(() => {
			this.trigger(componentEventname("initialzed", this));
		});
	}, initTimeout);
};

class Component extends HTMLElement {
	constructor() {
		super();
	}

	async init() {}

	connectedCallback() {
		init(this);
	}

	adoptedCallback() {
		this.connectedCallback();
	}

	attributeChangedCallback(name, oldValue, newValue) {
		if (oldValue != newValue) {
			const type = typeof this[name];
			if (type !== "undefined" && type !== "function") this[name] = newValue;
			if (this.isConnected) {
				this.trigger(triggerTimeout, attributeChangeEventname(name, this));
				this.trigger(triggerTimeout, componentEventname("change", this));
			}
		}
	}
}

export default Component;
