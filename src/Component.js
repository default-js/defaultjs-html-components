import { initTimeout, triggerTimeout } from "./Constants";
import "@default-js/defaultjs-extdom";
import { attributeChangeEventname, componentEventname } from "./utils/EventHelper";
import WeakData from "./utils/WeakData";
import Ready from "./Ready";

const TIMEOUTS = new WeakData();
const init = (component) => {
	const data = TIMEOUTS.data(component);
	if (data.initialize) clearTimeout(data.initialize);

	data.initialize = setTimeout(async () => {
		delete data.initialize;

		await component.init()
		component.ready.resolve();
		component.trigger(componentEventname("initialzed", component));
	}, initTimeout);
};

class Component extends HTMLElement {
	constructor() {
		super();
		this.ready = Ready();
	}

	async init() {}

	connectedCallback() {
		if(this.ownerDocument == document)
			init(this);
	}

	adoptedCallback() {
		this.connectedCallback();
	}

	attributeChangedCallback(name, oldValue, newValue) {
		if (oldValue != newValue && this.isConnected) {
			this.trigger(triggerTimeout, attributeChangeEventname(name, this));
			this.trigger(triggerTimeout, componentEventname("change", this));
		}
	}
}

export default Component;
