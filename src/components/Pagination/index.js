import defineComponent from "../../utils/DefineComponentHelper";
import { componentEventname } from "../../utils/EventHelper";
import { Renderer, Template } from "@default-js/defaultjs-template-language";
import { loadTemplate, ATTR_TEMPLATE } from "../../TemplateHelper";
import Component from "../../Component";

const ATTR_PAGE = "page";
const ATTR_COUNT = "count";
const ATTR_SIZE = "size";
const ATTR_DISABLED_SHADOW_DOM = "disabled-shadow-dom";
const ATTR_DATA_PAGE = "data-page";
const ATTRIBUTES = [ATTR_PAGE, ATTR_COUNT, ATTR_SIZE, ATTR_TEMPLATE];

const TEMPLATE = Template.load(
	`
<nav class="pagination" jstl-if="\${pages.length > 1}">
	<ul>
		<li class="pagination-first \${page == 1 ? 'disabled' : ''}" ?data-page="\${page != 1}" data-page="1">first</li>
		<li class="pagination-back \${page == 1 ? 'disabled' : ''}" ?data-page="\${page != 1}" data-page="\${page - 1}">prev</li>

		<jstl jstl-foreach="\${pages}">
			<li class="pagination-page \${page == item ? 'active' : ''}" ?data-page="\${page != item}" data-page="\${item}">\${item}</li>
		</jstl>

		<li class="pagination-next \${page >= count ? 'disabled' : ''}" ?data-page="\${count > page}" data-page="\${page + 1}">next</li>
		<li class="pagination-last \${page >= count ? 'disabled' : ''}" ?data-page="\${count > page}" data-page="\${count}">prev</li>
	</ul>
</nav>
`,
	false,
);

const toData = (page, count, size) => {
	const pages = [];
	const meridian = Math.floor(size / 2);
	let start = 1;
	let end = size;
	if (size > count) end = count;
	else if (page + meridian > count) {
		end = count;
		start = end - size + 1;
	} else if (page - meridian > 1) {
		end = page + meridian;
		start = end - size + 1;
	}
	for (let i = start; i <= end; i++) pages.push(i);

	return { start, end, pages, page, count, size };
};

class Pagination extends Component {
	static get observedAttributes() {
		return ATTRIBUTES;
	}

	constructor() {
		super();
	}

	async init() {
		const defaultTemplate = await TEMPLATE;
		const template = await loadTemplate(this, defaultTemplate);
		this.__root__ = this;
		if (!this.disabledShadowDom && template != defaultTemplate) {
			this.attachShadow({ mode: "open" });
			this.__root__ = this.shadowRoot;
		}
		this.__root__.on("click", (event) => {
			const { target } = event;
			let page = Number.NaN;
			page = parseInt(target.attr(ATTR_DATA_PAGE));
			if (Number.isNaN(page)) {
				const parent = target.parent("[" + ATTR_DATA_PAGE + "]");
				if (parent) page = parseInt(parent.attr(ATTR_DATA_PAGE));
			}
			if (!Number.isNaN(page)) {
				this.trigger(componentEventname("to-page", this), page);
				event.preventDefault();
				event.stopPropagation();
			}
		});

		this.renderer = new Renderer({ template });
		this.render();

		this.on(componentEventname("change", this), () => {
			this.render();
		});
	}

	get page() {
		return parseInt(this.attr(ATTR_PAGE));
	}
	set page(page) {
		this.attr(ATTR_PAGE, page);
	}

	get count() {
		return parseInt(this.attr(ATTR_COUNT));
	}
	set count(count) {
		this.attr(ATTR_COUNT, count);
	}

	get size() {
		return parseInt(this.attr(ATTR_SIZE));
	}
	set size(size) {
		this.attr(ATTR_SIZE, size);
	}

	get disabledShadowDom() {
		return this.hasAttribute(ATTR_DISABLED_SHADOW_DOM);
	}

	async render() {
		const page = parseInt(this.attr(ATTR_PAGE) || "1");
		const count = parseInt(this.attr(ATTR_COUNT) || "0");
		const size = parseInt(this.attr(ATTR_SIZE) || "10");
		const data = toData(page, count, size);

		this.renderer.render({ data, container: this.__root__ });
	}
}

defineComponent("pagination", Pagination);
export default Pagination;
