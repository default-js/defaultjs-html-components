import Component from "../../Component";
import { toNodeName, define } from "../../utils/DefineComponentHelper";
import { defValue } from "@default-js/defaultjs-common-utils/src/ObjectUtils";
import { privateProperty } from "@default-js/defaultjs-common-utils/src/PrivateProperty";
import { lazyPromise } from "@default-js/defaultjs-common-utils/src/PromiseUtils";
import Renderer from "@default-js/defaultjs-template-language/src/Renderer";
import Template from "@default-js/defaultjs-template-language/src/Template";

const NODENAME = toNodeName("renderer");
const NODENAME_JSONDATA = toNodeName("json-data").toUpperCase();
const NODENAME_REQUEST = toNodeName("request").toUpperCase();
const ATTRIBUTE_TEMPLATE = "template";
const ATTRIBUTE_DATA = "data";
const ATTRIBUTE_RENDER_MODE = "render-mode";
const ATTRIBUTE_SHADOWMODE = "shadowmode";

const ATTRIBUTES = [ATTRIBUTE_TEMPLATE, ATTRIBUTE_DATA, ATTRIBUTE_RENDER_MODE];

const PRIVATE_TEMPLATE = "template";
const PRIVATE_DATA = "data";
const PRIVATE_RENDER_TIMEOUT = "renderTimeout";

const findElement = (element, selector) => {
	try {
		return find(selector).first();
	} catch (e) {}
};

const loadTemplate = async (element) => {
	const value = element.attr(ATTRIBUTE_TEMPLATE);
	let template = null;
	if (value) {
		template = findElement(element, value);
		if (template instanceof HTMLTemplateElement) return await Template.load(template, false);
		else template = await Template.load(new URL(value, location));
	} else if (element.childNodes && element.childNodes.length > 0) template = await Template.load(element.childNodes, false);

	return template;
};

const callRender = (element) => {
	const timeout = privateProperty(element, PRIVATE_RENDER_TIMEOUT);
	if (timeout) clearTimeout(timeout);

	privateProperty(
		element,
		PRIVATE_RENDER_TIMEOUT,
		setTimeout(() => {
			privateProperty(element, PRIVATE_RENDER_TIMEOUT, null);
			element.render();
		}, 100),
	);
};

class JSTLRendererElement extends Component {
	static get observedAttributes() {
		return ATTRIBUTES;
	}

	static get NODENAME() {
		return NODENAME;
	}

	constructor() {
		super();
		if (this.hasAttribute(ATTRIBUTE_SHADOWMODE)) this.attachShadow({ mode: open });
	}

	get root() {
		return this.shadowRoot || this;
	}

	async init() {
		await super.init();

		if (!this.ready.resolved) {
			privateProperty(this, PRIVATE_TEMPLATE, await loadTemplate(this));
			await this.render();
		}
	}

	async getTemplate() {
		return privateProperty(this, PRIVATE_TEMPLATE);
	}

	async setTemplate(template) {
		privateProperty(this, PRIVATE_TEMPLATE, await Template.load(template));
	}

	async getData() {
		const privateData = privateProperty(this, PRIVATE_DATA);
		if (privateData) return privateData;

		const value = this.attr(ATTRIBUTE_DATA);
		let data = null;
		if (value) {
			data = findElement(this, value);
			if (data) {
				if (data.nodeName == NODENAME_JSONDATA) data = data.json;
				else if (data.nodeName == NODENAME_REQUEST) {
					data = await data.execute({});
					data = data.json();
				} else if (data instanceof HTMLElement) {
					data = data.textContent;
					if (data && data.trim().length > 0) data = JSON.parse(data);
				}
			} else {
				data = await fetch(new URL(value, location).toString());
				data = await data.json();
			}
		}

		return data;
	}

	async setData(data) {
		await this.ready;
		privateProperty(this, PRIVATE_DATA, data);
	}

	async render({ template, data } = {}) {
		const container = this.root;

		if (template) template = await Template.load(template);
		else template = await this.getTemplate(this);
		if (!template) return;

		if (!data) data = await this.getData(this);
		if (!data) data = {};

		await Renderer.render({ template, data, container, mode: this.attr(ATTRIBUTE_RENDER_MODE) });
	}

	attributeChangedCallback(name, oldValue, newValue) {
		if (oldValue != newValue && this.isConnected) {
			if (name == ATTRIBUTE_TEMPLATE) loadTemplate(this);
			callRender(this);
		}
	}
}

define(JSTLRendererElement);
export default JSTLRendererElement;
