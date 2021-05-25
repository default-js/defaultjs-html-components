import GLOBAL from "@default-js/defaultjs-common-utils/src/Global";
import utils from "./src/utils";
import Ready from "./src/Ready";
import Component from "./src/Component";

const pack = {VERSION : "${version}", utils, Ready, Component };

GLOBAL.defaultjs = GLOBAL.defaultjs || {};
GLOBAL.defaultjs.html = GLOBAL.defaultjs.html || {};
GLOBAL.defaultjs.html.components = GLOBAL.defaultjs.html.components || pack;
