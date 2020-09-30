import Component from "../../Component";
import { define } from "../../utils/DefineComponentHelper";
import NODENAME from "./Nodename";

class View extends Component {
	static get NODENAME() {
		return NODENAME;
	}

	constructor() {
		super();
	}

	get root(){
		return this;
	}

	display(component) {		
		this.root.empty();
		if(component)
			this.root.append(component);
	}


}
define(View);
export default View;
