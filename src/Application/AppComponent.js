import Component from "../Component";
import { findClosestInDepth } from "../utils/NodeHelper";
import { EVENT_CLICK as ROUTE_CLICK } from "./Route/Events";
import { EVENT_TO_ROUTE } from "./RouteLink/Events";
import Resolver from "@default-js/defaultjs-expression-language/src/ExpressionResolver";
import Route from "./Route";
import RouteLink from "./RouteLink";
import View from "./View";

export const EVENT_STORE_CHANGED = "app-store-changed";

const findRoute = (app, name) => {
    const selector = `${Route.NODENAME}[name="${name}"]`;
    return app.find(selector).first();
}

const buildRouteContext = (context, app) => {
	try{
		return Resolver.resolve(context, app.store, null);
	} catch(e){
		return null;
	}
}

class AppComponent extends Component {
	constructor() {
		super();

		this.ready.then(() => {
			this.root.on([ROUTE_CLICK, EVENT_TO_ROUTE], async (event) => {
                this.route(event.target);				
			});
		});
	}

	get root() {
		return this;
	}

	async routes() {
		return this.root.find(Route.NODENAME);
    }
    
    async route(route){
        if(arguments.length == 0)
            return this.__route__;

		let context = null;
        if(typeof route === "string")
            route = findRoute(this, route);        
        else if(route instanceof RouteLink){
			context = buildRouteContext(route.context, this);
            route = findRoute(this, route.target);
		}

		if(this.__route__ == route) return;

        if (this.__route__) this.__route__.active = false;
        await this.view.display({route, context});
        this.__route__ = route;
        route.active = true;
    }

	get view() {
		if (!this.__view__){
			this.__view__ = findClosestInDepth(this.root, (node) => {
				return node instanceof View;
			});
			this.__view__.app = this;
		}

		return this.__view__;
	}

	get store() {
		if (!this.__store__) this.__store__ = {};
		return this.__store__;
	}
}

export default AppComponent;
