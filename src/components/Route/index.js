import { toNodeName, define } from "../../utils/DefineComponentHelper";
import { componentEventname } from "../../utils/EventHelper";
import { Renderer, Template } from "@default-js/defaultjs-template-language";
import { loadTemplate, ATTR_TEMPLATE } from "../../TemplateHelper";
import Component from "../../Component";

const NODENAME = toNodeName("route");


export const ATTR_ACTIVE = "active";
export const ATTR_COMPONENT_TAG = "component-tag";
export const ATTR_COMPONENT_TAG_ATTRIBUTES = "tag-attributes";
export const ATTR_INIT_PARAMS = "init-params"
const ATTRIBUTES = [ATTR_COMPONENT, ATTR_TAG_ATTRIBUTES, ATTR_INIT_PARAMS];

const EVENT_ACTIVATE = NODENAME + "-activate";
const EVENT_DEACTIVATE = NODENAME + "-deactivate";
const EVENTS = [EVENT_ACTIVATE, EVENT_DEACTIVATE];


const getInitParams = (route) => {
	
}

const getAppContext = (route) => {
	
	let node = route.parent();
	let app = null;
	while(node != null){
		
		if(node instanceof Router)
	}
	
		
}


class Route extends Component {
	static get observedAttributes() {
		return ATTRIBUTES;
	}

	static get NODENAME() { return NODENAME; }

	static get EVENTS() { return EVENTS; }

	constructor() {
		super();
	}	

	async init() {
	}	

	get active() {
		return this.hasAttribute(ATTR_ACTIVE);
	}

	set active(active) {
		const current = this.active;
		if (active != current) {
			this.attr(ATTR_ACTIVE, active ? "" : null);
			if (active) {
				this.trigger(EVENT_ACTIVATE);
			} else {
				this.trigger(EVENT_DEACTIVATE);
				delete this.__component__;
			}

		}
	}

	get component() {
		if (!this.__component__) {
			const type = this.attr(ATTR_TAG)
			customElements.get()			
		}
		return this.__component__;
	}
}

define(Route);
export default Route;