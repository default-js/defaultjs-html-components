import { toNodeName, define } from "../../utils/DefineComponentHelper";
import JsonData from "../JsonData";
import { Requester } from "@default-js/defaultjs-dynamic-requester"


const NODENAME = toNodeName("request");
class Request extends JsonData {
	constructor() {
		super();
		this.style.display = "none !important";
	}

	async reinit() {
		delete this.__json__;
		delete this.__requester__;
	}

	get request() {
		return this.json;
	}

	get requester() {
		if (this.__requester__)
			this.__requester__ = new Requester(this.request);

		return this.__requester__;
	}

	async execute(context) {
		return this.requester.execute({ context });
	}

}

define(Request);
export default Request;
