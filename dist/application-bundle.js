/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/Application/index.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./node_modules/@default-js/defaultjs-common-utils/src/javascript/String.js":
/*!**********************************************************************************!*\
  !*** ./node_modules/@default-js/defaultjs-common-utils/src/javascript/String.js ***!
  \**********************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

if (!String.prototype.hashcode)
	String.prototype.hashcode = function() {
		if (this.length === 0)
			return 0;
		
		let hash = 0;
		const length = this.length;
		for (let i = 0; i < length; i++) {
			const c = this.charCodeAt(i);
			hash = ((hash << 5) - hash) + c;
			hash |= 0; // Convert to 32bit integer
		}
		return hash;
	};

/***/ }),

/***/ "./node_modules/@default-js/defaultjs-expression-language/node_modules/@default-js/defaultjs-common-utils/src/Global.js":
/*!******************************************************************************************************************************!*\
  !*** ./node_modules/@default-js/defaultjs-expression-language/node_modules/@default-js/defaultjs-common-utils/src/Global.js ***!
  \******************************************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* WEBPACK VAR INJECTION */(function(global) {const GLOBAL = (() => {
	if(typeof global !== "undefined") return global;
	if(typeof window !== "undefined") return window;	
	if(typeof self !== "undefined") return self;
	return {};
})();

/* harmony default export */ __webpack_exports__["default"] = (GLOBAL);
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../../../../../../webpack/buildin/global.js */ "./node_modules/webpack/buildin/global.js")))

/***/ }),

/***/ "./node_modules/@default-js/defaultjs-expression-language/node_modules/@default-js/defaultjs-common-utils/src/ObjectProperty.js":
/*!**************************************************************************************************************************************!*\
  !*** ./node_modules/@default-js/defaultjs-expression-language/node_modules/@default-js/defaultjs-common-utils/src/ObjectProperty.js ***!
  \**************************************************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return ObjectProperty; });
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

/***/ "./node_modules/@default-js/defaultjs-expression-language/node_modules/@default-js/defaultjs-common-utils/src/ObjectUtils.js":
/*!***********************************************************************************************************************************!*\
  !*** ./node_modules/@default-js/defaultjs-expression-language/node_modules/@default-js/defaultjs-common-utils/src/ObjectUtils.js ***!
  \***********************************************************************************************************************************/
/*! exports provided: append, isPojo, merge, filter, default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "append", function() { return append; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "isPojo", function() { return isPojo; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "merge", function() { return merge; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "filter", function() { return filter; });
/* harmony import */ var _ObjectProperty_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./ObjectProperty.js */ "./node_modules/@default-js/defaultjs-expression-language/node_modules/@default-js/defaultjs-common-utils/src/ObjectProperty.js");

/**
 * append a propery value to an object. If propery exists its would be converted to an array
 * 
 *  @param aKey:string name of property
 *  @param aData:any property value
 *  @param aObject:object the object to append the property
 *  
 *  @return returns the changed object
 */
const append = function(aKey, aData, aObject) {
	if (typeof aData !== "undefined") {
		const property = _ObjectProperty_js__WEBPACK_IMPORTED_MODULE_0__["default"].load(aObject, aKey, true)
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
const isPojo = function(aObject) {
	return typeof aObject !== "undefined" && aObject != null && aObject.constructor.name === "Object"
}

/**
 * merging object into a target object. Its only merge simple object and sub objects. Every other 
 * value would be replaced by value from the source object.
 * 
 * sample: merge(target, source-1, source-2, ...source-n)
 * 
 * @param aTarget:object the target object to merging into
 * @param aSources:object
 * 
 * @return object returns the target object
 */
const merge = function(aTarget) {
	for (let i = 1; i < arguments.length; i++) {
		const source = arguments[i];
		Object.getOwnPropertyNames(source).forEach(aKey => {
			if (isPojo(aTarget[aKey]))
				merge(aTarget[aKey], source[aKey]);
			else
				aTarget[aKey] = source[aKey];
		});
	}

	return aTarget;
}



const buildPropertyFilter = function({ names, allowed }) {
	return (name, value, context) => {
		return names.includes(name) === allowed;
	}
};


const filter = function() {
	const [data, propFilter, {deep = false, recursive = true, parents = []} = {}] = arguments;
	const result = {};

	for (name in data) {
		const value = data[name];
		const accept = propFilter(name, value, data);
		if (accept && (!deep || value === null || value === undefined))
			result[name] = value;
		else if (accept && deep) {
			const type = typeof value;
			if (type !== "object"
				|| value instanceof Array
				|| value instanceof Map
				|| value instanceof Set
				|| value instanceof RegExp
				|| parents.includes[value]
				|| value == data)
				result[name] = value;
			else
				result[name] = filter(value, propFilter, {deep, recursive, parents:  parents.concat(data)});
		}

	}

	return result;
};



/* harmony default export */ __webpack_exports__["default"] = ({
	isPojo,
	append,
	merge,
	filter,
	buildPropertyFilter
});

/***/ }),

/***/ "./node_modules/@default-js/defaultjs-expression-language/src/Context.js":
/*!*******************************************************************************!*\
  !*** ./node_modules/@default-js/defaultjs-expression-language/src/Context.js ***!
  \*******************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return Context; });
const seekAtChain = (resolver, property) => {
	while(resolver){
		const def = resolver.proxy.handle.getPropertyDef(property, false);
		if(def)
			return def;
		
		resolver = resolver.parent;
	}	
	return { data: null, resolver: null, defined: false };
}

class Handle {
	constructor(data, resolver) {
		this.data = data;
		this.resolver = resolver;
		this.cache = new Map();
	}
	
	updateData(data){
		this.data = data;
		this.cache = new Map();
	}
	
	resetCache(){
		this.cache = new Map();
	}

	getPropertyDef(property, seek = true) {
		if (this.cache.has(property))
			return this.cache.get(property);
		
		let def = null
		if (this.data && property in this.data)
			def = { data: this.data, resolver: this.resolver, defined: true };
		else if(seek)
			def = seekAtChain(this.resolver.parent, property);
		else
			return null;
		if(def.defined)
			this.cache.set(property, def);
		return def;
	}

	hasProperty(property) {
		//@TODO write tests!!!
		const { defined } = this.getPropertyDef(property);
		return defined;
	}
	getProperty(property) {
		//@TODO write tests!!!	
		const { data } = this.getPropertyDef(property);
		return data ? data[property] : undefined;
	}
	setProperty(property, value) {
		//@TODO would support this action on an proxied resolver context??? write tests!!!
		const { data, defined } = this.getPropertyDef(property);
		if (defined)
			data[property] = value;
		else {
			if (this.data)
				this.data[property] = value;
			else {
				this.data = {}
				this.data[property] = value;
			}
			this.cache.set(property, { data: this.data, resolver: this.resolver, defined: true });
		}
	}
	deleteProperty(property) {
		//@TODO would support this action on an proxied resolver context??? write tests!!!		
		throw new Error("unsupported function!")
	}
}

class Context {
	constructor(context, resolver) {
		this.handle = new Handle(context, resolver);		
		this.data = new Proxy(this.handle, {
			has: function(data, property) {
				return data.hasProperty(property);
			},
			get: function(data, property) {
				return data.getProperty(property);
			},
			set: function(data, property, value) {
				return data.setProperty(property, value);
			},
			deleteProperty: function(data, property) {
				return data.deleteProperty(property);
			}
			//@TODO need to support the other proxy actions		
		});;
	}
	
	updateData(data){
		this.handle.updateData(data)		
	}
	
	resetCache(){
		this.handle.resetCache();
	}
};

/***/ }),

/***/ "./node_modules/@default-js/defaultjs-expression-language/src/DefaultValue.js":
/*!************************************************************************************!*\
  !*** ./node_modules/@default-js/defaultjs-expression-language/src/DefaultValue.js ***!
  \************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return DefaultValue; });
class DefaultValue {
	constructor(value){
		this.hasValue = arguments.length == 1;
		this.value = value;
	}	
};

/***/ }),

/***/ "./node_modules/@default-js/defaultjs-expression-language/src/ExpressionResolver.js":
/*!******************************************************************************************!*\
  !*** ./node_modules/@default-js/defaultjs-expression-language/src/ExpressionResolver.js ***!
  \******************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return ExpressionResolver; });
/* harmony import */ var _default_js_defaultjs_common_utils_src_Global_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @default-js/defaultjs-common-utils/src/Global.js */ "./node_modules/@default-js/defaultjs-expression-language/node_modules/@default-js/defaultjs-common-utils/src/Global.js");
/* harmony import */ var _default_js_defaultjs_common_utils_src_ObjectProperty_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @default-js/defaultjs-common-utils/src/ObjectProperty.js */ "./node_modules/@default-js/defaultjs-expression-language/node_modules/@default-js/defaultjs-common-utils/src/ObjectProperty.js");
/* harmony import */ var _default_js_defaultjs_common_utils_src_ObjectUtils_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @default-js/defaultjs-common-utils/src/ObjectUtils.js */ "./node_modules/@default-js/defaultjs-expression-language/node_modules/@default-js/defaultjs-common-utils/src/ObjectUtils.js");
/* harmony import */ var _DefaultValue_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./DefaultValue.js */ "./node_modules/@default-js/defaultjs-expression-language/src/DefaultValue.js");
/* harmony import */ var _Context_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./Context.js */ "./node_modules/@default-js/defaultjs-expression-language/src/Context.js");







const EXECUTION_WARN_TIMEOUT = 1000;
const EXPRESSION = /\$\{(([a-zA-Z0-9\-_\s]+)::)?([^\{\}]+)\}/;
const DEFAULT_NOT_DEFINED = new _DefaultValue_js__WEBPACK_IMPORTED_MODULE_3__["default"]();
const toDefaultValue = value => {
	if (value instanceof _DefaultValue_js__WEBPACK_IMPORTED_MODULE_3__["default"])
		return value;

	return new _DefaultValue_js__WEBPACK_IMPORTED_MODULE_3__["default"](value);
};

const execute = async function(aStatement, aContext) {
	if (typeof aStatement !== "string")
		return aStatement;
		
	const expression = new Function("context", 
`
return (async (context) => {
	try{ 
		with(context){
			 return ${aStatement}
		}
	}catch(e){
		throw e;
	}
})(context)`
	);
	
	let timeout = setTimeout(() => {
		timeout = null;
		console.warn("long running statement:", aStatement, new Error());
	}, EXECUTION_WARN_TIMEOUT)
	
	const result = await expression(aContext);
	
	if(timeout)
		clearTimeout(timeout)
	return result;
};

const resolve = async function(aResolver, aExpression, aFilter, aDefault) {
	if (aFilter && aResolver.name != aFilter)
		return aResolver.parent ? resolve(aResolver.parent, aExpression, aFilter, aDefault) : null;
	
	const result = await execute(aExpression, aResolver.proxy.data);
	if (result !== null && typeof result !== "undefined")
		return result;

	else if (aDefault instanceof _DefaultValue_js__WEBPACK_IMPORTED_MODULE_3__["default"] && aDefault.hasValue)
		return aDefault.value;

	return result;
};

const normalize = value => {
	if (value) {
		value = value.trim();
		return value.length == 0 ? null : value;
	}
	return null;
};

class ExpressionResolver {
	constructor({ context = _default_js_defaultjs_common_utils_src_Global_js__WEBPACK_IMPORTED_MODULE_0__["default"], parent = null, name = null }) {
		this.parent = (parent instanceof ExpressionResolver) ? parent : null;
		this.name = name;
		this.context = context;
		this.proxy = new _Context_js__WEBPACK_IMPORTED_MODULE_4__["default"](this.context, this);
	}

	get chain() {
		return this.parent ? this.parent.chain + "/" + this.name : "/" + this.name;
	}

	get effectiveChain() {
		if (!this.context)
			return this.parent ? this.parent.effectiveChain : "";
		return this.parent ? this.parent.effectiveChain + "/" + this.name : "/" + this.name;
	}

	get contextChain() {
		const result = [];
		let resolver = this;
		while (resolver) {
			if (resolver.context)
				result.push(resolver.context);

			resolver = resolver.parent;
		}

		return result;
	}

	getData(key, filter) {
		if (!key)
			return;
		else if (filter && filter != this.name) {
			if (this.parent)
				this.parent.getData(key, filter);
		} else {
			const property = _default_js_defaultjs_common_utils_src_ObjectProperty_js__WEBPACK_IMPORTED_MODULE_1__["default"].load(this.context, key, false);
			return property ? property.value : null;
		}
	}

	updateData(key, value, filter) {
		if (!key)
			return;
		else if (filter && filter != this.name) {
			if (this.parent)
				this.parent.updateData(key, value, filter);
		} else {
			if(this.context == null || typeof this.context === "undefined"){
				this.context = {};				
				this.proxy.updateData(this.context);
			}
			const property = _default_js_defaultjs_common_utils_src_ObjectProperty_js__WEBPACK_IMPORTED_MODULE_1__["default"].load(this.context, key);
			property.value = value;
			this.proxy.resetCache();
		}
	}

	mergeContext(context, filter) {
		if (filter && filter != this.name) {
			if (this.parent)
				this.parent.mergeContext(context, filter);
		} else {
			this.context = this.context ? _default_js_defaultjs_common_utils_src_ObjectUtils_js__WEBPACK_IMPORTED_MODULE_2__["default"].merge(this.context, context) : context;
		}
	}

	async resolve(aExpression, aDefault) {
		const defaultValue = arguments.length == 2 ? toDefaultValue(aDefault) : DEFAULT_NOT_DEFINED;
		try {
			const match = EXPRESSION.exec(aExpression);
			if (match)
				return await resolve(this, match[3], normalize(match[2]), defaultValue);
			else
				return await resolve(this, normalize(aExpression), null, defaultValue);
		} catch (e) {
			console.error("error at executing statment\"", aExpression, "\":", e);
			return defaultValue.hasValue ? defaultValue.value : aExpression;
		}
	}

	async resolveText(aText, aDefault) {
		let text = aText;
		let temp = aText; // required to prevent infinity loop
		let match = EXPRESSION.exec(text);
		const defaultValue = arguments.length == 2 ? toDefaultValue(aDefault) : DEFAULT_NOT_DEFINED
		while (match != null) {
			const result = await this.resolve(match[0], defaultValue);
			temp = temp.split(match[0]).join(); // remove current match for next loop
			text = text.split(match[0]).join(typeof result === "undefined" ? "undefined" : (result == null ? "null" : result));
			match = EXPRESSION.exec(temp);
		}
		return text;
	}

	static async resolve(aExpression, aContext, aDefault, aTimeout) {
		const resolver = new ExpressionResolver({ context: aContext });
		const defaultValue = arguments.length > 2 ? toDefaultValue(aDefault) : DEFAULT_NOT_DEFINED;
		if (typeof aTimeout === "number" && aTimeout > 0)
			return new Promise(resolve => {
				setTimeout(() => {
					resolve(resolver.resolve(aExpression, defaultValue));
				}, aTimeout);
			});

		return resolver.resolve(aExpression, defaultValue)
	}

	static async resolveText(aText, aContext, aDefault, aTimeout) {
		const resolver = new ExpressionResolver({ context: aContext });
		const defaultValue = arguments.length > 2 ? toDefaultValue(aDefault) : DEFAULT_NOT_DEFINED;
		if (typeof aTimeout === "number" && aTimeout > 0)
			return new Promise(resolve => {
				setTimeout(() => {
					resolve(resolver.resolveText(aText, defaultValue));
				}, aTimeout);
			});

		return resolver.resolveText(aText, defaultValue);
	}
	
	static buildSecure({context, propFilter, option={deep:true}, name, parent}){
		context = _default_js_defaultjs_common_utils_src_ObjectUtils_js__WEBPACK_IMPORTED_MODULE_2__["default"].filter({data: context, propFilter, option});
		return new ExpressionResolver({context, name, parent});
	}
};

/***/ }),

/***/ "./node_modules/@default-js/defaultjs-extdom/index.js":
/*!************************************************************!*\
  !*** ./node_modules/@default-js/defaultjs-extdom/index.js ***!
  \************************************************************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _src_index__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./src/index */ "./node_modules/@default-js/defaultjs-extdom/src/index.js");


/***/ }),

/***/ "./node_modules/@default-js/defaultjs-extdom/src/Global.js":
/*!*****************************************************************!*\
  !*** ./node_modules/@default-js/defaultjs-extdom/src/Global.js ***!
  \*****************************************************************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _utils_Utils__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./utils/Utils */ "./node_modules/@default-js/defaultjs-extdom/src/utils/Utils.js");


_utils_Utils__WEBPACK_IMPORTED_MODULE_0__["default"].global.defaultjs = _utils_Utils__WEBPACK_IMPORTED_MODULE_0__["default"].global.defaultjs || {};
_utils_Utils__WEBPACK_IMPORTED_MODULE_0__["default"].global.defaultjs.extdom = _utils_Utils__WEBPACK_IMPORTED_MODULE_0__["default"].global.defaultjs.extdom || {
	VERSION : "1.0.0-beta.19",
	utils : {
		Utils: _utils_Utils__WEBPACK_IMPORTED_MODULE_0__["default"]
	}
};

_utils_Utils__WEBPACK_IMPORTED_MODULE_0__["default"].global.find = function() {
	return document.find.apply(document, arguments);
};

_utils_Utils__WEBPACK_IMPORTED_MODULE_0__["default"].global.ready = function() {
	return document.ready.apply(document, arguments);
};

_utils_Utils__WEBPACK_IMPORTED_MODULE_0__["default"].global.create = function(aContent, asTemplate) {
	if (typeof arguments[0] !== "string")
		throw new Error("The first argument must be a string!");
	
	const template = document.createElement("template");
	template.innerHTML = aContent;
	if(asTemplate)
		return template;
	
	return document.importNode(template.content, true).childNodes;
};

_utils_Utils__WEBPACK_IMPORTED_MODULE_0__["default"].global.script = function(aFile, aTarget) {
	if(aFile instanceof Array)
		return Promise.all(aFile.map(file => _utils_Utils__WEBPACK_IMPORTED_MODULE_0__["default"].global.script(file, aTarget)));
	
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

/***/ }),

/***/ "./node_modules/@default-js/defaultjs-extdom/src/dom/Document.js":
/*!***********************************************************************!*\
  !*** ./node_modules/@default-js/defaultjs-extdom/src/dom/Document.js ***!
  \***********************************************************************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _utils_ExtendPrototype__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../utils/ExtendPrototype */ "./node_modules/@default-js/defaultjs-extdom/src/utils/ExtendPrototype.js");
/* harmony import */ var _extentions_QuerySupport__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./extentions/QuerySupport */ "./node_modules/@default-js/defaultjs-extdom/src/dom/extentions/QuerySupport.js");
/* harmony import */ var _extentions_ReadyEventSupport__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./extentions/ReadyEventSupport */ "./node_modules/@default-js/defaultjs-extdom/src/dom/extentions/ReadyEventSupport.js");




Object(_utils_ExtendPrototype__WEBPACK_IMPORTED_MODULE_0__["default"])(Document, _extentions_QuerySupport__WEBPACK_IMPORTED_MODULE_1__["default"], _extentions_ReadyEventSupport__WEBPACK_IMPORTED_MODULE_2__["default"]);

document.addEventListener("DOMContentLoaded", () => document.trigger("ready"));





/***/ }),

/***/ "./node_modules/@default-js/defaultjs-extdom/src/dom/DocumentFragment.js":
/*!*******************************************************************************!*\
  !*** ./node_modules/@default-js/defaultjs-extdom/src/dom/DocumentFragment.js ***!
  \*******************************************************************************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _utils_ExtendPrototype__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../utils/ExtendPrototype */ "./node_modules/@default-js/defaultjs-extdom/src/utils/ExtendPrototype.js");
/* harmony import */ var _extentions_QuerySupport__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./extentions/QuerySupport */ "./node_modules/@default-js/defaultjs-extdom/src/dom/extentions/QuerySupport.js");
/* harmony import */ var _extentions_ManipulationSupport__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./extentions/ManipulationSupport */ "./node_modules/@default-js/defaultjs-extdom/src/dom/extentions/ManipulationSupport.js");




Object(_utils_ExtendPrototype__WEBPACK_IMPORTED_MODULE_0__["default"])(DocumentFragment, _extentions_QuerySupport__WEBPACK_IMPORTED_MODULE_1__["default"], _extentions_ManipulationSupport__WEBPACK_IMPORTED_MODULE_2__["default"]);






/***/ }),

/***/ "./node_modules/@default-js/defaultjs-extdom/src/dom/Element.js":
/*!**********************************************************************!*\
  !*** ./node_modules/@default-js/defaultjs-extdom/src/dom/Element.js ***!
  \**********************************************************************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _utils_ExtendPrototype__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../utils/ExtendPrototype */ "./node_modules/@default-js/defaultjs-extdom/src/utils/ExtendPrototype.js");
/* harmony import */ var _extentions_QuerySupport__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./extentions/QuerySupport */ "./node_modules/@default-js/defaultjs-extdom/src/dom/extentions/QuerySupport.js");
/* harmony import */ var _extentions_AttributeSupport__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./extentions/AttributeSupport */ "./node_modules/@default-js/defaultjs-extdom/src/dom/extentions/AttributeSupport.js");
/* harmony import */ var _extentions_ManipulationSupport__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./extentions/ManipulationSupport */ "./node_modules/@default-js/defaultjs-extdom/src/dom/extentions/ManipulationSupport.js");





Object(_utils_ExtendPrototype__WEBPACK_IMPORTED_MODULE_0__["default"])(Element,_extentions_QuerySupport__WEBPACK_IMPORTED_MODULE_1__["default"], _extentions_AttributeSupport__WEBPACK_IMPORTED_MODULE_2__["default"], _extentions_ManipulationSupport__WEBPACK_IMPORTED_MODULE_3__["default"]);

/***/ }),

/***/ "./node_modules/@default-js/defaultjs-extdom/src/dom/EventTarget.js":
/*!**************************************************************************!*\
  !*** ./node_modules/@default-js/defaultjs-extdom/src/dom/EventTarget.js ***!
  \**************************************************************************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _utils_ExtendPrototype__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../utils/ExtendPrototype */ "./node_modules/@default-js/defaultjs-extdom/src/utils/ExtendPrototype.js");
/* harmony import */ var _extentions_EventSupport__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./extentions/EventSupport */ "./node_modules/@default-js/defaultjs-extdom/src/dom/extentions/EventSupport.js");



Object(_utils_ExtendPrototype__WEBPACK_IMPORTED_MODULE_0__["default"])(EventTarget, _extentions_EventSupport__WEBPACK_IMPORTED_MODULE_1__["default"]);

/***/ }),

/***/ "./node_modules/@default-js/defaultjs-extdom/src/dom/HTMLElement.js":
/*!**************************************************************************!*\
  !*** ./node_modules/@default-js/defaultjs-extdom/src/dom/HTMLElement.js ***!
  \**************************************************************************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _utils_ExtendPrototype__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../utils/ExtendPrototype */ "./node_modules/@default-js/defaultjs-extdom/src/utils/ExtendPrototype.js");
/* harmony import */ var _extentions_HtmlClassSupport__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./extentions/HtmlClassSupport */ "./node_modules/@default-js/defaultjs-extdom/src/dom/extentions/HtmlClassSupport.js");
/* harmony import */ var _extentions_ShowHideSupport__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./extentions/ShowHideSupport */ "./node_modules/@default-js/defaultjs-extdom/src/dom/extentions/ShowHideSupport.js");





Object(_utils_ExtendPrototype__WEBPACK_IMPORTED_MODULE_0__["default"])(HTMLElement, _extentions_HtmlClassSupport__WEBPACK_IMPORTED_MODULE_1__["default"], _extentions_ShowHideSupport__WEBPACK_IMPORTED_MODULE_2__["default"]);

/***/ }),

/***/ "./node_modules/@default-js/defaultjs-extdom/src/dom/HTMLInputElement.js":
/*!*******************************************************************************!*\
  !*** ./node_modules/@default-js/defaultjs-extdom/src/dom/HTMLInputElement.js ***!
  \*******************************************************************************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _utils_ExtendPrototype__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../utils/ExtendPrototype */ "./node_modules/@default-js/defaultjs-extdom/src/utils/ExtendPrototype.js");
/* harmony import */ var _extentions_ValueSupport__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./extentions/ValueSupport */ "./node_modules/@default-js/defaultjs-extdom/src/dom/extentions/ValueSupport.js");




Object(_utils_ExtendPrototype__WEBPACK_IMPORTED_MODULE_0__["default"])(HTMLInputElement,_extentions_ValueSupport__WEBPACK_IMPORTED_MODULE_1__["default"]);

/***/ }),

/***/ "./node_modules/@default-js/defaultjs-extdom/src/dom/HTMLSelectElement.js":
/*!********************************************************************************!*\
  !*** ./node_modules/@default-js/defaultjs-extdom/src/dom/HTMLSelectElement.js ***!
  \********************************************************************************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _utils_ExtendPrototype__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../utils/ExtendPrototype */ "./node_modules/@default-js/defaultjs-extdom/src/utils/ExtendPrototype.js");
/* harmony import */ var _extentions_ValueSupport__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./extentions/ValueSupport */ "./node_modules/@default-js/defaultjs-extdom/src/dom/extentions/ValueSupport.js");




Object(_utils_ExtendPrototype__WEBPACK_IMPORTED_MODULE_0__["default"])(HTMLSelectElement,_extentions_ValueSupport__WEBPACK_IMPORTED_MODULE_1__["default"]);

/***/ }),

/***/ "./node_modules/@default-js/defaultjs-extdom/src/dom/HTMLTextAreaElement.js":
/*!**********************************************************************************!*\
  !*** ./node_modules/@default-js/defaultjs-extdom/src/dom/HTMLTextAreaElement.js ***!
  \**********************************************************************************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _utils_ExtendPrototype__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../utils/ExtendPrototype */ "./node_modules/@default-js/defaultjs-extdom/src/utils/ExtendPrototype.js");
/* harmony import */ var _utils_Extender__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../utils/Extender */ "./node_modules/@default-js/defaultjs-extdom/src/utils/Extender.js");




Object(_utils_ExtendPrototype__WEBPACK_IMPORTED_MODULE_0__["default"])(HTMLTextAreaElement,Object(_utils_Extender__WEBPACK_IMPORTED_MODULE_1__["default"])("ValueSupport", Prototype => {	
	Prototype.val = function() {
		if(arguments.length == 0)
			return this.value;
		else
			this.value = arguments[0]
			
		return this;
	};	
}));

/***/ }),

/***/ "./node_modules/@default-js/defaultjs-extdom/src/dom/HtmlCollection.js":
/*!*****************************************************************************!*\
  !*** ./node_modules/@default-js/defaultjs-extdom/src/dom/HtmlCollection.js ***!
  \*****************************************************************************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _utils_ExtendPrototype__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../utils/ExtendPrototype */ "./node_modules/@default-js/defaultjs-extdom/src/utils/ExtendPrototype.js");
/* harmony import */ var _utils_DelegaterBuilder__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../utils/DelegaterBuilder */ "./node_modules/@default-js/defaultjs-extdom/src/utils/DelegaterBuilder.js");
/* harmony import */ var _extentions_ListSupport__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./extentions/ListSupport */ "./node_modules/@default-js/defaultjs-extdom/src/dom/extentions/ListSupport.js");




Object(_utils_ExtendPrototype__WEBPACK_IMPORTED_MODULE_0__["default"])(HTMLCollection, _extentions_ListSupport__WEBPACK_IMPORTED_MODULE_2__["default"]);

HTMLCollection.prototype.applyTo = function(){
	const args = Array.from(arguments);
	const calling = args.shift();
	const isFunction = typeof calling === "function";
	const results = [];
	for(let i = 0; i < this.length; i++){
		const node = this[i];
		let	result;
		if(isFunction)
			result = calling.apply([node].concat(args));
		else if(typeof node[calling] === "function")
			result = node[calling].apply(node, args);
		
		if(result)
			results.push(result);
	}
	
	return results;
};

HTMLCollection.prototype.val = function() {
	if(arguments.length == 0){
		if(this.length > 0){
			const result = new Map();
			this.forEach(node => {
				if(typeof node.val === "function"){
					const value = node.val();
					if(value)
						result.set((node.name || node.id || node.selector()), node.val());
				}
			});	
			return result;
		}
	}
	else
		HTMLCollection.prototype.applyTo.apply(this, ["val"].concat(Array.from(arguments)));
};

HTMLCollection.from = function(){
	const args = Array.from(arguments);
	const data = {};
	let counter = 0;
	
	while(args.length > 0){
		const arg = args.shift();
		if(typeof arg !== "undefined" && arg != null){
			if(arg instanceof HTMLElement)
				data[counter++] = {value: arg, enumerable: true};
			else if(arg instanceof HTMLCollection || arg instanceof NodeList || arg instanceof Array){
				for(let i = 0; i < arg.length; i++){
					if(arg[i] && arg[i] instanceof HTMLElement){
						data[counter++] = {value: arg[i], enumerable: true};
					}
				}
			}
		}
	}
	
	data.length = {value: counter};
	return  Object.create(HTMLCollection.prototype, data);
};


Object(_utils_DelegaterBuilder__WEBPACK_IMPORTED_MODULE_1__["default"])(function(aFunctionName, theArguments) {
	let results = [];	
	this.forEach(node => {
		if(node && typeof node[aFunctionName] === "function"){
			let result = node[aFunctionName].apply(node, theArguments);
			if(result){ 
				if(result instanceof HTMLCollection)
					results = results.concat(Array.from(result));
				else
					results.push(result);
			}		
		}
	});
	
	if(results.length === 0)
		return undefined;
	else if(results[0] instanceof HTMLElement || results[0] instanceof HTMLCollection)
		return HTMLCollection.from.apply(null, results);
	else
		return results;
},HTMLCollection.prototype, Node.prototype, HTMLElement.prototype, HTMLInputElement.prototype, Element.prototype, EventTarget.prototype);


/***/ }),

/***/ "./node_modules/@default-js/defaultjs-extdom/src/dom/Node.js":
/*!*******************************************************************!*\
  !*** ./node_modules/@default-js/defaultjs-extdom/src/dom/Node.js ***!
  \*******************************************************************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _utils_ExtendPrototype__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../utils/ExtendPrototype */ "./node_modules/@default-js/defaultjs-extdom/src/utils/ExtendPrototype.js");
/* harmony import */ var _extentions_DataSupport__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./extentions/DataSupport */ "./node_modules/@default-js/defaultjs-extdom/src/dom/extentions/DataSupport.js");
/* harmony import */ var _extentions_ManipulationSupport__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./extentions/ManipulationSupport */ "./node_modules/@default-js/defaultjs-extdom/src/dom/extentions/ManipulationSupport.js");




Object(_utils_ExtendPrototype__WEBPACK_IMPORTED_MODULE_0__["default"])(Node,_extentions_DataSupport__WEBPACK_IMPORTED_MODULE_1__["default"],_extentions_ManipulationSupport__WEBPACK_IMPORTED_MODULE_2__["default"]);

/***/ }),

/***/ "./node_modules/@default-js/defaultjs-extdom/src/dom/NodeList.js":
/*!***********************************************************************!*\
  !*** ./node_modules/@default-js/defaultjs-extdom/src/dom/NodeList.js ***!
  \***********************************************************************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _utils_ExtendPrototype__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../utils/ExtendPrototype */ "./node_modules/@default-js/defaultjs-extdom/src/utils/ExtendPrototype.js");
/* harmony import */ var _utils_DelegaterBuilder__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../utils/DelegaterBuilder */ "./node_modules/@default-js/defaultjs-extdom/src/utils/DelegaterBuilder.js");
/* harmony import */ var _extentions_ListSupport__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./extentions/ListSupport */ "./node_modules/@default-js/defaultjs-extdom/src/dom/extentions/ListSupport.js");




Object(_utils_ExtendPrototype__WEBPACK_IMPORTED_MODULE_0__["default"])(NodeList, _extentions_ListSupport__WEBPACK_IMPORTED_MODULE_2__["default"]);

NodeList.prototype.applyTo = function(){
	const args = Array.from(arguments);
	const calling = args.shift();
	const isFunction = typeof calling === "function";
	const results = [];
	for(let i = 0; i < this.length; i++){
		const node = this[i];
		let	result;
		if(isFunction)
			result = calling.apply([node].concat(args));
		else if(typeof node[calling] === "function")
			result = node[calling].apply(node, args);
		
		if(result)
			results.push(result);
	}
	
	return results;
};

NodeList.prototype.val = function() {
	if(arguments.length == 0){
		if(this.length > 0){
			const result = new Map();
			this.forEach(node => {
				if(typeof node.val === "function"){
					const value = node.val();
					if(value)
						result.set((node.name || node.id || node.selector()), node.val());
				}
			});	
			return result;
		}
	}
	else
		NodeList.prototype.applyTo.apply(this, ["val"].concat(Array.from(arguments)));
};

NodeList.from = function(){
	const args = Array.from(arguments);
	const data = {};
	let counter = 0;
	
	while(args.length > 0){
		const arg = args.shift();
		if(typeof arg !== "undefined" && arg != null){
			if(arg instanceof Node)
				data[counter++] = {value: arg, enumerable: true};
			else if(arg instanceof NodeList || arg instanceof HTMLCollection || arg instanceof Array){
				for(let i = 0; i < arg.length; i++){
					if(arg[i] && arg[i] instanceof Node){
						data[counter++] = {value: arg[i], enumerable: true};
					}
				}
			}
		}
	}
	
	data.length = {value: counter};
	return  Object.create(NodeList.prototype, data);
};


Object(_utils_DelegaterBuilder__WEBPACK_IMPORTED_MODULE_1__["default"])(function(aFunctionName, theArguments) {
	let results = [];	
	this.forEach(node => {
		if(node && typeof node[aFunctionName] === "function"){
			const result = node[aFunctionName].apply(node, theArguments);
			if(result){ 
				if(result instanceof NodeList)
					results = results.concat(Array.from(result));
				else
					results.push(result);
			}		
		}
	});
	
	if(results.length === 0)
		return undefined;
	else if(results[0] instanceof Node || results[0] instanceof NodeList)
		return NodeList.from(results);
	else
		return results;
},NodeList.prototype, Node.prototype, HTMLElement.prototype, HTMLInputElement.prototype, Element.prototype, EventTarget.prototype);


/***/ }),

/***/ "./node_modules/@default-js/defaultjs-extdom/src/dom/extentions/AttributeSupport.js":
/*!******************************************************************************************!*\
  !*** ./node_modules/@default-js/defaultjs-extdom/src/dom/extentions/AttributeSupport.js ***!
  \******************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _utils_Extender__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../utils/Extender */ "./node_modules/@default-js/defaultjs-extdom/src/utils/Extender.js");


const support = Object(_utils_Extender__WEBPACK_IMPORTED_MODULE_0__["default"])("AttributeSupport", Prototype => {
	Prototype.attr = function() {
		if (arguments.length == 0)
			return this.hasAttributes() ? (() => {
				const result = {};
				this.getAttributeNames().forEach(name => {
					result[name] = this.getAttribute(name);
				});
				return result;
			})() : undefined;
		else if (arguments.length == 1)
			return this.getAttribute(arguments[0]);
		else if (typeof arguments[1] === "undefined" || arguments[1] == null)
			this.removeAttribute(arguments[0]);
		else
			this.setAttribute(arguments[0], arguments[1]);
		
		return this;
	};
});
/* harmony default export */ __webpack_exports__["default"] = (support);

/***/ }),

/***/ "./node_modules/@default-js/defaultjs-extdom/src/dom/extentions/DataSupport.js":
/*!*************************************************************************************!*\
  !*** ./node_modules/@default-js/defaultjs-extdom/src/dom/extentions/DataSupport.js ***!
  \*************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _utils_Extender__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../utils/Extender */ "./node_modules/@default-js/defaultjs-extdom/src/utils/Extender.js");

const support = Object(_utils_Extender__WEBPACK_IMPORTED_MODULE_0__["default"])("DataSupport", Prototype => {
	Prototype.data = function() {
		const data = {};
		if (typeof this.dataset !== "undefined")
			for (name in this.dataset)
				data[name] = this.dataset[name];

		this.data = (function() {
			if (arguments.length == 0)
				return data;
			else if (arguments.length == 1)
				return data[arguments[0]];
			else if (typeof arguments[1] === "undefined" || arguments[1] == null)
				delete data[arguments[0]];
			else
				data[arguments[0]] = arguments[1];

			return this;
		}).bind(this);

		return this.data.apply(null, arguments);
	};
});
/* harmony default export */ __webpack_exports__["default"] = (support);

/***/ }),

/***/ "./node_modules/@default-js/defaultjs-extdom/src/dom/extentions/EventSupport.js":
/*!**************************************************************************************!*\
  !*** ./node_modules/@default-js/defaultjs-extdom/src/dom/extentions/EventSupport.js ***!
  \**************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _utils_Extender__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../utils/Extender */ "./node_modules/@default-js/defaultjs-extdom/src/utils/Extender.js");


const DEFAULT_TIMEOUT = 100;
const support = Object(_utils_Extender__WEBPACK_IMPORTED_MODULE_0__["default"])("EventSupport", (Prototype) => {
	const EVENTSPLITER = /(\s+)|(\s*,\s*)/;
	const getWrapperHandleMap = (element) => {
		if (!element.__wrapperhandlemap__)
			element.__wrapperhandlemap__ = new Map();

		return element.__wrapperhandlemap__;
	}

	const getTriggerTimeouts = (element) => {
		if (!element.___EVENTTRIGGERTIMEOUTS___) element.___EVENTTRIGGERTIMEOUTS___ = {};

		return element.___EVENTTRIGGERTIMEOUTS___;
	};

	const removeWrapper = (element, data, eventTypes) => {
		const { wrapper, option, events, handle } = data;
		const capture = option.capture;
		if(eventTypes){
			eventTypes = typeof eventTypes === "string" ? eventTypes.split(EVENTSPLITER) : eventTypes;
			for (let event of eventTypes) {
				const index = events.indexOf(event);
				if(index >= 0) {
					element.removeEventListener(event, wrapper, capture);
					events.splice(index, 1);
				}
				if(events.length == 0)				
					getWrapperHandleMap(element).delete(handle);
			}
			
		}else{
			for (let event of events) {
				element.removeEventListener(event, wrapper, capture);
			}
			getWrapperHandleMap(element).delete(handle);
		}		
	}

	Prototype.on = function() {
		if (arguments.length < 2) throw new Error("Too less arguments!");

		const args = Array.from(arguments);
		let events = typeof args[0] === "string" ? args.shift().split(EVENTSPLITER) : args.shift();
		const filter = typeof args[0] === "string" ? args.shift() : null;
		const handle = args.shift();
		const option = typeof args[0] === "undefined" ? { capture: false, once: false, passive: false } : (typeof args[0] === "boolean" ? { capture: args.shift(), once: false, passive: false } : args.shift());
		const wrapper = function(aEvent) {
			if (filter) {
				const target = event.target;
				if (typeof target.is === "function" && !aEvent.target.is(filter)) return true;
			}
			const result = handle.apply(null, arguments);
			if (option.once) removeWrapper(this, wrapper);
			return result;
		};

		getWrapperHandleMap(this).set(handle, { handle, wrapper: wrapper, events, option });

		for (let event of events) {
			this.addEventListener(event, wrapper, option);
		}

		return this;
	};


	Prototype.removeOn = function(handle, event, capture) {
		const data = getWrapperHandleMap(this).get(handle);
		if (data) 
			removeWrapper(this, data, event);
		else
			this.removeEventListener(handle, event, capture);

		return this;
	};

	Prototype.trigger = function() {
		const args = Array.from(arguments);
		const timeout = typeof args[0] === "number" ? args.shift() : -1;
		if (timeout >= 0) {
			const type = args[0];
			const timeouts = getTriggerTimeouts(this);
			const timeoutid = timeouts[type];
			if (timeoutid) clearTimeout(timeoutid);

			timeouts[type] = setTimeout(() => {
				delete timeouts[type];
				this.trigger.apply(this, args);
			}, timeout);
		} else {
			const type = args.shift();
			const delegate = args[0] instanceof Event ? args.shift() : null;
			const data = args.length >= 1 ? (args.length == 0 ? args.shift() : args) : delegate;
			const event = data ? new CustomEvent(type, { bubbles: true, cancelable: true, detail: data }) : new Event(type, { bubbles: true, cancelable: true });

			if (delegate) event.delegatedEvent = delegate;
			this.dispatchEvent(event);
		}
		return this;
	};
});
/* harmony default export */ __webpack_exports__["default"] = (support);


/***/ }),

/***/ "./node_modules/@default-js/defaultjs-extdom/src/dom/extentions/HtmlClassSupport.js":
/*!******************************************************************************************!*\
  !*** ./node_modules/@default-js/defaultjs-extdom/src/dom/extentions/HtmlClassSupport.js ***!
  \******************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _utils_Extender__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../utils/Extender */ "./node_modules/@default-js/defaultjs-extdom/src/utils/Extender.js");


const support = Object(_utils_Extender__WEBPACK_IMPORTED_MODULE_0__["default"])("HtmlClassSupport", Prototype => {	
	Prototype.addClass = function() {
		if(arguments.length == 1)
			arguments[0].split(/\s+/).forEach(clazz => this.classList.add(clazz));
		else if(arguments.length > 1)
			Array.prototype.forEach.call(arguments,clazz => this.classList.add(clazz));
		
		return this;
	};
	
	Prototype.removeClass = function() {
		if(arguments.length == 1)
			arguments[0].split(/\s+/).forEach(clazz => this.classList.remove(clazz));
		else if(arguments.length > 1)
			Array.prototype.forEach.call(arguments, clazz => this.classList.remove(clazz));
		
		return this;		
	};
	
	Prototype.toggleClass = function() {
		if(arguments.length == 1)
			arguments[0].split(/\s+/).forEach(clazz => this.classList.toggle(clazz));
		else if(arguments.length > 1)
			Array.prototype.forEach.call(arguments, clazz => this.classList.toggle(clazz));
		
		return this;
	};
});
/* harmony default export */ __webpack_exports__["default"] = (support);

/***/ }),

/***/ "./node_modules/@default-js/defaultjs-extdom/src/dom/extentions/ListSupport.js":
/*!*************************************************************************************!*\
  !*** ./node_modules/@default-js/defaultjs-extdom/src/dom/extentions/ListSupport.js ***!
  \*************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _utils_Extender__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../utils/Extender */ "./node_modules/@default-js/defaultjs-extdom/src/utils/Extender.js");


const support = Object(_utils_Extender__WEBPACK_IMPORTED_MODULE_0__["default"])("ListSupport", Prototype => {		
	Prototype.indexOf = function() {
		for(let i = 0; i < this.length; i++)
			if(this[i] == arguments[0])
				return i;
		
		return -1;
	};

	Prototype.forEach = function(){
		return Array.prototype.forEach.apply(Array.from(this), arguments);
	};
	
	Prototype.map = function(){
		return Array.prototype.map.apply(Array.from(this), arguments);
	};
	
	Prototype.filter = function(){
		return Array.prototype.filter.apply(Array.from(this), arguments);
	};

	Prototype.first = function(){
		if(this.length > 0)
			return this[0];
	};	
	
	Prototype.last = function(){
		if(this.length > 0)
			return this[this.length - 1];
	};
});
/* harmony default export */ __webpack_exports__["default"] = (support);

/***/ }),

/***/ "./node_modules/@default-js/defaultjs-extdom/src/dom/extentions/ManipulationSupport.js":
/*!*********************************************************************************************!*\
  !*** ./node_modules/@default-js/defaultjs-extdom/src/dom/extentions/ManipulationSupport.js ***!
  \*********************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _utils_Extender__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../utils/Extender */ "./node_modules/@default-js/defaultjs-extdom/src/utils/Extender.js");
/* harmony import */ var _utils_Utils__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../utils/Utils */ "./node_modules/@default-js/defaultjs-extdom/src/utils/Utils.js");



const support = Object(_utils_Extender__WEBPACK_IMPORTED_MODULE_0__["default"])("ManipulationSupport", Prototype => {	
	Prototype.empty = function(){
		let nodes = this.childNodes
		while(nodes.length != 0)			
			nodes[0].remove(true);
		
		return this;
	};
	
	Prototype.content = function(){
		return this.childNodes;
	};	
	
	Prototype.html = function(){
		if(arguments.length == 0)			
			return this.innerHTML;
		else if(arguments.length == 1 && typeof arguments[0] === "boolean")
			if(arguments[0])
				return this.outerHTML;
			else
				return this.innerHTML;
		else 
			Array.from(arguments).forEach(content => {
				this.empty();
				if(typeof content === "string")
					this.append(content);
				else if(content instanceof Node || content instanceof NodeList || content instanceof HTMLCollection){
					this.append(content);
				}
			});		
			
		return this;
	};
	
	const append = function(){
		const append = Prototype.appendChild.bind(this);
		for(let i = 0; i < arguments.length; i++){
			let arg = arguments[i];
			if(arg instanceof Node)
				this.appendChild(arg);
			else if(typeof arg === "string")
				create(arg).forEach(append);
			else if(typeof arg.forEach === "function")
				arg.forEach(append);
		}
	};	
	Prototype.append = append;
	
	const prepend = function(aFirstElement, aElement){
		this.insertBefore(aElement, aFirstElement);
	};
	Prototype.prepend = function(){
		if(this.childNodes.length == 0)
			append.apply(this, arguments);
		else {
			const first = this.childNodes.first();
			const insert = prepend.bind(this, first);
			for(let i = 0; i < arguments.length; i++){
				const arg = arguments[i];
				if(arg instanceof Node)
					insert(arg);
				else if(typeof arg === "string")
					arg.forEach(insert);
				else if(typeof arg.forEach === "function")
					arg.forEach(insert);
			}
		}
	};
	
	Prototype.replace = function(){
		if(arguments.length < 1)
			throw new Error("Insufficient arguments! One or two nodes required!");
		
		const parent = arguments.length == 1 ? this.parentNode : this;
		const oldNode = arguments.length == 1 ? this : arguments[0];
		const newNode = arguments.length == 1 ? arguments[0] : arguments[1];
		
		if(newNode instanceof Array || newNode instanceof NodeList || newNode instanceof HTMLCollection){
			newNode.forEach(aItem => parent.insertBefore(aItem, oldNode));
			oldNode.remove();
		}
		else
			parent.replaceChild(newNode,oldNode);
	};
	
	Prototype.after = function(){
		if(this.parentNode == null)
			throw new Error("Can't insert nodes after this node! Parent node not available!");
		
		const parent = this.parentNode;
		const next = this.nextSibling;
		if(next)
			Prototype.before.apply(next, arguments);
		else
			Prototype.append.apply(parent, arguments);
	};	
	
	Prototype.before = function(){
		if(this.parentNode == null)
			throw new Error("Can't insert nodes after this node! Parent node not available!");
		
		const parent = this.parentNode;
		const inserter = (node) => {parent.insertBefore(node, this);}
		for(let i = 0; i < arguments.length; i++){
			const arg = arguments[i];
			if(arg instanceof Node)
				inserter(arg);
			else if(typeof arg === "string")
				arg.forEach(inserter);
			else if(typeof arg.forEach === "function")
				arg.forEach(inserter);
		}
	};	
});
/* harmony default export */ __webpack_exports__["default"] = (support);

/***/ }),

/***/ "./node_modules/@default-js/defaultjs-extdom/src/dom/extentions/QuerySupport.js":
/*!**************************************************************************************!*\
  !*** ./node_modules/@default-js/defaultjs-extdom/src/dom/extentions/QuerySupport.js ***!
  \**************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _utils_Extender__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../utils/Extender */ "./node_modules/@default-js/defaultjs-extdom/src/utils/Extender.js");


const parentSelector = /:parent(\(\"([^\)]*)\"\))?/i;
const queryExecuter = function(aElement, aSelector){
	let match = parentSelector.exec(aSelector);
	if(match){
		let result = aElement;
		if(match.index > 0){
			result = aElement.querySelectorAll(aSelector.substr(0, match.index));
			if(result.length == 0)
				return;
		}	
		result = result.parent(match[2]);			
		if(result){
			let nextSelector = aSelector.substr(match.index + match[0].length).trim();
			if(nextSelector.length > 0)
				result = result.find(nextSelector);
			
			return result;
		}		
	}
	else
		return aElement.querySelectorAll(aSelector);
};


const support = Object(_utils_Extender__WEBPACK_IMPORTED_MODULE_0__["default"])("QuerySupport", Prototype => {	
	Prototype.find = function() {
		let nodes = [];
		let args = Array.from(arguments);
		let arg = args.shift();
		while(arg){
			if(typeof arg === "string"){
				let result = queryExecuter(this, arg);
				if(result)
					nodes.push(result);
			}
			
			arg = args.shift();
		}
		
		let result = NodeList.from.apply(null, nodes);
		return result;
	};
	
	Prototype.is = function() {
		if(this instanceof Document || this instanceof DocumentFragment)
			return false;		
		else if(arguments.length == 1){
			if(typeof arguments[0] === "string")
				return this.matches(arguments[0]);
			else if(typeof arguments[0].length === "number"){
				let filter = arguments[0];
				for(let i = 0; i < filter.length; i++)
					if(this.matches(filter[i]))
						return true;
			}				
		}
		else if(arguments.length > 1)
			return this.is(Array.from(arguments));
		
		return false;
	};	
	
	Prototype.parent = function() {
		if(!this.parentNode)
			return undefined;		
		else if(typeof arguments[0] === "string"){
			let parent = this.parentNode;
			try{
				while(parent && !parent.is(arguments[0]))
					parent = parent.parent(arguments[0]);
			}catch (e) {
				console.error("this:", this, "parent:", parent, "error:", e);
			}
			return parent;
		}
		return this.parentNode;
	};
	
	Prototype.parents = function() {		
		let result = new Array();
		let parent = Prototype.parent.apply(this, arguments);
		while(parent){
			result.push(parent);
			parent = Prototype.parent.apply(parent, arguments);
		}
		
		return NodeList.from(result);
	};	

	Prototype.selector = function(){
		if(this instanceof Document || this instanceof DocumentFragment)
			return undefined;
		else if(this.id)
			return "#" + this.id;
		else{			
			let selector = this.tagName.toLowerCase();
			let parent = this.parent();
			if(parent){
				let sameTagSiblings = parent.find(":scope>" + selector);			
				if (sameTagSiblings instanceof NodeList) {
					let index = sameTagSiblings.indexOf(this);
					if (index > 0)
						selector += ':nth-child(' + (index + 1) + ')';
				}		
				let parentSelector = parent.selector();
				return parentSelector ? parentSelector + ">" + selector : selector;
			} 
			return selector;
		}
	};	

	Prototype.closest = function(aQuery) {			
		let node = this;
		while(node){
			let closests = node.find(aQuery);
			if(closests && closests.length > 0)
				return closests;
			else if(node.is(aQuery))
				return NodeList.from(node);
			
			node = node.parent();		
		}
	};
	
	Prototype.nested = function(aQuery){
		if(this.is(aQuery))
			return NodeList.from(this);	
		
		let nested = this.find(aQuery);
		if(nested && nested.length > 0)
			return nested;
		else
			return NodeList.from(this.parent(aQuery));
	};
});
/* harmony default export */ __webpack_exports__["default"] = (support);



/***/ }),

/***/ "./node_modules/@default-js/defaultjs-extdom/src/dom/extentions/ReadyEventSupport.js":
/*!*******************************************************************************************!*\
  !*** ./node_modules/@default-js/defaultjs-extdom/src/dom/extentions/ReadyEventSupport.js ***!
  \*******************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _utils_Extender__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../utils/Extender */ "./node_modules/@default-js/defaultjs-extdom/src/utils/Extender.js");


const support = Object(_utils_Extender__WEBPACK_IMPORTED_MODULE_0__["default"])("ReadyEventSupport", Prototype => {
	Prototype.ready = function(aFunction, once){	
		this.on("ready", aFunction, once);
		if(document.readyState == "complete")			
			this.trigger("ready");
		
		return this;
	};
	
});
/* harmony default export */ __webpack_exports__["default"] = (support);

/***/ }),

/***/ "./node_modules/@default-js/defaultjs-extdom/src/dom/extentions/ShowHideSupport.js":
/*!*****************************************************************************************!*\
  !*** ./node_modules/@default-js/defaultjs-extdom/src/dom/extentions/ShowHideSupport.js ***!
  \*****************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _utils_Extender__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../utils/Extender */ "./node_modules/@default-js/defaultjs-extdom/src/utils/Extender.js");


const HIDEVALUE = "none";

const isHidden = (element) => {
	return element.style.display === HIDEVALUE
};

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


const support = Object(_utils_Extender__WEBPACK_IMPORTED_MODULE_0__["default"])("ShowHideSupport", Prototype => {
	Prototype.show = function() {
		return init(this).show.apply(null, arguments)
	};

	Prototype.hide = function() {
		return init(this).hide.apply(null, arguments)
	};

	Prototype.toggleShow = function() {
		return isHidden(this) ? this.show() : this.hide();
	};

});
/* harmony default export */ __webpack_exports__["default"] = (support);

/***/ }),

/***/ "./node_modules/@default-js/defaultjs-extdom/src/dom/extentions/ValueSupport.js":
/*!**************************************************************************************!*\
  !*** ./node_modules/@default-js/defaultjs-extdom/src/dom/extentions/ValueSupport.js ***!
  \**************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _utils_Extender__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../utils/Extender */ "./node_modules/@default-js/defaultjs-extdom/src/utils/Extender.js");


const InputTypes = [
	{
		selector : "select",
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
		selector : "input[type=\"checkbox\"], input[type=\"radio\"]",
		get : function(){
			if(this.value == "on" || this.value == "off")
				return this.checked;
			else if(this.checked)
				return this.value;				
		},
		set : function(aValue){
			if(typeof aValue === "boolean")
				this.checked = aValue;
			else if(typeof aValue === "string")
				this.checked = this.value == aValue;
			else if(Array.isArray(aValue))
				this.checked = aValue.indexOf(this.value) >= 0;
			
			this.trigger("changed");
		}
	}
];

const DefaultInputType = {
		get : function(){
			return this.value;
		},
		set : function(aValue){
			this.value = aValue;
			this.trigger("input");
		}	
};

const getInputType = function(aElement){
	for(let i = 0; i < InputTypes.length; i++)
		if(aElement.is(InputTypes[i].selector))
			return InputTypes[i];		
	return DefaultInputType;
};


const support = Object(_utils_Extender__WEBPACK_IMPORTED_MODULE_0__["default"])("ValueSupport", Prototype => {	
	Prototype.val = function() {
		let type = getInputType(this);
		if(arguments.length == 0)
			return type.get.apply(this, arguments);
		else
			type.set.apply(this, arguments);
			
		return this;
	};	
});
/* harmony default export */ __webpack_exports__["default"] = (support);

/***/ }),

/***/ "./node_modules/@default-js/defaultjs-extdom/src/index.js":
/*!****************************************************************!*\
  !*** ./node_modules/@default-js/defaultjs-extdom/src/index.js ***!
  \****************************************************************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
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














/***/ }),

/***/ "./node_modules/@default-js/defaultjs-extdom/src/utils/DelegaterBuilder.js":
/*!*********************************************************************************!*\
  !*** ./node_modules/@default-js/defaultjs-extdom/src/utils/DelegaterBuilder.js ***!
  \*********************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
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
/* harmony default export */ __webpack_exports__["default"] = (DelegaterBuilder);

/***/ }),

/***/ "./node_modules/@default-js/defaultjs-extdom/src/utils/ExtendPrototype.js":
/*!********************************************************************************!*\
  !*** ./node_modules/@default-js/defaultjs-extdom/src/utils/ExtendPrototype.js ***!
  \********************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
const extendPrototype = function(){
	const args = Array.from(arguments);
	const type = args.shift();	
	while(args.length > 0){
		const extender = args.shift();
		extender(type);
	}
};

/* harmony default export */ __webpack_exports__["default"] = (extendPrototype);

/***/ }),

/***/ "./node_modules/@default-js/defaultjs-extdom/src/utils/Extender.js":
/*!*************************************************************************!*\
  !*** ./node_modules/@default-js/defaultjs-extdom/src/utils/Extender.js ***!
  \*************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _Utils__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Utils */ "./node_modules/@default-js/defaultjs-extdom/src/utils/Utils.js");


const EXTENSIONS_MAP = _Utils__WEBPACK_IMPORTED_MODULE_0__["default"].globalVar("___DOM_API_EXTENSION_MAP___", {});
const Extender = function(aName, aExtention){
	return function(aType){	
		let extensions = EXTENSIONS_MAP[aType.name];
		if(!extensions)
			extensions = EXTENSIONS_MAP[aType.name] = {};		
		
		if(!extensions[aName]){
			extensions[aName] = true;
			aExtention(aType.prototype);
		}
		else
			console.warn("duplicated load of extension \"" + aName + "\"!");
	}
};

/* harmony default export */ __webpack_exports__["default"] = (Extender);

/***/ }),

/***/ "./node_modules/@default-js/defaultjs-extdom/src/utils/Utils.js":
/*!**********************************************************************!*\
  !*** ./node_modules/@default-js/defaultjs-extdom/src/utils/Utils.js ***!
  \**********************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* WEBPACK VAR INJECTION */(function(global) {const Utils = {
	global : (() => {
		if(typeof window !== "undefined") return window;
		if(typeof global !== "undefined") return global;
		if(typeof self !== "undefined") return self;
		return {};		
	})(),
	globalVar : function(aName, aInitValue){
		if(arguments.length === 2 && typeof Utils.global[aName] === "undefined")
			Utils.global[aName] = aInitValue;
		
		return Utils.global[aName];		
	}
};

/* harmony default export */ __webpack_exports__["default"] = (Utils);
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../../../../webpack/buildin/global.js */ "./node_modules/webpack/buildin/global.js")))

/***/ }),

/***/ "./node_modules/@default-js/defaultjs-template-language/index.js":
/*!***********************************************************************!*\
  !*** ./node_modules/@default-js/defaultjs-template-language/index.js ***!
  \***********************************************************************/
/*! exports provided: Template, Renderer */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _src_Template_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./src/Template.js */ "./node_modules/@default-js/defaultjs-template-language/src/Template.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "Template", function() { return _src_Template_js__WEBPACK_IMPORTED_MODULE_0__["default"]; });

/* harmony import */ var _src_Renderer_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./src/Renderer.js */ "./node_modules/@default-js/defaultjs-template-language/src/Renderer.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "Renderer", function() { return _src_Renderer_js__WEBPACK_IMPORTED_MODULE_1__["default"]; });






/***/ }),

/***/ "./node_modules/@default-js/defaultjs-template-language/src/Context.js":
/*!*****************************************************************************!*\
  !*** ./node_modules/@default-js/defaultjs-template-language/src/Context.js ***!
  \*****************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return Context; });
/* harmony import */ var _Wait_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Wait.js */ "./node_modules/@default-js/defaultjs-template-language/src/Wait.js");


const CLOSE_TIMEOUT = 2000;
class Context {
	constructor({ resolver, renderer, template, container, root, mode = "replace", target = null, parent = null }) {
		if (!resolver) throw new Error("Parameter \"resolver\" is required!");
		if (!renderer) throw new Error("Parameter \"renderer\" is required!");
		if (!template) throw new Error("Parameter \"template\" is required!");
		if (!container) throw new Error("Parameter \"container\" is required!");
		if (!root) throw new Error("Parameter \"root\" is required!");

		this.readyHandles = [];
		this.content = null;
		this.template = template;
		this.container = container;
		this.resolver = resolver;
		this.mode = mode;
		this.renderer = renderer;
		this.root = root;
		this.target = target;
		this.parent = parent;
		this.closed = false;
		this.wait = Object(_Wait_js__WEBPACK_IMPORTED_MODULE_0__["default"])(this);


		/* execution flags */
		this.stop = false;
		this.ignore = false;
	}

	async finish(callback) {
		if (this.closed)
			return; //context is ready and closed

		if (this.parent)
			this.parent.finish(callback);
		else
			this.ready(callback);
	};

	async ready(callback) {
		if (this.closed)
			return; //context is ready and closed

		if (callback) {
			if (callback instanceof Array)
				callback.forEach((callback) => { this.ready = callback; });
			else if (callback instanceof Promise || typeof callback === "function")
				this.readyHandles.push(callback);
		} else {
			this.closed = true;
			//wait of all sub context to be closed with an maximum amount of time

			if (this.readyHandles.length > 0) {
				try {
					await Promise.race([
						Promise.all(this.readyHandles.map(handle => handle instanceof Promise ? handle : handle(this))),
						new Promise((reject, error) => {
							setTimeout(() => {
								error(new Error("timeout"));
							}, 2000)
						})
					]);
				} catch (e) {
					console.error(e);			
					throw e
				}
			}

			this.wait.finished();
		}
	}

	subContext({ resolver = this.resolver, renderer = this.renderer, template = this.template, container = this.container, root = this.root, mode = this.mode, target = this.target } = {}) {
		const sub = new Context({ resolver, renderer, template, container, mode, root, target, parent: this });
		//this.ready(sub.wait);
		return sub;
	}

	clone({ resolver = this.resolver, renderer = this.renderer, template = this.template, container = this.container, root = this.root, mode = this.mode, target = this.target } = {}) {
		return new Context({ resolver, renderer, template, container, mode, root, target, parent: this });
	}
};

/***/ }),

/***/ "./node_modules/@default-js/defaultjs-template-language/src/Directive.js":
/*!*******************************************************************************!*\
  !*** ./node_modules/@default-js/defaultjs-template-language/src/Directive.js ***!
  \*******************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return Directive; });
const DEFINED_DIRECTIVES = [];

const defineDirective = ({ directive }) => {
	if (!(directive instanceof Directive))
		throw new Error("Implementation dosn't extend Directive class!");

	if (directive.rank < Directive.MIN_RANK)
		throw new Error("The rank of a directive can't be lower as " + Directive.MIN_RANK + "!");

	if (directive.rank > Directive.MAX_RANK)
		throw new Error("The rank of a directive can't be grater as " + Directive.MAX_RANK + "!");

	DEFINED_DIRECTIVES.push(directive);
	DEFINED_DIRECTIVES.sort((a, b) => {
		const phase = a.phase - b.phase;
		if(phase == 0)
			return a.rank - b.rank;
			
		return phase;
	});
};

const PHASE = {
	init: 0,
	data: 1,
	template: 2,
	content: 3,
	finish: 4
};

class Directive {

	static get PHASE() { return PHASE };
	static get MIN_RANK() { return 0 };
	static get MAX_RANK() { return 100000 };

	constructor() { };

	get name() { }
	get rank() { }
	get phase() {return PHASE.finish}

	/**
	 * need to be implemented
	 * 
	 * return DirectiveResult
	 */
	async execute(context) {
		return context;
	}


	static define(option) {
		defineDirective(option);
	}

	static get directives() {
		return DEFINED_DIRECTIVES;
	}
};

/***/ }),

/***/ "./node_modules/@default-js/defaultjs-template-language/src/Element.js":
/*!*****************************************************************************!*\
  !*** ./node_modules/@default-js/defaultjs-template-language/src/Element.js ***!
  \*****************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return DirectiveElement; });
class DirectiveElement extends HTMLElement{
	constructor(){
		super();
		this.hidden = true;
	}
	
	/**
	 * need to be implemented
	 * 
	 */
	async execute({template, context}){
		context.content = template.cloneNode(true);
		return context;
	};	
}

/***/ }),

/***/ "./node_modules/@default-js/defaultjs-template-language/src/Renderer.js":
/*!******************************************************************************!*\
  !*** ./node_modules/@default-js/defaultjs-template-language/src/Renderer.js ***!
  \******************************************************************************/
/*! exports provided: SCOPES, default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "SCOPES", function() { return SCOPES; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return Renderer; });
/* harmony import */ var _default_js_defaultjs_extdom__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @default-js/defaultjs-extdom */ "./node_modules/@default-js/defaultjs-extdom/index.js");
/* harmony import */ var _default_js_defaultjs_expression_language_src_ExpressionResolver_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @default-js/defaultjs-expression-language/src/ExpressionResolver.js */ "./node_modules/@default-js/defaultjs-expression-language/src/ExpressionResolver.js");
/* harmony import */ var _Template_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./Template.js */ "./node_modules/@default-js/defaultjs-template-language/src/Template.js");
/* harmony import */ var _Context_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./Context.js */ "./node_modules/@default-js/defaultjs-template-language/src/Context.js");
/* harmony import */ var _Directive_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./Directive.js */ "./node_modules/@default-js/defaultjs-template-language/src/Directive.js");
/* harmony import */ var _Element_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./Element.js */ "./node_modules/@default-js/defaultjs-template-language/src/Element.js");
/* harmony import */ var _directives__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./directives */ "./node_modules/@default-js/defaultjs-template-language/src/directives/index.js");
/* harmony import */ var _elements__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./elements */ "./node_modules/@default-js/defaultjs-template-language/src/elements/index.js");










const SCOPES = {
	application: "application",
	data: "data",
	render: "render",
	container: "container",
	node: "node",
	directive: "directive"
};

const APPLICATION_SCOPE_RESOLVER = new _default_js_defaultjs_expression_language_src_ExpressionResolver_js__WEBPACK_IMPORTED_MODULE_1__["default"]({ name: SCOPES.application });

const MODEWORKER = {
	"replace": async ({ container, target = null, content }) => {
		if (target) {
			target.replace(content);
		} else {
			container.empty();
			container.append(content);
		}
	},
	"append": async ({ container, target = null, content }) => {
		if (target)
			target.after(content);
		else
			container.append(content);
	},
	"prepend": async ({ container, target = null, content }) => {
		if (target)
			target.before(content);
		else
			container.prepend(content);
	}
};

const loadTemplateContent = async (template, context, renderer) => {
	if (template) {
		template = await _Template_js__WEBPACK_IMPORTED_MODULE_2__["default"].load(template)
		return template.importContent();
	} else if (context)
		return context.template;
	else if (renderer.template) {
		return await renderer.template.importContent();
	}

	throw new Error("No content template specified!");
};

class Renderer {
	constructor({ template, data } = {}) {
		if (template && !(template instanceof _Template_js__WEBPACK_IMPORTED_MODULE_2__["default"]))
			throw new Error("template must be an instance of Template!");

		this.template = template;
		this.resolver = new _default_js_defaultjs_expression_language_src_ExpressionResolver_js__WEBPACK_IMPORTED_MODULE_1__["default"]({ name: SCOPES.data, context: data ? data : {}, parent: APPLICATION_SCOPE_RESOLVER });
	}

	/**
	 * @param 
	 * 		container HTMLElement -> target to render in
	 * @param
	 * 		data Object|... -> data to used at rendering
	 * @param
	 * 		template Template|Node|NodeList|HTMLCollection|String -> template to render
	 * @param
	 * 		mode "append"|"insert"|"replace"
	 * @param
	 * 		target
	 */
	async render({ template = null, data = null, container, root, mode, target, context = null }) {
		template = await loadTemplateContent(template, context, this);
		let resolver = new _default_js_defaultjs_expression_language_src_ExpressionResolver_js__WEBPACK_IMPORTED_MODULE_1__["default"]({ name: SCOPES.render, context: data, parent: context ? context.resolver : this.resolver });

		let renderContext = context;
		if (!renderContext)
			renderContext = new _Context_js__WEBPACK_IMPORTED_MODULE_3__["default"]({ resolver, renderer: this, template, container, root: root ? root : container, mode: mode ? mode : "replace", target });
		else
			renderContext = renderContext.clone({ resolver, template, container, root, mode, target });

		let result = null;
		if (template instanceof Node)
			result = await this.renderNode(renderContext);
		else
			result = await this.renderContainer(renderContext)

		if (result instanceof _Context_js__WEBPACK_IMPORTED_MODULE_3__["default"])
			renderContext = result;


		if (renderContext.content && renderContext.mode) {
			const modeworker = MODEWORKER[renderContext.mode];
			if (!modeworker)
				throw new Error("The \"" + renderContext.mode + "\" is not supported!")

			await modeworker(renderContext);
		}

		if (!context)
			await renderContext.ready();
		else
			renderContext.ready();

		return context;
	}


	async renderContainer(context) {
		if (context.template && context.template.length > 0) {
			const renderings = context.template.map(node => {
				//separate node context from the current context
				const resolver = new _default_js_defaultjs_expression_language_src_ExpressionResolver_js__WEBPACK_IMPORTED_MODULE_1__["default"]({ name: SCOPES.node, context: null, parent: context.resolver });
				return this.renderNode(context.clone({ template: node, resolver }))
			});
			const result = await Promise.all(renderings);
			if (!result)
				return context;

			context.content = result
				.filter(result => !!result)
				.reduce((content, result) => {
					const node = result.content;
					if (node instanceof Array)
						content = content.concat(node);
					if (node instanceof NodeList || node instanceof HTMLCollection)
						content = content.concat(Array.from(node));
					else if (node instanceof Node)
						content.push(node);

					result.ready();
					return content;
				}, []);

		}
		return context;
	}

	async renderNode(context) {
		try {
			context.template.normalize();
			if (context.template instanceof _Element_js__WEBPACK_IMPORTED_MODULE_5__["default"])
				await context.template.execute(context);
			else
				await this.executeDirectives(context);

			if (!context.ignore && context.content) {
				const content = context.template.childNodes;
				if (content && content.length > 0) {
					// @TODO await or fire and forget???
					await context.renderer.render({ context: context.clone({ template: content, container: context.content }) });
				}
			}

			if (context.content && context.content.tagName && context.content.tagName == "JSTL")
				context.content = context.content.childNodes; //special case to support the old "<jstl>" tag.
				
		} catch (e) {
			console.error("error at render node:", e, context);
		}
		return context;
	}

	async executeDirectives(context) {
		//console.log("scope chain:", context.renderer.chain, "resolver chain", context.renderer.resolver.fullname);
		const directives = _Directive_js__WEBPACK_IMPORTED_MODULE_4__["default"].directives;
		const length = directives.length;
		for (let i = 0; i < length && !context.stop; i++) {
			const directive = directives[i];
			try {
				const result = await directive.execute(context);
				if (result instanceof _Context_js__WEBPACK_IMPORTED_MODULE_3__["default"])
					context = result;
			} catch (e) {
				console.error("error at directive:", e, directive, context);
			}
		}
		return context;
	}

	static async build({ template, data } = {}) {
		if (template && template instanceof Promise)
			template = await template;

		template = template ? await _Template_js__WEBPACK_IMPORTED_MODULE_2__["default"].load(template) : null;
		return new Renderer({ template, data });
	};

	static async render({ container, data, template, mode, target }) {
		const renderer = new Renderer({ template, data });
		return renderer.render({ container, mode, target });
	}
}

/***/ }),

/***/ "./node_modules/@default-js/defaultjs-template-language/src/Template.js":
/*!******************************************************************************!*\
  !*** ./node_modules/@default-js/defaultjs-template-language/src/Template.js ***!
  \******************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return Template; });
/* harmony import */ var _default_js_defaultjs_common_utils_src_javascript_String_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @default-js/defaultjs-common-utils/src/javascript/String.js */ "./node_modules/@default-js/defaultjs-common-utils/src/javascript/String.js");
/* harmony import */ var _default_js_defaultjs_common_utils_src_javascript_String_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_default_js_defaultjs_common_utils_src_javascript_String_js__WEBPACK_IMPORTED_MODULE_0__);


const CACHE = {};
const getKey = (template, cache, alias) => {
	if(!cache)
		return null;
	
	let key = null;
	if(alias)
		key = alias;	
	else if(typeof template === "string")
		key = template;
	else if(template instanceof URL)
		key = template.toString();
	else if(template instanceof HTMLElement)
		key = template.selector();
	
	if(key)
		return key.hashcode();
	
	return null;
};

const fromURL = async (url, cache, key) => {
	const response = await fetch(url.toString());
	const source = await response.text();
	return fromSource(source, cache, key);
};

const fromSource = async (source, cache, key) => {
	return fromElement(create(source, true), cache, key);
};

const fromElement = async (element, cache, key) => {	
	let template = null
	if(element instanceof HTMLTemplateElement)			
		template = new Template(element);
	else {
		template = document.createElement("template");
		if(element instanceof Node || element instanceof NodeList || element instanceof HTMLCollection || element instanceof Array)
			template.append(element);
		else
			throw new Error("Template type is not supported!");			
		
		template = new Template(template, key);
	}
	
	if(!template)
		throw new Error("Template can't loaded!");
	
	if(cache && key)
		CACHE[key] = template;
	
	return template;
};

class Template {	
	constructor(template, key){		
		this.template = template;
		this.key = key;	
	}
	
	importContent(doc=document){
		let imported = doc.importNode(this.template, true);
		return imported.content.childNodes;
	}
	
	remove() {
		if(this.key && CACHE[this.key])
			delete CACHE[this.key];		
	};
	
	static async load(template, cache = true, alias = null){
		if(template instanceof Template)
			return template;
		
		const key = getKey(template, cache, alias);
		if(key && CACHE[key])
			return CACHE[key];
		else if(typeof template === "string"){
			return fromSource(template, cache, key);
		}else if(template instanceof URL)
			return await fromURL(template, cache, key);
		else if(template instanceof Node || template instanceof NodeList || template instanceof HTMLCollection || template instanceof HTMLTemplateElement)
			return fromElement(template, cache, key);
		
		new Error("The template isn't a allowed type! -> [String|URL|Node|NodeList|HTMLCollection|Template] required!");
	}	
};


/***/ }),

/***/ "./node_modules/@default-js/defaultjs-template-language/src/Wait.js":
/*!**************************************************************************!*\
  !*** ./node_modules/@default-js/defaultjs-template-language/src/Wait.js ***!
  \**************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = ((object) => {
	let finished = null;
	const wait =  new Promise((resolve) => {
		finished = resolve;
	});
	wait.object = object;
	
	wait.finished = async () => {
		await finished();
	};
	
	return wait;
});

/***/ }),

/***/ "./node_modules/@default-js/defaultjs-template-language/src/directives/Attributes.js":
/*!*******************************************************************************************!*\
  !*** ./node_modules/@default-js/defaultjs-template-language/src/directives/Attributes.js ***!
  \*******************************************************************************************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _Directive_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../Directive.js */ "./node_modules/@default-js/defaultjs-template-language/src/Directive.js");


const ATTRIBUTE_NAME = /(jstl)?(\?)?(@)?([^\?@]+)/i;

const bindAttribute = async ({ condition, name, value, context }) => {
	const { resolver, content, template } = context;
		
	let attribute = !condition ? value : template.attr(name);
	condition = condition ? value : template.attr("?" + name);
	
	if (condition && attribute) {
		condition = await resolver.resolve(condition, false);
		if (condition === true)
			content.attr(name, await resolver.resolveText(attribute, attribute));
	} else if (condition) {
		condition = await resolver.resolve(condition, false);
		if (condition === true)
			content.attr(name, true);
	} else if (attribute) {
		content.attr(name, await resolver.resolveText(attribute, attribute));
	}
};

const bindEvent = async ({ condition, name, value, context }) => {
	const { resolver, template } = context;
	
	condition = condition ? value : template.attr("?@" + name);
	let handle = !condition ? value : template.attr("@"+ name);
	let split = name.split(":");
	const event = split.shift();
	const type = split.shift() || "default";
	

	if (condition && handle){
		if(await resolver.resolve(condition, false) == true)
			await binding({event, type, handle, context });
	}
	else if (handle)
		await binding({event, type, handle, context });
};

const binding = async ({event, type, handle, context }) => {
	const { resolver, content} = context;
		
	if(type == "delegate"){
		const eventhandle = await resolver.resolveText(handle, handle);
		content.on(event, delegater(eventhandle));
	} else {		
		const eventhandle = await resolver.resolve(handle, handle);
	
		if(!eventhandle)
			console.error(new Error("Can't resolve \"" + handle + "\" to event handle!"))
		else if(typeof eventhandle === "function")
			content.on(event, eventhandle);
		else if(typeof eventhandle === "string")
			content.on(event, delegater(eventhandle));
		else if(typeof eventhandle === "object"){	
			const {capture=false, passive=false, once=false} = handle;		
			content.on(event, eventhandle.eventHandle, {capture, passive, once});
		}
	}
};

const delegater = function(delegate) {
	return function(event) {
		event.preventDefault();
		event.stopPropagation();
		if(event.currentTarget)	
			event.currentTarget.trigger(delegate, event);
		else
			event.target.trigger(delegate, event);
	};
};


class Attribute extends _Directive_js__WEBPACK_IMPORTED_MODULE_0__["default"] {
	constructor() {
		super();
	}

	get name() { return "attribute" }
	get rank() { return _Directive_js__WEBPACK_IMPORTED_MODULE_0__["default"].MIN_RANK }
	get phase() { return _Directive_js__WEBPACK_IMPORTED_MODULE_0__["default"].PHASE.content }


	async execute(context) {
		const { template } = context;
		if (!(template instanceof HTMLElement))
			return context;

		const processed = new Set();
		for (const attribute of template.attributes) {
			const [, jstl, condition, event, name] = ATTRIBUTE_NAME.exec(attribute.name);
			if (!jstl && !processed.has(name)) {
				const value = attribute.value;
								
				if (event)
					await bindEvent({ condition, event, name, value, context })
				else
					await bindAttribute({ condition, name, value, context })
			}
			processed.add(name);
		}

		return context;
	}
}

_Directive_js__WEBPACK_IMPORTED_MODULE_0__["default"].define({ directive: new Attribute() });

/***/ }),

/***/ "./node_modules/@default-js/defaultjs-template-language/src/directives/Choose.js":
/*!***************************************************************************************!*\
  !*** ./node_modules/@default-js/defaultjs-template-language/src/directives/Choose.js ***!
  \***************************************************************************************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _Directive_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../Directive.js */ "./node_modules/@default-js/defaultjs-template-language/src/Directive.js");


class Choose extends _Directive_js__WEBPACK_IMPORTED_MODULE_0__["default"] {
	constructor() {
		super();
	}

	get name() { return "choose" }
	get rank() { return _Directive_js__WEBPACK_IMPORTED_MODULE_0__["default"].MIN_RANK + 1 }
	get phase() { return _Directive_js__WEBPACK_IMPORTED_MODULE_0__["default"].PHASE.template }

	async execute(context) {
		if (!(context.template instanceof HTMLElement) || !context.template.hasAttribute("jstl-choose") || context.template.children.length == 0)
			return context;

		const { template, resolver } = context;
		let resolved = false;
		const whens = template.find(":scope > [jstl-when]");
		const length = whens.length;
		for (let i = 0; i < length; i++) {
			const node = whens[i];
			if (!resolved && (await resolver.resolve(node.attr("jstl-when"), false)))
				resolved = true;
			else
				node.remove();
		}

		if (resolved)
			template.find(":scope > [jstl-otherwise]").remove();

		return context;
	}
}

_Directive_js__WEBPACK_IMPORTED_MODULE_0__["default"].define({ directive: new Choose() });

/***/ }),

/***/ "./node_modules/@default-js/defaultjs-template-language/src/directives/Data.js":
/*!*************************************************************************************!*\
  !*** ./node_modules/@default-js/defaultjs-template-language/src/directives/Data.js ***!
  \*************************************************************************************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _Directive_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../Directive.js */ "./node_modules/@default-js/defaultjs-template-language/src/Directive.js");
/* harmony import */ var _default_js_defaultjs_expression_language_src_ExpressionResolver_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @default-js/defaultjs-expression-language/src/ExpressionResolver.js */ "./node_modules/@default-js/defaultjs-expression-language/src/ExpressionResolver.js");



const MODES = {
	"remote": async ({ data, context }) => {		
		const {resolver, template} = context;
		data = await resolver.resolveText(data);
		data = new URL(data, location.origin);
		let option = await resolver.resolveText(template.attr("jstl-data-option") || "{}");
		option = JSON.parse(option);

		data = await fetch(data.toString(), option);
		return data.json();
	},
	"direct": async ({ data, context }) => {
		const {resolver} = context;
		
		data = await resolver.resolveText(data);
		return data;
	}
};

const updateContext = ({ varname, data, scope, context }) => {
	if (varname)
		context.resolver.updateData(varname, data, scope);
	else if (scope)
		context.resolver.mergeContext(data, scope);
	else
		context.resolver = new _default_js_defaultjs_expression_language_src_ExpressionResolver_js__WEBPACK_IMPORTED_MODULE_1__["default"]({ context: data, name: "jstl-data", parent: context.resolver });
	
		
	return context;
};



class Data extends _Directive_js__WEBPACK_IMPORTED_MODULE_0__["default"] {
	constructor() {
		super();
	}

	get name() { return "data" }
	get rank() { return 1000 }
	get phase(){return _Directive_js__WEBPACK_IMPORTED_MODULE_0__["default"].PHASE.data}

	async execute(context) {
		if (!(context.template instanceof HTMLElement) || !context.template.attr("jstl-data"))
			return context;
			
		try {
			const { template } = context;			
			const mode = MODES[(template.attr("jstl-data-mode") || "remote")];
			if (!mode)
				throw new Error("The jstl-data-mode is unsupported!");

			let data = template.attr("jstl-data");
			data = await mode({ data, context });

			const varname = template.attr("jstl-data-var");
			const scope = template.attr("jstl-data-scope");
			context = updateContext({ varname, data, scope, context });
		} catch (e) {
			console.error(e, context.template);
		}

		return context;

	}
}

_Directive_js__WEBPACK_IMPORTED_MODULE_0__["default"].define({ directive: new Data() });

/***/ }),

/***/ "./node_modules/@default-js/defaultjs-template-language/src/directives/Foreach.js":
/*!****************************************************************************************!*\
  !*** ./node_modules/@default-js/defaultjs-template-language/src/directives/Foreach.js ***!
  \****************************************************************************************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _Directive_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../Directive.js */ "./node_modules/@default-js/defaultjs-template-language/src/Directive.js");
/* harmony import */ var _default_js_defaultjs_expression_language_src_ExpressionResolver_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @default-js/defaultjs-expression-language/src/ExpressionResolver.js */ "./node_modules/@default-js/defaultjs-expression-language/src/ExpressionResolver.js");



const ATTRIBUTE = {
	DATA: "jstl-foreach",
	VAR: "jstl-foreach-var",
	STATUS: "jstl-foreach-status",
	COUNT: "jstl-foreach-count",
	START: "jstl-foreach-start",
	STEP: "jstl-foreach-step",
	CONDITION: "jstl-foreach-condition"
};

const doCount = async (option) => {
	let { start, step, count, varname, status, resolver } = option;

	count = await resolver.resolve(count);
	const length = start + (count * step);
	let stop = false;
	for (let i = start; i < length && !stop; i = i + step) {
		const iteration = {}
		iteration[varname] = i;
		iteration[status] = {
			index: i,
			number: i + 1,
			step,
			count
		};
		stop = !(await iterate(iteration, option));
	}
};

const doForeach = async (option) => {
	let { data, start, step, count, varname, status, resolver } = option;

	data = await resolver.resolve(data);
	let array = data;
	if (!(data instanceof Array))
		array = Object.getOwnPropertyNames(data);

	count = count != "" ? await resolver.resolve(count, 0) : null;
	const length = count ? Math.min(start + count, array.length) : array.length;
	let stop = false;
	for (let i = start; i < length && !stop; i = i + step) {
		const iteration = {}
		iteration[varname] = data[i];
		iteration[status] = {
			index: i,
			number: i + 1,
			count: length,
			data
		};
		stop = !(await iterate(iteration, option));
	}
};

const iterate = async (data, option) => {
	let { template, resolver, renderer, container, condition, context } = option;
	resolver = new _default_js_defaultjs_expression_language_src_ExpressionResolver_js__WEBPACK_IMPORTED_MODULE_1__["default"]({ context: data, name: "jstl-foreach", parent: resolver });

	condition = condition ? await resolver.resolve(condition, false) : false;
	if (condition)
		return false;

	await renderer.render({ context: context.clone({ resolver, container, template, mode: "append" }) });
	return true;
};

class Foreach extends _Directive_js__WEBPACK_IMPORTED_MODULE_0__["default"] {
	constructor() {
		super();
	}

	get name() { return "foreach" }
	get rank() { return _Directive_js__WEBPACK_IMPORTED_MODULE_0__["default"].MIN_RANK + 2 }
	get phase() { return _Directive_js__WEBPACK_IMPORTED_MODULE_0__["default"].PHASE.template }

	async execute(context) {
		if (!(context.template instanceof HTMLElement) || (!context.template.attr(ATTRIBUTE.DATA) && !context.template.attr(ATTRIBUTE.COUNT)))
			return context;

		context.ignore = true;
		try {
			const { template, resolver, renderer, content } = context;
			const option = {
				data: (template.attr(ATTRIBUTE.DATA) || "").trim(),
				count: (template.attr(ATTRIBUTE.COUNT) || "").trim(),
				start: await resolver.resolve(template.attr(ATTRIBUTE.START) || "0"),
				step: await resolver.resolve(template.attr(ATTRIBUTE.STEP) || "1"),
				varname: (template.attr(ATTRIBUTE.VAR) || "item").trim(),
				status: (template.attr(ATTRIBUTE.STATUS) || "status").trim(),
				condition: template.attr(ATTRIBUTE.CONDITION),
				template: template.childNodes,
				resolver,
				renderer,
				container: content,
				context
			};
			if ((!option.data || option.data == "") && option.count)
				await doCount(option);
			else
				await doForeach(option);

		} catch (error) {
			console.error("error at jstl-foreach:", error);
		}
		return context;

	}
};

_Directive_js__WEBPACK_IMPORTED_MODULE_0__["default"].define({ directive: new Foreach() });

/***/ }),

/***/ "./node_modules/@default-js/defaultjs-template-language/src/directives/If.js":
/*!***********************************************************************************!*\
  !*** ./node_modules/@default-js/defaultjs-template-language/src/directives/If.js ***!
  \***********************************************************************************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _Directive_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../Directive.js */ "./node_modules/@default-js/defaultjs-template-language/src/Directive.js");


class If extends _Directive_js__WEBPACK_IMPORTED_MODULE_0__["default"] {
	constructor() {
		super();
	}

	get name() { return "if" }
	get rank() { return _Directive_js__WEBPACK_IMPORTED_MODULE_0__["default"].MIN_RANK + 1000 }
	get phase() { return _Directive_js__WEBPACK_IMPORTED_MODULE_0__["default"].PHASE.init }

	async execute(context) {
		const { template } = context;
		if (!(template instanceof HTMLElement) || !template.attr("jstl-if"))
			return context;

		const expression = template.attr("jstl-if");
		const resolver = context.resolver;
		const result = await resolver.resolve(expression, false);
		if (!result) {
			context.content = null;
			context.stop = true;
			context.ignore = true;
		}

		return context;
	}
}

_Directive_js__WEBPACK_IMPORTED_MODULE_0__["default"].define({ directive: new If() });

/***/ }),

/***/ "./node_modules/@default-js/defaultjs-template-language/src/directives/Include.js":
/*!****************************************************************************************!*\
  !*** ./node_modules/@default-js/defaultjs-template-language/src/directives/Include.js ***!
  \****************************************************************************************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _Directive_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../Directive.js */ "./node_modules/@default-js/defaultjs-template-language/src/Directive.js");
/* harmony import */ var _Template_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../Template.js */ "./node_modules/@default-js/defaultjs-template-language/src/Template.js");



class Include extends _Directive_js__WEBPACK_IMPORTED_MODULE_0__["default"] {	
	constructor(){
		super();
	}
	
	get name() {return "include"}
	get rank() {return _Directive_js__WEBPACK_IMPORTED_MODULE_0__["default"].MIN_RANK}
	get phase(){return _Directive_js__WEBPACK_IMPORTED_MODULE_0__["default"].PHASE.template}
		
	async execute(context){
		if(!(context.template instanceof HTMLElement) || !context.template.attr("jstl-include"))
			return context;
		try{
			const {template, resolver, renderer} = context;		
			let include = template.attr("jstl-include");
			include = await resolver.resolveText(include);
			include = new URL(include, location.origin);			
			include = await _Template_js__WEBPACK_IMPORTED_MODULE_1__["default"].load(include);
			
			const mode = template.attr("jstl-include-mode") || "replace";
			await renderer.render({template:include, container: context.content, mode, context});
			context.ignore;
			
			return context;
		}catch(e){
			console.error(e, context.template);
			return context;
		}		
	}
}

_Directive_js__WEBPACK_IMPORTED_MODULE_0__["default"].define({directive: new Include()});

/***/ }),

/***/ "./node_modules/@default-js/defaultjs-template-language/src/directives/Initial.js":
/*!****************************************************************************************!*\
  !*** ./node_modules/@default-js/defaultjs-template-language/src/directives/Initial.js ***!
  \****************************************************************************************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _Directive_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../Directive.js */ "./node_modules/@default-js/defaultjs-template-language/src/Directive.js");
/* harmony import */ var _elements_Replace_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../elements/Replace.js */ "./node_modules/@default-js/defaultjs-template-language/src/elements/Replace.js");

 


class Initial extends _Directive_js__WEBPACK_IMPORTED_MODULE_0__["default"] {	
	constructor(){
		super();
	}
	
	get name() {return "initial"}
	get rank() {return _Directive_js__WEBPACK_IMPORTED_MODULE_0__["default"].MIN_RANK}
	get phase(){return _Directive_js__WEBPACK_IMPORTED_MODULE_0__["default"].PHASE.init}
	
	
	async execute(context){
		const {template} = context;		
		if(template instanceof Text)
			context.content = document.importNode(template,true);
		else if(template.attr("jstl-async")){
			context.content = new _elements_Replace_js__WEBPACK_IMPORTED_MODULE_1__["default"]();
			template.attr("jstl-async", null);
			setTimeout(async () =>{
				await context.renderer.render({mode: "replace", target: context.content, context});
			},parseInt(template.attr("jstl-async") || "250") || 250);
			context.stop = true;
			context.ignore = true;
		}else if(template.attr("jstl-ignore")){
			context.content = document.importNode(template, true);
			context.stop = true;
			context.ignore = true;
		}else if(template.tagName){
			context.content = document.createElement(template.tagName);
		}else{
			context.stop = true;
			context.ignore = true;
		}
		return context;
	}
}

_Directive_js__WEBPACK_IMPORTED_MODULE_0__["default"].define({directive: new Initial()});

/***/ }),

/***/ "./node_modules/@default-js/defaultjs-template-language/src/directives/Text.js":
/*!*************************************************************************************!*\
  !*** ./node_modules/@default-js/defaultjs-template-language/src/directives/Text.js ***!
  \*************************************************************************************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _Directive_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../Directive.js */ "./node_modules/@default-js/defaultjs-template-language/src/Directive.js");


const DEFAULT_OPTION = {
	mode: "text",
	unsecure: false,
	preventFormat : false,
	maxLength: 0	
};

const SECURE_HTML_FILTER = "script, style, body, html, head, object, link";

const readOption = async (parent, context) => {
	const resolver = context.resolver;
	return {
		mode: await resolver.resolveText((parent.attr("jstl-text-content-type") || "text").trim().toLowerCase()),
		unsecure: parent.hasAttribute("jstl-text-unsecure"),
		preventFormat: !!parent.attr("jstl-text-prevent-format") || false,
		maxLength: parseInt(await resolver.resolveText(parent.attr("jstl-text-trim-length") || "0"))
	};
};

const trimTextLength = (text, length) => {
	return text.length > length ? text.substring(0, length - 3).trim() + "..." : text;
};

const MODES = {
	"text" : async (option, context) => {
		const {content, resolver, template} = context;
		
		let text = await resolver.resolveText(template.textContent);		
		text = create(text,true).content.textContent;
		if(option.maxLength > 0)
			text = trimTextLength(text, option.maxLength);		
		
		content.textContent = text;		
	},
	"html": async (option, context) => {
		const {resolver, template} = context;
		
		let content = await resolver.resolveText(template.textContent);		
		content = create(content,true);		
		content = document.importNode(content.content, true);
		
		if(option.unsecure)
			context.content = content;			
		else{
			content.find(SECURE_HTML_FILTER).remove();			
			context.content = content;
		}
	}
};


class TextContent extends _Directive_js__WEBPACK_IMPORTED_MODULE_0__["default"] {
	constructor() {
		super();
	}

	get name() { return "text" }
	get rank() { return _Directive_js__WEBPACK_IMPORTED_MODULE_0__["default"].MIN_RANK + 1 }
	get phase() { return _Directive_js__WEBPACK_IMPORTED_MODULE_0__["default"].PHASE.content }



	async execute(context) {
		const { template } = context;
		if (!(template instanceof Text) || template.textContent.trim().length == 0 || (template.parentElement && template.parentElement.hasAttribute("jstl-text-ignore")))
			return context;

		const parent = template.parentElement;
		const option = parent ? await readOption(parent, context) : DEFAULT_OPTION;
		
		const  mode = MODES[option.mode];
		if(!mode)
			throw new Error("Text mode \""+ option.mode + "\" is unsupported!");
		
		await mode(option, context);
		
		return context;
	}
}

_Directive_js__WEBPACK_IMPORTED_MODULE_0__["default"].define({ directive: new TextContent() });

/***/ }),

/***/ "./node_modules/@default-js/defaultjs-template-language/src/directives/index.js":
/*!**************************************************************************************!*\
  !*** ./node_modules/@default-js/defaultjs-template-language/src/directives/index.js ***!
  \**************************************************************************************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _Initial_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Initial.js */ "./node_modules/@default-js/defaultjs-template-language/src/directives/Initial.js");
/* harmony import */ var _Data_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./Data.js */ "./node_modules/@default-js/defaultjs-template-language/src/directives/Data.js");
/* harmony import */ var _If_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./If.js */ "./node_modules/@default-js/defaultjs-template-language/src/directives/If.js");
/* harmony import */ var _Choose_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./Choose.js */ "./node_modules/@default-js/defaultjs-template-language/src/directives/Choose.js");
/* harmony import */ var _Include_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./Include.js */ "./node_modules/@default-js/defaultjs-template-language/src/directives/Include.js");
/* harmony import */ var _Foreach_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./Foreach.js */ "./node_modules/@default-js/defaultjs-template-language/src/directives/Foreach.js");
/* harmony import */ var _Text_js__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./Text.js */ "./node_modules/@default-js/defaultjs-template-language/src/directives/Text.js");
/* harmony import */ var _Attributes_js__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./Attributes.js */ "./node_modules/@default-js/defaultjs-template-language/src/directives/Attributes.js");









/***/ }),

/***/ "./node_modules/@default-js/defaultjs-template-language/src/elements/Replace.js":
/*!**************************************************************************************!*\
  !*** ./node_modules/@default-js/defaultjs-template-language/src/elements/Replace.js ***!
  \**************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return ReplaceElement; });
/* harmony import */ var _Element_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../Element.js */ "./node_modules/@default-js/defaultjs-template-language/src/Element.js");


class ReplaceElement extends _Element_js__WEBPACK_IMPORTED_MODULE_0__["default"]{
	constructor(){
		super();
		
		this.attachShadow({mode: 'open'});
	}
	async execute({template, context}){
		return context;
	};		
}
try{customElements.define("jstl-replace", ReplaceElement);}catch(e){}//ignore

/***/ }),

/***/ "./node_modules/@default-js/defaultjs-template-language/src/elements/index.js":
/*!************************************************************************************!*\
  !*** ./node_modules/@default-js/defaultjs-template-language/src/elements/index.js ***!
  \************************************************************************************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _Replace_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Replace.js */ "./node_modules/@default-js/defaultjs-template-language/src/elements/Replace.js");


/***/ }),

/***/ "./node_modules/webpack/buildin/global.js":
/*!***********************************!*\
  !*** (webpack)/buildin/global.js ***!
  \***********************************/
/*! no static exports found */
/***/ (function(module, exports) {

var g;

// This works in non-strict mode
g = (function() {
	return this;
})();

try {
	// This works if eval is allowed (see CSP)
	g = g || new Function("return this")();
} catch (e) {
	// This works if the window reference is available
	if (typeof window === "object") g = window;
}

// g can still be undefined, but nothing to do about it...
// We return undefined, instead of nothing here, so it's
// easier to handle this case. if(!global) { ...}

module.exports = g;


/***/ }),

/***/ "./src/Application/AppComponent.js":
/*!*****************************************!*\
  !*** ./src/Application/AppComponent.js ***!
  \*****************************************/
/*! exports provided: EVENT_STORE_CHANGED, default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "EVENT_STORE_CHANGED", function() { return EVENT_STORE_CHANGED; });
/* harmony import */ var _Component__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../Component */ "./src/Component.js");
/* harmony import */ var _utils_NodeHelper__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../utils/NodeHelper */ "./src/utils/NodeHelper.js");
/* harmony import */ var _Route_Events__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./Route/Events */ "./src/Application/Route/Events.js");
/* harmony import */ var _RouteLink_Events__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./RouteLink/Events */ "./src/Application/RouteLink/Events.js");
/* harmony import */ var _default_js_defaultjs_expression_language_src_ExpressionResolver__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @default-js/defaultjs-expression-language/src/ExpressionResolver */ "./node_modules/@default-js/defaultjs-expression-language/src/ExpressionResolver.js");
/* harmony import */ var _Route__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./Route */ "./src/Application/Route/index.js");
/* harmony import */ var _RouteLink__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./RouteLink */ "./src/Application/RouteLink/index.js");
/* harmony import */ var _View__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./View */ "./src/Application/View/index.js");









const EVENT_STORE_CHANGED = "app-store-changed";

const findRoute = (app, name) => {
    const selector = `${_Route__WEBPACK_IMPORTED_MODULE_5__["default"].NODENAME}[name="${name}"]`;
    return app.find(selector).first();
}

const buildRouteContext = (context, app) => {
	try{
		return _default_js_defaultjs_expression_language_src_ExpressionResolver__WEBPACK_IMPORTED_MODULE_4__["default"].resolve(context, app.store, null);
	} catch(e){
		return null;
	}
}

class AppComponent extends _Component__WEBPACK_IMPORTED_MODULE_0__["default"] {
	constructor() {
		super();

		this.ready.then(() => {
			this.root.on([_Route_Events__WEBPACK_IMPORTED_MODULE_2__["EVENT_CLICK"], _RouteLink_Events__WEBPACK_IMPORTED_MODULE_3__["EVENT_TO_ROUTE"]], async (event) => {
                this.route(event.target);				
			});
		});
	}

	get root() {
		return this;
	}

	async routes() {
		return this.root.find(_Route__WEBPACK_IMPORTED_MODULE_5__["default"].NODENAME);
    }
    
    async route(route){
        if(arguments.length == 0)
            return this.__route__;

		let context = null;
        if(typeof route === "string")
            route = findRoute(this, route);        
        else if(route instanceof _RouteLink__WEBPACK_IMPORTED_MODULE_6__["default"]){
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
			this.__view__ = Object(_utils_NodeHelper__WEBPACK_IMPORTED_MODULE_1__["findClosestInDepth"])(this.root, (node) => {
				return node instanceof _View__WEBPACK_IMPORTED_MODULE_7__["default"];
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

/* harmony default export */ __webpack_exports__["default"] = (AppComponent);


/***/ }),

/***/ "./src/Application/Route/Attributes.js":
/*!*********************************************!*\
  !*** ./src/Application/Route/Attributes.js ***!
  \*********************************************/
/*! exports provided: ATTR_NAME, ATTR_ACTIVE, ATTR_STATEFUL, ATTR_COMPONENT_TAG, ATTR_COMPONENT_TAG_ATTRIBUTES */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ATTR_NAME", function() { return ATTR_NAME; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ATTR_ACTIVE", function() { return ATTR_ACTIVE; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ATTR_STATEFUL", function() { return ATTR_STATEFUL; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ATTR_COMPONENT_TAG", function() { return ATTR_COMPONENT_TAG; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ATTR_COMPONENT_TAG_ATTRIBUTES", function() { return ATTR_COMPONENT_TAG_ATTRIBUTES; });
const ATTR_NAME = "name";
const ATTR_ACTIVE = "active";
const ATTR_STATEFUL = "stateful";
const ATTR_COMPONENT_TAG = "component-tag";
const ATTR_COMPONENT_TAG_ATTRIBUTES = "component-tag-attributes";

/***/ }),

/***/ "./src/Application/Route/Events.js":
/*!*****************************************!*\
  !*** ./src/Application/Route/Events.js ***!
  \*****************************************/
/*! exports provided: EVENT_CLICK, EVENT_ACTIVATE, EVENT_DEACTIVATE */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "EVENT_CLICK", function() { return EVENT_CLICK; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "EVENT_ACTIVATE", function() { return EVENT_ACTIVATE; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "EVENT_DEACTIVATE", function() { return EVENT_DEACTIVATE; });
/* harmony import */ var _Nodename__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Nodename */ "./src/Application/Route/Nodename.js");

const EVENT_CLICK = _Nodename__WEBPACK_IMPORTED_MODULE_0__["default"] + "-click";
const EVENT_ACTIVATE = _Nodename__WEBPACK_IMPORTED_MODULE_0__["default"] + "-activate";
const EVENT_DEACTIVATE = _Nodename__WEBPACK_IMPORTED_MODULE_0__["default"] + "-deactivate";

/***/ }),

/***/ "./src/Application/Route/Nodename.js":
/*!*******************************************!*\
  !*** ./src/Application/Route/Nodename.js ***!
  \*******************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _utils_DefineComponentHelper__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../utils/DefineComponentHelper */ "./src/utils/DefineComponentHelper.js");

/* harmony default export */ __webpack_exports__["default"] = (Object(_utils_DefineComponentHelper__WEBPACK_IMPORTED_MODULE_0__["toNodeName"])("route"));

/***/ }),

/***/ "./src/Application/Route/index.js":
/*!****************************************!*\
  !*** ./src/Application/Route/index.js ***!
  \****************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _Component__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../Component */ "./src/Component.js");
/* harmony import */ var _utils_DefineComponentHelper__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../utils/DefineComponentHelper */ "./src/utils/DefineComponentHelper.js");
/* harmony import */ var _TemplateHelper__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../TemplateHelper */ "./src/TemplateHelper.js");
/* harmony import */ var _default_js_defaultjs_expression_language_src_ExpressionResolver__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @default-js/defaultjs-expression-language/src/ExpressionResolver */ "./node_modules/@default-js/defaultjs-expression-language/src/ExpressionResolver.js");
/* harmony import */ var _Nodename__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./Nodename */ "./src/Application/Route/Nodename.js");
/* harmony import */ var _Events__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./Events */ "./src/Application/Route/Events.js");
/* harmony import */ var _Attributes__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./Attributes */ "./src/Application/Route/Attributes.js");








const ATTRIBUTES = [_Attributes__WEBPACK_IMPORTED_MODULE_6__["ATTR_NAME"], _TemplateHelper__WEBPACK_IMPORTED_MODULE_2__["ATTR_TEMPLATE"], _Attributes__WEBPACK_IMPORTED_MODULE_6__["ATTR_COMPONENT_TAG"], _Attributes__WEBPACK_IMPORTED_MODULE_6__["ATTR_COMPONENT_TAG_ATTRIBUTES"], _Attributes__WEBPACK_IMPORTED_MODULE_6__["ATTR_STATEFUL"]];
const EVENTS = [_Events__WEBPACK_IMPORTED_MODULE_5__["EVENT_CLICK"], _Events__WEBPACK_IMPORTED_MODULE_5__["EVENT_ACTIVATE"], _Events__WEBPACK_IMPORTED_MODULE_5__["EVENT_DEACTIVATE"]];
const getTagAttributes = async (route) => {
	const attributes = route.attr(_Attributes__WEBPACK_IMPORTED_MODULE_6__["ATTR_COMPONENT_TAG_ATTRIBUTES"]) || "{}";
	return _default_js_defaultjs_expression_language_src_ExpressionResolver__WEBPACK_IMPORTED_MODULE_3__["default"].resolve(attributes, {}, {});
};

const buildComponent = async (route) => {
	if (route.hasAttribute(_TemplateHelper__WEBPACK_IMPORTED_MODULE_2__["ATTR_TEMPLATE"])) {
		if (!route.__template__) route.__template__ = Object(_TemplateHelper__WEBPACK_IMPORTED_MODULE_2__["loadTemplate"])(route, null);
		return route.__template__;
	} else {
		const tag = route.attr(_Attributes__WEBPACK_IMPORTED_MODULE_6__["ATTR_COMPONENT_TAG"]);
		const clazz = customElements.get(tag);
		const attributes = await getTagAttributes(route);

		const element = new clazz();
		for (attribute in attributes) {
			const value = attributes[attribute];
			if (typeof value === "string") element.attr(attribute, value);
		}

		return element;
	}
};

class Route extends _Component__WEBPACK_IMPORTED_MODULE_0__["default"] {
	static get observedAttributes() {
		return ATTRIBUTES;
	}

	static get NODENAME() {
		return _Nodename__WEBPACK_IMPORTED_MODULE_4__["default"];
	}

	static get EVENTS() {
		return EVENTS;
	}

	constructor() {
		super();
		this.on("click", () => {
			if(!this.active)
				this.trigger(_Events__WEBPACK_IMPORTED_MODULE_5__["EVENT_CLICK"]);
		});
	}

	async init() {}

	get name() {
		return this.attr(_Attributes__WEBPACK_IMPORTED_MODULE_6__["ATTR_NAME"]);
	}

	get active() {
		return this.hasAttribute(_Attributes__WEBPACK_IMPORTED_MODULE_6__["ATTR_ACTIVE"]);
	}

	set active(active) {
		const current = this.active;
		if (active != current) {
			this.attr(_Attributes__WEBPACK_IMPORTED_MODULE_6__["ATTR_ACTIVE"], active ? "" : null);
			if (active)
				this.trigger(_Events__WEBPACK_IMPORTED_MODULE_5__["EVENT_ACTIVATE"]);
			else 
				this.trigger(_Events__WEBPACK_IMPORTED_MODULE_5__["EVENT_DEACTIVATE"]);
		}
	}
	
	get stateful() {
		return this.attr(_Attributes__WEBPACK_IMPORTED_MODULE_6__["ATTR_STATEFUL"]);
	}

	async component() {
		
		return buildComponent(this);
		/*
		if (!this.__component__) {
			this.__component__ = await buildComponent(this);
			if (this.__component__ instanceof Template) {
				await Renderer.render({ container: view, data, template: this.__component__ });
				this.__component__ = NodeList.from(view.childNodes);
			}
		}
		
		return this.__component__;*/
	}
}

Object(_utils_DefineComponentHelper__WEBPACK_IMPORTED_MODULE_1__["define"])(Route);
/* harmony default export */ __webpack_exports__["default"] = (Route);


/***/ }),

/***/ "./src/Application/RouteLink/Attributes.js":
/*!*************************************************!*\
  !*** ./src/Application/RouteLink/Attributes.js ***!
  \*************************************************/
/*! exports provided: ATTR_TARGET, ATTR_CONTEXT */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ATTR_TARGET", function() { return ATTR_TARGET; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ATTR_CONTEXT", function() { return ATTR_CONTEXT; });
const ATTR_TARGET = "target";
const ATTR_CONTEXT = "context";

/***/ }),

/***/ "./src/Application/RouteLink/Events.js":
/*!*********************************************!*\
  !*** ./src/Application/RouteLink/Events.js ***!
  \*********************************************/
/*! exports provided: EVENT_TO_ROUTE */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "EVENT_TO_ROUTE", function() { return EVENT_TO_ROUTE; });
/* harmony import */ var _Nodename__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Nodename */ "./src/Application/RouteLink/Nodename.js");

const EVENT_TO_ROUTE = _Nodename__WEBPACK_IMPORTED_MODULE_0__["default"] + "-to-route";

/***/ }),

/***/ "./src/Application/RouteLink/Nodename.js":
/*!***********************************************!*\
  !*** ./src/Application/RouteLink/Nodename.js ***!
  \***********************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _utils_DefineComponentHelper__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../utils/DefineComponentHelper */ "./src/utils/DefineComponentHelper.js");

/* harmony default export */ __webpack_exports__["default"] = (Object(_utils_DefineComponentHelper__WEBPACK_IMPORTED_MODULE_0__["toNodeName"])("route-link"));

/***/ }),

/***/ "./src/Application/RouteLink/index.js":
/*!********************************************!*\
  !*** ./src/Application/RouteLink/index.js ***!
  \********************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _Component__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../Component */ "./src/Component.js");
/* harmony import */ var _utils_DefineComponentHelper__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../utils/DefineComponentHelper */ "./src/utils/DefineComponentHelper.js");
/* harmony import */ var _Nodename__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./Nodename */ "./src/Application/RouteLink/Nodename.js");
/* harmony import */ var _Events__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./Events */ "./src/Application/RouteLink/Events.js");
/* harmony import */ var _Attributes__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./Attributes */ "./src/Application/RouteLink/Attributes.js");
/* harmony import */ var _utils_NodeHelper__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../../utils/NodeHelper */ "./src/utils/NodeHelper.js");







const ATTRIBUTES = [_Attributes__WEBPACK_IMPORTED_MODULE_4__["ATTR_TARGET"], _Attributes__WEBPACK_IMPORTED_MODULE_4__["ATTR_CONTEXT"]];

const EVENTS = [_Events__WEBPACK_IMPORTED_MODULE_3__["EVENT_TO_ROUTE"]];

class RouteLink extends _Component__WEBPACK_IMPORTED_MODULE_0__["default"] {
	static get observedAttributes() {
		return ATTRIBUTES;
	}

	static get NODENAME() {
		return _Nodename__WEBPACK_IMPORTED_MODULE_2__["default"];
	}

	static get EVENTS() {
		return EVENTS;
	}

	constructor() {
		super();
		this.on("click", (event) => {
			event.preventDefault();
			this.trigger(_Events__WEBPACK_IMPORTED_MODULE_3__["EVENT_TO_ROUTE"]);
		});
	}

	async init() {}

	get target() {
		return this.attr(_Attributes__WEBPACK_IMPORTED_MODULE_4__["ATTR_TARGET"]);
	}
	
	get context(){
		return this.attr(_Attributes__WEBPACK_IMPORTED_MODULE_4__["ATTR_CONTEXT"]);
	}
}

Object(_utils_DefineComponentHelper__WEBPACK_IMPORTED_MODULE_1__["define"])(RouteLink);
/* harmony default export */ __webpack_exports__["default"] = (RouteLink);


/***/ }),

/***/ "./src/Application/View/Nodename.js":
/*!******************************************!*\
  !*** ./src/Application/View/Nodename.js ***!
  \******************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _utils_DefineComponentHelper__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../utils/DefineComponentHelper */ "./src/utils/DefineComponentHelper.js");

/* harmony default export */ __webpack_exports__["default"] = (Object(_utils_DefineComponentHelper__WEBPACK_IMPORTED_MODULE_0__["toNodeName"])("view"));

/***/ }),

/***/ "./src/Application/View/index.js":
/*!***************************************!*\
  !*** ./src/Application/View/index.js ***!
  \***************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _Component__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../Component */ "./src/Component.js");
/* harmony import */ var _utils_DefineComponentHelper__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../utils/DefineComponentHelper */ "./src/utils/DefineComponentHelper.js");
/* harmony import */ var _Nodename__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./Nodename */ "./src/Application/View/Nodename.js");
/* harmony import */ var _default_js_defaultjs_template_language__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @default-js/defaultjs-template-language */ "./node_modules/@default-js/defaultjs-template-language/index.js");
/* harmony import */ var _utils_WeakData__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../utils/WeakData */ "./src/utils/WeakData.js");






const ROUTEDATA = new _utils_WeakData__WEBPACK_IMPORTED_MODULE_4__["default"]();

class View extends _Component__WEBPACK_IMPORTED_MODULE_0__["default"] {
	static get NODENAME() {
		return _Nodename__WEBPACK_IMPORTED_MODULE_2__["default"];
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
			if (component instanceof _default_js_defaultjs_template_language__WEBPACK_IMPORTED_MODULE_3__["Template"]) {
				await _default_js_defaultjs_template_language__WEBPACK_IMPORTED_MODULE_3__["Renderer"].render({
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
Object(_utils_DefineComponentHelper__WEBPACK_IMPORTED_MODULE_1__["define"])(View);
/* harmony default export */ __webpack_exports__["default"] = (View);


/***/ }),

/***/ "./src/Application/index.js":
/*!**********************************!*\
  !*** ./src/Application/index.js ***!
  \**********************************/
/*! exports provided: AppComponent, Route, View, RouteLink, default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _AppComponent__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./AppComponent */ "./src/Application/AppComponent.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "AppComponent", function() { return _AppComponent__WEBPACK_IMPORTED_MODULE_0__["default"]; });

/* harmony import */ var _Route__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./Route */ "./src/Application/Route/index.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "Route", function() { return _Route__WEBPACK_IMPORTED_MODULE_1__["default"]; });

/* harmony import */ var _RouteLink__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./RouteLink */ "./src/Application/RouteLink/index.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "RouteLink", function() { return _RouteLink__WEBPACK_IMPORTED_MODULE_2__["default"]; });

/* harmony import */ var _View__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./View */ "./src/Application/View/index.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "View", function() { return _View__WEBPACK_IMPORTED_MODULE_3__["default"]; });







/* harmony default export */ __webpack_exports__["default"] = (_AppComponent__WEBPACK_IMPORTED_MODULE_0__["default"]);

/***/ }),

/***/ "./src/Component.js":
/*!**************************!*\
  !*** ./src/Component.js ***!
  \**************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _Constants__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Constants */ "./src/Constants.js");
/* harmony import */ var _default_js_defaultjs_extdom__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @default-js/defaultjs-extdom */ "./node_modules/@default-js/defaultjs-extdom/index.js");
/* harmony import */ var _utils_EventHelper__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./utils/EventHelper */ "./src/utils/EventHelper.js");
/* harmony import */ var _utils_WeakData__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./utils/WeakData */ "./src/utils/WeakData.js");
/* harmony import */ var _Ready__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./Ready */ "./src/Ready.js");






const TIMEOUTS = new _utils_WeakData__WEBPACK_IMPORTED_MODULE_3__["default"]();
const init = (component) => {
	const data = TIMEOUTS.data(component);
	if (data.initialize) clearTimeout(data.initialize);

	data.initialize = setTimeout(async () => {
		delete data.initialize;

		Promise.resolve(component.init()).then(() => {
			component.ready.resolve();
			component.trigger(Object(_utils_EventHelper__WEBPACK_IMPORTED_MODULE_2__["componentEventname"])("initialzed", component));
		});
	}, _Constants__WEBPACK_IMPORTED_MODULE_0__["initTimeout"]);
};

class Component extends HTMLElement {
	constructor() {
		super();
		this.ready = Object(_Ready__WEBPACK_IMPORTED_MODULE_4__["default"])();
	}

	async init() {}

	connectedCallback() {
		if(this.ownerDocument == document)
			init(this);
	}

	adoptedCallback() {
		this.connectedCallback();
	}

	attributeChangedCallback(name, oldValue, newValue) {
		if (oldValue != newValue && this.isConnected) {
			this.trigger(_Constants__WEBPACK_IMPORTED_MODULE_0__["triggerTimeout"], Object(_utils_EventHelper__WEBPACK_IMPORTED_MODULE_2__["attributeChangeEventname"])(name, this));
			this.trigger(_Constants__WEBPACK_IMPORTED_MODULE_0__["triggerTimeout"], Object(_utils_EventHelper__WEBPACK_IMPORTED_MODULE_2__["componentEventname"])("change", this));
		}
	}
}

/* harmony default export */ __webpack_exports__["default"] = (Component);


/***/ }),

/***/ "./src/Constants.js":
/*!**************************!*\
  !*** ./src/Constants.js ***!
  \**************************/
/*! exports provided: componentPrefix, attributeChangeEventPrefix, initTimeout, triggerTimeout */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "componentPrefix", function() { return componentPrefix; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "attributeChangeEventPrefix", function() { return attributeChangeEventPrefix; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "initTimeout", function() { return initTimeout; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "triggerTimeout", function() { return triggerTimeout; });
const componentPrefix = "d-";
const attributeChangeEventPrefix = "attribute-";
const initTimeout = 100;
const triggerTimeout = 100;


/***/ }),

/***/ "./src/Ready.js":
/*!**********************!*\
  !*** ./src/Ready.js ***!
  \**********************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = (() => {
	let resolve , reject = null;
	const result = new Promise((r, e) => {
		resolve = r;
		reject = e;
	});

	result.resolve = resolve;
	result.reject = reject;

	return result;
});


/***/ }),

/***/ "./src/TemplateHelper.js":
/*!*******************************!*\
  !*** ./src/TemplateHelper.js ***!
  \*******************************/
/*! exports provided: ATTR_TEMPLATE, loadTemplate */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ATTR_TEMPLATE", function() { return ATTR_TEMPLATE; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "loadTemplate", function() { return loadTemplate; });
/* harmony import */ var _default_js_defaultjs_template_language__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @default-js/defaultjs-template-language */ "./node_modules/@default-js/defaultjs-template-language/index.js");

const ATTR_TEMPLATE = "template";

const getTemplate = (node) => {
	let template = node.find(":scope > template").first();
	if (!!template) return template;
	const value = node.attr(ATTR_TEMPLATE);
	if (!value) return null;
	try {
		template = find(value).first();
		if (!!template) return template;
	} catch (e) {}
	return new URL(value, location.href);
};

const loadTemplate = async (node, defaultTemplate, cache, alias) => {
	const template = getTemplate(node);
	if(template)
		return _default_js_defaultjs_template_language__WEBPACK_IMPORTED_MODULE_0__["Template"].load(template, cache, alias);

	return defaultTemplate;
};

/***/ }),

/***/ "./src/utils/DefineComponentHelper.js":
/*!********************************************!*\
  !*** ./src/utils/DefineComponentHelper.js ***!
  \********************************************/
/*! exports provided: toNodeName, define, default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "toNodeName", function() { return toNodeName; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "define", function() { return define; });
/* harmony import */ var _Constants__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../Constants */ "./src/Constants.js");


const toNodeName = (name, prefix) => {
	if(typeof prefix === "string")
		return prefix + name;
		
	return _Constants__WEBPACK_IMPORTED_MODULE_0__["componentPrefix"] + name;
};

const define = function(clazz, options) {
	const nodename = clazz.NODENAME;
	if (!customElements.get(nodename)) {
		customElements.define(nodename, clazz, options);
	}
};


/* harmony default export */ __webpack_exports__["default"] = (define); 


/***/ }),

/***/ "./src/utils/EventHelper.js":
/*!**********************************!*\
  !*** ./src/utils/EventHelper.js ***!
  \**********************************/
/*! exports provided: componentEventname, attributeChangeEventname */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "componentEventname", function() { return componentEventname; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "attributeChangeEventname", function() { return attributeChangeEventname; });
/* harmony import */ var _Constants__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../Constants */ "./src/Constants.js");


const componentEventname = (eventType, node ) => {
   return node.nodeName.toLowerCase() + "-" + eventType;
};


const attributeChangeEventname = (attribute, node ) => {
    return componentEventname(attributeChangeEventname + "-" + attribute, node);
};

/***/ }),

/***/ "./src/utils/NodeHelper.js":
/*!*********************************!*\
  !*** ./src/utils/NodeHelper.js ***!
  \*********************************/
/*! exports provided: findParent, findClosestInDepth */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "findParent", function() { return findParent; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "findClosestInDepth", function() { return findClosestInDepth; });
const findParent = (node, check) => {
	while(node != null) {		
        if(check(node))
            return node;

        node = node.parent();			
    }
    
    return null;
};

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

const findClosestInDepth = (node, check) => {
    const closest = findClosest(node, 0, check);
    return closest != null ? closest.node : null;
}

/***/ }),

/***/ "./src/utils/WeakData.js":
/*!*******************************!*\
  !*** ./src/utils/WeakData.js ***!
  \*******************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return WeakData; });
class WeakData {
	constructor() {
		this.weakmap = new WeakMap();
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
		else this.data(reference)[key] = value;
	}
};



/***/ })

/******/ });
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL0BkZWZhdWx0LWpzL2RlZmF1bHRqcy1jb21tb24tdXRpbHMvc3JjL2phdmFzY3JpcHQvU3RyaW5nLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9AZGVmYXVsdC1qcy9kZWZhdWx0anMtZXhwcmVzc2lvbi1sYW5ndWFnZS9ub2RlX21vZHVsZXMvQGRlZmF1bHQtanMvZGVmYXVsdGpzLWNvbW1vbi11dGlscy9zcmMvR2xvYmFsLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9AZGVmYXVsdC1qcy9kZWZhdWx0anMtZXhwcmVzc2lvbi1sYW5ndWFnZS9ub2RlX21vZHVsZXMvQGRlZmF1bHQtanMvZGVmYXVsdGpzLWNvbW1vbi11dGlscy9zcmMvT2JqZWN0UHJvcGVydHkuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL0BkZWZhdWx0LWpzL2RlZmF1bHRqcy1leHByZXNzaW9uLWxhbmd1YWdlL25vZGVfbW9kdWxlcy9AZGVmYXVsdC1qcy9kZWZhdWx0anMtY29tbW9uLXV0aWxzL3NyYy9PYmplY3RVdGlscy5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvQGRlZmF1bHQtanMvZGVmYXVsdGpzLWV4cHJlc3Npb24tbGFuZ3VhZ2Uvc3JjL0NvbnRleHQuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL0BkZWZhdWx0LWpzL2RlZmF1bHRqcy1leHByZXNzaW9uLWxhbmd1YWdlL3NyYy9EZWZhdWx0VmFsdWUuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL0BkZWZhdWx0LWpzL2RlZmF1bHRqcy1leHByZXNzaW9uLWxhbmd1YWdlL3NyYy9FeHByZXNzaW9uUmVzb2x2ZXIuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL0BkZWZhdWx0LWpzL2RlZmF1bHRqcy1leHRkb20vaW5kZXguanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL0BkZWZhdWx0LWpzL2RlZmF1bHRqcy1leHRkb20vc3JjL0dsb2JhbC5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvQGRlZmF1bHQtanMvZGVmYXVsdGpzLWV4dGRvbS9zcmMvZG9tL0RvY3VtZW50LmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9AZGVmYXVsdC1qcy9kZWZhdWx0anMtZXh0ZG9tL3NyYy9kb20vRG9jdW1lbnRGcmFnbWVudC5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvQGRlZmF1bHQtanMvZGVmYXVsdGpzLWV4dGRvbS9zcmMvZG9tL0VsZW1lbnQuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL0BkZWZhdWx0LWpzL2RlZmF1bHRqcy1leHRkb20vc3JjL2RvbS9FdmVudFRhcmdldC5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvQGRlZmF1bHQtanMvZGVmYXVsdGpzLWV4dGRvbS9zcmMvZG9tL0hUTUxFbGVtZW50LmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9AZGVmYXVsdC1qcy9kZWZhdWx0anMtZXh0ZG9tL3NyYy9kb20vSFRNTElucHV0RWxlbWVudC5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvQGRlZmF1bHQtanMvZGVmYXVsdGpzLWV4dGRvbS9zcmMvZG9tL0hUTUxTZWxlY3RFbGVtZW50LmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9AZGVmYXVsdC1qcy9kZWZhdWx0anMtZXh0ZG9tL3NyYy9kb20vSFRNTFRleHRBcmVhRWxlbWVudC5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvQGRlZmF1bHQtanMvZGVmYXVsdGpzLWV4dGRvbS9zcmMvZG9tL0h0bWxDb2xsZWN0aW9uLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9AZGVmYXVsdC1qcy9kZWZhdWx0anMtZXh0ZG9tL3NyYy9kb20vTm9kZS5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvQGRlZmF1bHQtanMvZGVmYXVsdGpzLWV4dGRvbS9zcmMvZG9tL05vZGVMaXN0LmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9AZGVmYXVsdC1qcy9kZWZhdWx0anMtZXh0ZG9tL3NyYy9kb20vZXh0ZW50aW9ucy9BdHRyaWJ1dGVTdXBwb3J0LmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9AZGVmYXVsdC1qcy9kZWZhdWx0anMtZXh0ZG9tL3NyYy9kb20vZXh0ZW50aW9ucy9EYXRhU3VwcG9ydC5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvQGRlZmF1bHQtanMvZGVmYXVsdGpzLWV4dGRvbS9zcmMvZG9tL2V4dGVudGlvbnMvRXZlbnRTdXBwb3J0LmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9AZGVmYXVsdC1qcy9kZWZhdWx0anMtZXh0ZG9tL3NyYy9kb20vZXh0ZW50aW9ucy9IdG1sQ2xhc3NTdXBwb3J0LmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9AZGVmYXVsdC1qcy9kZWZhdWx0anMtZXh0ZG9tL3NyYy9kb20vZXh0ZW50aW9ucy9MaXN0U3VwcG9ydC5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvQGRlZmF1bHQtanMvZGVmYXVsdGpzLWV4dGRvbS9zcmMvZG9tL2V4dGVudGlvbnMvTWFuaXB1bGF0aW9uU3VwcG9ydC5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvQGRlZmF1bHQtanMvZGVmYXVsdGpzLWV4dGRvbS9zcmMvZG9tL2V4dGVudGlvbnMvUXVlcnlTdXBwb3J0LmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9AZGVmYXVsdC1qcy9kZWZhdWx0anMtZXh0ZG9tL3NyYy9kb20vZXh0ZW50aW9ucy9SZWFkeUV2ZW50U3VwcG9ydC5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvQGRlZmF1bHQtanMvZGVmYXVsdGpzLWV4dGRvbS9zcmMvZG9tL2V4dGVudGlvbnMvU2hvd0hpZGVTdXBwb3J0LmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9AZGVmYXVsdC1qcy9kZWZhdWx0anMtZXh0ZG9tL3NyYy9kb20vZXh0ZW50aW9ucy9WYWx1ZVN1cHBvcnQuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL0BkZWZhdWx0LWpzL2RlZmF1bHRqcy1leHRkb20vc3JjL2luZGV4LmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9AZGVmYXVsdC1qcy9kZWZhdWx0anMtZXh0ZG9tL3NyYy91dGlscy9EZWxlZ2F0ZXJCdWlsZGVyLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9AZGVmYXVsdC1qcy9kZWZhdWx0anMtZXh0ZG9tL3NyYy91dGlscy9FeHRlbmRQcm90b3R5cGUuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL0BkZWZhdWx0LWpzL2RlZmF1bHRqcy1leHRkb20vc3JjL3V0aWxzL0V4dGVuZGVyLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9AZGVmYXVsdC1qcy9kZWZhdWx0anMtZXh0ZG9tL3NyYy91dGlscy9VdGlscy5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvQGRlZmF1bHQtanMvZGVmYXVsdGpzLXRlbXBsYXRlLWxhbmd1YWdlL2luZGV4LmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9AZGVmYXVsdC1qcy9kZWZhdWx0anMtdGVtcGxhdGUtbGFuZ3VhZ2Uvc3JjL0NvbnRleHQuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL0BkZWZhdWx0LWpzL2RlZmF1bHRqcy10ZW1wbGF0ZS1sYW5ndWFnZS9zcmMvRGlyZWN0aXZlLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9AZGVmYXVsdC1qcy9kZWZhdWx0anMtdGVtcGxhdGUtbGFuZ3VhZ2Uvc3JjL0VsZW1lbnQuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL0BkZWZhdWx0LWpzL2RlZmF1bHRqcy10ZW1wbGF0ZS1sYW5ndWFnZS9zcmMvUmVuZGVyZXIuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL0BkZWZhdWx0LWpzL2RlZmF1bHRqcy10ZW1wbGF0ZS1sYW5ndWFnZS9zcmMvVGVtcGxhdGUuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL0BkZWZhdWx0LWpzL2RlZmF1bHRqcy10ZW1wbGF0ZS1sYW5ndWFnZS9zcmMvV2FpdC5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvQGRlZmF1bHQtanMvZGVmYXVsdGpzLXRlbXBsYXRlLWxhbmd1YWdlL3NyYy9kaXJlY3RpdmVzL0F0dHJpYnV0ZXMuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL0BkZWZhdWx0LWpzL2RlZmF1bHRqcy10ZW1wbGF0ZS1sYW5ndWFnZS9zcmMvZGlyZWN0aXZlcy9DaG9vc2UuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL0BkZWZhdWx0LWpzL2RlZmF1bHRqcy10ZW1wbGF0ZS1sYW5ndWFnZS9zcmMvZGlyZWN0aXZlcy9EYXRhLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9AZGVmYXVsdC1qcy9kZWZhdWx0anMtdGVtcGxhdGUtbGFuZ3VhZ2Uvc3JjL2RpcmVjdGl2ZXMvRm9yZWFjaC5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvQGRlZmF1bHQtanMvZGVmYXVsdGpzLXRlbXBsYXRlLWxhbmd1YWdlL3NyYy9kaXJlY3RpdmVzL0lmLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9AZGVmYXVsdC1qcy9kZWZhdWx0anMtdGVtcGxhdGUtbGFuZ3VhZ2Uvc3JjL2RpcmVjdGl2ZXMvSW5jbHVkZS5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvQGRlZmF1bHQtanMvZGVmYXVsdGpzLXRlbXBsYXRlLWxhbmd1YWdlL3NyYy9kaXJlY3RpdmVzL0luaXRpYWwuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL0BkZWZhdWx0LWpzL2RlZmF1bHRqcy10ZW1wbGF0ZS1sYW5ndWFnZS9zcmMvZGlyZWN0aXZlcy9UZXh0LmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9AZGVmYXVsdC1qcy9kZWZhdWx0anMtdGVtcGxhdGUtbGFuZ3VhZ2Uvc3JjL2RpcmVjdGl2ZXMvaW5kZXguanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL0BkZWZhdWx0LWpzL2RlZmF1bHRqcy10ZW1wbGF0ZS1sYW5ndWFnZS9zcmMvZWxlbWVudHMvUmVwbGFjZS5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvQGRlZmF1bHQtanMvZGVmYXVsdGpzLXRlbXBsYXRlLWxhbmd1YWdlL3NyYy9lbGVtZW50cy9pbmRleC5qcyIsIndlYnBhY2s6Ly8vKHdlYnBhY2spL2J1aWxkaW4vZ2xvYmFsLmpzIiwid2VicGFjazovLy8uL3NyYy9BcHBsaWNhdGlvbi9BcHBDb21wb25lbnQuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL0FwcGxpY2F0aW9uL1JvdXRlL0F0dHJpYnV0ZXMuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL0FwcGxpY2F0aW9uL1JvdXRlL0V2ZW50cy5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvQXBwbGljYXRpb24vUm91dGUvTm9kZW5hbWUuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL0FwcGxpY2F0aW9uL1JvdXRlL2luZGV4LmpzIiwid2VicGFjazovLy8uL3NyYy9BcHBsaWNhdGlvbi9Sb3V0ZUxpbmsvQXR0cmlidXRlcy5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvQXBwbGljYXRpb24vUm91dGVMaW5rL0V2ZW50cy5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvQXBwbGljYXRpb24vUm91dGVMaW5rL05vZGVuYW1lLmpzIiwid2VicGFjazovLy8uL3NyYy9BcHBsaWNhdGlvbi9Sb3V0ZUxpbmsvaW5kZXguanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL0FwcGxpY2F0aW9uL1ZpZXcvTm9kZW5hbWUuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL0FwcGxpY2F0aW9uL1ZpZXcvaW5kZXguanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL0FwcGxpY2F0aW9uL2luZGV4LmpzIiwid2VicGFjazovLy8uL3NyYy9Db21wb25lbnQuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL0NvbnN0YW50cy5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvUmVhZHkuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL1RlbXBsYXRlSGVscGVyLmpzIiwid2VicGFjazovLy8uL3NyYy91dGlscy9EZWZpbmVDb21wb25lbnRIZWxwZXIuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL3V0aWxzL0V2ZW50SGVscGVyLmpzIiwid2VicGFjazovLy8uL3NyYy91dGlscy9Ob2RlSGVscGVyLmpzIiwid2VicGFjazovLy8uL3NyYy91dGlscy9XZWFrRGF0YS5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO1FBQUE7UUFDQTs7UUFFQTtRQUNBOztRQUVBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBOztRQUVBO1FBQ0E7O1FBRUE7UUFDQTs7UUFFQTtRQUNBO1FBQ0E7OztRQUdBO1FBQ0E7O1FBRUE7UUFDQTs7UUFFQTtRQUNBO1FBQ0E7UUFDQSwwQ0FBMEMsZ0NBQWdDO1FBQzFFO1FBQ0E7O1FBRUE7UUFDQTtRQUNBO1FBQ0Esd0RBQXdELGtCQUFrQjtRQUMxRTtRQUNBLGlEQUFpRCxjQUFjO1FBQy9EOztRQUVBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQSx5Q0FBeUMsaUNBQWlDO1FBQzFFLGdIQUFnSCxtQkFBbUIsRUFBRTtRQUNySTtRQUNBOztRQUVBO1FBQ0E7UUFDQTtRQUNBLDJCQUEyQiwwQkFBMEIsRUFBRTtRQUN2RCxpQ0FBaUMsZUFBZTtRQUNoRDtRQUNBO1FBQ0E7O1FBRUE7UUFDQSxzREFBc0QsK0RBQStEOztRQUVySDtRQUNBOzs7UUFHQTtRQUNBOzs7Ozs7Ozs7Ozs7QUNsRkE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLGlCQUFpQixZQUFZO0FBQzdCO0FBQ0E7QUFDQSxhQUFhO0FBQ2I7QUFDQTtBQUNBLEc7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QVE7O0FBRWpCO0FBQ0EsRTs7Ozs7Ozs7Ozs7O0FDckJBO0FBQUE7QUFBQTtBQUFBO0FBQStDOztBQUV4QztBQUNQO0FBQ0E7O0FBRUEsUUFBUSwwREFBZTtBQUN2Qjs7QUFFTztBQUNQO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7OztBQUdlLHFFQUFNLEU7Ozs7Ozs7Ozs7Ozs7QUNqQnJCO0FBQUE7QUFBQTtBQUFBO0FBQXdEOztBQUVqRDtBQUNQO0FBQ0E7OztBQUdPO0FBQ1A7QUFDQSxFOzs7Ozs7Ozs7Ozs7QUNUQTtBQUFBO0FBQUE7QUFBTztBQUNQLHNCO0FBQ0E7QUFDQTs7QUFFQSw2QjtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLGdCQUFnQjs7QUFFaEI7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVPO0FBQ1A7QUFDQTtBQUNBLEM7Ozs7Ozs7Ozs7OztBQzdCQTtBQUFBO0FBQWU7QUFDZjtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBIiwiZmlsZSI6ImFwcGxpY2F0aW9uLWJ1bmRsZS5qcyIsInNvdXJjZXNDb250ZW50IjpbIiBcdC8vIFRoZSBtb2R1bGUgY2FjaGVcbiBcdHZhciBpbnN0YWxsZWRNb2R1bGVzID0ge307XG5cbiBcdC8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG4gXHRmdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cbiBcdFx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG4gXHRcdGlmKGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdKSB7XG4gXHRcdFx0cmV0dXJuIGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdLmV4cG9ydHM7XG4gXHRcdH1cbiBcdFx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcbiBcdFx0dmFyIG1vZHVsZSA9IGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdID0ge1xuIFx0XHRcdGk6IG1vZHVsZUlkLFxuIFx0XHRcdGw6IGZhbHNlLFxuIFx0XHRcdGV4cG9ydHM6IHt9XG4gXHRcdH07XG5cbiBcdFx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG4gXHRcdG1vZHVsZXNbbW9kdWxlSWRdLmNhbGwobW9kdWxlLmV4cG9ydHMsIG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG4gXHRcdC8vIEZsYWcgdGhlIG1vZHVsZSBhcyBsb2FkZWRcbiBcdFx0bW9kdWxlLmwgPSB0cnVlO1xuXG4gXHRcdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG4gXHRcdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbiBcdH1cblxuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZXMgb2JqZWN0IChfX3dlYnBhY2tfbW9kdWxlc19fKVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5tID0gbW9kdWxlcztcblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGUgY2FjaGVcbiBcdF9fd2VicGFja19yZXF1aXJlX18uYyA9IGluc3RhbGxlZE1vZHVsZXM7XG5cbiBcdC8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb24gZm9yIGhhcm1vbnkgZXhwb3J0c1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5kID0gZnVuY3Rpb24oZXhwb3J0cywgbmFtZSwgZ2V0dGVyKSB7XG4gXHRcdGlmKCFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywgbmFtZSkpIHtcbiBcdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgbmFtZSwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGdldHRlciB9KTtcbiBcdFx0fVxuIFx0fTtcblxuIFx0Ly8gZGVmaW5lIF9fZXNNb2R1bGUgb24gZXhwb3J0c1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5yID0gZnVuY3Rpb24oZXhwb3J0cykge1xuIFx0XHRpZih0eXBlb2YgU3ltYm9sICE9PSAndW5kZWZpbmVkJyAmJiBTeW1ib2wudG9TdHJpbmdUYWcpIHtcbiBcdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgU3ltYm9sLnRvU3RyaW5nVGFnLCB7IHZhbHVlOiAnTW9kdWxlJyB9KTtcbiBcdFx0fVxuIFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgJ19fZXNNb2R1bGUnLCB7IHZhbHVlOiB0cnVlIH0pO1xuIFx0fTtcblxuIFx0Ly8gY3JlYXRlIGEgZmFrZSBuYW1lc3BhY2Ugb2JqZWN0XG4gXHQvLyBtb2RlICYgMTogdmFsdWUgaXMgYSBtb2R1bGUgaWQsIHJlcXVpcmUgaXRcbiBcdC8vIG1vZGUgJiAyOiBtZXJnZSBhbGwgcHJvcGVydGllcyBvZiB2YWx1ZSBpbnRvIHRoZSBuc1xuIFx0Ly8gbW9kZSAmIDQ6IHJldHVybiB2YWx1ZSB3aGVuIGFscmVhZHkgbnMgb2JqZWN0XG4gXHQvLyBtb2RlICYgOHwxOiBiZWhhdmUgbGlrZSByZXF1aXJlXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnQgPSBmdW5jdGlvbih2YWx1ZSwgbW9kZSkge1xuIFx0XHRpZihtb2RlICYgMSkgdmFsdWUgPSBfX3dlYnBhY2tfcmVxdWlyZV9fKHZhbHVlKTtcbiBcdFx0aWYobW9kZSAmIDgpIHJldHVybiB2YWx1ZTtcbiBcdFx0aWYoKG1vZGUgJiA0KSAmJiB0eXBlb2YgdmFsdWUgPT09ICdvYmplY3QnICYmIHZhbHVlICYmIHZhbHVlLl9fZXNNb2R1bGUpIHJldHVybiB2YWx1ZTtcbiBcdFx0dmFyIG5zID0gT2JqZWN0LmNyZWF0ZShudWxsKTtcbiBcdFx0X193ZWJwYWNrX3JlcXVpcmVfXy5yKG5zKTtcbiBcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KG5zLCAnZGVmYXVsdCcsIHsgZW51bWVyYWJsZTogdHJ1ZSwgdmFsdWU6IHZhbHVlIH0pO1xuIFx0XHRpZihtb2RlICYgMiAmJiB0eXBlb2YgdmFsdWUgIT0gJ3N0cmluZycpIGZvcih2YXIga2V5IGluIHZhbHVlKSBfX3dlYnBhY2tfcmVxdWlyZV9fLmQobnMsIGtleSwgZnVuY3Rpb24oa2V5KSB7IHJldHVybiB2YWx1ZVtrZXldOyB9LmJpbmQobnVsbCwga2V5KSk7XG4gXHRcdHJldHVybiBucztcbiBcdH07XG5cbiBcdC8vIGdldERlZmF1bHRFeHBvcnQgZnVuY3Rpb24gZm9yIGNvbXBhdGliaWxpdHkgd2l0aCBub24taGFybW9ueSBtb2R1bGVzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm4gPSBmdW5jdGlvbihtb2R1bGUpIHtcbiBcdFx0dmFyIGdldHRlciA9IG1vZHVsZSAmJiBtb2R1bGUuX19lc01vZHVsZSA/XG4gXHRcdFx0ZnVuY3Rpb24gZ2V0RGVmYXVsdCgpIHsgcmV0dXJuIG1vZHVsZVsnZGVmYXVsdCddOyB9IDpcbiBcdFx0XHRmdW5jdGlvbiBnZXRNb2R1bGVFeHBvcnRzKCkgeyByZXR1cm4gbW9kdWxlOyB9O1xuIFx0XHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQoZ2V0dGVyLCAnYScsIGdldHRlcik7XG4gXHRcdHJldHVybiBnZXR0ZXI7XG4gXHR9O1xuXG4gXHQvLyBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGxcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubyA9IGZ1bmN0aW9uKG9iamVjdCwgcHJvcGVydHkpIHsgcmV0dXJuIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmplY3QsIHByb3BlcnR5KTsgfTtcblxuIFx0Ly8gX193ZWJwYWNrX3B1YmxpY19wYXRoX19cbiBcdF9fd2VicGFja19yZXF1aXJlX18ucCA9IFwiXCI7XG5cblxuIFx0Ly8gTG9hZCBlbnRyeSBtb2R1bGUgYW5kIHJldHVybiBleHBvcnRzXG4gXHRyZXR1cm4gX193ZWJwYWNrX3JlcXVpcmVfXyhfX3dlYnBhY2tfcmVxdWlyZV9fLnMgPSBcIi4vc3JjL0FwcGxpY2F0aW9uL2luZGV4LmpzXCIpO1xuIiwiaWYgKCFTdHJpbmcucHJvdG90eXBlLmhhc2hjb2RlKVxyXG5cdFN0cmluZy5wcm90b3R5cGUuaGFzaGNvZGUgPSBmdW5jdGlvbigpIHtcclxuXHRcdGlmICh0aGlzLmxlbmd0aCA9PT0gMClcclxuXHRcdFx0cmV0dXJuIDA7XHJcblx0XHRcclxuXHRcdGxldCBoYXNoID0gMDtcclxuXHRcdGNvbnN0IGxlbmd0aCA9IHRoaXMubGVuZ3RoO1xyXG5cdFx0Zm9yIChsZXQgaSA9IDA7IGkgPCBsZW5ndGg7IGkrKykge1xyXG5cdFx0XHRjb25zdCBjID0gdGhpcy5jaGFyQ29kZUF0KGkpO1xyXG5cdFx0XHRoYXNoID0gKChoYXNoIDw8IDUpIC0gaGFzaCkgKyBjO1xyXG5cdFx0XHRoYXNoIHw9IDA7IC8vIENvbnZlcnQgdG8gMzJiaXQgaW50ZWdlclxyXG5cdFx0fVxyXG5cdFx0cmV0dXJuIGhhc2g7XHJcblx0fTsiLCJjb25zdCBHTE9CQUwgPSAoKCkgPT4ge1xyXG5cdGlmKHR5cGVvZiBnbG9iYWwgIT09IFwidW5kZWZpbmVkXCIpIHJldHVybiBnbG9iYWw7XHJcblx0aWYodHlwZW9mIHdpbmRvdyAhPT0gXCJ1bmRlZmluZWRcIikgcmV0dXJuIHdpbmRvdztcdFxyXG5cdGlmKHR5cGVvZiBzZWxmICE9PSBcInVuZGVmaW5lZFwiKSByZXR1cm4gc2VsZjtcclxuXHRyZXR1cm4ge307XHJcbn0pKCk7XHJcblxyXG5leHBvcnQgZGVmYXVsdCBHTE9CQUw7IiwiZXhwb3J0IGRlZmF1bHQgY2xhc3MgT2JqZWN0UHJvcGVydHkge1xuXHRjb25zdHJ1Y3RvcihrZXksIGNvbnRleHQpe1xuXHRcdHRoaXMua2V5ID0ga2V5O1xuXHRcdHRoaXMuY29udGV4dCA9IGNvbnRleHQ7XG5cdH1cblx0XG5cdGdldCBrZXlEZWZpbmVkKCl7XG5cdFx0cmV0dXJuIHRoaXMua2V5IGluIHRoaXMuY29udGV4dDsgXG5cdH1cblx0XG5cdGdldCBoYXNWYWx1ZSgpe1xuXHRcdHJldHVybiAhIXRoaXMuY29udGV4dFt0aGlzLmtleV07XG5cdH1cblx0XG5cdGdldCB2YWx1ZSgpe1xuXHRcdHJldHVybiB0aGlzLmNvbnRleHRbdGhpcy5rZXldO1xuXHR9XG5cdFxuXHRzZXQgdmFsdWUoZGF0YSl7XG5cdFx0dGhpcy5jb250ZXh0W3RoaXMua2V5XSA9IGRhdGE7XG5cdH1cblx0XG5cdHNldCBhcHBlbmQoZGF0YSkge1xuXHRcdGlmKCF0aGlzLmhhc1ZhbHVlKVxuXHRcdFx0dGhpcy52YWx1ZSA9IGRhdGE7XG5cdFx0ZWxzZSB7XG5cdFx0XHRjb25zdCB2YWx1ZSA9IHRoaXMudmFsdWU7XG5cdFx0XHRpZih2YWx1ZSBpbnN0YW5jZW9mIEFycmF5KVxuXHRcdFx0XHR2YWx1ZS5wdXNoKGRhdGEpO1xuXHRcdFx0ZWxzZVxuXHRcdFx0XHR0aGlzLnZhbHVlID0gW3RoaXMudmFsdWUsIGRhdGFdO1xuXHRcdH1cblx0fVxuXHRcblx0cmVtb3ZlKCl7XG5cdFx0ZGVsZXRlIHRoaXMuY29udGV4dFt0aGlzLmtleV07XG5cdH1cblx0XG5cdHN0YXRpYyBsb2FkKGRhdGEsIGtleSwgY3JlYXRlPXRydWUpIHtcblx0XHRsZXQgY29udGV4dCA9IGRhdGE7XG5cdFx0Y29uc3Qga2V5cyA9IGtleS5zcGxpdChcIlxcLlwiKTtcblx0XHRsZXQgbmFtZSA9IGtleXMuc2hpZnQoKS50cmltKCk7XG5cdFx0d2hpbGUoa2V5cy5sZW5ndGggPiAwKXtcblx0XHRcdGlmKCFjb250ZXh0W25hbWVdKXtcblx0XHRcdFx0aWYoIWNyZWF0ZSlcblx0XHRcdFx0XHRyZXR1cm4gbnVsbDtcblx0XHRcdFx0XG5cdFx0XHRcdGNvbnRleHRbbmFtZV0gPSB7fVxuXHRcdFx0fVxuXHRcdFx0XG5cdFx0XHRjb250ZXh0ID0gY29udGV4dFtuYW1lXTtcblx0XHRcdG5hbWUgPSBrZXlzLnNoaWZ0KCkudHJpbSgpO1xuXHRcdH1cblx0XHRcblx0XHRyZXR1cm4gbmV3IE9iamVjdFByb3BlcnR5KG5hbWUsIGNvbnRleHQpO1xuXHR9XG59OyIsImltcG9ydCBPYmplY3RQcm9wZXJ0eSBmcm9tIFwiLi9PYmplY3RQcm9wZXJ0eS5qc1wiO1xyXG4vKipcclxuICogYXBwZW5kIGEgcHJvcGVyeSB2YWx1ZSB0byBhbiBvYmplY3QuIElmIHByb3BlcnkgZXhpc3RzIGl0cyB3b3VsZCBiZSBjb252ZXJ0ZWQgdG8gYW4gYXJyYXlcclxuICogXHJcbiAqICBAcGFyYW0gYUtleTpzdHJpbmcgbmFtZSBvZiBwcm9wZXJ0eVxyXG4gKiAgQHBhcmFtIGFEYXRhOmFueSBwcm9wZXJ0eSB2YWx1ZVxyXG4gKiAgQHBhcmFtIGFPYmplY3Q6b2JqZWN0IHRoZSBvYmplY3QgdG8gYXBwZW5kIHRoZSBwcm9wZXJ0eVxyXG4gKiAgXHJcbiAqICBAcmV0dXJuIHJldHVybnMgdGhlIGNoYW5nZWQgb2JqZWN0XHJcbiAqL1xyXG5leHBvcnQgY29uc3QgYXBwZW5kID0gZnVuY3Rpb24oYUtleSwgYURhdGEsIGFPYmplY3QpIHtcclxuXHRpZiAodHlwZW9mIGFEYXRhICE9PSBcInVuZGVmaW5lZFwiKSB7XHJcblx0XHRjb25zdCBwcm9wZXJ0eSA9IE9iamVjdFByb3BlcnR5LmxvYWQoYU9iamVjdCwgYUtleSwgdHJ1ZSlcclxuXHRcdHByb3BlcnR5LmFwcGVuZCA9IGFEYXRhO1xyXG5cdH1cclxuXHRyZXR1cm4gYU9iamVjdDtcclxufTtcclxuXHJcbi8qKlxyXG4gKiBjaGVja2VkIGlmIGFuIG9iamVjdCBhIHNpbXBsZSBvYmplY3QuIE5vIEFycmF5LCBNYXAgb3Igc29tZXRoaW5nIGVsc2UuXHJcbiAqIFxyXG4gKiBAcGFyYW0gYU9iamVjdDpvYmplY3QgdGhlIG9iamVjdCB0byBiZSB0ZXN0aW5nXHJcbiAqIFxyXG4gKiBAcmV0dXJuIGJvb2xlYW5cclxuICovXHJcbmV4cG9ydCBjb25zdCBpc1Bvam8gPSBmdW5jdGlvbihhT2JqZWN0KSB7XHJcblx0cmV0dXJuIHR5cGVvZiBhT2JqZWN0ICE9PSBcInVuZGVmaW5lZFwiICYmIGFPYmplY3QgIT0gbnVsbCAmJiBhT2JqZWN0LmNvbnN0cnVjdG9yLm5hbWUgPT09IFwiT2JqZWN0XCJcclxufVxyXG5cclxuLyoqXHJcbiAqIG1lcmdpbmcgb2JqZWN0IGludG8gYSB0YXJnZXQgb2JqZWN0LiBJdHMgb25seSBtZXJnZSBzaW1wbGUgb2JqZWN0IGFuZCBzdWIgb2JqZWN0cy4gRXZlcnkgb3RoZXIgXHJcbiAqIHZhbHVlIHdvdWxkIGJlIHJlcGxhY2VkIGJ5IHZhbHVlIGZyb20gdGhlIHNvdXJjZSBvYmplY3QuXHJcbiAqIFxyXG4gKiBzYW1wbGU6IG1lcmdlKHRhcmdldCwgc291cmNlLTEsIHNvdXJjZS0yLCAuLi5zb3VyY2UtbilcclxuICogXHJcbiAqIEBwYXJhbSBhVGFyZ2V0Om9iamVjdCB0aGUgdGFyZ2V0IG9iamVjdCB0byBtZXJnaW5nIGludG9cclxuICogQHBhcmFtIGFTb3VyY2VzOm9iamVjdFxyXG4gKiBcclxuICogQHJldHVybiBvYmplY3QgcmV0dXJucyB0aGUgdGFyZ2V0IG9iamVjdFxyXG4gKi9cclxuZXhwb3J0IGNvbnN0IG1lcmdlID0gZnVuY3Rpb24oYVRhcmdldCkge1xyXG5cdGZvciAobGV0IGkgPSAxOyBpIDwgYXJndW1lbnRzLmxlbmd0aDsgaSsrKSB7XHJcblx0XHRjb25zdCBzb3VyY2UgPSBhcmd1bWVudHNbaV07XHJcblx0XHRPYmplY3QuZ2V0T3duUHJvcGVydHlOYW1lcyhzb3VyY2UpLmZvckVhY2goYUtleSA9PiB7XHJcblx0XHRcdGlmIChpc1Bvam8oYVRhcmdldFthS2V5XSkpXHJcblx0XHRcdFx0bWVyZ2UoYVRhcmdldFthS2V5XSwgc291cmNlW2FLZXldKTtcclxuXHRcdFx0ZWxzZVxyXG5cdFx0XHRcdGFUYXJnZXRbYUtleV0gPSBzb3VyY2VbYUtleV07XHJcblx0XHR9KTtcclxuXHR9XHJcblxyXG5cdHJldHVybiBhVGFyZ2V0O1xyXG59XHJcblxyXG5cclxuXHJcbmNvbnN0IGJ1aWxkUHJvcGVydHlGaWx0ZXIgPSBmdW5jdGlvbih7IG5hbWVzLCBhbGxvd2VkIH0pIHtcclxuXHRyZXR1cm4gKG5hbWUsIHZhbHVlLCBjb250ZXh0KSA9PiB7XHJcblx0XHRyZXR1cm4gbmFtZXMuaW5jbHVkZXMobmFtZSkgPT09IGFsbG93ZWQ7XHJcblx0fVxyXG59O1xyXG5cclxuXHJcbmV4cG9ydCBjb25zdCBmaWx0ZXIgPSBmdW5jdGlvbigpIHtcclxuXHRjb25zdCBbZGF0YSwgcHJvcEZpbHRlciwge2RlZXAgPSBmYWxzZSwgcmVjdXJzaXZlID0gdHJ1ZSwgcGFyZW50cyA9IFtdfSA9IHt9XSA9IGFyZ3VtZW50cztcclxuXHRjb25zdCByZXN1bHQgPSB7fTtcclxuXHJcblx0Zm9yIChuYW1lIGluIGRhdGEpIHtcclxuXHRcdGNvbnN0IHZhbHVlID0gZGF0YVtuYW1lXTtcclxuXHRcdGNvbnN0IGFjY2VwdCA9IHByb3BGaWx0ZXIobmFtZSwgdmFsdWUsIGRhdGEpO1xyXG5cdFx0aWYgKGFjY2VwdCAmJiAoIWRlZXAgfHwgdmFsdWUgPT09IG51bGwgfHwgdmFsdWUgPT09IHVuZGVmaW5lZCkpXHJcblx0XHRcdHJlc3VsdFtuYW1lXSA9IHZhbHVlO1xyXG5cdFx0ZWxzZSBpZiAoYWNjZXB0ICYmIGRlZXApIHtcclxuXHRcdFx0Y29uc3QgdHlwZSA9IHR5cGVvZiB2YWx1ZTtcclxuXHRcdFx0aWYgKHR5cGUgIT09IFwib2JqZWN0XCJcclxuXHRcdFx0XHR8fCB2YWx1ZSBpbnN0YW5jZW9mIEFycmF5XHJcblx0XHRcdFx0fHwgdmFsdWUgaW5zdGFuY2VvZiBNYXBcclxuXHRcdFx0XHR8fCB2YWx1ZSBpbnN0YW5jZW9mIFNldFxyXG5cdFx0XHRcdHx8IHZhbHVlIGluc3RhbmNlb2YgUmVnRXhwXHJcblx0XHRcdFx0fHwgcGFyZW50cy5pbmNsdWRlc1t2YWx1ZV1cclxuXHRcdFx0XHR8fCB2YWx1ZSA9PSBkYXRhKVxyXG5cdFx0XHRcdHJlc3VsdFtuYW1lXSA9IHZhbHVlO1xyXG5cdFx0XHRlbHNlXHJcblx0XHRcdFx0cmVzdWx0W25hbWVdID0gZmlsdGVyKHZhbHVlLCBwcm9wRmlsdGVyLCB7ZGVlcCwgcmVjdXJzaXZlLCBwYXJlbnRzOiAgcGFyZW50cy5jb25jYXQoZGF0YSl9KTtcclxuXHRcdH1cclxuXHJcblx0fVxyXG5cclxuXHRyZXR1cm4gcmVzdWx0O1xyXG59O1xyXG5cclxuXHJcblxyXG5leHBvcnQgZGVmYXVsdCB7XHJcblx0aXNQb2pvLFxyXG5cdGFwcGVuZCxcclxuXHRtZXJnZSxcclxuXHRmaWx0ZXIsXHJcblx0YnVpbGRQcm9wZXJ0eUZpbHRlclxyXG59OyIsImNvbnN0IHNlZWtBdENoYWluID0gKHJlc29sdmVyLCBwcm9wZXJ0eSkgPT4ge1xuXHR3aGlsZShyZXNvbHZlcil7XG5cdFx0Y29uc3QgZGVmID0gcmVzb2x2ZXIucHJveHkuaGFuZGxlLmdldFByb3BlcnR5RGVmKHByb3BlcnR5LCBmYWxzZSk7XG5cdFx0aWYoZGVmKVxuXHRcdFx0cmV0dXJuIGRlZjtcblx0XHRcblx0XHRyZXNvbHZlciA9IHJlc29sdmVyLnBhcmVudDtcblx0fVx0XG5cdHJldHVybiB7IGRhdGE6IG51bGwsIHJlc29sdmVyOiBudWxsLCBkZWZpbmVkOiBmYWxzZSB9O1xufVxuXG5jbGFzcyBIYW5kbGUge1xuXHRjb25zdHJ1Y3RvcihkYXRhLCByZXNvbHZlcikge1xuXHRcdHRoaXMuZGF0YSA9IGRhdGE7XG5cdFx0dGhpcy5yZXNvbHZlciA9IHJlc29sdmVyO1xuXHRcdHRoaXMuY2FjaGUgPSBuZXcgTWFwKCk7XG5cdH1cblx0XG5cdHVwZGF0ZURhdGEoZGF0YSl7XG5cdFx0dGhpcy5kYXRhID0gZGF0YTtcblx0XHR0aGlzLmNhY2hlID0gbmV3IE1hcCgpO1xuXHR9XG5cdFxuXHRyZXNldENhY2hlKCl7XG5cdFx0dGhpcy5jYWNoZSA9IG5ldyBNYXAoKTtcblx0fVxuXG5cdGdldFByb3BlcnR5RGVmKHByb3BlcnR5LCBzZWVrID0gdHJ1ZSkge1xuXHRcdGlmICh0aGlzLmNhY2hlLmhhcyhwcm9wZXJ0eSkpXG5cdFx0XHRyZXR1cm4gdGhpcy5jYWNoZS5nZXQocHJvcGVydHkpO1xuXHRcdFxuXHRcdGxldCBkZWYgPSBudWxsXG5cdFx0aWYgKHRoaXMuZGF0YSAmJiBwcm9wZXJ0eSBpbiB0aGlzLmRhdGEpXG5cdFx0XHRkZWYgPSB7IGRhdGE6IHRoaXMuZGF0YSwgcmVzb2x2ZXI6IHRoaXMucmVzb2x2ZXIsIGRlZmluZWQ6IHRydWUgfTtcblx0XHRlbHNlIGlmKHNlZWspXG5cdFx0XHRkZWYgPSBzZWVrQXRDaGFpbih0aGlzLnJlc29sdmVyLnBhcmVudCwgcHJvcGVydHkpO1xuXHRcdGVsc2Vcblx0XHRcdHJldHVybiBudWxsO1xuXHRcdGlmKGRlZi5kZWZpbmVkKVxuXHRcdFx0dGhpcy5jYWNoZS5zZXQocHJvcGVydHksIGRlZik7XG5cdFx0cmV0dXJuIGRlZjtcblx0fVxuXG5cdGhhc1Byb3BlcnR5KHByb3BlcnR5KSB7XG5cdFx0Ly9AVE9ETyB3cml0ZSB0ZXN0cyEhIVxuXHRcdGNvbnN0IHsgZGVmaW5lZCB9ID0gdGhpcy5nZXRQcm9wZXJ0eURlZihwcm9wZXJ0eSk7XG5cdFx0cmV0dXJuIGRlZmluZWQ7XG5cdH1cblx0Z2V0UHJvcGVydHkocHJvcGVydHkpIHtcblx0XHQvL0BUT0RPIHdyaXRlIHRlc3RzISEhXHRcblx0XHRjb25zdCB7IGRhdGEgfSA9IHRoaXMuZ2V0UHJvcGVydHlEZWYocHJvcGVydHkpO1xuXHRcdHJldHVybiBkYXRhID8gZGF0YVtwcm9wZXJ0eV0gOiB1bmRlZmluZWQ7XG5cdH1cblx0c2V0UHJvcGVydHkocHJvcGVydHksIHZhbHVlKSB7XG5cdFx0Ly9AVE9ETyB3b3VsZCBzdXBwb3J0IHRoaXMgYWN0aW9uIG9uIGFuIHByb3hpZWQgcmVzb2x2ZXIgY29udGV4dD8/PyB3cml0ZSB0ZXN0cyEhIVxuXHRcdGNvbnN0IHsgZGF0YSwgZGVmaW5lZCB9ID0gdGhpcy5nZXRQcm9wZXJ0eURlZihwcm9wZXJ0eSk7XG5cdFx0aWYgKGRlZmluZWQpXG5cdFx0XHRkYXRhW3Byb3BlcnR5XSA9IHZhbHVlO1xuXHRcdGVsc2Uge1xuXHRcdFx0aWYgKHRoaXMuZGF0YSlcblx0XHRcdFx0dGhpcy5kYXRhW3Byb3BlcnR5XSA9IHZhbHVlO1xuXHRcdFx0ZWxzZSB7XG5cdFx0XHRcdHRoaXMuZGF0YSA9IHt9XG5cdFx0XHRcdHRoaXMuZGF0YVtwcm9wZXJ0eV0gPSB2YWx1ZTtcblx0XHRcdH1cblx0XHRcdHRoaXMuY2FjaGUuc2V0KHByb3BlcnR5LCB7IGRhdGE6IHRoaXMuZGF0YSwgcmVzb2x2ZXI6IHRoaXMucmVzb2x2ZXIsIGRlZmluZWQ6IHRydWUgfSk7XG5cdFx0fVxuXHR9XG5cdGRlbGV0ZVByb3BlcnR5KHByb3BlcnR5KSB7XG5cdFx0Ly9AVE9ETyB3b3VsZCBzdXBwb3J0IHRoaXMgYWN0aW9uIG9uIGFuIHByb3hpZWQgcmVzb2x2ZXIgY29udGV4dD8/PyB3cml0ZSB0ZXN0cyEhIVx0XHRcblx0XHR0aHJvdyBuZXcgRXJyb3IoXCJ1bnN1cHBvcnRlZCBmdW5jdGlvbiFcIilcblx0fVxufVxuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBDb250ZXh0IHtcblx0Y29uc3RydWN0b3IoY29udGV4dCwgcmVzb2x2ZXIpIHtcblx0XHR0aGlzLmhhbmRsZSA9IG5ldyBIYW5kbGUoY29udGV4dCwgcmVzb2x2ZXIpO1x0XHRcblx0XHR0aGlzLmRhdGEgPSBuZXcgUHJveHkodGhpcy5oYW5kbGUsIHtcblx0XHRcdGhhczogZnVuY3Rpb24oZGF0YSwgcHJvcGVydHkpIHtcblx0XHRcdFx0cmV0dXJuIGRhdGEuaGFzUHJvcGVydHkocHJvcGVydHkpO1xuXHRcdFx0fSxcblx0XHRcdGdldDogZnVuY3Rpb24oZGF0YSwgcHJvcGVydHkpIHtcblx0XHRcdFx0cmV0dXJuIGRhdGEuZ2V0UHJvcGVydHkocHJvcGVydHkpO1xuXHRcdFx0fSxcblx0XHRcdHNldDogZnVuY3Rpb24oZGF0YSwgcHJvcGVydHksIHZhbHVlKSB7XG5cdFx0XHRcdHJldHVybiBkYXRhLnNldFByb3BlcnR5KHByb3BlcnR5LCB2YWx1ZSk7XG5cdFx0XHR9LFxuXHRcdFx0ZGVsZXRlUHJvcGVydHk6IGZ1bmN0aW9uKGRhdGEsIHByb3BlcnR5KSB7XG5cdFx0XHRcdHJldHVybiBkYXRhLmRlbGV0ZVByb3BlcnR5KHByb3BlcnR5KTtcblx0XHRcdH1cblx0XHRcdC8vQFRPRE8gbmVlZCB0byBzdXBwb3J0IHRoZSBvdGhlciBwcm94eSBhY3Rpb25zXHRcdFxuXHRcdH0pOztcblx0fVxuXHRcblx0dXBkYXRlRGF0YShkYXRhKXtcblx0XHR0aGlzLmhhbmRsZS51cGRhdGVEYXRhKGRhdGEpXHRcdFxuXHR9XG5cdFxuXHRyZXNldENhY2hlKCl7XG5cdFx0dGhpcy5oYW5kbGUucmVzZXRDYWNoZSgpO1xuXHR9XG59OyIsImV4cG9ydCBkZWZhdWx0IGNsYXNzIERlZmF1bHRWYWx1ZSB7XG5cdGNvbnN0cnVjdG9yKHZhbHVlKXtcblx0XHR0aGlzLmhhc1ZhbHVlID0gYXJndW1lbnRzLmxlbmd0aCA9PSAxO1xuXHRcdHRoaXMudmFsdWUgPSB2YWx1ZTtcblx0fVx0XG59OyIsImltcG9ydCBHTE9CQUwgZnJvbSBcIkBkZWZhdWx0LWpzL2RlZmF1bHRqcy1jb21tb24tdXRpbHMvc3JjL0dsb2JhbC5qc1wiXHJcbmltcG9ydCBPYmplY3RQcm9wZXJ0eSBmcm9tIFwiQGRlZmF1bHQtanMvZGVmYXVsdGpzLWNvbW1vbi11dGlscy9zcmMvT2JqZWN0UHJvcGVydHkuanNcIjtcclxuaW1wb3J0IE9iamVjdFV0aWxzIGZyb20gXCJAZGVmYXVsdC1qcy9kZWZhdWx0anMtY29tbW9uLXV0aWxzL3NyYy9PYmplY3RVdGlscy5qc1wiXHJcbmltcG9ydCBEZWZhdWx0VmFsdWUgZnJvbSBcIi4vRGVmYXVsdFZhbHVlLmpzXCI7XHJcbmltcG9ydCBDb250ZXh0IGZyb20gXCIuL0NvbnRleHQuanNcIjtcclxuXHJcblxyXG5jb25zdCBFWEVDVVRJT05fV0FSTl9USU1FT1VUID0gMTAwMDtcclxuY29uc3QgRVhQUkVTU0lPTiA9IC9cXCRcXHsoKFthLXpBLVowLTlcXC1fXFxzXSspOjopPyhbXlxce1xcfV0rKVxcfS87XHJcbmNvbnN0IERFRkFVTFRfTk9UX0RFRklORUQgPSBuZXcgRGVmYXVsdFZhbHVlKCk7XHJcbmNvbnN0IHRvRGVmYXVsdFZhbHVlID0gdmFsdWUgPT4ge1xyXG5cdGlmICh2YWx1ZSBpbnN0YW5jZW9mIERlZmF1bHRWYWx1ZSlcclxuXHRcdHJldHVybiB2YWx1ZTtcclxuXHJcblx0cmV0dXJuIG5ldyBEZWZhdWx0VmFsdWUodmFsdWUpO1xyXG59O1xyXG5cclxuY29uc3QgZXhlY3V0ZSA9IGFzeW5jIGZ1bmN0aW9uKGFTdGF0ZW1lbnQsIGFDb250ZXh0KSB7XHJcblx0aWYgKHR5cGVvZiBhU3RhdGVtZW50ICE9PSBcInN0cmluZ1wiKVxyXG5cdFx0cmV0dXJuIGFTdGF0ZW1lbnQ7XHJcblx0XHRcclxuXHRjb25zdCBleHByZXNzaW9uID0gbmV3IEZ1bmN0aW9uKFwiY29udGV4dFwiLCBcclxuYFxyXG5yZXR1cm4gKGFzeW5jIChjb250ZXh0KSA9PiB7XHJcblx0dHJ5eyBcclxuXHRcdHdpdGgoY29udGV4dCl7XHJcblx0XHRcdCByZXR1cm4gJHthU3RhdGVtZW50fVxyXG5cdFx0fVxyXG5cdH1jYXRjaChlKXtcclxuXHRcdHRocm93IGU7XHJcblx0fVxyXG59KShjb250ZXh0KWBcclxuXHQpO1xyXG5cdFxyXG5cdGxldCB0aW1lb3V0ID0gc2V0VGltZW91dCgoKSA9PiB7XHJcblx0XHR0aW1lb3V0ID0gbnVsbDtcclxuXHRcdGNvbnNvbGUud2FybihcImxvbmcgcnVubmluZyBzdGF0ZW1lbnQ6XCIsIGFTdGF0ZW1lbnQsIG5ldyBFcnJvcigpKTtcclxuXHR9LCBFWEVDVVRJT05fV0FSTl9USU1FT1VUKVxyXG5cdFxyXG5cdGNvbnN0IHJlc3VsdCA9IGF3YWl0IGV4cHJlc3Npb24oYUNvbnRleHQpO1xyXG5cdFxyXG5cdGlmKHRpbWVvdXQpXHJcblx0XHRjbGVhclRpbWVvdXQodGltZW91dClcclxuXHRyZXR1cm4gcmVzdWx0O1xyXG59O1xyXG5cclxuY29uc3QgcmVzb2x2ZSA9IGFzeW5jIGZ1bmN0aW9uKGFSZXNvbHZlciwgYUV4cHJlc3Npb24sIGFGaWx0ZXIsIGFEZWZhdWx0KSB7XHJcblx0aWYgKGFGaWx0ZXIgJiYgYVJlc29sdmVyLm5hbWUgIT0gYUZpbHRlcilcclxuXHRcdHJldHVybiBhUmVzb2x2ZXIucGFyZW50ID8gcmVzb2x2ZShhUmVzb2x2ZXIucGFyZW50LCBhRXhwcmVzc2lvbiwgYUZpbHRlciwgYURlZmF1bHQpIDogbnVsbDtcclxuXHRcclxuXHRjb25zdCByZXN1bHQgPSBhd2FpdCBleGVjdXRlKGFFeHByZXNzaW9uLCBhUmVzb2x2ZXIucHJveHkuZGF0YSk7XHJcblx0aWYgKHJlc3VsdCAhPT0gbnVsbCAmJiB0eXBlb2YgcmVzdWx0ICE9PSBcInVuZGVmaW5lZFwiKVxyXG5cdFx0cmV0dXJuIHJlc3VsdDtcclxuXHJcblx0ZWxzZSBpZiAoYURlZmF1bHQgaW5zdGFuY2VvZiBEZWZhdWx0VmFsdWUgJiYgYURlZmF1bHQuaGFzVmFsdWUpXHJcblx0XHRyZXR1cm4gYURlZmF1bHQudmFsdWU7XHJcblxyXG5cdHJldHVybiByZXN1bHQ7XHJcbn07XHJcblxyXG5jb25zdCBub3JtYWxpemUgPSB2YWx1ZSA9PiB7XHJcblx0aWYgKHZhbHVlKSB7XHJcblx0XHR2YWx1ZSA9IHZhbHVlLnRyaW0oKTtcclxuXHRcdHJldHVybiB2YWx1ZS5sZW5ndGggPT0gMCA/IG51bGwgOiB2YWx1ZTtcclxuXHR9XHJcblx0cmV0dXJuIG51bGw7XHJcbn07XHJcblxyXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBFeHByZXNzaW9uUmVzb2x2ZXIge1xyXG5cdGNvbnN0cnVjdG9yKHsgY29udGV4dCA9IEdMT0JBTCwgcGFyZW50ID0gbnVsbCwgbmFtZSA9IG51bGwgfSkge1xyXG5cdFx0dGhpcy5wYXJlbnQgPSAocGFyZW50IGluc3RhbmNlb2YgRXhwcmVzc2lvblJlc29sdmVyKSA/IHBhcmVudCA6IG51bGw7XHJcblx0XHR0aGlzLm5hbWUgPSBuYW1lO1xyXG5cdFx0dGhpcy5jb250ZXh0ID0gY29udGV4dDtcclxuXHRcdHRoaXMucHJveHkgPSBuZXcgQ29udGV4dCh0aGlzLmNvbnRleHQsIHRoaXMpO1xyXG5cdH1cclxuXHJcblx0Z2V0IGNoYWluKCkge1xyXG5cdFx0cmV0dXJuIHRoaXMucGFyZW50ID8gdGhpcy5wYXJlbnQuY2hhaW4gKyBcIi9cIiArIHRoaXMubmFtZSA6IFwiL1wiICsgdGhpcy5uYW1lO1xyXG5cdH1cclxuXHJcblx0Z2V0IGVmZmVjdGl2ZUNoYWluKCkge1xyXG5cdFx0aWYgKCF0aGlzLmNvbnRleHQpXHJcblx0XHRcdHJldHVybiB0aGlzLnBhcmVudCA/IHRoaXMucGFyZW50LmVmZmVjdGl2ZUNoYWluIDogXCJcIjtcclxuXHRcdHJldHVybiB0aGlzLnBhcmVudCA/IHRoaXMucGFyZW50LmVmZmVjdGl2ZUNoYWluICsgXCIvXCIgKyB0aGlzLm5hbWUgOiBcIi9cIiArIHRoaXMubmFtZTtcclxuXHR9XHJcblxyXG5cdGdldCBjb250ZXh0Q2hhaW4oKSB7XHJcblx0XHRjb25zdCByZXN1bHQgPSBbXTtcclxuXHRcdGxldCByZXNvbHZlciA9IHRoaXM7XHJcblx0XHR3aGlsZSAocmVzb2x2ZXIpIHtcclxuXHRcdFx0aWYgKHJlc29sdmVyLmNvbnRleHQpXHJcblx0XHRcdFx0cmVzdWx0LnB1c2gocmVzb2x2ZXIuY29udGV4dCk7XHJcblxyXG5cdFx0XHRyZXNvbHZlciA9IHJlc29sdmVyLnBhcmVudDtcclxuXHRcdH1cclxuXHJcblx0XHRyZXR1cm4gcmVzdWx0O1xyXG5cdH1cclxuXHJcblx0Z2V0RGF0YShrZXksIGZpbHRlcikge1xyXG5cdFx0aWYgKCFrZXkpXHJcblx0XHRcdHJldHVybjtcclxuXHRcdGVsc2UgaWYgKGZpbHRlciAmJiBmaWx0ZXIgIT0gdGhpcy5uYW1lKSB7XHJcblx0XHRcdGlmICh0aGlzLnBhcmVudClcclxuXHRcdFx0XHR0aGlzLnBhcmVudC5nZXREYXRhKGtleSwgZmlsdGVyKTtcclxuXHRcdH0gZWxzZSB7XHJcblx0XHRcdGNvbnN0IHByb3BlcnR5ID0gT2JqZWN0UHJvcGVydHkubG9hZCh0aGlzLmNvbnRleHQsIGtleSwgZmFsc2UpO1xyXG5cdFx0XHRyZXR1cm4gcHJvcGVydHkgPyBwcm9wZXJ0eS52YWx1ZSA6IG51bGw7XHJcblx0XHR9XHJcblx0fVxyXG5cclxuXHR1cGRhdGVEYXRhKGtleSwgdmFsdWUsIGZpbHRlcikge1xyXG5cdFx0aWYgKCFrZXkpXHJcblx0XHRcdHJldHVybjtcclxuXHRcdGVsc2UgaWYgKGZpbHRlciAmJiBmaWx0ZXIgIT0gdGhpcy5uYW1lKSB7XHJcblx0XHRcdGlmICh0aGlzLnBhcmVudClcclxuXHRcdFx0XHR0aGlzLnBhcmVudC51cGRhdGVEYXRhKGtleSwgdmFsdWUsIGZpbHRlcik7XHJcblx0XHR9IGVsc2Uge1xyXG5cdFx0XHRpZih0aGlzLmNvbnRleHQgPT0gbnVsbCB8fCB0eXBlb2YgdGhpcy5jb250ZXh0ID09PSBcInVuZGVmaW5lZFwiKXtcclxuXHRcdFx0XHR0aGlzLmNvbnRleHQgPSB7fTtcdFx0XHRcdFxyXG5cdFx0XHRcdHRoaXMucHJveHkudXBkYXRlRGF0YSh0aGlzLmNvbnRleHQpO1xyXG5cdFx0XHR9XHJcblx0XHRcdGNvbnN0IHByb3BlcnR5ID0gT2JqZWN0UHJvcGVydHkubG9hZCh0aGlzLmNvbnRleHQsIGtleSk7XHJcblx0XHRcdHByb3BlcnR5LnZhbHVlID0gdmFsdWU7XHJcblx0XHRcdHRoaXMucHJveHkucmVzZXRDYWNoZSgpO1xyXG5cdFx0fVxyXG5cdH1cclxuXHJcblx0bWVyZ2VDb250ZXh0KGNvbnRleHQsIGZpbHRlcikge1xyXG5cdFx0aWYgKGZpbHRlciAmJiBmaWx0ZXIgIT0gdGhpcy5uYW1lKSB7XHJcblx0XHRcdGlmICh0aGlzLnBhcmVudClcclxuXHRcdFx0XHR0aGlzLnBhcmVudC5tZXJnZUNvbnRleHQoY29udGV4dCwgZmlsdGVyKTtcclxuXHRcdH0gZWxzZSB7XHJcblx0XHRcdHRoaXMuY29udGV4dCA9IHRoaXMuY29udGV4dCA/IE9iamVjdFV0aWxzLm1lcmdlKHRoaXMuY29udGV4dCwgY29udGV4dCkgOiBjb250ZXh0O1xyXG5cdFx0fVxyXG5cdH1cclxuXHJcblx0YXN5bmMgcmVzb2x2ZShhRXhwcmVzc2lvbiwgYURlZmF1bHQpIHtcclxuXHRcdGNvbnN0IGRlZmF1bHRWYWx1ZSA9IGFyZ3VtZW50cy5sZW5ndGggPT0gMiA/IHRvRGVmYXVsdFZhbHVlKGFEZWZhdWx0KSA6IERFRkFVTFRfTk9UX0RFRklORUQ7XHJcblx0XHR0cnkge1xyXG5cdFx0XHRjb25zdCBtYXRjaCA9IEVYUFJFU1NJT04uZXhlYyhhRXhwcmVzc2lvbik7XHJcblx0XHRcdGlmIChtYXRjaClcclxuXHRcdFx0XHRyZXR1cm4gYXdhaXQgcmVzb2x2ZSh0aGlzLCBtYXRjaFszXSwgbm9ybWFsaXplKG1hdGNoWzJdKSwgZGVmYXVsdFZhbHVlKTtcclxuXHRcdFx0ZWxzZVxyXG5cdFx0XHRcdHJldHVybiBhd2FpdCByZXNvbHZlKHRoaXMsIG5vcm1hbGl6ZShhRXhwcmVzc2lvbiksIG51bGwsIGRlZmF1bHRWYWx1ZSk7XHJcblx0XHR9IGNhdGNoIChlKSB7XHJcblx0XHRcdGNvbnNvbGUuZXJyb3IoXCJlcnJvciBhdCBleGVjdXRpbmcgc3RhdG1lbnRcXFwiXCIsIGFFeHByZXNzaW9uLCBcIlxcXCI6XCIsIGUpO1xyXG5cdFx0XHRyZXR1cm4gZGVmYXVsdFZhbHVlLmhhc1ZhbHVlID8gZGVmYXVsdFZhbHVlLnZhbHVlIDogYUV4cHJlc3Npb247XHJcblx0XHR9XHJcblx0fVxyXG5cclxuXHRhc3luYyByZXNvbHZlVGV4dChhVGV4dCwgYURlZmF1bHQpIHtcclxuXHRcdGxldCB0ZXh0ID0gYVRleHQ7XHJcblx0XHRsZXQgdGVtcCA9IGFUZXh0OyAvLyByZXF1aXJlZCB0byBwcmV2ZW50IGluZmluaXR5IGxvb3BcclxuXHRcdGxldCBtYXRjaCA9IEVYUFJFU1NJT04uZXhlYyh0ZXh0KTtcclxuXHRcdGNvbnN0IGRlZmF1bHRWYWx1ZSA9IGFyZ3VtZW50cy5sZW5ndGggPT0gMiA/IHRvRGVmYXVsdFZhbHVlKGFEZWZhdWx0KSA6IERFRkFVTFRfTk9UX0RFRklORURcclxuXHRcdHdoaWxlIChtYXRjaCAhPSBudWxsKSB7XHJcblx0XHRcdGNvbnN0IHJlc3VsdCA9IGF3YWl0IHRoaXMucmVzb2x2ZShtYXRjaFswXSwgZGVmYXVsdFZhbHVlKTtcclxuXHRcdFx0dGVtcCA9IHRlbXAuc3BsaXQobWF0Y2hbMF0pLmpvaW4oKTsgLy8gcmVtb3ZlIGN1cnJlbnQgbWF0Y2ggZm9yIG5leHQgbG9vcFxyXG5cdFx0XHR0ZXh0ID0gdGV4dC5zcGxpdChtYXRjaFswXSkuam9pbih0eXBlb2YgcmVzdWx0ID09PSBcInVuZGVmaW5lZFwiID8gXCJ1bmRlZmluZWRcIiA6IChyZXN1bHQgPT0gbnVsbCA/IFwibnVsbFwiIDogcmVzdWx0KSk7XHJcblx0XHRcdG1hdGNoID0gRVhQUkVTU0lPTi5leGVjKHRlbXApO1xyXG5cdFx0fVxyXG5cdFx0cmV0dXJuIHRleHQ7XHJcblx0fVxyXG5cclxuXHRzdGF0aWMgYXN5bmMgcmVzb2x2ZShhRXhwcmVzc2lvbiwgYUNvbnRleHQsIGFEZWZhdWx0LCBhVGltZW91dCkge1xyXG5cdFx0Y29uc3QgcmVzb2x2ZXIgPSBuZXcgRXhwcmVzc2lvblJlc29sdmVyKHsgY29udGV4dDogYUNvbnRleHQgfSk7XHJcblx0XHRjb25zdCBkZWZhdWx0VmFsdWUgPSBhcmd1bWVudHMubGVuZ3RoID4gMiA/IHRvRGVmYXVsdFZhbHVlKGFEZWZhdWx0KSA6IERFRkFVTFRfTk9UX0RFRklORUQ7XHJcblx0XHRpZiAodHlwZW9mIGFUaW1lb3V0ID09PSBcIm51bWJlclwiICYmIGFUaW1lb3V0ID4gMClcclxuXHRcdFx0cmV0dXJuIG5ldyBQcm9taXNlKHJlc29sdmUgPT4ge1xyXG5cdFx0XHRcdHNldFRpbWVvdXQoKCkgPT4ge1xyXG5cdFx0XHRcdFx0cmVzb2x2ZShyZXNvbHZlci5yZXNvbHZlKGFFeHByZXNzaW9uLCBkZWZhdWx0VmFsdWUpKTtcclxuXHRcdFx0XHR9LCBhVGltZW91dCk7XHJcblx0XHRcdH0pO1xyXG5cclxuXHRcdHJldHVybiByZXNvbHZlci5yZXNvbHZlKGFFeHByZXNzaW9uLCBkZWZhdWx0VmFsdWUpXHJcblx0fVxyXG5cclxuXHRzdGF0aWMgYXN5bmMgcmVzb2x2ZVRleHQoYVRleHQsIGFDb250ZXh0LCBhRGVmYXVsdCwgYVRpbWVvdXQpIHtcclxuXHRcdGNvbnN0IHJlc29sdmVyID0gbmV3IEV4cHJlc3Npb25SZXNvbHZlcih7IGNvbnRleHQ6IGFDb250ZXh0IH0pO1xyXG5cdFx0Y29uc3QgZGVmYXVsdFZhbHVlID0gYXJndW1lbnRzLmxlbmd0aCA+IDIgPyB0b0RlZmF1bHRWYWx1ZShhRGVmYXVsdCkgOiBERUZBVUxUX05PVF9ERUZJTkVEO1xyXG5cdFx0aWYgKHR5cGVvZiBhVGltZW91dCA9PT0gXCJudW1iZXJcIiAmJiBhVGltZW91dCA+IDApXHJcblx0XHRcdHJldHVybiBuZXcgUHJvbWlzZShyZXNvbHZlID0+IHtcclxuXHRcdFx0XHRzZXRUaW1lb3V0KCgpID0+IHtcclxuXHRcdFx0XHRcdHJlc29sdmUocmVzb2x2ZXIucmVzb2x2ZVRleHQoYVRleHQsIGRlZmF1bHRWYWx1ZSkpO1xyXG5cdFx0XHRcdH0sIGFUaW1lb3V0KTtcclxuXHRcdFx0fSk7XHJcblxyXG5cdFx0cmV0dXJuIHJlc29sdmVyLnJlc29sdmVUZXh0KGFUZXh0LCBkZWZhdWx0VmFsdWUpO1xyXG5cdH1cclxuXHRcclxuXHRzdGF0aWMgYnVpbGRTZWN1cmUoe2NvbnRleHQsIHByb3BGaWx0ZXIsIG9wdGlvbj17ZGVlcDp0cnVlfSwgbmFtZSwgcGFyZW50fSl7XHJcblx0XHRjb250ZXh0ID0gT2JqZWN0VXRpbHMuZmlsdGVyKHtkYXRhOiBjb250ZXh0LCBwcm9wRmlsdGVyLCBvcHRpb259KTtcclxuXHRcdHJldHVybiBuZXcgRXhwcmVzc2lvblJlc29sdmVyKHtjb250ZXh0LCBuYW1lLCBwYXJlbnR9KTtcclxuXHR9XHJcbn07IiwiaW1wb3J0IFwiLi9zcmMvaW5kZXhcIjsiLCJpbXBvcnQgVXRpbHMgZnJvbSBcIi4vdXRpbHMvVXRpbHNcIjtcclxuXHJcblV0aWxzLmdsb2JhbC5kZWZhdWx0anMgPSBVdGlscy5nbG9iYWwuZGVmYXVsdGpzIHx8IHt9O1xyXG5VdGlscy5nbG9iYWwuZGVmYXVsdGpzLmV4dGRvbSA9IFV0aWxzLmdsb2JhbC5kZWZhdWx0anMuZXh0ZG9tIHx8IHtcclxuXHRWRVJTSU9OIDogXCIke3ZlcnNpb259XCIsXHJcblx0dXRpbHMgOiB7XHJcblx0XHRVdGlsczogVXRpbHNcclxuXHR9XHJcbn07XHJcblxyXG5VdGlscy5nbG9iYWwuZmluZCA9IGZ1bmN0aW9uKCkge1xyXG5cdHJldHVybiBkb2N1bWVudC5maW5kLmFwcGx5KGRvY3VtZW50LCBhcmd1bWVudHMpO1xyXG59O1xyXG5cclxuVXRpbHMuZ2xvYmFsLnJlYWR5ID0gZnVuY3Rpb24oKSB7XHJcblx0cmV0dXJuIGRvY3VtZW50LnJlYWR5LmFwcGx5KGRvY3VtZW50LCBhcmd1bWVudHMpO1xyXG59O1xyXG5cclxuVXRpbHMuZ2xvYmFsLmNyZWF0ZSA9IGZ1bmN0aW9uKGFDb250ZW50LCBhc1RlbXBsYXRlKSB7XHJcblx0aWYgKHR5cGVvZiBhcmd1bWVudHNbMF0gIT09IFwic3RyaW5nXCIpXHJcblx0XHR0aHJvdyBuZXcgRXJyb3IoXCJUaGUgZmlyc3QgYXJndW1lbnQgbXVzdCBiZSBhIHN0cmluZyFcIik7XHJcblx0XHJcblx0Y29uc3QgdGVtcGxhdGUgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwidGVtcGxhdGVcIik7XHJcblx0dGVtcGxhdGUuaW5uZXJIVE1MID0gYUNvbnRlbnQ7XHJcblx0aWYoYXNUZW1wbGF0ZSlcclxuXHRcdHJldHVybiB0ZW1wbGF0ZTtcclxuXHRcclxuXHRyZXR1cm4gZG9jdW1lbnQuaW1wb3J0Tm9kZSh0ZW1wbGF0ZS5jb250ZW50LCB0cnVlKS5jaGlsZE5vZGVzO1xyXG59O1xyXG5cclxuVXRpbHMuZ2xvYmFsLnNjcmlwdCA9IGZ1bmN0aW9uKGFGaWxlLCBhVGFyZ2V0KSB7XHJcblx0aWYoYUZpbGUgaW5zdGFuY2VvZiBBcnJheSlcclxuXHRcdHJldHVybiBQcm9taXNlLmFsbChhRmlsZS5tYXAoZmlsZSA9PiBVdGlscy5nbG9iYWwuc2NyaXB0KGZpbGUsIGFUYXJnZXQpKSk7XHJcblx0XHJcblx0aWYodHlwZW9mIGFGaWxlID09PSBcInN0cmluZ1wiKVx0XHJcblx0XHRyZXR1cm4gbmV3IFByb21pc2UoKHIsZSkgPT4ge1xyXG5cdFx0XHRjb25zdCBzY3JpcHQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwic2NyaXB0XCIpO1xyXG5cdFx0XHRzY3JpcHQuYXN5bmMgPSB0cnVlO1xyXG5cdFx0XHRzY3JpcHQub25sb2FkID0gZnVuY3Rpb24oKXtyKCl9O1xyXG5cdFx0XHRzY3JpcHQub25lcnJvciA9IGZ1bmN0aW9uKCl7dGhyb3cgbmV3IEVycm9yKFwibG9hZCBlcnJvciFcIil9O1xyXG5cdFx0XHQhYVRhcmdldCA/IGRvY3VtZW50LmJvZHkuYXBwZW5kKHNjcmlwdCkgOiBhVGFyZ2V0LmFwcGVuZChzY3JpcHQpO1xyXG5cdFx0XHRzY3JpcHQuc3JjID0gYUZpbGU7XHJcblx0XHR9KTtcclxuXHRlbHNlXHJcblx0XHRyZXR1cm4gUHJvbWlzZS5yZWplY3QoXCJGaXJzdCBwYXJhbWV0ZXIgbXVzdCBiZSBhbiBhcnJheSBvZiBzdHJpbmdzIG9yIGEgc3RyaW5nIVwiKTtcclxufTsiLCJpbXBvcnQgZXh0ZW5kUHJvdG90eXBlIGZyb20gXCIuLi91dGlscy9FeHRlbmRQcm90b3R5cGVcIjtcclxuaW1wb3J0IFF1ZXJ5U3VwcG9ydCBmcm9tIFwiLi9leHRlbnRpb25zL1F1ZXJ5U3VwcG9ydFwiO1xyXG5pbXBvcnQgUmVhZHlFdmVudFN1cHBvcnQgZnJvbSBcIi4vZXh0ZW50aW9ucy9SZWFkeUV2ZW50U3VwcG9ydFwiO1xyXG5cclxuZXh0ZW5kUHJvdG90eXBlKERvY3VtZW50LCBRdWVyeVN1cHBvcnQsIFJlYWR5RXZlbnRTdXBwb3J0KTtcclxuXHJcbmRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoXCJET01Db250ZW50TG9hZGVkXCIsICgpID0+IGRvY3VtZW50LnRyaWdnZXIoXCJyZWFkeVwiKSk7XHJcblxyXG5cclxuXHJcbiIsImltcG9ydCBleHRlbmRQcm90b3R5cGUgZnJvbSBcIi4uL3V0aWxzL0V4dGVuZFByb3RvdHlwZVwiO1xyXG5pbXBvcnQgUXVlcnlTdXBwb3J0IGZyb20gXCIuL2V4dGVudGlvbnMvUXVlcnlTdXBwb3J0XCI7XHJcbmltcG9ydCBNYW5pcHVsYXRpb25TdXBwb3J0IGZyb20gXCIuL2V4dGVudGlvbnMvTWFuaXB1bGF0aW9uU3VwcG9ydFwiO1xyXG5cclxuZXh0ZW5kUHJvdG90eXBlKERvY3VtZW50RnJhZ21lbnQsIFF1ZXJ5U3VwcG9ydCwgTWFuaXB1bGF0aW9uU3VwcG9ydCk7XHJcblxyXG5cclxuXHJcblxyXG4iLCJpbXBvcnQgZXh0ZW5kUHJvdG90eXBlIGZyb20gXCIuLi91dGlscy9FeHRlbmRQcm90b3R5cGVcIjtcclxuaW1wb3J0IFF1ZXJ5U3VwcG9ydCBmcm9tIFwiLi9leHRlbnRpb25zL1F1ZXJ5U3VwcG9ydFwiO1xyXG5pbXBvcnQgQXR0cmlidXRlU3VwcG9ydCBmcm9tIFwiLi9leHRlbnRpb25zL0F0dHJpYnV0ZVN1cHBvcnRcIjtcclxuaW1wb3J0IE1hbmlwdWxhdGlvblN1cHBvcnQgZnJvbSBcIi4vZXh0ZW50aW9ucy9NYW5pcHVsYXRpb25TdXBwb3J0XCI7XHJcblxyXG5leHRlbmRQcm90b3R5cGUoRWxlbWVudCxRdWVyeVN1cHBvcnQsIEF0dHJpYnV0ZVN1cHBvcnQsIE1hbmlwdWxhdGlvblN1cHBvcnQpOyIsImltcG9ydCBleHRlbmRQcm90b3R5cGUgZnJvbSBcIi4uL3V0aWxzL0V4dGVuZFByb3RvdHlwZVwiO1xuaW1wb3J0IEV2ZW50U3VwcG9ydCBmcm9tIFwiLi9leHRlbnRpb25zL0V2ZW50U3VwcG9ydFwiO1xuXG5leHRlbmRQcm90b3R5cGUoRXZlbnRUYXJnZXQsIEV2ZW50U3VwcG9ydCk7IiwiaW1wb3J0IGV4dGVuZFByb3RvdHlwZSBmcm9tIFwiLi4vdXRpbHMvRXh0ZW5kUHJvdG90eXBlXCI7XHJcbmltcG9ydCBIdG1sQ2xhc3NTdXBwb3J0IGZyb20gXCIuL2V4dGVudGlvbnMvSHRtbENsYXNzU3VwcG9ydFwiO1xyXG5pbXBvcnQgU2hvd0hpZGVTdXBwb3J0IGZyb20gXCIuL2V4dGVudGlvbnMvU2hvd0hpZGVTdXBwb3J0XCI7XHJcblxyXG5cclxuZXh0ZW5kUHJvdG90eXBlKEhUTUxFbGVtZW50LCBIdG1sQ2xhc3NTdXBwb3J0LCBTaG93SGlkZVN1cHBvcnQpOyIsImltcG9ydCBleHRlbmRQcm90b3R5cGUgZnJvbSBcIi4uL3V0aWxzL0V4dGVuZFByb3RvdHlwZVwiO1xyXG5pbXBvcnQgVmFsdWVTdXBwb3J0IGZyb20gXCIuL2V4dGVudGlvbnMvVmFsdWVTdXBwb3J0XCI7XHJcblxyXG5cclxuZXh0ZW5kUHJvdG90eXBlKEhUTUxJbnB1dEVsZW1lbnQsVmFsdWVTdXBwb3J0KTsiLCJpbXBvcnQgZXh0ZW5kUHJvdG90eXBlIGZyb20gXCIuLi91dGlscy9FeHRlbmRQcm90b3R5cGVcIjtcclxuaW1wb3J0IFZhbHVlU3VwcG9ydCBmcm9tIFwiLi9leHRlbnRpb25zL1ZhbHVlU3VwcG9ydFwiO1xyXG5cclxuXHJcbmV4dGVuZFByb3RvdHlwZShIVE1MU2VsZWN0RWxlbWVudCxWYWx1ZVN1cHBvcnQpOyIsImltcG9ydCBleHRlbmRQcm90b3R5cGUgZnJvbSBcIi4uL3V0aWxzL0V4dGVuZFByb3RvdHlwZVwiO1xyXG5pbXBvcnQgRXh0ZW5kZXIgZnJvbSBcIi4uL3V0aWxzL0V4dGVuZGVyXCI7XHJcblxyXG5cclxuZXh0ZW5kUHJvdG90eXBlKEhUTUxUZXh0QXJlYUVsZW1lbnQsRXh0ZW5kZXIoXCJWYWx1ZVN1cHBvcnRcIiwgUHJvdG90eXBlID0+IHtcdFxyXG5cdFByb3RvdHlwZS52YWwgPSBmdW5jdGlvbigpIHtcclxuXHRcdGlmKGFyZ3VtZW50cy5sZW5ndGggPT0gMClcclxuXHRcdFx0cmV0dXJuIHRoaXMudmFsdWU7XHJcblx0XHRlbHNlXHJcblx0XHRcdHRoaXMudmFsdWUgPSBhcmd1bWVudHNbMF1cclxuXHRcdFx0XHJcblx0XHRyZXR1cm4gdGhpcztcclxuXHR9O1x0XHJcbn0pKTsiLCJpbXBvcnQgZXh0ZW5kUHJvdG90eXBlIGZyb20gXCIuLi91dGlscy9FeHRlbmRQcm90b3R5cGVcIjtcclxuaW1wb3J0IERlbGVnYXRlckJ1aWxkZXIgZnJvbSBcIi4uL3V0aWxzL0RlbGVnYXRlckJ1aWxkZXJcIjtcclxuaW1wb3J0IExpc3RTdXBwb3J0IGZyb20gXCIuL2V4dGVudGlvbnMvTGlzdFN1cHBvcnRcIjtcclxuXHJcbmV4dGVuZFByb3RvdHlwZShIVE1MQ29sbGVjdGlvbiwgTGlzdFN1cHBvcnQpO1xyXG5cclxuSFRNTENvbGxlY3Rpb24ucHJvdG90eXBlLmFwcGx5VG8gPSBmdW5jdGlvbigpe1xyXG5cdGNvbnN0IGFyZ3MgPSBBcnJheS5mcm9tKGFyZ3VtZW50cyk7XHJcblx0Y29uc3QgY2FsbGluZyA9IGFyZ3Muc2hpZnQoKTtcclxuXHRjb25zdCBpc0Z1bmN0aW9uID0gdHlwZW9mIGNhbGxpbmcgPT09IFwiZnVuY3Rpb25cIjtcclxuXHRjb25zdCByZXN1bHRzID0gW107XHJcblx0Zm9yKGxldCBpID0gMDsgaSA8IHRoaXMubGVuZ3RoOyBpKyspe1xyXG5cdFx0Y29uc3Qgbm9kZSA9IHRoaXNbaV07XHJcblx0XHRsZXRcdHJlc3VsdDtcclxuXHRcdGlmKGlzRnVuY3Rpb24pXHJcblx0XHRcdHJlc3VsdCA9IGNhbGxpbmcuYXBwbHkoW25vZGVdLmNvbmNhdChhcmdzKSk7XHJcblx0XHRlbHNlIGlmKHR5cGVvZiBub2RlW2NhbGxpbmddID09PSBcImZ1bmN0aW9uXCIpXHJcblx0XHRcdHJlc3VsdCA9IG5vZGVbY2FsbGluZ10uYXBwbHkobm9kZSwgYXJncyk7XHJcblx0XHRcclxuXHRcdGlmKHJlc3VsdClcclxuXHRcdFx0cmVzdWx0cy5wdXNoKHJlc3VsdCk7XHJcblx0fVxyXG5cdFxyXG5cdHJldHVybiByZXN1bHRzO1xyXG59O1xyXG5cclxuSFRNTENvbGxlY3Rpb24ucHJvdG90eXBlLnZhbCA9IGZ1bmN0aW9uKCkge1xyXG5cdGlmKGFyZ3VtZW50cy5sZW5ndGggPT0gMCl7XHJcblx0XHRpZih0aGlzLmxlbmd0aCA+IDApe1xyXG5cdFx0XHRjb25zdCByZXN1bHQgPSBuZXcgTWFwKCk7XHJcblx0XHRcdHRoaXMuZm9yRWFjaChub2RlID0+IHtcclxuXHRcdFx0XHRpZih0eXBlb2Ygbm9kZS52YWwgPT09IFwiZnVuY3Rpb25cIil7XHJcblx0XHRcdFx0XHRjb25zdCB2YWx1ZSA9IG5vZGUudmFsKCk7XHJcblx0XHRcdFx0XHRpZih2YWx1ZSlcclxuXHRcdFx0XHRcdFx0cmVzdWx0LnNldCgobm9kZS5uYW1lIHx8IG5vZGUuaWQgfHwgbm9kZS5zZWxlY3RvcigpKSwgbm9kZS52YWwoKSk7XHJcblx0XHRcdFx0fVxyXG5cdFx0XHR9KTtcdFxyXG5cdFx0XHRyZXR1cm4gcmVzdWx0O1xyXG5cdFx0fVxyXG5cdH1cclxuXHRlbHNlXHJcblx0XHRIVE1MQ29sbGVjdGlvbi5wcm90b3R5cGUuYXBwbHlUby5hcHBseSh0aGlzLCBbXCJ2YWxcIl0uY29uY2F0KEFycmF5LmZyb20oYXJndW1lbnRzKSkpO1xyXG59O1xyXG5cclxuSFRNTENvbGxlY3Rpb24uZnJvbSA9IGZ1bmN0aW9uKCl7XHJcblx0Y29uc3QgYXJncyA9IEFycmF5LmZyb20oYXJndW1lbnRzKTtcclxuXHRjb25zdCBkYXRhID0ge307XHJcblx0bGV0IGNvdW50ZXIgPSAwO1xyXG5cdFxyXG5cdHdoaWxlKGFyZ3MubGVuZ3RoID4gMCl7XHJcblx0XHRjb25zdCBhcmcgPSBhcmdzLnNoaWZ0KCk7XHJcblx0XHRpZih0eXBlb2YgYXJnICE9PSBcInVuZGVmaW5lZFwiICYmIGFyZyAhPSBudWxsKXtcclxuXHRcdFx0aWYoYXJnIGluc3RhbmNlb2YgSFRNTEVsZW1lbnQpXHJcblx0XHRcdFx0ZGF0YVtjb3VudGVyKytdID0ge3ZhbHVlOiBhcmcsIGVudW1lcmFibGU6IHRydWV9O1xyXG5cdFx0XHRlbHNlIGlmKGFyZyBpbnN0YW5jZW9mIEhUTUxDb2xsZWN0aW9uIHx8IGFyZyBpbnN0YW5jZW9mIE5vZGVMaXN0IHx8IGFyZyBpbnN0YW5jZW9mIEFycmF5KXtcclxuXHRcdFx0XHRmb3IobGV0IGkgPSAwOyBpIDwgYXJnLmxlbmd0aDsgaSsrKXtcclxuXHRcdFx0XHRcdGlmKGFyZ1tpXSAmJiBhcmdbaV0gaW5zdGFuY2VvZiBIVE1MRWxlbWVudCl7XHJcblx0XHRcdFx0XHRcdGRhdGFbY291bnRlcisrXSA9IHt2YWx1ZTogYXJnW2ldLCBlbnVtZXJhYmxlOiB0cnVlfTtcclxuXHRcdFx0XHRcdH1cclxuXHRcdFx0XHR9XHJcblx0XHRcdH1cclxuXHRcdH1cclxuXHR9XHJcblx0XHJcblx0ZGF0YS5sZW5ndGggPSB7dmFsdWU6IGNvdW50ZXJ9O1xyXG5cdHJldHVybiAgT2JqZWN0LmNyZWF0ZShIVE1MQ29sbGVjdGlvbi5wcm90b3R5cGUsIGRhdGEpO1xyXG59O1xyXG5cclxuXHJcbkRlbGVnYXRlckJ1aWxkZXIoZnVuY3Rpb24oYUZ1bmN0aW9uTmFtZSwgdGhlQXJndW1lbnRzKSB7XHJcblx0bGV0IHJlc3VsdHMgPSBbXTtcdFxyXG5cdHRoaXMuZm9yRWFjaChub2RlID0+IHtcclxuXHRcdGlmKG5vZGUgJiYgdHlwZW9mIG5vZGVbYUZ1bmN0aW9uTmFtZV0gPT09IFwiZnVuY3Rpb25cIil7XHJcblx0XHRcdGxldCByZXN1bHQgPSBub2RlW2FGdW5jdGlvbk5hbWVdLmFwcGx5KG5vZGUsIHRoZUFyZ3VtZW50cyk7XHJcblx0XHRcdGlmKHJlc3VsdCl7IFxyXG5cdFx0XHRcdGlmKHJlc3VsdCBpbnN0YW5jZW9mIEhUTUxDb2xsZWN0aW9uKVxyXG5cdFx0XHRcdFx0cmVzdWx0cyA9IHJlc3VsdHMuY29uY2F0KEFycmF5LmZyb20ocmVzdWx0KSk7XHJcblx0XHRcdFx0ZWxzZVxyXG5cdFx0XHRcdFx0cmVzdWx0cy5wdXNoKHJlc3VsdCk7XHJcblx0XHRcdH1cdFx0XHJcblx0XHR9XHJcblx0fSk7XHJcblx0XHJcblx0aWYocmVzdWx0cy5sZW5ndGggPT09IDApXHJcblx0XHRyZXR1cm4gdW5kZWZpbmVkO1xyXG5cdGVsc2UgaWYocmVzdWx0c1swXSBpbnN0YW5jZW9mIEhUTUxFbGVtZW50IHx8IHJlc3VsdHNbMF0gaW5zdGFuY2VvZiBIVE1MQ29sbGVjdGlvbilcclxuXHRcdHJldHVybiBIVE1MQ29sbGVjdGlvbi5mcm9tLmFwcGx5KG51bGwsIHJlc3VsdHMpO1xyXG5cdGVsc2VcclxuXHRcdHJldHVybiByZXN1bHRzO1xyXG59LEhUTUxDb2xsZWN0aW9uLnByb3RvdHlwZSwgTm9kZS5wcm90b3R5cGUsIEhUTUxFbGVtZW50LnByb3RvdHlwZSwgSFRNTElucHV0RWxlbWVudC5wcm90b3R5cGUsIEVsZW1lbnQucHJvdG90eXBlLCBFdmVudFRhcmdldC5wcm90b3R5cGUpO1xyXG4iLCJpbXBvcnQgZXh0ZW5kUHJvdG90eXBlIGZyb20gXCIuLi91dGlscy9FeHRlbmRQcm90b3R5cGVcIjtcclxuaW1wb3J0IERhdGFTdXBwb3J0IGZyb20gXCIuL2V4dGVudGlvbnMvRGF0YVN1cHBvcnRcIjtcclxuaW1wb3J0IE1hbmlwdWxhdGlvblN1cHBvcnQgZnJvbSBcIi4vZXh0ZW50aW9ucy9NYW5pcHVsYXRpb25TdXBwb3J0XCI7XHJcblxyXG5leHRlbmRQcm90b3R5cGUoTm9kZSxEYXRhU3VwcG9ydCxNYW5pcHVsYXRpb25TdXBwb3J0KTsiLCJpbXBvcnQgZXh0ZW5kUHJvdG90eXBlIGZyb20gXCIuLi91dGlscy9FeHRlbmRQcm90b3R5cGVcIjtcclxuaW1wb3J0IERlbGVnYXRlckJ1aWxkZXIgZnJvbSBcIi4uL3V0aWxzL0RlbGVnYXRlckJ1aWxkZXJcIjtcclxuaW1wb3J0IExpc3RTdXBwb3J0IGZyb20gXCIuL2V4dGVudGlvbnMvTGlzdFN1cHBvcnRcIjtcclxuXHJcbmV4dGVuZFByb3RvdHlwZShOb2RlTGlzdCwgTGlzdFN1cHBvcnQpO1xyXG5cclxuTm9kZUxpc3QucHJvdG90eXBlLmFwcGx5VG8gPSBmdW5jdGlvbigpe1xyXG5cdGNvbnN0IGFyZ3MgPSBBcnJheS5mcm9tKGFyZ3VtZW50cyk7XHJcblx0Y29uc3QgY2FsbGluZyA9IGFyZ3Muc2hpZnQoKTtcclxuXHRjb25zdCBpc0Z1bmN0aW9uID0gdHlwZW9mIGNhbGxpbmcgPT09IFwiZnVuY3Rpb25cIjtcclxuXHRjb25zdCByZXN1bHRzID0gW107XHJcblx0Zm9yKGxldCBpID0gMDsgaSA8IHRoaXMubGVuZ3RoOyBpKyspe1xyXG5cdFx0Y29uc3Qgbm9kZSA9IHRoaXNbaV07XHJcblx0XHRsZXRcdHJlc3VsdDtcclxuXHRcdGlmKGlzRnVuY3Rpb24pXHJcblx0XHRcdHJlc3VsdCA9IGNhbGxpbmcuYXBwbHkoW25vZGVdLmNvbmNhdChhcmdzKSk7XHJcblx0XHRlbHNlIGlmKHR5cGVvZiBub2RlW2NhbGxpbmddID09PSBcImZ1bmN0aW9uXCIpXHJcblx0XHRcdHJlc3VsdCA9IG5vZGVbY2FsbGluZ10uYXBwbHkobm9kZSwgYXJncyk7XHJcblx0XHRcclxuXHRcdGlmKHJlc3VsdClcclxuXHRcdFx0cmVzdWx0cy5wdXNoKHJlc3VsdCk7XHJcblx0fVxyXG5cdFxyXG5cdHJldHVybiByZXN1bHRzO1xyXG59O1xyXG5cclxuTm9kZUxpc3QucHJvdG90eXBlLnZhbCA9IGZ1bmN0aW9uKCkge1xyXG5cdGlmKGFyZ3VtZW50cy5sZW5ndGggPT0gMCl7XHJcblx0XHRpZih0aGlzLmxlbmd0aCA+IDApe1xyXG5cdFx0XHRjb25zdCByZXN1bHQgPSBuZXcgTWFwKCk7XHJcblx0XHRcdHRoaXMuZm9yRWFjaChub2RlID0+IHtcclxuXHRcdFx0XHRpZih0eXBlb2Ygbm9kZS52YWwgPT09IFwiZnVuY3Rpb25cIil7XHJcblx0XHRcdFx0XHRjb25zdCB2YWx1ZSA9IG5vZGUudmFsKCk7XHJcblx0XHRcdFx0XHRpZih2YWx1ZSlcclxuXHRcdFx0XHRcdFx0cmVzdWx0LnNldCgobm9kZS5uYW1lIHx8IG5vZGUuaWQgfHwgbm9kZS5zZWxlY3RvcigpKSwgbm9kZS52YWwoKSk7XHJcblx0XHRcdFx0fVxyXG5cdFx0XHR9KTtcdFxyXG5cdFx0XHRyZXR1cm4gcmVzdWx0O1xyXG5cdFx0fVxyXG5cdH1cclxuXHRlbHNlXHJcblx0XHROb2RlTGlzdC5wcm90b3R5cGUuYXBwbHlUby5hcHBseSh0aGlzLCBbXCJ2YWxcIl0uY29uY2F0KEFycmF5LmZyb20oYXJndW1lbnRzKSkpO1xyXG59O1xyXG5cclxuTm9kZUxpc3QuZnJvbSA9IGZ1bmN0aW9uKCl7XHJcblx0Y29uc3QgYXJncyA9IEFycmF5LmZyb20oYXJndW1lbnRzKTtcclxuXHRjb25zdCBkYXRhID0ge307XHJcblx0bGV0IGNvdW50ZXIgPSAwO1xyXG5cdFxyXG5cdHdoaWxlKGFyZ3MubGVuZ3RoID4gMCl7XHJcblx0XHRjb25zdCBhcmcgPSBhcmdzLnNoaWZ0KCk7XHJcblx0XHRpZih0eXBlb2YgYXJnICE9PSBcInVuZGVmaW5lZFwiICYmIGFyZyAhPSBudWxsKXtcclxuXHRcdFx0aWYoYXJnIGluc3RhbmNlb2YgTm9kZSlcclxuXHRcdFx0XHRkYXRhW2NvdW50ZXIrK10gPSB7dmFsdWU6IGFyZywgZW51bWVyYWJsZTogdHJ1ZX07XHJcblx0XHRcdGVsc2UgaWYoYXJnIGluc3RhbmNlb2YgTm9kZUxpc3QgfHwgYXJnIGluc3RhbmNlb2YgSFRNTENvbGxlY3Rpb24gfHwgYXJnIGluc3RhbmNlb2YgQXJyYXkpe1xyXG5cdFx0XHRcdGZvcihsZXQgaSA9IDA7IGkgPCBhcmcubGVuZ3RoOyBpKyspe1xyXG5cdFx0XHRcdFx0aWYoYXJnW2ldICYmIGFyZ1tpXSBpbnN0YW5jZW9mIE5vZGUpe1xyXG5cdFx0XHRcdFx0XHRkYXRhW2NvdW50ZXIrK10gPSB7dmFsdWU6IGFyZ1tpXSwgZW51bWVyYWJsZTogdHJ1ZX07XHJcblx0XHRcdFx0XHR9XHJcblx0XHRcdFx0fVxyXG5cdFx0XHR9XHJcblx0XHR9XHJcblx0fVxyXG5cdFxyXG5cdGRhdGEubGVuZ3RoID0ge3ZhbHVlOiBjb3VudGVyfTtcclxuXHRyZXR1cm4gIE9iamVjdC5jcmVhdGUoTm9kZUxpc3QucHJvdG90eXBlLCBkYXRhKTtcclxufTtcclxuXHJcblxyXG5EZWxlZ2F0ZXJCdWlsZGVyKGZ1bmN0aW9uKGFGdW5jdGlvbk5hbWUsIHRoZUFyZ3VtZW50cykge1xyXG5cdGxldCByZXN1bHRzID0gW107XHRcclxuXHR0aGlzLmZvckVhY2gobm9kZSA9PiB7XHJcblx0XHRpZihub2RlICYmIHR5cGVvZiBub2RlW2FGdW5jdGlvbk5hbWVdID09PSBcImZ1bmN0aW9uXCIpe1xyXG5cdFx0XHRjb25zdCByZXN1bHQgPSBub2RlW2FGdW5jdGlvbk5hbWVdLmFwcGx5KG5vZGUsIHRoZUFyZ3VtZW50cyk7XHJcblx0XHRcdGlmKHJlc3VsdCl7IFxyXG5cdFx0XHRcdGlmKHJlc3VsdCBpbnN0YW5jZW9mIE5vZGVMaXN0KVxyXG5cdFx0XHRcdFx0cmVzdWx0cyA9IHJlc3VsdHMuY29uY2F0KEFycmF5LmZyb20ocmVzdWx0KSk7XHJcblx0XHRcdFx0ZWxzZVxyXG5cdFx0XHRcdFx0cmVzdWx0cy5wdXNoKHJlc3VsdCk7XHJcblx0XHRcdH1cdFx0XHJcblx0XHR9XHJcblx0fSk7XHJcblx0XHJcblx0aWYocmVzdWx0cy5sZW5ndGggPT09IDApXHJcblx0XHRyZXR1cm4gdW5kZWZpbmVkO1xyXG5cdGVsc2UgaWYocmVzdWx0c1swXSBpbnN0YW5jZW9mIE5vZGUgfHwgcmVzdWx0c1swXSBpbnN0YW5jZW9mIE5vZGVMaXN0KVxyXG5cdFx0cmV0dXJuIE5vZGVMaXN0LmZyb20ocmVzdWx0cyk7XHJcblx0ZWxzZVxyXG5cdFx0cmV0dXJuIHJlc3VsdHM7XHJcbn0sTm9kZUxpc3QucHJvdG90eXBlLCBOb2RlLnByb3RvdHlwZSwgSFRNTEVsZW1lbnQucHJvdG90eXBlLCBIVE1MSW5wdXRFbGVtZW50LnByb3RvdHlwZSwgRWxlbWVudC5wcm90b3R5cGUsIEV2ZW50VGFyZ2V0LnByb3RvdHlwZSk7XHJcbiIsImltcG9ydCBFeHRlbmRlciBmcm9tIFwiLi4vLi4vdXRpbHMvRXh0ZW5kZXJcIjtcclxuXHJcbmNvbnN0IHN1cHBvcnQgPSBFeHRlbmRlcihcIkF0dHJpYnV0ZVN1cHBvcnRcIiwgUHJvdG90eXBlID0+IHtcclxuXHRQcm90b3R5cGUuYXR0ciA9IGZ1bmN0aW9uKCkge1xyXG5cdFx0aWYgKGFyZ3VtZW50cy5sZW5ndGggPT0gMClcclxuXHRcdFx0cmV0dXJuIHRoaXMuaGFzQXR0cmlidXRlcygpID8gKCgpID0+IHtcclxuXHRcdFx0XHRjb25zdCByZXN1bHQgPSB7fTtcclxuXHRcdFx0XHR0aGlzLmdldEF0dHJpYnV0ZU5hbWVzKCkuZm9yRWFjaChuYW1lID0+IHtcclxuXHRcdFx0XHRcdHJlc3VsdFtuYW1lXSA9IHRoaXMuZ2V0QXR0cmlidXRlKG5hbWUpO1xyXG5cdFx0XHRcdH0pO1xyXG5cdFx0XHRcdHJldHVybiByZXN1bHQ7XHJcblx0XHRcdH0pKCkgOiB1bmRlZmluZWQ7XHJcblx0XHRlbHNlIGlmIChhcmd1bWVudHMubGVuZ3RoID09IDEpXHJcblx0XHRcdHJldHVybiB0aGlzLmdldEF0dHJpYnV0ZShhcmd1bWVudHNbMF0pO1xyXG5cdFx0ZWxzZSBpZiAodHlwZW9mIGFyZ3VtZW50c1sxXSA9PT0gXCJ1bmRlZmluZWRcIiB8fCBhcmd1bWVudHNbMV0gPT0gbnVsbClcclxuXHRcdFx0dGhpcy5yZW1vdmVBdHRyaWJ1dGUoYXJndW1lbnRzWzBdKTtcclxuXHRcdGVsc2VcclxuXHRcdFx0dGhpcy5zZXRBdHRyaWJ1dGUoYXJndW1lbnRzWzBdLCBhcmd1bWVudHNbMV0pO1xyXG5cdFx0XHJcblx0XHRyZXR1cm4gdGhpcztcclxuXHR9O1xyXG59KTtcclxuZXhwb3J0IGRlZmF1bHQgc3VwcG9ydDsiLCJpbXBvcnQgRXh0ZW5kZXIgZnJvbSBcIi4uLy4uL3V0aWxzL0V4dGVuZGVyXCI7XHJcbmNvbnN0IHN1cHBvcnQgPSBFeHRlbmRlcihcIkRhdGFTdXBwb3J0XCIsIFByb3RvdHlwZSA9PiB7XHJcblx0UHJvdG90eXBlLmRhdGEgPSBmdW5jdGlvbigpIHtcclxuXHRcdGNvbnN0IGRhdGEgPSB7fTtcclxuXHRcdGlmICh0eXBlb2YgdGhpcy5kYXRhc2V0ICE9PSBcInVuZGVmaW5lZFwiKVxyXG5cdFx0XHRmb3IgKG5hbWUgaW4gdGhpcy5kYXRhc2V0KVxyXG5cdFx0XHRcdGRhdGFbbmFtZV0gPSB0aGlzLmRhdGFzZXRbbmFtZV07XHJcblxyXG5cdFx0dGhpcy5kYXRhID0gKGZ1bmN0aW9uKCkge1xyXG5cdFx0XHRpZiAoYXJndW1lbnRzLmxlbmd0aCA9PSAwKVxyXG5cdFx0XHRcdHJldHVybiBkYXRhO1xyXG5cdFx0XHRlbHNlIGlmIChhcmd1bWVudHMubGVuZ3RoID09IDEpXHJcblx0XHRcdFx0cmV0dXJuIGRhdGFbYXJndW1lbnRzWzBdXTtcclxuXHRcdFx0ZWxzZSBpZiAodHlwZW9mIGFyZ3VtZW50c1sxXSA9PT0gXCJ1bmRlZmluZWRcIiB8fCBhcmd1bWVudHNbMV0gPT0gbnVsbClcclxuXHRcdFx0XHRkZWxldGUgZGF0YVthcmd1bWVudHNbMF1dO1xyXG5cdFx0XHRlbHNlXHJcblx0XHRcdFx0ZGF0YVthcmd1bWVudHNbMF1dID0gYXJndW1lbnRzWzFdO1xyXG5cclxuXHRcdFx0cmV0dXJuIHRoaXM7XHJcblx0XHR9KS5iaW5kKHRoaXMpO1xyXG5cclxuXHRcdHJldHVybiB0aGlzLmRhdGEuYXBwbHkobnVsbCwgYXJndW1lbnRzKTtcclxuXHR9O1xyXG59KTtcclxuZXhwb3J0IGRlZmF1bHQgc3VwcG9ydDsiLCJpbXBvcnQgRXh0ZW5kZXIgZnJvbSBcIi4uLy4uL3V0aWxzL0V4dGVuZGVyXCI7XHJcblxyXG5jb25zdCBERUZBVUxUX1RJTUVPVVQgPSAxMDA7XHJcbmNvbnN0IHN1cHBvcnQgPSBFeHRlbmRlcihcIkV2ZW50U3VwcG9ydFwiLCAoUHJvdG90eXBlKSA9PiB7XHJcblx0Y29uc3QgRVZFTlRTUExJVEVSID0gLyhcXHMrKXwoXFxzKixcXHMqKS87XHJcblx0Y29uc3QgZ2V0V3JhcHBlckhhbmRsZU1hcCA9IChlbGVtZW50KSA9PiB7XHJcblx0XHRpZiAoIWVsZW1lbnQuX193cmFwcGVyaGFuZGxlbWFwX18pXHJcblx0XHRcdGVsZW1lbnQuX193cmFwcGVyaGFuZGxlbWFwX18gPSBuZXcgTWFwKCk7XHJcblxyXG5cdFx0cmV0dXJuIGVsZW1lbnQuX193cmFwcGVyaGFuZGxlbWFwX187XHJcblx0fVxyXG5cclxuXHRjb25zdCBnZXRUcmlnZ2VyVGltZW91dHMgPSAoZWxlbWVudCkgPT4ge1xyXG5cdFx0aWYgKCFlbGVtZW50Ll9fX0VWRU5UVFJJR0dFUlRJTUVPVVRTX19fKSBlbGVtZW50Ll9fX0VWRU5UVFJJR0dFUlRJTUVPVVRTX19fID0ge307XHJcblxyXG5cdFx0cmV0dXJuIGVsZW1lbnQuX19fRVZFTlRUUklHR0VSVElNRU9VVFNfX187XHJcblx0fTtcclxuXHJcblx0Y29uc3QgcmVtb3ZlV3JhcHBlciA9IChlbGVtZW50LCBkYXRhLCBldmVudFR5cGVzKSA9PiB7XHJcblx0XHRjb25zdCB7IHdyYXBwZXIsIG9wdGlvbiwgZXZlbnRzLCBoYW5kbGUgfSA9IGRhdGE7XHJcblx0XHRjb25zdCBjYXB0dXJlID0gb3B0aW9uLmNhcHR1cmU7XHJcblx0XHRpZihldmVudFR5cGVzKXtcclxuXHRcdFx0ZXZlbnRUeXBlcyA9IHR5cGVvZiBldmVudFR5cGVzID09PSBcInN0cmluZ1wiID8gZXZlbnRUeXBlcy5zcGxpdChFVkVOVFNQTElURVIpIDogZXZlbnRUeXBlcztcclxuXHRcdFx0Zm9yIChsZXQgZXZlbnQgb2YgZXZlbnRUeXBlcykge1xyXG5cdFx0XHRcdGNvbnN0IGluZGV4ID0gZXZlbnRzLmluZGV4T2YoZXZlbnQpO1xyXG5cdFx0XHRcdGlmKGluZGV4ID49IDApIHtcclxuXHRcdFx0XHRcdGVsZW1lbnQucmVtb3ZlRXZlbnRMaXN0ZW5lcihldmVudCwgd3JhcHBlciwgY2FwdHVyZSk7XHJcblx0XHRcdFx0XHRldmVudHMuc3BsaWNlKGluZGV4LCAxKTtcclxuXHRcdFx0XHR9XHJcblx0XHRcdFx0aWYoZXZlbnRzLmxlbmd0aCA9PSAwKVx0XHRcdFx0XHJcblx0XHRcdFx0XHRnZXRXcmFwcGVySGFuZGxlTWFwKGVsZW1lbnQpLmRlbGV0ZShoYW5kbGUpO1xyXG5cdFx0XHR9XHJcblx0XHRcdFxyXG5cdFx0fWVsc2V7XHJcblx0XHRcdGZvciAobGV0IGV2ZW50IG9mIGV2ZW50cykge1xyXG5cdFx0XHRcdGVsZW1lbnQucmVtb3ZlRXZlbnRMaXN0ZW5lcihldmVudCwgd3JhcHBlciwgY2FwdHVyZSk7XHJcblx0XHRcdH1cclxuXHRcdFx0Z2V0V3JhcHBlckhhbmRsZU1hcChlbGVtZW50KS5kZWxldGUoaGFuZGxlKTtcclxuXHRcdH1cdFx0XHJcblx0fVxyXG5cclxuXHRQcm90b3R5cGUub24gPSBmdW5jdGlvbigpIHtcclxuXHRcdGlmIChhcmd1bWVudHMubGVuZ3RoIDwgMikgdGhyb3cgbmV3IEVycm9yKFwiVG9vIGxlc3MgYXJndW1lbnRzIVwiKTtcclxuXHJcblx0XHRjb25zdCBhcmdzID0gQXJyYXkuZnJvbShhcmd1bWVudHMpO1xyXG5cdFx0bGV0IGV2ZW50cyA9IHR5cGVvZiBhcmdzWzBdID09PSBcInN0cmluZ1wiID8gYXJncy5zaGlmdCgpLnNwbGl0KEVWRU5UU1BMSVRFUikgOiBhcmdzLnNoaWZ0KCk7XHJcblx0XHRjb25zdCBmaWx0ZXIgPSB0eXBlb2YgYXJnc1swXSA9PT0gXCJzdHJpbmdcIiA/IGFyZ3Muc2hpZnQoKSA6IG51bGw7XHJcblx0XHRjb25zdCBoYW5kbGUgPSBhcmdzLnNoaWZ0KCk7XHJcblx0XHRjb25zdCBvcHRpb24gPSB0eXBlb2YgYXJnc1swXSA9PT0gXCJ1bmRlZmluZWRcIiA/IHsgY2FwdHVyZTogZmFsc2UsIG9uY2U6IGZhbHNlLCBwYXNzaXZlOiBmYWxzZSB9IDogKHR5cGVvZiBhcmdzWzBdID09PSBcImJvb2xlYW5cIiA/IHsgY2FwdHVyZTogYXJncy5zaGlmdCgpLCBvbmNlOiBmYWxzZSwgcGFzc2l2ZTogZmFsc2UgfSA6IGFyZ3Muc2hpZnQoKSk7XHJcblx0XHRjb25zdCB3cmFwcGVyID0gZnVuY3Rpb24oYUV2ZW50KSB7XHJcblx0XHRcdGlmIChmaWx0ZXIpIHtcclxuXHRcdFx0XHRjb25zdCB0YXJnZXQgPSBldmVudC50YXJnZXQ7XHJcblx0XHRcdFx0aWYgKHR5cGVvZiB0YXJnZXQuaXMgPT09IFwiZnVuY3Rpb25cIiAmJiAhYUV2ZW50LnRhcmdldC5pcyhmaWx0ZXIpKSByZXR1cm4gdHJ1ZTtcclxuXHRcdFx0fVxyXG5cdFx0XHRjb25zdCByZXN1bHQgPSBoYW5kbGUuYXBwbHkobnVsbCwgYXJndW1lbnRzKTtcclxuXHRcdFx0aWYgKG9wdGlvbi5vbmNlKSByZW1vdmVXcmFwcGVyKHRoaXMsIHdyYXBwZXIpO1xyXG5cdFx0XHRyZXR1cm4gcmVzdWx0O1xyXG5cdFx0fTtcclxuXHJcblx0XHRnZXRXcmFwcGVySGFuZGxlTWFwKHRoaXMpLnNldChoYW5kbGUsIHsgaGFuZGxlLCB3cmFwcGVyOiB3cmFwcGVyLCBldmVudHMsIG9wdGlvbiB9KTtcclxuXHJcblx0XHRmb3IgKGxldCBldmVudCBvZiBldmVudHMpIHtcclxuXHRcdFx0dGhpcy5hZGRFdmVudExpc3RlbmVyKGV2ZW50LCB3cmFwcGVyLCBvcHRpb24pO1xyXG5cdFx0fVxyXG5cclxuXHRcdHJldHVybiB0aGlzO1xyXG5cdH07XHJcblxyXG5cclxuXHRQcm90b3R5cGUucmVtb3ZlT24gPSBmdW5jdGlvbihoYW5kbGUsIGV2ZW50LCBjYXB0dXJlKSB7XHJcblx0XHRjb25zdCBkYXRhID0gZ2V0V3JhcHBlckhhbmRsZU1hcCh0aGlzKS5nZXQoaGFuZGxlKTtcclxuXHRcdGlmIChkYXRhKSBcclxuXHRcdFx0cmVtb3ZlV3JhcHBlcih0aGlzLCBkYXRhLCBldmVudCk7XHJcblx0XHRlbHNlXHJcblx0XHRcdHRoaXMucmVtb3ZlRXZlbnRMaXN0ZW5lcihoYW5kbGUsIGV2ZW50LCBjYXB0dXJlKTtcclxuXHJcblx0XHRyZXR1cm4gdGhpcztcclxuXHR9O1xyXG5cclxuXHRQcm90b3R5cGUudHJpZ2dlciA9IGZ1bmN0aW9uKCkge1xyXG5cdFx0Y29uc3QgYXJncyA9IEFycmF5LmZyb20oYXJndW1lbnRzKTtcclxuXHRcdGNvbnN0IHRpbWVvdXQgPSB0eXBlb2YgYXJnc1swXSA9PT0gXCJudW1iZXJcIiA/IGFyZ3Muc2hpZnQoKSA6IC0xO1xyXG5cdFx0aWYgKHRpbWVvdXQgPj0gMCkge1xyXG5cdFx0XHRjb25zdCB0eXBlID0gYXJnc1swXTtcclxuXHRcdFx0Y29uc3QgdGltZW91dHMgPSBnZXRUcmlnZ2VyVGltZW91dHModGhpcyk7XHJcblx0XHRcdGNvbnN0IHRpbWVvdXRpZCA9IHRpbWVvdXRzW3R5cGVdO1xyXG5cdFx0XHRpZiAodGltZW91dGlkKSBjbGVhclRpbWVvdXQodGltZW91dGlkKTtcclxuXHJcblx0XHRcdHRpbWVvdXRzW3R5cGVdID0gc2V0VGltZW91dCgoKSA9PiB7XHJcblx0XHRcdFx0ZGVsZXRlIHRpbWVvdXRzW3R5cGVdO1xyXG5cdFx0XHRcdHRoaXMudHJpZ2dlci5hcHBseSh0aGlzLCBhcmdzKTtcclxuXHRcdFx0fSwgdGltZW91dCk7XHJcblx0XHR9IGVsc2Uge1xyXG5cdFx0XHRjb25zdCB0eXBlID0gYXJncy5zaGlmdCgpO1xyXG5cdFx0XHRjb25zdCBkZWxlZ2F0ZSA9IGFyZ3NbMF0gaW5zdGFuY2VvZiBFdmVudCA/IGFyZ3Muc2hpZnQoKSA6IG51bGw7XHJcblx0XHRcdGNvbnN0IGRhdGEgPSBhcmdzLmxlbmd0aCA+PSAxID8gKGFyZ3MubGVuZ3RoID09IDAgPyBhcmdzLnNoaWZ0KCkgOiBhcmdzKSA6IGRlbGVnYXRlO1xyXG5cdFx0XHRjb25zdCBldmVudCA9IGRhdGEgPyBuZXcgQ3VzdG9tRXZlbnQodHlwZSwgeyBidWJibGVzOiB0cnVlLCBjYW5jZWxhYmxlOiB0cnVlLCBkZXRhaWw6IGRhdGEgfSkgOiBuZXcgRXZlbnQodHlwZSwgeyBidWJibGVzOiB0cnVlLCBjYW5jZWxhYmxlOiB0cnVlIH0pO1xyXG5cclxuXHRcdFx0aWYgKGRlbGVnYXRlKSBldmVudC5kZWxlZ2F0ZWRFdmVudCA9IGRlbGVnYXRlO1xyXG5cdFx0XHR0aGlzLmRpc3BhdGNoRXZlbnQoZXZlbnQpO1xyXG5cdFx0fVxyXG5cdFx0cmV0dXJuIHRoaXM7XHJcblx0fTtcclxufSk7XHJcbmV4cG9ydCBkZWZhdWx0IHN1cHBvcnQ7XHJcbiIsImltcG9ydCBFeHRlbmRlciBmcm9tIFwiLi4vLi4vdXRpbHMvRXh0ZW5kZXJcIjtcclxuXHJcbmNvbnN0IHN1cHBvcnQgPSBFeHRlbmRlcihcIkh0bWxDbGFzc1N1cHBvcnRcIiwgUHJvdG90eXBlID0+IHtcdFxyXG5cdFByb3RvdHlwZS5hZGRDbGFzcyA9IGZ1bmN0aW9uKCkge1xyXG5cdFx0aWYoYXJndW1lbnRzLmxlbmd0aCA9PSAxKVxyXG5cdFx0XHRhcmd1bWVudHNbMF0uc3BsaXQoL1xccysvKS5mb3JFYWNoKGNsYXp6ID0+IHRoaXMuY2xhc3NMaXN0LmFkZChjbGF6eikpO1xyXG5cdFx0ZWxzZSBpZihhcmd1bWVudHMubGVuZ3RoID4gMSlcclxuXHRcdFx0QXJyYXkucHJvdG90eXBlLmZvckVhY2guY2FsbChhcmd1bWVudHMsY2xhenogPT4gdGhpcy5jbGFzc0xpc3QuYWRkKGNsYXp6KSk7XHJcblx0XHRcclxuXHRcdHJldHVybiB0aGlzO1xyXG5cdH07XHJcblx0XHJcblx0UHJvdG90eXBlLnJlbW92ZUNsYXNzID0gZnVuY3Rpb24oKSB7XHJcblx0XHRpZihhcmd1bWVudHMubGVuZ3RoID09IDEpXHJcblx0XHRcdGFyZ3VtZW50c1swXS5zcGxpdCgvXFxzKy8pLmZvckVhY2goY2xhenogPT4gdGhpcy5jbGFzc0xpc3QucmVtb3ZlKGNsYXp6KSk7XHJcblx0XHRlbHNlIGlmKGFyZ3VtZW50cy5sZW5ndGggPiAxKVxyXG5cdFx0XHRBcnJheS5wcm90b3R5cGUuZm9yRWFjaC5jYWxsKGFyZ3VtZW50cywgY2xhenogPT4gdGhpcy5jbGFzc0xpc3QucmVtb3ZlKGNsYXp6KSk7XHJcblx0XHRcclxuXHRcdHJldHVybiB0aGlzO1x0XHRcclxuXHR9O1xyXG5cdFxyXG5cdFByb3RvdHlwZS50b2dnbGVDbGFzcyA9IGZ1bmN0aW9uKCkge1xyXG5cdFx0aWYoYXJndW1lbnRzLmxlbmd0aCA9PSAxKVxyXG5cdFx0XHRhcmd1bWVudHNbMF0uc3BsaXQoL1xccysvKS5mb3JFYWNoKGNsYXp6ID0+IHRoaXMuY2xhc3NMaXN0LnRvZ2dsZShjbGF6eikpO1xyXG5cdFx0ZWxzZSBpZihhcmd1bWVudHMubGVuZ3RoID4gMSlcclxuXHRcdFx0QXJyYXkucHJvdG90eXBlLmZvckVhY2guY2FsbChhcmd1bWVudHMsIGNsYXp6ID0+IHRoaXMuY2xhc3NMaXN0LnRvZ2dsZShjbGF6eikpO1xyXG5cdFx0XHJcblx0XHRyZXR1cm4gdGhpcztcclxuXHR9O1xyXG59KTtcclxuZXhwb3J0IGRlZmF1bHQgc3VwcG9ydDsiLCJpbXBvcnQgRXh0ZW5kZXIgZnJvbSBcIi4uLy4uL3V0aWxzL0V4dGVuZGVyXCI7XHJcblxyXG5jb25zdCBzdXBwb3J0ID0gRXh0ZW5kZXIoXCJMaXN0U3VwcG9ydFwiLCBQcm90b3R5cGUgPT4ge1x0XHRcclxuXHRQcm90b3R5cGUuaW5kZXhPZiA9IGZ1bmN0aW9uKCkge1xyXG5cdFx0Zm9yKGxldCBpID0gMDsgaSA8IHRoaXMubGVuZ3RoOyBpKyspXHJcblx0XHRcdGlmKHRoaXNbaV0gPT0gYXJndW1lbnRzWzBdKVxyXG5cdFx0XHRcdHJldHVybiBpO1xyXG5cdFx0XHJcblx0XHRyZXR1cm4gLTE7XHJcblx0fTtcclxuXHJcblx0UHJvdG90eXBlLmZvckVhY2ggPSBmdW5jdGlvbigpe1xyXG5cdFx0cmV0dXJuIEFycmF5LnByb3RvdHlwZS5mb3JFYWNoLmFwcGx5KEFycmF5LmZyb20odGhpcyksIGFyZ3VtZW50cyk7XHJcblx0fTtcclxuXHRcclxuXHRQcm90b3R5cGUubWFwID0gZnVuY3Rpb24oKXtcclxuXHRcdHJldHVybiBBcnJheS5wcm90b3R5cGUubWFwLmFwcGx5KEFycmF5LmZyb20odGhpcyksIGFyZ3VtZW50cyk7XHJcblx0fTtcclxuXHRcclxuXHRQcm90b3R5cGUuZmlsdGVyID0gZnVuY3Rpb24oKXtcclxuXHRcdHJldHVybiBBcnJheS5wcm90b3R5cGUuZmlsdGVyLmFwcGx5KEFycmF5LmZyb20odGhpcyksIGFyZ3VtZW50cyk7XHJcblx0fTtcclxuXHJcblx0UHJvdG90eXBlLmZpcnN0ID0gZnVuY3Rpb24oKXtcclxuXHRcdGlmKHRoaXMubGVuZ3RoID4gMClcclxuXHRcdFx0cmV0dXJuIHRoaXNbMF07XHJcblx0fTtcdFxyXG5cdFxyXG5cdFByb3RvdHlwZS5sYXN0ID0gZnVuY3Rpb24oKXtcclxuXHRcdGlmKHRoaXMubGVuZ3RoID4gMClcclxuXHRcdFx0cmV0dXJuIHRoaXNbdGhpcy5sZW5ndGggLSAxXTtcclxuXHR9O1xyXG59KTtcclxuZXhwb3J0IGRlZmF1bHQgc3VwcG9ydDsiLCJpbXBvcnQgRXh0ZW5kZXIgZnJvbSBcIi4uLy4uL3V0aWxzL0V4dGVuZGVyXCI7XHJcbmltcG9ydCBVdGlscyBmcm9tIFwiLi4vLi4vdXRpbHMvVXRpbHNcIjtcclxuXHJcbmNvbnN0IHN1cHBvcnQgPSBFeHRlbmRlcihcIk1hbmlwdWxhdGlvblN1cHBvcnRcIiwgUHJvdG90eXBlID0+IHtcdFxyXG5cdFByb3RvdHlwZS5lbXB0eSA9IGZ1bmN0aW9uKCl7XHJcblx0XHRsZXQgbm9kZXMgPSB0aGlzLmNoaWxkTm9kZXNcclxuXHRcdHdoaWxlKG5vZGVzLmxlbmd0aCAhPSAwKVx0XHRcdFxyXG5cdFx0XHRub2Rlc1swXS5yZW1vdmUodHJ1ZSk7XHJcblx0XHRcclxuXHRcdHJldHVybiB0aGlzO1xyXG5cdH07XHJcblx0XHJcblx0UHJvdG90eXBlLmNvbnRlbnQgPSBmdW5jdGlvbigpe1xyXG5cdFx0cmV0dXJuIHRoaXMuY2hpbGROb2RlcztcclxuXHR9O1x0XHJcblx0XHJcblx0UHJvdG90eXBlLmh0bWwgPSBmdW5jdGlvbigpe1xyXG5cdFx0aWYoYXJndW1lbnRzLmxlbmd0aCA9PSAwKVx0XHRcdFxyXG5cdFx0XHRyZXR1cm4gdGhpcy5pbm5lckhUTUw7XHJcblx0XHRlbHNlIGlmKGFyZ3VtZW50cy5sZW5ndGggPT0gMSAmJiB0eXBlb2YgYXJndW1lbnRzWzBdID09PSBcImJvb2xlYW5cIilcclxuXHRcdFx0aWYoYXJndW1lbnRzWzBdKVxyXG5cdFx0XHRcdHJldHVybiB0aGlzLm91dGVySFRNTDtcclxuXHRcdFx0ZWxzZVxyXG5cdFx0XHRcdHJldHVybiB0aGlzLmlubmVySFRNTDtcclxuXHRcdGVsc2UgXHJcblx0XHRcdEFycmF5LmZyb20oYXJndW1lbnRzKS5mb3JFYWNoKGNvbnRlbnQgPT4ge1xyXG5cdFx0XHRcdHRoaXMuZW1wdHkoKTtcclxuXHRcdFx0XHRpZih0eXBlb2YgY29udGVudCA9PT0gXCJzdHJpbmdcIilcclxuXHRcdFx0XHRcdHRoaXMuYXBwZW5kKGNvbnRlbnQpO1xyXG5cdFx0XHRcdGVsc2UgaWYoY29udGVudCBpbnN0YW5jZW9mIE5vZGUgfHwgY29udGVudCBpbnN0YW5jZW9mIE5vZGVMaXN0IHx8IGNvbnRlbnQgaW5zdGFuY2VvZiBIVE1MQ29sbGVjdGlvbil7XHJcblx0XHRcdFx0XHR0aGlzLmFwcGVuZChjb250ZW50KTtcclxuXHRcdFx0XHR9XHJcblx0XHRcdH0pO1x0XHRcclxuXHRcdFx0XHJcblx0XHRyZXR1cm4gdGhpcztcclxuXHR9O1xyXG5cdFxyXG5cdGNvbnN0IGFwcGVuZCA9IGZ1bmN0aW9uKCl7XHJcblx0XHRjb25zdCBhcHBlbmQgPSBQcm90b3R5cGUuYXBwZW5kQ2hpbGQuYmluZCh0aGlzKTtcclxuXHRcdGZvcihsZXQgaSA9IDA7IGkgPCBhcmd1bWVudHMubGVuZ3RoOyBpKyspe1xyXG5cdFx0XHRsZXQgYXJnID0gYXJndW1lbnRzW2ldO1xyXG5cdFx0XHRpZihhcmcgaW5zdGFuY2VvZiBOb2RlKVxyXG5cdFx0XHRcdHRoaXMuYXBwZW5kQ2hpbGQoYXJnKTtcclxuXHRcdFx0ZWxzZSBpZih0eXBlb2YgYXJnID09PSBcInN0cmluZ1wiKVxyXG5cdFx0XHRcdGNyZWF0ZShhcmcpLmZvckVhY2goYXBwZW5kKTtcclxuXHRcdFx0ZWxzZSBpZih0eXBlb2YgYXJnLmZvckVhY2ggPT09IFwiZnVuY3Rpb25cIilcclxuXHRcdFx0XHRhcmcuZm9yRWFjaChhcHBlbmQpO1xyXG5cdFx0fVxyXG5cdH07XHRcclxuXHRQcm90b3R5cGUuYXBwZW5kID0gYXBwZW5kO1xyXG5cdFxyXG5cdGNvbnN0IHByZXBlbmQgPSBmdW5jdGlvbihhRmlyc3RFbGVtZW50LCBhRWxlbWVudCl7XHJcblx0XHR0aGlzLmluc2VydEJlZm9yZShhRWxlbWVudCwgYUZpcnN0RWxlbWVudCk7XHJcblx0fTtcclxuXHRQcm90b3R5cGUucHJlcGVuZCA9IGZ1bmN0aW9uKCl7XHJcblx0XHRpZih0aGlzLmNoaWxkTm9kZXMubGVuZ3RoID09IDApXHJcblx0XHRcdGFwcGVuZC5hcHBseSh0aGlzLCBhcmd1bWVudHMpO1xyXG5cdFx0ZWxzZSB7XHJcblx0XHRcdGNvbnN0IGZpcnN0ID0gdGhpcy5jaGlsZE5vZGVzLmZpcnN0KCk7XHJcblx0XHRcdGNvbnN0IGluc2VydCA9IHByZXBlbmQuYmluZCh0aGlzLCBmaXJzdCk7XHJcblx0XHRcdGZvcihsZXQgaSA9IDA7IGkgPCBhcmd1bWVudHMubGVuZ3RoOyBpKyspe1xyXG5cdFx0XHRcdGNvbnN0IGFyZyA9IGFyZ3VtZW50c1tpXTtcclxuXHRcdFx0XHRpZihhcmcgaW5zdGFuY2VvZiBOb2RlKVxyXG5cdFx0XHRcdFx0aW5zZXJ0KGFyZyk7XHJcblx0XHRcdFx0ZWxzZSBpZih0eXBlb2YgYXJnID09PSBcInN0cmluZ1wiKVxyXG5cdFx0XHRcdFx0YXJnLmZvckVhY2goaW5zZXJ0KTtcclxuXHRcdFx0XHRlbHNlIGlmKHR5cGVvZiBhcmcuZm9yRWFjaCA9PT0gXCJmdW5jdGlvblwiKVxyXG5cdFx0XHRcdFx0YXJnLmZvckVhY2goaW5zZXJ0KTtcclxuXHRcdFx0fVxyXG5cdFx0fVxyXG5cdH07XHJcblx0XHJcblx0UHJvdG90eXBlLnJlcGxhY2UgPSBmdW5jdGlvbigpe1xyXG5cdFx0aWYoYXJndW1lbnRzLmxlbmd0aCA8IDEpXHJcblx0XHRcdHRocm93IG5ldyBFcnJvcihcIkluc3VmZmljaWVudCBhcmd1bWVudHMhIE9uZSBvciB0d28gbm9kZXMgcmVxdWlyZWQhXCIpO1xyXG5cdFx0XHJcblx0XHRjb25zdCBwYXJlbnQgPSBhcmd1bWVudHMubGVuZ3RoID09IDEgPyB0aGlzLnBhcmVudE5vZGUgOiB0aGlzO1xyXG5cdFx0Y29uc3Qgb2xkTm9kZSA9IGFyZ3VtZW50cy5sZW5ndGggPT0gMSA/IHRoaXMgOiBhcmd1bWVudHNbMF07XHJcblx0XHRjb25zdCBuZXdOb2RlID0gYXJndW1lbnRzLmxlbmd0aCA9PSAxID8gYXJndW1lbnRzWzBdIDogYXJndW1lbnRzWzFdO1xyXG5cdFx0XHJcblx0XHRpZihuZXdOb2RlIGluc3RhbmNlb2YgQXJyYXkgfHwgbmV3Tm9kZSBpbnN0YW5jZW9mIE5vZGVMaXN0IHx8IG5ld05vZGUgaW5zdGFuY2VvZiBIVE1MQ29sbGVjdGlvbil7XHJcblx0XHRcdG5ld05vZGUuZm9yRWFjaChhSXRlbSA9PiBwYXJlbnQuaW5zZXJ0QmVmb3JlKGFJdGVtLCBvbGROb2RlKSk7XHJcblx0XHRcdG9sZE5vZGUucmVtb3ZlKCk7XHJcblx0XHR9XHJcblx0XHRlbHNlXHJcblx0XHRcdHBhcmVudC5yZXBsYWNlQ2hpbGQobmV3Tm9kZSxvbGROb2RlKTtcclxuXHR9O1xyXG5cdFxyXG5cdFByb3RvdHlwZS5hZnRlciA9IGZ1bmN0aW9uKCl7XHJcblx0XHRpZih0aGlzLnBhcmVudE5vZGUgPT0gbnVsbClcclxuXHRcdFx0dGhyb3cgbmV3IEVycm9yKFwiQ2FuJ3QgaW5zZXJ0IG5vZGVzIGFmdGVyIHRoaXMgbm9kZSEgUGFyZW50IG5vZGUgbm90IGF2YWlsYWJsZSFcIik7XHJcblx0XHRcclxuXHRcdGNvbnN0IHBhcmVudCA9IHRoaXMucGFyZW50Tm9kZTtcclxuXHRcdGNvbnN0IG5leHQgPSB0aGlzLm5leHRTaWJsaW5nO1xyXG5cdFx0aWYobmV4dClcclxuXHRcdFx0UHJvdG90eXBlLmJlZm9yZS5hcHBseShuZXh0LCBhcmd1bWVudHMpO1xyXG5cdFx0ZWxzZVxyXG5cdFx0XHRQcm90b3R5cGUuYXBwZW5kLmFwcGx5KHBhcmVudCwgYXJndW1lbnRzKTtcclxuXHR9O1x0XHJcblx0XHJcblx0UHJvdG90eXBlLmJlZm9yZSA9IGZ1bmN0aW9uKCl7XHJcblx0XHRpZih0aGlzLnBhcmVudE5vZGUgPT0gbnVsbClcclxuXHRcdFx0dGhyb3cgbmV3IEVycm9yKFwiQ2FuJ3QgaW5zZXJ0IG5vZGVzIGFmdGVyIHRoaXMgbm9kZSEgUGFyZW50IG5vZGUgbm90IGF2YWlsYWJsZSFcIik7XHJcblx0XHRcclxuXHRcdGNvbnN0IHBhcmVudCA9IHRoaXMucGFyZW50Tm9kZTtcclxuXHRcdGNvbnN0IGluc2VydGVyID0gKG5vZGUpID0+IHtwYXJlbnQuaW5zZXJ0QmVmb3JlKG5vZGUsIHRoaXMpO31cclxuXHRcdGZvcihsZXQgaSA9IDA7IGkgPCBhcmd1bWVudHMubGVuZ3RoOyBpKyspe1xyXG5cdFx0XHRjb25zdCBhcmcgPSBhcmd1bWVudHNbaV07XHJcblx0XHRcdGlmKGFyZyBpbnN0YW5jZW9mIE5vZGUpXHJcblx0XHRcdFx0aW5zZXJ0ZXIoYXJnKTtcclxuXHRcdFx0ZWxzZSBpZih0eXBlb2YgYXJnID09PSBcInN0cmluZ1wiKVxyXG5cdFx0XHRcdGFyZy5mb3JFYWNoKGluc2VydGVyKTtcclxuXHRcdFx0ZWxzZSBpZih0eXBlb2YgYXJnLmZvckVhY2ggPT09IFwiZnVuY3Rpb25cIilcclxuXHRcdFx0XHRhcmcuZm9yRWFjaChpbnNlcnRlcik7XHJcblx0XHR9XHJcblx0fTtcdFxyXG59KTtcclxuZXhwb3J0IGRlZmF1bHQgc3VwcG9ydDsiLCJpbXBvcnQgRXh0ZW5kZXIgZnJvbSBcIi4uLy4uL3V0aWxzL0V4dGVuZGVyXCI7XHJcblxyXG5jb25zdCBwYXJlbnRTZWxlY3RvciA9IC86cGFyZW50KFxcKFxcXCIoW15cXCldKilcXFwiXFwpKT8vaTtcclxuY29uc3QgcXVlcnlFeGVjdXRlciA9IGZ1bmN0aW9uKGFFbGVtZW50LCBhU2VsZWN0b3Ipe1xyXG5cdGxldCBtYXRjaCA9IHBhcmVudFNlbGVjdG9yLmV4ZWMoYVNlbGVjdG9yKTtcclxuXHRpZihtYXRjaCl7XHJcblx0XHRsZXQgcmVzdWx0ID0gYUVsZW1lbnQ7XHJcblx0XHRpZihtYXRjaC5pbmRleCA+IDApe1xyXG5cdFx0XHRyZXN1bHQgPSBhRWxlbWVudC5xdWVyeVNlbGVjdG9yQWxsKGFTZWxlY3Rvci5zdWJzdHIoMCwgbWF0Y2guaW5kZXgpKTtcclxuXHRcdFx0aWYocmVzdWx0Lmxlbmd0aCA9PSAwKVxyXG5cdFx0XHRcdHJldHVybjtcclxuXHRcdH1cdFxyXG5cdFx0cmVzdWx0ID0gcmVzdWx0LnBhcmVudChtYXRjaFsyXSk7XHRcdFx0XHJcblx0XHRpZihyZXN1bHQpe1xyXG5cdFx0XHRsZXQgbmV4dFNlbGVjdG9yID0gYVNlbGVjdG9yLnN1YnN0cihtYXRjaC5pbmRleCArIG1hdGNoWzBdLmxlbmd0aCkudHJpbSgpO1xyXG5cdFx0XHRpZihuZXh0U2VsZWN0b3IubGVuZ3RoID4gMClcclxuXHRcdFx0XHRyZXN1bHQgPSByZXN1bHQuZmluZChuZXh0U2VsZWN0b3IpO1xyXG5cdFx0XHRcclxuXHRcdFx0cmV0dXJuIHJlc3VsdDtcclxuXHRcdH1cdFx0XHJcblx0fVxyXG5cdGVsc2VcclxuXHRcdHJldHVybiBhRWxlbWVudC5xdWVyeVNlbGVjdG9yQWxsKGFTZWxlY3Rvcik7XHJcbn07XHJcblxyXG5cclxuY29uc3Qgc3VwcG9ydCA9IEV4dGVuZGVyKFwiUXVlcnlTdXBwb3J0XCIsIFByb3RvdHlwZSA9PiB7XHRcclxuXHRQcm90b3R5cGUuZmluZCA9IGZ1bmN0aW9uKCkge1xyXG5cdFx0bGV0IG5vZGVzID0gW107XHJcblx0XHRsZXQgYXJncyA9IEFycmF5LmZyb20oYXJndW1lbnRzKTtcclxuXHRcdGxldCBhcmcgPSBhcmdzLnNoaWZ0KCk7XHJcblx0XHR3aGlsZShhcmcpe1xyXG5cdFx0XHRpZih0eXBlb2YgYXJnID09PSBcInN0cmluZ1wiKXtcclxuXHRcdFx0XHRsZXQgcmVzdWx0ID0gcXVlcnlFeGVjdXRlcih0aGlzLCBhcmcpO1xyXG5cdFx0XHRcdGlmKHJlc3VsdClcclxuXHRcdFx0XHRcdG5vZGVzLnB1c2gocmVzdWx0KTtcclxuXHRcdFx0fVxyXG5cdFx0XHRcclxuXHRcdFx0YXJnID0gYXJncy5zaGlmdCgpO1xyXG5cdFx0fVxyXG5cdFx0XHJcblx0XHRsZXQgcmVzdWx0ID0gTm9kZUxpc3QuZnJvbS5hcHBseShudWxsLCBub2Rlcyk7XHJcblx0XHRyZXR1cm4gcmVzdWx0O1xyXG5cdH07XHJcblx0XHJcblx0UHJvdG90eXBlLmlzID0gZnVuY3Rpb24oKSB7XHJcblx0XHRpZih0aGlzIGluc3RhbmNlb2YgRG9jdW1lbnQgfHwgdGhpcyBpbnN0YW5jZW9mIERvY3VtZW50RnJhZ21lbnQpXHJcblx0XHRcdHJldHVybiBmYWxzZTtcdFx0XHJcblx0XHRlbHNlIGlmKGFyZ3VtZW50cy5sZW5ndGggPT0gMSl7XHJcblx0XHRcdGlmKHR5cGVvZiBhcmd1bWVudHNbMF0gPT09IFwic3RyaW5nXCIpXHJcblx0XHRcdFx0cmV0dXJuIHRoaXMubWF0Y2hlcyhhcmd1bWVudHNbMF0pO1xyXG5cdFx0XHRlbHNlIGlmKHR5cGVvZiBhcmd1bWVudHNbMF0ubGVuZ3RoID09PSBcIm51bWJlclwiKXtcclxuXHRcdFx0XHRsZXQgZmlsdGVyID0gYXJndW1lbnRzWzBdO1xyXG5cdFx0XHRcdGZvcihsZXQgaSA9IDA7IGkgPCBmaWx0ZXIubGVuZ3RoOyBpKyspXHJcblx0XHRcdFx0XHRpZih0aGlzLm1hdGNoZXMoZmlsdGVyW2ldKSlcclxuXHRcdFx0XHRcdFx0cmV0dXJuIHRydWU7XHJcblx0XHRcdH1cdFx0XHRcdFxyXG5cdFx0fVxyXG5cdFx0ZWxzZSBpZihhcmd1bWVudHMubGVuZ3RoID4gMSlcclxuXHRcdFx0cmV0dXJuIHRoaXMuaXMoQXJyYXkuZnJvbShhcmd1bWVudHMpKTtcclxuXHRcdFxyXG5cdFx0cmV0dXJuIGZhbHNlO1xyXG5cdH07XHRcclxuXHRcclxuXHRQcm90b3R5cGUucGFyZW50ID0gZnVuY3Rpb24oKSB7XHJcblx0XHRpZighdGhpcy5wYXJlbnROb2RlKVxyXG5cdFx0XHRyZXR1cm4gdW5kZWZpbmVkO1x0XHRcclxuXHRcdGVsc2UgaWYodHlwZW9mIGFyZ3VtZW50c1swXSA9PT0gXCJzdHJpbmdcIil7XHJcblx0XHRcdGxldCBwYXJlbnQgPSB0aGlzLnBhcmVudE5vZGU7XHJcblx0XHRcdHRyeXtcclxuXHRcdFx0XHR3aGlsZShwYXJlbnQgJiYgIXBhcmVudC5pcyhhcmd1bWVudHNbMF0pKVxyXG5cdFx0XHRcdFx0cGFyZW50ID0gcGFyZW50LnBhcmVudChhcmd1bWVudHNbMF0pO1xyXG5cdFx0XHR9Y2F0Y2ggKGUpIHtcclxuXHRcdFx0XHRjb25zb2xlLmVycm9yKFwidGhpczpcIiwgdGhpcywgXCJwYXJlbnQ6XCIsIHBhcmVudCwgXCJlcnJvcjpcIiwgZSk7XHJcblx0XHRcdH1cclxuXHRcdFx0cmV0dXJuIHBhcmVudDtcclxuXHRcdH1cclxuXHRcdHJldHVybiB0aGlzLnBhcmVudE5vZGU7XHJcblx0fTtcclxuXHRcclxuXHRQcm90b3R5cGUucGFyZW50cyA9IGZ1bmN0aW9uKCkge1x0XHRcclxuXHRcdGxldCByZXN1bHQgPSBuZXcgQXJyYXkoKTtcclxuXHRcdGxldCBwYXJlbnQgPSBQcm90b3R5cGUucGFyZW50LmFwcGx5KHRoaXMsIGFyZ3VtZW50cyk7XHJcblx0XHR3aGlsZShwYXJlbnQpe1xyXG5cdFx0XHRyZXN1bHQucHVzaChwYXJlbnQpO1xyXG5cdFx0XHRwYXJlbnQgPSBQcm90b3R5cGUucGFyZW50LmFwcGx5KHBhcmVudCwgYXJndW1lbnRzKTtcclxuXHRcdH1cclxuXHRcdFxyXG5cdFx0cmV0dXJuIE5vZGVMaXN0LmZyb20ocmVzdWx0KTtcclxuXHR9O1x0XHJcblxyXG5cdFByb3RvdHlwZS5zZWxlY3RvciA9IGZ1bmN0aW9uKCl7XHJcblx0XHRpZih0aGlzIGluc3RhbmNlb2YgRG9jdW1lbnQgfHwgdGhpcyBpbnN0YW5jZW9mIERvY3VtZW50RnJhZ21lbnQpXHJcblx0XHRcdHJldHVybiB1bmRlZmluZWQ7XHJcblx0XHRlbHNlIGlmKHRoaXMuaWQpXHJcblx0XHRcdHJldHVybiBcIiNcIiArIHRoaXMuaWQ7XHJcblx0XHRlbHNle1x0XHRcdFxyXG5cdFx0XHRsZXQgc2VsZWN0b3IgPSB0aGlzLnRhZ05hbWUudG9Mb3dlckNhc2UoKTtcclxuXHRcdFx0bGV0IHBhcmVudCA9IHRoaXMucGFyZW50KCk7XHJcblx0XHRcdGlmKHBhcmVudCl7XHJcblx0XHRcdFx0bGV0IHNhbWVUYWdTaWJsaW5ncyA9IHBhcmVudC5maW5kKFwiOnNjb3BlPlwiICsgc2VsZWN0b3IpO1x0XHRcdFxyXG5cdFx0XHRcdGlmIChzYW1lVGFnU2libGluZ3MgaW5zdGFuY2VvZiBOb2RlTGlzdCkge1xyXG5cdFx0XHRcdFx0bGV0IGluZGV4ID0gc2FtZVRhZ1NpYmxpbmdzLmluZGV4T2YodGhpcyk7XHJcblx0XHRcdFx0XHRpZiAoaW5kZXggPiAwKVxyXG5cdFx0XHRcdFx0XHRzZWxlY3RvciArPSAnOm50aC1jaGlsZCgnICsgKGluZGV4ICsgMSkgKyAnKSc7XHJcblx0XHRcdFx0fVx0XHRcclxuXHRcdFx0XHRsZXQgcGFyZW50U2VsZWN0b3IgPSBwYXJlbnQuc2VsZWN0b3IoKTtcclxuXHRcdFx0XHRyZXR1cm4gcGFyZW50U2VsZWN0b3IgPyBwYXJlbnRTZWxlY3RvciArIFwiPlwiICsgc2VsZWN0b3IgOiBzZWxlY3RvcjtcclxuXHRcdFx0fSBcclxuXHRcdFx0cmV0dXJuIHNlbGVjdG9yO1xyXG5cdFx0fVxyXG5cdH07XHRcclxuXHJcblx0UHJvdG90eXBlLmNsb3Nlc3QgPSBmdW5jdGlvbihhUXVlcnkpIHtcdFx0XHRcclxuXHRcdGxldCBub2RlID0gdGhpcztcclxuXHRcdHdoaWxlKG5vZGUpe1xyXG5cdFx0XHRsZXQgY2xvc2VzdHMgPSBub2RlLmZpbmQoYVF1ZXJ5KTtcclxuXHRcdFx0aWYoY2xvc2VzdHMgJiYgY2xvc2VzdHMubGVuZ3RoID4gMClcclxuXHRcdFx0XHRyZXR1cm4gY2xvc2VzdHM7XHJcblx0XHRcdGVsc2UgaWYobm9kZS5pcyhhUXVlcnkpKVxyXG5cdFx0XHRcdHJldHVybiBOb2RlTGlzdC5mcm9tKG5vZGUpO1xyXG5cdFx0XHRcclxuXHRcdFx0bm9kZSA9IG5vZGUucGFyZW50KCk7XHRcdFxyXG5cdFx0fVxyXG5cdH07XHJcblx0XHJcblx0UHJvdG90eXBlLm5lc3RlZCA9IGZ1bmN0aW9uKGFRdWVyeSl7XHJcblx0XHRpZih0aGlzLmlzKGFRdWVyeSkpXHJcblx0XHRcdHJldHVybiBOb2RlTGlzdC5mcm9tKHRoaXMpO1x0XHJcblx0XHRcclxuXHRcdGxldCBuZXN0ZWQgPSB0aGlzLmZpbmQoYVF1ZXJ5KTtcclxuXHRcdGlmKG5lc3RlZCAmJiBuZXN0ZWQubGVuZ3RoID4gMClcclxuXHRcdFx0cmV0dXJuIG5lc3RlZDtcclxuXHRcdGVsc2VcclxuXHRcdFx0cmV0dXJuIE5vZGVMaXN0LmZyb20odGhpcy5wYXJlbnQoYVF1ZXJ5KSk7XHJcblx0fTtcclxufSk7XHJcbmV4cG9ydCBkZWZhdWx0IHN1cHBvcnQ7XHJcblxyXG4iLCJpbXBvcnQgRXh0ZW5kZXIgZnJvbSBcIi4uLy4uL3V0aWxzL0V4dGVuZGVyXCI7XHJcblxyXG5jb25zdCBzdXBwb3J0ID0gRXh0ZW5kZXIoXCJSZWFkeUV2ZW50U3VwcG9ydFwiLCBQcm90b3R5cGUgPT4ge1xyXG5cdFByb3RvdHlwZS5yZWFkeSA9IGZ1bmN0aW9uKGFGdW5jdGlvbiwgb25jZSl7XHRcclxuXHRcdHRoaXMub24oXCJyZWFkeVwiLCBhRnVuY3Rpb24sIG9uY2UpO1xyXG5cdFx0aWYoZG9jdW1lbnQucmVhZHlTdGF0ZSA9PSBcImNvbXBsZXRlXCIpXHRcdFx0XHJcblx0XHRcdHRoaXMudHJpZ2dlcihcInJlYWR5XCIpO1xyXG5cdFx0XHJcblx0XHRyZXR1cm4gdGhpcztcclxuXHR9O1xyXG5cdFxyXG59KTtcclxuZXhwb3J0IGRlZmF1bHQgc3VwcG9ydDsiLCJpbXBvcnQgRXh0ZW5kZXIgZnJvbSBcIi4uLy4uL3V0aWxzL0V4dGVuZGVyXCI7XHJcblxyXG5jb25zdCBISURFVkFMVUUgPSBcIm5vbmVcIjtcclxuXHJcbmNvbnN0IGlzSGlkZGVuID0gKGVsZW1lbnQpID0+IHtcclxuXHRyZXR1cm4gZWxlbWVudC5zdHlsZS5kaXNwbGF5ID09PSBISURFVkFMVUVcclxufTtcclxuXHJcbmNvbnN0IGluaXQgPSAoZWxlbWVudCkgPT4ge1x0XHJcblx0bGV0IGRpc3BsYXkgPSAhaXNIaWRkZW4oZWxlbWVudCkgPyBlbGVtZW50LnN0eWxlLmRpc3BsYXkgOiBcIlwiO1xyXG5cdFxyXG5cdGVsZW1lbnQuc2hvdyA9IChmdW5jdGlvbigpe1xyXG5cdFx0dGhpcy5zdHlsZS5kaXNwbGF5ID0gZGlzcGxheTtcclxuXHRcdHJldHVybiB0aGlzO1x0XHRcclxuXHR9KS5iaW5kKGVsZW1lbnQpO1xyXG5cdFxyXG5cdGVsZW1lbnQuaGlkZSA9IChmdW5jdGlvbigpe1xyXG5cdFx0dGhpcy5zdHlsZS5kaXNwbGF5ID0gSElERVZBTFVFO1xyXG5cdFx0cmV0dXJuIHRoaXM7XHRcdFxyXG5cdH0pLmJpbmQoZWxlbWVudCk7XHJcblx0XHJcblx0cmV0dXJuIGVsZW1lbnQ7XHJcbn07XHJcblxyXG5cclxuY29uc3Qgc3VwcG9ydCA9IEV4dGVuZGVyKFwiU2hvd0hpZGVTdXBwb3J0XCIsIFByb3RvdHlwZSA9PiB7XHJcblx0UHJvdG90eXBlLnNob3cgPSBmdW5jdGlvbigpIHtcclxuXHRcdHJldHVybiBpbml0KHRoaXMpLnNob3cuYXBwbHkobnVsbCwgYXJndW1lbnRzKVxyXG5cdH07XHJcblxyXG5cdFByb3RvdHlwZS5oaWRlID0gZnVuY3Rpb24oKSB7XHJcblx0XHRyZXR1cm4gaW5pdCh0aGlzKS5oaWRlLmFwcGx5KG51bGwsIGFyZ3VtZW50cylcclxuXHR9O1xyXG5cclxuXHRQcm90b3R5cGUudG9nZ2xlU2hvdyA9IGZ1bmN0aW9uKCkge1xyXG5cdFx0cmV0dXJuIGlzSGlkZGVuKHRoaXMpID8gdGhpcy5zaG93KCkgOiB0aGlzLmhpZGUoKTtcclxuXHR9O1xyXG5cclxufSk7XHJcbmV4cG9ydCBkZWZhdWx0IHN1cHBvcnQ7IiwiaW1wb3J0IEV4dGVuZGVyIGZyb20gXCIuLi8uLi91dGlscy9FeHRlbmRlclwiO1xyXG5cclxuY29uc3QgSW5wdXRUeXBlcyA9IFtcclxuXHR7XHJcblx0XHRzZWxlY3RvciA6IFwic2VsZWN0XCIsXHJcblx0XHRnZXQgOiBmdW5jdGlvbigpe1xyXG5cdFx0XHRjb25zdCByZXN1bHQgPSBbXTtcclxuXHRcdFx0dGhpcy5maW5kKFwib3B0aW9uXCIpLmZvckVhY2gob3B0aW9uID0+IHtcclxuXHRcdFx0XHRpZihvcHRpb24uc2VsZWN0ZWQpXHJcblx0XHRcdFx0XHRyZXN1bHQucHVzaChvcHRpb24udmFsdWUpO1xyXG5cdFx0XHR9KTtcdFx0XHRcclxuXHRcdFx0cmV0dXJuIHJlc3VsdDtcclxuXHRcdH0sXHJcblx0XHRzZXQgOiBmdW5jdGlvbigpe1x0XHRcdFx0XHJcblx0XHRcdGxldCB2YWx1ZXMgPSBbXTtcclxuXHRcdFx0Y29uc3QgYXJncyA9IEFycmF5LmZyb20oYXJndW1lbnRzKTtcclxuXHRcdFx0bGV0IGFyZyA9IGFyZ3Muc2hpZnQoKTtcclxuXHRcdFx0d2hpbGUoYXJnKXtcclxuXHRcdFx0XHRpZihBcnJheS5pc0FycmF5KGFyZykpXHJcblx0XHRcdFx0XHR2YWx1ZXMgPSB2YWx1ZXMuY29uY2F0KGFyZyk7XHJcblx0XHRcdFx0ZWxzZVxyXG5cdFx0XHRcdFx0dmFsdWVzLnB1c2goYXJnKTtcclxuXHRcdFx0XHRcclxuXHRcdFx0XHRhcmcgPSBhcmdzLnNoaWZ0KCk7XHJcblx0XHRcdH1cclxuXHRcdFx0dGhpcy52YWx1ZSA9IHZhbHVlcztcclxuXHRcdFx0dGhpcy5maW5kKFwib3B0aW9uXCIpLmZvckVhY2gob3B0aW9uID0+IG9wdGlvbi5zZWxlY3RlZCA9IHZhbHVlcy5pbmRleE9mKG9wdGlvbi52YWx1ZSkgPj0gMCk7XHRcdFx0XHJcblx0XHRcdHRoaXMudHJpZ2dlcihcImNoYW5nZWRcIik7XHJcblx0XHR9XHRcdFx0XHJcblx0fSxcclxuXHR7XHJcblx0XHRzZWxlY3RvciA6IFwiaW5wdXRbdHlwZT1cXFwiY2hlY2tib3hcXFwiXSwgaW5wdXRbdHlwZT1cXFwicmFkaW9cXFwiXVwiLFxyXG5cdFx0Z2V0IDogZnVuY3Rpb24oKXtcclxuXHRcdFx0aWYodGhpcy52YWx1ZSA9PSBcIm9uXCIgfHwgdGhpcy52YWx1ZSA9PSBcIm9mZlwiKVxyXG5cdFx0XHRcdHJldHVybiB0aGlzLmNoZWNrZWQ7XHJcblx0XHRcdGVsc2UgaWYodGhpcy5jaGVja2VkKVxyXG5cdFx0XHRcdHJldHVybiB0aGlzLnZhbHVlO1x0XHRcdFx0XHJcblx0XHR9LFxyXG5cdFx0c2V0IDogZnVuY3Rpb24oYVZhbHVlKXtcclxuXHRcdFx0aWYodHlwZW9mIGFWYWx1ZSA9PT0gXCJib29sZWFuXCIpXHJcblx0XHRcdFx0dGhpcy5jaGVja2VkID0gYVZhbHVlO1xyXG5cdFx0XHRlbHNlIGlmKHR5cGVvZiBhVmFsdWUgPT09IFwic3RyaW5nXCIpXHJcblx0XHRcdFx0dGhpcy5jaGVja2VkID0gdGhpcy52YWx1ZSA9PSBhVmFsdWU7XHJcblx0XHRcdGVsc2UgaWYoQXJyYXkuaXNBcnJheShhVmFsdWUpKVxyXG5cdFx0XHRcdHRoaXMuY2hlY2tlZCA9IGFWYWx1ZS5pbmRleE9mKHRoaXMudmFsdWUpID49IDA7XHJcblx0XHRcdFxyXG5cdFx0XHR0aGlzLnRyaWdnZXIoXCJjaGFuZ2VkXCIpO1xyXG5cdFx0fVxyXG5cdH1cclxuXTtcclxuXHJcbmNvbnN0IERlZmF1bHRJbnB1dFR5cGUgPSB7XHJcblx0XHRnZXQgOiBmdW5jdGlvbigpe1xyXG5cdFx0XHRyZXR1cm4gdGhpcy52YWx1ZTtcclxuXHRcdH0sXHJcblx0XHRzZXQgOiBmdW5jdGlvbihhVmFsdWUpe1xyXG5cdFx0XHR0aGlzLnZhbHVlID0gYVZhbHVlO1xyXG5cdFx0XHR0aGlzLnRyaWdnZXIoXCJpbnB1dFwiKTtcclxuXHRcdH1cdFxyXG59O1xyXG5cclxuY29uc3QgZ2V0SW5wdXRUeXBlID0gZnVuY3Rpb24oYUVsZW1lbnQpe1xyXG5cdGZvcihsZXQgaSA9IDA7IGkgPCBJbnB1dFR5cGVzLmxlbmd0aDsgaSsrKVxyXG5cdFx0aWYoYUVsZW1lbnQuaXMoSW5wdXRUeXBlc1tpXS5zZWxlY3RvcikpXHJcblx0XHRcdHJldHVybiBJbnB1dFR5cGVzW2ldO1x0XHRcclxuXHRyZXR1cm4gRGVmYXVsdElucHV0VHlwZTtcclxufTtcclxuXHJcblxyXG5jb25zdCBzdXBwb3J0ID0gRXh0ZW5kZXIoXCJWYWx1ZVN1cHBvcnRcIiwgUHJvdG90eXBlID0+IHtcdFxyXG5cdFByb3RvdHlwZS52YWwgPSBmdW5jdGlvbigpIHtcclxuXHRcdGxldCB0eXBlID0gZ2V0SW5wdXRUeXBlKHRoaXMpO1xyXG5cdFx0aWYoYXJndW1lbnRzLmxlbmd0aCA9PSAwKVxyXG5cdFx0XHRyZXR1cm4gdHlwZS5nZXQuYXBwbHkodGhpcywgYXJndW1lbnRzKTtcclxuXHRcdGVsc2VcclxuXHRcdFx0dHlwZS5zZXQuYXBwbHkodGhpcywgYXJndW1lbnRzKTtcclxuXHRcdFx0XHJcblx0XHRyZXR1cm4gdGhpcztcclxuXHR9O1x0XHJcbn0pO1xyXG5leHBvcnQgZGVmYXVsdCBzdXBwb3J0OyIsImltcG9ydCBcIi4vZG9tL0V2ZW50VGFyZ2V0XCI7XHJcbmltcG9ydCBcIi4vZG9tL05vZGVcIjtcclxuaW1wb3J0IFwiLi9kb20vRWxlbWVudFwiO1xyXG5pbXBvcnQgXCIuL2RvbS9Eb2N1bWVudFwiO1xyXG5pbXBvcnQgXCIuL2RvbS9Eb2N1bWVudEZyYWdtZW50XCI7XHJcbmltcG9ydCBcIi4vZG9tL0hUTUxFbGVtZW50XCI7XHJcbmltcG9ydCBcIi4vZG9tL0hUTUxJbnB1dEVsZW1lbnRcIjtcclxuaW1wb3J0IFwiLi9kb20vSFRNTFRleHRBcmVhRWxlbWVudFwiO1xyXG5pbXBvcnQgXCIuL2RvbS9IVE1MU2VsZWN0RWxlbWVudFwiO1xyXG5pbXBvcnQgXCIuL2RvbS9Ob2RlTGlzdFwiO1xyXG5pbXBvcnQgXCIuL2RvbS9IdG1sQ29sbGVjdGlvblwiO1xyXG5pbXBvcnQgXCIuL0dsb2JhbFwiO1xyXG4iLCJjb25zdCBEZWxlZ2F0ZXJCdWlsZGVyID0gZnVuY3Rpb24oKSB7XHJcblx0Y29uc3QgYXJncyA9IEFycmF5LmZyb20oYXJndW1lbnRzKTtcclxuXHRjb25zdCBjYWxsYmFjayA9IGFyZ3Muc2hpZnQoKTtcclxuXHRjb25zdCBzb3VyY2UgPSBhcmdzLnNoaWZ0KCk7XHJcblx0YXJncy5mb3JFYWNoKCB0YXJnZXQgPT57XHJcblx0XHRPYmplY3QuZ2V0T3duUHJvcGVydHlOYW1lcyh0YXJnZXQpXHJcblx0XHQuZm9yRWFjaChuYW1lID0+IHtcclxuXHRcdFx0Y29uc3QgcHJvcCA9IE9iamVjdC5nZXRPd25Qcm9wZXJ0eURlc2NyaXB0b3IodGFyZ2V0LCBuYW1lKTtcclxuXHRcdFx0aWYgKHR5cGVvZiBzb3VyY2VbbmFtZV0gPT09IFwidW5kZWZpbmVkXCIgJiYgdHlwZW9mIHByb3AudmFsdWUgPT09IFwiZnVuY3Rpb25cIilcclxuXHRcdFx0XHRzb3VyY2VbbmFtZV0gPSBmdW5jdGlvbigpe1xyXG5cdFx0XHRcdFx0cmV0dXJuIGNhbGxiYWNrLmNhbGwodGhpcywgbmFtZSwgYXJndW1lbnRzKTtcclxuXHRcdFx0XHR9O1x0XHRcdFx0XHRcdFx0XHRcdFx0XHJcblx0XHR9KTtcclxuXHR9KTtcclxuXHRcclxufTtcclxuZXhwb3J0IGRlZmF1bHQgRGVsZWdhdGVyQnVpbGRlcjsiLCJjb25zdCBleHRlbmRQcm90b3R5cGUgPSBmdW5jdGlvbigpe1xyXG5cdGNvbnN0IGFyZ3MgPSBBcnJheS5mcm9tKGFyZ3VtZW50cyk7XHJcblx0Y29uc3QgdHlwZSA9IGFyZ3Muc2hpZnQoKTtcdFxyXG5cdHdoaWxlKGFyZ3MubGVuZ3RoID4gMCl7XHJcblx0XHRjb25zdCBleHRlbmRlciA9IGFyZ3Muc2hpZnQoKTtcclxuXHRcdGV4dGVuZGVyKHR5cGUpO1xyXG5cdH1cclxufTtcclxuXHJcbmV4cG9ydCBkZWZhdWx0IGV4dGVuZFByb3RvdHlwZTsiLCJpbXBvcnQgVXRpbHMgZnJvbSBcIi4vVXRpbHNcIjtcclxuXHJcbmNvbnN0IEVYVEVOU0lPTlNfTUFQID0gVXRpbHMuZ2xvYmFsVmFyKFwiX19fRE9NX0FQSV9FWFRFTlNJT05fTUFQX19fXCIsIHt9KTtcclxuY29uc3QgRXh0ZW5kZXIgPSBmdW5jdGlvbihhTmFtZSwgYUV4dGVudGlvbil7XHJcblx0cmV0dXJuIGZ1bmN0aW9uKGFUeXBlKXtcdFxyXG5cdFx0bGV0IGV4dGVuc2lvbnMgPSBFWFRFTlNJT05TX01BUFthVHlwZS5uYW1lXTtcclxuXHRcdGlmKCFleHRlbnNpb25zKVxyXG5cdFx0XHRleHRlbnNpb25zID0gRVhURU5TSU9OU19NQVBbYVR5cGUubmFtZV0gPSB7fTtcdFx0XHJcblx0XHRcclxuXHRcdGlmKCFleHRlbnNpb25zW2FOYW1lXSl7XHJcblx0XHRcdGV4dGVuc2lvbnNbYU5hbWVdID0gdHJ1ZTtcclxuXHRcdFx0YUV4dGVudGlvbihhVHlwZS5wcm90b3R5cGUpO1xyXG5cdFx0fVxyXG5cdFx0ZWxzZVxyXG5cdFx0XHRjb25zb2xlLndhcm4oXCJkdXBsaWNhdGVkIGxvYWQgb2YgZXh0ZW5zaW9uIFxcXCJcIiArIGFOYW1lICsgXCJcXFwiIVwiKTtcclxuXHR9XHJcbn07XHJcblxyXG5leHBvcnQgZGVmYXVsdCBFeHRlbmRlcjsiLCJjb25zdCBVdGlscyA9IHtcclxuXHRnbG9iYWwgOiAoKCkgPT4ge1xyXG5cdFx0aWYodHlwZW9mIHdpbmRvdyAhPT0gXCJ1bmRlZmluZWRcIikgcmV0dXJuIHdpbmRvdztcclxuXHRcdGlmKHR5cGVvZiBnbG9iYWwgIT09IFwidW5kZWZpbmVkXCIpIHJldHVybiBnbG9iYWw7XHJcblx0XHRpZih0eXBlb2Ygc2VsZiAhPT0gXCJ1bmRlZmluZWRcIikgcmV0dXJuIHNlbGY7XHJcblx0XHRyZXR1cm4ge307XHRcdFxyXG5cdH0pKCksXHJcblx0Z2xvYmFsVmFyIDogZnVuY3Rpb24oYU5hbWUsIGFJbml0VmFsdWUpe1xyXG5cdFx0aWYoYXJndW1lbnRzLmxlbmd0aCA9PT0gMiAmJiB0eXBlb2YgVXRpbHMuZ2xvYmFsW2FOYW1lXSA9PT0gXCJ1bmRlZmluZWRcIilcclxuXHRcdFx0VXRpbHMuZ2xvYmFsW2FOYW1lXSA9IGFJbml0VmFsdWU7XHJcblx0XHRcclxuXHRcdHJldHVybiBVdGlscy5nbG9iYWxbYU5hbWVdO1x0XHRcclxuXHR9XHJcbn07XHJcblxyXG5leHBvcnQgZGVmYXVsdCBVdGlsczsiLCJpbXBvcnQgVGVtcGxhdGUgZnJvbSBcIi4vc3JjL1RlbXBsYXRlLmpzXCI7XG5pbXBvcnQgUmVuZGVyZXIgZnJvbSBcIi4vc3JjL1JlbmRlcmVyLmpzXCI7XG5cbmV4cG9ydCB7VGVtcGxhdGUsIFJlbmRlcmVyfTsiLCJpbXBvcnQgV2FpdCBmcm9tIFwiLi9XYWl0LmpzXCI7XG5cbmNvbnN0IENMT1NFX1RJTUVPVVQgPSAyMDAwO1xuZXhwb3J0IGRlZmF1bHQgY2xhc3MgQ29udGV4dCB7XG5cdGNvbnN0cnVjdG9yKHsgcmVzb2x2ZXIsIHJlbmRlcmVyLCB0ZW1wbGF0ZSwgY29udGFpbmVyLCByb290LCBtb2RlID0gXCJyZXBsYWNlXCIsIHRhcmdldCA9IG51bGwsIHBhcmVudCA9IG51bGwgfSkge1xuXHRcdGlmICghcmVzb2x2ZXIpIHRocm93IG5ldyBFcnJvcihcIlBhcmFtZXRlciBcXFwicmVzb2x2ZXJcXFwiIGlzIHJlcXVpcmVkIVwiKTtcblx0XHRpZiAoIXJlbmRlcmVyKSB0aHJvdyBuZXcgRXJyb3IoXCJQYXJhbWV0ZXIgXFxcInJlbmRlcmVyXFxcIiBpcyByZXF1aXJlZCFcIik7XG5cdFx0aWYgKCF0ZW1wbGF0ZSkgdGhyb3cgbmV3IEVycm9yKFwiUGFyYW1ldGVyIFxcXCJ0ZW1wbGF0ZVxcXCIgaXMgcmVxdWlyZWQhXCIpO1xuXHRcdGlmICghY29udGFpbmVyKSB0aHJvdyBuZXcgRXJyb3IoXCJQYXJhbWV0ZXIgXFxcImNvbnRhaW5lclxcXCIgaXMgcmVxdWlyZWQhXCIpO1xuXHRcdGlmICghcm9vdCkgdGhyb3cgbmV3IEVycm9yKFwiUGFyYW1ldGVyIFxcXCJyb290XFxcIiBpcyByZXF1aXJlZCFcIik7XG5cblx0XHR0aGlzLnJlYWR5SGFuZGxlcyA9IFtdO1xuXHRcdHRoaXMuY29udGVudCA9IG51bGw7XG5cdFx0dGhpcy50ZW1wbGF0ZSA9IHRlbXBsYXRlO1xuXHRcdHRoaXMuY29udGFpbmVyID0gY29udGFpbmVyO1xuXHRcdHRoaXMucmVzb2x2ZXIgPSByZXNvbHZlcjtcblx0XHR0aGlzLm1vZGUgPSBtb2RlO1xuXHRcdHRoaXMucmVuZGVyZXIgPSByZW5kZXJlcjtcblx0XHR0aGlzLnJvb3QgPSByb290O1xuXHRcdHRoaXMudGFyZ2V0ID0gdGFyZ2V0O1xuXHRcdHRoaXMucGFyZW50ID0gcGFyZW50O1xuXHRcdHRoaXMuY2xvc2VkID0gZmFsc2U7XG5cdFx0dGhpcy53YWl0ID0gV2FpdCh0aGlzKTtcblxuXG5cdFx0LyogZXhlY3V0aW9uIGZsYWdzICovXG5cdFx0dGhpcy5zdG9wID0gZmFsc2U7XG5cdFx0dGhpcy5pZ25vcmUgPSBmYWxzZTtcblx0fVxuXG5cdGFzeW5jIGZpbmlzaChjYWxsYmFjaykge1xuXHRcdGlmICh0aGlzLmNsb3NlZClcblx0XHRcdHJldHVybjsgLy9jb250ZXh0IGlzIHJlYWR5IGFuZCBjbG9zZWRcblxuXHRcdGlmICh0aGlzLnBhcmVudClcblx0XHRcdHRoaXMucGFyZW50LmZpbmlzaChjYWxsYmFjayk7XG5cdFx0ZWxzZVxuXHRcdFx0dGhpcy5yZWFkeShjYWxsYmFjayk7XG5cdH07XG5cblx0YXN5bmMgcmVhZHkoY2FsbGJhY2spIHtcblx0XHRpZiAodGhpcy5jbG9zZWQpXG5cdFx0XHRyZXR1cm47IC8vY29udGV4dCBpcyByZWFkeSBhbmQgY2xvc2VkXG5cblx0XHRpZiAoY2FsbGJhY2spIHtcblx0XHRcdGlmIChjYWxsYmFjayBpbnN0YW5jZW9mIEFycmF5KVxuXHRcdFx0XHRjYWxsYmFjay5mb3JFYWNoKChjYWxsYmFjaykgPT4geyB0aGlzLnJlYWR5ID0gY2FsbGJhY2s7IH0pO1xuXHRcdFx0ZWxzZSBpZiAoY2FsbGJhY2sgaW5zdGFuY2VvZiBQcm9taXNlIHx8IHR5cGVvZiBjYWxsYmFjayA9PT0gXCJmdW5jdGlvblwiKVxuXHRcdFx0XHR0aGlzLnJlYWR5SGFuZGxlcy5wdXNoKGNhbGxiYWNrKTtcblx0XHR9IGVsc2Uge1xuXHRcdFx0dGhpcy5jbG9zZWQgPSB0cnVlO1xuXHRcdFx0Ly93YWl0IG9mIGFsbCBzdWIgY29udGV4dCB0byBiZSBjbG9zZWQgd2l0aCBhbiBtYXhpbXVtIGFtb3VudCBvZiB0aW1lXG5cblx0XHRcdGlmICh0aGlzLnJlYWR5SGFuZGxlcy5sZW5ndGggPiAwKSB7XG5cdFx0XHRcdHRyeSB7XG5cdFx0XHRcdFx0YXdhaXQgUHJvbWlzZS5yYWNlKFtcblx0XHRcdFx0XHRcdFByb21pc2UuYWxsKHRoaXMucmVhZHlIYW5kbGVzLm1hcChoYW5kbGUgPT4gaGFuZGxlIGluc3RhbmNlb2YgUHJvbWlzZSA/IGhhbmRsZSA6IGhhbmRsZSh0aGlzKSkpLFxuXHRcdFx0XHRcdFx0bmV3IFByb21pc2UoKHJlamVjdCwgZXJyb3IpID0+IHtcblx0XHRcdFx0XHRcdFx0c2V0VGltZW91dCgoKSA9PiB7XG5cdFx0XHRcdFx0XHRcdFx0ZXJyb3IobmV3IEVycm9yKFwidGltZW91dFwiKSk7XG5cdFx0XHRcdFx0XHRcdH0sIDIwMDApXG5cdFx0XHRcdFx0XHR9KVxuXHRcdFx0XHRcdF0pO1xuXHRcdFx0XHR9IGNhdGNoIChlKSB7XG5cdFx0XHRcdFx0Y29uc29sZS5lcnJvcihlKTtcdFx0XHRcblx0XHRcdFx0XHR0aHJvdyBlXG5cdFx0XHRcdH1cblx0XHRcdH1cblxuXHRcdFx0dGhpcy53YWl0LmZpbmlzaGVkKCk7XG5cdFx0fVxuXHR9XG5cblx0c3ViQ29udGV4dCh7IHJlc29sdmVyID0gdGhpcy5yZXNvbHZlciwgcmVuZGVyZXIgPSB0aGlzLnJlbmRlcmVyLCB0ZW1wbGF0ZSA9IHRoaXMudGVtcGxhdGUsIGNvbnRhaW5lciA9IHRoaXMuY29udGFpbmVyLCByb290ID0gdGhpcy5yb290LCBtb2RlID0gdGhpcy5tb2RlLCB0YXJnZXQgPSB0aGlzLnRhcmdldCB9ID0ge30pIHtcblx0XHRjb25zdCBzdWIgPSBuZXcgQ29udGV4dCh7IHJlc29sdmVyLCByZW5kZXJlciwgdGVtcGxhdGUsIGNvbnRhaW5lciwgbW9kZSwgcm9vdCwgdGFyZ2V0LCBwYXJlbnQ6IHRoaXMgfSk7XG5cdFx0Ly90aGlzLnJlYWR5KHN1Yi53YWl0KTtcblx0XHRyZXR1cm4gc3ViO1xuXHR9XG5cblx0Y2xvbmUoeyByZXNvbHZlciA9IHRoaXMucmVzb2x2ZXIsIHJlbmRlcmVyID0gdGhpcy5yZW5kZXJlciwgdGVtcGxhdGUgPSB0aGlzLnRlbXBsYXRlLCBjb250YWluZXIgPSB0aGlzLmNvbnRhaW5lciwgcm9vdCA9IHRoaXMucm9vdCwgbW9kZSA9IHRoaXMubW9kZSwgdGFyZ2V0ID0gdGhpcy50YXJnZXQgfSA9IHt9KSB7XG5cdFx0cmV0dXJuIG5ldyBDb250ZXh0KHsgcmVzb2x2ZXIsIHJlbmRlcmVyLCB0ZW1wbGF0ZSwgY29udGFpbmVyLCBtb2RlLCByb290LCB0YXJnZXQsIHBhcmVudDogdGhpcyB9KTtcblx0fVxufTsiLCJjb25zdCBERUZJTkVEX0RJUkVDVElWRVMgPSBbXTtcblxuY29uc3QgZGVmaW5lRGlyZWN0aXZlID0gKHsgZGlyZWN0aXZlIH0pID0+IHtcblx0aWYgKCEoZGlyZWN0aXZlIGluc3RhbmNlb2YgRGlyZWN0aXZlKSlcblx0XHR0aHJvdyBuZXcgRXJyb3IoXCJJbXBsZW1lbnRhdGlvbiBkb3NuJ3QgZXh0ZW5kIERpcmVjdGl2ZSBjbGFzcyFcIik7XG5cblx0aWYgKGRpcmVjdGl2ZS5yYW5rIDwgRGlyZWN0aXZlLk1JTl9SQU5LKVxuXHRcdHRocm93IG5ldyBFcnJvcihcIlRoZSByYW5rIG9mIGEgZGlyZWN0aXZlIGNhbid0IGJlIGxvd2VyIGFzIFwiICsgRGlyZWN0aXZlLk1JTl9SQU5LICsgXCIhXCIpO1xuXG5cdGlmIChkaXJlY3RpdmUucmFuayA+IERpcmVjdGl2ZS5NQVhfUkFOSylcblx0XHR0aHJvdyBuZXcgRXJyb3IoXCJUaGUgcmFuayBvZiBhIGRpcmVjdGl2ZSBjYW4ndCBiZSBncmF0ZXIgYXMgXCIgKyBEaXJlY3RpdmUuTUFYX1JBTksgKyBcIiFcIik7XG5cblx0REVGSU5FRF9ESVJFQ1RJVkVTLnB1c2goZGlyZWN0aXZlKTtcblx0REVGSU5FRF9ESVJFQ1RJVkVTLnNvcnQoKGEsIGIpID0+IHtcblx0XHRjb25zdCBwaGFzZSA9IGEucGhhc2UgLSBiLnBoYXNlO1xuXHRcdGlmKHBoYXNlID09IDApXG5cdFx0XHRyZXR1cm4gYS5yYW5rIC0gYi5yYW5rO1xuXHRcdFx0XG5cdFx0cmV0dXJuIHBoYXNlO1xuXHR9KTtcbn07XG5cbmNvbnN0IFBIQVNFID0ge1xuXHRpbml0OiAwLFxuXHRkYXRhOiAxLFxuXHR0ZW1wbGF0ZTogMixcblx0Y29udGVudDogMyxcblx0ZmluaXNoOiA0XG59O1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBEaXJlY3RpdmUge1xuXG5cdHN0YXRpYyBnZXQgUEhBU0UoKSB7IHJldHVybiBQSEFTRSB9O1xuXHRzdGF0aWMgZ2V0IE1JTl9SQU5LKCkgeyByZXR1cm4gMCB9O1xuXHRzdGF0aWMgZ2V0IE1BWF9SQU5LKCkgeyByZXR1cm4gMTAwMDAwIH07XG5cblx0Y29uc3RydWN0b3IoKSB7IH07XG5cblx0Z2V0IG5hbWUoKSB7IH1cblx0Z2V0IHJhbmsoKSB7IH1cblx0Z2V0IHBoYXNlKCkge3JldHVybiBQSEFTRS5maW5pc2h9XG5cblx0LyoqXG5cdCAqIG5lZWQgdG8gYmUgaW1wbGVtZW50ZWRcblx0ICogXG5cdCAqIHJldHVybiBEaXJlY3RpdmVSZXN1bHRcblx0ICovXG5cdGFzeW5jIGV4ZWN1dGUoY29udGV4dCkge1xuXHRcdHJldHVybiBjb250ZXh0O1xuXHR9XG5cblxuXHRzdGF0aWMgZGVmaW5lKG9wdGlvbikge1xuXHRcdGRlZmluZURpcmVjdGl2ZShvcHRpb24pO1xuXHR9XG5cblx0c3RhdGljIGdldCBkaXJlY3RpdmVzKCkge1xuXHRcdHJldHVybiBERUZJTkVEX0RJUkVDVElWRVM7XG5cdH1cbn07IiwiZXhwb3J0IGRlZmF1bHQgY2xhc3MgRGlyZWN0aXZlRWxlbWVudCBleHRlbmRzIEhUTUxFbGVtZW50e1xuXHRjb25zdHJ1Y3Rvcigpe1xuXHRcdHN1cGVyKCk7XG5cdFx0dGhpcy5oaWRkZW4gPSB0cnVlO1xuXHR9XG5cdFxuXHQvKipcblx0ICogbmVlZCB0byBiZSBpbXBsZW1lbnRlZFxuXHQgKiBcblx0ICovXG5cdGFzeW5jIGV4ZWN1dGUoe3RlbXBsYXRlLCBjb250ZXh0fSl7XG5cdFx0Y29udGV4dC5jb250ZW50ID0gdGVtcGxhdGUuY2xvbmVOb2RlKHRydWUpO1xuXHRcdHJldHVybiBjb250ZXh0O1xuXHR9O1x0XG59IiwiaW1wb3J0IFwiQGRlZmF1bHQtanMvZGVmYXVsdGpzLWV4dGRvbVwiO1xuaW1wb3J0IEV4cHJlc3Npb25SZXNvbHZlciBmcm9tIFwiQGRlZmF1bHQtanMvZGVmYXVsdGpzLWV4cHJlc3Npb24tbGFuZ3VhZ2Uvc3JjL0V4cHJlc3Npb25SZXNvbHZlci5qc1wiO1xuaW1wb3J0IFRlbXBsYXRlIGZyb20gXCIuL1RlbXBsYXRlLmpzXCI7XG5pbXBvcnQgQ29udGV4dCBmcm9tIFwiLi9Db250ZXh0LmpzXCI7XG5pbXBvcnQgRGlyZWN0aXZlIGZyb20gXCIuL0RpcmVjdGl2ZS5qc1wiO1xuaW1wb3J0IEVsZW1lbnQgZnJvbSBcIi4vRWxlbWVudC5qc1wiO1xuaW1wb3J0IFwiLi9kaXJlY3RpdmVzXCI7XG5pbXBvcnQgXCIuL2VsZW1lbnRzXCI7XG5cblxuZXhwb3J0IGNvbnN0IFNDT1BFUyA9IHtcblx0YXBwbGljYXRpb246IFwiYXBwbGljYXRpb25cIixcblx0ZGF0YTogXCJkYXRhXCIsXG5cdHJlbmRlcjogXCJyZW5kZXJcIixcblx0Y29udGFpbmVyOiBcImNvbnRhaW5lclwiLFxuXHRub2RlOiBcIm5vZGVcIixcblx0ZGlyZWN0aXZlOiBcImRpcmVjdGl2ZVwiXG59O1xuXG5jb25zdCBBUFBMSUNBVElPTl9TQ09QRV9SRVNPTFZFUiA9IG5ldyBFeHByZXNzaW9uUmVzb2x2ZXIoeyBuYW1lOiBTQ09QRVMuYXBwbGljYXRpb24gfSk7XG5cbmNvbnN0IE1PREVXT1JLRVIgPSB7XG5cdFwicmVwbGFjZVwiOiBhc3luYyAoeyBjb250YWluZXIsIHRhcmdldCA9IG51bGwsIGNvbnRlbnQgfSkgPT4ge1xuXHRcdGlmICh0YXJnZXQpIHtcblx0XHRcdHRhcmdldC5yZXBsYWNlKGNvbnRlbnQpO1xuXHRcdH0gZWxzZSB7XG5cdFx0XHRjb250YWluZXIuZW1wdHkoKTtcblx0XHRcdGNvbnRhaW5lci5hcHBlbmQoY29udGVudCk7XG5cdFx0fVxuXHR9LFxuXHRcImFwcGVuZFwiOiBhc3luYyAoeyBjb250YWluZXIsIHRhcmdldCA9IG51bGwsIGNvbnRlbnQgfSkgPT4ge1xuXHRcdGlmICh0YXJnZXQpXG5cdFx0XHR0YXJnZXQuYWZ0ZXIoY29udGVudCk7XG5cdFx0ZWxzZVxuXHRcdFx0Y29udGFpbmVyLmFwcGVuZChjb250ZW50KTtcblx0fSxcblx0XCJwcmVwZW5kXCI6IGFzeW5jICh7IGNvbnRhaW5lciwgdGFyZ2V0ID0gbnVsbCwgY29udGVudCB9KSA9PiB7XG5cdFx0aWYgKHRhcmdldClcblx0XHRcdHRhcmdldC5iZWZvcmUoY29udGVudCk7XG5cdFx0ZWxzZVxuXHRcdFx0Y29udGFpbmVyLnByZXBlbmQoY29udGVudCk7XG5cdH1cbn07XG5cbmNvbnN0IGxvYWRUZW1wbGF0ZUNvbnRlbnQgPSBhc3luYyAodGVtcGxhdGUsIGNvbnRleHQsIHJlbmRlcmVyKSA9PiB7XG5cdGlmICh0ZW1wbGF0ZSkge1xuXHRcdHRlbXBsYXRlID0gYXdhaXQgVGVtcGxhdGUubG9hZCh0ZW1wbGF0ZSlcblx0XHRyZXR1cm4gdGVtcGxhdGUuaW1wb3J0Q29udGVudCgpO1xuXHR9IGVsc2UgaWYgKGNvbnRleHQpXG5cdFx0cmV0dXJuIGNvbnRleHQudGVtcGxhdGU7XG5cdGVsc2UgaWYgKHJlbmRlcmVyLnRlbXBsYXRlKSB7XG5cdFx0cmV0dXJuIGF3YWl0IHJlbmRlcmVyLnRlbXBsYXRlLmltcG9ydENvbnRlbnQoKTtcblx0fVxuXG5cdHRocm93IG5ldyBFcnJvcihcIk5vIGNvbnRlbnQgdGVtcGxhdGUgc3BlY2lmaWVkIVwiKTtcbn07XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFJlbmRlcmVyIHtcblx0Y29uc3RydWN0b3IoeyB0ZW1wbGF0ZSwgZGF0YSB9ID0ge30pIHtcblx0XHRpZiAodGVtcGxhdGUgJiYgISh0ZW1wbGF0ZSBpbnN0YW5jZW9mIFRlbXBsYXRlKSlcblx0XHRcdHRocm93IG5ldyBFcnJvcihcInRlbXBsYXRlIG11c3QgYmUgYW4gaW5zdGFuY2Ugb2YgVGVtcGxhdGUhXCIpO1xuXG5cdFx0dGhpcy50ZW1wbGF0ZSA9IHRlbXBsYXRlO1xuXHRcdHRoaXMucmVzb2x2ZXIgPSBuZXcgRXhwcmVzc2lvblJlc29sdmVyKHsgbmFtZTogU0NPUEVTLmRhdGEsIGNvbnRleHQ6IGRhdGEgPyBkYXRhIDoge30sIHBhcmVudDogQVBQTElDQVRJT05fU0NPUEVfUkVTT0xWRVIgfSk7XG5cdH1cblxuXHQvKipcblx0ICogQHBhcmFtIFxuXHQgKiBcdFx0Y29udGFpbmVyIEhUTUxFbGVtZW50IC0+IHRhcmdldCB0byByZW5kZXIgaW5cblx0ICogQHBhcmFtXG5cdCAqIFx0XHRkYXRhIE9iamVjdHwuLi4gLT4gZGF0YSB0byB1c2VkIGF0IHJlbmRlcmluZ1xuXHQgKiBAcGFyYW1cblx0ICogXHRcdHRlbXBsYXRlIFRlbXBsYXRlfE5vZGV8Tm9kZUxpc3R8SFRNTENvbGxlY3Rpb258U3RyaW5nIC0+IHRlbXBsYXRlIHRvIHJlbmRlclxuXHQgKiBAcGFyYW1cblx0ICogXHRcdG1vZGUgXCJhcHBlbmRcInxcImluc2VydFwifFwicmVwbGFjZVwiXG5cdCAqIEBwYXJhbVxuXHQgKiBcdFx0dGFyZ2V0XG5cdCAqL1xuXHRhc3luYyByZW5kZXIoeyB0ZW1wbGF0ZSA9IG51bGwsIGRhdGEgPSBudWxsLCBjb250YWluZXIsIHJvb3QsIG1vZGUsIHRhcmdldCwgY29udGV4dCA9IG51bGwgfSkge1xuXHRcdHRlbXBsYXRlID0gYXdhaXQgbG9hZFRlbXBsYXRlQ29udGVudCh0ZW1wbGF0ZSwgY29udGV4dCwgdGhpcyk7XG5cdFx0bGV0IHJlc29sdmVyID0gbmV3IEV4cHJlc3Npb25SZXNvbHZlcih7IG5hbWU6IFNDT1BFUy5yZW5kZXIsIGNvbnRleHQ6IGRhdGEsIHBhcmVudDogY29udGV4dCA/IGNvbnRleHQucmVzb2x2ZXIgOiB0aGlzLnJlc29sdmVyIH0pO1xuXG5cdFx0bGV0IHJlbmRlckNvbnRleHQgPSBjb250ZXh0O1xuXHRcdGlmICghcmVuZGVyQ29udGV4dClcblx0XHRcdHJlbmRlckNvbnRleHQgPSBuZXcgQ29udGV4dCh7IHJlc29sdmVyLCByZW5kZXJlcjogdGhpcywgdGVtcGxhdGUsIGNvbnRhaW5lciwgcm9vdDogcm9vdCA/IHJvb3QgOiBjb250YWluZXIsIG1vZGU6IG1vZGUgPyBtb2RlIDogXCJyZXBsYWNlXCIsIHRhcmdldCB9KTtcblx0XHRlbHNlXG5cdFx0XHRyZW5kZXJDb250ZXh0ID0gcmVuZGVyQ29udGV4dC5jbG9uZSh7IHJlc29sdmVyLCB0ZW1wbGF0ZSwgY29udGFpbmVyLCByb290LCBtb2RlLCB0YXJnZXQgfSk7XG5cblx0XHRsZXQgcmVzdWx0ID0gbnVsbDtcblx0XHRpZiAodGVtcGxhdGUgaW5zdGFuY2VvZiBOb2RlKVxuXHRcdFx0cmVzdWx0ID0gYXdhaXQgdGhpcy5yZW5kZXJOb2RlKHJlbmRlckNvbnRleHQpO1xuXHRcdGVsc2Vcblx0XHRcdHJlc3VsdCA9IGF3YWl0IHRoaXMucmVuZGVyQ29udGFpbmVyKHJlbmRlckNvbnRleHQpXG5cblx0XHRpZiAocmVzdWx0IGluc3RhbmNlb2YgQ29udGV4dClcblx0XHRcdHJlbmRlckNvbnRleHQgPSByZXN1bHQ7XG5cblxuXHRcdGlmIChyZW5kZXJDb250ZXh0LmNvbnRlbnQgJiYgcmVuZGVyQ29udGV4dC5tb2RlKSB7XG5cdFx0XHRjb25zdCBtb2Rld29ya2VyID0gTU9ERVdPUktFUltyZW5kZXJDb250ZXh0Lm1vZGVdO1xuXHRcdFx0aWYgKCFtb2Rld29ya2VyKVxuXHRcdFx0XHR0aHJvdyBuZXcgRXJyb3IoXCJUaGUgXFxcIlwiICsgcmVuZGVyQ29udGV4dC5tb2RlICsgXCJcXFwiIGlzIG5vdCBzdXBwb3J0ZWQhXCIpXG5cblx0XHRcdGF3YWl0IG1vZGV3b3JrZXIocmVuZGVyQ29udGV4dCk7XG5cdFx0fVxuXG5cdFx0aWYgKCFjb250ZXh0KVxuXHRcdFx0YXdhaXQgcmVuZGVyQ29udGV4dC5yZWFkeSgpO1xuXHRcdGVsc2Vcblx0XHRcdHJlbmRlckNvbnRleHQucmVhZHkoKTtcblxuXHRcdHJldHVybiBjb250ZXh0O1xuXHR9XG5cblxuXHRhc3luYyByZW5kZXJDb250YWluZXIoY29udGV4dCkge1xuXHRcdGlmIChjb250ZXh0LnRlbXBsYXRlICYmIGNvbnRleHQudGVtcGxhdGUubGVuZ3RoID4gMCkge1xuXHRcdFx0Y29uc3QgcmVuZGVyaW5ncyA9IGNvbnRleHQudGVtcGxhdGUubWFwKG5vZGUgPT4ge1xuXHRcdFx0XHQvL3NlcGFyYXRlIG5vZGUgY29udGV4dCBmcm9tIHRoZSBjdXJyZW50IGNvbnRleHRcblx0XHRcdFx0Y29uc3QgcmVzb2x2ZXIgPSBuZXcgRXhwcmVzc2lvblJlc29sdmVyKHsgbmFtZTogU0NPUEVTLm5vZGUsIGNvbnRleHQ6IG51bGwsIHBhcmVudDogY29udGV4dC5yZXNvbHZlciB9KTtcblx0XHRcdFx0cmV0dXJuIHRoaXMucmVuZGVyTm9kZShjb250ZXh0LmNsb25lKHsgdGVtcGxhdGU6IG5vZGUsIHJlc29sdmVyIH0pKVxuXHRcdFx0fSk7XG5cdFx0XHRjb25zdCByZXN1bHQgPSBhd2FpdCBQcm9taXNlLmFsbChyZW5kZXJpbmdzKTtcblx0XHRcdGlmICghcmVzdWx0KVxuXHRcdFx0XHRyZXR1cm4gY29udGV4dDtcblxuXHRcdFx0Y29udGV4dC5jb250ZW50ID0gcmVzdWx0XG5cdFx0XHRcdC5maWx0ZXIocmVzdWx0ID0+ICEhcmVzdWx0KVxuXHRcdFx0XHQucmVkdWNlKChjb250ZW50LCByZXN1bHQpID0+IHtcblx0XHRcdFx0XHRjb25zdCBub2RlID0gcmVzdWx0LmNvbnRlbnQ7XG5cdFx0XHRcdFx0aWYgKG5vZGUgaW5zdGFuY2VvZiBBcnJheSlcblx0XHRcdFx0XHRcdGNvbnRlbnQgPSBjb250ZW50LmNvbmNhdChub2RlKTtcblx0XHRcdFx0XHRpZiAobm9kZSBpbnN0YW5jZW9mIE5vZGVMaXN0IHx8IG5vZGUgaW5zdGFuY2VvZiBIVE1MQ29sbGVjdGlvbilcblx0XHRcdFx0XHRcdGNvbnRlbnQgPSBjb250ZW50LmNvbmNhdChBcnJheS5mcm9tKG5vZGUpKTtcblx0XHRcdFx0XHRlbHNlIGlmIChub2RlIGluc3RhbmNlb2YgTm9kZSlcblx0XHRcdFx0XHRcdGNvbnRlbnQucHVzaChub2RlKTtcblxuXHRcdFx0XHRcdHJlc3VsdC5yZWFkeSgpO1xuXHRcdFx0XHRcdHJldHVybiBjb250ZW50O1xuXHRcdFx0XHR9LCBbXSk7XG5cblx0XHR9XG5cdFx0cmV0dXJuIGNvbnRleHQ7XG5cdH1cblxuXHRhc3luYyByZW5kZXJOb2RlKGNvbnRleHQpIHtcblx0XHR0cnkge1xuXHRcdFx0Y29udGV4dC50ZW1wbGF0ZS5ub3JtYWxpemUoKTtcblx0XHRcdGlmIChjb250ZXh0LnRlbXBsYXRlIGluc3RhbmNlb2YgRWxlbWVudClcblx0XHRcdFx0YXdhaXQgY29udGV4dC50ZW1wbGF0ZS5leGVjdXRlKGNvbnRleHQpO1xuXHRcdFx0ZWxzZVxuXHRcdFx0XHRhd2FpdCB0aGlzLmV4ZWN1dGVEaXJlY3RpdmVzKGNvbnRleHQpO1xuXG5cdFx0XHRpZiAoIWNvbnRleHQuaWdub3JlICYmIGNvbnRleHQuY29udGVudCkge1xuXHRcdFx0XHRjb25zdCBjb250ZW50ID0gY29udGV4dC50ZW1wbGF0ZS5jaGlsZE5vZGVzO1xuXHRcdFx0XHRpZiAoY29udGVudCAmJiBjb250ZW50Lmxlbmd0aCA+IDApIHtcblx0XHRcdFx0XHQvLyBAVE9ETyBhd2FpdCBvciBmaXJlIGFuZCBmb3JnZXQ/Pz9cblx0XHRcdFx0XHRhd2FpdCBjb250ZXh0LnJlbmRlcmVyLnJlbmRlcih7IGNvbnRleHQ6IGNvbnRleHQuY2xvbmUoeyB0ZW1wbGF0ZTogY29udGVudCwgY29udGFpbmVyOiBjb250ZXh0LmNvbnRlbnQgfSkgfSk7XG5cdFx0XHRcdH1cblx0XHRcdH1cblxuXHRcdFx0aWYgKGNvbnRleHQuY29udGVudCAmJiBjb250ZXh0LmNvbnRlbnQudGFnTmFtZSAmJiBjb250ZXh0LmNvbnRlbnQudGFnTmFtZSA9PSBcIkpTVExcIilcblx0XHRcdFx0Y29udGV4dC5jb250ZW50ID0gY29udGV4dC5jb250ZW50LmNoaWxkTm9kZXM7IC8vc3BlY2lhbCBjYXNlIHRvIHN1cHBvcnQgdGhlIG9sZCBcIjxqc3RsPlwiIHRhZy5cblx0XHRcdFx0XG5cdFx0fSBjYXRjaCAoZSkge1xuXHRcdFx0Y29uc29sZS5lcnJvcihcImVycm9yIGF0IHJlbmRlciBub2RlOlwiLCBlLCBjb250ZXh0KTtcblx0XHR9XG5cdFx0cmV0dXJuIGNvbnRleHQ7XG5cdH1cblxuXHRhc3luYyBleGVjdXRlRGlyZWN0aXZlcyhjb250ZXh0KSB7XG5cdFx0Ly9jb25zb2xlLmxvZyhcInNjb3BlIGNoYWluOlwiLCBjb250ZXh0LnJlbmRlcmVyLmNoYWluLCBcInJlc29sdmVyIGNoYWluXCIsIGNvbnRleHQucmVuZGVyZXIucmVzb2x2ZXIuZnVsbG5hbWUpO1xuXHRcdGNvbnN0IGRpcmVjdGl2ZXMgPSBEaXJlY3RpdmUuZGlyZWN0aXZlcztcblx0XHRjb25zdCBsZW5ndGggPSBkaXJlY3RpdmVzLmxlbmd0aDtcblx0XHRmb3IgKGxldCBpID0gMDsgaSA8IGxlbmd0aCAmJiAhY29udGV4dC5zdG9wOyBpKyspIHtcblx0XHRcdGNvbnN0IGRpcmVjdGl2ZSA9IGRpcmVjdGl2ZXNbaV07XG5cdFx0XHR0cnkge1xuXHRcdFx0XHRjb25zdCByZXN1bHQgPSBhd2FpdCBkaXJlY3RpdmUuZXhlY3V0ZShjb250ZXh0KTtcblx0XHRcdFx0aWYgKHJlc3VsdCBpbnN0YW5jZW9mIENvbnRleHQpXG5cdFx0XHRcdFx0Y29udGV4dCA9IHJlc3VsdDtcblx0XHRcdH0gY2F0Y2ggKGUpIHtcblx0XHRcdFx0Y29uc29sZS5lcnJvcihcImVycm9yIGF0IGRpcmVjdGl2ZTpcIiwgZSwgZGlyZWN0aXZlLCBjb250ZXh0KTtcblx0XHRcdH1cblx0XHR9XG5cdFx0cmV0dXJuIGNvbnRleHQ7XG5cdH1cblxuXHRzdGF0aWMgYXN5bmMgYnVpbGQoeyB0ZW1wbGF0ZSwgZGF0YSB9ID0ge30pIHtcblx0XHRpZiAodGVtcGxhdGUgJiYgdGVtcGxhdGUgaW5zdGFuY2VvZiBQcm9taXNlKVxuXHRcdFx0dGVtcGxhdGUgPSBhd2FpdCB0ZW1wbGF0ZTtcblxuXHRcdHRlbXBsYXRlID0gdGVtcGxhdGUgPyBhd2FpdCBUZW1wbGF0ZS5sb2FkKHRlbXBsYXRlKSA6IG51bGw7XG5cdFx0cmV0dXJuIG5ldyBSZW5kZXJlcih7IHRlbXBsYXRlLCBkYXRhIH0pO1xuXHR9O1xuXG5cdHN0YXRpYyBhc3luYyByZW5kZXIoeyBjb250YWluZXIsIGRhdGEsIHRlbXBsYXRlLCBtb2RlLCB0YXJnZXQgfSkge1xuXHRcdGNvbnN0IHJlbmRlcmVyID0gbmV3IFJlbmRlcmVyKHsgdGVtcGxhdGUsIGRhdGEgfSk7XG5cdFx0cmV0dXJuIHJlbmRlcmVyLnJlbmRlcih7IGNvbnRhaW5lciwgbW9kZSwgdGFyZ2V0IH0pO1xuXHR9XG59IiwiaW1wb3J0IFwiQGRlZmF1bHQtanMvZGVmYXVsdGpzLWNvbW1vbi11dGlscy9zcmMvamF2YXNjcmlwdC9TdHJpbmcuanNcIjtcblxuY29uc3QgQ0FDSEUgPSB7fTtcbmNvbnN0IGdldEtleSA9ICh0ZW1wbGF0ZSwgY2FjaGUsIGFsaWFzKSA9PiB7XG5cdGlmKCFjYWNoZSlcblx0XHRyZXR1cm4gbnVsbDtcblx0XG5cdGxldCBrZXkgPSBudWxsO1xuXHRpZihhbGlhcylcblx0XHRrZXkgPSBhbGlhcztcdFxuXHRlbHNlIGlmKHR5cGVvZiB0ZW1wbGF0ZSA9PT0gXCJzdHJpbmdcIilcblx0XHRrZXkgPSB0ZW1wbGF0ZTtcblx0ZWxzZSBpZih0ZW1wbGF0ZSBpbnN0YW5jZW9mIFVSTClcblx0XHRrZXkgPSB0ZW1wbGF0ZS50b1N0cmluZygpO1xuXHRlbHNlIGlmKHRlbXBsYXRlIGluc3RhbmNlb2YgSFRNTEVsZW1lbnQpXG5cdFx0a2V5ID0gdGVtcGxhdGUuc2VsZWN0b3IoKTtcblx0XG5cdGlmKGtleSlcblx0XHRyZXR1cm4ga2V5Lmhhc2hjb2RlKCk7XG5cdFxuXHRyZXR1cm4gbnVsbDtcbn07XG5cbmNvbnN0IGZyb21VUkwgPSBhc3luYyAodXJsLCBjYWNoZSwga2V5KSA9PiB7XG5cdGNvbnN0IHJlc3BvbnNlID0gYXdhaXQgZmV0Y2godXJsLnRvU3RyaW5nKCkpO1xuXHRjb25zdCBzb3VyY2UgPSBhd2FpdCByZXNwb25zZS50ZXh0KCk7XG5cdHJldHVybiBmcm9tU291cmNlKHNvdXJjZSwgY2FjaGUsIGtleSk7XG59O1xuXG5jb25zdCBmcm9tU291cmNlID0gYXN5bmMgKHNvdXJjZSwgY2FjaGUsIGtleSkgPT4ge1xuXHRyZXR1cm4gZnJvbUVsZW1lbnQoY3JlYXRlKHNvdXJjZSwgdHJ1ZSksIGNhY2hlLCBrZXkpO1xufTtcblxuY29uc3QgZnJvbUVsZW1lbnQgPSBhc3luYyAoZWxlbWVudCwgY2FjaGUsIGtleSkgPT4ge1x0XG5cdGxldCB0ZW1wbGF0ZSA9IG51bGxcblx0aWYoZWxlbWVudCBpbnN0YW5jZW9mIEhUTUxUZW1wbGF0ZUVsZW1lbnQpXHRcdFx0XG5cdFx0dGVtcGxhdGUgPSBuZXcgVGVtcGxhdGUoZWxlbWVudCk7XG5cdGVsc2Uge1xuXHRcdHRlbXBsYXRlID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcInRlbXBsYXRlXCIpO1xuXHRcdGlmKGVsZW1lbnQgaW5zdGFuY2VvZiBOb2RlIHx8IGVsZW1lbnQgaW5zdGFuY2VvZiBOb2RlTGlzdCB8fCBlbGVtZW50IGluc3RhbmNlb2YgSFRNTENvbGxlY3Rpb24gfHwgZWxlbWVudCBpbnN0YW5jZW9mIEFycmF5KVxuXHRcdFx0dGVtcGxhdGUuYXBwZW5kKGVsZW1lbnQpO1xuXHRcdGVsc2Vcblx0XHRcdHRocm93IG5ldyBFcnJvcihcIlRlbXBsYXRlIHR5cGUgaXMgbm90IHN1cHBvcnRlZCFcIik7XHRcdFx0XG5cdFx0XG5cdFx0dGVtcGxhdGUgPSBuZXcgVGVtcGxhdGUodGVtcGxhdGUsIGtleSk7XG5cdH1cblx0XG5cdGlmKCF0ZW1wbGF0ZSlcblx0XHR0aHJvdyBuZXcgRXJyb3IoXCJUZW1wbGF0ZSBjYW4ndCBsb2FkZWQhXCIpO1xuXHRcblx0aWYoY2FjaGUgJiYga2V5KVxuXHRcdENBQ0hFW2tleV0gPSB0ZW1wbGF0ZTtcblx0XG5cdHJldHVybiB0ZW1wbGF0ZTtcbn07XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFRlbXBsYXRlIHtcdFxuXHRjb25zdHJ1Y3Rvcih0ZW1wbGF0ZSwga2V5KXtcdFx0XG5cdFx0dGhpcy50ZW1wbGF0ZSA9IHRlbXBsYXRlO1xuXHRcdHRoaXMua2V5ID0ga2V5O1x0XG5cdH1cblx0XG5cdGltcG9ydENvbnRlbnQoZG9jPWRvY3VtZW50KXtcblx0XHRsZXQgaW1wb3J0ZWQgPSBkb2MuaW1wb3J0Tm9kZSh0aGlzLnRlbXBsYXRlLCB0cnVlKTtcblx0XHRyZXR1cm4gaW1wb3J0ZWQuY29udGVudC5jaGlsZE5vZGVzO1xuXHR9XG5cdFxuXHRyZW1vdmUoKSB7XG5cdFx0aWYodGhpcy5rZXkgJiYgQ0FDSEVbdGhpcy5rZXldKVxuXHRcdFx0ZGVsZXRlIENBQ0hFW3RoaXMua2V5XTtcdFx0XG5cdH07XG5cdFxuXHRzdGF0aWMgYXN5bmMgbG9hZCh0ZW1wbGF0ZSwgY2FjaGUgPSB0cnVlLCBhbGlhcyA9IG51bGwpe1xuXHRcdGlmKHRlbXBsYXRlIGluc3RhbmNlb2YgVGVtcGxhdGUpXG5cdFx0XHRyZXR1cm4gdGVtcGxhdGU7XG5cdFx0XG5cdFx0Y29uc3Qga2V5ID0gZ2V0S2V5KHRlbXBsYXRlLCBjYWNoZSwgYWxpYXMpO1xuXHRcdGlmKGtleSAmJiBDQUNIRVtrZXldKVxuXHRcdFx0cmV0dXJuIENBQ0hFW2tleV07XG5cdFx0ZWxzZSBpZih0eXBlb2YgdGVtcGxhdGUgPT09IFwic3RyaW5nXCIpe1xuXHRcdFx0cmV0dXJuIGZyb21Tb3VyY2UodGVtcGxhdGUsIGNhY2hlLCBrZXkpO1xuXHRcdH1lbHNlIGlmKHRlbXBsYXRlIGluc3RhbmNlb2YgVVJMKVxuXHRcdFx0cmV0dXJuIGF3YWl0IGZyb21VUkwodGVtcGxhdGUsIGNhY2hlLCBrZXkpO1xuXHRcdGVsc2UgaWYodGVtcGxhdGUgaW5zdGFuY2VvZiBOb2RlIHx8IHRlbXBsYXRlIGluc3RhbmNlb2YgTm9kZUxpc3QgfHwgdGVtcGxhdGUgaW5zdGFuY2VvZiBIVE1MQ29sbGVjdGlvbiB8fCB0ZW1wbGF0ZSBpbnN0YW5jZW9mIEhUTUxUZW1wbGF0ZUVsZW1lbnQpXG5cdFx0XHRyZXR1cm4gZnJvbUVsZW1lbnQodGVtcGxhdGUsIGNhY2hlLCBrZXkpO1xuXHRcdFxuXHRcdG5ldyBFcnJvcihcIlRoZSB0ZW1wbGF0ZSBpc24ndCBhIGFsbG93ZWQgdHlwZSEgLT4gW1N0cmluZ3xVUkx8Tm9kZXxOb2RlTGlzdHxIVE1MQ29sbGVjdGlvbnxUZW1wbGF0ZV0gcmVxdWlyZWQhXCIpO1xuXHR9XHRcbn07XG4iLCJleHBvcnQgZGVmYXVsdCAob2JqZWN0KSA9PiB7XG5cdGxldCBmaW5pc2hlZCA9IG51bGw7XG5cdGNvbnN0IHdhaXQgPSAgbmV3IFByb21pc2UoKHJlc29sdmUpID0+IHtcblx0XHRmaW5pc2hlZCA9IHJlc29sdmU7XG5cdH0pO1xuXHR3YWl0Lm9iamVjdCA9IG9iamVjdDtcblx0XG5cdHdhaXQuZmluaXNoZWQgPSBhc3luYyAoKSA9PiB7XG5cdFx0YXdhaXQgZmluaXNoZWQoKTtcblx0fTtcblx0XG5cdHJldHVybiB3YWl0O1xufTsiLCJpbXBvcnQgRGlyZWN0aXZlIGZyb20gXCIuLi9EaXJlY3RpdmUuanNcIjtcblxuY29uc3QgQVRUUklCVVRFX05BTUUgPSAvKGpzdGwpPyhcXD8pPyhAKT8oW15cXD9AXSspL2k7XG5cbmNvbnN0IGJpbmRBdHRyaWJ1dGUgPSBhc3luYyAoeyBjb25kaXRpb24sIG5hbWUsIHZhbHVlLCBjb250ZXh0IH0pID0+IHtcblx0Y29uc3QgeyByZXNvbHZlciwgY29udGVudCwgdGVtcGxhdGUgfSA9IGNvbnRleHQ7XG5cdFx0XG5cdGxldCBhdHRyaWJ1dGUgPSAhY29uZGl0aW9uID8gdmFsdWUgOiB0ZW1wbGF0ZS5hdHRyKG5hbWUpO1xuXHRjb25kaXRpb24gPSBjb25kaXRpb24gPyB2YWx1ZSA6IHRlbXBsYXRlLmF0dHIoXCI/XCIgKyBuYW1lKTtcblx0XG5cdGlmIChjb25kaXRpb24gJiYgYXR0cmlidXRlKSB7XG5cdFx0Y29uZGl0aW9uID0gYXdhaXQgcmVzb2x2ZXIucmVzb2x2ZShjb25kaXRpb24sIGZhbHNlKTtcblx0XHRpZiAoY29uZGl0aW9uID09PSB0cnVlKVxuXHRcdFx0Y29udGVudC5hdHRyKG5hbWUsIGF3YWl0IHJlc29sdmVyLnJlc29sdmVUZXh0KGF0dHJpYnV0ZSwgYXR0cmlidXRlKSk7XG5cdH0gZWxzZSBpZiAoY29uZGl0aW9uKSB7XG5cdFx0Y29uZGl0aW9uID0gYXdhaXQgcmVzb2x2ZXIucmVzb2x2ZShjb25kaXRpb24sIGZhbHNlKTtcblx0XHRpZiAoY29uZGl0aW9uID09PSB0cnVlKVxuXHRcdFx0Y29udGVudC5hdHRyKG5hbWUsIHRydWUpO1xuXHR9IGVsc2UgaWYgKGF0dHJpYnV0ZSkge1xuXHRcdGNvbnRlbnQuYXR0cihuYW1lLCBhd2FpdCByZXNvbHZlci5yZXNvbHZlVGV4dChhdHRyaWJ1dGUsIGF0dHJpYnV0ZSkpO1xuXHR9XG59O1xuXG5jb25zdCBiaW5kRXZlbnQgPSBhc3luYyAoeyBjb25kaXRpb24sIG5hbWUsIHZhbHVlLCBjb250ZXh0IH0pID0+IHtcblx0Y29uc3QgeyByZXNvbHZlciwgdGVtcGxhdGUgfSA9IGNvbnRleHQ7XG5cdFxuXHRjb25kaXRpb24gPSBjb25kaXRpb24gPyB2YWx1ZSA6IHRlbXBsYXRlLmF0dHIoXCI/QFwiICsgbmFtZSk7XG5cdGxldCBoYW5kbGUgPSAhY29uZGl0aW9uID8gdmFsdWUgOiB0ZW1wbGF0ZS5hdHRyKFwiQFwiKyBuYW1lKTtcblx0bGV0IHNwbGl0ID0gbmFtZS5zcGxpdChcIjpcIik7XG5cdGNvbnN0IGV2ZW50ID0gc3BsaXQuc2hpZnQoKTtcblx0Y29uc3QgdHlwZSA9IHNwbGl0LnNoaWZ0KCkgfHwgXCJkZWZhdWx0XCI7XG5cdFxuXG5cdGlmIChjb25kaXRpb24gJiYgaGFuZGxlKXtcblx0XHRpZihhd2FpdCByZXNvbHZlci5yZXNvbHZlKGNvbmRpdGlvbiwgZmFsc2UpID09IHRydWUpXG5cdFx0XHRhd2FpdCBiaW5kaW5nKHtldmVudCwgdHlwZSwgaGFuZGxlLCBjb250ZXh0IH0pO1xuXHR9XG5cdGVsc2UgaWYgKGhhbmRsZSlcblx0XHRhd2FpdCBiaW5kaW5nKHtldmVudCwgdHlwZSwgaGFuZGxlLCBjb250ZXh0IH0pO1xufTtcblxuY29uc3QgYmluZGluZyA9IGFzeW5jICh7ZXZlbnQsIHR5cGUsIGhhbmRsZSwgY29udGV4dCB9KSA9PiB7XG5cdGNvbnN0IHsgcmVzb2x2ZXIsIGNvbnRlbnR9ID0gY29udGV4dDtcblx0XHRcblx0aWYodHlwZSA9PSBcImRlbGVnYXRlXCIpe1xuXHRcdGNvbnN0IGV2ZW50aGFuZGxlID0gYXdhaXQgcmVzb2x2ZXIucmVzb2x2ZVRleHQoaGFuZGxlLCBoYW5kbGUpO1xuXHRcdGNvbnRlbnQub24oZXZlbnQsIGRlbGVnYXRlcihldmVudGhhbmRsZSkpO1xuXHR9IGVsc2Uge1x0XHRcblx0XHRjb25zdCBldmVudGhhbmRsZSA9IGF3YWl0IHJlc29sdmVyLnJlc29sdmUoaGFuZGxlLCBoYW5kbGUpO1xuXHRcblx0XHRpZighZXZlbnRoYW5kbGUpXG5cdFx0XHRjb25zb2xlLmVycm9yKG5ldyBFcnJvcihcIkNhbid0IHJlc29sdmUgXFxcIlwiICsgaGFuZGxlICsgXCJcXFwiIHRvIGV2ZW50IGhhbmRsZSFcIikpXG5cdFx0ZWxzZSBpZih0eXBlb2YgZXZlbnRoYW5kbGUgPT09IFwiZnVuY3Rpb25cIilcblx0XHRcdGNvbnRlbnQub24oZXZlbnQsIGV2ZW50aGFuZGxlKTtcblx0XHRlbHNlIGlmKHR5cGVvZiBldmVudGhhbmRsZSA9PT0gXCJzdHJpbmdcIilcblx0XHRcdGNvbnRlbnQub24oZXZlbnQsIGRlbGVnYXRlcihldmVudGhhbmRsZSkpO1xuXHRcdGVsc2UgaWYodHlwZW9mIGV2ZW50aGFuZGxlID09PSBcIm9iamVjdFwiKXtcdFxuXHRcdFx0Y29uc3Qge2NhcHR1cmU9ZmFsc2UsIHBhc3NpdmU9ZmFsc2UsIG9uY2U9ZmFsc2V9ID0gaGFuZGxlO1x0XHRcblx0XHRcdGNvbnRlbnQub24oZXZlbnQsIGV2ZW50aGFuZGxlLmV2ZW50SGFuZGxlLCB7Y2FwdHVyZSwgcGFzc2l2ZSwgb25jZX0pO1xuXHRcdH1cblx0fVxufTtcblxuY29uc3QgZGVsZWdhdGVyID0gZnVuY3Rpb24oZGVsZWdhdGUpIHtcblx0cmV0dXJuIGZ1bmN0aW9uKGV2ZW50KSB7XG5cdFx0ZXZlbnQucHJldmVudERlZmF1bHQoKTtcblx0XHRldmVudC5zdG9wUHJvcGFnYXRpb24oKTtcblx0XHRpZihldmVudC5jdXJyZW50VGFyZ2V0KVx0XG5cdFx0XHRldmVudC5jdXJyZW50VGFyZ2V0LnRyaWdnZXIoZGVsZWdhdGUsIGV2ZW50KTtcblx0XHRlbHNlXG5cdFx0XHRldmVudC50YXJnZXQudHJpZ2dlcihkZWxlZ2F0ZSwgZXZlbnQpO1xuXHR9O1xufTtcblxuXG5jbGFzcyBBdHRyaWJ1dGUgZXh0ZW5kcyBEaXJlY3RpdmUge1xuXHRjb25zdHJ1Y3RvcigpIHtcblx0XHRzdXBlcigpO1xuXHR9XG5cblx0Z2V0IG5hbWUoKSB7IHJldHVybiBcImF0dHJpYnV0ZVwiIH1cblx0Z2V0IHJhbmsoKSB7IHJldHVybiBEaXJlY3RpdmUuTUlOX1JBTksgfVxuXHRnZXQgcGhhc2UoKSB7IHJldHVybiBEaXJlY3RpdmUuUEhBU0UuY29udGVudCB9XG5cblxuXHRhc3luYyBleGVjdXRlKGNvbnRleHQpIHtcblx0XHRjb25zdCB7IHRlbXBsYXRlIH0gPSBjb250ZXh0O1xuXHRcdGlmICghKHRlbXBsYXRlIGluc3RhbmNlb2YgSFRNTEVsZW1lbnQpKVxuXHRcdFx0cmV0dXJuIGNvbnRleHQ7XG5cblx0XHRjb25zdCBwcm9jZXNzZWQgPSBuZXcgU2V0KCk7XG5cdFx0Zm9yIChjb25zdCBhdHRyaWJ1dGUgb2YgdGVtcGxhdGUuYXR0cmlidXRlcykge1xuXHRcdFx0Y29uc3QgWywganN0bCwgY29uZGl0aW9uLCBldmVudCwgbmFtZV0gPSBBVFRSSUJVVEVfTkFNRS5leGVjKGF0dHJpYnV0ZS5uYW1lKTtcblx0XHRcdGlmICghanN0bCAmJiAhcHJvY2Vzc2VkLmhhcyhuYW1lKSkge1xuXHRcdFx0XHRjb25zdCB2YWx1ZSA9IGF0dHJpYnV0ZS52YWx1ZTtcblx0XHRcdFx0XHRcdFx0XHRcblx0XHRcdFx0aWYgKGV2ZW50KVxuXHRcdFx0XHRcdGF3YWl0IGJpbmRFdmVudCh7IGNvbmRpdGlvbiwgZXZlbnQsIG5hbWUsIHZhbHVlLCBjb250ZXh0IH0pXG5cdFx0XHRcdGVsc2Vcblx0XHRcdFx0XHRhd2FpdCBiaW5kQXR0cmlidXRlKHsgY29uZGl0aW9uLCBuYW1lLCB2YWx1ZSwgY29udGV4dCB9KVxuXHRcdFx0fVxuXHRcdFx0cHJvY2Vzc2VkLmFkZChuYW1lKTtcblx0XHR9XG5cblx0XHRyZXR1cm4gY29udGV4dDtcblx0fVxufVxuXG5EaXJlY3RpdmUuZGVmaW5lKHsgZGlyZWN0aXZlOiBuZXcgQXR0cmlidXRlKCkgfSk7IiwiaW1wb3J0IERpcmVjdGl2ZSBmcm9tIFwiLi4vRGlyZWN0aXZlLmpzXCI7XG5cbmNsYXNzIENob29zZSBleHRlbmRzIERpcmVjdGl2ZSB7XG5cdGNvbnN0cnVjdG9yKCkge1xuXHRcdHN1cGVyKCk7XG5cdH1cblxuXHRnZXQgbmFtZSgpIHsgcmV0dXJuIFwiY2hvb3NlXCIgfVxuXHRnZXQgcmFuaygpIHsgcmV0dXJuIERpcmVjdGl2ZS5NSU5fUkFOSyArIDEgfVxuXHRnZXQgcGhhc2UoKSB7IHJldHVybiBEaXJlY3RpdmUuUEhBU0UudGVtcGxhdGUgfVxuXG5cdGFzeW5jIGV4ZWN1dGUoY29udGV4dCkge1xuXHRcdGlmICghKGNvbnRleHQudGVtcGxhdGUgaW5zdGFuY2VvZiBIVE1MRWxlbWVudCkgfHwgIWNvbnRleHQudGVtcGxhdGUuaGFzQXR0cmlidXRlKFwianN0bC1jaG9vc2VcIikgfHwgY29udGV4dC50ZW1wbGF0ZS5jaGlsZHJlbi5sZW5ndGggPT0gMClcblx0XHRcdHJldHVybiBjb250ZXh0O1xuXG5cdFx0Y29uc3QgeyB0ZW1wbGF0ZSwgcmVzb2x2ZXIgfSA9IGNvbnRleHQ7XG5cdFx0bGV0IHJlc29sdmVkID0gZmFsc2U7XG5cdFx0Y29uc3Qgd2hlbnMgPSB0ZW1wbGF0ZS5maW5kKFwiOnNjb3BlID4gW2pzdGwtd2hlbl1cIik7XG5cdFx0Y29uc3QgbGVuZ3RoID0gd2hlbnMubGVuZ3RoO1xuXHRcdGZvciAobGV0IGkgPSAwOyBpIDwgbGVuZ3RoOyBpKyspIHtcblx0XHRcdGNvbnN0IG5vZGUgPSB3aGVuc1tpXTtcblx0XHRcdGlmICghcmVzb2x2ZWQgJiYgKGF3YWl0IHJlc29sdmVyLnJlc29sdmUobm9kZS5hdHRyKFwianN0bC13aGVuXCIpLCBmYWxzZSkpKVxuXHRcdFx0XHRyZXNvbHZlZCA9IHRydWU7XG5cdFx0XHRlbHNlXG5cdFx0XHRcdG5vZGUucmVtb3ZlKCk7XG5cdFx0fVxuXG5cdFx0aWYgKHJlc29sdmVkKVxuXHRcdFx0dGVtcGxhdGUuZmluZChcIjpzY29wZSA+IFtqc3RsLW90aGVyd2lzZV1cIikucmVtb3ZlKCk7XG5cblx0XHRyZXR1cm4gY29udGV4dDtcblx0fVxufVxuXG5EaXJlY3RpdmUuZGVmaW5lKHsgZGlyZWN0aXZlOiBuZXcgQ2hvb3NlKCkgfSk7IiwiaW1wb3J0IERpcmVjdGl2ZSBmcm9tIFwiLi4vRGlyZWN0aXZlLmpzXCI7XG5pbXBvcnQgRXhwcmVzc2lvblJlc29sdmVyIGZyb20gXCJAZGVmYXVsdC1qcy9kZWZhdWx0anMtZXhwcmVzc2lvbi1sYW5ndWFnZS9zcmMvRXhwcmVzc2lvblJlc29sdmVyLmpzXCI7XG5cbmNvbnN0IE1PREVTID0ge1xuXHRcInJlbW90ZVwiOiBhc3luYyAoeyBkYXRhLCBjb250ZXh0IH0pID0+IHtcdFx0XG5cdFx0Y29uc3Qge3Jlc29sdmVyLCB0ZW1wbGF0ZX0gPSBjb250ZXh0O1xuXHRcdGRhdGEgPSBhd2FpdCByZXNvbHZlci5yZXNvbHZlVGV4dChkYXRhKTtcblx0XHRkYXRhID0gbmV3IFVSTChkYXRhLCBsb2NhdGlvbi5vcmlnaW4pO1xuXHRcdGxldCBvcHRpb24gPSBhd2FpdCByZXNvbHZlci5yZXNvbHZlVGV4dCh0ZW1wbGF0ZS5hdHRyKFwianN0bC1kYXRhLW9wdGlvblwiKSB8fCBcInt9XCIpO1xuXHRcdG9wdGlvbiA9IEpTT04ucGFyc2Uob3B0aW9uKTtcblxuXHRcdGRhdGEgPSBhd2FpdCBmZXRjaChkYXRhLnRvU3RyaW5nKCksIG9wdGlvbik7XG5cdFx0cmV0dXJuIGRhdGEuanNvbigpO1xuXHR9LFxuXHRcImRpcmVjdFwiOiBhc3luYyAoeyBkYXRhLCBjb250ZXh0IH0pID0+IHtcblx0XHRjb25zdCB7cmVzb2x2ZXJ9ID0gY29udGV4dDtcblx0XHRcblx0XHRkYXRhID0gYXdhaXQgcmVzb2x2ZXIucmVzb2x2ZVRleHQoZGF0YSk7XG5cdFx0cmV0dXJuIGRhdGE7XG5cdH1cbn07XG5cbmNvbnN0IHVwZGF0ZUNvbnRleHQgPSAoeyB2YXJuYW1lLCBkYXRhLCBzY29wZSwgY29udGV4dCB9KSA9PiB7XG5cdGlmICh2YXJuYW1lKVxuXHRcdGNvbnRleHQucmVzb2x2ZXIudXBkYXRlRGF0YSh2YXJuYW1lLCBkYXRhLCBzY29wZSk7XG5cdGVsc2UgaWYgKHNjb3BlKVxuXHRcdGNvbnRleHQucmVzb2x2ZXIubWVyZ2VDb250ZXh0KGRhdGEsIHNjb3BlKTtcblx0ZWxzZVxuXHRcdGNvbnRleHQucmVzb2x2ZXIgPSBuZXcgRXhwcmVzc2lvblJlc29sdmVyKHsgY29udGV4dDogZGF0YSwgbmFtZTogXCJqc3RsLWRhdGFcIiwgcGFyZW50OiBjb250ZXh0LnJlc29sdmVyIH0pO1xuXHRcblx0XHRcblx0cmV0dXJuIGNvbnRleHQ7XG59O1xuXG5cblxuY2xhc3MgRGF0YSBleHRlbmRzIERpcmVjdGl2ZSB7XG5cdGNvbnN0cnVjdG9yKCkge1xuXHRcdHN1cGVyKCk7XG5cdH1cblxuXHRnZXQgbmFtZSgpIHsgcmV0dXJuIFwiZGF0YVwiIH1cblx0Z2V0IHJhbmsoKSB7IHJldHVybiAxMDAwIH1cblx0Z2V0IHBoYXNlKCl7cmV0dXJuIERpcmVjdGl2ZS5QSEFTRS5kYXRhfVxuXG5cdGFzeW5jIGV4ZWN1dGUoY29udGV4dCkge1xuXHRcdGlmICghKGNvbnRleHQudGVtcGxhdGUgaW5zdGFuY2VvZiBIVE1MRWxlbWVudCkgfHwgIWNvbnRleHQudGVtcGxhdGUuYXR0cihcImpzdGwtZGF0YVwiKSlcblx0XHRcdHJldHVybiBjb250ZXh0O1xuXHRcdFx0XG5cdFx0dHJ5IHtcblx0XHRcdGNvbnN0IHsgdGVtcGxhdGUgfSA9IGNvbnRleHQ7XHRcdFx0XG5cdFx0XHRjb25zdCBtb2RlID0gTU9ERVNbKHRlbXBsYXRlLmF0dHIoXCJqc3RsLWRhdGEtbW9kZVwiKSB8fCBcInJlbW90ZVwiKV07XG5cdFx0XHRpZiAoIW1vZGUpXG5cdFx0XHRcdHRocm93IG5ldyBFcnJvcihcIlRoZSBqc3RsLWRhdGEtbW9kZSBpcyB1bnN1cHBvcnRlZCFcIik7XG5cblx0XHRcdGxldCBkYXRhID0gdGVtcGxhdGUuYXR0cihcImpzdGwtZGF0YVwiKTtcblx0XHRcdGRhdGEgPSBhd2FpdCBtb2RlKHsgZGF0YSwgY29udGV4dCB9KTtcblxuXHRcdFx0Y29uc3QgdmFybmFtZSA9IHRlbXBsYXRlLmF0dHIoXCJqc3RsLWRhdGEtdmFyXCIpO1xuXHRcdFx0Y29uc3Qgc2NvcGUgPSB0ZW1wbGF0ZS5hdHRyKFwianN0bC1kYXRhLXNjb3BlXCIpO1xuXHRcdFx0Y29udGV4dCA9IHVwZGF0ZUNvbnRleHQoeyB2YXJuYW1lLCBkYXRhLCBzY29wZSwgY29udGV4dCB9KTtcblx0XHR9IGNhdGNoIChlKSB7XG5cdFx0XHRjb25zb2xlLmVycm9yKGUsIGNvbnRleHQudGVtcGxhdGUpO1xuXHRcdH1cblxuXHRcdHJldHVybiBjb250ZXh0O1xuXG5cdH1cbn1cblxuRGlyZWN0aXZlLmRlZmluZSh7IGRpcmVjdGl2ZTogbmV3IERhdGEoKSB9KTsiLCJpbXBvcnQgRGlyZWN0aXZlIGZyb20gXCIuLi9EaXJlY3RpdmUuanNcIjtcbmltcG9ydCBFeHByZXNzaW9uUmVzb2x2ZXIgZnJvbSBcIkBkZWZhdWx0LWpzL2RlZmF1bHRqcy1leHByZXNzaW9uLWxhbmd1YWdlL3NyYy9FeHByZXNzaW9uUmVzb2x2ZXIuanNcIjtcblxuY29uc3QgQVRUUklCVVRFID0ge1xuXHREQVRBOiBcImpzdGwtZm9yZWFjaFwiLFxuXHRWQVI6IFwianN0bC1mb3JlYWNoLXZhclwiLFxuXHRTVEFUVVM6IFwianN0bC1mb3JlYWNoLXN0YXR1c1wiLFxuXHRDT1VOVDogXCJqc3RsLWZvcmVhY2gtY291bnRcIixcblx0U1RBUlQ6IFwianN0bC1mb3JlYWNoLXN0YXJ0XCIsXG5cdFNURVA6IFwianN0bC1mb3JlYWNoLXN0ZXBcIixcblx0Q09ORElUSU9OOiBcImpzdGwtZm9yZWFjaC1jb25kaXRpb25cIlxufTtcblxuY29uc3QgZG9Db3VudCA9IGFzeW5jIChvcHRpb24pID0+IHtcblx0bGV0IHsgc3RhcnQsIHN0ZXAsIGNvdW50LCB2YXJuYW1lLCBzdGF0dXMsIHJlc29sdmVyIH0gPSBvcHRpb247XG5cblx0Y291bnQgPSBhd2FpdCByZXNvbHZlci5yZXNvbHZlKGNvdW50KTtcblx0Y29uc3QgbGVuZ3RoID0gc3RhcnQgKyAoY291bnQgKiBzdGVwKTtcblx0bGV0IHN0b3AgPSBmYWxzZTtcblx0Zm9yIChsZXQgaSA9IHN0YXJ0OyBpIDwgbGVuZ3RoICYmICFzdG9wOyBpID0gaSArIHN0ZXApIHtcblx0XHRjb25zdCBpdGVyYXRpb24gPSB7fVxuXHRcdGl0ZXJhdGlvblt2YXJuYW1lXSA9IGk7XG5cdFx0aXRlcmF0aW9uW3N0YXR1c10gPSB7XG5cdFx0XHRpbmRleDogaSxcblx0XHRcdG51bWJlcjogaSArIDEsXG5cdFx0XHRzdGVwLFxuXHRcdFx0Y291bnRcblx0XHR9O1xuXHRcdHN0b3AgPSAhKGF3YWl0IGl0ZXJhdGUoaXRlcmF0aW9uLCBvcHRpb24pKTtcblx0fVxufTtcblxuY29uc3QgZG9Gb3JlYWNoID0gYXN5bmMgKG9wdGlvbikgPT4ge1xuXHRsZXQgeyBkYXRhLCBzdGFydCwgc3RlcCwgY291bnQsIHZhcm5hbWUsIHN0YXR1cywgcmVzb2x2ZXIgfSA9IG9wdGlvbjtcblxuXHRkYXRhID0gYXdhaXQgcmVzb2x2ZXIucmVzb2x2ZShkYXRhKTtcblx0bGV0IGFycmF5ID0gZGF0YTtcblx0aWYgKCEoZGF0YSBpbnN0YW5jZW9mIEFycmF5KSlcblx0XHRhcnJheSA9IE9iamVjdC5nZXRPd25Qcm9wZXJ0eU5hbWVzKGRhdGEpO1xuXG5cdGNvdW50ID0gY291bnQgIT0gXCJcIiA/IGF3YWl0IHJlc29sdmVyLnJlc29sdmUoY291bnQsIDApIDogbnVsbDtcblx0Y29uc3QgbGVuZ3RoID0gY291bnQgPyBNYXRoLm1pbihzdGFydCArIGNvdW50LCBhcnJheS5sZW5ndGgpIDogYXJyYXkubGVuZ3RoO1xuXHRsZXQgc3RvcCA9IGZhbHNlO1xuXHRmb3IgKGxldCBpID0gc3RhcnQ7IGkgPCBsZW5ndGggJiYgIXN0b3A7IGkgPSBpICsgc3RlcCkge1xuXHRcdGNvbnN0IGl0ZXJhdGlvbiA9IHt9XG5cdFx0aXRlcmF0aW9uW3Zhcm5hbWVdID0gZGF0YVtpXTtcblx0XHRpdGVyYXRpb25bc3RhdHVzXSA9IHtcblx0XHRcdGluZGV4OiBpLFxuXHRcdFx0bnVtYmVyOiBpICsgMSxcblx0XHRcdGNvdW50OiBsZW5ndGgsXG5cdFx0XHRkYXRhXG5cdFx0fTtcblx0XHRzdG9wID0gIShhd2FpdCBpdGVyYXRlKGl0ZXJhdGlvbiwgb3B0aW9uKSk7XG5cdH1cbn07XG5cbmNvbnN0IGl0ZXJhdGUgPSBhc3luYyAoZGF0YSwgb3B0aW9uKSA9PiB7XG5cdGxldCB7IHRlbXBsYXRlLCByZXNvbHZlciwgcmVuZGVyZXIsIGNvbnRhaW5lciwgY29uZGl0aW9uLCBjb250ZXh0IH0gPSBvcHRpb247XG5cdHJlc29sdmVyID0gbmV3IEV4cHJlc3Npb25SZXNvbHZlcih7IGNvbnRleHQ6IGRhdGEsIG5hbWU6IFwianN0bC1mb3JlYWNoXCIsIHBhcmVudDogcmVzb2x2ZXIgfSk7XG5cblx0Y29uZGl0aW9uID0gY29uZGl0aW9uID8gYXdhaXQgcmVzb2x2ZXIucmVzb2x2ZShjb25kaXRpb24sIGZhbHNlKSA6IGZhbHNlO1xuXHRpZiAoY29uZGl0aW9uKVxuXHRcdHJldHVybiBmYWxzZTtcblxuXHRhd2FpdCByZW5kZXJlci5yZW5kZXIoeyBjb250ZXh0OiBjb250ZXh0LmNsb25lKHsgcmVzb2x2ZXIsIGNvbnRhaW5lciwgdGVtcGxhdGUsIG1vZGU6IFwiYXBwZW5kXCIgfSkgfSk7XG5cdHJldHVybiB0cnVlO1xufTtcblxuY2xhc3MgRm9yZWFjaCBleHRlbmRzIERpcmVjdGl2ZSB7XG5cdGNvbnN0cnVjdG9yKCkge1xuXHRcdHN1cGVyKCk7XG5cdH1cblxuXHRnZXQgbmFtZSgpIHsgcmV0dXJuIFwiZm9yZWFjaFwiIH1cblx0Z2V0IHJhbmsoKSB7IHJldHVybiBEaXJlY3RpdmUuTUlOX1JBTksgKyAyIH1cblx0Z2V0IHBoYXNlKCkgeyByZXR1cm4gRGlyZWN0aXZlLlBIQVNFLnRlbXBsYXRlIH1cblxuXHRhc3luYyBleGVjdXRlKGNvbnRleHQpIHtcblx0XHRpZiAoIShjb250ZXh0LnRlbXBsYXRlIGluc3RhbmNlb2YgSFRNTEVsZW1lbnQpIHx8ICghY29udGV4dC50ZW1wbGF0ZS5hdHRyKEFUVFJJQlVURS5EQVRBKSAmJiAhY29udGV4dC50ZW1wbGF0ZS5hdHRyKEFUVFJJQlVURS5DT1VOVCkpKVxuXHRcdFx0cmV0dXJuIGNvbnRleHQ7XG5cblx0XHRjb250ZXh0Lmlnbm9yZSA9IHRydWU7XG5cdFx0dHJ5IHtcblx0XHRcdGNvbnN0IHsgdGVtcGxhdGUsIHJlc29sdmVyLCByZW5kZXJlciwgY29udGVudCB9ID0gY29udGV4dDtcblx0XHRcdGNvbnN0IG9wdGlvbiA9IHtcblx0XHRcdFx0ZGF0YTogKHRlbXBsYXRlLmF0dHIoQVRUUklCVVRFLkRBVEEpIHx8IFwiXCIpLnRyaW0oKSxcblx0XHRcdFx0Y291bnQ6ICh0ZW1wbGF0ZS5hdHRyKEFUVFJJQlVURS5DT1VOVCkgfHwgXCJcIikudHJpbSgpLFxuXHRcdFx0XHRzdGFydDogYXdhaXQgcmVzb2x2ZXIucmVzb2x2ZSh0ZW1wbGF0ZS5hdHRyKEFUVFJJQlVURS5TVEFSVCkgfHwgXCIwXCIpLFxuXHRcdFx0XHRzdGVwOiBhd2FpdCByZXNvbHZlci5yZXNvbHZlKHRlbXBsYXRlLmF0dHIoQVRUUklCVVRFLlNURVApIHx8IFwiMVwiKSxcblx0XHRcdFx0dmFybmFtZTogKHRlbXBsYXRlLmF0dHIoQVRUUklCVVRFLlZBUikgfHwgXCJpdGVtXCIpLnRyaW0oKSxcblx0XHRcdFx0c3RhdHVzOiAodGVtcGxhdGUuYXR0cihBVFRSSUJVVEUuU1RBVFVTKSB8fCBcInN0YXR1c1wiKS50cmltKCksXG5cdFx0XHRcdGNvbmRpdGlvbjogdGVtcGxhdGUuYXR0cihBVFRSSUJVVEUuQ09ORElUSU9OKSxcblx0XHRcdFx0dGVtcGxhdGU6IHRlbXBsYXRlLmNoaWxkTm9kZXMsXG5cdFx0XHRcdHJlc29sdmVyLFxuXHRcdFx0XHRyZW5kZXJlcixcblx0XHRcdFx0Y29udGFpbmVyOiBjb250ZW50LFxuXHRcdFx0XHRjb250ZXh0XG5cdFx0XHR9O1xuXHRcdFx0aWYgKCghb3B0aW9uLmRhdGEgfHwgb3B0aW9uLmRhdGEgPT0gXCJcIikgJiYgb3B0aW9uLmNvdW50KVxuXHRcdFx0XHRhd2FpdCBkb0NvdW50KG9wdGlvbik7XG5cdFx0XHRlbHNlXG5cdFx0XHRcdGF3YWl0IGRvRm9yZWFjaChvcHRpb24pO1xuXG5cdFx0fSBjYXRjaCAoZXJyb3IpIHtcblx0XHRcdGNvbnNvbGUuZXJyb3IoXCJlcnJvciBhdCBqc3RsLWZvcmVhY2g6XCIsIGVycm9yKTtcblx0XHR9XG5cdFx0cmV0dXJuIGNvbnRleHQ7XG5cblx0fVxufTtcblxuRGlyZWN0aXZlLmRlZmluZSh7IGRpcmVjdGl2ZTogbmV3IEZvcmVhY2goKSB9KTsiLCJpbXBvcnQgRGlyZWN0aXZlIGZyb20gXCIuLi9EaXJlY3RpdmUuanNcIjtcblxuY2xhc3MgSWYgZXh0ZW5kcyBEaXJlY3RpdmUge1xuXHRjb25zdHJ1Y3RvcigpIHtcblx0XHRzdXBlcigpO1xuXHR9XG5cblx0Z2V0IG5hbWUoKSB7IHJldHVybiBcImlmXCIgfVxuXHRnZXQgcmFuaygpIHsgcmV0dXJuIERpcmVjdGl2ZS5NSU5fUkFOSyArIDEwMDAgfVxuXHRnZXQgcGhhc2UoKSB7IHJldHVybiBEaXJlY3RpdmUuUEhBU0UuaW5pdCB9XG5cblx0YXN5bmMgZXhlY3V0ZShjb250ZXh0KSB7XG5cdFx0Y29uc3QgeyB0ZW1wbGF0ZSB9ID0gY29udGV4dDtcblx0XHRpZiAoISh0ZW1wbGF0ZSBpbnN0YW5jZW9mIEhUTUxFbGVtZW50KSB8fCAhdGVtcGxhdGUuYXR0cihcImpzdGwtaWZcIikpXG5cdFx0XHRyZXR1cm4gY29udGV4dDtcblxuXHRcdGNvbnN0IGV4cHJlc3Npb24gPSB0ZW1wbGF0ZS5hdHRyKFwianN0bC1pZlwiKTtcblx0XHRjb25zdCByZXNvbHZlciA9IGNvbnRleHQucmVzb2x2ZXI7XG5cdFx0Y29uc3QgcmVzdWx0ID0gYXdhaXQgcmVzb2x2ZXIucmVzb2x2ZShleHByZXNzaW9uLCBmYWxzZSk7XG5cdFx0aWYgKCFyZXN1bHQpIHtcblx0XHRcdGNvbnRleHQuY29udGVudCA9IG51bGw7XG5cdFx0XHRjb250ZXh0LnN0b3AgPSB0cnVlO1xuXHRcdFx0Y29udGV4dC5pZ25vcmUgPSB0cnVlO1xuXHRcdH1cblxuXHRcdHJldHVybiBjb250ZXh0O1xuXHR9XG59XG5cbkRpcmVjdGl2ZS5kZWZpbmUoeyBkaXJlY3RpdmU6IG5ldyBJZigpIH0pOyIsImltcG9ydCBEaXJlY3RpdmUgZnJvbSBcIi4uL0RpcmVjdGl2ZS5qc1wiO1xuaW1wb3J0IFRlbXBsYXRlIGZyb20gXCIuLi9UZW1wbGF0ZS5qc1wiO1xuXG5jbGFzcyBJbmNsdWRlIGV4dGVuZHMgRGlyZWN0aXZlIHtcdFxuXHRjb25zdHJ1Y3Rvcigpe1xuXHRcdHN1cGVyKCk7XG5cdH1cblx0XG5cdGdldCBuYW1lKCkge3JldHVybiBcImluY2x1ZGVcIn1cblx0Z2V0IHJhbmsoKSB7cmV0dXJuIERpcmVjdGl2ZS5NSU5fUkFOS31cblx0Z2V0IHBoYXNlKCl7cmV0dXJuIERpcmVjdGl2ZS5QSEFTRS50ZW1wbGF0ZX1cblx0XHRcblx0YXN5bmMgZXhlY3V0ZShjb250ZXh0KXtcblx0XHRpZighKGNvbnRleHQudGVtcGxhdGUgaW5zdGFuY2VvZiBIVE1MRWxlbWVudCkgfHwgIWNvbnRleHQudGVtcGxhdGUuYXR0cihcImpzdGwtaW5jbHVkZVwiKSlcblx0XHRcdHJldHVybiBjb250ZXh0O1xuXHRcdHRyeXtcblx0XHRcdGNvbnN0IHt0ZW1wbGF0ZSwgcmVzb2x2ZXIsIHJlbmRlcmVyfSA9IGNvbnRleHQ7XHRcdFxuXHRcdFx0bGV0IGluY2x1ZGUgPSB0ZW1wbGF0ZS5hdHRyKFwianN0bC1pbmNsdWRlXCIpO1xuXHRcdFx0aW5jbHVkZSA9IGF3YWl0IHJlc29sdmVyLnJlc29sdmVUZXh0KGluY2x1ZGUpO1xuXHRcdFx0aW5jbHVkZSA9IG5ldyBVUkwoaW5jbHVkZSwgbG9jYXRpb24ub3JpZ2luKTtcdFx0XHRcblx0XHRcdGluY2x1ZGUgPSBhd2FpdCBUZW1wbGF0ZS5sb2FkKGluY2x1ZGUpO1xuXHRcdFx0XG5cdFx0XHRjb25zdCBtb2RlID0gdGVtcGxhdGUuYXR0cihcImpzdGwtaW5jbHVkZS1tb2RlXCIpIHx8IFwicmVwbGFjZVwiO1xuXHRcdFx0YXdhaXQgcmVuZGVyZXIucmVuZGVyKHt0ZW1wbGF0ZTppbmNsdWRlLCBjb250YWluZXI6IGNvbnRleHQuY29udGVudCwgbW9kZSwgY29udGV4dH0pO1xuXHRcdFx0Y29udGV4dC5pZ25vcmU7XG5cdFx0XHRcblx0XHRcdHJldHVybiBjb250ZXh0O1xuXHRcdH1jYXRjaChlKXtcblx0XHRcdGNvbnNvbGUuZXJyb3IoZSwgY29udGV4dC50ZW1wbGF0ZSk7XG5cdFx0XHRyZXR1cm4gY29udGV4dDtcblx0XHR9XHRcdFxuXHR9XG59XG5cbkRpcmVjdGl2ZS5kZWZpbmUoe2RpcmVjdGl2ZTogbmV3IEluY2x1ZGUoKX0pOyIsImltcG9ydCBEaXJlY3RpdmUgZnJvbSBcIi4uL0RpcmVjdGl2ZS5qc1wiO1xuaW1wb3J0IFJlcGxhY2UgZnJvbSBcIi4uL2VsZW1lbnRzL1JlcGxhY2UuanNcIiBcblxuXG5jbGFzcyBJbml0aWFsIGV4dGVuZHMgRGlyZWN0aXZlIHtcdFxuXHRjb25zdHJ1Y3Rvcigpe1xuXHRcdHN1cGVyKCk7XG5cdH1cblx0XG5cdGdldCBuYW1lKCkge3JldHVybiBcImluaXRpYWxcIn1cblx0Z2V0IHJhbmsoKSB7cmV0dXJuIERpcmVjdGl2ZS5NSU5fUkFOS31cblx0Z2V0IHBoYXNlKCl7cmV0dXJuIERpcmVjdGl2ZS5QSEFTRS5pbml0fVxuXHRcblx0XG5cdGFzeW5jIGV4ZWN1dGUoY29udGV4dCl7XG5cdFx0Y29uc3Qge3RlbXBsYXRlfSA9IGNvbnRleHQ7XHRcdFxuXHRcdGlmKHRlbXBsYXRlIGluc3RhbmNlb2YgVGV4dClcblx0XHRcdGNvbnRleHQuY29udGVudCA9IGRvY3VtZW50LmltcG9ydE5vZGUodGVtcGxhdGUsdHJ1ZSk7XG5cdFx0ZWxzZSBpZih0ZW1wbGF0ZS5hdHRyKFwianN0bC1hc3luY1wiKSl7XG5cdFx0XHRjb250ZXh0LmNvbnRlbnQgPSBuZXcgUmVwbGFjZSgpO1xuXHRcdFx0dGVtcGxhdGUuYXR0cihcImpzdGwtYXN5bmNcIiwgbnVsbCk7XG5cdFx0XHRzZXRUaW1lb3V0KGFzeW5jICgpID0+e1xuXHRcdFx0XHRhd2FpdCBjb250ZXh0LnJlbmRlcmVyLnJlbmRlcih7bW9kZTogXCJyZXBsYWNlXCIsIHRhcmdldDogY29udGV4dC5jb250ZW50LCBjb250ZXh0fSk7XG5cdFx0XHR9LHBhcnNlSW50KHRlbXBsYXRlLmF0dHIoXCJqc3RsLWFzeW5jXCIpIHx8IFwiMjUwXCIpIHx8IDI1MCk7XG5cdFx0XHRjb250ZXh0LnN0b3AgPSB0cnVlO1xuXHRcdFx0Y29udGV4dC5pZ25vcmUgPSB0cnVlO1xuXHRcdH1lbHNlIGlmKHRlbXBsYXRlLmF0dHIoXCJqc3RsLWlnbm9yZVwiKSl7XG5cdFx0XHRjb250ZXh0LmNvbnRlbnQgPSBkb2N1bWVudC5pbXBvcnROb2RlKHRlbXBsYXRlLCB0cnVlKTtcblx0XHRcdGNvbnRleHQuc3RvcCA9IHRydWU7XG5cdFx0XHRjb250ZXh0Lmlnbm9yZSA9IHRydWU7XG5cdFx0fWVsc2UgaWYodGVtcGxhdGUudGFnTmFtZSl7XG5cdFx0XHRjb250ZXh0LmNvbnRlbnQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KHRlbXBsYXRlLnRhZ05hbWUpO1xuXHRcdH1lbHNle1xuXHRcdFx0Y29udGV4dC5zdG9wID0gdHJ1ZTtcblx0XHRcdGNvbnRleHQuaWdub3JlID0gdHJ1ZTtcblx0XHR9XG5cdFx0cmV0dXJuIGNvbnRleHQ7XG5cdH1cbn1cblxuRGlyZWN0aXZlLmRlZmluZSh7ZGlyZWN0aXZlOiBuZXcgSW5pdGlhbCgpfSk7IiwiaW1wb3J0IERpcmVjdGl2ZSBmcm9tIFwiLi4vRGlyZWN0aXZlLmpzXCI7XG5cbmNvbnN0IERFRkFVTFRfT1BUSU9OID0ge1xuXHRtb2RlOiBcInRleHRcIixcblx0dW5zZWN1cmU6IGZhbHNlLFxuXHRwcmV2ZW50Rm9ybWF0IDogZmFsc2UsXG5cdG1heExlbmd0aDogMFx0XG59O1xuXG5jb25zdCBTRUNVUkVfSFRNTF9GSUxURVIgPSBcInNjcmlwdCwgc3R5bGUsIGJvZHksIGh0bWwsIGhlYWQsIG9iamVjdCwgbGlua1wiO1xuXG5jb25zdCByZWFkT3B0aW9uID0gYXN5bmMgKHBhcmVudCwgY29udGV4dCkgPT4ge1xuXHRjb25zdCByZXNvbHZlciA9IGNvbnRleHQucmVzb2x2ZXI7XG5cdHJldHVybiB7XG5cdFx0bW9kZTogYXdhaXQgcmVzb2x2ZXIucmVzb2x2ZVRleHQoKHBhcmVudC5hdHRyKFwianN0bC10ZXh0LWNvbnRlbnQtdHlwZVwiKSB8fCBcInRleHRcIikudHJpbSgpLnRvTG93ZXJDYXNlKCkpLFxuXHRcdHVuc2VjdXJlOiBwYXJlbnQuaGFzQXR0cmlidXRlKFwianN0bC10ZXh0LXVuc2VjdXJlXCIpLFxuXHRcdHByZXZlbnRGb3JtYXQ6ICEhcGFyZW50LmF0dHIoXCJqc3RsLXRleHQtcHJldmVudC1mb3JtYXRcIikgfHwgZmFsc2UsXG5cdFx0bWF4TGVuZ3RoOiBwYXJzZUludChhd2FpdCByZXNvbHZlci5yZXNvbHZlVGV4dChwYXJlbnQuYXR0cihcImpzdGwtdGV4dC10cmltLWxlbmd0aFwiKSB8fCBcIjBcIikpXG5cdH07XG59O1xuXG5jb25zdCB0cmltVGV4dExlbmd0aCA9ICh0ZXh0LCBsZW5ndGgpID0+IHtcblx0cmV0dXJuIHRleHQubGVuZ3RoID4gbGVuZ3RoID8gdGV4dC5zdWJzdHJpbmcoMCwgbGVuZ3RoIC0gMykudHJpbSgpICsgXCIuLi5cIiA6IHRleHQ7XG59O1xuXG5jb25zdCBNT0RFUyA9IHtcblx0XCJ0ZXh0XCIgOiBhc3luYyAob3B0aW9uLCBjb250ZXh0KSA9PiB7XG5cdFx0Y29uc3Qge2NvbnRlbnQsIHJlc29sdmVyLCB0ZW1wbGF0ZX0gPSBjb250ZXh0O1xuXHRcdFxuXHRcdGxldCB0ZXh0ID0gYXdhaXQgcmVzb2x2ZXIucmVzb2x2ZVRleHQodGVtcGxhdGUudGV4dENvbnRlbnQpO1x0XHRcblx0XHR0ZXh0ID0gY3JlYXRlKHRleHQsdHJ1ZSkuY29udGVudC50ZXh0Q29udGVudDtcblx0XHRpZihvcHRpb24ubWF4TGVuZ3RoID4gMClcblx0XHRcdHRleHQgPSB0cmltVGV4dExlbmd0aCh0ZXh0LCBvcHRpb24ubWF4TGVuZ3RoKTtcdFx0XG5cdFx0XG5cdFx0Y29udGVudC50ZXh0Q29udGVudCA9IHRleHQ7XHRcdFxuXHR9LFxuXHRcImh0bWxcIjogYXN5bmMgKG9wdGlvbiwgY29udGV4dCkgPT4ge1xuXHRcdGNvbnN0IHtyZXNvbHZlciwgdGVtcGxhdGV9ID0gY29udGV4dDtcblx0XHRcblx0XHRsZXQgY29udGVudCA9IGF3YWl0IHJlc29sdmVyLnJlc29sdmVUZXh0KHRlbXBsYXRlLnRleHRDb250ZW50KTtcdFx0XG5cdFx0Y29udGVudCA9IGNyZWF0ZShjb250ZW50LHRydWUpO1x0XHRcblx0XHRjb250ZW50ID0gZG9jdW1lbnQuaW1wb3J0Tm9kZShjb250ZW50LmNvbnRlbnQsIHRydWUpO1xuXHRcdFxuXHRcdGlmKG9wdGlvbi51bnNlY3VyZSlcblx0XHRcdGNvbnRleHQuY29udGVudCA9IGNvbnRlbnQ7XHRcdFx0XG5cdFx0ZWxzZXtcblx0XHRcdGNvbnRlbnQuZmluZChTRUNVUkVfSFRNTF9GSUxURVIpLnJlbW92ZSgpO1x0XHRcdFxuXHRcdFx0Y29udGV4dC5jb250ZW50ID0gY29udGVudDtcblx0XHR9XG5cdH1cbn07XG5cblxuY2xhc3MgVGV4dENvbnRlbnQgZXh0ZW5kcyBEaXJlY3RpdmUge1xuXHRjb25zdHJ1Y3RvcigpIHtcblx0XHRzdXBlcigpO1xuXHR9XG5cblx0Z2V0IG5hbWUoKSB7IHJldHVybiBcInRleHRcIiB9XG5cdGdldCByYW5rKCkgeyByZXR1cm4gRGlyZWN0aXZlLk1JTl9SQU5LICsgMSB9XG5cdGdldCBwaGFzZSgpIHsgcmV0dXJuIERpcmVjdGl2ZS5QSEFTRS5jb250ZW50IH1cblxuXG5cblx0YXN5bmMgZXhlY3V0ZShjb250ZXh0KSB7XG5cdFx0Y29uc3QgeyB0ZW1wbGF0ZSB9ID0gY29udGV4dDtcblx0XHRpZiAoISh0ZW1wbGF0ZSBpbnN0YW5jZW9mIFRleHQpIHx8IHRlbXBsYXRlLnRleHRDb250ZW50LnRyaW0oKS5sZW5ndGggPT0gMCB8fCAodGVtcGxhdGUucGFyZW50RWxlbWVudCAmJiB0ZW1wbGF0ZS5wYXJlbnRFbGVtZW50Lmhhc0F0dHJpYnV0ZShcImpzdGwtdGV4dC1pZ25vcmVcIikpKVxuXHRcdFx0cmV0dXJuIGNvbnRleHQ7XG5cblx0XHRjb25zdCBwYXJlbnQgPSB0ZW1wbGF0ZS5wYXJlbnRFbGVtZW50O1xuXHRcdGNvbnN0IG9wdGlvbiA9IHBhcmVudCA/IGF3YWl0IHJlYWRPcHRpb24ocGFyZW50LCBjb250ZXh0KSA6IERFRkFVTFRfT1BUSU9OO1xuXHRcdFxuXHRcdGNvbnN0ICBtb2RlID0gTU9ERVNbb3B0aW9uLm1vZGVdO1xuXHRcdGlmKCFtb2RlKVxuXHRcdFx0dGhyb3cgbmV3IEVycm9yKFwiVGV4dCBtb2RlIFxcXCJcIisgb3B0aW9uLm1vZGUgKyBcIlxcXCIgaXMgdW5zdXBwb3J0ZWQhXCIpO1xuXHRcdFxuXHRcdGF3YWl0IG1vZGUob3B0aW9uLCBjb250ZXh0KTtcblx0XHRcblx0XHRyZXR1cm4gY29udGV4dDtcblx0fVxufVxuXG5EaXJlY3RpdmUuZGVmaW5lKHsgZGlyZWN0aXZlOiBuZXcgVGV4dENvbnRlbnQoKSB9KTsiLCJpbXBvcnQgXCIuL0luaXRpYWwuanNcIjtcbmltcG9ydCBcIi4vRGF0YS5qc1wiO1xuaW1wb3J0IFwiLi9JZi5qc1wiO1xuaW1wb3J0IFwiLi9DaG9vc2UuanNcIjtcbmltcG9ydCBcIi4vSW5jbHVkZS5qc1wiO1xuaW1wb3J0IFwiLi9Gb3JlYWNoLmpzXCI7XG5pbXBvcnQgXCIuL1RleHQuanNcIjtcbmltcG9ydCBcIi4vQXR0cmlidXRlcy5qc1wiOyIsImltcG9ydCBFbGVtZW50IGZyb20gXCIuLi9FbGVtZW50LmpzXCJcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgUmVwbGFjZUVsZW1lbnQgZXh0ZW5kcyBFbGVtZW50e1xuXHRjb25zdHJ1Y3Rvcigpe1xuXHRcdHN1cGVyKCk7XG5cdFx0XG5cdFx0dGhpcy5hdHRhY2hTaGFkb3coe21vZGU6ICdvcGVuJ30pO1xuXHR9XG5cdGFzeW5jIGV4ZWN1dGUoe3RlbXBsYXRlLCBjb250ZXh0fSl7XG5cdFx0cmV0dXJuIGNvbnRleHQ7XG5cdH07XHRcdFxufVxudHJ5e2N1c3RvbUVsZW1lbnRzLmRlZmluZShcImpzdGwtcmVwbGFjZVwiLCBSZXBsYWNlRWxlbWVudCk7fWNhdGNoKGUpe30vL2lnbm9yZSIsImltcG9ydCBcIi4vUmVwbGFjZS5qc1wiIiwidmFyIGc7XG5cbi8vIFRoaXMgd29ya3MgaW4gbm9uLXN0cmljdCBtb2RlXG5nID0gKGZ1bmN0aW9uKCkge1xuXHRyZXR1cm4gdGhpcztcbn0pKCk7XG5cbnRyeSB7XG5cdC8vIFRoaXMgd29ya3MgaWYgZXZhbCBpcyBhbGxvd2VkIChzZWUgQ1NQKVxuXHRnID0gZyB8fCBuZXcgRnVuY3Rpb24oXCJyZXR1cm4gdGhpc1wiKSgpO1xufSBjYXRjaCAoZSkge1xuXHQvLyBUaGlzIHdvcmtzIGlmIHRoZSB3aW5kb3cgcmVmZXJlbmNlIGlzIGF2YWlsYWJsZVxuXHRpZiAodHlwZW9mIHdpbmRvdyA9PT0gXCJvYmplY3RcIikgZyA9IHdpbmRvdztcbn1cblxuLy8gZyBjYW4gc3RpbGwgYmUgdW5kZWZpbmVkLCBidXQgbm90aGluZyB0byBkbyBhYm91dCBpdC4uLlxuLy8gV2UgcmV0dXJuIHVuZGVmaW5lZCwgaW5zdGVhZCBvZiBub3RoaW5nIGhlcmUsIHNvIGl0J3Ncbi8vIGVhc2llciB0byBoYW5kbGUgdGhpcyBjYXNlLiBpZighZ2xvYmFsKSB7IC4uLn1cblxubW9kdWxlLmV4cG9ydHMgPSBnO1xuIiwiaW1wb3J0IENvbXBvbmVudCBmcm9tIFwiLi4vQ29tcG9uZW50XCI7XG5pbXBvcnQgeyBmaW5kQ2xvc2VzdEluRGVwdGggfSBmcm9tIFwiLi4vdXRpbHMvTm9kZUhlbHBlclwiO1xuaW1wb3J0IHsgRVZFTlRfQ0xJQ0sgYXMgUk9VVEVfQ0xJQ0sgfSBmcm9tIFwiLi9Sb3V0ZS9FdmVudHNcIjtcbmltcG9ydCB7IEVWRU5UX1RPX1JPVVRFIH0gZnJvbSBcIi4vUm91dGVMaW5rL0V2ZW50c1wiO1xuaW1wb3J0IFJlc29sdmVyIGZyb20gXCJAZGVmYXVsdC1qcy9kZWZhdWx0anMtZXhwcmVzc2lvbi1sYW5ndWFnZS9zcmMvRXhwcmVzc2lvblJlc29sdmVyXCI7XG5pbXBvcnQgUm91dGUgZnJvbSBcIi4vUm91dGVcIjtcbmltcG9ydCBSb3V0ZUxpbmsgZnJvbSBcIi4vUm91dGVMaW5rXCI7XG5pbXBvcnQgVmlldyBmcm9tIFwiLi9WaWV3XCI7XG5cbmV4cG9ydCBjb25zdCBFVkVOVF9TVE9SRV9DSEFOR0VEID0gXCJhcHAtc3RvcmUtY2hhbmdlZFwiO1xuXG5jb25zdCBmaW5kUm91dGUgPSAoYXBwLCBuYW1lKSA9PiB7XG4gICAgY29uc3Qgc2VsZWN0b3IgPSBgJHtSb3V0ZS5OT0RFTkFNRX1bbmFtZT1cIiR7bmFtZX1cIl1gO1xuICAgIHJldHVybiBhcHAuZmluZChzZWxlY3RvcikuZmlyc3QoKTtcbn1cblxuY29uc3QgYnVpbGRSb3V0ZUNvbnRleHQgPSAoY29udGV4dCwgYXBwKSA9PiB7XG5cdHRyeXtcblx0XHRyZXR1cm4gUmVzb2x2ZXIucmVzb2x2ZShjb250ZXh0LCBhcHAuc3RvcmUsIG51bGwpO1xuXHR9IGNhdGNoKGUpe1xuXHRcdHJldHVybiBudWxsO1xuXHR9XG59XG5cbmNsYXNzIEFwcENvbXBvbmVudCBleHRlbmRzIENvbXBvbmVudCB7XG5cdGNvbnN0cnVjdG9yKCkge1xuXHRcdHN1cGVyKCk7XG5cblx0XHR0aGlzLnJlYWR5LnRoZW4oKCkgPT4ge1xuXHRcdFx0dGhpcy5yb290Lm9uKFtST1VURV9DTElDSywgRVZFTlRfVE9fUk9VVEVdLCBhc3luYyAoZXZlbnQpID0+IHtcbiAgICAgICAgICAgICAgICB0aGlzLnJvdXRlKGV2ZW50LnRhcmdldCk7XHRcdFx0XHRcblx0XHRcdH0pO1xuXHRcdH0pO1xuXHR9XG5cblx0Z2V0IHJvb3QoKSB7XG5cdFx0cmV0dXJuIHRoaXM7XG5cdH1cblxuXHRhc3luYyByb3V0ZXMoKSB7XG5cdFx0cmV0dXJuIHRoaXMucm9vdC5maW5kKFJvdXRlLk5PREVOQU1FKTtcbiAgICB9XG4gICAgXG4gICAgYXN5bmMgcm91dGUocm91dGUpe1xuICAgICAgICBpZihhcmd1bWVudHMubGVuZ3RoID09IDApXG4gICAgICAgICAgICByZXR1cm4gdGhpcy5fX3JvdXRlX187XG5cblx0XHRsZXQgY29udGV4dCA9IG51bGw7XG4gICAgICAgIGlmKHR5cGVvZiByb3V0ZSA9PT0gXCJzdHJpbmdcIilcbiAgICAgICAgICAgIHJvdXRlID0gZmluZFJvdXRlKHRoaXMsIHJvdXRlKTsgICAgICAgIFxuICAgICAgICBlbHNlIGlmKHJvdXRlIGluc3RhbmNlb2YgUm91dGVMaW5rKXtcblx0XHRcdGNvbnRleHQgPSBidWlsZFJvdXRlQ29udGV4dChyb3V0ZS5jb250ZXh0LCB0aGlzKTtcbiAgICAgICAgICAgIHJvdXRlID0gZmluZFJvdXRlKHRoaXMsIHJvdXRlLnRhcmdldCk7XG5cdFx0fVxuXG5cdFx0aWYodGhpcy5fX3JvdXRlX18gPT0gcm91dGUpIHJldHVybjtcblxuICAgICAgICBpZiAodGhpcy5fX3JvdXRlX18pIHRoaXMuX19yb3V0ZV9fLmFjdGl2ZSA9IGZhbHNlO1xuICAgICAgICBhd2FpdCB0aGlzLnZpZXcuZGlzcGxheSh7cm91dGUsIGNvbnRleHR9KTtcbiAgICAgICAgdGhpcy5fX3JvdXRlX18gPSByb3V0ZTtcbiAgICAgICAgcm91dGUuYWN0aXZlID0gdHJ1ZTtcbiAgICB9XG5cblx0Z2V0IHZpZXcoKSB7XG5cdFx0aWYgKCF0aGlzLl9fdmlld19fKXtcblx0XHRcdHRoaXMuX192aWV3X18gPSBmaW5kQ2xvc2VzdEluRGVwdGgodGhpcy5yb290LCAobm9kZSkgPT4ge1xuXHRcdFx0XHRyZXR1cm4gbm9kZSBpbnN0YW5jZW9mIFZpZXc7XG5cdFx0XHR9KTtcblx0XHRcdHRoaXMuX192aWV3X18uYXBwID0gdGhpcztcblx0XHR9XG5cblx0XHRyZXR1cm4gdGhpcy5fX3ZpZXdfXztcblx0fVxuXG5cdGdldCBzdG9yZSgpIHtcblx0XHRpZiAoIXRoaXMuX19zdG9yZV9fKSB0aGlzLl9fc3RvcmVfXyA9IHt9O1xuXHRcdHJldHVybiB0aGlzLl9fc3RvcmVfXztcblx0fVxufVxuXG5leHBvcnQgZGVmYXVsdCBBcHBDb21wb25lbnQ7XG4iLCJleHBvcnQgY29uc3QgQVRUUl9OQU1FID0gXCJuYW1lXCI7XG5leHBvcnQgY29uc3QgQVRUUl9BQ1RJVkUgPSBcImFjdGl2ZVwiO1xuZXhwb3J0IGNvbnN0IEFUVFJfU1RBVEVGVUwgPSBcInN0YXRlZnVsXCI7XG5leHBvcnQgY29uc3QgQVRUUl9DT01QT05FTlRfVEFHID0gXCJjb21wb25lbnQtdGFnXCI7XG5leHBvcnQgY29uc3QgQVRUUl9DT01QT05FTlRfVEFHX0FUVFJJQlVURVMgPSBcImNvbXBvbmVudC10YWctYXR0cmlidXRlc1wiOyIsImltcG9ydCBOT0RFTkFNRSBmcm9tIFwiLi9Ob2RlbmFtZVwiO1xuZXhwb3J0IGNvbnN0IEVWRU5UX0NMSUNLID0gTk9ERU5BTUUgKyBcIi1jbGlja1wiO1xuZXhwb3J0IGNvbnN0IEVWRU5UX0FDVElWQVRFID0gTk9ERU5BTUUgKyBcIi1hY3RpdmF0ZVwiO1xuZXhwb3J0IGNvbnN0IEVWRU5UX0RFQUNUSVZBVEUgPSBOT0RFTkFNRSArIFwiLWRlYWN0aXZhdGVcIjsiLCJpbXBvcnQgeyB0b05vZGVOYW1lIH0gZnJvbSBcIi4uLy4uL3V0aWxzL0RlZmluZUNvbXBvbmVudEhlbHBlclwiO1xuZXhwb3J0IGRlZmF1bHQgdG9Ob2RlTmFtZShcInJvdXRlXCIpOyIsImltcG9ydCBDb21wb25lbnQgZnJvbSBcIi4uLy4uL0NvbXBvbmVudFwiO1xuaW1wb3J0IHsgZGVmaW5lIH0gZnJvbSBcIi4uLy4uL3V0aWxzL0RlZmluZUNvbXBvbmVudEhlbHBlclwiO1xuaW1wb3J0IHsgbG9hZFRlbXBsYXRlLCBBVFRSX1RFTVBMQVRFIH0gZnJvbSBcIi4uLy4uL1RlbXBsYXRlSGVscGVyXCI7XG5pbXBvcnQgUmVzb2x2ZXIgZnJvbSBcIkBkZWZhdWx0LWpzL2RlZmF1bHRqcy1leHByZXNzaW9uLWxhbmd1YWdlL3NyYy9FeHByZXNzaW9uUmVzb2x2ZXJcIjtcbmltcG9ydCBOT0RFTkFNRSBmcm9tIFwiLi9Ob2RlbmFtZVwiO1xuaW1wb3J0IHsgRVZFTlRfQ0xJQ0ssIEVWRU5UX0FDVElWQVRFLCBFVkVOVF9ERUFDVElWQVRFIH0gZnJvbSBcIi4vRXZlbnRzXCI7XG5pbXBvcnQgeyBBVFRSX05BTUUsIEFUVFJfQUNUSVZFLCBBVFRSX0NPTVBPTkVOVF9UQUcsIEFUVFJfQ09NUE9ORU5UX1RBR19BVFRSSUJVVEVTLCBBVFRSX1NUQVRFRlVMIH0gZnJvbSBcIi4vQXR0cmlidXRlc1wiO1xuXG5jb25zdCBBVFRSSUJVVEVTID0gW0FUVFJfTkFNRSwgQVRUUl9URU1QTEFURSwgQVRUUl9DT01QT05FTlRfVEFHLCBBVFRSX0NPTVBPTkVOVF9UQUdfQVRUUklCVVRFUywgQVRUUl9TVEFURUZVTF07XG5jb25zdCBFVkVOVFMgPSBbRVZFTlRfQ0xJQ0ssIEVWRU5UX0FDVElWQVRFLCBFVkVOVF9ERUFDVElWQVRFXTtcbmNvbnN0IGdldFRhZ0F0dHJpYnV0ZXMgPSBhc3luYyAocm91dGUpID0+IHtcblx0Y29uc3QgYXR0cmlidXRlcyA9IHJvdXRlLmF0dHIoQVRUUl9DT01QT05FTlRfVEFHX0FUVFJJQlVURVMpIHx8IFwie31cIjtcblx0cmV0dXJuIFJlc29sdmVyLnJlc29sdmUoYXR0cmlidXRlcywge30sIHt9KTtcbn07XG5cbmNvbnN0IGJ1aWxkQ29tcG9uZW50ID0gYXN5bmMgKHJvdXRlKSA9PiB7XG5cdGlmIChyb3V0ZS5oYXNBdHRyaWJ1dGUoQVRUUl9URU1QTEFURSkpIHtcblx0XHRpZiAoIXJvdXRlLl9fdGVtcGxhdGVfXykgcm91dGUuX190ZW1wbGF0ZV9fID0gbG9hZFRlbXBsYXRlKHJvdXRlLCBudWxsKTtcblx0XHRyZXR1cm4gcm91dGUuX190ZW1wbGF0ZV9fO1xuXHR9IGVsc2Uge1xuXHRcdGNvbnN0IHRhZyA9IHJvdXRlLmF0dHIoQVRUUl9DT01QT05FTlRfVEFHKTtcblx0XHRjb25zdCBjbGF6eiA9IGN1c3RvbUVsZW1lbnRzLmdldCh0YWcpO1xuXHRcdGNvbnN0IGF0dHJpYnV0ZXMgPSBhd2FpdCBnZXRUYWdBdHRyaWJ1dGVzKHJvdXRlKTtcblxuXHRcdGNvbnN0IGVsZW1lbnQgPSBuZXcgY2xhenooKTtcblx0XHRmb3IgKGF0dHJpYnV0ZSBpbiBhdHRyaWJ1dGVzKSB7XG5cdFx0XHRjb25zdCB2YWx1ZSA9IGF0dHJpYnV0ZXNbYXR0cmlidXRlXTtcblx0XHRcdGlmICh0eXBlb2YgdmFsdWUgPT09IFwic3RyaW5nXCIpIGVsZW1lbnQuYXR0cihhdHRyaWJ1dGUsIHZhbHVlKTtcblx0XHR9XG5cblx0XHRyZXR1cm4gZWxlbWVudDtcblx0fVxufTtcblxuY2xhc3MgUm91dGUgZXh0ZW5kcyBDb21wb25lbnQge1xuXHRzdGF0aWMgZ2V0IG9ic2VydmVkQXR0cmlidXRlcygpIHtcblx0XHRyZXR1cm4gQVRUUklCVVRFUztcblx0fVxuXG5cdHN0YXRpYyBnZXQgTk9ERU5BTUUoKSB7XG5cdFx0cmV0dXJuIE5PREVOQU1FO1xuXHR9XG5cblx0c3RhdGljIGdldCBFVkVOVFMoKSB7XG5cdFx0cmV0dXJuIEVWRU5UUztcblx0fVxuXG5cdGNvbnN0cnVjdG9yKCkge1xuXHRcdHN1cGVyKCk7XG5cdFx0dGhpcy5vbihcImNsaWNrXCIsICgpID0+IHtcblx0XHRcdGlmKCF0aGlzLmFjdGl2ZSlcblx0XHRcdFx0dGhpcy50cmlnZ2VyKEVWRU5UX0NMSUNLKTtcblx0XHR9KTtcblx0fVxuXG5cdGFzeW5jIGluaXQoKSB7fVxuXG5cdGdldCBuYW1lKCkge1xuXHRcdHJldHVybiB0aGlzLmF0dHIoQVRUUl9OQU1FKTtcblx0fVxuXG5cdGdldCBhY3RpdmUoKSB7XG5cdFx0cmV0dXJuIHRoaXMuaGFzQXR0cmlidXRlKEFUVFJfQUNUSVZFKTtcblx0fVxuXG5cdHNldCBhY3RpdmUoYWN0aXZlKSB7XG5cdFx0Y29uc3QgY3VycmVudCA9IHRoaXMuYWN0aXZlO1xuXHRcdGlmIChhY3RpdmUgIT0gY3VycmVudCkge1xuXHRcdFx0dGhpcy5hdHRyKEFUVFJfQUNUSVZFLCBhY3RpdmUgPyBcIlwiIDogbnVsbCk7XG5cdFx0XHRpZiAoYWN0aXZlKVxuXHRcdFx0XHR0aGlzLnRyaWdnZXIoRVZFTlRfQUNUSVZBVEUpO1xuXHRcdFx0ZWxzZSBcblx0XHRcdFx0dGhpcy50cmlnZ2VyKEVWRU5UX0RFQUNUSVZBVEUpO1xuXHRcdH1cblx0fVxuXHRcblx0Z2V0IHN0YXRlZnVsKCkge1xuXHRcdHJldHVybiB0aGlzLmF0dHIoQVRUUl9TVEFURUZVTCk7XG5cdH1cblxuXHRhc3luYyBjb21wb25lbnQoKSB7XG5cdFx0XG5cdFx0cmV0dXJuIGJ1aWxkQ29tcG9uZW50KHRoaXMpO1xuXHRcdC8qXG5cdFx0aWYgKCF0aGlzLl9fY29tcG9uZW50X18pIHtcblx0XHRcdHRoaXMuX19jb21wb25lbnRfXyA9IGF3YWl0IGJ1aWxkQ29tcG9uZW50KHRoaXMpO1xuXHRcdFx0aWYgKHRoaXMuX19jb21wb25lbnRfXyBpbnN0YW5jZW9mIFRlbXBsYXRlKSB7XG5cdFx0XHRcdGF3YWl0IFJlbmRlcmVyLnJlbmRlcih7IGNvbnRhaW5lcjogdmlldywgZGF0YSwgdGVtcGxhdGU6IHRoaXMuX19jb21wb25lbnRfXyB9KTtcblx0XHRcdFx0dGhpcy5fX2NvbXBvbmVudF9fID0gTm9kZUxpc3QuZnJvbSh2aWV3LmNoaWxkTm9kZXMpO1xuXHRcdFx0fVxuXHRcdH1cblx0XHRcblx0XHRyZXR1cm4gdGhpcy5fX2NvbXBvbmVudF9fOyovXG5cdH1cbn1cblxuZGVmaW5lKFJvdXRlKTtcbmV4cG9ydCBkZWZhdWx0IFJvdXRlO1xuIiwiZXhwb3J0IGNvbnN0IEFUVFJfVEFSR0VUID0gXCJ0YXJnZXRcIjtcbmV4cG9ydCBjb25zdCBBVFRSX0NPTlRFWFQgPSBcImNvbnRleHRcIjsiLCJpbXBvcnQgTk9ERU5BTUUgZnJvbSBcIi4vTm9kZW5hbWVcIjtcbmV4cG9ydCBjb25zdCBFVkVOVF9UT19ST1VURSA9IE5PREVOQU1FICsgXCItdG8tcm91dGVcIjsiLCJpbXBvcnQgeyB0b05vZGVOYW1lIH0gZnJvbSBcIi4uLy4uL3V0aWxzL0RlZmluZUNvbXBvbmVudEhlbHBlclwiO1xuZXhwb3J0IGRlZmF1bHQgdG9Ob2RlTmFtZShcInJvdXRlLWxpbmtcIik7IiwiaW1wb3J0IENvbXBvbmVudCBmcm9tIFwiLi4vLi4vQ29tcG9uZW50XCI7XG5pbXBvcnQgeyBkZWZpbmUgfSBmcm9tIFwiLi4vLi4vdXRpbHMvRGVmaW5lQ29tcG9uZW50SGVscGVyXCI7XG5pbXBvcnQgTk9ERU5BTUUgZnJvbSBcIi4vTm9kZW5hbWVcIjtcbmltcG9ydCB7IEVWRU5UX1RPX1JPVVRFIH0gZnJvbSBcIi4vRXZlbnRzXCI7XG5pbXBvcnQgeyBBVFRSX1RBUkdFVCwgQVRUUl9DT05URVhUfSBmcm9tIFwiLi9BdHRyaWJ1dGVzXCI7XG5pbXBvcnQge30gZnJvbSBcIi4uLy4uL3V0aWxzL05vZGVIZWxwZXJcIjtcblxuY29uc3QgQVRUUklCVVRFUyA9IFtBVFRSX1RBUkdFVCwgQVRUUl9DT05URVhUXTtcblxuY29uc3QgRVZFTlRTID0gW0VWRU5UX1RPX1JPVVRFXTtcblxuY2xhc3MgUm91dGVMaW5rIGV4dGVuZHMgQ29tcG9uZW50IHtcblx0c3RhdGljIGdldCBvYnNlcnZlZEF0dHJpYnV0ZXMoKSB7XG5cdFx0cmV0dXJuIEFUVFJJQlVURVM7XG5cdH1cblxuXHRzdGF0aWMgZ2V0IE5PREVOQU1FKCkge1xuXHRcdHJldHVybiBOT0RFTkFNRTtcblx0fVxuXG5cdHN0YXRpYyBnZXQgRVZFTlRTKCkge1xuXHRcdHJldHVybiBFVkVOVFM7XG5cdH1cblxuXHRjb25zdHJ1Y3RvcigpIHtcblx0XHRzdXBlcigpO1xuXHRcdHRoaXMub24oXCJjbGlja1wiLCAoZXZlbnQpID0+IHtcblx0XHRcdGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG5cdFx0XHR0aGlzLnRyaWdnZXIoRVZFTlRfVE9fUk9VVEUpO1xuXHRcdH0pO1xuXHR9XG5cblx0YXN5bmMgaW5pdCgpIHt9XG5cblx0Z2V0IHRhcmdldCgpIHtcblx0XHRyZXR1cm4gdGhpcy5hdHRyKEFUVFJfVEFSR0VUKTtcblx0fVxuXHRcblx0Z2V0IGNvbnRleHQoKXtcblx0XHRyZXR1cm4gdGhpcy5hdHRyKEFUVFJfQ09OVEVYVCk7XG5cdH1cbn1cblxuZGVmaW5lKFJvdXRlTGluayk7XG5leHBvcnQgZGVmYXVsdCBSb3V0ZUxpbms7XG4iLCJpbXBvcnQgeyB0b05vZGVOYW1lIH0gZnJvbSBcIi4uLy4uL3V0aWxzL0RlZmluZUNvbXBvbmVudEhlbHBlclwiO1xuZXhwb3J0IGRlZmF1bHQgdG9Ob2RlTmFtZShcInZpZXdcIik7IiwiaW1wb3J0IENvbXBvbmVudCBmcm9tIFwiLi4vLi4vQ29tcG9uZW50XCI7XG5pbXBvcnQgeyBkZWZpbmUgfSBmcm9tIFwiLi4vLi4vdXRpbHMvRGVmaW5lQ29tcG9uZW50SGVscGVyXCI7XG5pbXBvcnQgTk9ERU5BTUUgZnJvbSBcIi4vTm9kZW5hbWVcIjtcbmltcG9ydCB7IFJlbmRlcmVyLCBUZW1wbGF0ZSB9IGZyb20gXCJAZGVmYXVsdC1qcy9kZWZhdWx0anMtdGVtcGxhdGUtbGFuZ3VhZ2VcIjtcbmltcG9ydCBXZWFrRGF0YSBmcm9tIFwiLi4vLi4vdXRpbHMvV2Vha0RhdGFcIjtcblxuY29uc3QgUk9VVEVEQVRBID0gbmV3IFdlYWtEYXRhKCk7XG5cbmNsYXNzIFZpZXcgZXh0ZW5kcyBDb21wb25lbnQge1xuXHRzdGF0aWMgZ2V0IE5PREVOQU1FKCkge1xuXHRcdHJldHVybiBOT0RFTkFNRTtcblx0fVxuXG5cdGNvbnN0cnVjdG9yKCkge1xuXHRcdHN1cGVyKCk7XG5cdH1cblxuXHRnZXQgcm9vdCgpIHtcblx0XHRyZXR1cm4gdGhpcztcblx0fVxuXG5cdGdldCBhcHAoKSB7XG5cdFx0cmV0dXJuIHRoaXMuX19hcHBfXztcblx0fVxuXG5cdHNldCBhcHAoYXBwKSB7XG5cdFx0dGhpcy5fX2FwcF9fID0gYXBwO1xuXHR9XG5cblx0YXN5bmMgZGlzcGxheSh7IHJvdXRlLCBkYXRhLCB2aWV3IH0pIHtcblx0XHRpZiAodmlldylcblx0XHRcdHRocm93IG5ldyBFcnJvcihcInlvdSBtdXN0IG92ZXJyaWRlIHRoZSBkaXNwbGF5IGZ1bmN0aW9uIVwiKTtcblx0XHR0aGlzLnJvb3QuZW1wdHkoKTtcblxuXHRcdGxldCBjb21wb25lbnQgPSByb3V0ZS5zdGF0ZWZ1bCA/IFJPVVRFREFUQS52YWx1ZShyb3V0ZSwgXCJjb21wb25lbnRcIikgOiBudWxsO1xuXHRcdGlmICghY29tcG9uZW50KSB7XG5cdFx0XHRjb21wb25lbnQgPSBhd2FpdCByb3V0ZS5jb21wb25lbnQoKTtcblx0XHRcdGlmIChjb21wb25lbnQgaW5zdGFuY2VvZiBUZW1wbGF0ZSkge1xuXHRcdFx0XHRhd2FpdCBSZW5kZXJlci5yZW5kZXIoe1xyXG5cdFx0XHRcdFx0Y29udGFpbmVyOiB0aGlzLnJvb3QsIGRhdGE6IHtcblx0XHRcdFx0XHRcdCR2aWV3OiB0aGlzLFxuXHRcdFx0XHRcdFx0JGFwcDogdGhpcy5hcHAsXG5cdFx0XHRcdFx0XHQkc3RvcmU6IHRoaXMuYXBwLnN0b3JlLFxuXHRcdFx0XHRcdFx0JHJvdXRlOiByb3V0ZSxcblx0XHRcdFx0XHRcdCRkYXRhOiBkYXRhXG5cdFx0XHRcdFx0fSwgdGVtcGxhdGU6IGNvbXBvbmVudFxyXG5cdFx0XHRcdH0pO1xuXHRcdFx0XHRjb21wb25lbnQgPSBOb2RlTGlzdC5mcm9tKHZpZXcuY2hpbGROb2Rlcyk7XG5cdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHRpZiAoY29tcG9uZW50IGluc3RhbmNlb2YgVmlldylcblx0XHRcdFx0XHRhd2FpdCBjb21wb25lbnQuZGlzcGxheSh7IHJvdXRlLCBkYXRhLCB2aWV3OiB0aGlzIH0pXG5cdFx0XHRcdHRoaXMucm9vdC5hcHBlbmQoY29tcG9uZW50KTtcblx0XHRcdH1cblxuXHRcdFx0aWYgKHJvdXRlLnN0YXRlZnVsKVxuXHRcdFx0XHRST1VURURBVEEudmFsdWUocm91dGUsIFwiY29tcG9uZW50XCIsIGNvbXBvbmVudCk7XG5cdFx0fSBlbHNlIHtcblx0XHRcdGlmIChjb21wb25lbnQgaW5zdGFuY2VvZiBWaWV3KVxuXHRcdFx0XHRhd2FpdCBjb21wb25lbnQuZGlzcGxheSh7IHJvdXRlLCBkYXRhLCB2aWV3OiB0aGlzIH0pXG5cdFx0XHR0aGlzLnJvb3QuYXBwZW5kKGNvbXBvbmVudCk7XG5cdFx0fVxuXHR9XG59XG5kZWZpbmUoVmlldyk7XG5leHBvcnQgZGVmYXVsdCBWaWV3O1xuIiwiaW1wb3J0IEFwcENvbXBvbmVudCBmcm9tIFwiLi9BcHBDb21wb25lbnRcIjtcbmltcG9ydCBSb3V0ZSBmcm9tIFwiLi9Sb3V0ZVwiO1xuaW1wb3J0IFJvdXRlTGluayBmcm9tIFwiLi9Sb3V0ZUxpbmtcIjtcbmltcG9ydCBWaWV3IGZyb20gXCIuL1ZpZXdcIjtcblxuZXhwb3J0IHtBcHBDb21wb25lbnQsIFJvdXRlLCBWaWV3LCBSb3V0ZUxpbmsgfTtcbmV4cG9ydCBkZWZhdWx0IEFwcENvbXBvbmVudDsiLCJpbXBvcnQgeyBpbml0VGltZW91dCwgdHJpZ2dlclRpbWVvdXQgfSBmcm9tIFwiLi9Db25zdGFudHNcIjtcbmltcG9ydCBcIkBkZWZhdWx0LWpzL2RlZmF1bHRqcy1leHRkb21cIjtcbmltcG9ydCB7IGF0dHJpYnV0ZUNoYW5nZUV2ZW50bmFtZSwgY29tcG9uZW50RXZlbnRuYW1lIH0gZnJvbSBcIi4vdXRpbHMvRXZlbnRIZWxwZXJcIjtcbmltcG9ydCBXZWFrRGF0YSBmcm9tIFwiLi91dGlscy9XZWFrRGF0YVwiO1xuaW1wb3J0IFJlYWR5IGZyb20gXCIuL1JlYWR5XCI7XG5cbmNvbnN0IFRJTUVPVVRTID0gbmV3IFdlYWtEYXRhKCk7XG5jb25zdCBpbml0ID0gKGNvbXBvbmVudCkgPT4ge1xuXHRjb25zdCBkYXRhID0gVElNRU9VVFMuZGF0YShjb21wb25lbnQpO1xuXHRpZiAoZGF0YS5pbml0aWFsaXplKSBjbGVhclRpbWVvdXQoZGF0YS5pbml0aWFsaXplKTtcblxuXHRkYXRhLmluaXRpYWxpemUgPSBzZXRUaW1lb3V0KGFzeW5jICgpID0+IHtcblx0XHRkZWxldGUgZGF0YS5pbml0aWFsaXplO1xuXG5cdFx0UHJvbWlzZS5yZXNvbHZlKGNvbXBvbmVudC5pbml0KCkpLnRoZW4oKCkgPT4ge1xuXHRcdFx0Y29tcG9uZW50LnJlYWR5LnJlc29sdmUoKTtcblx0XHRcdGNvbXBvbmVudC50cmlnZ2VyKGNvbXBvbmVudEV2ZW50bmFtZShcImluaXRpYWx6ZWRcIiwgY29tcG9uZW50KSk7XG5cdFx0fSk7XG5cdH0sIGluaXRUaW1lb3V0KTtcbn07XG5cbmNsYXNzIENvbXBvbmVudCBleHRlbmRzIEhUTUxFbGVtZW50IHtcblx0Y29uc3RydWN0b3IoKSB7XG5cdFx0c3VwZXIoKTtcblx0XHR0aGlzLnJlYWR5ID0gUmVhZHkoKTtcblx0fVxuXG5cdGFzeW5jIGluaXQoKSB7fVxuXG5cdGNvbm5lY3RlZENhbGxiYWNrKCkge1xuXHRcdGlmKHRoaXMub3duZXJEb2N1bWVudCA9PSBkb2N1bWVudClcblx0XHRcdGluaXQodGhpcyk7XG5cdH1cblxuXHRhZG9wdGVkQ2FsbGJhY2soKSB7XG5cdFx0dGhpcy5jb25uZWN0ZWRDYWxsYmFjaygpO1xuXHR9XG5cblx0YXR0cmlidXRlQ2hhbmdlZENhbGxiYWNrKG5hbWUsIG9sZFZhbHVlLCBuZXdWYWx1ZSkge1xuXHRcdGlmIChvbGRWYWx1ZSAhPSBuZXdWYWx1ZSAmJiB0aGlzLmlzQ29ubmVjdGVkKSB7XG5cdFx0XHR0aGlzLnRyaWdnZXIodHJpZ2dlclRpbWVvdXQsIGF0dHJpYnV0ZUNoYW5nZUV2ZW50bmFtZShuYW1lLCB0aGlzKSk7XG5cdFx0XHR0aGlzLnRyaWdnZXIodHJpZ2dlclRpbWVvdXQsIGNvbXBvbmVudEV2ZW50bmFtZShcImNoYW5nZVwiLCB0aGlzKSk7XG5cdFx0fVxuXHR9XG59XG5cbmV4cG9ydCBkZWZhdWx0IENvbXBvbmVudDtcbiIsImV4cG9ydCBjb25zdCBjb21wb25lbnRQcmVmaXggPSBcImQtXCI7XG5leHBvcnQgY29uc3QgYXR0cmlidXRlQ2hhbmdlRXZlbnRQcmVmaXggPSBcImF0dHJpYnV0ZS1cIjtcbmV4cG9ydCBjb25zdCBpbml0VGltZW91dCA9IDEwMDtcbmV4cG9ydCBjb25zdCB0cmlnZ2VyVGltZW91dCA9IDEwMDtcbiIsImV4cG9ydCBkZWZhdWx0ICgpID0+IHtcblx0bGV0IHJlc29sdmUgLCByZWplY3QgPSBudWxsO1xuXHRjb25zdCByZXN1bHQgPSBuZXcgUHJvbWlzZSgociwgZSkgPT4ge1xuXHRcdHJlc29sdmUgPSByO1xuXHRcdHJlamVjdCA9IGU7XG5cdH0pO1xuXG5cdHJlc3VsdC5yZXNvbHZlID0gcmVzb2x2ZTtcblx0cmVzdWx0LnJlamVjdCA9IHJlamVjdDtcblxuXHRyZXR1cm4gcmVzdWx0O1xufTtcbiIsImltcG9ydCB7VGVtcGxhdGV9IGZyb20gXCJAZGVmYXVsdC1qcy9kZWZhdWx0anMtdGVtcGxhdGUtbGFuZ3VhZ2VcIjtcbmV4cG9ydCBjb25zdCBBVFRSX1RFTVBMQVRFID0gXCJ0ZW1wbGF0ZVwiO1xuXG5jb25zdCBnZXRUZW1wbGF0ZSA9IChub2RlKSA9PiB7XG5cdGxldCB0ZW1wbGF0ZSA9IG5vZGUuZmluZChcIjpzY29wZSA+IHRlbXBsYXRlXCIpLmZpcnN0KCk7XG5cdGlmICghIXRlbXBsYXRlKSByZXR1cm4gdGVtcGxhdGU7XG5cdGNvbnN0IHZhbHVlID0gbm9kZS5hdHRyKEFUVFJfVEVNUExBVEUpO1xuXHRpZiAoIXZhbHVlKSByZXR1cm4gbnVsbDtcblx0dHJ5IHtcblx0XHR0ZW1wbGF0ZSA9IGZpbmQodmFsdWUpLmZpcnN0KCk7XG5cdFx0aWYgKCEhdGVtcGxhdGUpIHJldHVybiB0ZW1wbGF0ZTtcblx0fSBjYXRjaCAoZSkge31cblx0cmV0dXJuIG5ldyBVUkwodmFsdWUsIGxvY2F0aW9uLmhyZWYpO1xufTtcblxuZXhwb3J0IGNvbnN0IGxvYWRUZW1wbGF0ZSA9IGFzeW5jIChub2RlLCBkZWZhdWx0VGVtcGxhdGUsIGNhY2hlLCBhbGlhcykgPT4ge1xuXHRjb25zdCB0ZW1wbGF0ZSA9IGdldFRlbXBsYXRlKG5vZGUpO1xuXHRpZih0ZW1wbGF0ZSlcblx0XHRyZXR1cm4gVGVtcGxhdGUubG9hZCh0ZW1wbGF0ZSwgY2FjaGUsIGFsaWFzKTtcblxuXHRyZXR1cm4gZGVmYXVsdFRlbXBsYXRlO1xufTsiLCJpbXBvcnQgeyBjb21wb25lbnRQcmVmaXggfSBmcm9tIFwiLi4vQ29uc3RhbnRzXCI7XG5cbmV4cG9ydCBjb25zdCB0b05vZGVOYW1lID0gKG5hbWUsIHByZWZpeCkgPT4ge1xuXHRpZih0eXBlb2YgcHJlZml4ID09PSBcInN0cmluZ1wiKVxuXHRcdHJldHVybiBwcmVmaXggKyBuYW1lO1xuXHRcdFxuXHRyZXR1cm4gY29tcG9uZW50UHJlZml4ICsgbmFtZTtcbn07XG5cbmV4cG9ydCBjb25zdCBkZWZpbmUgPSBmdW5jdGlvbihjbGF6eiwgb3B0aW9ucykge1xuXHRjb25zdCBub2RlbmFtZSA9IGNsYXp6Lk5PREVOQU1FO1xuXHRpZiAoIWN1c3RvbUVsZW1lbnRzLmdldChub2RlbmFtZSkpIHtcblx0XHRjdXN0b21FbGVtZW50cy5kZWZpbmUobm9kZW5hbWUsIGNsYXp6LCBvcHRpb25zKTtcblx0fVxufTtcblxuXG5leHBvcnQgZGVmYXVsdCBkZWZpbmU7IFxuIiwiaW1wb3J0IHthdHRyaWJ1dGVDaGFuZ2VFdmVudFByZWZpeH0gZnJvbSBcIi4uL0NvbnN0YW50c1wiO1xuXG5leHBvcnQgY29uc3QgY29tcG9uZW50RXZlbnRuYW1lID0gKGV2ZW50VHlwZSwgbm9kZSApID0+IHtcbiAgIHJldHVybiBub2RlLm5vZGVOYW1lLnRvTG93ZXJDYXNlKCkgKyBcIi1cIiArIGV2ZW50VHlwZTtcbn07XG5cblxuZXhwb3J0IGNvbnN0IGF0dHJpYnV0ZUNoYW5nZUV2ZW50bmFtZSA9IChhdHRyaWJ1dGUsIG5vZGUgKSA9PiB7XG4gICAgcmV0dXJuIGNvbXBvbmVudEV2ZW50bmFtZShhdHRyaWJ1dGVDaGFuZ2VFdmVudG5hbWUgKyBcIi1cIiArIGF0dHJpYnV0ZSwgbm9kZSk7XG59OyIsImV4cG9ydCBjb25zdCBmaW5kUGFyZW50ID0gKG5vZGUsIGNoZWNrKSA9PiB7XG5cdHdoaWxlKG5vZGUgIT0gbnVsbCkge1x0XHRcbiAgICAgICAgaWYoY2hlY2sobm9kZSkpXG4gICAgICAgICAgICByZXR1cm4gbm9kZTtcblxuICAgICAgICBub2RlID0gbm9kZS5wYXJlbnQoKTtcdFx0XHRcbiAgICB9XG4gICAgXG4gICAgcmV0dXJuIG51bGw7XG59O1xuXG5jb25zdCBmaW5kQ2xvc2VzdCA9IChub2RlLCBkZXB0aCwgY2hlY2spID0+IHtcbiAgICBpZihjaGVjayhub2RlKSlcbiAgICAgICAgcmV0dXJuIHtub2RlLCBkZXB0aH1cblxuICAgIGxldCByZXN1bHQgPSBudWxsO1xuICAgIGZvcihsZXQgY2hpbGQgb2Ygbm9kZS5jaGlsZE5vZGVzKXtcbiAgICAgICAgY29uc3QgaXRlbSA9IGZpbmRDbG9zZXN0KGNoaWxkLCBkZXB0aCArIDEsIGNoZWNrKTtcblxuICAgICAgICBpZihpdGVtICE9IG51bGwgJiYgKHJlc3VsdCA9PSBudWxsIHx8IHJlc3VsdC5kZXB0aCA+IGl0ZW0uZGVwdGgpKSAgICAgICAgICAgIFxuICAgICAgICAgICAgcmVzdWx0ID0gaXRlbTtcbiAgICB9XG5cbiAgICByZXR1cm4gcmVzdWx0O1xufVxuXG5leHBvcnQgY29uc3QgZmluZENsb3Nlc3RJbkRlcHRoID0gKG5vZGUsIGNoZWNrKSA9PiB7XG4gICAgY29uc3QgY2xvc2VzdCA9IGZpbmRDbG9zZXN0KG5vZGUsIDAsIGNoZWNrKTtcbiAgICByZXR1cm4gY2xvc2VzdCAhPSBudWxsID8gY2xvc2VzdC5ub2RlIDogbnVsbDtcbn0iLCJleHBvcnQgZGVmYXVsdCBjbGFzcyBXZWFrRGF0YSB7XG5cdGNvbnN0cnVjdG9yKCkge1xuXHRcdHRoaXMud2Vha21hcCA9IG5ldyBXZWFrTWFwKCk7XG5cdH1cblxuXHRkYXRhKHJlZmVyZW5jZSkge1xuXHRcdGxldCBkYXRhID0gdGhpcy53ZWFrbWFwLmdldChyZWZlcmVuY2UpO1xuXHRcdGlmICghZGF0YSkge1xuXHRcdFx0ZGF0YSA9IHt9O1xuXHRcdFx0dGhpcy53ZWFrbWFwLnNldChyZWZlcmVuY2UsIGRhdGEpO1xuXHRcdH1cblx0XHRyZXR1cm4gZGF0YTtcblx0fVxuXG5cdHZhbHVlKHJlZmVyZW5jZSwga2V5LCB2YWx1ZSkge1xuXHRcdGlmIChhcmd1bWVudHMubGVuZ3RoID09IDIpIHJldHVybiB0aGlzLmRhdGEocmVmZXJlbmNlKVtrZXldO1xuXHRcdGVsc2UgdGhpcy5kYXRhKHJlZmVyZW5jZSlba2V5XSA9IHZhbHVlO1xuXHR9XG59O1xuXG4iXSwic291cmNlUm9vdCI6IiJ9