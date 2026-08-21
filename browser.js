import { GLOBAL } from "./src/Constants.js";
import { utils, Ready, Component, componentBaseOf, define, createUUID, SETTING } from "./index.js";

const pack = { VERSION: "${version}", utils, Ready, Component, define, componentBaseOf, createUUID, SETTING };

GLOBAL.defaultjs = GLOBAL.defaultjs || {};
GLOBAL.defaultjs.html = GLOBAL.defaultjs.html || {};
GLOBAL.defaultjs.html.components = GLOBAL.defaultjs.html.components || pack;

export { utils, Ready, Component, componentBaseOf, createUUID, define, SETTING };
