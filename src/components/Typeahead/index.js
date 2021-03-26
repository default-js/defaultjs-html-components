import { privateProperty } from "@default-js/defaultjs-common-utils/src/PrivateProperty";
import { toNodeName, define } from "../../utils/DefineComponentHelper";
import { componentEventname } from "../../utils/EventHelper";
import { Renderer, Template } from "@default-js/defaultjs-template-language";
import { loadTemplate, ATTR_TEMPLATE } from "../../utils/TemplateHelper";
import Component from "../../Component";

const NODENAME = toNodeName("typeahead");
const ATTRIBUTES = [ATTR_TEMPLATE];

const TEMPLATE = create(
	`<jstl foreach="\${items}">
	<option value="\${item.key}">\${item.title}</option>
</jstl>`,
	true,
);

const EVENT__CHANGE = componentEventname("change", NODENAME);

const PRIVATE__RENDERER = "renderer";

class Typeahead extends Component {
	static get observedAttributes() {
		return ATTRIBUTES;
	}

	static get NODENAME() {
		return NODENAME;
	}

	constructor() {
		super();
	}

	async init() {
		await super.init();
		if (!this.ready.resolved) {
			const template = await loadTemplate(this, TEMPLATE);
			if (!this.disabledShadowDom && template != TEMPLATE)
				this.attachShadow({ mode: "open" });

			privateProperty(this, PRIVATE__RENDERER,new Renderer({ template }));

			this.on(EVENT__CHANGE, () => {
				this.render();
			});
		}
		this.render();
	}

	get disabledShadowDom() {
		return this.hasAttribute(ATTR_DISABLED_SHADOW_DOM);
	}

	async render() {
		const renderer = privateProperty(this, PRIVATE__RENDERER);
		renderer.render({ data, container: this.root });
	}
}

define(Typeahead);
export default Typeahead;
