import "@default-js/defaultjs-extdom";
import GLOBAL from "@default-js/defaultjs-common-utils/src/Global";
import utils from "./src/utils";
import Ready from "./src/Ready";
import Component, {componentBaseOf, createUID} from "./src/Component";

const pack = {VERSION : "${version}", utils, Ready, Component, componentBaseOf, createUID };

GLOBAL.defaultjs = GLOBAL.defaultjs || {};
GLOBAL.defaultjs.html = GLOBAL.defaultjs.html || {};
GLOBAL.defaultjs.html.components = GLOBAL.defaultjs.html.components || pack;

export { utils, Ready, Component, componentBaseOf, createUID };
