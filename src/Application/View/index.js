import Component from "../../Component";
import { define } from "../../utils/DefineComponentHelper";
import NODENAME from "./Nodename";
import { Renderer, Template } from "@default-js/defaultjs-template-language";
import WeakData from "../../utils/WeakData";

const ROUTEDATA = new WeakData();

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

	async display({ route, data, view }) {
		if (view)
			throw new Error("you must override the display function!");
		this.root.empty();

		let component = route.stateful ? ROUTEDATA.value(route, "component") : null;
		if (!component) {
			component = await route.component();
			if (component instanceof Template) {
				await Renderer.render({
					container: this.root, data: {
						$view: this,
						$app: this.app,
						$store: this.app.store,
						$route: route,
						$data: data
					}, template: component
				});
				component = NodeList.from(view.childNodes);
			} else {
				if (component instanceof View)
					await component.display({ route, data, view: this })
				this.root.append(component);
			}

			if (route.stateful)
				ROUTEDATA.value(route, "component", component);
		} else {
			if (component instanceof View)
				await component.display({ route, data, view: this })
			this.root.append(component);
		}
	}
}
define(View);
export default View;
