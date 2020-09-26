import defineComponent from "../../utils/DefineComponentHelper";
import { componentEventname } from "../../utils/EventHelper";
import { Renderer, Template } from "@default-js/defaultjs-template-language";
import { loadTemplate, ATTR_TEMPLATE } from "../../TemplateHelper";
import Component from "../../Component";

const ATTRIBUTES = [ATTR_TEMPLATE];

const TEMPLATE = create(`
<jstl foreach="\${items}">
	<option value="\${item.key}">\${item.title}</option>
</jstl>`,true);

class Typeahead extends Component {
	static get observedAttributes() {
		return ATTRIBUTES;
	}

	constructor() {
		super();
	}

	async init() {		
		const template = await loadTemplate(this, TEMPLATE);
		this.__root__ = this;
		if (!this.disabledShadowDom && template != TEMPLATE) {
			this.attachShadow({ mode: "open" });
			this.__root__ = this.shadowRoot;
		}

		this.renderer = new Renderer({ template });
		this.render();

		this.on(componentEventname("change", this), () => {
			this.render();
		});
	}

	get disabledShadowDom() {
		return this.hasAttribute(ATTR_DISABLED_SHADOW_DOM);
	}

	async render() {	
		this.renderer.render({ data, container: this.__root__ });
	}
}

defineComponent("typeahead", Typeahead);
export default Typeahead;
