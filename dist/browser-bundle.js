/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./node_modules/@default-js/defaultjs-common-utils/src/Global.js":
/*!***********************************************************************!*\
  !*** ./node_modules/@default-js/defaultjs-common-utils/src/Global.js ***!
  \***********************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
const GLOBAL = (() => {
	if(typeof __webpack_require__.g !== "undefined") return __webpack_require__.g;
	if(typeof window !== "undefined") return window;	
	if(typeof self !== "undefined") return self;
	return {};
})();

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (GLOBAL);

/***/ }),

/***/ "./node_modules/@default-js/defaultjs-common-utils/src/ObjectProperty.js":
/*!*******************************************************************************!*\
  !*** ./node_modules/@default-js/defaultjs-common-utils/src/ObjectProperty.js ***!
  \*******************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ ObjectProperty)
/* harmony export */ });
class ObjectProperty {
	constructor(key, context){
		this.key = key;
		this.context = context;
	}
	
	get keyDefined(){
		return this.key in this.context; 
	}
	
	get hasValue(){
		return !!this.context[this.key];
	}
	
	get value(){
		return this.context[this.key];
	}
	
	set value(data){
		this.context[this.key] = data;
	}
	
	set append(data) {
		if(!this.hasValue)
			this.value = data;
		else {
			const value = this.value;
			if(value instanceof Array)
				value.push(data);
			else
				this.value = [this.value, data];
		}
	}
	
	remove(){
		delete this.context[this.key];
	}
	
	static load(data, key, create=true) {
		let context = data;
		const keys = key.split("\.");
		let name = keys.shift().trim();
		while(keys.length > 0){
			if(!context[name]){
				if(!create)
					return null;
				
				context[name] = {}
			}
			
			context = context[name];
			name = keys.shift().trim();
		}
		
		return new ObjectProperty(name, context);
	}
};

/***/ }),

/***/ "./node_modules/@default-js/defaultjs-common-utils/src/ObjectUtils.js":
/*!****************************************************************************!*\
  !*** ./node_modules/@default-js/defaultjs-common-utils/src/ObjectUtils.js ***!
  \****************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "append": () => (/* binding */ append),
/* harmony export */   "isPojo": () => (/* binding */ isPojo),
/* harmony export */   "merge": () => (/* binding */ merge),
/* harmony export */   "filter": () => (/* binding */ filter),
/* harmony export */   "defValue": () => (/* binding */ defValue),
/* harmony export */   "defGet": () => (/* binding */ defGet),
/* harmony export */   "defGetSet": () => (/* binding */ defGetSet),
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _ObjectProperty_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./ObjectProperty.js */ "./node_modules/@default-js/defaultjs-common-utils/src/ObjectProperty.js");

/**
 * append a propery value to an object. If propery exists its would be converted to an array
 *
 *  @param aKey:string name of property
 *  @param aData:any property value
 *  @param aObject:object the object to append the property
 *
 *  @return returns the changed object
 */
const append = function (aKey, aData, aObject) {
	if (typeof aData !== "undefined") {
		const property = _ObjectProperty_js__WEBPACK_IMPORTED_MODULE_0__["default"].load(aObject, aKey, true);
		property.append = aData;
	}
	return aObject;
};

/**
 * checked if an object a simple object. No Array, Map or something else.
 *
 * @param aObject:object the object to be testing
 *
 * @return boolean
 */
const isPojo = function (aObject) {
	return typeof aObject !== "undefined" && aObject != null && aObject.constructor.name === "Object";
};

/**
 * merging object into a target object. Its only merge simple object and sub objects. Every other
 * value would be replaced by value from the source object.
 *
 * sample: merge(target, source-1, source-2, ...source-n)
 *
 * @param target:object the target object to merging into
 * @param sources:object
 *
 * @return object returns the target object
 */
const merge = function (target, ...sources) {
	if(!target)
		target = {};

	for (let source of sources) {
		if (isPojo(source)) {
			Object.getOwnPropertyNames(source).forEach((key) => {
				if (isPojo(target[key])) merge(target[key], source[key]);
				else target[key] = source[key];
			});
		}
	}

	return target;
};

const buildPropertyFilter = function ({ names, allowed }) {
	return (name, value, context) => {
		return names.includes(name) === allowed;
	};
};

const filter = function () {
	const [data, propFilter, { deep = false, recursive = true, parents = [] } = {}] = arguments;
	const result = {};

	for (let name in data) {
		const value = data[name];
		const accept = propFilter(name, value, data);
		if (accept && (!deep || value === null || value === undefined)) result[name] = value;
		else if (accept && deep) {
			const type = typeof value;
			if (type !== "object" || value instanceof Array || value instanceof Map || value instanceof Set || value instanceof RegExp || parents.includes[value] || value == data) result[name] = value;
			else result[name] = filter(value, propFilter, { deep, recursive, parents: parents.concat(data) });
		}
	}

	return result;
};

const defValue = (o, name, value) => {
	Object.defineProperty(o, name, {
		value,
		writable: false,
		configurable: false,
		enumerable: false,
	});
};
const defGet = (o, name, get) => {
	Object.defineProperty(o, name, {
		get,
		configurable: false,
		enumerable: false,
	});
};

const defGetSet = (o, name, get, set) => {
	Object.defineProperty(o, name, {
		get,
		set,
		configurable: false,
		enumerable: false,
	});
};

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ({
	isPojo,
	append,
	merge,
	filter,
	buildPropertyFilter,
	defValue,
	defGet,
	defGetSet,
});


/***/ }),

/***/ "./node_modules/@default-js/defaultjs-common-utils/src/PrivateProperty.js":
/*!********************************************************************************!*\
  !*** ./node_modules/@default-js/defaultjs-common-utils/src/PrivateProperty.js ***!
  \********************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "privateStore": () => (/* binding */ privateStore),
/* harmony export */   "privateProperty": () => (/* binding */ privateProperty),
/* harmony export */   "privatePropertyAccessor": () => (/* binding */ privatePropertyAccessor),
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
const PRIVATE_PROPERTIES = new WeakMap();
const privateStore = (obj) => {
	if(PRIVATE_PROPERTIES.has(obj))
		return PRIVATE_PROPERTIES.get(obj);
	
	const data = {};
	PRIVATE_PROPERTIES.set(obj, data);
	return data;
};

const privateProperty = function(obj, name, value) {
	const data = privateStore(obj);
	if(arguments.length === 1)
		return data;
	else if(arguments.length === 2)
		return data[name];
	else if(arguments.length === 3)
		data[name] = value;
	else
		throw new Error("Not allowed size of arguments!");
};

const privatePropertyAccessor = (varname) => {
	return function(self, value){
		if(arguments.length == 2)
			privateProperty(self, varname, value);
		else
			return privateProperty(self, varname);
	};
};

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ({privateProperty, privatePropertyAccessor, privateStore});

/***/ }),

/***/ "./node_modules/@default-js/defaultjs-common-utils/src/PromiseUtils.js":
/*!*****************************************************************************!*\
  !*** ./node_modules/@default-js/defaultjs-common-utils/src/PromiseUtils.js ***!
  \*****************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "timeoutPromise": () => (/* binding */ timeoutPromise),
/* harmony export */   "lazyPromise": () => (/* binding */ lazyPromise),
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _ObjectUtils__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./ObjectUtils */ "./node_modules/@default-js/defaultjs-common-utils/src/ObjectUtils.js");


const timeoutPromise = (fn, ms) =>{
	let canceled = false;
	let timeout = null;
	const promise = new Promise((r, e) => {
		timeout = setTimeout(()=> {
			timeout = null;
			fn(r,e);
		}, ms)
	});

	const then = promise.then;
	promise.then = (fn) => {
		then.call(promise, (result) => {
			if(!undefined.canceled)
				return fn(result);
		});
	}

	;(0,_ObjectUtils__WEBPACK_IMPORTED_MODULE_0__.defValue)(promise, "cancel", () => {
		if(timeout){
			clearTimeout(timeout);
			canceled = true;
		}
	});
	(0,_ObjectUtils__WEBPACK_IMPORTED_MODULE_0__.defGet)(promise, canceld, () => canceled);

	return promise;
}


const lazyPromise = () => {
		let promiseResolve = null;
		let promiseError = null;

		const promise = new Promise((r, e) => {
			promiseResolve = r;
			promiseError = e;
		});

		let resolved = false;
		let error = false;
		let value = undefined;

		(0,_ObjectUtils__WEBPACK_IMPORTED_MODULE_0__.defValue)(promise, "resolve", (result) => {
			value = result;
			resolved = true;
			if (value instanceof Error) {
				error = true;
				promiseError(value);
			} else promiseResolve(value);
		});

		(0,_ObjectUtils__WEBPACK_IMPORTED_MODULE_0__.defGet)(promise, "value", () => value);
		(0,_ObjectUtils__WEBPACK_IMPORTED_MODULE_0__.defGet)(promise, "error", () => error);
		(0,_ObjectUtils__WEBPACK_IMPORTED_MODULE_0__.defGet)(promise, "resolved", () => resolved);

		return promise;
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ({
	lazyPromise,
	timeoutPromise
});


/***/ }),

/***/ "./node_modules/@default-js/defaultjs-common-utils/src/UUID.js":
/*!*********************************************************************!*\
  !*** ./node_modules/@default-js/defaultjs-common-utils/src/UUID.js ***!
  \*********************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "UUID_SCHEMA": () => (/* binding */ UUID_SCHEMA),
/* harmony export */   "uuid": () => (/* binding */ uuid),
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
//the solution is found here: https://stackoverflow.com/questions/105034/how-to-create-a-guid-uuid
const UUID_SCHEMA = "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx";

const uuid = () => {
	const buf = new Uint32Array(4);
	window.crypto.getRandomValues(buf);
	let idx = -1;
	return UUID_SCHEMA.replace(/[xy]/g, (c) => {
		idx++;
		const r = (buf[idx >> 3] >> ((idx % 8) * 4)) & 15;
		const v = c == "x" ? r : (r & 0x3) | 0x8;
		return v.toString(16);
	});
};

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ({ uuid });


/***/ }),

/***/ "./src/Component.js":
/*!**************************!*\
  !*** ./src/Component.js ***!
  \**************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "createUID": () => (/* binding */ createUID),
/* harmony export */   "componentBaseOf": () => (/* binding */ componentBaseOf),
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _default_js_defaultjs_common_utils_src_PrivateProperty__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @default-js/defaultjs-common-utils/src/PrivateProperty */ "./node_modules/@default-js/defaultjs-common-utils/src/PrivateProperty.js");
/* harmony import */ var _default_js_defaultjs_common_utils_src_PromiseUtils__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @default-js/defaultjs-common-utils/src/PromiseUtils */ "./node_modules/@default-js/defaultjs-common-utils/src/PromiseUtils.js");
/* harmony import */ var _default_js_defaultjs_common_utils_src_UUID__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @default-js/defaultjs-common-utils/src/UUID */ "./node_modules/@default-js/defaultjs-common-utils/src/UUID.js");
/* harmony import */ var _Constants__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./Constants */ "./src/Constants.js");
/* harmony import */ var _utils_EventHelper__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./utils/EventHelper */ "./src/utils/EventHelper.js");






const _ready = (0,_default_js_defaultjs_common_utils_src_PrivateProperty__WEBPACK_IMPORTED_MODULE_0__.privatePropertyAccessor)("ready");

const TIMEOUTS = new WeakMap();
const init = (component) => {
	let timeout = TIMEOUTS.get(component);
	if (timeout) clearTimeout(timeout);

	TIMEOUTS.get(component, setTimeout(async () => {
		TIMEOUTS.delete(component);
		try{
			await component.init();
			component.ready.resolve();
		}catch(e){
			console.error("Can't initialize component!", component, e);
			component.ready(resolve(e));
		}
		component.trigger((0,_utils_EventHelper__WEBPACK_IMPORTED_MODULE_4__.componentEventname)("initialzed", component));
	}, _Constants__WEBPACK_IMPORTED_MODULE_3__.initTimeout));	
};

const createUID = (prefix, suffix) => {
	let count = 0;
	let id = null;
    while(count < 100){
		id = `${prefix ? prefix : ""}${(0,_default_js_defaultjs_common_utils_src_UUID__WEBPACK_IMPORTED_MODULE_2__.uuid)()}${suffix ? suffix : ""}`;
		if(!document.getElementById(id))
			return id;

		count++;
	}
	console.error(new Error("To many retries to create an unique id - created id is not unique!"));
	return id;
};



const buildClass = (htmlBaseType) =>{
	return class Component extends htmlBaseType {
		constructor({shadowRoot = false, content = null, createUID = false, uidPrefix = "id-", uidSuffix = ""} = {}) {
			super();
			_ready(this, (0,_default_js_defaultjs_common_utils_src_PromiseUtils__WEBPACK_IMPORTED_MODULE_1__.lazyPromise)());
	
			if(createUID)
				this.attr("id", createUID(uidPrefix, uidSuffix));
	
			if(shadowRoot)
				this.attachShadow({mode:open});
			
			if(content)
				this.root.append(typeof content === "function" ? content(this) : content);
		}
	
		get root(){
			return this.shadowRoot || this;
		}
	
		get ready(){
			return _ready(this);
		}
	
		async init() {}
	
		async destroy() {
			if(this.ready.resolved)
			_ready(this, (0,_default_js_defaultjs_common_utils_src_PromiseUtils__WEBPACK_IMPORTED_MODULE_1__.lazyPromise)());
		}
	
		connectedCallback() {
			if (this.ownerDocument == document) init(this)();
		}
	
		adoptedCallback() {
			this.connectedCallback();
		}
	
		attributeChangedCallback(name, oldValue, newValue) {
			if (oldValue != newValue && this.isConnected) {
				this.trigger(_Constants__WEBPACK_IMPORTED_MODULE_3__.triggerTimeout, (0,_utils_EventHelper__WEBPACK_IMPORTED_MODULE_4__.attributeChangeEventname)(name, this));
				this.trigger(_Constants__WEBPACK_IMPORTED_MODULE_3__.triggerTimeout, (0,_utils_EventHelper__WEBPACK_IMPORTED_MODULE_4__.componentEventname)("change", this));
			}
		}
	
		disconnectedCallback(){
			this.destroy();
		}
	};
} 

const CLAZZMAP = new Map();

const componentBaseOf = (htmlBaseType) => {
	let clazz = CLAZZMAP.get(htmlBaseType);
	if(clazz == null){
		clazz = buildClass(htmlBaseType);
		CLAZZMAP.set(htmlBaseType, clazz);
	}

	return clazz;
}

const Component = componentBaseOf(HTMLElement);



/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Component);


/***/ }),

/***/ "./src/Constants.js":
/*!**************************!*\
  !*** ./src/Constants.js ***!
  \**************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "componentPrefix": () => (/* binding */ componentPrefix),
/* harmony export */   "attributeChangeEventPrefix": () => (/* binding */ attributeChangeEventPrefix),
/* harmony export */   "initTimeout": () => (/* binding */ initTimeout),
/* harmony export */   "triggerTimeout": () => (/* binding */ triggerTimeout)
/* harmony export */ });
const componentPrefix = "d-";
const attributeChangeEventPrefix = "attribute-";
const initTimeout = 100;
const triggerTimeout = 100;


/***/ }),

/***/ "./src/Ready.js":
/*!**********************!*\
  !*** ./src/Ready.js ***!
  \**********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _default_js_defaultjs_common_utils_src_PromiseUtils__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @default-js/defaultjs-common-utils/src/PromiseUtils */ "./node_modules/@default-js/defaultjs-common-utils/src/PromiseUtils.js");


/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (_default_js_defaultjs_common_utils_src_PromiseUtils__WEBPACK_IMPORTED_MODULE_0__.lazyPromise);


/***/ }),

/***/ "./src/utils/DefineComponentHelper.js":
/*!********************************************!*\
  !*** ./src/utils/DefineComponentHelper.js ***!
  \********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "toNodeName": () => (/* binding */ toNodeName),
/* harmony export */   "define": () => (/* binding */ define),
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _Constants__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../Constants */ "./src/Constants.js");


const toNodeName = (name, prefix) => {
	if(typeof prefix === "string")
		return prefix + name;
		
	return _Constants__WEBPACK_IMPORTED_MODULE_0__.componentPrefix + name;
};

const define = function(clazz, options) {
	const nodename = clazz.NODENAME;
	if (!customElements.get(nodename)) {
		customElements.define(nodename, clazz, options);
	}
};


/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (define); 


/***/ }),

/***/ "./src/utils/EventHelper.js":
/*!**********************************!*\
  !*** ./src/utils/EventHelper.js ***!
  \**********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "componentEventname": () => (/* binding */ componentEventname),
/* harmony export */   "attributeChangeEventname": () => (/* binding */ attributeChangeEventname),
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _Constants__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../Constants */ "./src/Constants.js");


const componentEventname = (eventType, node ) => {	
	let nodename = "unsupported";
	if(typeof node === "string")
		nodename = node;
	else if(node instanceof HTMLElement)
		nodename = node.nodeName;
	else if(typeof node.NODENAME === "string")
		nodename = node.NODENAME;
	else throw new Error(`${typeof node} is not supported as parameter "node"!`);
	
   return `${nodename.toLowerCase()}:${eventType}`;//use @ as separtor and not :
};


const attributeChangeEventname = (attribute, node ) => {
    return componentEventname(`${_Constants__WEBPACK_IMPORTED_MODULE_0__.attributeChangeEventPrefix}-${attribute}`, node);
};

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ({componentEventname, attributeChangeEventname});

/***/ }),

/***/ "./src/utils/StyleHelper.js":
/*!**********************************!*\
  !*** ./src/utils/StyleHelper.js ***!
  \**********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "copyStyles": () => (/* binding */ copyStyles),
/* harmony export */   "CSS_BASE_PATH_VAR": () => (/* binding */ CSS_BASE_PATH_VAR),
/* harmony export */   "loadComponentStyle": () => (/* binding */ loadComponentStyle),
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _default_js_defaultjs_common_utils_src_Global__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @default-js/defaultjs-common-utils/src/Global */ "./node_modules/@default-js/defaultjs-common-utils/src/Global.js");


const copyStyles = (source, target, append = true) => {
	const styles = source.find(`style[type="text/css"], link[rel="stylesheet"]`);

	if (append)
		target.append(styles.cloneNode(true));
	else
		target.prepend(styles.cloneNode(true));
}

const CSS_BASE_PATH_VAR = "CSS_BASE_PATH";
const loadComponentStyle = (target) => {
	const path = `${_default_js_defaultjs_common_utils_src_Global__WEBPACK_IMPORTED_MODULE_0__["default"][CSS_BASE_PATH_VAR] || "css"}/${target.nodeName.toLowerCase()}.css`;
	target.append(`<link rel="stylesheet" href="${path}"/>`);
}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ({ CSS_BASE_PATH_VAR, copyStyles, loadComponentStyle });

/***/ }),

/***/ "./src/utils/WeakData.js":
/*!*******************************!*\
  !*** ./src/utils/WeakData.js ***!
  \*******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ WeakData)
/* harmony export */ });
/* harmony import */ var _default_js_defaultjs_common_utils_src_ObjectUtils__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @default-js/defaultjs-common-utils/src/ObjectUtils */ "./node_modules/@default-js/defaultjs-common-utils/src/ObjectUtils.js");

class WeakData {
	constructor() {
		(0,_default_js_defaultjs_common_utils_src_ObjectUtils__WEBPACK_IMPORTED_MODULE_0__.defValue)(this, "weakmap", new WeakMap());
	}

	data(reference) {
		let data = this.weakmap.get(reference);
		if (!data) {
			data = {};
			this.weakmap.set(reference, data);
		}
		return data;
	}

	value(reference, key, value) {
		if (arguments.length == 2) return this.data(reference)[key];
		else if(typeof value === "undefined") delete this.data(reference)[key];
		else this.data(reference)[key] = value;
	}

	destroy(){
		this.weakmap.delete(reference);
	}
};



/***/ }),

/***/ "./src/utils/index.js":
/*!****************************!*\
  !*** ./src/utils/index.js ***!
  \****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _DefineComponentHelper__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./DefineComponentHelper */ "./src/utils/DefineComponentHelper.js");
/* harmony import */ var _EventHelper__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./EventHelper */ "./src/utils/EventHelper.js");
/* harmony import */ var _StyleHelper__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./StyleHelper */ "./src/utils/StyleHelper.js");
/* harmony import */ var _WeakData__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./WeakData */ "./src/utils/WeakData.js");






/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ({DefineComponentHelper: _DefineComponentHelper__WEBPACK_IMPORTED_MODULE_0__["default"], EventHelper: _EventHelper__WEBPACK_IMPORTED_MODULE_1__["default"], NodeHelper: _EventHelper__WEBPACK_IMPORTED_MODULE_1__["default"], StyleHelper: _StyleHelper__WEBPACK_IMPORTED_MODULE_2__["default"], WeakData: _WeakData__WEBPACK_IMPORTED_MODULE_3__["default"]});

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/global */
/******/ 	(() => {
/******/ 		__webpack_require__.g = (function() {
/******/ 			if (typeof globalThis === 'object') return globalThis;
/******/ 			try {
/******/ 				return this || new Function('return this')();
/******/ 			} catch (e) {
/******/ 				if (typeof window === 'object') return window;
/******/ 			}
/******/ 		})();
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be isolated against other modules in the chunk.
(() => {
/*!***************************!*\
  !*** ./browser-bundle.js ***!
  \***************************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _default_js_defaultjs_common_utils_src_Global__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @default-js/defaultjs-common-utils/src/Global */ "./node_modules/@default-js/defaultjs-common-utils/src/Global.js");
/* harmony import */ var _src_utils__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./src/utils */ "./src/utils/index.js");
/* harmony import */ var _src_Ready__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./src/Ready */ "./src/Ready.js");
/* harmony import */ var _src_Component__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./src/Component */ "./src/Component.js");





const pack = {VERSION : "2.1.3", utils: _src_utils__WEBPACK_IMPORTED_MODULE_1__["default"], Ready: _src_Ready__WEBPACK_IMPORTED_MODULE_2__["default"], Component: _src_Component__WEBPACK_IMPORTED_MODULE_3__["default"], componentBaseOf: _src_Component__WEBPACK_IMPORTED_MODULE_3__.componentBaseOf, createUID: _src_Component__WEBPACK_IMPORTED_MODULE_3__.createUID };

_default_js_defaultjs_common_utils_src_Global__WEBPACK_IMPORTED_MODULE_0__["default"].defaultjs = _default_js_defaultjs_common_utils_src_Global__WEBPACK_IMPORTED_MODULE_0__["default"].defaultjs || {};
_default_js_defaultjs_common_utils_src_Global__WEBPACK_IMPORTED_MODULE_0__["default"].defaultjs.html = _default_js_defaultjs_common_utils_src_Global__WEBPACK_IMPORTED_MODULE_0__["default"].defaultjs.html || {};
_default_js_defaultjs_common_utils_src_Global__WEBPACK_IMPORTED_MODULE_0__["default"].defaultjs.html.components = _default_js_defaultjs_common_utils_src_Global__WEBPACK_IMPORTED_MODULE_0__["default"].defaultjs.html.components || pack;

})();

/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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Q0FBd0M7V0FDakY7V0FDQTtXQUNBOzs7OztXQ1BBO1dBQ0E7V0FDQTtXQUNBO1dBQ0EsR0FBRztXQUNIO1dBQ0E7V0FDQSxDQUFDOzs7OztXQ1BEOzs7OztXQ0FBO1dBQ0E7V0FDQTtXQUNBLHVEQUF1RCxpQkFBaUI7V0FDeEU7V0FDQSxnREFBZ0QsYUFBYTtXQUM3RDs7Ozs7Ozs7Ozs7Ozs7O0FDTm1FO0FBQ25DO0FBQ0E7QUFDc0M7O0FBRXRFLGNBQWMsYUFBYSxRQUFRLFFBQVEsMkRBQU8sK0RBQVcseUVBQWlCLHdFQUFXOztBQUV6RiwrRkFBZ0IsR0FBRywrRkFBZ0I7QUFDbkMsb0dBQXFCLEdBQUcsb0dBQXFCO0FBQzdDLCtHQUFnQyxHQUFHLCtHQUFnQyIsInNvdXJjZXMiOlsid2VicGFjazovL0BkZWZhdWx0LWpzL2RlZmF1bHRqcy1odG1sLWNvbXBvbmVudHMvLi9ub2RlX21vZHVsZXMvQGRlZmF1bHQtanMvZGVmYXVsdGpzLWNvbW1vbi11dGlscy9zcmMvR2xvYmFsLmpzIiwid2VicGFjazovL0BkZWZhdWx0LWpzL2RlZmF1bHRqcy1odG1sLWNvbXBvbmVudHMvLi9ub2RlX21vZHVsZXMvQGRlZmF1bHQtanMvZGVmYXVsdGpzLWNvbW1vbi11dGlscy9zcmMvT2JqZWN0UHJvcGVydHkuanMiLCJ3ZWJwYWNrOi8vQGRlZmF1bHQtanMvZGVmYXVsdGpzLWh0bWwtY29tcG9uZW50cy8uL25vZGVfbW9kdWxlcy9AZGVmYXVsdC1qcy9kZWZhdWx0anMtY29tbW9uLXV0aWxzL3NyYy9PYmplY3RVdGlscy5qcyIsIndlYnBhY2s6Ly9AZGVmYXVsdC1qcy9kZWZhdWx0anMtaHRtbC1jb21wb25lbnRzLy4vbm9kZV9tb2R1bGVzL0BkZWZhdWx0LWpzL2RlZmF1bHRqcy1jb21tb24tdXRpbHMvc3JjL1ByaXZhdGVQcm9wZXJ0eS5qcyIsIndlYnBhY2s6Ly9AZGVmYXVsdC1qcy9kZWZhdWx0anMtaHRtbC1jb21wb25lbnRzLy4vbm9kZV9tb2R1bGVzL0BkZWZhdWx0LWpzL2RlZmF1bHRqcy1jb21tb24tdXRpbHMvc3JjL1Byb21pc2VVdGlscy5qcyIsIndlYnBhY2s6Ly9AZGVmYXVsdC1qcy9kZWZhdWx0anMtaHRtbC1jb21wb25lbnRzLy4vbm9kZV9tb2R1bGVzL0BkZWZhdWx0LWpzL2RlZmF1bHRqcy1jb21tb24tdXRpbHMvc3JjL1VVSUQuanMiLCJ3ZWJwYWNrOi8vQGRlZmF1bHQtanMvZGVmYXVsdGpzLWh0bWwtY29tcG9uZW50cy8uL3NyYy9Db21wb25lbnQuanMiLCJ3ZWJwYWNrOi8vQGRlZmF1bHQtanMvZGVmYXVsdGpzLWh0bWwtY29tcG9uZW50cy8uL3NyYy9Db25zdGFudHMuanMiLCJ3ZWJwYWNrOi8vQGRlZmF1bHQtanMvZGVmYXVsdGpzLWh0bWwtY29tcG9uZW50cy8uL3NyYy9SZWFkeS5qcyIsIndlYnBhY2s6Ly9AZGVmYXVsdC1qcy9kZWZhdWx0anMtaHRtbC1jb21wb25lbnRzLy4vc3JjL3V0aWxzL0RlZmluZUNvbXBvbmVudEhlbHBlci5qcyIsIndlYnBhY2s6Ly9AZGVmYXVsdC1qcy9kZWZhdWx0anMtaHRtbC1jb21wb25lbnRzLy4vc3JjL3V0aWxzL0V2ZW50SGVscGVyLmpzIiwid2VicGFjazovL0BkZWZhdWx0LWpzL2RlZmF1bHRqcy1odG1sLWNvbXBvbmVudHMvLi9zcmMvdXRpbHMvU3R5bGVIZWxwZXIuanMiLCJ3ZWJwYWNrOi8vQGRlZmF1bHQtanMvZGVmYXVsdGpzLWh0bWwtY29tcG9uZW50cy8uL3NyYy91dGlscy9XZWFrRGF0YS5qcyIsIndlYnBhY2s6Ly9AZGVmYXVsdC1qcy9kZWZhdWx0anMtaHRtbC1jb21wb25lbnRzLy4vc3JjL3V0aWxzL2luZGV4LmpzIiwid2VicGFjazovL0BkZWZhdWx0LWpzL2RlZmF1bHRqcy1odG1sLWNvbXBvbmVudHMvd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vQGRlZmF1bHQtanMvZGVmYXVsdGpzLWh0bWwtY29tcG9uZW50cy93ZWJwYWNrL3J1bnRpbWUvZGVmaW5lIHByb3BlcnR5IGdldHRlcnMiLCJ3ZWJwYWNrOi8vQGRlZmF1bHQtanMvZGVmYXVsdGpzLWh0bWwtY29tcG9uZW50cy93ZWJwYWNrL3J1bnRpbWUvZ2xvYmFsIiwid2VicGFjazovL0BkZWZhdWx0LWpzL2RlZmF1bHRqcy1odG1sLWNvbXBvbmVudHMvd2VicGFjay9ydW50aW1lL2hhc093blByb3BlcnR5IHNob3J0aGFuZCIsIndlYnBhY2s6Ly9AZGVmYXVsdC1qcy9kZWZhdWx0anMtaHRtbC1jb21wb25lbnRzL3dlYnBhY2svcnVudGltZS9tYWtlIG5hbWVzcGFjZSBvYmplY3QiLCJ3ZWJwYWNrOi8vQGRlZmF1bHQtanMvZGVmYXVsdGpzLWh0bWwtY29tcG9uZW50cy8uL2Jyb3dzZXItYnVuZGxlLmpzIl0sInNvdXJjZXNDb250ZW50IjpbImNvbnN0IEdMT0JBTCA9ICgoKSA9PiB7XHJcblx0aWYodHlwZW9mIGdsb2JhbCAhPT0gXCJ1bmRlZmluZWRcIikgcmV0dXJuIGdsb2JhbDtcclxuXHRpZih0eXBlb2Ygd2luZG93ICE9PSBcInVuZGVmaW5lZFwiKSByZXR1cm4gd2luZG93O1x0XHJcblx0aWYodHlwZW9mIHNlbGYgIT09IFwidW5kZWZpbmVkXCIpIHJldHVybiBzZWxmO1xyXG5cdHJldHVybiB7fTtcclxufSkoKTtcclxuXHJcbmV4cG9ydCBkZWZhdWx0IEdMT0JBTDsiLCJleHBvcnQgZGVmYXVsdCBjbGFzcyBPYmplY3RQcm9wZXJ0eSB7XHJcblx0Y29uc3RydWN0b3Ioa2V5LCBjb250ZXh0KXtcclxuXHRcdHRoaXMua2V5ID0ga2V5O1xyXG5cdFx0dGhpcy5jb250ZXh0ID0gY29udGV4dDtcclxuXHR9XHJcblx0XHJcblx0Z2V0IGtleURlZmluZWQoKXtcclxuXHRcdHJldHVybiB0aGlzLmtleSBpbiB0aGlzLmNvbnRleHQ7IFxyXG5cdH1cclxuXHRcclxuXHRnZXQgaGFzVmFsdWUoKXtcclxuXHRcdHJldHVybiAhIXRoaXMuY29udGV4dFt0aGlzLmtleV07XHJcblx0fVxyXG5cdFxyXG5cdGdldCB2YWx1ZSgpe1xyXG5cdFx0cmV0dXJuIHRoaXMuY29udGV4dFt0aGlzLmtleV07XHJcblx0fVxyXG5cdFxyXG5cdHNldCB2YWx1ZShkYXRhKXtcclxuXHRcdHRoaXMuY29udGV4dFt0aGlzLmtleV0gPSBkYXRhO1xyXG5cdH1cclxuXHRcclxuXHRzZXQgYXBwZW5kKGRhdGEpIHtcclxuXHRcdGlmKCF0aGlzLmhhc1ZhbHVlKVxyXG5cdFx0XHR0aGlzLnZhbHVlID0gZGF0YTtcclxuXHRcdGVsc2Uge1xyXG5cdFx0XHRjb25zdCB2YWx1ZSA9IHRoaXMudmFsdWU7XHJcblx0XHRcdGlmKHZhbHVlIGluc3RhbmNlb2YgQXJyYXkpXHJcblx0XHRcdFx0dmFsdWUucHVzaChkYXRhKTtcclxuXHRcdFx0ZWxzZVxyXG5cdFx0XHRcdHRoaXMudmFsdWUgPSBbdGhpcy52YWx1ZSwgZGF0YV07XHJcblx0XHR9XHJcblx0fVxyXG5cdFxyXG5cdHJlbW92ZSgpe1xyXG5cdFx0ZGVsZXRlIHRoaXMuY29udGV4dFt0aGlzLmtleV07XHJcblx0fVxyXG5cdFxyXG5cdHN0YXRpYyBsb2FkKGRhdGEsIGtleSwgY3JlYXRlPXRydWUpIHtcclxuXHRcdGxldCBjb250ZXh0ID0gZGF0YTtcclxuXHRcdGNvbnN0IGtleXMgPSBrZXkuc3BsaXQoXCJcXC5cIik7XHJcblx0XHRsZXQgbmFtZSA9IGtleXMuc2hpZnQoKS50cmltKCk7XHJcblx0XHR3aGlsZShrZXlzLmxlbmd0aCA+IDApe1xyXG5cdFx0XHRpZighY29udGV4dFtuYW1lXSl7XHJcblx0XHRcdFx0aWYoIWNyZWF0ZSlcclxuXHRcdFx0XHRcdHJldHVybiBudWxsO1xyXG5cdFx0XHRcdFxyXG5cdFx0XHRcdGNvbnRleHRbbmFtZV0gPSB7fVxyXG5cdFx0XHR9XHJcblx0XHRcdFxyXG5cdFx0XHRjb250ZXh0ID0gY29udGV4dFtuYW1lXTtcclxuXHRcdFx0bmFtZSA9IGtleXMuc2hpZnQoKS50cmltKCk7XHJcblx0XHR9XHJcblx0XHRcclxuXHRcdHJldHVybiBuZXcgT2JqZWN0UHJvcGVydHkobmFtZSwgY29udGV4dCk7XHJcblx0fVxyXG59OyIsImltcG9ydCBPYmplY3RQcm9wZXJ0eSBmcm9tIFwiLi9PYmplY3RQcm9wZXJ0eS5qc1wiO1xyXG4vKipcclxuICogYXBwZW5kIGEgcHJvcGVyeSB2YWx1ZSB0byBhbiBvYmplY3QuIElmIHByb3BlcnkgZXhpc3RzIGl0cyB3b3VsZCBiZSBjb252ZXJ0ZWQgdG8gYW4gYXJyYXlcclxuICpcclxuICogIEBwYXJhbSBhS2V5OnN0cmluZyBuYW1lIG9mIHByb3BlcnR5XHJcbiAqICBAcGFyYW0gYURhdGE6YW55IHByb3BlcnR5IHZhbHVlXHJcbiAqICBAcGFyYW0gYU9iamVjdDpvYmplY3QgdGhlIG9iamVjdCB0byBhcHBlbmQgdGhlIHByb3BlcnR5XHJcbiAqXHJcbiAqICBAcmV0dXJuIHJldHVybnMgdGhlIGNoYW5nZWQgb2JqZWN0XHJcbiAqL1xyXG5leHBvcnQgY29uc3QgYXBwZW5kID0gZnVuY3Rpb24gKGFLZXksIGFEYXRhLCBhT2JqZWN0KSB7XHJcblx0aWYgKHR5cGVvZiBhRGF0YSAhPT0gXCJ1bmRlZmluZWRcIikge1xyXG5cdFx0Y29uc3QgcHJvcGVydHkgPSBPYmplY3RQcm9wZXJ0eS5sb2FkKGFPYmplY3QsIGFLZXksIHRydWUpO1xyXG5cdFx0cHJvcGVydHkuYXBwZW5kID0gYURhdGE7XHJcblx0fVxyXG5cdHJldHVybiBhT2JqZWN0O1xyXG59O1xyXG5cclxuLyoqXHJcbiAqIGNoZWNrZWQgaWYgYW4gb2JqZWN0IGEgc2ltcGxlIG9iamVjdC4gTm8gQXJyYXksIE1hcCBvciBzb21ldGhpbmcgZWxzZS5cclxuICpcclxuICogQHBhcmFtIGFPYmplY3Q6b2JqZWN0IHRoZSBvYmplY3QgdG8gYmUgdGVzdGluZ1xyXG4gKlxyXG4gKiBAcmV0dXJuIGJvb2xlYW5cclxuICovXHJcbmV4cG9ydCBjb25zdCBpc1Bvam8gPSBmdW5jdGlvbiAoYU9iamVjdCkge1xyXG5cdHJldHVybiB0eXBlb2YgYU9iamVjdCAhPT0gXCJ1bmRlZmluZWRcIiAmJiBhT2JqZWN0ICE9IG51bGwgJiYgYU9iamVjdC5jb25zdHJ1Y3Rvci5uYW1lID09PSBcIk9iamVjdFwiO1xyXG59O1xyXG5cclxuLyoqXHJcbiAqIG1lcmdpbmcgb2JqZWN0IGludG8gYSB0YXJnZXQgb2JqZWN0LiBJdHMgb25seSBtZXJnZSBzaW1wbGUgb2JqZWN0IGFuZCBzdWIgb2JqZWN0cy4gRXZlcnkgb3RoZXJcclxuICogdmFsdWUgd291bGQgYmUgcmVwbGFjZWQgYnkgdmFsdWUgZnJvbSB0aGUgc291cmNlIG9iamVjdC5cclxuICpcclxuICogc2FtcGxlOiBtZXJnZSh0YXJnZXQsIHNvdXJjZS0xLCBzb3VyY2UtMiwgLi4uc291cmNlLW4pXHJcbiAqXHJcbiAqIEBwYXJhbSB0YXJnZXQ6b2JqZWN0IHRoZSB0YXJnZXQgb2JqZWN0IHRvIG1lcmdpbmcgaW50b1xyXG4gKiBAcGFyYW0gc291cmNlczpvYmplY3RcclxuICpcclxuICogQHJldHVybiBvYmplY3QgcmV0dXJucyB0aGUgdGFyZ2V0IG9iamVjdFxyXG4gKi9cclxuZXhwb3J0IGNvbnN0IG1lcmdlID0gZnVuY3Rpb24gKHRhcmdldCwgLi4uc291cmNlcykge1xyXG5cdGlmKCF0YXJnZXQpXHJcblx0XHR0YXJnZXQgPSB7fTtcclxuXHJcblx0Zm9yIChsZXQgc291cmNlIG9mIHNvdXJjZXMpIHtcclxuXHRcdGlmIChpc1Bvam8oc291cmNlKSkge1xyXG5cdFx0XHRPYmplY3QuZ2V0T3duUHJvcGVydHlOYW1lcyhzb3VyY2UpLmZvckVhY2goKGtleSkgPT4ge1xyXG5cdFx0XHRcdGlmIChpc1Bvam8odGFyZ2V0W2tleV0pKSBtZXJnZSh0YXJnZXRba2V5XSwgc291cmNlW2tleV0pO1xyXG5cdFx0XHRcdGVsc2UgdGFyZ2V0W2tleV0gPSBzb3VyY2Vba2V5XTtcclxuXHRcdFx0fSk7XHJcblx0XHR9XHJcblx0fVxyXG5cclxuXHRyZXR1cm4gdGFyZ2V0O1xyXG59O1xyXG5cclxuY29uc3QgYnVpbGRQcm9wZXJ0eUZpbHRlciA9IGZ1bmN0aW9uICh7IG5hbWVzLCBhbGxvd2VkIH0pIHtcclxuXHRyZXR1cm4gKG5hbWUsIHZhbHVlLCBjb250ZXh0KSA9PiB7XHJcblx0XHRyZXR1cm4gbmFtZXMuaW5jbHVkZXMobmFtZSkgPT09IGFsbG93ZWQ7XHJcblx0fTtcclxufTtcclxuXHJcbmV4cG9ydCBjb25zdCBmaWx0ZXIgPSBmdW5jdGlvbiAoKSB7XHJcblx0Y29uc3QgW2RhdGEsIHByb3BGaWx0ZXIsIHsgZGVlcCA9IGZhbHNlLCByZWN1cnNpdmUgPSB0cnVlLCBwYXJlbnRzID0gW10gfSA9IHt9XSA9IGFyZ3VtZW50cztcclxuXHRjb25zdCByZXN1bHQgPSB7fTtcclxuXHJcblx0Zm9yIChsZXQgbmFtZSBpbiBkYXRhKSB7XHJcblx0XHRjb25zdCB2YWx1ZSA9IGRhdGFbbmFtZV07XHJcblx0XHRjb25zdCBhY2NlcHQgPSBwcm9wRmlsdGVyKG5hbWUsIHZhbHVlLCBkYXRhKTtcclxuXHRcdGlmIChhY2NlcHQgJiYgKCFkZWVwIHx8IHZhbHVlID09PSBudWxsIHx8IHZhbHVlID09PSB1bmRlZmluZWQpKSByZXN1bHRbbmFtZV0gPSB2YWx1ZTtcclxuXHRcdGVsc2UgaWYgKGFjY2VwdCAmJiBkZWVwKSB7XHJcblx0XHRcdGNvbnN0IHR5cGUgPSB0eXBlb2YgdmFsdWU7XHJcblx0XHRcdGlmICh0eXBlICE9PSBcIm9iamVjdFwiIHx8IHZhbHVlIGluc3RhbmNlb2YgQXJyYXkgfHwgdmFsdWUgaW5zdGFuY2VvZiBNYXAgfHwgdmFsdWUgaW5zdGFuY2VvZiBTZXQgfHwgdmFsdWUgaW5zdGFuY2VvZiBSZWdFeHAgfHwgcGFyZW50cy5pbmNsdWRlc1t2YWx1ZV0gfHwgdmFsdWUgPT0gZGF0YSkgcmVzdWx0W25hbWVdID0gdmFsdWU7XHJcblx0XHRcdGVsc2UgcmVzdWx0W25hbWVdID0gZmlsdGVyKHZhbHVlLCBwcm9wRmlsdGVyLCB7IGRlZXAsIHJlY3Vyc2l2ZSwgcGFyZW50czogcGFyZW50cy5jb25jYXQoZGF0YSkgfSk7XHJcblx0XHR9XHJcblx0fVxyXG5cclxuXHRyZXR1cm4gcmVzdWx0O1xyXG59O1xyXG5cclxuZXhwb3J0IGNvbnN0IGRlZlZhbHVlID0gKG8sIG5hbWUsIHZhbHVlKSA9PiB7XHJcblx0T2JqZWN0LmRlZmluZVByb3BlcnR5KG8sIG5hbWUsIHtcclxuXHRcdHZhbHVlLFxyXG5cdFx0d3JpdGFibGU6IGZhbHNlLFxyXG5cdFx0Y29uZmlndXJhYmxlOiBmYWxzZSxcclxuXHRcdGVudW1lcmFibGU6IGZhbHNlLFxyXG5cdH0pO1xyXG59O1xyXG5leHBvcnQgY29uc3QgZGVmR2V0ID0gKG8sIG5hbWUsIGdldCkgPT4ge1xyXG5cdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShvLCBuYW1lLCB7XHJcblx0XHRnZXQsXHJcblx0XHRjb25maWd1cmFibGU6IGZhbHNlLFxyXG5cdFx0ZW51bWVyYWJsZTogZmFsc2UsXHJcblx0fSk7XHJcbn07XHJcblxyXG5leHBvcnQgY29uc3QgZGVmR2V0U2V0ID0gKG8sIG5hbWUsIGdldCwgc2V0KSA9PiB7XHJcblx0T2JqZWN0LmRlZmluZVByb3BlcnR5KG8sIG5hbWUsIHtcclxuXHRcdGdldCxcclxuXHRcdHNldCxcclxuXHRcdGNvbmZpZ3VyYWJsZTogZmFsc2UsXHJcblx0XHRlbnVtZXJhYmxlOiBmYWxzZSxcclxuXHR9KTtcclxufTtcclxuXHJcbmV4cG9ydCBkZWZhdWx0IHtcclxuXHRpc1Bvam8sXHJcblx0YXBwZW5kLFxyXG5cdG1lcmdlLFxyXG5cdGZpbHRlcixcclxuXHRidWlsZFByb3BlcnR5RmlsdGVyLFxyXG5cdGRlZlZhbHVlLFxyXG5cdGRlZkdldCxcclxuXHRkZWZHZXRTZXQsXHJcbn07XHJcbiIsImNvbnN0IFBSSVZBVEVfUFJPUEVSVElFUyA9IG5ldyBXZWFrTWFwKCk7XHJcbmV4cG9ydCBjb25zdCBwcml2YXRlU3RvcmUgPSAob2JqKSA9PiB7XHJcblx0aWYoUFJJVkFURV9QUk9QRVJUSUVTLmhhcyhvYmopKVxyXG5cdFx0cmV0dXJuIFBSSVZBVEVfUFJPUEVSVElFUy5nZXQob2JqKTtcclxuXHRcclxuXHRjb25zdCBkYXRhID0ge307XHJcblx0UFJJVkFURV9QUk9QRVJUSUVTLnNldChvYmosIGRhdGEpO1xyXG5cdHJldHVybiBkYXRhO1xyXG59O1xyXG5cclxuZXhwb3J0IGNvbnN0IHByaXZhdGVQcm9wZXJ0eSA9IGZ1bmN0aW9uKG9iaiwgbmFtZSwgdmFsdWUpIHtcclxuXHRjb25zdCBkYXRhID0gcHJpdmF0ZVN0b3JlKG9iaik7XHJcblx0aWYoYXJndW1lbnRzLmxlbmd0aCA9PT0gMSlcclxuXHRcdHJldHVybiBkYXRhO1xyXG5cdGVsc2UgaWYoYXJndW1lbnRzLmxlbmd0aCA9PT0gMilcclxuXHRcdHJldHVybiBkYXRhW25hbWVdO1xyXG5cdGVsc2UgaWYoYXJndW1lbnRzLmxlbmd0aCA9PT0gMylcclxuXHRcdGRhdGFbbmFtZV0gPSB2YWx1ZTtcclxuXHRlbHNlXHJcblx0XHR0aHJvdyBuZXcgRXJyb3IoXCJOb3QgYWxsb3dlZCBzaXplIG9mIGFyZ3VtZW50cyFcIik7XHJcbn07XHJcblxyXG5leHBvcnQgY29uc3QgcHJpdmF0ZVByb3BlcnR5QWNjZXNzb3IgPSAodmFybmFtZSkgPT4ge1xyXG5cdHJldHVybiBmdW5jdGlvbihzZWxmLCB2YWx1ZSl7XHJcblx0XHRpZihhcmd1bWVudHMubGVuZ3RoID09IDIpXHJcblx0XHRcdHByaXZhdGVQcm9wZXJ0eShzZWxmLCB2YXJuYW1lLCB2YWx1ZSk7XHJcblx0XHRlbHNlXHJcblx0XHRcdHJldHVybiBwcml2YXRlUHJvcGVydHkoc2VsZiwgdmFybmFtZSk7XHJcblx0fTtcclxufTtcclxuXHJcbmV4cG9ydCBkZWZhdWx0IHtwcml2YXRlUHJvcGVydHksIHByaXZhdGVQcm9wZXJ0eUFjY2Vzc29yLCBwcml2YXRlU3RvcmV9OyIsImltcG9ydCB7ZGVmVmFsdWUsIGRlZkdldH0gZnJvbSBcIi4vT2JqZWN0VXRpbHNcIlxyXG5cclxuZXhwb3J0IGNvbnN0IHRpbWVvdXRQcm9taXNlID0gKGZuLCBtcykgPT57XHJcblx0bGV0IGNhbmNlbGVkID0gZmFsc2U7XHJcblx0bGV0IHRpbWVvdXQgPSBudWxsO1xyXG5cdGNvbnN0IHByb21pc2UgPSBuZXcgUHJvbWlzZSgociwgZSkgPT4ge1xyXG5cdFx0dGltZW91dCA9IHNldFRpbWVvdXQoKCk9PiB7XHJcblx0XHRcdHRpbWVvdXQgPSBudWxsO1xyXG5cdFx0XHRmbihyLGUpO1xyXG5cdFx0fSwgbXMpXHJcblx0fSk7XHJcblxyXG5cdGNvbnN0IHRoZW4gPSBwcm9taXNlLnRoZW47XHJcblx0cHJvbWlzZS50aGVuID0gKGZuKSA9PiB7XHJcblx0XHR0aGVuLmNhbGwocHJvbWlzZSwgKHJlc3VsdCkgPT4ge1xyXG5cdFx0XHRpZighdGhpcy5jYW5jZWxlZClcclxuXHRcdFx0XHRyZXR1cm4gZm4ocmVzdWx0KTtcclxuXHRcdH0pO1xyXG5cdH1cclxuXHJcblx0ZGVmVmFsdWUocHJvbWlzZSwgXCJjYW5jZWxcIiwgKCkgPT4ge1xyXG5cdFx0aWYodGltZW91dCl7XHJcblx0XHRcdGNsZWFyVGltZW91dCh0aW1lb3V0KTtcclxuXHRcdFx0Y2FuY2VsZWQgPSB0cnVlO1xyXG5cdFx0fVxyXG5cdH0pO1xyXG5cdGRlZkdldChwcm9taXNlLCBjYW5jZWxkLCAoKSA9PiBjYW5jZWxlZCk7XHJcblxyXG5cdHJldHVybiBwcm9taXNlO1xyXG59XHJcblxyXG5cclxuZXhwb3J0IGNvbnN0IGxhenlQcm9taXNlID0gKCkgPT4ge1xyXG5cdFx0bGV0IHByb21pc2VSZXNvbHZlID0gbnVsbDtcclxuXHRcdGxldCBwcm9taXNlRXJyb3IgPSBudWxsO1xyXG5cclxuXHRcdGNvbnN0IHByb21pc2UgPSBuZXcgUHJvbWlzZSgociwgZSkgPT4ge1xyXG5cdFx0XHRwcm9taXNlUmVzb2x2ZSA9IHI7XHJcblx0XHRcdHByb21pc2VFcnJvciA9IGU7XHJcblx0XHR9KTtcclxuXHJcblx0XHRsZXQgcmVzb2x2ZWQgPSBmYWxzZTtcclxuXHRcdGxldCBlcnJvciA9IGZhbHNlO1xyXG5cdFx0bGV0IHZhbHVlID0gdW5kZWZpbmVkO1xyXG5cclxuXHRcdGRlZlZhbHVlKHByb21pc2UsIFwicmVzb2x2ZVwiLCAocmVzdWx0KSA9PiB7XHJcblx0XHRcdHZhbHVlID0gcmVzdWx0O1xyXG5cdFx0XHRyZXNvbHZlZCA9IHRydWU7XHJcblx0XHRcdGlmICh2YWx1ZSBpbnN0YW5jZW9mIEVycm9yKSB7XHJcblx0XHRcdFx0ZXJyb3IgPSB0cnVlO1xyXG5cdFx0XHRcdHByb21pc2VFcnJvcih2YWx1ZSk7XHJcblx0XHRcdH0gZWxzZSBwcm9taXNlUmVzb2x2ZSh2YWx1ZSk7XHJcblx0XHR9KTtcclxuXHJcblx0XHRkZWZHZXQocHJvbWlzZSwgXCJ2YWx1ZVwiLCAoKSA9PiB2YWx1ZSk7XHJcblx0XHRkZWZHZXQocHJvbWlzZSwgXCJlcnJvclwiLCAoKSA9PiBlcnJvcik7XHJcblx0XHRkZWZHZXQocHJvbWlzZSwgXCJyZXNvbHZlZFwiLCAoKSA9PiByZXNvbHZlZCk7XHJcblxyXG5cdFx0cmV0dXJuIHByb21pc2U7XHJcbn07XHJcbmV4cG9ydCBkZWZhdWx0IHtcclxuXHRsYXp5UHJvbWlzZSxcclxuXHR0aW1lb3V0UHJvbWlzZVxyXG59XHJcbiIsIi8vdGhlIHNvbHV0aW9uIGlzIGZvdW5kIGhlcmU6IGh0dHBzOi8vc3RhY2tvdmVyZmxvdy5jb20vcXVlc3Rpb25zLzEwNTAzNC9ob3ctdG8tY3JlYXRlLWEtZ3VpZC11dWlkXHJcbmV4cG9ydCBjb25zdCBVVUlEX1NDSEVNQSA9IFwieHh4eHh4eHgteHh4eC00eHh4LXl4eHgteHh4eHh4eHh4eHh4XCI7XHJcblxyXG5leHBvcnQgY29uc3QgdXVpZCA9ICgpID0+IHtcclxuXHRjb25zdCBidWYgPSBuZXcgVWludDMyQXJyYXkoNCk7XHJcblx0d2luZG93LmNyeXB0by5nZXRSYW5kb21WYWx1ZXMoYnVmKTtcclxuXHRsZXQgaWR4ID0gLTE7XHJcblx0cmV0dXJuIFVVSURfU0NIRU1BLnJlcGxhY2UoL1t4eV0vZywgKGMpID0+IHtcclxuXHRcdGlkeCsrO1xyXG5cdFx0Y29uc3QgciA9IChidWZbaWR4ID4+IDNdID4+ICgoaWR4ICUgOCkgKiA0KSkgJiAxNTtcclxuXHRcdGNvbnN0IHYgPSBjID09IFwieFwiID8gciA6IChyICYgMHgzKSB8IDB4ODtcclxuXHRcdHJldHVybiB2LnRvU3RyaW5nKDE2KTtcclxuXHR9KTtcclxufTtcclxuXHJcbmV4cG9ydCBkZWZhdWx0IHsgdXVpZCB9O1xyXG4iLCJpbXBvcnQge3ByaXZhdGVQcm9wZXJ0eSwgcHJpdmF0ZVByb3BlcnR5QWNjZXNzb3IgfSBmcm9tIFwiQGRlZmF1bHQtanMvZGVmYXVsdGpzLWNvbW1vbi11dGlscy9zcmMvUHJpdmF0ZVByb3BlcnR5XCI7XG5pbXBvcnQgeyBsYXp5UHJvbWlzZSB9IGZyb20gXCJAZGVmYXVsdC1qcy9kZWZhdWx0anMtY29tbW9uLXV0aWxzL3NyYy9Qcm9taXNlVXRpbHNcIjtcbmltcG9ydCB7IHV1aWQgfSBmcm9tIFwiQGRlZmF1bHQtanMvZGVmYXVsdGpzLWNvbW1vbi11dGlscy9zcmMvVVVJRFwiO1xuaW1wb3J0IHsgaW5pdFRpbWVvdXQsIHRyaWdnZXJUaW1lb3V0IH0gZnJvbSBcIi4vQ29uc3RhbnRzXCI7XG5pbXBvcnQgeyBhdHRyaWJ1dGVDaGFuZ2VFdmVudG5hbWUsIGNvbXBvbmVudEV2ZW50bmFtZSB9IGZyb20gXCIuL3V0aWxzL0V2ZW50SGVscGVyXCI7XG5cbmNvbnN0IF9yZWFkeSA9IHByaXZhdGVQcm9wZXJ0eUFjY2Vzc29yKFwicmVhZHlcIik7XG5cbmNvbnN0IFRJTUVPVVRTID0gbmV3IFdlYWtNYXAoKTtcbmNvbnN0IGluaXQgPSAoY29tcG9uZW50KSA9PiB7XG5cdGxldCB0aW1lb3V0ID0gVElNRU9VVFMuZ2V0KGNvbXBvbmVudCk7XG5cdGlmICh0aW1lb3V0KSBjbGVhclRpbWVvdXQodGltZW91dCk7XG5cblx0VElNRU9VVFMuZ2V0KGNvbXBvbmVudCwgc2V0VGltZW91dChhc3luYyAoKSA9PiB7XG5cdFx0VElNRU9VVFMuZGVsZXRlKGNvbXBvbmVudCk7XG5cdFx0dHJ5e1xuXHRcdFx0YXdhaXQgY29tcG9uZW50LmluaXQoKTtcblx0XHRcdGNvbXBvbmVudC5yZWFkeS5yZXNvbHZlKCk7XG5cdFx0fWNhdGNoKGUpe1xuXHRcdFx0Y29uc29sZS5lcnJvcihcIkNhbid0IGluaXRpYWxpemUgY29tcG9uZW50IVwiLCBjb21wb25lbnQsIGUpO1xuXHRcdFx0Y29tcG9uZW50LnJlYWR5KHJlc29sdmUoZSkpO1xuXHRcdH1cblx0XHRjb21wb25lbnQudHJpZ2dlcihjb21wb25lbnRFdmVudG5hbWUoXCJpbml0aWFsemVkXCIsIGNvbXBvbmVudCkpO1xuXHR9LCBpbml0VGltZW91dCkpO1x0XG59O1xuXG5leHBvcnQgY29uc3QgY3JlYXRlVUlEID0gKHByZWZpeCwgc3VmZml4KSA9PiB7XG5cdGxldCBjb3VudCA9IDA7XG5cdGxldCBpZCA9IG51bGw7XG4gICAgd2hpbGUoY291bnQgPCAxMDApe1xuXHRcdGlkID0gYCR7cHJlZml4ID8gcHJlZml4IDogXCJcIn0ke3V1aWQoKX0ke3N1ZmZpeCA/IHN1ZmZpeCA6IFwiXCJ9YDtcblx0XHRpZighZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoaWQpKVxuXHRcdFx0cmV0dXJuIGlkO1xuXG5cdFx0Y291bnQrKztcblx0fVxuXHRjb25zb2xlLmVycm9yKG5ldyBFcnJvcihcIlRvIG1hbnkgcmV0cmllcyB0byBjcmVhdGUgYW4gdW5pcXVlIGlkIC0gY3JlYXRlZCBpZCBpcyBub3QgdW5pcXVlIVwiKSk7XG5cdHJldHVybiBpZDtcbn07XG5cblxuXG5jb25zdCBidWlsZENsYXNzID0gKGh0bWxCYXNlVHlwZSkgPT57XG5cdHJldHVybiBjbGFzcyBDb21wb25lbnQgZXh0ZW5kcyBodG1sQmFzZVR5cGUge1xuXHRcdGNvbnN0cnVjdG9yKHtzaGFkb3dSb290ID0gZmFsc2UsIGNvbnRlbnQgPSBudWxsLCBjcmVhdGVVSUQgPSBmYWxzZSwgdWlkUHJlZml4ID0gXCJpZC1cIiwgdWlkU3VmZml4ID0gXCJcIn0gPSB7fSkge1xuXHRcdFx0c3VwZXIoKTtcblx0XHRcdF9yZWFkeSh0aGlzLCBsYXp5UHJvbWlzZSgpKTtcblx0XG5cdFx0XHRpZihjcmVhdGVVSUQpXG5cdFx0XHRcdHRoaXMuYXR0cihcImlkXCIsIGNyZWF0ZVVJRCh1aWRQcmVmaXgsIHVpZFN1ZmZpeCkpO1xuXHRcblx0XHRcdGlmKHNoYWRvd1Jvb3QpXG5cdFx0XHRcdHRoaXMuYXR0YWNoU2hhZG93KHttb2RlOm9wZW59KTtcblx0XHRcdFxuXHRcdFx0aWYoY29udGVudClcblx0XHRcdFx0dGhpcy5yb290LmFwcGVuZCh0eXBlb2YgY29udGVudCA9PT0gXCJmdW5jdGlvblwiID8gY29udGVudCh0aGlzKSA6IGNvbnRlbnQpO1xuXHRcdH1cblx0XG5cdFx0Z2V0IHJvb3QoKXtcblx0XHRcdHJldHVybiB0aGlzLnNoYWRvd1Jvb3QgfHwgdGhpcztcblx0XHR9XG5cdFxuXHRcdGdldCByZWFkeSgpe1xuXHRcdFx0cmV0dXJuIF9yZWFkeSh0aGlzKTtcblx0XHR9XG5cdFxuXHRcdGFzeW5jIGluaXQoKSB7fVxuXHRcblx0XHRhc3luYyBkZXN0cm95KCkge1xuXHRcdFx0aWYodGhpcy5yZWFkeS5yZXNvbHZlZClcblx0XHRcdF9yZWFkeSh0aGlzLCBsYXp5UHJvbWlzZSgpKTtcblx0XHR9XG5cdFxuXHRcdGNvbm5lY3RlZENhbGxiYWNrKCkge1xuXHRcdFx0aWYgKHRoaXMub3duZXJEb2N1bWVudCA9PSBkb2N1bWVudCkgaW5pdCh0aGlzKSgpO1xuXHRcdH1cblx0XG5cdFx0YWRvcHRlZENhbGxiYWNrKCkge1xuXHRcdFx0dGhpcy5jb25uZWN0ZWRDYWxsYmFjaygpO1xuXHRcdH1cblx0XG5cdFx0YXR0cmlidXRlQ2hhbmdlZENhbGxiYWNrKG5hbWUsIG9sZFZhbHVlLCBuZXdWYWx1ZSkge1xuXHRcdFx0aWYgKG9sZFZhbHVlICE9IG5ld1ZhbHVlICYmIHRoaXMuaXNDb25uZWN0ZWQpIHtcblx0XHRcdFx0dGhpcy50cmlnZ2VyKHRyaWdnZXJUaW1lb3V0LCBhdHRyaWJ1dGVDaGFuZ2VFdmVudG5hbWUobmFtZSwgdGhpcykpO1xuXHRcdFx0XHR0aGlzLnRyaWdnZXIodHJpZ2dlclRpbWVvdXQsIGNvbXBvbmVudEV2ZW50bmFtZShcImNoYW5nZVwiLCB0aGlzKSk7XG5cdFx0XHR9XG5cdFx0fVxuXHRcblx0XHRkaXNjb25uZWN0ZWRDYWxsYmFjaygpe1xuXHRcdFx0dGhpcy5kZXN0cm95KCk7XG5cdFx0fVxuXHR9O1xufSBcblxuY29uc3QgQ0xBWlpNQVAgPSBuZXcgTWFwKCk7XG5cbmV4cG9ydCBjb25zdCBjb21wb25lbnRCYXNlT2YgPSAoaHRtbEJhc2VUeXBlKSA9PiB7XG5cdGxldCBjbGF6eiA9IENMQVpaTUFQLmdldChodG1sQmFzZVR5cGUpO1xuXHRpZihjbGF6eiA9PSBudWxsKXtcblx0XHRjbGF6eiA9IGJ1aWxkQ2xhc3MoaHRtbEJhc2VUeXBlKTtcblx0XHRDTEFaWk1BUC5zZXQoaHRtbEJhc2VUeXBlLCBjbGF6eik7XG5cdH1cblxuXHRyZXR1cm4gY2xheno7XG59XG5cbmNvbnN0IENvbXBvbmVudCA9IGNvbXBvbmVudEJhc2VPZihIVE1MRWxlbWVudCk7XG5cblxuXG5leHBvcnQgZGVmYXVsdCBDb21wb25lbnQ7XG4iLCJleHBvcnQgY29uc3QgY29tcG9uZW50UHJlZml4ID0gXCJkLVwiO1xyXG5leHBvcnQgY29uc3QgYXR0cmlidXRlQ2hhbmdlRXZlbnRQcmVmaXggPSBcImF0dHJpYnV0ZS1cIjtcclxuZXhwb3J0IGNvbnN0IGluaXRUaW1lb3V0ID0gMTAwO1xyXG5leHBvcnQgY29uc3QgdHJpZ2dlclRpbWVvdXQgPSAxMDA7XHJcbiIsImltcG9ydCB7IGxhenlQcm9taXNlIH0gZnJvbSBcIkBkZWZhdWx0LWpzL2RlZmF1bHRqcy1jb21tb24tdXRpbHMvc3JjL1Byb21pc2VVdGlsc1wiO1xuXG5leHBvcnQgZGVmYXVsdCBsYXp5UHJvbWlzZVxuIiwiaW1wb3J0IHsgY29tcG9uZW50UHJlZml4IH0gZnJvbSBcIi4uL0NvbnN0YW50c1wiO1xuXG5leHBvcnQgY29uc3QgdG9Ob2RlTmFtZSA9IChuYW1lLCBwcmVmaXgpID0+IHtcblx0aWYodHlwZW9mIHByZWZpeCA9PT0gXCJzdHJpbmdcIilcblx0XHRyZXR1cm4gcHJlZml4ICsgbmFtZTtcblx0XHRcblx0cmV0dXJuIGNvbXBvbmVudFByZWZpeCArIG5hbWU7XG59O1xuXG5leHBvcnQgY29uc3QgZGVmaW5lID0gZnVuY3Rpb24oY2xhenosIG9wdGlvbnMpIHtcblx0Y29uc3Qgbm9kZW5hbWUgPSBjbGF6ei5OT0RFTkFNRTtcblx0aWYgKCFjdXN0b21FbGVtZW50cy5nZXQobm9kZW5hbWUpKSB7XG5cdFx0Y3VzdG9tRWxlbWVudHMuZGVmaW5lKG5vZGVuYW1lLCBjbGF6eiwgb3B0aW9ucyk7XG5cdH1cbn07XG5cblxuZXhwb3J0IGRlZmF1bHQgZGVmaW5lOyBcbiIsImltcG9ydCB7YXR0cmlidXRlQ2hhbmdlRXZlbnRQcmVmaXh9IGZyb20gXCIuLi9Db25zdGFudHNcIjtcblxuZXhwb3J0IGNvbnN0IGNvbXBvbmVudEV2ZW50bmFtZSA9IChldmVudFR5cGUsIG5vZGUgKSA9PiB7XHRcblx0bGV0IG5vZGVuYW1lID0gXCJ1bnN1cHBvcnRlZFwiO1xuXHRpZih0eXBlb2Ygbm9kZSA9PT0gXCJzdHJpbmdcIilcblx0XHRub2RlbmFtZSA9IG5vZGU7XG5cdGVsc2UgaWYobm9kZSBpbnN0YW5jZW9mIEhUTUxFbGVtZW50KVxuXHRcdG5vZGVuYW1lID0gbm9kZS5ub2RlTmFtZTtcblx0ZWxzZSBpZih0eXBlb2Ygbm9kZS5OT0RFTkFNRSA9PT0gXCJzdHJpbmdcIilcblx0XHRub2RlbmFtZSA9IG5vZGUuTk9ERU5BTUU7XG5cdGVsc2UgdGhyb3cgbmV3IEVycm9yKGAke3R5cGVvZiBub2RlfSBpcyBub3Qgc3VwcG9ydGVkIGFzIHBhcmFtZXRlciBcIm5vZGVcIiFgKTtcblx0XG4gICByZXR1cm4gYCR7bm9kZW5hbWUudG9Mb3dlckNhc2UoKX06JHtldmVudFR5cGV9YDsvL3VzZSBAIGFzIHNlcGFydG9yIGFuZCBub3QgOlxufTtcblxuXG5leHBvcnQgY29uc3QgYXR0cmlidXRlQ2hhbmdlRXZlbnRuYW1lID0gKGF0dHJpYnV0ZSwgbm9kZSApID0+IHtcbiAgICByZXR1cm4gY29tcG9uZW50RXZlbnRuYW1lKGAke2F0dHJpYnV0ZUNoYW5nZUV2ZW50UHJlZml4fS0ke2F0dHJpYnV0ZX1gLCBub2RlKTtcbn07XG5cbmV4cG9ydCBkZWZhdWx0IHtjb21wb25lbnRFdmVudG5hbWUsIGF0dHJpYnV0ZUNoYW5nZUV2ZW50bmFtZX0iLCJpbXBvcnQgR2xvYmFsIGZyb20gXCJAZGVmYXVsdC1qcy9kZWZhdWx0anMtY29tbW9uLXV0aWxzL3NyYy9HbG9iYWxcIlxuXG5leHBvcnQgY29uc3QgY29weVN0eWxlcyA9IChzb3VyY2UsIHRhcmdldCwgYXBwZW5kID0gdHJ1ZSkgPT4ge1xuXHRjb25zdCBzdHlsZXMgPSBzb3VyY2UuZmluZChgc3R5bGVbdHlwZT1cInRleHQvY3NzXCJdLCBsaW5rW3JlbD1cInN0eWxlc2hlZXRcIl1gKTtcblxuXHRpZiAoYXBwZW5kKVxuXHRcdHRhcmdldC5hcHBlbmQoc3R5bGVzLmNsb25lTm9kZSh0cnVlKSk7XG5cdGVsc2Vcblx0XHR0YXJnZXQucHJlcGVuZChzdHlsZXMuY2xvbmVOb2RlKHRydWUpKTtcbn1cblxuZXhwb3J0IGNvbnN0IENTU19CQVNFX1BBVEhfVkFSID0gXCJDU1NfQkFTRV9QQVRIXCI7XG5leHBvcnQgY29uc3QgbG9hZENvbXBvbmVudFN0eWxlID0gKHRhcmdldCkgPT4ge1xuXHRjb25zdCBwYXRoID0gYCR7R2xvYmFsW0NTU19CQVNFX1BBVEhfVkFSXSB8fCBcImNzc1wifS8ke3RhcmdldC5ub2RlTmFtZS50b0xvd2VyQ2FzZSgpfS5jc3NgO1xuXHR0YXJnZXQuYXBwZW5kKGA8bGluayByZWw9XCJzdHlsZXNoZWV0XCIgaHJlZj1cIiR7cGF0aH1cIi8+YCk7XG59XG5cbmV4cG9ydCBkZWZhdWx0IHsgQ1NTX0JBU0VfUEFUSF9WQVIsIGNvcHlTdHlsZXMsIGxvYWRDb21wb25lbnRTdHlsZSB9OyIsImltcG9ydCB7IGRlZlZhbHVlIH0gZnJvbVwiQGRlZmF1bHQtanMvZGVmYXVsdGpzLWNvbW1vbi11dGlscy9zcmMvT2JqZWN0VXRpbHNcIjtcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFdlYWtEYXRhIHtcblx0Y29uc3RydWN0b3IoKSB7XG5cdFx0ZGVmVmFsdWUodGhpcywgXCJ3ZWFrbWFwXCIsIG5ldyBXZWFrTWFwKCkpO1xuXHR9XG5cblx0ZGF0YShyZWZlcmVuY2UpIHtcblx0XHRsZXQgZGF0YSA9IHRoaXMud2Vha21hcC5nZXQocmVmZXJlbmNlKTtcblx0XHRpZiAoIWRhdGEpIHtcblx0XHRcdGRhdGEgPSB7fTtcblx0XHRcdHRoaXMud2Vha21hcC5zZXQocmVmZXJlbmNlLCBkYXRhKTtcblx0XHR9XG5cdFx0cmV0dXJuIGRhdGE7XG5cdH1cblxuXHR2YWx1ZShyZWZlcmVuY2UsIGtleSwgdmFsdWUpIHtcblx0XHRpZiAoYXJndW1lbnRzLmxlbmd0aCA9PSAyKSByZXR1cm4gdGhpcy5kYXRhKHJlZmVyZW5jZSlba2V5XTtcblx0XHRlbHNlIGlmKHR5cGVvZiB2YWx1ZSA9PT0gXCJ1bmRlZmluZWRcIikgZGVsZXRlIHRoaXMuZGF0YShyZWZlcmVuY2UpW2tleV07XG5cdFx0ZWxzZSB0aGlzLmRhdGEocmVmZXJlbmNlKVtrZXldID0gdmFsdWU7XG5cdH1cblxuXHRkZXN0cm95KCl7XG5cdFx0dGhpcy53ZWFrbWFwLmRlbGV0ZShyZWZlcmVuY2UpO1xuXHR9XG59O1xuXG4iLCJpbXBvcnQgRGVmaW5lQ29tcG9uZW50SGVscGVyIGZyb20gXCIuL0RlZmluZUNvbXBvbmVudEhlbHBlclwiO1xuaW1wb3J0IEV2ZW50SGVscGVyIGZyb20gXCIuL0V2ZW50SGVscGVyXCI7XG5pbXBvcnQgTm9kZUhlbHBlciBmcm9tIFwiLi9FdmVudEhlbHBlclwiO1xuaW1wb3J0IFN0eWxlSGVscGVyIGZyb20gXCIuL1N0eWxlSGVscGVyXCI7XG5pbXBvcnQgV2Vha0RhdGEgZnJvbSBcIi4vV2Vha0RhdGFcIjtcblxuZXhwb3J0IGRlZmF1bHQge0RlZmluZUNvbXBvbmVudEhlbHBlciwgRXZlbnRIZWxwZXIsIE5vZGVIZWxwZXIsIFN0eWxlSGVscGVyLCBXZWFrRGF0YX07IiwiLy8gVGhlIG1vZHVsZSBjYWNoZVxudmFyIF9fd2VicGFja19tb2R1bGVfY2FjaGVfXyA9IHt9O1xuXG4vLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcblx0dmFyIGNhY2hlZE1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF07XG5cdGlmIChjYWNoZWRNb2R1bGUgIT09IHVuZGVmaW5lZCkge1xuXHRcdHJldHVybiBjYWNoZWRNb2R1bGUuZXhwb3J0cztcblx0fVxuXHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuXHR2YXIgbW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXSA9IHtcblx0XHQvLyBubyBtb2R1bGUuaWQgbmVlZGVkXG5cdFx0Ly8gbm8gbW9kdWxlLmxvYWRlZCBuZWVkZWRcblx0XHRleHBvcnRzOiB7fVxuXHR9O1xuXG5cdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuXHRfX3dlYnBhY2tfbW9kdWxlc19fW21vZHVsZUlkXShtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuXHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuXHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG59XG5cbiIsIi8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb25zIGZvciBoYXJtb255IGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uZCA9IChleHBvcnRzLCBkZWZpbml0aW9uKSA9PiB7XG5cdGZvcih2YXIga2V5IGluIGRlZmluaXRpb24pIHtcblx0XHRpZihfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZGVmaW5pdGlvbiwga2V5KSAmJiAhX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIGtleSkpIHtcblx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBrZXksIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBkZWZpbml0aW9uW2tleV0gfSk7XG5cdFx0fVxuXHR9XG59OyIsIl9fd2VicGFja19yZXF1aXJlX18uZyA9IChmdW5jdGlvbigpIHtcblx0aWYgKHR5cGVvZiBnbG9iYWxUaGlzID09PSAnb2JqZWN0JykgcmV0dXJuIGdsb2JhbFRoaXM7XG5cdHRyeSB7XG5cdFx0cmV0dXJuIHRoaXMgfHwgbmV3IEZ1bmN0aW9uKCdyZXR1cm4gdGhpcycpKCk7XG5cdH0gY2F0Y2ggKGUpIHtcblx0XHRpZiAodHlwZW9mIHdpbmRvdyA9PT0gJ29iamVjdCcpIHJldHVybiB3aW5kb3c7XG5cdH1cbn0pKCk7IiwiX193ZWJwYWNrX3JlcXVpcmVfXy5vID0gKG9iaiwgcHJvcCkgPT4gKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmosIHByb3ApKSIsIi8vIGRlZmluZSBfX2VzTW9kdWxlIG9uIGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uciA9IChleHBvcnRzKSA9PiB7XG5cdGlmKHR5cGVvZiBTeW1ib2wgIT09ICd1bmRlZmluZWQnICYmIFN5bWJvbC50b1N0cmluZ1RhZykge1xuXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBTeW1ib2wudG9TdHJpbmdUYWcsIHsgdmFsdWU6ICdNb2R1bGUnIH0pO1xuXHR9XG5cdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCAnX19lc01vZHVsZScsIHsgdmFsdWU6IHRydWUgfSk7XG59OyIsImltcG9ydCBHTE9CQUwgZnJvbSBcIkBkZWZhdWx0LWpzL2RlZmF1bHRqcy1jb21tb24tdXRpbHMvc3JjL0dsb2JhbFwiO1xuaW1wb3J0IHV0aWxzIGZyb20gXCIuL3NyYy91dGlsc1wiO1xuaW1wb3J0IFJlYWR5IGZyb20gXCIuL3NyYy9SZWFkeVwiO1xuaW1wb3J0IENvbXBvbmVudCwge2NvbXBvbmVudEJhc2VPZiwgY3JlYXRlVUlEfSBmcm9tIFwiLi9zcmMvQ29tcG9uZW50XCI7XG5cbmNvbnN0IHBhY2sgPSB7VkVSU0lPTiA6IFwiJHt2ZXJzaW9ufVwiLCB1dGlscywgUmVhZHksIENvbXBvbmVudCwgY29tcG9uZW50QmFzZU9mLCBjcmVhdGVVSUQgfTtcblxuR0xPQkFMLmRlZmF1bHRqcyA9IEdMT0JBTC5kZWZhdWx0anMgfHwge307XG5HTE9CQUwuZGVmYXVsdGpzLmh0bWwgPSBHTE9CQUwuZGVmYXVsdGpzLmh0bWwgfHwge307XG5HTE9CQUwuZGVmYXVsdGpzLmh0bWwuY29tcG9uZW50cyA9IEdMT0JBTC5kZWZhdWx0anMuaHRtbC5jb21wb25lbnRzIHx8IHBhY2s7XG4iXSwibmFtZXMiOltdLCJzb3VyY2VSb290IjoiIn0=