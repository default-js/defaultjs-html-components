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

	get root() {
		return this;
	}

	get app() {
		return this.__app__;
	}

	set app(app) {
		this.__app__ = app;
	}

	async display(route) {
		this.root.empty();
		if (route) route.render({ view: this.root, data: this.app.store, app: this.app });
	}
}
define(View);
export default View;
