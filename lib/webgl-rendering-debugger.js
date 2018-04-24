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
var __extends = (undefined && undefined.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var WebGLRenderingDebuggerError = /** @class */ (function (_super) {
    __extends(WebGLRenderingDebuggerError, _super);
    function WebGLRenderingDebuggerError() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return WebGLRenderingDebuggerError;
}(Error));
/* harmony default export */ __webpack_exports__["default"] = (WebGLRenderingDebuggerError);


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
/*! exports provided: default, DrawCall, Polygon, WebGLRenderingDebuggerError */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return WebGLRenderingDebugger; });
/* harmony import */ var error__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! error */ "./src/error/index.ts");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "WebGLRenderingDebuggerError", function() { return error__WEBPACK_IMPORTED_MODULE_0__["WebGLRenderingDebuggerError"]; });

/* harmony import */ var inspectors__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! inspectors */ "./src/inspectors/index.ts");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "DrawCall", function() { return inspectors__WEBPACK_IMPORTED_MODULE_1__["DrawCall"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "Polygon", function() { return inspectors__WEBPACK_IMPORTED_MODULE_1__["Polygon"]; });



/**
 * WebGLRenderingDebugger
 *
 * It attaches inspector to WebGLRenderingContext instance.
 * Each of inspectors may want to invoke there task in WebGLRenderingContext's method.
 * This class controlls method wrapping and restoring.
 *
 * NOTE: This is a debugging tool therefore its behavior may affect to performance.
 */
var WebGLRenderingDebugger = /** @class */ (function () {
    /**
     * C'tor
     */
    function WebGLRenderingDebugger(ctx) {
        this.context = ctx;
        this.inspectors = {};
        this.preservations = {};
        this.invokations = {};
        this.invokationsInspectorKeyCache = {};
    }
    WebGLRenderingDebugger.createInspector = function (inspectorId) {
        switch (inspectorId) {
            case inspectors__WEBPACK_IMPORTED_MODULE_1__["InspectorIds"].DRAW_CALLS: return new inspectors__WEBPACK_IMPORTED_MODULE_1__["DrawCall"]();
            case inspectors__WEBPACK_IMPORTED_MODULE_1__["InspectorIds"].POLYGON: return new inspectors__WEBPACK_IMPORTED_MODULE_1__["Polygon"]();
            default: return null;
        }
    };
    /**
     * Returns Inspector implements as generic argument type.
     */
    WebGLRenderingDebugger.prototype.getAttachedInstpector = function (name) {
        return this.inspectors[name];
    };
    /**
     * Attaches inspector to WebGLRenderingContext instance.
     */
    WebGLRenderingDebugger.prototype.attach = function (inspectorId) {
        if (this.inspectors.hasOwnProperty(inspectorId)) {
            throw new error__WEBPACK_IMPORTED_MODULE_0__["WebGLRenderingDebuggerError"]();
        }
        var inspector = WebGLRenderingDebugger.createInspector(inspectorId);
        if (inspector === null) {
            return;
        }
        this.inspectors[inspectorId] = inspector;
        var tasks = this.inspectors[inspectorId].getInvokingTasks();
        var tragetProperties = Object.keys(tasks);
        for (var i = 0; i < tragetProperties.length; i++) {
            var targetProperty = tragetProperties[i];
            this.attachInspector(targetProperty, inspectorId, tasks[targetProperty]);
        }
    };
    WebGLRenderingDebugger.prototype.attachInspector = function (targetProperty, inspectorId, task) {
        if (!this.invokations.hasOwnProperty(targetProperty)) {
            this.invokations[targetProperty] = {};
            this.invokationsInspectorKeyCache[targetProperty] = [];
        }
        this.invokations[targetProperty][inspectorId] = task;
        this.invokationsInspectorKeyCache[targetProperty].push(inspectorId);
        if (!this.preservations.hasOwnProperty(targetProperty)) {
            this.replaceContextMethod(targetProperty);
        }
    };
    /**
     * Detaches inspector from WebGLRenderingContext instance.
     */
    WebGLRenderingDebugger.prototype.detach = function (inspectorId) {
        // collect detaching inspector names
        var targetProperties = Object.keys(this.invokations);
        // iterate through invokations
        for (var i = 0; i < targetProperties.length; i++) {
            var targetProperty = targetProperties[i];
            this.detachInspector(targetProperty, inspectorId);
            this.restorePropertyIfNeeded(targetProperty);
        }
        delete this.inspectors[inspectorId];
    };
    WebGLRenderingDebugger.prototype.detachInspector = function (targetProperty, inspectorId) {
        if (!this.invokations[targetProperty].hasOwnProperty(inspectorId)) {
            return;
        }
        delete this.invokations[targetProperty][inspectorId];
        var index = this.invokationsInspectorKeyCache[targetProperty].indexOf(inspectorId);
        if (index >= 0) {
            this.invokationsInspectorKeyCache[targetProperty].splice(index, 1);
        }
    };
    WebGLRenderingDebugger.prototype.restorePropertyIfNeeded = function (targetProperty) {
        // restore target property if all inspectors are removed
        if (Object.keys(this.invokations[targetProperty]).length > 0) {
            return;
        }
        this.context[targetProperty] = this.preservations[targetProperty];
        delete this.invokations[targetProperty];
        delete this.invokationsInspectorKeyCache[targetProperty];
        delete this.preservations[targetProperty];
    };
    /**
     * Replacing WebGLRenderingContext method to invoke inspector's tasks
     */
    WebGLRenderingDebugger.prototype.replaceContextMethod = function (targetProperty) {
        var _this = this;
        this.preservations[targetProperty] = this.context[targetProperty];
        this.context[targetProperty] = function () {
            var args = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                args[_i] = arguments[_i];
            }
            var inspectorTasks = _this.invokationsInspectorKeyCache[targetProperty];
            for (var i = 0; i < inspectorTasks.length; i++) {
                var tasks = _this.invokations[targetProperty][inspectorTasks[i]];
                for (var j = 0; j < tasks.length; j++) {
                    tasks[j].apply(tasks, args);
                }
            }
            // call original
            (_a = _this.preservations[targetProperty]).call.apply(_a, [_this.context].concat(args));
            var _a;
        };
    };
    /**
     * public API to provide INSPECTOR_IDS to user.
     */
    WebGLRenderingDebugger.Inspectors = inspectors__WEBPACK_IMPORTED_MODULE_1__["InspectorIds"];
    return WebGLRenderingDebugger;
}());



/***/ }),

/***/ "./src/inspectors/DrawCall.ts":
/*!************************************!*\
  !*** ./src/inspectors/DrawCall.ts ***!
  \************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
var DrawCall = /** @class */ (function () {
    function DrawCall() {
        /**
         * Draw call count
         */
        this._count = 0;
    }
    Object.defineProperty(DrawCall.prototype, "count", {
        /**
         * Getter for draw call
         */
        get: function () { return this._count; },
        enumerable: true,
        configurable: true
    });
    /**
     * Resets draw call count to zero
     */
    DrawCall.prototype.resetCount = function () {
        this._count = 0;
    };
    /**
     * Invokes count incrementation in draw commands.
     */
    DrawCall.prototype.getInvokingTasks = function () {
        var _this = this;
        return {
            drawElements: [
                function (_mode, _count, _type, _offset) {
                    _this._count++;
                }
            ],
            drawArrays: [
                function (_mode, _first, _count) {
                    _this._count++;
                }
            ]
        };
    };
    return DrawCall;
}());
/* harmony default export */ __webpack_exports__["default"] = (DrawCall);


/***/ }),

/***/ "./src/inspectors/Polygon.ts":
/*!***********************************!*\
  !*** ./src/inspectors/Polygon.ts ***!
  \***********************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
var Polygon = /** @class */ (function () {
    function Polygon() {
        /**
         * Draw call count
         */
        this._count = 0;
    }
    Object.defineProperty(Polygon.prototype, "count", {
        /**
         * Getter for draw call
         */
        get: function () { return this._count; },
        enumerable: true,
        configurable: true
    });
    /**
     * Resets draw call count to zero
     */
    Polygon.prototype.resetCount = function () {
        this._count = 0;
    };
    /**
     * Invokes count incrementation in draw commands.
     */
    Polygon.prototype.getInvokingTasks = function () {
        var _this = this;
        return {
            drawElements: [
                function (_mode, count, _type, _offset) {
                    _this._count += count;
                }
            ],
            drawArrays: [
                function (_mode, _first, count) {
                    _this._count += count;
                }
            ]
        };
    };
    return Polygon;
}());
/* harmony default export */ __webpack_exports__["default"] = (Polygon);


/***/ }),

/***/ "./src/inspectors/index.ts":
/*!*********************************!*\
  !*** ./src/inspectors/index.ts ***!
  \*********************************/
/*! exports provided: DrawCall, Polygon, InspectorIds */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "InspectorIds", function() { return InspectorIds; });
/* harmony import */ var inspectors_DrawCall__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! inspectors/DrawCall */ "./src/inspectors/DrawCall.ts");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "DrawCall", function() { return inspectors_DrawCall__WEBPACK_IMPORTED_MODULE_0__["default"]; });

/* harmony import */ var inspectors_Polygon__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! inspectors/Polygon */ "./src/inspectors/Polygon.ts");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "Polygon", function() { return inspectors_Polygon__WEBPACK_IMPORTED_MODULE_1__["default"]; });



/**
 * Inspector IDs
 */
var InspectorIds = Object.freeze({
    DRAW_CALLS: inspectors_DrawCall__WEBPACK_IMPORTED_MODULE_0__["default"].name,
    POLYGON: inspectors_Polygon__WEBPACK_IMPORTED_MODULE_1__["default"].name
});



/***/ })

/******/ });
});
//# sourceMappingURL=webgl-rendering-debugger.js.map