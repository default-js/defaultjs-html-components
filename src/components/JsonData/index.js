import { toNodeName, define } from "../../utils/DefineComponentHelper";
import Component from "../../Component";

const NODENAME = toNodeName("json-data");

class JsonData extends Component {

	static get NODENAME() { return NODENAME; }

	constructor() {
		super();
		this.style.display = "none !important";
		this.__observer__ = new MutationObserver(() => { this.reinit(); });
		this.__observer__.observe(this, { childList: true, characterData: true });
	}

	async init() { }
	async reinit() { delete this.__json__; }

	get json() {
		if (this.__json__)
			this.__json__ = JSON.parse(this.textContent);

		return this.__json__;
	}
}

define(JsonData);
export default Request;
