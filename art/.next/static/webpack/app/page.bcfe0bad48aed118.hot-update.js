"use strict";
/*
 * ATTENTION: An "eval-source-map" devtool has been used.
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file with attached SourceMaps in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
self["webpackHotUpdate_N_E"]("app/page",{

/***/ "(app-pages-browser)/./src/app/globals.css":
/*!*****************************!*\
  !*** ./src/app/globals.css ***!
  \*****************************/
/***/ (function(module, __webpack_exports__, __webpack_require__) {

eval(__webpack_require__.ts("__webpack_require__.r(__webpack_exports__);\n/* harmony default export */ __webpack_exports__[\"default\"] = (\"94b72ddec7fb\");\nif (true) { module.hot.accept() }\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKGFwcC1wYWdlcy1icm93c2VyKS8uL3NyYy9hcHAvZ2xvYmFscy5jc3MiLCJtYXBwaW5ncyI6IjtBQUFBLCtEQUFlLGNBQWM7QUFDN0IsSUFBSSxJQUFVLElBQUksaUJBQWlCIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vX05fRS8uL3NyYy9hcHAvZ2xvYmFscy5jc3M/OTg5NiJdLCJzb3VyY2VzQ29udGVudCI6WyJleHBvcnQgZGVmYXVsdCBcIjk0YjcyZGRlYzdmYlwiXG5pZiAobW9kdWxlLmhvdCkgeyBtb2R1bGUuaG90LmFjY2VwdCgpIH1cbiJdLCJuYW1lcyI6W10sInNvdXJjZVJvb3QiOiIifQ==\n//# sourceURL=webpack-internal:///(app-pages-browser)/./src/app/globals.css\n"));

/***/ }),

/***/ "(app-pages-browser)/./src/app/page.tsx":
/*!**************************!*\
  !*** ./src/app/page.tsx ***!
  \**************************/
/***/ (function(module, __webpack_exports__, __webpack_require__) {

eval(__webpack_require__.ts("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": function() { return /* binding */ Home; }\n/* harmony export */ });\n/* harmony import */ var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react/jsx-dev-runtime */ \"(app-pages-browser)/./node_modules/next/dist/compiled/react/jsx-dev-runtime.js\");\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react */ \"(app-pages-browser)/./node_modules/next/dist/compiled/react/index.js\");\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);\n/* harmony import */ var _layout__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./layout */ \"(app-pages-browser)/./src/app/layout.tsx\");\n/* __next_internal_client_entry_do_not_use__ default auto */ \nvar _s = $RefreshSig$();\n\n\nfunction CreatePost() {\n    return /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"button\", {\n        className: \"flex rounded-md p-4\",\n        children: \"Create\"\n    }, void 0, false, {\n        fileName: \"/Users/jacobwaldor/FractalBootcamp/Art/art/src/app/page.tsx\",\n        lineNumber: 10,\n        columnNumber: 10\n    }, this);\n}\n_c = CreatePost;\nfunction Post(param) {\n    let { post } = param;\n    return /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"div\", {\n        className: \"flex border border-gray-300 rounded-md p-4 w-[75%]\",\n        children: [\n            post.name,\n            \" \",\n            post.likes,\n            \" \",\n            post.updatedAt.toLocaleDateString(),\n            \" \",\n            post.artform,\n            \" \",\n            JSON.stringify(post.parameters)\n        ]\n    }, void 0, true, {\n        fileName: \"/Users/jacobwaldor/FractalBootcamp/Art/art/src/app/page.tsx\",\n        lineNumber: 15,\n        columnNumber: 10\n    }, this);\n}\n_c1 = Post;\nfunction Home() {\n    _s();\n    const { posts } = (0,react__WEBPACK_IMPORTED_MODULE_1__.useContext)(_layout__WEBPACK_IMPORTED_MODULE_2__.GlobalContext);\n    return /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"div\", {\n        className: \"grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]\",\n        children: [\n            /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"h1\", {\n                children: \"Art Space\"\n            }, void 0, false, {\n                fileName: \"/Users/jacobwaldor/FractalBootcamp/Art/art/src/app/page.tsx\",\n                lineNumber: 22,\n                columnNumber: 7\n            }, this),\n            /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(CreatePost, {}, void 0, false, {\n                fileName: \"/Users/jacobwaldor/FractalBootcamp/Art/art/src/app/page.tsx\",\n                lineNumber: 23,\n                columnNumber: 7\n            }, this),\n            posts.map((post)=>/*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(Post, {\n                    post: post\n                }, post.id, false, {\n                    fileName: \"/Users/jacobwaldor/FractalBootcamp/Art/art/src/app/page.tsx\",\n                    lineNumber: 25,\n                    columnNumber: 9\n                }, this))\n        ]\n    }, void 0, true, {\n        fileName: \"/Users/jacobwaldor/FractalBootcamp/Art/art/src/app/page.tsx\",\n        lineNumber: 21,\n        columnNumber: 5\n    }, this);\n}\n_s(Home, \"HJzIqX8tD7UFv6WrvlK0x2fzJA4=\");\n_c2 = Home;\nvar _c, _c1, _c2;\n$RefreshReg$(_c, \"CreatePost\");\n$RefreshReg$(_c1, \"Post\");\n$RefreshReg$(_c2, \"Home\");\n\n\n;\n    // Wrapped in an IIFE to avoid polluting the global scope\n    ;\n    (function () {\n        var _a, _b;\n        // Legacy CSS implementations will `eval` browser code in a Node.js context\n        // to extract CSS. For backwards compatibility, we need to check we're in a\n        // browser context before continuing.\n        if (typeof self !== 'undefined' &&\n            // AMP / No-JS mode does not inject these helpers:\n            '$RefreshHelpers$' in self) {\n            // @ts-ignore __webpack_module__ is global\n            var currentExports = module.exports;\n            // @ts-ignore __webpack_module__ is global\n            var prevSignature = (_b = (_a = module.hot.data) === null || _a === void 0 ? void 0 : _a.prevSignature) !== null && _b !== void 0 ? _b : null;\n            // This cannot happen in MainTemplate because the exports mismatch between\n            // templating and execution.\n            self.$RefreshHelpers$.registerExportsForReactRefresh(currentExports, module.id);\n            // A module can be accepted automatically based on its exports, e.g. when\n            // it is a Refresh Boundary.\n            if (self.$RefreshHelpers$.isReactRefreshBoundary(currentExports)) {\n                // Save the previous exports signature on update so we can compare the boundary\n                // signatures. We avoid saving exports themselves since it causes memory leaks (https://github.com/vercel/next.js/pull/53797)\n                module.hot.dispose(function (data) {\n                    data.prevSignature =\n                        self.$RefreshHelpers$.getRefreshBoundarySignature(currentExports);\n                });\n                // Unconditionally accept an update to this module, we'll check if it's\n                // still a Refresh Boundary later.\n                // @ts-ignore importMeta is replaced in the loader\n                module.hot.accept();\n                // This field is set when the previous version of this module was a\n                // Refresh Boundary, letting us know we need to check for invalidation or\n                // enqueue an update.\n                if (prevSignature !== null) {\n                    // A boundary can become ineligible if its exports are incompatible\n                    // with the previous exports.\n                    //\n                    // For example, if you add/remove/change exports, we'll want to\n                    // re-execute the importing modules, and force those components to\n                    // re-render. Similarly, if you convert a class component to a\n                    // function, we want to invalidate the boundary.\n                    if (self.$RefreshHelpers$.shouldInvalidateReactRefreshBoundary(prevSignature, self.$RefreshHelpers$.getRefreshBoundarySignature(currentExports))) {\n                        module.hot.invalidate();\n                    }\n                    else {\n                        self.$RefreshHelpers$.scheduleUpdate();\n                    }\n                }\n            }\n            else {\n                // Since we just executed the code for the module, it's possible that the\n                // new exports made it ineligible for being a boundary.\n                // We only care about the case when we were _previously_ a boundary,\n                // because we already accepted this update (accidental side effect).\n                var isNoLongerABoundary = prevSignature !== null;\n                if (isNoLongerABoundary) {\n                    module.hot.invalidate();\n                }\n            }\n        }\n    })();\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKGFwcC1wYWdlcy1icm93c2VyKS8uL3NyYy9hcHAvcGFnZS50c3giLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7OztBQUdtQztBQUNNO0FBSXpDLFNBQVNFO0lBQ1AscUJBQU8sOERBQUNDO1FBQU9DLFdBQVU7a0JBQXNCOzs7Ozs7QUFDakQ7S0FGU0Y7QUFJVCxTQUFTRyxLQUFLLEtBQTRCO1FBQTVCLEVBQUVDLElBQUksRUFBc0IsR0FBNUI7SUFFWixxQkFBTyw4REFBQ0M7UUFBSUgsV0FBVTs7WUFBc0RFLEtBQUtFLElBQUk7WUFBQztZQUFFRixLQUFLRyxLQUFLO1lBQUM7WUFBRUgsS0FBS0ksU0FBUyxDQUFDQyxrQkFBa0I7WUFBRztZQUFFTCxLQUFLTSxPQUFPO1lBQUM7WUFBRUMsS0FBS0MsU0FBUyxDQUFDUixLQUFLUyxVQUFVOzs7Ozs7O0FBQzFMO01BSFNWO0FBS00sU0FBU1c7O0lBQ3RCLE1BQU0sRUFBRUMsS0FBSyxFQUFFLEdBQUdqQixpREFBVUEsQ0FBQ0Msa0RBQWFBO0lBQzFDLHFCQUNFLDhEQUFDTTtRQUFJSCxXQUFVOzswQkFDYiw4REFBQ2M7MEJBQUc7Ozs7OzswQkFDSiw4REFBQ2hCOzs7OztZQUNBZSxNQUFNRSxHQUFHLENBQUMsQ0FBQ2IscUJBQ1YsOERBQUNEO29CQUFtQkMsTUFBTUE7bUJBQWZBLEtBQUtjLEVBQUU7Ozs7Ozs7Ozs7O0FBSTFCO0dBWHdCSjtNQUFBQSIsInNvdXJjZXMiOlsid2VicGFjazovL19OX0UvLi9zcmMvYXBwL3BhZ2UudHN4P2Y2OGEiXSwic291cmNlc0NvbnRlbnQiOlsiXCJ1c2UgY2xpZW50XCI7XG5cbmltcG9ydCBJbWFnZSBmcm9tIFwibmV4dC9pbWFnZVwiO1xuaW1wb3J0IHsgdXNlQ29udGV4dCB9IGZyb20gXCJyZWFjdFwiO1xuaW1wb3J0IHsgR2xvYmFsQ29udGV4dCB9IGZyb20gXCIuL2xheW91dFwiO1xuaW1wb3J0IHsgUG9zdFR5cGUgfSBmcm9tIFwiLi9sYXlvdXRcIjtcblxuXG5mdW5jdGlvbiBDcmVhdGVQb3N0KCkge1xuICByZXR1cm4gPGJ1dHRvbiBjbGFzc05hbWU9XCJmbGV4IHJvdW5kZWQtbWQgcC00XCI+Q3JlYXRlPC9idXR0b24+O1xufVxuXG5mdW5jdGlvbiBQb3N0KHsgcG9zdCB9OiB7IHBvc3Q6IFBvc3RUeXBlIH0pIHtcblxuICByZXR1cm4gPGRpdiBjbGFzc05hbWU9XCJmbGV4IGJvcmRlciBib3JkZXItZ3JheS0zMDAgcm91bmRlZC1tZCBwLTQgdy1bNzUlXVwiPntwb3N0Lm5hbWV9IHtwb3N0Lmxpa2VzfSB7cG9zdC51cGRhdGVkQXQudG9Mb2NhbGVEYXRlU3RyaW5nKCl9IHtwb3N0LmFydGZvcm19IHtKU09OLnN0cmluZ2lmeShwb3N0LnBhcmFtZXRlcnMpfTwvZGl2Pjtcbn1cblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gSG9tZSgpIHtcbiAgY29uc3QgeyBwb3N0cyB9ID0gdXNlQ29udGV4dChHbG9iYWxDb250ZXh0KTtcbiAgcmV0dXJuIChcbiAgICA8ZGl2IGNsYXNzTmFtZT1cImdyaWQgZ3JpZC1yb3dzLVsyMHB4XzFmcl8yMHB4XSBpdGVtcy1jZW50ZXIganVzdGlmeS1pdGVtcy1jZW50ZXIgbWluLWgtc2NyZWVuIHAtOCBwYi0yMCBnYXAtMTYgc206cC0yMCBmb250LVtmYW1pbHktbmFtZTp2YXIoLS1mb250LWdlaXN0LXNhbnMpXVwiPlxuICAgICAgPGgxPkFydCBTcGFjZTwvaDE+XG4gICAgICA8Q3JlYXRlUG9zdCAvPlxuICAgICAge3Bvc3RzLm1hcCgocG9zdCkgPT4gKFxuICAgICAgICA8UG9zdCBrZXk9e3Bvc3QuaWR9IHBvc3Q9e3Bvc3R9IC8+XG4gICAgICApKX1cbiAgICA8L2Rpdj5cbiAgKTtcbn1cbiJdLCJuYW1lcyI6WyJ1c2VDb250ZXh0IiwiR2xvYmFsQ29udGV4dCIsIkNyZWF0ZVBvc3QiLCJidXR0b24iLCJjbGFzc05hbWUiLCJQb3N0IiwicG9zdCIsImRpdiIsIm5hbWUiLCJsaWtlcyIsInVwZGF0ZWRBdCIsInRvTG9jYWxlRGF0ZVN0cmluZyIsImFydGZvcm0iLCJKU09OIiwic3RyaW5naWZ5IiwicGFyYW1ldGVycyIsIkhvbWUiLCJwb3N0cyIsImgxIiwibWFwIiwiaWQiXSwic291cmNlUm9vdCI6IiJ9\n//# sourceURL=webpack-internal:///(app-pages-browser)/./src/app/page.tsx\n"));

/***/ })

});