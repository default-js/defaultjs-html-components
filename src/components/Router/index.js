import { toNodeName, define } from "../../utils/DefineComponentHelper";
import { componentEventname } from "../../utils/EventHelper";
import { Renderer, Template } from "@default-js/defaultjs-template-language";
import { loadTemplate, ATTR_TEMPLATE } from "../../TemplateHelper";
import Component from "../../Component";


const NODENAME = toNodeName("router");
class Router extends Component {
	static get NODENAME() { return NODENAME; }
	
	constructor() {
		super();
	}
	
	async init() {
		
	}
}

define(Router);
export default Router;