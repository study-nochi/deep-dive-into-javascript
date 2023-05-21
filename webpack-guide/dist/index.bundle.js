"use strict";
/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
(self["webpackChunkwebpack_guide"] = self["webpackChunkwebpack_guide"] || []).push([["index"],{

/***/ "./src/another-modules.js":
/*!********************************!*\
  !*** ./src/another-modules.js ***!
  \********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (/* binding */ printMe)\n/* harmony export */ });\nfunction printMe() {\r\n  console.log('I get called from print.js!')\r\n}\n\n//# sourceURL=webpack://webpack-guide/./src/another-modules.js?");

/***/ }),

/***/ "./src/index.js":
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var lodash__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! lodash */ \"./node_modules/lodash/lodash.js\");\n/* harmony import */ var lodash__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(lodash__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var _another_modules__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./another-modules */ \"./src/another-modules.js\");\n\r\n\r\n\r\nfunction component() {\r\n  const element = document.createElement('div');\r\n  const btn = document.createElement('button');\r\n\r\n  element.innerHTML = lodash__WEBPACK_IMPORTED_MODULE_0___default().join(['Hello', 'webpack'], ' ');\r\n\r\n  btn.innerHTML = 'Click me and check the console!';\r\n  btn.onclick = _another_modules__WEBPACK_IMPORTED_MODULE_1__[\"default\"];\r\n\r\n  element.appendChild(btn);\r\n\r\n  return element;\r\n}\r\n\r\ndocument.body.appendChild(component());\n\n//# sourceURL=webpack://webpack-guide/./src/index.js?");

/***/ })

},
/******/ __webpack_require__ => { // webpackRuntimeModules
/******/ var __webpack_exec__ = (moduleId) => (__webpack_require__(__webpack_require__.s = moduleId))
/******/ __webpack_require__.O(0, ["shared"], () => (__webpack_exec__("./src/index.js")));
/******/ var __webpack_exports__ = __webpack_require__.O();
/******/ }
]);