import Component from "../Component";
import {findClosestInDepth} from "../utils/NodeHelper"
import {EVENT_CLICK as ROUTE_CLICK} from "./Route/Events";
import Route from "./Route";
import View from "./View";

class AppComponent extends Component {    

    constructor() {
        super();

        this.ready.then(() => {
            this.root.on(ROUTE_CLICK, (event) => {
                const route = event.target;
                if(!(route instanceof Route))
                    return;
                if(this.__activeRoute__)
                    this.__activeRoute__.active = false;

                this.view.empty();
                route.appendTo(this.view);                
                
                this.__activeRoute__ = route;
                route.active = true;
            });
        });
    }

    get root() {
        return this;
    }

    get activeRoute() {
        return this.__activeRoute__;
    }

    get view() {
        if(!this.__view__)
            this.__view__ = findClosestInDepth(this.root, (node) => node instanceof View);

        return this.__view__;
    }


    get store() {
        if(!this.__store__)
            this.__store__ = {};
        return this.__store__;
    }
}

export default AppComponent;