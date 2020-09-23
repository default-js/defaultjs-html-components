import defineComponent from "../../utils/DefineComponentHelper";
import { componentEventname } from "../../utils/EventHelper";
import { Renderer, Template } from "@default-js/defaultjs-template-language";
import Component from "../../Component";
import WeakData from "../../utils/WeakData";

const ATTR_PAGE = "page";
const ATTR_COUNT = "count";
const ATTR_SIZE = "size";
const ATTR_TEMPLATE = "template";
const ATTRIBUTES = [ATTR_PAGE, ATTR_COUNT, ATTR_SIZE, ATTR_TEMPLATE];

const DATA = new WeakData();

const TEMPLATE = create(`
<nav class="pagination" jstl-if="\${pages.length > 1}">
	<ul>
		<li class="pagination-first \${page == 1 ? 'disabled' : ''}" ?@click:delegate="\${page != 1}" @click:delegate="pagination-to-page" data-page="1">first</li>
		<li class="pagination-back \${page == 1 ? 'disabled' : ''}" ?@click:delegate="\${page > 1}" @click:delegate="pagination-to-page" data-page="\${page - 1}">prev</li>

		<jstl jstl-foreach="\${pages}">
			<li class="pagination-page \${item == page ? 'active' : ''}" ?@click:delegate="\${item != page}" @click:delegate="pagination-to-page" data-page="\${item}">\${item}</li>
		</jstl>

		<li class="pagination-next \${page >= count ? 'disabled' : ''}" ?@click:delegate="\${count > page}" @click:delegate="pagination-to-page" data-page="\${page + 1}">next</li>
		<li class="pagination-last \${page >= count ? 'disabled' : ''}" ?@click:delegate="\${count != page}" @click:delegate="pagination-to-page" data-page="\${count}">last</li>
	</ul>
</nav>
`, true);

const getTemplate = (node) => {
	let template = node.find(":scope > template").first();
	if (!!template) return template;
	const value = node.attr(ATTR_TEMPLATE);
	if(!value) return TEMPLATE;
	if (!!value) template = find(value).first();
	if (!!template) return template;
	return new URL(value, location.origin);
};

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

const render = async (pagination, setting) => {
	const page = parseInt(pagination.attr(ATTR_PAGE) || "1");
	const count = parseInt(pagination.attr(ATTR_COUNT) || "0");
	const size = parseInt(pagination.attr(ATTR_SIZE) || "10");
	const data = toData(page, count, size);

	setting.renderer.render({ data, container: pagination });
};

class Pagination extends Component {
	static get observedAttributes() {
		return ATTRIBUTES;
	}

	constructor() {
		super();
	}

	async init() {
		const data = DATA.data(this);
		const template = await Template.load(getTemplate(this));
		data.renderer = new Renderer({ template });
		render(this, data);

		this.on(componentEventname("change", this), () => {
			const data = DATA.data(this);
			render(this, data);
		});
	}

	get page(){
		return parseInt(this.attr(ATTR_PAGE));
	}
	set page(page){
		this.attr(ATTR_PAGE, page);
	}

	get count(){
		return parseInt(this.attr(ATTR_COUNT));
	}
	set count(count){
		this.attr(ATTR_COUNT, count);
	}

	get size(){
		return parseInt(this.attr(ATTR_SIZE));
	}
	set size(size){
		this.attr(ATTR_SIZE, size);
	}

}

defineComponent("pagination", Pagination);
export default Pagination;
