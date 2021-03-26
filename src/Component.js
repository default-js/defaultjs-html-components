import { defValue } from "@default-js/defaultjs-common-utils/src/ObjectUtils";
import { lazyPromise } from "@default-js/defaultjs-common-utils/src/PromiseUtils";
import { uuid } from "@default-js/defaultjs-common-utils/src/UUID";
import { initTimeout, triggerTimeout } from "./Constants";
import { attributeChangeEventname, componentEventname } from "./utils/EventHelper";
import WeakData from "./utils/WeakData";

const TIMEOUTS = new WeakData();
const init = (component) => {
	const data = TIMEOUTS.data(component);
	if (data.initialize) clearTimeout(data.initialize);

	data.initialize = setTimeout(async () => {
		delete data.initialize;

		await component.init();
		component.ready.resolve();
		component.trigger(componentEventname("initialzed", component));
	}, initTimeout);
};

export const createUID = (prefix, suffix) => {
	let count = 0;
	let id = null;
    while(count < 100){
		id = `${prefix}${uuid()}${suffix}`;
		if(!document.getElementById(id))
			return id;

		count++;
	}
	console.error(new Error("To many retries to create an unique id - created id is not unique!"));
	return id;
};


class Component extends HTMLElement {
	constructor({shadowRoot = false, content = null, createUID = false, uidPrefix = "id-", uidSuffix = ""} = {}) {
		super();
		defValue(this, "ready", lazyPromise());

		if(createUID)
			this.attr("id", createUID(uidPrefix, uidSuffix));

		if(shadowRoot)
			this.attachShadow({mode:open});
		
		if(content)
			this.root.append(typeof content === "function" ? content(this) : content);
	}

	get root(){
		return this.shadowRoot || this;
	}

	async init() {}

	connectedCallback() {
		if (this.ownerDocument == document) init(this);
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
