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

const getTemplate = (node) => {
	let template = node.find(":scope > template").first();
	if (!!template) return template;
	template = node.attr(ATTR_TEMPLATE);
	if (!template) template = find(template).first();
	if (!!template) return template;
	return new URL(template, location.origin);
};

const toData = (page, count, size) => {
	const meridian = Math.floor(size / 2);
	const start = Math.max(1, page - meridian);
	const end = Math.min(page + Math.min(meridian, count), count);
	return { start, end, page, count, size };
};

const render = async (pagination, setting) => {
	const page = parseInt(pagination.attr(ATTR_PAGE) || "1");
	const count = parseInt(pagination.attr(ATTR_COUNT) || "0");
	const size = parseInt(pagination.attr(ATTR_SIZE) || "10");
    const data = toData(page, count, size);
    
    console.log({data});

	setting.renderer.render({ data, container: pagination });
};

class Pagination extends Component {
	static get observedAttributes() {
		return ATTRIBUTES;
	}

	constructor() {
		super();
		this.on(componentEventname("change", this), () => {
			const data = DATA.data(this);
			render(this, data);
		});
	}

	async init() {
		const data = DATA.data(this);
		const template = await Template.load(getTemplate(this));
		data.renderer = new Renderer({template});
		render(this, data);
	}
};

defineComponent("pagination", Pagination);
export default Pagination;
