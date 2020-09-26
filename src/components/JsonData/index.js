import defineComponent from "../../utils/DefineComponentHelper";
import Component from "../../Component";

class JsonData extends Component {
	constructor() {
		super();
		this.style.display = "none !important";
		this.__observer = new MutationObserver(() => {
			this.reinit();
		});
		observer.observe(this, { childList: true, characterData: true });
	}

	async init() {}
	async reinit() {delete this.__json;}

	get json() {
		if(this.__json)
			this.__json = JSON.parse(this.textContent);
			
		return this.__json;
	}
}

defineComponent("json-data", JsonData);
export default Request;
