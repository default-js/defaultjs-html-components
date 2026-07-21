/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./index.js"
/*!******************!*\
  !*** ./index.js ***!
  \******************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   Component: () => (/* reexport safe */ _src_Component__WEBPACK_IMPORTED_MODULE_5__["default"]),
/* harmony export */   Ready: () => (/* reexport safe */ _src_Ready_js__WEBPACK_IMPORTED_MODULE_3__["default"]),
/* harmony export */   SETTING: () => (/* reexport safe */ _src_Constants_js__WEBPACK_IMPORTED_MODULE_1__.SETTING),
/* harmony export */   componentBaseOf: () => (/* reexport safe */ _src_Component__WEBPACK_IMPORTED_MODULE_5__.componentBaseOf),
/* harmony export */   createUUID: () => (/* reexport safe */ _src_Component__WEBPACK_IMPORTED_MODULE_5__.createUUID),
/* harmony export */   define: () => (/* reexport safe */ _src_utils_DefineComponentHelper_js__WEBPACK_IMPORTED_MODULE_4__.define),
/* harmony export */   utils: () => (/* reexport safe */ _src_utils_index_js__WEBPACK_IMPORTED_MODULE_2__["default"])
/* harmony export */ });
/* harmony import */ var _default_js_defaultjs_extdom__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @default-js/defaultjs-extdom */ "./node_modules/@default-js/defaultjs-extdom/index.js");
/* harmony import */ var _src_Constants_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./src/Constants.js */ "./src/Constants.js");
/* harmony import */ var _src_utils_index_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./src/utils/index.js */ "./src/utils/index.js");
/* harmony import */ var _src_Ready_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./src/Ready.js */ "./src/Ready.js");
/* harmony import */ var _src_utils_DefineComponentHelper_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./src/utils/DefineComponentHelper.js */ "./src/utils/DefineComponentHelper.js");
/* harmony import */ var _src_Component__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./src/Component */ "./src/Component.js");











/***/ },

/***/ "./node_modules/@default-js/defaultjs-common-utils/src/Global.js"
/*!***********************************************************************!*\
  !*** ./node_modules/@default-js/defaultjs-common-utils/src/Global.js ***!
  \***********************************************************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

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

/***/ },

/***/ "./node_modules/@default-js/defaultjs-common-utils/src/ObjectProperty.js"
/*!*******************************************************************************!*\
  !*** ./node_modules/@default-js/defaultjs-common-utils/src/ObjectProperty.js ***!
  \*******************************************************************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

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

/***/ },

/***/ "./node_modules/@default-js/defaultjs-common-utils/src/ObjectUtils.js"
/*!****************************************************************************!*\
  !*** ./node_modules/@default-js/defaultjs-common-utils/src/ObjectUtils.js ***!
  \****************************************************************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   append: () => (/* binding */ append),
/* harmony export */   defGet: () => (/* binding */ defGet),
/* harmony export */   defGetSet: () => (/* binding */ defGetSet),
/* harmony export */   defValue: () => (/* binding */ defValue),
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__),
/* harmony export */   equalPojo: () => (/* binding */ equalPojo),
/* harmony export */   filter: () => (/* binding */ filter),
/* harmony export */   isNullOrUndefined: () => (/* binding */ isNullOrUndefined),
/* harmony export */   isObject: () => (/* binding */ isObject),
/* harmony export */   isPojo: () => (/* binding */ isPojo),
/* harmony export */   isPrimitive: () => (/* binding */ isPrimitive),
/* harmony export */   merge: () => (/* binding */ merge)
/* harmony export */ });
/* harmony import */ var _ObjectProperty_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./ObjectProperty.js */ "./node_modules/@default-js/defaultjs-common-utils/src/ObjectProperty.js");


const equalArraySet = (a, b) => {
	if (a.length !== b.length) return false;
	const length = a.length;
	for (let i = 0; i < length; i++)
		if (!equalPojo(a[i], b[i])) {
			//console.log("false");
			return false;
		}

	return true;
};

const equalMap = (a, b) => {
	if (a.length !== b.length) return false;
	for (const key of a.keys())
		if (!equalPojo(a.get(key), b.get(key))) {
			//console.log("false");
			return false;
		}

	return true;
};

const equalClasses = (a, b) => {
	const clazzA = Object.getPrototypeOf(a);
	const clazzB = Object.getPrototypeOf(b);
	if (clazzA != clazzB) return false;

	if (!clazzA) return true;

	const propertiesA = Object.getOwnPropertyNames(clazzA);
	const propertiesB = Object.getOwnPropertyNames(clazzB);

	if (propertiesA.length !== propertiesB.length) return false;
	for (const key of propertiesA) {
		const valueA = a[key];
		const valueB = b[key];

		if (!equalPojo(valueA, valueB)) return false;
	}
	return true;
};

const equalObject = (a, b) => {
	const propertiesA = Object.keys(a);
	const propertiesB = Object.keys(b);

	if (propertiesA.length !== propertiesB.length) return false;
	for (const key of propertiesA) {
		const valueA = a[key];
		const valueB = b[key];

		if (!equalPojo(valueA, valueB)) return false;
	}
	return true;
};

const isNullOrUndefined = (object) => {
	return object == null || typeof object === "undefined";
};

const isPrimitive = (object) => {
	if (object == null) return true;

	const type = typeof object;
	switch (type) {
		case "number":
		case "bigint":
		case "boolean":
		case "string":
		case "undefined":
			return true;
	}

	return false;
};

const isObject = (object) => {
	if(isNullOrUndefined(object))
		return false;

	return typeof object === "object" && (!object.constructor || object.constructor.name === "Object");
};

/**
 * equalPojo -> compares only pojos, array, set, map and primitives
 */
const equalPojo = (a, b) => {
	const nullA = isNullOrUndefined(a);
	const nullB = isNullOrUndefined(b);
	if (nullA || nullB) return a === b;

	if (isPrimitive(a) || isPrimitive(b)) return a === b;

	const typeA = typeof a;
	const typeB = typeof b;
	if (typeA != typeB) return false;
	if (typeA === "function") return a === b;
	//if (a.constructor !== b.constructor) return false;
	//if (a instanceof Array || a instanceof Set) return equalArraySet(a, b);
	//if (a instanceof Map) return equalMap(a, b);

	return equalObject(a, b) && equalClasses(a, b);
};

/**
 * checked if an object a simple object. No Array, Map or something else.
 *
 * @param aObject:object the object to be testing
 *
 * @return boolean
 */
const isPojo = (object) => {
	if (!isObject(object)) return false;

	for (const key in object) {
		const value = object[key];
		if (typeof value === "function") return false;
	}

	return true;
};

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
	if (!target) target = {};

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
	isNullOrUndefined,
	isObject,
	equalPojo,
	isPojo,
	append,
	merge,
	filter,
	buildPropertyFilter,
	defValue,
	defGet,
	defGetSet,
});


/***/ },

/***/ "./node_modules/@default-js/defaultjs-common-utils/src/PromiseUtils.js"
/*!*****************************************************************************!*\
  !*** ./node_modules/@default-js/defaultjs-common-utils/src/PromiseUtils.js ***!
  \*****************************************************************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__),
/* harmony export */   lazyPromise: () => (/* binding */ lazyPromise),
/* harmony export */   timeoutPromise: () => (/* binding */ timeoutPromise)
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


/***/ },

/***/ "./node_modules/@default-js/defaultjs-common-utils/src/UUID.js"
/*!*********************************************************************!*\
  !*** ./node_modules/@default-js/defaultjs-common-utils/src/UUID.js ***!
  \*********************************************************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   UUID_SCHEMA: () => (/* binding */ UUID_SCHEMA),
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__),
/* harmony export */   uuid: () => (/* binding */ uuid)
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


/***/ },

/***/ "./node_modules/@default-js/defaultjs-extdom/index.js"
/*!************************************************************!*\
  !*** ./node_modules/@default-js/defaultjs-extdom/index.js ***!
  \************************************************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _src__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./src */ "./node_modules/@default-js/defaultjs-extdom/src/index.js");


/***/ },

/***/ "./node_modules/@default-js/defaultjs-extdom/src/Global.js"
/*!*****************************************************************!*\
  !*** ./node_modules/@default-js/defaultjs-extdom/src/Global.js ***!
  \*****************************************************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _utils_Utils__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./utils/Utils */ "./node_modules/@default-js/defaultjs-extdom/src/utils/Utils.js");
/* harmony import */ var _dom_extentions_ReadyEventSupport__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./dom/extentions/ReadyEventSupport */ "./node_modules/@default-js/defaultjs-extdom/src/dom/extentions/ReadyEventSupport.js");



_utils_Utils__WEBPACK_IMPORTED_MODULE_0__.GLOBAL.defaultjs = _utils_Utils__WEBPACK_IMPORTED_MODULE_0__.GLOBAL.defaultjs || {};
_utils_Utils__WEBPACK_IMPORTED_MODULE_0__.GLOBAL.defaultjs.extdom = _utils_Utils__WEBPACK_IMPORTED_MODULE_0__.GLOBAL.defaultjs.extdom || {
	VERSION : "3.0.0",
	READYEVENT : _dom_extentions_ReadyEventSupport__WEBPACK_IMPORTED_MODULE_1__.READYEVENT,
	utils : {
		Utils: _utils_Utils__WEBPACK_IMPORTED_MODULE_0__["default"]
	}
};

_utils_Utils__WEBPACK_IMPORTED_MODULE_0__.GLOBAL.find = function() {
	return document.find.apply(document, arguments);
};

_utils_Utils__WEBPACK_IMPORTED_MODULE_0__.GLOBAL.ready = function() {
	return document.ready.apply(document, arguments);
};

_utils_Utils__WEBPACK_IMPORTED_MODULE_0__.GLOBAL.create = function(aContent, asTemplate) {
	if (typeof arguments[0] !== "string")
		throw new Error("The first argument must be a string!");
	
	const template = document.createElement("template");
	template.innerHTML = aContent;
	if(asTemplate)
		return template;
	
	return document.importNode(template.content, true).childNodes;
};

_utils_Utils__WEBPACK_IMPORTED_MODULE_0__.GLOBAL.script = function(aFile, aTarget) {
	if(aFile instanceof Array)
		return Promise.all(aFile.map(file => _utils_Utils__WEBPACK_IMPORTED_MODULE_0__.GLOBAL.script(file, aTarget)));
	
	if(typeof aFile === "string")	
		return new Promise((r,e) => {
			const script = document.createElement("script");
			script.async = true;
			script.onload = function(){r()};
			script.onerror = function(){throw new Error("load error!")};
			!aTarget ? document.body.append(script) : aTarget.append(script);
			script.src = aFile;
		});
	else
		return Promise.reject("First parameter must be an array of strings or a string!");
};

/***/ },

/***/ "./node_modules/@default-js/defaultjs-extdom/src/dom/Document.js"
/*!***********************************************************************!*\
  !*** ./node_modules/@default-js/defaultjs-extdom/src/dom/Document.js ***!
  \***********************************************************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _utils_ExtendPrototype__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../utils/ExtendPrototype */ "./node_modules/@default-js/defaultjs-extdom/src/utils/ExtendPrototype.js");
/* harmony import */ var _extentions_QuerySupport__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./extentions/QuerySupport */ "./node_modules/@default-js/defaultjs-extdom/src/dom/extentions/QuerySupport.js");
/* harmony import */ var _extentions_ReadyEventSupport__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./extentions/ReadyEventSupport */ "./node_modules/@default-js/defaultjs-extdom/src/dom/extentions/ReadyEventSupport.js");
/**
 * Adds query and ready functions to Document, and triggers the ready event.
 *
 * The event is triggered once the dom is parsed. A ready function registered
 * after that is not lost, as ready() triggers the event again when the document
 * is already complete.
 */




(0,_utils_ExtendPrototype__WEBPACK_IMPORTED_MODULE_0__["default"])(Document, _extentions_QuerySupport__WEBPACK_IMPORTED_MODULE_1__["default"], _extentions_ReadyEventSupport__WEBPACK_IMPORTED_MODULE_2__["default"]);

document.addEventListener("DOMContentLoaded", () => document.trigger(_extentions_ReadyEventSupport__WEBPACK_IMPORTED_MODULE_2__.READYEVENT));





/***/ },

/***/ "./node_modules/@default-js/defaultjs-extdom/src/dom/DocumentFragment.js"
/*!*******************************************************************************!*\
  !*** ./node_modules/@default-js/defaultjs-extdom/src/dom/DocumentFragment.js ***!
  \*******************************************************************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _utils_ExtendPrototype__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../utils/ExtendPrototype */ "./node_modules/@default-js/defaultjs-extdom/src/utils/ExtendPrototype.js");
/* harmony import */ var _extentions_QuerySupport__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./extentions/QuerySupport */ "./node_modules/@default-js/defaultjs-extdom/src/dom/extentions/QuerySupport.js");
/* harmony import */ var _extentions_ManipulationSupport__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./extentions/ManipulationSupport */ "./node_modules/@default-js/defaultjs-extdom/src/dom/extentions/ManipulationSupport.js");
/**
 * Adds query and content functions to DocumentFragment.
 *
 * A ShadowRoot is a DocumentFragment, so a shadow root can be searched and filled
 * the same way as the fragment create() returns.
 */




(0,_utils_ExtendPrototype__WEBPACK_IMPORTED_MODULE_0__["default"])(DocumentFragment, _extentions_QuerySupport__WEBPACK_IMPORTED_MODULE_1__["default"], _extentions_ManipulationSupport__WEBPACK_IMPORTED_MODULE_2__["default"]);






/***/ },

/***/ "./node_modules/@default-js/defaultjs-extdom/src/dom/Element.js"
/*!**********************************************************************!*\
  !*** ./node_modules/@default-js/defaultjs-extdom/src/dom/Element.js ***!
  \**********************************************************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _utils_ExtendPrototype__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../utils/ExtendPrototype */ "./node_modules/@default-js/defaultjs-extdom/src/utils/ExtendPrototype.js");
/* harmony import */ var _extentions_QuerySupport__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./extentions/QuerySupport */ "./node_modules/@default-js/defaultjs-extdom/src/dom/extentions/QuerySupport.js");
/* harmony import */ var _extentions_AttributeSupport__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./extentions/AttributeSupport */ "./node_modules/@default-js/defaultjs-extdom/src/dom/extentions/AttributeSupport.js");
/* harmony import */ var _extentions_ManipulationSupport__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./extentions/ManipulationSupport */ "./node_modules/@default-js/defaultjs-extdom/src/dom/extentions/ManipulationSupport.js");
/**
 * Adds query, attribute and content functions to Element.
 *
 * Query and attribute functions need a selectable node, which is why they sit
 * here and not on Node. ManipulationSupport is applied again although Element
 * inherits it from Node - that puts the functions on Element as own properties,
 * where the extensions of the more specific html types can find them.
 */





(0,_utils_ExtendPrototype__WEBPACK_IMPORTED_MODULE_0__["default"])(Element,_extentions_QuerySupport__WEBPACK_IMPORTED_MODULE_1__["default"], _extentions_AttributeSupport__WEBPACK_IMPORTED_MODULE_2__["default"], _extentions_ManipulationSupport__WEBPACK_IMPORTED_MODULE_3__["default"]);

/***/ },

/***/ "./node_modules/@default-js/defaultjs-extdom/src/dom/EventTarget.js"
/*!**************************************************************************!*\
  !*** ./node_modules/@default-js/defaultjs-extdom/src/dom/EventTarget.js ***!
  \**************************************************************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _utils_ExtendPrototype__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../utils/ExtendPrototype */ "./node_modules/@default-js/defaultjs-extdom/src/utils/ExtendPrototype.js");
/* harmony import */ var _extentions_EventSupport__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./extentions/EventSupport */ "./node_modules/@default-js/defaultjs-extdom/src/dom/extentions/EventSupport.js");
/**
 * Adds the event functions to EventTarget.
 *
 * EventTarget is the root of everything dispatching events, not only of the dom,
 * so on(), removeOn() and trigger() are available on every node, on the document
 * and on the window alike.
 */



(0,_utils_ExtendPrototype__WEBPACK_IMPORTED_MODULE_0__["default"])(EventTarget, _extentions_EventSupport__WEBPACK_IMPORTED_MODULE_1__["default"]);

/***/ },

/***/ "./node_modules/@default-js/defaultjs-extdom/src/dom/HTMLElement.js"
/*!**************************************************************************!*\
  !*** ./node_modules/@default-js/defaultjs-extdom/src/dom/HTMLElement.js ***!
  \**************************************************************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _utils_ExtendPrototype__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../utils/ExtendPrototype */ "./node_modules/@default-js/defaultjs-extdom/src/utils/ExtendPrototype.js");
/* harmony import */ var _extentions_HtmlClassSupport__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./extentions/HtmlClassSupport */ "./node_modules/@default-js/defaultjs-extdom/src/dom/extentions/HtmlClassSupport.js");
/* harmony import */ var _extentions_ShowHideSupport__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./extentions/ShowHideSupport */ "./node_modules/@default-js/defaultjs-extdom/src/dom/extentions/ShowHideSupport.js");
/**
 * Adds class and visibility functions to HTMLElement.
 *
 * Both work on the style and the classList of a html element, which is why they
 * sit here and not on Element - an svg element has neither in the same way.
 */





(0,_utils_ExtendPrototype__WEBPACK_IMPORTED_MODULE_0__["default"])(HTMLElement, _extentions_HtmlClassSupport__WEBPACK_IMPORTED_MODULE_1__["default"], _extentions_ShowHideSupport__WEBPACK_IMPORTED_MODULE_2__["default"]);

/***/ },

/***/ "./node_modules/@default-js/defaultjs-extdom/src/dom/HTMLInputElement.js"
/*!*******************************************************************************!*\
  !*** ./node_modules/@default-js/defaultjs-extdom/src/dom/HTMLInputElement.js ***!
  \*******************************************************************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _utils_ExtendPrototype__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../utils/ExtendPrototype */ "./node_modules/@default-js/defaultjs-extdom/src/utils/ExtendPrototype.js");
/* harmony import */ var _extentions_ValueSupport__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./extentions/ValueSupport */ "./node_modules/@default-js/defaultjs-extdom/src/dom/extentions/ValueSupport.js");
/**
 * Adds val() to HTMLInputElement.
 *
 * ValueSupport picks the handling by the type of the input, so a checkbox and a
 * radio are read by their checked state while every other input is read by its
 * value.
 */




(0,_utils_ExtendPrototype__WEBPACK_IMPORTED_MODULE_0__["default"])(HTMLInputElement,_extentions_ValueSupport__WEBPACK_IMPORTED_MODULE_1__["default"]);

/***/ },

/***/ "./node_modules/@default-js/defaultjs-extdom/src/dom/HTMLSelectElement.js"
/*!********************************************************************************!*\
  !*** ./node_modules/@default-js/defaultjs-extdom/src/dom/HTMLSelectElement.js ***!
  \********************************************************************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _utils_ExtendPrototype__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../utils/ExtendPrototype */ "./node_modules/@default-js/defaultjs-extdom/src/utils/ExtendPrototype.js");
/* harmony import */ var _extentions_ValueSupport__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./extentions/ValueSupport */ "./node_modules/@default-js/defaultjs-extdom/src/dom/extentions/ValueSupport.js");
/**
 * Adds val() to HTMLSelectElement.
 *
 * ValueSupport reads a select by its selected options, so val() gives an array of
 * their values and takes one to select them again.
 */




(0,_utils_ExtendPrototype__WEBPACK_IMPORTED_MODULE_0__["default"])(HTMLSelectElement,_extentions_ValueSupport__WEBPACK_IMPORTED_MODULE_1__["default"]);

/***/ },

/***/ "./node_modules/@default-js/defaultjs-extdom/src/dom/HTMLTextAreaElement.js"
/*!**********************************************************************************!*\
  !*** ./node_modules/@default-js/defaultjs-extdom/src/dom/HTMLTextAreaElement.js ***!
  \**********************************************************************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _utils_ExtendPrototype__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../utils/ExtendPrototype */ "./node_modules/@default-js/defaultjs-extdom/src/utils/ExtendPrototype.js");
/* harmony import */ var _extentions_ValueSupport__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./extentions/ValueSupport */ "./node_modules/@default-js/defaultjs-extdom/src/dom/extentions/ValueSupport.js");
/**
 * Adds val() to HTMLTextAreaElement.
 *
 * A textarea matches none of the special input types, so ValueSupport falls back
 * to reading and writing its value - and triggers an input event when it is set,
 * the same as any other field.
 */




(0,_utils_ExtendPrototype__WEBPACK_IMPORTED_MODULE_0__["default"])(HTMLTextAreaElement, _extentions_ValueSupport__WEBPACK_IMPORTED_MODULE_1__["default"]);


/***/ },

/***/ "./node_modules/@default-js/defaultjs-extdom/src/dom/HtmlCollection.js"
/*!*****************************************************************************!*\
  !*** ./node_modules/@default-js/defaultjs-extdom/src/dom/HtmlCollection.js ***!
  \*****************************************************************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _extentions_ListTypeBuilder__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./extentions/ListTypeBuilder */ "./node_modules/@default-js/defaultjs-extdom/src/dom/extentions/ListTypeBuilder.js");
/**
 * Builds HTMLCollection as a list of html elements.
 *
 * Same as NodeList, only holding html elements - a live collection like children
 * therefore keeps its type when it is filtered.
 */


(0,_extentions_ListTypeBuilder__WEBPACK_IMPORTED_MODULE_0__["default"])(HTMLCollection, HTMLElement);


/***/ },

/***/ "./node_modules/@default-js/defaultjs-extdom/src/dom/Node.js"
/*!*******************************************************************!*\
  !*** ./node_modules/@default-js/defaultjs-extdom/src/dom/Node.js ***!
  \*******************************************************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _utils_ExtendPrototype__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../utils/ExtendPrototype */ "./node_modules/@default-js/defaultjs-extdom/src/utils/ExtendPrototype.js");
/* harmony import */ var _extentions_DataSupport__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./extentions/DataSupport */ "./node_modules/@default-js/defaultjs-extdom/src/dom/extentions/DataSupport.js");
/* harmony import */ var _extentions_ManipulationSupport__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./extentions/ManipulationSupport */ "./node_modules/@default-js/defaultjs-extdom/src/dom/extentions/ManipulationSupport.js");
/**
 * Adds data and content functions to Node.
 *
 * Node is the common base of elements, text nodes and fragments, so data() and
 * the insert functions work on all of them, not only on elements.
 */




(0,_utils_ExtendPrototype__WEBPACK_IMPORTED_MODULE_0__["default"])(Node,_extentions_DataSupport__WEBPACK_IMPORTED_MODULE_1__["default"],_extentions_ManipulationSupport__WEBPACK_IMPORTED_MODULE_2__["default"]);

/***/ },

/***/ "./node_modules/@default-js/defaultjs-extdom/src/dom/NodeList.js"
/*!***********************************************************************!*\
  !*** ./node_modules/@default-js/defaultjs-extdom/src/dom/NodeList.js ***!
  \***********************************************************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _extentions_ListTypeBuilder__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./extentions/ListTypeBuilder */ "./node_modules/@default-js/defaultjs-extdom/src/dom/extentions/ListTypeBuilder.js");
/**
 * Builds NodeList as a list of nodes.
 *
 * Besides the list functions this gives a NodeList every function of a node, by
 * delegation - calling one applies it to each node and collects the results.
 */


(0,_extentions_ListTypeBuilder__WEBPACK_IMPORTED_MODULE_0__["default"])(NodeList, Node);


/***/ },

/***/ "./node_modules/@default-js/defaultjs-extdom/src/dom/extentions/AttributeSupport.js"
/*!******************************************************************************************!*\
  !*** ./node_modules/@default-js/defaultjs-extdom/src/dom/extentions/AttributeSupport.js ***!
  \******************************************************************************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _utils_Extender__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../utils/Extender */ "./node_modules/@default-js/defaultjs-extdom/src/utils/Extender.js");


const support = (0,_utils_Extender__WEBPACK_IMPORTED_MODULE_0__["default"])("AttributeSupport", (Prototype) => {
	/**
	 * Gets or sets attributes of this element.
	 *
	 * attr() returns all attributes as an object, attr(name) the value of a single
	 * one. With a second argument the attribute is set, with null or undefined it
	 * gets removed.
	 *
	 * Values are stringified by setAttribute, so attr(name, 0) sets "0". Only null
	 * and undefined remove an attribute - 0, false and "" are regular values.
	 *
	 * @param {string} [aName] - the attribute name
	 * @param {*} [aValue] - the new value, null or undefined removes the attribute
	 * @returns {Object<string,string>|string|Element} all attributes, the value of the requested attribute (null when it does not exist), or this when an attribute was set or removed
	 */
	Prototype.attr = function () {
		if (arguments.length == 0) {
			const result = {};
			this.getAttributeNames().forEach((name) => {
				result[name] = this.getAttribute(name);
			});
			return result;
		} else if (arguments.length == 1) return this.getAttribute(arguments[0]);
		else if (arguments[1] == null) this.removeAttribute(arguments[0]);
		else this.setAttribute(arguments[0], arguments[1]);

		return this;
	};
});
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (support);


/***/ },

/***/ "./node_modules/@default-js/defaultjs-extdom/src/dom/extentions/DataSupport.js"
/*!*************************************************************************************!*\
  !*** ./node_modules/@default-js/defaultjs-extdom/src/dom/extentions/DataSupport.js ***!
  \*************************************************************************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _utils_Extender__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../utils/Extender */ "./node_modules/@default-js/defaultjs-extdom/src/utils/Extender.js");

const support = (0,_utils_Extender__WEBPACK_IMPORTED_MODULE_0__["default"])("DataSupport", Prototype => {

	/**
	 * Reads all data- attributes of a node into a plain object.
	 *
	 * @param {Node} element
	 * @returns {Object<string,string>} the dataset of the node, empty when it has none
	 */
	const loadData = (element) => {
		const data = {};
		if (typeof element.dataset !== "undefined")
			for (const name in element.dataset)
				data[name] = element.dataset[name];
		return data;
	}

	/**
	 * Gets or sets the data of this node.
	 *
	 * The first call reads the data- attributes into a cache, which is kept on the
	 * node from then on. That cache is detached from the dom: later attribute
	 * changes are not seen and written values are not reflected back. data(true)
	 * reads the attributes again.
	 *
	 * Reloading merges, it does not sync - a value removed from the dom stays in
	 * the cache, as it can not be told apart from a value that never came from the
	 * dom.
	 *
	 * @param {string|boolean} [aName] - a name to read or write, or a boolean to read all data, reloading the attributes first when true
	 * @param {*} [aValue] - the new value, null or undefined removes the name
	 * @returns {Object<string,*>|*|Node} all data, the value of the given name, or this when a value was written
	 * @throws {Error} when the first argument is neither a string nor a boolean
	 */
	Prototype.data = function() {
		const data = loadData(this);
		this.data = (function() {
			if (arguments.length == 0)
				return data;
			const arg1 = arguments[0];
			const type = typeof arg1;
			if(type === "boolean"){
				if(arg1)
					Object.assign(data, loadData(this));
				return data;
			}

			if(type !== "string")
				throw new Error("data() expects a string or boolean as first argument or no arguments at all");
			
			if (arguments.length == 1)
				return data[arg1];
			else if (arguments[1] == null)
				delete data[arguments[0]];
			else
				data[arguments[0]] = arguments[1];

			return this;
		}).bind(this);

		return this.data.apply(null, arguments);
	};
});
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (support);

/***/ },

/***/ "./node_modules/@default-js/defaultjs-extdom/src/dom/extentions/EventSupport.js"
/*!**************************************************************************************!*\
  !*** ./node_modules/@default-js/defaultjs-extdom/src/dom/extentions/EventSupport.js ***!
  \**************************************************************************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _utils_Extender__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../utils/Extender */ "./node_modules/@default-js/defaultjs-extdom/src/utils/Extender.js");


const EVENTSPLITER = /\s*,\s*|\s+/;
const DEFAULT_OPTIONS = { capture: false, once: false, passive: false, signal: undefined };

/**
 * Everything this extension keeps per element. A WeakMap holds it outside of the
 * element, so nothing is exposed on the dom and it is released with the element.
 *
 * Wrappers and handles are mapped in both directions: a wrapper needs to find its
 * registration while an event runs, and removeOn needs to find all wrappers of a
 * handle. Handles are mapped to a set of wrappers, not to a single one, so the
 * same handle can be registered any number of times without the registrations
 * overwriting each other.
 *
 * @typedef {Object} ElementData
 * @property {Map<string,number>} eventTriggerTimeouts - running trigger timeouts by event type
 * @property {Map<Function,Registration>} wrapperHandleMap - registration of each wrapper
 * @property {Map<Function,Set<Function>>} handleWrapperMap - all wrappers of a handle
 */

/**
 * One call of on().
 *
 * @typedef {Object} Registration
 * @property {Function} handle - the function given to on()
 * @property {Set<string>} events - the event types still registered, listeners get removed one by one
 * @property {Object} options - the options the listener was added with, needed to remove it again
 */

const ELEMENTDATA = new WeakMap();

/**
 * @param {EventTarget} element
 * @returns {ElementData} the data of the element, created on first access
 */
const getElementData = (element) => {
	if (!ELEMENTDATA.has(element))
		ELEMENTDATA.set(element, {
			eventTriggerTimeouts: new Map(),
			wrapperHandleMap: new Map(),
			handleWrapperMap: new Map()
		});

	return ELEMENTDATA.get(element);
};

const getWrapperHandleMap = (element) => {
	return getElementData(element).wrapperHandleMap;
};

const getHandleWrapperMap = (element) => {
	return getElementData(element).handleWrapperMap;
};

const getTriggerTimeouts = (element) => {
	return getElementData(element).eventTriggerTimeouts;
};

/**
 * Registers a wrapper in both directions.
 *
 * @param {EventTarget} anElement
 * @param {Function} aHandle - the function given to on()
 * @param {Function} aWrapper - the listener actually added to the element
 * @param {Iterable<string>} theEvents
 * @param {Object} theOptions - kept to remove the listener with the same options later
 * @throws {Error} when the wrapper is already registered, which can not happen as long as on() creates a new one per call
 */
const registrateHandleWrapper = (anElement, aHandle, aWrapper, theEvents, theOptions) => {
	const wrapperHandleMap = getWrapperHandleMap(anElement);
	if (!wrapperHandleMap.has(aWrapper)) wrapperHandleMap.set(aWrapper, { handle: aHandle, events: new Set(theEvents), options: theOptions });
	else throw new Error("Wrapper already registered for this element!");

	const handleWrapperMap = getHandleWrapperMap(anElement);
	let wrapperSet = handleWrapperMap.get(aHandle);
	if (!wrapperSet) {
		wrapperSet = new Set();
		handleWrapperMap.set(aHandle, wrapperSet);
	}	
	wrapperSet.add(aWrapper);	
};

/**
 * Removes a wrapper from some or all of its events.
 *
 * The registration is dropped from both maps as soon as no event is left, so a
 * wrapper that still listens to other events stays known.
 *
 * @param {EventTarget} aElement
 * @param {Function} aWrapper
 * @param {Iterable<string>} [theEvents] - the events to remove, all of them when omitted
 */
const removeWrapper = (aElement, aWrapper, theEvents) => {
	const wrapperHandleMap = getWrapperHandleMap(aElement);
	if(!wrapperHandleMap.has(aWrapper)) throw new Error("Wrapper not registered for this element!");
	const { events, options, handle } = wrapperHandleMap.get(aWrapper);
	const removedEvents = theEvents || events;
	for (let event of removedEvents) {
		if (events.has(event)) {
			events.delete(event);
			aElement.removeEventListener(event, aWrapper, options);
		}
	}
	//Cleanup the wrapperHandleMap and handleWrapperMap if no events left for this wrapper
	if (events.size === 0){
		wrapperHandleMap.delete(aWrapper);
		const handleWrapperMap = getHandleWrapperMap(aElement);
		const wrapperSet = handleWrapperMap.get(handle);
		wrapperSet.delete(aWrapper);
		if (wrapperSet.size === 0)
			handleWrapperMap.delete(handle);
	}
};

/**
 * @param {boolean|Object} [options] - a boolean is taken as capture, an object is merged into the defaults
 * @returns {Object} always a new object, never the shared defaults
 */
const toEventOptions = (options) => {
	if (options == null) return Object.assign({}, DEFAULT_OPTIONS);
	else if (typeof options === "boolean") return Object.assign({}, DEFAULT_OPTIONS, { capture: options });
	else return Object.assign({}, DEFAULT_OPTIONS, options);
};

/**
 * Normalizes event types to a flat list.
 *
 * Types are separated by whitespaces, commas or both, in a string as well as
 * within the entries of an array - so ["click", "focus blur"] gives three types.
 *
 * A string gets trimmed before it is split, because the empty entries a leading
 * or trailing separator produces are artifacts of splitting, not something the
 * caller asked for. An empty entry inside an array is the opposite case: it was
 * written down and therefore throws.
 *
 * @param {string|Iterable<string>} theEvents
 * @returns {string[]} the event types, never empty
 * @throws {Error} when no type is left or an entry is not a non empty string
 */
const toEventTypes = (theEvents) => {
	if(theEvents == null) throw new Error("Event types are required!");	
	
	const events = typeof theEvents === "string" ? theEvents.trim().split(EVENTSPLITER) : theEvents;
	if (typeof events[Symbol.iterator] !== "function") throw new Error("Invalid event types!");
	if(events.length === 0) throw new Error("Event types are required!");

	const result = [];

	for (let event of events) {
		if (typeof event !== "string") throw new Error("Invalid event types!");
		event = event.trim();
		if (event.length === 0) throw new Error("Invalid event types!");
		result.push(...event.split(EVENTSPLITER));
	}
	return result;
};

const support = (0,_utils_Extender__WEBPACK_IMPORTED_MODULE_0__["default"])("EventSupport", (Prototype) => {
	/**
	 * Adds a handle to one or more events.
	 *
	 * The handle is not added as listener itself, it gets wrapped. That wrapper
	 * applies the selector and handles the once option, which keeps removeOn able
	 * to find every registration of a handle.
	 *
	 * With a selector the handle is only called when the target of the event
	 * matches it. Together with once this needs care: the browser consumes a once
	 * listener on the first event, even when the selector did not match, so the
	 * wrapper registers itself again in that case and waits for a matching event.
	 *
	 * @param {string|Iterable<string>} theEvents - event types, separated by whitespaces or commas
	 * @param {string} [aSelector] - only call the handle when the target of the event matches
	 * @param {Function} aHandle - called with the event
	 * @param {boolean|Object} [theOptions] - a boolean is taken as capture, otherwise the options of addEventListener
	 * @returns {EventTarget} this
	 * @throws {Error} by less than two arguments or invalid event types
	 */
	Prototype.on = function () {
		if (arguments.length < 2) throw new Error("Too less arguments!");

		const args = Array.from(arguments);
		const events = toEventTypes(args.shift());
		const elementSelector = typeof args[0] === "string" ? args.shift() : null;
		const handle = args.shift();
		const option = toEventOptions(args.shift());
		const element = this;
		const wrapper = function(event) {
			const { target, type } = event;
			if (elementSelector && typeof target.is === "function" && !target.is(elementSelector)) {
				if (option.once) element.addEventListener(type, wrapper, option); // re-register the wrapper for the next event
				return;
			} else {
				if (option.once) removeWrapper(element, wrapper, [type]);
				const result = handle.apply(null, arguments);				
				return result;
			}
		};

		registrateHandleWrapper(this, handle, wrapper, events, option);

		for (let event of events) {
			this.addEventListener(event, wrapper, option);
		}

		return this;
	};

	/**
	 * Removes a handle from some or all of its events.
	 *
	 * A handle registered by several calls of on() is removed from all of them.
	 *
	 * @param {Function} aHandle - the function given to on()
	 * @param {string|Iterable<string>} [theEvents] - the events to remove, all of them when omitted
	 * @returns {EventTarget} this
	 * @throws {Error} by invalid event types
	 */
	Prototype.removeOn = function (aHandle, theEvents) {
		const events = theEvents ? toEventTypes(theEvents) : null;
		const handleWrapperMap = getHandleWrapperMap(this);
		const wrapperSet = handleWrapperMap.get(aHandle);	
		if (wrapperSet) {
			for (let wrapper of wrapperSet)
				removeWrapper(this, wrapper, events);
		}

		return this;
	};

	/**
	 * Dispatches a bubbling, cancelable and composed CustomEvent.
	 *
	 * A leading number delays the event by that many milliseconds and replaces a
	 * delayed event of the same type that is still pending, so a repeatedly
	 * triggered event is dispatched once after things came to rest.
	 *
	 * One data argument becomes event.detail as it is, several become an array of
	 * them. A leading Event is taken as the event this one is delegated from and
	 * is available as event.delegatedEvent.
	 *
	 * @param {number} [aTimeout] - milliseconds to delay the event
	 * @param {string} aType - the event type
	 * @param {Event} [aDelegatedEvent] - the event this one is triggered for
	 * @param {...*} [theData] - becomes event.detail
	 * @returns {EventTarget} this
	 */
	Prototype.trigger = function () {
		const args = Array.from(arguments);
		const timeout = typeof args[0] === "number" ? args.shift() : -1;
		if (timeout >= 0) {
			const type = args[0];
			const timeouts = getTriggerTimeouts(this);
			const timeoutid = timeouts.get(type);
			if (timeoutid) clearTimeout(timeoutid);

			timeouts.set(type, setTimeout(() => {
				timeouts.delete(type);
				this.trigger.apply(this, args);
			}, timeout));
		} else {
			const type = args.shift();
			const delegate = args[0] instanceof Event ? args.shift() : null;
			const data = args.length >= 1 ? (args.length == 1 ? args.shift() : args) : delegate;
			const event = new CustomEvent(type, { bubbles: true, cancelable: true, composed: true, detail: data });

			if (delegate) event.delegatedEvent = delegate;
			this.dispatchEvent(event);
		}
		return this;
	};
});
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (support);


/***/ },

/***/ "./node_modules/@default-js/defaultjs-extdom/src/dom/extentions/HtmlClassSupport.js"
/*!******************************************************************************************!*\
  !*** ./node_modules/@default-js/defaultjs-extdom/src/dom/extentions/HtmlClassSupport.js ***!
  \******************************************************************************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _utils_Extender__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../utils/Extender */ "./node_modules/@default-js/defaultjs-extdom/src/utils/Extender.js");


const CLASSSPLITER = /\s+/;

/**
 * Normalizes class names to a flat list.
 *
 * Names are separated by whitespaces, in a string as well as within the entries
 * of an array - so ["a", "b c"] gives three names.
 *
 * A string gets trimmed before it is split, because the empty entries a leading
 * or trailing whitespace produces are artifacts of splitting. An empty entry
 * written down by the caller throws instead, as does anything that is not a
 * string - classList would only report those as an unusable token, or silently
 * take a boolean as a class named "true".
 *
 * @param {string|string[]} theClasses
 * @returns {Iterable<string>} the class names, never empty
 * @throws {Error} when no name is left or an entry is not a non empty string
 */
const toClassNames = (theClasses) => {
	if (theClasses == null) throw new Error("Class names are required!");

	const classes = typeof theClasses === "string" ? theClasses.trim().split(CLASSSPLITER) : theClasses;
	if (typeof classes[Symbol.iterator] !== "function") throw new Error("Invalid class names!");
	if (classes.length === 0) throw new Error("Class names are required!");

	const result = [];
	for (let clazz of classes) {
		if (typeof clazz !== "string") throw new Error("Invalid class names!");
		clazz = clazz.trim();
		if (clazz.length === 0) throw new Error("Invalid class names!");
		result.push(...clazz.split(CLASSSPLITER));
	}
	
	return result;
};

/**
 * Builds a class function, as add, remove and toggle only differ by the method
 * they call on the classList.
 *
 * @param {string} aName - the name of the classList method
 * @returns {function(...(string|string[])):Element} a function taking any mix of names, lists of names and arrays of both
 */
const classListFunction = (aName) =>
	function () {
		const classes = toClassNames(Array.from(arguments).flat());
		classes.forEach((clazz) => this.classList[aName](clazz));

		return this;
	};

const support = (0,_utils_Extender__WEBPACK_IMPORTED_MODULE_0__["default"])("HtmlClassSupport", (Prototype) => {
	/**
	 * Adds class names to this element.
	 *
	 * @param {...(string|string[])} theClasses - names, whitespace separated lists of names, or arrays of both
	 * @returns {Element} this
	 * @throws {Error} by invalid class names
	 */
	Prototype.addClass = classListFunction("add");

	/**
	 * Removes class names from this element. Names not present are ignored.
	 *
	 * @param {...(string|string[])} theClasses - names, whitespace separated lists of names, or arrays of both
	 * @returns {Element} this
	 * @throws {Error} by invalid class names
	 */
	Prototype.removeClass = classListFunction("remove");

	/**
	 * Toggles class names of this element, each one on its own.
	 *
	 * The force parameter of classList.toggle is not supported - a boolean is not
	 * a class name and therefore throws.
	 *
	 * @param {...(string|string[])} theClasses - names, whitespace separated lists of names, or arrays of both
	 * @returns {Element} this
	 * @throws {Error} by invalid class names
	 */
	Prototype.toggleClass = classListFunction("toggle");
});
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (support);

/***/ },

/***/ "./node_modules/@default-js/defaultjs-extdom/src/dom/extentions/ListSupport.js"
/*!*************************************************************************************!*\
  !*** ./node_modules/@default-js/defaultjs-extdom/src/dom/extentions/ListSupport.js ***!
  \*************************************************************************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _utils_Extender__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../utils/Extender */ "./node_modules/@default-js/defaultjs-extdom/src/utils/Extender.js");


/**
 * Builds a list function by delegating to the array function of the same name.
 *
 * The list is copied into an array first. That copy is what makes these functions
 * safe on a live HTMLCollection: nodes may be moved or removed while iterating,
 * without the iteration skipping the entries that shift into their place.
 *
 * @param {string} aName - the name of the array function
 * @returns {Function} a function behaving like the array function of that name
 */
const arrayFunction = (aName) =>
	function () {
		return Array.prototype[aName].apply(Array.from(this), arguments);
	};

const support = (0,_utils_Extender__WEBPACK_IMPORTED_MODULE_0__["default"])("ListSupport", (Prototype) => {
	/**
	 * @param {*} aNode - the node to look for
	 * @param {number} [aStart] - the index to start at
	 * @returns {number} the index of the node, or -1
	 */
	Prototype.indexOf = arrayFunction("indexOf");

	/**
	 * @param {*} aNode - the node to look for
	 * @param {number} [aStart] - the index to start at
	 * @returns {boolean} whether the list contains the node
	 */
	Prototype.includes = arrayFunction("includes");

	/**
	 * Calls the function for each node.
	 *
	 * @param {function(Node,number,Node[]):void} aFunction - called with node, index and the copied list
	 */
	Prototype.forEach = arrayFunction("forEach");

	/**
	 * @param {function(Node,number,Node[]):*} aFunction
	 * @returns {Array} the results, an array as the results are not nodes anymore
	 */
	Prototype.map = arrayFunction("map");

	/**
	 * @param {function(Node,number,Node[]):boolean} aFunction
	 * @returns {boolean} whether the function matches at least one node
	 */
	Prototype.some = arrayFunction("some");

	/**
	 * @param {function(Node,number,Node[]):boolean} aFunction
	 * @returns {boolean} whether the function matches every node
	 */
	Prototype.every = arrayFunction("every");

	/**
	 * @param {function(*,Node,number,Node[]):*} aFunction
	 * @param {*} [aInitialValue]
	 * @returns {*} the accumulated result
	 */
	Prototype.reduce = arrayFunction("reduce");

	/**
	 * Filters the list.
	 *
	 * Unlike map this keeps the type of the list - a NodeList returns a NodeList, a
	 * HTMLCollection returns a HTMLCollection - so a filtered list can be used like
	 * any other one. The result is a new list, it is not live anymore.
	 *
	 * @param {function(Node,number,Node[]):boolean} aFunction
	 * @returns {NodeList|HTMLCollection} the matching nodes
	 */
	Prototype.filter = function () {
		const result = Array.prototype.filter.apply(Array.from(this), arguments);

		return this.constructor.from(result);
	};

	/**
	 * @returns {Node|undefined} the first node, or undefined when the list is empty
	 */
	Prototype.first = function () {
		if (this.length > 0) return this[0];
	};

	/**
	 * @returns {Node|undefined} the last node, or undefined when the list is empty
	 */
	Prototype.last = function () {
		if (this.length > 0) return this[this.length - 1];
	};
});
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (support);

/***/ },

/***/ "./node_modules/@default-js/defaultjs-extdom/src/dom/extentions/ListTypeBuilder.js"
/*!*****************************************************************************************!*\
  !*** ./node_modules/@default-js/defaultjs-extdom/src/dom/extentions/ListTypeBuilder.js ***!
  \*****************************************************************************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _utils_ExtendPrototype__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../utils/ExtendPrototype */ "./node_modules/@default-js/defaultjs-extdom/src/utils/ExtendPrototype.js");
/* harmony import */ var _utils_DelegaterBuilder__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../utils/DelegaterBuilder */ "./node_modules/@default-js/defaultjs-extdom/src/utils/DelegaterBuilder.js");
/* harmony import */ var _ListSupport__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./ListSupport */ "./node_modules/@default-js/defaultjs-extdom/src/dom/extentions/ListSupport.js");




/**
 * Sets up a dom list type - NodeList or HTMLCollection - the same way.
 *
 * The two only differ by their own type and the element type they hold, so this
 * builds both from those two parameters: it applies ListSupport, adds applyTo,
 * val and the static from, and wires the delegation that lets a list forward
 * every method of its elements.
 *
 * @param {Function} ListType - the list type, NodeList or HTMLCollection
 * @param {Function} ElementType - the type of the items, Node or HTMLElement
 */
const buildListType = (ListType, ElementType) => {
	(0,_utils_ExtendPrototype__WEBPACK_IMPORTED_MODULE_0__["default"])(ListType, _ListSupport__WEBPACK_IMPORTED_MODULE_2__["default"]);

	/**
	 * Applies a function or a method to each item and collects the results.
	 *
	 * A function is called with the item followed by the extra arguments. A string
	 * is taken as the name of a method to call on each item with those arguments.
	 * Null results are skipped.
	 *
	 * @param {Function|string} calling - a function to call, or the name of a method
	 * @param {...*} theArguments - passed to the function or method
	 * @returns {Array} the collected results
	 */
	ListType.prototype.applyTo = function () {
		const args = Array.from(arguments);
		const calling = args.shift();
		const isFunction = typeof calling === "function";
		const results = [];
		for (let i = 0; i < this.length; i++) {
			const node = this[i];
			let result;
			if (isFunction) result = calling.apply(null, [node].concat(args));
			else if (typeof node[calling] === "function") result = node[calling].apply(node, args);

			if (result != null) results.push(result);
		}

		return results;
	};

	/**
	 * Reads or writes the value of the items.
	 *
	 * Without arguments the values are collected into a Map, keyed by the name, id
	 * or selector of each item - items without a value are left out, so an unchecked
	 * radio does not overwrite the selected one of its group. With arguments the
	 * value is set on every item.
	 *
	 * @param {...*} [theValue] - the value to set on the items
	 * @returns {Map<string,*>|ListType} the values by key, or this when a value was set
	 */
	ListType.prototype.val = function () {
		if (arguments.length == 0) {
			const result = new Map();
			for (const node of this) {
				if (typeof node.val === "function") {
					const value = node.val();
					if (value != null) result.set(node.name || node.id || node.selector(), value);
				}
			}
			return result;
		} else this.applyTo("val", ...arguments);

		return this;
	};

	/**
	 * Builds a list from nodes, other lists and arrays of them.
	 *
	 * Every argument that is an item is taken, an iterable is read item by item, so
	 * any mix can be passed. Anything that is not an item is left out. The result is
	 * a plain list, not a live one.
	 *
	 * @param {...(ElementType|Iterable)} theItems
	 * @returns {ListType} a new list of the items
	 */
	ListType.from = function () {
		const args = Array.from(arguments);
		const data = {};
		let counter = 0;

		while (args.length > 0) {
			const arg = args.shift();
			if (arg != null) {
				if (arg instanceof ElementType) data[counter++] = { value: arg, enumerable: true };
				else if (typeof arg[Symbol.iterator] === "function") {
					for (let item of arg) {
						if (item instanceof ElementType) data[counter++] = { value: item, enumerable: true };
					}
				}
			}
		}

		data.length = { value: counter };
		return Object.create(ListType.prototype, data);
	};

	(0,_utils_DelegaterBuilder__WEBPACK_IMPORTED_MODULE_1__["default"])(
		function (aFunctionName, theArguments) {
			let results = [];
			this.forEach((node) => {
				if (node && typeof node[aFunctionName] === "function") {
					const result = node[aFunctionName].apply(node, theArguments);
					if (result != null) {
						if (result instanceof ListType) results = results.concat(Array.from(result));
						else results.push(result);
					}
				}
			});

			if (results.length === 0) return undefined;
			else if (results[0] instanceof ElementType || results[0] instanceof ListType) return ListType.from(results);
			else return results;
		},
		ListType.prototype,
		Node.prototype,
		HTMLElement.prototype,
		HTMLInputElement.prototype,
		Element.prototype,
		EventTarget.prototype,
	);
};

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (buildListType);


/***/ },

/***/ "./node_modules/@default-js/defaultjs-extdom/src/dom/extentions/ManipulationSupport.js"
/*!*********************************************************************************************!*\
  !*** ./node_modules/@default-js/defaultjs-extdom/src/dom/extentions/ManipulationSupport.js ***!
  \*********************************************************************************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _utils_Extender__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../utils/Extender */ "./node_modules/@default-js/defaultjs-extdom/src/utils/Extender.js");


/**
 * Content accepted by the insert functions.
 *
 * @typedef {Node|NodeList|HTMLCollection|Content[]|string} Content
 */

/**
 * Normalizes content to a flat list of nodes.
 *
 * Strings are parsed to nodes by the global create(), lists and arrays are taken
 * item by item, so any mix of them can be passed. Lists are read into an array
 * before anything is inserted, because inserting a node removes it from the list
 * it came from - iterating that list while inserting would skip every other node.
 *
 * Strings are not trimmed and an empty one is accepted: unlike event types or
 * class names, whitespace is content. "   " becomes a text node, "" becomes no
 * node at all. Only the absence of any argument is an error.
 *
 * @param {...Content} theContent
 * @returns {Node[]} the nodes, empty when the content produced none
 * @throws {Error} when there is no content at all or an item is not content
 */
const toNodes = function () {
	const content = Array.from(arguments).flat(Infinity);
	if (content.length === 0) throw new Error("Content is required!");

	return content
		.map((item) => {
			if (item instanceof Node) return item;
			if (item instanceof NodeList || item instanceof HTMLCollection) return Array.from(item);
			if (typeof item === "string") return Array.from(create(item));

			throw new Error("Invalid content!");
		})
		.flat();
};

const support = (0,_utils_Extender__WEBPACK_IMPORTED_MODULE_0__["default"])("ManipulationSupport", Prototype => {
	/**
	 * Removes all child nodes.
	 *
	 * @returns {Node} this
	 */
	Prototype.empty = function(){
		const nodes = this.childNodes;
		while(nodes.length != 0)			
			nodes[0].remove(true);
		
		return this;
	};
	
	/**
	 * @returns {NodeList} the live list of child nodes
	 */
	Prototype.content = function(){
		return this.childNodes;
	};	
	
	/**
	 * Gets or sets the markup of this node.
	 *
	 * html() returns the innerHTML, html(true) the outerHTML and html(false) the
	 * innerHTML. Any other argument replaces all children by the given content.
	 *
	 * @param {...(boolean|Content)} theContent - null or undefined throws
	 * @returns {string|Node} the markup, or this when content was set
	 */
	Prototype.html = function(){
		if(arguments.length == 0)
			return this.innerHTML;
		else if(arguments.length == 1 && typeof arguments[0] === "boolean")
			if(arguments[0])
				return this.outerHTML;
			else
				return this.innerHTML;
		else {
			const nodes = toNodes(Array.from(arguments));
			this.empty();
			nodes.forEach(node => this.appendChild(node));
		}

		return this;
	};
	
	/**
	 * Appends the content as last children.
	 *
	 * @param {...Content} theContent
	 * @returns {Node} this
	 * @throws {Error} by invalid content
	 */
	Prototype.append = function(){
		toNodes(Array.from(arguments)).forEach(node => this.appendChild(node));

		return this;
	};

	/**
	 * Inserts the content as first children.
	 *
	 * @param {...Content} theContent
	 * @returns {Node} this
	 * @throws {Error} by invalid content
	 */
	Prototype.prepend = function(){
		const nodes = toNodes(Array.from(arguments));
		const first = this.firstChild;
		nodes.forEach(node => this.insertBefore(node, first));

		return this;
	};

	/**
	 * Replaces a node by the given content.
	 *
	 * Called with one argument, this node is replaced within its parent node.
	 * Called with more, the first one - a child of this node - is replaced by the
	 * content following it.
	 *
	 * @param {...Content} theContent - the new content, or the old node followed by the new content
	 * @returns {Node} this, even when this node was the replaced one
	 * @throws {Error} when called without arguments or by invalid content
	 */
	Prototype.replace = function(){
		if(arguments.length < 1)
			throw new Error("Insufficient arguments! One or two nodes required!");

		const parent = arguments.length == 1 ? this.parentNode : this;
		const oldNode = arguments.length == 1 ? this : arguments[0];
		const nodes = toNodes(arguments.length == 1 ? arguments[0] : Array.from(arguments).slice(1));

		nodes.forEach(node => parent.insertBefore(node, oldNode));
		oldNode.remove();

		return this;
	};

	/**
	 * Inserts the content directly after this node.
	 *
	 * @param {...Content} theContent
	 * @returns {Node} this
	 * @throws {Error} when this node has no parent node or by invalid content
	 */
	Prototype.after = function(){
		if(this.parentNode == null)
			throw new Error("Can't insert nodes after this node! Parent node not available!");

		const parent = this.parentNode;
		const next = this.nextSibling;
		toNodes(Array.from(arguments)).forEach(node => parent.insertBefore(node, next));

		return this;
	};

	/**
	 * Inserts the content directly before this node.
	 *
	 * @param {...Content} theContent
	 * @returns {Node} this
	 * @throws {Error} when this node has no parent node or by invalid content
	 */
	Prototype.before = function(){
		if(this.parentNode == null)
			throw new Error("Can't insert nodes before this node! Parent node not available!");

		const parent = this.parentNode;
		toNodes(Array.from(arguments)).forEach(node => parent.insertBefore(node, this));

		return this;
	};
});
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (support);

/***/ },

/***/ "./node_modules/@default-js/defaultjs-extdom/src/dom/extentions/QuerySupport.js"
/*!**************************************************************************************!*\
  !*** ./node_modules/@default-js/defaultjs-extdom/src/dom/extentions/QuerySupport.js ***!
  \**************************************************************************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _utils_Extender__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../utils/Extender */ "./node_modules/@default-js/defaultjs-extdom/src/utils/Extender.js");


const PARENTTOKEN = ":parent";
const QUOTES = ["\"", "'"];

/**
 * Strips the optional quotes around a sub selector.
 *
 * Quoting is not needed anymore, as the selector is read by counting brackets
 * instead of matching a pattern, but it stays supported.
 *
 * @param {string} subquery
 * @returns {string} the sub selector, empty when there is none
 */
const cleanupSubSelector = (subquery) => {
	if (typeof subquery !== "string") return "";
	subquery = subquery.trim();
	if ((subquery.startsWith('"') && subquery.endsWith('"')) || (subquery.startsWith("'") && subquery.endsWith("'"))) subquery = subquery.substring(1, subquery.length - 1);
	return subquery.trim();
};

/**
 * Finds the :parent token of a selector.
 *
 * Only a token on bracket level zero and outside of quotes counts, so neither
 * [data=":parent"] nor :not(:parent) is taken for one.
 *
 * @param {string} aSelector
 * @returns {number} the index of the token, or -1
 */
const indexOfParentToken = (aSelector) => {
	let quote = null;
	let depth = 0;
	for (let i = 0; i < aSelector.length; i++) {
		const char = aSelector[i];
		if (quote) {
			if (char === quote && aSelector[i - 1] !== "\\") quote = null;
		} else if (QUOTES.includes(char)) quote = char;
		else if (char === "(") depth++;
		else if (char === ")") depth--;
		else if (depth === 0 && aSelector.startsWith(PARENTTOKEN, i)) return i;
	}

	return -1;
};

/**
 * Reads a bracket group by counting brackets, so a nested group like
 * div:has(p):not(span) is read as a whole.
 *
 * @param {string} aSelector
 * @param {number} aStart - the index of the opening bracket
 * @returns {{content: string, end: number}} the content of the group and the index behind it
 * @throws {Error} when the group is not closed
 */
const readGroup = (aSelector, aStart) => {
	let quote = null;
	let depth = 0;
	for (let i = aStart; i < aSelector.length; i++) {
		const char = aSelector[i];
		if (quote) {
			if (char === quote && aSelector[i - 1] !== "\\") quote = null;
		} else if (QUOTES.includes(char)) quote = char;
		else if (char === "(") depth++;
		else if (char === ")" && --depth === 0) return { content: aSelector.substring(aStart + 1, i), end: i + 1 };
	}

	throw new Error("Invalid query!");
};

/**
 * Splits a selector at its :parent token.
 *
 * @param {string} aSelector
 * @returns {{prefix: string, selector: string, suffix: string}|null} the parts, or null when there is no token
 * @throws {Error} when the bracket group of the token is not closed
 */
const splitParentQuery = (aSelector) => {
	const index = indexOfParentToken(aSelector);
	if (index < 0) return null;

	const after = index + PARENTTOKEN.length;
	const group = aSelector[after] === "(" ? readGroup(aSelector, after) : { content: "", end: after };

	return {
		prefix: aSelector.substring(0, index).trim(),
		selector: cleanupSubSelector(group.content),
		suffix: aSelector.substring(group.end).trim()
	};
};

/**
 * Executes a selector, resolving the :parent pseudo selector.
 *
 * :parent returns the parent of the element, :parent(selector) the next ancestor
 * matching the selector. Everything before the token selects the elements to
 * start from, everything behind it is searched within the parents found.
 *
 * @param {HTMLElement} aElement
 * @param {string} aSelector
 * @returns {NodeList|undefined} the result, undefined when a step found nothing
 */
const queryExecuter = function (aElement, aSelector) {
	const query = splitParentQuery(aSelector);
	if (!query) return aElement.querySelectorAll(aSelector);

	let result = aElement;
	if (query.prefix.length > 0) {
		result = aElement.querySelectorAll(query.prefix);
		if (result.length == 0) return;
	}

	result = result.parent(query.selector.length > 0 ? query.selector : null);
	if (!result) return;

	return query.suffix.length > 0 ? result.find(query.suffix) : result;
};

/**
 * Normalizes selectors to a list of non empty strings.
 *
 * Empty selectors are skipped rather than thrown at, other than in the sibling
 * functions for event types and class names: an empty selector carries no intent
 * and just contributes nothing, while a non string is a mistake and throws.
 * Selectors are not split, comma separated lists are left for querySelectorAll.
 *
 * @param {string|Iterable<string>} theSelectors
 * @returns {string[]} the trimmed selectors, empty ones removed
 * @throws {Error} when there is no selector or one is not a string
 */
const toSelector = function (theSelectors) {
	if(theSelectors == null) throw new Error("Invalid query!");

	const selectors = typeof theSelectors === "string" ? [theSelectors] : Array.from(theSelectors);

	return selectors
		.map((selector) => {
				if(typeof selector !== "string") throw new Error("Invalid query!");
				return selector.trim();
			})
		.filter((selector) => selector.length > 0);
}


const support = (0,_utils_Extender__WEBPACK_IMPORTED_MODULE_0__["default"])("QuerySupport", (Prototype) => {
	/**
	 * Searches nodes by one or more selectors.
	 *
	 * Selector lists separated by comma are left to querySelectorAll, which knows
	 * them and gets the commas inside brackets and quotes right. The results of
	 * several selectors are collected in the order they were given, without
	 * removing the nodes a second selector finds again.
	 *
	 * @param {...string} theSelectors - selectors, empty ones are skipped
	 * @returns {NodeList} the nodes found, empty when there are none
	 * @throws {Error} by a selector beside a string
	 */
	Prototype.find = function () {
		const nodes = [];
		const selectors = toSelector(arguments);
		for(let selector of selectors){
			const result = queryExecuter(this, selector);
			if (result) nodes.push(result);
		}

		return NodeList.from(...nodes);
	};

	/**
	 * Checks whether this node matches at least one of the selectors.
	 *
	 * A Document and a DocumentFragment never match, as they can not be selected -
	 * that also covers a ShadowRoot, which is a DocumentFragment.
	 *
	 * @param {...(string|string[])} theSelectors - selectors, given one by one or as a list
	 * @returns {boolean} whether one of the selectors matches
	 * @throws {DOMException} by an invalid selector
	 */
	Prototype.is = function () {
		if (this instanceof Document || this instanceof DocumentFragment) return false;
		else if (arguments.length == 1) {
			if (typeof arguments[0] === "string") return this.matches(arguments[0]);
			else if (typeof arguments[0].length === "number") {
				let filter = arguments[0];
				for (let i = 0; i < filter.length; i++) if (this.matches(filter[i])) return true;
			}
		} else if (arguments.length > 1) return this.is(Array.from(arguments));

		return false;
	};

	/**
	 * Returns the parent of this node, or the next ancestor matching a selector.
	 *
	 * An invalid selector is not caught: it would return the parent reached so far,
	 * which is indistinguishable from a match, while a selector matching nothing
	 * correctly returns null. Letting it throw keeps those two apart.
	 *
	 * @param {string|boolean} [selector] - a selector to look for, or the ignoreShadowRoot flag
	 * @param {boolean} [ignoreShadowRoot] - continue at the host of a shadow root instead of stopping
	 * @returns {Node|null} the parent, the matching ancestor, or null when there is none
	 * @throws {DOMException} by an invalid selector
	 */
	Prototype.parent = function (selector, ignoreShadowRoot) {
		if (!this.parentNode) return null;
		ignoreShadowRoot = typeof selector === "boolean" ? selector : ignoreShadowRoot;
		selector = typeof selector === "string" ? selector : null;

		let parent = this.parentNode;
		if (parent instanceof ShadowRoot && ignoreShadowRoot) parent = parent.host;

		if (selector) return parent.is(selector) ? parent : parent.parent(selector, ignoreShadowRoot);

		return parent;
	};

	/**
	 * Collects the ancestors of this node, from the nearest one upwards.
	 *
	 * With a selector only the matching ancestors are collected, as every step
	 * walks up to the next match.
	 *
	 * @param {string|boolean} [selector] - a selector to look for, or the ignoreShadowRoot flag
	 * @param {boolean} [ignoreShadowRoot] - continue at the host of a shadow root instead of stopping
	 * @returns {NodeList} the ancestors, empty when there are none
	 * @throws {DOMException} by an invalid selector
	 */
	Prototype.parents = function () {
		const result = new Array();
		let parent = Prototype.parent.apply(this, arguments);
		while (parent) {
			result.push(parent);
			parent = Prototype.parent.apply(parent, arguments);
		}

		return NodeList.from(result);
	};

	/**
	 * Builds a selector addressing this node.
	 *
	 * An id ends the selector, as it already identifies the node. Otherwise the tag
	 * name is used and the path continues at the parent. A position is only added
	 * when the parent has more than one element child, and it counts all of them -
	 * that is what :nth-child does, unlike :nth-of-type.
	 *
	 * The id is not escaped, so an id needing it gives an invalid selector.
	 *
	 * @returns {string|undefined} the selector, undefined for a Document or DocumentFragment
	 */
	Prototype.selector = function () {
		if (this instanceof Document || this instanceof DocumentFragment) return undefined;
		else if (this.id) return "#" + this.id;
		else {
			let selector = this.tagName.toLowerCase();
			const parent = this.parent();
			if (parent) {
				if(parent.children.length > 1) {
					const index = parent.children.indexOf(this);
					selector = `${selector}:nth-child(${index + 1})`;
				}
				const parentSelector = parent.selector();
				return parentSelector != null ? `${parentSelector} > ${selector}` : selector;
			}
			return selector;
		}
	};

	/**
	 * Returns the first node of closests().
	 *
	 * @param {string} aQuery
	 * @returns {Node|undefined} the first node found, or undefined
	 */
	Prototype.closest = function (aQuery) {
		return this.closests(aQuery).first();
	};

	/**
	 * Searches the nodes closest to this one by their distance in the tree.
	 *
	 * The subtree of this node is searched first, then the subtree of the parent,
	 * and so on upwards - the search widens in rings until a level has matches, and
	 * those are returned. So the result may be a child, a sibling, a cousin or an
	 * ancestor, depending on where the first match appears.
	 *
	 * Distance is meant in both directions here, other than in the native closest(),
	 * which only walks up and returns an ancestor.
	 *
	 * @param {string} aQuery
	 * @returns {NodeList} the matches of the closest level having any, empty when there are none
	 */
	Prototype.closests = function (aQuery) {
		const result = this.find(aQuery);
		if (result.length != 0) return result;

		const parent = this.parentElement;
		if (parent) return parent.closests(aQuery);

		return NodeList.from([]);
	};

	/**
	 * Searches the query at this node, below it, or above it - in that order.
	 *
	 * This node itself is checked first, then its subtree, and only then the
	 * ancestors. Unlike closests() the search does not widen in rings: it never
	 * looks into the subtree of an ancestor, so a sibling is not found.
	 *
	 * @param {string} aQuery
	 * @returns {NodeList} this node, the nodes below it, or the matching ancestor, empty when there is none
	 */
	Prototype.nested = function (aQuery) {
		if (this.is(aQuery)) return NodeList.from(this);

		let nested = this.find(aQuery);
		if (nested && nested.length > 0) return nested;
		else return NodeList.from(this.parent(aQuery));
	};
});
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (support);


/***/ },

/***/ "./node_modules/@default-js/defaultjs-extdom/src/dom/extentions/ReadyEventSupport.js"
/*!*******************************************************************************************!*\
  !*** ./node_modules/@default-js/defaultjs-extdom/src/dom/extentions/ReadyEventSupport.js ***!
  \*******************************************************************************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   READYEVENT: () => (/* binding */ READYEVENT),
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _utils_Extender__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../utils/Extender */ "./node_modules/@default-js/defaultjs-extdom/src/utils/Extender.js");


/**
 * The type of the event triggered once the document is ready.
 *
 * @type {string}
 */
const READYEVENT = "defaultjs--event--ready";

const support = (0,_utils_Extender__WEBPACK_IMPORTED_MODULE_0__["default"])("ReadyEventSupport", Prototype => {
	/**
	 * Registers a function for the ready event of the document.
	 *
	 * The ready event is triggered once the dom is parsed. When the document is
	 * already complete the event is triggered right away, so a function registered
	 * late still runs. That trigger reaches every ready listener, so functions
	 * registered earlier run again on each late registration.
	 *
	 * @param {Function} aFunction - called on the ready event
	 * @param {boolean} [once] - remove the function after the next ready event
	 * @returns {Document} this
	 */
	Prototype.ready = function(aFunction, once){
		this.on(READYEVENT, aFunction, once ? { once: true } : undefined);
		if(document.readyState == "complete")
			this.trigger(READYEVENT);

		return this;
	};

});
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (support);

/***/ },

/***/ "./node_modules/@default-js/defaultjs-extdom/src/dom/extentions/ShowHideSupport.js"
/*!*****************************************************************************************!*\
  !*** ./node_modules/@default-js/defaultjs-extdom/src/dom/extentions/ShowHideSupport.js ***!
  \*****************************************************************************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _utils_Extender__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../utils/Extender */ "./node_modules/@default-js/defaultjs-extdom/src/utils/Extender.js");


const HIDEVALUE = "none";

/**
 * Whether the element is hidden by its own inline display, a display coming from
 * a css rule is not seen.
 *
 * @param {HTMLElement} element
 * @returns {boolean}
 */
const isHidden = (element) => {
	return element.style.display === HIDEVALUE
};

/**
 * Replaces show and hide on the element by versions bound to it, capturing the
 * display to restore on show.
 *
 * The display is read once, on the first show or hide, and kept from then on -
 * the bound methods shadow the prototype, so init does not run again. A display
 * set directly afterwards is not picked up. When the element is hidden at that
 * first call the captured value is the empty string, falling back to the css.
 *
 * @param {HTMLElement} element
 * @returns {HTMLElement} the element
 */
const init = (element) => {
	let display = !isHidden(element) ? element.style.display : "";

	element.show = (function(){
		this.style.display = display;
		return this;
	}).bind(element);

	element.hide = (function(){
		this.style.display = HIDEVALUE;
		return this;
	}).bind(element);

	return element;
};


const support = (0,_utils_Extender__WEBPACK_IMPORTED_MODULE_0__["default"])("ShowHideSupport", Prototype => {
	/**
	 * Shows the element by restoring the display captured before it was hidden.
	 *
	 * @returns {HTMLElement} this
	 */
	Prototype.show = function() {
		return init(this).show.apply(null, arguments)
	};

	/**
	 * Hides the element by setting its display to none.
	 *
	 * @returns {HTMLElement} this
	 */
	Prototype.hide = function() {
		return init(this).hide.apply(null, arguments)
	};

	/**
	 * Shows the element when it is hidden, hides it otherwise.
	 *
	 * Only an inline display of none counts as hidden, so an element hidden by a
	 * css rule is hidden inline first before it shows.
	 *
	 * @returns {HTMLElement} this
	 */
	Prototype.toggleShow = function() {
		return isHidden(this) ? this.show() : this.hide();
	};

});
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (support);

/***/ },

/***/ "./node_modules/@default-js/defaultjs-extdom/src/dom/extentions/ValueSupport.js"
/*!**************************************************************************************!*\
  !*** ./node_modules/@default-js/defaultjs-extdom/src/dom/extentions/ValueSupport.js ***!
  \**************************************************************************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _utils_Extender__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../utils/Extender */ "./node_modules/@default-js/defaultjs-extdom/src/utils/Extender.js");


/**
 * Value handling for one kind of input element.
 *
 * @typedef {Object} InputType
 * @property {string} selector - matches the elements handled by this type
 * @property {function():*} get - reads the value of the element
 * @property {function(*):void} set - writes the value to the element
 */

/**
 * Shared setter of checkbox and radio, both are set by their checked state.
 *
 * @param {boolean|string|string[]} aValue - a boolean is applied directly, a string or an array of strings checks the element when its value matches
 */
const checkedSetter = function(aValue){
	if(typeof aValue === "boolean")
		this.checked = aValue;
	else if(typeof aValue === "string")
		this.checked = this.value == aValue;
	else if(Array.isArray(aValue))
		this.checked = aValue.indexOf(this.value) >= 0;

	this.trigger("changed");
};

/**
 * The first type with a matching selector handles the element.
 *
 * @type {InputType[]}
 */
const InputTypes = [
	{
		selector : "select",
		/**
		 * @returns {string[]} the values of all selected options
		 */
		get : function(){
			const result = [];
			this.find("option").forEach(option => {
				if(option.selected)
					result.push(option.value);
			});			
			return result;
		},
		set : function(){				
			let values = [];
			const args = Array.from(arguments);
			let arg = args.shift();
			while(arg){
				if(Array.isArray(arg))
					values = values.concat(arg);
				else
					values.push(arg);
				
				arg = args.shift();
			}
			this.value = values;
			this.find("option").forEach(option => option.selected = values.indexOf(option.value) >= 0);
			this.trigger("changed");
		}
	},
	{
		selector : "input[type=\"checkbox\"]",
		/**
		 * A checkbox is independent, so an unchecked one reports false - it is off,
		 * which is a value of its own.
		 *
		 * @returns {boolean|string|undefined} the checked state without a value attribute, otherwise the value when checked
		 */
		get : function(){
			if(!this.hasAttribute("value"))
				return this.checked;
			else if(this.checked)
				return this.value;
		},
		set : checkedSetter
	},
	{
		selector : "input[type=\"radio\"]",
		/**
		 * All radios of a group share one name and only one of them can be checked,
		 * so an unchecked radio returns undefined instead of false - it carries no
		 * value, it just is not the selected one. This is what keeps the unchecked
		 * radios from overwriting the value of their group, once the results of a
		 * whole group get collected by name.
		 *
		 * @returns {boolean|string|undefined} true or the value when checked, undefined otherwise
		 */
		get : function(){
			if(this.checked)
				return this.hasAttribute("value") ? this.value : true;
		},
		set : checkedSetter
	}
];

/**
 * Fallback for all elements without a matching InputType.
 *
 * @type {InputType}
 */
const DefaultInputType = {
		get : function(){
			return this.value;
		},
		set : function(aValue){
			this.value = aValue;
			this.trigger("input");
		}
};

/**
 * @param {Element} aElement
 * @returns {InputType} the first matching type, or DefaultInputType
 */
const getInputType = function(aElement){
	for(let i = 0; i < InputTypes.length; i++)
		if(aElement.is(InputTypes[i].selector))
			return InputTypes[i];		
	return DefaultInputType;
};


const support = (0,_utils_Extender__WEBPACK_IMPORTED_MODULE_0__["default"])("ValueSupport", Prototype => {
	/**
	 * Gets or sets the value of this element.
	 *
	 * What a value is depends on the element: a select returns the values of all
	 * its selected options, a checkbox its checked state or its value, a radio a
	 * value only when it is checked, every other element its value.
	 *
	 * @param {...*} [aValue] - the new value, the accepted types depend on the element
	 * @returns {*|Element} the value of the element, or this when a value was set
	 */
	Prototype.val = function() {
		let type = getInputType(this);
		if(arguments.length == 0)
			return type.get.apply(this, arguments);
		else
			type.set.apply(this, arguments);
			
		return this;
	};	
});
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (support);

/***/ },

/***/ "./node_modules/@default-js/defaultjs-extdom/src/index.js"
/*!****************************************************************!*\
  !*** ./node_modules/@default-js/defaultjs-extdom/src/index.js ***!
  \****************************************************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _dom_EventTarget__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./dom/EventTarget */ "./node_modules/@default-js/defaultjs-extdom/src/dom/EventTarget.js");
/* harmony import */ var _dom_Node__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./dom/Node */ "./node_modules/@default-js/defaultjs-extdom/src/dom/Node.js");
/* harmony import */ var _dom_Element__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./dom/Element */ "./node_modules/@default-js/defaultjs-extdom/src/dom/Element.js");
/* harmony import */ var _dom_Document__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./dom/Document */ "./node_modules/@default-js/defaultjs-extdom/src/dom/Document.js");
/* harmony import */ var _dom_DocumentFragment__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./dom/DocumentFragment */ "./node_modules/@default-js/defaultjs-extdom/src/dom/DocumentFragment.js");
/* harmony import */ var _dom_HTMLElement__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./dom/HTMLElement */ "./node_modules/@default-js/defaultjs-extdom/src/dom/HTMLElement.js");
/* harmony import */ var _dom_HTMLInputElement__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./dom/HTMLInputElement */ "./node_modules/@default-js/defaultjs-extdom/src/dom/HTMLInputElement.js");
/* harmony import */ var _dom_HTMLTextAreaElement__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./dom/HTMLTextAreaElement */ "./node_modules/@default-js/defaultjs-extdom/src/dom/HTMLTextAreaElement.js");
/* harmony import */ var _dom_HTMLSelectElement__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./dom/HTMLSelectElement */ "./node_modules/@default-js/defaultjs-extdom/src/dom/HTMLSelectElement.js");
/* harmony import */ var _dom_NodeList__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ./dom/NodeList */ "./node_modules/@default-js/defaultjs-extdom/src/dom/NodeList.js");
/* harmony import */ var _dom_HtmlCollection__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ./dom/HtmlCollection */ "./node_modules/@default-js/defaultjs-extdom/src/dom/HtmlCollection.js");
/* harmony import */ var _Global__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ./Global */ "./node_modules/@default-js/defaultjs-extdom/src/Global.js");














/***/ },

/***/ "./node_modules/@default-js/defaultjs-extdom/src/utils/DelegaterBuilder.js"
/*!*********************************************************************************!*\
  !*** ./node_modules/@default-js/defaultjs-extdom/src/utils/DelegaterBuilder.js ***!
  \*********************************************************************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/**
 * Adds delegating methods to a prototype, one for each method of the target
 * prototypes.
 *
 * This is how a NodeList gets the methods of a Node: for every method name found
 * on the targets, a function is put on the source that hands the call to the
 * callback, together with that name. The callback then decides what to do - for a
 * list it applies the method to each node and collects the results.
 *
 * A name already on the source is left alone, so its own methods win. Only value
 * methods are taken, accessors are skipped, as their descriptor has no value.
 *
 * @param {function(string, Arguments):*} callback - called as method, with the name and the arguments
 * @param {Object} source - the prototype the delegating methods are added to
 * @param {...Object} theTargets - the prototypes whose method names are delegated
 */
const DelegaterBuilder = function() {
	const args = Array.from(arguments);
	const callback = args.shift();
	const source = args.shift();
	args.forEach( target =>{
		Object.getOwnPropertyNames(target)
		.forEach(name => {
			const prop = Object.getOwnPropertyDescriptor(target, name);
			if (typeof source[name] === "undefined" && typeof prop.value === "function")
				source[name] = function(){
					return callback.call(this, name, arguments);
				};
		});
	});

};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (DelegaterBuilder);

/***/ },

/***/ "./node_modules/@default-js/defaultjs-extdom/src/utils/ExtendPrototype.js"
/*!********************************************************************************!*\
  !*** ./node_modules/@default-js/defaultjs-extdom/src/utils/ExtendPrototype.js ***!
  \********************************************************************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/**
 * Applies extensions to the prototype of a type.
 *
 * @param {Function} aType - the type whose prototype gets extended
 * @param {...function(Function):void} theExtenders - the wrapped extensions to apply, in order
 */
const extendPrototype = function(){
	const args = Array.from(arguments);
	const type = args.shift();
	while(args.length > 0){
		const extender = args.shift();
		extender(type);
	}
};

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (extendPrototype);

/***/ },

/***/ "./node_modules/@default-js/defaultjs-extdom/src/utils/Extender.js"
/*!*************************************************************************!*\
  !*** ./node_modules/@default-js/defaultjs-extdom/src/utils/Extender.js ***!
  \*************************************************************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _Utils__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Utils */ "./node_modules/@default-js/defaultjs-extdom/src/utils/Utils.js");


/**
 * Which extension is applied to which type, kept on the global object so it is
 * shared across separate loads of the library.
 *
 * @type {Object<string, Object<string, boolean>>}
 */
const EXTENSIONS_MAP = _Utils__WEBPACK_IMPORTED_MODULE_0__["default"].globalVar("___DOM_API_EXTENSION_MAP___", {});

/**
 * Wraps an extension so it applies to the prototype of a type only once.
 *
 * The returned function is what extendPrototype() calls with a type. Applying the
 * same named extension to the same type again is a no-op with a warning, so
 * loading the library twice does not patch the prototypes twice.
 *
 * @param {string} aName - the name of the extension, unique per type
 * @param {function(Object):void} aExtention - adds the members to the prototype
 * @returns {function(Function):void} a function applying the extension to a type
 */
const Extender = function(aName, aExtention){
	return function(aType){
		const {name, prototype} = aType;
		let extensions = EXTENSIONS_MAP[name];
		if(!extensions)
			extensions = EXTENSIONS_MAP[name] = {};		
		
		if(!extensions[aName]){
			extensions[aName] = true;
			aExtention(prototype);
		}
		else
			console.warn(`Duplicated load of extension \"${aName}\"!`);
	}
};

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Extender);

/***/ },

/***/ "./node_modules/@default-js/defaultjs-extdom/src/utils/Utils.js"
/*!**********************************************************************!*\
  !*** ./node_modules/@default-js/defaultjs-extdom/src/utils/Utils.js ***!
  \**********************************************************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   GLOBAL: () => (/* binding */ GLOBAL),
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });

/**
 * The global object of the current environment.
 *
 * Detected with typeof guards, because a bare reference to an undeclared name
 * throws instead of being falsy - so a plain window || global chain would break
 * everywhere window is missing, not fall through. globalThis covers the browser,
 * node and workers, the rest stays as a fallback for older runtimes.
 *
 * @type {Object}
 */
const GLOBAL = typeof globalThis !== "undefined" ? globalThis :
	typeof window !== "undefined" ? window :
	typeof __webpack_require__.g !== "undefined" ? __webpack_require__.g :
	typeof self !== "undefined" ? self : {};

const Utils = {
	/**
	 * The global object, same as GLOBAL.
	 *
	 * @type {Object}
	 */
	global : GLOBAL,

	/**
	 * Reads a variable from the global object, initializing it once when a value
	 * is given and none is set yet.
	 *
	 * Used to share state between separate loads of the library, which each have
	 * their own module scope but the one global object in common.
	 *
	 * @param {string} aName - the name on the global object
	 * @param {*} [aInitValue] - the value to set when the name is still undefined
	 * @returns {*} the value on the global object
	 */
	globalVar : function(aName, aInitValue){
		if(arguments.length === 2 && typeof GLOBAL[aName] === "undefined")
			GLOBAL[aName] = aInitValue;

		return GLOBAL[aName];
	}
};

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Utils);

/***/ },

/***/ "./src/Component.js"
/*!**************************!*\
  !*** ./src/Component.js ***!
  \**************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   componentBaseOf: () => (/* binding */ componentBaseOf),
/* harmony export */   createUUID: () => (/* binding */ createUUID),
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _default_js_defaultjs_common_utils_src_PromiseUtils_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @default-js/defaultjs-common-utils/src/PromiseUtils.js */ "./node_modules/@default-js/defaultjs-common-utils/src/PromiseUtils.js");
/* harmony import */ var _utils_DefineComponentHelper_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./utils/DefineComponentHelper.js */ "./src/utils/DefineComponentHelper.js");
/* harmony import */ var _default_js_defaultjs_common_utils_src_UUID_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @default-js/defaultjs-common-utils/src/UUID.js */ "./node_modules/@default-js/defaultjs-common-utils/src/UUID.js");
/* harmony import */ var _Constants_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./Constants.js */ "./src/Constants.js");
/* harmony import */ var _utils_EventHelper_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./utils/EventHelper.js */ "./src/utils/EventHelper.js");






/**
 * @module Component
 *
 * Factory and base class for asynchronous web components. A component exposes a
 * `ready` promise that resolves once all post-construct steps of {@link Component#init}
 * have run.
 */

/**
 * Creates a document-unique id by combining an optional prefix and suffix with
 * a generated {@link uuid}. It retries up to 100 times until the id is not yet
 * present in the document; if no unique id can be produced it logs an error and
 * returns the last generated id.
 *
 * @param {string} [prefix] - text prepended to the generated uuid.
 * @param {string} [suffix] - text appended to the generated uuid.
 * @returns {string} a (best-effort) document-unique id.
 */
const createUUID = (prefix, suffix) => {
	let count = 0;
	let id = null;
	while (count < 100) {
		id = `${prefix ? prefix : ""}${(0,_default_js_defaultjs_common_utils_src_UUID_js__WEBPACK_IMPORTED_MODULE_2__.uuid)()}${suffix ? suffix : ""}`;
		if (!document.getElementById(id)) return id;

		count++;
	}
	console.error(new Error("To many retries to create an unique id - created id is not unique!"));
	return id;
};

/**
 * @typedef {Object} ComponentOptions
 * @property {boolean} [shadowRoot=false] - when `true` an open shadow root is attached.
 * @property {Node|string|function(Component): (Node|string)} [content=null] - content appended to the component's root; a function receives the component and returns the content.
 * @property {boolean} [createUID=false] - when `true` a unique `id` attribute is assigned during {@link Component#init}.
 * @property {string} [uidPrefix="id-"] - prefix used for the generated id when `createUID` is `true`.
 * @property {string} [uidSuffix=""] - suffix used for the generated id when `createUID` is `true`.
 * @property {Array<function(Component): (void|Promise)>} [postConstructs=null] - additional post-construct functions run during {@link Component#init}.
 * @property {Array<function(Component): (void|Promise)>} [postConstucts=null] - deprecated misspelled alias of `postConstructs`; use `postConstructs` instead.
 */

/**
 * Builds a component base class extending the given HTML element type.
 *
 * @param {typeof HTMLElement} htmlBaseType - the HTML element class to extend.
 * @returns {typeof HTMLElement} a component class extending `htmlBaseType`.
 */
const buildClass = (htmlBaseType) => {
	/**
	 * Asynchronous web component base class.
	 *
	 * @class Component
	 * @extends HTMLElement
	 */
	const clazz = class Component extends htmlBaseType {

		/**
		 * Tag name used to register the component. Must be overridden as a
		 * static getter on the concrete component class.
		 *
		 * @static
		 * @type {string}
		 * @throws {Error} always, on the base class.
		 */
		static get NODENAME() {throw new Error("NODENAME must be defined as static on component class!");}

		/**
		 * Registers this component class as a custom element.
		 *
		 * @static
		 * @type {typeof import("./utils/DefineComponentHelper.js").define}
		 */
		static define = _utils_DefineComponentHelper_js__WEBPACK_IMPORTED_MODULE_1__.define;

		/**
		 * Attributes observed for {@link Component#attributeChangedCallback}.
		 * Override to observe attributes.
		 *
		 * @static
		 * @readonly
		 * @type {Array<string>}
		 */
		static get observedAttributes() {
			return [];
		}

		#ready = null;
		#postConstructs = [];

		/**
		 * @param {ComponentOptions} [options={}] - configuration for the component.
		 */
		constructor({ shadowRoot = false, content = null, createUID = false, uidPrefix = "id-", uidSuffix = "", postConstructs = null, postConstucts = null } = {}) {
			super();
			this.#ready = (0,_default_js_defaultjs_common_utils_src_PromiseUtils_js__WEBPACK_IMPORTED_MODULE_0__.lazyPromise)();
			if (createUID) this.#postConstructs.push(async () => this.attr("id", createUUID(uidPrefix, uidSuffix)));

			if (shadowRoot) this.attachShadow({ mode: "open" });

			if (content) this.root.append(typeof content === "function" ? content(this) : content);

			// `postConstucts` is the deprecated (misspelled) alias of `postConstructs`
			if (postConstructs == null && postConstucts != null) {
				console.warn(`Component option "postConstucts" is deprecated - use "postConstructs" instead.`);
				postConstructs = postConstucts;
			}

			if(postConstructs instanceof Array)
				for(let post of postConstructs)
					if(typeof post === "function")
						this.#postConstructs.push(post)
		}


		/**
		 * Array of post construct functions
		 *
		 * @readonly
		 * @type {Array<Function>}
		 */
		get postConstructs(){
			return this.#postConstructs;
		}


		/**
		 * The render root of the component: the shadow root when present,
		 * otherwise the component itself.
		 *
		 * @readonly
		 * @type {HTMLElement|ShadowRoot}
		 */
		get root() {
			return this.shadowRoot || this;
		}


		/**
		 * Promise that resolves once {@link Component#init} has completed.
		 *
		 * @readonly
		 * @type {Promise}
		 */
		get ready() {
			return this.#ready;
		}

		/**
		 * Framework-internal initialization orchestrator: runs every post-construct
		 * function in order and then the overridable {@link Component#init} hook.
		 * Driven exclusively by {@link Component#connectedCallback} and
		 * {@link Component#reinit}; being private, the full lifecycle can never be
		 * triggered partially or by accident (e.g. a manual `init()` call).
		 *
		 * @async
		 * @returns {Promise} resolves with the return value of {@link Component#init}.
		 */
		async #runInit() {
			for (let func of this.#postConstructs) await func(this);
			return await this.init();
		}

		/**
		 * Runs the initialization orchestrator and settles {@link Component#ready}
		 * with its result.
		 *
		 * @returns {Promise} the {@link Component#ready} promise.
		 */
		#settle() {
			this.#runInit()
				.then((value) => this.#ready.resolve(value))
				.catch((error) => this.#ready.resolve(error));
			return this.#ready;
		}

		/**
		 * Override hook for asynchronous component setup. It runs automatically
		 * after the post-construct functions once the component is connected, and
		 * its return value settles {@link Component#ready}. `this.root` already
		 * points at the render root when it runs.
		 *
		 * Subclasses override this freely and **must not** call `super.init()` -
		 * the post-construct hooks are executed by the framework before this hook.
		 *
		 * @async
		 * @returns {*} an optional value used to resolve `ready`.
		 */
		async init() {
		}

		/**
		 * Resets the `ready` promise so the component can be initialized again.
		 * Invoked automatically from {@link Component#disconnectedCallback}.
		 *
		 * @async
		 * @returns {Promise}
		 */
		async destroy() {
			if (this.ready.resolved) this.#ready = (0,_default_js_defaultjs_common_utils_src_PromiseUtils_js__WEBPACK_IMPORTED_MODULE_0__.lazyPromise)();
		}

		/**
		 * Explicitly re-runs the full initialization (post-construct hooks and
		 * {@link Component#init}) on an already-created component, resetting
		 * {@link Component#ready} first when it had already settled.
		 *
		 * @returns {Promise} the (possibly new) {@link Component#ready} promise.
		 */
		reinit() {
			if (this.#ready.resolved) this.#ready = (0,_default_js_defaultjs_common_utils_src_PromiseUtils_js__WEBPACK_IMPORTED_MODULE_0__.lazyPromise)();
			return this.#settle();
		}

		/**
		 * Custom element lifecycle callback. Runs the initialization when the
		 * component is connected to the main document and settles the `ready`
		 * promise with the result.
		 */
		connectedCallback() {
			if (this.ownerDocument == document && this.isConnected)
				this.#settle();
		}

		/**
		 * Custom element lifecycle callback. Re-runs {@link Component#connectedCallback}
		 * when the component is adopted into another document.
		 */
		adoptedCallback() {
			this.connectedCallback();
		}

		/**
		 * Custom element lifecycle callback. Dispatches the attribute-change and
		 * component-change events when an observed attribute changes.
		 *
		 * @param {string} name - the name of the changed attribute.
		 * @param {?string} oldValue - the previous attribute value.
		 * @param {?string} newValue - the new attribute value.
		 */
		attributeChangedCallback(name, oldValue, newValue) {
			if (oldValue != newValue && this.isConnected) {
				this.trigger(_Constants_js__WEBPACK_IMPORTED_MODULE_3__.triggerTimeout, (0,_utils_EventHelper_js__WEBPACK_IMPORTED_MODULE_4__.attributeChangeEventname)(name, this));
				this.trigger(_Constants_js__WEBPACK_IMPORTED_MODULE_3__.triggerTimeout, (0,_utils_EventHelper_js__WEBPACK_IMPORTED_MODULE_4__.componentEventname)("change", this));
			}
		}

		/**
		 * Custom element lifecycle callback. Runs {@link Component#destroy} when
		 * the component is removed from the DOM.
		 */
		disconnectedCallback() {
			this.destroy();
		}
	};

	return clazz;
};

const CLAZZMAP = new Map();

/**
 * Returns the component base class for the given HTML element type. Classes are
 * cached, so repeated calls with the same base type return the same class.
 *
 * @param {typeof HTMLElement} htmlBaseType - the HTML element class to extend.
 * @returns {typeof HTMLElement} the (cached) component class extending `htmlBaseType`.
 */
const componentBaseOf = (htmlBaseType) => {
	let clazz = CLAZZMAP.get(htmlBaseType);
	if (clazz == null) {
		clazz = buildClass(htmlBaseType);
		CLAZZMAP.set(htmlBaseType, clazz);
	}

	return clazz;
};

/**
 * Default component base class extending {@link HTMLElement}.
 *
 * @type {typeof HTMLElement}
 */
const Component = componentBaseOf(HTMLElement);

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Component);


/***/ },

/***/ "./src/Constants.js"
/*!**************************!*\
  !*** ./src/Constants.js ***!
  \**************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   GLOBAL: () => (/* binding */ GLOBAL),
/* harmony export */   SETTING: () => (/* binding */ SETTING),
/* harmony export */   attributeChangeEventPrefix: () => (/* binding */ attributeChangeEventPrefix),
/* harmony export */   componentPrefix: () => (/* binding */ componentPrefix),
/* harmony export */   initTimeout: () => (/* binding */ initTimeout),
/* harmony export */   triggerTimeout: () => (/* binding */ triggerTimeout)
/* harmony export */ });
/* harmony import */ var _default_js_defaultjs_extdom_src_utils_Utils_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @default-js/defaultjs-extdom/src/utils/Utils.js */ "./node_modules/@default-js/defaultjs-extdom/src/utils/Utils.js");


/**
 * @module Constants
 *
 * Shared constants and runtime settings used across the component toolbox.
 */

/**
 * The global object shared with `defaultjs-extdom` (e.g. `window` in the browser).
 *
 * @type {Object}
 */
const GLOBAL = _default_js_defaultjs_extdom_src_utils_Utils_js__WEBPACK_IMPORTED_MODULE_0__.GLOBAL;

/**
 * Mutable runtime settings. Change these before components are created to
 * influence the generated event names.
 *
 * @type {Object}
 * @property {string} eventSeparator - separator used between the node name and
 *   the event type when building component event names (see {@link module:utils/EventHelper}).
 */
const SETTING = {
    eventSeparator: "--"
};

/**
 * Default tag-name prefix for custom elements (e.g. `d-button`).
 *
 * @type {string}
 */
const componentPrefix = "d-";

/**
 * Prefix used when building the event name for an attribute change.
 *
 * @type {string}
 */
const attributeChangeEventPrefix = "attribute";

/**
 * Delay in milliseconds before the initial `init()` is triggered.
 *
 * @type {number}
 */
const initTimeout = 10;

/**
 * Delay in milliseconds used when triggering component events.
 *
 * @type {number}
 */
const triggerTimeout = 10;


/***/ },

/***/ "./src/Ready.js"
/*!**********************!*\
  !*** ./src/Ready.js ***!
  \**********************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _default_js_defaultjs_common_utils_src_PromiseUtils_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @default-js/defaultjs-common-utils/src/PromiseUtils.js */ "./node_modules/@default-js/defaultjs-common-utils/src/PromiseUtils.js");


/**
 * @module Ready
 *
 * Re-export of {@link lazyPromise}: a promise whose resolution can be
 * triggered from the outside and that exposes a `resolved` flag. It backs the
 * `ready` lifecycle of {@link module:Component}.
 *
 * @type {function(): Promise}
 */
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (_default_js_defaultjs_common_utils_src_PromiseUtils_js__WEBPACK_IMPORTED_MODULE_0__.lazyPromise);


/***/ },

/***/ "./src/utils/DefineComponentHelper.js"
/*!********************************************!*\
  !*** ./src/utils/DefineComponentHelper.js ***!
  \********************************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__),
/* harmony export */   define: () => (/* binding */ define),
/* harmony export */   toNodeName: () => (/* binding */ toNodeName)
/* harmony export */ });
/* harmony import */ var _Constants_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../Constants.js */ "./src/Constants.js");


/**
 * @module utils/DefineComponentHelper
 *
 * Helpers to build tag names and register custom elements.
 */

/**
 * Builds a custom-element tag name by prefixing `name`.
 *
 * @param {string} name - the base name of the element.
 * @param {string} [prefix] - the prefix to use; defaults to {@link componentPrefix} (`"d-"`) when omitted.
 * @returns {string} the prefixed tag name.
 */
const toNodeName = (name, prefix) => {
	if(typeof prefix === "string")
		return prefix + name;

	return _Constants_js__WEBPACK_IMPORTED_MODULE_0__.componentPrefix + name;
};

/**
 * Registers a component class as a custom element, using its static `NODENAME`
 * as tag name. Registration is skipped when an element with that name already
 * exists.
 *
 * @param {CustomElementConstructor} clazz - the component class to register; must expose a static `NODENAME`.
 * @param {ElementDefinitionOptions} [options] - options forwarded to `customElements.define`.
 */
const define = function(clazz, options) {
	const nodename = clazz.NODENAME;
	if (!customElements.get(nodename)) {
		customElements.define(nodename, clazz, options);
	}
};


/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (define);


/***/ },

/***/ "./src/utils/EventHelper.js"
/*!**********************************!*\
  !*** ./src/utils/EventHelper.js ***!
  \**********************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   attributeChangeEventname: () => (/* binding */ attributeChangeEventname),
/* harmony export */   componentEventname: () => (/* binding */ componentEventname),
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _Constants_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../Constants.js */ "./src/Constants.js");


/**
 * @module utils/EventHelper
 *
 * Helpers to build the event names dispatched by components.
 */

/**
 * Creates the event name for a component event, composed of the node's tag
 * name, the `separator` and the `eventType`.
 *
 * @param {string} eventType - the event type, e.g. `"change"`.
 * @param {string|HTMLElement|Component} node - the node the event belongs to.
 *   A string is used verbatim as node name; an {@link HTMLElement} contributes
 *   its `nodeName`; any other object must expose a string `NODENAME`.
 * @param {string} [separator=SETTING.eventSeparator] - separator between node name and event type; defaults to `"--"`.
 * @returns {string} the lower-cased event name.
 * @throws {Error} when `node` is not a supported type.
 */
const componentEventname = (eventType, node, separator = _Constants_js__WEBPACK_IMPORTED_MODULE_0__.SETTING.eventSeparator ) => {
	let nodename = "unsupported";
	if(typeof node === "string")
		nodename = node;
	else if(node instanceof HTMLElement)
		nodename = node.nodeName;
	else if(typeof node.NODENAME === "string")
		nodename = node.NODENAME;
	else throw new Error(`${typeof node} is not supported as parameter "node"!`);

   return `${nodename.toLowerCase()}${separator}${eventType}`;
};

/**
 * Creates the event name dispatched when a component's attribute changes,
 * e.g. `d-button--attribute--disabled`.
 *
 * @param {string} attribute - the name of the changed attribute.
 * @param {string|HTMLElement|Component} node - the node the event belongs to (see {@link componentEventname}).
 * @param {string} [separator=SETTING.eventSeparator] - separator used within the event name; defaults to `"--"`.
 * @returns {string} the attribute-change event name.
 */
const attributeChangeEventname = (attribute, node, separator = _Constants_js__WEBPACK_IMPORTED_MODULE_0__.SETTING.eventSeparator  ) => {
    return componentEventname(`${_Constants_js__WEBPACK_IMPORTED_MODULE_0__.attributeChangeEventPrefix}${separator}${attribute}`, node, separator);
};

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ({componentEventname, attributeChangeEventname});


/***/ },

/***/ "./src/utils/NodeHelper.js"
/*!*********************************!*\
  !*** ./src/utils/NodeHelper.js ***!
  \*********************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__),
/* harmony export */   findClosestInDepth: () => (/* binding */ findClosestInDepth),
/* harmony export */   findParent: () => (/* binding */ findParent)
/* harmony export */ });
/**
 * @module utils/NodeHelper
 *
 * Helpers to traverse the DOM tree relative to a node.
 */

/**
 * Walks up the ancestor chain of a node and returns the first ancestor for
 * which `check` returns a truthy value.
 *
 * @param {Node} node - the node to start from.
 * @param {function(Node): boolean} check - predicate applied to each ancestor.
 * @returns {Node|null} the first matching ancestor, or `null` if none matches.
 */
const findParent = (node, check) => {
	while(node != null) {
        if(check(node))
            return node;

        node = node.parent();
    }

    return null;
};

/**
 * Recursively searches the descendants of `node` and tracks the match with the
 * smallest depth found so far.
 *
 * @param {Node} node - the current node being inspected.
 * @param {number} depth - the depth of `node` relative to the search root.
 * @param {function(Node): boolean} check - predicate applied to each node.
 * @returns {{node: Node, depth: number}|null} the shallowest match with its depth, or `null`.
 */
const findClosest = (node, depth, check) => {
    if(check(node))
        return {node, depth}

    let result = null;
    for(let child of node.childNodes){
        const item = findClosest(child, depth + 1, check);

        if(item != null && (result == null || result.depth > item.depth))
            result = item;
    }

    return result;
}

/**
 * Searches the descendants of `node` and returns the matching node that is
 * closest to `node` (i.e. at the smallest depth).
 *
 * @param {Node} node - the root of the search.
 * @param {function(Node): boolean} check - predicate applied to each descendant.
 * @returns {Node|null} the shallowest matching descendant, or `null` if none matches.
 */
const findClosestInDepth = (node, check) => {
    const closest = findClosest(node, 0, check);
    return closest != null ? closest.node : null;
}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ({findParent, findClosestInDepth});


/***/ },

/***/ "./src/utils/StyleHelper.js"
/*!**********************************!*\
  !*** ./src/utils/StyleHelper.js ***!
  \**********************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   CSS_BASE_PATH_VAR: () => (/* binding */ CSS_BASE_PATH_VAR),
/* harmony export */   copyStyles: () => (/* binding */ copyStyles),
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__),
/* harmony export */   loadComponentStyle: () => (/* binding */ loadComponentStyle)
/* harmony export */ });
/* harmony import */ var _default_js_defaultjs_common_utils_src_Global_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @default-js/defaultjs-common-utils/src/Global.js */ "./node_modules/@default-js/defaultjs-common-utils/src/Global.js");


/**
 * @module utils/StyleHelper
 *
 * Helpers to copy existing styles between nodes and to load a component's
 * stylesheet by convention.
 */

/**
 * Clones all `<style type="text/css">` and `<link rel="stylesheet">` elements
 * found in `source` and adds them to `target`.
 *
 * @param {Node} source - the node to read the style elements from.
 * @param {Node} target - the node the cloned styles are added to.
 * @param {boolean} [append=true] - when `true` the styles are appended, otherwise prepended.
 */
const copyStyles = (source, target, append = true) => {
	const styles = Array.from(source.find(`style[type="text/css"], link[rel="stylesheet"]`))
		.map((style) => style.cloneNode(true));

	if (append)
		target.append(...styles);
	else
		target.prepend(...styles);
}

/**
 * Name of the global variable holding the base path used by
 * {@link loadComponentStyle} to resolve component stylesheets.
 *
 * @type {string}
 */
const CSS_BASE_PATH_VAR = "CSS_BASE_PATH";

/**
 * Appends a `<link rel="stylesheet">` to `target` pointing at the stylesheet
 * named after the target's tag name. The directory is taken from the global
 * {@link CSS_BASE_PATH_VAR} variable and defaults to `"css"`.
 *
 * @param {HTMLElement} target - the element the stylesheet link is added to.
 */
const loadComponentStyle = (target) => {
	const path = `${_default_js_defaultjs_common_utils_src_Global_js__WEBPACK_IMPORTED_MODULE_0__["default"][CSS_BASE_PATH_VAR] || "css"}/${target.nodeName.toLowerCase()}.css`;
	target.append(`<link rel="stylesheet" href="${path}"/>`);
}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ({ CSS_BASE_PATH_VAR, copyStyles, loadComponentStyle });


/***/ },

/***/ "./src/utils/WeakData.js"
/*!*******************************!*\
  !*** ./src/utils/WeakData.js ***!
  \*******************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ WeakData)
/* harmony export */ });
/**
 * @module utils/WeakData
 */

/**
 * A per-reference data store backed by a {@link WeakMap}. Data associated with
 * a reference is garbage-collected automatically once the reference itself is
 * no longer reachable, which makes it safe for storing state for DOM nodes.
 */
class WeakData {

	#weakmap = new WeakMap();

	constructor() {
	}

	/**
	 * Returns the data object associated with the given reference, creating an
	 * empty one on first access.
	 *
	 * @param {Object} reference - the key the data is associated with.
	 * @returns {Object} the (possibly newly created) data object.
	 */
	data(reference) {
		let data = this.#weakmap.get(reference);
		if (!data) {
			data = {};
			this.#weakmap.set(reference, data);
		}
		return data;
	}

	/**
	 * Reads, writes or deletes a single value on a reference's data object.
	 *
	 * - called with `(reference, key)` it returns the stored value;
	 * - called with `(reference, key, undefined)` it deletes the key;
	 * - called with `(reference, key, value)` it stores the value.
	 *
	 * @param {Object} reference - the key the data is associated with.
	 * @param {string} key - the property name to read, write or delete.
	 * @param {*} [value] - the value to store; pass `undefined` to delete the key.
	 * @returns {*} the stored value when used as a getter, otherwise `undefined`.
	 * @throws {Error} when called with fewer than two arguments.
	 */
	value(reference, key, value) {
		if (arguments.length < 2) throw new Error("reference and key required")
		if (arguments.length == 2) return this.data(reference)[key];
		else if(typeof value === "undefined") delete this.data(reference)[key];
		else this.data(reference)[key] = value;
	}

	/**
	 * Removes all data associated with the given reference.
	 *
	 * @param {Object} reference - the key whose data should be discarded.
	 */
	destroy(reference){
		this.#weakmap.delete(reference);
	}
};


/***/ },

/***/ "./src/utils/index.js"
/*!****************************!*\
  !*** ./src/utils/index.js ***!
  \****************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _DefineComponentHelper_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./DefineComponentHelper.js */ "./src/utils/DefineComponentHelper.js");
/* harmony import */ var _EventHelper_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./EventHelper.js */ "./src/utils/EventHelper.js");
/* harmony import */ var _NodeHelper_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./NodeHelper.js */ "./src/utils/NodeHelper.js");
/* harmony import */ var _StyleHelper_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./StyleHelper.js */ "./src/utils/StyleHelper.js");
/* harmony import */ var _WeakData_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./WeakData.js */ "./src/utils/WeakData.js");






/**
 * @module utils
 *
 * Aggregated helper modules of the component toolbox.
 *
 * @property {Object} DefineComponentHelper - helpers to register custom elements (see {@link module:utils/DefineComponentHelper}).
 * @property {Object} EventHelper - helpers to build component event names (see {@link module:utils/EventHelper}).
 * @property {Object} NodeHelper - helpers to traverse the DOM tree (see {@link module:utils/NodeHelper}).
 * @property {Object} StyleHelper - helpers to copy and load component styles (see {@link module:utils/StyleHelper}).
 * @property {typeof WeakData} WeakData - weakly referenced per-node data store (see {@link module:utils/WeakData}).
 */
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ({DefineComponentHelper: _DefineComponentHelper_js__WEBPACK_IMPORTED_MODULE_0__["default"], EventHelper: _EventHelper_js__WEBPACK_IMPORTED_MODULE_1__["default"], NodeHelper: _NodeHelper_js__WEBPACK_IMPORTED_MODULE_2__["default"], StyleHelper: _StyleHelper_js__WEBPACK_IMPORTED_MODULE_3__["default"], WeakData: _WeakData_js__WEBPACK_IMPORTED_MODULE_4__["default"]});


/***/ }

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	const __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		const cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		const module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		if (!(moduleId in __webpack_modules__)) {
/******/ 			delete __webpack_module_cache__[moduleId];
/******/ 			const e = new Error("Cannot find module '" + moduleId + "'");
/******/ 			e.code = 'MODULE_NOT_FOUND';
/******/ 			throw e;
/******/ 		}
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter/value functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			if(Array.isArray(definition)) {
/******/ 				var i = 0;
/******/ 				while(i < definition.length) {
/******/ 					var key = definition[i++];
/******/ 					var binding = definition[i++];
/******/ 					if(!__webpack_require__.o(exports, key)) {
/******/ 						if(binding === 0) {
/******/ 							Object.defineProperty(exports, key, { enumerable: true, value: definition[i++] });
/******/ 						} else {
/******/ 							Object.defineProperty(exports, key, { enumerable: true, get: binding });
/******/ 						}
/******/ 					} else if(binding === 0) { i++; }
/******/ 				}
/******/ 			} else {
/******/ 				for(var key in definition) {
/******/ 					if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 						Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 					}
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
/******/ 			if(Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
let __webpack_exports__ = {};
// This entry needs to be wrapped in an IIFE because it needs to be isolated against other modules in the chunk.
(() => {
/*!********************!*\
  !*** ./browser.js ***!
  \********************/
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   Component: () => (/* reexport safe */ _index_js__WEBPACK_IMPORTED_MODULE_1__.Component),
/* harmony export */   Ready: () => (/* reexport safe */ _index_js__WEBPACK_IMPORTED_MODULE_1__.Ready),
/* harmony export */   SETTING: () => (/* reexport safe */ _index_js__WEBPACK_IMPORTED_MODULE_1__.SETTING),
/* harmony export */   componentBaseOf: () => (/* reexport safe */ _index_js__WEBPACK_IMPORTED_MODULE_1__.componentBaseOf),
/* harmony export */   createUUID: () => (/* reexport safe */ _index_js__WEBPACK_IMPORTED_MODULE_1__.createUUID),
/* harmony export */   define: () => (/* reexport safe */ _index_js__WEBPACK_IMPORTED_MODULE_1__.define),
/* harmony export */   utils: () => (/* reexport safe */ _index_js__WEBPACK_IMPORTED_MODULE_1__.utils)
/* harmony export */ });
/* harmony import */ var _src_Constants_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./src/Constants.js */ "./src/Constants.js");
/* harmony import */ var _index_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./index.js */ "./index.js");



const pack = { VERSION: "3.0.0", utils: _index_js__WEBPACK_IMPORTED_MODULE_1__.utils, Ready: _index_js__WEBPACK_IMPORTED_MODULE_1__.Ready, Component: _index_js__WEBPACK_IMPORTED_MODULE_1__.Component, define: _index_js__WEBPACK_IMPORTED_MODULE_1__.define, componentBaseOf: _index_js__WEBPACK_IMPORTED_MODULE_1__.componentBaseOf, createUUID: _index_js__WEBPACK_IMPORTED_MODULE_1__.createUUID, SETTING: _index_js__WEBPACK_IMPORTED_MODULE_1__.SETTING };

_src_Constants_js__WEBPACK_IMPORTED_MODULE_0__.GLOBAL.defaultjs = _src_Constants_js__WEBPACK_IMPORTED_MODULE_0__.GLOBAL.defaultjs || {};
_src_Constants_js__WEBPACK_IMPORTED_MODULE_0__.GLOBAL.defaultjs.html = _src_Constants_js__WEBPACK_IMPORTED_MODULE_0__.GLOBAL.defaultjs.html || {};
_src_Constants_js__WEBPACK_IMPORTED_MODULE_0__.GLOBAL.defaultjs.html.components = _src_Constants_js__WEBPACK_IMPORTED_MODULE_0__.GLOBAL.defaultjs.html.components || pack;



})();

/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYnJvd3Nlci1kZWZhdWx0anMtaHRtbC1jb21wb25lbnRzLmpzIiwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQXNDO0FBQ0s7QUFDRjtBQUNOO0FBQ3dCO0FBQ1k7OztBQUdTOzs7Ozs7Ozs7Ozs7Ozs7QUNSaEY7QUFDQSxXQUFXLHFCQUFNLHlCQUF5QixxQkFBTTtBQUNoRDtBQUNBO0FBQ0E7QUFDQSxDQUFDO0FBQ0Q7QUFDQSxpRUFBZSxNQUFNLEU7Ozs7Ozs7Ozs7Ozs7O0FDUE47QUFDZjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEU7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FDeERpRDtBQUNqRDtBQUNBO0FBQ0E7QUFDQTtBQUNBLGlCQUFpQixZQUFZO0FBQzdCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDTztBQUNQO0FBQ0E7QUFDQTtBQUNPO0FBQ1A7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REFBTTtBQUM5QixxREFBTSw2QkFBNkIscURBQU07O0FBRXdDIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vQGRlZmF1bHQtanMvZGVmYXVsdGpzLWh0bWwtY29tcG9uZW50cy8uL2luZGV4LmpzIiwid2VicGFjazovL0BkZWZhdWx0LWpzL2RlZmF1bHRqcy1odG1sLWNvbXBvbmVudHMvLi9ub2RlX21vZHVsZXMvQGRlZmF1bHQtanMvZGVmYXVsdGpzLWNvbW1vbi11dGlscy9zcmMvR2xvYmFsLmpzIiwid2VicGFjazovL0BkZWZhdWx0LWpzL2RlZmF1bHRqcy1odG1sLWNvbXBvbmVudHMvLi9ub2RlX21vZHVsZXMvQGRlZmF1bHQtanMvZGVmYXVsdGpzLWNvbW1vbi11dGlscy9zcmMvT2JqZWN0UHJvcGVydHkuanMiLCJ3ZWJwYWNrOi8vQGRlZmF1bHQtanMvZGVmYXVsdGpzLWh0bWwtY29tcG9uZW50cy8uL25vZGVfbW9kdWxlcy9AZGVmYXVsdC1qcy9kZWZhdWx0anMtY29tbW9uLXV0aWxzL3NyYy9PYmplY3RVdGlscy5qcyIsIndlYnBhY2s6Ly9AZGVmYXVsdC1qcy9kZWZhdWx0anMtaHRtbC1jb21wb25lbnRzLy4vbm9kZV9tb2R1bGVzL0BkZWZhdWx0LWpzL2RlZmF1bHRqcy1jb21tb24tdXRpbHMvc3JjL1Byb21pc2VVdGlscy5qcyIsIndlYnBhY2s6Ly9AZGVmYXVsdC1qcy9kZWZhdWx0anMtaHRtbC1jb21wb25lbnRzLy4vbm9kZV9tb2R1bGVzL0BkZWZhdWx0LWpzL2RlZmF1bHRqcy1jb21tb24tdXRpbHMvc3JjL1VVSUQuanMiLCJ3ZWJwYWNrOi8vQGRlZmF1bHQtanMvZGVmYXVsdGpzLWh0bWwtY29tcG9uZW50cy8uL25vZGVfbW9kdWxlcy9AZGVmYXVsdC1qcy9kZWZhdWx0anMtZXh0ZG9tL2luZGV4LmpzIiwid2VicGFjazovL0BkZWZhdWx0LWpzL2RlZmF1bHRqcy1odG1sLWNvbXBvbmVudHMvLi9ub2RlX21vZHVsZXMvQGRlZmF1bHQtanMvZGVmYXVsdGpzLWV4dGRvbS9zcmMvR2xvYmFsLmpzIiwid2VicGFjazovL0BkZWZhdWx0LWpzL2RlZmF1bHRqcy1odG1sLWNvbXBvbmVudHMvLi9ub2RlX21vZHVsZXMvQGRlZmF1bHQtanMvZGVmYXVsdGpzLWV4dGRvbS9zcmMvZG9tL0RvY3VtZW50LmpzIiwid2VicGFjazovL0BkZWZhdWx0LWpzL2RlZmF1bHRqcy1odG1sLWNvbXBvbmVudHMvLi9ub2RlX21vZHVsZXMvQGRlZmF1bHQtanMvZGVmYXVsdGpzLWV4dGRvbS9zcmMvZG9tL0RvY3VtZW50RnJhZ21lbnQuanMiLCJ3ZWJwYWNrOi8vQGRlZmF1bHQtanMvZGVmYXVsdGpzLWh0bWwtY29tcG9uZW50cy8uL25vZGVfbW9kdWxlcy9AZGVmYXVsdC1qcy9kZWZhdWx0anMtZXh0ZG9tL3NyYy9kb20vRWxlbWVudC5qcyIsIndlYnBhY2s6Ly9AZGVmYXVsdC1qcy9kZWZhdWx0anMtaHRtbC1jb21wb25lbnRzLy4vbm9kZV9tb2R1bGVzL0BkZWZhdWx0LWpzL2RlZmF1bHRqcy1leHRkb20vc3JjL2RvbS9FdmVudFRhcmdldC5qcyIsIndlYnBhY2s6Ly9AZGVmYXVsdC1qcy9kZWZhdWx0anMtaHRtbC1jb21wb25lbnRzLy4vbm9kZV9tb2R1bGVzL0BkZWZhdWx0LWpzL2RlZmF1bHRqcy1leHRkb20vc3JjL2RvbS9IVE1MRWxlbWVudC5qcyIsIndlYnBhY2s6Ly9AZGVmYXVsdC1qcy9kZWZhdWx0anMtaHRtbC1jb21wb25lbnRzLy4vbm9kZV9tb2R1bGVzL0BkZWZhdWx0LWpzL2RlZmF1bHRqcy1leHRkb20vc3JjL2RvbS9IVE1MSW5wdXRFbGVtZW50LmpzIiwid2VicGFjazovL0BkZWZhdWx0LWpzL2RlZmF1bHRqcy1odG1sLWNvbXBvbmVudHMvLi9ub2RlX21vZHVsZXMvQGRlZmF1bHQtanMvZGVmYXVsdGpzLWV4dGRvbS9zcmMvZG9tL0hUTUxTZWxlY3RFbGVtZW50LmpzIiwid2VicGFjazovL0BkZWZhdWx0LWpzL2RlZmF1bHRqcy1odG1sLWNvbXBvbmVudHMvLi9ub2RlX21vZHVsZXMvQGRlZmF1bHQtanMvZGVmYXVsdGpzLWV4dGRvbS9zcmMvZG9tL0hUTUxUZXh0QXJlYUVsZW1lbnQuanMiLCJ3ZWJwYWNrOi8vQGRlZmF1bHQtanMvZGVmYXVsdGpzLWh0bWwtY29tcG9uZW50cy8uL25vZGVfbW9kdWxlcy9AZGVmYXVsdC1qcy9kZWZhdWx0anMtZXh0ZG9tL3NyYy9kb20vSHRtbENvbGxlY3Rpb24uanMiLCJ3ZWJwYWNrOi8vQGRlZmF1bHQtanMvZGVmYXVsdGpzLWh0bWwtY29tcG9uZW50cy8uL25vZGVfbW9kdWxlcy9AZGVmYXVsdC1qcy9kZWZhdWx0anMtZXh0ZG9tL3NyYy9kb20vTm9kZS5qcyIsIndlYnBhY2s6Ly9AZGVmYXVsdC1qcy9kZWZhdWx0anMtaHRtbC1jb21wb25lbnRzLy4vbm9kZV9tb2R1bGVzL0BkZWZhdWx0LWpzL2RlZmF1bHRqcy1leHRkb20vc3JjL2RvbS9Ob2RlTGlzdC5qcyIsIndlYnBhY2s6Ly9AZGVmYXVsdC1qcy9kZWZhdWx0anMtaHRtbC1jb21wb25lbnRzLy4vbm9kZV9tb2R1bGVzL0BkZWZhdWx0LWpzL2RlZmF1bHRqcy1leHRkb20vc3JjL2RvbS9leHRlbnRpb25zL0F0dHJpYnV0ZVN1cHBvcnQuanMiLCJ3ZWJwYWNrOi8vQGRlZmF1bHQtanMvZGVmYXVsdGpzLWh0bWwtY29tcG9uZW50cy8uL25vZGVfbW9kdWxlcy9AZGVmYXVsdC1qcy9kZWZhdWx0anMtZXh0ZG9tL3NyYy9kb20vZXh0ZW50aW9ucy9EYXRhU3VwcG9ydC5qcyIsIndlYnBhY2s6Ly9AZGVmYXVsdC1qcy9kZWZhdWx0anMtaHRtbC1jb21wb25lbnRzLy4vbm9kZV9tb2R1bGVzL0BkZWZhdWx0LWpzL2RlZmF1bHRqcy1leHRkb20vc3JjL2RvbS9leHRlbnRpb25zL0V2ZW50U3VwcG9ydC5qcyIsIndlYnBhY2s6Ly9AZGVmYXVsdC1qcy9kZWZhdWx0anMtaHRtbC1jb21wb25lbnRzLy4vbm9kZV9tb2R1bGVzL0BkZWZhdWx0LWpzL2RlZmF1bHRqcy1leHRkb20vc3JjL2RvbS9leHRlbnRpb25zL0h0bWxDbGFzc1N1cHBvcnQuanMiLCJ3ZWJwYWNrOi8vQGRlZmF1bHQtanMvZGVmYXVsdGpzLWh0bWwtY29tcG9uZW50cy8uL25vZGVfbW9kdWxlcy9AZGVmYXVsdC1qcy9kZWZhdWx0anMtZXh0ZG9tL3NyYy9kb20vZXh0ZW50aW9ucy9MaXN0U3VwcG9ydC5qcyIsIndlYnBhY2s6Ly9AZGVmYXVsdC1qcy9kZWZhdWx0anMtaHRtbC1jb21wb25lbnRzLy4vbm9kZV9tb2R1bGVzL0BkZWZhdWx0LWpzL2RlZmF1bHRqcy1leHRkb20vc3JjL2RvbS9leHRlbnRpb25zL0xpc3RUeXBlQnVpbGRlci5qcyIsIndlYnBhY2s6Ly9AZGVmYXVsdC1qcy9kZWZhdWx0anMtaHRtbC1jb21wb25lbnRzLy4vbm9kZV9tb2R1bGVzL0BkZWZhdWx0LWpzL2RlZmF1bHRqcy1leHRkb20vc3JjL2RvbS9leHRlbnRpb25zL01hbmlwdWxhdGlvblN1cHBvcnQuanMiLCJ3ZWJwYWNrOi8vQGRlZmF1bHQtanMvZGVmYXVsdGpzLWh0bWwtY29tcG9uZW50cy8uL25vZGVfbW9kdWxlcy9AZGVmYXVsdC1qcy9kZWZhdWx0anMtZXh0ZG9tL3NyYy9kb20vZXh0ZW50aW9ucy9RdWVyeVN1cHBvcnQuanMiLCJ3ZWJwYWNrOi8vQGRlZmF1bHQtanMvZGVmYXVsdGpzLWh0bWwtY29tcG9uZW50cy8uL25vZGVfbW9kdWxlcy9AZGVmYXVsdC1qcy9kZWZhdWx0anMtZXh0ZG9tL3NyYy9kb20vZXh0ZW50aW9ucy9SZWFkeUV2ZW50U3VwcG9ydC5qcyIsIndlYnBhY2s6Ly9AZGVmYXVsdC1qcy9kZWZhdWx0anMtaHRtbC1jb21wb25lbnRzLy4vbm9kZV9tb2R1bGVzL0BkZWZhdWx0LWpzL2RlZmF1bHRqcy1leHRkb20vc3JjL2RvbS9leHRlbnRpb25zL1Nob3dIaWRlU3VwcG9ydC5qcyIsIndlYnBhY2s6Ly9AZGVmYXVsdC1qcy9kZWZhdWx0anMtaHRtbC1jb21wb25lbnRzLy4vbm9kZV9tb2R1bGVzL0BkZWZhdWx0LWpzL2RlZmF1bHRqcy1leHRkb20vc3JjL2RvbS9leHRlbnRpb25zL1ZhbHVlU3VwcG9ydC5qcyIsIndlYnBhY2s6Ly9AZGVmYXVsdC1qcy9kZWZhdWx0anMtaHRtbC1jb21wb25lbnRzLy4vbm9kZV9tb2R1bGVzL0BkZWZhdWx0LWpzL2RlZmF1bHRqcy1leHRkb20vc3JjL2luZGV4LmpzIiwid2VicGFjazovL0BkZWZhdWx0LWpzL2RlZmF1bHRqcy1odG1sLWNvbXBvbmVudHMvLi9ub2RlX21vZHVsZXMvQGRlZmF1bHQtanMvZGVmYXVsdGpzLWV4dGRvbS9zcmMvdXRpbHMvRGVsZWdhdGVyQnVpbGRlci5qcyIsIndlYnBhY2s6Ly9AZGVmYXVsdC1qcy9kZWZhdWx0anMtaHRtbC1jb21wb25lbnRzLy4vbm9kZV9tb2R1bGVzL0BkZWZhdWx0LWpzL2RlZmF1bHRqcy1leHRkb20vc3JjL3V0aWxzL0V4dGVuZFByb3RvdHlwZS5qcyIsIndlYnBhY2s6Ly9AZGVmYXVsdC1qcy9kZWZhdWx0anMtaHRtbC1jb21wb25lbnRzLy4vbm9kZV9tb2R1bGVzL0BkZWZhdWx0LWpzL2RlZmF1bHRqcy1leHRkb20vc3JjL3V0aWxzL0V4dGVuZGVyLmpzIiwid2VicGFjazovL0BkZWZhdWx0LWpzL2RlZmF1bHRqcy1odG1sLWNvbXBvbmVudHMvLi9ub2RlX21vZHVsZXMvQGRlZmF1bHQtanMvZGVmYXVsdGpzLWV4dGRvbS9zcmMvdXRpbHMvVXRpbHMuanMiLCJ3ZWJwYWNrOi8vQGRlZmF1bHQtanMvZGVmYXVsdGpzLWh0bWwtY29tcG9uZW50cy8uL3NyYy9Db21wb25lbnQuanMiLCJ3ZWJwYWNrOi8vQGRlZmF1bHQtanMvZGVmYXVsdGpzLWh0bWwtY29tcG9uZW50cy8uL3NyYy9Db25zdGFudHMuanMiLCJ3ZWJwYWNrOi8vQGRlZmF1bHQtanMvZGVmYXVsdGpzLWh0bWwtY29tcG9uZW50cy8uL3NyYy9SZWFkeS5qcyIsIndlYnBhY2s6Ly9AZGVmYXVsdC1qcy9kZWZhdWx0anMtaHRtbC1jb21wb25lbnRzLy4vc3JjL3V0aWxzL0RlZmluZUNvbXBvbmVudEhlbHBlci5qcyIsIndlYnBhY2s6Ly9AZGVmYXVsdC1qcy9kZWZhdWx0anMtaHRtbC1jb21wb25lbnRzLy4vc3JjL3V0aWxzL0V2ZW50SGVscGVyLmpzIiwid2VicGFjazovL0BkZWZhdWx0LWpzL2RlZmF1bHRqcy1odG1sLWNvbXBvbmVudHMvLi9zcmMvdXRpbHMvTm9kZUhlbHBlci5qcyIsIndlYnBhY2s6Ly9AZGVmYXVsdC1qcy9kZWZhdWx0anMtaHRtbC1jb21wb25lbnRzLy4vc3JjL3V0aWxzL1N0eWxlSGVscGVyLmpzIiwid2VicGFjazovL0BkZWZhdWx0LWpzL2RlZmF1bHRqcy1odG1sLWNvbXBvbmVudHMvLi9zcmMvdXRpbHMvV2Vha0RhdGEuanMiLCJ3ZWJwYWNrOi8vQGRlZmF1bHQtanMvZGVmYXVsdGpzLWh0bWwtY29tcG9uZW50cy8uL3NyYy91dGlscy9pbmRleC5qcyIsIndlYnBhY2s6Ly9AZGVmYXVsdC1qcy9kZWZhdWx0anMtaHRtbC1jb21wb25lbnRzL3dlYnBhY2svYm9vdHN0cmFwIiwid2VicGFjazovL0BkZWZhdWx0LWpzL2RlZmF1bHRqcy1odG1sLWNvbXBvbmVudHMvd2VicGFjay9ydW50aW1lL2RlZmluZSBwcm9wZXJ0eSBnZXR0ZXJzIiwid2VicGFjazovL0BkZWZhdWx0LWpzL2RlZmF1bHRqcy1odG1sLWNvbXBvbmVudHMvd2VicGFjay9ydW50aW1lL2dsb2JhbCIsIndlYnBhY2s6Ly9AZGVmYXVsdC1qcy9kZWZhdWx0anMtaHRtbC1jb21wb25lbnRzL3dlYnBhY2svcnVudGltZS9oYXNPd25Qcm9wZXJ0eSBzaG9ydGhhbmQiLCJ3ZWJwYWNrOi8vQGRlZmF1bHQtanMvZGVmYXVsdGpzLWh0bWwtY29tcG9uZW50cy93ZWJwYWNrL3J1bnRpbWUvbWFrZSBuYW1lc3BhY2Ugb2JqZWN0Iiwid2VicGFjazovL0BkZWZhdWx0LWpzL2RlZmF1bHRqcy1odG1sLWNvbXBvbmVudHMvLi9icm93c2VyLmpzIl0sInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBcIkBkZWZhdWx0LWpzL2RlZmF1bHRqcy1leHRkb21cIjtcbmltcG9ydCB7U0VUVElOR30gZnJvbSBcIi4vc3JjL0NvbnN0YW50cy5qc1wiO1xuaW1wb3J0IHV0aWxzIGZyb20gXCIuL3NyYy91dGlscy9pbmRleC5qc1wiO1xuaW1wb3J0IFJlYWR5IGZyb20gXCIuL3NyYy9SZWFkeS5qc1wiO1xuaW1wb3J0IHtkZWZpbmV9IGZyb20gXCIuL3NyYy91dGlscy9EZWZpbmVDb21wb25lbnRIZWxwZXIuanNcIlxuaW1wb3J0IENvbXBvbmVudCwge2NvbXBvbmVudEJhc2VPZiwgY3JlYXRlVVVJRH0gZnJvbSBcIi4vc3JjL0NvbXBvbmVudFwiO1xuXG5cbmV4cG9ydCB7IHV0aWxzLCBSZWFkeSwgQ29tcG9uZW50LCBjb21wb25lbnRCYXNlT2YsZGVmaW5lLCBjcmVhdGVVVUlELCBTRVRUSU5HIH07XG4iLCJjb25zdCBHTE9CQUwgPSAoKCkgPT4ge1xyXG5cdGlmKHR5cGVvZiBnbG9iYWwgIT09IFwidW5kZWZpbmVkXCIpIHJldHVybiBnbG9iYWw7XHJcblx0aWYodHlwZW9mIHdpbmRvdyAhPT0gXCJ1bmRlZmluZWRcIikgcmV0dXJuIHdpbmRvdztcdFxyXG5cdGlmKHR5cGVvZiBzZWxmICE9PSBcInVuZGVmaW5lZFwiKSByZXR1cm4gc2VsZjtcclxuXHRyZXR1cm4ge307XHJcbn0pKCk7XHJcblxyXG5leHBvcnQgZGVmYXVsdCBHTE9CQUw7IiwiZXhwb3J0IGRlZmF1bHQgY2xhc3MgT2JqZWN0UHJvcGVydHkge1xyXG5cdGNvbnN0cnVjdG9yKGtleSwgY29udGV4dCl7XHJcblx0XHR0aGlzLmtleSA9IGtleTtcclxuXHRcdHRoaXMuY29udGV4dCA9IGNvbnRleHQ7XHJcblx0fVxyXG5cdFxyXG5cdGdldCBrZXlEZWZpbmVkKCl7XHJcblx0XHRyZXR1cm4gdGhpcy5rZXkgaW4gdGhpcy5jb250ZXh0OyBcclxuXHR9XHJcblx0XHJcblx0Z2V0IGhhc1ZhbHVlKCl7XHJcblx0XHRyZXR1cm4gISF0aGlzLmNvbnRleHRbdGhpcy5rZXldO1xyXG5cdH1cclxuXHRcclxuXHRnZXQgdmFsdWUoKXtcclxuXHRcdHJldHVybiB0aGlzLmNvbnRleHRbdGhpcy5rZXldO1xyXG5cdH1cclxuXHRcclxuXHRzZXQgdmFsdWUoZGF0YSl7XHJcblx0XHR0aGlzLmNvbnRleHRbdGhpcy5rZXldID0gZGF0YTtcclxuXHR9XHJcblx0XHJcblx0c2V0IGFwcGVuZChkYXRhKSB7XHJcblx0XHRpZighdGhpcy5oYXNWYWx1ZSlcclxuXHRcdFx0dGhpcy52YWx1ZSA9IGRhdGE7XHJcblx0XHRlbHNlIHtcclxuXHRcdFx0Y29uc3QgdmFsdWUgPSB0aGlzLnZhbHVlO1xyXG5cdFx0XHRpZih2YWx1ZSBpbnN0YW5jZW9mIEFycmF5KVxyXG5cdFx0XHRcdHZhbHVlLnB1c2goZGF0YSk7XHJcblx0XHRcdGVsc2VcclxuXHRcdFx0XHR0aGlzLnZhbHVlID0gW3RoaXMudmFsdWUsIGRhdGFdO1xyXG5cdFx0fVxyXG5cdH1cclxuXHRcclxuXHRyZW1vdmUoKXtcclxuXHRcdGRlbGV0ZSB0aGlzLmNvbnRleHRbdGhpcy5rZXldO1xyXG5cdH1cclxuXHRcclxuXHRzdGF0aWMgbG9hZChkYXRhLCBrZXksIGNyZWF0ZT10cnVlKSB7XHJcblx0XHRsZXQgY29udGV4dCA9IGRhdGE7XHJcblx0XHRjb25zdCBrZXlzID0ga2V5LnNwbGl0KFwiXFwuXCIpO1xyXG5cdFx0bGV0IG5hbWUgPSBrZXlzLnNoaWZ0KCkudHJpbSgpO1xyXG5cdFx0d2hpbGUoa2V5cy5sZW5ndGggPiAwKXtcclxuXHRcdFx0aWYoIWNvbnRleHRbbmFtZV0pe1xyXG5cdFx0XHRcdGlmKCFjcmVhdGUpXHJcblx0XHRcdFx0XHRyZXR1cm4gbnVsbDtcclxuXHRcdFx0XHRcclxuXHRcdFx0XHRjb250ZXh0W25hbWVdID0ge31cclxuXHRcdFx0fVxyXG5cdFx0XHRcclxuXHRcdFx0Y29udGV4dCA9IGNvbnRleHRbbmFtZV07XHJcblx0XHRcdG5hbWUgPSBrZXlzLnNoaWZ0KCkudHJpbSgpO1xyXG5cdFx0fVxyXG5cdFx0XHJcblx0XHRyZXR1cm4gbmV3IE9iamVjdFByb3BlcnR5KG5hbWUsIGNvbnRleHQpO1xyXG5cdH1cclxufTsiLCJpbXBvcnQgT2JqZWN0UHJvcGVydHkgZnJvbSBcIi4vT2JqZWN0UHJvcGVydHkuanNcIjtcclxuXHJcbmNvbnN0IGVxdWFsQXJyYXlTZXQgPSAoYSwgYikgPT4ge1xyXG5cdGlmIChhLmxlbmd0aCAhPT0gYi5sZW5ndGgpIHJldHVybiBmYWxzZTtcclxuXHRjb25zdCBsZW5ndGggPSBhLmxlbmd0aDtcclxuXHRmb3IgKGxldCBpID0gMDsgaSA8IGxlbmd0aDsgaSsrKVxyXG5cdFx0aWYgKCFlcXVhbFBvam8oYVtpXSwgYltpXSkpIHtcclxuXHRcdFx0Ly9jb25zb2xlLmxvZyhcImZhbHNlXCIpO1xyXG5cdFx0XHRyZXR1cm4gZmFsc2U7XHJcblx0XHR9XHJcblxyXG5cdHJldHVybiB0cnVlO1xyXG59O1xyXG5cclxuY29uc3QgZXF1YWxNYXAgPSAoYSwgYikgPT4ge1xyXG5cdGlmIChhLmxlbmd0aCAhPT0gYi5sZW5ndGgpIHJldHVybiBmYWxzZTtcclxuXHRmb3IgKGNvbnN0IGtleSBvZiBhLmtleXMoKSlcclxuXHRcdGlmICghZXF1YWxQb2pvKGEuZ2V0KGtleSksIGIuZ2V0KGtleSkpKSB7XHJcblx0XHRcdC8vY29uc29sZS5sb2coXCJmYWxzZVwiKTtcclxuXHRcdFx0cmV0dXJuIGZhbHNlO1xyXG5cdFx0fVxyXG5cclxuXHRyZXR1cm4gdHJ1ZTtcclxufTtcclxuXHJcbmNvbnN0IGVxdWFsQ2xhc3NlcyA9IChhLCBiKSA9PiB7XHJcblx0Y29uc3QgY2xhenpBID0gT2JqZWN0LmdldFByb3RvdHlwZU9mKGEpO1xyXG5cdGNvbnN0IGNsYXp6QiA9IE9iamVjdC5nZXRQcm90b3R5cGVPZihiKTtcclxuXHRpZiAoY2xhenpBICE9IGNsYXp6QikgcmV0dXJuIGZhbHNlO1xyXG5cclxuXHRpZiAoIWNsYXp6QSkgcmV0dXJuIHRydWU7XHJcblxyXG5cdGNvbnN0IHByb3BlcnRpZXNBID0gT2JqZWN0LmdldE93blByb3BlcnR5TmFtZXMoY2xhenpBKTtcclxuXHRjb25zdCBwcm9wZXJ0aWVzQiA9IE9iamVjdC5nZXRPd25Qcm9wZXJ0eU5hbWVzKGNsYXp6Qik7XHJcblxyXG5cdGlmIChwcm9wZXJ0aWVzQS5sZW5ndGggIT09IHByb3BlcnRpZXNCLmxlbmd0aCkgcmV0dXJuIGZhbHNlO1xyXG5cdGZvciAoY29uc3Qga2V5IG9mIHByb3BlcnRpZXNBKSB7XHJcblx0XHRjb25zdCB2YWx1ZUEgPSBhW2tleV07XHJcblx0XHRjb25zdCB2YWx1ZUIgPSBiW2tleV07XHJcblxyXG5cdFx0aWYgKCFlcXVhbFBvam8odmFsdWVBLCB2YWx1ZUIpKSByZXR1cm4gZmFsc2U7XHJcblx0fVxyXG5cdHJldHVybiB0cnVlO1xyXG59O1xyXG5cclxuY29uc3QgZXF1YWxPYmplY3QgPSAoYSwgYikgPT4ge1xyXG5cdGNvbnN0IHByb3BlcnRpZXNBID0gT2JqZWN0LmtleXMoYSk7XHJcblx0Y29uc3QgcHJvcGVydGllc0IgPSBPYmplY3Qua2V5cyhiKTtcclxuXHJcblx0aWYgKHByb3BlcnRpZXNBLmxlbmd0aCAhPT0gcHJvcGVydGllc0IubGVuZ3RoKSByZXR1cm4gZmFsc2U7XHJcblx0Zm9yIChjb25zdCBrZXkgb2YgcHJvcGVydGllc0EpIHtcclxuXHRcdGNvbnN0IHZhbHVlQSA9IGFba2V5XTtcclxuXHRcdGNvbnN0IHZhbHVlQiA9IGJba2V5XTtcclxuXHJcblx0XHRpZiAoIWVxdWFsUG9qbyh2YWx1ZUEsIHZhbHVlQikpIHJldHVybiBmYWxzZTtcclxuXHR9XHJcblx0cmV0dXJuIHRydWU7XHJcbn07XHJcblxyXG5leHBvcnQgY29uc3QgaXNOdWxsT3JVbmRlZmluZWQgPSAob2JqZWN0KSA9PiB7XHJcblx0cmV0dXJuIG9iamVjdCA9PSBudWxsIHx8IHR5cGVvZiBvYmplY3QgPT09IFwidW5kZWZpbmVkXCI7XHJcbn07XHJcblxyXG5leHBvcnQgY29uc3QgaXNQcmltaXRpdmUgPSAob2JqZWN0KSA9PiB7XHJcblx0aWYgKG9iamVjdCA9PSBudWxsKSByZXR1cm4gdHJ1ZTtcclxuXHJcblx0Y29uc3QgdHlwZSA9IHR5cGVvZiBvYmplY3Q7XHJcblx0c3dpdGNoICh0eXBlKSB7XHJcblx0XHRjYXNlIFwibnVtYmVyXCI6XHJcblx0XHRjYXNlIFwiYmlnaW50XCI6XHJcblx0XHRjYXNlIFwiYm9vbGVhblwiOlxyXG5cdFx0Y2FzZSBcInN0cmluZ1wiOlxyXG5cdFx0Y2FzZSBcInVuZGVmaW5lZFwiOlxyXG5cdFx0XHRyZXR1cm4gdHJ1ZTtcclxuXHR9XHJcblxyXG5cdHJldHVybiBmYWxzZTtcclxufTtcclxuXHJcbmV4cG9ydCBjb25zdCBpc09iamVjdCA9IChvYmplY3QpID0+IHtcclxuXHRpZihpc051bGxPclVuZGVmaW5lZChvYmplY3QpKVxyXG5cdFx0cmV0dXJuIGZhbHNlO1xyXG5cclxuXHRyZXR1cm4gdHlwZW9mIG9iamVjdCA9PT0gXCJvYmplY3RcIiAmJiAoIW9iamVjdC5jb25zdHJ1Y3RvciB8fCBvYmplY3QuY29uc3RydWN0b3IubmFtZSA9PT0gXCJPYmplY3RcIik7XHJcbn07XHJcblxyXG4vKipcclxuICogZXF1YWxQb2pvIC0+IGNvbXBhcmVzIG9ubHkgcG9qb3MsIGFycmF5LCBzZXQsIG1hcCBhbmQgcHJpbWl0aXZlc1xyXG4gKi9cclxuZXhwb3J0IGNvbnN0IGVxdWFsUG9qbyA9IChhLCBiKSA9PiB7XHJcblx0Y29uc3QgbnVsbEEgPSBpc051bGxPclVuZGVmaW5lZChhKTtcclxuXHRjb25zdCBudWxsQiA9IGlzTnVsbE9yVW5kZWZpbmVkKGIpO1xyXG5cdGlmIChudWxsQSB8fCBudWxsQikgcmV0dXJuIGEgPT09IGI7XHJcblxyXG5cdGlmIChpc1ByaW1pdGl2ZShhKSB8fCBpc1ByaW1pdGl2ZShiKSkgcmV0dXJuIGEgPT09IGI7XHJcblxyXG5cdGNvbnN0IHR5cGVBID0gdHlwZW9mIGE7XHJcblx0Y29uc3QgdHlwZUIgPSB0eXBlb2YgYjtcclxuXHRpZiAodHlwZUEgIT0gdHlwZUIpIHJldHVybiBmYWxzZTtcclxuXHRpZiAodHlwZUEgPT09IFwiZnVuY3Rpb25cIikgcmV0dXJuIGEgPT09IGI7XHJcblx0Ly9pZiAoYS5jb25zdHJ1Y3RvciAhPT0gYi5jb25zdHJ1Y3RvcikgcmV0dXJuIGZhbHNlO1xyXG5cdC8vaWYgKGEgaW5zdGFuY2VvZiBBcnJheSB8fCBhIGluc3RhbmNlb2YgU2V0KSByZXR1cm4gZXF1YWxBcnJheVNldChhLCBiKTtcclxuXHQvL2lmIChhIGluc3RhbmNlb2YgTWFwKSByZXR1cm4gZXF1YWxNYXAoYSwgYik7XHJcblxyXG5cdHJldHVybiBlcXVhbE9iamVjdChhLCBiKSAmJiBlcXVhbENsYXNzZXMoYSwgYik7XHJcbn07XHJcblxyXG4vKipcclxuICogY2hlY2tlZCBpZiBhbiBvYmplY3QgYSBzaW1wbGUgb2JqZWN0LiBObyBBcnJheSwgTWFwIG9yIHNvbWV0aGluZyBlbHNlLlxyXG4gKlxyXG4gKiBAcGFyYW0gYU9iamVjdDpvYmplY3QgdGhlIG9iamVjdCB0byBiZSB0ZXN0aW5nXHJcbiAqXHJcbiAqIEByZXR1cm4gYm9vbGVhblxyXG4gKi9cclxuZXhwb3J0IGNvbnN0IGlzUG9qbyA9IChvYmplY3QpID0+IHtcclxuXHRpZiAoIWlzT2JqZWN0KG9iamVjdCkpIHJldHVybiBmYWxzZTtcclxuXHJcblx0Zm9yIChjb25zdCBrZXkgaW4gb2JqZWN0KSB7XHJcblx0XHRjb25zdCB2YWx1ZSA9IG9iamVjdFtrZXldO1xyXG5cdFx0aWYgKHR5cGVvZiB2YWx1ZSA9PT0gXCJmdW5jdGlvblwiKSByZXR1cm4gZmFsc2U7XHJcblx0fVxyXG5cclxuXHRyZXR1cm4gdHJ1ZTtcclxufTtcclxuXHJcbi8qKlxyXG4gKiBhcHBlbmQgYSBwcm9wZXJ5IHZhbHVlIHRvIGFuIG9iamVjdC4gSWYgcHJvcGVyeSBleGlzdHMgaXRzIHdvdWxkIGJlIGNvbnZlcnRlZCB0byBhbiBhcnJheVxyXG4gKlxyXG4gKiAgQHBhcmFtIGFLZXk6c3RyaW5nIG5hbWUgb2YgcHJvcGVydHlcclxuICogIEBwYXJhbSBhRGF0YTphbnkgcHJvcGVydHkgdmFsdWVcclxuICogIEBwYXJhbSBhT2JqZWN0Om9iamVjdCB0aGUgb2JqZWN0IHRvIGFwcGVuZCB0aGUgcHJvcGVydHlcclxuICpcclxuICogIEByZXR1cm4gcmV0dXJucyB0aGUgY2hhbmdlZCBvYmplY3RcclxuICovXHJcbmV4cG9ydCBjb25zdCBhcHBlbmQgPSBmdW5jdGlvbiAoYUtleSwgYURhdGEsIGFPYmplY3QpIHtcclxuXHRpZiAodHlwZW9mIGFEYXRhICE9PSBcInVuZGVmaW5lZFwiKSB7XHJcblx0XHRjb25zdCBwcm9wZXJ0eSA9IE9iamVjdFByb3BlcnR5LmxvYWQoYU9iamVjdCwgYUtleSwgdHJ1ZSk7XHJcblx0XHRwcm9wZXJ0eS5hcHBlbmQgPSBhRGF0YTtcclxuXHR9XHJcblx0cmV0dXJuIGFPYmplY3Q7XHJcbn07XHJcblxyXG4vKipcclxuICogbWVyZ2luZyBvYmplY3QgaW50byBhIHRhcmdldCBvYmplY3QuIEl0cyBvbmx5IG1lcmdlIHNpbXBsZSBvYmplY3QgYW5kIHN1YiBvYmplY3RzLiBFdmVyeSBvdGhlclxyXG4gKiB2YWx1ZSB3b3VsZCBiZSByZXBsYWNlZCBieSB2YWx1ZSBmcm9tIHRoZSBzb3VyY2Ugb2JqZWN0LlxyXG4gKlxyXG4gKiBzYW1wbGU6IG1lcmdlKHRhcmdldCwgc291cmNlLTEsIHNvdXJjZS0yLCAuLi5zb3VyY2UtbilcclxuICpcclxuICogQHBhcmFtIHRhcmdldDpvYmplY3QgdGhlIHRhcmdldCBvYmplY3QgdG8gbWVyZ2luZyBpbnRvXHJcbiAqIEBwYXJhbSBzb3VyY2VzOm9iamVjdFxyXG4gKlxyXG4gKiBAcmV0dXJuIG9iamVjdCByZXR1cm5zIHRoZSB0YXJnZXQgb2JqZWN0XHJcbiAqL1xyXG5leHBvcnQgY29uc3QgbWVyZ2UgPSBmdW5jdGlvbiAodGFyZ2V0LCAuLi5zb3VyY2VzKSB7XHJcblx0aWYgKCF0YXJnZXQpIHRhcmdldCA9IHt9O1xyXG5cclxuXHRmb3IgKGxldCBzb3VyY2Ugb2Ygc291cmNlcykge1xyXG5cdFx0aWYgKGlzUG9qbyhzb3VyY2UpKSB7XHJcblx0XHRcdE9iamVjdC5nZXRPd25Qcm9wZXJ0eU5hbWVzKHNvdXJjZSkuZm9yRWFjaCgoa2V5KSA9PiB7XHJcblx0XHRcdFx0aWYgKGlzUG9qbyh0YXJnZXRba2V5XSkpIG1lcmdlKHRhcmdldFtrZXldLCBzb3VyY2Vba2V5XSk7XHJcblx0XHRcdFx0ZWxzZSB0YXJnZXRba2V5XSA9IHNvdXJjZVtrZXldO1xyXG5cdFx0XHR9KTtcclxuXHRcdH1cclxuXHR9XHJcblxyXG5cdHJldHVybiB0YXJnZXQ7XHJcbn07XHJcblxyXG5jb25zdCBidWlsZFByb3BlcnR5RmlsdGVyID0gZnVuY3Rpb24gKHsgbmFtZXMsIGFsbG93ZWQgfSkge1xyXG5cdHJldHVybiAobmFtZSwgdmFsdWUsIGNvbnRleHQpID0+IHtcclxuXHRcdHJldHVybiBuYW1lcy5pbmNsdWRlcyhuYW1lKSA9PT0gYWxsb3dlZDtcclxuXHR9O1xyXG59O1xyXG5cclxuZXhwb3J0IGNvbnN0IGZpbHRlciA9IGZ1bmN0aW9uICgpIHtcclxuXHRjb25zdCBbZGF0YSwgcHJvcEZpbHRlciwgeyBkZWVwID0gZmFsc2UsIHJlY3Vyc2l2ZSA9IHRydWUsIHBhcmVudHMgPSBbXSB9ID0ge31dID0gYXJndW1lbnRzO1xyXG5cdGNvbnN0IHJlc3VsdCA9IHt9O1xyXG5cclxuXHRmb3IgKGxldCBuYW1lIGluIGRhdGEpIHtcclxuXHRcdGNvbnN0IHZhbHVlID0gZGF0YVtuYW1lXTtcclxuXHRcdGNvbnN0IGFjY2VwdCA9IHByb3BGaWx0ZXIobmFtZSwgdmFsdWUsIGRhdGEpO1xyXG5cdFx0aWYgKGFjY2VwdCAmJiAoIWRlZXAgfHwgdmFsdWUgPT09IG51bGwgfHwgdmFsdWUgPT09IHVuZGVmaW5lZCkpIHJlc3VsdFtuYW1lXSA9IHZhbHVlO1xyXG5cdFx0ZWxzZSBpZiAoYWNjZXB0ICYmIGRlZXApIHtcclxuXHRcdFx0Y29uc3QgdHlwZSA9IHR5cGVvZiB2YWx1ZTtcclxuXHRcdFx0aWYgKHR5cGUgIT09IFwib2JqZWN0XCIgfHwgdmFsdWUgaW5zdGFuY2VvZiBBcnJheSB8fCB2YWx1ZSBpbnN0YW5jZW9mIE1hcCB8fCB2YWx1ZSBpbnN0YW5jZW9mIFNldCB8fCB2YWx1ZSBpbnN0YW5jZW9mIFJlZ0V4cCB8fCBwYXJlbnRzLmluY2x1ZGVzW3ZhbHVlXSB8fCB2YWx1ZSA9PSBkYXRhKSByZXN1bHRbbmFtZV0gPSB2YWx1ZTtcclxuXHRcdFx0ZWxzZSByZXN1bHRbbmFtZV0gPSBmaWx0ZXIodmFsdWUsIHByb3BGaWx0ZXIsIHsgZGVlcCwgcmVjdXJzaXZlLCBwYXJlbnRzOiBwYXJlbnRzLmNvbmNhdChkYXRhKSB9KTtcclxuXHRcdH1cclxuXHR9XHJcblxyXG5cdHJldHVybiByZXN1bHQ7XHJcbn07XHJcblxyXG5leHBvcnQgY29uc3QgZGVmVmFsdWUgPSAobywgbmFtZSwgdmFsdWUpID0+IHtcclxuXHRPYmplY3QuZGVmaW5lUHJvcGVydHkobywgbmFtZSwge1xyXG5cdFx0dmFsdWUsXHJcblx0XHR3cml0YWJsZTogZmFsc2UsXHJcblx0XHRjb25maWd1cmFibGU6IGZhbHNlLFxyXG5cdFx0ZW51bWVyYWJsZTogZmFsc2UsXHJcblx0fSk7XHJcbn07XHJcbmV4cG9ydCBjb25zdCBkZWZHZXQgPSAobywgbmFtZSwgZ2V0KSA9PiB7XHJcblx0T2JqZWN0LmRlZmluZVByb3BlcnR5KG8sIG5hbWUsIHtcclxuXHRcdGdldCxcclxuXHRcdGNvbmZpZ3VyYWJsZTogZmFsc2UsXHJcblx0XHRlbnVtZXJhYmxlOiBmYWxzZSxcclxuXHR9KTtcclxufTtcclxuXHJcbmV4cG9ydCBjb25zdCBkZWZHZXRTZXQgPSAobywgbmFtZSwgZ2V0LCBzZXQpID0+IHtcclxuXHRPYmplY3QuZGVmaW5lUHJvcGVydHkobywgbmFtZSwge1xyXG5cdFx0Z2V0LFxyXG5cdFx0c2V0LFxyXG5cdFx0Y29uZmlndXJhYmxlOiBmYWxzZSxcclxuXHRcdGVudW1lcmFibGU6IGZhbHNlLFxyXG5cdH0pO1xyXG59O1xyXG5cclxuZXhwb3J0IGRlZmF1bHQge1xyXG5cdGlzTnVsbE9yVW5kZWZpbmVkLFxyXG5cdGlzT2JqZWN0LFxyXG5cdGVxdWFsUG9qbyxcclxuXHRpc1Bvam8sXHJcblx0YXBwZW5kLFxyXG5cdG1lcmdlLFxyXG5cdGZpbHRlcixcclxuXHRidWlsZFByb3BlcnR5RmlsdGVyLFxyXG5cdGRlZlZhbHVlLFxyXG5cdGRlZkdldCxcclxuXHRkZWZHZXRTZXQsXHJcbn07XHJcbiIsImltcG9ydCB7ZGVmVmFsdWUsIGRlZkdldH0gZnJvbSBcIi4vT2JqZWN0VXRpbHNcIlxyXG5cclxuZXhwb3J0IGNvbnN0IHRpbWVvdXRQcm9taXNlID0gKGZuLCBtcykgPT57XHJcblx0bGV0IGNhbmNlbGVkID0gZmFsc2U7XHJcblx0bGV0IHRpbWVvdXQgPSBudWxsO1xyXG5cdGNvbnN0IHByb21pc2UgPSBuZXcgUHJvbWlzZSgociwgZSkgPT4ge1xyXG5cdFx0dGltZW91dCA9IHNldFRpbWVvdXQoKCk9PiB7XHJcblx0XHRcdHRpbWVvdXQgPSBudWxsO1xyXG5cdFx0XHRmbihyLGUpO1xyXG5cdFx0fSwgbXMpXHJcblx0fSk7XHJcblxyXG5cdGNvbnN0IHRoZW4gPSBwcm9taXNlLnRoZW47XHJcblx0cHJvbWlzZS50aGVuID0gKGZuKSA9PiB7XHJcblx0XHR0aGVuLmNhbGwocHJvbWlzZSwgKHJlc3VsdCkgPT4ge1xyXG5cdFx0XHRpZighdGhpcy5jYW5jZWxlZClcclxuXHRcdFx0XHRyZXR1cm4gZm4ocmVzdWx0KTtcclxuXHRcdH0pO1xyXG5cdH1cclxuXHJcblx0ZGVmVmFsdWUocHJvbWlzZSwgXCJjYW5jZWxcIiwgKCkgPT4ge1xyXG5cdFx0aWYodGltZW91dCl7XHJcblx0XHRcdGNsZWFyVGltZW91dCh0aW1lb3V0KTtcclxuXHRcdFx0Y2FuY2VsZWQgPSB0cnVlO1xyXG5cdFx0fVxyXG5cdH0pO1xyXG5cdGRlZkdldChwcm9taXNlLCBjYW5jZWxkLCAoKSA9PiBjYW5jZWxlZCk7XHJcblxyXG5cdHJldHVybiBwcm9taXNlO1xyXG59XHJcblxyXG5cclxuZXhwb3J0IGNvbnN0IGxhenlQcm9taXNlID0gKCkgPT4ge1xyXG5cdFx0bGV0IHByb21pc2VSZXNvbHZlID0gbnVsbDtcclxuXHRcdGxldCBwcm9taXNlRXJyb3IgPSBudWxsO1xyXG5cclxuXHRcdGNvbnN0IHByb21pc2UgPSBuZXcgUHJvbWlzZSgociwgZSkgPT4ge1xyXG5cdFx0XHRwcm9taXNlUmVzb2x2ZSA9IHI7XHJcblx0XHRcdHByb21pc2VFcnJvciA9IGU7XHJcblx0XHR9KTtcclxuXHJcblx0XHRsZXQgcmVzb2x2ZWQgPSBmYWxzZTtcclxuXHRcdGxldCBlcnJvciA9IGZhbHNlO1xyXG5cdFx0bGV0IHZhbHVlID0gdW5kZWZpbmVkO1xyXG5cclxuXHRcdGRlZlZhbHVlKHByb21pc2UsIFwicmVzb2x2ZVwiLCAocmVzdWx0KSA9PiB7XHJcblx0XHRcdHZhbHVlID0gcmVzdWx0O1xyXG5cdFx0XHRyZXNvbHZlZCA9IHRydWU7XHJcblx0XHRcdGlmICh2YWx1ZSBpbnN0YW5jZW9mIEVycm9yKSB7XHJcblx0XHRcdFx0ZXJyb3IgPSB0cnVlO1xyXG5cdFx0XHRcdHByb21pc2VFcnJvcih2YWx1ZSk7XHJcblx0XHRcdH0gZWxzZSBwcm9taXNlUmVzb2x2ZSh2YWx1ZSk7XHJcblx0XHR9KTtcclxuXHJcblx0XHRkZWZHZXQocHJvbWlzZSwgXCJ2YWx1ZVwiLCAoKSA9PiB2YWx1ZSk7XHJcblx0XHRkZWZHZXQocHJvbWlzZSwgXCJlcnJvclwiLCAoKSA9PiBlcnJvcik7XHJcblx0XHRkZWZHZXQocHJvbWlzZSwgXCJyZXNvbHZlZFwiLCAoKSA9PiByZXNvbHZlZCk7XHJcblxyXG5cdFx0cmV0dXJuIHByb21pc2U7XHJcbn07XHJcbmV4cG9ydCBkZWZhdWx0IHtcclxuXHRsYXp5UHJvbWlzZSxcclxuXHR0aW1lb3V0UHJvbWlzZVxyXG59XHJcbiIsIi8vdGhlIHNvbHV0aW9uIGlzIGZvdW5kIGhlcmU6IGh0dHBzOi8vc3RhY2tvdmVyZmxvdy5jb20vcXVlc3Rpb25zLzEwNTAzNC9ob3ctdG8tY3JlYXRlLWEtZ3VpZC11dWlkXHJcbmV4cG9ydCBjb25zdCBVVUlEX1NDSEVNQSA9IFwieHh4eHh4eHgteHh4eC00eHh4LXl4eHgteHh4eHh4eHh4eHh4XCI7XHJcblxyXG5leHBvcnQgY29uc3QgdXVpZCA9ICgpID0+IHtcclxuXHRjb25zdCBidWYgPSBuZXcgVWludDMyQXJyYXkoNCk7XHJcblx0d2luZG93LmNyeXB0by5nZXRSYW5kb21WYWx1ZXMoYnVmKTtcclxuXHRsZXQgaWR4ID0gLTE7XHJcblx0cmV0dXJuIFVVSURfU0NIRU1BLnJlcGxhY2UoL1t4eV0vZywgKGMpID0+IHtcclxuXHRcdGlkeCsrO1xyXG5cdFx0Y29uc3QgciA9IChidWZbaWR4ID4+IDNdID4+ICgoaWR4ICUgOCkgKiA0KSkgJiAxNTtcclxuXHRcdGNvbnN0IHYgPSBjID09IFwieFwiID8gciA6IChyICYgMHgzKSB8IDB4ODtcclxuXHRcdHJldHVybiB2LnRvU3RyaW5nKDE2KTtcclxuXHR9KTtcclxufTtcclxuXHJcbmV4cG9ydCBkZWZhdWx0IHsgdXVpZCB9O1xyXG4iLCJpbXBvcnQgXCIuL3NyY1wiOyIsImltcG9ydCBVdGlscywge0dMT0JBTH0gZnJvbSBcIi4vdXRpbHMvVXRpbHNcIjtcclxuaW1wb3J0IHsgUkVBRFlFVkVOVCB9IGZyb20gXCIuL2RvbS9leHRlbnRpb25zL1JlYWR5RXZlbnRTdXBwb3J0XCI7XHJcblxyXG5HTE9CQUwuZGVmYXVsdGpzID0gR0xPQkFMLmRlZmF1bHRqcyB8fCB7fTtcclxuR0xPQkFMLmRlZmF1bHRqcy5leHRkb20gPSBHTE9CQUwuZGVmYXVsdGpzLmV4dGRvbSB8fCB7XHJcblx0VkVSU0lPTiA6IFwiJHt2ZXJzaW9ufVwiLFxyXG5cdFJFQURZRVZFTlQgOiBSRUFEWUVWRU5ULFxyXG5cdHV0aWxzIDoge1xyXG5cdFx0VXRpbHM6IFV0aWxzXHJcblx0fVxyXG59O1xyXG5cclxuR0xPQkFMLmZpbmQgPSBmdW5jdGlvbigpIHtcclxuXHRyZXR1cm4gZG9jdW1lbnQuZmluZC5hcHBseShkb2N1bWVudCwgYXJndW1lbnRzKTtcclxufTtcclxuXHJcbkdMT0JBTC5yZWFkeSA9IGZ1bmN0aW9uKCkge1xyXG5cdHJldHVybiBkb2N1bWVudC5yZWFkeS5hcHBseShkb2N1bWVudCwgYXJndW1lbnRzKTtcclxufTtcclxuXHJcbkdMT0JBTC5jcmVhdGUgPSBmdW5jdGlvbihhQ29udGVudCwgYXNUZW1wbGF0ZSkge1xyXG5cdGlmICh0eXBlb2YgYXJndW1lbnRzWzBdICE9PSBcInN0cmluZ1wiKVxyXG5cdFx0dGhyb3cgbmV3IEVycm9yKFwiVGhlIGZpcnN0IGFyZ3VtZW50IG11c3QgYmUgYSBzdHJpbmchXCIpO1xyXG5cdFxyXG5cdGNvbnN0IHRlbXBsYXRlID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcInRlbXBsYXRlXCIpO1xyXG5cdHRlbXBsYXRlLmlubmVySFRNTCA9IGFDb250ZW50O1xyXG5cdGlmKGFzVGVtcGxhdGUpXHJcblx0XHRyZXR1cm4gdGVtcGxhdGU7XHJcblx0XHJcblx0cmV0dXJuIGRvY3VtZW50LmltcG9ydE5vZGUodGVtcGxhdGUuY29udGVudCwgdHJ1ZSkuY2hpbGROb2RlcztcclxufTtcclxuXHJcbkdMT0JBTC5zY3JpcHQgPSBmdW5jdGlvbihhRmlsZSwgYVRhcmdldCkge1xyXG5cdGlmKGFGaWxlIGluc3RhbmNlb2YgQXJyYXkpXHJcblx0XHRyZXR1cm4gUHJvbWlzZS5hbGwoYUZpbGUubWFwKGZpbGUgPT4gR0xPQkFMLnNjcmlwdChmaWxlLCBhVGFyZ2V0KSkpO1xyXG5cdFxyXG5cdGlmKHR5cGVvZiBhRmlsZSA9PT0gXCJzdHJpbmdcIilcdFxyXG5cdFx0cmV0dXJuIG5ldyBQcm9taXNlKChyLGUpID0+IHtcclxuXHRcdFx0Y29uc3Qgc2NyaXB0ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcInNjcmlwdFwiKTtcclxuXHRcdFx0c2NyaXB0LmFzeW5jID0gdHJ1ZTtcclxuXHRcdFx0c2NyaXB0Lm9ubG9hZCA9IGZ1bmN0aW9uKCl7cigpfTtcclxuXHRcdFx0c2NyaXB0Lm9uZXJyb3IgPSBmdW5jdGlvbigpe3Rocm93IG5ldyBFcnJvcihcImxvYWQgZXJyb3IhXCIpfTtcclxuXHRcdFx0IWFUYXJnZXQgPyBkb2N1bWVudC5ib2R5LmFwcGVuZChzY3JpcHQpIDogYVRhcmdldC5hcHBlbmQoc2NyaXB0KTtcclxuXHRcdFx0c2NyaXB0LnNyYyA9IGFGaWxlO1xyXG5cdFx0fSk7XHJcblx0ZWxzZVxyXG5cdFx0cmV0dXJuIFByb21pc2UucmVqZWN0KFwiRmlyc3QgcGFyYW1ldGVyIG11c3QgYmUgYW4gYXJyYXkgb2Ygc3RyaW5ncyBvciBhIHN0cmluZyFcIik7XHJcbn07IiwiLyoqXHJcbiAqIEFkZHMgcXVlcnkgYW5kIHJlYWR5IGZ1bmN0aW9ucyB0byBEb2N1bWVudCwgYW5kIHRyaWdnZXJzIHRoZSByZWFkeSBldmVudC5cclxuICpcclxuICogVGhlIGV2ZW50IGlzIHRyaWdnZXJlZCBvbmNlIHRoZSBkb20gaXMgcGFyc2VkLiBBIHJlYWR5IGZ1bmN0aW9uIHJlZ2lzdGVyZWRcclxuICogYWZ0ZXIgdGhhdCBpcyBub3QgbG9zdCwgYXMgcmVhZHkoKSB0cmlnZ2VycyB0aGUgZXZlbnQgYWdhaW4gd2hlbiB0aGUgZG9jdW1lbnRcclxuICogaXMgYWxyZWFkeSBjb21wbGV0ZS5cclxuICovXHJcbmltcG9ydCBleHRlbmRQcm90b3R5cGUgZnJvbSBcIi4uL3V0aWxzL0V4dGVuZFByb3RvdHlwZVwiO1xyXG5pbXBvcnQgUXVlcnlTdXBwb3J0IGZyb20gXCIuL2V4dGVudGlvbnMvUXVlcnlTdXBwb3J0XCI7XHJcbmltcG9ydCBSZWFkeUV2ZW50U3VwcG9ydCwgeyBSRUFEWUVWRU5UIH0gZnJvbSBcIi4vZXh0ZW50aW9ucy9SZWFkeUV2ZW50U3VwcG9ydFwiO1xyXG5cclxuZXh0ZW5kUHJvdG90eXBlKERvY3VtZW50LCBRdWVyeVN1cHBvcnQsIFJlYWR5RXZlbnRTdXBwb3J0KTtcclxuXHJcbmRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoXCJET01Db250ZW50TG9hZGVkXCIsICgpID0+IGRvY3VtZW50LnRyaWdnZXIoUkVBRFlFVkVOVCkpO1xyXG5cclxuXHJcblxyXG4iLCIvKipcclxuICogQWRkcyBxdWVyeSBhbmQgY29udGVudCBmdW5jdGlvbnMgdG8gRG9jdW1lbnRGcmFnbWVudC5cclxuICpcclxuICogQSBTaGFkb3dSb290IGlzIGEgRG9jdW1lbnRGcmFnbWVudCwgc28gYSBzaGFkb3cgcm9vdCBjYW4gYmUgc2VhcmNoZWQgYW5kIGZpbGxlZFxyXG4gKiB0aGUgc2FtZSB3YXkgYXMgdGhlIGZyYWdtZW50IGNyZWF0ZSgpIHJldHVybnMuXHJcbiAqL1xyXG5pbXBvcnQgZXh0ZW5kUHJvdG90eXBlIGZyb20gXCIuLi91dGlscy9FeHRlbmRQcm90b3R5cGVcIjtcclxuaW1wb3J0IFF1ZXJ5U3VwcG9ydCBmcm9tIFwiLi9leHRlbnRpb25zL1F1ZXJ5U3VwcG9ydFwiO1xyXG5pbXBvcnQgTWFuaXB1bGF0aW9uU3VwcG9ydCBmcm9tIFwiLi9leHRlbnRpb25zL01hbmlwdWxhdGlvblN1cHBvcnRcIjtcclxuXHJcbmV4dGVuZFByb3RvdHlwZShEb2N1bWVudEZyYWdtZW50LCBRdWVyeVN1cHBvcnQsIE1hbmlwdWxhdGlvblN1cHBvcnQpO1xyXG5cclxuXHJcblxyXG5cclxuIiwiLyoqXHJcbiAqIEFkZHMgcXVlcnksIGF0dHJpYnV0ZSBhbmQgY29udGVudCBmdW5jdGlvbnMgdG8gRWxlbWVudC5cclxuICpcclxuICogUXVlcnkgYW5kIGF0dHJpYnV0ZSBmdW5jdGlvbnMgbmVlZCBhIHNlbGVjdGFibGUgbm9kZSwgd2hpY2ggaXMgd2h5IHRoZXkgc2l0XHJcbiAqIGhlcmUgYW5kIG5vdCBvbiBOb2RlLiBNYW5pcHVsYXRpb25TdXBwb3J0IGlzIGFwcGxpZWQgYWdhaW4gYWx0aG91Z2ggRWxlbWVudFxyXG4gKiBpbmhlcml0cyBpdCBmcm9tIE5vZGUgLSB0aGF0IHB1dHMgdGhlIGZ1bmN0aW9ucyBvbiBFbGVtZW50IGFzIG93biBwcm9wZXJ0aWVzLFxyXG4gKiB3aGVyZSB0aGUgZXh0ZW5zaW9ucyBvZiB0aGUgbW9yZSBzcGVjaWZpYyBodG1sIHR5cGVzIGNhbiBmaW5kIHRoZW0uXHJcbiAqL1xyXG5pbXBvcnQgZXh0ZW5kUHJvdG90eXBlIGZyb20gXCIuLi91dGlscy9FeHRlbmRQcm90b3R5cGVcIjtcclxuaW1wb3J0IFF1ZXJ5U3VwcG9ydCBmcm9tIFwiLi9leHRlbnRpb25zL1F1ZXJ5U3VwcG9ydFwiO1xyXG5pbXBvcnQgQXR0cmlidXRlU3VwcG9ydCBmcm9tIFwiLi9leHRlbnRpb25zL0F0dHJpYnV0ZVN1cHBvcnRcIjtcclxuaW1wb3J0IE1hbmlwdWxhdGlvblN1cHBvcnQgZnJvbSBcIi4vZXh0ZW50aW9ucy9NYW5pcHVsYXRpb25TdXBwb3J0XCI7XHJcblxyXG5leHRlbmRQcm90b3R5cGUoRWxlbWVudCxRdWVyeVN1cHBvcnQsIEF0dHJpYnV0ZVN1cHBvcnQsIE1hbmlwdWxhdGlvblN1cHBvcnQpOyIsIi8qKlxuICogQWRkcyB0aGUgZXZlbnQgZnVuY3Rpb25zIHRvIEV2ZW50VGFyZ2V0LlxuICpcbiAqIEV2ZW50VGFyZ2V0IGlzIHRoZSByb290IG9mIGV2ZXJ5dGhpbmcgZGlzcGF0Y2hpbmcgZXZlbnRzLCBub3Qgb25seSBvZiB0aGUgZG9tLFxuICogc28gb24oKSwgcmVtb3ZlT24oKSBhbmQgdHJpZ2dlcigpIGFyZSBhdmFpbGFibGUgb24gZXZlcnkgbm9kZSwgb24gdGhlIGRvY3VtZW50XG4gKiBhbmQgb24gdGhlIHdpbmRvdyBhbGlrZS5cbiAqL1xuaW1wb3J0IGV4dGVuZFByb3RvdHlwZSBmcm9tIFwiLi4vdXRpbHMvRXh0ZW5kUHJvdG90eXBlXCI7XG5pbXBvcnQgRXZlbnRTdXBwb3J0IGZyb20gXCIuL2V4dGVudGlvbnMvRXZlbnRTdXBwb3J0XCI7XG5cbmV4dGVuZFByb3RvdHlwZShFdmVudFRhcmdldCwgRXZlbnRTdXBwb3J0KTsiLCIvKipcclxuICogQWRkcyBjbGFzcyBhbmQgdmlzaWJpbGl0eSBmdW5jdGlvbnMgdG8gSFRNTEVsZW1lbnQuXHJcbiAqXHJcbiAqIEJvdGggd29yayBvbiB0aGUgc3R5bGUgYW5kIHRoZSBjbGFzc0xpc3Qgb2YgYSBodG1sIGVsZW1lbnQsIHdoaWNoIGlzIHdoeSB0aGV5XHJcbiAqIHNpdCBoZXJlIGFuZCBub3Qgb24gRWxlbWVudCAtIGFuIHN2ZyBlbGVtZW50IGhhcyBuZWl0aGVyIGluIHRoZSBzYW1lIHdheS5cclxuICovXHJcbmltcG9ydCBleHRlbmRQcm90b3R5cGUgZnJvbSBcIi4uL3V0aWxzL0V4dGVuZFByb3RvdHlwZVwiO1xyXG5pbXBvcnQgSHRtbENsYXNzU3VwcG9ydCBmcm9tIFwiLi9leHRlbnRpb25zL0h0bWxDbGFzc1N1cHBvcnRcIjtcclxuaW1wb3J0IFNob3dIaWRlU3VwcG9ydCBmcm9tIFwiLi9leHRlbnRpb25zL1Nob3dIaWRlU3VwcG9ydFwiO1xyXG5cclxuXHJcbmV4dGVuZFByb3RvdHlwZShIVE1MRWxlbWVudCwgSHRtbENsYXNzU3VwcG9ydCwgU2hvd0hpZGVTdXBwb3J0KTsiLCIvKipcclxuICogQWRkcyB2YWwoKSB0byBIVE1MSW5wdXRFbGVtZW50LlxyXG4gKlxyXG4gKiBWYWx1ZVN1cHBvcnQgcGlja3MgdGhlIGhhbmRsaW5nIGJ5IHRoZSB0eXBlIG9mIHRoZSBpbnB1dCwgc28gYSBjaGVja2JveCBhbmQgYVxyXG4gKiByYWRpbyBhcmUgcmVhZCBieSB0aGVpciBjaGVja2VkIHN0YXRlIHdoaWxlIGV2ZXJ5IG90aGVyIGlucHV0IGlzIHJlYWQgYnkgaXRzXHJcbiAqIHZhbHVlLlxyXG4gKi9cclxuaW1wb3J0IGV4dGVuZFByb3RvdHlwZSBmcm9tIFwiLi4vdXRpbHMvRXh0ZW5kUHJvdG90eXBlXCI7XHJcbmltcG9ydCBWYWx1ZVN1cHBvcnQgZnJvbSBcIi4vZXh0ZW50aW9ucy9WYWx1ZVN1cHBvcnRcIjtcclxuXHJcblxyXG5leHRlbmRQcm90b3R5cGUoSFRNTElucHV0RWxlbWVudCxWYWx1ZVN1cHBvcnQpOyIsIi8qKlxyXG4gKiBBZGRzIHZhbCgpIHRvIEhUTUxTZWxlY3RFbGVtZW50LlxyXG4gKlxyXG4gKiBWYWx1ZVN1cHBvcnQgcmVhZHMgYSBzZWxlY3QgYnkgaXRzIHNlbGVjdGVkIG9wdGlvbnMsIHNvIHZhbCgpIGdpdmVzIGFuIGFycmF5IG9mXHJcbiAqIHRoZWlyIHZhbHVlcyBhbmQgdGFrZXMgb25lIHRvIHNlbGVjdCB0aGVtIGFnYWluLlxyXG4gKi9cclxuaW1wb3J0IGV4dGVuZFByb3RvdHlwZSBmcm9tIFwiLi4vdXRpbHMvRXh0ZW5kUHJvdG90eXBlXCI7XHJcbmltcG9ydCBWYWx1ZVN1cHBvcnQgZnJvbSBcIi4vZXh0ZW50aW9ucy9WYWx1ZVN1cHBvcnRcIjtcclxuXHJcblxyXG5leHRlbmRQcm90b3R5cGUoSFRNTFNlbGVjdEVsZW1lbnQsVmFsdWVTdXBwb3J0KTsiLCIvKipcclxuICogQWRkcyB2YWwoKSB0byBIVE1MVGV4dEFyZWFFbGVtZW50LlxyXG4gKlxyXG4gKiBBIHRleHRhcmVhIG1hdGNoZXMgbm9uZSBvZiB0aGUgc3BlY2lhbCBpbnB1dCB0eXBlcywgc28gVmFsdWVTdXBwb3J0IGZhbGxzIGJhY2tcclxuICogdG8gcmVhZGluZyBhbmQgd3JpdGluZyBpdHMgdmFsdWUgLSBhbmQgdHJpZ2dlcnMgYW4gaW5wdXQgZXZlbnQgd2hlbiBpdCBpcyBzZXQsXHJcbiAqIHRoZSBzYW1lIGFzIGFueSBvdGhlciBmaWVsZC5cclxuICovXHJcbmltcG9ydCBleHRlbmRQcm90b3R5cGUgZnJvbSBcIi4uL3V0aWxzL0V4dGVuZFByb3RvdHlwZVwiO1xyXG5pbXBvcnQgVmFsdWVTdXBwb3J0IGZyb20gXCIuL2V4dGVudGlvbnMvVmFsdWVTdXBwb3J0XCI7XHJcblxyXG5cclxuZXh0ZW5kUHJvdG90eXBlKEhUTUxUZXh0QXJlYUVsZW1lbnQsIFZhbHVlU3VwcG9ydCk7XHJcbiIsIi8qKlxuICogQnVpbGRzIEhUTUxDb2xsZWN0aW9uIGFzIGEgbGlzdCBvZiBodG1sIGVsZW1lbnRzLlxuICpcbiAqIFNhbWUgYXMgTm9kZUxpc3QsIG9ubHkgaG9sZGluZyBodG1sIGVsZW1lbnRzIC0gYSBsaXZlIGNvbGxlY3Rpb24gbGlrZSBjaGlsZHJlblxuICogdGhlcmVmb3JlIGtlZXBzIGl0cyB0eXBlIHdoZW4gaXQgaXMgZmlsdGVyZWQuXG4gKi9cbmltcG9ydCBidWlsZExpc3RUeXBlIGZyb20gXCIuL2V4dGVudGlvbnMvTGlzdFR5cGVCdWlsZGVyXCI7XG5cbmJ1aWxkTGlzdFR5cGUoSFRNTENvbGxlY3Rpb24sIEhUTUxFbGVtZW50KTtcbiIsIi8qKlxyXG4gKiBBZGRzIGRhdGEgYW5kIGNvbnRlbnQgZnVuY3Rpb25zIHRvIE5vZGUuXHJcbiAqXHJcbiAqIE5vZGUgaXMgdGhlIGNvbW1vbiBiYXNlIG9mIGVsZW1lbnRzLCB0ZXh0IG5vZGVzIGFuZCBmcmFnbWVudHMsIHNvIGRhdGEoKSBhbmRcclxuICogdGhlIGluc2VydCBmdW5jdGlvbnMgd29yayBvbiBhbGwgb2YgdGhlbSwgbm90IG9ubHkgb24gZWxlbWVudHMuXHJcbiAqL1xyXG5pbXBvcnQgZXh0ZW5kUHJvdG90eXBlIGZyb20gXCIuLi91dGlscy9FeHRlbmRQcm90b3R5cGVcIjtcclxuaW1wb3J0IERhdGFTdXBwb3J0IGZyb20gXCIuL2V4dGVudGlvbnMvRGF0YVN1cHBvcnRcIjtcclxuaW1wb3J0IE1hbmlwdWxhdGlvblN1cHBvcnQgZnJvbSBcIi4vZXh0ZW50aW9ucy9NYW5pcHVsYXRpb25TdXBwb3J0XCI7XHJcblxyXG5leHRlbmRQcm90b3R5cGUoTm9kZSxEYXRhU3VwcG9ydCxNYW5pcHVsYXRpb25TdXBwb3J0KTsiLCIvKipcbiAqIEJ1aWxkcyBOb2RlTGlzdCBhcyBhIGxpc3Qgb2Ygbm9kZXMuXG4gKlxuICogQmVzaWRlcyB0aGUgbGlzdCBmdW5jdGlvbnMgdGhpcyBnaXZlcyBhIE5vZGVMaXN0IGV2ZXJ5IGZ1bmN0aW9uIG9mIGEgbm9kZSwgYnlcbiAqIGRlbGVnYXRpb24gLSBjYWxsaW5nIG9uZSBhcHBsaWVzIGl0IHRvIGVhY2ggbm9kZSBhbmQgY29sbGVjdHMgdGhlIHJlc3VsdHMuXG4gKi9cbmltcG9ydCBidWlsZExpc3RUeXBlIGZyb20gXCIuL2V4dGVudGlvbnMvTGlzdFR5cGVCdWlsZGVyXCI7XG5cbmJ1aWxkTGlzdFR5cGUoTm9kZUxpc3QsIE5vZGUpO1xuIiwiaW1wb3J0IEV4dGVuZGVyIGZyb20gXCIuLi8uLi91dGlscy9FeHRlbmRlclwiO1xyXG5cclxuY29uc3Qgc3VwcG9ydCA9IEV4dGVuZGVyKFwiQXR0cmlidXRlU3VwcG9ydFwiLCAoUHJvdG90eXBlKSA9PiB7XHJcblx0LyoqXHJcblx0ICogR2V0cyBvciBzZXRzIGF0dHJpYnV0ZXMgb2YgdGhpcyBlbGVtZW50LlxyXG5cdCAqXHJcblx0ICogYXR0cigpIHJldHVybnMgYWxsIGF0dHJpYnV0ZXMgYXMgYW4gb2JqZWN0LCBhdHRyKG5hbWUpIHRoZSB2YWx1ZSBvZiBhIHNpbmdsZVxyXG5cdCAqIG9uZS4gV2l0aCBhIHNlY29uZCBhcmd1bWVudCB0aGUgYXR0cmlidXRlIGlzIHNldCwgd2l0aCBudWxsIG9yIHVuZGVmaW5lZCBpdFxyXG5cdCAqIGdldHMgcmVtb3ZlZC5cclxuXHQgKlxyXG5cdCAqIFZhbHVlcyBhcmUgc3RyaW5naWZpZWQgYnkgc2V0QXR0cmlidXRlLCBzbyBhdHRyKG5hbWUsIDApIHNldHMgXCIwXCIuIE9ubHkgbnVsbFxyXG5cdCAqIGFuZCB1bmRlZmluZWQgcmVtb3ZlIGFuIGF0dHJpYnV0ZSAtIDAsIGZhbHNlIGFuZCBcIlwiIGFyZSByZWd1bGFyIHZhbHVlcy5cclxuXHQgKlxyXG5cdCAqIEBwYXJhbSB7c3RyaW5nfSBbYU5hbWVdIC0gdGhlIGF0dHJpYnV0ZSBuYW1lXHJcblx0ICogQHBhcmFtIHsqfSBbYVZhbHVlXSAtIHRoZSBuZXcgdmFsdWUsIG51bGwgb3IgdW5kZWZpbmVkIHJlbW92ZXMgdGhlIGF0dHJpYnV0ZVxyXG5cdCAqIEByZXR1cm5zIHtPYmplY3Q8c3RyaW5nLHN0cmluZz58c3RyaW5nfEVsZW1lbnR9IGFsbCBhdHRyaWJ1dGVzLCB0aGUgdmFsdWUgb2YgdGhlIHJlcXVlc3RlZCBhdHRyaWJ1dGUgKG51bGwgd2hlbiBpdCBkb2VzIG5vdCBleGlzdCksIG9yIHRoaXMgd2hlbiBhbiBhdHRyaWJ1dGUgd2FzIHNldCBvciByZW1vdmVkXHJcblx0ICovXHJcblx0UHJvdG90eXBlLmF0dHIgPSBmdW5jdGlvbiAoKSB7XHJcblx0XHRpZiAoYXJndW1lbnRzLmxlbmd0aCA9PSAwKSB7XHJcblx0XHRcdGNvbnN0IHJlc3VsdCA9IHt9O1xyXG5cdFx0XHR0aGlzLmdldEF0dHJpYnV0ZU5hbWVzKCkuZm9yRWFjaCgobmFtZSkgPT4ge1xyXG5cdFx0XHRcdHJlc3VsdFtuYW1lXSA9IHRoaXMuZ2V0QXR0cmlidXRlKG5hbWUpO1xyXG5cdFx0XHR9KTtcclxuXHRcdFx0cmV0dXJuIHJlc3VsdDtcclxuXHRcdH0gZWxzZSBpZiAoYXJndW1lbnRzLmxlbmd0aCA9PSAxKSByZXR1cm4gdGhpcy5nZXRBdHRyaWJ1dGUoYXJndW1lbnRzWzBdKTtcclxuXHRcdGVsc2UgaWYgKGFyZ3VtZW50c1sxXSA9PSBudWxsKSB0aGlzLnJlbW92ZUF0dHJpYnV0ZShhcmd1bWVudHNbMF0pO1xyXG5cdFx0ZWxzZSB0aGlzLnNldEF0dHJpYnV0ZShhcmd1bWVudHNbMF0sIGFyZ3VtZW50c1sxXSk7XHJcblxyXG5cdFx0cmV0dXJuIHRoaXM7XHJcblx0fTtcclxufSk7XHJcbmV4cG9ydCBkZWZhdWx0IHN1cHBvcnQ7XHJcbiIsImltcG9ydCBFeHRlbmRlciBmcm9tIFwiLi4vLi4vdXRpbHMvRXh0ZW5kZXJcIjtcclxuY29uc3Qgc3VwcG9ydCA9IEV4dGVuZGVyKFwiRGF0YVN1cHBvcnRcIiwgUHJvdG90eXBlID0+IHtcclxuXHJcblx0LyoqXHJcblx0ICogUmVhZHMgYWxsIGRhdGEtIGF0dHJpYnV0ZXMgb2YgYSBub2RlIGludG8gYSBwbGFpbiBvYmplY3QuXHJcblx0ICpcclxuXHQgKiBAcGFyYW0ge05vZGV9IGVsZW1lbnRcclxuXHQgKiBAcmV0dXJucyB7T2JqZWN0PHN0cmluZyxzdHJpbmc+fSB0aGUgZGF0YXNldCBvZiB0aGUgbm9kZSwgZW1wdHkgd2hlbiBpdCBoYXMgbm9uZVxyXG5cdCAqL1xyXG5cdGNvbnN0IGxvYWREYXRhID0gKGVsZW1lbnQpID0+IHtcclxuXHRcdGNvbnN0IGRhdGEgPSB7fTtcclxuXHRcdGlmICh0eXBlb2YgZWxlbWVudC5kYXRhc2V0ICE9PSBcInVuZGVmaW5lZFwiKVxyXG5cdFx0XHRmb3IgKGNvbnN0IG5hbWUgaW4gZWxlbWVudC5kYXRhc2V0KVxyXG5cdFx0XHRcdGRhdGFbbmFtZV0gPSBlbGVtZW50LmRhdGFzZXRbbmFtZV07XHJcblx0XHRyZXR1cm4gZGF0YTtcclxuXHR9XHJcblxyXG5cdC8qKlxyXG5cdCAqIEdldHMgb3Igc2V0cyB0aGUgZGF0YSBvZiB0aGlzIG5vZGUuXHJcblx0ICpcclxuXHQgKiBUaGUgZmlyc3QgY2FsbCByZWFkcyB0aGUgZGF0YS0gYXR0cmlidXRlcyBpbnRvIGEgY2FjaGUsIHdoaWNoIGlzIGtlcHQgb24gdGhlXHJcblx0ICogbm9kZSBmcm9tIHRoZW4gb24uIFRoYXQgY2FjaGUgaXMgZGV0YWNoZWQgZnJvbSB0aGUgZG9tOiBsYXRlciBhdHRyaWJ1dGVcclxuXHQgKiBjaGFuZ2VzIGFyZSBub3Qgc2VlbiBhbmQgd3JpdHRlbiB2YWx1ZXMgYXJlIG5vdCByZWZsZWN0ZWQgYmFjay4gZGF0YSh0cnVlKVxyXG5cdCAqIHJlYWRzIHRoZSBhdHRyaWJ1dGVzIGFnYWluLlxyXG5cdCAqXHJcblx0ICogUmVsb2FkaW5nIG1lcmdlcywgaXQgZG9lcyBub3Qgc3luYyAtIGEgdmFsdWUgcmVtb3ZlZCBmcm9tIHRoZSBkb20gc3RheXMgaW5cclxuXHQgKiB0aGUgY2FjaGUsIGFzIGl0IGNhbiBub3QgYmUgdG9sZCBhcGFydCBmcm9tIGEgdmFsdWUgdGhhdCBuZXZlciBjYW1lIGZyb20gdGhlXHJcblx0ICogZG9tLlxyXG5cdCAqXHJcblx0ICogQHBhcmFtIHtzdHJpbmd8Ym9vbGVhbn0gW2FOYW1lXSAtIGEgbmFtZSB0byByZWFkIG9yIHdyaXRlLCBvciBhIGJvb2xlYW4gdG8gcmVhZCBhbGwgZGF0YSwgcmVsb2FkaW5nIHRoZSBhdHRyaWJ1dGVzIGZpcnN0IHdoZW4gdHJ1ZVxyXG5cdCAqIEBwYXJhbSB7Kn0gW2FWYWx1ZV0gLSB0aGUgbmV3IHZhbHVlLCBudWxsIG9yIHVuZGVmaW5lZCByZW1vdmVzIHRoZSBuYW1lXHJcblx0ICogQHJldHVybnMge09iamVjdDxzdHJpbmcsKj58KnxOb2RlfSBhbGwgZGF0YSwgdGhlIHZhbHVlIG9mIHRoZSBnaXZlbiBuYW1lLCBvciB0aGlzIHdoZW4gYSB2YWx1ZSB3YXMgd3JpdHRlblxyXG5cdCAqIEB0aHJvd3Mge0Vycm9yfSB3aGVuIHRoZSBmaXJzdCBhcmd1bWVudCBpcyBuZWl0aGVyIGEgc3RyaW5nIG5vciBhIGJvb2xlYW5cclxuXHQgKi9cclxuXHRQcm90b3R5cGUuZGF0YSA9IGZ1bmN0aW9uKCkge1xyXG5cdFx0Y29uc3QgZGF0YSA9IGxvYWREYXRhKHRoaXMpO1xyXG5cdFx0dGhpcy5kYXRhID0gKGZ1bmN0aW9uKCkge1xyXG5cdFx0XHRpZiAoYXJndW1lbnRzLmxlbmd0aCA9PSAwKVxyXG5cdFx0XHRcdHJldHVybiBkYXRhO1xyXG5cdFx0XHRjb25zdCBhcmcxID0gYXJndW1lbnRzWzBdO1xyXG5cdFx0XHRjb25zdCB0eXBlID0gdHlwZW9mIGFyZzE7XHJcblx0XHRcdGlmKHR5cGUgPT09IFwiYm9vbGVhblwiKXtcclxuXHRcdFx0XHRpZihhcmcxKVxyXG5cdFx0XHRcdFx0T2JqZWN0LmFzc2lnbihkYXRhLCBsb2FkRGF0YSh0aGlzKSk7XHJcblx0XHRcdFx0cmV0dXJuIGRhdGE7XHJcblx0XHRcdH1cclxuXHJcblx0XHRcdGlmKHR5cGUgIT09IFwic3RyaW5nXCIpXHJcblx0XHRcdFx0dGhyb3cgbmV3IEVycm9yKFwiZGF0YSgpIGV4cGVjdHMgYSBzdHJpbmcgb3IgYm9vbGVhbiBhcyBmaXJzdCBhcmd1bWVudCBvciBubyBhcmd1bWVudHMgYXQgYWxsXCIpO1xyXG5cdFx0XHRcclxuXHRcdFx0aWYgKGFyZ3VtZW50cy5sZW5ndGggPT0gMSlcclxuXHRcdFx0XHRyZXR1cm4gZGF0YVthcmcxXTtcclxuXHRcdFx0ZWxzZSBpZiAoYXJndW1lbnRzWzFdID09IG51bGwpXHJcblx0XHRcdFx0ZGVsZXRlIGRhdGFbYXJndW1lbnRzWzBdXTtcclxuXHRcdFx0ZWxzZVxyXG5cdFx0XHRcdGRhdGFbYXJndW1lbnRzWzBdXSA9IGFyZ3VtZW50c1sxXTtcclxuXHJcblx0XHRcdHJldHVybiB0aGlzO1xyXG5cdFx0fSkuYmluZCh0aGlzKTtcclxuXHJcblx0XHRyZXR1cm4gdGhpcy5kYXRhLmFwcGx5KG51bGwsIGFyZ3VtZW50cyk7XHJcblx0fTtcclxufSk7XHJcbmV4cG9ydCBkZWZhdWx0IHN1cHBvcnQ7IiwiaW1wb3J0IEV4dGVuZGVyIGZyb20gXCIuLi8uLi91dGlscy9FeHRlbmRlclwiO1xyXG5cclxuY29uc3QgRVZFTlRTUExJVEVSID0gL1xccyosXFxzKnxcXHMrLztcclxuY29uc3QgREVGQVVMVF9PUFRJT05TID0geyBjYXB0dXJlOiBmYWxzZSwgb25jZTogZmFsc2UsIHBhc3NpdmU6IGZhbHNlLCBzaWduYWw6IHVuZGVmaW5lZCB9O1xyXG5cclxuLyoqXHJcbiAqIEV2ZXJ5dGhpbmcgdGhpcyBleHRlbnNpb24ga2VlcHMgcGVyIGVsZW1lbnQuIEEgV2Vha01hcCBob2xkcyBpdCBvdXRzaWRlIG9mIHRoZVxyXG4gKiBlbGVtZW50LCBzbyBub3RoaW5nIGlzIGV4cG9zZWQgb24gdGhlIGRvbSBhbmQgaXQgaXMgcmVsZWFzZWQgd2l0aCB0aGUgZWxlbWVudC5cclxuICpcclxuICogV3JhcHBlcnMgYW5kIGhhbmRsZXMgYXJlIG1hcHBlZCBpbiBib3RoIGRpcmVjdGlvbnM6IGEgd3JhcHBlciBuZWVkcyB0byBmaW5kIGl0c1xyXG4gKiByZWdpc3RyYXRpb24gd2hpbGUgYW4gZXZlbnQgcnVucywgYW5kIHJlbW92ZU9uIG5lZWRzIHRvIGZpbmQgYWxsIHdyYXBwZXJzIG9mIGFcclxuICogaGFuZGxlLiBIYW5kbGVzIGFyZSBtYXBwZWQgdG8gYSBzZXQgb2Ygd3JhcHBlcnMsIG5vdCB0byBhIHNpbmdsZSBvbmUsIHNvIHRoZVxyXG4gKiBzYW1lIGhhbmRsZSBjYW4gYmUgcmVnaXN0ZXJlZCBhbnkgbnVtYmVyIG9mIHRpbWVzIHdpdGhvdXQgdGhlIHJlZ2lzdHJhdGlvbnNcclxuICogb3ZlcndyaXRpbmcgZWFjaCBvdGhlci5cclxuICpcclxuICogQHR5cGVkZWYge09iamVjdH0gRWxlbWVudERhdGFcclxuICogQHByb3BlcnR5IHtNYXA8c3RyaW5nLG51bWJlcj59IGV2ZW50VHJpZ2dlclRpbWVvdXRzIC0gcnVubmluZyB0cmlnZ2VyIHRpbWVvdXRzIGJ5IGV2ZW50IHR5cGVcclxuICogQHByb3BlcnR5IHtNYXA8RnVuY3Rpb24sUmVnaXN0cmF0aW9uPn0gd3JhcHBlckhhbmRsZU1hcCAtIHJlZ2lzdHJhdGlvbiBvZiBlYWNoIHdyYXBwZXJcclxuICogQHByb3BlcnR5IHtNYXA8RnVuY3Rpb24sU2V0PEZ1bmN0aW9uPj59IGhhbmRsZVdyYXBwZXJNYXAgLSBhbGwgd3JhcHBlcnMgb2YgYSBoYW5kbGVcclxuICovXHJcblxyXG4vKipcclxuICogT25lIGNhbGwgb2Ygb24oKS5cclxuICpcclxuICogQHR5cGVkZWYge09iamVjdH0gUmVnaXN0cmF0aW9uXHJcbiAqIEBwcm9wZXJ0eSB7RnVuY3Rpb259IGhhbmRsZSAtIHRoZSBmdW5jdGlvbiBnaXZlbiB0byBvbigpXHJcbiAqIEBwcm9wZXJ0eSB7U2V0PHN0cmluZz59IGV2ZW50cyAtIHRoZSBldmVudCB0eXBlcyBzdGlsbCByZWdpc3RlcmVkLCBsaXN0ZW5lcnMgZ2V0IHJlbW92ZWQgb25lIGJ5IG9uZVxyXG4gKiBAcHJvcGVydHkge09iamVjdH0gb3B0aW9ucyAtIHRoZSBvcHRpb25zIHRoZSBsaXN0ZW5lciB3YXMgYWRkZWQgd2l0aCwgbmVlZGVkIHRvIHJlbW92ZSBpdCBhZ2FpblxyXG4gKi9cclxuXHJcbmNvbnN0IEVMRU1FTlREQVRBID0gbmV3IFdlYWtNYXAoKTtcclxuXHJcbi8qKlxyXG4gKiBAcGFyYW0ge0V2ZW50VGFyZ2V0fSBlbGVtZW50XHJcbiAqIEByZXR1cm5zIHtFbGVtZW50RGF0YX0gdGhlIGRhdGEgb2YgdGhlIGVsZW1lbnQsIGNyZWF0ZWQgb24gZmlyc3QgYWNjZXNzXHJcbiAqL1xyXG5jb25zdCBnZXRFbGVtZW50RGF0YSA9IChlbGVtZW50KSA9PiB7XHJcblx0aWYgKCFFTEVNRU5UREFUQS5oYXMoZWxlbWVudCkpXHJcblx0XHRFTEVNRU5UREFUQS5zZXQoZWxlbWVudCwge1xyXG5cdFx0XHRldmVudFRyaWdnZXJUaW1lb3V0czogbmV3IE1hcCgpLFxyXG5cdFx0XHR3cmFwcGVySGFuZGxlTWFwOiBuZXcgTWFwKCksXHJcblx0XHRcdGhhbmRsZVdyYXBwZXJNYXA6IG5ldyBNYXAoKVxyXG5cdFx0fSk7XHJcblxyXG5cdHJldHVybiBFTEVNRU5UREFUQS5nZXQoZWxlbWVudCk7XHJcbn07XHJcblxyXG5jb25zdCBnZXRXcmFwcGVySGFuZGxlTWFwID0gKGVsZW1lbnQpID0+IHtcclxuXHRyZXR1cm4gZ2V0RWxlbWVudERhdGEoZWxlbWVudCkud3JhcHBlckhhbmRsZU1hcDtcclxufTtcclxuXHJcbmNvbnN0IGdldEhhbmRsZVdyYXBwZXJNYXAgPSAoZWxlbWVudCkgPT4ge1xyXG5cdHJldHVybiBnZXRFbGVtZW50RGF0YShlbGVtZW50KS5oYW5kbGVXcmFwcGVyTWFwO1xyXG59O1xyXG5cclxuY29uc3QgZ2V0VHJpZ2dlclRpbWVvdXRzID0gKGVsZW1lbnQpID0+IHtcclxuXHRyZXR1cm4gZ2V0RWxlbWVudERhdGEoZWxlbWVudCkuZXZlbnRUcmlnZ2VyVGltZW91dHM7XHJcbn07XHJcblxyXG4vKipcclxuICogUmVnaXN0ZXJzIGEgd3JhcHBlciBpbiBib3RoIGRpcmVjdGlvbnMuXHJcbiAqXHJcbiAqIEBwYXJhbSB7RXZlbnRUYXJnZXR9IGFuRWxlbWVudFxyXG4gKiBAcGFyYW0ge0Z1bmN0aW9ufSBhSGFuZGxlIC0gdGhlIGZ1bmN0aW9uIGdpdmVuIHRvIG9uKClcclxuICogQHBhcmFtIHtGdW5jdGlvbn0gYVdyYXBwZXIgLSB0aGUgbGlzdGVuZXIgYWN0dWFsbHkgYWRkZWQgdG8gdGhlIGVsZW1lbnRcclxuICogQHBhcmFtIHtJdGVyYWJsZTxzdHJpbmc+fSB0aGVFdmVudHNcclxuICogQHBhcmFtIHtPYmplY3R9IHRoZU9wdGlvbnMgLSBrZXB0IHRvIHJlbW92ZSB0aGUgbGlzdGVuZXIgd2l0aCB0aGUgc2FtZSBvcHRpb25zIGxhdGVyXHJcbiAqIEB0aHJvd3Mge0Vycm9yfSB3aGVuIHRoZSB3cmFwcGVyIGlzIGFscmVhZHkgcmVnaXN0ZXJlZCwgd2hpY2ggY2FuIG5vdCBoYXBwZW4gYXMgbG9uZyBhcyBvbigpIGNyZWF0ZXMgYSBuZXcgb25lIHBlciBjYWxsXHJcbiAqL1xyXG5jb25zdCByZWdpc3RyYXRlSGFuZGxlV3JhcHBlciA9IChhbkVsZW1lbnQsIGFIYW5kbGUsIGFXcmFwcGVyLCB0aGVFdmVudHMsIHRoZU9wdGlvbnMpID0+IHtcclxuXHRjb25zdCB3cmFwcGVySGFuZGxlTWFwID0gZ2V0V3JhcHBlckhhbmRsZU1hcChhbkVsZW1lbnQpO1xyXG5cdGlmICghd3JhcHBlckhhbmRsZU1hcC5oYXMoYVdyYXBwZXIpKSB3cmFwcGVySGFuZGxlTWFwLnNldChhV3JhcHBlciwgeyBoYW5kbGU6IGFIYW5kbGUsIGV2ZW50czogbmV3IFNldCh0aGVFdmVudHMpLCBvcHRpb25zOiB0aGVPcHRpb25zIH0pO1xyXG5cdGVsc2UgdGhyb3cgbmV3IEVycm9yKFwiV3JhcHBlciBhbHJlYWR5IHJlZ2lzdGVyZWQgZm9yIHRoaXMgZWxlbWVudCFcIik7XHJcblxyXG5cdGNvbnN0IGhhbmRsZVdyYXBwZXJNYXAgPSBnZXRIYW5kbGVXcmFwcGVyTWFwKGFuRWxlbWVudCk7XHJcblx0bGV0IHdyYXBwZXJTZXQgPSBoYW5kbGVXcmFwcGVyTWFwLmdldChhSGFuZGxlKTtcclxuXHRpZiAoIXdyYXBwZXJTZXQpIHtcclxuXHRcdHdyYXBwZXJTZXQgPSBuZXcgU2V0KCk7XHJcblx0XHRoYW5kbGVXcmFwcGVyTWFwLnNldChhSGFuZGxlLCB3cmFwcGVyU2V0KTtcclxuXHR9XHRcclxuXHR3cmFwcGVyU2V0LmFkZChhV3JhcHBlcik7XHRcclxufTtcclxuXHJcbi8qKlxyXG4gKiBSZW1vdmVzIGEgd3JhcHBlciBmcm9tIHNvbWUgb3IgYWxsIG9mIGl0cyBldmVudHMuXHJcbiAqXHJcbiAqIFRoZSByZWdpc3RyYXRpb24gaXMgZHJvcHBlZCBmcm9tIGJvdGggbWFwcyBhcyBzb29uIGFzIG5vIGV2ZW50IGlzIGxlZnQsIHNvIGFcclxuICogd3JhcHBlciB0aGF0IHN0aWxsIGxpc3RlbnMgdG8gb3RoZXIgZXZlbnRzIHN0YXlzIGtub3duLlxyXG4gKlxyXG4gKiBAcGFyYW0ge0V2ZW50VGFyZ2V0fSBhRWxlbWVudFxyXG4gKiBAcGFyYW0ge0Z1bmN0aW9ufSBhV3JhcHBlclxyXG4gKiBAcGFyYW0ge0l0ZXJhYmxlPHN0cmluZz59IFt0aGVFdmVudHNdIC0gdGhlIGV2ZW50cyB0byByZW1vdmUsIGFsbCBvZiB0aGVtIHdoZW4gb21pdHRlZFxyXG4gKi9cclxuY29uc3QgcmVtb3ZlV3JhcHBlciA9IChhRWxlbWVudCwgYVdyYXBwZXIsIHRoZUV2ZW50cykgPT4ge1xyXG5cdGNvbnN0IHdyYXBwZXJIYW5kbGVNYXAgPSBnZXRXcmFwcGVySGFuZGxlTWFwKGFFbGVtZW50KTtcclxuXHRpZighd3JhcHBlckhhbmRsZU1hcC5oYXMoYVdyYXBwZXIpKSB0aHJvdyBuZXcgRXJyb3IoXCJXcmFwcGVyIG5vdCByZWdpc3RlcmVkIGZvciB0aGlzIGVsZW1lbnQhXCIpO1xyXG5cdGNvbnN0IHsgZXZlbnRzLCBvcHRpb25zLCBoYW5kbGUgfSA9IHdyYXBwZXJIYW5kbGVNYXAuZ2V0KGFXcmFwcGVyKTtcclxuXHRjb25zdCByZW1vdmVkRXZlbnRzID0gdGhlRXZlbnRzIHx8IGV2ZW50cztcclxuXHRmb3IgKGxldCBldmVudCBvZiByZW1vdmVkRXZlbnRzKSB7XHJcblx0XHRpZiAoZXZlbnRzLmhhcyhldmVudCkpIHtcclxuXHRcdFx0ZXZlbnRzLmRlbGV0ZShldmVudCk7XHJcblx0XHRcdGFFbGVtZW50LnJlbW92ZUV2ZW50TGlzdGVuZXIoZXZlbnQsIGFXcmFwcGVyLCBvcHRpb25zKTtcclxuXHRcdH1cclxuXHR9XHJcblx0Ly9DbGVhbnVwIHRoZSB3cmFwcGVySGFuZGxlTWFwIGFuZCBoYW5kbGVXcmFwcGVyTWFwIGlmIG5vIGV2ZW50cyBsZWZ0IGZvciB0aGlzIHdyYXBwZXJcclxuXHRpZiAoZXZlbnRzLnNpemUgPT09IDApe1xyXG5cdFx0d3JhcHBlckhhbmRsZU1hcC5kZWxldGUoYVdyYXBwZXIpO1xyXG5cdFx0Y29uc3QgaGFuZGxlV3JhcHBlck1hcCA9IGdldEhhbmRsZVdyYXBwZXJNYXAoYUVsZW1lbnQpO1xyXG5cdFx0Y29uc3Qgd3JhcHBlclNldCA9IGhhbmRsZVdyYXBwZXJNYXAuZ2V0KGhhbmRsZSk7XHJcblx0XHR3cmFwcGVyU2V0LmRlbGV0ZShhV3JhcHBlcik7XHJcblx0XHRpZiAod3JhcHBlclNldC5zaXplID09PSAwKVxyXG5cdFx0XHRoYW5kbGVXcmFwcGVyTWFwLmRlbGV0ZShoYW5kbGUpO1xyXG5cdH1cclxufTtcclxuXHJcbi8qKlxyXG4gKiBAcGFyYW0ge2Jvb2xlYW58T2JqZWN0fSBbb3B0aW9uc10gLSBhIGJvb2xlYW4gaXMgdGFrZW4gYXMgY2FwdHVyZSwgYW4gb2JqZWN0IGlzIG1lcmdlZCBpbnRvIHRoZSBkZWZhdWx0c1xyXG4gKiBAcmV0dXJucyB7T2JqZWN0fSBhbHdheXMgYSBuZXcgb2JqZWN0LCBuZXZlciB0aGUgc2hhcmVkIGRlZmF1bHRzXHJcbiAqL1xyXG5jb25zdCB0b0V2ZW50T3B0aW9ucyA9IChvcHRpb25zKSA9PiB7XHJcblx0aWYgKG9wdGlvbnMgPT0gbnVsbCkgcmV0dXJuIE9iamVjdC5hc3NpZ24oe30sIERFRkFVTFRfT1BUSU9OUyk7XHJcblx0ZWxzZSBpZiAodHlwZW9mIG9wdGlvbnMgPT09IFwiYm9vbGVhblwiKSByZXR1cm4gT2JqZWN0LmFzc2lnbih7fSwgREVGQVVMVF9PUFRJT05TLCB7IGNhcHR1cmU6IG9wdGlvbnMgfSk7XHJcblx0ZWxzZSByZXR1cm4gT2JqZWN0LmFzc2lnbih7fSwgREVGQVVMVF9PUFRJT05TLCBvcHRpb25zKTtcclxufTtcclxuXHJcbi8qKlxyXG4gKiBOb3JtYWxpemVzIGV2ZW50IHR5cGVzIHRvIGEgZmxhdCBsaXN0LlxyXG4gKlxyXG4gKiBUeXBlcyBhcmUgc2VwYXJhdGVkIGJ5IHdoaXRlc3BhY2VzLCBjb21tYXMgb3IgYm90aCwgaW4gYSBzdHJpbmcgYXMgd2VsbCBhc1xyXG4gKiB3aXRoaW4gdGhlIGVudHJpZXMgb2YgYW4gYXJyYXkgLSBzbyBbXCJjbGlja1wiLCBcImZvY3VzIGJsdXJcIl0gZ2l2ZXMgdGhyZWUgdHlwZXMuXHJcbiAqXHJcbiAqIEEgc3RyaW5nIGdldHMgdHJpbW1lZCBiZWZvcmUgaXQgaXMgc3BsaXQsIGJlY2F1c2UgdGhlIGVtcHR5IGVudHJpZXMgYSBsZWFkaW5nXHJcbiAqIG9yIHRyYWlsaW5nIHNlcGFyYXRvciBwcm9kdWNlcyBhcmUgYXJ0aWZhY3RzIG9mIHNwbGl0dGluZywgbm90IHNvbWV0aGluZyB0aGVcclxuICogY2FsbGVyIGFza2VkIGZvci4gQW4gZW1wdHkgZW50cnkgaW5zaWRlIGFuIGFycmF5IGlzIHRoZSBvcHBvc2l0ZSBjYXNlOiBpdCB3YXNcclxuICogd3JpdHRlbiBkb3duIGFuZCB0aGVyZWZvcmUgdGhyb3dzLlxyXG4gKlxyXG4gKiBAcGFyYW0ge3N0cmluZ3xJdGVyYWJsZTxzdHJpbmc+fSB0aGVFdmVudHNcclxuICogQHJldHVybnMge3N0cmluZ1tdfSB0aGUgZXZlbnQgdHlwZXMsIG5ldmVyIGVtcHR5XHJcbiAqIEB0aHJvd3Mge0Vycm9yfSB3aGVuIG5vIHR5cGUgaXMgbGVmdCBvciBhbiBlbnRyeSBpcyBub3QgYSBub24gZW1wdHkgc3RyaW5nXHJcbiAqL1xyXG5jb25zdCB0b0V2ZW50VHlwZXMgPSAodGhlRXZlbnRzKSA9PiB7XHJcblx0aWYodGhlRXZlbnRzID09IG51bGwpIHRocm93IG5ldyBFcnJvcihcIkV2ZW50IHR5cGVzIGFyZSByZXF1aXJlZCFcIik7XHRcclxuXHRcclxuXHRjb25zdCBldmVudHMgPSB0eXBlb2YgdGhlRXZlbnRzID09PSBcInN0cmluZ1wiID8gdGhlRXZlbnRzLnRyaW0oKS5zcGxpdChFVkVOVFNQTElURVIpIDogdGhlRXZlbnRzO1xyXG5cdGlmICh0eXBlb2YgZXZlbnRzW1N5bWJvbC5pdGVyYXRvcl0gIT09IFwiZnVuY3Rpb25cIikgdGhyb3cgbmV3IEVycm9yKFwiSW52YWxpZCBldmVudCB0eXBlcyFcIik7XHJcblx0aWYoZXZlbnRzLmxlbmd0aCA9PT0gMCkgdGhyb3cgbmV3IEVycm9yKFwiRXZlbnQgdHlwZXMgYXJlIHJlcXVpcmVkIVwiKTtcclxuXHJcblx0Y29uc3QgcmVzdWx0ID0gW107XHJcblxyXG5cdGZvciAobGV0IGV2ZW50IG9mIGV2ZW50cykge1xyXG5cdFx0aWYgKHR5cGVvZiBldmVudCAhPT0gXCJzdHJpbmdcIikgdGhyb3cgbmV3IEVycm9yKFwiSW52YWxpZCBldmVudCB0eXBlcyFcIik7XHJcblx0XHRldmVudCA9IGV2ZW50LnRyaW0oKTtcclxuXHRcdGlmIChldmVudC5sZW5ndGggPT09IDApIHRocm93IG5ldyBFcnJvcihcIkludmFsaWQgZXZlbnQgdHlwZXMhXCIpO1xyXG5cdFx0cmVzdWx0LnB1c2goLi4uZXZlbnQuc3BsaXQoRVZFTlRTUExJVEVSKSk7XHJcblx0fVxyXG5cdHJldHVybiByZXN1bHQ7XHJcbn07XHJcblxyXG5jb25zdCBzdXBwb3J0ID0gRXh0ZW5kZXIoXCJFdmVudFN1cHBvcnRcIiwgKFByb3RvdHlwZSkgPT4ge1xyXG5cdC8qKlxyXG5cdCAqIEFkZHMgYSBoYW5kbGUgdG8gb25lIG9yIG1vcmUgZXZlbnRzLlxyXG5cdCAqXHJcblx0ICogVGhlIGhhbmRsZSBpcyBub3QgYWRkZWQgYXMgbGlzdGVuZXIgaXRzZWxmLCBpdCBnZXRzIHdyYXBwZWQuIFRoYXQgd3JhcHBlclxyXG5cdCAqIGFwcGxpZXMgdGhlIHNlbGVjdG9yIGFuZCBoYW5kbGVzIHRoZSBvbmNlIG9wdGlvbiwgd2hpY2gga2VlcHMgcmVtb3ZlT24gYWJsZVxyXG5cdCAqIHRvIGZpbmQgZXZlcnkgcmVnaXN0cmF0aW9uIG9mIGEgaGFuZGxlLlxyXG5cdCAqXHJcblx0ICogV2l0aCBhIHNlbGVjdG9yIHRoZSBoYW5kbGUgaXMgb25seSBjYWxsZWQgd2hlbiB0aGUgdGFyZ2V0IG9mIHRoZSBldmVudFxyXG5cdCAqIG1hdGNoZXMgaXQuIFRvZ2V0aGVyIHdpdGggb25jZSB0aGlzIG5lZWRzIGNhcmU6IHRoZSBicm93c2VyIGNvbnN1bWVzIGEgb25jZVxyXG5cdCAqIGxpc3RlbmVyIG9uIHRoZSBmaXJzdCBldmVudCwgZXZlbiB3aGVuIHRoZSBzZWxlY3RvciBkaWQgbm90IG1hdGNoLCBzbyB0aGVcclxuXHQgKiB3cmFwcGVyIHJlZ2lzdGVycyBpdHNlbGYgYWdhaW4gaW4gdGhhdCBjYXNlIGFuZCB3YWl0cyBmb3IgYSBtYXRjaGluZyBldmVudC5cclxuXHQgKlxyXG5cdCAqIEBwYXJhbSB7c3RyaW5nfEl0ZXJhYmxlPHN0cmluZz59IHRoZUV2ZW50cyAtIGV2ZW50IHR5cGVzLCBzZXBhcmF0ZWQgYnkgd2hpdGVzcGFjZXMgb3IgY29tbWFzXHJcblx0ICogQHBhcmFtIHtzdHJpbmd9IFthU2VsZWN0b3JdIC0gb25seSBjYWxsIHRoZSBoYW5kbGUgd2hlbiB0aGUgdGFyZ2V0IG9mIHRoZSBldmVudCBtYXRjaGVzXHJcblx0ICogQHBhcmFtIHtGdW5jdGlvbn0gYUhhbmRsZSAtIGNhbGxlZCB3aXRoIHRoZSBldmVudFxyXG5cdCAqIEBwYXJhbSB7Ym9vbGVhbnxPYmplY3R9IFt0aGVPcHRpb25zXSAtIGEgYm9vbGVhbiBpcyB0YWtlbiBhcyBjYXB0dXJlLCBvdGhlcndpc2UgdGhlIG9wdGlvbnMgb2YgYWRkRXZlbnRMaXN0ZW5lclxyXG5cdCAqIEByZXR1cm5zIHtFdmVudFRhcmdldH0gdGhpc1xyXG5cdCAqIEB0aHJvd3Mge0Vycm9yfSBieSBsZXNzIHRoYW4gdHdvIGFyZ3VtZW50cyBvciBpbnZhbGlkIGV2ZW50IHR5cGVzXHJcblx0ICovXHJcblx0UHJvdG90eXBlLm9uID0gZnVuY3Rpb24gKCkge1xyXG5cdFx0aWYgKGFyZ3VtZW50cy5sZW5ndGggPCAyKSB0aHJvdyBuZXcgRXJyb3IoXCJUb28gbGVzcyBhcmd1bWVudHMhXCIpO1xyXG5cclxuXHRcdGNvbnN0IGFyZ3MgPSBBcnJheS5mcm9tKGFyZ3VtZW50cyk7XHJcblx0XHRjb25zdCBldmVudHMgPSB0b0V2ZW50VHlwZXMoYXJncy5zaGlmdCgpKTtcclxuXHRcdGNvbnN0IGVsZW1lbnRTZWxlY3RvciA9IHR5cGVvZiBhcmdzWzBdID09PSBcInN0cmluZ1wiID8gYXJncy5zaGlmdCgpIDogbnVsbDtcclxuXHRcdGNvbnN0IGhhbmRsZSA9IGFyZ3Muc2hpZnQoKTtcclxuXHRcdGNvbnN0IG9wdGlvbiA9IHRvRXZlbnRPcHRpb25zKGFyZ3Muc2hpZnQoKSk7XHJcblx0XHRjb25zdCBlbGVtZW50ID0gdGhpcztcclxuXHRcdGNvbnN0IHdyYXBwZXIgPSBmdW5jdGlvbihldmVudCkge1xyXG5cdFx0XHRjb25zdCB7IHRhcmdldCwgdHlwZSB9ID0gZXZlbnQ7XHJcblx0XHRcdGlmIChlbGVtZW50U2VsZWN0b3IgJiYgdHlwZW9mIHRhcmdldC5pcyA9PT0gXCJmdW5jdGlvblwiICYmICF0YXJnZXQuaXMoZWxlbWVudFNlbGVjdG9yKSkge1xyXG5cdFx0XHRcdGlmIChvcHRpb24ub25jZSkgZWxlbWVudC5hZGRFdmVudExpc3RlbmVyKHR5cGUsIHdyYXBwZXIsIG9wdGlvbik7IC8vIHJlLXJlZ2lzdGVyIHRoZSB3cmFwcGVyIGZvciB0aGUgbmV4dCBldmVudFxyXG5cdFx0XHRcdHJldHVybjtcclxuXHRcdFx0fSBlbHNlIHtcclxuXHRcdFx0XHRpZiAob3B0aW9uLm9uY2UpIHJlbW92ZVdyYXBwZXIoZWxlbWVudCwgd3JhcHBlciwgW3R5cGVdKTtcclxuXHRcdFx0XHRjb25zdCByZXN1bHQgPSBoYW5kbGUuYXBwbHkobnVsbCwgYXJndW1lbnRzKTtcdFx0XHRcdFxyXG5cdFx0XHRcdHJldHVybiByZXN1bHQ7XHJcblx0XHRcdH1cclxuXHRcdH07XHJcblxyXG5cdFx0cmVnaXN0cmF0ZUhhbmRsZVdyYXBwZXIodGhpcywgaGFuZGxlLCB3cmFwcGVyLCBldmVudHMsIG9wdGlvbik7XHJcblxyXG5cdFx0Zm9yIChsZXQgZXZlbnQgb2YgZXZlbnRzKSB7XHJcblx0XHRcdHRoaXMuYWRkRXZlbnRMaXN0ZW5lcihldmVudCwgd3JhcHBlciwgb3B0aW9uKTtcclxuXHRcdH1cclxuXHJcblx0XHRyZXR1cm4gdGhpcztcclxuXHR9O1xyXG5cclxuXHQvKipcclxuXHQgKiBSZW1vdmVzIGEgaGFuZGxlIGZyb20gc29tZSBvciBhbGwgb2YgaXRzIGV2ZW50cy5cclxuXHQgKlxyXG5cdCAqIEEgaGFuZGxlIHJlZ2lzdGVyZWQgYnkgc2V2ZXJhbCBjYWxscyBvZiBvbigpIGlzIHJlbW92ZWQgZnJvbSBhbGwgb2YgdGhlbS5cclxuXHQgKlxyXG5cdCAqIEBwYXJhbSB7RnVuY3Rpb259IGFIYW5kbGUgLSB0aGUgZnVuY3Rpb24gZ2l2ZW4gdG8gb24oKVxyXG5cdCAqIEBwYXJhbSB7c3RyaW5nfEl0ZXJhYmxlPHN0cmluZz59IFt0aGVFdmVudHNdIC0gdGhlIGV2ZW50cyB0byByZW1vdmUsIGFsbCBvZiB0aGVtIHdoZW4gb21pdHRlZFxyXG5cdCAqIEByZXR1cm5zIHtFdmVudFRhcmdldH0gdGhpc1xyXG5cdCAqIEB0aHJvd3Mge0Vycm9yfSBieSBpbnZhbGlkIGV2ZW50IHR5cGVzXHJcblx0ICovXHJcblx0UHJvdG90eXBlLnJlbW92ZU9uID0gZnVuY3Rpb24gKGFIYW5kbGUsIHRoZUV2ZW50cykge1xyXG5cdFx0Y29uc3QgZXZlbnRzID0gdGhlRXZlbnRzID8gdG9FdmVudFR5cGVzKHRoZUV2ZW50cykgOiBudWxsO1xyXG5cdFx0Y29uc3QgaGFuZGxlV3JhcHBlck1hcCA9IGdldEhhbmRsZVdyYXBwZXJNYXAodGhpcyk7XHJcblx0XHRjb25zdCB3cmFwcGVyU2V0ID0gaGFuZGxlV3JhcHBlck1hcC5nZXQoYUhhbmRsZSk7XHRcclxuXHRcdGlmICh3cmFwcGVyU2V0KSB7XHJcblx0XHRcdGZvciAobGV0IHdyYXBwZXIgb2Ygd3JhcHBlclNldClcclxuXHRcdFx0XHRyZW1vdmVXcmFwcGVyKHRoaXMsIHdyYXBwZXIsIGV2ZW50cyk7XHJcblx0XHR9XHJcblxyXG5cdFx0cmV0dXJuIHRoaXM7XHJcblx0fTtcclxuXHJcblx0LyoqXHJcblx0ICogRGlzcGF0Y2hlcyBhIGJ1YmJsaW5nLCBjYW5jZWxhYmxlIGFuZCBjb21wb3NlZCBDdXN0b21FdmVudC5cclxuXHQgKlxyXG5cdCAqIEEgbGVhZGluZyBudW1iZXIgZGVsYXlzIHRoZSBldmVudCBieSB0aGF0IG1hbnkgbWlsbGlzZWNvbmRzIGFuZCByZXBsYWNlcyBhXHJcblx0ICogZGVsYXllZCBldmVudCBvZiB0aGUgc2FtZSB0eXBlIHRoYXQgaXMgc3RpbGwgcGVuZGluZywgc28gYSByZXBlYXRlZGx5XHJcblx0ICogdHJpZ2dlcmVkIGV2ZW50IGlzIGRpc3BhdGNoZWQgb25jZSBhZnRlciB0aGluZ3MgY2FtZSB0byByZXN0LlxyXG5cdCAqXHJcblx0ICogT25lIGRhdGEgYXJndW1lbnQgYmVjb21lcyBldmVudC5kZXRhaWwgYXMgaXQgaXMsIHNldmVyYWwgYmVjb21lIGFuIGFycmF5IG9mXHJcblx0ICogdGhlbS4gQSBsZWFkaW5nIEV2ZW50IGlzIHRha2VuIGFzIHRoZSBldmVudCB0aGlzIG9uZSBpcyBkZWxlZ2F0ZWQgZnJvbSBhbmRcclxuXHQgKiBpcyBhdmFpbGFibGUgYXMgZXZlbnQuZGVsZWdhdGVkRXZlbnQuXHJcblx0ICpcclxuXHQgKiBAcGFyYW0ge251bWJlcn0gW2FUaW1lb3V0XSAtIG1pbGxpc2Vjb25kcyB0byBkZWxheSB0aGUgZXZlbnRcclxuXHQgKiBAcGFyYW0ge3N0cmluZ30gYVR5cGUgLSB0aGUgZXZlbnQgdHlwZVxyXG5cdCAqIEBwYXJhbSB7RXZlbnR9IFthRGVsZWdhdGVkRXZlbnRdIC0gdGhlIGV2ZW50IHRoaXMgb25lIGlzIHRyaWdnZXJlZCBmb3JcclxuXHQgKiBAcGFyYW0gey4uLip9IFt0aGVEYXRhXSAtIGJlY29tZXMgZXZlbnQuZGV0YWlsXHJcblx0ICogQHJldHVybnMge0V2ZW50VGFyZ2V0fSB0aGlzXHJcblx0ICovXHJcblx0UHJvdG90eXBlLnRyaWdnZXIgPSBmdW5jdGlvbiAoKSB7XHJcblx0XHRjb25zdCBhcmdzID0gQXJyYXkuZnJvbShhcmd1bWVudHMpO1xyXG5cdFx0Y29uc3QgdGltZW91dCA9IHR5cGVvZiBhcmdzWzBdID09PSBcIm51bWJlclwiID8gYXJncy5zaGlmdCgpIDogLTE7XHJcblx0XHRpZiAodGltZW91dCA+PSAwKSB7XHJcblx0XHRcdGNvbnN0IHR5cGUgPSBhcmdzWzBdO1xyXG5cdFx0XHRjb25zdCB0aW1lb3V0cyA9IGdldFRyaWdnZXJUaW1lb3V0cyh0aGlzKTtcclxuXHRcdFx0Y29uc3QgdGltZW91dGlkID0gdGltZW91dHMuZ2V0KHR5cGUpO1xyXG5cdFx0XHRpZiAodGltZW91dGlkKSBjbGVhclRpbWVvdXQodGltZW91dGlkKTtcclxuXHJcblx0XHRcdHRpbWVvdXRzLnNldCh0eXBlLCBzZXRUaW1lb3V0KCgpID0+IHtcclxuXHRcdFx0XHR0aW1lb3V0cy5kZWxldGUodHlwZSk7XHJcblx0XHRcdFx0dGhpcy50cmlnZ2VyLmFwcGx5KHRoaXMsIGFyZ3MpO1xyXG5cdFx0XHR9LCB0aW1lb3V0KSk7XHJcblx0XHR9IGVsc2Uge1xyXG5cdFx0XHRjb25zdCB0eXBlID0gYXJncy5zaGlmdCgpO1xyXG5cdFx0XHRjb25zdCBkZWxlZ2F0ZSA9IGFyZ3NbMF0gaW5zdGFuY2VvZiBFdmVudCA/IGFyZ3Muc2hpZnQoKSA6IG51bGw7XHJcblx0XHRcdGNvbnN0IGRhdGEgPSBhcmdzLmxlbmd0aCA+PSAxID8gKGFyZ3MubGVuZ3RoID09IDEgPyBhcmdzLnNoaWZ0KCkgOiBhcmdzKSA6IGRlbGVnYXRlO1xyXG5cdFx0XHRjb25zdCBldmVudCA9IG5ldyBDdXN0b21FdmVudCh0eXBlLCB7IGJ1YmJsZXM6IHRydWUsIGNhbmNlbGFibGU6IHRydWUsIGNvbXBvc2VkOiB0cnVlLCBkZXRhaWw6IGRhdGEgfSk7XHJcblxyXG5cdFx0XHRpZiAoZGVsZWdhdGUpIGV2ZW50LmRlbGVnYXRlZEV2ZW50ID0gZGVsZWdhdGU7XHJcblx0XHRcdHRoaXMuZGlzcGF0Y2hFdmVudChldmVudCk7XHJcblx0XHR9XHJcblx0XHRyZXR1cm4gdGhpcztcclxuXHR9O1xyXG59KTtcclxuZXhwb3J0IGRlZmF1bHQgc3VwcG9ydDtcclxuIiwiaW1wb3J0IEV4dGVuZGVyIGZyb20gXCIuLi8uLi91dGlscy9FeHRlbmRlclwiO1xyXG5cclxuY29uc3QgQ0xBU1NTUExJVEVSID0gL1xccysvO1xyXG5cclxuLyoqXHJcbiAqIE5vcm1hbGl6ZXMgY2xhc3MgbmFtZXMgdG8gYSBmbGF0IGxpc3QuXHJcbiAqXHJcbiAqIE5hbWVzIGFyZSBzZXBhcmF0ZWQgYnkgd2hpdGVzcGFjZXMsIGluIGEgc3RyaW5nIGFzIHdlbGwgYXMgd2l0aGluIHRoZSBlbnRyaWVzXHJcbiAqIG9mIGFuIGFycmF5IC0gc28gW1wiYVwiLCBcImIgY1wiXSBnaXZlcyB0aHJlZSBuYW1lcy5cclxuICpcclxuICogQSBzdHJpbmcgZ2V0cyB0cmltbWVkIGJlZm9yZSBpdCBpcyBzcGxpdCwgYmVjYXVzZSB0aGUgZW1wdHkgZW50cmllcyBhIGxlYWRpbmdcclxuICogb3IgdHJhaWxpbmcgd2hpdGVzcGFjZSBwcm9kdWNlcyBhcmUgYXJ0aWZhY3RzIG9mIHNwbGl0dGluZy4gQW4gZW1wdHkgZW50cnlcclxuICogd3JpdHRlbiBkb3duIGJ5IHRoZSBjYWxsZXIgdGhyb3dzIGluc3RlYWQsIGFzIGRvZXMgYW55dGhpbmcgdGhhdCBpcyBub3QgYVxyXG4gKiBzdHJpbmcgLSBjbGFzc0xpc3Qgd291bGQgb25seSByZXBvcnQgdGhvc2UgYXMgYW4gdW51c2FibGUgdG9rZW4sIG9yIHNpbGVudGx5XHJcbiAqIHRha2UgYSBib29sZWFuIGFzIGEgY2xhc3MgbmFtZWQgXCJ0cnVlXCIuXHJcbiAqXHJcbiAqIEBwYXJhbSB7c3RyaW5nfHN0cmluZ1tdfSB0aGVDbGFzc2VzXHJcbiAqIEByZXR1cm5zIHtJdGVyYWJsZTxzdHJpbmc+fSB0aGUgY2xhc3MgbmFtZXMsIG5ldmVyIGVtcHR5XHJcbiAqIEB0aHJvd3Mge0Vycm9yfSB3aGVuIG5vIG5hbWUgaXMgbGVmdCBvciBhbiBlbnRyeSBpcyBub3QgYSBub24gZW1wdHkgc3RyaW5nXHJcbiAqL1xyXG5jb25zdCB0b0NsYXNzTmFtZXMgPSAodGhlQ2xhc3NlcykgPT4ge1xyXG5cdGlmICh0aGVDbGFzc2VzID09IG51bGwpIHRocm93IG5ldyBFcnJvcihcIkNsYXNzIG5hbWVzIGFyZSByZXF1aXJlZCFcIik7XHJcblxyXG5cdGNvbnN0IGNsYXNzZXMgPSB0eXBlb2YgdGhlQ2xhc3NlcyA9PT0gXCJzdHJpbmdcIiA/IHRoZUNsYXNzZXMudHJpbSgpLnNwbGl0KENMQVNTU1BMSVRFUikgOiB0aGVDbGFzc2VzO1xyXG5cdGlmICh0eXBlb2YgY2xhc3Nlc1tTeW1ib2wuaXRlcmF0b3JdICE9PSBcImZ1bmN0aW9uXCIpIHRocm93IG5ldyBFcnJvcihcIkludmFsaWQgY2xhc3MgbmFtZXMhXCIpO1xyXG5cdGlmIChjbGFzc2VzLmxlbmd0aCA9PT0gMCkgdGhyb3cgbmV3IEVycm9yKFwiQ2xhc3MgbmFtZXMgYXJlIHJlcXVpcmVkIVwiKTtcclxuXHJcblx0Y29uc3QgcmVzdWx0ID0gW107XHJcblx0Zm9yIChsZXQgY2xhenogb2YgY2xhc3Nlcykge1xyXG5cdFx0aWYgKHR5cGVvZiBjbGF6eiAhPT0gXCJzdHJpbmdcIikgdGhyb3cgbmV3IEVycm9yKFwiSW52YWxpZCBjbGFzcyBuYW1lcyFcIik7XHJcblx0XHRjbGF6eiA9IGNsYXp6LnRyaW0oKTtcclxuXHRcdGlmIChjbGF6ei5sZW5ndGggPT09IDApIHRocm93IG5ldyBFcnJvcihcIkludmFsaWQgY2xhc3MgbmFtZXMhXCIpO1xyXG5cdFx0cmVzdWx0LnB1c2goLi4uY2xhenouc3BsaXQoQ0xBU1NTUExJVEVSKSk7XHJcblx0fVxyXG5cdFxyXG5cdHJldHVybiByZXN1bHQ7XHJcbn07XHJcblxyXG4vKipcclxuICogQnVpbGRzIGEgY2xhc3MgZnVuY3Rpb24sIGFzIGFkZCwgcmVtb3ZlIGFuZCB0b2dnbGUgb25seSBkaWZmZXIgYnkgdGhlIG1ldGhvZFxyXG4gKiB0aGV5IGNhbGwgb24gdGhlIGNsYXNzTGlzdC5cclxuICpcclxuICogQHBhcmFtIHtzdHJpbmd9IGFOYW1lIC0gdGhlIG5hbWUgb2YgdGhlIGNsYXNzTGlzdCBtZXRob2RcclxuICogQHJldHVybnMge2Z1bmN0aW9uKC4uLihzdHJpbmd8c3RyaW5nW10pKTpFbGVtZW50fSBhIGZ1bmN0aW9uIHRha2luZyBhbnkgbWl4IG9mIG5hbWVzLCBsaXN0cyBvZiBuYW1lcyBhbmQgYXJyYXlzIG9mIGJvdGhcclxuICovXHJcbmNvbnN0IGNsYXNzTGlzdEZ1bmN0aW9uID0gKGFOYW1lKSA9PlxyXG5cdGZ1bmN0aW9uICgpIHtcclxuXHRcdGNvbnN0IGNsYXNzZXMgPSB0b0NsYXNzTmFtZXMoQXJyYXkuZnJvbShhcmd1bWVudHMpLmZsYXQoKSk7XHJcblx0XHRjbGFzc2VzLmZvckVhY2goKGNsYXp6KSA9PiB0aGlzLmNsYXNzTGlzdFthTmFtZV0oY2xhenopKTtcclxuXHJcblx0XHRyZXR1cm4gdGhpcztcclxuXHR9O1xyXG5cclxuY29uc3Qgc3VwcG9ydCA9IEV4dGVuZGVyKFwiSHRtbENsYXNzU3VwcG9ydFwiLCAoUHJvdG90eXBlKSA9PiB7XHJcblx0LyoqXHJcblx0ICogQWRkcyBjbGFzcyBuYW1lcyB0byB0aGlzIGVsZW1lbnQuXHJcblx0ICpcclxuXHQgKiBAcGFyYW0gey4uLihzdHJpbmd8c3RyaW5nW10pfSB0aGVDbGFzc2VzIC0gbmFtZXMsIHdoaXRlc3BhY2Ugc2VwYXJhdGVkIGxpc3RzIG9mIG5hbWVzLCBvciBhcnJheXMgb2YgYm90aFxyXG5cdCAqIEByZXR1cm5zIHtFbGVtZW50fSB0aGlzXHJcblx0ICogQHRocm93cyB7RXJyb3J9IGJ5IGludmFsaWQgY2xhc3MgbmFtZXNcclxuXHQgKi9cclxuXHRQcm90b3R5cGUuYWRkQ2xhc3MgPSBjbGFzc0xpc3RGdW5jdGlvbihcImFkZFwiKTtcclxuXHJcblx0LyoqXHJcblx0ICogUmVtb3ZlcyBjbGFzcyBuYW1lcyBmcm9tIHRoaXMgZWxlbWVudC4gTmFtZXMgbm90IHByZXNlbnQgYXJlIGlnbm9yZWQuXHJcblx0ICpcclxuXHQgKiBAcGFyYW0gey4uLihzdHJpbmd8c3RyaW5nW10pfSB0aGVDbGFzc2VzIC0gbmFtZXMsIHdoaXRlc3BhY2Ugc2VwYXJhdGVkIGxpc3RzIG9mIG5hbWVzLCBvciBhcnJheXMgb2YgYm90aFxyXG5cdCAqIEByZXR1cm5zIHtFbGVtZW50fSB0aGlzXHJcblx0ICogQHRocm93cyB7RXJyb3J9IGJ5IGludmFsaWQgY2xhc3MgbmFtZXNcclxuXHQgKi9cclxuXHRQcm90b3R5cGUucmVtb3ZlQ2xhc3MgPSBjbGFzc0xpc3RGdW5jdGlvbihcInJlbW92ZVwiKTtcclxuXHJcblx0LyoqXHJcblx0ICogVG9nZ2xlcyBjbGFzcyBuYW1lcyBvZiB0aGlzIGVsZW1lbnQsIGVhY2ggb25lIG9uIGl0cyBvd24uXHJcblx0ICpcclxuXHQgKiBUaGUgZm9yY2UgcGFyYW1ldGVyIG9mIGNsYXNzTGlzdC50b2dnbGUgaXMgbm90IHN1cHBvcnRlZCAtIGEgYm9vbGVhbiBpcyBub3RcclxuXHQgKiBhIGNsYXNzIG5hbWUgYW5kIHRoZXJlZm9yZSB0aHJvd3MuXHJcblx0ICpcclxuXHQgKiBAcGFyYW0gey4uLihzdHJpbmd8c3RyaW5nW10pfSB0aGVDbGFzc2VzIC0gbmFtZXMsIHdoaXRlc3BhY2Ugc2VwYXJhdGVkIGxpc3RzIG9mIG5hbWVzLCBvciBhcnJheXMgb2YgYm90aFxyXG5cdCAqIEByZXR1cm5zIHtFbGVtZW50fSB0aGlzXHJcblx0ICogQHRocm93cyB7RXJyb3J9IGJ5IGludmFsaWQgY2xhc3MgbmFtZXNcclxuXHQgKi9cclxuXHRQcm90b3R5cGUudG9nZ2xlQ2xhc3MgPSBjbGFzc0xpc3RGdW5jdGlvbihcInRvZ2dsZVwiKTtcclxufSk7XHJcbmV4cG9ydCBkZWZhdWx0IHN1cHBvcnQ7IiwiaW1wb3J0IEV4dGVuZGVyIGZyb20gXCIuLi8uLi91dGlscy9FeHRlbmRlclwiO1xyXG5cclxuLyoqXHJcbiAqIEJ1aWxkcyBhIGxpc3QgZnVuY3Rpb24gYnkgZGVsZWdhdGluZyB0byB0aGUgYXJyYXkgZnVuY3Rpb24gb2YgdGhlIHNhbWUgbmFtZS5cclxuICpcclxuICogVGhlIGxpc3QgaXMgY29waWVkIGludG8gYW4gYXJyYXkgZmlyc3QuIFRoYXQgY29weSBpcyB3aGF0IG1ha2VzIHRoZXNlIGZ1bmN0aW9uc1xyXG4gKiBzYWZlIG9uIGEgbGl2ZSBIVE1MQ29sbGVjdGlvbjogbm9kZXMgbWF5IGJlIG1vdmVkIG9yIHJlbW92ZWQgd2hpbGUgaXRlcmF0aW5nLFxyXG4gKiB3aXRob3V0IHRoZSBpdGVyYXRpb24gc2tpcHBpbmcgdGhlIGVudHJpZXMgdGhhdCBzaGlmdCBpbnRvIHRoZWlyIHBsYWNlLlxyXG4gKlxyXG4gKiBAcGFyYW0ge3N0cmluZ30gYU5hbWUgLSB0aGUgbmFtZSBvZiB0aGUgYXJyYXkgZnVuY3Rpb25cclxuICogQHJldHVybnMge0Z1bmN0aW9ufSBhIGZ1bmN0aW9uIGJlaGF2aW5nIGxpa2UgdGhlIGFycmF5IGZ1bmN0aW9uIG9mIHRoYXQgbmFtZVxyXG4gKi9cclxuY29uc3QgYXJyYXlGdW5jdGlvbiA9IChhTmFtZSkgPT5cclxuXHRmdW5jdGlvbiAoKSB7XHJcblx0XHRyZXR1cm4gQXJyYXkucHJvdG90eXBlW2FOYW1lXS5hcHBseShBcnJheS5mcm9tKHRoaXMpLCBhcmd1bWVudHMpO1xyXG5cdH07XHJcblxyXG5jb25zdCBzdXBwb3J0ID0gRXh0ZW5kZXIoXCJMaXN0U3VwcG9ydFwiLCAoUHJvdG90eXBlKSA9PiB7XHJcblx0LyoqXHJcblx0ICogQHBhcmFtIHsqfSBhTm9kZSAtIHRoZSBub2RlIHRvIGxvb2sgZm9yXHJcblx0ICogQHBhcmFtIHtudW1iZXJ9IFthU3RhcnRdIC0gdGhlIGluZGV4IHRvIHN0YXJ0IGF0XHJcblx0ICogQHJldHVybnMge251bWJlcn0gdGhlIGluZGV4IG9mIHRoZSBub2RlLCBvciAtMVxyXG5cdCAqL1xyXG5cdFByb3RvdHlwZS5pbmRleE9mID0gYXJyYXlGdW5jdGlvbihcImluZGV4T2ZcIik7XHJcblxyXG5cdC8qKlxyXG5cdCAqIEBwYXJhbSB7Kn0gYU5vZGUgLSB0aGUgbm9kZSB0byBsb29rIGZvclxyXG5cdCAqIEBwYXJhbSB7bnVtYmVyfSBbYVN0YXJ0XSAtIHRoZSBpbmRleCB0byBzdGFydCBhdFxyXG5cdCAqIEByZXR1cm5zIHtib29sZWFufSB3aGV0aGVyIHRoZSBsaXN0IGNvbnRhaW5zIHRoZSBub2RlXHJcblx0ICovXHJcblx0UHJvdG90eXBlLmluY2x1ZGVzID0gYXJyYXlGdW5jdGlvbihcImluY2x1ZGVzXCIpO1xyXG5cclxuXHQvKipcclxuXHQgKiBDYWxscyB0aGUgZnVuY3Rpb24gZm9yIGVhY2ggbm9kZS5cclxuXHQgKlxyXG5cdCAqIEBwYXJhbSB7ZnVuY3Rpb24oTm9kZSxudW1iZXIsTm9kZVtdKTp2b2lkfSBhRnVuY3Rpb24gLSBjYWxsZWQgd2l0aCBub2RlLCBpbmRleCBhbmQgdGhlIGNvcGllZCBsaXN0XHJcblx0ICovXHJcblx0UHJvdG90eXBlLmZvckVhY2ggPSBhcnJheUZ1bmN0aW9uKFwiZm9yRWFjaFwiKTtcclxuXHJcblx0LyoqXHJcblx0ICogQHBhcmFtIHtmdW5jdGlvbihOb2RlLG51bWJlcixOb2RlW10pOip9IGFGdW5jdGlvblxyXG5cdCAqIEByZXR1cm5zIHtBcnJheX0gdGhlIHJlc3VsdHMsIGFuIGFycmF5IGFzIHRoZSByZXN1bHRzIGFyZSBub3Qgbm9kZXMgYW55bW9yZVxyXG5cdCAqL1xyXG5cdFByb3RvdHlwZS5tYXAgPSBhcnJheUZ1bmN0aW9uKFwibWFwXCIpO1xyXG5cclxuXHQvKipcclxuXHQgKiBAcGFyYW0ge2Z1bmN0aW9uKE5vZGUsbnVtYmVyLE5vZGVbXSk6Ym9vbGVhbn0gYUZ1bmN0aW9uXHJcblx0ICogQHJldHVybnMge2Jvb2xlYW59IHdoZXRoZXIgdGhlIGZ1bmN0aW9uIG1hdGNoZXMgYXQgbGVhc3Qgb25lIG5vZGVcclxuXHQgKi9cclxuXHRQcm90b3R5cGUuc29tZSA9IGFycmF5RnVuY3Rpb24oXCJzb21lXCIpO1xyXG5cclxuXHQvKipcclxuXHQgKiBAcGFyYW0ge2Z1bmN0aW9uKE5vZGUsbnVtYmVyLE5vZGVbXSk6Ym9vbGVhbn0gYUZ1bmN0aW9uXHJcblx0ICogQHJldHVybnMge2Jvb2xlYW59IHdoZXRoZXIgdGhlIGZ1bmN0aW9uIG1hdGNoZXMgZXZlcnkgbm9kZVxyXG5cdCAqL1xyXG5cdFByb3RvdHlwZS5ldmVyeSA9IGFycmF5RnVuY3Rpb24oXCJldmVyeVwiKTtcclxuXHJcblx0LyoqXHJcblx0ICogQHBhcmFtIHtmdW5jdGlvbigqLE5vZGUsbnVtYmVyLE5vZGVbXSk6Kn0gYUZ1bmN0aW9uXHJcblx0ICogQHBhcmFtIHsqfSBbYUluaXRpYWxWYWx1ZV1cclxuXHQgKiBAcmV0dXJucyB7Kn0gdGhlIGFjY3VtdWxhdGVkIHJlc3VsdFxyXG5cdCAqL1xyXG5cdFByb3RvdHlwZS5yZWR1Y2UgPSBhcnJheUZ1bmN0aW9uKFwicmVkdWNlXCIpO1xyXG5cclxuXHQvKipcclxuXHQgKiBGaWx0ZXJzIHRoZSBsaXN0LlxyXG5cdCAqXHJcblx0ICogVW5saWtlIG1hcCB0aGlzIGtlZXBzIHRoZSB0eXBlIG9mIHRoZSBsaXN0IC0gYSBOb2RlTGlzdCByZXR1cm5zIGEgTm9kZUxpc3QsIGFcclxuXHQgKiBIVE1MQ29sbGVjdGlvbiByZXR1cm5zIGEgSFRNTENvbGxlY3Rpb24gLSBzbyBhIGZpbHRlcmVkIGxpc3QgY2FuIGJlIHVzZWQgbGlrZVxyXG5cdCAqIGFueSBvdGhlciBvbmUuIFRoZSByZXN1bHQgaXMgYSBuZXcgbGlzdCwgaXQgaXMgbm90IGxpdmUgYW55bW9yZS5cclxuXHQgKlxyXG5cdCAqIEBwYXJhbSB7ZnVuY3Rpb24oTm9kZSxudW1iZXIsTm9kZVtdKTpib29sZWFufSBhRnVuY3Rpb25cclxuXHQgKiBAcmV0dXJucyB7Tm9kZUxpc3R8SFRNTENvbGxlY3Rpb259IHRoZSBtYXRjaGluZyBub2Rlc1xyXG5cdCAqL1xyXG5cdFByb3RvdHlwZS5maWx0ZXIgPSBmdW5jdGlvbiAoKSB7XHJcblx0XHRjb25zdCByZXN1bHQgPSBBcnJheS5wcm90b3R5cGUuZmlsdGVyLmFwcGx5KEFycmF5LmZyb20odGhpcyksIGFyZ3VtZW50cyk7XHJcblxyXG5cdFx0cmV0dXJuIHRoaXMuY29uc3RydWN0b3IuZnJvbShyZXN1bHQpO1xyXG5cdH07XHJcblxyXG5cdC8qKlxyXG5cdCAqIEByZXR1cm5zIHtOb2RlfHVuZGVmaW5lZH0gdGhlIGZpcnN0IG5vZGUsIG9yIHVuZGVmaW5lZCB3aGVuIHRoZSBsaXN0IGlzIGVtcHR5XHJcblx0ICovXHJcblx0UHJvdG90eXBlLmZpcnN0ID0gZnVuY3Rpb24gKCkge1xyXG5cdFx0aWYgKHRoaXMubGVuZ3RoID4gMCkgcmV0dXJuIHRoaXNbMF07XHJcblx0fTtcclxuXHJcblx0LyoqXHJcblx0ICogQHJldHVybnMge05vZGV8dW5kZWZpbmVkfSB0aGUgbGFzdCBub2RlLCBvciB1bmRlZmluZWQgd2hlbiB0aGUgbGlzdCBpcyBlbXB0eVxyXG5cdCAqL1xyXG5cdFByb3RvdHlwZS5sYXN0ID0gZnVuY3Rpb24gKCkge1xyXG5cdFx0aWYgKHRoaXMubGVuZ3RoID4gMCkgcmV0dXJuIHRoaXNbdGhpcy5sZW5ndGggLSAxXTtcclxuXHR9O1xyXG59KTtcclxuZXhwb3J0IGRlZmF1bHQgc3VwcG9ydDsiLCJpbXBvcnQgZXh0ZW5kUHJvdG90eXBlIGZyb20gXCIuLi8uLi91dGlscy9FeHRlbmRQcm90b3R5cGVcIjtcbmltcG9ydCBEZWxlZ2F0ZXJCdWlsZGVyIGZyb20gXCIuLi8uLi91dGlscy9EZWxlZ2F0ZXJCdWlsZGVyXCI7XG5pbXBvcnQgTGlzdFN1cHBvcnQgZnJvbSBcIi4vTGlzdFN1cHBvcnRcIjtcblxuLyoqXG4gKiBTZXRzIHVwIGEgZG9tIGxpc3QgdHlwZSAtIE5vZGVMaXN0IG9yIEhUTUxDb2xsZWN0aW9uIC0gdGhlIHNhbWUgd2F5LlxuICpcbiAqIFRoZSB0d28gb25seSBkaWZmZXIgYnkgdGhlaXIgb3duIHR5cGUgYW5kIHRoZSBlbGVtZW50IHR5cGUgdGhleSBob2xkLCBzbyB0aGlzXG4gKiBidWlsZHMgYm90aCBmcm9tIHRob3NlIHR3byBwYXJhbWV0ZXJzOiBpdCBhcHBsaWVzIExpc3RTdXBwb3J0LCBhZGRzIGFwcGx5VG8sXG4gKiB2YWwgYW5kIHRoZSBzdGF0aWMgZnJvbSwgYW5kIHdpcmVzIHRoZSBkZWxlZ2F0aW9uIHRoYXQgbGV0cyBhIGxpc3QgZm9yd2FyZFxuICogZXZlcnkgbWV0aG9kIG9mIGl0cyBlbGVtZW50cy5cbiAqXG4gKiBAcGFyYW0ge0Z1bmN0aW9ufSBMaXN0VHlwZSAtIHRoZSBsaXN0IHR5cGUsIE5vZGVMaXN0IG9yIEhUTUxDb2xsZWN0aW9uXG4gKiBAcGFyYW0ge0Z1bmN0aW9ufSBFbGVtZW50VHlwZSAtIHRoZSB0eXBlIG9mIHRoZSBpdGVtcywgTm9kZSBvciBIVE1MRWxlbWVudFxuICovXG5jb25zdCBidWlsZExpc3RUeXBlID0gKExpc3RUeXBlLCBFbGVtZW50VHlwZSkgPT4ge1xuXHRleHRlbmRQcm90b3R5cGUoTGlzdFR5cGUsIExpc3RTdXBwb3J0KTtcblxuXHQvKipcblx0ICogQXBwbGllcyBhIGZ1bmN0aW9uIG9yIGEgbWV0aG9kIHRvIGVhY2ggaXRlbSBhbmQgY29sbGVjdHMgdGhlIHJlc3VsdHMuXG5cdCAqXG5cdCAqIEEgZnVuY3Rpb24gaXMgY2FsbGVkIHdpdGggdGhlIGl0ZW0gZm9sbG93ZWQgYnkgdGhlIGV4dHJhIGFyZ3VtZW50cy4gQSBzdHJpbmdcblx0ICogaXMgdGFrZW4gYXMgdGhlIG5hbWUgb2YgYSBtZXRob2QgdG8gY2FsbCBvbiBlYWNoIGl0ZW0gd2l0aCB0aG9zZSBhcmd1bWVudHMuXG5cdCAqIE51bGwgcmVzdWx0cyBhcmUgc2tpcHBlZC5cblx0ICpcblx0ICogQHBhcmFtIHtGdW5jdGlvbnxzdHJpbmd9IGNhbGxpbmcgLSBhIGZ1bmN0aW9uIHRvIGNhbGwsIG9yIHRoZSBuYW1lIG9mIGEgbWV0aG9kXG5cdCAqIEBwYXJhbSB7Li4uKn0gdGhlQXJndW1lbnRzIC0gcGFzc2VkIHRvIHRoZSBmdW5jdGlvbiBvciBtZXRob2Rcblx0ICogQHJldHVybnMge0FycmF5fSB0aGUgY29sbGVjdGVkIHJlc3VsdHNcblx0ICovXG5cdExpc3RUeXBlLnByb3RvdHlwZS5hcHBseVRvID0gZnVuY3Rpb24gKCkge1xuXHRcdGNvbnN0IGFyZ3MgPSBBcnJheS5mcm9tKGFyZ3VtZW50cyk7XG5cdFx0Y29uc3QgY2FsbGluZyA9IGFyZ3Muc2hpZnQoKTtcblx0XHRjb25zdCBpc0Z1bmN0aW9uID0gdHlwZW9mIGNhbGxpbmcgPT09IFwiZnVuY3Rpb25cIjtcblx0XHRjb25zdCByZXN1bHRzID0gW107XG5cdFx0Zm9yIChsZXQgaSA9IDA7IGkgPCB0aGlzLmxlbmd0aDsgaSsrKSB7XG5cdFx0XHRjb25zdCBub2RlID0gdGhpc1tpXTtcblx0XHRcdGxldCByZXN1bHQ7XG5cdFx0XHRpZiAoaXNGdW5jdGlvbikgcmVzdWx0ID0gY2FsbGluZy5hcHBseShudWxsLCBbbm9kZV0uY29uY2F0KGFyZ3MpKTtcblx0XHRcdGVsc2UgaWYgKHR5cGVvZiBub2RlW2NhbGxpbmddID09PSBcImZ1bmN0aW9uXCIpIHJlc3VsdCA9IG5vZGVbY2FsbGluZ10uYXBwbHkobm9kZSwgYXJncyk7XG5cblx0XHRcdGlmIChyZXN1bHQgIT0gbnVsbCkgcmVzdWx0cy5wdXNoKHJlc3VsdCk7XG5cdFx0fVxuXG5cdFx0cmV0dXJuIHJlc3VsdHM7XG5cdH07XG5cblx0LyoqXG5cdCAqIFJlYWRzIG9yIHdyaXRlcyB0aGUgdmFsdWUgb2YgdGhlIGl0ZW1zLlxuXHQgKlxuXHQgKiBXaXRob3V0IGFyZ3VtZW50cyB0aGUgdmFsdWVzIGFyZSBjb2xsZWN0ZWQgaW50byBhIE1hcCwga2V5ZWQgYnkgdGhlIG5hbWUsIGlkXG5cdCAqIG9yIHNlbGVjdG9yIG9mIGVhY2ggaXRlbSAtIGl0ZW1zIHdpdGhvdXQgYSB2YWx1ZSBhcmUgbGVmdCBvdXQsIHNvIGFuIHVuY2hlY2tlZFxuXHQgKiByYWRpbyBkb2VzIG5vdCBvdmVyd3JpdGUgdGhlIHNlbGVjdGVkIG9uZSBvZiBpdHMgZ3JvdXAuIFdpdGggYXJndW1lbnRzIHRoZVxuXHQgKiB2YWx1ZSBpcyBzZXQgb24gZXZlcnkgaXRlbS5cblx0ICpcblx0ICogQHBhcmFtIHsuLi4qfSBbdGhlVmFsdWVdIC0gdGhlIHZhbHVlIHRvIHNldCBvbiB0aGUgaXRlbXNcblx0ICogQHJldHVybnMge01hcDxzdHJpbmcsKj58TGlzdFR5cGV9IHRoZSB2YWx1ZXMgYnkga2V5LCBvciB0aGlzIHdoZW4gYSB2YWx1ZSB3YXMgc2V0XG5cdCAqL1xuXHRMaXN0VHlwZS5wcm90b3R5cGUudmFsID0gZnVuY3Rpb24gKCkge1xuXHRcdGlmIChhcmd1bWVudHMubGVuZ3RoID09IDApIHtcblx0XHRcdGNvbnN0IHJlc3VsdCA9IG5ldyBNYXAoKTtcblx0XHRcdGZvciAoY29uc3Qgbm9kZSBvZiB0aGlzKSB7XG5cdFx0XHRcdGlmICh0eXBlb2Ygbm9kZS52YWwgPT09IFwiZnVuY3Rpb25cIikge1xuXHRcdFx0XHRcdGNvbnN0IHZhbHVlID0gbm9kZS52YWwoKTtcblx0XHRcdFx0XHRpZiAodmFsdWUgIT0gbnVsbCkgcmVzdWx0LnNldChub2RlLm5hbWUgfHwgbm9kZS5pZCB8fCBub2RlLnNlbGVjdG9yKCksIHZhbHVlKTtcblx0XHRcdFx0fVxuXHRcdFx0fVxuXHRcdFx0cmV0dXJuIHJlc3VsdDtcblx0XHR9IGVsc2UgdGhpcy5hcHBseVRvKFwidmFsXCIsIC4uLmFyZ3VtZW50cyk7XG5cblx0XHRyZXR1cm4gdGhpcztcblx0fTtcblxuXHQvKipcblx0ICogQnVpbGRzIGEgbGlzdCBmcm9tIG5vZGVzLCBvdGhlciBsaXN0cyBhbmQgYXJyYXlzIG9mIHRoZW0uXG5cdCAqXG5cdCAqIEV2ZXJ5IGFyZ3VtZW50IHRoYXQgaXMgYW4gaXRlbSBpcyB0YWtlbiwgYW4gaXRlcmFibGUgaXMgcmVhZCBpdGVtIGJ5IGl0ZW0sIHNvXG5cdCAqIGFueSBtaXggY2FuIGJlIHBhc3NlZC4gQW55dGhpbmcgdGhhdCBpcyBub3QgYW4gaXRlbSBpcyBsZWZ0IG91dC4gVGhlIHJlc3VsdCBpc1xuXHQgKiBhIHBsYWluIGxpc3QsIG5vdCBhIGxpdmUgb25lLlxuXHQgKlxuXHQgKiBAcGFyYW0gey4uLihFbGVtZW50VHlwZXxJdGVyYWJsZSl9IHRoZUl0ZW1zXG5cdCAqIEByZXR1cm5zIHtMaXN0VHlwZX0gYSBuZXcgbGlzdCBvZiB0aGUgaXRlbXNcblx0ICovXG5cdExpc3RUeXBlLmZyb20gPSBmdW5jdGlvbiAoKSB7XG5cdFx0Y29uc3QgYXJncyA9IEFycmF5LmZyb20oYXJndW1lbnRzKTtcblx0XHRjb25zdCBkYXRhID0ge307XG5cdFx0bGV0IGNvdW50ZXIgPSAwO1xuXG5cdFx0d2hpbGUgKGFyZ3MubGVuZ3RoID4gMCkge1xuXHRcdFx0Y29uc3QgYXJnID0gYXJncy5zaGlmdCgpO1xuXHRcdFx0aWYgKGFyZyAhPSBudWxsKSB7XG5cdFx0XHRcdGlmIChhcmcgaW5zdGFuY2VvZiBFbGVtZW50VHlwZSkgZGF0YVtjb3VudGVyKytdID0geyB2YWx1ZTogYXJnLCBlbnVtZXJhYmxlOiB0cnVlIH07XG5cdFx0XHRcdGVsc2UgaWYgKHR5cGVvZiBhcmdbU3ltYm9sLml0ZXJhdG9yXSA9PT0gXCJmdW5jdGlvblwiKSB7XG5cdFx0XHRcdFx0Zm9yIChsZXQgaXRlbSBvZiBhcmcpIHtcblx0XHRcdFx0XHRcdGlmIChpdGVtIGluc3RhbmNlb2YgRWxlbWVudFR5cGUpIGRhdGFbY291bnRlcisrXSA9IHsgdmFsdWU6IGl0ZW0sIGVudW1lcmFibGU6IHRydWUgfTtcblx0XHRcdFx0XHR9XG5cdFx0XHRcdH1cblx0XHRcdH1cblx0XHR9XG5cblx0XHRkYXRhLmxlbmd0aCA9IHsgdmFsdWU6IGNvdW50ZXIgfTtcblx0XHRyZXR1cm4gT2JqZWN0LmNyZWF0ZShMaXN0VHlwZS5wcm90b3R5cGUsIGRhdGEpO1xuXHR9O1xuXG5cdERlbGVnYXRlckJ1aWxkZXIoXG5cdFx0ZnVuY3Rpb24gKGFGdW5jdGlvbk5hbWUsIHRoZUFyZ3VtZW50cykge1xuXHRcdFx0bGV0IHJlc3VsdHMgPSBbXTtcblx0XHRcdHRoaXMuZm9yRWFjaCgobm9kZSkgPT4ge1xuXHRcdFx0XHRpZiAobm9kZSAmJiB0eXBlb2Ygbm9kZVthRnVuY3Rpb25OYW1lXSA9PT0gXCJmdW5jdGlvblwiKSB7XG5cdFx0XHRcdFx0Y29uc3QgcmVzdWx0ID0gbm9kZVthRnVuY3Rpb25OYW1lXS5hcHBseShub2RlLCB0aGVBcmd1bWVudHMpO1xuXHRcdFx0XHRcdGlmIChyZXN1bHQgIT0gbnVsbCkge1xuXHRcdFx0XHRcdFx0aWYgKHJlc3VsdCBpbnN0YW5jZW9mIExpc3RUeXBlKSByZXN1bHRzID0gcmVzdWx0cy5jb25jYXQoQXJyYXkuZnJvbShyZXN1bHQpKTtcblx0XHRcdFx0XHRcdGVsc2UgcmVzdWx0cy5wdXNoKHJlc3VsdCk7XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHR9XG5cdFx0XHR9KTtcblxuXHRcdFx0aWYgKHJlc3VsdHMubGVuZ3RoID09PSAwKSByZXR1cm4gdW5kZWZpbmVkO1xuXHRcdFx0ZWxzZSBpZiAocmVzdWx0c1swXSBpbnN0YW5jZW9mIEVsZW1lbnRUeXBlIHx8IHJlc3VsdHNbMF0gaW5zdGFuY2VvZiBMaXN0VHlwZSkgcmV0dXJuIExpc3RUeXBlLmZyb20ocmVzdWx0cyk7XG5cdFx0XHRlbHNlIHJldHVybiByZXN1bHRzO1xuXHRcdH0sXG5cdFx0TGlzdFR5cGUucHJvdG90eXBlLFxuXHRcdE5vZGUucHJvdG90eXBlLFxuXHRcdEhUTUxFbGVtZW50LnByb3RvdHlwZSxcblx0XHRIVE1MSW5wdXRFbGVtZW50LnByb3RvdHlwZSxcblx0XHRFbGVtZW50LnByb3RvdHlwZSxcblx0XHRFdmVudFRhcmdldC5wcm90b3R5cGUsXG5cdCk7XG59O1xuXG5leHBvcnQgZGVmYXVsdCBidWlsZExpc3RUeXBlO1xuIiwiaW1wb3J0IEV4dGVuZGVyIGZyb20gXCIuLi8uLi91dGlscy9FeHRlbmRlclwiO1xyXG5cclxuLyoqXHJcbiAqIENvbnRlbnQgYWNjZXB0ZWQgYnkgdGhlIGluc2VydCBmdW5jdGlvbnMuXHJcbiAqXHJcbiAqIEB0eXBlZGVmIHtOb2RlfE5vZGVMaXN0fEhUTUxDb2xsZWN0aW9ufENvbnRlbnRbXXxzdHJpbmd9IENvbnRlbnRcclxuICovXHJcblxyXG4vKipcclxuICogTm9ybWFsaXplcyBjb250ZW50IHRvIGEgZmxhdCBsaXN0IG9mIG5vZGVzLlxyXG4gKlxyXG4gKiBTdHJpbmdzIGFyZSBwYXJzZWQgdG8gbm9kZXMgYnkgdGhlIGdsb2JhbCBjcmVhdGUoKSwgbGlzdHMgYW5kIGFycmF5cyBhcmUgdGFrZW5cclxuICogaXRlbSBieSBpdGVtLCBzbyBhbnkgbWl4IG9mIHRoZW0gY2FuIGJlIHBhc3NlZC4gTGlzdHMgYXJlIHJlYWQgaW50byBhbiBhcnJheVxyXG4gKiBiZWZvcmUgYW55dGhpbmcgaXMgaW5zZXJ0ZWQsIGJlY2F1c2UgaW5zZXJ0aW5nIGEgbm9kZSByZW1vdmVzIGl0IGZyb20gdGhlIGxpc3RcclxuICogaXQgY2FtZSBmcm9tIC0gaXRlcmF0aW5nIHRoYXQgbGlzdCB3aGlsZSBpbnNlcnRpbmcgd291bGQgc2tpcCBldmVyeSBvdGhlciBub2RlLlxyXG4gKlxyXG4gKiBTdHJpbmdzIGFyZSBub3QgdHJpbW1lZCBhbmQgYW4gZW1wdHkgb25lIGlzIGFjY2VwdGVkOiB1bmxpa2UgZXZlbnQgdHlwZXMgb3JcclxuICogY2xhc3MgbmFtZXMsIHdoaXRlc3BhY2UgaXMgY29udGVudC4gXCIgICBcIiBiZWNvbWVzIGEgdGV4dCBub2RlLCBcIlwiIGJlY29tZXMgbm9cclxuICogbm9kZSBhdCBhbGwuIE9ubHkgdGhlIGFic2VuY2Ugb2YgYW55IGFyZ3VtZW50IGlzIGFuIGVycm9yLlxyXG4gKlxyXG4gKiBAcGFyYW0gey4uLkNvbnRlbnR9IHRoZUNvbnRlbnRcclxuICogQHJldHVybnMge05vZGVbXX0gdGhlIG5vZGVzLCBlbXB0eSB3aGVuIHRoZSBjb250ZW50IHByb2R1Y2VkIG5vbmVcclxuICogQHRocm93cyB7RXJyb3J9IHdoZW4gdGhlcmUgaXMgbm8gY29udGVudCBhdCBhbGwgb3IgYW4gaXRlbSBpcyBub3QgY29udGVudFxyXG4gKi9cclxuY29uc3QgdG9Ob2RlcyA9IGZ1bmN0aW9uICgpIHtcclxuXHRjb25zdCBjb250ZW50ID0gQXJyYXkuZnJvbShhcmd1bWVudHMpLmZsYXQoSW5maW5pdHkpO1xyXG5cdGlmIChjb250ZW50Lmxlbmd0aCA9PT0gMCkgdGhyb3cgbmV3IEVycm9yKFwiQ29udGVudCBpcyByZXF1aXJlZCFcIik7XHJcblxyXG5cdHJldHVybiBjb250ZW50XHJcblx0XHQubWFwKChpdGVtKSA9PiB7XHJcblx0XHRcdGlmIChpdGVtIGluc3RhbmNlb2YgTm9kZSkgcmV0dXJuIGl0ZW07XHJcblx0XHRcdGlmIChpdGVtIGluc3RhbmNlb2YgTm9kZUxpc3QgfHwgaXRlbSBpbnN0YW5jZW9mIEhUTUxDb2xsZWN0aW9uKSByZXR1cm4gQXJyYXkuZnJvbShpdGVtKTtcclxuXHRcdFx0aWYgKHR5cGVvZiBpdGVtID09PSBcInN0cmluZ1wiKSByZXR1cm4gQXJyYXkuZnJvbShjcmVhdGUoaXRlbSkpO1xyXG5cclxuXHRcdFx0dGhyb3cgbmV3IEVycm9yKFwiSW52YWxpZCBjb250ZW50IVwiKTtcclxuXHRcdH0pXHJcblx0XHQuZmxhdCgpO1xyXG59O1xyXG5cclxuY29uc3Qgc3VwcG9ydCA9IEV4dGVuZGVyKFwiTWFuaXB1bGF0aW9uU3VwcG9ydFwiLCBQcm90b3R5cGUgPT4ge1xyXG5cdC8qKlxyXG5cdCAqIFJlbW92ZXMgYWxsIGNoaWxkIG5vZGVzLlxyXG5cdCAqXHJcblx0ICogQHJldHVybnMge05vZGV9IHRoaXNcclxuXHQgKi9cclxuXHRQcm90b3R5cGUuZW1wdHkgPSBmdW5jdGlvbigpe1xyXG5cdFx0Y29uc3Qgbm9kZXMgPSB0aGlzLmNoaWxkTm9kZXM7XHJcblx0XHR3aGlsZShub2Rlcy5sZW5ndGggIT0gMClcdFx0XHRcclxuXHRcdFx0bm9kZXNbMF0ucmVtb3ZlKHRydWUpO1xyXG5cdFx0XHJcblx0XHRyZXR1cm4gdGhpcztcclxuXHR9O1xyXG5cdFxyXG5cdC8qKlxyXG5cdCAqIEByZXR1cm5zIHtOb2RlTGlzdH0gdGhlIGxpdmUgbGlzdCBvZiBjaGlsZCBub2Rlc1xyXG5cdCAqL1xyXG5cdFByb3RvdHlwZS5jb250ZW50ID0gZnVuY3Rpb24oKXtcclxuXHRcdHJldHVybiB0aGlzLmNoaWxkTm9kZXM7XHJcblx0fTtcdFxyXG5cdFxyXG5cdC8qKlxyXG5cdCAqIEdldHMgb3Igc2V0cyB0aGUgbWFya3VwIG9mIHRoaXMgbm9kZS5cclxuXHQgKlxyXG5cdCAqIGh0bWwoKSByZXR1cm5zIHRoZSBpbm5lckhUTUwsIGh0bWwodHJ1ZSkgdGhlIG91dGVySFRNTCBhbmQgaHRtbChmYWxzZSkgdGhlXHJcblx0ICogaW5uZXJIVE1MLiBBbnkgb3RoZXIgYXJndW1lbnQgcmVwbGFjZXMgYWxsIGNoaWxkcmVuIGJ5IHRoZSBnaXZlbiBjb250ZW50LlxyXG5cdCAqXHJcblx0ICogQHBhcmFtIHsuLi4oYm9vbGVhbnxDb250ZW50KX0gdGhlQ29udGVudCAtIG51bGwgb3IgdW5kZWZpbmVkIHRocm93c1xyXG5cdCAqIEByZXR1cm5zIHtzdHJpbmd8Tm9kZX0gdGhlIG1hcmt1cCwgb3IgdGhpcyB3aGVuIGNvbnRlbnQgd2FzIHNldFxyXG5cdCAqL1xyXG5cdFByb3RvdHlwZS5odG1sID0gZnVuY3Rpb24oKXtcclxuXHRcdGlmKGFyZ3VtZW50cy5sZW5ndGggPT0gMClcclxuXHRcdFx0cmV0dXJuIHRoaXMuaW5uZXJIVE1MO1xyXG5cdFx0ZWxzZSBpZihhcmd1bWVudHMubGVuZ3RoID09IDEgJiYgdHlwZW9mIGFyZ3VtZW50c1swXSA9PT0gXCJib29sZWFuXCIpXHJcblx0XHRcdGlmKGFyZ3VtZW50c1swXSlcclxuXHRcdFx0XHRyZXR1cm4gdGhpcy5vdXRlckhUTUw7XHJcblx0XHRcdGVsc2VcclxuXHRcdFx0XHRyZXR1cm4gdGhpcy5pbm5lckhUTUw7XHJcblx0XHRlbHNlIHtcclxuXHRcdFx0Y29uc3Qgbm9kZXMgPSB0b05vZGVzKEFycmF5LmZyb20oYXJndW1lbnRzKSk7XHJcblx0XHRcdHRoaXMuZW1wdHkoKTtcclxuXHRcdFx0bm9kZXMuZm9yRWFjaChub2RlID0+IHRoaXMuYXBwZW5kQ2hpbGQobm9kZSkpO1xyXG5cdFx0fVxyXG5cclxuXHRcdHJldHVybiB0aGlzO1xyXG5cdH07XHJcblx0XHJcblx0LyoqXHJcblx0ICogQXBwZW5kcyB0aGUgY29udGVudCBhcyBsYXN0IGNoaWxkcmVuLlxyXG5cdCAqXHJcblx0ICogQHBhcmFtIHsuLi5Db250ZW50fSB0aGVDb250ZW50XHJcblx0ICogQHJldHVybnMge05vZGV9IHRoaXNcclxuXHQgKiBAdGhyb3dzIHtFcnJvcn0gYnkgaW52YWxpZCBjb250ZW50XHJcblx0ICovXHJcblx0UHJvdG90eXBlLmFwcGVuZCA9IGZ1bmN0aW9uKCl7XHJcblx0XHR0b05vZGVzKEFycmF5LmZyb20oYXJndW1lbnRzKSkuZm9yRWFjaChub2RlID0+IHRoaXMuYXBwZW5kQ2hpbGQobm9kZSkpO1xyXG5cclxuXHRcdHJldHVybiB0aGlzO1xyXG5cdH07XHJcblxyXG5cdC8qKlxyXG5cdCAqIEluc2VydHMgdGhlIGNvbnRlbnQgYXMgZmlyc3QgY2hpbGRyZW4uXHJcblx0ICpcclxuXHQgKiBAcGFyYW0gey4uLkNvbnRlbnR9IHRoZUNvbnRlbnRcclxuXHQgKiBAcmV0dXJucyB7Tm9kZX0gdGhpc1xyXG5cdCAqIEB0aHJvd3Mge0Vycm9yfSBieSBpbnZhbGlkIGNvbnRlbnRcclxuXHQgKi9cclxuXHRQcm90b3R5cGUucHJlcGVuZCA9IGZ1bmN0aW9uKCl7XHJcblx0XHRjb25zdCBub2RlcyA9IHRvTm9kZXMoQXJyYXkuZnJvbShhcmd1bWVudHMpKTtcclxuXHRcdGNvbnN0IGZpcnN0ID0gdGhpcy5maXJzdENoaWxkO1xyXG5cdFx0bm9kZXMuZm9yRWFjaChub2RlID0+IHRoaXMuaW5zZXJ0QmVmb3JlKG5vZGUsIGZpcnN0KSk7XHJcblxyXG5cdFx0cmV0dXJuIHRoaXM7XHJcblx0fTtcclxuXHJcblx0LyoqXHJcblx0ICogUmVwbGFjZXMgYSBub2RlIGJ5IHRoZSBnaXZlbiBjb250ZW50LlxyXG5cdCAqXHJcblx0ICogQ2FsbGVkIHdpdGggb25lIGFyZ3VtZW50LCB0aGlzIG5vZGUgaXMgcmVwbGFjZWQgd2l0aGluIGl0cyBwYXJlbnQgbm9kZS5cclxuXHQgKiBDYWxsZWQgd2l0aCBtb3JlLCB0aGUgZmlyc3Qgb25lIC0gYSBjaGlsZCBvZiB0aGlzIG5vZGUgLSBpcyByZXBsYWNlZCBieSB0aGVcclxuXHQgKiBjb250ZW50IGZvbGxvd2luZyBpdC5cclxuXHQgKlxyXG5cdCAqIEBwYXJhbSB7Li4uQ29udGVudH0gdGhlQ29udGVudCAtIHRoZSBuZXcgY29udGVudCwgb3IgdGhlIG9sZCBub2RlIGZvbGxvd2VkIGJ5IHRoZSBuZXcgY29udGVudFxyXG5cdCAqIEByZXR1cm5zIHtOb2RlfSB0aGlzLCBldmVuIHdoZW4gdGhpcyBub2RlIHdhcyB0aGUgcmVwbGFjZWQgb25lXHJcblx0ICogQHRocm93cyB7RXJyb3J9IHdoZW4gY2FsbGVkIHdpdGhvdXQgYXJndW1lbnRzIG9yIGJ5IGludmFsaWQgY29udGVudFxyXG5cdCAqL1xyXG5cdFByb3RvdHlwZS5yZXBsYWNlID0gZnVuY3Rpb24oKXtcclxuXHRcdGlmKGFyZ3VtZW50cy5sZW5ndGggPCAxKVxyXG5cdFx0XHR0aHJvdyBuZXcgRXJyb3IoXCJJbnN1ZmZpY2llbnQgYXJndW1lbnRzISBPbmUgb3IgdHdvIG5vZGVzIHJlcXVpcmVkIVwiKTtcclxuXHJcblx0XHRjb25zdCBwYXJlbnQgPSBhcmd1bWVudHMubGVuZ3RoID09IDEgPyB0aGlzLnBhcmVudE5vZGUgOiB0aGlzO1xyXG5cdFx0Y29uc3Qgb2xkTm9kZSA9IGFyZ3VtZW50cy5sZW5ndGggPT0gMSA/IHRoaXMgOiBhcmd1bWVudHNbMF07XHJcblx0XHRjb25zdCBub2RlcyA9IHRvTm9kZXMoYXJndW1lbnRzLmxlbmd0aCA9PSAxID8gYXJndW1lbnRzWzBdIDogQXJyYXkuZnJvbShhcmd1bWVudHMpLnNsaWNlKDEpKTtcclxuXHJcblx0XHRub2Rlcy5mb3JFYWNoKG5vZGUgPT4gcGFyZW50Lmluc2VydEJlZm9yZShub2RlLCBvbGROb2RlKSk7XHJcblx0XHRvbGROb2RlLnJlbW92ZSgpO1xyXG5cclxuXHRcdHJldHVybiB0aGlzO1xyXG5cdH07XHJcblxyXG5cdC8qKlxyXG5cdCAqIEluc2VydHMgdGhlIGNvbnRlbnQgZGlyZWN0bHkgYWZ0ZXIgdGhpcyBub2RlLlxyXG5cdCAqXHJcblx0ICogQHBhcmFtIHsuLi5Db250ZW50fSB0aGVDb250ZW50XHJcblx0ICogQHJldHVybnMge05vZGV9IHRoaXNcclxuXHQgKiBAdGhyb3dzIHtFcnJvcn0gd2hlbiB0aGlzIG5vZGUgaGFzIG5vIHBhcmVudCBub2RlIG9yIGJ5IGludmFsaWQgY29udGVudFxyXG5cdCAqL1xyXG5cdFByb3RvdHlwZS5hZnRlciA9IGZ1bmN0aW9uKCl7XHJcblx0XHRpZih0aGlzLnBhcmVudE5vZGUgPT0gbnVsbClcclxuXHRcdFx0dGhyb3cgbmV3IEVycm9yKFwiQ2FuJ3QgaW5zZXJ0IG5vZGVzIGFmdGVyIHRoaXMgbm9kZSEgUGFyZW50IG5vZGUgbm90IGF2YWlsYWJsZSFcIik7XHJcblxyXG5cdFx0Y29uc3QgcGFyZW50ID0gdGhpcy5wYXJlbnROb2RlO1xyXG5cdFx0Y29uc3QgbmV4dCA9IHRoaXMubmV4dFNpYmxpbmc7XHJcblx0XHR0b05vZGVzKEFycmF5LmZyb20oYXJndW1lbnRzKSkuZm9yRWFjaChub2RlID0+IHBhcmVudC5pbnNlcnRCZWZvcmUobm9kZSwgbmV4dCkpO1xyXG5cclxuXHRcdHJldHVybiB0aGlzO1xyXG5cdH07XHJcblxyXG5cdC8qKlxyXG5cdCAqIEluc2VydHMgdGhlIGNvbnRlbnQgZGlyZWN0bHkgYmVmb3JlIHRoaXMgbm9kZS5cclxuXHQgKlxyXG5cdCAqIEBwYXJhbSB7Li4uQ29udGVudH0gdGhlQ29udGVudFxyXG5cdCAqIEByZXR1cm5zIHtOb2RlfSB0aGlzXHJcblx0ICogQHRocm93cyB7RXJyb3J9IHdoZW4gdGhpcyBub2RlIGhhcyBubyBwYXJlbnQgbm9kZSBvciBieSBpbnZhbGlkIGNvbnRlbnRcclxuXHQgKi9cclxuXHRQcm90b3R5cGUuYmVmb3JlID0gZnVuY3Rpb24oKXtcclxuXHRcdGlmKHRoaXMucGFyZW50Tm9kZSA9PSBudWxsKVxyXG5cdFx0XHR0aHJvdyBuZXcgRXJyb3IoXCJDYW4ndCBpbnNlcnQgbm9kZXMgYmVmb3JlIHRoaXMgbm9kZSEgUGFyZW50IG5vZGUgbm90IGF2YWlsYWJsZSFcIik7XHJcblxyXG5cdFx0Y29uc3QgcGFyZW50ID0gdGhpcy5wYXJlbnROb2RlO1xyXG5cdFx0dG9Ob2RlcyhBcnJheS5mcm9tKGFyZ3VtZW50cykpLmZvckVhY2gobm9kZSA9PiBwYXJlbnQuaW5zZXJ0QmVmb3JlKG5vZGUsIHRoaXMpKTtcclxuXHJcblx0XHRyZXR1cm4gdGhpcztcclxuXHR9O1xyXG59KTtcclxuZXhwb3J0IGRlZmF1bHQgc3VwcG9ydDsiLCJpbXBvcnQgRXh0ZW5kZXIgZnJvbSBcIi4uLy4uL3V0aWxzL0V4dGVuZGVyXCI7XHJcblxyXG5jb25zdCBQQVJFTlRUT0tFTiA9IFwiOnBhcmVudFwiO1xyXG5jb25zdCBRVU9URVMgPSBbXCJcXFwiXCIsIFwiJ1wiXTtcclxuXHJcbi8qKlxyXG4gKiBTdHJpcHMgdGhlIG9wdGlvbmFsIHF1b3RlcyBhcm91bmQgYSBzdWIgc2VsZWN0b3IuXHJcbiAqXHJcbiAqIFF1b3RpbmcgaXMgbm90IG5lZWRlZCBhbnltb3JlLCBhcyB0aGUgc2VsZWN0b3IgaXMgcmVhZCBieSBjb3VudGluZyBicmFja2V0c1xyXG4gKiBpbnN0ZWFkIG9mIG1hdGNoaW5nIGEgcGF0dGVybiwgYnV0IGl0IHN0YXlzIHN1cHBvcnRlZC5cclxuICpcclxuICogQHBhcmFtIHtzdHJpbmd9IHN1YnF1ZXJ5XHJcbiAqIEByZXR1cm5zIHtzdHJpbmd9IHRoZSBzdWIgc2VsZWN0b3IsIGVtcHR5IHdoZW4gdGhlcmUgaXMgbm9uZVxyXG4gKi9cclxuY29uc3QgY2xlYW51cFN1YlNlbGVjdG9yID0gKHN1YnF1ZXJ5KSA9PiB7XHJcblx0aWYgKHR5cGVvZiBzdWJxdWVyeSAhPT0gXCJzdHJpbmdcIikgcmV0dXJuIFwiXCI7XHJcblx0c3VicXVlcnkgPSBzdWJxdWVyeS50cmltKCk7XHJcblx0aWYgKChzdWJxdWVyeS5zdGFydHNXaXRoKCdcIicpICYmIHN1YnF1ZXJ5LmVuZHNXaXRoKCdcIicpKSB8fCAoc3VicXVlcnkuc3RhcnRzV2l0aChcIidcIikgJiYgc3VicXVlcnkuZW5kc1dpdGgoXCInXCIpKSkgc3VicXVlcnkgPSBzdWJxdWVyeS5zdWJzdHJpbmcoMSwgc3VicXVlcnkubGVuZ3RoIC0gMSk7XHJcblx0cmV0dXJuIHN1YnF1ZXJ5LnRyaW0oKTtcclxufTtcclxuXHJcbi8qKlxyXG4gKiBGaW5kcyB0aGUgOnBhcmVudCB0b2tlbiBvZiBhIHNlbGVjdG9yLlxyXG4gKlxyXG4gKiBPbmx5IGEgdG9rZW4gb24gYnJhY2tldCBsZXZlbCB6ZXJvIGFuZCBvdXRzaWRlIG9mIHF1b3RlcyBjb3VudHMsIHNvIG5laXRoZXJcclxuICogW2RhdGE9XCI6cGFyZW50XCJdIG5vciA6bm90KDpwYXJlbnQpIGlzIHRha2VuIGZvciBvbmUuXHJcbiAqXHJcbiAqIEBwYXJhbSB7c3RyaW5nfSBhU2VsZWN0b3JcclxuICogQHJldHVybnMge251bWJlcn0gdGhlIGluZGV4IG9mIHRoZSB0b2tlbiwgb3IgLTFcclxuICovXHJcbmNvbnN0IGluZGV4T2ZQYXJlbnRUb2tlbiA9IChhU2VsZWN0b3IpID0+IHtcclxuXHRsZXQgcXVvdGUgPSBudWxsO1xyXG5cdGxldCBkZXB0aCA9IDA7XHJcblx0Zm9yIChsZXQgaSA9IDA7IGkgPCBhU2VsZWN0b3IubGVuZ3RoOyBpKyspIHtcclxuXHRcdGNvbnN0IGNoYXIgPSBhU2VsZWN0b3JbaV07XHJcblx0XHRpZiAocXVvdGUpIHtcclxuXHRcdFx0aWYgKGNoYXIgPT09IHF1b3RlICYmIGFTZWxlY3RvcltpIC0gMV0gIT09IFwiXFxcXFwiKSBxdW90ZSA9IG51bGw7XHJcblx0XHR9IGVsc2UgaWYgKFFVT1RFUy5pbmNsdWRlcyhjaGFyKSkgcXVvdGUgPSBjaGFyO1xyXG5cdFx0ZWxzZSBpZiAoY2hhciA9PT0gXCIoXCIpIGRlcHRoKys7XHJcblx0XHRlbHNlIGlmIChjaGFyID09PSBcIilcIikgZGVwdGgtLTtcclxuXHRcdGVsc2UgaWYgKGRlcHRoID09PSAwICYmIGFTZWxlY3Rvci5zdGFydHNXaXRoKFBBUkVOVFRPS0VOLCBpKSkgcmV0dXJuIGk7XHJcblx0fVxyXG5cclxuXHRyZXR1cm4gLTE7XHJcbn07XHJcblxyXG4vKipcclxuICogUmVhZHMgYSBicmFja2V0IGdyb3VwIGJ5IGNvdW50aW5nIGJyYWNrZXRzLCBzbyBhIG5lc3RlZCBncm91cCBsaWtlXHJcbiAqIGRpdjpoYXMocCk6bm90KHNwYW4pIGlzIHJlYWQgYXMgYSB3aG9sZS5cclxuICpcclxuICogQHBhcmFtIHtzdHJpbmd9IGFTZWxlY3RvclxyXG4gKiBAcGFyYW0ge251bWJlcn0gYVN0YXJ0IC0gdGhlIGluZGV4IG9mIHRoZSBvcGVuaW5nIGJyYWNrZXRcclxuICogQHJldHVybnMge3tjb250ZW50OiBzdHJpbmcsIGVuZDogbnVtYmVyfX0gdGhlIGNvbnRlbnQgb2YgdGhlIGdyb3VwIGFuZCB0aGUgaW5kZXggYmVoaW5kIGl0XHJcbiAqIEB0aHJvd3Mge0Vycm9yfSB3aGVuIHRoZSBncm91cCBpcyBub3QgY2xvc2VkXHJcbiAqL1xyXG5jb25zdCByZWFkR3JvdXAgPSAoYVNlbGVjdG9yLCBhU3RhcnQpID0+IHtcclxuXHRsZXQgcXVvdGUgPSBudWxsO1xyXG5cdGxldCBkZXB0aCA9IDA7XHJcblx0Zm9yIChsZXQgaSA9IGFTdGFydDsgaSA8IGFTZWxlY3Rvci5sZW5ndGg7IGkrKykge1xyXG5cdFx0Y29uc3QgY2hhciA9IGFTZWxlY3RvcltpXTtcclxuXHRcdGlmIChxdW90ZSkge1xyXG5cdFx0XHRpZiAoY2hhciA9PT0gcXVvdGUgJiYgYVNlbGVjdG9yW2kgLSAxXSAhPT0gXCJcXFxcXCIpIHF1b3RlID0gbnVsbDtcclxuXHRcdH0gZWxzZSBpZiAoUVVPVEVTLmluY2x1ZGVzKGNoYXIpKSBxdW90ZSA9IGNoYXI7XHJcblx0XHRlbHNlIGlmIChjaGFyID09PSBcIihcIikgZGVwdGgrKztcclxuXHRcdGVsc2UgaWYgKGNoYXIgPT09IFwiKVwiICYmIC0tZGVwdGggPT09IDApIHJldHVybiB7IGNvbnRlbnQ6IGFTZWxlY3Rvci5zdWJzdHJpbmcoYVN0YXJ0ICsgMSwgaSksIGVuZDogaSArIDEgfTtcclxuXHR9XHJcblxyXG5cdHRocm93IG5ldyBFcnJvcihcIkludmFsaWQgcXVlcnkhXCIpO1xyXG59O1xyXG5cclxuLyoqXHJcbiAqIFNwbGl0cyBhIHNlbGVjdG9yIGF0IGl0cyA6cGFyZW50IHRva2VuLlxyXG4gKlxyXG4gKiBAcGFyYW0ge3N0cmluZ30gYVNlbGVjdG9yXHJcbiAqIEByZXR1cm5zIHt7cHJlZml4OiBzdHJpbmcsIHNlbGVjdG9yOiBzdHJpbmcsIHN1ZmZpeDogc3RyaW5nfXxudWxsfSB0aGUgcGFydHMsIG9yIG51bGwgd2hlbiB0aGVyZSBpcyBubyB0b2tlblxyXG4gKiBAdGhyb3dzIHtFcnJvcn0gd2hlbiB0aGUgYnJhY2tldCBncm91cCBvZiB0aGUgdG9rZW4gaXMgbm90IGNsb3NlZFxyXG4gKi9cclxuY29uc3Qgc3BsaXRQYXJlbnRRdWVyeSA9IChhU2VsZWN0b3IpID0+IHtcclxuXHRjb25zdCBpbmRleCA9IGluZGV4T2ZQYXJlbnRUb2tlbihhU2VsZWN0b3IpO1xyXG5cdGlmIChpbmRleCA8IDApIHJldHVybiBudWxsO1xyXG5cclxuXHRjb25zdCBhZnRlciA9IGluZGV4ICsgUEFSRU5UVE9LRU4ubGVuZ3RoO1xyXG5cdGNvbnN0IGdyb3VwID0gYVNlbGVjdG9yW2FmdGVyXSA9PT0gXCIoXCIgPyByZWFkR3JvdXAoYVNlbGVjdG9yLCBhZnRlcikgOiB7IGNvbnRlbnQ6IFwiXCIsIGVuZDogYWZ0ZXIgfTtcclxuXHJcblx0cmV0dXJuIHtcclxuXHRcdHByZWZpeDogYVNlbGVjdG9yLnN1YnN0cmluZygwLCBpbmRleCkudHJpbSgpLFxyXG5cdFx0c2VsZWN0b3I6IGNsZWFudXBTdWJTZWxlY3Rvcihncm91cC5jb250ZW50KSxcclxuXHRcdHN1ZmZpeDogYVNlbGVjdG9yLnN1YnN0cmluZyhncm91cC5lbmQpLnRyaW0oKVxyXG5cdH07XHJcbn07XHJcblxyXG4vKipcclxuICogRXhlY3V0ZXMgYSBzZWxlY3RvciwgcmVzb2x2aW5nIHRoZSA6cGFyZW50IHBzZXVkbyBzZWxlY3Rvci5cclxuICpcclxuICogOnBhcmVudCByZXR1cm5zIHRoZSBwYXJlbnQgb2YgdGhlIGVsZW1lbnQsIDpwYXJlbnQoc2VsZWN0b3IpIHRoZSBuZXh0IGFuY2VzdG9yXHJcbiAqIG1hdGNoaW5nIHRoZSBzZWxlY3Rvci4gRXZlcnl0aGluZyBiZWZvcmUgdGhlIHRva2VuIHNlbGVjdHMgdGhlIGVsZW1lbnRzIHRvXHJcbiAqIHN0YXJ0IGZyb20sIGV2ZXJ5dGhpbmcgYmVoaW5kIGl0IGlzIHNlYXJjaGVkIHdpdGhpbiB0aGUgcGFyZW50cyBmb3VuZC5cclxuICpcclxuICogQHBhcmFtIHtIVE1MRWxlbWVudH0gYUVsZW1lbnRcclxuICogQHBhcmFtIHtzdHJpbmd9IGFTZWxlY3RvclxyXG4gKiBAcmV0dXJucyB7Tm9kZUxpc3R8dW5kZWZpbmVkfSB0aGUgcmVzdWx0LCB1bmRlZmluZWQgd2hlbiBhIHN0ZXAgZm91bmQgbm90aGluZ1xyXG4gKi9cclxuY29uc3QgcXVlcnlFeGVjdXRlciA9IGZ1bmN0aW9uIChhRWxlbWVudCwgYVNlbGVjdG9yKSB7XHJcblx0Y29uc3QgcXVlcnkgPSBzcGxpdFBhcmVudFF1ZXJ5KGFTZWxlY3Rvcik7XHJcblx0aWYgKCFxdWVyeSkgcmV0dXJuIGFFbGVtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoYVNlbGVjdG9yKTtcclxuXHJcblx0bGV0IHJlc3VsdCA9IGFFbGVtZW50O1xyXG5cdGlmIChxdWVyeS5wcmVmaXgubGVuZ3RoID4gMCkge1xyXG5cdFx0cmVzdWx0ID0gYUVsZW1lbnQucXVlcnlTZWxlY3RvckFsbChxdWVyeS5wcmVmaXgpO1xyXG5cdFx0aWYgKHJlc3VsdC5sZW5ndGggPT0gMCkgcmV0dXJuO1xyXG5cdH1cclxuXHJcblx0cmVzdWx0ID0gcmVzdWx0LnBhcmVudChxdWVyeS5zZWxlY3Rvci5sZW5ndGggPiAwID8gcXVlcnkuc2VsZWN0b3IgOiBudWxsKTtcclxuXHRpZiAoIXJlc3VsdCkgcmV0dXJuO1xyXG5cclxuXHRyZXR1cm4gcXVlcnkuc3VmZml4Lmxlbmd0aCA+IDAgPyByZXN1bHQuZmluZChxdWVyeS5zdWZmaXgpIDogcmVzdWx0O1xyXG59O1xyXG5cclxuLyoqXHJcbiAqIE5vcm1hbGl6ZXMgc2VsZWN0b3JzIHRvIGEgbGlzdCBvZiBub24gZW1wdHkgc3RyaW5ncy5cclxuICpcclxuICogRW1wdHkgc2VsZWN0b3JzIGFyZSBza2lwcGVkIHJhdGhlciB0aGFuIHRocm93biBhdCwgb3RoZXIgdGhhbiBpbiB0aGUgc2libGluZ1xyXG4gKiBmdW5jdGlvbnMgZm9yIGV2ZW50IHR5cGVzIGFuZCBjbGFzcyBuYW1lczogYW4gZW1wdHkgc2VsZWN0b3IgY2FycmllcyBubyBpbnRlbnRcclxuICogYW5kIGp1c3QgY29udHJpYnV0ZXMgbm90aGluZywgd2hpbGUgYSBub24gc3RyaW5nIGlzIGEgbWlzdGFrZSBhbmQgdGhyb3dzLlxyXG4gKiBTZWxlY3RvcnMgYXJlIG5vdCBzcGxpdCwgY29tbWEgc2VwYXJhdGVkIGxpc3RzIGFyZSBsZWZ0IGZvciBxdWVyeVNlbGVjdG9yQWxsLlxyXG4gKlxyXG4gKiBAcGFyYW0ge3N0cmluZ3xJdGVyYWJsZTxzdHJpbmc+fSB0aGVTZWxlY3RvcnNcclxuICogQHJldHVybnMge3N0cmluZ1tdfSB0aGUgdHJpbW1lZCBzZWxlY3RvcnMsIGVtcHR5IG9uZXMgcmVtb3ZlZFxyXG4gKiBAdGhyb3dzIHtFcnJvcn0gd2hlbiB0aGVyZSBpcyBubyBzZWxlY3RvciBvciBvbmUgaXMgbm90IGEgc3RyaW5nXHJcbiAqL1xyXG5jb25zdCB0b1NlbGVjdG9yID0gZnVuY3Rpb24gKHRoZVNlbGVjdG9ycykge1xyXG5cdGlmKHRoZVNlbGVjdG9ycyA9PSBudWxsKSB0aHJvdyBuZXcgRXJyb3IoXCJJbnZhbGlkIHF1ZXJ5IVwiKTtcclxuXHJcblx0Y29uc3Qgc2VsZWN0b3JzID0gdHlwZW9mIHRoZVNlbGVjdG9ycyA9PT0gXCJzdHJpbmdcIiA/IFt0aGVTZWxlY3RvcnNdIDogQXJyYXkuZnJvbSh0aGVTZWxlY3RvcnMpO1xyXG5cclxuXHRyZXR1cm4gc2VsZWN0b3JzXHJcblx0XHQubWFwKChzZWxlY3RvcikgPT4ge1xyXG5cdFx0XHRcdGlmKHR5cGVvZiBzZWxlY3RvciAhPT0gXCJzdHJpbmdcIikgdGhyb3cgbmV3IEVycm9yKFwiSW52YWxpZCBxdWVyeSFcIik7XHJcblx0XHRcdFx0cmV0dXJuIHNlbGVjdG9yLnRyaW0oKTtcclxuXHRcdFx0fSlcclxuXHRcdC5maWx0ZXIoKHNlbGVjdG9yKSA9PiBzZWxlY3Rvci5sZW5ndGggPiAwKTtcclxufVxyXG5cclxuXHJcbmNvbnN0IHN1cHBvcnQgPSBFeHRlbmRlcihcIlF1ZXJ5U3VwcG9ydFwiLCAoUHJvdG90eXBlKSA9PiB7XHJcblx0LyoqXHJcblx0ICogU2VhcmNoZXMgbm9kZXMgYnkgb25lIG9yIG1vcmUgc2VsZWN0b3JzLlxyXG5cdCAqXHJcblx0ICogU2VsZWN0b3IgbGlzdHMgc2VwYXJhdGVkIGJ5IGNvbW1hIGFyZSBsZWZ0IHRvIHF1ZXJ5U2VsZWN0b3JBbGwsIHdoaWNoIGtub3dzXHJcblx0ICogdGhlbSBhbmQgZ2V0cyB0aGUgY29tbWFzIGluc2lkZSBicmFja2V0cyBhbmQgcXVvdGVzIHJpZ2h0LiBUaGUgcmVzdWx0cyBvZlxyXG5cdCAqIHNldmVyYWwgc2VsZWN0b3JzIGFyZSBjb2xsZWN0ZWQgaW4gdGhlIG9yZGVyIHRoZXkgd2VyZSBnaXZlbiwgd2l0aG91dFxyXG5cdCAqIHJlbW92aW5nIHRoZSBub2RlcyBhIHNlY29uZCBzZWxlY3RvciBmaW5kcyBhZ2Fpbi5cclxuXHQgKlxyXG5cdCAqIEBwYXJhbSB7Li4uc3RyaW5nfSB0aGVTZWxlY3RvcnMgLSBzZWxlY3RvcnMsIGVtcHR5IG9uZXMgYXJlIHNraXBwZWRcclxuXHQgKiBAcmV0dXJucyB7Tm9kZUxpc3R9IHRoZSBub2RlcyBmb3VuZCwgZW1wdHkgd2hlbiB0aGVyZSBhcmUgbm9uZVxyXG5cdCAqIEB0aHJvd3Mge0Vycm9yfSBieSBhIHNlbGVjdG9yIGJlc2lkZSBhIHN0cmluZ1xyXG5cdCAqL1xyXG5cdFByb3RvdHlwZS5maW5kID0gZnVuY3Rpb24gKCkge1xyXG5cdFx0Y29uc3Qgbm9kZXMgPSBbXTtcclxuXHRcdGNvbnN0IHNlbGVjdG9ycyA9IHRvU2VsZWN0b3IoYXJndW1lbnRzKTtcclxuXHRcdGZvcihsZXQgc2VsZWN0b3Igb2Ygc2VsZWN0b3JzKXtcclxuXHRcdFx0Y29uc3QgcmVzdWx0ID0gcXVlcnlFeGVjdXRlcih0aGlzLCBzZWxlY3Rvcik7XHJcblx0XHRcdGlmIChyZXN1bHQpIG5vZGVzLnB1c2gocmVzdWx0KTtcclxuXHRcdH1cclxuXHJcblx0XHRyZXR1cm4gTm9kZUxpc3QuZnJvbSguLi5ub2Rlcyk7XHJcblx0fTtcclxuXHJcblx0LyoqXHJcblx0ICogQ2hlY2tzIHdoZXRoZXIgdGhpcyBub2RlIG1hdGNoZXMgYXQgbGVhc3Qgb25lIG9mIHRoZSBzZWxlY3RvcnMuXHJcblx0ICpcclxuXHQgKiBBIERvY3VtZW50IGFuZCBhIERvY3VtZW50RnJhZ21lbnQgbmV2ZXIgbWF0Y2gsIGFzIHRoZXkgY2FuIG5vdCBiZSBzZWxlY3RlZCAtXHJcblx0ICogdGhhdCBhbHNvIGNvdmVycyBhIFNoYWRvd1Jvb3QsIHdoaWNoIGlzIGEgRG9jdW1lbnRGcmFnbWVudC5cclxuXHQgKlxyXG5cdCAqIEBwYXJhbSB7Li4uKHN0cmluZ3xzdHJpbmdbXSl9IHRoZVNlbGVjdG9ycyAtIHNlbGVjdG9ycywgZ2l2ZW4gb25lIGJ5IG9uZSBvciBhcyBhIGxpc3RcclxuXHQgKiBAcmV0dXJucyB7Ym9vbGVhbn0gd2hldGhlciBvbmUgb2YgdGhlIHNlbGVjdG9ycyBtYXRjaGVzXHJcblx0ICogQHRocm93cyB7RE9NRXhjZXB0aW9ufSBieSBhbiBpbnZhbGlkIHNlbGVjdG9yXHJcblx0ICovXHJcblx0UHJvdG90eXBlLmlzID0gZnVuY3Rpb24gKCkge1xyXG5cdFx0aWYgKHRoaXMgaW5zdGFuY2VvZiBEb2N1bWVudCB8fCB0aGlzIGluc3RhbmNlb2YgRG9jdW1lbnRGcmFnbWVudCkgcmV0dXJuIGZhbHNlO1xyXG5cdFx0ZWxzZSBpZiAoYXJndW1lbnRzLmxlbmd0aCA9PSAxKSB7XHJcblx0XHRcdGlmICh0eXBlb2YgYXJndW1lbnRzWzBdID09PSBcInN0cmluZ1wiKSByZXR1cm4gdGhpcy5tYXRjaGVzKGFyZ3VtZW50c1swXSk7XHJcblx0XHRcdGVsc2UgaWYgKHR5cGVvZiBhcmd1bWVudHNbMF0ubGVuZ3RoID09PSBcIm51bWJlclwiKSB7XHJcblx0XHRcdFx0bGV0IGZpbHRlciA9IGFyZ3VtZW50c1swXTtcclxuXHRcdFx0XHRmb3IgKGxldCBpID0gMDsgaSA8IGZpbHRlci5sZW5ndGg7IGkrKykgaWYgKHRoaXMubWF0Y2hlcyhmaWx0ZXJbaV0pKSByZXR1cm4gdHJ1ZTtcclxuXHRcdFx0fVxyXG5cdFx0fSBlbHNlIGlmIChhcmd1bWVudHMubGVuZ3RoID4gMSkgcmV0dXJuIHRoaXMuaXMoQXJyYXkuZnJvbShhcmd1bWVudHMpKTtcclxuXHJcblx0XHRyZXR1cm4gZmFsc2U7XHJcblx0fTtcclxuXHJcblx0LyoqXHJcblx0ICogUmV0dXJucyB0aGUgcGFyZW50IG9mIHRoaXMgbm9kZSwgb3IgdGhlIG5leHQgYW5jZXN0b3IgbWF0Y2hpbmcgYSBzZWxlY3Rvci5cclxuXHQgKlxyXG5cdCAqIEFuIGludmFsaWQgc2VsZWN0b3IgaXMgbm90IGNhdWdodDogaXQgd291bGQgcmV0dXJuIHRoZSBwYXJlbnQgcmVhY2hlZCBzbyBmYXIsXHJcblx0ICogd2hpY2ggaXMgaW5kaXN0aW5ndWlzaGFibGUgZnJvbSBhIG1hdGNoLCB3aGlsZSBhIHNlbGVjdG9yIG1hdGNoaW5nIG5vdGhpbmdcclxuXHQgKiBjb3JyZWN0bHkgcmV0dXJucyBudWxsLiBMZXR0aW5nIGl0IHRocm93IGtlZXBzIHRob3NlIHR3byBhcGFydC5cclxuXHQgKlxyXG5cdCAqIEBwYXJhbSB7c3RyaW5nfGJvb2xlYW59IFtzZWxlY3Rvcl0gLSBhIHNlbGVjdG9yIHRvIGxvb2sgZm9yLCBvciB0aGUgaWdub3JlU2hhZG93Um9vdCBmbGFnXHJcblx0ICogQHBhcmFtIHtib29sZWFufSBbaWdub3JlU2hhZG93Um9vdF0gLSBjb250aW51ZSBhdCB0aGUgaG9zdCBvZiBhIHNoYWRvdyByb290IGluc3RlYWQgb2Ygc3RvcHBpbmdcclxuXHQgKiBAcmV0dXJucyB7Tm9kZXxudWxsfSB0aGUgcGFyZW50LCB0aGUgbWF0Y2hpbmcgYW5jZXN0b3IsIG9yIG51bGwgd2hlbiB0aGVyZSBpcyBub25lXHJcblx0ICogQHRocm93cyB7RE9NRXhjZXB0aW9ufSBieSBhbiBpbnZhbGlkIHNlbGVjdG9yXHJcblx0ICovXHJcblx0UHJvdG90eXBlLnBhcmVudCA9IGZ1bmN0aW9uIChzZWxlY3RvciwgaWdub3JlU2hhZG93Um9vdCkge1xyXG5cdFx0aWYgKCF0aGlzLnBhcmVudE5vZGUpIHJldHVybiBudWxsO1xyXG5cdFx0aWdub3JlU2hhZG93Um9vdCA9IHR5cGVvZiBzZWxlY3RvciA9PT0gXCJib29sZWFuXCIgPyBzZWxlY3RvciA6IGlnbm9yZVNoYWRvd1Jvb3Q7XHJcblx0XHRzZWxlY3RvciA9IHR5cGVvZiBzZWxlY3RvciA9PT0gXCJzdHJpbmdcIiA/IHNlbGVjdG9yIDogbnVsbDtcclxuXHJcblx0XHRsZXQgcGFyZW50ID0gdGhpcy5wYXJlbnROb2RlO1xyXG5cdFx0aWYgKHBhcmVudCBpbnN0YW5jZW9mIFNoYWRvd1Jvb3QgJiYgaWdub3JlU2hhZG93Um9vdCkgcGFyZW50ID0gcGFyZW50Lmhvc3Q7XHJcblxyXG5cdFx0aWYgKHNlbGVjdG9yKSByZXR1cm4gcGFyZW50LmlzKHNlbGVjdG9yKSA/IHBhcmVudCA6IHBhcmVudC5wYXJlbnQoc2VsZWN0b3IsIGlnbm9yZVNoYWRvd1Jvb3QpO1xyXG5cclxuXHRcdHJldHVybiBwYXJlbnQ7XHJcblx0fTtcclxuXHJcblx0LyoqXHJcblx0ICogQ29sbGVjdHMgdGhlIGFuY2VzdG9ycyBvZiB0aGlzIG5vZGUsIGZyb20gdGhlIG5lYXJlc3Qgb25lIHVwd2FyZHMuXHJcblx0ICpcclxuXHQgKiBXaXRoIGEgc2VsZWN0b3Igb25seSB0aGUgbWF0Y2hpbmcgYW5jZXN0b3JzIGFyZSBjb2xsZWN0ZWQsIGFzIGV2ZXJ5IHN0ZXBcclxuXHQgKiB3YWxrcyB1cCB0byB0aGUgbmV4dCBtYXRjaC5cclxuXHQgKlxyXG5cdCAqIEBwYXJhbSB7c3RyaW5nfGJvb2xlYW59IFtzZWxlY3Rvcl0gLSBhIHNlbGVjdG9yIHRvIGxvb2sgZm9yLCBvciB0aGUgaWdub3JlU2hhZG93Um9vdCBmbGFnXHJcblx0ICogQHBhcmFtIHtib29sZWFufSBbaWdub3JlU2hhZG93Um9vdF0gLSBjb250aW51ZSBhdCB0aGUgaG9zdCBvZiBhIHNoYWRvdyByb290IGluc3RlYWQgb2Ygc3RvcHBpbmdcclxuXHQgKiBAcmV0dXJucyB7Tm9kZUxpc3R9IHRoZSBhbmNlc3RvcnMsIGVtcHR5IHdoZW4gdGhlcmUgYXJlIG5vbmVcclxuXHQgKiBAdGhyb3dzIHtET01FeGNlcHRpb259IGJ5IGFuIGludmFsaWQgc2VsZWN0b3JcclxuXHQgKi9cclxuXHRQcm90b3R5cGUucGFyZW50cyA9IGZ1bmN0aW9uICgpIHtcclxuXHRcdGNvbnN0IHJlc3VsdCA9IG5ldyBBcnJheSgpO1xyXG5cdFx0bGV0IHBhcmVudCA9IFByb3RvdHlwZS5wYXJlbnQuYXBwbHkodGhpcywgYXJndW1lbnRzKTtcclxuXHRcdHdoaWxlIChwYXJlbnQpIHtcclxuXHRcdFx0cmVzdWx0LnB1c2gocGFyZW50KTtcclxuXHRcdFx0cGFyZW50ID0gUHJvdG90eXBlLnBhcmVudC5hcHBseShwYXJlbnQsIGFyZ3VtZW50cyk7XHJcblx0XHR9XHJcblxyXG5cdFx0cmV0dXJuIE5vZGVMaXN0LmZyb20ocmVzdWx0KTtcclxuXHR9O1xyXG5cclxuXHQvKipcclxuXHQgKiBCdWlsZHMgYSBzZWxlY3RvciBhZGRyZXNzaW5nIHRoaXMgbm9kZS5cclxuXHQgKlxyXG5cdCAqIEFuIGlkIGVuZHMgdGhlIHNlbGVjdG9yLCBhcyBpdCBhbHJlYWR5IGlkZW50aWZpZXMgdGhlIG5vZGUuIE90aGVyd2lzZSB0aGUgdGFnXHJcblx0ICogbmFtZSBpcyB1c2VkIGFuZCB0aGUgcGF0aCBjb250aW51ZXMgYXQgdGhlIHBhcmVudC4gQSBwb3NpdGlvbiBpcyBvbmx5IGFkZGVkXHJcblx0ICogd2hlbiB0aGUgcGFyZW50IGhhcyBtb3JlIHRoYW4gb25lIGVsZW1lbnQgY2hpbGQsIGFuZCBpdCBjb3VudHMgYWxsIG9mIHRoZW0gLVxyXG5cdCAqIHRoYXQgaXMgd2hhdCA6bnRoLWNoaWxkIGRvZXMsIHVubGlrZSA6bnRoLW9mLXR5cGUuXHJcblx0ICpcclxuXHQgKiBUaGUgaWQgaXMgbm90IGVzY2FwZWQsIHNvIGFuIGlkIG5lZWRpbmcgaXQgZ2l2ZXMgYW4gaW52YWxpZCBzZWxlY3Rvci5cclxuXHQgKlxyXG5cdCAqIEByZXR1cm5zIHtzdHJpbmd8dW5kZWZpbmVkfSB0aGUgc2VsZWN0b3IsIHVuZGVmaW5lZCBmb3IgYSBEb2N1bWVudCBvciBEb2N1bWVudEZyYWdtZW50XHJcblx0ICovXHJcblx0UHJvdG90eXBlLnNlbGVjdG9yID0gZnVuY3Rpb24gKCkge1xyXG5cdFx0aWYgKHRoaXMgaW5zdGFuY2VvZiBEb2N1bWVudCB8fCB0aGlzIGluc3RhbmNlb2YgRG9jdW1lbnRGcmFnbWVudCkgcmV0dXJuIHVuZGVmaW5lZDtcclxuXHRcdGVsc2UgaWYgKHRoaXMuaWQpIHJldHVybiBcIiNcIiArIHRoaXMuaWQ7XHJcblx0XHRlbHNlIHtcclxuXHRcdFx0bGV0IHNlbGVjdG9yID0gdGhpcy50YWdOYW1lLnRvTG93ZXJDYXNlKCk7XHJcblx0XHRcdGNvbnN0IHBhcmVudCA9IHRoaXMucGFyZW50KCk7XHJcblx0XHRcdGlmIChwYXJlbnQpIHtcclxuXHRcdFx0XHRpZihwYXJlbnQuY2hpbGRyZW4ubGVuZ3RoID4gMSkge1xyXG5cdFx0XHRcdFx0Y29uc3QgaW5kZXggPSBwYXJlbnQuY2hpbGRyZW4uaW5kZXhPZih0aGlzKTtcclxuXHRcdFx0XHRcdHNlbGVjdG9yID0gYCR7c2VsZWN0b3J9Om50aC1jaGlsZCgke2luZGV4ICsgMX0pYDtcclxuXHRcdFx0XHR9XHJcblx0XHRcdFx0Y29uc3QgcGFyZW50U2VsZWN0b3IgPSBwYXJlbnQuc2VsZWN0b3IoKTtcclxuXHRcdFx0XHRyZXR1cm4gcGFyZW50U2VsZWN0b3IgIT0gbnVsbCA/IGAke3BhcmVudFNlbGVjdG9yfSA+ICR7c2VsZWN0b3J9YCA6IHNlbGVjdG9yO1xyXG5cdFx0XHR9XHJcblx0XHRcdHJldHVybiBzZWxlY3RvcjtcclxuXHRcdH1cclxuXHR9O1xyXG5cclxuXHQvKipcclxuXHQgKiBSZXR1cm5zIHRoZSBmaXJzdCBub2RlIG9mIGNsb3Nlc3RzKCkuXHJcblx0ICpcclxuXHQgKiBAcGFyYW0ge3N0cmluZ30gYVF1ZXJ5XHJcblx0ICogQHJldHVybnMge05vZGV8dW5kZWZpbmVkfSB0aGUgZmlyc3Qgbm9kZSBmb3VuZCwgb3IgdW5kZWZpbmVkXHJcblx0ICovXHJcblx0UHJvdG90eXBlLmNsb3Nlc3QgPSBmdW5jdGlvbiAoYVF1ZXJ5KSB7XHJcblx0XHRyZXR1cm4gdGhpcy5jbG9zZXN0cyhhUXVlcnkpLmZpcnN0KCk7XHJcblx0fTtcclxuXHJcblx0LyoqXHJcblx0ICogU2VhcmNoZXMgdGhlIG5vZGVzIGNsb3Nlc3QgdG8gdGhpcyBvbmUgYnkgdGhlaXIgZGlzdGFuY2UgaW4gdGhlIHRyZWUuXHJcblx0ICpcclxuXHQgKiBUaGUgc3VidHJlZSBvZiB0aGlzIG5vZGUgaXMgc2VhcmNoZWQgZmlyc3QsIHRoZW4gdGhlIHN1YnRyZWUgb2YgdGhlIHBhcmVudCxcclxuXHQgKiBhbmQgc28gb24gdXB3YXJkcyAtIHRoZSBzZWFyY2ggd2lkZW5zIGluIHJpbmdzIHVudGlsIGEgbGV2ZWwgaGFzIG1hdGNoZXMsIGFuZFxyXG5cdCAqIHRob3NlIGFyZSByZXR1cm5lZC4gU28gdGhlIHJlc3VsdCBtYXkgYmUgYSBjaGlsZCwgYSBzaWJsaW5nLCBhIGNvdXNpbiBvciBhblxyXG5cdCAqIGFuY2VzdG9yLCBkZXBlbmRpbmcgb24gd2hlcmUgdGhlIGZpcnN0IG1hdGNoIGFwcGVhcnMuXHJcblx0ICpcclxuXHQgKiBEaXN0YW5jZSBpcyBtZWFudCBpbiBib3RoIGRpcmVjdGlvbnMgaGVyZSwgb3RoZXIgdGhhbiBpbiB0aGUgbmF0aXZlIGNsb3Nlc3QoKSxcclxuXHQgKiB3aGljaCBvbmx5IHdhbGtzIHVwIGFuZCByZXR1cm5zIGFuIGFuY2VzdG9yLlxyXG5cdCAqXHJcblx0ICogQHBhcmFtIHtzdHJpbmd9IGFRdWVyeVxyXG5cdCAqIEByZXR1cm5zIHtOb2RlTGlzdH0gdGhlIG1hdGNoZXMgb2YgdGhlIGNsb3Nlc3QgbGV2ZWwgaGF2aW5nIGFueSwgZW1wdHkgd2hlbiB0aGVyZSBhcmUgbm9uZVxyXG5cdCAqL1xyXG5cdFByb3RvdHlwZS5jbG9zZXN0cyA9IGZ1bmN0aW9uIChhUXVlcnkpIHtcclxuXHRcdGNvbnN0IHJlc3VsdCA9IHRoaXMuZmluZChhUXVlcnkpO1xyXG5cdFx0aWYgKHJlc3VsdC5sZW5ndGggIT0gMCkgcmV0dXJuIHJlc3VsdDtcclxuXHJcblx0XHRjb25zdCBwYXJlbnQgPSB0aGlzLnBhcmVudEVsZW1lbnQ7XHJcblx0XHRpZiAocGFyZW50KSByZXR1cm4gcGFyZW50LmNsb3Nlc3RzKGFRdWVyeSk7XHJcblxyXG5cdFx0cmV0dXJuIE5vZGVMaXN0LmZyb20oW10pO1xyXG5cdH07XHJcblxyXG5cdC8qKlxyXG5cdCAqIFNlYXJjaGVzIHRoZSBxdWVyeSBhdCB0aGlzIG5vZGUsIGJlbG93IGl0LCBvciBhYm92ZSBpdCAtIGluIHRoYXQgb3JkZXIuXHJcblx0ICpcclxuXHQgKiBUaGlzIG5vZGUgaXRzZWxmIGlzIGNoZWNrZWQgZmlyc3QsIHRoZW4gaXRzIHN1YnRyZWUsIGFuZCBvbmx5IHRoZW4gdGhlXHJcblx0ICogYW5jZXN0b3JzLiBVbmxpa2UgY2xvc2VzdHMoKSB0aGUgc2VhcmNoIGRvZXMgbm90IHdpZGVuIGluIHJpbmdzOiBpdCBuZXZlclxyXG5cdCAqIGxvb2tzIGludG8gdGhlIHN1YnRyZWUgb2YgYW4gYW5jZXN0b3IsIHNvIGEgc2libGluZyBpcyBub3QgZm91bmQuXHJcblx0ICpcclxuXHQgKiBAcGFyYW0ge3N0cmluZ30gYVF1ZXJ5XHJcblx0ICogQHJldHVybnMge05vZGVMaXN0fSB0aGlzIG5vZGUsIHRoZSBub2RlcyBiZWxvdyBpdCwgb3IgdGhlIG1hdGNoaW5nIGFuY2VzdG9yLCBlbXB0eSB3aGVuIHRoZXJlIGlzIG5vbmVcclxuXHQgKi9cclxuXHRQcm90b3R5cGUubmVzdGVkID0gZnVuY3Rpb24gKGFRdWVyeSkge1xyXG5cdFx0aWYgKHRoaXMuaXMoYVF1ZXJ5KSkgcmV0dXJuIE5vZGVMaXN0LmZyb20odGhpcyk7XHJcblxyXG5cdFx0bGV0IG5lc3RlZCA9IHRoaXMuZmluZChhUXVlcnkpO1xyXG5cdFx0aWYgKG5lc3RlZCAmJiBuZXN0ZWQubGVuZ3RoID4gMCkgcmV0dXJuIG5lc3RlZDtcclxuXHRcdGVsc2UgcmV0dXJuIE5vZGVMaXN0LmZyb20odGhpcy5wYXJlbnQoYVF1ZXJ5KSk7XHJcblx0fTtcclxufSk7XHJcbmV4cG9ydCBkZWZhdWx0IHN1cHBvcnQ7XHJcbiIsImltcG9ydCBFeHRlbmRlciBmcm9tIFwiLi4vLi4vdXRpbHMvRXh0ZW5kZXJcIjtcclxuXHJcbi8qKlxyXG4gKiBUaGUgdHlwZSBvZiB0aGUgZXZlbnQgdHJpZ2dlcmVkIG9uY2UgdGhlIGRvY3VtZW50IGlzIHJlYWR5LlxyXG4gKlxyXG4gKiBAdHlwZSB7c3RyaW5nfVxyXG4gKi9cclxuZXhwb3J0IGNvbnN0IFJFQURZRVZFTlQgPSBcImRlZmF1bHRqcy0tZXZlbnQtLXJlYWR5XCI7XHJcblxyXG5jb25zdCBzdXBwb3J0ID0gRXh0ZW5kZXIoXCJSZWFkeUV2ZW50U3VwcG9ydFwiLCBQcm90b3R5cGUgPT4ge1xyXG5cdC8qKlxyXG5cdCAqIFJlZ2lzdGVycyBhIGZ1bmN0aW9uIGZvciB0aGUgcmVhZHkgZXZlbnQgb2YgdGhlIGRvY3VtZW50LlxyXG5cdCAqXHJcblx0ICogVGhlIHJlYWR5IGV2ZW50IGlzIHRyaWdnZXJlZCBvbmNlIHRoZSBkb20gaXMgcGFyc2VkLiBXaGVuIHRoZSBkb2N1bWVudCBpc1xyXG5cdCAqIGFscmVhZHkgY29tcGxldGUgdGhlIGV2ZW50IGlzIHRyaWdnZXJlZCByaWdodCBhd2F5LCBzbyBhIGZ1bmN0aW9uIHJlZ2lzdGVyZWRcclxuXHQgKiBsYXRlIHN0aWxsIHJ1bnMuIFRoYXQgdHJpZ2dlciByZWFjaGVzIGV2ZXJ5IHJlYWR5IGxpc3RlbmVyLCBzbyBmdW5jdGlvbnNcclxuXHQgKiByZWdpc3RlcmVkIGVhcmxpZXIgcnVuIGFnYWluIG9uIGVhY2ggbGF0ZSByZWdpc3RyYXRpb24uXHJcblx0ICpcclxuXHQgKiBAcGFyYW0ge0Z1bmN0aW9ufSBhRnVuY3Rpb24gLSBjYWxsZWQgb24gdGhlIHJlYWR5IGV2ZW50XHJcblx0ICogQHBhcmFtIHtib29sZWFufSBbb25jZV0gLSByZW1vdmUgdGhlIGZ1bmN0aW9uIGFmdGVyIHRoZSBuZXh0IHJlYWR5IGV2ZW50XHJcblx0ICogQHJldHVybnMge0RvY3VtZW50fSB0aGlzXHJcblx0ICovXHJcblx0UHJvdG90eXBlLnJlYWR5ID0gZnVuY3Rpb24oYUZ1bmN0aW9uLCBvbmNlKXtcclxuXHRcdHRoaXMub24oUkVBRFlFVkVOVCwgYUZ1bmN0aW9uLCBvbmNlID8geyBvbmNlOiB0cnVlIH0gOiB1bmRlZmluZWQpO1xyXG5cdFx0aWYoZG9jdW1lbnQucmVhZHlTdGF0ZSA9PSBcImNvbXBsZXRlXCIpXHJcblx0XHRcdHRoaXMudHJpZ2dlcihSRUFEWUVWRU5UKTtcclxuXHJcblx0XHRyZXR1cm4gdGhpcztcclxuXHR9O1xyXG5cclxufSk7XHJcbmV4cG9ydCBkZWZhdWx0IHN1cHBvcnQ7IiwiaW1wb3J0IEV4dGVuZGVyIGZyb20gXCIuLi8uLi91dGlscy9FeHRlbmRlclwiO1xyXG5cclxuY29uc3QgSElERVZBTFVFID0gXCJub25lXCI7XHJcblxyXG4vKipcclxuICogV2hldGhlciB0aGUgZWxlbWVudCBpcyBoaWRkZW4gYnkgaXRzIG93biBpbmxpbmUgZGlzcGxheSwgYSBkaXNwbGF5IGNvbWluZyBmcm9tXHJcbiAqIGEgY3NzIHJ1bGUgaXMgbm90IHNlZW4uXHJcbiAqXHJcbiAqIEBwYXJhbSB7SFRNTEVsZW1lbnR9IGVsZW1lbnRcclxuICogQHJldHVybnMge2Jvb2xlYW59XHJcbiAqL1xyXG5jb25zdCBpc0hpZGRlbiA9IChlbGVtZW50KSA9PiB7XHJcblx0cmV0dXJuIGVsZW1lbnQuc3R5bGUuZGlzcGxheSA9PT0gSElERVZBTFVFXHJcbn07XHJcblxyXG4vKipcclxuICogUmVwbGFjZXMgc2hvdyBhbmQgaGlkZSBvbiB0aGUgZWxlbWVudCBieSB2ZXJzaW9ucyBib3VuZCB0byBpdCwgY2FwdHVyaW5nIHRoZVxyXG4gKiBkaXNwbGF5IHRvIHJlc3RvcmUgb24gc2hvdy5cclxuICpcclxuICogVGhlIGRpc3BsYXkgaXMgcmVhZCBvbmNlLCBvbiB0aGUgZmlyc3Qgc2hvdyBvciBoaWRlLCBhbmQga2VwdCBmcm9tIHRoZW4gb24gLVxyXG4gKiB0aGUgYm91bmQgbWV0aG9kcyBzaGFkb3cgdGhlIHByb3RvdHlwZSwgc28gaW5pdCBkb2VzIG5vdCBydW4gYWdhaW4uIEEgZGlzcGxheVxyXG4gKiBzZXQgZGlyZWN0bHkgYWZ0ZXJ3YXJkcyBpcyBub3QgcGlja2VkIHVwLiBXaGVuIHRoZSBlbGVtZW50IGlzIGhpZGRlbiBhdCB0aGF0XHJcbiAqIGZpcnN0IGNhbGwgdGhlIGNhcHR1cmVkIHZhbHVlIGlzIHRoZSBlbXB0eSBzdHJpbmcsIGZhbGxpbmcgYmFjayB0byB0aGUgY3NzLlxyXG4gKlxyXG4gKiBAcGFyYW0ge0hUTUxFbGVtZW50fSBlbGVtZW50XHJcbiAqIEByZXR1cm5zIHtIVE1MRWxlbWVudH0gdGhlIGVsZW1lbnRcclxuICovXHJcbmNvbnN0IGluaXQgPSAoZWxlbWVudCkgPT4ge1xyXG5cdGxldCBkaXNwbGF5ID0gIWlzSGlkZGVuKGVsZW1lbnQpID8gZWxlbWVudC5zdHlsZS5kaXNwbGF5IDogXCJcIjtcclxuXHJcblx0ZWxlbWVudC5zaG93ID0gKGZ1bmN0aW9uKCl7XHJcblx0XHR0aGlzLnN0eWxlLmRpc3BsYXkgPSBkaXNwbGF5O1xyXG5cdFx0cmV0dXJuIHRoaXM7XHJcblx0fSkuYmluZChlbGVtZW50KTtcclxuXHJcblx0ZWxlbWVudC5oaWRlID0gKGZ1bmN0aW9uKCl7XHJcblx0XHR0aGlzLnN0eWxlLmRpc3BsYXkgPSBISURFVkFMVUU7XHJcblx0XHRyZXR1cm4gdGhpcztcclxuXHR9KS5iaW5kKGVsZW1lbnQpO1xyXG5cclxuXHRyZXR1cm4gZWxlbWVudDtcclxufTtcclxuXHJcblxyXG5jb25zdCBzdXBwb3J0ID0gRXh0ZW5kZXIoXCJTaG93SGlkZVN1cHBvcnRcIiwgUHJvdG90eXBlID0+IHtcclxuXHQvKipcclxuXHQgKiBTaG93cyB0aGUgZWxlbWVudCBieSByZXN0b3JpbmcgdGhlIGRpc3BsYXkgY2FwdHVyZWQgYmVmb3JlIGl0IHdhcyBoaWRkZW4uXHJcblx0ICpcclxuXHQgKiBAcmV0dXJucyB7SFRNTEVsZW1lbnR9IHRoaXNcclxuXHQgKi9cclxuXHRQcm90b3R5cGUuc2hvdyA9IGZ1bmN0aW9uKCkge1xyXG5cdFx0cmV0dXJuIGluaXQodGhpcykuc2hvdy5hcHBseShudWxsLCBhcmd1bWVudHMpXHJcblx0fTtcclxuXHJcblx0LyoqXHJcblx0ICogSGlkZXMgdGhlIGVsZW1lbnQgYnkgc2V0dGluZyBpdHMgZGlzcGxheSB0byBub25lLlxyXG5cdCAqXHJcblx0ICogQHJldHVybnMge0hUTUxFbGVtZW50fSB0aGlzXHJcblx0ICovXHJcblx0UHJvdG90eXBlLmhpZGUgPSBmdW5jdGlvbigpIHtcclxuXHRcdHJldHVybiBpbml0KHRoaXMpLmhpZGUuYXBwbHkobnVsbCwgYXJndW1lbnRzKVxyXG5cdH07XHJcblxyXG5cdC8qKlxyXG5cdCAqIFNob3dzIHRoZSBlbGVtZW50IHdoZW4gaXQgaXMgaGlkZGVuLCBoaWRlcyBpdCBvdGhlcndpc2UuXHJcblx0ICpcclxuXHQgKiBPbmx5IGFuIGlubGluZSBkaXNwbGF5IG9mIG5vbmUgY291bnRzIGFzIGhpZGRlbiwgc28gYW4gZWxlbWVudCBoaWRkZW4gYnkgYVxyXG5cdCAqIGNzcyBydWxlIGlzIGhpZGRlbiBpbmxpbmUgZmlyc3QgYmVmb3JlIGl0IHNob3dzLlxyXG5cdCAqXHJcblx0ICogQHJldHVybnMge0hUTUxFbGVtZW50fSB0aGlzXHJcblx0ICovXHJcblx0UHJvdG90eXBlLnRvZ2dsZVNob3cgPSBmdW5jdGlvbigpIHtcclxuXHRcdHJldHVybiBpc0hpZGRlbih0aGlzKSA/IHRoaXMuc2hvdygpIDogdGhpcy5oaWRlKCk7XHJcblx0fTtcclxuXHJcbn0pO1xyXG5leHBvcnQgZGVmYXVsdCBzdXBwb3J0OyIsImltcG9ydCBFeHRlbmRlciBmcm9tIFwiLi4vLi4vdXRpbHMvRXh0ZW5kZXJcIjtcclxuXHJcbi8qKlxyXG4gKiBWYWx1ZSBoYW5kbGluZyBmb3Igb25lIGtpbmQgb2YgaW5wdXQgZWxlbWVudC5cclxuICpcclxuICogQHR5cGVkZWYge09iamVjdH0gSW5wdXRUeXBlXHJcbiAqIEBwcm9wZXJ0eSB7c3RyaW5nfSBzZWxlY3RvciAtIG1hdGNoZXMgdGhlIGVsZW1lbnRzIGhhbmRsZWQgYnkgdGhpcyB0eXBlXHJcbiAqIEBwcm9wZXJ0eSB7ZnVuY3Rpb24oKToqfSBnZXQgLSByZWFkcyB0aGUgdmFsdWUgb2YgdGhlIGVsZW1lbnRcclxuICogQHByb3BlcnR5IHtmdW5jdGlvbigqKTp2b2lkfSBzZXQgLSB3cml0ZXMgdGhlIHZhbHVlIHRvIHRoZSBlbGVtZW50XHJcbiAqL1xyXG5cclxuLyoqXHJcbiAqIFNoYXJlZCBzZXR0ZXIgb2YgY2hlY2tib3ggYW5kIHJhZGlvLCBib3RoIGFyZSBzZXQgYnkgdGhlaXIgY2hlY2tlZCBzdGF0ZS5cclxuICpcclxuICogQHBhcmFtIHtib29sZWFufHN0cmluZ3xzdHJpbmdbXX0gYVZhbHVlIC0gYSBib29sZWFuIGlzIGFwcGxpZWQgZGlyZWN0bHksIGEgc3RyaW5nIG9yIGFuIGFycmF5IG9mIHN0cmluZ3MgY2hlY2tzIHRoZSBlbGVtZW50IHdoZW4gaXRzIHZhbHVlIG1hdGNoZXNcclxuICovXHJcbmNvbnN0IGNoZWNrZWRTZXR0ZXIgPSBmdW5jdGlvbihhVmFsdWUpe1xyXG5cdGlmKHR5cGVvZiBhVmFsdWUgPT09IFwiYm9vbGVhblwiKVxyXG5cdFx0dGhpcy5jaGVja2VkID0gYVZhbHVlO1xyXG5cdGVsc2UgaWYodHlwZW9mIGFWYWx1ZSA9PT0gXCJzdHJpbmdcIilcclxuXHRcdHRoaXMuY2hlY2tlZCA9IHRoaXMudmFsdWUgPT0gYVZhbHVlO1xyXG5cdGVsc2UgaWYoQXJyYXkuaXNBcnJheShhVmFsdWUpKVxyXG5cdFx0dGhpcy5jaGVja2VkID0gYVZhbHVlLmluZGV4T2YodGhpcy52YWx1ZSkgPj0gMDtcclxuXHJcblx0dGhpcy50cmlnZ2VyKFwiY2hhbmdlZFwiKTtcclxufTtcclxuXHJcbi8qKlxyXG4gKiBUaGUgZmlyc3QgdHlwZSB3aXRoIGEgbWF0Y2hpbmcgc2VsZWN0b3IgaGFuZGxlcyB0aGUgZWxlbWVudC5cclxuICpcclxuICogQHR5cGUge0lucHV0VHlwZVtdfVxyXG4gKi9cclxuY29uc3QgSW5wdXRUeXBlcyA9IFtcclxuXHR7XHJcblx0XHRzZWxlY3RvciA6IFwic2VsZWN0XCIsXHJcblx0XHQvKipcclxuXHRcdCAqIEByZXR1cm5zIHtzdHJpbmdbXX0gdGhlIHZhbHVlcyBvZiBhbGwgc2VsZWN0ZWQgb3B0aW9uc1xyXG5cdFx0ICovXHJcblx0XHRnZXQgOiBmdW5jdGlvbigpe1xyXG5cdFx0XHRjb25zdCByZXN1bHQgPSBbXTtcclxuXHRcdFx0dGhpcy5maW5kKFwib3B0aW9uXCIpLmZvckVhY2gob3B0aW9uID0+IHtcclxuXHRcdFx0XHRpZihvcHRpb24uc2VsZWN0ZWQpXHJcblx0XHRcdFx0XHRyZXN1bHQucHVzaChvcHRpb24udmFsdWUpO1xyXG5cdFx0XHR9KTtcdFx0XHRcclxuXHRcdFx0cmV0dXJuIHJlc3VsdDtcclxuXHRcdH0sXHJcblx0XHRzZXQgOiBmdW5jdGlvbigpe1x0XHRcdFx0XHJcblx0XHRcdGxldCB2YWx1ZXMgPSBbXTtcclxuXHRcdFx0Y29uc3QgYXJncyA9IEFycmF5LmZyb20oYXJndW1lbnRzKTtcclxuXHRcdFx0bGV0IGFyZyA9IGFyZ3Muc2hpZnQoKTtcclxuXHRcdFx0d2hpbGUoYXJnKXtcclxuXHRcdFx0XHRpZihBcnJheS5pc0FycmF5KGFyZykpXHJcblx0XHRcdFx0XHR2YWx1ZXMgPSB2YWx1ZXMuY29uY2F0KGFyZyk7XHJcblx0XHRcdFx0ZWxzZVxyXG5cdFx0XHRcdFx0dmFsdWVzLnB1c2goYXJnKTtcclxuXHRcdFx0XHRcclxuXHRcdFx0XHRhcmcgPSBhcmdzLnNoaWZ0KCk7XHJcblx0XHRcdH1cclxuXHRcdFx0dGhpcy52YWx1ZSA9IHZhbHVlcztcclxuXHRcdFx0dGhpcy5maW5kKFwib3B0aW9uXCIpLmZvckVhY2gob3B0aW9uID0+IG9wdGlvbi5zZWxlY3RlZCA9IHZhbHVlcy5pbmRleE9mKG9wdGlvbi52YWx1ZSkgPj0gMCk7XHJcblx0XHRcdHRoaXMudHJpZ2dlcihcImNoYW5nZWRcIik7XHJcblx0XHR9XHJcblx0fSxcclxuXHR7XHJcblx0XHRzZWxlY3RvciA6IFwiaW5wdXRbdHlwZT1cXFwiY2hlY2tib3hcXFwiXVwiLFxyXG5cdFx0LyoqXHJcblx0XHQgKiBBIGNoZWNrYm94IGlzIGluZGVwZW5kZW50LCBzbyBhbiB1bmNoZWNrZWQgb25lIHJlcG9ydHMgZmFsc2UgLSBpdCBpcyBvZmYsXHJcblx0XHQgKiB3aGljaCBpcyBhIHZhbHVlIG9mIGl0cyBvd24uXHJcblx0XHQgKlxyXG5cdFx0ICogQHJldHVybnMge2Jvb2xlYW58c3RyaW5nfHVuZGVmaW5lZH0gdGhlIGNoZWNrZWQgc3RhdGUgd2l0aG91dCBhIHZhbHVlIGF0dHJpYnV0ZSwgb3RoZXJ3aXNlIHRoZSB2YWx1ZSB3aGVuIGNoZWNrZWRcclxuXHRcdCAqL1xyXG5cdFx0Z2V0IDogZnVuY3Rpb24oKXtcclxuXHRcdFx0aWYoIXRoaXMuaGFzQXR0cmlidXRlKFwidmFsdWVcIikpXHJcblx0XHRcdFx0cmV0dXJuIHRoaXMuY2hlY2tlZDtcclxuXHRcdFx0ZWxzZSBpZih0aGlzLmNoZWNrZWQpXHJcblx0XHRcdFx0cmV0dXJuIHRoaXMudmFsdWU7XHJcblx0XHR9LFxyXG5cdFx0c2V0IDogY2hlY2tlZFNldHRlclxyXG5cdH0sXHJcblx0e1xyXG5cdFx0c2VsZWN0b3IgOiBcImlucHV0W3R5cGU9XFxcInJhZGlvXFxcIl1cIixcclxuXHRcdC8qKlxyXG5cdFx0ICogQWxsIHJhZGlvcyBvZiBhIGdyb3VwIHNoYXJlIG9uZSBuYW1lIGFuZCBvbmx5IG9uZSBvZiB0aGVtIGNhbiBiZSBjaGVja2VkLFxyXG5cdFx0ICogc28gYW4gdW5jaGVja2VkIHJhZGlvIHJldHVybnMgdW5kZWZpbmVkIGluc3RlYWQgb2YgZmFsc2UgLSBpdCBjYXJyaWVzIG5vXHJcblx0XHQgKiB2YWx1ZSwgaXQganVzdCBpcyBub3QgdGhlIHNlbGVjdGVkIG9uZS4gVGhpcyBpcyB3aGF0IGtlZXBzIHRoZSB1bmNoZWNrZWRcclxuXHRcdCAqIHJhZGlvcyBmcm9tIG92ZXJ3cml0aW5nIHRoZSB2YWx1ZSBvZiB0aGVpciBncm91cCwgb25jZSB0aGUgcmVzdWx0cyBvZiBhXHJcblx0XHQgKiB3aG9sZSBncm91cCBnZXQgY29sbGVjdGVkIGJ5IG5hbWUuXHJcblx0XHQgKlxyXG5cdFx0ICogQHJldHVybnMge2Jvb2xlYW58c3RyaW5nfHVuZGVmaW5lZH0gdHJ1ZSBvciB0aGUgdmFsdWUgd2hlbiBjaGVja2VkLCB1bmRlZmluZWQgb3RoZXJ3aXNlXHJcblx0XHQgKi9cclxuXHRcdGdldCA6IGZ1bmN0aW9uKCl7XHJcblx0XHRcdGlmKHRoaXMuY2hlY2tlZClcclxuXHRcdFx0XHRyZXR1cm4gdGhpcy5oYXNBdHRyaWJ1dGUoXCJ2YWx1ZVwiKSA/IHRoaXMudmFsdWUgOiB0cnVlO1xyXG5cdFx0fSxcclxuXHRcdHNldCA6IGNoZWNrZWRTZXR0ZXJcclxuXHR9XHJcbl07XHJcblxyXG4vKipcclxuICogRmFsbGJhY2sgZm9yIGFsbCBlbGVtZW50cyB3aXRob3V0IGEgbWF0Y2hpbmcgSW5wdXRUeXBlLlxyXG4gKlxyXG4gKiBAdHlwZSB7SW5wdXRUeXBlfVxyXG4gKi9cclxuY29uc3QgRGVmYXVsdElucHV0VHlwZSA9IHtcclxuXHRcdGdldCA6IGZ1bmN0aW9uKCl7XHJcblx0XHRcdHJldHVybiB0aGlzLnZhbHVlO1xyXG5cdFx0fSxcclxuXHRcdHNldCA6IGZ1bmN0aW9uKGFWYWx1ZSl7XHJcblx0XHRcdHRoaXMudmFsdWUgPSBhVmFsdWU7XHJcblx0XHRcdHRoaXMudHJpZ2dlcihcImlucHV0XCIpO1xyXG5cdFx0fVxyXG59O1xyXG5cclxuLyoqXHJcbiAqIEBwYXJhbSB7RWxlbWVudH0gYUVsZW1lbnRcclxuICogQHJldHVybnMge0lucHV0VHlwZX0gdGhlIGZpcnN0IG1hdGNoaW5nIHR5cGUsIG9yIERlZmF1bHRJbnB1dFR5cGVcclxuICovXHJcbmNvbnN0IGdldElucHV0VHlwZSA9IGZ1bmN0aW9uKGFFbGVtZW50KXtcclxuXHRmb3IobGV0IGkgPSAwOyBpIDwgSW5wdXRUeXBlcy5sZW5ndGg7IGkrKylcclxuXHRcdGlmKGFFbGVtZW50LmlzKElucHV0VHlwZXNbaV0uc2VsZWN0b3IpKVxyXG5cdFx0XHRyZXR1cm4gSW5wdXRUeXBlc1tpXTtcdFx0XHJcblx0cmV0dXJuIERlZmF1bHRJbnB1dFR5cGU7XHJcbn07XHJcblxyXG5cclxuY29uc3Qgc3VwcG9ydCA9IEV4dGVuZGVyKFwiVmFsdWVTdXBwb3J0XCIsIFByb3RvdHlwZSA9PiB7XHJcblx0LyoqXHJcblx0ICogR2V0cyBvciBzZXRzIHRoZSB2YWx1ZSBvZiB0aGlzIGVsZW1lbnQuXHJcblx0ICpcclxuXHQgKiBXaGF0IGEgdmFsdWUgaXMgZGVwZW5kcyBvbiB0aGUgZWxlbWVudDogYSBzZWxlY3QgcmV0dXJucyB0aGUgdmFsdWVzIG9mIGFsbFxyXG5cdCAqIGl0cyBzZWxlY3RlZCBvcHRpb25zLCBhIGNoZWNrYm94IGl0cyBjaGVja2VkIHN0YXRlIG9yIGl0cyB2YWx1ZSwgYSByYWRpbyBhXHJcblx0ICogdmFsdWUgb25seSB3aGVuIGl0IGlzIGNoZWNrZWQsIGV2ZXJ5IG90aGVyIGVsZW1lbnQgaXRzIHZhbHVlLlxyXG5cdCAqXHJcblx0ICogQHBhcmFtIHsuLi4qfSBbYVZhbHVlXSAtIHRoZSBuZXcgdmFsdWUsIHRoZSBhY2NlcHRlZCB0eXBlcyBkZXBlbmQgb24gdGhlIGVsZW1lbnRcclxuXHQgKiBAcmV0dXJucyB7KnxFbGVtZW50fSB0aGUgdmFsdWUgb2YgdGhlIGVsZW1lbnQsIG9yIHRoaXMgd2hlbiBhIHZhbHVlIHdhcyBzZXRcclxuXHQgKi9cclxuXHRQcm90b3R5cGUudmFsID0gZnVuY3Rpb24oKSB7XHJcblx0XHRsZXQgdHlwZSA9IGdldElucHV0VHlwZSh0aGlzKTtcclxuXHRcdGlmKGFyZ3VtZW50cy5sZW5ndGggPT0gMClcclxuXHRcdFx0cmV0dXJuIHR5cGUuZ2V0LmFwcGx5KHRoaXMsIGFyZ3VtZW50cyk7XHJcblx0XHRlbHNlXHJcblx0XHRcdHR5cGUuc2V0LmFwcGx5KHRoaXMsIGFyZ3VtZW50cyk7XHJcblx0XHRcdFxyXG5cdFx0cmV0dXJuIHRoaXM7XHJcblx0fTtcdFxyXG59KTtcclxuZXhwb3J0IGRlZmF1bHQgc3VwcG9ydDsiLCJpbXBvcnQgXCIuL2RvbS9FdmVudFRhcmdldFwiO1xyXG5pbXBvcnQgXCIuL2RvbS9Ob2RlXCI7XHJcbmltcG9ydCBcIi4vZG9tL0VsZW1lbnRcIjtcclxuaW1wb3J0IFwiLi9kb20vRG9jdW1lbnRcIjtcclxuaW1wb3J0IFwiLi9kb20vRG9jdW1lbnRGcmFnbWVudFwiO1xyXG5pbXBvcnQgXCIuL2RvbS9IVE1MRWxlbWVudFwiO1xyXG5pbXBvcnQgXCIuL2RvbS9IVE1MSW5wdXRFbGVtZW50XCI7XHJcbmltcG9ydCBcIi4vZG9tL0hUTUxUZXh0QXJlYUVsZW1lbnRcIjtcclxuaW1wb3J0IFwiLi9kb20vSFRNTFNlbGVjdEVsZW1lbnRcIjtcclxuaW1wb3J0IFwiLi9kb20vTm9kZUxpc3RcIjtcclxuaW1wb3J0IFwiLi9kb20vSHRtbENvbGxlY3Rpb25cIjtcclxuaW1wb3J0IFwiLi9HbG9iYWxcIjtcclxuIiwiLyoqXHJcbiAqIEFkZHMgZGVsZWdhdGluZyBtZXRob2RzIHRvIGEgcHJvdG90eXBlLCBvbmUgZm9yIGVhY2ggbWV0aG9kIG9mIHRoZSB0YXJnZXRcclxuICogcHJvdG90eXBlcy5cclxuICpcclxuICogVGhpcyBpcyBob3cgYSBOb2RlTGlzdCBnZXRzIHRoZSBtZXRob2RzIG9mIGEgTm9kZTogZm9yIGV2ZXJ5IG1ldGhvZCBuYW1lIGZvdW5kXHJcbiAqIG9uIHRoZSB0YXJnZXRzLCBhIGZ1bmN0aW9uIGlzIHB1dCBvbiB0aGUgc291cmNlIHRoYXQgaGFuZHMgdGhlIGNhbGwgdG8gdGhlXHJcbiAqIGNhbGxiYWNrLCB0b2dldGhlciB3aXRoIHRoYXQgbmFtZS4gVGhlIGNhbGxiYWNrIHRoZW4gZGVjaWRlcyB3aGF0IHRvIGRvIC0gZm9yIGFcclxuICogbGlzdCBpdCBhcHBsaWVzIHRoZSBtZXRob2QgdG8gZWFjaCBub2RlIGFuZCBjb2xsZWN0cyB0aGUgcmVzdWx0cy5cclxuICpcclxuICogQSBuYW1lIGFscmVhZHkgb24gdGhlIHNvdXJjZSBpcyBsZWZ0IGFsb25lLCBzbyBpdHMgb3duIG1ldGhvZHMgd2luLiBPbmx5IHZhbHVlXHJcbiAqIG1ldGhvZHMgYXJlIHRha2VuLCBhY2Nlc3NvcnMgYXJlIHNraXBwZWQsIGFzIHRoZWlyIGRlc2NyaXB0b3IgaGFzIG5vIHZhbHVlLlxyXG4gKlxyXG4gKiBAcGFyYW0ge2Z1bmN0aW9uKHN0cmluZywgQXJndW1lbnRzKToqfSBjYWxsYmFjayAtIGNhbGxlZCBhcyBtZXRob2QsIHdpdGggdGhlIG5hbWUgYW5kIHRoZSBhcmd1bWVudHNcclxuICogQHBhcmFtIHtPYmplY3R9IHNvdXJjZSAtIHRoZSBwcm90b3R5cGUgdGhlIGRlbGVnYXRpbmcgbWV0aG9kcyBhcmUgYWRkZWQgdG9cclxuICogQHBhcmFtIHsuLi5PYmplY3R9IHRoZVRhcmdldHMgLSB0aGUgcHJvdG90eXBlcyB3aG9zZSBtZXRob2QgbmFtZXMgYXJlIGRlbGVnYXRlZFxyXG4gKi9cclxuY29uc3QgRGVsZWdhdGVyQnVpbGRlciA9IGZ1bmN0aW9uKCkge1xyXG5cdGNvbnN0IGFyZ3MgPSBBcnJheS5mcm9tKGFyZ3VtZW50cyk7XHJcblx0Y29uc3QgY2FsbGJhY2sgPSBhcmdzLnNoaWZ0KCk7XHJcblx0Y29uc3Qgc291cmNlID0gYXJncy5zaGlmdCgpO1xyXG5cdGFyZ3MuZm9yRWFjaCggdGFyZ2V0ID0+e1xyXG5cdFx0T2JqZWN0LmdldE93blByb3BlcnR5TmFtZXModGFyZ2V0KVxyXG5cdFx0LmZvckVhY2gobmFtZSA9PiB7XHJcblx0XHRcdGNvbnN0IHByb3AgPSBPYmplY3QuZ2V0T3duUHJvcGVydHlEZXNjcmlwdG9yKHRhcmdldCwgbmFtZSk7XHJcblx0XHRcdGlmICh0eXBlb2Ygc291cmNlW25hbWVdID09PSBcInVuZGVmaW5lZFwiICYmIHR5cGVvZiBwcm9wLnZhbHVlID09PSBcImZ1bmN0aW9uXCIpXHJcblx0XHRcdFx0c291cmNlW25hbWVdID0gZnVuY3Rpb24oKXtcclxuXHRcdFx0XHRcdHJldHVybiBjYWxsYmFjay5jYWxsKHRoaXMsIG5hbWUsIGFyZ3VtZW50cyk7XHJcblx0XHRcdFx0fTtcclxuXHRcdH0pO1xyXG5cdH0pO1xyXG5cclxufTtcclxuZXhwb3J0IGRlZmF1bHQgRGVsZWdhdGVyQnVpbGRlcjsiLCIvKipcclxuICogQXBwbGllcyBleHRlbnNpb25zIHRvIHRoZSBwcm90b3R5cGUgb2YgYSB0eXBlLlxyXG4gKlxyXG4gKiBAcGFyYW0ge0Z1bmN0aW9ufSBhVHlwZSAtIHRoZSB0eXBlIHdob3NlIHByb3RvdHlwZSBnZXRzIGV4dGVuZGVkXHJcbiAqIEBwYXJhbSB7Li4uZnVuY3Rpb24oRnVuY3Rpb24pOnZvaWR9IHRoZUV4dGVuZGVycyAtIHRoZSB3cmFwcGVkIGV4dGVuc2lvbnMgdG8gYXBwbHksIGluIG9yZGVyXHJcbiAqL1xyXG5jb25zdCBleHRlbmRQcm90b3R5cGUgPSBmdW5jdGlvbigpe1xyXG5cdGNvbnN0IGFyZ3MgPSBBcnJheS5mcm9tKGFyZ3VtZW50cyk7XHJcblx0Y29uc3QgdHlwZSA9IGFyZ3Muc2hpZnQoKTtcclxuXHR3aGlsZShhcmdzLmxlbmd0aCA+IDApe1xyXG5cdFx0Y29uc3QgZXh0ZW5kZXIgPSBhcmdzLnNoaWZ0KCk7XHJcblx0XHRleHRlbmRlcih0eXBlKTtcclxuXHR9XHJcbn07XHJcblxyXG5leHBvcnQgZGVmYXVsdCBleHRlbmRQcm90b3R5cGU7IiwiaW1wb3J0IFV0aWxzIGZyb20gXCIuL1V0aWxzXCI7XHJcblxyXG4vKipcclxuICogV2hpY2ggZXh0ZW5zaW9uIGlzIGFwcGxpZWQgdG8gd2hpY2ggdHlwZSwga2VwdCBvbiB0aGUgZ2xvYmFsIG9iamVjdCBzbyBpdCBpc1xyXG4gKiBzaGFyZWQgYWNyb3NzIHNlcGFyYXRlIGxvYWRzIG9mIHRoZSBsaWJyYXJ5LlxyXG4gKlxyXG4gKiBAdHlwZSB7T2JqZWN0PHN0cmluZywgT2JqZWN0PHN0cmluZywgYm9vbGVhbj4+fVxyXG4gKi9cclxuY29uc3QgRVhURU5TSU9OU19NQVAgPSBVdGlscy5nbG9iYWxWYXIoXCJfX19ET01fQVBJX0VYVEVOU0lPTl9NQVBfX19cIiwge30pO1xyXG5cclxuLyoqXHJcbiAqIFdyYXBzIGFuIGV4dGVuc2lvbiBzbyBpdCBhcHBsaWVzIHRvIHRoZSBwcm90b3R5cGUgb2YgYSB0eXBlIG9ubHkgb25jZS5cclxuICpcclxuICogVGhlIHJldHVybmVkIGZ1bmN0aW9uIGlzIHdoYXQgZXh0ZW5kUHJvdG90eXBlKCkgY2FsbHMgd2l0aCBhIHR5cGUuIEFwcGx5aW5nIHRoZVxyXG4gKiBzYW1lIG5hbWVkIGV4dGVuc2lvbiB0byB0aGUgc2FtZSB0eXBlIGFnYWluIGlzIGEgbm8tb3Agd2l0aCBhIHdhcm5pbmcsIHNvXHJcbiAqIGxvYWRpbmcgdGhlIGxpYnJhcnkgdHdpY2UgZG9lcyBub3QgcGF0Y2ggdGhlIHByb3RvdHlwZXMgdHdpY2UuXHJcbiAqXHJcbiAqIEBwYXJhbSB7c3RyaW5nfSBhTmFtZSAtIHRoZSBuYW1lIG9mIHRoZSBleHRlbnNpb24sIHVuaXF1ZSBwZXIgdHlwZVxyXG4gKiBAcGFyYW0ge2Z1bmN0aW9uKE9iamVjdCk6dm9pZH0gYUV4dGVudGlvbiAtIGFkZHMgdGhlIG1lbWJlcnMgdG8gdGhlIHByb3RvdHlwZVxyXG4gKiBAcmV0dXJucyB7ZnVuY3Rpb24oRnVuY3Rpb24pOnZvaWR9IGEgZnVuY3Rpb24gYXBwbHlpbmcgdGhlIGV4dGVuc2lvbiB0byBhIHR5cGVcclxuICovXHJcbmNvbnN0IEV4dGVuZGVyID0gZnVuY3Rpb24oYU5hbWUsIGFFeHRlbnRpb24pe1xyXG5cdHJldHVybiBmdW5jdGlvbihhVHlwZSl7XHJcblx0XHRjb25zdCB7bmFtZSwgcHJvdG90eXBlfSA9IGFUeXBlO1xyXG5cdFx0bGV0IGV4dGVuc2lvbnMgPSBFWFRFTlNJT05TX01BUFtuYW1lXTtcclxuXHRcdGlmKCFleHRlbnNpb25zKVxyXG5cdFx0XHRleHRlbnNpb25zID0gRVhURU5TSU9OU19NQVBbbmFtZV0gPSB7fTtcdFx0XHJcblx0XHRcclxuXHRcdGlmKCFleHRlbnNpb25zW2FOYW1lXSl7XHJcblx0XHRcdGV4dGVuc2lvbnNbYU5hbWVdID0gdHJ1ZTtcclxuXHRcdFx0YUV4dGVudGlvbihwcm90b3R5cGUpO1xyXG5cdFx0fVxyXG5cdFx0ZWxzZVxyXG5cdFx0XHRjb25zb2xlLndhcm4oYER1cGxpY2F0ZWQgbG9hZCBvZiBleHRlbnNpb24gXFxcIiR7YU5hbWV9XFxcIiFgKTtcclxuXHR9XHJcbn07XHJcblxyXG5leHBvcnQgZGVmYXVsdCBFeHRlbmRlcjsiLCJcclxuLyoqXHJcbiAqIFRoZSBnbG9iYWwgb2JqZWN0IG9mIHRoZSBjdXJyZW50IGVudmlyb25tZW50LlxyXG4gKlxyXG4gKiBEZXRlY3RlZCB3aXRoIHR5cGVvZiBndWFyZHMsIGJlY2F1c2UgYSBiYXJlIHJlZmVyZW5jZSB0byBhbiB1bmRlY2xhcmVkIG5hbWVcclxuICogdGhyb3dzIGluc3RlYWQgb2YgYmVpbmcgZmFsc3kgLSBzbyBhIHBsYWluIHdpbmRvdyB8fCBnbG9iYWwgY2hhaW4gd291bGQgYnJlYWtcclxuICogZXZlcnl3aGVyZSB3aW5kb3cgaXMgbWlzc2luZywgbm90IGZhbGwgdGhyb3VnaC4gZ2xvYmFsVGhpcyBjb3ZlcnMgdGhlIGJyb3dzZXIsXHJcbiAqIG5vZGUgYW5kIHdvcmtlcnMsIHRoZSByZXN0IHN0YXlzIGFzIGEgZmFsbGJhY2sgZm9yIG9sZGVyIHJ1bnRpbWVzLlxyXG4gKlxyXG4gKiBAdHlwZSB7T2JqZWN0fVxyXG4gKi9cclxuZXhwb3J0IGNvbnN0IEdMT0JBTCA9IHR5cGVvZiBnbG9iYWxUaGlzICE9PSBcInVuZGVmaW5lZFwiID8gZ2xvYmFsVGhpcyA6XHJcblx0dHlwZW9mIHdpbmRvdyAhPT0gXCJ1bmRlZmluZWRcIiA/IHdpbmRvdyA6XHJcblx0dHlwZW9mIGdsb2JhbCAhPT0gXCJ1bmRlZmluZWRcIiA/IGdsb2JhbCA6XHJcblx0dHlwZW9mIHNlbGYgIT09IFwidW5kZWZpbmVkXCIgPyBzZWxmIDoge307XHJcblxyXG5jb25zdCBVdGlscyA9IHtcclxuXHQvKipcclxuXHQgKiBUaGUgZ2xvYmFsIG9iamVjdCwgc2FtZSBhcyBHTE9CQUwuXHJcblx0ICpcclxuXHQgKiBAdHlwZSB7T2JqZWN0fVxyXG5cdCAqL1xyXG5cdGdsb2JhbCA6IEdMT0JBTCxcclxuXHJcblx0LyoqXHJcblx0ICogUmVhZHMgYSB2YXJpYWJsZSBmcm9tIHRoZSBnbG9iYWwgb2JqZWN0LCBpbml0aWFsaXppbmcgaXQgb25jZSB3aGVuIGEgdmFsdWVcclxuXHQgKiBpcyBnaXZlbiBhbmQgbm9uZSBpcyBzZXQgeWV0LlxyXG5cdCAqXHJcblx0ICogVXNlZCB0byBzaGFyZSBzdGF0ZSBiZXR3ZWVuIHNlcGFyYXRlIGxvYWRzIG9mIHRoZSBsaWJyYXJ5LCB3aGljaCBlYWNoIGhhdmVcclxuXHQgKiB0aGVpciBvd24gbW9kdWxlIHNjb3BlIGJ1dCB0aGUgb25lIGdsb2JhbCBvYmplY3QgaW4gY29tbW9uLlxyXG5cdCAqXHJcblx0ICogQHBhcmFtIHtzdHJpbmd9IGFOYW1lIC0gdGhlIG5hbWUgb24gdGhlIGdsb2JhbCBvYmplY3RcclxuXHQgKiBAcGFyYW0geyp9IFthSW5pdFZhbHVlXSAtIHRoZSB2YWx1ZSB0byBzZXQgd2hlbiB0aGUgbmFtZSBpcyBzdGlsbCB1bmRlZmluZWRcclxuXHQgKiBAcmV0dXJucyB7Kn0gdGhlIHZhbHVlIG9uIHRoZSBnbG9iYWwgb2JqZWN0XHJcblx0ICovXHJcblx0Z2xvYmFsVmFyIDogZnVuY3Rpb24oYU5hbWUsIGFJbml0VmFsdWUpe1xyXG5cdFx0aWYoYXJndW1lbnRzLmxlbmd0aCA9PT0gMiAmJiB0eXBlb2YgR0xPQkFMW2FOYW1lXSA9PT0gXCJ1bmRlZmluZWRcIilcclxuXHRcdFx0R0xPQkFMW2FOYW1lXSA9IGFJbml0VmFsdWU7XHJcblxyXG5cdFx0cmV0dXJuIEdMT0JBTFthTmFtZV07XHJcblx0fVxyXG59O1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgVXRpbHM7IiwiaW1wb3J0IHsgbGF6eVByb21pc2UgfSBmcm9tIFwiQGRlZmF1bHQtanMvZGVmYXVsdGpzLWNvbW1vbi11dGlscy9zcmMvUHJvbWlzZVV0aWxzLmpzXCI7XG5pbXBvcnQge2RlZmluZX0gZnJvbSBcIi4vdXRpbHMvRGVmaW5lQ29tcG9uZW50SGVscGVyLmpzXCI7XG5pbXBvcnQgeyB1dWlkIH0gZnJvbSBcIkBkZWZhdWx0LWpzL2RlZmF1bHRqcy1jb21tb24tdXRpbHMvc3JjL1VVSUQuanNcIjtcbmltcG9ydCB7IHRyaWdnZXJUaW1lb3V0IH0gZnJvbSBcIi4vQ29uc3RhbnRzLmpzXCI7XG5pbXBvcnQgeyBhdHRyaWJ1dGVDaGFuZ2VFdmVudG5hbWUsIGNvbXBvbmVudEV2ZW50bmFtZSB9IGZyb20gXCIuL3V0aWxzL0V2ZW50SGVscGVyLmpzXCI7XG5cbi8qKlxuICogQG1vZHVsZSBDb21wb25lbnRcbiAqXG4gKiBGYWN0b3J5IGFuZCBiYXNlIGNsYXNzIGZvciBhc3luY2hyb25vdXMgd2ViIGNvbXBvbmVudHMuIEEgY29tcG9uZW50IGV4cG9zZXMgYVxuICogYHJlYWR5YCBwcm9taXNlIHRoYXQgcmVzb2x2ZXMgb25jZSBhbGwgcG9zdC1jb25zdHJ1Y3Qgc3RlcHMgb2Yge0BsaW5rIENvbXBvbmVudCNpbml0fVxuICogaGF2ZSBydW4uXG4gKi9cblxuLyoqXG4gKiBDcmVhdGVzIGEgZG9jdW1lbnQtdW5pcXVlIGlkIGJ5IGNvbWJpbmluZyBhbiBvcHRpb25hbCBwcmVmaXggYW5kIHN1ZmZpeCB3aXRoXG4gKiBhIGdlbmVyYXRlZCB7QGxpbmsgdXVpZH0uIEl0IHJldHJpZXMgdXAgdG8gMTAwIHRpbWVzIHVudGlsIHRoZSBpZCBpcyBub3QgeWV0XG4gKiBwcmVzZW50IGluIHRoZSBkb2N1bWVudDsgaWYgbm8gdW5pcXVlIGlkIGNhbiBiZSBwcm9kdWNlZCBpdCBsb2dzIGFuIGVycm9yIGFuZFxuICogcmV0dXJucyB0aGUgbGFzdCBnZW5lcmF0ZWQgaWQuXG4gKlxuICogQHBhcmFtIHtzdHJpbmd9IFtwcmVmaXhdIC0gdGV4dCBwcmVwZW5kZWQgdG8gdGhlIGdlbmVyYXRlZCB1dWlkLlxuICogQHBhcmFtIHtzdHJpbmd9IFtzdWZmaXhdIC0gdGV4dCBhcHBlbmRlZCB0byB0aGUgZ2VuZXJhdGVkIHV1aWQuXG4gKiBAcmV0dXJucyB7c3RyaW5nfSBhIChiZXN0LWVmZm9ydCkgZG9jdW1lbnQtdW5pcXVlIGlkLlxuICovXG5leHBvcnQgY29uc3QgY3JlYXRlVVVJRCA9IChwcmVmaXgsIHN1ZmZpeCkgPT4ge1xuXHRsZXQgY291bnQgPSAwO1xuXHRsZXQgaWQgPSBudWxsO1xuXHR3aGlsZSAoY291bnQgPCAxMDApIHtcblx0XHRpZCA9IGAke3ByZWZpeCA/IHByZWZpeCA6IFwiXCJ9JHt1dWlkKCl9JHtzdWZmaXggPyBzdWZmaXggOiBcIlwifWA7XG5cdFx0aWYgKCFkb2N1bWVudC5nZXRFbGVtZW50QnlJZChpZCkpIHJldHVybiBpZDtcblxuXHRcdGNvdW50Kys7XG5cdH1cblx0Y29uc29sZS5lcnJvcihuZXcgRXJyb3IoXCJUbyBtYW55IHJldHJpZXMgdG8gY3JlYXRlIGFuIHVuaXF1ZSBpZCAtIGNyZWF0ZWQgaWQgaXMgbm90IHVuaXF1ZSFcIikpO1xuXHRyZXR1cm4gaWQ7XG59O1xuXG4vKipcbiAqIEB0eXBlZGVmIHtPYmplY3R9IENvbXBvbmVudE9wdGlvbnNcbiAqIEBwcm9wZXJ0eSB7Ym9vbGVhbn0gW3NoYWRvd1Jvb3Q9ZmFsc2VdIC0gd2hlbiBgdHJ1ZWAgYW4gb3BlbiBzaGFkb3cgcm9vdCBpcyBhdHRhY2hlZC5cbiAqIEBwcm9wZXJ0eSB7Tm9kZXxzdHJpbmd8ZnVuY3Rpb24oQ29tcG9uZW50KTogKE5vZGV8c3RyaW5nKX0gW2NvbnRlbnQ9bnVsbF0gLSBjb250ZW50IGFwcGVuZGVkIHRvIHRoZSBjb21wb25lbnQncyByb290OyBhIGZ1bmN0aW9uIHJlY2VpdmVzIHRoZSBjb21wb25lbnQgYW5kIHJldHVybnMgdGhlIGNvbnRlbnQuXG4gKiBAcHJvcGVydHkge2Jvb2xlYW59IFtjcmVhdGVVSUQ9ZmFsc2VdIC0gd2hlbiBgdHJ1ZWAgYSB1bmlxdWUgYGlkYCBhdHRyaWJ1dGUgaXMgYXNzaWduZWQgZHVyaW5nIHtAbGluayBDb21wb25lbnQjaW5pdH0uXG4gKiBAcHJvcGVydHkge3N0cmluZ30gW3VpZFByZWZpeD1cImlkLVwiXSAtIHByZWZpeCB1c2VkIGZvciB0aGUgZ2VuZXJhdGVkIGlkIHdoZW4gYGNyZWF0ZVVJRGAgaXMgYHRydWVgLlxuICogQHByb3BlcnR5IHtzdHJpbmd9IFt1aWRTdWZmaXg9XCJcIl0gLSBzdWZmaXggdXNlZCBmb3IgdGhlIGdlbmVyYXRlZCBpZCB3aGVuIGBjcmVhdGVVSURgIGlzIGB0cnVlYC5cbiAqIEBwcm9wZXJ0eSB7QXJyYXk8ZnVuY3Rpb24oQ29tcG9uZW50KTogKHZvaWR8UHJvbWlzZSk+fSBbcG9zdENvbnN0cnVjdHM9bnVsbF0gLSBhZGRpdGlvbmFsIHBvc3QtY29uc3RydWN0IGZ1bmN0aW9ucyBydW4gZHVyaW5nIHtAbGluayBDb21wb25lbnQjaW5pdH0uXG4gKiBAcHJvcGVydHkge0FycmF5PGZ1bmN0aW9uKENvbXBvbmVudCk6ICh2b2lkfFByb21pc2UpPn0gW3Bvc3RDb25zdHVjdHM9bnVsbF0gLSBkZXByZWNhdGVkIG1pc3NwZWxsZWQgYWxpYXMgb2YgYHBvc3RDb25zdHJ1Y3RzYDsgdXNlIGBwb3N0Q29uc3RydWN0c2AgaW5zdGVhZC5cbiAqL1xuXG4vKipcbiAqIEJ1aWxkcyBhIGNvbXBvbmVudCBiYXNlIGNsYXNzIGV4dGVuZGluZyB0aGUgZ2l2ZW4gSFRNTCBlbGVtZW50IHR5cGUuXG4gKlxuICogQHBhcmFtIHt0eXBlb2YgSFRNTEVsZW1lbnR9IGh0bWxCYXNlVHlwZSAtIHRoZSBIVE1MIGVsZW1lbnQgY2xhc3MgdG8gZXh0ZW5kLlxuICogQHJldHVybnMge3R5cGVvZiBIVE1MRWxlbWVudH0gYSBjb21wb25lbnQgY2xhc3MgZXh0ZW5kaW5nIGBodG1sQmFzZVR5cGVgLlxuICovXG5jb25zdCBidWlsZENsYXNzID0gKGh0bWxCYXNlVHlwZSkgPT4ge1xuXHQvKipcblx0ICogQXN5bmNocm9ub3VzIHdlYiBjb21wb25lbnQgYmFzZSBjbGFzcy5cblx0ICpcblx0ICogQGNsYXNzIENvbXBvbmVudFxuXHQgKiBAZXh0ZW5kcyBIVE1MRWxlbWVudFxuXHQgKi9cblx0Y29uc3QgY2xhenogPSBjbGFzcyBDb21wb25lbnQgZXh0ZW5kcyBodG1sQmFzZVR5cGUge1xuXG5cdFx0LyoqXG5cdFx0ICogVGFnIG5hbWUgdXNlZCB0byByZWdpc3RlciB0aGUgY29tcG9uZW50LiBNdXN0IGJlIG92ZXJyaWRkZW4gYXMgYVxuXHRcdCAqIHN0YXRpYyBnZXR0ZXIgb24gdGhlIGNvbmNyZXRlIGNvbXBvbmVudCBjbGFzcy5cblx0XHQgKlxuXHRcdCAqIEBzdGF0aWNcblx0XHQgKiBAdHlwZSB7c3RyaW5nfVxuXHRcdCAqIEB0aHJvd3Mge0Vycm9yfSBhbHdheXMsIG9uIHRoZSBiYXNlIGNsYXNzLlxuXHRcdCAqL1xuXHRcdHN0YXRpYyBnZXQgTk9ERU5BTUUoKSB7dGhyb3cgbmV3IEVycm9yKFwiTk9ERU5BTUUgbXVzdCBiZSBkZWZpbmVkIGFzIHN0YXRpYyBvbiBjb21wb25lbnQgY2xhc3MhXCIpO31cblxuXHRcdC8qKlxuXHRcdCAqIFJlZ2lzdGVycyB0aGlzIGNvbXBvbmVudCBjbGFzcyBhcyBhIGN1c3RvbSBlbGVtZW50LlxuXHRcdCAqXG5cdFx0ICogQHN0YXRpY1xuXHRcdCAqIEB0eXBlIHt0eXBlb2YgaW1wb3J0KFwiLi91dGlscy9EZWZpbmVDb21wb25lbnRIZWxwZXIuanNcIikuZGVmaW5lfVxuXHRcdCAqL1xuXHRcdHN0YXRpYyBkZWZpbmUgPSBkZWZpbmU7XG5cblx0XHQvKipcblx0XHQgKiBBdHRyaWJ1dGVzIG9ic2VydmVkIGZvciB7QGxpbmsgQ29tcG9uZW50I2F0dHJpYnV0ZUNoYW5nZWRDYWxsYmFja30uXG5cdFx0ICogT3ZlcnJpZGUgdG8gb2JzZXJ2ZSBhdHRyaWJ1dGVzLlxuXHRcdCAqXG5cdFx0ICogQHN0YXRpY1xuXHRcdCAqIEByZWFkb25seVxuXHRcdCAqIEB0eXBlIHtBcnJheTxzdHJpbmc+fVxuXHRcdCAqL1xuXHRcdHN0YXRpYyBnZXQgb2JzZXJ2ZWRBdHRyaWJ1dGVzKCkge1xuXHRcdFx0cmV0dXJuIFtdO1xuXHRcdH1cblxuXHRcdCNyZWFkeSA9IG51bGw7XG5cdFx0I3Bvc3RDb25zdHJ1Y3RzID0gW107XG5cblx0XHQvKipcblx0XHQgKiBAcGFyYW0ge0NvbXBvbmVudE9wdGlvbnN9IFtvcHRpb25zPXt9XSAtIGNvbmZpZ3VyYXRpb24gZm9yIHRoZSBjb21wb25lbnQuXG5cdFx0ICovXG5cdFx0Y29uc3RydWN0b3IoeyBzaGFkb3dSb290ID0gZmFsc2UsIGNvbnRlbnQgPSBudWxsLCBjcmVhdGVVSUQgPSBmYWxzZSwgdWlkUHJlZml4ID0gXCJpZC1cIiwgdWlkU3VmZml4ID0gXCJcIiwgcG9zdENvbnN0cnVjdHMgPSBudWxsLCBwb3N0Q29uc3R1Y3RzID0gbnVsbCB9ID0ge30pIHtcblx0XHRcdHN1cGVyKCk7XG5cdFx0XHR0aGlzLiNyZWFkeSA9IGxhenlQcm9taXNlKCk7XG5cdFx0XHRpZiAoY3JlYXRlVUlEKSB0aGlzLiNwb3N0Q29uc3RydWN0cy5wdXNoKGFzeW5jICgpID0+IHRoaXMuYXR0cihcImlkXCIsIGNyZWF0ZVVVSUQodWlkUHJlZml4LCB1aWRTdWZmaXgpKSk7XG5cblx0XHRcdGlmIChzaGFkb3dSb290KSB0aGlzLmF0dGFjaFNoYWRvdyh7IG1vZGU6IFwib3BlblwiIH0pO1xuXG5cdFx0XHRpZiAoY29udGVudCkgdGhpcy5yb290LmFwcGVuZCh0eXBlb2YgY29udGVudCA9PT0gXCJmdW5jdGlvblwiID8gY29udGVudCh0aGlzKSA6IGNvbnRlbnQpO1xuXG5cdFx0XHQvLyBgcG9zdENvbnN0dWN0c2AgaXMgdGhlIGRlcHJlY2F0ZWQgKG1pc3NwZWxsZWQpIGFsaWFzIG9mIGBwb3N0Q29uc3RydWN0c2Bcblx0XHRcdGlmIChwb3N0Q29uc3RydWN0cyA9PSBudWxsICYmIHBvc3RDb25zdHVjdHMgIT0gbnVsbCkge1xuXHRcdFx0XHRjb25zb2xlLndhcm4oYENvbXBvbmVudCBvcHRpb24gXCJwb3N0Q29uc3R1Y3RzXCIgaXMgZGVwcmVjYXRlZCAtIHVzZSBcInBvc3RDb25zdHJ1Y3RzXCIgaW5zdGVhZC5gKTtcblx0XHRcdFx0cG9zdENvbnN0cnVjdHMgPSBwb3N0Q29uc3R1Y3RzO1xuXHRcdFx0fVxuXG5cdFx0XHRpZihwb3N0Q29uc3RydWN0cyBpbnN0YW5jZW9mIEFycmF5KVxuXHRcdFx0XHRmb3IobGV0IHBvc3Qgb2YgcG9zdENvbnN0cnVjdHMpXG5cdFx0XHRcdFx0aWYodHlwZW9mIHBvc3QgPT09IFwiZnVuY3Rpb25cIilcblx0XHRcdFx0XHRcdHRoaXMuI3Bvc3RDb25zdHJ1Y3RzLnB1c2gocG9zdClcblx0XHR9XG5cblxuXHRcdC8qKlxuXHRcdCAqIEFycmF5IG9mIHBvc3QgY29uc3RydWN0IGZ1bmN0aW9uc1xuXHRcdCAqXG5cdFx0ICogQHJlYWRvbmx5XG5cdFx0ICogQHR5cGUge0FycmF5PEZ1bmN0aW9uPn1cblx0XHQgKi9cblx0XHRnZXQgcG9zdENvbnN0cnVjdHMoKXtcblx0XHRcdHJldHVybiB0aGlzLiNwb3N0Q29uc3RydWN0cztcblx0XHR9XG5cblxuXHRcdC8qKlxuXHRcdCAqIFRoZSByZW5kZXIgcm9vdCBvZiB0aGUgY29tcG9uZW50OiB0aGUgc2hhZG93IHJvb3Qgd2hlbiBwcmVzZW50LFxuXHRcdCAqIG90aGVyd2lzZSB0aGUgY29tcG9uZW50IGl0c2VsZi5cblx0XHQgKlxuXHRcdCAqIEByZWFkb25seVxuXHRcdCAqIEB0eXBlIHtIVE1MRWxlbWVudHxTaGFkb3dSb290fVxuXHRcdCAqL1xuXHRcdGdldCByb290KCkge1xuXHRcdFx0cmV0dXJuIHRoaXMuc2hhZG93Um9vdCB8fCB0aGlzO1xuXHRcdH1cblxuXG5cdFx0LyoqXG5cdFx0ICogUHJvbWlzZSB0aGF0IHJlc29sdmVzIG9uY2Uge0BsaW5rIENvbXBvbmVudCNpbml0fSBoYXMgY29tcGxldGVkLlxuXHRcdCAqXG5cdFx0ICogQHJlYWRvbmx5XG5cdFx0ICogQHR5cGUge1Byb21pc2V9XG5cdFx0ICovXG5cdFx0Z2V0IHJlYWR5KCkge1xuXHRcdFx0cmV0dXJuIHRoaXMuI3JlYWR5O1xuXHRcdH1cblxuXHRcdC8qKlxuXHRcdCAqIEZyYW1ld29yay1pbnRlcm5hbCBpbml0aWFsaXphdGlvbiBvcmNoZXN0cmF0b3I6IHJ1bnMgZXZlcnkgcG9zdC1jb25zdHJ1Y3Rcblx0XHQgKiBmdW5jdGlvbiBpbiBvcmRlciBhbmQgdGhlbiB0aGUgb3ZlcnJpZGFibGUge0BsaW5rIENvbXBvbmVudCNpbml0fSBob29rLlxuXHRcdCAqIERyaXZlbiBleGNsdXNpdmVseSBieSB7QGxpbmsgQ29tcG9uZW50I2Nvbm5lY3RlZENhbGxiYWNrfSBhbmRcblx0XHQgKiB7QGxpbmsgQ29tcG9uZW50I3JlaW5pdH07IGJlaW5nIHByaXZhdGUsIHRoZSBmdWxsIGxpZmVjeWNsZSBjYW4gbmV2ZXIgYmVcblx0XHQgKiB0cmlnZ2VyZWQgcGFydGlhbGx5IG9yIGJ5IGFjY2lkZW50IChlLmcuIGEgbWFudWFsIGBpbml0KClgIGNhbGwpLlxuXHRcdCAqXG5cdFx0ICogQGFzeW5jXG5cdFx0ICogQHJldHVybnMge1Byb21pc2V9IHJlc29sdmVzIHdpdGggdGhlIHJldHVybiB2YWx1ZSBvZiB7QGxpbmsgQ29tcG9uZW50I2luaXR9LlxuXHRcdCAqL1xuXHRcdGFzeW5jICNydW5Jbml0KCkge1xuXHRcdFx0Zm9yIChsZXQgZnVuYyBvZiB0aGlzLiNwb3N0Q29uc3RydWN0cykgYXdhaXQgZnVuYyh0aGlzKTtcblx0XHRcdHJldHVybiBhd2FpdCB0aGlzLmluaXQoKTtcblx0XHR9XG5cblx0XHQvKipcblx0XHQgKiBSdW5zIHRoZSBpbml0aWFsaXphdGlvbiBvcmNoZXN0cmF0b3IgYW5kIHNldHRsZXMge0BsaW5rIENvbXBvbmVudCNyZWFkeX1cblx0XHQgKiB3aXRoIGl0cyByZXN1bHQuXG5cdFx0ICpcblx0XHQgKiBAcmV0dXJucyB7UHJvbWlzZX0gdGhlIHtAbGluayBDb21wb25lbnQjcmVhZHl9IHByb21pc2UuXG5cdFx0ICovXG5cdFx0I3NldHRsZSgpIHtcblx0XHRcdHRoaXMuI3J1bkluaXQoKVxuXHRcdFx0XHQudGhlbigodmFsdWUpID0+IHRoaXMuI3JlYWR5LnJlc29sdmUodmFsdWUpKVxuXHRcdFx0XHQuY2F0Y2goKGVycm9yKSA9PiB0aGlzLiNyZWFkeS5yZXNvbHZlKGVycm9yKSk7XG5cdFx0XHRyZXR1cm4gdGhpcy4jcmVhZHk7XG5cdFx0fVxuXG5cdFx0LyoqXG5cdFx0ICogT3ZlcnJpZGUgaG9vayBmb3IgYXN5bmNocm9ub3VzIGNvbXBvbmVudCBzZXR1cC4gSXQgcnVucyBhdXRvbWF0aWNhbGx5XG5cdFx0ICogYWZ0ZXIgdGhlIHBvc3QtY29uc3RydWN0IGZ1bmN0aW9ucyBvbmNlIHRoZSBjb21wb25lbnQgaXMgY29ubmVjdGVkLCBhbmRcblx0XHQgKiBpdHMgcmV0dXJuIHZhbHVlIHNldHRsZXMge0BsaW5rIENvbXBvbmVudCNyZWFkeX0uIGB0aGlzLnJvb3RgIGFscmVhZHlcblx0XHQgKiBwb2ludHMgYXQgdGhlIHJlbmRlciByb290IHdoZW4gaXQgcnVucy5cblx0XHQgKlxuXHRcdCAqIFN1YmNsYXNzZXMgb3ZlcnJpZGUgdGhpcyBmcmVlbHkgYW5kICoqbXVzdCBub3QqKiBjYWxsIGBzdXBlci5pbml0KClgIC1cblx0XHQgKiB0aGUgcG9zdC1jb25zdHJ1Y3QgaG9va3MgYXJlIGV4ZWN1dGVkIGJ5IHRoZSBmcmFtZXdvcmsgYmVmb3JlIHRoaXMgaG9vay5cblx0XHQgKlxuXHRcdCAqIEBhc3luY1xuXHRcdCAqIEByZXR1cm5zIHsqfSBhbiBvcHRpb25hbCB2YWx1ZSB1c2VkIHRvIHJlc29sdmUgYHJlYWR5YC5cblx0XHQgKi9cblx0XHRhc3luYyBpbml0KCkge1xuXHRcdH1cblxuXHRcdC8qKlxuXHRcdCAqIFJlc2V0cyB0aGUgYHJlYWR5YCBwcm9taXNlIHNvIHRoZSBjb21wb25lbnQgY2FuIGJlIGluaXRpYWxpemVkIGFnYWluLlxuXHRcdCAqIEludm9rZWQgYXV0b21hdGljYWxseSBmcm9tIHtAbGluayBDb21wb25lbnQjZGlzY29ubmVjdGVkQ2FsbGJhY2t9LlxuXHRcdCAqXG5cdFx0ICogQGFzeW5jXG5cdFx0ICogQHJldHVybnMge1Byb21pc2V9XG5cdFx0ICovXG5cdFx0YXN5bmMgZGVzdHJveSgpIHtcblx0XHRcdGlmICh0aGlzLnJlYWR5LnJlc29sdmVkKSB0aGlzLiNyZWFkeSA9IGxhenlQcm9taXNlKCk7XG5cdFx0fVxuXG5cdFx0LyoqXG5cdFx0ICogRXhwbGljaXRseSByZS1ydW5zIHRoZSBmdWxsIGluaXRpYWxpemF0aW9uIChwb3N0LWNvbnN0cnVjdCBob29rcyBhbmRcblx0XHQgKiB7QGxpbmsgQ29tcG9uZW50I2luaXR9KSBvbiBhbiBhbHJlYWR5LWNyZWF0ZWQgY29tcG9uZW50LCByZXNldHRpbmdcblx0XHQgKiB7QGxpbmsgQ29tcG9uZW50I3JlYWR5fSBmaXJzdCB3aGVuIGl0IGhhZCBhbHJlYWR5IHNldHRsZWQuXG5cdFx0ICpcblx0XHQgKiBAcmV0dXJucyB7UHJvbWlzZX0gdGhlIChwb3NzaWJseSBuZXcpIHtAbGluayBDb21wb25lbnQjcmVhZHl9IHByb21pc2UuXG5cdFx0ICovXG5cdFx0cmVpbml0KCkge1xuXHRcdFx0aWYgKHRoaXMuI3JlYWR5LnJlc29sdmVkKSB0aGlzLiNyZWFkeSA9IGxhenlQcm9taXNlKCk7XG5cdFx0XHRyZXR1cm4gdGhpcy4jc2V0dGxlKCk7XG5cdFx0fVxuXG5cdFx0LyoqXG5cdFx0ICogQ3VzdG9tIGVsZW1lbnQgbGlmZWN5Y2xlIGNhbGxiYWNrLiBSdW5zIHRoZSBpbml0aWFsaXphdGlvbiB3aGVuIHRoZVxuXHRcdCAqIGNvbXBvbmVudCBpcyBjb25uZWN0ZWQgdG8gdGhlIG1haW4gZG9jdW1lbnQgYW5kIHNldHRsZXMgdGhlIGByZWFkeWBcblx0XHQgKiBwcm9taXNlIHdpdGggdGhlIHJlc3VsdC5cblx0XHQgKi9cblx0XHRjb25uZWN0ZWRDYWxsYmFjaygpIHtcblx0XHRcdGlmICh0aGlzLm93bmVyRG9jdW1lbnQgPT0gZG9jdW1lbnQgJiYgdGhpcy5pc0Nvbm5lY3RlZClcblx0XHRcdFx0dGhpcy4jc2V0dGxlKCk7XG5cdFx0fVxuXG5cdFx0LyoqXG5cdFx0ICogQ3VzdG9tIGVsZW1lbnQgbGlmZWN5Y2xlIGNhbGxiYWNrLiBSZS1ydW5zIHtAbGluayBDb21wb25lbnQjY29ubmVjdGVkQ2FsbGJhY2t9XG5cdFx0ICogd2hlbiB0aGUgY29tcG9uZW50IGlzIGFkb3B0ZWQgaW50byBhbm90aGVyIGRvY3VtZW50LlxuXHRcdCAqL1xuXHRcdGFkb3B0ZWRDYWxsYmFjaygpIHtcblx0XHRcdHRoaXMuY29ubmVjdGVkQ2FsbGJhY2soKTtcblx0XHR9XG5cblx0XHQvKipcblx0XHQgKiBDdXN0b20gZWxlbWVudCBsaWZlY3ljbGUgY2FsbGJhY2suIERpc3BhdGNoZXMgdGhlIGF0dHJpYnV0ZS1jaGFuZ2UgYW5kXG5cdFx0ICogY29tcG9uZW50LWNoYW5nZSBldmVudHMgd2hlbiBhbiBvYnNlcnZlZCBhdHRyaWJ1dGUgY2hhbmdlcy5cblx0XHQgKlxuXHRcdCAqIEBwYXJhbSB7c3RyaW5nfSBuYW1lIC0gdGhlIG5hbWUgb2YgdGhlIGNoYW5nZWQgYXR0cmlidXRlLlxuXHRcdCAqIEBwYXJhbSB7P3N0cmluZ30gb2xkVmFsdWUgLSB0aGUgcHJldmlvdXMgYXR0cmlidXRlIHZhbHVlLlxuXHRcdCAqIEBwYXJhbSB7P3N0cmluZ30gbmV3VmFsdWUgLSB0aGUgbmV3IGF0dHJpYnV0ZSB2YWx1ZS5cblx0XHQgKi9cblx0XHRhdHRyaWJ1dGVDaGFuZ2VkQ2FsbGJhY2sobmFtZSwgb2xkVmFsdWUsIG5ld1ZhbHVlKSB7XG5cdFx0XHRpZiAob2xkVmFsdWUgIT0gbmV3VmFsdWUgJiYgdGhpcy5pc0Nvbm5lY3RlZCkge1xuXHRcdFx0XHR0aGlzLnRyaWdnZXIodHJpZ2dlclRpbWVvdXQsIGF0dHJpYnV0ZUNoYW5nZUV2ZW50bmFtZShuYW1lLCB0aGlzKSk7XG5cdFx0XHRcdHRoaXMudHJpZ2dlcih0cmlnZ2VyVGltZW91dCwgY29tcG9uZW50RXZlbnRuYW1lKFwiY2hhbmdlXCIsIHRoaXMpKTtcblx0XHRcdH1cblx0XHR9XG5cblx0XHQvKipcblx0XHQgKiBDdXN0b20gZWxlbWVudCBsaWZlY3ljbGUgY2FsbGJhY2suIFJ1bnMge0BsaW5rIENvbXBvbmVudCNkZXN0cm95fSB3aGVuXG5cdFx0ICogdGhlIGNvbXBvbmVudCBpcyByZW1vdmVkIGZyb20gdGhlIERPTS5cblx0XHQgKi9cblx0XHRkaXNjb25uZWN0ZWRDYWxsYmFjaygpIHtcblx0XHRcdHRoaXMuZGVzdHJveSgpO1xuXHRcdH1cblx0fTtcblxuXHRyZXR1cm4gY2xheno7XG59O1xuXG5jb25zdCBDTEFaWk1BUCA9IG5ldyBNYXAoKTtcblxuLyoqXG4gKiBSZXR1cm5zIHRoZSBjb21wb25lbnQgYmFzZSBjbGFzcyBmb3IgdGhlIGdpdmVuIEhUTUwgZWxlbWVudCB0eXBlLiBDbGFzc2VzIGFyZVxuICogY2FjaGVkLCBzbyByZXBlYXRlZCBjYWxscyB3aXRoIHRoZSBzYW1lIGJhc2UgdHlwZSByZXR1cm4gdGhlIHNhbWUgY2xhc3MuXG4gKlxuICogQHBhcmFtIHt0eXBlb2YgSFRNTEVsZW1lbnR9IGh0bWxCYXNlVHlwZSAtIHRoZSBIVE1MIGVsZW1lbnQgY2xhc3MgdG8gZXh0ZW5kLlxuICogQHJldHVybnMge3R5cGVvZiBIVE1MRWxlbWVudH0gdGhlIChjYWNoZWQpIGNvbXBvbmVudCBjbGFzcyBleHRlbmRpbmcgYGh0bWxCYXNlVHlwZWAuXG4gKi9cbmV4cG9ydCBjb25zdCBjb21wb25lbnRCYXNlT2YgPSAoaHRtbEJhc2VUeXBlKSA9PiB7XG5cdGxldCBjbGF6eiA9IENMQVpaTUFQLmdldChodG1sQmFzZVR5cGUpO1xuXHRpZiAoY2xhenogPT0gbnVsbCkge1xuXHRcdGNsYXp6ID0gYnVpbGRDbGFzcyhodG1sQmFzZVR5cGUpO1xuXHRcdENMQVpaTUFQLnNldChodG1sQmFzZVR5cGUsIGNsYXp6KTtcblx0fVxuXG5cdHJldHVybiBjbGF6ejtcbn07XG5cbi8qKlxuICogRGVmYXVsdCBjb21wb25lbnQgYmFzZSBjbGFzcyBleHRlbmRpbmcge0BsaW5rIEhUTUxFbGVtZW50fS5cbiAqXG4gKiBAdHlwZSB7dHlwZW9mIEhUTUxFbGVtZW50fVxuICovXG5jb25zdCBDb21wb25lbnQgPSBjb21wb25lbnRCYXNlT2YoSFRNTEVsZW1lbnQpO1xuXG5leHBvcnQgZGVmYXVsdCBDb21wb25lbnQ7XG4iLCJpbXBvcnQge0dMT0JBTCBhcyBpbXBvcnRlZEdsb2JhbH0gZnJvbSBcIkBkZWZhdWx0LWpzL2RlZmF1bHRqcy1leHRkb20vc3JjL3V0aWxzL1V0aWxzLmpzXCJcblxuLyoqXG4gKiBAbW9kdWxlIENvbnN0YW50c1xuICpcbiAqIFNoYXJlZCBjb25zdGFudHMgYW5kIHJ1bnRpbWUgc2V0dGluZ3MgdXNlZCBhY3Jvc3MgdGhlIGNvbXBvbmVudCB0b29sYm94LlxuICovXG5cbi8qKlxuICogVGhlIGdsb2JhbCBvYmplY3Qgc2hhcmVkIHdpdGggYGRlZmF1bHRqcy1leHRkb21gIChlLmcuIGB3aW5kb3dgIGluIHRoZSBicm93c2VyKS5cbiAqXG4gKiBAdHlwZSB7T2JqZWN0fVxuICovXG5leHBvcnQgY29uc3QgR0xPQkFMID0gaW1wb3J0ZWRHbG9iYWw7XG5cbi8qKlxuICogTXV0YWJsZSBydW50aW1lIHNldHRpbmdzLiBDaGFuZ2UgdGhlc2UgYmVmb3JlIGNvbXBvbmVudHMgYXJlIGNyZWF0ZWQgdG9cbiAqIGluZmx1ZW5jZSB0aGUgZ2VuZXJhdGVkIGV2ZW50IG5hbWVzLlxuICpcbiAqIEB0eXBlIHtPYmplY3R9XG4gKiBAcHJvcGVydHkge3N0cmluZ30gZXZlbnRTZXBhcmF0b3IgLSBzZXBhcmF0b3IgdXNlZCBiZXR3ZWVuIHRoZSBub2RlIG5hbWUgYW5kXG4gKiAgIHRoZSBldmVudCB0eXBlIHdoZW4gYnVpbGRpbmcgY29tcG9uZW50IGV2ZW50IG5hbWVzIChzZWUge0BsaW5rIG1vZHVsZTp1dGlscy9FdmVudEhlbHBlcn0pLlxuICovXG5leHBvcnQgY29uc3QgU0VUVElORyA9IHtcbiAgICBldmVudFNlcGFyYXRvcjogXCItLVwiXG59O1xuXG4vKipcbiAqIERlZmF1bHQgdGFnLW5hbWUgcHJlZml4IGZvciBjdXN0b20gZWxlbWVudHMgKGUuZy4gYGQtYnV0dG9uYCkuXG4gKlxuICogQHR5cGUge3N0cmluZ31cbiAqL1xuZXhwb3J0IGNvbnN0IGNvbXBvbmVudFByZWZpeCA9IFwiZC1cIjtcblxuLyoqXG4gKiBQcmVmaXggdXNlZCB3aGVuIGJ1aWxkaW5nIHRoZSBldmVudCBuYW1lIGZvciBhbiBhdHRyaWJ1dGUgY2hhbmdlLlxuICpcbiAqIEB0eXBlIHtzdHJpbmd9XG4gKi9cbmV4cG9ydCBjb25zdCBhdHRyaWJ1dGVDaGFuZ2VFdmVudFByZWZpeCA9IFwiYXR0cmlidXRlXCI7XG5cbi8qKlxuICogRGVsYXkgaW4gbWlsbGlzZWNvbmRzIGJlZm9yZSB0aGUgaW5pdGlhbCBgaW5pdCgpYCBpcyB0cmlnZ2VyZWQuXG4gKlxuICogQHR5cGUge251bWJlcn1cbiAqL1xuZXhwb3J0IGNvbnN0IGluaXRUaW1lb3V0ID0gMTA7XG5cbi8qKlxuICogRGVsYXkgaW4gbWlsbGlzZWNvbmRzIHVzZWQgd2hlbiB0cmlnZ2VyaW5nIGNvbXBvbmVudCBldmVudHMuXG4gKlxuICogQHR5cGUge251bWJlcn1cbiAqL1xuZXhwb3J0IGNvbnN0IHRyaWdnZXJUaW1lb3V0ID0gMTA7XG4iLCJpbXBvcnQgeyBsYXp5UHJvbWlzZSB9IGZyb20gXCJAZGVmYXVsdC1qcy9kZWZhdWx0anMtY29tbW9uLXV0aWxzL3NyYy9Qcm9taXNlVXRpbHMuanNcIjtcblxuLyoqXG4gKiBAbW9kdWxlIFJlYWR5XG4gKlxuICogUmUtZXhwb3J0IG9mIHtAbGluayBsYXp5UHJvbWlzZX06IGEgcHJvbWlzZSB3aG9zZSByZXNvbHV0aW9uIGNhbiBiZVxuICogdHJpZ2dlcmVkIGZyb20gdGhlIG91dHNpZGUgYW5kIHRoYXQgZXhwb3NlcyBhIGByZXNvbHZlZGAgZmxhZy4gSXQgYmFja3MgdGhlXG4gKiBgcmVhZHlgIGxpZmVjeWNsZSBvZiB7QGxpbmsgbW9kdWxlOkNvbXBvbmVudH0uXG4gKlxuICogQHR5cGUge2Z1bmN0aW9uKCk6IFByb21pc2V9XG4gKi9cbmV4cG9ydCBkZWZhdWx0IGxhenlQcm9taXNlO1xuIiwiaW1wb3J0IHsgY29tcG9uZW50UHJlZml4IH0gZnJvbSBcIi4uL0NvbnN0YW50cy5qc1wiO1xuXG4vKipcbiAqIEBtb2R1bGUgdXRpbHMvRGVmaW5lQ29tcG9uZW50SGVscGVyXG4gKlxuICogSGVscGVycyB0byBidWlsZCB0YWcgbmFtZXMgYW5kIHJlZ2lzdGVyIGN1c3RvbSBlbGVtZW50cy5cbiAqL1xuXG4vKipcbiAqIEJ1aWxkcyBhIGN1c3RvbS1lbGVtZW50IHRhZyBuYW1lIGJ5IHByZWZpeGluZyBgbmFtZWAuXG4gKlxuICogQHBhcmFtIHtzdHJpbmd9IG5hbWUgLSB0aGUgYmFzZSBuYW1lIG9mIHRoZSBlbGVtZW50LlxuICogQHBhcmFtIHtzdHJpbmd9IFtwcmVmaXhdIC0gdGhlIHByZWZpeCB0byB1c2U7IGRlZmF1bHRzIHRvIHtAbGluayBjb21wb25lbnRQcmVmaXh9IChgXCJkLVwiYCkgd2hlbiBvbWl0dGVkLlxuICogQHJldHVybnMge3N0cmluZ30gdGhlIHByZWZpeGVkIHRhZyBuYW1lLlxuICovXG5leHBvcnQgY29uc3QgdG9Ob2RlTmFtZSA9IChuYW1lLCBwcmVmaXgpID0+IHtcblx0aWYodHlwZW9mIHByZWZpeCA9PT0gXCJzdHJpbmdcIilcblx0XHRyZXR1cm4gcHJlZml4ICsgbmFtZTtcblxuXHRyZXR1cm4gY29tcG9uZW50UHJlZml4ICsgbmFtZTtcbn07XG5cbi8qKlxuICogUmVnaXN0ZXJzIGEgY29tcG9uZW50IGNsYXNzIGFzIGEgY3VzdG9tIGVsZW1lbnQsIHVzaW5nIGl0cyBzdGF0aWMgYE5PREVOQU1FYFxuICogYXMgdGFnIG5hbWUuIFJlZ2lzdHJhdGlvbiBpcyBza2lwcGVkIHdoZW4gYW4gZWxlbWVudCB3aXRoIHRoYXQgbmFtZSBhbHJlYWR5XG4gKiBleGlzdHMuXG4gKlxuICogQHBhcmFtIHtDdXN0b21FbGVtZW50Q29uc3RydWN0b3J9IGNsYXp6IC0gdGhlIGNvbXBvbmVudCBjbGFzcyB0byByZWdpc3RlcjsgbXVzdCBleHBvc2UgYSBzdGF0aWMgYE5PREVOQU1FYC5cbiAqIEBwYXJhbSB7RWxlbWVudERlZmluaXRpb25PcHRpb25zfSBbb3B0aW9uc10gLSBvcHRpb25zIGZvcndhcmRlZCB0byBgY3VzdG9tRWxlbWVudHMuZGVmaW5lYC5cbiAqL1xuZXhwb3J0IGNvbnN0IGRlZmluZSA9IGZ1bmN0aW9uKGNsYXp6LCBvcHRpb25zKSB7XG5cdGNvbnN0IG5vZGVuYW1lID0gY2xhenouTk9ERU5BTUU7XG5cdGlmICghY3VzdG9tRWxlbWVudHMuZ2V0KG5vZGVuYW1lKSkge1xuXHRcdGN1c3RvbUVsZW1lbnRzLmRlZmluZShub2RlbmFtZSwgY2xhenosIG9wdGlvbnMpO1xuXHR9XG59O1xuXG5cbmV4cG9ydCBkZWZhdWx0IGRlZmluZTtcbiIsImltcG9ydCB7YXR0cmlidXRlQ2hhbmdlRXZlbnRQcmVmaXgsIFNFVFRJTkd9IGZyb20gXCIuLi9Db25zdGFudHMuanNcIjtcblxuLyoqXG4gKiBAbW9kdWxlIHV0aWxzL0V2ZW50SGVscGVyXG4gKlxuICogSGVscGVycyB0byBidWlsZCB0aGUgZXZlbnQgbmFtZXMgZGlzcGF0Y2hlZCBieSBjb21wb25lbnRzLlxuICovXG5cbi8qKlxuICogQ3JlYXRlcyB0aGUgZXZlbnQgbmFtZSBmb3IgYSBjb21wb25lbnQgZXZlbnQsIGNvbXBvc2VkIG9mIHRoZSBub2RlJ3MgdGFnXG4gKiBuYW1lLCB0aGUgYHNlcGFyYXRvcmAgYW5kIHRoZSBgZXZlbnRUeXBlYC5cbiAqXG4gKiBAcGFyYW0ge3N0cmluZ30gZXZlbnRUeXBlIC0gdGhlIGV2ZW50IHR5cGUsIGUuZy4gYFwiY2hhbmdlXCJgLlxuICogQHBhcmFtIHtzdHJpbmd8SFRNTEVsZW1lbnR8Q29tcG9uZW50fSBub2RlIC0gdGhlIG5vZGUgdGhlIGV2ZW50IGJlbG9uZ3MgdG8uXG4gKiAgIEEgc3RyaW5nIGlzIHVzZWQgdmVyYmF0aW0gYXMgbm9kZSBuYW1lOyBhbiB7QGxpbmsgSFRNTEVsZW1lbnR9IGNvbnRyaWJ1dGVzXG4gKiAgIGl0cyBgbm9kZU5hbWVgOyBhbnkgb3RoZXIgb2JqZWN0IG11c3QgZXhwb3NlIGEgc3RyaW5nIGBOT0RFTkFNRWAuXG4gKiBAcGFyYW0ge3N0cmluZ30gW3NlcGFyYXRvcj1TRVRUSU5HLmV2ZW50U2VwYXJhdG9yXSAtIHNlcGFyYXRvciBiZXR3ZWVuIG5vZGUgbmFtZSBhbmQgZXZlbnQgdHlwZTsgZGVmYXVsdHMgdG8gYFwiLS1cImAuXG4gKiBAcmV0dXJucyB7c3RyaW5nfSB0aGUgbG93ZXItY2FzZWQgZXZlbnQgbmFtZS5cbiAqIEB0aHJvd3Mge0Vycm9yfSB3aGVuIGBub2RlYCBpcyBub3QgYSBzdXBwb3J0ZWQgdHlwZS5cbiAqL1xuZXhwb3J0IGNvbnN0IGNvbXBvbmVudEV2ZW50bmFtZSA9IChldmVudFR5cGUsIG5vZGUsIHNlcGFyYXRvciA9IFNFVFRJTkcuZXZlbnRTZXBhcmF0b3IgKSA9PiB7XG5cdGxldCBub2RlbmFtZSA9IFwidW5zdXBwb3J0ZWRcIjtcblx0aWYodHlwZW9mIG5vZGUgPT09IFwic3RyaW5nXCIpXG5cdFx0bm9kZW5hbWUgPSBub2RlO1xuXHRlbHNlIGlmKG5vZGUgaW5zdGFuY2VvZiBIVE1MRWxlbWVudClcblx0XHRub2RlbmFtZSA9IG5vZGUubm9kZU5hbWU7XG5cdGVsc2UgaWYodHlwZW9mIG5vZGUuTk9ERU5BTUUgPT09IFwic3RyaW5nXCIpXG5cdFx0bm9kZW5hbWUgPSBub2RlLk5PREVOQU1FO1xuXHRlbHNlIHRocm93IG5ldyBFcnJvcihgJHt0eXBlb2Ygbm9kZX0gaXMgbm90IHN1cHBvcnRlZCBhcyBwYXJhbWV0ZXIgXCJub2RlXCIhYCk7XG5cbiAgIHJldHVybiBgJHtub2RlbmFtZS50b0xvd2VyQ2FzZSgpfSR7c2VwYXJhdG9yfSR7ZXZlbnRUeXBlfWA7XG59O1xuXG4vKipcbiAqIENyZWF0ZXMgdGhlIGV2ZW50IG5hbWUgZGlzcGF0Y2hlZCB3aGVuIGEgY29tcG9uZW50J3MgYXR0cmlidXRlIGNoYW5nZXMsXG4gKiBlLmcuIGBkLWJ1dHRvbi0tYXR0cmlidXRlLS1kaXNhYmxlZGAuXG4gKlxuICogQHBhcmFtIHtzdHJpbmd9IGF0dHJpYnV0ZSAtIHRoZSBuYW1lIG9mIHRoZSBjaGFuZ2VkIGF0dHJpYnV0ZS5cbiAqIEBwYXJhbSB7c3RyaW5nfEhUTUxFbGVtZW50fENvbXBvbmVudH0gbm9kZSAtIHRoZSBub2RlIHRoZSBldmVudCBiZWxvbmdzIHRvIChzZWUge0BsaW5rIGNvbXBvbmVudEV2ZW50bmFtZX0pLlxuICogQHBhcmFtIHtzdHJpbmd9IFtzZXBhcmF0b3I9U0VUVElORy5ldmVudFNlcGFyYXRvcl0gLSBzZXBhcmF0b3IgdXNlZCB3aXRoaW4gdGhlIGV2ZW50IG5hbWU7IGRlZmF1bHRzIHRvIGBcIi0tXCJgLlxuICogQHJldHVybnMge3N0cmluZ30gdGhlIGF0dHJpYnV0ZS1jaGFuZ2UgZXZlbnQgbmFtZS5cbiAqL1xuZXhwb3J0IGNvbnN0IGF0dHJpYnV0ZUNoYW5nZUV2ZW50bmFtZSA9IChhdHRyaWJ1dGUsIG5vZGUsIHNlcGFyYXRvciA9IFNFVFRJTkcuZXZlbnRTZXBhcmF0b3IgICkgPT4ge1xuICAgIHJldHVybiBjb21wb25lbnRFdmVudG5hbWUoYCR7YXR0cmlidXRlQ2hhbmdlRXZlbnRQcmVmaXh9JHtzZXBhcmF0b3J9JHthdHRyaWJ1dGV9YCwgbm9kZSwgc2VwYXJhdG9yKTtcbn07XG5cbmV4cG9ydCBkZWZhdWx0IHtjb21wb25lbnRFdmVudG5hbWUsIGF0dHJpYnV0ZUNoYW5nZUV2ZW50bmFtZX1cbiIsIi8qKlxuICogQG1vZHVsZSB1dGlscy9Ob2RlSGVscGVyXG4gKlxuICogSGVscGVycyB0byB0cmF2ZXJzZSB0aGUgRE9NIHRyZWUgcmVsYXRpdmUgdG8gYSBub2RlLlxuICovXG5cbi8qKlxuICogV2Fsa3MgdXAgdGhlIGFuY2VzdG9yIGNoYWluIG9mIGEgbm9kZSBhbmQgcmV0dXJucyB0aGUgZmlyc3QgYW5jZXN0b3IgZm9yXG4gKiB3aGljaCBgY2hlY2tgIHJldHVybnMgYSB0cnV0aHkgdmFsdWUuXG4gKlxuICogQHBhcmFtIHtOb2RlfSBub2RlIC0gdGhlIG5vZGUgdG8gc3RhcnQgZnJvbS5cbiAqIEBwYXJhbSB7ZnVuY3Rpb24oTm9kZSk6IGJvb2xlYW59IGNoZWNrIC0gcHJlZGljYXRlIGFwcGxpZWQgdG8gZWFjaCBhbmNlc3Rvci5cbiAqIEByZXR1cm5zIHtOb2RlfG51bGx9IHRoZSBmaXJzdCBtYXRjaGluZyBhbmNlc3Rvciwgb3IgYG51bGxgIGlmIG5vbmUgbWF0Y2hlcy5cbiAqL1xuZXhwb3J0IGNvbnN0IGZpbmRQYXJlbnQgPSAobm9kZSwgY2hlY2spID0+IHtcblx0d2hpbGUobm9kZSAhPSBudWxsKSB7XG4gICAgICAgIGlmKGNoZWNrKG5vZGUpKVxuICAgICAgICAgICAgcmV0dXJuIG5vZGU7XG5cbiAgICAgICAgbm9kZSA9IG5vZGUucGFyZW50KCk7XG4gICAgfVxuXG4gICAgcmV0dXJuIG51bGw7XG59O1xuXG4vKipcbiAqIFJlY3Vyc2l2ZWx5IHNlYXJjaGVzIHRoZSBkZXNjZW5kYW50cyBvZiBgbm9kZWAgYW5kIHRyYWNrcyB0aGUgbWF0Y2ggd2l0aCB0aGVcbiAqIHNtYWxsZXN0IGRlcHRoIGZvdW5kIHNvIGZhci5cbiAqXG4gKiBAcGFyYW0ge05vZGV9IG5vZGUgLSB0aGUgY3VycmVudCBub2RlIGJlaW5nIGluc3BlY3RlZC5cbiAqIEBwYXJhbSB7bnVtYmVyfSBkZXB0aCAtIHRoZSBkZXB0aCBvZiBgbm9kZWAgcmVsYXRpdmUgdG8gdGhlIHNlYXJjaCByb290LlxuICogQHBhcmFtIHtmdW5jdGlvbihOb2RlKTogYm9vbGVhbn0gY2hlY2sgLSBwcmVkaWNhdGUgYXBwbGllZCB0byBlYWNoIG5vZGUuXG4gKiBAcmV0dXJucyB7e25vZGU6IE5vZGUsIGRlcHRoOiBudW1iZXJ9fG51bGx9IHRoZSBzaGFsbG93ZXN0IG1hdGNoIHdpdGggaXRzIGRlcHRoLCBvciBgbnVsbGAuXG4gKi9cbmNvbnN0IGZpbmRDbG9zZXN0ID0gKG5vZGUsIGRlcHRoLCBjaGVjaykgPT4ge1xuICAgIGlmKGNoZWNrKG5vZGUpKVxuICAgICAgICByZXR1cm4ge25vZGUsIGRlcHRofVxuXG4gICAgbGV0IHJlc3VsdCA9IG51bGw7XG4gICAgZm9yKGxldCBjaGlsZCBvZiBub2RlLmNoaWxkTm9kZXMpe1xuICAgICAgICBjb25zdCBpdGVtID0gZmluZENsb3Nlc3QoY2hpbGQsIGRlcHRoICsgMSwgY2hlY2spO1xuXG4gICAgICAgIGlmKGl0ZW0gIT0gbnVsbCAmJiAocmVzdWx0ID09IG51bGwgfHwgcmVzdWx0LmRlcHRoID4gaXRlbS5kZXB0aCkpXG4gICAgICAgICAgICByZXN1bHQgPSBpdGVtO1xuICAgIH1cblxuICAgIHJldHVybiByZXN1bHQ7XG59XG5cbi8qKlxuICogU2VhcmNoZXMgdGhlIGRlc2NlbmRhbnRzIG9mIGBub2RlYCBhbmQgcmV0dXJucyB0aGUgbWF0Y2hpbmcgbm9kZSB0aGF0IGlzXG4gKiBjbG9zZXN0IHRvIGBub2RlYCAoaS5lLiBhdCB0aGUgc21hbGxlc3QgZGVwdGgpLlxuICpcbiAqIEBwYXJhbSB7Tm9kZX0gbm9kZSAtIHRoZSByb290IG9mIHRoZSBzZWFyY2guXG4gKiBAcGFyYW0ge2Z1bmN0aW9uKE5vZGUpOiBib29sZWFufSBjaGVjayAtIHByZWRpY2F0ZSBhcHBsaWVkIHRvIGVhY2ggZGVzY2VuZGFudC5cbiAqIEByZXR1cm5zIHtOb2RlfG51bGx9IHRoZSBzaGFsbG93ZXN0IG1hdGNoaW5nIGRlc2NlbmRhbnQsIG9yIGBudWxsYCBpZiBub25lIG1hdGNoZXMuXG4gKi9cbmV4cG9ydCBjb25zdCBmaW5kQ2xvc2VzdEluRGVwdGggPSAobm9kZSwgY2hlY2spID0+IHtcbiAgICBjb25zdCBjbG9zZXN0ID0gZmluZENsb3Nlc3Qobm9kZSwgMCwgY2hlY2spO1xuICAgIHJldHVybiBjbG9zZXN0ICE9IG51bGwgPyBjbG9zZXN0Lm5vZGUgOiBudWxsO1xufVxuXG5leHBvcnQgZGVmYXVsdCB7ZmluZFBhcmVudCwgZmluZENsb3Nlc3RJbkRlcHRofTtcbiIsImltcG9ydCBHbG9iYWwgZnJvbSBcIkBkZWZhdWx0LWpzL2RlZmF1bHRqcy1jb21tb24tdXRpbHMvc3JjL0dsb2JhbC5qc1wiO1xuXG4vKipcbiAqIEBtb2R1bGUgdXRpbHMvU3R5bGVIZWxwZXJcbiAqXG4gKiBIZWxwZXJzIHRvIGNvcHkgZXhpc3Rpbmcgc3R5bGVzIGJldHdlZW4gbm9kZXMgYW5kIHRvIGxvYWQgYSBjb21wb25lbnQnc1xuICogc3R5bGVzaGVldCBieSBjb252ZW50aW9uLlxuICovXG5cbi8qKlxuICogQ2xvbmVzIGFsbCBgPHN0eWxlIHR5cGU9XCJ0ZXh0L2Nzc1wiPmAgYW5kIGA8bGluayByZWw9XCJzdHlsZXNoZWV0XCI+YCBlbGVtZW50c1xuICogZm91bmQgaW4gYHNvdXJjZWAgYW5kIGFkZHMgdGhlbSB0byBgdGFyZ2V0YC5cbiAqXG4gKiBAcGFyYW0ge05vZGV9IHNvdXJjZSAtIHRoZSBub2RlIHRvIHJlYWQgdGhlIHN0eWxlIGVsZW1lbnRzIGZyb20uXG4gKiBAcGFyYW0ge05vZGV9IHRhcmdldCAtIHRoZSBub2RlIHRoZSBjbG9uZWQgc3R5bGVzIGFyZSBhZGRlZCB0by5cbiAqIEBwYXJhbSB7Ym9vbGVhbn0gW2FwcGVuZD10cnVlXSAtIHdoZW4gYHRydWVgIHRoZSBzdHlsZXMgYXJlIGFwcGVuZGVkLCBvdGhlcndpc2UgcHJlcGVuZGVkLlxuICovXG5leHBvcnQgY29uc3QgY29weVN0eWxlcyA9IChzb3VyY2UsIHRhcmdldCwgYXBwZW5kID0gdHJ1ZSkgPT4ge1xuXHRjb25zdCBzdHlsZXMgPSBBcnJheS5mcm9tKHNvdXJjZS5maW5kKGBzdHlsZVt0eXBlPVwidGV4dC9jc3NcIl0sIGxpbmtbcmVsPVwic3R5bGVzaGVldFwiXWApKVxuXHRcdC5tYXAoKHN0eWxlKSA9PiBzdHlsZS5jbG9uZU5vZGUodHJ1ZSkpO1xuXG5cdGlmIChhcHBlbmQpXG5cdFx0dGFyZ2V0LmFwcGVuZCguLi5zdHlsZXMpO1xuXHRlbHNlXG5cdFx0dGFyZ2V0LnByZXBlbmQoLi4uc3R5bGVzKTtcbn1cblxuLyoqXG4gKiBOYW1lIG9mIHRoZSBnbG9iYWwgdmFyaWFibGUgaG9sZGluZyB0aGUgYmFzZSBwYXRoIHVzZWQgYnlcbiAqIHtAbGluayBsb2FkQ29tcG9uZW50U3R5bGV9IHRvIHJlc29sdmUgY29tcG9uZW50IHN0eWxlc2hlZXRzLlxuICpcbiAqIEB0eXBlIHtzdHJpbmd9XG4gKi9cbmV4cG9ydCBjb25zdCBDU1NfQkFTRV9QQVRIX1ZBUiA9IFwiQ1NTX0JBU0VfUEFUSFwiO1xuXG4vKipcbiAqIEFwcGVuZHMgYSBgPGxpbmsgcmVsPVwic3R5bGVzaGVldFwiPmAgdG8gYHRhcmdldGAgcG9pbnRpbmcgYXQgdGhlIHN0eWxlc2hlZXRcbiAqIG5hbWVkIGFmdGVyIHRoZSB0YXJnZXQncyB0YWcgbmFtZS4gVGhlIGRpcmVjdG9yeSBpcyB0YWtlbiBmcm9tIHRoZSBnbG9iYWxcbiAqIHtAbGluayBDU1NfQkFTRV9QQVRIX1ZBUn0gdmFyaWFibGUgYW5kIGRlZmF1bHRzIHRvIGBcImNzc1wiYC5cbiAqXG4gKiBAcGFyYW0ge0hUTUxFbGVtZW50fSB0YXJnZXQgLSB0aGUgZWxlbWVudCB0aGUgc3R5bGVzaGVldCBsaW5rIGlzIGFkZGVkIHRvLlxuICovXG5leHBvcnQgY29uc3QgbG9hZENvbXBvbmVudFN0eWxlID0gKHRhcmdldCkgPT4ge1xuXHRjb25zdCBwYXRoID0gYCR7R2xvYmFsW0NTU19CQVNFX1BBVEhfVkFSXSB8fCBcImNzc1wifS8ke3RhcmdldC5ub2RlTmFtZS50b0xvd2VyQ2FzZSgpfS5jc3NgO1xuXHR0YXJnZXQuYXBwZW5kKGA8bGluayByZWw9XCJzdHlsZXNoZWV0XCIgaHJlZj1cIiR7cGF0aH1cIi8+YCk7XG59XG5cbmV4cG9ydCBkZWZhdWx0IHsgQ1NTX0JBU0VfUEFUSF9WQVIsIGNvcHlTdHlsZXMsIGxvYWRDb21wb25lbnRTdHlsZSB9O1xuIiwiLyoqXG4gKiBAbW9kdWxlIHV0aWxzL1dlYWtEYXRhXG4gKi9cblxuLyoqXG4gKiBBIHBlci1yZWZlcmVuY2UgZGF0YSBzdG9yZSBiYWNrZWQgYnkgYSB7QGxpbmsgV2Vha01hcH0uIERhdGEgYXNzb2NpYXRlZCB3aXRoXG4gKiBhIHJlZmVyZW5jZSBpcyBnYXJiYWdlLWNvbGxlY3RlZCBhdXRvbWF0aWNhbGx5IG9uY2UgdGhlIHJlZmVyZW5jZSBpdHNlbGYgaXNcbiAqIG5vIGxvbmdlciByZWFjaGFibGUsIHdoaWNoIG1ha2VzIGl0IHNhZmUgZm9yIHN0b3Jpbmcgc3RhdGUgZm9yIERPTSBub2Rlcy5cbiAqL1xuZXhwb3J0IGRlZmF1bHQgY2xhc3MgV2Vha0RhdGEge1xuXG5cdCN3ZWFrbWFwID0gbmV3IFdlYWtNYXAoKTtcblxuXHRjb25zdHJ1Y3RvcigpIHtcblx0fVxuXG5cdC8qKlxuXHQgKiBSZXR1cm5zIHRoZSBkYXRhIG9iamVjdCBhc3NvY2lhdGVkIHdpdGggdGhlIGdpdmVuIHJlZmVyZW5jZSwgY3JlYXRpbmcgYW5cblx0ICogZW1wdHkgb25lIG9uIGZpcnN0IGFjY2Vzcy5cblx0ICpcblx0ICogQHBhcmFtIHtPYmplY3R9IHJlZmVyZW5jZSAtIHRoZSBrZXkgdGhlIGRhdGEgaXMgYXNzb2NpYXRlZCB3aXRoLlxuXHQgKiBAcmV0dXJucyB7T2JqZWN0fSB0aGUgKHBvc3NpYmx5IG5ld2x5IGNyZWF0ZWQpIGRhdGEgb2JqZWN0LlxuXHQgKi9cblx0ZGF0YShyZWZlcmVuY2UpIHtcblx0XHRsZXQgZGF0YSA9IHRoaXMuI3dlYWttYXAuZ2V0KHJlZmVyZW5jZSk7XG5cdFx0aWYgKCFkYXRhKSB7XG5cdFx0XHRkYXRhID0ge307XG5cdFx0XHR0aGlzLiN3ZWFrbWFwLnNldChyZWZlcmVuY2UsIGRhdGEpO1xuXHRcdH1cblx0XHRyZXR1cm4gZGF0YTtcblx0fVxuXG5cdC8qKlxuXHQgKiBSZWFkcywgd3JpdGVzIG9yIGRlbGV0ZXMgYSBzaW5nbGUgdmFsdWUgb24gYSByZWZlcmVuY2UncyBkYXRhIG9iamVjdC5cblx0ICpcblx0ICogLSBjYWxsZWQgd2l0aCBgKHJlZmVyZW5jZSwga2V5KWAgaXQgcmV0dXJucyB0aGUgc3RvcmVkIHZhbHVlO1xuXHQgKiAtIGNhbGxlZCB3aXRoIGAocmVmZXJlbmNlLCBrZXksIHVuZGVmaW5lZClgIGl0IGRlbGV0ZXMgdGhlIGtleTtcblx0ICogLSBjYWxsZWQgd2l0aCBgKHJlZmVyZW5jZSwga2V5LCB2YWx1ZSlgIGl0IHN0b3JlcyB0aGUgdmFsdWUuXG5cdCAqXG5cdCAqIEBwYXJhbSB7T2JqZWN0fSByZWZlcmVuY2UgLSB0aGUga2V5IHRoZSBkYXRhIGlzIGFzc29jaWF0ZWQgd2l0aC5cblx0ICogQHBhcmFtIHtzdHJpbmd9IGtleSAtIHRoZSBwcm9wZXJ0eSBuYW1lIHRvIHJlYWQsIHdyaXRlIG9yIGRlbGV0ZS5cblx0ICogQHBhcmFtIHsqfSBbdmFsdWVdIC0gdGhlIHZhbHVlIHRvIHN0b3JlOyBwYXNzIGB1bmRlZmluZWRgIHRvIGRlbGV0ZSB0aGUga2V5LlxuXHQgKiBAcmV0dXJucyB7Kn0gdGhlIHN0b3JlZCB2YWx1ZSB3aGVuIHVzZWQgYXMgYSBnZXR0ZXIsIG90aGVyd2lzZSBgdW5kZWZpbmVkYC5cblx0ICogQHRocm93cyB7RXJyb3J9IHdoZW4gY2FsbGVkIHdpdGggZmV3ZXIgdGhhbiB0d28gYXJndW1lbnRzLlxuXHQgKi9cblx0dmFsdWUocmVmZXJlbmNlLCBrZXksIHZhbHVlKSB7XG5cdFx0aWYgKGFyZ3VtZW50cy5sZW5ndGggPCAyKSB0aHJvdyBuZXcgRXJyb3IoXCJyZWZlcmVuY2UgYW5kIGtleSByZXF1aXJlZFwiKVxuXHRcdGlmIChhcmd1bWVudHMubGVuZ3RoID09IDIpIHJldHVybiB0aGlzLmRhdGEocmVmZXJlbmNlKVtrZXldO1xuXHRcdGVsc2UgaWYodHlwZW9mIHZhbHVlID09PSBcInVuZGVmaW5lZFwiKSBkZWxldGUgdGhpcy5kYXRhKHJlZmVyZW5jZSlba2V5XTtcblx0XHRlbHNlIHRoaXMuZGF0YShyZWZlcmVuY2UpW2tleV0gPSB2YWx1ZTtcblx0fVxuXG5cdC8qKlxuXHQgKiBSZW1vdmVzIGFsbCBkYXRhIGFzc29jaWF0ZWQgd2l0aCB0aGUgZ2l2ZW4gcmVmZXJlbmNlLlxuXHQgKlxuXHQgKiBAcGFyYW0ge09iamVjdH0gcmVmZXJlbmNlIC0gdGhlIGtleSB3aG9zZSBkYXRhIHNob3VsZCBiZSBkaXNjYXJkZWQuXG5cdCAqL1xuXHRkZXN0cm95KHJlZmVyZW5jZSl7XG5cdFx0dGhpcy4jd2Vha21hcC5kZWxldGUocmVmZXJlbmNlKTtcblx0fVxufTtcbiIsImltcG9ydCBEZWZpbmVDb21wb25lbnRIZWxwZXIgZnJvbSBcIi4vRGVmaW5lQ29tcG9uZW50SGVscGVyLmpzXCI7XG5pbXBvcnQgRXZlbnRIZWxwZXIgZnJvbSBcIi4vRXZlbnRIZWxwZXIuanNcIjtcbmltcG9ydCBOb2RlSGVscGVyIGZyb20gXCIuL05vZGVIZWxwZXIuanNcIjtcbmltcG9ydCBTdHlsZUhlbHBlciBmcm9tIFwiLi9TdHlsZUhlbHBlci5qc1wiO1xuaW1wb3J0IFdlYWtEYXRhIGZyb20gXCIuL1dlYWtEYXRhLmpzXCI7XG5cbi8qKlxuICogQG1vZHVsZSB1dGlsc1xuICpcbiAqIEFnZ3JlZ2F0ZWQgaGVscGVyIG1vZHVsZXMgb2YgdGhlIGNvbXBvbmVudCB0b29sYm94LlxuICpcbiAqIEBwcm9wZXJ0eSB7T2JqZWN0fSBEZWZpbmVDb21wb25lbnRIZWxwZXIgLSBoZWxwZXJzIHRvIHJlZ2lzdGVyIGN1c3RvbSBlbGVtZW50cyAoc2VlIHtAbGluayBtb2R1bGU6dXRpbHMvRGVmaW5lQ29tcG9uZW50SGVscGVyfSkuXG4gKiBAcHJvcGVydHkge09iamVjdH0gRXZlbnRIZWxwZXIgLSBoZWxwZXJzIHRvIGJ1aWxkIGNvbXBvbmVudCBldmVudCBuYW1lcyAoc2VlIHtAbGluayBtb2R1bGU6dXRpbHMvRXZlbnRIZWxwZXJ9KS5cbiAqIEBwcm9wZXJ0eSB7T2JqZWN0fSBOb2RlSGVscGVyIC0gaGVscGVycyB0byB0cmF2ZXJzZSB0aGUgRE9NIHRyZWUgKHNlZSB7QGxpbmsgbW9kdWxlOnV0aWxzL05vZGVIZWxwZXJ9KS5cbiAqIEBwcm9wZXJ0eSB7T2JqZWN0fSBTdHlsZUhlbHBlciAtIGhlbHBlcnMgdG8gY29weSBhbmQgbG9hZCBjb21wb25lbnQgc3R5bGVzIChzZWUge0BsaW5rIG1vZHVsZTp1dGlscy9TdHlsZUhlbHBlcn0pLlxuICogQHByb3BlcnR5IHt0eXBlb2YgV2Vha0RhdGF9IFdlYWtEYXRhIC0gd2Vha2x5IHJlZmVyZW5jZWQgcGVyLW5vZGUgZGF0YSBzdG9yZSAoc2VlIHtAbGluayBtb2R1bGU6dXRpbHMvV2Vha0RhdGF9KS5cbiAqL1xuZXhwb3J0IGRlZmF1bHQge0RlZmluZUNvbXBvbmVudEhlbHBlciwgRXZlbnRIZWxwZXIsIE5vZGVIZWxwZXIsIFN0eWxlSGVscGVyLCBXZWFrRGF0YX07XG4iLCIvLyBUaGUgbW9kdWxlIGNhY2hlXG5jb25zdCBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX18gPSB7fTtcblxuLy8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbmZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG5cdGNvbnN0IGNhY2hlZE1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF07XG5cdGlmIChjYWNoZWRNb2R1bGUgIT09IHVuZGVmaW5lZCkge1xuXHRcdHJldHVybiBjYWNoZWRNb2R1bGUuZXhwb3J0cztcblx0fVxuXHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuXHRjb25zdCBtb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdID0ge1xuXHRcdC8vIG5vIG1vZHVsZS5pZCBuZWVkZWRcblx0XHQvLyBubyBtb2R1bGUubG9hZGVkIG5lZWRlZFxuXHRcdGV4cG9ydHM6IHt9XG5cdH07XG5cblx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG5cdGlmICghKG1vZHVsZUlkIGluIF9fd2VicGFja19tb2R1bGVzX18pKSB7XG5cdFx0ZGVsZXRlIF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF07XG5cdFx0Y29uc3QgZSA9IG5ldyBFcnJvcihcIkNhbm5vdCBmaW5kIG1vZHVsZSAnXCIgKyBtb2R1bGVJZCArIFwiJ1wiKTtcblx0XHRlLmNvZGUgPSAnTU9EVUxFX05PVF9GT1VORCc7XG5cdFx0dGhyb3cgZTtcblx0fVxuXHRfX3dlYnBhY2tfbW9kdWxlc19fW21vZHVsZUlkXShtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuXHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuXHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG59XG5cbiIsIi8vIGRlZmluZSBnZXR0ZXIvdmFsdWUgZnVuY3Rpb25zIGZvciBoYXJtb255IGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uZCA9IChleHBvcnRzLCBkZWZpbml0aW9uKSA9PiB7XG5cdGlmKEFycmF5LmlzQXJyYXkoZGVmaW5pdGlvbikpIHtcblx0XHR2YXIgaSA9IDA7XG5cdFx0d2hpbGUoaSA8IGRlZmluaXRpb24ubGVuZ3RoKSB7XG5cdFx0XHR2YXIga2V5ID0gZGVmaW5pdGlvbltpKytdO1xuXHRcdFx0dmFyIGJpbmRpbmcgPSBkZWZpbml0aW9uW2krK107XG5cdFx0XHRpZighX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIGtleSkpIHtcblx0XHRcdFx0aWYoYmluZGluZyA9PT0gMCkge1xuXHRcdFx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBrZXksIHsgZW51bWVyYWJsZTogdHJ1ZSwgdmFsdWU6IGRlZmluaXRpb25baSsrXSB9KTtcblx0XHRcdFx0fSBlbHNlIHtcblx0XHRcdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywga2V5LCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogYmluZGluZyB9KTtcblx0XHRcdFx0fVxuXHRcdFx0fSBlbHNlIGlmKGJpbmRpbmcgPT09IDApIHsgaSsrOyB9XG5cdFx0fVxuXHR9IGVsc2Uge1xuXHRcdGZvcih2YXIga2V5IGluIGRlZmluaXRpb24pIHtcblx0XHRcdGlmKF9fd2VicGFja19yZXF1aXJlX18ubyhkZWZpbml0aW9uLCBrZXkpICYmICFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywga2V5KSkge1xuXHRcdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywga2V5LCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZGVmaW5pdGlvbltrZXldIH0pO1xuXHRcdFx0fVxuXHRcdH1cblx0fVxufTsiLCJfX3dlYnBhY2tfcmVxdWlyZV9fLmcgPSAoZnVuY3Rpb24oKSB7XG5cdGlmICh0eXBlb2YgZ2xvYmFsVGhpcyA9PT0gJ29iamVjdCcpIHJldHVybiBnbG9iYWxUaGlzO1xuXHR0cnkge1xuXHRcdHJldHVybiB0aGlzIHx8IG5ldyBGdW5jdGlvbigncmV0dXJuIHRoaXMnKSgpO1xuXHR9IGNhdGNoIChlKSB7XG5cdFx0aWYgKHR5cGVvZiB3aW5kb3cgPT09ICdvYmplY3QnKSByZXR1cm4gd2luZG93O1xuXHR9XG59KSgpOyIsIl9fd2VicGFja19yZXF1aXJlX18ubyA9IChvYmosIHByb3ApID0+IChPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqLCBwcm9wKSkiLCIvLyBkZWZpbmUgX19lc01vZHVsZSBvbiBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLnIgPSAoZXhwb3J0cykgPT4ge1xuXHRpZihTeW1ib2wudG9TdHJpbmdUYWcpIHtcblx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgU3ltYm9sLnRvU3RyaW5nVGFnLCB7IHZhbHVlOiAnTW9kdWxlJyB9KTtcblx0fVxuXHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgJ19fZXNNb2R1bGUnLCB7IHZhbHVlOiB0cnVlIH0pO1xufTsiLCJpbXBvcnQgeyBHTE9CQUwgfSBmcm9tIFwiLi9zcmMvQ29uc3RhbnRzLmpzXCI7XG5pbXBvcnQgeyB1dGlscywgUmVhZHksIENvbXBvbmVudCwgY29tcG9uZW50QmFzZU9mLCBkZWZpbmUsIGNyZWF0ZVVVSUQsIFNFVFRJTkcgfSBmcm9tIFwiLi9pbmRleC5qc1wiO1xuXG5jb25zdCBwYWNrID0geyBWRVJTSU9OOiBcIiR7dmVyc2lvbn1cIiwgdXRpbHMsIFJlYWR5LCBDb21wb25lbnQsIGRlZmluZSwgY29tcG9uZW50QmFzZU9mLCBjcmVhdGVVVUlELCBTRVRUSU5HIH07XG5cbkdMT0JBTC5kZWZhdWx0anMgPSBHTE9CQUwuZGVmYXVsdGpzIHx8IHt9O1xuR0xPQkFMLmRlZmF1bHRqcy5odG1sID0gR0xPQkFMLmRlZmF1bHRqcy5odG1sIHx8IHt9O1xuR0xPQkFMLmRlZmF1bHRqcy5odG1sLmNvbXBvbmVudHMgPSBHTE9CQUwuZGVmYXVsdGpzLmh0bWwuY29tcG9uZW50cyB8fCBwYWNrO1xuXG5leHBvcnQgeyB1dGlscywgUmVhZHksIENvbXBvbmVudCwgY29tcG9uZW50QmFzZU9mLCBjcmVhdGVVVUlELCBkZWZpbmUsIFNFVFRJTkcgfTtcbiJdLCJuYW1lcyI6W10sInNvdXJjZVJvb3QiOiIifQ==