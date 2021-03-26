import { privateProperty } from "@default-js/defaultjs-common-utils/src/PrivateProperty";
import { toNodeName, define } from "../../utils/DefineComponentHelper";
import Component from "../../Component";

const NODENAME = toNodeName("json-data");
const PRIVATE__OBSERVER = "observer";
const PRIVATE__JSON = "json";

class JsonData extends Component {
	static get NODENAME() {
		return NODENAME;
	}

	constructor() {
		super();
		this.style.display = "none !important";
		const observer = new MutationObserver(() => {
			this.reinit();
		});
		observer.observe(this, { childList: true, characterData: true });
		privateProperty(this, PRIVATE__OBSERVER, observer);
		privateProperty(this, PRIVATE__JSON, null);
	}

	async init() {}
	async reinit() {
		privateProperty(this, PRIVATE__JSON, null);
	}

	get json() {
		return (async () => {
			await this.ready;
			let json = privateProperty(this, PRIVATE__JSON);
			if (!json) {
				json = JSON.parse(this.textContent.trim());
				privateProperty(this, PRIVATE__JSON, json);
			}

			return json;
		})();
	}
}

define(JsonData);
export default Request;
