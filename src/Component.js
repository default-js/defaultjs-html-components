import { lazyPromise } from "@default-js/defaultjs-common-utils/src/PromiseUtils";
import { uuid } from "@default-js/defaultjs-common-utils/src/UUID";
import { initTimeout, triggerTimeout } from "./Constants";
import { attributeChangeEventname, componentEventname } from "./utils/EventHelper";
import { privatePropertyAccessor } from "@default-js/defaultjs-common-utils/src/PrivateProperty";

const PRIVATE_READY = privatePropertyAccessor("ready");

const TIMEOUTS = new WeakMap();
const init = (component) => {
	let timeout = TIMEOUTS.get(component);
	if (timeout) clearTimeout(timeout);

	TIMEOUTS.get(component, setTimeout(async () => {
		TIMEOUTS.delete(component);
		const ready = PRIVATE_READY(component);
		try{
			await component.init();
			ready.resolve();
		}catch(e){
			console.error("Can't initialize component!", component, e);
			ready.resolve(e);
		}
		component.trigger(componentEventname("initialzed", component));
	}, initTimeout));	
};

export const createUID = (prefix, suffix) => {
	let count = 0;
	let id = null;
    while(count < 100){
		id = `${prefix ? prefix : ""}${uuid()}${suffix ? suffix : ""}`;
		if(!document.getElementById(id))
			return id;

		count++;
	}
	console.error(new Error("To many retries to create an unique id - created id is not unique!"));
	return id;
};



const buildClass = (htmlBaseType) =>{
	return class Component extends htmlBaseType {

		
		constructor({shadowRoot = false, content = null, createUID = false, uidPrefix = "id-", uidSuffix = ""} = {}) {
			super();
			PRIVATE_READY(this, lazyPromise());
			
	
			if(createUID)
				this.attr("id", createUID(uidPrefix, uidSuffix));
	
			if(shadowRoot)
				this.attachShadow({mode:"open"});
			
			if(content)
				this.root.append(typeof content === "function" ? content(this) : content);
		}
	
		get root(){
			return this.shadowRoot || this;
		}
	
		get ready(){
			return PRIVATE_READY(this);
		}
	
		async init() {}
	
		async destroy() {
			if(this.ready.resolved)
				PRIVATE_READY(this, lazyPromise());
		}
	
		connectedCallback() {
			if (this.ownerDocument == document && this.isConnected) init(this);
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
	
		disconnectedCallback(){
			this.destroy();
		}
	};
} 

const CLAZZMAP = new Map();

export const componentBaseOf = (htmlBaseType) => {
	let clazz = CLAZZMAP.get(htmlBaseType);
	if(clazz == null){
		clazz = buildClass(htmlBaseType);
		CLAZZMAP.set(htmlBaseType, clazz);
	}

	return clazz;
}

const Component = componentBaseOf(HTMLElement);



export default Component;
