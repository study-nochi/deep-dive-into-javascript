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

/***/ 138:
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var lodash__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! lodash */ 486);\n/* harmony import */ var lodash__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(lodash__WEBPACK_IMPORTED_MODULE_0__);\n// import Print from './print'\r\n\r\n\r\nfunction component() {\r\n  // return import('lodash').then(({ default: _ }) => {\r\n  // const element = document.createElement('div');\r\n\r\n  // element.innerHTML = _.join(['Hello', 'webpack'], ' ');\r\n\r\n  // return element;\r\n  // }).catch((error) => 'An error occurred while loading the component');\r\n\r\n  const element = document.createElement('div');\r\n\r\n  element.innerHTML = lodash__WEBPACK_IMPORTED_MODULE_0___default().join(['Hello', 'webpack'], ' ');\r\n  // element.onclick = Print.bind(this, 'Hello webpack');\r\n\r\n  return element;\r\n}\r\n\r\ndocument.body.appendChild(component());\n\n//# sourceURL=webpack://webpack-guide/./src/index.js?");

/***/ })

},
/******/ __webpack_require__ => { // webpackRuntimeModules
/******/ var __webpack_exec__ = (moduleId) => (__webpack_require__(__webpack_require__.s = moduleId))
/******/ __webpack_require__.O(0, ["vendors"], () => (__webpack_exec__(138)));
/******/ var __webpack_exports__ = __webpack_require__.O();
/******/ }
]);