(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define([], factory);
	else if(typeof exports === 'object')
		exports["webgl-rendering-debugger"] = factory();
	else
		root["webgl-rendering-debugger"] = factory();
})(window, function() {
return /******/ (function(modules) { // webpackBootstrap
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
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
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
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/index.ts");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./src/error/WebGLRenderingDebuggerError.ts":
/*!**************************************************!*\
  !*** ./src/error/WebGLRenderingDebuggerError.ts ***!
  \**************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return WebGLRenderingDebuggerError; });
class WebGLRenderingDebuggerError extends Error {
}


/***/ }),

/***/ "./src/error/index.ts":
/*!****************************!*\
  !*** ./src/error/index.ts ***!
  \****************************/
/*! exports provided: WebGLRenderingDebuggerError */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var error_WebGLRenderingDebuggerError__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! error/WebGLRenderingDebuggerError */ "./src/error/WebGLRenderingDebuggerError.ts");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "WebGLRenderingDebuggerError", function() { return error_WebGLRenderingDebuggerError__WEBPACK_IMPORTED_MODULE_0__["default"]; });





/***/ }),

/***/ "./src/index.ts":
/*!**********************!*\
  !*** ./src/index.ts ***!
  \**********************/
/*! exports provided: default, DrawCall */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return WebGLRenderingDebugger; });
/* harmony import */ var error__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! error */ "./src/error/index.ts");
/* harmony import */ var inspectors__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! inspectors */ "./src/inspectors/index.ts");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "DrawCall", function() { return inspectors__WEBPACK_IMPORTED_MODULE_1__["DrawCall"]; });



/**
 * WebGLRenderingDebugger
 *
 * It attaches inspector to WebGLRenderingContext instance.
 * Each of inspectors may want to invoke there task in WebGLRenderingContext's method.
 * This class controlls method wrapping and restoring.
 *
 * NOTE: This is a debugging tool therefore its behavior may affect to performance.
 */
class WebGLRenderingDebugger {
    /**
     * C'tor
     */
    constructor(ctx) {
        this.context = ctx;
        this.inspectors = {};
        this.preservations = {};
        this.invokations = {};
        this.invokationsInspectorKeyCache = {};
    }
    /**
     * Returns Inspector implements as generic argument type.
     */
    getAttachedInstpector(name) {
        return this.inspectors[name];
    }
    /**
     * Attaches inspector to WebGLRenderingContext instance.
     */
    attach(inspectorId) {
        if (this.inspectors.hasOwnProperty(inspectorId)) {
            throw new error__WEBPACK_IMPORTED_MODULE_0__["WebGLRenderingDebuggerError"]();
        }
        let inspector = null;
        switch (inspectorId) {
            case inspectors__WEBPACK_IMPORTED_MODULE_1__["InspectorIds"].DRAW_CALLS:
                inspector = new inspectors__WEBPACK_IMPORTED_MODULE_1__["DrawCall"]();
                break;
            default: break;
        }
        if (inspector === null) {
            return;
        }
        this.inspectors[inspectorId] = inspector;
        const tasks = this.inspectors[inspectorId].getInvokingTasks();
        const tragetProperties = Object.keys(tasks);
        for (let i = 0; i < tragetProperties.length; i++) {
            const targetProperty = tragetProperties[i];
            if (!this.invokations.hasOwnProperty(targetProperty)) {
                this.invokations[targetProperty] = {};
                this.invokationsInspectorKeyCache[targetProperty] = [];
            }
            this.invokations[targetProperty][inspectorId] = tasks[targetProperty];
            this.invokationsInspectorKeyCache[targetProperty].push(inspectorId);
            if (!this.preservations.hasOwnProperty(targetProperty)) {
                this.replaceContextMethod(targetProperty);
            }
        }
    }
    /**
     * Detaches inspector from WebGLRenderingContext instance.
     */
    detach(inspectorId) {
        // collect detaching inspector names
        const targetProperties = Object.keys(this.invokations);
        // iterate through invokations
        for (let i = 0; i < targetProperties.length; i++) {
            const targetProperty = targetProperties[i];
            if (!this.invokations[targetProperty].hasOwnProperty(inspectorId)) {
                continue;
            }
            delete this.invokations[targetProperty][inspectorId];
            const index = this.invokationsInspectorKeyCache[targetProperty].indexOf(inspectorId);
            if (index >= 0) {
                this.invokationsInspectorKeyCache[targetProperty].splice(index, 1);
            }
            // restore target property if all inspectors are removed
            if (Object.keys(this.invokations[targetProperty]).length === 0) {
                this.context[targetProperty] = this.preservations[targetProperty];
                delete this.invokations[targetProperty];
                delete this.invokationsInspectorKeyCache[targetProperty];
                delete this.preservations[targetProperty];
            }
        }
        delete this.inspectors[inspectorId];
    }
    /**
     * Replacing WebGLRenderingContext method to invoke inspector's tasks
     */
    replaceContextMethod(targetProperty) {
        this.preservations[targetProperty] = this.context[targetProperty];
        this.context[targetProperty] = (...args) => {
            const inspectorTasks = this.invokationsInspectorKeyCache[targetProperty];
            for (let i = 0; i < inspectorTasks.length; i++) {
                const tasks = this.invokations[targetProperty][inspectorTasks[i]];
                for (let j = 0; j < tasks.length; j++) {
                    tasks[j](...args);
                }
            }
            // call original
            this.preservations[targetProperty].call(this.context, ...args);
        };
    }
}
/**
 * public API to provide INSPECTOR_IDS to user.
 */
WebGLRenderingDebugger.Inspectors = inspectors__WEBPACK_IMPORTED_MODULE_1__["InspectorIds"];



/***/ }),

/***/ "./src/inspectors/DrawCall.ts":
/*!************************************!*\
  !*** ./src/inspectors/DrawCall.ts ***!
  \************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return DrawCall; });
class DrawCall {
    constructor() {
        /**
         * Draw call count
         */
        this._count = 0;
    }
    /**
     * Getter for draw call
     */
    get count() { return this._count; }
    /**
     * Resets draw call count to zero
     */
    resetCount() {
        this._count = 0;
    }
    /**
     * Invokes count incrementation in draw commands.
     */
    getInvokingTasks() {
        return {
            drawElements: [
                (_mode, _count, _type, _offset) => {
                    this._count++;
                }
            ],
            drawArrays: [
                (_mode, _first, _count) => {
                    this._count++;
                }
            ]
        };
    }
}


/***/ }),

/***/ "./src/inspectors/index.ts":
/*!*********************************!*\
  !*** ./src/inspectors/index.ts ***!
  \*********************************/
/*! exports provided: DrawCall, InspectorIds */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "InspectorIds", function() { return InspectorIds; });
/* harmony import */ var inspectors_DrawCall__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! inspectors/DrawCall */ "./src/inspectors/DrawCall.ts");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "DrawCall", function() { return inspectors_DrawCall__WEBPACK_IMPORTED_MODULE_0__["default"]; });


/**
 * Inspector IDs
 */
const InspectorIds = Object.freeze({
    DRAW_CALLS: inspectors_DrawCall__WEBPACK_IMPORTED_MODULE_0__["default"].name
});



/***/ })

/******/ });
});