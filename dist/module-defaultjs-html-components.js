/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

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
/*!******************!*\
  !*** ./index.js ***!
  \******************/
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










})();

/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLWRlZmF1bHRqcy1odG1sLWNvbXBvbmVudHMuanMiLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7QUFBQTtBQUNBLFdBQVcscUJBQU0seUJBQXlCLHFCQUFNO0FBQ2hEO0FBQ0E7QUFDQTtBQUNBLENBQUM7QUFDRDtBQUNBLGlFQUFlLE1BQU0sRTs7Ozs7Ozs7Ozs7Ozs7QUNQTjtBQUNmO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsRTs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUN4RGlEO0FBQ2pEO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsaUJBQWlCLFlBQVk7QUFDN0I7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNPO0FBQ1A7QUFDQTtBQUNBO0FBQ087QUFDUDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FB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Q0E7QUFDQTtBQUNBLGNBQWMsUUFBUSxrRUFBa0UseUNBQXlDO0FBQ2pJLGNBQWMsUUFBUSwyREFBMkQsK0JBQStCO0FBQ2hILGNBQWMsUUFBUSxvREFBb0QsOEJBQThCO0FBQ3hHLGNBQWMsUUFBUSw4REFBOEQsK0JBQStCO0FBQ25ILGNBQWMsaUJBQWlCLHVEQUF1RCw0QkFBNEI7QUFDbEg7QUFDQSxpRUFBZSxDQUFDLHFCQUFxQixnRkFBYSxxRUFBWSxxRUFBYSxtRUFBVSx1REFBQyxFQUFDOzs7Ozs7O1VDakJ2RjtVQUNBOztVQUVBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBOztVQUVBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7O1VBRUE7VUFDQTtVQUNBOzs7OztXQzVCQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQSwyQ0FBMkMsMENBQTBDO1dBQ3JGLE1BQU07V0FDTiwyQ0FBMkMsZ0NBQWdDO1dBQzNFO1dBQ0EsS0FBSyx5QkFBeUI7V0FDOUI7V0FDQSxHQUFHO1dBQ0g7V0FDQTtXQUNBLDBDQUEwQyx3Q0FBd0M7V0FDbEY7V0FDQTtXQUNBO1dBQ0EsRTs7Ozs7V0N0QkE7V0FDQTtXQUNBO1dBQ0E7V0FDQSxHQUFHO1dBQ0g7V0FDQTtXQUNBLENBQUMsSTs7Ozs7V0NQRCx3Rjs7Ozs7V0NBQTtXQUNBO1dBQ0E7V0FDQSx1REFBdUQsaUJBQWlCO1dBQ3hFO1dBQ0EsZ0RBQWdELGFBQWE7V0FDN0QsRTs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUNOc0M7QUFDSztBQUNGO0FBQ047QUFDd0I7QUFDWTs7O0FBR1MiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9AZGVmYXVsdC1qcy9kZWZhdWx0anMtaHRtbC1jb21wb25lbnRzLy4vbm9kZV9tb2R1bGVzL0BkZWZhdWx0LWpzL2RlZmF1bHRqcy1jb21tb24tdXRpbHMvc3JjL0dsb2JhbC5qcyIsIndlYnBhY2s6Ly9AZGVmYXVsdC1qcy9kZWZhdWx0anMtaHRtbC1jb21wb25lbnRzLy4vbm9kZV9tb2R1bGVzL0BkZWZhdWx0LWpzL2RlZmF1bHRqcy1jb21tb24tdXRpbHMvc3JjL09iamVjdFByb3BlcnR5LmpzIiwid2VicGFjazovL0BkZWZhdWx0LWpzL2RlZmF1bHRqcy1odG1sLWNvbXBvbmVudHMvLi9ub2RlX21vZHVsZXMvQGRlZmF1bHQtanMvZGVmYXVsdGpzLWNvbW1vbi11dGlscy9zcmMvT2JqZWN0VXRpbHMuanMiLCJ3ZWJwYWNrOi8vQGRlZmF1bHQtanMvZGVmYXVsdGpzLWh0bWwtY29tcG9uZW50cy8uL25vZGVfbW9kdWxlcy9AZGVmYXVsdC1qcy9kZWZhdWx0anMtY29tbW9uLXV0aWxzL3NyYy9Qcm9taXNlVXRpbHMuanMiLCJ3ZWJwYWNrOi8vQGRlZmF1bHQtanMvZGVmYXVsdGpzLWh0bWwtY29tcG9uZW50cy8uL25vZGVfbW9kdWxlcy9AZGVmYXVsdC1qcy9kZWZhdWx0anMtY29tbW9uLXV0aWxzL3NyYy9VVUlELmpzIiwid2VicGFjazovL0BkZWZhdWx0LWpzL2RlZmF1bHRqcy1odG1sLWNvbXBvbmVudHMvLi9ub2RlX21vZHVsZXMvQGRlZmF1bHQtanMvZGVmYXVsdGpzLWV4dGRvbS9pbmRleC5qcyIsIndlYnBhY2s6Ly9AZGVmYXVsdC1qcy9kZWZhdWx0anMtaHRtbC1jb21wb25lbnRzLy4vbm9kZV9tb2R1bGVzL0BkZWZhdWx0LWpzL2RlZmF1bHRqcy1leHRkb20vc3JjL0dsb2JhbC5qcyIsIndlYnBhY2s6Ly9AZGVmYXVsdC1qcy9kZWZhdWx0anMtaHRtbC1jb21wb25lbnRzLy4vbm9kZV9tb2R1bGVzL0BkZWZhdWx0LWpzL2RlZmF1bHRqcy1leHRkb20vc3JjL2RvbS9Eb2N1bWVudC5qcyIsIndlYnBhY2s6Ly9AZGVmYXVsdC1qcy9kZWZhdWx0anMtaHRtbC1jb21wb25lbnRzLy4vbm9kZV9tb2R1bGVzL0BkZWZhdWx0LWpzL2RlZmF1bHRqcy1leHRkb20vc3JjL2RvbS9Eb2N1bWVudEZyYWdtZW50LmpzIiwid2VicGFjazovL0BkZWZhdWx0LWpzL2RlZmF1bHRqcy1odG1sLWNvbXBvbmVudHMvLi9ub2RlX21vZHVsZXMvQGRlZmF1bHQtanMvZGVmYXVsdGpzLWV4dGRvbS9zcmMvZG9tL0VsZW1lbnQuanMiLCJ3ZWJwYWNrOi8vQGRlZmF1bHQtanMvZGVmYXVsdGpzLWh0bWwtY29tcG9uZW50cy8uL25vZGVfbW9kdWxlcy9AZGVmYXVsdC1qcy9kZWZhdWx0anMtZXh0ZG9tL3NyYy9kb20vRXZlbnRUYXJnZXQuanMiLCJ3ZWJwYWNrOi8vQGRlZmF1bHQtanMvZGVmYXVsdGpzLWh0bWwtY29tcG9uZW50cy8uL25vZGVfbW9kdWxlcy9AZGVmYXVsdC1qcy9kZWZhdWx0anMtZXh0ZG9tL3NyYy9kb20vSFRNTEVsZW1lbnQuanMiLCJ3ZWJwYWNrOi8vQGRlZmF1bHQtanMvZGVmYXVsdGpzLWh0bWwtY29tcG9uZW50cy8uL25vZGVfbW9kdWxlcy9AZGVmYXVsdC1qcy9kZWZhdWx0anMtZXh0ZG9tL3NyYy9kb20vSFRNTElucHV0RWxlbWVudC5qcyIsIndlYnBhY2s6Ly9AZGVmYXVsdC1qcy9kZWZhdWx0anMtaHRtbC1jb21wb25lbnRzLy4vbm9kZV9tb2R1bGVzL0BkZWZhdWx0LWpzL2RlZmF1bHRqcy1leHRkb20vc3JjL2RvbS9IVE1MU2VsZWN0RWxlbWVudC5qcyIsIndlYnBhY2s6Ly9AZGVmYXVsdC1qcy9kZWZhdWx0anMtaHRtbC1jb21wb25lbnRzLy4vbm9kZV9tb2R1bGVzL0BkZWZhdWx0LWpzL2RlZmF1bHRqcy1leHRkb20vc3JjL2RvbS9IVE1MVGV4dEFyZWFFbGVtZW50LmpzIiwid2VicGFjazovL0BkZWZhdWx0LWpzL2RlZmF1bHRqcy1odG1sLWNvbXBvbmVudHMvLi9ub2RlX21vZHVsZXMvQGRlZmF1bHQtanMvZGVmYXVsdGpzLWV4dGRvbS9zcmMvZG9tL0h0bWxDb2xsZWN0aW9uLmpzIiwid2VicGFjazovL0BkZWZhdWx0LWpzL2RlZmF1bHRqcy1odG1sLWNvbXBvbmVudHMvLi9ub2RlX21vZHVsZXMvQGRlZmF1bHQtanMvZGVmYXVsdGpzLWV4dGRvbS9zcmMvZG9tL05vZGUuanMiLCJ3ZWJwYWNrOi8vQGRlZmF1bHQtanMvZGVmYXVsdGpzLWh0bWwtY29tcG9uZW50cy8uL25vZGVfbW9kdWxlcy9AZGVmYXVsdC1qcy9kZWZhdWx0anMtZXh0ZG9tL3NyYy9kb20vTm9kZUxpc3QuanMiLCJ3ZWJwYWNrOi8vQGRlZmF1bHQtanMvZGVmYXVsdGpzLWh0bWwtY29tcG9uZW50cy8uL25vZGVfbW9kdWxlcy9AZGVmYXVsdC1qcy9kZWZhdWx0anMtZXh0ZG9tL3NyYy9kb20vZXh0ZW50aW9ucy9BdHRyaWJ1dGVTdXBwb3J0LmpzIiwid2VicGFjazovL0BkZWZhdWx0LWpzL2RlZmF1bHRqcy1odG1sLWNvbXBvbmVudHMvLi9ub2RlX21vZHVsZXMvQGRlZmF1bHQtanMvZGVmYXVsdGpzLWV4dGRvbS9zcmMvZG9tL2V4dGVudGlvbnMvRGF0YVN1cHBvcnQuanMiLCJ3ZWJwYWNrOi8vQGRlZmF1bHQtanMvZGVmYXVsdGpzLWh0bWwtY29tcG9uZW50cy8uL25vZGVfbW9kdWxlcy9AZGVmYXVsdC1qcy9kZWZhdWx0anMtZXh0ZG9tL3NyYy9kb20vZXh0ZW50aW9ucy9FdmVudFN1cHBvcnQuanMiLCJ3ZWJwYWNrOi8vQGRlZmF1bHQtanMvZGVmYXVsdGpzLWh0bWwtY29tcG9uZW50cy8uL25vZGVfbW9kdWxlcy9AZGVmYXVsdC1qcy9kZWZhdWx0anMtZXh0ZG9tL3NyYy9kb20vZXh0ZW50aW9ucy9IdG1sQ2xhc3NTdXBwb3J0LmpzIiwid2VicGFjazovL0BkZWZhdWx0LWpzL2RlZmF1bHRqcy1odG1sLWNvbXBvbmVudHMvLi9ub2RlX21vZHVsZXMvQGRlZmF1bHQtanMvZGVmYXVsdGpzLWV4dGRvbS9zcmMvZG9tL2V4dGVudGlvbnMvTGlzdFN1cHBvcnQuanMiLCJ3ZWJwYWNrOi8vQGRlZmF1bHQtanMvZGVmYXVsdGpzLWh0bWwtY29tcG9uZW50cy8uL25vZGVfbW9kdWxlcy9AZGVmYXVsdC1qcy9kZWZhdWx0anMtZXh0ZG9tL3NyYy9kb20vZXh0ZW50aW9ucy9MaXN0VHlwZUJ1aWxkZXIuanMiLCJ3ZWJwYWNrOi8vQGRlZmF1bHQtanMvZGVmYXVsdGpzLWh0bWwtY29tcG9uZW50cy8uL25vZGVfbW9kdWxlcy9AZGVmYXVsdC1qcy9kZWZhdWx0anMtZXh0ZG9tL3NyYy9kb20vZXh0ZW50aW9ucy9NYW5pcHVsYXRpb25TdXBwb3J0LmpzIiwid2VicGFjazovL0BkZWZhdWx0LWpzL2RlZmF1bHRqcy1odG1sLWNvbXBvbmVudHMvLi9ub2RlX21vZHVsZXMvQGRlZmF1bHQtanMvZGVmYXVsdGpzLWV4dGRvbS9zcmMvZG9tL2V4dGVudGlvbnMvUXVlcnlTdXBwb3J0LmpzIiwid2VicGFjazovL0BkZWZhdWx0LWpzL2RlZmF1bHRqcy1odG1sLWNvbXBvbmVudHMvLi9ub2RlX21vZHVsZXMvQGRlZmF1bHQtanMvZGVmYXVsdGpzLWV4dGRvbS9zcmMvZG9tL2V4dGVudGlvbnMvUmVhZHlFdmVudFN1cHBvcnQuanMiLCJ3ZWJwYWNrOi8vQGRlZmF1bHQtanMvZGVmYXVsdGpzLWh0bWwtY29tcG9uZW50cy8uL25vZGVfbW9kdWxlcy9AZGVmYXVsdC1qcy9kZWZhdWx0anMtZXh0ZG9tL3NyYy9kb20vZXh0ZW50aW9ucy9TaG93SGlkZVN1cHBvcnQuanMiLCJ3ZWJwYWNrOi8vQGRlZmF1bHQtanMvZGVmYXVsdGpzLWh0bWwtY29tcG9uZW50cy8uL25vZGVfbW9kdWxlcy9AZGVmYXVsdC1qcy9kZWZhdWx0anMtZXh0ZG9tL3NyYy9kb20vZXh0ZW50aW9ucy9WYWx1ZVN1cHBvcnQuanMiLCJ3ZWJwYWNrOi8vQGRlZmF1bHQtanMvZGVmYXVsdGpzLWh0bWwtY29tcG9uZW50cy8uL25vZGVfbW9kdWxlcy9AZGVmYXVsdC1qcy9kZWZhdWx0anMtZXh0ZG9tL3NyYy9pbmRleC5qcyIsIndlYnBhY2s6Ly9AZGVmYXVsdC1qcy9kZWZhdWx0anMtaHRtbC1jb21wb25lbnRzLy4vbm9kZV9tb2R1bGVzL0BkZWZhdWx0LWpzL2RlZmF1bHRqcy1leHRkb20vc3JjL3V0aWxzL0RlbGVnYXRlckJ1aWxkZXIuanMiLCJ3ZWJwYWNrOi8vQGRlZmF1bHQtanMvZGVmYXVsdGpzLWh0bWwtY29tcG9uZW50cy8uL25vZGVfbW9kdWxlcy9AZGVmYXVsdC1qcy9kZWZhdWx0anMtZXh0ZG9tL3NyYy91dGlscy9FeHRlbmRQcm90b3R5cGUuanMiLCJ3ZWJwYWNrOi8vQGRlZmF1bHQtanMvZGVmYXVsdGpzLWh0bWwtY29tcG9uZW50cy8uL25vZGVfbW9kdWxlcy9AZGVmYXVsdC1qcy9kZWZhdWx0anMtZXh0ZG9tL3NyYy91dGlscy9FeHRlbmRlci5qcyIsIndlYnBhY2s6Ly9AZGVmYXVsdC1qcy9kZWZhdWx0anMtaHRtbC1jb21wb25lbnRzLy4vbm9kZV9tb2R1bGVzL0BkZWZhdWx0LWpzL2RlZmF1bHRqcy1leHRkb20vc3JjL3V0aWxzL1V0aWxzLmpzIiwid2VicGFjazovL0BkZWZhdWx0LWpzL2RlZmF1bHRqcy1odG1sLWNvbXBvbmVudHMvLi9zcmMvQ29tcG9uZW50LmpzIiwid2VicGFjazovL0BkZWZhdWx0LWpzL2RlZmF1bHRqcy1odG1sLWNvbXBvbmVudHMvLi9zcmMvQ29uc3RhbnRzLmpzIiwid2VicGFjazovL0BkZWZhdWx0LWpzL2RlZmF1bHRqcy1odG1sLWNvbXBvbmVudHMvLi9zcmMvUmVhZHkuanMiLCJ3ZWJwYWNrOi8vQGRlZmF1bHQtanMvZGVmYXVsdGpzLWh0bWwtY29tcG9uZW50cy8uL3NyYy91dGlscy9EZWZpbmVDb21wb25lbnRIZWxwZXIuanMiLCJ3ZWJwYWNrOi8vQGRlZmF1bHQtanMvZGVmYXVsdGpzLWh0bWwtY29tcG9uZW50cy8uL3NyYy91dGlscy9FdmVudEhlbHBlci5qcyIsIndlYnBhY2s6Ly9AZGVmYXVsdC1qcy9kZWZhdWx0anMtaHRtbC1jb21wb25lbnRzLy4vc3JjL3V0aWxzL05vZGVIZWxwZXIuanMiLCJ3ZWJwYWNrOi8vQGRlZmF1bHQtanMvZGVmYXVsdGpzLWh0bWwtY29tcG9uZW50cy8uL3NyYy91dGlscy9TdHlsZUhlbHBlci5qcyIsIndlYnBhY2s6Ly9AZGVmYXVsdC1qcy9kZWZhdWx0anMtaHRtbC1jb21wb25lbnRzLy4vc3JjL3V0aWxzL1dlYWtEYXRhLmpzIiwid2VicGFjazovL0BkZWZhdWx0LWpzL2RlZmF1bHRqcy1odG1sLWNvbXBvbmVudHMvLi9zcmMvdXRpbHMvaW5kZXguanMiLCJ3ZWJwYWNrOi8vQGRlZmF1bHQtanMvZGVmYXVsdGpzLWh0bWwtY29tcG9uZW50cy93ZWJwYWNrL2Jvb3RzdHJhcCIsIndlYnBhY2s6Ly9AZGVmYXVsdC1qcy9kZWZhdWx0anMtaHRtbC1jb21wb25lbnRzL3dlYnBhY2svcnVudGltZS9kZWZpbmUgcHJvcGVydHkgZ2V0dGVycyIsIndlYnBhY2s6Ly9AZGVmYXVsdC1qcy9kZWZhdWx0anMtaHRtbC1jb21wb25lbnRzL3dlYnBhY2svcnVudGltZS9nbG9iYWwiLCJ3ZWJwYWNrOi8vQGRlZmF1bHQtanMvZGVmYXVsdGpzLWh0bWwtY29tcG9uZW50cy93ZWJwYWNrL3J1bnRpbWUvaGFzT3duUHJvcGVydHkgc2hvcnRoYW5kIiwid2VicGFjazovL0BkZWZhdWx0LWpzL2RlZmF1bHRqcy1odG1sLWNvbXBvbmVudHMvd2VicGFjay9ydW50aW1lL21ha2UgbmFtZXNwYWNlIG9iamVjdCIsIndlYnBhY2s6Ly9AZGVmYXVsdC1qcy9kZWZhdWx0anMtaHRtbC1jb21wb25lbnRzLy4vaW5kZXguanMiXSwic291cmNlc0NvbnRlbnQiOlsiY29uc3QgR0xPQkFMID0gKCgpID0+IHtcclxuXHRpZih0eXBlb2YgZ2xvYmFsICE9PSBcInVuZGVmaW5lZFwiKSByZXR1cm4gZ2xvYmFsO1xyXG5cdGlmKHR5cGVvZiB3aW5kb3cgIT09IFwidW5kZWZpbmVkXCIpIHJldHVybiB3aW5kb3c7XHRcclxuXHRpZih0eXBlb2Ygc2VsZiAhPT0gXCJ1bmRlZmluZWRcIikgcmV0dXJuIHNlbGY7XHJcblx0cmV0dXJuIHt9O1xyXG59KSgpO1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgR0xPQkFMOyIsImV4cG9ydCBkZWZhdWx0IGNsYXNzIE9iamVjdFByb3BlcnR5IHtcclxuXHRjb25zdHJ1Y3RvcihrZXksIGNvbnRleHQpe1xyXG5cdFx0dGhpcy5rZXkgPSBrZXk7XHJcblx0XHR0aGlzLmNvbnRleHQgPSBjb250ZXh0O1xyXG5cdH1cclxuXHRcclxuXHRnZXQga2V5RGVmaW5lZCgpe1xyXG5cdFx0cmV0dXJuIHRoaXMua2V5IGluIHRoaXMuY29udGV4dDsgXHJcblx0fVxyXG5cdFxyXG5cdGdldCBoYXNWYWx1ZSgpe1xyXG5cdFx0cmV0dXJuICEhdGhpcy5jb250ZXh0W3RoaXMua2V5XTtcclxuXHR9XHJcblx0XHJcblx0Z2V0IHZhbHVlKCl7XHJcblx0XHRyZXR1cm4gdGhpcy5jb250ZXh0W3RoaXMua2V5XTtcclxuXHR9XHJcblx0XHJcblx0c2V0IHZhbHVlKGRhdGEpe1xyXG5cdFx0dGhpcy5jb250ZXh0W3RoaXMua2V5XSA9IGRhdGE7XHJcblx0fVxyXG5cdFxyXG5cdHNldCBhcHBlbmQoZGF0YSkge1xyXG5cdFx0aWYoIXRoaXMuaGFzVmFsdWUpXHJcblx0XHRcdHRoaXMudmFsdWUgPSBkYXRhO1xyXG5cdFx0ZWxzZSB7XHJcblx0XHRcdGNvbnN0IHZhbHVlID0gdGhpcy52YWx1ZTtcclxuXHRcdFx0aWYodmFsdWUgaW5zdGFuY2VvZiBBcnJheSlcclxuXHRcdFx0XHR2YWx1ZS5wdXNoKGRhdGEpO1xyXG5cdFx0XHRlbHNlXHJcblx0XHRcdFx0dGhpcy52YWx1ZSA9IFt0aGlzLnZhbHVlLCBkYXRhXTtcclxuXHRcdH1cclxuXHR9XHJcblx0XHJcblx0cmVtb3ZlKCl7XHJcblx0XHRkZWxldGUgdGhpcy5jb250ZXh0W3RoaXMua2V5XTtcclxuXHR9XHJcblx0XHJcblx0c3RhdGljIGxvYWQoZGF0YSwga2V5LCBjcmVhdGU9dHJ1ZSkge1xyXG5cdFx0bGV0IGNvbnRleHQgPSBkYXRhO1xyXG5cdFx0Y29uc3Qga2V5cyA9IGtleS5zcGxpdChcIlxcLlwiKTtcclxuXHRcdGxldCBuYW1lID0ga2V5cy5zaGlmdCgpLnRyaW0oKTtcclxuXHRcdHdoaWxlKGtleXMubGVuZ3RoID4gMCl7XHJcblx0XHRcdGlmKCFjb250ZXh0W25hbWVdKXtcclxuXHRcdFx0XHRpZighY3JlYXRlKVxyXG5cdFx0XHRcdFx0cmV0dXJuIG51bGw7XHJcblx0XHRcdFx0XHJcblx0XHRcdFx0Y29udGV4dFtuYW1lXSA9IHt9XHJcblx0XHRcdH1cclxuXHRcdFx0XHJcblx0XHRcdGNvbnRleHQgPSBjb250ZXh0W25hbWVdO1xyXG5cdFx0XHRuYW1lID0ga2V5cy5zaGlmdCgpLnRyaW0oKTtcclxuXHRcdH1cclxuXHRcdFxyXG5cdFx0cmV0dXJuIG5ldyBPYmplY3RQcm9wZXJ0eShuYW1lLCBjb250ZXh0KTtcclxuXHR9XHJcbn07IiwiaW1wb3J0IE9iamVjdFByb3BlcnR5IGZyb20gXCIuL09iamVjdFByb3BlcnR5LmpzXCI7XHJcblxyXG5jb25zdCBlcXVhbEFycmF5U2V0ID0gKGEsIGIpID0+IHtcclxuXHRpZiAoYS5sZW5ndGggIT09IGIubGVuZ3RoKSByZXR1cm4gZmFsc2U7XHJcblx0Y29uc3QgbGVuZ3RoID0gYS5sZW5ndGg7XHJcblx0Zm9yIChsZXQgaSA9IDA7IGkgPCBsZW5ndGg7IGkrKylcclxuXHRcdGlmICghZXF1YWxQb2pvKGFbaV0sIGJbaV0pKSB7XHJcblx0XHRcdC8vY29uc29sZS5sb2coXCJmYWxzZVwiKTtcclxuXHRcdFx0cmV0dXJuIGZhbHNlO1xyXG5cdFx0fVxyXG5cclxuXHRyZXR1cm4gdHJ1ZTtcclxufTtcclxuXHJcbmNvbnN0IGVxdWFsTWFwID0gKGEsIGIpID0+IHtcclxuXHRpZiAoYS5sZW5ndGggIT09IGIubGVuZ3RoKSByZXR1cm4gZmFsc2U7XHJcblx0Zm9yIChjb25zdCBrZXkgb2YgYS5rZXlzKCkpXHJcblx0XHRpZiAoIWVxdWFsUG9qbyhhLmdldChrZXkpLCBiLmdldChrZXkpKSkge1xyXG5cdFx0XHQvL2NvbnNvbGUubG9nKFwiZmFsc2VcIik7XHJcblx0XHRcdHJldHVybiBmYWxzZTtcclxuXHRcdH1cclxuXHJcblx0cmV0dXJuIHRydWU7XHJcbn07XHJcblxyXG5jb25zdCBlcXVhbENsYXNzZXMgPSAoYSwgYikgPT4ge1xyXG5cdGNvbnN0IGNsYXp6QSA9IE9iamVjdC5nZXRQcm90b3R5cGVPZihhKTtcclxuXHRjb25zdCBjbGF6ekIgPSBPYmplY3QuZ2V0UHJvdG90eXBlT2YoYik7XHJcblx0aWYgKGNsYXp6QSAhPSBjbGF6ekIpIHJldHVybiBmYWxzZTtcclxuXHJcblx0aWYgKCFjbGF6ekEpIHJldHVybiB0cnVlO1xyXG5cclxuXHRjb25zdCBwcm9wZXJ0aWVzQSA9IE9iamVjdC5nZXRPd25Qcm9wZXJ0eU5hbWVzKGNsYXp6QSk7XHJcblx0Y29uc3QgcHJvcGVydGllc0IgPSBPYmplY3QuZ2V0T3duUHJvcGVydHlOYW1lcyhjbGF6ekIpO1xyXG5cclxuXHRpZiAocHJvcGVydGllc0EubGVuZ3RoICE9PSBwcm9wZXJ0aWVzQi5sZW5ndGgpIHJldHVybiBmYWxzZTtcclxuXHRmb3IgKGNvbnN0IGtleSBvZiBwcm9wZXJ0aWVzQSkge1xyXG5cdFx0Y29uc3QgdmFsdWVBID0gYVtrZXldO1xyXG5cdFx0Y29uc3QgdmFsdWVCID0gYltrZXldO1xyXG5cclxuXHRcdGlmICghZXF1YWxQb2pvKHZhbHVlQSwgdmFsdWVCKSkgcmV0dXJuIGZhbHNlO1xyXG5cdH1cclxuXHRyZXR1cm4gdHJ1ZTtcclxufTtcclxuXHJcbmNvbnN0IGVxdWFsT2JqZWN0ID0gKGEsIGIpID0+IHtcclxuXHRjb25zdCBwcm9wZXJ0aWVzQSA9IE9iamVjdC5rZXlzKGEpO1xyXG5cdGNvbnN0IHByb3BlcnRpZXNCID0gT2JqZWN0LmtleXMoYik7XHJcblxyXG5cdGlmIChwcm9wZXJ0aWVzQS5sZW5ndGggIT09IHByb3BlcnRpZXNCLmxlbmd0aCkgcmV0dXJuIGZhbHNlO1xyXG5cdGZvciAoY29uc3Qga2V5IG9mIHByb3BlcnRpZXNBKSB7XHJcblx0XHRjb25zdCB2YWx1ZUEgPSBhW2tleV07XHJcblx0XHRjb25zdCB2YWx1ZUIgPSBiW2tleV07XHJcblxyXG5cdFx0aWYgKCFlcXVhbFBvam8odmFsdWVBLCB2YWx1ZUIpKSByZXR1cm4gZmFsc2U7XHJcblx0fVxyXG5cdHJldHVybiB0cnVlO1xyXG59O1xyXG5cclxuZXhwb3J0IGNvbnN0IGlzTnVsbE9yVW5kZWZpbmVkID0gKG9iamVjdCkgPT4ge1xyXG5cdHJldHVybiBvYmplY3QgPT0gbnVsbCB8fCB0eXBlb2Ygb2JqZWN0ID09PSBcInVuZGVmaW5lZFwiO1xyXG59O1xyXG5cclxuZXhwb3J0IGNvbnN0IGlzUHJpbWl0aXZlID0gKG9iamVjdCkgPT4ge1xyXG5cdGlmIChvYmplY3QgPT0gbnVsbCkgcmV0dXJuIHRydWU7XHJcblxyXG5cdGNvbnN0IHR5cGUgPSB0eXBlb2Ygb2JqZWN0O1xyXG5cdHN3aXRjaCAodHlwZSkge1xyXG5cdFx0Y2FzZSBcIm51bWJlclwiOlxyXG5cdFx0Y2FzZSBcImJpZ2ludFwiOlxyXG5cdFx0Y2FzZSBcImJvb2xlYW5cIjpcclxuXHRcdGNhc2UgXCJzdHJpbmdcIjpcclxuXHRcdGNhc2UgXCJ1bmRlZmluZWRcIjpcclxuXHRcdFx0cmV0dXJuIHRydWU7XHJcblx0fVxyXG5cclxuXHRyZXR1cm4gZmFsc2U7XHJcbn07XHJcblxyXG5leHBvcnQgY29uc3QgaXNPYmplY3QgPSAob2JqZWN0KSA9PiB7XHJcblx0aWYoaXNOdWxsT3JVbmRlZmluZWQob2JqZWN0KSlcclxuXHRcdHJldHVybiBmYWxzZTtcclxuXHJcblx0cmV0dXJuIHR5cGVvZiBvYmplY3QgPT09IFwib2JqZWN0XCIgJiYgKCFvYmplY3QuY29uc3RydWN0b3IgfHwgb2JqZWN0LmNvbnN0cnVjdG9yLm5hbWUgPT09IFwiT2JqZWN0XCIpO1xyXG59O1xyXG5cclxuLyoqXHJcbiAqIGVxdWFsUG9qbyAtPiBjb21wYXJlcyBvbmx5IHBvam9zLCBhcnJheSwgc2V0LCBtYXAgYW5kIHByaW1pdGl2ZXNcclxuICovXHJcbmV4cG9ydCBjb25zdCBlcXVhbFBvam8gPSAoYSwgYikgPT4ge1xyXG5cdGNvbnN0IG51bGxBID0gaXNOdWxsT3JVbmRlZmluZWQoYSk7XHJcblx0Y29uc3QgbnVsbEIgPSBpc051bGxPclVuZGVmaW5lZChiKTtcclxuXHRpZiAobnVsbEEgfHwgbnVsbEIpIHJldHVybiBhID09PSBiO1xyXG5cclxuXHRpZiAoaXNQcmltaXRpdmUoYSkgfHwgaXNQcmltaXRpdmUoYikpIHJldHVybiBhID09PSBiO1xyXG5cclxuXHRjb25zdCB0eXBlQSA9IHR5cGVvZiBhO1xyXG5cdGNvbnN0IHR5cGVCID0gdHlwZW9mIGI7XHJcblx0aWYgKHR5cGVBICE9IHR5cGVCKSByZXR1cm4gZmFsc2U7XHJcblx0aWYgKHR5cGVBID09PSBcImZ1bmN0aW9uXCIpIHJldHVybiBhID09PSBiO1xyXG5cdC8vaWYgKGEuY29uc3RydWN0b3IgIT09IGIuY29uc3RydWN0b3IpIHJldHVybiBmYWxzZTtcclxuXHQvL2lmIChhIGluc3RhbmNlb2YgQXJyYXkgfHwgYSBpbnN0YW5jZW9mIFNldCkgcmV0dXJuIGVxdWFsQXJyYXlTZXQoYSwgYik7XHJcblx0Ly9pZiAoYSBpbnN0YW5jZW9mIE1hcCkgcmV0dXJuIGVxdWFsTWFwKGEsIGIpO1xyXG5cclxuXHRyZXR1cm4gZXF1YWxPYmplY3QoYSwgYikgJiYgZXF1YWxDbGFzc2VzKGEsIGIpO1xyXG59O1xyXG5cclxuLyoqXHJcbiAqIGNoZWNrZWQgaWYgYW4gb2JqZWN0IGEgc2ltcGxlIG9iamVjdC4gTm8gQXJyYXksIE1hcCBvciBzb21ldGhpbmcgZWxzZS5cclxuICpcclxuICogQHBhcmFtIGFPYmplY3Q6b2JqZWN0IHRoZSBvYmplY3QgdG8gYmUgdGVzdGluZ1xyXG4gKlxyXG4gKiBAcmV0dXJuIGJvb2xlYW5cclxuICovXHJcbmV4cG9ydCBjb25zdCBpc1Bvam8gPSAob2JqZWN0KSA9PiB7XHJcblx0aWYgKCFpc09iamVjdChvYmplY3QpKSByZXR1cm4gZmFsc2U7XHJcblxyXG5cdGZvciAoY29uc3Qga2V5IGluIG9iamVjdCkge1xyXG5cdFx0Y29uc3QgdmFsdWUgPSBvYmplY3Rba2V5XTtcclxuXHRcdGlmICh0eXBlb2YgdmFsdWUgPT09IFwiZnVuY3Rpb25cIikgcmV0dXJuIGZhbHNlO1xyXG5cdH1cclxuXHJcblx0cmV0dXJuIHRydWU7XHJcbn07XHJcblxyXG4vKipcclxuICogYXBwZW5kIGEgcHJvcGVyeSB2YWx1ZSB0byBhbiBvYmplY3QuIElmIHByb3BlcnkgZXhpc3RzIGl0cyB3b3VsZCBiZSBjb252ZXJ0ZWQgdG8gYW4gYXJyYXlcclxuICpcclxuICogIEBwYXJhbSBhS2V5OnN0cmluZyBuYW1lIG9mIHByb3BlcnR5XHJcbiAqICBAcGFyYW0gYURhdGE6YW55IHByb3BlcnR5IHZhbHVlXHJcbiAqICBAcGFyYW0gYU9iamVjdDpvYmplY3QgdGhlIG9iamVjdCB0byBhcHBlbmQgdGhlIHByb3BlcnR5XHJcbiAqXHJcbiAqICBAcmV0dXJuIHJldHVybnMgdGhlIGNoYW5nZWQgb2JqZWN0XHJcbiAqL1xyXG5leHBvcnQgY29uc3QgYXBwZW5kID0gZnVuY3Rpb24gKGFLZXksIGFEYXRhLCBhT2JqZWN0KSB7XHJcblx0aWYgKHR5cGVvZiBhRGF0YSAhPT0gXCJ1bmRlZmluZWRcIikge1xyXG5cdFx0Y29uc3QgcHJvcGVydHkgPSBPYmplY3RQcm9wZXJ0eS5sb2FkKGFPYmplY3QsIGFLZXksIHRydWUpO1xyXG5cdFx0cHJvcGVydHkuYXBwZW5kID0gYURhdGE7XHJcblx0fVxyXG5cdHJldHVybiBhT2JqZWN0O1xyXG59O1xyXG5cclxuLyoqXHJcbiAqIG1lcmdpbmcgb2JqZWN0IGludG8gYSB0YXJnZXQgb2JqZWN0LiBJdHMgb25seSBtZXJnZSBzaW1wbGUgb2JqZWN0IGFuZCBzdWIgb2JqZWN0cy4gRXZlcnkgb3RoZXJcclxuICogdmFsdWUgd291bGQgYmUgcmVwbGFjZWQgYnkgdmFsdWUgZnJvbSB0aGUgc291cmNlIG9iamVjdC5cclxuICpcclxuICogc2FtcGxlOiBtZXJnZSh0YXJnZXQsIHNvdXJjZS0xLCBzb3VyY2UtMiwgLi4uc291cmNlLW4pXHJcbiAqXHJcbiAqIEBwYXJhbSB0YXJnZXQ6b2JqZWN0IHRoZSB0YXJnZXQgb2JqZWN0IHRvIG1lcmdpbmcgaW50b1xyXG4gKiBAcGFyYW0gc291cmNlczpvYmplY3RcclxuICpcclxuICogQHJldHVybiBvYmplY3QgcmV0dXJucyB0aGUgdGFyZ2V0IG9iamVjdFxyXG4gKi9cclxuZXhwb3J0IGNvbnN0IG1lcmdlID0gZnVuY3Rpb24gKHRhcmdldCwgLi4uc291cmNlcykge1xyXG5cdGlmICghdGFyZ2V0KSB0YXJnZXQgPSB7fTtcclxuXHJcblx0Zm9yIChsZXQgc291cmNlIG9mIHNvdXJjZXMpIHtcclxuXHRcdGlmIChpc1Bvam8oc291cmNlKSkge1xyXG5cdFx0XHRPYmplY3QuZ2V0T3duUHJvcGVydHlOYW1lcyhzb3VyY2UpLmZvckVhY2goKGtleSkgPT4ge1xyXG5cdFx0XHRcdGlmIChpc1Bvam8odGFyZ2V0W2tleV0pKSBtZXJnZSh0YXJnZXRba2V5XSwgc291cmNlW2tleV0pO1xyXG5cdFx0XHRcdGVsc2UgdGFyZ2V0W2tleV0gPSBzb3VyY2Vba2V5XTtcclxuXHRcdFx0fSk7XHJcblx0XHR9XHJcblx0fVxyXG5cclxuXHRyZXR1cm4gdGFyZ2V0O1xyXG59O1xyXG5cclxuY29uc3QgYnVpbGRQcm9wZXJ0eUZpbHRlciA9IGZ1bmN0aW9uICh7IG5hbWVzLCBhbGxvd2VkIH0pIHtcclxuXHRyZXR1cm4gKG5hbWUsIHZhbHVlLCBjb250ZXh0KSA9PiB7XHJcblx0XHRyZXR1cm4gbmFtZXMuaW5jbHVkZXMobmFtZSkgPT09IGFsbG93ZWQ7XHJcblx0fTtcclxufTtcclxuXHJcbmV4cG9ydCBjb25zdCBmaWx0ZXIgPSBmdW5jdGlvbiAoKSB7XHJcblx0Y29uc3QgW2RhdGEsIHByb3BGaWx0ZXIsIHsgZGVlcCA9IGZhbHNlLCByZWN1cnNpdmUgPSB0cnVlLCBwYXJlbnRzID0gW10gfSA9IHt9XSA9IGFyZ3VtZW50cztcclxuXHRjb25zdCByZXN1bHQgPSB7fTtcclxuXHJcblx0Zm9yIChsZXQgbmFtZSBpbiBkYXRhKSB7XHJcblx0XHRjb25zdCB2YWx1ZSA9IGRhdGFbbmFtZV07XHJcblx0XHRjb25zdCBhY2NlcHQgPSBwcm9wRmlsdGVyKG5hbWUsIHZhbHVlLCBkYXRhKTtcclxuXHRcdGlmIChhY2NlcHQgJiYgKCFkZWVwIHx8IHZhbHVlID09PSBudWxsIHx8IHZhbHVlID09PSB1bmRlZmluZWQpKSByZXN1bHRbbmFtZV0gPSB2YWx1ZTtcclxuXHRcdGVsc2UgaWYgKGFjY2VwdCAmJiBkZWVwKSB7XHJcblx0XHRcdGNvbnN0IHR5cGUgPSB0eXBlb2YgdmFsdWU7XHJcblx0XHRcdGlmICh0eXBlICE9PSBcIm9iamVjdFwiIHx8IHZhbHVlIGluc3RhbmNlb2YgQXJyYXkgfHwgdmFsdWUgaW5zdGFuY2VvZiBNYXAgfHwgdmFsdWUgaW5zdGFuY2VvZiBTZXQgfHwgdmFsdWUgaW5zdGFuY2VvZiBSZWdFeHAgfHwgcGFyZW50cy5pbmNsdWRlc1t2YWx1ZV0gfHwgdmFsdWUgPT0gZGF0YSkgcmVzdWx0W25hbWVdID0gdmFsdWU7XHJcblx0XHRcdGVsc2UgcmVzdWx0W25hbWVdID0gZmlsdGVyKHZhbHVlLCBwcm9wRmlsdGVyLCB7IGRlZXAsIHJlY3Vyc2l2ZSwgcGFyZW50czogcGFyZW50cy5jb25jYXQoZGF0YSkgfSk7XHJcblx0XHR9XHJcblx0fVxyXG5cclxuXHRyZXR1cm4gcmVzdWx0O1xyXG59O1xyXG5cclxuZXhwb3J0IGNvbnN0IGRlZlZhbHVlID0gKG8sIG5hbWUsIHZhbHVlKSA9PiB7XHJcblx0T2JqZWN0LmRlZmluZVByb3BlcnR5KG8sIG5hbWUsIHtcclxuXHRcdHZhbHVlLFxyXG5cdFx0d3JpdGFibGU6IGZhbHNlLFxyXG5cdFx0Y29uZmlndXJhYmxlOiBmYWxzZSxcclxuXHRcdGVudW1lcmFibGU6IGZhbHNlLFxyXG5cdH0pO1xyXG59O1xyXG5leHBvcnQgY29uc3QgZGVmR2V0ID0gKG8sIG5hbWUsIGdldCkgPT4ge1xyXG5cdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShvLCBuYW1lLCB7XHJcblx0XHRnZXQsXHJcblx0XHRjb25maWd1cmFibGU6IGZhbHNlLFxyXG5cdFx0ZW51bWVyYWJsZTogZmFsc2UsXHJcblx0fSk7XHJcbn07XHJcblxyXG5leHBvcnQgY29uc3QgZGVmR2V0U2V0ID0gKG8sIG5hbWUsIGdldCwgc2V0KSA9PiB7XHJcblx0T2JqZWN0LmRlZmluZVByb3BlcnR5KG8sIG5hbWUsIHtcclxuXHRcdGdldCxcclxuXHRcdHNldCxcclxuXHRcdGNvbmZpZ3VyYWJsZTogZmFsc2UsXHJcblx0XHRlbnVtZXJhYmxlOiBmYWxzZSxcclxuXHR9KTtcclxufTtcclxuXHJcbmV4cG9ydCBkZWZhdWx0IHtcclxuXHRpc051bGxPclVuZGVmaW5lZCxcclxuXHRpc09iamVjdCxcclxuXHRlcXVhbFBvam8sXHJcblx0aXNQb2pvLFxyXG5cdGFwcGVuZCxcclxuXHRtZXJnZSxcclxuXHRmaWx0ZXIsXHJcblx0YnVpbGRQcm9wZXJ0eUZpbHRlcixcclxuXHRkZWZWYWx1ZSxcclxuXHRkZWZHZXQsXHJcblx0ZGVmR2V0U2V0LFxyXG59O1xyXG4iLCJpbXBvcnQge2RlZlZhbHVlLCBkZWZHZXR9IGZyb20gXCIuL09iamVjdFV0aWxzXCJcclxuXHJcbmV4cG9ydCBjb25zdCB0aW1lb3V0UHJvbWlzZSA9IChmbiwgbXMpID0+e1xyXG5cdGxldCBjYW5jZWxlZCA9IGZhbHNlO1xyXG5cdGxldCB0aW1lb3V0ID0gbnVsbDtcclxuXHRjb25zdCBwcm9taXNlID0gbmV3IFByb21pc2UoKHIsIGUpID0+IHtcclxuXHRcdHRpbWVvdXQgPSBzZXRUaW1lb3V0KCgpPT4ge1xyXG5cdFx0XHR0aW1lb3V0ID0gbnVsbDtcclxuXHRcdFx0Zm4ocixlKTtcclxuXHRcdH0sIG1zKVxyXG5cdH0pO1xyXG5cclxuXHRjb25zdCB0aGVuID0gcHJvbWlzZS50aGVuO1xyXG5cdHByb21pc2UudGhlbiA9IChmbikgPT4ge1xyXG5cdFx0dGhlbi5jYWxsKHByb21pc2UsIChyZXN1bHQpID0+IHtcclxuXHRcdFx0aWYoIXRoaXMuY2FuY2VsZWQpXHJcblx0XHRcdFx0cmV0dXJuIGZuKHJlc3VsdCk7XHJcblx0XHR9KTtcclxuXHR9XHJcblxyXG5cdGRlZlZhbHVlKHByb21pc2UsIFwiY2FuY2VsXCIsICgpID0+IHtcclxuXHRcdGlmKHRpbWVvdXQpe1xyXG5cdFx0XHRjbGVhclRpbWVvdXQodGltZW91dCk7XHJcblx0XHRcdGNhbmNlbGVkID0gdHJ1ZTtcclxuXHRcdH1cclxuXHR9KTtcclxuXHRkZWZHZXQocHJvbWlzZSwgY2FuY2VsZCwgKCkgPT4gY2FuY2VsZWQpO1xyXG5cclxuXHRyZXR1cm4gcHJvbWlzZTtcclxufVxyXG5cclxuXHJcbmV4cG9ydCBjb25zdCBsYXp5UHJvbWlzZSA9ICgpID0+IHtcclxuXHRcdGxldCBwcm9taXNlUmVzb2x2ZSA9IG51bGw7XHJcblx0XHRsZXQgcHJvbWlzZUVycm9yID0gbnVsbDtcclxuXHJcblx0XHRjb25zdCBwcm9taXNlID0gbmV3IFByb21pc2UoKHIsIGUpID0+IHtcclxuXHRcdFx0cHJvbWlzZVJlc29sdmUgPSByO1xyXG5cdFx0XHRwcm9taXNlRXJyb3IgPSBlO1xyXG5cdFx0fSk7XHJcblxyXG5cdFx0bGV0IHJlc29sdmVkID0gZmFsc2U7XHJcblx0XHRsZXQgZXJyb3IgPSBmYWxzZTtcclxuXHRcdGxldCB2YWx1ZSA9IHVuZGVmaW5lZDtcclxuXHJcblx0XHRkZWZWYWx1ZShwcm9taXNlLCBcInJlc29sdmVcIiwgKHJlc3VsdCkgPT4ge1xyXG5cdFx0XHR2YWx1ZSA9IHJlc3VsdDtcclxuXHRcdFx0cmVzb2x2ZWQgPSB0cnVlO1xyXG5cdFx0XHRpZiAodmFsdWUgaW5zdGFuY2VvZiBFcnJvcikge1xyXG5cdFx0XHRcdGVycm9yID0gdHJ1ZTtcclxuXHRcdFx0XHRwcm9taXNlRXJyb3IodmFsdWUpO1xyXG5cdFx0XHR9IGVsc2UgcHJvbWlzZVJlc29sdmUodmFsdWUpO1xyXG5cdFx0fSk7XHJcblxyXG5cdFx0ZGVmR2V0KHByb21pc2UsIFwidmFsdWVcIiwgKCkgPT4gdmFsdWUpO1xyXG5cdFx0ZGVmR2V0KHByb21pc2UsIFwiZXJyb3JcIiwgKCkgPT4gZXJyb3IpO1xyXG5cdFx0ZGVmR2V0KHByb21pc2UsIFwicmVzb2x2ZWRcIiwgKCkgPT4gcmVzb2x2ZWQpO1xyXG5cclxuXHRcdHJldHVybiBwcm9taXNlO1xyXG59O1xyXG5leHBvcnQgZGVmYXVsdCB7XHJcblx0bGF6eVByb21pc2UsXHJcblx0dGltZW91dFByb21pc2VcclxufVxyXG4iLCIvL3RoZSBzb2x1dGlvbiBpcyBmb3VuZCBoZXJlOiBodHRwczovL3N0YWNrb3ZlcmZsb3cuY29tL3F1ZXN0aW9ucy8xMDUwMzQvaG93LXRvLWNyZWF0ZS1hLWd1aWQtdXVpZFxyXG5leHBvcnQgY29uc3QgVVVJRF9TQ0hFTUEgPSBcInh4eHh4eHh4LXh4eHgtNHh4eC15eHh4LXh4eHh4eHh4eHh4eFwiO1xyXG5cclxuZXhwb3J0IGNvbnN0IHV1aWQgPSAoKSA9PiB7XHJcblx0Y29uc3QgYnVmID0gbmV3IFVpbnQzMkFycmF5KDQpO1xyXG5cdHdpbmRvdy5jcnlwdG8uZ2V0UmFuZG9tVmFsdWVzKGJ1Zik7XHJcblx0bGV0IGlkeCA9IC0xO1xyXG5cdHJldHVybiBVVUlEX1NDSEVNQS5yZXBsYWNlKC9beHldL2csIChjKSA9PiB7XHJcblx0XHRpZHgrKztcclxuXHRcdGNvbnN0IHIgPSAoYnVmW2lkeCA+PiAzXSA+PiAoKGlkeCAlIDgpICogNCkpICYgMTU7XHJcblx0XHRjb25zdCB2ID0gYyA9PSBcInhcIiA/IHIgOiAociAmIDB4MykgfCAweDg7XHJcblx0XHRyZXR1cm4gdi50b1N0cmluZygxNik7XHJcblx0fSk7XHJcbn07XHJcblxyXG5leHBvcnQgZGVmYXVsdCB7IHV1aWQgfTtcclxuIiwiaW1wb3J0IFwiLi9zcmNcIjsiLCJpbXBvcnQgVXRpbHMsIHtHTE9CQUx9IGZyb20gXCIuL3V0aWxzL1V0aWxzXCI7XHJcbmltcG9ydCB7IFJFQURZRVZFTlQgfSBmcm9tIFwiLi9kb20vZXh0ZW50aW9ucy9SZWFkeUV2ZW50U3VwcG9ydFwiO1xyXG5cclxuR0xPQkFMLmRlZmF1bHRqcyA9IEdMT0JBTC5kZWZhdWx0anMgfHwge307XHJcbkdMT0JBTC5kZWZhdWx0anMuZXh0ZG9tID0gR0xPQkFMLmRlZmF1bHRqcy5leHRkb20gfHwge1xyXG5cdFZFUlNJT04gOiBcIiR7dmVyc2lvbn1cIixcclxuXHRSRUFEWUVWRU5UIDogUkVBRFlFVkVOVCxcclxuXHR1dGlscyA6IHtcclxuXHRcdFV0aWxzOiBVdGlsc1xyXG5cdH1cclxufTtcclxuXHJcbkdMT0JBTC5maW5kID0gZnVuY3Rpb24oKSB7XHJcblx0cmV0dXJuIGRvY3VtZW50LmZpbmQuYXBwbHkoZG9jdW1lbnQsIGFyZ3VtZW50cyk7XHJcbn07XHJcblxyXG5HTE9CQUwucmVhZHkgPSBmdW5jdGlvbigpIHtcclxuXHRyZXR1cm4gZG9jdW1lbnQucmVhZHkuYXBwbHkoZG9jdW1lbnQsIGFyZ3VtZW50cyk7XHJcbn07XHJcblxyXG5HTE9CQUwuY3JlYXRlID0gZnVuY3Rpb24oYUNvbnRlbnQsIGFzVGVtcGxhdGUpIHtcclxuXHRpZiAodHlwZW9mIGFyZ3VtZW50c1swXSAhPT0gXCJzdHJpbmdcIilcclxuXHRcdHRocm93IG5ldyBFcnJvcihcIlRoZSBmaXJzdCBhcmd1bWVudCBtdXN0IGJlIGEgc3RyaW5nIVwiKTtcclxuXHRcclxuXHRjb25zdCB0ZW1wbGF0ZSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJ0ZW1wbGF0ZVwiKTtcclxuXHR0ZW1wbGF0ZS5pbm5lckhUTUwgPSBhQ29udGVudDtcclxuXHRpZihhc1RlbXBsYXRlKVxyXG5cdFx0cmV0dXJuIHRlbXBsYXRlO1xyXG5cdFxyXG5cdHJldHVybiBkb2N1bWVudC5pbXBvcnROb2RlKHRlbXBsYXRlLmNvbnRlbnQsIHRydWUpLmNoaWxkTm9kZXM7XHJcbn07XHJcblxyXG5HTE9CQUwuc2NyaXB0ID0gZnVuY3Rpb24oYUZpbGUsIGFUYXJnZXQpIHtcclxuXHRpZihhRmlsZSBpbnN0YW5jZW9mIEFycmF5KVxyXG5cdFx0cmV0dXJuIFByb21pc2UuYWxsKGFGaWxlLm1hcChmaWxlID0+IEdMT0JBTC5zY3JpcHQoZmlsZSwgYVRhcmdldCkpKTtcclxuXHRcclxuXHRpZih0eXBlb2YgYUZpbGUgPT09IFwic3RyaW5nXCIpXHRcclxuXHRcdHJldHVybiBuZXcgUHJvbWlzZSgocixlKSA9PiB7XHJcblx0XHRcdGNvbnN0IHNjcmlwdCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJzY3JpcHRcIik7XHJcblx0XHRcdHNjcmlwdC5hc3luYyA9IHRydWU7XHJcblx0XHRcdHNjcmlwdC5vbmxvYWQgPSBmdW5jdGlvbigpe3IoKX07XHJcblx0XHRcdHNjcmlwdC5vbmVycm9yID0gZnVuY3Rpb24oKXt0aHJvdyBuZXcgRXJyb3IoXCJsb2FkIGVycm9yIVwiKX07XHJcblx0XHRcdCFhVGFyZ2V0ID8gZG9jdW1lbnQuYm9keS5hcHBlbmQoc2NyaXB0KSA6IGFUYXJnZXQuYXBwZW5kKHNjcmlwdCk7XHJcblx0XHRcdHNjcmlwdC5zcmMgPSBhRmlsZTtcclxuXHRcdH0pO1xyXG5cdGVsc2VcclxuXHRcdHJldHVybiBQcm9taXNlLnJlamVjdChcIkZpcnN0IHBhcmFtZXRlciBtdXN0IGJlIGFuIGFycmF5IG9mIHN0cmluZ3Mgb3IgYSBzdHJpbmchXCIpO1xyXG59OyIsIi8qKlxyXG4gKiBBZGRzIHF1ZXJ5IGFuZCByZWFkeSBmdW5jdGlvbnMgdG8gRG9jdW1lbnQsIGFuZCB0cmlnZ2VycyB0aGUgcmVhZHkgZXZlbnQuXHJcbiAqXHJcbiAqIFRoZSBldmVudCBpcyB0cmlnZ2VyZWQgb25jZSB0aGUgZG9tIGlzIHBhcnNlZC4gQSByZWFkeSBmdW5jdGlvbiByZWdpc3RlcmVkXHJcbiAqIGFmdGVyIHRoYXQgaXMgbm90IGxvc3QsIGFzIHJlYWR5KCkgdHJpZ2dlcnMgdGhlIGV2ZW50IGFnYWluIHdoZW4gdGhlIGRvY3VtZW50XHJcbiAqIGlzIGFscmVhZHkgY29tcGxldGUuXHJcbiAqL1xyXG5pbXBvcnQgZXh0ZW5kUHJvdG90eXBlIGZyb20gXCIuLi91dGlscy9FeHRlbmRQcm90b3R5cGVcIjtcclxuaW1wb3J0IFF1ZXJ5U3VwcG9ydCBmcm9tIFwiLi9leHRlbnRpb25zL1F1ZXJ5U3VwcG9ydFwiO1xyXG5pbXBvcnQgUmVhZHlFdmVudFN1cHBvcnQsIHsgUkVBRFlFVkVOVCB9IGZyb20gXCIuL2V4dGVudGlvbnMvUmVhZHlFdmVudFN1cHBvcnRcIjtcclxuXHJcbmV4dGVuZFByb3RvdHlwZShEb2N1bWVudCwgUXVlcnlTdXBwb3J0LCBSZWFkeUV2ZW50U3VwcG9ydCk7XHJcblxyXG5kb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKFwiRE9NQ29udGVudExvYWRlZFwiLCAoKSA9PiBkb2N1bWVudC50cmlnZ2VyKFJFQURZRVZFTlQpKTtcclxuXHJcblxyXG5cclxuIiwiLyoqXHJcbiAqIEFkZHMgcXVlcnkgYW5kIGNvbnRlbnQgZnVuY3Rpb25zIHRvIERvY3VtZW50RnJhZ21lbnQuXHJcbiAqXHJcbiAqIEEgU2hhZG93Um9vdCBpcyBhIERvY3VtZW50RnJhZ21lbnQsIHNvIGEgc2hhZG93IHJvb3QgY2FuIGJlIHNlYXJjaGVkIGFuZCBmaWxsZWRcclxuICogdGhlIHNhbWUgd2F5IGFzIHRoZSBmcmFnbWVudCBjcmVhdGUoKSByZXR1cm5zLlxyXG4gKi9cclxuaW1wb3J0IGV4dGVuZFByb3RvdHlwZSBmcm9tIFwiLi4vdXRpbHMvRXh0ZW5kUHJvdG90eXBlXCI7XHJcbmltcG9ydCBRdWVyeVN1cHBvcnQgZnJvbSBcIi4vZXh0ZW50aW9ucy9RdWVyeVN1cHBvcnRcIjtcclxuaW1wb3J0IE1hbmlwdWxhdGlvblN1cHBvcnQgZnJvbSBcIi4vZXh0ZW50aW9ucy9NYW5pcHVsYXRpb25TdXBwb3J0XCI7XHJcblxyXG5leHRlbmRQcm90b3R5cGUoRG9jdW1lbnRGcmFnbWVudCwgUXVlcnlTdXBwb3J0LCBNYW5pcHVsYXRpb25TdXBwb3J0KTtcclxuXHJcblxyXG5cclxuXHJcbiIsIi8qKlxyXG4gKiBBZGRzIHF1ZXJ5LCBhdHRyaWJ1dGUgYW5kIGNvbnRlbnQgZnVuY3Rpb25zIHRvIEVsZW1lbnQuXHJcbiAqXHJcbiAqIFF1ZXJ5IGFuZCBhdHRyaWJ1dGUgZnVuY3Rpb25zIG5lZWQgYSBzZWxlY3RhYmxlIG5vZGUsIHdoaWNoIGlzIHdoeSB0aGV5IHNpdFxyXG4gKiBoZXJlIGFuZCBub3Qgb24gTm9kZS4gTWFuaXB1bGF0aW9uU3VwcG9ydCBpcyBhcHBsaWVkIGFnYWluIGFsdGhvdWdoIEVsZW1lbnRcclxuICogaW5oZXJpdHMgaXQgZnJvbSBOb2RlIC0gdGhhdCBwdXRzIHRoZSBmdW5jdGlvbnMgb24gRWxlbWVudCBhcyBvd24gcHJvcGVydGllcyxcclxuICogd2hlcmUgdGhlIGV4dGVuc2lvbnMgb2YgdGhlIG1vcmUgc3BlY2lmaWMgaHRtbCB0eXBlcyBjYW4gZmluZCB0aGVtLlxyXG4gKi9cclxuaW1wb3J0IGV4dGVuZFByb3RvdHlwZSBmcm9tIFwiLi4vdXRpbHMvRXh0ZW5kUHJvdG90eXBlXCI7XHJcbmltcG9ydCBRdWVyeVN1cHBvcnQgZnJvbSBcIi4vZXh0ZW50aW9ucy9RdWVyeVN1cHBvcnRcIjtcclxuaW1wb3J0IEF0dHJpYnV0ZVN1cHBvcnQgZnJvbSBcIi4vZXh0ZW50aW9ucy9BdHRyaWJ1dGVTdXBwb3J0XCI7XHJcbmltcG9ydCBNYW5pcHVsYXRpb25TdXBwb3J0IGZyb20gXCIuL2V4dGVudGlvbnMvTWFuaXB1bGF0aW9uU3VwcG9ydFwiO1xyXG5cclxuZXh0ZW5kUHJvdG90eXBlKEVsZW1lbnQsUXVlcnlTdXBwb3J0LCBBdHRyaWJ1dGVTdXBwb3J0LCBNYW5pcHVsYXRpb25TdXBwb3J0KTsiLCIvKipcbiAqIEFkZHMgdGhlIGV2ZW50IGZ1bmN0aW9ucyB0byBFdmVudFRhcmdldC5cbiAqXG4gKiBFdmVudFRhcmdldCBpcyB0aGUgcm9vdCBvZiBldmVyeXRoaW5nIGRpc3BhdGNoaW5nIGV2ZW50cywgbm90IG9ubHkgb2YgdGhlIGRvbSxcbiAqIHNvIG9uKCksIHJlbW92ZU9uKCkgYW5kIHRyaWdnZXIoKSBhcmUgYXZhaWxhYmxlIG9uIGV2ZXJ5IG5vZGUsIG9uIHRoZSBkb2N1bWVudFxuICogYW5kIG9uIHRoZSB3aW5kb3cgYWxpa2UuXG4gKi9cbmltcG9ydCBleHRlbmRQcm90b3R5cGUgZnJvbSBcIi4uL3V0aWxzL0V4dGVuZFByb3RvdHlwZVwiO1xuaW1wb3J0IEV2ZW50U3VwcG9ydCBmcm9tIFwiLi9leHRlbnRpb25zL0V2ZW50U3VwcG9ydFwiO1xuXG5leHRlbmRQcm90b3R5cGUoRXZlbnRUYXJnZXQsIEV2ZW50U3VwcG9ydCk7IiwiLyoqXHJcbiAqIEFkZHMgY2xhc3MgYW5kIHZpc2liaWxpdHkgZnVuY3Rpb25zIHRvIEhUTUxFbGVtZW50LlxyXG4gKlxyXG4gKiBCb3RoIHdvcmsgb24gdGhlIHN0eWxlIGFuZCB0aGUgY2xhc3NMaXN0IG9mIGEgaHRtbCBlbGVtZW50LCB3aGljaCBpcyB3aHkgdGhleVxyXG4gKiBzaXQgaGVyZSBhbmQgbm90IG9uIEVsZW1lbnQgLSBhbiBzdmcgZWxlbWVudCBoYXMgbmVpdGhlciBpbiB0aGUgc2FtZSB3YXkuXHJcbiAqL1xyXG5pbXBvcnQgZXh0ZW5kUHJvdG90eXBlIGZyb20gXCIuLi91dGlscy9FeHRlbmRQcm90b3R5cGVcIjtcclxuaW1wb3J0IEh0bWxDbGFzc1N1cHBvcnQgZnJvbSBcIi4vZXh0ZW50aW9ucy9IdG1sQ2xhc3NTdXBwb3J0XCI7XHJcbmltcG9ydCBTaG93SGlkZVN1cHBvcnQgZnJvbSBcIi4vZXh0ZW50aW9ucy9TaG93SGlkZVN1cHBvcnRcIjtcclxuXHJcblxyXG5leHRlbmRQcm90b3R5cGUoSFRNTEVsZW1lbnQsIEh0bWxDbGFzc1N1cHBvcnQsIFNob3dIaWRlU3VwcG9ydCk7IiwiLyoqXHJcbiAqIEFkZHMgdmFsKCkgdG8gSFRNTElucHV0RWxlbWVudC5cclxuICpcclxuICogVmFsdWVTdXBwb3J0IHBpY2tzIHRoZSBoYW5kbGluZyBieSB0aGUgdHlwZSBvZiB0aGUgaW5wdXQsIHNvIGEgY2hlY2tib3ggYW5kIGFcclxuICogcmFkaW8gYXJlIHJlYWQgYnkgdGhlaXIgY2hlY2tlZCBzdGF0ZSB3aGlsZSBldmVyeSBvdGhlciBpbnB1dCBpcyByZWFkIGJ5IGl0c1xyXG4gKiB2YWx1ZS5cclxuICovXHJcbmltcG9ydCBleHRlbmRQcm90b3R5cGUgZnJvbSBcIi4uL3V0aWxzL0V4dGVuZFByb3RvdHlwZVwiO1xyXG5pbXBvcnQgVmFsdWVTdXBwb3J0IGZyb20gXCIuL2V4dGVudGlvbnMvVmFsdWVTdXBwb3J0XCI7XHJcblxyXG5cclxuZXh0ZW5kUHJvdG90eXBlKEhUTUxJbnB1dEVsZW1lbnQsVmFsdWVTdXBwb3J0KTsiLCIvKipcclxuICogQWRkcyB2YWwoKSB0byBIVE1MU2VsZWN0RWxlbWVudC5cclxuICpcclxuICogVmFsdWVTdXBwb3J0IHJlYWRzIGEgc2VsZWN0IGJ5IGl0cyBzZWxlY3RlZCBvcHRpb25zLCBzbyB2YWwoKSBnaXZlcyBhbiBhcnJheSBvZlxyXG4gKiB0aGVpciB2YWx1ZXMgYW5kIHRha2VzIG9uZSB0byBzZWxlY3QgdGhlbSBhZ2Fpbi5cclxuICovXHJcbmltcG9ydCBleHRlbmRQcm90b3R5cGUgZnJvbSBcIi4uL3V0aWxzL0V4dGVuZFByb3RvdHlwZVwiO1xyXG5pbXBvcnQgVmFsdWVTdXBwb3J0IGZyb20gXCIuL2V4dGVudGlvbnMvVmFsdWVTdXBwb3J0XCI7XHJcblxyXG5cclxuZXh0ZW5kUHJvdG90eXBlKEhUTUxTZWxlY3RFbGVtZW50LFZhbHVlU3VwcG9ydCk7IiwiLyoqXHJcbiAqIEFkZHMgdmFsKCkgdG8gSFRNTFRleHRBcmVhRWxlbWVudC5cclxuICpcclxuICogQSB0ZXh0YXJlYSBtYXRjaGVzIG5vbmUgb2YgdGhlIHNwZWNpYWwgaW5wdXQgdHlwZXMsIHNvIFZhbHVlU3VwcG9ydCBmYWxscyBiYWNrXHJcbiAqIHRvIHJlYWRpbmcgYW5kIHdyaXRpbmcgaXRzIHZhbHVlIC0gYW5kIHRyaWdnZXJzIGFuIGlucHV0IGV2ZW50IHdoZW4gaXQgaXMgc2V0LFxyXG4gKiB0aGUgc2FtZSBhcyBhbnkgb3RoZXIgZmllbGQuXHJcbiAqL1xyXG5pbXBvcnQgZXh0ZW5kUHJvdG90eXBlIGZyb20gXCIuLi91dGlscy9FeHRlbmRQcm90b3R5cGVcIjtcclxuaW1wb3J0IFZhbHVlU3VwcG9ydCBmcm9tIFwiLi9leHRlbnRpb25zL1ZhbHVlU3VwcG9ydFwiO1xyXG5cclxuXHJcbmV4dGVuZFByb3RvdHlwZShIVE1MVGV4dEFyZWFFbGVtZW50LCBWYWx1ZVN1cHBvcnQpO1xyXG4iLCIvKipcbiAqIEJ1aWxkcyBIVE1MQ29sbGVjdGlvbiBhcyBhIGxpc3Qgb2YgaHRtbCBlbGVtZW50cy5cbiAqXG4gKiBTYW1lIGFzIE5vZGVMaXN0LCBvbmx5IGhvbGRpbmcgaHRtbCBlbGVtZW50cyAtIGEgbGl2ZSBjb2xsZWN0aW9uIGxpa2UgY2hpbGRyZW5cbiAqIHRoZXJlZm9yZSBrZWVwcyBpdHMgdHlwZSB3aGVuIGl0IGlzIGZpbHRlcmVkLlxuICovXG5pbXBvcnQgYnVpbGRMaXN0VHlwZSBmcm9tIFwiLi9leHRlbnRpb25zL0xpc3RUeXBlQnVpbGRlclwiO1xuXG5idWlsZExpc3RUeXBlKEhUTUxDb2xsZWN0aW9uLCBIVE1MRWxlbWVudCk7XG4iLCIvKipcclxuICogQWRkcyBkYXRhIGFuZCBjb250ZW50IGZ1bmN0aW9ucyB0byBOb2RlLlxyXG4gKlxyXG4gKiBOb2RlIGlzIHRoZSBjb21tb24gYmFzZSBvZiBlbGVtZW50cywgdGV4dCBub2RlcyBhbmQgZnJhZ21lbnRzLCBzbyBkYXRhKCkgYW5kXHJcbiAqIHRoZSBpbnNlcnQgZnVuY3Rpb25zIHdvcmsgb24gYWxsIG9mIHRoZW0sIG5vdCBvbmx5IG9uIGVsZW1lbnRzLlxyXG4gKi9cclxuaW1wb3J0IGV4dGVuZFByb3RvdHlwZSBmcm9tIFwiLi4vdXRpbHMvRXh0ZW5kUHJvdG90eXBlXCI7XHJcbmltcG9ydCBEYXRhU3VwcG9ydCBmcm9tIFwiLi9leHRlbnRpb25zL0RhdGFTdXBwb3J0XCI7XHJcbmltcG9ydCBNYW5pcHVsYXRpb25TdXBwb3J0IGZyb20gXCIuL2V4dGVudGlvbnMvTWFuaXB1bGF0aW9uU3VwcG9ydFwiO1xyXG5cclxuZXh0ZW5kUHJvdG90eXBlKE5vZGUsRGF0YVN1cHBvcnQsTWFuaXB1bGF0aW9uU3VwcG9ydCk7IiwiLyoqXG4gKiBCdWlsZHMgTm9kZUxpc3QgYXMgYSBsaXN0IG9mIG5vZGVzLlxuICpcbiAqIEJlc2lkZXMgdGhlIGxpc3QgZnVuY3Rpb25zIHRoaXMgZ2l2ZXMgYSBOb2RlTGlzdCBldmVyeSBmdW5jdGlvbiBvZiBhIG5vZGUsIGJ5XG4gKiBkZWxlZ2F0aW9uIC0gY2FsbGluZyBvbmUgYXBwbGllcyBpdCB0byBlYWNoIG5vZGUgYW5kIGNvbGxlY3RzIHRoZSByZXN1bHRzLlxuICovXG5pbXBvcnQgYnVpbGRMaXN0VHlwZSBmcm9tIFwiLi9leHRlbnRpb25zL0xpc3RUeXBlQnVpbGRlclwiO1xuXG5idWlsZExpc3RUeXBlKE5vZGVMaXN0LCBOb2RlKTtcbiIsImltcG9ydCBFeHRlbmRlciBmcm9tIFwiLi4vLi4vdXRpbHMvRXh0ZW5kZXJcIjtcclxuXHJcbmNvbnN0IHN1cHBvcnQgPSBFeHRlbmRlcihcIkF0dHJpYnV0ZVN1cHBvcnRcIiwgKFByb3RvdHlwZSkgPT4ge1xyXG5cdC8qKlxyXG5cdCAqIEdldHMgb3Igc2V0cyBhdHRyaWJ1dGVzIG9mIHRoaXMgZWxlbWVudC5cclxuXHQgKlxyXG5cdCAqIGF0dHIoKSByZXR1cm5zIGFsbCBhdHRyaWJ1dGVzIGFzIGFuIG9iamVjdCwgYXR0cihuYW1lKSB0aGUgdmFsdWUgb2YgYSBzaW5nbGVcclxuXHQgKiBvbmUuIFdpdGggYSBzZWNvbmQgYXJndW1lbnQgdGhlIGF0dHJpYnV0ZSBpcyBzZXQsIHdpdGggbnVsbCBvciB1bmRlZmluZWQgaXRcclxuXHQgKiBnZXRzIHJlbW92ZWQuXHJcblx0ICpcclxuXHQgKiBWYWx1ZXMgYXJlIHN0cmluZ2lmaWVkIGJ5IHNldEF0dHJpYnV0ZSwgc28gYXR0cihuYW1lLCAwKSBzZXRzIFwiMFwiLiBPbmx5IG51bGxcclxuXHQgKiBhbmQgdW5kZWZpbmVkIHJlbW92ZSBhbiBhdHRyaWJ1dGUgLSAwLCBmYWxzZSBhbmQgXCJcIiBhcmUgcmVndWxhciB2YWx1ZXMuXHJcblx0ICpcclxuXHQgKiBAcGFyYW0ge3N0cmluZ30gW2FOYW1lXSAtIHRoZSBhdHRyaWJ1dGUgbmFtZVxyXG5cdCAqIEBwYXJhbSB7Kn0gW2FWYWx1ZV0gLSB0aGUgbmV3IHZhbHVlLCBudWxsIG9yIHVuZGVmaW5lZCByZW1vdmVzIHRoZSBhdHRyaWJ1dGVcclxuXHQgKiBAcmV0dXJucyB7T2JqZWN0PHN0cmluZyxzdHJpbmc+fHN0cmluZ3xFbGVtZW50fSBhbGwgYXR0cmlidXRlcywgdGhlIHZhbHVlIG9mIHRoZSByZXF1ZXN0ZWQgYXR0cmlidXRlIChudWxsIHdoZW4gaXQgZG9lcyBub3QgZXhpc3QpLCBvciB0aGlzIHdoZW4gYW4gYXR0cmlidXRlIHdhcyBzZXQgb3IgcmVtb3ZlZFxyXG5cdCAqL1xyXG5cdFByb3RvdHlwZS5hdHRyID0gZnVuY3Rpb24gKCkge1xyXG5cdFx0aWYgKGFyZ3VtZW50cy5sZW5ndGggPT0gMCkge1xyXG5cdFx0XHRjb25zdCByZXN1bHQgPSB7fTtcclxuXHRcdFx0dGhpcy5nZXRBdHRyaWJ1dGVOYW1lcygpLmZvckVhY2goKG5hbWUpID0+IHtcclxuXHRcdFx0XHRyZXN1bHRbbmFtZV0gPSB0aGlzLmdldEF0dHJpYnV0ZShuYW1lKTtcclxuXHRcdFx0fSk7XHJcblx0XHRcdHJldHVybiByZXN1bHQ7XHJcblx0XHR9IGVsc2UgaWYgKGFyZ3VtZW50cy5sZW5ndGggPT0gMSkgcmV0dXJuIHRoaXMuZ2V0QXR0cmlidXRlKGFyZ3VtZW50c1swXSk7XHJcblx0XHRlbHNlIGlmIChhcmd1bWVudHNbMV0gPT0gbnVsbCkgdGhpcy5yZW1vdmVBdHRyaWJ1dGUoYXJndW1lbnRzWzBdKTtcclxuXHRcdGVsc2UgdGhpcy5zZXRBdHRyaWJ1dGUoYXJndW1lbnRzWzBdLCBhcmd1bWVudHNbMV0pO1xyXG5cclxuXHRcdHJldHVybiB0aGlzO1xyXG5cdH07XHJcbn0pO1xyXG5leHBvcnQgZGVmYXVsdCBzdXBwb3J0O1xyXG4iLCJpbXBvcnQgRXh0ZW5kZXIgZnJvbSBcIi4uLy4uL3V0aWxzL0V4dGVuZGVyXCI7XHJcbmNvbnN0IHN1cHBvcnQgPSBFeHRlbmRlcihcIkRhdGFTdXBwb3J0XCIsIFByb3RvdHlwZSA9PiB7XHJcblxyXG5cdC8qKlxyXG5cdCAqIFJlYWRzIGFsbCBkYXRhLSBhdHRyaWJ1dGVzIG9mIGEgbm9kZSBpbnRvIGEgcGxhaW4gb2JqZWN0LlxyXG5cdCAqXHJcblx0ICogQHBhcmFtIHtOb2RlfSBlbGVtZW50XHJcblx0ICogQHJldHVybnMge09iamVjdDxzdHJpbmcsc3RyaW5nPn0gdGhlIGRhdGFzZXQgb2YgdGhlIG5vZGUsIGVtcHR5IHdoZW4gaXQgaGFzIG5vbmVcclxuXHQgKi9cclxuXHRjb25zdCBsb2FkRGF0YSA9IChlbGVtZW50KSA9PiB7XHJcblx0XHRjb25zdCBkYXRhID0ge307XHJcblx0XHRpZiAodHlwZW9mIGVsZW1lbnQuZGF0YXNldCAhPT0gXCJ1bmRlZmluZWRcIilcclxuXHRcdFx0Zm9yIChjb25zdCBuYW1lIGluIGVsZW1lbnQuZGF0YXNldClcclxuXHRcdFx0XHRkYXRhW25hbWVdID0gZWxlbWVudC5kYXRhc2V0W25hbWVdO1xyXG5cdFx0cmV0dXJuIGRhdGE7XHJcblx0fVxyXG5cclxuXHQvKipcclxuXHQgKiBHZXRzIG9yIHNldHMgdGhlIGRhdGEgb2YgdGhpcyBub2RlLlxyXG5cdCAqXHJcblx0ICogVGhlIGZpcnN0IGNhbGwgcmVhZHMgdGhlIGRhdGEtIGF0dHJpYnV0ZXMgaW50byBhIGNhY2hlLCB3aGljaCBpcyBrZXB0IG9uIHRoZVxyXG5cdCAqIG5vZGUgZnJvbSB0aGVuIG9uLiBUaGF0IGNhY2hlIGlzIGRldGFjaGVkIGZyb20gdGhlIGRvbTogbGF0ZXIgYXR0cmlidXRlXHJcblx0ICogY2hhbmdlcyBhcmUgbm90IHNlZW4gYW5kIHdyaXR0ZW4gdmFsdWVzIGFyZSBub3QgcmVmbGVjdGVkIGJhY2suIGRhdGEodHJ1ZSlcclxuXHQgKiByZWFkcyB0aGUgYXR0cmlidXRlcyBhZ2Fpbi5cclxuXHQgKlxyXG5cdCAqIFJlbG9hZGluZyBtZXJnZXMsIGl0IGRvZXMgbm90IHN5bmMgLSBhIHZhbHVlIHJlbW92ZWQgZnJvbSB0aGUgZG9tIHN0YXlzIGluXHJcblx0ICogdGhlIGNhY2hlLCBhcyBpdCBjYW4gbm90IGJlIHRvbGQgYXBhcnQgZnJvbSBhIHZhbHVlIHRoYXQgbmV2ZXIgY2FtZSBmcm9tIHRoZVxyXG5cdCAqIGRvbS5cclxuXHQgKlxyXG5cdCAqIEBwYXJhbSB7c3RyaW5nfGJvb2xlYW59IFthTmFtZV0gLSBhIG5hbWUgdG8gcmVhZCBvciB3cml0ZSwgb3IgYSBib29sZWFuIHRvIHJlYWQgYWxsIGRhdGEsIHJlbG9hZGluZyB0aGUgYXR0cmlidXRlcyBmaXJzdCB3aGVuIHRydWVcclxuXHQgKiBAcGFyYW0geyp9IFthVmFsdWVdIC0gdGhlIG5ldyB2YWx1ZSwgbnVsbCBvciB1bmRlZmluZWQgcmVtb3ZlcyB0aGUgbmFtZVxyXG5cdCAqIEByZXR1cm5zIHtPYmplY3Q8c3RyaW5nLCo+fCp8Tm9kZX0gYWxsIGRhdGEsIHRoZSB2YWx1ZSBvZiB0aGUgZ2l2ZW4gbmFtZSwgb3IgdGhpcyB3aGVuIGEgdmFsdWUgd2FzIHdyaXR0ZW5cclxuXHQgKiBAdGhyb3dzIHtFcnJvcn0gd2hlbiB0aGUgZmlyc3QgYXJndW1lbnQgaXMgbmVpdGhlciBhIHN0cmluZyBub3IgYSBib29sZWFuXHJcblx0ICovXHJcblx0UHJvdG90eXBlLmRhdGEgPSBmdW5jdGlvbigpIHtcclxuXHRcdGNvbnN0IGRhdGEgPSBsb2FkRGF0YSh0aGlzKTtcclxuXHRcdHRoaXMuZGF0YSA9IChmdW5jdGlvbigpIHtcclxuXHRcdFx0aWYgKGFyZ3VtZW50cy5sZW5ndGggPT0gMClcclxuXHRcdFx0XHRyZXR1cm4gZGF0YTtcclxuXHRcdFx0Y29uc3QgYXJnMSA9IGFyZ3VtZW50c1swXTtcclxuXHRcdFx0Y29uc3QgdHlwZSA9IHR5cGVvZiBhcmcxO1xyXG5cdFx0XHRpZih0eXBlID09PSBcImJvb2xlYW5cIil7XHJcblx0XHRcdFx0aWYoYXJnMSlcclxuXHRcdFx0XHRcdE9iamVjdC5hc3NpZ24oZGF0YSwgbG9hZERhdGEodGhpcykpO1xyXG5cdFx0XHRcdHJldHVybiBkYXRhO1xyXG5cdFx0XHR9XHJcblxyXG5cdFx0XHRpZih0eXBlICE9PSBcInN0cmluZ1wiKVxyXG5cdFx0XHRcdHRocm93IG5ldyBFcnJvcihcImRhdGEoKSBleHBlY3RzIGEgc3RyaW5nIG9yIGJvb2xlYW4gYXMgZmlyc3QgYXJndW1lbnQgb3Igbm8gYXJndW1lbnRzIGF0IGFsbFwiKTtcclxuXHRcdFx0XHJcblx0XHRcdGlmIChhcmd1bWVudHMubGVuZ3RoID09IDEpXHJcblx0XHRcdFx0cmV0dXJuIGRhdGFbYXJnMV07XHJcblx0XHRcdGVsc2UgaWYgKGFyZ3VtZW50c1sxXSA9PSBudWxsKVxyXG5cdFx0XHRcdGRlbGV0ZSBkYXRhW2FyZ3VtZW50c1swXV07XHJcblx0XHRcdGVsc2VcclxuXHRcdFx0XHRkYXRhW2FyZ3VtZW50c1swXV0gPSBhcmd1bWVudHNbMV07XHJcblxyXG5cdFx0XHRyZXR1cm4gdGhpcztcclxuXHRcdH0pLmJpbmQodGhpcyk7XHJcblxyXG5cdFx0cmV0dXJuIHRoaXMuZGF0YS5hcHBseShudWxsLCBhcmd1bWVudHMpO1xyXG5cdH07XHJcbn0pO1xyXG5leHBvcnQgZGVmYXVsdCBzdXBwb3J0OyIsImltcG9ydCBFeHRlbmRlciBmcm9tIFwiLi4vLi4vdXRpbHMvRXh0ZW5kZXJcIjtcclxuXHJcbmNvbnN0IEVWRU5UU1BMSVRFUiA9IC9cXHMqLFxccyp8XFxzKy87XHJcbmNvbnN0IERFRkFVTFRfT1BUSU9OUyA9IHsgY2FwdHVyZTogZmFsc2UsIG9uY2U6IGZhbHNlLCBwYXNzaXZlOiBmYWxzZSwgc2lnbmFsOiB1bmRlZmluZWQgfTtcclxuXHJcbi8qKlxyXG4gKiBFdmVyeXRoaW5nIHRoaXMgZXh0ZW5zaW9uIGtlZXBzIHBlciBlbGVtZW50LiBBIFdlYWtNYXAgaG9sZHMgaXQgb3V0c2lkZSBvZiB0aGVcclxuICogZWxlbWVudCwgc28gbm90aGluZyBpcyBleHBvc2VkIG9uIHRoZSBkb20gYW5kIGl0IGlzIHJlbGVhc2VkIHdpdGggdGhlIGVsZW1lbnQuXHJcbiAqXHJcbiAqIFdyYXBwZXJzIGFuZCBoYW5kbGVzIGFyZSBtYXBwZWQgaW4gYm90aCBkaXJlY3Rpb25zOiBhIHdyYXBwZXIgbmVlZHMgdG8gZmluZCBpdHNcclxuICogcmVnaXN0cmF0aW9uIHdoaWxlIGFuIGV2ZW50IHJ1bnMsIGFuZCByZW1vdmVPbiBuZWVkcyB0byBmaW5kIGFsbCB3cmFwcGVycyBvZiBhXHJcbiAqIGhhbmRsZS4gSGFuZGxlcyBhcmUgbWFwcGVkIHRvIGEgc2V0IG9mIHdyYXBwZXJzLCBub3QgdG8gYSBzaW5nbGUgb25lLCBzbyB0aGVcclxuICogc2FtZSBoYW5kbGUgY2FuIGJlIHJlZ2lzdGVyZWQgYW55IG51bWJlciBvZiB0aW1lcyB3aXRob3V0IHRoZSByZWdpc3RyYXRpb25zXHJcbiAqIG92ZXJ3cml0aW5nIGVhY2ggb3RoZXIuXHJcbiAqXHJcbiAqIEB0eXBlZGVmIHtPYmplY3R9IEVsZW1lbnREYXRhXHJcbiAqIEBwcm9wZXJ0eSB7TWFwPHN0cmluZyxudW1iZXI+fSBldmVudFRyaWdnZXJUaW1lb3V0cyAtIHJ1bm5pbmcgdHJpZ2dlciB0aW1lb3V0cyBieSBldmVudCB0eXBlXHJcbiAqIEBwcm9wZXJ0eSB7TWFwPEZ1bmN0aW9uLFJlZ2lzdHJhdGlvbj59IHdyYXBwZXJIYW5kbGVNYXAgLSByZWdpc3RyYXRpb24gb2YgZWFjaCB3cmFwcGVyXHJcbiAqIEBwcm9wZXJ0eSB7TWFwPEZ1bmN0aW9uLFNldDxGdW5jdGlvbj4+fSBoYW5kbGVXcmFwcGVyTWFwIC0gYWxsIHdyYXBwZXJzIG9mIGEgaGFuZGxlXHJcbiAqL1xyXG5cclxuLyoqXHJcbiAqIE9uZSBjYWxsIG9mIG9uKCkuXHJcbiAqXHJcbiAqIEB0eXBlZGVmIHtPYmplY3R9IFJlZ2lzdHJhdGlvblxyXG4gKiBAcHJvcGVydHkge0Z1bmN0aW9ufSBoYW5kbGUgLSB0aGUgZnVuY3Rpb24gZ2l2ZW4gdG8gb24oKVxyXG4gKiBAcHJvcGVydHkge1NldDxzdHJpbmc+fSBldmVudHMgLSB0aGUgZXZlbnQgdHlwZXMgc3RpbGwgcmVnaXN0ZXJlZCwgbGlzdGVuZXJzIGdldCByZW1vdmVkIG9uZSBieSBvbmVcclxuICogQHByb3BlcnR5IHtPYmplY3R9IG9wdGlvbnMgLSB0aGUgb3B0aW9ucyB0aGUgbGlzdGVuZXIgd2FzIGFkZGVkIHdpdGgsIG5lZWRlZCB0byByZW1vdmUgaXQgYWdhaW5cclxuICovXHJcblxyXG5jb25zdCBFTEVNRU5UREFUQSA9IG5ldyBXZWFrTWFwKCk7XHJcblxyXG4vKipcclxuICogQHBhcmFtIHtFdmVudFRhcmdldH0gZWxlbWVudFxyXG4gKiBAcmV0dXJucyB7RWxlbWVudERhdGF9IHRoZSBkYXRhIG9mIHRoZSBlbGVtZW50LCBjcmVhdGVkIG9uIGZpcnN0IGFjY2Vzc1xyXG4gKi9cclxuY29uc3QgZ2V0RWxlbWVudERhdGEgPSAoZWxlbWVudCkgPT4ge1xyXG5cdGlmICghRUxFTUVOVERBVEEuaGFzKGVsZW1lbnQpKVxyXG5cdFx0RUxFTUVOVERBVEEuc2V0KGVsZW1lbnQsIHtcclxuXHRcdFx0ZXZlbnRUcmlnZ2VyVGltZW91dHM6IG5ldyBNYXAoKSxcclxuXHRcdFx0d3JhcHBlckhhbmRsZU1hcDogbmV3IE1hcCgpLFxyXG5cdFx0XHRoYW5kbGVXcmFwcGVyTWFwOiBuZXcgTWFwKClcclxuXHRcdH0pO1xyXG5cclxuXHRyZXR1cm4gRUxFTUVOVERBVEEuZ2V0KGVsZW1lbnQpO1xyXG59O1xyXG5cclxuY29uc3QgZ2V0V3JhcHBlckhhbmRsZU1hcCA9IChlbGVtZW50KSA9PiB7XHJcblx0cmV0dXJuIGdldEVsZW1lbnREYXRhKGVsZW1lbnQpLndyYXBwZXJIYW5kbGVNYXA7XHJcbn07XHJcblxyXG5jb25zdCBnZXRIYW5kbGVXcmFwcGVyTWFwID0gKGVsZW1lbnQpID0+IHtcclxuXHRyZXR1cm4gZ2V0RWxlbWVudERhdGEoZWxlbWVudCkuaGFuZGxlV3JhcHBlck1hcDtcclxufTtcclxuXHJcbmNvbnN0IGdldFRyaWdnZXJUaW1lb3V0cyA9IChlbGVtZW50KSA9PiB7XHJcblx0cmV0dXJuIGdldEVsZW1lbnREYXRhKGVsZW1lbnQpLmV2ZW50VHJpZ2dlclRpbWVvdXRzO1xyXG59O1xyXG5cclxuLyoqXHJcbiAqIFJlZ2lzdGVycyBhIHdyYXBwZXIgaW4gYm90aCBkaXJlY3Rpb25zLlxyXG4gKlxyXG4gKiBAcGFyYW0ge0V2ZW50VGFyZ2V0fSBhbkVsZW1lbnRcclxuICogQHBhcmFtIHtGdW5jdGlvbn0gYUhhbmRsZSAtIHRoZSBmdW5jdGlvbiBnaXZlbiB0byBvbigpXHJcbiAqIEBwYXJhbSB7RnVuY3Rpb259IGFXcmFwcGVyIC0gdGhlIGxpc3RlbmVyIGFjdHVhbGx5IGFkZGVkIHRvIHRoZSBlbGVtZW50XHJcbiAqIEBwYXJhbSB7SXRlcmFibGU8c3RyaW5nPn0gdGhlRXZlbnRzXHJcbiAqIEBwYXJhbSB7T2JqZWN0fSB0aGVPcHRpb25zIC0ga2VwdCB0byByZW1vdmUgdGhlIGxpc3RlbmVyIHdpdGggdGhlIHNhbWUgb3B0aW9ucyBsYXRlclxyXG4gKiBAdGhyb3dzIHtFcnJvcn0gd2hlbiB0aGUgd3JhcHBlciBpcyBhbHJlYWR5IHJlZ2lzdGVyZWQsIHdoaWNoIGNhbiBub3QgaGFwcGVuIGFzIGxvbmcgYXMgb24oKSBjcmVhdGVzIGEgbmV3IG9uZSBwZXIgY2FsbFxyXG4gKi9cclxuY29uc3QgcmVnaXN0cmF0ZUhhbmRsZVdyYXBwZXIgPSAoYW5FbGVtZW50LCBhSGFuZGxlLCBhV3JhcHBlciwgdGhlRXZlbnRzLCB0aGVPcHRpb25zKSA9PiB7XHJcblx0Y29uc3Qgd3JhcHBlckhhbmRsZU1hcCA9IGdldFdyYXBwZXJIYW5kbGVNYXAoYW5FbGVtZW50KTtcclxuXHRpZiAoIXdyYXBwZXJIYW5kbGVNYXAuaGFzKGFXcmFwcGVyKSkgd3JhcHBlckhhbmRsZU1hcC5zZXQoYVdyYXBwZXIsIHsgaGFuZGxlOiBhSGFuZGxlLCBldmVudHM6IG5ldyBTZXQodGhlRXZlbnRzKSwgb3B0aW9uczogdGhlT3B0aW9ucyB9KTtcclxuXHRlbHNlIHRocm93IG5ldyBFcnJvcihcIldyYXBwZXIgYWxyZWFkeSByZWdpc3RlcmVkIGZvciB0aGlzIGVsZW1lbnQhXCIpO1xyXG5cclxuXHRjb25zdCBoYW5kbGVXcmFwcGVyTWFwID0gZ2V0SGFuZGxlV3JhcHBlck1hcChhbkVsZW1lbnQpO1xyXG5cdGxldCB3cmFwcGVyU2V0ID0gaGFuZGxlV3JhcHBlck1hcC5nZXQoYUhhbmRsZSk7XHJcblx0aWYgKCF3cmFwcGVyU2V0KSB7XHJcblx0XHR3cmFwcGVyU2V0ID0gbmV3IFNldCgpO1xyXG5cdFx0aGFuZGxlV3JhcHBlck1hcC5zZXQoYUhhbmRsZSwgd3JhcHBlclNldCk7XHJcblx0fVx0XHJcblx0d3JhcHBlclNldC5hZGQoYVdyYXBwZXIpO1x0XHJcbn07XHJcblxyXG4vKipcclxuICogUmVtb3ZlcyBhIHdyYXBwZXIgZnJvbSBzb21lIG9yIGFsbCBvZiBpdHMgZXZlbnRzLlxyXG4gKlxyXG4gKiBUaGUgcmVnaXN0cmF0aW9uIGlzIGRyb3BwZWQgZnJvbSBib3RoIG1hcHMgYXMgc29vbiBhcyBubyBldmVudCBpcyBsZWZ0LCBzbyBhXHJcbiAqIHdyYXBwZXIgdGhhdCBzdGlsbCBsaXN0ZW5zIHRvIG90aGVyIGV2ZW50cyBzdGF5cyBrbm93bi5cclxuICpcclxuICogQHBhcmFtIHtFdmVudFRhcmdldH0gYUVsZW1lbnRcclxuICogQHBhcmFtIHtGdW5jdGlvbn0gYVdyYXBwZXJcclxuICogQHBhcmFtIHtJdGVyYWJsZTxzdHJpbmc+fSBbdGhlRXZlbnRzXSAtIHRoZSBldmVudHMgdG8gcmVtb3ZlLCBhbGwgb2YgdGhlbSB3aGVuIG9taXR0ZWRcclxuICovXHJcbmNvbnN0IHJlbW92ZVdyYXBwZXIgPSAoYUVsZW1lbnQsIGFXcmFwcGVyLCB0aGVFdmVudHMpID0+IHtcclxuXHRjb25zdCB3cmFwcGVySGFuZGxlTWFwID0gZ2V0V3JhcHBlckhhbmRsZU1hcChhRWxlbWVudCk7XHJcblx0aWYoIXdyYXBwZXJIYW5kbGVNYXAuaGFzKGFXcmFwcGVyKSkgdGhyb3cgbmV3IEVycm9yKFwiV3JhcHBlciBub3QgcmVnaXN0ZXJlZCBmb3IgdGhpcyBlbGVtZW50IVwiKTtcclxuXHRjb25zdCB7IGV2ZW50cywgb3B0aW9ucywgaGFuZGxlIH0gPSB3cmFwcGVySGFuZGxlTWFwLmdldChhV3JhcHBlcik7XHJcblx0Y29uc3QgcmVtb3ZlZEV2ZW50cyA9IHRoZUV2ZW50cyB8fCBldmVudHM7XHJcblx0Zm9yIChsZXQgZXZlbnQgb2YgcmVtb3ZlZEV2ZW50cykge1xyXG5cdFx0aWYgKGV2ZW50cy5oYXMoZXZlbnQpKSB7XHJcblx0XHRcdGV2ZW50cy5kZWxldGUoZXZlbnQpO1xyXG5cdFx0XHRhRWxlbWVudC5yZW1vdmVFdmVudExpc3RlbmVyKGV2ZW50LCBhV3JhcHBlciwgb3B0aW9ucyk7XHJcblx0XHR9XHJcblx0fVxyXG5cdC8vQ2xlYW51cCB0aGUgd3JhcHBlckhhbmRsZU1hcCBhbmQgaGFuZGxlV3JhcHBlck1hcCBpZiBubyBldmVudHMgbGVmdCBmb3IgdGhpcyB3cmFwcGVyXHJcblx0aWYgKGV2ZW50cy5zaXplID09PSAwKXtcclxuXHRcdHdyYXBwZXJIYW5kbGVNYXAuZGVsZXRlKGFXcmFwcGVyKTtcclxuXHRcdGNvbnN0IGhhbmRsZVdyYXBwZXJNYXAgPSBnZXRIYW5kbGVXcmFwcGVyTWFwKGFFbGVtZW50KTtcclxuXHRcdGNvbnN0IHdyYXBwZXJTZXQgPSBoYW5kbGVXcmFwcGVyTWFwLmdldChoYW5kbGUpO1xyXG5cdFx0d3JhcHBlclNldC5kZWxldGUoYVdyYXBwZXIpO1xyXG5cdFx0aWYgKHdyYXBwZXJTZXQuc2l6ZSA9PT0gMClcclxuXHRcdFx0aGFuZGxlV3JhcHBlck1hcC5kZWxldGUoaGFuZGxlKTtcclxuXHR9XHJcbn07XHJcblxyXG4vKipcclxuICogQHBhcmFtIHtib29sZWFufE9iamVjdH0gW29wdGlvbnNdIC0gYSBib29sZWFuIGlzIHRha2VuIGFzIGNhcHR1cmUsIGFuIG9iamVjdCBpcyBtZXJnZWQgaW50byB0aGUgZGVmYXVsdHNcclxuICogQHJldHVybnMge09iamVjdH0gYWx3YXlzIGEgbmV3IG9iamVjdCwgbmV2ZXIgdGhlIHNoYXJlZCBkZWZhdWx0c1xyXG4gKi9cclxuY29uc3QgdG9FdmVudE9wdGlvbnMgPSAob3B0aW9ucykgPT4ge1xyXG5cdGlmIChvcHRpb25zID09IG51bGwpIHJldHVybiBPYmplY3QuYXNzaWduKHt9LCBERUZBVUxUX09QVElPTlMpO1xyXG5cdGVsc2UgaWYgKHR5cGVvZiBvcHRpb25zID09PSBcImJvb2xlYW5cIikgcmV0dXJuIE9iamVjdC5hc3NpZ24oe30sIERFRkFVTFRfT1BUSU9OUywgeyBjYXB0dXJlOiBvcHRpb25zIH0pO1xyXG5cdGVsc2UgcmV0dXJuIE9iamVjdC5hc3NpZ24oe30sIERFRkFVTFRfT1BUSU9OUywgb3B0aW9ucyk7XHJcbn07XHJcblxyXG4vKipcclxuICogTm9ybWFsaXplcyBldmVudCB0eXBlcyB0byBhIGZsYXQgbGlzdC5cclxuICpcclxuICogVHlwZXMgYXJlIHNlcGFyYXRlZCBieSB3aGl0ZXNwYWNlcywgY29tbWFzIG9yIGJvdGgsIGluIGEgc3RyaW5nIGFzIHdlbGwgYXNcclxuICogd2l0aGluIHRoZSBlbnRyaWVzIG9mIGFuIGFycmF5IC0gc28gW1wiY2xpY2tcIiwgXCJmb2N1cyBibHVyXCJdIGdpdmVzIHRocmVlIHR5cGVzLlxyXG4gKlxyXG4gKiBBIHN0cmluZyBnZXRzIHRyaW1tZWQgYmVmb3JlIGl0IGlzIHNwbGl0LCBiZWNhdXNlIHRoZSBlbXB0eSBlbnRyaWVzIGEgbGVhZGluZ1xyXG4gKiBvciB0cmFpbGluZyBzZXBhcmF0b3IgcHJvZHVjZXMgYXJlIGFydGlmYWN0cyBvZiBzcGxpdHRpbmcsIG5vdCBzb21ldGhpbmcgdGhlXHJcbiAqIGNhbGxlciBhc2tlZCBmb3IuIEFuIGVtcHR5IGVudHJ5IGluc2lkZSBhbiBhcnJheSBpcyB0aGUgb3Bwb3NpdGUgY2FzZTogaXQgd2FzXHJcbiAqIHdyaXR0ZW4gZG93biBhbmQgdGhlcmVmb3JlIHRocm93cy5cclxuICpcclxuICogQHBhcmFtIHtzdHJpbmd8SXRlcmFibGU8c3RyaW5nPn0gdGhlRXZlbnRzXHJcbiAqIEByZXR1cm5zIHtzdHJpbmdbXX0gdGhlIGV2ZW50IHR5cGVzLCBuZXZlciBlbXB0eVxyXG4gKiBAdGhyb3dzIHtFcnJvcn0gd2hlbiBubyB0eXBlIGlzIGxlZnQgb3IgYW4gZW50cnkgaXMgbm90IGEgbm9uIGVtcHR5IHN0cmluZ1xyXG4gKi9cclxuY29uc3QgdG9FdmVudFR5cGVzID0gKHRoZUV2ZW50cykgPT4ge1xyXG5cdGlmKHRoZUV2ZW50cyA9PSBudWxsKSB0aHJvdyBuZXcgRXJyb3IoXCJFdmVudCB0eXBlcyBhcmUgcmVxdWlyZWQhXCIpO1x0XHJcblx0XHJcblx0Y29uc3QgZXZlbnRzID0gdHlwZW9mIHRoZUV2ZW50cyA9PT0gXCJzdHJpbmdcIiA/IHRoZUV2ZW50cy50cmltKCkuc3BsaXQoRVZFTlRTUExJVEVSKSA6IHRoZUV2ZW50cztcclxuXHRpZiAodHlwZW9mIGV2ZW50c1tTeW1ib2wuaXRlcmF0b3JdICE9PSBcImZ1bmN0aW9uXCIpIHRocm93IG5ldyBFcnJvcihcIkludmFsaWQgZXZlbnQgdHlwZXMhXCIpO1xyXG5cdGlmKGV2ZW50cy5sZW5ndGggPT09IDApIHRocm93IG5ldyBFcnJvcihcIkV2ZW50IHR5cGVzIGFyZSByZXF1aXJlZCFcIik7XHJcblxyXG5cdGNvbnN0IHJlc3VsdCA9IFtdO1xyXG5cclxuXHRmb3IgKGxldCBldmVudCBvZiBldmVudHMpIHtcclxuXHRcdGlmICh0eXBlb2YgZXZlbnQgIT09IFwic3RyaW5nXCIpIHRocm93IG5ldyBFcnJvcihcIkludmFsaWQgZXZlbnQgdHlwZXMhXCIpO1xyXG5cdFx0ZXZlbnQgPSBldmVudC50cmltKCk7XHJcblx0XHRpZiAoZXZlbnQubGVuZ3RoID09PSAwKSB0aHJvdyBuZXcgRXJyb3IoXCJJbnZhbGlkIGV2ZW50IHR5cGVzIVwiKTtcclxuXHRcdHJlc3VsdC5wdXNoKC4uLmV2ZW50LnNwbGl0KEVWRU5UU1BMSVRFUikpO1xyXG5cdH1cclxuXHRyZXR1cm4gcmVzdWx0O1xyXG59O1xyXG5cclxuY29uc3Qgc3VwcG9ydCA9IEV4dGVuZGVyKFwiRXZlbnRTdXBwb3J0XCIsIChQcm90b3R5cGUpID0+IHtcclxuXHQvKipcclxuXHQgKiBBZGRzIGEgaGFuZGxlIHRvIG9uZSBvciBtb3JlIGV2ZW50cy5cclxuXHQgKlxyXG5cdCAqIFRoZSBoYW5kbGUgaXMgbm90IGFkZGVkIGFzIGxpc3RlbmVyIGl0c2VsZiwgaXQgZ2V0cyB3cmFwcGVkLiBUaGF0IHdyYXBwZXJcclxuXHQgKiBhcHBsaWVzIHRoZSBzZWxlY3RvciBhbmQgaGFuZGxlcyB0aGUgb25jZSBvcHRpb24sIHdoaWNoIGtlZXBzIHJlbW92ZU9uIGFibGVcclxuXHQgKiB0byBmaW5kIGV2ZXJ5IHJlZ2lzdHJhdGlvbiBvZiBhIGhhbmRsZS5cclxuXHQgKlxyXG5cdCAqIFdpdGggYSBzZWxlY3RvciB0aGUgaGFuZGxlIGlzIG9ubHkgY2FsbGVkIHdoZW4gdGhlIHRhcmdldCBvZiB0aGUgZXZlbnRcclxuXHQgKiBtYXRjaGVzIGl0LiBUb2dldGhlciB3aXRoIG9uY2UgdGhpcyBuZWVkcyBjYXJlOiB0aGUgYnJvd3NlciBjb25zdW1lcyBhIG9uY2VcclxuXHQgKiBsaXN0ZW5lciBvbiB0aGUgZmlyc3QgZXZlbnQsIGV2ZW4gd2hlbiB0aGUgc2VsZWN0b3IgZGlkIG5vdCBtYXRjaCwgc28gdGhlXHJcblx0ICogd3JhcHBlciByZWdpc3RlcnMgaXRzZWxmIGFnYWluIGluIHRoYXQgY2FzZSBhbmQgd2FpdHMgZm9yIGEgbWF0Y2hpbmcgZXZlbnQuXHJcblx0ICpcclxuXHQgKiBAcGFyYW0ge3N0cmluZ3xJdGVyYWJsZTxzdHJpbmc+fSB0aGVFdmVudHMgLSBldmVudCB0eXBlcywgc2VwYXJhdGVkIGJ5IHdoaXRlc3BhY2VzIG9yIGNvbW1hc1xyXG5cdCAqIEBwYXJhbSB7c3RyaW5nfSBbYVNlbGVjdG9yXSAtIG9ubHkgY2FsbCB0aGUgaGFuZGxlIHdoZW4gdGhlIHRhcmdldCBvZiB0aGUgZXZlbnQgbWF0Y2hlc1xyXG5cdCAqIEBwYXJhbSB7RnVuY3Rpb259IGFIYW5kbGUgLSBjYWxsZWQgd2l0aCB0aGUgZXZlbnRcclxuXHQgKiBAcGFyYW0ge2Jvb2xlYW58T2JqZWN0fSBbdGhlT3B0aW9uc10gLSBhIGJvb2xlYW4gaXMgdGFrZW4gYXMgY2FwdHVyZSwgb3RoZXJ3aXNlIHRoZSBvcHRpb25zIG9mIGFkZEV2ZW50TGlzdGVuZXJcclxuXHQgKiBAcmV0dXJucyB7RXZlbnRUYXJnZXR9IHRoaXNcclxuXHQgKiBAdGhyb3dzIHtFcnJvcn0gYnkgbGVzcyB0aGFuIHR3byBhcmd1bWVudHMgb3IgaW52YWxpZCBldmVudCB0eXBlc1xyXG5cdCAqL1xyXG5cdFByb3RvdHlwZS5vbiA9IGZ1bmN0aW9uICgpIHtcclxuXHRcdGlmIChhcmd1bWVudHMubGVuZ3RoIDwgMikgdGhyb3cgbmV3IEVycm9yKFwiVG9vIGxlc3MgYXJndW1lbnRzIVwiKTtcclxuXHJcblx0XHRjb25zdCBhcmdzID0gQXJyYXkuZnJvbShhcmd1bWVudHMpO1xyXG5cdFx0Y29uc3QgZXZlbnRzID0gdG9FdmVudFR5cGVzKGFyZ3Muc2hpZnQoKSk7XHJcblx0XHRjb25zdCBlbGVtZW50U2VsZWN0b3IgPSB0eXBlb2YgYXJnc1swXSA9PT0gXCJzdHJpbmdcIiA/IGFyZ3Muc2hpZnQoKSA6IG51bGw7XHJcblx0XHRjb25zdCBoYW5kbGUgPSBhcmdzLnNoaWZ0KCk7XHJcblx0XHRjb25zdCBvcHRpb24gPSB0b0V2ZW50T3B0aW9ucyhhcmdzLnNoaWZ0KCkpO1xyXG5cdFx0Y29uc3QgZWxlbWVudCA9IHRoaXM7XHJcblx0XHRjb25zdCB3cmFwcGVyID0gZnVuY3Rpb24oZXZlbnQpIHtcclxuXHRcdFx0Y29uc3QgeyB0YXJnZXQsIHR5cGUgfSA9IGV2ZW50O1xyXG5cdFx0XHRpZiAoZWxlbWVudFNlbGVjdG9yICYmIHR5cGVvZiB0YXJnZXQuaXMgPT09IFwiZnVuY3Rpb25cIiAmJiAhdGFyZ2V0LmlzKGVsZW1lbnRTZWxlY3RvcikpIHtcclxuXHRcdFx0XHRpZiAob3B0aW9uLm9uY2UpIGVsZW1lbnQuYWRkRXZlbnRMaXN0ZW5lcih0eXBlLCB3cmFwcGVyLCBvcHRpb24pOyAvLyByZS1yZWdpc3RlciB0aGUgd3JhcHBlciBmb3IgdGhlIG5leHQgZXZlbnRcclxuXHRcdFx0XHRyZXR1cm47XHJcblx0XHRcdH0gZWxzZSB7XHJcblx0XHRcdFx0aWYgKG9wdGlvbi5vbmNlKSByZW1vdmVXcmFwcGVyKGVsZW1lbnQsIHdyYXBwZXIsIFt0eXBlXSk7XHJcblx0XHRcdFx0Y29uc3QgcmVzdWx0ID0gaGFuZGxlLmFwcGx5KG51bGwsIGFyZ3VtZW50cyk7XHRcdFx0XHRcclxuXHRcdFx0XHRyZXR1cm4gcmVzdWx0O1xyXG5cdFx0XHR9XHJcblx0XHR9O1xyXG5cclxuXHRcdHJlZ2lzdHJhdGVIYW5kbGVXcmFwcGVyKHRoaXMsIGhhbmRsZSwgd3JhcHBlciwgZXZlbnRzLCBvcHRpb24pO1xyXG5cclxuXHRcdGZvciAobGV0IGV2ZW50IG9mIGV2ZW50cykge1xyXG5cdFx0XHR0aGlzLmFkZEV2ZW50TGlzdGVuZXIoZXZlbnQsIHdyYXBwZXIsIG9wdGlvbik7XHJcblx0XHR9XHJcblxyXG5cdFx0cmV0dXJuIHRoaXM7XHJcblx0fTtcclxuXHJcblx0LyoqXHJcblx0ICogUmVtb3ZlcyBhIGhhbmRsZSBmcm9tIHNvbWUgb3IgYWxsIG9mIGl0cyBldmVudHMuXHJcblx0ICpcclxuXHQgKiBBIGhhbmRsZSByZWdpc3RlcmVkIGJ5IHNldmVyYWwgY2FsbHMgb2Ygb24oKSBpcyByZW1vdmVkIGZyb20gYWxsIG9mIHRoZW0uXHJcblx0ICpcclxuXHQgKiBAcGFyYW0ge0Z1bmN0aW9ufSBhSGFuZGxlIC0gdGhlIGZ1bmN0aW9uIGdpdmVuIHRvIG9uKClcclxuXHQgKiBAcGFyYW0ge3N0cmluZ3xJdGVyYWJsZTxzdHJpbmc+fSBbdGhlRXZlbnRzXSAtIHRoZSBldmVudHMgdG8gcmVtb3ZlLCBhbGwgb2YgdGhlbSB3aGVuIG9taXR0ZWRcclxuXHQgKiBAcmV0dXJucyB7RXZlbnRUYXJnZXR9IHRoaXNcclxuXHQgKiBAdGhyb3dzIHtFcnJvcn0gYnkgaW52YWxpZCBldmVudCB0eXBlc1xyXG5cdCAqL1xyXG5cdFByb3RvdHlwZS5yZW1vdmVPbiA9IGZ1bmN0aW9uIChhSGFuZGxlLCB0aGVFdmVudHMpIHtcclxuXHRcdGNvbnN0IGV2ZW50cyA9IHRoZUV2ZW50cyA/IHRvRXZlbnRUeXBlcyh0aGVFdmVudHMpIDogbnVsbDtcclxuXHRcdGNvbnN0IGhhbmRsZVdyYXBwZXJNYXAgPSBnZXRIYW5kbGVXcmFwcGVyTWFwKHRoaXMpO1xyXG5cdFx0Y29uc3Qgd3JhcHBlclNldCA9IGhhbmRsZVdyYXBwZXJNYXAuZ2V0KGFIYW5kbGUpO1x0XHJcblx0XHRpZiAod3JhcHBlclNldCkge1xyXG5cdFx0XHRmb3IgKGxldCB3cmFwcGVyIG9mIHdyYXBwZXJTZXQpXHJcblx0XHRcdFx0cmVtb3ZlV3JhcHBlcih0aGlzLCB3cmFwcGVyLCBldmVudHMpO1xyXG5cdFx0fVxyXG5cclxuXHRcdHJldHVybiB0aGlzO1xyXG5cdH07XHJcblxyXG5cdC8qKlxyXG5cdCAqIERpc3BhdGNoZXMgYSBidWJibGluZywgY2FuY2VsYWJsZSBhbmQgY29tcG9zZWQgQ3VzdG9tRXZlbnQuXHJcblx0ICpcclxuXHQgKiBBIGxlYWRpbmcgbnVtYmVyIGRlbGF5cyB0aGUgZXZlbnQgYnkgdGhhdCBtYW55IG1pbGxpc2Vjb25kcyBhbmQgcmVwbGFjZXMgYVxyXG5cdCAqIGRlbGF5ZWQgZXZlbnQgb2YgdGhlIHNhbWUgdHlwZSB0aGF0IGlzIHN0aWxsIHBlbmRpbmcsIHNvIGEgcmVwZWF0ZWRseVxyXG5cdCAqIHRyaWdnZXJlZCBldmVudCBpcyBkaXNwYXRjaGVkIG9uY2UgYWZ0ZXIgdGhpbmdzIGNhbWUgdG8gcmVzdC5cclxuXHQgKlxyXG5cdCAqIE9uZSBkYXRhIGFyZ3VtZW50IGJlY29tZXMgZXZlbnQuZGV0YWlsIGFzIGl0IGlzLCBzZXZlcmFsIGJlY29tZSBhbiBhcnJheSBvZlxyXG5cdCAqIHRoZW0uIEEgbGVhZGluZyBFdmVudCBpcyB0YWtlbiBhcyB0aGUgZXZlbnQgdGhpcyBvbmUgaXMgZGVsZWdhdGVkIGZyb20gYW5kXHJcblx0ICogaXMgYXZhaWxhYmxlIGFzIGV2ZW50LmRlbGVnYXRlZEV2ZW50LlxyXG5cdCAqXHJcblx0ICogQHBhcmFtIHtudW1iZXJ9IFthVGltZW91dF0gLSBtaWxsaXNlY29uZHMgdG8gZGVsYXkgdGhlIGV2ZW50XHJcblx0ICogQHBhcmFtIHtzdHJpbmd9IGFUeXBlIC0gdGhlIGV2ZW50IHR5cGVcclxuXHQgKiBAcGFyYW0ge0V2ZW50fSBbYURlbGVnYXRlZEV2ZW50XSAtIHRoZSBldmVudCB0aGlzIG9uZSBpcyB0cmlnZ2VyZWQgZm9yXHJcblx0ICogQHBhcmFtIHsuLi4qfSBbdGhlRGF0YV0gLSBiZWNvbWVzIGV2ZW50LmRldGFpbFxyXG5cdCAqIEByZXR1cm5zIHtFdmVudFRhcmdldH0gdGhpc1xyXG5cdCAqL1xyXG5cdFByb3RvdHlwZS50cmlnZ2VyID0gZnVuY3Rpb24gKCkge1xyXG5cdFx0Y29uc3QgYXJncyA9IEFycmF5LmZyb20oYXJndW1lbnRzKTtcclxuXHRcdGNvbnN0IHRpbWVvdXQgPSB0eXBlb2YgYXJnc1swXSA9PT0gXCJudW1iZXJcIiA/IGFyZ3Muc2hpZnQoKSA6IC0xO1xyXG5cdFx0aWYgKHRpbWVvdXQgPj0gMCkge1xyXG5cdFx0XHRjb25zdCB0eXBlID0gYXJnc1swXTtcclxuXHRcdFx0Y29uc3QgdGltZW91dHMgPSBnZXRUcmlnZ2VyVGltZW91dHModGhpcyk7XHJcblx0XHRcdGNvbnN0IHRpbWVvdXRpZCA9IHRpbWVvdXRzLmdldCh0eXBlKTtcclxuXHRcdFx0aWYgKHRpbWVvdXRpZCkgY2xlYXJUaW1lb3V0KHRpbWVvdXRpZCk7XHJcblxyXG5cdFx0XHR0aW1lb3V0cy5zZXQodHlwZSwgc2V0VGltZW91dCgoKSA9PiB7XHJcblx0XHRcdFx0dGltZW91dHMuZGVsZXRlKHR5cGUpO1xyXG5cdFx0XHRcdHRoaXMudHJpZ2dlci5hcHBseSh0aGlzLCBhcmdzKTtcclxuXHRcdFx0fSwgdGltZW91dCkpO1xyXG5cdFx0fSBlbHNlIHtcclxuXHRcdFx0Y29uc3QgdHlwZSA9IGFyZ3Muc2hpZnQoKTtcclxuXHRcdFx0Y29uc3QgZGVsZWdhdGUgPSBhcmdzWzBdIGluc3RhbmNlb2YgRXZlbnQgPyBhcmdzLnNoaWZ0KCkgOiBudWxsO1xyXG5cdFx0XHRjb25zdCBkYXRhID0gYXJncy5sZW5ndGggPj0gMSA/IChhcmdzLmxlbmd0aCA9PSAxID8gYXJncy5zaGlmdCgpIDogYXJncykgOiBkZWxlZ2F0ZTtcclxuXHRcdFx0Y29uc3QgZXZlbnQgPSBuZXcgQ3VzdG9tRXZlbnQodHlwZSwgeyBidWJibGVzOiB0cnVlLCBjYW5jZWxhYmxlOiB0cnVlLCBjb21wb3NlZDogdHJ1ZSwgZGV0YWlsOiBkYXRhIH0pO1xyXG5cclxuXHRcdFx0aWYgKGRlbGVnYXRlKSBldmVudC5kZWxlZ2F0ZWRFdmVudCA9IGRlbGVnYXRlO1xyXG5cdFx0XHR0aGlzLmRpc3BhdGNoRXZlbnQoZXZlbnQpO1xyXG5cdFx0fVxyXG5cdFx0cmV0dXJuIHRoaXM7XHJcblx0fTtcclxufSk7XHJcbmV4cG9ydCBkZWZhdWx0IHN1cHBvcnQ7XHJcbiIsImltcG9ydCBFeHRlbmRlciBmcm9tIFwiLi4vLi4vdXRpbHMvRXh0ZW5kZXJcIjtcclxuXHJcbmNvbnN0IENMQVNTU1BMSVRFUiA9IC9cXHMrLztcclxuXHJcbi8qKlxyXG4gKiBOb3JtYWxpemVzIGNsYXNzIG5hbWVzIHRvIGEgZmxhdCBsaXN0LlxyXG4gKlxyXG4gKiBOYW1lcyBhcmUgc2VwYXJhdGVkIGJ5IHdoaXRlc3BhY2VzLCBpbiBhIHN0cmluZyBhcyB3ZWxsIGFzIHdpdGhpbiB0aGUgZW50cmllc1xyXG4gKiBvZiBhbiBhcnJheSAtIHNvIFtcImFcIiwgXCJiIGNcIl0gZ2l2ZXMgdGhyZWUgbmFtZXMuXHJcbiAqXHJcbiAqIEEgc3RyaW5nIGdldHMgdHJpbW1lZCBiZWZvcmUgaXQgaXMgc3BsaXQsIGJlY2F1c2UgdGhlIGVtcHR5IGVudHJpZXMgYSBsZWFkaW5nXHJcbiAqIG9yIHRyYWlsaW5nIHdoaXRlc3BhY2UgcHJvZHVjZXMgYXJlIGFydGlmYWN0cyBvZiBzcGxpdHRpbmcuIEFuIGVtcHR5IGVudHJ5XHJcbiAqIHdyaXR0ZW4gZG93biBieSB0aGUgY2FsbGVyIHRocm93cyBpbnN0ZWFkLCBhcyBkb2VzIGFueXRoaW5nIHRoYXQgaXMgbm90IGFcclxuICogc3RyaW5nIC0gY2xhc3NMaXN0IHdvdWxkIG9ubHkgcmVwb3J0IHRob3NlIGFzIGFuIHVudXNhYmxlIHRva2VuLCBvciBzaWxlbnRseVxyXG4gKiB0YWtlIGEgYm9vbGVhbiBhcyBhIGNsYXNzIG5hbWVkIFwidHJ1ZVwiLlxyXG4gKlxyXG4gKiBAcGFyYW0ge3N0cmluZ3xzdHJpbmdbXX0gdGhlQ2xhc3Nlc1xyXG4gKiBAcmV0dXJucyB7SXRlcmFibGU8c3RyaW5nPn0gdGhlIGNsYXNzIG5hbWVzLCBuZXZlciBlbXB0eVxyXG4gKiBAdGhyb3dzIHtFcnJvcn0gd2hlbiBubyBuYW1lIGlzIGxlZnQgb3IgYW4gZW50cnkgaXMgbm90IGEgbm9uIGVtcHR5IHN0cmluZ1xyXG4gKi9cclxuY29uc3QgdG9DbGFzc05hbWVzID0gKHRoZUNsYXNzZXMpID0+IHtcclxuXHRpZiAodGhlQ2xhc3NlcyA9PSBudWxsKSB0aHJvdyBuZXcgRXJyb3IoXCJDbGFzcyBuYW1lcyBhcmUgcmVxdWlyZWQhXCIpO1xyXG5cclxuXHRjb25zdCBjbGFzc2VzID0gdHlwZW9mIHRoZUNsYXNzZXMgPT09IFwic3RyaW5nXCIgPyB0aGVDbGFzc2VzLnRyaW0oKS5zcGxpdChDTEFTU1NQTElURVIpIDogdGhlQ2xhc3NlcztcclxuXHRpZiAodHlwZW9mIGNsYXNzZXNbU3ltYm9sLml0ZXJhdG9yXSAhPT0gXCJmdW5jdGlvblwiKSB0aHJvdyBuZXcgRXJyb3IoXCJJbnZhbGlkIGNsYXNzIG5hbWVzIVwiKTtcclxuXHRpZiAoY2xhc3Nlcy5sZW5ndGggPT09IDApIHRocm93IG5ldyBFcnJvcihcIkNsYXNzIG5hbWVzIGFyZSByZXF1aXJlZCFcIik7XHJcblxyXG5cdGNvbnN0IHJlc3VsdCA9IFtdO1xyXG5cdGZvciAobGV0IGNsYXp6IG9mIGNsYXNzZXMpIHtcclxuXHRcdGlmICh0eXBlb2YgY2xhenogIT09IFwic3RyaW5nXCIpIHRocm93IG5ldyBFcnJvcihcIkludmFsaWQgY2xhc3MgbmFtZXMhXCIpO1xyXG5cdFx0Y2xhenogPSBjbGF6ei50cmltKCk7XHJcblx0XHRpZiAoY2xhenoubGVuZ3RoID09PSAwKSB0aHJvdyBuZXcgRXJyb3IoXCJJbnZhbGlkIGNsYXNzIG5hbWVzIVwiKTtcclxuXHRcdHJlc3VsdC5wdXNoKC4uLmNsYXp6LnNwbGl0KENMQVNTU1BMSVRFUikpO1xyXG5cdH1cclxuXHRcclxuXHRyZXR1cm4gcmVzdWx0O1xyXG59O1xyXG5cclxuLyoqXHJcbiAqIEJ1aWxkcyBhIGNsYXNzIGZ1bmN0aW9uLCBhcyBhZGQsIHJlbW92ZSBhbmQgdG9nZ2xlIG9ubHkgZGlmZmVyIGJ5IHRoZSBtZXRob2RcclxuICogdGhleSBjYWxsIG9uIHRoZSBjbGFzc0xpc3QuXHJcbiAqXHJcbiAqIEBwYXJhbSB7c3RyaW5nfSBhTmFtZSAtIHRoZSBuYW1lIG9mIHRoZSBjbGFzc0xpc3QgbWV0aG9kXHJcbiAqIEByZXR1cm5zIHtmdW5jdGlvbiguLi4oc3RyaW5nfHN0cmluZ1tdKSk6RWxlbWVudH0gYSBmdW5jdGlvbiB0YWtpbmcgYW55IG1peCBvZiBuYW1lcywgbGlzdHMgb2YgbmFtZXMgYW5kIGFycmF5cyBvZiBib3RoXHJcbiAqL1xyXG5jb25zdCBjbGFzc0xpc3RGdW5jdGlvbiA9IChhTmFtZSkgPT5cclxuXHRmdW5jdGlvbiAoKSB7XHJcblx0XHRjb25zdCBjbGFzc2VzID0gdG9DbGFzc05hbWVzKEFycmF5LmZyb20oYXJndW1lbnRzKS5mbGF0KCkpO1xyXG5cdFx0Y2xhc3Nlcy5mb3JFYWNoKChjbGF6eikgPT4gdGhpcy5jbGFzc0xpc3RbYU5hbWVdKGNsYXp6KSk7XHJcblxyXG5cdFx0cmV0dXJuIHRoaXM7XHJcblx0fTtcclxuXHJcbmNvbnN0IHN1cHBvcnQgPSBFeHRlbmRlcihcIkh0bWxDbGFzc1N1cHBvcnRcIiwgKFByb3RvdHlwZSkgPT4ge1xyXG5cdC8qKlxyXG5cdCAqIEFkZHMgY2xhc3MgbmFtZXMgdG8gdGhpcyBlbGVtZW50LlxyXG5cdCAqXHJcblx0ICogQHBhcmFtIHsuLi4oc3RyaW5nfHN0cmluZ1tdKX0gdGhlQ2xhc3NlcyAtIG5hbWVzLCB3aGl0ZXNwYWNlIHNlcGFyYXRlZCBsaXN0cyBvZiBuYW1lcywgb3IgYXJyYXlzIG9mIGJvdGhcclxuXHQgKiBAcmV0dXJucyB7RWxlbWVudH0gdGhpc1xyXG5cdCAqIEB0aHJvd3Mge0Vycm9yfSBieSBpbnZhbGlkIGNsYXNzIG5hbWVzXHJcblx0ICovXHJcblx0UHJvdG90eXBlLmFkZENsYXNzID0gY2xhc3NMaXN0RnVuY3Rpb24oXCJhZGRcIik7XHJcblxyXG5cdC8qKlxyXG5cdCAqIFJlbW92ZXMgY2xhc3MgbmFtZXMgZnJvbSB0aGlzIGVsZW1lbnQuIE5hbWVzIG5vdCBwcmVzZW50IGFyZSBpZ25vcmVkLlxyXG5cdCAqXHJcblx0ICogQHBhcmFtIHsuLi4oc3RyaW5nfHN0cmluZ1tdKX0gdGhlQ2xhc3NlcyAtIG5hbWVzLCB3aGl0ZXNwYWNlIHNlcGFyYXRlZCBsaXN0cyBvZiBuYW1lcywgb3IgYXJyYXlzIG9mIGJvdGhcclxuXHQgKiBAcmV0dXJucyB7RWxlbWVudH0gdGhpc1xyXG5cdCAqIEB0aHJvd3Mge0Vycm9yfSBieSBpbnZhbGlkIGNsYXNzIG5hbWVzXHJcblx0ICovXHJcblx0UHJvdG90eXBlLnJlbW92ZUNsYXNzID0gY2xhc3NMaXN0RnVuY3Rpb24oXCJyZW1vdmVcIik7XHJcblxyXG5cdC8qKlxyXG5cdCAqIFRvZ2dsZXMgY2xhc3MgbmFtZXMgb2YgdGhpcyBlbGVtZW50LCBlYWNoIG9uZSBvbiBpdHMgb3duLlxyXG5cdCAqXHJcblx0ICogVGhlIGZvcmNlIHBhcmFtZXRlciBvZiBjbGFzc0xpc3QudG9nZ2xlIGlzIG5vdCBzdXBwb3J0ZWQgLSBhIGJvb2xlYW4gaXMgbm90XHJcblx0ICogYSBjbGFzcyBuYW1lIGFuZCB0aGVyZWZvcmUgdGhyb3dzLlxyXG5cdCAqXHJcblx0ICogQHBhcmFtIHsuLi4oc3RyaW5nfHN0cmluZ1tdKX0gdGhlQ2xhc3NlcyAtIG5hbWVzLCB3aGl0ZXNwYWNlIHNlcGFyYXRlZCBsaXN0cyBvZiBuYW1lcywgb3IgYXJyYXlzIG9mIGJvdGhcclxuXHQgKiBAcmV0dXJucyB7RWxlbWVudH0gdGhpc1xyXG5cdCAqIEB0aHJvd3Mge0Vycm9yfSBieSBpbnZhbGlkIGNsYXNzIG5hbWVzXHJcblx0ICovXHJcblx0UHJvdG90eXBlLnRvZ2dsZUNsYXNzID0gY2xhc3NMaXN0RnVuY3Rpb24oXCJ0b2dnbGVcIik7XHJcbn0pO1xyXG5leHBvcnQgZGVmYXVsdCBzdXBwb3J0OyIsImltcG9ydCBFeHRlbmRlciBmcm9tIFwiLi4vLi4vdXRpbHMvRXh0ZW5kZXJcIjtcclxuXHJcbi8qKlxyXG4gKiBCdWlsZHMgYSBsaXN0IGZ1bmN0aW9uIGJ5IGRlbGVnYXRpbmcgdG8gdGhlIGFycmF5IGZ1bmN0aW9uIG9mIHRoZSBzYW1lIG5hbWUuXHJcbiAqXHJcbiAqIFRoZSBsaXN0IGlzIGNvcGllZCBpbnRvIGFuIGFycmF5IGZpcnN0LiBUaGF0IGNvcHkgaXMgd2hhdCBtYWtlcyB0aGVzZSBmdW5jdGlvbnNcclxuICogc2FmZSBvbiBhIGxpdmUgSFRNTENvbGxlY3Rpb246IG5vZGVzIG1heSBiZSBtb3ZlZCBvciByZW1vdmVkIHdoaWxlIGl0ZXJhdGluZyxcclxuICogd2l0aG91dCB0aGUgaXRlcmF0aW9uIHNraXBwaW5nIHRoZSBlbnRyaWVzIHRoYXQgc2hpZnQgaW50byB0aGVpciBwbGFjZS5cclxuICpcclxuICogQHBhcmFtIHtzdHJpbmd9IGFOYW1lIC0gdGhlIG5hbWUgb2YgdGhlIGFycmF5IGZ1bmN0aW9uXHJcbiAqIEByZXR1cm5zIHtGdW5jdGlvbn0gYSBmdW5jdGlvbiBiZWhhdmluZyBsaWtlIHRoZSBhcnJheSBmdW5jdGlvbiBvZiB0aGF0IG5hbWVcclxuICovXHJcbmNvbnN0IGFycmF5RnVuY3Rpb24gPSAoYU5hbWUpID0+XHJcblx0ZnVuY3Rpb24gKCkge1xyXG5cdFx0cmV0dXJuIEFycmF5LnByb3RvdHlwZVthTmFtZV0uYXBwbHkoQXJyYXkuZnJvbSh0aGlzKSwgYXJndW1lbnRzKTtcclxuXHR9O1xyXG5cclxuY29uc3Qgc3VwcG9ydCA9IEV4dGVuZGVyKFwiTGlzdFN1cHBvcnRcIiwgKFByb3RvdHlwZSkgPT4ge1xyXG5cdC8qKlxyXG5cdCAqIEBwYXJhbSB7Kn0gYU5vZGUgLSB0aGUgbm9kZSB0byBsb29rIGZvclxyXG5cdCAqIEBwYXJhbSB7bnVtYmVyfSBbYVN0YXJ0XSAtIHRoZSBpbmRleCB0byBzdGFydCBhdFxyXG5cdCAqIEByZXR1cm5zIHtudW1iZXJ9IHRoZSBpbmRleCBvZiB0aGUgbm9kZSwgb3IgLTFcclxuXHQgKi9cclxuXHRQcm90b3R5cGUuaW5kZXhPZiA9IGFycmF5RnVuY3Rpb24oXCJpbmRleE9mXCIpO1xyXG5cclxuXHQvKipcclxuXHQgKiBAcGFyYW0geyp9IGFOb2RlIC0gdGhlIG5vZGUgdG8gbG9vayBmb3JcclxuXHQgKiBAcGFyYW0ge251bWJlcn0gW2FTdGFydF0gLSB0aGUgaW5kZXggdG8gc3RhcnQgYXRcclxuXHQgKiBAcmV0dXJucyB7Ym9vbGVhbn0gd2hldGhlciB0aGUgbGlzdCBjb250YWlucyB0aGUgbm9kZVxyXG5cdCAqL1xyXG5cdFByb3RvdHlwZS5pbmNsdWRlcyA9IGFycmF5RnVuY3Rpb24oXCJpbmNsdWRlc1wiKTtcclxuXHJcblx0LyoqXHJcblx0ICogQ2FsbHMgdGhlIGZ1bmN0aW9uIGZvciBlYWNoIG5vZGUuXHJcblx0ICpcclxuXHQgKiBAcGFyYW0ge2Z1bmN0aW9uKE5vZGUsbnVtYmVyLE5vZGVbXSk6dm9pZH0gYUZ1bmN0aW9uIC0gY2FsbGVkIHdpdGggbm9kZSwgaW5kZXggYW5kIHRoZSBjb3BpZWQgbGlzdFxyXG5cdCAqL1xyXG5cdFByb3RvdHlwZS5mb3JFYWNoID0gYXJyYXlGdW5jdGlvbihcImZvckVhY2hcIik7XHJcblxyXG5cdC8qKlxyXG5cdCAqIEBwYXJhbSB7ZnVuY3Rpb24oTm9kZSxudW1iZXIsTm9kZVtdKToqfSBhRnVuY3Rpb25cclxuXHQgKiBAcmV0dXJucyB7QXJyYXl9IHRoZSByZXN1bHRzLCBhbiBhcnJheSBhcyB0aGUgcmVzdWx0cyBhcmUgbm90IG5vZGVzIGFueW1vcmVcclxuXHQgKi9cclxuXHRQcm90b3R5cGUubWFwID0gYXJyYXlGdW5jdGlvbihcIm1hcFwiKTtcclxuXHJcblx0LyoqXHJcblx0ICogQHBhcmFtIHtmdW5jdGlvbihOb2RlLG51bWJlcixOb2RlW10pOmJvb2xlYW59IGFGdW5jdGlvblxyXG5cdCAqIEByZXR1cm5zIHtib29sZWFufSB3aGV0aGVyIHRoZSBmdW5jdGlvbiBtYXRjaGVzIGF0IGxlYXN0IG9uZSBub2RlXHJcblx0ICovXHJcblx0UHJvdG90eXBlLnNvbWUgPSBhcnJheUZ1bmN0aW9uKFwic29tZVwiKTtcclxuXHJcblx0LyoqXHJcblx0ICogQHBhcmFtIHtmdW5jdGlvbihOb2RlLG51bWJlcixOb2RlW10pOmJvb2xlYW59IGFGdW5jdGlvblxyXG5cdCAqIEByZXR1cm5zIHtib29sZWFufSB3aGV0aGVyIHRoZSBmdW5jdGlvbiBtYXRjaGVzIGV2ZXJ5IG5vZGVcclxuXHQgKi9cclxuXHRQcm90b3R5cGUuZXZlcnkgPSBhcnJheUZ1bmN0aW9uKFwiZXZlcnlcIik7XHJcblxyXG5cdC8qKlxyXG5cdCAqIEBwYXJhbSB7ZnVuY3Rpb24oKixOb2RlLG51bWJlcixOb2RlW10pOip9IGFGdW5jdGlvblxyXG5cdCAqIEBwYXJhbSB7Kn0gW2FJbml0aWFsVmFsdWVdXHJcblx0ICogQHJldHVybnMgeyp9IHRoZSBhY2N1bXVsYXRlZCByZXN1bHRcclxuXHQgKi9cclxuXHRQcm90b3R5cGUucmVkdWNlID0gYXJyYXlGdW5jdGlvbihcInJlZHVjZVwiKTtcclxuXHJcblx0LyoqXHJcblx0ICogRmlsdGVycyB0aGUgbGlzdC5cclxuXHQgKlxyXG5cdCAqIFVubGlrZSBtYXAgdGhpcyBrZWVwcyB0aGUgdHlwZSBvZiB0aGUgbGlzdCAtIGEgTm9kZUxpc3QgcmV0dXJucyBhIE5vZGVMaXN0LCBhXHJcblx0ICogSFRNTENvbGxlY3Rpb24gcmV0dXJucyBhIEhUTUxDb2xsZWN0aW9uIC0gc28gYSBmaWx0ZXJlZCBsaXN0IGNhbiBiZSB1c2VkIGxpa2VcclxuXHQgKiBhbnkgb3RoZXIgb25lLiBUaGUgcmVzdWx0IGlzIGEgbmV3IGxpc3QsIGl0IGlzIG5vdCBsaXZlIGFueW1vcmUuXHJcblx0ICpcclxuXHQgKiBAcGFyYW0ge2Z1bmN0aW9uKE5vZGUsbnVtYmVyLE5vZGVbXSk6Ym9vbGVhbn0gYUZ1bmN0aW9uXHJcblx0ICogQHJldHVybnMge05vZGVMaXN0fEhUTUxDb2xsZWN0aW9ufSB0aGUgbWF0Y2hpbmcgbm9kZXNcclxuXHQgKi9cclxuXHRQcm90b3R5cGUuZmlsdGVyID0gZnVuY3Rpb24gKCkge1xyXG5cdFx0Y29uc3QgcmVzdWx0ID0gQXJyYXkucHJvdG90eXBlLmZpbHRlci5hcHBseShBcnJheS5mcm9tKHRoaXMpLCBhcmd1bWVudHMpO1xyXG5cclxuXHRcdHJldHVybiB0aGlzLmNvbnN0cnVjdG9yLmZyb20ocmVzdWx0KTtcclxuXHR9O1xyXG5cclxuXHQvKipcclxuXHQgKiBAcmV0dXJucyB7Tm9kZXx1bmRlZmluZWR9IHRoZSBmaXJzdCBub2RlLCBvciB1bmRlZmluZWQgd2hlbiB0aGUgbGlzdCBpcyBlbXB0eVxyXG5cdCAqL1xyXG5cdFByb3RvdHlwZS5maXJzdCA9IGZ1bmN0aW9uICgpIHtcclxuXHRcdGlmICh0aGlzLmxlbmd0aCA+IDApIHJldHVybiB0aGlzWzBdO1xyXG5cdH07XHJcblxyXG5cdC8qKlxyXG5cdCAqIEByZXR1cm5zIHtOb2RlfHVuZGVmaW5lZH0gdGhlIGxhc3Qgbm9kZSwgb3IgdW5kZWZpbmVkIHdoZW4gdGhlIGxpc3QgaXMgZW1wdHlcclxuXHQgKi9cclxuXHRQcm90b3R5cGUubGFzdCA9IGZ1bmN0aW9uICgpIHtcclxuXHRcdGlmICh0aGlzLmxlbmd0aCA+IDApIHJldHVybiB0aGlzW3RoaXMubGVuZ3RoIC0gMV07XHJcblx0fTtcclxufSk7XHJcbmV4cG9ydCBkZWZhdWx0IHN1cHBvcnQ7IiwiaW1wb3J0IGV4dGVuZFByb3RvdHlwZSBmcm9tIFwiLi4vLi4vdXRpbHMvRXh0ZW5kUHJvdG90eXBlXCI7XG5pbXBvcnQgRGVsZWdhdGVyQnVpbGRlciBmcm9tIFwiLi4vLi4vdXRpbHMvRGVsZWdhdGVyQnVpbGRlclwiO1xuaW1wb3J0IExpc3RTdXBwb3J0IGZyb20gXCIuL0xpc3RTdXBwb3J0XCI7XG5cbi8qKlxuICogU2V0cyB1cCBhIGRvbSBsaXN0IHR5cGUgLSBOb2RlTGlzdCBvciBIVE1MQ29sbGVjdGlvbiAtIHRoZSBzYW1lIHdheS5cbiAqXG4gKiBUaGUgdHdvIG9ubHkgZGlmZmVyIGJ5IHRoZWlyIG93biB0eXBlIGFuZCB0aGUgZWxlbWVudCB0eXBlIHRoZXkgaG9sZCwgc28gdGhpc1xuICogYnVpbGRzIGJvdGggZnJvbSB0aG9zZSB0d28gcGFyYW1ldGVyczogaXQgYXBwbGllcyBMaXN0U3VwcG9ydCwgYWRkcyBhcHBseVRvLFxuICogdmFsIGFuZCB0aGUgc3RhdGljIGZyb20sIGFuZCB3aXJlcyB0aGUgZGVsZWdhdGlvbiB0aGF0IGxldHMgYSBsaXN0IGZvcndhcmRcbiAqIGV2ZXJ5IG1ldGhvZCBvZiBpdHMgZWxlbWVudHMuXG4gKlxuICogQHBhcmFtIHtGdW5jdGlvbn0gTGlzdFR5cGUgLSB0aGUgbGlzdCB0eXBlLCBOb2RlTGlzdCBvciBIVE1MQ29sbGVjdGlvblxuICogQHBhcmFtIHtGdW5jdGlvbn0gRWxlbWVudFR5cGUgLSB0aGUgdHlwZSBvZiB0aGUgaXRlbXMsIE5vZGUgb3IgSFRNTEVsZW1lbnRcbiAqL1xuY29uc3QgYnVpbGRMaXN0VHlwZSA9IChMaXN0VHlwZSwgRWxlbWVudFR5cGUpID0+IHtcblx0ZXh0ZW5kUHJvdG90eXBlKExpc3RUeXBlLCBMaXN0U3VwcG9ydCk7XG5cblx0LyoqXG5cdCAqIEFwcGxpZXMgYSBmdW5jdGlvbiBvciBhIG1ldGhvZCB0byBlYWNoIGl0ZW0gYW5kIGNvbGxlY3RzIHRoZSByZXN1bHRzLlxuXHQgKlxuXHQgKiBBIGZ1bmN0aW9uIGlzIGNhbGxlZCB3aXRoIHRoZSBpdGVtIGZvbGxvd2VkIGJ5IHRoZSBleHRyYSBhcmd1bWVudHMuIEEgc3RyaW5nXG5cdCAqIGlzIHRha2VuIGFzIHRoZSBuYW1lIG9mIGEgbWV0aG9kIHRvIGNhbGwgb24gZWFjaCBpdGVtIHdpdGggdGhvc2UgYXJndW1lbnRzLlxuXHQgKiBOdWxsIHJlc3VsdHMgYXJlIHNraXBwZWQuXG5cdCAqXG5cdCAqIEBwYXJhbSB7RnVuY3Rpb258c3RyaW5nfSBjYWxsaW5nIC0gYSBmdW5jdGlvbiB0byBjYWxsLCBvciB0aGUgbmFtZSBvZiBhIG1ldGhvZFxuXHQgKiBAcGFyYW0gey4uLip9IHRoZUFyZ3VtZW50cyAtIHBhc3NlZCB0byB0aGUgZnVuY3Rpb24gb3IgbWV0aG9kXG5cdCAqIEByZXR1cm5zIHtBcnJheX0gdGhlIGNvbGxlY3RlZCByZXN1bHRzXG5cdCAqL1xuXHRMaXN0VHlwZS5wcm90b3R5cGUuYXBwbHlUbyA9IGZ1bmN0aW9uICgpIHtcblx0XHRjb25zdCBhcmdzID0gQXJyYXkuZnJvbShhcmd1bWVudHMpO1xuXHRcdGNvbnN0IGNhbGxpbmcgPSBhcmdzLnNoaWZ0KCk7XG5cdFx0Y29uc3QgaXNGdW5jdGlvbiA9IHR5cGVvZiBjYWxsaW5nID09PSBcImZ1bmN0aW9uXCI7XG5cdFx0Y29uc3QgcmVzdWx0cyA9IFtdO1xuXHRcdGZvciAobGV0IGkgPSAwOyBpIDwgdGhpcy5sZW5ndGg7IGkrKykge1xuXHRcdFx0Y29uc3Qgbm9kZSA9IHRoaXNbaV07XG5cdFx0XHRsZXQgcmVzdWx0O1xuXHRcdFx0aWYgKGlzRnVuY3Rpb24pIHJlc3VsdCA9IGNhbGxpbmcuYXBwbHkobnVsbCwgW25vZGVdLmNvbmNhdChhcmdzKSk7XG5cdFx0XHRlbHNlIGlmICh0eXBlb2Ygbm9kZVtjYWxsaW5nXSA9PT0gXCJmdW5jdGlvblwiKSByZXN1bHQgPSBub2RlW2NhbGxpbmddLmFwcGx5KG5vZGUsIGFyZ3MpO1xuXG5cdFx0XHRpZiAocmVzdWx0ICE9IG51bGwpIHJlc3VsdHMucHVzaChyZXN1bHQpO1xuXHRcdH1cblxuXHRcdHJldHVybiByZXN1bHRzO1xuXHR9O1xuXG5cdC8qKlxuXHQgKiBSZWFkcyBvciB3cml0ZXMgdGhlIHZhbHVlIG9mIHRoZSBpdGVtcy5cblx0ICpcblx0ICogV2l0aG91dCBhcmd1bWVudHMgdGhlIHZhbHVlcyBhcmUgY29sbGVjdGVkIGludG8gYSBNYXAsIGtleWVkIGJ5IHRoZSBuYW1lLCBpZFxuXHQgKiBvciBzZWxlY3RvciBvZiBlYWNoIGl0ZW0gLSBpdGVtcyB3aXRob3V0IGEgdmFsdWUgYXJlIGxlZnQgb3V0LCBzbyBhbiB1bmNoZWNrZWRcblx0ICogcmFkaW8gZG9lcyBub3Qgb3ZlcndyaXRlIHRoZSBzZWxlY3RlZCBvbmUgb2YgaXRzIGdyb3VwLiBXaXRoIGFyZ3VtZW50cyB0aGVcblx0ICogdmFsdWUgaXMgc2V0IG9uIGV2ZXJ5IGl0ZW0uXG5cdCAqXG5cdCAqIEBwYXJhbSB7Li4uKn0gW3RoZVZhbHVlXSAtIHRoZSB2YWx1ZSB0byBzZXQgb24gdGhlIGl0ZW1zXG5cdCAqIEByZXR1cm5zIHtNYXA8c3RyaW5nLCo+fExpc3RUeXBlfSB0aGUgdmFsdWVzIGJ5IGtleSwgb3IgdGhpcyB3aGVuIGEgdmFsdWUgd2FzIHNldFxuXHQgKi9cblx0TGlzdFR5cGUucHJvdG90eXBlLnZhbCA9IGZ1bmN0aW9uICgpIHtcblx0XHRpZiAoYXJndW1lbnRzLmxlbmd0aCA9PSAwKSB7XG5cdFx0XHRjb25zdCByZXN1bHQgPSBuZXcgTWFwKCk7XG5cdFx0XHRmb3IgKGNvbnN0IG5vZGUgb2YgdGhpcykge1xuXHRcdFx0XHRpZiAodHlwZW9mIG5vZGUudmFsID09PSBcImZ1bmN0aW9uXCIpIHtcblx0XHRcdFx0XHRjb25zdCB2YWx1ZSA9IG5vZGUudmFsKCk7XG5cdFx0XHRcdFx0aWYgKHZhbHVlICE9IG51bGwpIHJlc3VsdC5zZXQobm9kZS5uYW1lIHx8IG5vZGUuaWQgfHwgbm9kZS5zZWxlY3RvcigpLCB2YWx1ZSk7XG5cdFx0XHRcdH1cblx0XHRcdH1cblx0XHRcdHJldHVybiByZXN1bHQ7XG5cdFx0fSBlbHNlIHRoaXMuYXBwbHlUbyhcInZhbFwiLCAuLi5hcmd1bWVudHMpO1xuXG5cdFx0cmV0dXJuIHRoaXM7XG5cdH07XG5cblx0LyoqXG5cdCAqIEJ1aWxkcyBhIGxpc3QgZnJvbSBub2Rlcywgb3RoZXIgbGlzdHMgYW5kIGFycmF5cyBvZiB0aGVtLlxuXHQgKlxuXHQgKiBFdmVyeSBhcmd1bWVudCB0aGF0IGlzIGFuIGl0ZW0gaXMgdGFrZW4sIGFuIGl0ZXJhYmxlIGlzIHJlYWQgaXRlbSBieSBpdGVtLCBzb1xuXHQgKiBhbnkgbWl4IGNhbiBiZSBwYXNzZWQuIEFueXRoaW5nIHRoYXQgaXMgbm90IGFuIGl0ZW0gaXMgbGVmdCBvdXQuIFRoZSByZXN1bHQgaXNcblx0ICogYSBwbGFpbiBsaXN0LCBub3QgYSBsaXZlIG9uZS5cblx0ICpcblx0ICogQHBhcmFtIHsuLi4oRWxlbWVudFR5cGV8SXRlcmFibGUpfSB0aGVJdGVtc1xuXHQgKiBAcmV0dXJucyB7TGlzdFR5cGV9IGEgbmV3IGxpc3Qgb2YgdGhlIGl0ZW1zXG5cdCAqL1xuXHRMaXN0VHlwZS5mcm9tID0gZnVuY3Rpb24gKCkge1xuXHRcdGNvbnN0IGFyZ3MgPSBBcnJheS5mcm9tKGFyZ3VtZW50cyk7XG5cdFx0Y29uc3QgZGF0YSA9IHt9O1xuXHRcdGxldCBjb3VudGVyID0gMDtcblxuXHRcdHdoaWxlIChhcmdzLmxlbmd0aCA+IDApIHtcblx0XHRcdGNvbnN0IGFyZyA9IGFyZ3Muc2hpZnQoKTtcblx0XHRcdGlmIChhcmcgIT0gbnVsbCkge1xuXHRcdFx0XHRpZiAoYXJnIGluc3RhbmNlb2YgRWxlbWVudFR5cGUpIGRhdGFbY291bnRlcisrXSA9IHsgdmFsdWU6IGFyZywgZW51bWVyYWJsZTogdHJ1ZSB9O1xuXHRcdFx0XHRlbHNlIGlmICh0eXBlb2YgYXJnW1N5bWJvbC5pdGVyYXRvcl0gPT09IFwiZnVuY3Rpb25cIikge1xuXHRcdFx0XHRcdGZvciAobGV0IGl0ZW0gb2YgYXJnKSB7XG5cdFx0XHRcdFx0XHRpZiAoaXRlbSBpbnN0YW5jZW9mIEVsZW1lbnRUeXBlKSBkYXRhW2NvdW50ZXIrK10gPSB7IHZhbHVlOiBpdGVtLCBlbnVtZXJhYmxlOiB0cnVlIH07XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHR9XG5cdFx0XHR9XG5cdFx0fVxuXG5cdFx0ZGF0YS5sZW5ndGggPSB7IHZhbHVlOiBjb3VudGVyIH07XG5cdFx0cmV0dXJuIE9iamVjdC5jcmVhdGUoTGlzdFR5cGUucHJvdG90eXBlLCBkYXRhKTtcblx0fTtcblxuXHREZWxlZ2F0ZXJCdWlsZGVyKFxuXHRcdGZ1bmN0aW9uIChhRnVuY3Rpb25OYW1lLCB0aGVBcmd1bWVudHMpIHtcblx0XHRcdGxldCByZXN1bHRzID0gW107XG5cdFx0XHR0aGlzLmZvckVhY2goKG5vZGUpID0+IHtcblx0XHRcdFx0aWYgKG5vZGUgJiYgdHlwZW9mIG5vZGVbYUZ1bmN0aW9uTmFtZV0gPT09IFwiZnVuY3Rpb25cIikge1xuXHRcdFx0XHRcdGNvbnN0IHJlc3VsdCA9IG5vZGVbYUZ1bmN0aW9uTmFtZV0uYXBwbHkobm9kZSwgdGhlQXJndW1lbnRzKTtcblx0XHRcdFx0XHRpZiAocmVzdWx0ICE9IG51bGwpIHtcblx0XHRcdFx0XHRcdGlmIChyZXN1bHQgaW5zdGFuY2VvZiBMaXN0VHlwZSkgcmVzdWx0cyA9IHJlc3VsdHMuY29uY2F0KEFycmF5LmZyb20ocmVzdWx0KSk7XG5cdFx0XHRcdFx0XHRlbHNlIHJlc3VsdHMucHVzaChyZXN1bHQpO1xuXHRcdFx0XHRcdH1cblx0XHRcdFx0fVxuXHRcdFx0fSk7XG5cblx0XHRcdGlmIChyZXN1bHRzLmxlbmd0aCA9PT0gMCkgcmV0dXJuIHVuZGVmaW5lZDtcblx0XHRcdGVsc2UgaWYgKHJlc3VsdHNbMF0gaW5zdGFuY2VvZiBFbGVtZW50VHlwZSB8fCByZXN1bHRzWzBdIGluc3RhbmNlb2YgTGlzdFR5cGUpIHJldHVybiBMaXN0VHlwZS5mcm9tKHJlc3VsdHMpO1xuXHRcdFx0ZWxzZSByZXR1cm4gcmVzdWx0cztcblx0XHR9LFxuXHRcdExpc3RUeXBlLnByb3RvdHlwZSxcblx0XHROb2RlLnByb3RvdHlwZSxcblx0XHRIVE1MRWxlbWVudC5wcm90b3R5cGUsXG5cdFx0SFRNTElucHV0RWxlbWVudC5wcm90b3R5cGUsXG5cdFx0RWxlbWVudC5wcm90b3R5cGUsXG5cdFx0RXZlbnRUYXJnZXQucHJvdG90eXBlLFxuXHQpO1xufTtcblxuZXhwb3J0IGRlZmF1bHQgYnVpbGRMaXN0VHlwZTtcbiIsImltcG9ydCBFeHRlbmRlciBmcm9tIFwiLi4vLi4vdXRpbHMvRXh0ZW5kZXJcIjtcclxuXHJcbi8qKlxyXG4gKiBDb250ZW50IGFjY2VwdGVkIGJ5IHRoZSBpbnNlcnQgZnVuY3Rpb25zLlxyXG4gKlxyXG4gKiBAdHlwZWRlZiB7Tm9kZXxOb2RlTGlzdHxIVE1MQ29sbGVjdGlvbnxDb250ZW50W118c3RyaW5nfSBDb250ZW50XHJcbiAqL1xyXG5cclxuLyoqXHJcbiAqIE5vcm1hbGl6ZXMgY29udGVudCB0byBhIGZsYXQgbGlzdCBvZiBub2Rlcy5cclxuICpcclxuICogU3RyaW5ncyBhcmUgcGFyc2VkIHRvIG5vZGVzIGJ5IHRoZSBnbG9iYWwgY3JlYXRlKCksIGxpc3RzIGFuZCBhcnJheXMgYXJlIHRha2VuXHJcbiAqIGl0ZW0gYnkgaXRlbSwgc28gYW55IG1peCBvZiB0aGVtIGNhbiBiZSBwYXNzZWQuIExpc3RzIGFyZSByZWFkIGludG8gYW4gYXJyYXlcclxuICogYmVmb3JlIGFueXRoaW5nIGlzIGluc2VydGVkLCBiZWNhdXNlIGluc2VydGluZyBhIG5vZGUgcmVtb3ZlcyBpdCBmcm9tIHRoZSBsaXN0XHJcbiAqIGl0IGNhbWUgZnJvbSAtIGl0ZXJhdGluZyB0aGF0IGxpc3Qgd2hpbGUgaW5zZXJ0aW5nIHdvdWxkIHNraXAgZXZlcnkgb3RoZXIgbm9kZS5cclxuICpcclxuICogU3RyaW5ncyBhcmUgbm90IHRyaW1tZWQgYW5kIGFuIGVtcHR5IG9uZSBpcyBhY2NlcHRlZDogdW5saWtlIGV2ZW50IHR5cGVzIG9yXHJcbiAqIGNsYXNzIG5hbWVzLCB3aGl0ZXNwYWNlIGlzIGNvbnRlbnQuIFwiICAgXCIgYmVjb21lcyBhIHRleHQgbm9kZSwgXCJcIiBiZWNvbWVzIG5vXHJcbiAqIG5vZGUgYXQgYWxsLiBPbmx5IHRoZSBhYnNlbmNlIG9mIGFueSBhcmd1bWVudCBpcyBhbiBlcnJvci5cclxuICpcclxuICogQHBhcmFtIHsuLi5Db250ZW50fSB0aGVDb250ZW50XHJcbiAqIEByZXR1cm5zIHtOb2RlW119IHRoZSBub2RlcywgZW1wdHkgd2hlbiB0aGUgY29udGVudCBwcm9kdWNlZCBub25lXHJcbiAqIEB0aHJvd3Mge0Vycm9yfSB3aGVuIHRoZXJlIGlzIG5vIGNvbnRlbnQgYXQgYWxsIG9yIGFuIGl0ZW0gaXMgbm90IGNvbnRlbnRcclxuICovXHJcbmNvbnN0IHRvTm9kZXMgPSBmdW5jdGlvbiAoKSB7XHJcblx0Y29uc3QgY29udGVudCA9IEFycmF5LmZyb20oYXJndW1lbnRzKS5mbGF0KEluZmluaXR5KTtcclxuXHRpZiAoY29udGVudC5sZW5ndGggPT09IDApIHRocm93IG5ldyBFcnJvcihcIkNvbnRlbnQgaXMgcmVxdWlyZWQhXCIpO1xyXG5cclxuXHRyZXR1cm4gY29udGVudFxyXG5cdFx0Lm1hcCgoaXRlbSkgPT4ge1xyXG5cdFx0XHRpZiAoaXRlbSBpbnN0YW5jZW9mIE5vZGUpIHJldHVybiBpdGVtO1xyXG5cdFx0XHRpZiAoaXRlbSBpbnN0YW5jZW9mIE5vZGVMaXN0IHx8IGl0ZW0gaW5zdGFuY2VvZiBIVE1MQ29sbGVjdGlvbikgcmV0dXJuIEFycmF5LmZyb20oaXRlbSk7XHJcblx0XHRcdGlmICh0eXBlb2YgaXRlbSA9PT0gXCJzdHJpbmdcIikgcmV0dXJuIEFycmF5LmZyb20oY3JlYXRlKGl0ZW0pKTtcclxuXHJcblx0XHRcdHRocm93IG5ldyBFcnJvcihcIkludmFsaWQgY29udGVudCFcIik7XHJcblx0XHR9KVxyXG5cdFx0LmZsYXQoKTtcclxufTtcclxuXHJcbmNvbnN0IHN1cHBvcnQgPSBFeHRlbmRlcihcIk1hbmlwdWxhdGlvblN1cHBvcnRcIiwgUHJvdG90eXBlID0+IHtcclxuXHQvKipcclxuXHQgKiBSZW1vdmVzIGFsbCBjaGlsZCBub2Rlcy5cclxuXHQgKlxyXG5cdCAqIEByZXR1cm5zIHtOb2RlfSB0aGlzXHJcblx0ICovXHJcblx0UHJvdG90eXBlLmVtcHR5ID0gZnVuY3Rpb24oKXtcclxuXHRcdGNvbnN0IG5vZGVzID0gdGhpcy5jaGlsZE5vZGVzO1xyXG5cdFx0d2hpbGUobm9kZXMubGVuZ3RoICE9IDApXHRcdFx0XHJcblx0XHRcdG5vZGVzWzBdLnJlbW92ZSh0cnVlKTtcclxuXHRcdFxyXG5cdFx0cmV0dXJuIHRoaXM7XHJcblx0fTtcclxuXHRcclxuXHQvKipcclxuXHQgKiBAcmV0dXJucyB7Tm9kZUxpc3R9IHRoZSBsaXZlIGxpc3Qgb2YgY2hpbGQgbm9kZXNcclxuXHQgKi9cclxuXHRQcm90b3R5cGUuY29udGVudCA9IGZ1bmN0aW9uKCl7XHJcblx0XHRyZXR1cm4gdGhpcy5jaGlsZE5vZGVzO1xyXG5cdH07XHRcclxuXHRcclxuXHQvKipcclxuXHQgKiBHZXRzIG9yIHNldHMgdGhlIG1hcmt1cCBvZiB0aGlzIG5vZGUuXHJcblx0ICpcclxuXHQgKiBodG1sKCkgcmV0dXJucyB0aGUgaW5uZXJIVE1MLCBodG1sKHRydWUpIHRoZSBvdXRlckhUTUwgYW5kIGh0bWwoZmFsc2UpIHRoZVxyXG5cdCAqIGlubmVySFRNTC4gQW55IG90aGVyIGFyZ3VtZW50IHJlcGxhY2VzIGFsbCBjaGlsZHJlbiBieSB0aGUgZ2l2ZW4gY29udGVudC5cclxuXHQgKlxyXG5cdCAqIEBwYXJhbSB7Li4uKGJvb2xlYW58Q29udGVudCl9IHRoZUNvbnRlbnQgLSBudWxsIG9yIHVuZGVmaW5lZCB0aHJvd3NcclxuXHQgKiBAcmV0dXJucyB7c3RyaW5nfE5vZGV9IHRoZSBtYXJrdXAsIG9yIHRoaXMgd2hlbiBjb250ZW50IHdhcyBzZXRcclxuXHQgKi9cclxuXHRQcm90b3R5cGUuaHRtbCA9IGZ1bmN0aW9uKCl7XHJcblx0XHRpZihhcmd1bWVudHMubGVuZ3RoID09IDApXHJcblx0XHRcdHJldHVybiB0aGlzLmlubmVySFRNTDtcclxuXHRcdGVsc2UgaWYoYXJndW1lbnRzLmxlbmd0aCA9PSAxICYmIHR5cGVvZiBhcmd1bWVudHNbMF0gPT09IFwiYm9vbGVhblwiKVxyXG5cdFx0XHRpZihhcmd1bWVudHNbMF0pXHJcblx0XHRcdFx0cmV0dXJuIHRoaXMub3V0ZXJIVE1MO1xyXG5cdFx0XHRlbHNlXHJcblx0XHRcdFx0cmV0dXJuIHRoaXMuaW5uZXJIVE1MO1xyXG5cdFx0ZWxzZSB7XHJcblx0XHRcdGNvbnN0IG5vZGVzID0gdG9Ob2RlcyhBcnJheS5mcm9tKGFyZ3VtZW50cykpO1xyXG5cdFx0XHR0aGlzLmVtcHR5KCk7XHJcblx0XHRcdG5vZGVzLmZvckVhY2gobm9kZSA9PiB0aGlzLmFwcGVuZENoaWxkKG5vZGUpKTtcclxuXHRcdH1cclxuXHJcblx0XHRyZXR1cm4gdGhpcztcclxuXHR9O1xyXG5cdFxyXG5cdC8qKlxyXG5cdCAqIEFwcGVuZHMgdGhlIGNvbnRlbnQgYXMgbGFzdCBjaGlsZHJlbi5cclxuXHQgKlxyXG5cdCAqIEBwYXJhbSB7Li4uQ29udGVudH0gdGhlQ29udGVudFxyXG5cdCAqIEByZXR1cm5zIHtOb2RlfSB0aGlzXHJcblx0ICogQHRocm93cyB7RXJyb3J9IGJ5IGludmFsaWQgY29udGVudFxyXG5cdCAqL1xyXG5cdFByb3RvdHlwZS5hcHBlbmQgPSBmdW5jdGlvbigpe1xyXG5cdFx0dG9Ob2RlcyhBcnJheS5mcm9tKGFyZ3VtZW50cykpLmZvckVhY2gobm9kZSA9PiB0aGlzLmFwcGVuZENoaWxkKG5vZGUpKTtcclxuXHJcblx0XHRyZXR1cm4gdGhpcztcclxuXHR9O1xyXG5cclxuXHQvKipcclxuXHQgKiBJbnNlcnRzIHRoZSBjb250ZW50IGFzIGZpcnN0IGNoaWxkcmVuLlxyXG5cdCAqXHJcblx0ICogQHBhcmFtIHsuLi5Db250ZW50fSB0aGVDb250ZW50XHJcblx0ICogQHJldHVybnMge05vZGV9IHRoaXNcclxuXHQgKiBAdGhyb3dzIHtFcnJvcn0gYnkgaW52YWxpZCBjb250ZW50XHJcblx0ICovXHJcblx0UHJvdG90eXBlLnByZXBlbmQgPSBmdW5jdGlvbigpe1xyXG5cdFx0Y29uc3Qgbm9kZXMgPSB0b05vZGVzKEFycmF5LmZyb20oYXJndW1lbnRzKSk7XHJcblx0XHRjb25zdCBmaXJzdCA9IHRoaXMuZmlyc3RDaGlsZDtcclxuXHRcdG5vZGVzLmZvckVhY2gobm9kZSA9PiB0aGlzLmluc2VydEJlZm9yZShub2RlLCBmaXJzdCkpO1xyXG5cclxuXHRcdHJldHVybiB0aGlzO1xyXG5cdH07XHJcblxyXG5cdC8qKlxyXG5cdCAqIFJlcGxhY2VzIGEgbm9kZSBieSB0aGUgZ2l2ZW4gY29udGVudC5cclxuXHQgKlxyXG5cdCAqIENhbGxlZCB3aXRoIG9uZSBhcmd1bWVudCwgdGhpcyBub2RlIGlzIHJlcGxhY2VkIHdpdGhpbiBpdHMgcGFyZW50IG5vZGUuXHJcblx0ICogQ2FsbGVkIHdpdGggbW9yZSwgdGhlIGZpcnN0IG9uZSAtIGEgY2hpbGQgb2YgdGhpcyBub2RlIC0gaXMgcmVwbGFjZWQgYnkgdGhlXHJcblx0ICogY29udGVudCBmb2xsb3dpbmcgaXQuXHJcblx0ICpcclxuXHQgKiBAcGFyYW0gey4uLkNvbnRlbnR9IHRoZUNvbnRlbnQgLSB0aGUgbmV3IGNvbnRlbnQsIG9yIHRoZSBvbGQgbm9kZSBmb2xsb3dlZCBieSB0aGUgbmV3IGNvbnRlbnRcclxuXHQgKiBAcmV0dXJucyB7Tm9kZX0gdGhpcywgZXZlbiB3aGVuIHRoaXMgbm9kZSB3YXMgdGhlIHJlcGxhY2VkIG9uZVxyXG5cdCAqIEB0aHJvd3Mge0Vycm9yfSB3aGVuIGNhbGxlZCB3aXRob3V0IGFyZ3VtZW50cyBvciBieSBpbnZhbGlkIGNvbnRlbnRcclxuXHQgKi9cclxuXHRQcm90b3R5cGUucmVwbGFjZSA9IGZ1bmN0aW9uKCl7XHJcblx0XHRpZihhcmd1bWVudHMubGVuZ3RoIDwgMSlcclxuXHRcdFx0dGhyb3cgbmV3IEVycm9yKFwiSW5zdWZmaWNpZW50IGFyZ3VtZW50cyEgT25lIG9yIHR3byBub2RlcyByZXF1aXJlZCFcIik7XHJcblxyXG5cdFx0Y29uc3QgcGFyZW50ID0gYXJndW1lbnRzLmxlbmd0aCA9PSAxID8gdGhpcy5wYXJlbnROb2RlIDogdGhpcztcclxuXHRcdGNvbnN0IG9sZE5vZGUgPSBhcmd1bWVudHMubGVuZ3RoID09IDEgPyB0aGlzIDogYXJndW1lbnRzWzBdO1xyXG5cdFx0Y29uc3Qgbm9kZXMgPSB0b05vZGVzKGFyZ3VtZW50cy5sZW5ndGggPT0gMSA/IGFyZ3VtZW50c1swXSA6IEFycmF5LmZyb20oYXJndW1lbnRzKS5zbGljZSgxKSk7XHJcblxyXG5cdFx0bm9kZXMuZm9yRWFjaChub2RlID0+IHBhcmVudC5pbnNlcnRCZWZvcmUobm9kZSwgb2xkTm9kZSkpO1xyXG5cdFx0b2xkTm9kZS5yZW1vdmUoKTtcclxuXHJcblx0XHRyZXR1cm4gdGhpcztcclxuXHR9O1xyXG5cclxuXHQvKipcclxuXHQgKiBJbnNlcnRzIHRoZSBjb250ZW50IGRpcmVjdGx5IGFmdGVyIHRoaXMgbm9kZS5cclxuXHQgKlxyXG5cdCAqIEBwYXJhbSB7Li4uQ29udGVudH0gdGhlQ29udGVudFxyXG5cdCAqIEByZXR1cm5zIHtOb2RlfSB0aGlzXHJcblx0ICogQHRocm93cyB7RXJyb3J9IHdoZW4gdGhpcyBub2RlIGhhcyBubyBwYXJlbnQgbm9kZSBvciBieSBpbnZhbGlkIGNvbnRlbnRcclxuXHQgKi9cclxuXHRQcm90b3R5cGUuYWZ0ZXIgPSBmdW5jdGlvbigpe1xyXG5cdFx0aWYodGhpcy5wYXJlbnROb2RlID09IG51bGwpXHJcblx0XHRcdHRocm93IG5ldyBFcnJvcihcIkNhbid0IGluc2VydCBub2RlcyBhZnRlciB0aGlzIG5vZGUhIFBhcmVudCBub2RlIG5vdCBhdmFpbGFibGUhXCIpO1xyXG5cclxuXHRcdGNvbnN0IHBhcmVudCA9IHRoaXMucGFyZW50Tm9kZTtcclxuXHRcdGNvbnN0IG5leHQgPSB0aGlzLm5leHRTaWJsaW5nO1xyXG5cdFx0dG9Ob2RlcyhBcnJheS5mcm9tKGFyZ3VtZW50cykpLmZvckVhY2gobm9kZSA9PiBwYXJlbnQuaW5zZXJ0QmVmb3JlKG5vZGUsIG5leHQpKTtcclxuXHJcblx0XHRyZXR1cm4gdGhpcztcclxuXHR9O1xyXG5cclxuXHQvKipcclxuXHQgKiBJbnNlcnRzIHRoZSBjb250ZW50IGRpcmVjdGx5IGJlZm9yZSB0aGlzIG5vZGUuXHJcblx0ICpcclxuXHQgKiBAcGFyYW0gey4uLkNvbnRlbnR9IHRoZUNvbnRlbnRcclxuXHQgKiBAcmV0dXJucyB7Tm9kZX0gdGhpc1xyXG5cdCAqIEB0aHJvd3Mge0Vycm9yfSB3aGVuIHRoaXMgbm9kZSBoYXMgbm8gcGFyZW50IG5vZGUgb3IgYnkgaW52YWxpZCBjb250ZW50XHJcblx0ICovXHJcblx0UHJvdG90eXBlLmJlZm9yZSA9IGZ1bmN0aW9uKCl7XHJcblx0XHRpZih0aGlzLnBhcmVudE5vZGUgPT0gbnVsbClcclxuXHRcdFx0dGhyb3cgbmV3IEVycm9yKFwiQ2FuJ3QgaW5zZXJ0IG5vZGVzIGJlZm9yZSB0aGlzIG5vZGUhIFBhcmVudCBub2RlIG5vdCBhdmFpbGFibGUhXCIpO1xyXG5cclxuXHRcdGNvbnN0IHBhcmVudCA9IHRoaXMucGFyZW50Tm9kZTtcclxuXHRcdHRvTm9kZXMoQXJyYXkuZnJvbShhcmd1bWVudHMpKS5mb3JFYWNoKG5vZGUgPT4gcGFyZW50Lmluc2VydEJlZm9yZShub2RlLCB0aGlzKSk7XHJcblxyXG5cdFx0cmV0dXJuIHRoaXM7XHJcblx0fTtcclxufSk7XHJcbmV4cG9ydCBkZWZhdWx0IHN1cHBvcnQ7IiwiaW1wb3J0IEV4dGVuZGVyIGZyb20gXCIuLi8uLi91dGlscy9FeHRlbmRlclwiO1xyXG5cclxuY29uc3QgUEFSRU5UVE9LRU4gPSBcIjpwYXJlbnRcIjtcclxuY29uc3QgUVVPVEVTID0gW1wiXFxcIlwiLCBcIidcIl07XHJcblxyXG4vKipcclxuICogU3RyaXBzIHRoZSBvcHRpb25hbCBxdW90ZXMgYXJvdW5kIGEgc3ViIHNlbGVjdG9yLlxyXG4gKlxyXG4gKiBRdW90aW5nIGlzIG5vdCBuZWVkZWQgYW55bW9yZSwgYXMgdGhlIHNlbGVjdG9yIGlzIHJlYWQgYnkgY291bnRpbmcgYnJhY2tldHNcclxuICogaW5zdGVhZCBvZiBtYXRjaGluZyBhIHBhdHRlcm4sIGJ1dCBpdCBzdGF5cyBzdXBwb3J0ZWQuXHJcbiAqXHJcbiAqIEBwYXJhbSB7c3RyaW5nfSBzdWJxdWVyeVxyXG4gKiBAcmV0dXJucyB7c3RyaW5nfSB0aGUgc3ViIHNlbGVjdG9yLCBlbXB0eSB3aGVuIHRoZXJlIGlzIG5vbmVcclxuICovXHJcbmNvbnN0IGNsZWFudXBTdWJTZWxlY3RvciA9IChzdWJxdWVyeSkgPT4ge1xyXG5cdGlmICh0eXBlb2Ygc3VicXVlcnkgIT09IFwic3RyaW5nXCIpIHJldHVybiBcIlwiO1xyXG5cdHN1YnF1ZXJ5ID0gc3VicXVlcnkudHJpbSgpO1xyXG5cdGlmICgoc3VicXVlcnkuc3RhcnRzV2l0aCgnXCInKSAmJiBzdWJxdWVyeS5lbmRzV2l0aCgnXCInKSkgfHwgKHN1YnF1ZXJ5LnN0YXJ0c1dpdGgoXCInXCIpICYmIHN1YnF1ZXJ5LmVuZHNXaXRoKFwiJ1wiKSkpIHN1YnF1ZXJ5ID0gc3VicXVlcnkuc3Vic3RyaW5nKDEsIHN1YnF1ZXJ5Lmxlbmd0aCAtIDEpO1xyXG5cdHJldHVybiBzdWJxdWVyeS50cmltKCk7XHJcbn07XHJcblxyXG4vKipcclxuICogRmluZHMgdGhlIDpwYXJlbnQgdG9rZW4gb2YgYSBzZWxlY3Rvci5cclxuICpcclxuICogT25seSBhIHRva2VuIG9uIGJyYWNrZXQgbGV2ZWwgemVybyBhbmQgb3V0c2lkZSBvZiBxdW90ZXMgY291bnRzLCBzbyBuZWl0aGVyXHJcbiAqIFtkYXRhPVwiOnBhcmVudFwiXSBub3IgOm5vdCg6cGFyZW50KSBpcyB0YWtlbiBmb3Igb25lLlxyXG4gKlxyXG4gKiBAcGFyYW0ge3N0cmluZ30gYVNlbGVjdG9yXHJcbiAqIEByZXR1cm5zIHtudW1iZXJ9IHRoZSBpbmRleCBvZiB0aGUgdG9rZW4sIG9yIC0xXHJcbiAqL1xyXG5jb25zdCBpbmRleE9mUGFyZW50VG9rZW4gPSAoYVNlbGVjdG9yKSA9PiB7XHJcblx0bGV0IHF1b3RlID0gbnVsbDtcclxuXHRsZXQgZGVwdGggPSAwO1xyXG5cdGZvciAobGV0IGkgPSAwOyBpIDwgYVNlbGVjdG9yLmxlbmd0aDsgaSsrKSB7XHJcblx0XHRjb25zdCBjaGFyID0gYVNlbGVjdG9yW2ldO1xyXG5cdFx0aWYgKHF1b3RlKSB7XHJcblx0XHRcdGlmIChjaGFyID09PSBxdW90ZSAmJiBhU2VsZWN0b3JbaSAtIDFdICE9PSBcIlxcXFxcIikgcXVvdGUgPSBudWxsO1xyXG5cdFx0fSBlbHNlIGlmIChRVU9URVMuaW5jbHVkZXMoY2hhcikpIHF1b3RlID0gY2hhcjtcclxuXHRcdGVsc2UgaWYgKGNoYXIgPT09IFwiKFwiKSBkZXB0aCsrO1xyXG5cdFx0ZWxzZSBpZiAoY2hhciA9PT0gXCIpXCIpIGRlcHRoLS07XHJcblx0XHRlbHNlIGlmIChkZXB0aCA9PT0gMCAmJiBhU2VsZWN0b3Iuc3RhcnRzV2l0aChQQVJFTlRUT0tFTiwgaSkpIHJldHVybiBpO1xyXG5cdH1cclxuXHJcblx0cmV0dXJuIC0xO1xyXG59O1xyXG5cclxuLyoqXHJcbiAqIFJlYWRzIGEgYnJhY2tldCBncm91cCBieSBjb3VudGluZyBicmFja2V0cywgc28gYSBuZXN0ZWQgZ3JvdXAgbGlrZVxyXG4gKiBkaXY6aGFzKHApOm5vdChzcGFuKSBpcyByZWFkIGFzIGEgd2hvbGUuXHJcbiAqXHJcbiAqIEBwYXJhbSB7c3RyaW5nfSBhU2VsZWN0b3JcclxuICogQHBhcmFtIHtudW1iZXJ9IGFTdGFydCAtIHRoZSBpbmRleCBvZiB0aGUgb3BlbmluZyBicmFja2V0XHJcbiAqIEByZXR1cm5zIHt7Y29udGVudDogc3RyaW5nLCBlbmQ6IG51bWJlcn19IHRoZSBjb250ZW50IG9mIHRoZSBncm91cCBhbmQgdGhlIGluZGV4IGJlaGluZCBpdFxyXG4gKiBAdGhyb3dzIHtFcnJvcn0gd2hlbiB0aGUgZ3JvdXAgaXMgbm90IGNsb3NlZFxyXG4gKi9cclxuY29uc3QgcmVhZEdyb3VwID0gKGFTZWxlY3RvciwgYVN0YXJ0KSA9PiB7XHJcblx0bGV0IHF1b3RlID0gbnVsbDtcclxuXHRsZXQgZGVwdGggPSAwO1xyXG5cdGZvciAobGV0IGkgPSBhU3RhcnQ7IGkgPCBhU2VsZWN0b3IubGVuZ3RoOyBpKyspIHtcclxuXHRcdGNvbnN0IGNoYXIgPSBhU2VsZWN0b3JbaV07XHJcblx0XHRpZiAocXVvdGUpIHtcclxuXHRcdFx0aWYgKGNoYXIgPT09IHF1b3RlICYmIGFTZWxlY3RvcltpIC0gMV0gIT09IFwiXFxcXFwiKSBxdW90ZSA9IG51bGw7XHJcblx0XHR9IGVsc2UgaWYgKFFVT1RFUy5pbmNsdWRlcyhjaGFyKSkgcXVvdGUgPSBjaGFyO1xyXG5cdFx0ZWxzZSBpZiAoY2hhciA9PT0gXCIoXCIpIGRlcHRoKys7XHJcblx0XHRlbHNlIGlmIChjaGFyID09PSBcIilcIiAmJiAtLWRlcHRoID09PSAwKSByZXR1cm4geyBjb250ZW50OiBhU2VsZWN0b3Iuc3Vic3RyaW5nKGFTdGFydCArIDEsIGkpLCBlbmQ6IGkgKyAxIH07XHJcblx0fVxyXG5cclxuXHR0aHJvdyBuZXcgRXJyb3IoXCJJbnZhbGlkIHF1ZXJ5IVwiKTtcclxufTtcclxuXHJcbi8qKlxyXG4gKiBTcGxpdHMgYSBzZWxlY3RvciBhdCBpdHMgOnBhcmVudCB0b2tlbi5cclxuICpcclxuICogQHBhcmFtIHtzdHJpbmd9IGFTZWxlY3RvclxyXG4gKiBAcmV0dXJucyB7e3ByZWZpeDogc3RyaW5nLCBzZWxlY3Rvcjogc3RyaW5nLCBzdWZmaXg6IHN0cmluZ318bnVsbH0gdGhlIHBhcnRzLCBvciBudWxsIHdoZW4gdGhlcmUgaXMgbm8gdG9rZW5cclxuICogQHRocm93cyB7RXJyb3J9IHdoZW4gdGhlIGJyYWNrZXQgZ3JvdXAgb2YgdGhlIHRva2VuIGlzIG5vdCBjbG9zZWRcclxuICovXHJcbmNvbnN0IHNwbGl0UGFyZW50UXVlcnkgPSAoYVNlbGVjdG9yKSA9PiB7XHJcblx0Y29uc3QgaW5kZXggPSBpbmRleE9mUGFyZW50VG9rZW4oYVNlbGVjdG9yKTtcclxuXHRpZiAoaW5kZXggPCAwKSByZXR1cm4gbnVsbDtcclxuXHJcblx0Y29uc3QgYWZ0ZXIgPSBpbmRleCArIFBBUkVOVFRPS0VOLmxlbmd0aDtcclxuXHRjb25zdCBncm91cCA9IGFTZWxlY3RvclthZnRlcl0gPT09IFwiKFwiID8gcmVhZEdyb3VwKGFTZWxlY3RvciwgYWZ0ZXIpIDogeyBjb250ZW50OiBcIlwiLCBlbmQ6IGFmdGVyIH07XHJcblxyXG5cdHJldHVybiB7XHJcblx0XHRwcmVmaXg6IGFTZWxlY3Rvci5zdWJzdHJpbmcoMCwgaW5kZXgpLnRyaW0oKSxcclxuXHRcdHNlbGVjdG9yOiBjbGVhbnVwU3ViU2VsZWN0b3IoZ3JvdXAuY29udGVudCksXHJcblx0XHRzdWZmaXg6IGFTZWxlY3Rvci5zdWJzdHJpbmcoZ3JvdXAuZW5kKS50cmltKClcclxuXHR9O1xyXG59O1xyXG5cclxuLyoqXHJcbiAqIEV4ZWN1dGVzIGEgc2VsZWN0b3IsIHJlc29sdmluZyB0aGUgOnBhcmVudCBwc2V1ZG8gc2VsZWN0b3IuXHJcbiAqXHJcbiAqIDpwYXJlbnQgcmV0dXJucyB0aGUgcGFyZW50IG9mIHRoZSBlbGVtZW50LCA6cGFyZW50KHNlbGVjdG9yKSB0aGUgbmV4dCBhbmNlc3RvclxyXG4gKiBtYXRjaGluZyB0aGUgc2VsZWN0b3IuIEV2ZXJ5dGhpbmcgYmVmb3JlIHRoZSB0b2tlbiBzZWxlY3RzIHRoZSBlbGVtZW50cyB0b1xyXG4gKiBzdGFydCBmcm9tLCBldmVyeXRoaW5nIGJlaGluZCBpdCBpcyBzZWFyY2hlZCB3aXRoaW4gdGhlIHBhcmVudHMgZm91bmQuXHJcbiAqXHJcbiAqIEBwYXJhbSB7SFRNTEVsZW1lbnR9IGFFbGVtZW50XHJcbiAqIEBwYXJhbSB7c3RyaW5nfSBhU2VsZWN0b3JcclxuICogQHJldHVybnMge05vZGVMaXN0fHVuZGVmaW5lZH0gdGhlIHJlc3VsdCwgdW5kZWZpbmVkIHdoZW4gYSBzdGVwIGZvdW5kIG5vdGhpbmdcclxuICovXHJcbmNvbnN0IHF1ZXJ5RXhlY3V0ZXIgPSBmdW5jdGlvbiAoYUVsZW1lbnQsIGFTZWxlY3Rvcikge1xyXG5cdGNvbnN0IHF1ZXJ5ID0gc3BsaXRQYXJlbnRRdWVyeShhU2VsZWN0b3IpO1xyXG5cdGlmICghcXVlcnkpIHJldHVybiBhRWxlbWVudC5xdWVyeVNlbGVjdG9yQWxsKGFTZWxlY3Rvcik7XHJcblxyXG5cdGxldCByZXN1bHQgPSBhRWxlbWVudDtcclxuXHRpZiAocXVlcnkucHJlZml4Lmxlbmd0aCA+IDApIHtcclxuXHRcdHJlc3VsdCA9IGFFbGVtZW50LnF1ZXJ5U2VsZWN0b3JBbGwocXVlcnkucHJlZml4KTtcclxuXHRcdGlmIChyZXN1bHQubGVuZ3RoID09IDApIHJldHVybjtcclxuXHR9XHJcblxyXG5cdHJlc3VsdCA9IHJlc3VsdC5wYXJlbnQocXVlcnkuc2VsZWN0b3IubGVuZ3RoID4gMCA/IHF1ZXJ5LnNlbGVjdG9yIDogbnVsbCk7XHJcblx0aWYgKCFyZXN1bHQpIHJldHVybjtcclxuXHJcblx0cmV0dXJuIHF1ZXJ5LnN1ZmZpeC5sZW5ndGggPiAwID8gcmVzdWx0LmZpbmQocXVlcnkuc3VmZml4KSA6IHJlc3VsdDtcclxufTtcclxuXHJcbi8qKlxyXG4gKiBOb3JtYWxpemVzIHNlbGVjdG9ycyB0byBhIGxpc3Qgb2Ygbm9uIGVtcHR5IHN0cmluZ3MuXHJcbiAqXHJcbiAqIEVtcHR5IHNlbGVjdG9ycyBhcmUgc2tpcHBlZCByYXRoZXIgdGhhbiB0aHJvd24gYXQsIG90aGVyIHRoYW4gaW4gdGhlIHNpYmxpbmdcclxuICogZnVuY3Rpb25zIGZvciBldmVudCB0eXBlcyBhbmQgY2xhc3MgbmFtZXM6IGFuIGVtcHR5IHNlbGVjdG9yIGNhcnJpZXMgbm8gaW50ZW50XHJcbiAqIGFuZCBqdXN0IGNvbnRyaWJ1dGVzIG5vdGhpbmcsIHdoaWxlIGEgbm9uIHN0cmluZyBpcyBhIG1pc3Rha2UgYW5kIHRocm93cy5cclxuICogU2VsZWN0b3JzIGFyZSBub3Qgc3BsaXQsIGNvbW1hIHNlcGFyYXRlZCBsaXN0cyBhcmUgbGVmdCBmb3IgcXVlcnlTZWxlY3RvckFsbC5cclxuICpcclxuICogQHBhcmFtIHtzdHJpbmd8SXRlcmFibGU8c3RyaW5nPn0gdGhlU2VsZWN0b3JzXHJcbiAqIEByZXR1cm5zIHtzdHJpbmdbXX0gdGhlIHRyaW1tZWQgc2VsZWN0b3JzLCBlbXB0eSBvbmVzIHJlbW92ZWRcclxuICogQHRocm93cyB7RXJyb3J9IHdoZW4gdGhlcmUgaXMgbm8gc2VsZWN0b3Igb3Igb25lIGlzIG5vdCBhIHN0cmluZ1xyXG4gKi9cclxuY29uc3QgdG9TZWxlY3RvciA9IGZ1bmN0aW9uICh0aGVTZWxlY3RvcnMpIHtcclxuXHRpZih0aGVTZWxlY3RvcnMgPT0gbnVsbCkgdGhyb3cgbmV3IEVycm9yKFwiSW52YWxpZCBxdWVyeSFcIik7XHJcblxyXG5cdGNvbnN0IHNlbGVjdG9ycyA9IHR5cGVvZiB0aGVTZWxlY3RvcnMgPT09IFwic3RyaW5nXCIgPyBbdGhlU2VsZWN0b3JzXSA6IEFycmF5LmZyb20odGhlU2VsZWN0b3JzKTtcclxuXHJcblx0cmV0dXJuIHNlbGVjdG9yc1xyXG5cdFx0Lm1hcCgoc2VsZWN0b3IpID0+IHtcclxuXHRcdFx0XHRpZih0eXBlb2Ygc2VsZWN0b3IgIT09IFwic3RyaW5nXCIpIHRocm93IG5ldyBFcnJvcihcIkludmFsaWQgcXVlcnkhXCIpO1xyXG5cdFx0XHRcdHJldHVybiBzZWxlY3Rvci50cmltKCk7XHJcblx0XHRcdH0pXHJcblx0XHQuZmlsdGVyKChzZWxlY3RvcikgPT4gc2VsZWN0b3IubGVuZ3RoID4gMCk7XHJcbn1cclxuXHJcblxyXG5jb25zdCBzdXBwb3J0ID0gRXh0ZW5kZXIoXCJRdWVyeVN1cHBvcnRcIiwgKFByb3RvdHlwZSkgPT4ge1xyXG5cdC8qKlxyXG5cdCAqIFNlYXJjaGVzIG5vZGVzIGJ5IG9uZSBvciBtb3JlIHNlbGVjdG9ycy5cclxuXHQgKlxyXG5cdCAqIFNlbGVjdG9yIGxpc3RzIHNlcGFyYXRlZCBieSBjb21tYSBhcmUgbGVmdCB0byBxdWVyeVNlbGVjdG9yQWxsLCB3aGljaCBrbm93c1xyXG5cdCAqIHRoZW0gYW5kIGdldHMgdGhlIGNvbW1hcyBpbnNpZGUgYnJhY2tldHMgYW5kIHF1b3RlcyByaWdodC4gVGhlIHJlc3VsdHMgb2ZcclxuXHQgKiBzZXZlcmFsIHNlbGVjdG9ycyBhcmUgY29sbGVjdGVkIGluIHRoZSBvcmRlciB0aGV5IHdlcmUgZ2l2ZW4sIHdpdGhvdXRcclxuXHQgKiByZW1vdmluZyB0aGUgbm9kZXMgYSBzZWNvbmQgc2VsZWN0b3IgZmluZHMgYWdhaW4uXHJcblx0ICpcclxuXHQgKiBAcGFyYW0gey4uLnN0cmluZ30gdGhlU2VsZWN0b3JzIC0gc2VsZWN0b3JzLCBlbXB0eSBvbmVzIGFyZSBza2lwcGVkXHJcblx0ICogQHJldHVybnMge05vZGVMaXN0fSB0aGUgbm9kZXMgZm91bmQsIGVtcHR5IHdoZW4gdGhlcmUgYXJlIG5vbmVcclxuXHQgKiBAdGhyb3dzIHtFcnJvcn0gYnkgYSBzZWxlY3RvciBiZXNpZGUgYSBzdHJpbmdcclxuXHQgKi9cclxuXHRQcm90b3R5cGUuZmluZCA9IGZ1bmN0aW9uICgpIHtcclxuXHRcdGNvbnN0IG5vZGVzID0gW107XHJcblx0XHRjb25zdCBzZWxlY3RvcnMgPSB0b1NlbGVjdG9yKGFyZ3VtZW50cyk7XHJcblx0XHRmb3IobGV0IHNlbGVjdG9yIG9mIHNlbGVjdG9ycyl7XHJcblx0XHRcdGNvbnN0IHJlc3VsdCA9IHF1ZXJ5RXhlY3V0ZXIodGhpcywgc2VsZWN0b3IpO1xyXG5cdFx0XHRpZiAocmVzdWx0KSBub2Rlcy5wdXNoKHJlc3VsdCk7XHJcblx0XHR9XHJcblxyXG5cdFx0cmV0dXJuIE5vZGVMaXN0LmZyb20oLi4ubm9kZXMpO1xyXG5cdH07XHJcblxyXG5cdC8qKlxyXG5cdCAqIENoZWNrcyB3aGV0aGVyIHRoaXMgbm9kZSBtYXRjaGVzIGF0IGxlYXN0IG9uZSBvZiB0aGUgc2VsZWN0b3JzLlxyXG5cdCAqXHJcblx0ICogQSBEb2N1bWVudCBhbmQgYSBEb2N1bWVudEZyYWdtZW50IG5ldmVyIG1hdGNoLCBhcyB0aGV5IGNhbiBub3QgYmUgc2VsZWN0ZWQgLVxyXG5cdCAqIHRoYXQgYWxzbyBjb3ZlcnMgYSBTaGFkb3dSb290LCB3aGljaCBpcyBhIERvY3VtZW50RnJhZ21lbnQuXHJcblx0ICpcclxuXHQgKiBAcGFyYW0gey4uLihzdHJpbmd8c3RyaW5nW10pfSB0aGVTZWxlY3RvcnMgLSBzZWxlY3RvcnMsIGdpdmVuIG9uZSBieSBvbmUgb3IgYXMgYSBsaXN0XHJcblx0ICogQHJldHVybnMge2Jvb2xlYW59IHdoZXRoZXIgb25lIG9mIHRoZSBzZWxlY3RvcnMgbWF0Y2hlc1xyXG5cdCAqIEB0aHJvd3Mge0RPTUV4Y2VwdGlvbn0gYnkgYW4gaW52YWxpZCBzZWxlY3RvclxyXG5cdCAqL1xyXG5cdFByb3RvdHlwZS5pcyA9IGZ1bmN0aW9uICgpIHtcclxuXHRcdGlmICh0aGlzIGluc3RhbmNlb2YgRG9jdW1lbnQgfHwgdGhpcyBpbnN0YW5jZW9mIERvY3VtZW50RnJhZ21lbnQpIHJldHVybiBmYWxzZTtcclxuXHRcdGVsc2UgaWYgKGFyZ3VtZW50cy5sZW5ndGggPT0gMSkge1xyXG5cdFx0XHRpZiAodHlwZW9mIGFyZ3VtZW50c1swXSA9PT0gXCJzdHJpbmdcIikgcmV0dXJuIHRoaXMubWF0Y2hlcyhhcmd1bWVudHNbMF0pO1xyXG5cdFx0XHRlbHNlIGlmICh0eXBlb2YgYXJndW1lbnRzWzBdLmxlbmd0aCA9PT0gXCJudW1iZXJcIikge1xyXG5cdFx0XHRcdGxldCBmaWx0ZXIgPSBhcmd1bWVudHNbMF07XHJcblx0XHRcdFx0Zm9yIChsZXQgaSA9IDA7IGkgPCBmaWx0ZXIubGVuZ3RoOyBpKyspIGlmICh0aGlzLm1hdGNoZXMoZmlsdGVyW2ldKSkgcmV0dXJuIHRydWU7XHJcblx0XHRcdH1cclxuXHRcdH0gZWxzZSBpZiAoYXJndW1lbnRzLmxlbmd0aCA+IDEpIHJldHVybiB0aGlzLmlzKEFycmF5LmZyb20oYXJndW1lbnRzKSk7XHJcblxyXG5cdFx0cmV0dXJuIGZhbHNlO1xyXG5cdH07XHJcblxyXG5cdC8qKlxyXG5cdCAqIFJldHVybnMgdGhlIHBhcmVudCBvZiB0aGlzIG5vZGUsIG9yIHRoZSBuZXh0IGFuY2VzdG9yIG1hdGNoaW5nIGEgc2VsZWN0b3IuXHJcblx0ICpcclxuXHQgKiBBbiBpbnZhbGlkIHNlbGVjdG9yIGlzIG5vdCBjYXVnaHQ6IGl0IHdvdWxkIHJldHVybiB0aGUgcGFyZW50IHJlYWNoZWQgc28gZmFyLFxyXG5cdCAqIHdoaWNoIGlzIGluZGlzdGluZ3Vpc2hhYmxlIGZyb20gYSBtYXRjaCwgd2hpbGUgYSBzZWxlY3RvciBtYXRjaGluZyBub3RoaW5nXHJcblx0ICogY29ycmVjdGx5IHJldHVybnMgbnVsbC4gTGV0dGluZyBpdCB0aHJvdyBrZWVwcyB0aG9zZSB0d28gYXBhcnQuXHJcblx0ICpcclxuXHQgKiBAcGFyYW0ge3N0cmluZ3xib29sZWFufSBbc2VsZWN0b3JdIC0gYSBzZWxlY3RvciB0byBsb29rIGZvciwgb3IgdGhlIGlnbm9yZVNoYWRvd1Jvb3QgZmxhZ1xyXG5cdCAqIEBwYXJhbSB7Ym9vbGVhbn0gW2lnbm9yZVNoYWRvd1Jvb3RdIC0gY29udGludWUgYXQgdGhlIGhvc3Qgb2YgYSBzaGFkb3cgcm9vdCBpbnN0ZWFkIG9mIHN0b3BwaW5nXHJcblx0ICogQHJldHVybnMge05vZGV8bnVsbH0gdGhlIHBhcmVudCwgdGhlIG1hdGNoaW5nIGFuY2VzdG9yLCBvciBudWxsIHdoZW4gdGhlcmUgaXMgbm9uZVxyXG5cdCAqIEB0aHJvd3Mge0RPTUV4Y2VwdGlvbn0gYnkgYW4gaW52YWxpZCBzZWxlY3RvclxyXG5cdCAqL1xyXG5cdFByb3RvdHlwZS5wYXJlbnQgPSBmdW5jdGlvbiAoc2VsZWN0b3IsIGlnbm9yZVNoYWRvd1Jvb3QpIHtcclxuXHRcdGlmICghdGhpcy5wYXJlbnROb2RlKSByZXR1cm4gbnVsbDtcclxuXHRcdGlnbm9yZVNoYWRvd1Jvb3QgPSB0eXBlb2Ygc2VsZWN0b3IgPT09IFwiYm9vbGVhblwiID8gc2VsZWN0b3IgOiBpZ25vcmVTaGFkb3dSb290O1xyXG5cdFx0c2VsZWN0b3IgPSB0eXBlb2Ygc2VsZWN0b3IgPT09IFwic3RyaW5nXCIgPyBzZWxlY3RvciA6IG51bGw7XHJcblxyXG5cdFx0bGV0IHBhcmVudCA9IHRoaXMucGFyZW50Tm9kZTtcclxuXHRcdGlmIChwYXJlbnQgaW5zdGFuY2VvZiBTaGFkb3dSb290ICYmIGlnbm9yZVNoYWRvd1Jvb3QpIHBhcmVudCA9IHBhcmVudC5ob3N0O1xyXG5cclxuXHRcdGlmIChzZWxlY3RvcikgcmV0dXJuIHBhcmVudC5pcyhzZWxlY3RvcikgPyBwYXJlbnQgOiBwYXJlbnQucGFyZW50KHNlbGVjdG9yLCBpZ25vcmVTaGFkb3dSb290KTtcclxuXHJcblx0XHRyZXR1cm4gcGFyZW50O1xyXG5cdH07XHJcblxyXG5cdC8qKlxyXG5cdCAqIENvbGxlY3RzIHRoZSBhbmNlc3RvcnMgb2YgdGhpcyBub2RlLCBmcm9tIHRoZSBuZWFyZXN0IG9uZSB1cHdhcmRzLlxyXG5cdCAqXHJcblx0ICogV2l0aCBhIHNlbGVjdG9yIG9ubHkgdGhlIG1hdGNoaW5nIGFuY2VzdG9ycyBhcmUgY29sbGVjdGVkLCBhcyBldmVyeSBzdGVwXHJcblx0ICogd2Fsa3MgdXAgdG8gdGhlIG5leHQgbWF0Y2guXHJcblx0ICpcclxuXHQgKiBAcGFyYW0ge3N0cmluZ3xib29sZWFufSBbc2VsZWN0b3JdIC0gYSBzZWxlY3RvciB0byBsb29rIGZvciwgb3IgdGhlIGlnbm9yZVNoYWRvd1Jvb3QgZmxhZ1xyXG5cdCAqIEBwYXJhbSB7Ym9vbGVhbn0gW2lnbm9yZVNoYWRvd1Jvb3RdIC0gY29udGludWUgYXQgdGhlIGhvc3Qgb2YgYSBzaGFkb3cgcm9vdCBpbnN0ZWFkIG9mIHN0b3BwaW5nXHJcblx0ICogQHJldHVybnMge05vZGVMaXN0fSB0aGUgYW5jZXN0b3JzLCBlbXB0eSB3aGVuIHRoZXJlIGFyZSBub25lXHJcblx0ICogQHRocm93cyB7RE9NRXhjZXB0aW9ufSBieSBhbiBpbnZhbGlkIHNlbGVjdG9yXHJcblx0ICovXHJcblx0UHJvdG90eXBlLnBhcmVudHMgPSBmdW5jdGlvbiAoKSB7XHJcblx0XHRjb25zdCByZXN1bHQgPSBuZXcgQXJyYXkoKTtcclxuXHRcdGxldCBwYXJlbnQgPSBQcm90b3R5cGUucGFyZW50LmFwcGx5KHRoaXMsIGFyZ3VtZW50cyk7XHJcblx0XHR3aGlsZSAocGFyZW50KSB7XHJcblx0XHRcdHJlc3VsdC5wdXNoKHBhcmVudCk7XHJcblx0XHRcdHBhcmVudCA9IFByb3RvdHlwZS5wYXJlbnQuYXBwbHkocGFyZW50LCBhcmd1bWVudHMpO1xyXG5cdFx0fVxyXG5cclxuXHRcdHJldHVybiBOb2RlTGlzdC5mcm9tKHJlc3VsdCk7XHJcblx0fTtcclxuXHJcblx0LyoqXHJcblx0ICogQnVpbGRzIGEgc2VsZWN0b3IgYWRkcmVzc2luZyB0aGlzIG5vZGUuXHJcblx0ICpcclxuXHQgKiBBbiBpZCBlbmRzIHRoZSBzZWxlY3RvciwgYXMgaXQgYWxyZWFkeSBpZGVudGlmaWVzIHRoZSBub2RlLiBPdGhlcndpc2UgdGhlIHRhZ1xyXG5cdCAqIG5hbWUgaXMgdXNlZCBhbmQgdGhlIHBhdGggY29udGludWVzIGF0IHRoZSBwYXJlbnQuIEEgcG9zaXRpb24gaXMgb25seSBhZGRlZFxyXG5cdCAqIHdoZW4gdGhlIHBhcmVudCBoYXMgbW9yZSB0aGFuIG9uZSBlbGVtZW50IGNoaWxkLCBhbmQgaXQgY291bnRzIGFsbCBvZiB0aGVtIC1cclxuXHQgKiB0aGF0IGlzIHdoYXQgOm50aC1jaGlsZCBkb2VzLCB1bmxpa2UgOm50aC1vZi10eXBlLlxyXG5cdCAqXHJcblx0ICogVGhlIGlkIGlzIG5vdCBlc2NhcGVkLCBzbyBhbiBpZCBuZWVkaW5nIGl0IGdpdmVzIGFuIGludmFsaWQgc2VsZWN0b3IuXHJcblx0ICpcclxuXHQgKiBAcmV0dXJucyB7c3RyaW5nfHVuZGVmaW5lZH0gdGhlIHNlbGVjdG9yLCB1bmRlZmluZWQgZm9yIGEgRG9jdW1lbnQgb3IgRG9jdW1lbnRGcmFnbWVudFxyXG5cdCAqL1xyXG5cdFByb3RvdHlwZS5zZWxlY3RvciA9IGZ1bmN0aW9uICgpIHtcclxuXHRcdGlmICh0aGlzIGluc3RhbmNlb2YgRG9jdW1lbnQgfHwgdGhpcyBpbnN0YW5jZW9mIERvY3VtZW50RnJhZ21lbnQpIHJldHVybiB1bmRlZmluZWQ7XHJcblx0XHRlbHNlIGlmICh0aGlzLmlkKSByZXR1cm4gXCIjXCIgKyB0aGlzLmlkO1xyXG5cdFx0ZWxzZSB7XHJcblx0XHRcdGxldCBzZWxlY3RvciA9IHRoaXMudGFnTmFtZS50b0xvd2VyQ2FzZSgpO1xyXG5cdFx0XHRjb25zdCBwYXJlbnQgPSB0aGlzLnBhcmVudCgpO1xyXG5cdFx0XHRpZiAocGFyZW50KSB7XHJcblx0XHRcdFx0aWYocGFyZW50LmNoaWxkcmVuLmxlbmd0aCA+IDEpIHtcclxuXHRcdFx0XHRcdGNvbnN0IGluZGV4ID0gcGFyZW50LmNoaWxkcmVuLmluZGV4T2YodGhpcyk7XHJcblx0XHRcdFx0XHRzZWxlY3RvciA9IGAke3NlbGVjdG9yfTpudGgtY2hpbGQoJHtpbmRleCArIDF9KWA7XHJcblx0XHRcdFx0fVxyXG5cdFx0XHRcdGNvbnN0IHBhcmVudFNlbGVjdG9yID0gcGFyZW50LnNlbGVjdG9yKCk7XHJcblx0XHRcdFx0cmV0dXJuIHBhcmVudFNlbGVjdG9yICE9IG51bGwgPyBgJHtwYXJlbnRTZWxlY3Rvcn0gPiAke3NlbGVjdG9yfWAgOiBzZWxlY3RvcjtcclxuXHRcdFx0fVxyXG5cdFx0XHRyZXR1cm4gc2VsZWN0b3I7XHJcblx0XHR9XHJcblx0fTtcclxuXHJcblx0LyoqXHJcblx0ICogUmV0dXJucyB0aGUgZmlyc3Qgbm9kZSBvZiBjbG9zZXN0cygpLlxyXG5cdCAqXHJcblx0ICogQHBhcmFtIHtzdHJpbmd9IGFRdWVyeVxyXG5cdCAqIEByZXR1cm5zIHtOb2RlfHVuZGVmaW5lZH0gdGhlIGZpcnN0IG5vZGUgZm91bmQsIG9yIHVuZGVmaW5lZFxyXG5cdCAqL1xyXG5cdFByb3RvdHlwZS5jbG9zZXN0ID0gZnVuY3Rpb24gKGFRdWVyeSkge1xyXG5cdFx0cmV0dXJuIHRoaXMuY2xvc2VzdHMoYVF1ZXJ5KS5maXJzdCgpO1xyXG5cdH07XHJcblxyXG5cdC8qKlxyXG5cdCAqIFNlYXJjaGVzIHRoZSBub2RlcyBjbG9zZXN0IHRvIHRoaXMgb25lIGJ5IHRoZWlyIGRpc3RhbmNlIGluIHRoZSB0cmVlLlxyXG5cdCAqXHJcblx0ICogVGhlIHN1YnRyZWUgb2YgdGhpcyBub2RlIGlzIHNlYXJjaGVkIGZpcnN0LCB0aGVuIHRoZSBzdWJ0cmVlIG9mIHRoZSBwYXJlbnQsXHJcblx0ICogYW5kIHNvIG9uIHVwd2FyZHMgLSB0aGUgc2VhcmNoIHdpZGVucyBpbiByaW5ncyB1bnRpbCBhIGxldmVsIGhhcyBtYXRjaGVzLCBhbmRcclxuXHQgKiB0aG9zZSBhcmUgcmV0dXJuZWQuIFNvIHRoZSByZXN1bHQgbWF5IGJlIGEgY2hpbGQsIGEgc2libGluZywgYSBjb3VzaW4gb3IgYW5cclxuXHQgKiBhbmNlc3RvciwgZGVwZW5kaW5nIG9uIHdoZXJlIHRoZSBmaXJzdCBtYXRjaCBhcHBlYXJzLlxyXG5cdCAqXHJcblx0ICogRGlzdGFuY2UgaXMgbWVhbnQgaW4gYm90aCBkaXJlY3Rpb25zIGhlcmUsIG90aGVyIHRoYW4gaW4gdGhlIG5hdGl2ZSBjbG9zZXN0KCksXHJcblx0ICogd2hpY2ggb25seSB3YWxrcyB1cCBhbmQgcmV0dXJucyBhbiBhbmNlc3Rvci5cclxuXHQgKlxyXG5cdCAqIEBwYXJhbSB7c3RyaW5nfSBhUXVlcnlcclxuXHQgKiBAcmV0dXJucyB7Tm9kZUxpc3R9IHRoZSBtYXRjaGVzIG9mIHRoZSBjbG9zZXN0IGxldmVsIGhhdmluZyBhbnksIGVtcHR5IHdoZW4gdGhlcmUgYXJlIG5vbmVcclxuXHQgKi9cclxuXHRQcm90b3R5cGUuY2xvc2VzdHMgPSBmdW5jdGlvbiAoYVF1ZXJ5KSB7XHJcblx0XHRjb25zdCByZXN1bHQgPSB0aGlzLmZpbmQoYVF1ZXJ5KTtcclxuXHRcdGlmIChyZXN1bHQubGVuZ3RoICE9IDApIHJldHVybiByZXN1bHQ7XHJcblxyXG5cdFx0Y29uc3QgcGFyZW50ID0gdGhpcy5wYXJlbnRFbGVtZW50O1xyXG5cdFx0aWYgKHBhcmVudCkgcmV0dXJuIHBhcmVudC5jbG9zZXN0cyhhUXVlcnkpO1xyXG5cclxuXHRcdHJldHVybiBOb2RlTGlzdC5mcm9tKFtdKTtcclxuXHR9O1xyXG5cclxuXHQvKipcclxuXHQgKiBTZWFyY2hlcyB0aGUgcXVlcnkgYXQgdGhpcyBub2RlLCBiZWxvdyBpdCwgb3IgYWJvdmUgaXQgLSBpbiB0aGF0IG9yZGVyLlxyXG5cdCAqXHJcblx0ICogVGhpcyBub2RlIGl0c2VsZiBpcyBjaGVja2VkIGZpcnN0LCB0aGVuIGl0cyBzdWJ0cmVlLCBhbmQgb25seSB0aGVuIHRoZVxyXG5cdCAqIGFuY2VzdG9ycy4gVW5saWtlIGNsb3Nlc3RzKCkgdGhlIHNlYXJjaCBkb2VzIG5vdCB3aWRlbiBpbiByaW5nczogaXQgbmV2ZXJcclxuXHQgKiBsb29rcyBpbnRvIHRoZSBzdWJ0cmVlIG9mIGFuIGFuY2VzdG9yLCBzbyBhIHNpYmxpbmcgaXMgbm90IGZvdW5kLlxyXG5cdCAqXHJcblx0ICogQHBhcmFtIHtzdHJpbmd9IGFRdWVyeVxyXG5cdCAqIEByZXR1cm5zIHtOb2RlTGlzdH0gdGhpcyBub2RlLCB0aGUgbm9kZXMgYmVsb3cgaXQsIG9yIHRoZSBtYXRjaGluZyBhbmNlc3RvciwgZW1wdHkgd2hlbiB0aGVyZSBpcyBub25lXHJcblx0ICovXHJcblx0UHJvdG90eXBlLm5lc3RlZCA9IGZ1bmN0aW9uIChhUXVlcnkpIHtcclxuXHRcdGlmICh0aGlzLmlzKGFRdWVyeSkpIHJldHVybiBOb2RlTGlzdC5mcm9tKHRoaXMpO1xyXG5cclxuXHRcdGxldCBuZXN0ZWQgPSB0aGlzLmZpbmQoYVF1ZXJ5KTtcclxuXHRcdGlmIChuZXN0ZWQgJiYgbmVzdGVkLmxlbmd0aCA+IDApIHJldHVybiBuZXN0ZWQ7XHJcblx0XHRlbHNlIHJldHVybiBOb2RlTGlzdC5mcm9tKHRoaXMucGFyZW50KGFRdWVyeSkpO1xyXG5cdH07XHJcbn0pO1xyXG5leHBvcnQgZGVmYXVsdCBzdXBwb3J0O1xyXG4iLCJpbXBvcnQgRXh0ZW5kZXIgZnJvbSBcIi4uLy4uL3V0aWxzL0V4dGVuZGVyXCI7XHJcblxyXG4vKipcclxuICogVGhlIHR5cGUgb2YgdGhlIGV2ZW50IHRyaWdnZXJlZCBvbmNlIHRoZSBkb2N1bWVudCBpcyByZWFkeS5cclxuICpcclxuICogQHR5cGUge3N0cmluZ31cclxuICovXHJcbmV4cG9ydCBjb25zdCBSRUFEWUVWRU5UID0gXCJkZWZhdWx0anMtLWV2ZW50LS1yZWFkeVwiO1xyXG5cclxuY29uc3Qgc3VwcG9ydCA9IEV4dGVuZGVyKFwiUmVhZHlFdmVudFN1cHBvcnRcIiwgUHJvdG90eXBlID0+IHtcclxuXHQvKipcclxuXHQgKiBSZWdpc3RlcnMgYSBmdW5jdGlvbiBmb3IgdGhlIHJlYWR5IGV2ZW50IG9mIHRoZSBkb2N1bWVudC5cclxuXHQgKlxyXG5cdCAqIFRoZSByZWFkeSBldmVudCBpcyB0cmlnZ2VyZWQgb25jZSB0aGUgZG9tIGlzIHBhcnNlZC4gV2hlbiB0aGUgZG9jdW1lbnQgaXNcclxuXHQgKiBhbHJlYWR5IGNvbXBsZXRlIHRoZSBldmVudCBpcyB0cmlnZ2VyZWQgcmlnaHQgYXdheSwgc28gYSBmdW5jdGlvbiByZWdpc3RlcmVkXHJcblx0ICogbGF0ZSBzdGlsbCBydW5zLiBUaGF0IHRyaWdnZXIgcmVhY2hlcyBldmVyeSByZWFkeSBsaXN0ZW5lciwgc28gZnVuY3Rpb25zXHJcblx0ICogcmVnaXN0ZXJlZCBlYXJsaWVyIHJ1biBhZ2FpbiBvbiBlYWNoIGxhdGUgcmVnaXN0cmF0aW9uLlxyXG5cdCAqXHJcblx0ICogQHBhcmFtIHtGdW5jdGlvbn0gYUZ1bmN0aW9uIC0gY2FsbGVkIG9uIHRoZSByZWFkeSBldmVudFxyXG5cdCAqIEBwYXJhbSB7Ym9vbGVhbn0gW29uY2VdIC0gcmVtb3ZlIHRoZSBmdW5jdGlvbiBhZnRlciB0aGUgbmV4dCByZWFkeSBldmVudFxyXG5cdCAqIEByZXR1cm5zIHtEb2N1bWVudH0gdGhpc1xyXG5cdCAqL1xyXG5cdFByb3RvdHlwZS5yZWFkeSA9IGZ1bmN0aW9uKGFGdW5jdGlvbiwgb25jZSl7XHJcblx0XHR0aGlzLm9uKFJFQURZRVZFTlQsIGFGdW5jdGlvbiwgb25jZSA/IHsgb25jZTogdHJ1ZSB9IDogdW5kZWZpbmVkKTtcclxuXHRcdGlmKGRvY3VtZW50LnJlYWR5U3RhdGUgPT0gXCJjb21wbGV0ZVwiKVxyXG5cdFx0XHR0aGlzLnRyaWdnZXIoUkVBRFlFVkVOVCk7XHJcblxyXG5cdFx0cmV0dXJuIHRoaXM7XHJcblx0fTtcclxuXHJcbn0pO1xyXG5leHBvcnQgZGVmYXVsdCBzdXBwb3J0OyIsImltcG9ydCBFeHRlbmRlciBmcm9tIFwiLi4vLi4vdXRpbHMvRXh0ZW5kZXJcIjtcclxuXHJcbmNvbnN0IEhJREVWQUxVRSA9IFwibm9uZVwiO1xyXG5cclxuLyoqXHJcbiAqIFdoZXRoZXIgdGhlIGVsZW1lbnQgaXMgaGlkZGVuIGJ5IGl0cyBvd24gaW5saW5lIGRpc3BsYXksIGEgZGlzcGxheSBjb21pbmcgZnJvbVxyXG4gKiBhIGNzcyBydWxlIGlzIG5vdCBzZWVuLlxyXG4gKlxyXG4gKiBAcGFyYW0ge0hUTUxFbGVtZW50fSBlbGVtZW50XHJcbiAqIEByZXR1cm5zIHtib29sZWFufVxyXG4gKi9cclxuY29uc3QgaXNIaWRkZW4gPSAoZWxlbWVudCkgPT4ge1xyXG5cdHJldHVybiBlbGVtZW50LnN0eWxlLmRpc3BsYXkgPT09IEhJREVWQUxVRVxyXG59O1xyXG5cclxuLyoqXHJcbiAqIFJlcGxhY2VzIHNob3cgYW5kIGhpZGUgb24gdGhlIGVsZW1lbnQgYnkgdmVyc2lvbnMgYm91bmQgdG8gaXQsIGNhcHR1cmluZyB0aGVcclxuICogZGlzcGxheSB0byByZXN0b3JlIG9uIHNob3cuXHJcbiAqXHJcbiAqIFRoZSBkaXNwbGF5IGlzIHJlYWQgb25jZSwgb24gdGhlIGZpcnN0IHNob3cgb3IgaGlkZSwgYW5kIGtlcHQgZnJvbSB0aGVuIG9uIC1cclxuICogdGhlIGJvdW5kIG1ldGhvZHMgc2hhZG93IHRoZSBwcm90b3R5cGUsIHNvIGluaXQgZG9lcyBub3QgcnVuIGFnYWluLiBBIGRpc3BsYXlcclxuICogc2V0IGRpcmVjdGx5IGFmdGVyd2FyZHMgaXMgbm90IHBpY2tlZCB1cC4gV2hlbiB0aGUgZWxlbWVudCBpcyBoaWRkZW4gYXQgdGhhdFxyXG4gKiBmaXJzdCBjYWxsIHRoZSBjYXB0dXJlZCB2YWx1ZSBpcyB0aGUgZW1wdHkgc3RyaW5nLCBmYWxsaW5nIGJhY2sgdG8gdGhlIGNzcy5cclxuICpcclxuICogQHBhcmFtIHtIVE1MRWxlbWVudH0gZWxlbWVudFxyXG4gKiBAcmV0dXJucyB7SFRNTEVsZW1lbnR9IHRoZSBlbGVtZW50XHJcbiAqL1xyXG5jb25zdCBpbml0ID0gKGVsZW1lbnQpID0+IHtcclxuXHRsZXQgZGlzcGxheSA9ICFpc0hpZGRlbihlbGVtZW50KSA/IGVsZW1lbnQuc3R5bGUuZGlzcGxheSA6IFwiXCI7XHJcblxyXG5cdGVsZW1lbnQuc2hvdyA9IChmdW5jdGlvbigpe1xyXG5cdFx0dGhpcy5zdHlsZS5kaXNwbGF5ID0gZGlzcGxheTtcclxuXHRcdHJldHVybiB0aGlzO1xyXG5cdH0pLmJpbmQoZWxlbWVudCk7XHJcblxyXG5cdGVsZW1lbnQuaGlkZSA9IChmdW5jdGlvbigpe1xyXG5cdFx0dGhpcy5zdHlsZS5kaXNwbGF5ID0gSElERVZBTFVFO1xyXG5cdFx0cmV0dXJuIHRoaXM7XHJcblx0fSkuYmluZChlbGVtZW50KTtcclxuXHJcblx0cmV0dXJuIGVsZW1lbnQ7XHJcbn07XHJcblxyXG5cclxuY29uc3Qgc3VwcG9ydCA9IEV4dGVuZGVyKFwiU2hvd0hpZGVTdXBwb3J0XCIsIFByb3RvdHlwZSA9PiB7XHJcblx0LyoqXHJcblx0ICogU2hvd3MgdGhlIGVsZW1lbnQgYnkgcmVzdG9yaW5nIHRoZSBkaXNwbGF5IGNhcHR1cmVkIGJlZm9yZSBpdCB3YXMgaGlkZGVuLlxyXG5cdCAqXHJcblx0ICogQHJldHVybnMge0hUTUxFbGVtZW50fSB0aGlzXHJcblx0ICovXHJcblx0UHJvdG90eXBlLnNob3cgPSBmdW5jdGlvbigpIHtcclxuXHRcdHJldHVybiBpbml0KHRoaXMpLnNob3cuYXBwbHkobnVsbCwgYXJndW1lbnRzKVxyXG5cdH07XHJcblxyXG5cdC8qKlxyXG5cdCAqIEhpZGVzIHRoZSBlbGVtZW50IGJ5IHNldHRpbmcgaXRzIGRpc3BsYXkgdG8gbm9uZS5cclxuXHQgKlxyXG5cdCAqIEByZXR1cm5zIHtIVE1MRWxlbWVudH0gdGhpc1xyXG5cdCAqL1xyXG5cdFByb3RvdHlwZS5oaWRlID0gZnVuY3Rpb24oKSB7XHJcblx0XHRyZXR1cm4gaW5pdCh0aGlzKS5oaWRlLmFwcGx5KG51bGwsIGFyZ3VtZW50cylcclxuXHR9O1xyXG5cclxuXHQvKipcclxuXHQgKiBTaG93cyB0aGUgZWxlbWVudCB3aGVuIGl0IGlzIGhpZGRlbiwgaGlkZXMgaXQgb3RoZXJ3aXNlLlxyXG5cdCAqXHJcblx0ICogT25seSBhbiBpbmxpbmUgZGlzcGxheSBvZiBub25lIGNvdW50cyBhcyBoaWRkZW4sIHNvIGFuIGVsZW1lbnQgaGlkZGVuIGJ5IGFcclxuXHQgKiBjc3MgcnVsZSBpcyBoaWRkZW4gaW5saW5lIGZpcnN0IGJlZm9yZSBpdCBzaG93cy5cclxuXHQgKlxyXG5cdCAqIEByZXR1cm5zIHtIVE1MRWxlbWVudH0gdGhpc1xyXG5cdCAqL1xyXG5cdFByb3RvdHlwZS50b2dnbGVTaG93ID0gZnVuY3Rpb24oKSB7XHJcblx0XHRyZXR1cm4gaXNIaWRkZW4odGhpcykgPyB0aGlzLnNob3coKSA6IHRoaXMuaGlkZSgpO1xyXG5cdH07XHJcblxyXG59KTtcclxuZXhwb3J0IGRlZmF1bHQgc3VwcG9ydDsiLCJpbXBvcnQgRXh0ZW5kZXIgZnJvbSBcIi4uLy4uL3V0aWxzL0V4dGVuZGVyXCI7XHJcblxyXG4vKipcclxuICogVmFsdWUgaGFuZGxpbmcgZm9yIG9uZSBraW5kIG9mIGlucHV0IGVsZW1lbnQuXHJcbiAqXHJcbiAqIEB0eXBlZGVmIHtPYmplY3R9IElucHV0VHlwZVxyXG4gKiBAcHJvcGVydHkge3N0cmluZ30gc2VsZWN0b3IgLSBtYXRjaGVzIHRoZSBlbGVtZW50cyBoYW5kbGVkIGJ5IHRoaXMgdHlwZVxyXG4gKiBAcHJvcGVydHkge2Z1bmN0aW9uKCk6Kn0gZ2V0IC0gcmVhZHMgdGhlIHZhbHVlIG9mIHRoZSBlbGVtZW50XHJcbiAqIEBwcm9wZXJ0eSB7ZnVuY3Rpb24oKik6dm9pZH0gc2V0IC0gd3JpdGVzIHRoZSB2YWx1ZSB0byB0aGUgZWxlbWVudFxyXG4gKi9cclxuXHJcbi8qKlxyXG4gKiBTaGFyZWQgc2V0dGVyIG9mIGNoZWNrYm94IGFuZCByYWRpbywgYm90aCBhcmUgc2V0IGJ5IHRoZWlyIGNoZWNrZWQgc3RhdGUuXHJcbiAqXHJcbiAqIEBwYXJhbSB7Ym9vbGVhbnxzdHJpbmd8c3RyaW5nW119IGFWYWx1ZSAtIGEgYm9vbGVhbiBpcyBhcHBsaWVkIGRpcmVjdGx5LCBhIHN0cmluZyBvciBhbiBhcnJheSBvZiBzdHJpbmdzIGNoZWNrcyB0aGUgZWxlbWVudCB3aGVuIGl0cyB2YWx1ZSBtYXRjaGVzXHJcbiAqL1xyXG5jb25zdCBjaGVja2VkU2V0dGVyID0gZnVuY3Rpb24oYVZhbHVlKXtcclxuXHRpZih0eXBlb2YgYVZhbHVlID09PSBcImJvb2xlYW5cIilcclxuXHRcdHRoaXMuY2hlY2tlZCA9IGFWYWx1ZTtcclxuXHRlbHNlIGlmKHR5cGVvZiBhVmFsdWUgPT09IFwic3RyaW5nXCIpXHJcblx0XHR0aGlzLmNoZWNrZWQgPSB0aGlzLnZhbHVlID09IGFWYWx1ZTtcclxuXHRlbHNlIGlmKEFycmF5LmlzQXJyYXkoYVZhbHVlKSlcclxuXHRcdHRoaXMuY2hlY2tlZCA9IGFWYWx1ZS5pbmRleE9mKHRoaXMudmFsdWUpID49IDA7XHJcblxyXG5cdHRoaXMudHJpZ2dlcihcImNoYW5nZWRcIik7XHJcbn07XHJcblxyXG4vKipcclxuICogVGhlIGZpcnN0IHR5cGUgd2l0aCBhIG1hdGNoaW5nIHNlbGVjdG9yIGhhbmRsZXMgdGhlIGVsZW1lbnQuXHJcbiAqXHJcbiAqIEB0eXBlIHtJbnB1dFR5cGVbXX1cclxuICovXHJcbmNvbnN0IElucHV0VHlwZXMgPSBbXHJcblx0e1xyXG5cdFx0c2VsZWN0b3IgOiBcInNlbGVjdFwiLFxyXG5cdFx0LyoqXHJcblx0XHQgKiBAcmV0dXJucyB7c3RyaW5nW119IHRoZSB2YWx1ZXMgb2YgYWxsIHNlbGVjdGVkIG9wdGlvbnNcclxuXHRcdCAqL1xyXG5cdFx0Z2V0IDogZnVuY3Rpb24oKXtcclxuXHRcdFx0Y29uc3QgcmVzdWx0ID0gW107XHJcblx0XHRcdHRoaXMuZmluZChcIm9wdGlvblwiKS5mb3JFYWNoKG9wdGlvbiA9PiB7XHJcblx0XHRcdFx0aWYob3B0aW9uLnNlbGVjdGVkKVxyXG5cdFx0XHRcdFx0cmVzdWx0LnB1c2gob3B0aW9uLnZhbHVlKTtcclxuXHRcdFx0fSk7XHRcdFx0XHJcblx0XHRcdHJldHVybiByZXN1bHQ7XHJcblx0XHR9LFxyXG5cdFx0c2V0IDogZnVuY3Rpb24oKXtcdFx0XHRcdFxyXG5cdFx0XHRsZXQgdmFsdWVzID0gW107XHJcblx0XHRcdGNvbnN0IGFyZ3MgPSBBcnJheS5mcm9tKGFyZ3VtZW50cyk7XHJcblx0XHRcdGxldCBhcmcgPSBhcmdzLnNoaWZ0KCk7XHJcblx0XHRcdHdoaWxlKGFyZyl7XHJcblx0XHRcdFx0aWYoQXJyYXkuaXNBcnJheShhcmcpKVxyXG5cdFx0XHRcdFx0dmFsdWVzID0gdmFsdWVzLmNvbmNhdChhcmcpO1xyXG5cdFx0XHRcdGVsc2VcclxuXHRcdFx0XHRcdHZhbHVlcy5wdXNoKGFyZyk7XHJcblx0XHRcdFx0XHJcblx0XHRcdFx0YXJnID0gYXJncy5zaGlmdCgpO1xyXG5cdFx0XHR9XHJcblx0XHRcdHRoaXMudmFsdWUgPSB2YWx1ZXM7XHJcblx0XHRcdHRoaXMuZmluZChcIm9wdGlvblwiKS5mb3JFYWNoKG9wdGlvbiA9PiBvcHRpb24uc2VsZWN0ZWQgPSB2YWx1ZXMuaW5kZXhPZihvcHRpb24udmFsdWUpID49IDApO1xyXG5cdFx0XHR0aGlzLnRyaWdnZXIoXCJjaGFuZ2VkXCIpO1xyXG5cdFx0fVxyXG5cdH0sXHJcblx0e1xyXG5cdFx0c2VsZWN0b3IgOiBcImlucHV0W3R5cGU9XFxcImNoZWNrYm94XFxcIl1cIixcclxuXHRcdC8qKlxyXG5cdFx0ICogQSBjaGVja2JveCBpcyBpbmRlcGVuZGVudCwgc28gYW4gdW5jaGVja2VkIG9uZSByZXBvcnRzIGZhbHNlIC0gaXQgaXMgb2ZmLFxyXG5cdFx0ICogd2hpY2ggaXMgYSB2YWx1ZSBvZiBpdHMgb3duLlxyXG5cdFx0ICpcclxuXHRcdCAqIEByZXR1cm5zIHtib29sZWFufHN0cmluZ3x1bmRlZmluZWR9IHRoZSBjaGVja2VkIHN0YXRlIHdpdGhvdXQgYSB2YWx1ZSBhdHRyaWJ1dGUsIG90aGVyd2lzZSB0aGUgdmFsdWUgd2hlbiBjaGVja2VkXHJcblx0XHQgKi9cclxuXHRcdGdldCA6IGZ1bmN0aW9uKCl7XHJcblx0XHRcdGlmKCF0aGlzLmhhc0F0dHJpYnV0ZShcInZhbHVlXCIpKVxyXG5cdFx0XHRcdHJldHVybiB0aGlzLmNoZWNrZWQ7XHJcblx0XHRcdGVsc2UgaWYodGhpcy5jaGVja2VkKVxyXG5cdFx0XHRcdHJldHVybiB0aGlzLnZhbHVlO1xyXG5cdFx0fSxcclxuXHRcdHNldCA6IGNoZWNrZWRTZXR0ZXJcclxuXHR9LFxyXG5cdHtcclxuXHRcdHNlbGVjdG9yIDogXCJpbnB1dFt0eXBlPVxcXCJyYWRpb1xcXCJdXCIsXHJcblx0XHQvKipcclxuXHRcdCAqIEFsbCByYWRpb3Mgb2YgYSBncm91cCBzaGFyZSBvbmUgbmFtZSBhbmQgb25seSBvbmUgb2YgdGhlbSBjYW4gYmUgY2hlY2tlZCxcclxuXHRcdCAqIHNvIGFuIHVuY2hlY2tlZCByYWRpbyByZXR1cm5zIHVuZGVmaW5lZCBpbnN0ZWFkIG9mIGZhbHNlIC0gaXQgY2FycmllcyBub1xyXG5cdFx0ICogdmFsdWUsIGl0IGp1c3QgaXMgbm90IHRoZSBzZWxlY3RlZCBvbmUuIFRoaXMgaXMgd2hhdCBrZWVwcyB0aGUgdW5jaGVja2VkXHJcblx0XHQgKiByYWRpb3MgZnJvbSBvdmVyd3JpdGluZyB0aGUgdmFsdWUgb2YgdGhlaXIgZ3JvdXAsIG9uY2UgdGhlIHJlc3VsdHMgb2YgYVxyXG5cdFx0ICogd2hvbGUgZ3JvdXAgZ2V0IGNvbGxlY3RlZCBieSBuYW1lLlxyXG5cdFx0ICpcclxuXHRcdCAqIEByZXR1cm5zIHtib29sZWFufHN0cmluZ3x1bmRlZmluZWR9IHRydWUgb3IgdGhlIHZhbHVlIHdoZW4gY2hlY2tlZCwgdW5kZWZpbmVkIG90aGVyd2lzZVxyXG5cdFx0ICovXHJcblx0XHRnZXQgOiBmdW5jdGlvbigpe1xyXG5cdFx0XHRpZih0aGlzLmNoZWNrZWQpXHJcblx0XHRcdFx0cmV0dXJuIHRoaXMuaGFzQXR0cmlidXRlKFwidmFsdWVcIikgPyB0aGlzLnZhbHVlIDogdHJ1ZTtcclxuXHRcdH0sXHJcblx0XHRzZXQgOiBjaGVja2VkU2V0dGVyXHJcblx0fVxyXG5dO1xyXG5cclxuLyoqXHJcbiAqIEZhbGxiYWNrIGZvciBhbGwgZWxlbWVudHMgd2l0aG91dCBhIG1hdGNoaW5nIElucHV0VHlwZS5cclxuICpcclxuICogQHR5cGUge0lucHV0VHlwZX1cclxuICovXHJcbmNvbnN0IERlZmF1bHRJbnB1dFR5cGUgPSB7XHJcblx0XHRnZXQgOiBmdW5jdGlvbigpe1xyXG5cdFx0XHRyZXR1cm4gdGhpcy52YWx1ZTtcclxuXHRcdH0sXHJcblx0XHRzZXQgOiBmdW5jdGlvbihhVmFsdWUpe1xyXG5cdFx0XHR0aGlzLnZhbHVlID0gYVZhbHVlO1xyXG5cdFx0XHR0aGlzLnRyaWdnZXIoXCJpbnB1dFwiKTtcclxuXHRcdH1cclxufTtcclxuXHJcbi8qKlxyXG4gKiBAcGFyYW0ge0VsZW1lbnR9IGFFbGVtZW50XHJcbiAqIEByZXR1cm5zIHtJbnB1dFR5cGV9IHRoZSBmaXJzdCBtYXRjaGluZyB0eXBlLCBvciBEZWZhdWx0SW5wdXRUeXBlXHJcbiAqL1xyXG5jb25zdCBnZXRJbnB1dFR5cGUgPSBmdW5jdGlvbihhRWxlbWVudCl7XHJcblx0Zm9yKGxldCBpID0gMDsgaSA8IElucHV0VHlwZXMubGVuZ3RoOyBpKyspXHJcblx0XHRpZihhRWxlbWVudC5pcyhJbnB1dFR5cGVzW2ldLnNlbGVjdG9yKSlcclxuXHRcdFx0cmV0dXJuIElucHV0VHlwZXNbaV07XHRcdFxyXG5cdHJldHVybiBEZWZhdWx0SW5wdXRUeXBlO1xyXG59O1xyXG5cclxuXHJcbmNvbnN0IHN1cHBvcnQgPSBFeHRlbmRlcihcIlZhbHVlU3VwcG9ydFwiLCBQcm90b3R5cGUgPT4ge1xyXG5cdC8qKlxyXG5cdCAqIEdldHMgb3Igc2V0cyB0aGUgdmFsdWUgb2YgdGhpcyBlbGVtZW50LlxyXG5cdCAqXHJcblx0ICogV2hhdCBhIHZhbHVlIGlzIGRlcGVuZHMgb24gdGhlIGVsZW1lbnQ6IGEgc2VsZWN0IHJldHVybnMgdGhlIHZhbHVlcyBvZiBhbGxcclxuXHQgKiBpdHMgc2VsZWN0ZWQgb3B0aW9ucywgYSBjaGVja2JveCBpdHMgY2hlY2tlZCBzdGF0ZSBvciBpdHMgdmFsdWUsIGEgcmFkaW8gYVxyXG5cdCAqIHZhbHVlIG9ubHkgd2hlbiBpdCBpcyBjaGVja2VkLCBldmVyeSBvdGhlciBlbGVtZW50IGl0cyB2YWx1ZS5cclxuXHQgKlxyXG5cdCAqIEBwYXJhbSB7Li4uKn0gW2FWYWx1ZV0gLSB0aGUgbmV3IHZhbHVlLCB0aGUgYWNjZXB0ZWQgdHlwZXMgZGVwZW5kIG9uIHRoZSBlbGVtZW50XHJcblx0ICogQHJldHVybnMgeyp8RWxlbWVudH0gdGhlIHZhbHVlIG9mIHRoZSBlbGVtZW50LCBvciB0aGlzIHdoZW4gYSB2YWx1ZSB3YXMgc2V0XHJcblx0ICovXHJcblx0UHJvdG90eXBlLnZhbCA9IGZ1bmN0aW9uKCkge1xyXG5cdFx0bGV0IHR5cGUgPSBnZXRJbnB1dFR5cGUodGhpcyk7XHJcblx0XHRpZihhcmd1bWVudHMubGVuZ3RoID09IDApXHJcblx0XHRcdHJldHVybiB0eXBlLmdldC5hcHBseSh0aGlzLCBhcmd1bWVudHMpO1xyXG5cdFx0ZWxzZVxyXG5cdFx0XHR0eXBlLnNldC5hcHBseSh0aGlzLCBhcmd1bWVudHMpO1xyXG5cdFx0XHRcclxuXHRcdHJldHVybiB0aGlzO1xyXG5cdH07XHRcclxufSk7XHJcbmV4cG9ydCBkZWZhdWx0IHN1cHBvcnQ7IiwiaW1wb3J0IFwiLi9kb20vRXZlbnRUYXJnZXRcIjtcclxuaW1wb3J0IFwiLi9kb20vTm9kZVwiO1xyXG5pbXBvcnQgXCIuL2RvbS9FbGVtZW50XCI7XHJcbmltcG9ydCBcIi4vZG9tL0RvY3VtZW50XCI7XHJcbmltcG9ydCBcIi4vZG9tL0RvY3VtZW50RnJhZ21lbnRcIjtcclxuaW1wb3J0IFwiLi9kb20vSFRNTEVsZW1lbnRcIjtcclxuaW1wb3J0IFwiLi9kb20vSFRNTElucHV0RWxlbWVudFwiO1xyXG5pbXBvcnQgXCIuL2RvbS9IVE1MVGV4dEFyZWFFbGVtZW50XCI7XHJcbmltcG9ydCBcIi4vZG9tL0hUTUxTZWxlY3RFbGVtZW50XCI7XHJcbmltcG9ydCBcIi4vZG9tL05vZGVMaXN0XCI7XHJcbmltcG9ydCBcIi4vZG9tL0h0bWxDb2xsZWN0aW9uXCI7XHJcbmltcG9ydCBcIi4vR2xvYmFsXCI7XHJcbiIsIi8qKlxyXG4gKiBBZGRzIGRlbGVnYXRpbmcgbWV0aG9kcyB0byBhIHByb3RvdHlwZSwgb25lIGZvciBlYWNoIG1ldGhvZCBvZiB0aGUgdGFyZ2V0XHJcbiAqIHByb3RvdHlwZXMuXHJcbiAqXHJcbiAqIFRoaXMgaXMgaG93IGEgTm9kZUxpc3QgZ2V0cyB0aGUgbWV0aG9kcyBvZiBhIE5vZGU6IGZvciBldmVyeSBtZXRob2QgbmFtZSBmb3VuZFxyXG4gKiBvbiB0aGUgdGFyZ2V0cywgYSBmdW5jdGlvbiBpcyBwdXQgb24gdGhlIHNvdXJjZSB0aGF0IGhhbmRzIHRoZSBjYWxsIHRvIHRoZVxyXG4gKiBjYWxsYmFjaywgdG9nZXRoZXIgd2l0aCB0aGF0IG5hbWUuIFRoZSBjYWxsYmFjayB0aGVuIGRlY2lkZXMgd2hhdCB0byBkbyAtIGZvciBhXHJcbiAqIGxpc3QgaXQgYXBwbGllcyB0aGUgbWV0aG9kIHRvIGVhY2ggbm9kZSBhbmQgY29sbGVjdHMgdGhlIHJlc3VsdHMuXHJcbiAqXHJcbiAqIEEgbmFtZSBhbHJlYWR5IG9uIHRoZSBzb3VyY2UgaXMgbGVmdCBhbG9uZSwgc28gaXRzIG93biBtZXRob2RzIHdpbi4gT25seSB2YWx1ZVxyXG4gKiBtZXRob2RzIGFyZSB0YWtlbiwgYWNjZXNzb3JzIGFyZSBza2lwcGVkLCBhcyB0aGVpciBkZXNjcmlwdG9yIGhhcyBubyB2YWx1ZS5cclxuICpcclxuICogQHBhcmFtIHtmdW5jdGlvbihzdHJpbmcsIEFyZ3VtZW50cyk6Kn0gY2FsbGJhY2sgLSBjYWxsZWQgYXMgbWV0aG9kLCB3aXRoIHRoZSBuYW1lIGFuZCB0aGUgYXJndW1lbnRzXHJcbiAqIEBwYXJhbSB7T2JqZWN0fSBzb3VyY2UgLSB0aGUgcHJvdG90eXBlIHRoZSBkZWxlZ2F0aW5nIG1ldGhvZHMgYXJlIGFkZGVkIHRvXHJcbiAqIEBwYXJhbSB7Li4uT2JqZWN0fSB0aGVUYXJnZXRzIC0gdGhlIHByb3RvdHlwZXMgd2hvc2UgbWV0aG9kIG5hbWVzIGFyZSBkZWxlZ2F0ZWRcclxuICovXHJcbmNvbnN0IERlbGVnYXRlckJ1aWxkZXIgPSBmdW5jdGlvbigpIHtcclxuXHRjb25zdCBhcmdzID0gQXJyYXkuZnJvbShhcmd1bWVudHMpO1xyXG5cdGNvbnN0IGNhbGxiYWNrID0gYXJncy5zaGlmdCgpO1xyXG5cdGNvbnN0IHNvdXJjZSA9IGFyZ3Muc2hpZnQoKTtcclxuXHRhcmdzLmZvckVhY2goIHRhcmdldCA9PntcclxuXHRcdE9iamVjdC5nZXRPd25Qcm9wZXJ0eU5hbWVzKHRhcmdldClcclxuXHRcdC5mb3JFYWNoKG5hbWUgPT4ge1xyXG5cdFx0XHRjb25zdCBwcm9wID0gT2JqZWN0LmdldE93blByb3BlcnR5RGVzY3JpcHRvcih0YXJnZXQsIG5hbWUpO1xyXG5cdFx0XHRpZiAodHlwZW9mIHNvdXJjZVtuYW1lXSA9PT0gXCJ1bmRlZmluZWRcIiAmJiB0eXBlb2YgcHJvcC52YWx1ZSA9PT0gXCJmdW5jdGlvblwiKVxyXG5cdFx0XHRcdHNvdXJjZVtuYW1lXSA9IGZ1bmN0aW9uKCl7XHJcblx0XHRcdFx0XHRyZXR1cm4gY2FsbGJhY2suY2FsbCh0aGlzLCBuYW1lLCBhcmd1bWVudHMpO1xyXG5cdFx0XHRcdH07XHJcblx0XHR9KTtcclxuXHR9KTtcclxuXHJcbn07XHJcbmV4cG9ydCBkZWZhdWx0IERlbGVnYXRlckJ1aWxkZXI7IiwiLyoqXHJcbiAqIEFwcGxpZXMgZXh0ZW5zaW9ucyB0byB0aGUgcHJvdG90eXBlIG9mIGEgdHlwZS5cclxuICpcclxuICogQHBhcmFtIHtGdW5jdGlvbn0gYVR5cGUgLSB0aGUgdHlwZSB3aG9zZSBwcm90b3R5cGUgZ2V0cyBleHRlbmRlZFxyXG4gKiBAcGFyYW0gey4uLmZ1bmN0aW9uKEZ1bmN0aW9uKTp2b2lkfSB0aGVFeHRlbmRlcnMgLSB0aGUgd3JhcHBlZCBleHRlbnNpb25zIHRvIGFwcGx5LCBpbiBvcmRlclxyXG4gKi9cclxuY29uc3QgZXh0ZW5kUHJvdG90eXBlID0gZnVuY3Rpb24oKXtcclxuXHRjb25zdCBhcmdzID0gQXJyYXkuZnJvbShhcmd1bWVudHMpO1xyXG5cdGNvbnN0IHR5cGUgPSBhcmdzLnNoaWZ0KCk7XHJcblx0d2hpbGUoYXJncy5sZW5ndGggPiAwKXtcclxuXHRcdGNvbnN0IGV4dGVuZGVyID0gYXJncy5zaGlmdCgpO1xyXG5cdFx0ZXh0ZW5kZXIodHlwZSk7XHJcblx0fVxyXG59O1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgZXh0ZW5kUHJvdG90eXBlOyIsImltcG9ydCBVdGlscyBmcm9tIFwiLi9VdGlsc1wiO1xyXG5cclxuLyoqXHJcbiAqIFdoaWNoIGV4dGVuc2lvbiBpcyBhcHBsaWVkIHRvIHdoaWNoIHR5cGUsIGtlcHQgb24gdGhlIGdsb2JhbCBvYmplY3Qgc28gaXQgaXNcclxuICogc2hhcmVkIGFjcm9zcyBzZXBhcmF0ZSBsb2FkcyBvZiB0aGUgbGlicmFyeS5cclxuICpcclxuICogQHR5cGUge09iamVjdDxzdHJpbmcsIE9iamVjdDxzdHJpbmcsIGJvb2xlYW4+Pn1cclxuICovXHJcbmNvbnN0IEVYVEVOU0lPTlNfTUFQID0gVXRpbHMuZ2xvYmFsVmFyKFwiX19fRE9NX0FQSV9FWFRFTlNJT05fTUFQX19fXCIsIHt9KTtcclxuXHJcbi8qKlxyXG4gKiBXcmFwcyBhbiBleHRlbnNpb24gc28gaXQgYXBwbGllcyB0byB0aGUgcHJvdG90eXBlIG9mIGEgdHlwZSBvbmx5IG9uY2UuXHJcbiAqXHJcbiAqIFRoZSByZXR1cm5lZCBmdW5jdGlvbiBpcyB3aGF0IGV4dGVuZFByb3RvdHlwZSgpIGNhbGxzIHdpdGggYSB0eXBlLiBBcHBseWluZyB0aGVcclxuICogc2FtZSBuYW1lZCBleHRlbnNpb24gdG8gdGhlIHNhbWUgdHlwZSBhZ2FpbiBpcyBhIG5vLW9wIHdpdGggYSB3YXJuaW5nLCBzb1xyXG4gKiBsb2FkaW5nIHRoZSBsaWJyYXJ5IHR3aWNlIGRvZXMgbm90IHBhdGNoIHRoZSBwcm90b3R5cGVzIHR3aWNlLlxyXG4gKlxyXG4gKiBAcGFyYW0ge3N0cmluZ30gYU5hbWUgLSB0aGUgbmFtZSBvZiB0aGUgZXh0ZW5zaW9uLCB1bmlxdWUgcGVyIHR5cGVcclxuICogQHBhcmFtIHtmdW5jdGlvbihPYmplY3QpOnZvaWR9IGFFeHRlbnRpb24gLSBhZGRzIHRoZSBtZW1iZXJzIHRvIHRoZSBwcm90b3R5cGVcclxuICogQHJldHVybnMge2Z1bmN0aW9uKEZ1bmN0aW9uKTp2b2lkfSBhIGZ1bmN0aW9uIGFwcGx5aW5nIHRoZSBleHRlbnNpb24gdG8gYSB0eXBlXHJcbiAqL1xyXG5jb25zdCBFeHRlbmRlciA9IGZ1bmN0aW9uKGFOYW1lLCBhRXh0ZW50aW9uKXtcclxuXHRyZXR1cm4gZnVuY3Rpb24oYVR5cGUpe1xyXG5cdFx0Y29uc3Qge25hbWUsIHByb3RvdHlwZX0gPSBhVHlwZTtcclxuXHRcdGxldCBleHRlbnNpb25zID0gRVhURU5TSU9OU19NQVBbbmFtZV07XHJcblx0XHRpZighZXh0ZW5zaW9ucylcclxuXHRcdFx0ZXh0ZW5zaW9ucyA9IEVYVEVOU0lPTlNfTUFQW25hbWVdID0ge307XHRcdFxyXG5cdFx0XHJcblx0XHRpZighZXh0ZW5zaW9uc1thTmFtZV0pe1xyXG5cdFx0XHRleHRlbnNpb25zW2FOYW1lXSA9IHRydWU7XHJcblx0XHRcdGFFeHRlbnRpb24ocHJvdG90eXBlKTtcclxuXHRcdH1cclxuXHRcdGVsc2VcclxuXHRcdFx0Y29uc29sZS53YXJuKGBEdXBsaWNhdGVkIGxvYWQgb2YgZXh0ZW5zaW9uIFxcXCIke2FOYW1lfVxcXCIhYCk7XHJcblx0fVxyXG59O1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgRXh0ZW5kZXI7IiwiXHJcbi8qKlxyXG4gKiBUaGUgZ2xvYmFsIG9iamVjdCBvZiB0aGUgY3VycmVudCBlbnZpcm9ubWVudC5cclxuICpcclxuICogRGV0ZWN0ZWQgd2l0aCB0eXBlb2YgZ3VhcmRzLCBiZWNhdXNlIGEgYmFyZSByZWZlcmVuY2UgdG8gYW4gdW5kZWNsYXJlZCBuYW1lXHJcbiAqIHRocm93cyBpbnN0ZWFkIG9mIGJlaW5nIGZhbHN5IC0gc28gYSBwbGFpbiB3aW5kb3cgfHwgZ2xvYmFsIGNoYWluIHdvdWxkIGJyZWFrXHJcbiAqIGV2ZXJ5d2hlcmUgd2luZG93IGlzIG1pc3NpbmcsIG5vdCBmYWxsIHRocm91Z2guIGdsb2JhbFRoaXMgY292ZXJzIHRoZSBicm93c2VyLFxyXG4gKiBub2RlIGFuZCB3b3JrZXJzLCB0aGUgcmVzdCBzdGF5cyBhcyBhIGZhbGxiYWNrIGZvciBvbGRlciBydW50aW1lcy5cclxuICpcclxuICogQHR5cGUge09iamVjdH1cclxuICovXHJcbmV4cG9ydCBjb25zdCBHTE9CQUwgPSB0eXBlb2YgZ2xvYmFsVGhpcyAhPT0gXCJ1bmRlZmluZWRcIiA/IGdsb2JhbFRoaXMgOlxyXG5cdHR5cGVvZiB3aW5kb3cgIT09IFwidW5kZWZpbmVkXCIgPyB3aW5kb3cgOlxyXG5cdHR5cGVvZiBnbG9iYWwgIT09IFwidW5kZWZpbmVkXCIgPyBnbG9iYWwgOlxyXG5cdHR5cGVvZiBzZWxmICE9PSBcInVuZGVmaW5lZFwiID8gc2VsZiA6IHt9O1xyXG5cclxuY29uc3QgVXRpbHMgPSB7XHJcblx0LyoqXHJcblx0ICogVGhlIGdsb2JhbCBvYmplY3QsIHNhbWUgYXMgR0xPQkFMLlxyXG5cdCAqXHJcblx0ICogQHR5cGUge09iamVjdH1cclxuXHQgKi9cclxuXHRnbG9iYWwgOiBHTE9CQUwsXHJcblxyXG5cdC8qKlxyXG5cdCAqIFJlYWRzIGEgdmFyaWFibGUgZnJvbSB0aGUgZ2xvYmFsIG9iamVjdCwgaW5pdGlhbGl6aW5nIGl0IG9uY2Ugd2hlbiBhIHZhbHVlXHJcblx0ICogaXMgZ2l2ZW4gYW5kIG5vbmUgaXMgc2V0IHlldC5cclxuXHQgKlxyXG5cdCAqIFVzZWQgdG8gc2hhcmUgc3RhdGUgYmV0d2VlbiBzZXBhcmF0ZSBsb2FkcyBvZiB0aGUgbGlicmFyeSwgd2hpY2ggZWFjaCBoYXZlXHJcblx0ICogdGhlaXIgb3duIG1vZHVsZSBzY29wZSBidXQgdGhlIG9uZSBnbG9iYWwgb2JqZWN0IGluIGNvbW1vbi5cclxuXHQgKlxyXG5cdCAqIEBwYXJhbSB7c3RyaW5nfSBhTmFtZSAtIHRoZSBuYW1lIG9uIHRoZSBnbG9iYWwgb2JqZWN0XHJcblx0ICogQHBhcmFtIHsqfSBbYUluaXRWYWx1ZV0gLSB0aGUgdmFsdWUgdG8gc2V0IHdoZW4gdGhlIG5hbWUgaXMgc3RpbGwgdW5kZWZpbmVkXHJcblx0ICogQHJldHVybnMgeyp9IHRoZSB2YWx1ZSBvbiB0aGUgZ2xvYmFsIG9iamVjdFxyXG5cdCAqL1xyXG5cdGdsb2JhbFZhciA6IGZ1bmN0aW9uKGFOYW1lLCBhSW5pdFZhbHVlKXtcclxuXHRcdGlmKGFyZ3VtZW50cy5sZW5ndGggPT09IDIgJiYgdHlwZW9mIEdMT0JBTFthTmFtZV0gPT09IFwidW5kZWZpbmVkXCIpXHJcblx0XHRcdEdMT0JBTFthTmFtZV0gPSBhSW5pdFZhbHVlO1xyXG5cclxuXHRcdHJldHVybiBHTE9CQUxbYU5hbWVdO1xyXG5cdH1cclxufTtcclxuXHJcbmV4cG9ydCBkZWZhdWx0IFV0aWxzOyIsImltcG9ydCB7IGxhenlQcm9taXNlIH0gZnJvbSBcIkBkZWZhdWx0LWpzL2RlZmF1bHRqcy1jb21tb24tdXRpbHMvc3JjL1Byb21pc2VVdGlscy5qc1wiO1xuaW1wb3J0IHtkZWZpbmV9IGZyb20gXCIuL3V0aWxzL0RlZmluZUNvbXBvbmVudEhlbHBlci5qc1wiO1xuaW1wb3J0IHsgdXVpZCB9IGZyb20gXCJAZGVmYXVsdC1qcy9kZWZhdWx0anMtY29tbW9uLXV0aWxzL3NyYy9VVUlELmpzXCI7XG5pbXBvcnQgeyB0cmlnZ2VyVGltZW91dCB9IGZyb20gXCIuL0NvbnN0YW50cy5qc1wiO1xuaW1wb3J0IHsgYXR0cmlidXRlQ2hhbmdlRXZlbnRuYW1lLCBjb21wb25lbnRFdmVudG5hbWUgfSBmcm9tIFwiLi91dGlscy9FdmVudEhlbHBlci5qc1wiO1xuXG4vKipcbiAqIEBtb2R1bGUgQ29tcG9uZW50XG4gKlxuICogRmFjdG9yeSBhbmQgYmFzZSBjbGFzcyBmb3IgYXN5bmNocm9ub3VzIHdlYiBjb21wb25lbnRzLiBBIGNvbXBvbmVudCBleHBvc2VzIGFcbiAqIGByZWFkeWAgcHJvbWlzZSB0aGF0IHJlc29sdmVzIG9uY2UgYWxsIHBvc3QtY29uc3RydWN0IHN0ZXBzIG9mIHtAbGluayBDb21wb25lbnQjaW5pdH1cbiAqIGhhdmUgcnVuLlxuICovXG5cbi8qKlxuICogQ3JlYXRlcyBhIGRvY3VtZW50LXVuaXF1ZSBpZCBieSBjb21iaW5pbmcgYW4gb3B0aW9uYWwgcHJlZml4IGFuZCBzdWZmaXggd2l0aFxuICogYSBnZW5lcmF0ZWQge0BsaW5rIHV1aWR9LiBJdCByZXRyaWVzIHVwIHRvIDEwMCB0aW1lcyB1bnRpbCB0aGUgaWQgaXMgbm90IHlldFxuICogcHJlc2VudCBpbiB0aGUgZG9jdW1lbnQ7IGlmIG5vIHVuaXF1ZSBpZCBjYW4gYmUgcHJvZHVjZWQgaXQgbG9ncyBhbiBlcnJvciBhbmRcbiAqIHJldHVybnMgdGhlIGxhc3QgZ2VuZXJhdGVkIGlkLlxuICpcbiAqIEBwYXJhbSB7c3RyaW5nfSBbcHJlZml4XSAtIHRleHQgcHJlcGVuZGVkIHRvIHRoZSBnZW5lcmF0ZWQgdXVpZC5cbiAqIEBwYXJhbSB7c3RyaW5nfSBbc3VmZml4XSAtIHRleHQgYXBwZW5kZWQgdG8gdGhlIGdlbmVyYXRlZCB1dWlkLlxuICogQHJldHVybnMge3N0cmluZ30gYSAoYmVzdC1lZmZvcnQpIGRvY3VtZW50LXVuaXF1ZSBpZC5cbiAqL1xuZXhwb3J0IGNvbnN0IGNyZWF0ZVVVSUQgPSAocHJlZml4LCBzdWZmaXgpID0+IHtcblx0bGV0IGNvdW50ID0gMDtcblx0bGV0IGlkID0gbnVsbDtcblx0d2hpbGUgKGNvdW50IDwgMTAwKSB7XG5cdFx0aWQgPSBgJHtwcmVmaXggPyBwcmVmaXggOiBcIlwifSR7dXVpZCgpfSR7c3VmZml4ID8gc3VmZml4IDogXCJcIn1gO1xuXHRcdGlmICghZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoaWQpKSByZXR1cm4gaWQ7XG5cblx0XHRjb3VudCsrO1xuXHR9XG5cdGNvbnNvbGUuZXJyb3IobmV3IEVycm9yKFwiVG8gbWFueSByZXRyaWVzIHRvIGNyZWF0ZSBhbiB1bmlxdWUgaWQgLSBjcmVhdGVkIGlkIGlzIG5vdCB1bmlxdWUhXCIpKTtcblx0cmV0dXJuIGlkO1xufTtcblxuLyoqXG4gKiBAdHlwZWRlZiB7T2JqZWN0fSBDb21wb25lbnRPcHRpb25zXG4gKiBAcHJvcGVydHkge2Jvb2xlYW59IFtzaGFkb3dSb290PWZhbHNlXSAtIHdoZW4gYHRydWVgIGFuIG9wZW4gc2hhZG93IHJvb3QgaXMgYXR0YWNoZWQuXG4gKiBAcHJvcGVydHkge05vZGV8c3RyaW5nfGZ1bmN0aW9uKENvbXBvbmVudCk6IChOb2RlfHN0cmluZyl9IFtjb250ZW50PW51bGxdIC0gY29udGVudCBhcHBlbmRlZCB0byB0aGUgY29tcG9uZW50J3Mgcm9vdDsgYSBmdW5jdGlvbiByZWNlaXZlcyB0aGUgY29tcG9uZW50IGFuZCByZXR1cm5zIHRoZSBjb250ZW50LlxuICogQHByb3BlcnR5IHtib29sZWFufSBbY3JlYXRlVUlEPWZhbHNlXSAtIHdoZW4gYHRydWVgIGEgdW5pcXVlIGBpZGAgYXR0cmlidXRlIGlzIGFzc2lnbmVkIGR1cmluZyB7QGxpbmsgQ29tcG9uZW50I2luaXR9LlxuICogQHByb3BlcnR5IHtzdHJpbmd9IFt1aWRQcmVmaXg9XCJpZC1cIl0gLSBwcmVmaXggdXNlZCBmb3IgdGhlIGdlbmVyYXRlZCBpZCB3aGVuIGBjcmVhdGVVSURgIGlzIGB0cnVlYC5cbiAqIEBwcm9wZXJ0eSB7c3RyaW5nfSBbdWlkU3VmZml4PVwiXCJdIC0gc3VmZml4IHVzZWQgZm9yIHRoZSBnZW5lcmF0ZWQgaWQgd2hlbiBgY3JlYXRlVUlEYCBpcyBgdHJ1ZWAuXG4gKiBAcHJvcGVydHkge0FycmF5PGZ1bmN0aW9uKENvbXBvbmVudCk6ICh2b2lkfFByb21pc2UpPn0gW3Bvc3RDb25zdHJ1Y3RzPW51bGxdIC0gYWRkaXRpb25hbCBwb3N0LWNvbnN0cnVjdCBmdW5jdGlvbnMgcnVuIGR1cmluZyB7QGxpbmsgQ29tcG9uZW50I2luaXR9LlxuICogQHByb3BlcnR5IHtBcnJheTxmdW5jdGlvbihDb21wb25lbnQpOiAodm9pZHxQcm9taXNlKT59IFtwb3N0Q29uc3R1Y3RzPW51bGxdIC0gZGVwcmVjYXRlZCBtaXNzcGVsbGVkIGFsaWFzIG9mIGBwb3N0Q29uc3RydWN0c2A7IHVzZSBgcG9zdENvbnN0cnVjdHNgIGluc3RlYWQuXG4gKi9cblxuLyoqXG4gKiBCdWlsZHMgYSBjb21wb25lbnQgYmFzZSBjbGFzcyBleHRlbmRpbmcgdGhlIGdpdmVuIEhUTUwgZWxlbWVudCB0eXBlLlxuICpcbiAqIEBwYXJhbSB7dHlwZW9mIEhUTUxFbGVtZW50fSBodG1sQmFzZVR5cGUgLSB0aGUgSFRNTCBlbGVtZW50IGNsYXNzIHRvIGV4dGVuZC5cbiAqIEByZXR1cm5zIHt0eXBlb2YgSFRNTEVsZW1lbnR9IGEgY29tcG9uZW50IGNsYXNzIGV4dGVuZGluZyBgaHRtbEJhc2VUeXBlYC5cbiAqL1xuY29uc3QgYnVpbGRDbGFzcyA9IChodG1sQmFzZVR5cGUpID0+IHtcblx0LyoqXG5cdCAqIEFzeW5jaHJvbm91cyB3ZWIgY29tcG9uZW50IGJhc2UgY2xhc3MuXG5cdCAqXG5cdCAqIEBjbGFzcyBDb21wb25lbnRcblx0ICogQGV4dGVuZHMgSFRNTEVsZW1lbnRcblx0ICovXG5cdGNvbnN0IGNsYXp6ID0gY2xhc3MgQ29tcG9uZW50IGV4dGVuZHMgaHRtbEJhc2VUeXBlIHtcblxuXHRcdC8qKlxuXHRcdCAqIFRhZyBuYW1lIHVzZWQgdG8gcmVnaXN0ZXIgdGhlIGNvbXBvbmVudC4gTXVzdCBiZSBvdmVycmlkZGVuIGFzIGFcblx0XHQgKiBzdGF0aWMgZ2V0dGVyIG9uIHRoZSBjb25jcmV0ZSBjb21wb25lbnQgY2xhc3MuXG5cdFx0ICpcblx0XHQgKiBAc3RhdGljXG5cdFx0ICogQHR5cGUge3N0cmluZ31cblx0XHQgKiBAdGhyb3dzIHtFcnJvcn0gYWx3YXlzLCBvbiB0aGUgYmFzZSBjbGFzcy5cblx0XHQgKi9cblx0XHRzdGF0aWMgZ2V0IE5PREVOQU1FKCkge3Rocm93IG5ldyBFcnJvcihcIk5PREVOQU1FIG11c3QgYmUgZGVmaW5lZCBhcyBzdGF0aWMgb24gY29tcG9uZW50IGNsYXNzIVwiKTt9XG5cblx0XHQvKipcblx0XHQgKiBSZWdpc3RlcnMgdGhpcyBjb21wb25lbnQgY2xhc3MgYXMgYSBjdXN0b20gZWxlbWVudC5cblx0XHQgKlxuXHRcdCAqIEBzdGF0aWNcblx0XHQgKiBAdHlwZSB7dHlwZW9mIGltcG9ydChcIi4vdXRpbHMvRGVmaW5lQ29tcG9uZW50SGVscGVyLmpzXCIpLmRlZmluZX1cblx0XHQgKi9cblx0XHRzdGF0aWMgZGVmaW5lID0gZGVmaW5lO1xuXG5cdFx0LyoqXG5cdFx0ICogQXR0cmlidXRlcyBvYnNlcnZlZCBmb3Ige0BsaW5rIENvbXBvbmVudCNhdHRyaWJ1dGVDaGFuZ2VkQ2FsbGJhY2t9LlxuXHRcdCAqIE92ZXJyaWRlIHRvIG9ic2VydmUgYXR0cmlidXRlcy5cblx0XHQgKlxuXHRcdCAqIEBzdGF0aWNcblx0XHQgKiBAcmVhZG9ubHlcblx0XHQgKiBAdHlwZSB7QXJyYXk8c3RyaW5nPn1cblx0XHQgKi9cblx0XHRzdGF0aWMgZ2V0IG9ic2VydmVkQXR0cmlidXRlcygpIHtcblx0XHRcdHJldHVybiBbXTtcblx0XHR9XG5cblx0XHQjcmVhZHkgPSBudWxsO1xuXHRcdCNwb3N0Q29uc3RydWN0cyA9IFtdO1xuXG5cdFx0LyoqXG5cdFx0ICogQHBhcmFtIHtDb21wb25lbnRPcHRpb25zfSBbb3B0aW9ucz17fV0gLSBjb25maWd1cmF0aW9uIGZvciB0aGUgY29tcG9uZW50LlxuXHRcdCAqL1xuXHRcdGNvbnN0cnVjdG9yKHsgc2hhZG93Um9vdCA9IGZhbHNlLCBjb250ZW50ID0gbnVsbCwgY3JlYXRlVUlEID0gZmFsc2UsIHVpZFByZWZpeCA9IFwiaWQtXCIsIHVpZFN1ZmZpeCA9IFwiXCIsIHBvc3RDb25zdHJ1Y3RzID0gbnVsbCwgcG9zdENvbnN0dWN0cyA9IG51bGwgfSA9IHt9KSB7XG5cdFx0XHRzdXBlcigpO1xuXHRcdFx0dGhpcy4jcmVhZHkgPSBsYXp5UHJvbWlzZSgpO1xuXHRcdFx0aWYgKGNyZWF0ZVVJRCkgdGhpcy4jcG9zdENvbnN0cnVjdHMucHVzaChhc3luYyAoKSA9PiB0aGlzLmF0dHIoXCJpZFwiLCBjcmVhdGVVVUlEKHVpZFByZWZpeCwgdWlkU3VmZml4KSkpO1xuXG5cdFx0XHRpZiAoc2hhZG93Um9vdCkgdGhpcy5hdHRhY2hTaGFkb3coeyBtb2RlOiBcIm9wZW5cIiB9KTtcblxuXHRcdFx0aWYgKGNvbnRlbnQpIHRoaXMucm9vdC5hcHBlbmQodHlwZW9mIGNvbnRlbnQgPT09IFwiZnVuY3Rpb25cIiA/IGNvbnRlbnQodGhpcykgOiBjb250ZW50KTtcblxuXHRcdFx0Ly8gYHBvc3RDb25zdHVjdHNgIGlzIHRoZSBkZXByZWNhdGVkIChtaXNzcGVsbGVkKSBhbGlhcyBvZiBgcG9zdENvbnN0cnVjdHNgXG5cdFx0XHRpZiAocG9zdENvbnN0cnVjdHMgPT0gbnVsbCAmJiBwb3N0Q29uc3R1Y3RzICE9IG51bGwpIHtcblx0XHRcdFx0Y29uc29sZS53YXJuKGBDb21wb25lbnQgb3B0aW9uIFwicG9zdENvbnN0dWN0c1wiIGlzIGRlcHJlY2F0ZWQgLSB1c2UgXCJwb3N0Q29uc3RydWN0c1wiIGluc3RlYWQuYCk7XG5cdFx0XHRcdHBvc3RDb25zdHJ1Y3RzID0gcG9zdENvbnN0dWN0cztcblx0XHRcdH1cblxuXHRcdFx0aWYocG9zdENvbnN0cnVjdHMgaW5zdGFuY2VvZiBBcnJheSlcblx0XHRcdFx0Zm9yKGxldCBwb3N0IG9mIHBvc3RDb25zdHJ1Y3RzKVxuXHRcdFx0XHRcdGlmKHR5cGVvZiBwb3N0ID09PSBcImZ1bmN0aW9uXCIpXG5cdFx0XHRcdFx0XHR0aGlzLiNwb3N0Q29uc3RydWN0cy5wdXNoKHBvc3QpXG5cdFx0fVxuXG5cblx0XHQvKipcblx0XHQgKiBBcnJheSBvZiBwb3N0IGNvbnN0cnVjdCBmdW5jdGlvbnNcblx0XHQgKlxuXHRcdCAqIEByZWFkb25seVxuXHRcdCAqIEB0eXBlIHtBcnJheTxGdW5jdGlvbj59XG5cdFx0ICovXG5cdFx0Z2V0IHBvc3RDb25zdHJ1Y3RzKCl7XG5cdFx0XHRyZXR1cm4gdGhpcy4jcG9zdENvbnN0cnVjdHM7XG5cdFx0fVxuXG5cblx0XHQvKipcblx0XHQgKiBUaGUgcmVuZGVyIHJvb3Qgb2YgdGhlIGNvbXBvbmVudDogdGhlIHNoYWRvdyByb290IHdoZW4gcHJlc2VudCxcblx0XHQgKiBvdGhlcndpc2UgdGhlIGNvbXBvbmVudCBpdHNlbGYuXG5cdFx0ICpcblx0XHQgKiBAcmVhZG9ubHlcblx0XHQgKiBAdHlwZSB7SFRNTEVsZW1lbnR8U2hhZG93Um9vdH1cblx0XHQgKi9cblx0XHRnZXQgcm9vdCgpIHtcblx0XHRcdHJldHVybiB0aGlzLnNoYWRvd1Jvb3QgfHwgdGhpcztcblx0XHR9XG5cblxuXHRcdC8qKlxuXHRcdCAqIFByb21pc2UgdGhhdCByZXNvbHZlcyBvbmNlIHtAbGluayBDb21wb25lbnQjaW5pdH0gaGFzIGNvbXBsZXRlZC5cblx0XHQgKlxuXHRcdCAqIEByZWFkb25seVxuXHRcdCAqIEB0eXBlIHtQcm9taXNlfVxuXHRcdCAqL1xuXHRcdGdldCByZWFkeSgpIHtcblx0XHRcdHJldHVybiB0aGlzLiNyZWFkeTtcblx0XHR9XG5cblx0XHQvKipcblx0XHQgKiBGcmFtZXdvcmstaW50ZXJuYWwgaW5pdGlhbGl6YXRpb24gb3JjaGVzdHJhdG9yOiBydW5zIGV2ZXJ5IHBvc3QtY29uc3RydWN0XG5cdFx0ICogZnVuY3Rpb24gaW4gb3JkZXIgYW5kIHRoZW4gdGhlIG92ZXJyaWRhYmxlIHtAbGluayBDb21wb25lbnQjaW5pdH0gaG9vay5cblx0XHQgKiBEcml2ZW4gZXhjbHVzaXZlbHkgYnkge0BsaW5rIENvbXBvbmVudCNjb25uZWN0ZWRDYWxsYmFja30gYW5kXG5cdFx0ICoge0BsaW5rIENvbXBvbmVudCNyZWluaXR9OyBiZWluZyBwcml2YXRlLCB0aGUgZnVsbCBsaWZlY3ljbGUgY2FuIG5ldmVyIGJlXG5cdFx0ICogdHJpZ2dlcmVkIHBhcnRpYWxseSBvciBieSBhY2NpZGVudCAoZS5nLiBhIG1hbnVhbCBgaW5pdCgpYCBjYWxsKS5cblx0XHQgKlxuXHRcdCAqIEBhc3luY1xuXHRcdCAqIEByZXR1cm5zIHtQcm9taXNlfSByZXNvbHZlcyB3aXRoIHRoZSByZXR1cm4gdmFsdWUgb2Yge0BsaW5rIENvbXBvbmVudCNpbml0fS5cblx0XHQgKi9cblx0XHRhc3luYyAjcnVuSW5pdCgpIHtcblx0XHRcdGZvciAobGV0IGZ1bmMgb2YgdGhpcy4jcG9zdENvbnN0cnVjdHMpIGF3YWl0IGZ1bmModGhpcyk7XG5cdFx0XHRyZXR1cm4gYXdhaXQgdGhpcy5pbml0KCk7XG5cdFx0fVxuXG5cdFx0LyoqXG5cdFx0ICogUnVucyB0aGUgaW5pdGlhbGl6YXRpb24gb3JjaGVzdHJhdG9yIGFuZCBzZXR0bGVzIHtAbGluayBDb21wb25lbnQjcmVhZHl9XG5cdFx0ICogd2l0aCBpdHMgcmVzdWx0LlxuXHRcdCAqXG5cdFx0ICogQHJldHVybnMge1Byb21pc2V9IHRoZSB7QGxpbmsgQ29tcG9uZW50I3JlYWR5fSBwcm9taXNlLlxuXHRcdCAqL1xuXHRcdCNzZXR0bGUoKSB7XG5cdFx0XHR0aGlzLiNydW5Jbml0KClcblx0XHRcdFx0LnRoZW4oKHZhbHVlKSA9PiB0aGlzLiNyZWFkeS5yZXNvbHZlKHZhbHVlKSlcblx0XHRcdFx0LmNhdGNoKChlcnJvcikgPT4gdGhpcy4jcmVhZHkucmVzb2x2ZShlcnJvcikpO1xuXHRcdFx0cmV0dXJuIHRoaXMuI3JlYWR5O1xuXHRcdH1cblxuXHRcdC8qKlxuXHRcdCAqIE92ZXJyaWRlIGhvb2sgZm9yIGFzeW5jaHJvbm91cyBjb21wb25lbnQgc2V0dXAuIEl0IHJ1bnMgYXV0b21hdGljYWxseVxuXHRcdCAqIGFmdGVyIHRoZSBwb3N0LWNvbnN0cnVjdCBmdW5jdGlvbnMgb25jZSB0aGUgY29tcG9uZW50IGlzIGNvbm5lY3RlZCwgYW5kXG5cdFx0ICogaXRzIHJldHVybiB2YWx1ZSBzZXR0bGVzIHtAbGluayBDb21wb25lbnQjcmVhZHl9LiBgdGhpcy5yb290YCBhbHJlYWR5XG5cdFx0ICogcG9pbnRzIGF0IHRoZSByZW5kZXIgcm9vdCB3aGVuIGl0IHJ1bnMuXG5cdFx0ICpcblx0XHQgKiBTdWJjbGFzc2VzIG92ZXJyaWRlIHRoaXMgZnJlZWx5IGFuZCAqKm11c3Qgbm90KiogY2FsbCBgc3VwZXIuaW5pdCgpYCAtXG5cdFx0ICogdGhlIHBvc3QtY29uc3RydWN0IGhvb2tzIGFyZSBleGVjdXRlZCBieSB0aGUgZnJhbWV3b3JrIGJlZm9yZSB0aGlzIGhvb2suXG5cdFx0ICpcblx0XHQgKiBAYXN5bmNcblx0XHQgKiBAcmV0dXJucyB7Kn0gYW4gb3B0aW9uYWwgdmFsdWUgdXNlZCB0byByZXNvbHZlIGByZWFkeWAuXG5cdFx0ICovXG5cdFx0YXN5bmMgaW5pdCgpIHtcblx0XHR9XG5cblx0XHQvKipcblx0XHQgKiBSZXNldHMgdGhlIGByZWFkeWAgcHJvbWlzZSBzbyB0aGUgY29tcG9uZW50IGNhbiBiZSBpbml0aWFsaXplZCBhZ2Fpbi5cblx0XHQgKiBJbnZva2VkIGF1dG9tYXRpY2FsbHkgZnJvbSB7QGxpbmsgQ29tcG9uZW50I2Rpc2Nvbm5lY3RlZENhbGxiYWNrfS5cblx0XHQgKlxuXHRcdCAqIEBhc3luY1xuXHRcdCAqIEByZXR1cm5zIHtQcm9taXNlfVxuXHRcdCAqL1xuXHRcdGFzeW5jIGRlc3Ryb3koKSB7XG5cdFx0XHRpZiAodGhpcy5yZWFkeS5yZXNvbHZlZCkgdGhpcy4jcmVhZHkgPSBsYXp5UHJvbWlzZSgpO1xuXHRcdH1cblxuXHRcdC8qKlxuXHRcdCAqIEV4cGxpY2l0bHkgcmUtcnVucyB0aGUgZnVsbCBpbml0aWFsaXphdGlvbiAocG9zdC1jb25zdHJ1Y3QgaG9va3MgYW5kXG5cdFx0ICoge0BsaW5rIENvbXBvbmVudCNpbml0fSkgb24gYW4gYWxyZWFkeS1jcmVhdGVkIGNvbXBvbmVudCwgcmVzZXR0aW5nXG5cdFx0ICoge0BsaW5rIENvbXBvbmVudCNyZWFkeX0gZmlyc3Qgd2hlbiBpdCBoYWQgYWxyZWFkeSBzZXR0bGVkLlxuXHRcdCAqXG5cdFx0ICogQHJldHVybnMge1Byb21pc2V9IHRoZSAocG9zc2libHkgbmV3KSB7QGxpbmsgQ29tcG9uZW50I3JlYWR5fSBwcm9taXNlLlxuXHRcdCAqL1xuXHRcdHJlaW5pdCgpIHtcblx0XHRcdGlmICh0aGlzLiNyZWFkeS5yZXNvbHZlZCkgdGhpcy4jcmVhZHkgPSBsYXp5UHJvbWlzZSgpO1xuXHRcdFx0cmV0dXJuIHRoaXMuI3NldHRsZSgpO1xuXHRcdH1cblxuXHRcdC8qKlxuXHRcdCAqIEN1c3RvbSBlbGVtZW50IGxpZmVjeWNsZSBjYWxsYmFjay4gUnVucyB0aGUgaW5pdGlhbGl6YXRpb24gd2hlbiB0aGVcblx0XHQgKiBjb21wb25lbnQgaXMgY29ubmVjdGVkIHRvIHRoZSBtYWluIGRvY3VtZW50IGFuZCBzZXR0bGVzIHRoZSBgcmVhZHlgXG5cdFx0ICogcHJvbWlzZSB3aXRoIHRoZSByZXN1bHQuXG5cdFx0ICovXG5cdFx0Y29ubmVjdGVkQ2FsbGJhY2soKSB7XG5cdFx0XHRpZiAodGhpcy5vd25lckRvY3VtZW50ID09IGRvY3VtZW50ICYmIHRoaXMuaXNDb25uZWN0ZWQpXG5cdFx0XHRcdHRoaXMuI3NldHRsZSgpO1xuXHRcdH1cblxuXHRcdC8qKlxuXHRcdCAqIEN1c3RvbSBlbGVtZW50IGxpZmVjeWNsZSBjYWxsYmFjay4gUmUtcnVucyB7QGxpbmsgQ29tcG9uZW50I2Nvbm5lY3RlZENhbGxiYWNrfVxuXHRcdCAqIHdoZW4gdGhlIGNvbXBvbmVudCBpcyBhZG9wdGVkIGludG8gYW5vdGhlciBkb2N1bWVudC5cblx0XHQgKi9cblx0XHRhZG9wdGVkQ2FsbGJhY2soKSB7XG5cdFx0XHR0aGlzLmNvbm5lY3RlZENhbGxiYWNrKCk7XG5cdFx0fVxuXG5cdFx0LyoqXG5cdFx0ICogQ3VzdG9tIGVsZW1lbnQgbGlmZWN5Y2xlIGNhbGxiYWNrLiBEaXNwYXRjaGVzIHRoZSBhdHRyaWJ1dGUtY2hhbmdlIGFuZFxuXHRcdCAqIGNvbXBvbmVudC1jaGFuZ2UgZXZlbnRzIHdoZW4gYW4gb2JzZXJ2ZWQgYXR0cmlidXRlIGNoYW5nZXMuXG5cdFx0ICpcblx0XHQgKiBAcGFyYW0ge3N0cmluZ30gbmFtZSAtIHRoZSBuYW1lIG9mIHRoZSBjaGFuZ2VkIGF0dHJpYnV0ZS5cblx0XHQgKiBAcGFyYW0gez9zdHJpbmd9IG9sZFZhbHVlIC0gdGhlIHByZXZpb3VzIGF0dHJpYnV0ZSB2YWx1ZS5cblx0XHQgKiBAcGFyYW0gez9zdHJpbmd9IG5ld1ZhbHVlIC0gdGhlIG5ldyBhdHRyaWJ1dGUgdmFsdWUuXG5cdFx0ICovXG5cdFx0YXR0cmlidXRlQ2hhbmdlZENhbGxiYWNrKG5hbWUsIG9sZFZhbHVlLCBuZXdWYWx1ZSkge1xuXHRcdFx0aWYgKG9sZFZhbHVlICE9IG5ld1ZhbHVlICYmIHRoaXMuaXNDb25uZWN0ZWQpIHtcblx0XHRcdFx0dGhpcy50cmlnZ2VyKHRyaWdnZXJUaW1lb3V0LCBhdHRyaWJ1dGVDaGFuZ2VFdmVudG5hbWUobmFtZSwgdGhpcykpO1xuXHRcdFx0XHR0aGlzLnRyaWdnZXIodHJpZ2dlclRpbWVvdXQsIGNvbXBvbmVudEV2ZW50bmFtZShcImNoYW5nZVwiLCB0aGlzKSk7XG5cdFx0XHR9XG5cdFx0fVxuXG5cdFx0LyoqXG5cdFx0ICogQ3VzdG9tIGVsZW1lbnQgbGlmZWN5Y2xlIGNhbGxiYWNrLiBSdW5zIHtAbGluayBDb21wb25lbnQjZGVzdHJveX0gd2hlblxuXHRcdCAqIHRoZSBjb21wb25lbnQgaXMgcmVtb3ZlZCBmcm9tIHRoZSBET00uXG5cdFx0ICovXG5cdFx0ZGlzY29ubmVjdGVkQ2FsbGJhY2soKSB7XG5cdFx0XHR0aGlzLmRlc3Ryb3koKTtcblx0XHR9XG5cdH07XG5cblx0cmV0dXJuIGNsYXp6O1xufTtcblxuY29uc3QgQ0xBWlpNQVAgPSBuZXcgTWFwKCk7XG5cbi8qKlxuICogUmV0dXJucyB0aGUgY29tcG9uZW50IGJhc2UgY2xhc3MgZm9yIHRoZSBnaXZlbiBIVE1MIGVsZW1lbnQgdHlwZS4gQ2xhc3NlcyBhcmVcbiAqIGNhY2hlZCwgc28gcmVwZWF0ZWQgY2FsbHMgd2l0aCB0aGUgc2FtZSBiYXNlIHR5cGUgcmV0dXJuIHRoZSBzYW1lIGNsYXNzLlxuICpcbiAqIEBwYXJhbSB7dHlwZW9mIEhUTUxFbGVtZW50fSBodG1sQmFzZVR5cGUgLSB0aGUgSFRNTCBlbGVtZW50IGNsYXNzIHRvIGV4dGVuZC5cbiAqIEByZXR1cm5zIHt0eXBlb2YgSFRNTEVsZW1lbnR9IHRoZSAoY2FjaGVkKSBjb21wb25lbnQgY2xhc3MgZXh0ZW5kaW5nIGBodG1sQmFzZVR5cGVgLlxuICovXG5leHBvcnQgY29uc3QgY29tcG9uZW50QmFzZU9mID0gKGh0bWxCYXNlVHlwZSkgPT4ge1xuXHRsZXQgY2xhenogPSBDTEFaWk1BUC5nZXQoaHRtbEJhc2VUeXBlKTtcblx0aWYgKGNsYXp6ID09IG51bGwpIHtcblx0XHRjbGF6eiA9IGJ1aWxkQ2xhc3MoaHRtbEJhc2VUeXBlKTtcblx0XHRDTEFaWk1BUC5zZXQoaHRtbEJhc2VUeXBlLCBjbGF6eik7XG5cdH1cblxuXHRyZXR1cm4gY2xheno7XG59O1xuXG4vKipcbiAqIERlZmF1bHQgY29tcG9uZW50IGJhc2UgY2xhc3MgZXh0ZW5kaW5nIHtAbGluayBIVE1MRWxlbWVudH0uXG4gKlxuICogQHR5cGUge3R5cGVvZiBIVE1MRWxlbWVudH1cbiAqL1xuY29uc3QgQ29tcG9uZW50ID0gY29tcG9uZW50QmFzZU9mKEhUTUxFbGVtZW50KTtcblxuZXhwb3J0IGRlZmF1bHQgQ29tcG9uZW50O1xuIiwiaW1wb3J0IHtHTE9CQUwgYXMgaW1wb3J0ZWRHbG9iYWx9IGZyb20gXCJAZGVmYXVsdC1qcy9kZWZhdWx0anMtZXh0ZG9tL3NyYy91dGlscy9VdGlscy5qc1wiXG5cbi8qKlxuICogQG1vZHVsZSBDb25zdGFudHNcbiAqXG4gKiBTaGFyZWQgY29uc3RhbnRzIGFuZCBydW50aW1lIHNldHRpbmdzIHVzZWQgYWNyb3NzIHRoZSBjb21wb25lbnQgdG9vbGJveC5cbiAqL1xuXG4vKipcbiAqIFRoZSBnbG9iYWwgb2JqZWN0IHNoYXJlZCB3aXRoIGBkZWZhdWx0anMtZXh0ZG9tYCAoZS5nLiBgd2luZG93YCBpbiB0aGUgYnJvd3NlcikuXG4gKlxuICogQHR5cGUge09iamVjdH1cbiAqL1xuZXhwb3J0IGNvbnN0IEdMT0JBTCA9IGltcG9ydGVkR2xvYmFsO1xuXG4vKipcbiAqIE11dGFibGUgcnVudGltZSBzZXR0aW5ncy4gQ2hhbmdlIHRoZXNlIGJlZm9yZSBjb21wb25lbnRzIGFyZSBjcmVhdGVkIHRvXG4gKiBpbmZsdWVuY2UgdGhlIGdlbmVyYXRlZCBldmVudCBuYW1lcy5cbiAqXG4gKiBAdHlwZSB7T2JqZWN0fVxuICogQHByb3BlcnR5IHtzdHJpbmd9IGV2ZW50U2VwYXJhdG9yIC0gc2VwYXJhdG9yIHVzZWQgYmV0d2VlbiB0aGUgbm9kZSBuYW1lIGFuZFxuICogICB0aGUgZXZlbnQgdHlwZSB3aGVuIGJ1aWxkaW5nIGNvbXBvbmVudCBldmVudCBuYW1lcyAoc2VlIHtAbGluayBtb2R1bGU6dXRpbHMvRXZlbnRIZWxwZXJ9KS5cbiAqL1xuZXhwb3J0IGNvbnN0IFNFVFRJTkcgPSB7XG4gICAgZXZlbnRTZXBhcmF0b3I6IFwiLS1cIlxufTtcblxuLyoqXG4gKiBEZWZhdWx0IHRhZy1uYW1lIHByZWZpeCBmb3IgY3VzdG9tIGVsZW1lbnRzIChlLmcuIGBkLWJ1dHRvbmApLlxuICpcbiAqIEB0eXBlIHtzdHJpbmd9XG4gKi9cbmV4cG9ydCBjb25zdCBjb21wb25lbnRQcmVmaXggPSBcImQtXCI7XG5cbi8qKlxuICogUHJlZml4IHVzZWQgd2hlbiBidWlsZGluZyB0aGUgZXZlbnQgbmFtZSBmb3IgYW4gYXR0cmlidXRlIGNoYW5nZS5cbiAqXG4gKiBAdHlwZSB7c3RyaW5nfVxuICovXG5leHBvcnQgY29uc3QgYXR0cmlidXRlQ2hhbmdlRXZlbnRQcmVmaXggPSBcImF0dHJpYnV0ZVwiO1xuXG4vKipcbiAqIERlbGF5IGluIG1pbGxpc2Vjb25kcyBiZWZvcmUgdGhlIGluaXRpYWwgYGluaXQoKWAgaXMgdHJpZ2dlcmVkLlxuICpcbiAqIEB0eXBlIHtudW1iZXJ9XG4gKi9cbmV4cG9ydCBjb25zdCBpbml0VGltZW91dCA9IDEwO1xuXG4vKipcbiAqIERlbGF5IGluIG1pbGxpc2Vjb25kcyB1c2VkIHdoZW4gdHJpZ2dlcmluZyBjb21wb25lbnQgZXZlbnRzLlxuICpcbiAqIEB0eXBlIHtudW1iZXJ9XG4gKi9cbmV4cG9ydCBjb25zdCB0cmlnZ2VyVGltZW91dCA9IDEwO1xuIiwiaW1wb3J0IHsgbGF6eVByb21pc2UgfSBmcm9tIFwiQGRlZmF1bHQtanMvZGVmYXVsdGpzLWNvbW1vbi11dGlscy9zcmMvUHJvbWlzZVV0aWxzLmpzXCI7XG5cbi8qKlxuICogQG1vZHVsZSBSZWFkeVxuICpcbiAqIFJlLWV4cG9ydCBvZiB7QGxpbmsgbGF6eVByb21pc2V9OiBhIHByb21pc2Ugd2hvc2UgcmVzb2x1dGlvbiBjYW4gYmVcbiAqIHRyaWdnZXJlZCBmcm9tIHRoZSBvdXRzaWRlIGFuZCB0aGF0IGV4cG9zZXMgYSBgcmVzb2x2ZWRgIGZsYWcuIEl0IGJhY2tzIHRoZVxuICogYHJlYWR5YCBsaWZlY3ljbGUgb2Yge0BsaW5rIG1vZHVsZTpDb21wb25lbnR9LlxuICpcbiAqIEB0eXBlIHtmdW5jdGlvbigpOiBQcm9taXNlfVxuICovXG5leHBvcnQgZGVmYXVsdCBsYXp5UHJvbWlzZTtcbiIsImltcG9ydCB7IGNvbXBvbmVudFByZWZpeCB9IGZyb20gXCIuLi9Db25zdGFudHMuanNcIjtcblxuLyoqXG4gKiBAbW9kdWxlIHV0aWxzL0RlZmluZUNvbXBvbmVudEhlbHBlclxuICpcbiAqIEhlbHBlcnMgdG8gYnVpbGQgdGFnIG5hbWVzIGFuZCByZWdpc3RlciBjdXN0b20gZWxlbWVudHMuXG4gKi9cblxuLyoqXG4gKiBCdWlsZHMgYSBjdXN0b20tZWxlbWVudCB0YWcgbmFtZSBieSBwcmVmaXhpbmcgYG5hbWVgLlxuICpcbiAqIEBwYXJhbSB7c3RyaW5nfSBuYW1lIC0gdGhlIGJhc2UgbmFtZSBvZiB0aGUgZWxlbWVudC5cbiAqIEBwYXJhbSB7c3RyaW5nfSBbcHJlZml4XSAtIHRoZSBwcmVmaXggdG8gdXNlOyBkZWZhdWx0cyB0byB7QGxpbmsgY29tcG9uZW50UHJlZml4fSAoYFwiZC1cImApIHdoZW4gb21pdHRlZC5cbiAqIEByZXR1cm5zIHtzdHJpbmd9IHRoZSBwcmVmaXhlZCB0YWcgbmFtZS5cbiAqL1xuZXhwb3J0IGNvbnN0IHRvTm9kZU5hbWUgPSAobmFtZSwgcHJlZml4KSA9PiB7XG5cdGlmKHR5cGVvZiBwcmVmaXggPT09IFwic3RyaW5nXCIpXG5cdFx0cmV0dXJuIHByZWZpeCArIG5hbWU7XG5cblx0cmV0dXJuIGNvbXBvbmVudFByZWZpeCArIG5hbWU7XG59O1xuXG4vKipcbiAqIFJlZ2lzdGVycyBhIGNvbXBvbmVudCBjbGFzcyBhcyBhIGN1c3RvbSBlbGVtZW50LCB1c2luZyBpdHMgc3RhdGljIGBOT0RFTkFNRWBcbiAqIGFzIHRhZyBuYW1lLiBSZWdpc3RyYXRpb24gaXMgc2tpcHBlZCB3aGVuIGFuIGVsZW1lbnQgd2l0aCB0aGF0IG5hbWUgYWxyZWFkeVxuICogZXhpc3RzLlxuICpcbiAqIEBwYXJhbSB7Q3VzdG9tRWxlbWVudENvbnN0cnVjdG9yfSBjbGF6eiAtIHRoZSBjb21wb25lbnQgY2xhc3MgdG8gcmVnaXN0ZXI7IG11c3QgZXhwb3NlIGEgc3RhdGljIGBOT0RFTkFNRWAuXG4gKiBAcGFyYW0ge0VsZW1lbnREZWZpbml0aW9uT3B0aW9uc30gW29wdGlvbnNdIC0gb3B0aW9ucyBmb3J3YXJkZWQgdG8gYGN1c3RvbUVsZW1lbnRzLmRlZmluZWAuXG4gKi9cbmV4cG9ydCBjb25zdCBkZWZpbmUgPSBmdW5jdGlvbihjbGF6eiwgb3B0aW9ucykge1xuXHRjb25zdCBub2RlbmFtZSA9IGNsYXp6Lk5PREVOQU1FO1xuXHRpZiAoIWN1c3RvbUVsZW1lbnRzLmdldChub2RlbmFtZSkpIHtcblx0XHRjdXN0b21FbGVtZW50cy5kZWZpbmUobm9kZW5hbWUsIGNsYXp6LCBvcHRpb25zKTtcblx0fVxufTtcblxuXG5leHBvcnQgZGVmYXVsdCBkZWZpbmU7XG4iLCJpbXBvcnQge2F0dHJpYnV0ZUNoYW5nZUV2ZW50UHJlZml4LCBTRVRUSU5HfSBmcm9tIFwiLi4vQ29uc3RhbnRzLmpzXCI7XG5cbi8qKlxuICogQG1vZHVsZSB1dGlscy9FdmVudEhlbHBlclxuICpcbiAqIEhlbHBlcnMgdG8gYnVpbGQgdGhlIGV2ZW50IG5hbWVzIGRpc3BhdGNoZWQgYnkgY29tcG9uZW50cy5cbiAqL1xuXG4vKipcbiAqIENyZWF0ZXMgdGhlIGV2ZW50IG5hbWUgZm9yIGEgY29tcG9uZW50IGV2ZW50LCBjb21wb3NlZCBvZiB0aGUgbm9kZSdzIHRhZ1xuICogbmFtZSwgdGhlIGBzZXBhcmF0b3JgIGFuZCB0aGUgYGV2ZW50VHlwZWAuXG4gKlxuICogQHBhcmFtIHtzdHJpbmd9IGV2ZW50VHlwZSAtIHRoZSBldmVudCB0eXBlLCBlLmcuIGBcImNoYW5nZVwiYC5cbiAqIEBwYXJhbSB7c3RyaW5nfEhUTUxFbGVtZW50fENvbXBvbmVudH0gbm9kZSAtIHRoZSBub2RlIHRoZSBldmVudCBiZWxvbmdzIHRvLlxuICogICBBIHN0cmluZyBpcyB1c2VkIHZlcmJhdGltIGFzIG5vZGUgbmFtZTsgYW4ge0BsaW5rIEhUTUxFbGVtZW50fSBjb250cmlidXRlc1xuICogICBpdHMgYG5vZGVOYW1lYDsgYW55IG90aGVyIG9iamVjdCBtdXN0IGV4cG9zZSBhIHN0cmluZyBgTk9ERU5BTUVgLlxuICogQHBhcmFtIHtzdHJpbmd9IFtzZXBhcmF0b3I9U0VUVElORy5ldmVudFNlcGFyYXRvcl0gLSBzZXBhcmF0b3IgYmV0d2VlbiBub2RlIG5hbWUgYW5kIGV2ZW50IHR5cGU7IGRlZmF1bHRzIHRvIGBcIi0tXCJgLlxuICogQHJldHVybnMge3N0cmluZ30gdGhlIGxvd2VyLWNhc2VkIGV2ZW50IG5hbWUuXG4gKiBAdGhyb3dzIHtFcnJvcn0gd2hlbiBgbm9kZWAgaXMgbm90IGEgc3VwcG9ydGVkIHR5cGUuXG4gKi9cbmV4cG9ydCBjb25zdCBjb21wb25lbnRFdmVudG5hbWUgPSAoZXZlbnRUeXBlLCBub2RlLCBzZXBhcmF0b3IgPSBTRVRUSU5HLmV2ZW50U2VwYXJhdG9yICkgPT4ge1xuXHRsZXQgbm9kZW5hbWUgPSBcInVuc3VwcG9ydGVkXCI7XG5cdGlmKHR5cGVvZiBub2RlID09PSBcInN0cmluZ1wiKVxuXHRcdG5vZGVuYW1lID0gbm9kZTtcblx0ZWxzZSBpZihub2RlIGluc3RhbmNlb2YgSFRNTEVsZW1lbnQpXG5cdFx0bm9kZW5hbWUgPSBub2RlLm5vZGVOYW1lO1xuXHRlbHNlIGlmKHR5cGVvZiBub2RlLk5PREVOQU1FID09PSBcInN0cmluZ1wiKVxuXHRcdG5vZGVuYW1lID0gbm9kZS5OT0RFTkFNRTtcblx0ZWxzZSB0aHJvdyBuZXcgRXJyb3IoYCR7dHlwZW9mIG5vZGV9IGlzIG5vdCBzdXBwb3J0ZWQgYXMgcGFyYW1ldGVyIFwibm9kZVwiIWApO1xuXG4gICByZXR1cm4gYCR7bm9kZW5hbWUudG9Mb3dlckNhc2UoKX0ke3NlcGFyYXRvcn0ke2V2ZW50VHlwZX1gO1xufTtcblxuLyoqXG4gKiBDcmVhdGVzIHRoZSBldmVudCBuYW1lIGRpc3BhdGNoZWQgd2hlbiBhIGNvbXBvbmVudCdzIGF0dHJpYnV0ZSBjaGFuZ2VzLFxuICogZS5nLiBgZC1idXR0b24tLWF0dHJpYnV0ZS0tZGlzYWJsZWRgLlxuICpcbiAqIEBwYXJhbSB7c3RyaW5nfSBhdHRyaWJ1dGUgLSB0aGUgbmFtZSBvZiB0aGUgY2hhbmdlZCBhdHRyaWJ1dGUuXG4gKiBAcGFyYW0ge3N0cmluZ3xIVE1MRWxlbWVudHxDb21wb25lbnR9IG5vZGUgLSB0aGUgbm9kZSB0aGUgZXZlbnQgYmVsb25ncyB0byAoc2VlIHtAbGluayBjb21wb25lbnRFdmVudG5hbWV9KS5cbiAqIEBwYXJhbSB7c3RyaW5nfSBbc2VwYXJhdG9yPVNFVFRJTkcuZXZlbnRTZXBhcmF0b3JdIC0gc2VwYXJhdG9yIHVzZWQgd2l0aGluIHRoZSBldmVudCBuYW1lOyBkZWZhdWx0cyB0byBgXCItLVwiYC5cbiAqIEByZXR1cm5zIHtzdHJpbmd9IHRoZSBhdHRyaWJ1dGUtY2hhbmdlIGV2ZW50IG5hbWUuXG4gKi9cbmV4cG9ydCBjb25zdCBhdHRyaWJ1dGVDaGFuZ2VFdmVudG5hbWUgPSAoYXR0cmlidXRlLCBub2RlLCBzZXBhcmF0b3IgPSBTRVRUSU5HLmV2ZW50U2VwYXJhdG9yICApID0+IHtcbiAgICByZXR1cm4gY29tcG9uZW50RXZlbnRuYW1lKGAke2F0dHJpYnV0ZUNoYW5nZUV2ZW50UHJlZml4fSR7c2VwYXJhdG9yfSR7YXR0cmlidXRlfWAsIG5vZGUsIHNlcGFyYXRvcik7XG59O1xuXG5leHBvcnQgZGVmYXVsdCB7Y29tcG9uZW50RXZlbnRuYW1lLCBhdHRyaWJ1dGVDaGFuZ2VFdmVudG5hbWV9XG4iLCIvKipcbiAqIEBtb2R1bGUgdXRpbHMvTm9kZUhlbHBlclxuICpcbiAqIEhlbHBlcnMgdG8gdHJhdmVyc2UgdGhlIERPTSB0cmVlIHJlbGF0aXZlIHRvIGEgbm9kZS5cbiAqL1xuXG4vKipcbiAqIFdhbGtzIHVwIHRoZSBhbmNlc3RvciBjaGFpbiBvZiBhIG5vZGUgYW5kIHJldHVybnMgdGhlIGZpcnN0IGFuY2VzdG9yIGZvclxuICogd2hpY2ggYGNoZWNrYCByZXR1cm5zIGEgdHJ1dGh5IHZhbHVlLlxuICpcbiAqIEBwYXJhbSB7Tm9kZX0gbm9kZSAtIHRoZSBub2RlIHRvIHN0YXJ0IGZyb20uXG4gKiBAcGFyYW0ge2Z1bmN0aW9uKE5vZGUpOiBib29sZWFufSBjaGVjayAtIHByZWRpY2F0ZSBhcHBsaWVkIHRvIGVhY2ggYW5jZXN0b3IuXG4gKiBAcmV0dXJucyB7Tm9kZXxudWxsfSB0aGUgZmlyc3QgbWF0Y2hpbmcgYW5jZXN0b3IsIG9yIGBudWxsYCBpZiBub25lIG1hdGNoZXMuXG4gKi9cbmV4cG9ydCBjb25zdCBmaW5kUGFyZW50ID0gKG5vZGUsIGNoZWNrKSA9PiB7XG5cdHdoaWxlKG5vZGUgIT0gbnVsbCkge1xuICAgICAgICBpZihjaGVjayhub2RlKSlcbiAgICAgICAgICAgIHJldHVybiBub2RlO1xuXG4gICAgICAgIG5vZGUgPSBub2RlLnBhcmVudCgpO1xuICAgIH1cblxuICAgIHJldHVybiBudWxsO1xufTtcblxuLyoqXG4gKiBSZWN1cnNpdmVseSBzZWFyY2hlcyB0aGUgZGVzY2VuZGFudHMgb2YgYG5vZGVgIGFuZCB0cmFja3MgdGhlIG1hdGNoIHdpdGggdGhlXG4gKiBzbWFsbGVzdCBkZXB0aCBmb3VuZCBzbyBmYXIuXG4gKlxuICogQHBhcmFtIHtOb2RlfSBub2RlIC0gdGhlIGN1cnJlbnQgbm9kZSBiZWluZyBpbnNwZWN0ZWQuXG4gKiBAcGFyYW0ge251bWJlcn0gZGVwdGggLSB0aGUgZGVwdGggb2YgYG5vZGVgIHJlbGF0aXZlIHRvIHRoZSBzZWFyY2ggcm9vdC5cbiAqIEBwYXJhbSB7ZnVuY3Rpb24oTm9kZSk6IGJvb2xlYW59IGNoZWNrIC0gcHJlZGljYXRlIGFwcGxpZWQgdG8gZWFjaCBub2RlLlxuICogQHJldHVybnMge3tub2RlOiBOb2RlLCBkZXB0aDogbnVtYmVyfXxudWxsfSB0aGUgc2hhbGxvd2VzdCBtYXRjaCB3aXRoIGl0cyBkZXB0aCwgb3IgYG51bGxgLlxuICovXG5jb25zdCBmaW5kQ2xvc2VzdCA9IChub2RlLCBkZXB0aCwgY2hlY2spID0+IHtcbiAgICBpZihjaGVjayhub2RlKSlcbiAgICAgICAgcmV0dXJuIHtub2RlLCBkZXB0aH1cblxuICAgIGxldCByZXN1bHQgPSBudWxsO1xuICAgIGZvcihsZXQgY2hpbGQgb2Ygbm9kZS5jaGlsZE5vZGVzKXtcbiAgICAgICAgY29uc3QgaXRlbSA9IGZpbmRDbG9zZXN0KGNoaWxkLCBkZXB0aCArIDEsIGNoZWNrKTtcblxuICAgICAgICBpZihpdGVtICE9IG51bGwgJiYgKHJlc3VsdCA9PSBudWxsIHx8IHJlc3VsdC5kZXB0aCA+IGl0ZW0uZGVwdGgpKVxuICAgICAgICAgICAgcmVzdWx0ID0gaXRlbTtcbiAgICB9XG5cbiAgICByZXR1cm4gcmVzdWx0O1xufVxuXG4vKipcbiAqIFNlYXJjaGVzIHRoZSBkZXNjZW5kYW50cyBvZiBgbm9kZWAgYW5kIHJldHVybnMgdGhlIG1hdGNoaW5nIG5vZGUgdGhhdCBpc1xuICogY2xvc2VzdCB0byBgbm9kZWAgKGkuZS4gYXQgdGhlIHNtYWxsZXN0IGRlcHRoKS5cbiAqXG4gKiBAcGFyYW0ge05vZGV9IG5vZGUgLSB0aGUgcm9vdCBvZiB0aGUgc2VhcmNoLlxuICogQHBhcmFtIHtmdW5jdGlvbihOb2RlKTogYm9vbGVhbn0gY2hlY2sgLSBwcmVkaWNhdGUgYXBwbGllZCB0byBlYWNoIGRlc2NlbmRhbnQuXG4gKiBAcmV0dXJucyB7Tm9kZXxudWxsfSB0aGUgc2hhbGxvd2VzdCBtYXRjaGluZyBkZXNjZW5kYW50LCBvciBgbnVsbGAgaWYgbm9uZSBtYXRjaGVzLlxuICovXG5leHBvcnQgY29uc3QgZmluZENsb3Nlc3RJbkRlcHRoID0gKG5vZGUsIGNoZWNrKSA9PiB7XG4gICAgY29uc3QgY2xvc2VzdCA9IGZpbmRDbG9zZXN0KG5vZGUsIDAsIGNoZWNrKTtcbiAgICByZXR1cm4gY2xvc2VzdCAhPSBudWxsID8gY2xvc2VzdC5ub2RlIDogbnVsbDtcbn1cblxuZXhwb3J0IGRlZmF1bHQge2ZpbmRQYXJlbnQsIGZpbmRDbG9zZXN0SW5EZXB0aH07XG4iLCJpbXBvcnQgR2xvYmFsIGZyb20gXCJAZGVmYXVsdC1qcy9kZWZhdWx0anMtY29tbW9uLXV0aWxzL3NyYy9HbG9iYWwuanNcIjtcblxuLyoqXG4gKiBAbW9kdWxlIHV0aWxzL1N0eWxlSGVscGVyXG4gKlxuICogSGVscGVycyB0byBjb3B5IGV4aXN0aW5nIHN0eWxlcyBiZXR3ZWVuIG5vZGVzIGFuZCB0byBsb2FkIGEgY29tcG9uZW50J3NcbiAqIHN0eWxlc2hlZXQgYnkgY29udmVudGlvbi5cbiAqL1xuXG4vKipcbiAqIENsb25lcyBhbGwgYDxzdHlsZSB0eXBlPVwidGV4dC9jc3NcIj5gIGFuZCBgPGxpbmsgcmVsPVwic3R5bGVzaGVldFwiPmAgZWxlbWVudHNcbiAqIGZvdW5kIGluIGBzb3VyY2VgIGFuZCBhZGRzIHRoZW0gdG8gYHRhcmdldGAuXG4gKlxuICogQHBhcmFtIHtOb2RlfSBzb3VyY2UgLSB0aGUgbm9kZSB0byByZWFkIHRoZSBzdHlsZSBlbGVtZW50cyBmcm9tLlxuICogQHBhcmFtIHtOb2RlfSB0YXJnZXQgLSB0aGUgbm9kZSB0aGUgY2xvbmVkIHN0eWxlcyBhcmUgYWRkZWQgdG8uXG4gKiBAcGFyYW0ge2Jvb2xlYW59IFthcHBlbmQ9dHJ1ZV0gLSB3aGVuIGB0cnVlYCB0aGUgc3R5bGVzIGFyZSBhcHBlbmRlZCwgb3RoZXJ3aXNlIHByZXBlbmRlZC5cbiAqL1xuZXhwb3J0IGNvbnN0IGNvcHlTdHlsZXMgPSAoc291cmNlLCB0YXJnZXQsIGFwcGVuZCA9IHRydWUpID0+IHtcblx0Y29uc3Qgc3R5bGVzID0gQXJyYXkuZnJvbShzb3VyY2UuZmluZChgc3R5bGVbdHlwZT1cInRleHQvY3NzXCJdLCBsaW5rW3JlbD1cInN0eWxlc2hlZXRcIl1gKSlcblx0XHQubWFwKChzdHlsZSkgPT4gc3R5bGUuY2xvbmVOb2RlKHRydWUpKTtcblxuXHRpZiAoYXBwZW5kKVxuXHRcdHRhcmdldC5hcHBlbmQoLi4uc3R5bGVzKTtcblx0ZWxzZVxuXHRcdHRhcmdldC5wcmVwZW5kKC4uLnN0eWxlcyk7XG59XG5cbi8qKlxuICogTmFtZSBvZiB0aGUgZ2xvYmFsIHZhcmlhYmxlIGhvbGRpbmcgdGhlIGJhc2UgcGF0aCB1c2VkIGJ5XG4gKiB7QGxpbmsgbG9hZENvbXBvbmVudFN0eWxlfSB0byByZXNvbHZlIGNvbXBvbmVudCBzdHlsZXNoZWV0cy5cbiAqXG4gKiBAdHlwZSB7c3RyaW5nfVxuICovXG5leHBvcnQgY29uc3QgQ1NTX0JBU0VfUEFUSF9WQVIgPSBcIkNTU19CQVNFX1BBVEhcIjtcblxuLyoqXG4gKiBBcHBlbmRzIGEgYDxsaW5rIHJlbD1cInN0eWxlc2hlZXRcIj5gIHRvIGB0YXJnZXRgIHBvaW50aW5nIGF0IHRoZSBzdHlsZXNoZWV0XG4gKiBuYW1lZCBhZnRlciB0aGUgdGFyZ2V0J3MgdGFnIG5hbWUuIFRoZSBkaXJlY3RvcnkgaXMgdGFrZW4gZnJvbSB0aGUgZ2xvYmFsXG4gKiB7QGxpbmsgQ1NTX0JBU0VfUEFUSF9WQVJ9IHZhcmlhYmxlIGFuZCBkZWZhdWx0cyB0byBgXCJjc3NcImAuXG4gKlxuICogQHBhcmFtIHtIVE1MRWxlbWVudH0gdGFyZ2V0IC0gdGhlIGVsZW1lbnQgdGhlIHN0eWxlc2hlZXQgbGluayBpcyBhZGRlZCB0by5cbiAqL1xuZXhwb3J0IGNvbnN0IGxvYWRDb21wb25lbnRTdHlsZSA9ICh0YXJnZXQpID0+IHtcblx0Y29uc3QgcGF0aCA9IGAke0dsb2JhbFtDU1NfQkFTRV9QQVRIX1ZBUl0gfHwgXCJjc3NcIn0vJHt0YXJnZXQubm9kZU5hbWUudG9Mb3dlckNhc2UoKX0uY3NzYDtcblx0dGFyZ2V0LmFwcGVuZChgPGxpbmsgcmVsPVwic3R5bGVzaGVldFwiIGhyZWY9XCIke3BhdGh9XCIvPmApO1xufVxuXG5leHBvcnQgZGVmYXVsdCB7IENTU19CQVNFX1BBVEhfVkFSLCBjb3B5U3R5bGVzLCBsb2FkQ29tcG9uZW50U3R5bGUgfTtcbiIsIi8qKlxuICogQG1vZHVsZSB1dGlscy9XZWFrRGF0YVxuICovXG5cbi8qKlxuICogQSBwZXItcmVmZXJlbmNlIGRhdGEgc3RvcmUgYmFja2VkIGJ5IGEge0BsaW5rIFdlYWtNYXB9LiBEYXRhIGFzc29jaWF0ZWQgd2l0aFxuICogYSByZWZlcmVuY2UgaXMgZ2FyYmFnZS1jb2xsZWN0ZWQgYXV0b21hdGljYWxseSBvbmNlIHRoZSByZWZlcmVuY2UgaXRzZWxmIGlzXG4gKiBubyBsb25nZXIgcmVhY2hhYmxlLCB3aGljaCBtYWtlcyBpdCBzYWZlIGZvciBzdG9yaW5nIHN0YXRlIGZvciBET00gbm9kZXMuXG4gKi9cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFdlYWtEYXRhIHtcblxuXHQjd2Vha21hcCA9IG5ldyBXZWFrTWFwKCk7XG5cblx0Y29uc3RydWN0b3IoKSB7XG5cdH1cblxuXHQvKipcblx0ICogUmV0dXJucyB0aGUgZGF0YSBvYmplY3QgYXNzb2NpYXRlZCB3aXRoIHRoZSBnaXZlbiByZWZlcmVuY2UsIGNyZWF0aW5nIGFuXG5cdCAqIGVtcHR5IG9uZSBvbiBmaXJzdCBhY2Nlc3MuXG5cdCAqXG5cdCAqIEBwYXJhbSB7T2JqZWN0fSByZWZlcmVuY2UgLSB0aGUga2V5IHRoZSBkYXRhIGlzIGFzc29jaWF0ZWQgd2l0aC5cblx0ICogQHJldHVybnMge09iamVjdH0gdGhlIChwb3NzaWJseSBuZXdseSBjcmVhdGVkKSBkYXRhIG9iamVjdC5cblx0ICovXG5cdGRhdGEocmVmZXJlbmNlKSB7XG5cdFx0bGV0IGRhdGEgPSB0aGlzLiN3ZWFrbWFwLmdldChyZWZlcmVuY2UpO1xuXHRcdGlmICghZGF0YSkge1xuXHRcdFx0ZGF0YSA9IHt9O1xuXHRcdFx0dGhpcy4jd2Vha21hcC5zZXQocmVmZXJlbmNlLCBkYXRhKTtcblx0XHR9XG5cdFx0cmV0dXJuIGRhdGE7XG5cdH1cblxuXHQvKipcblx0ICogUmVhZHMsIHdyaXRlcyBvciBkZWxldGVzIGEgc2luZ2xlIHZhbHVlIG9uIGEgcmVmZXJlbmNlJ3MgZGF0YSBvYmplY3QuXG5cdCAqXG5cdCAqIC0gY2FsbGVkIHdpdGggYChyZWZlcmVuY2UsIGtleSlgIGl0IHJldHVybnMgdGhlIHN0b3JlZCB2YWx1ZTtcblx0ICogLSBjYWxsZWQgd2l0aCBgKHJlZmVyZW5jZSwga2V5LCB1bmRlZmluZWQpYCBpdCBkZWxldGVzIHRoZSBrZXk7XG5cdCAqIC0gY2FsbGVkIHdpdGggYChyZWZlcmVuY2UsIGtleSwgdmFsdWUpYCBpdCBzdG9yZXMgdGhlIHZhbHVlLlxuXHQgKlxuXHQgKiBAcGFyYW0ge09iamVjdH0gcmVmZXJlbmNlIC0gdGhlIGtleSB0aGUgZGF0YSBpcyBhc3NvY2lhdGVkIHdpdGguXG5cdCAqIEBwYXJhbSB7c3RyaW5nfSBrZXkgLSB0aGUgcHJvcGVydHkgbmFtZSB0byByZWFkLCB3cml0ZSBvciBkZWxldGUuXG5cdCAqIEBwYXJhbSB7Kn0gW3ZhbHVlXSAtIHRoZSB2YWx1ZSB0byBzdG9yZTsgcGFzcyBgdW5kZWZpbmVkYCB0byBkZWxldGUgdGhlIGtleS5cblx0ICogQHJldHVybnMgeyp9IHRoZSBzdG9yZWQgdmFsdWUgd2hlbiB1c2VkIGFzIGEgZ2V0dGVyLCBvdGhlcndpc2UgYHVuZGVmaW5lZGAuXG5cdCAqIEB0aHJvd3Mge0Vycm9yfSB3aGVuIGNhbGxlZCB3aXRoIGZld2VyIHRoYW4gdHdvIGFyZ3VtZW50cy5cblx0ICovXG5cdHZhbHVlKHJlZmVyZW5jZSwga2V5LCB2YWx1ZSkge1xuXHRcdGlmIChhcmd1bWVudHMubGVuZ3RoIDwgMikgdGhyb3cgbmV3IEVycm9yKFwicmVmZXJlbmNlIGFuZCBrZXkgcmVxdWlyZWRcIilcblx0XHRpZiAoYXJndW1lbnRzLmxlbmd0aCA9PSAyKSByZXR1cm4gdGhpcy5kYXRhKHJlZmVyZW5jZSlba2V5XTtcblx0XHRlbHNlIGlmKHR5cGVvZiB2YWx1ZSA9PT0gXCJ1bmRlZmluZWRcIikgZGVsZXRlIHRoaXMuZGF0YShyZWZlcmVuY2UpW2tleV07XG5cdFx0ZWxzZSB0aGlzLmRhdGEocmVmZXJlbmNlKVtrZXldID0gdmFsdWU7XG5cdH1cblxuXHQvKipcblx0ICogUmVtb3ZlcyBhbGwgZGF0YSBhc3NvY2lhdGVkIHdpdGggdGhlIGdpdmVuIHJlZmVyZW5jZS5cblx0ICpcblx0ICogQHBhcmFtIHtPYmplY3R9IHJlZmVyZW5jZSAtIHRoZSBrZXkgd2hvc2UgZGF0YSBzaG91bGQgYmUgZGlzY2FyZGVkLlxuXHQgKi9cblx0ZGVzdHJveShyZWZlcmVuY2Upe1xuXHRcdHRoaXMuI3dlYWttYXAuZGVsZXRlKHJlZmVyZW5jZSk7XG5cdH1cbn07XG4iLCJpbXBvcnQgRGVmaW5lQ29tcG9uZW50SGVscGVyIGZyb20gXCIuL0RlZmluZUNvbXBvbmVudEhlbHBlci5qc1wiO1xuaW1wb3J0IEV2ZW50SGVscGVyIGZyb20gXCIuL0V2ZW50SGVscGVyLmpzXCI7XG5pbXBvcnQgTm9kZUhlbHBlciBmcm9tIFwiLi9Ob2RlSGVscGVyLmpzXCI7XG5pbXBvcnQgU3R5bGVIZWxwZXIgZnJvbSBcIi4vU3R5bGVIZWxwZXIuanNcIjtcbmltcG9ydCBXZWFrRGF0YSBmcm9tIFwiLi9XZWFrRGF0YS5qc1wiO1xuXG4vKipcbiAqIEBtb2R1bGUgdXRpbHNcbiAqXG4gKiBBZ2dyZWdhdGVkIGhlbHBlciBtb2R1bGVzIG9mIHRoZSBjb21wb25lbnQgdG9vbGJveC5cbiAqXG4gKiBAcHJvcGVydHkge09iamVjdH0gRGVmaW5lQ29tcG9uZW50SGVscGVyIC0gaGVscGVycyB0byByZWdpc3RlciBjdXN0b20gZWxlbWVudHMgKHNlZSB7QGxpbmsgbW9kdWxlOnV0aWxzL0RlZmluZUNvbXBvbmVudEhlbHBlcn0pLlxuICogQHByb3BlcnR5IHtPYmplY3R9IEV2ZW50SGVscGVyIC0gaGVscGVycyB0byBidWlsZCBjb21wb25lbnQgZXZlbnQgbmFtZXMgKHNlZSB7QGxpbmsgbW9kdWxlOnV0aWxzL0V2ZW50SGVscGVyfSkuXG4gKiBAcHJvcGVydHkge09iamVjdH0gTm9kZUhlbHBlciAtIGhlbHBlcnMgdG8gdHJhdmVyc2UgdGhlIERPTSB0cmVlIChzZWUge0BsaW5rIG1vZHVsZTp1dGlscy9Ob2RlSGVscGVyfSkuXG4gKiBAcHJvcGVydHkge09iamVjdH0gU3R5bGVIZWxwZXIgLSBoZWxwZXJzIHRvIGNvcHkgYW5kIGxvYWQgY29tcG9uZW50IHN0eWxlcyAoc2VlIHtAbGluayBtb2R1bGU6dXRpbHMvU3R5bGVIZWxwZXJ9KS5cbiAqIEBwcm9wZXJ0eSB7dHlwZW9mIFdlYWtEYXRhfSBXZWFrRGF0YSAtIHdlYWtseSByZWZlcmVuY2VkIHBlci1ub2RlIGRhdGEgc3RvcmUgKHNlZSB7QGxpbmsgbW9kdWxlOnV0aWxzL1dlYWtEYXRhfSkuXG4gKi9cbmV4cG9ydCBkZWZhdWx0IHtEZWZpbmVDb21wb25lbnRIZWxwZXIsIEV2ZW50SGVscGVyLCBOb2RlSGVscGVyLCBTdHlsZUhlbHBlciwgV2Vha0RhdGF9O1xuIiwiLy8gVGhlIG1vZHVsZSBjYWNoZVxuY29uc3QgX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fID0ge307XG5cbi8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG5mdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuXHRjb25zdCBjYWNoZWRNb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdO1xuXHRpZiAoY2FjaGVkTW9kdWxlICE9PSB1bmRlZmluZWQpIHtcblx0XHRyZXR1cm4gY2FjaGVkTW9kdWxlLmV4cG9ydHM7XG5cdH1cblx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcblx0Y29uc3QgbW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXSA9IHtcblx0XHQvLyBubyBtb2R1bGUuaWQgbmVlZGVkXG5cdFx0Ly8gbm8gbW9kdWxlLmxvYWRlZCBuZWVkZWRcblx0XHRleHBvcnRzOiB7fVxuXHR9O1xuXG5cdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuXHRpZiAoIShtb2R1bGVJZCBpbiBfX3dlYnBhY2tfbW9kdWxlc19fKSkge1xuXHRcdGRlbGV0ZSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdO1xuXHRcdGNvbnN0IGUgPSBuZXcgRXJyb3IoXCJDYW5ub3QgZmluZCBtb2R1bGUgJ1wiICsgbW9kdWxlSWQgKyBcIidcIik7XG5cdFx0ZS5jb2RlID0gJ01PRFVMRV9OT1RfRk9VTkQnO1xuXHRcdHRocm93IGU7XG5cdH1cblx0X193ZWJwYWNrX21vZHVsZXNfX1ttb2R1bGVJZF0obW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cblx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcblx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xufVxuXG4iLCIvLyBkZWZpbmUgZ2V0dGVyL3ZhbHVlIGZ1bmN0aW9ucyBmb3IgaGFybW9ueSBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSAoZXhwb3J0cywgZGVmaW5pdGlvbikgPT4ge1xuXHRpZihBcnJheS5pc0FycmF5KGRlZmluaXRpb24pKSB7XG5cdFx0dmFyIGkgPSAwO1xuXHRcdHdoaWxlKGkgPCBkZWZpbml0aW9uLmxlbmd0aCkge1xuXHRcdFx0dmFyIGtleSA9IGRlZmluaXRpb25baSsrXTtcblx0XHRcdHZhciBiaW5kaW5nID0gZGVmaW5pdGlvbltpKytdO1xuXHRcdFx0aWYoIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBrZXkpKSB7XG5cdFx0XHRcdGlmKGJpbmRpbmcgPT09IDApIHtcblx0XHRcdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywga2V5LCB7IGVudW1lcmFibGU6IHRydWUsIHZhbHVlOiBkZWZpbml0aW9uW2krK10gfSk7XG5cdFx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIGtleSwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGJpbmRpbmcgfSk7XG5cdFx0XHRcdH1cblx0XHRcdH0gZWxzZSBpZihiaW5kaW5nID09PSAwKSB7IGkrKzsgfVxuXHRcdH1cblx0fSBlbHNlIHtcblx0XHRmb3IodmFyIGtleSBpbiBkZWZpbml0aW9uKSB7XG5cdFx0XHRpZihfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZGVmaW5pdGlvbiwga2V5KSAmJiAhX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIGtleSkpIHtcblx0XHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIGtleSwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGRlZmluaXRpb25ba2V5XSB9KTtcblx0XHRcdH1cblx0XHR9XG5cdH1cbn07IiwiX193ZWJwYWNrX3JlcXVpcmVfXy5nID0gKGZ1bmN0aW9uKCkge1xuXHRpZiAodHlwZW9mIGdsb2JhbFRoaXMgPT09ICdvYmplY3QnKSByZXR1cm4gZ2xvYmFsVGhpcztcblx0dHJ5IHtcblx0XHRyZXR1cm4gdGhpcyB8fCBuZXcgRnVuY3Rpb24oJ3JldHVybiB0aGlzJykoKTtcblx0fSBjYXRjaCAoZSkge1xuXHRcdGlmICh0eXBlb2Ygd2luZG93ID09PSAnb2JqZWN0JykgcmV0dXJuIHdpbmRvdztcblx0fVxufSkoKTsiLCJfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSAob2JqLCBwcm9wKSA9PiAoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iaiwgcHJvcCkpIiwiLy8gZGVmaW5lIF9fZXNNb2R1bGUgb24gZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5yID0gKGV4cG9ydHMpID0+IHtcblx0aWYoU3ltYm9sLnRvU3RyaW5nVGFnKSB7XG5cdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFN5bWJvbC50b1N0cmluZ1RhZywgeyB2YWx1ZTogJ01vZHVsZScgfSk7XG5cdH1cblx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsICdfX2VzTW9kdWxlJywgeyB2YWx1ZTogdHJ1ZSB9KTtcbn07IiwiaW1wb3J0IFwiQGRlZmF1bHQtanMvZGVmYXVsdGpzLWV4dGRvbVwiO1xuaW1wb3J0IHtTRVRUSU5HfSBmcm9tIFwiLi9zcmMvQ29uc3RhbnRzLmpzXCI7XG5pbXBvcnQgdXRpbHMgZnJvbSBcIi4vc3JjL3V0aWxzL2luZGV4LmpzXCI7XG5pbXBvcnQgUmVhZHkgZnJvbSBcIi4vc3JjL1JlYWR5LmpzXCI7XG5pbXBvcnQge2RlZmluZX0gZnJvbSBcIi4vc3JjL3V0aWxzL0RlZmluZUNvbXBvbmVudEhlbHBlci5qc1wiXG5pbXBvcnQgQ29tcG9uZW50LCB7Y29tcG9uZW50QmFzZU9mLCBjcmVhdGVVVUlEfSBmcm9tIFwiLi9zcmMvQ29tcG9uZW50XCI7XG5cblxuZXhwb3J0IHsgdXRpbHMsIFJlYWR5LCBDb21wb25lbnQsIGNvbXBvbmVudEJhc2VPZixkZWZpbmUsIGNyZWF0ZVVVSUQsIFNFVFRJTkcgfTtcbiJdLCJuYW1lcyI6W10sInNvdXJjZVJvb3QiOiIifQ==