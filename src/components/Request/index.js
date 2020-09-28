import defineComponent from "../../utils/DefineComponentHelper";
import JsonData from "../JsonData";
import {Requester} from "@default-js/defaultjs-dynamic-requester"

class Request extends JsonData {
	constructor() {
		super();
		this.style.display = "none !important";
	}

	async reinit() {
		delete this.__json;
		delete this.__requester;
	}

	get request() {
		return this.json;
	}

	get requester(){
		if(this.__requester)
			this.__requester = new Requester(this.request);
		
		return this.__requester;
	}

	async execute(context){
		return this.requester.execute({context});
	}

}

defineComponent("request", Request);
export default Request;
