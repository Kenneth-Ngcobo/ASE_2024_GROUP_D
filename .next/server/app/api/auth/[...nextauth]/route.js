"use strict";
/*
 * ATTENTION: An "eval-source-map" devtool has been used.
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file with attached SourceMaps in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
(() => {
var exports = {};
exports.id = "app/api/auth/[...nextauth]/route";
exports.ids = ["app/api/auth/[...nextauth]/route"];
exports.modules = {

/***/ "mongodb":
/*!**************************!*\
  !*** external "mongodb" ***!
  \**************************/
/***/ ((module) => {

module.exports = require("mongodb");

/***/ }),

/***/ "../../client/components/action-async-storage.external":
/*!*******************************************************************************!*\
  !*** external "next/dist/client/components/action-async-storage.external.js" ***!
  \*******************************************************************************/
/***/ ((module) => {

module.exports = require("next/dist/client/components/action-async-storage.external.js");

/***/ }),

/***/ "../../client/components/request-async-storage.external":
/*!********************************************************************************!*\
  !*** external "next/dist/client/components/request-async-storage.external.js" ***!
  \********************************************************************************/
/***/ ((module) => {

module.exports = require("next/dist/client/components/request-async-storage.external.js");

/***/ }),

/***/ "../../client/components/static-generation-async-storage.external":
/*!******************************************************************************************!*\
  !*** external "next/dist/client/components/static-generation-async-storage.external.js" ***!
  \******************************************************************************************/
/***/ ((module) => {

module.exports = require("next/dist/client/components/static-generation-async-storage.external.js");

/***/ }),

/***/ "next/dist/compiled/next-server/app-page.runtime.dev.js":
/*!*************************************************************************!*\
  !*** external "next/dist/compiled/next-server/app-page.runtime.dev.js" ***!
  \*************************************************************************/
/***/ ((module) => {

module.exports = require("next/dist/compiled/next-server/app-page.runtime.dev.js");

/***/ }),

/***/ "next/dist/compiled/next-server/app-route.runtime.dev.js":
/*!**************************************************************************!*\
  !*** external "next/dist/compiled/next-server/app-route.runtime.dev.js" ***!
  \**************************************************************************/
/***/ ((module) => {

module.exports = require("next/dist/compiled/next-server/app-route.runtime.dev.js");

/***/ }),

/***/ "assert":
/*!*************************!*\
  !*** external "assert" ***!
  \*************************/
/***/ ((module) => {

module.exports = require("assert");

/***/ }),

/***/ "buffer":
/*!*************************!*\
  !*** external "buffer" ***!
  \*************************/
/***/ ((module) => {

module.exports = require("buffer");

/***/ }),

/***/ "child_process":
/*!********************************!*\
  !*** external "child_process" ***!
  \********************************/
/***/ ((module) => {

module.exports = require("child_process");

/***/ }),

/***/ "crypto":
/*!*************************!*\
  !*** external "crypto" ***!
  \*************************/
/***/ ((module) => {

module.exports = require("crypto");

/***/ }),

/***/ "events":
/*!*************************!*\
  !*** external "events" ***!
  \*************************/
/***/ ((module) => {

module.exports = require("events");

/***/ }),

/***/ "fs":
/*!*********************!*\
  !*** external "fs" ***!
  \*********************/
/***/ ((module) => {

module.exports = require("fs");

/***/ }),

/***/ "http":
/*!***********************!*\
  !*** external "http" ***!
  \***********************/
/***/ ((module) => {

module.exports = require("http");

/***/ }),

/***/ "https":
/*!************************!*\
  !*** external "https" ***!
  \************************/
/***/ ((module) => {

module.exports = require("https");

/***/ }),

/***/ "net":
/*!**********************!*\
  !*** external "net" ***!
  \**********************/
/***/ ((module) => {

module.exports = require("net");

/***/ }),

/***/ "os":
/*!*********************!*\
  !*** external "os" ***!
  \*********************/
/***/ ((module) => {

module.exports = require("os");

/***/ }),

/***/ "path":
/*!***********************!*\
  !*** external "path" ***!
  \***********************/
/***/ ((module) => {

module.exports = require("path");

/***/ }),

/***/ "punycode":
/*!***************************!*\
  !*** external "punycode" ***!
  \***************************/
/***/ ((module) => {

module.exports = require("punycode");

/***/ }),

/***/ "querystring":
/*!******************************!*\
  !*** external "querystring" ***!
  \******************************/
/***/ ((module) => {

module.exports = require("querystring");

/***/ }),

/***/ "stream":
/*!*************************!*\
  !*** external "stream" ***!
  \*************************/
/***/ ((module) => {

module.exports = require("stream");

/***/ }),

/***/ "tls":
/*!**********************!*\
  !*** external "tls" ***!
  \**********************/
/***/ ((module) => {

module.exports = require("tls");

/***/ }),

/***/ "tty":
/*!**********************!*\
  !*** external "tty" ***!
  \**********************/
/***/ ((module) => {

module.exports = require("tty");

/***/ }),

/***/ "url":
/*!**********************!*\
  !*** external "url" ***!
  \**********************/
/***/ ((module) => {

module.exports = require("url");

/***/ }),

/***/ "util":
/*!***********************!*\
  !*** external "util" ***!
  \***********************/
/***/ ((module) => {

module.exports = require("util");

/***/ }),

/***/ "zlib":
/*!***********************!*\
  !*** external "zlib" ***!
  \***********************/
/***/ ((module) => {

module.exports = require("zlib");

/***/ }),

/***/ "(rsc)/./node_modules/next/dist/build/webpack/loaders/next-app-loader.js?name=app%2Fapi%2Fauth%2F%5B...nextauth%5D%2Froute&page=%2Fapi%2Fauth%2F%5B...nextauth%5D%2Froute&appPaths=&pagePath=private-next-app-dir%2Fapi%2Fauth%2F%5B...nextauth%5D%2Froute.js&appDir=C%3A%5CUsers%5CSoftware.Engineer37%5CDocuments%5Case_groupd%5CASE_2024_GROUP_D%5Capp&pageExtensions=tsx&pageExtensions=ts&pageExtensions=jsx&pageExtensions=js&rootDir=C%3A%5CUsers%5CSoftware.Engineer37%5CDocuments%5Case_groupd%5CASE_2024_GROUP_D&isDev=true&tsconfigPath=tsconfig.json&basePath=&assetPrefix=&nextConfigOutput=&preferredRegion=&middlewareConfig=e30%3D!":
/*!****************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/next/dist/build/webpack/loaders/next-app-loader.js?name=app%2Fapi%2Fauth%2F%5B...nextauth%5D%2Froute&page=%2Fapi%2Fauth%2F%5B...nextauth%5D%2Froute&appPaths=&pagePath=private-next-app-dir%2Fapi%2Fauth%2F%5B...nextauth%5D%2Froute.js&appDir=C%3A%5CUsers%5CSoftware.Engineer37%5CDocuments%5Case_groupd%5CASE_2024_GROUP_D%5Capp&pageExtensions=tsx&pageExtensions=ts&pageExtensions=jsx&pageExtensions=js&rootDir=C%3A%5CUsers%5CSoftware.Engineer37%5CDocuments%5Case_groupd%5CASE_2024_GROUP_D&isDev=true&tsconfigPath=tsconfig.json&basePath=&assetPrefix=&nextConfigOutput=&preferredRegion=&middlewareConfig=e30%3D! ***!
  \****************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   originalPathname: () => (/* binding */ originalPathname),\n/* harmony export */   patchFetch: () => (/* binding */ patchFetch),\n/* harmony export */   requestAsyncStorage: () => (/* binding */ requestAsyncStorage),\n/* harmony export */   routeModule: () => (/* binding */ routeModule),\n/* harmony export */   serverHooks: () => (/* binding */ serverHooks),\n/* harmony export */   staticGenerationAsyncStorage: () => (/* binding */ staticGenerationAsyncStorage)\n/* harmony export */ });\n/* harmony import */ var next_dist_server_future_route_modules_app_route_module_compiled__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! next/dist/server/future/route-modules/app-route/module.compiled */ \"(rsc)/./node_modules/next/dist/server/future/route-modules/app-route/module.compiled.js\");\n/* harmony import */ var next_dist_server_future_route_modules_app_route_module_compiled__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(next_dist_server_future_route_modules_app_route_module_compiled__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var next_dist_server_future_route_kind__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! next/dist/server/future/route-kind */ \"(rsc)/./node_modules/next/dist/server/future/route-kind.js\");\n/* harmony import */ var next_dist_server_lib_patch_fetch__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! next/dist/server/lib/patch-fetch */ \"(rsc)/./node_modules/next/dist/server/lib/patch-fetch.js\");\n/* harmony import */ var next_dist_server_lib_patch_fetch__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(next_dist_server_lib_patch_fetch__WEBPACK_IMPORTED_MODULE_2__);\n/* harmony import */ var C_Users_Software_Engineer37_Documents_ase_groupd_ASE_2024_GROUP_D_app_api_auth_nextauth_route_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./app/api/auth/[...nextauth]/route.js */ \"(rsc)/./app/api/auth/[...nextauth]/route.js\");\n\n\n\n\n// We inject the nextConfigOutput here so that we can use them in the route\n// module.\nconst nextConfigOutput = \"\"\nconst routeModule = new next_dist_server_future_route_modules_app_route_module_compiled__WEBPACK_IMPORTED_MODULE_0__.AppRouteRouteModule({\n    definition: {\n        kind: next_dist_server_future_route_kind__WEBPACK_IMPORTED_MODULE_1__.RouteKind.APP_ROUTE,\n        page: \"/api/auth/[...nextauth]/route\",\n        pathname: \"/api/auth/[...nextauth]\",\n        filename: \"route\",\n        bundlePath: \"app/api/auth/[...nextauth]/route\"\n    },\n    resolvedPagePath: \"C:\\\\Users\\\\Software.Engineer37\\\\Documents\\\\ase_groupd\\\\ASE_2024_GROUP_D\\\\app\\\\api\\\\auth\\\\[...nextauth]\\\\route.js\",\n    nextConfigOutput,\n    userland: C_Users_Software_Engineer37_Documents_ase_groupd_ASE_2024_GROUP_D_app_api_auth_nextauth_route_js__WEBPACK_IMPORTED_MODULE_3__\n});\n// Pull out the exports that we need to expose from the module. This should\n// be eliminated when we've moved the other routes to the new format. These\n// are used to hook into the route.\nconst { requestAsyncStorage, staticGenerationAsyncStorage, serverHooks } = routeModule;\nconst originalPathname = \"/api/auth/[...nextauth]/route\";\nfunction patchFetch() {\n    return (0,next_dist_server_lib_patch_fetch__WEBPACK_IMPORTED_MODULE_2__.patchFetch)({\n        serverHooks,\n        staticGenerationAsyncStorage\n    });\n}\n\n\n//# sourceMappingURL=app-route.js.map//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKHJzYykvLi9ub2RlX21vZHVsZXMvbmV4dC9kaXN0L2J1aWxkL3dlYnBhY2svbG9hZGVycy9uZXh0LWFwcC1sb2FkZXIuanM/bmFtZT1hcHAlMkZhcGklMkZhdXRoJTJGJTVCLi4ubmV4dGF1dGglNUQlMkZyb3V0ZSZwYWdlPSUyRmFwaSUyRmF1dGglMkYlNUIuLi5uZXh0YXV0aCU1RCUyRnJvdXRlJmFwcFBhdGhzPSZwYWdlUGF0aD1wcml2YXRlLW5leHQtYXBwLWRpciUyRmFwaSUyRmF1dGglMkYlNUIuLi5uZXh0YXV0aCU1RCUyRnJvdXRlLmpzJmFwcERpcj1DJTNBJTVDVXNlcnMlNUNTb2Z0d2FyZS5FbmdpbmVlcjM3JTVDRG9jdW1lbnRzJTVDYXNlX2dyb3VwZCU1Q0FTRV8yMDI0X0dST1VQX0QlNUNhcHAmcGFnZUV4dGVuc2lvbnM9dHN4JnBhZ2VFeHRlbnNpb25zPXRzJnBhZ2VFeHRlbnNpb25zPWpzeCZwYWdlRXh0ZW5zaW9ucz1qcyZyb290RGlyPUMlM0ElNUNVc2VycyU1Q1NvZnR3YXJlLkVuZ2luZWVyMzclNUNEb2N1bWVudHMlNUNhc2VfZ3JvdXBkJTVDQVNFXzIwMjRfR1JPVVBfRCZpc0Rldj10cnVlJnRzY29uZmlnUGF0aD10c2NvbmZpZy5qc29uJmJhc2VQYXRoPSZhc3NldFByZWZpeD0mbmV4dENvbmZpZ091dHB1dD0mcHJlZmVycmVkUmVnaW9uPSZtaWRkbGV3YXJlQ29uZmlnPWUzMCUzRCEiLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7O0FBQXNHO0FBQ3ZDO0FBQ2M7QUFDZ0U7QUFDN0k7QUFDQTtBQUNBO0FBQ0Esd0JBQXdCLGdIQUFtQjtBQUMzQztBQUNBLGNBQWMseUVBQVM7QUFDdkI7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBLFlBQVk7QUFDWixDQUFDO0FBQ0Q7QUFDQTtBQUNBO0FBQ0EsUUFBUSxpRUFBaUU7QUFDekU7QUFDQTtBQUNBLFdBQVcsNEVBQVc7QUFDdEI7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUN1SDs7QUFFdkgiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9hc2VfZ3JvdXAtZC8/MGNkOCJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBBcHBSb3V0ZVJvdXRlTW9kdWxlIH0gZnJvbSBcIm5leHQvZGlzdC9zZXJ2ZXIvZnV0dXJlL3JvdXRlLW1vZHVsZXMvYXBwLXJvdXRlL21vZHVsZS5jb21waWxlZFwiO1xuaW1wb3J0IHsgUm91dGVLaW5kIH0gZnJvbSBcIm5leHQvZGlzdC9zZXJ2ZXIvZnV0dXJlL3JvdXRlLWtpbmRcIjtcbmltcG9ydCB7IHBhdGNoRmV0Y2ggYXMgX3BhdGNoRmV0Y2ggfSBmcm9tIFwibmV4dC9kaXN0L3NlcnZlci9saWIvcGF0Y2gtZmV0Y2hcIjtcbmltcG9ydCAqIGFzIHVzZXJsYW5kIGZyb20gXCJDOlxcXFxVc2Vyc1xcXFxTb2Z0d2FyZS5FbmdpbmVlcjM3XFxcXERvY3VtZW50c1xcXFxhc2VfZ3JvdXBkXFxcXEFTRV8yMDI0X0dST1VQX0RcXFxcYXBwXFxcXGFwaVxcXFxhdXRoXFxcXFsuLi5uZXh0YXV0aF1cXFxccm91dGUuanNcIjtcbi8vIFdlIGluamVjdCB0aGUgbmV4dENvbmZpZ091dHB1dCBoZXJlIHNvIHRoYXQgd2UgY2FuIHVzZSB0aGVtIGluIHRoZSByb3V0ZVxuLy8gbW9kdWxlLlxuY29uc3QgbmV4dENvbmZpZ091dHB1dCA9IFwiXCJcbmNvbnN0IHJvdXRlTW9kdWxlID0gbmV3IEFwcFJvdXRlUm91dGVNb2R1bGUoe1xuICAgIGRlZmluaXRpb246IHtcbiAgICAgICAga2luZDogUm91dGVLaW5kLkFQUF9ST1VURSxcbiAgICAgICAgcGFnZTogXCIvYXBpL2F1dGgvWy4uLm5leHRhdXRoXS9yb3V0ZVwiLFxuICAgICAgICBwYXRobmFtZTogXCIvYXBpL2F1dGgvWy4uLm5leHRhdXRoXVwiLFxuICAgICAgICBmaWxlbmFtZTogXCJyb3V0ZVwiLFxuICAgICAgICBidW5kbGVQYXRoOiBcImFwcC9hcGkvYXV0aC9bLi4ubmV4dGF1dGhdL3JvdXRlXCJcbiAgICB9LFxuICAgIHJlc29sdmVkUGFnZVBhdGg6IFwiQzpcXFxcVXNlcnNcXFxcU29mdHdhcmUuRW5naW5lZXIzN1xcXFxEb2N1bWVudHNcXFxcYXNlX2dyb3VwZFxcXFxBU0VfMjAyNF9HUk9VUF9EXFxcXGFwcFxcXFxhcGlcXFxcYXV0aFxcXFxbLi4ubmV4dGF1dGhdXFxcXHJvdXRlLmpzXCIsXG4gICAgbmV4dENvbmZpZ091dHB1dCxcbiAgICB1c2VybGFuZFxufSk7XG4vLyBQdWxsIG91dCB0aGUgZXhwb3J0cyB0aGF0IHdlIG5lZWQgdG8gZXhwb3NlIGZyb20gdGhlIG1vZHVsZS4gVGhpcyBzaG91bGRcbi8vIGJlIGVsaW1pbmF0ZWQgd2hlbiB3ZSd2ZSBtb3ZlZCB0aGUgb3RoZXIgcm91dGVzIHRvIHRoZSBuZXcgZm9ybWF0LiBUaGVzZVxuLy8gYXJlIHVzZWQgdG8gaG9vayBpbnRvIHRoZSByb3V0ZS5cbmNvbnN0IHsgcmVxdWVzdEFzeW5jU3RvcmFnZSwgc3RhdGljR2VuZXJhdGlvbkFzeW5jU3RvcmFnZSwgc2VydmVySG9va3MgfSA9IHJvdXRlTW9kdWxlO1xuY29uc3Qgb3JpZ2luYWxQYXRobmFtZSA9IFwiL2FwaS9hdXRoL1suLi5uZXh0YXV0aF0vcm91dGVcIjtcbmZ1bmN0aW9uIHBhdGNoRmV0Y2goKSB7XG4gICAgcmV0dXJuIF9wYXRjaEZldGNoKHtcbiAgICAgICAgc2VydmVySG9va3MsXG4gICAgICAgIHN0YXRpY0dlbmVyYXRpb25Bc3luY1N0b3JhZ2VcbiAgICB9KTtcbn1cbmV4cG9ydCB7IHJvdXRlTW9kdWxlLCByZXF1ZXN0QXN5bmNTdG9yYWdlLCBzdGF0aWNHZW5lcmF0aW9uQXN5bmNTdG9yYWdlLCBzZXJ2ZXJIb29rcywgb3JpZ2luYWxQYXRobmFtZSwgcGF0Y2hGZXRjaCwgIH07XG5cbi8vIyBzb3VyY2VNYXBwaW5nVVJMPWFwcC1yb3V0ZS5qcy5tYXAiXSwibmFtZXMiOltdLCJzb3VyY2VSb290IjoiIn0=\n//# sourceURL=webpack-internal:///(rsc)/./node_modules/next/dist/build/webpack/loaders/next-app-loader.js?name=app%2Fapi%2Fauth%2F%5B...nextauth%5D%2Froute&page=%2Fapi%2Fauth%2F%5B...nextauth%5D%2Froute&appPaths=&pagePath=private-next-app-dir%2Fapi%2Fauth%2F%5B...nextauth%5D%2Froute.js&appDir=C%3A%5CUsers%5CSoftware.Engineer37%5CDocuments%5Case_groupd%5CASE_2024_GROUP_D%5Capp&pageExtensions=tsx&pageExtensions=ts&pageExtensions=jsx&pageExtensions=js&rootDir=C%3A%5CUsers%5CSoftware.Engineer37%5CDocuments%5Case_groupd%5CASE_2024_GROUP_D&isDev=true&tsconfigPath=tsconfig.json&basePath=&assetPrefix=&nextConfigOutput=&preferredRegion=&middlewareConfig=e30%3D!\n");

/***/ }),

/***/ "(rsc)/./app/api/auth/[...nextauth]/route.js":
/*!*********************************************!*\
  !*** ./app/api/auth/[...nextauth]/route.js ***!
  \*********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   GET: () => (/* binding */ handler),\n/* harmony export */   POST: () => (/* binding */ handler),\n/* harmony export */   authOptions: () => (/* binding */ authOptions)\n/* harmony export */ });\n/* harmony import */ var next_auth__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! next-auth */ \"(rsc)/./node_modules/next-auth/index.js\");\n/* harmony import */ var next_auth__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(next_auth__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var next_auth_providers_credentials__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! next-auth/providers/credentials */ \"(rsc)/./node_modules/next-auth/providers/credentials.js\");\n/* harmony import */ var next_auth_providers_google__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! next-auth/providers/google */ \"(rsc)/./node_modules/next-auth/providers/google.js\");\n/* harmony import */ var bcryptjs__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! bcryptjs */ \"(rsc)/./node_modules/bcryptjs/index.js\");\n/* harmony import */ var bcryptjs__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(bcryptjs__WEBPACK_IMPORTED_MODULE_3__);\n/* harmony import */ var _db__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../../../db */ \"(rsc)/./db.js\");\n/* harmony import */ var _db__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_db__WEBPACK_IMPORTED_MODULE_4__);\n/* harmony import */ var google_auth_library__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! google-auth-library */ \"(rsc)/./node_modules/google-auth-library/build/src/index.js\");\n\n\n\n\n\n\nconst client = new google_auth_library__WEBPACK_IMPORTED_MODULE_5__.OAuth2Client(process.env.AUTH_GOOGLE_ID);\nconst authOptions = {\n    providers: [\n        (0,next_auth_providers_credentials__WEBPACK_IMPORTED_MODULE_1__[\"default\"])({\n            name: \"Credentials\",\n            credentials: {\n                email: {\n                    label: \"Email\",\n                    type: \"email\"\n                },\n                password: {\n                    label: \"Password\",\n                    type: \"password\"\n                }\n            },\n            async authorize (credentials) {\n                const db = await _db__WEBPACK_IMPORTED_MODULE_4___default()();\n                const user = await db.collection(\"users\").findOne({\n                    email: credentials.email\n                });\n                if (user && await bcryptjs__WEBPACK_IMPORTED_MODULE_3___default().compare(credentials.password, user.password)) {\n                    return {\n                        id: user._id.toString(),\n                        email: user.email,\n                        name: user.name\n                    };\n                }\n                return null;\n            }\n        }),\n        (0,next_auth_providers_google__WEBPACK_IMPORTED_MODULE_2__[\"default\"])({\n            clientId: process.env.AUTH_GOOGLE_ID,\n            clientSecret: process.env.AUTH_GOOGLE_SECRET\n        })\n    ],\n    session: {\n        strategy: \"jwt\"\n    },\n    callbacks: {\n        async jwt ({ token, user }) {\n            if (user) {\n                token.id = user.id;\n                token.email = user.email;\n                token.name = user.name;\n            }\n            return token;\n        },\n        async session ({ session, token }) {\n            if (token) {\n                session.user.id = token.id;\n                session.user.email = token.email;\n                session.user.name = token.name;\n            }\n            return session;\n        },\n        async signIn ({ user, account }) {\n            if (account.provider === \"google\") {\n                const { id_token } = account;\n                try {\n                    // Verify the Google ID token\n                    const ticket = await client.verifyIdToken({\n                        idToken: id_token,\n                        audience: process.env.AUTH_GOOGLE_ID\n                    });\n                    const payload = ticket.getPayload();\n                    const db = await _db__WEBPACK_IMPORTED_MODULE_4___default()();\n                    const existingUser = await db.collection(\"users\").findOne({\n                        email: payload.email\n                    });\n                    if (!existingUser) {\n                        await db.collection(\"users\").insertOne({\n                            email: payload.email,\n                            name: payload.name,\n                            image: payload.picture,\n                            createdAt: new Date()\n                        });\n                    }\n                } catch (error) {\n                    console.error(\"Google ID token verification failed:\", error);\n                    return false; // Prevent sign-in if verification fails\n                }\n            }\n            return true;\n        }\n    }\n};\nconst handler = next_auth__WEBPACK_IMPORTED_MODULE_0___default()(authOptions);\n\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKHJzYykvLi9hcHAvYXBpL2F1dGgvWy4uLm5leHRhdXRoXS9yb3V0ZS5qcyIsIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7QUFBaUM7QUFDaUM7QUFDVjtBQUMxQjtBQUNpQjtBQUNJO0FBRW5ELE1BQU1NLFNBQVMsSUFBSUQsNkRBQVlBLENBQUNFLFFBQVFDLEdBQUcsQ0FBQ0MsY0FBYztBQUVuRCxNQUFNQyxjQUFjO0lBQ3ZCQyxXQUFXO1FBQ1BWLDJFQUFtQkEsQ0FBQztZQUNoQlcsTUFBTTtZQUNOQyxhQUFhO2dCQUNUQyxPQUFPO29CQUFFQyxPQUFPO29CQUFTQyxNQUFNO2dCQUFRO2dCQUN2Q0MsVUFBVTtvQkFBRUYsT0FBTztvQkFBWUMsTUFBTTtnQkFBVztZQUNwRDtZQUNBLE1BQU1FLFdBQVVMLFdBQVc7Z0JBQ3ZCLE1BQU1NLEtBQUssTUFBTWYsMENBQWlCQTtnQkFDbEMsTUFBTWdCLE9BQU8sTUFBTUQsR0FBR0UsVUFBVSxDQUFDLFNBQVNDLE9BQU8sQ0FBQztvQkFBRVIsT0FBT0QsWUFBWUMsS0FBSztnQkFBQztnQkFFN0UsSUFBSU0sUUFBUSxNQUFNakIsdURBQWMsQ0FBQ1UsWUFBWUksUUFBUSxFQUFFRyxLQUFLSCxRQUFRLEdBQUc7b0JBQ25FLE9BQU87d0JBQ0hPLElBQUlKLEtBQUtLLEdBQUcsQ0FBQ0MsUUFBUTt3QkFDckJaLE9BQU9NLEtBQUtOLEtBQUs7d0JBQ2pCRixNQUFNUSxLQUFLUixJQUFJO29CQUNuQjtnQkFDSjtnQkFDQSxPQUFPO1lBQ1g7UUFDSjtRQUNBVixzRUFBY0EsQ0FBQztZQUNYeUIsVUFBVXBCLFFBQVFDLEdBQUcsQ0FBQ0MsY0FBYztZQUNwQ21CLGNBQWNyQixRQUFRQyxHQUFHLENBQUNxQixrQkFBa0I7UUFDaEQ7S0FDSDtJQUNEQyxTQUFTO1FBQUVDLFVBQVU7SUFBTTtJQUMzQkMsV0FBVztRQUNQLE1BQU1DLEtBQUksRUFBRUMsS0FBSyxFQUFFZCxJQUFJLEVBQUU7WUFDckIsSUFBSUEsTUFBTTtnQkFDTmMsTUFBTVYsRUFBRSxHQUFHSixLQUFLSSxFQUFFO2dCQUNsQlUsTUFBTXBCLEtBQUssR0FBR00sS0FBS04sS0FBSztnQkFDeEJvQixNQUFNdEIsSUFBSSxHQUFHUSxLQUFLUixJQUFJO1lBQzFCO1lBQ0EsT0FBT3NCO1FBQ1g7UUFDQSxNQUFNSixTQUFRLEVBQUVBLE9BQU8sRUFBRUksS0FBSyxFQUFFO1lBQzVCLElBQUlBLE9BQU87Z0JBQ1BKLFFBQVFWLElBQUksQ0FBQ0ksRUFBRSxHQUFHVSxNQUFNVixFQUFFO2dCQUMxQk0sUUFBUVYsSUFBSSxDQUFDTixLQUFLLEdBQUdvQixNQUFNcEIsS0FBSztnQkFDaENnQixRQUFRVixJQUFJLENBQUNSLElBQUksR0FBR3NCLE1BQU10QixJQUFJO1lBQ2xDO1lBQ0EsT0FBT2tCO1FBQ1g7UUFDQSxNQUFNSyxRQUFPLEVBQUVmLElBQUksRUFBRWdCLE9BQU8sRUFBRTtZQUMxQixJQUFJQSxRQUFRQyxRQUFRLEtBQUssVUFBVTtnQkFDL0IsTUFBTSxFQUFFQyxRQUFRLEVBQUUsR0FBR0Y7Z0JBQ3JCLElBQUk7b0JBQ0EsNkJBQTZCO29CQUM3QixNQUFNRyxTQUFTLE1BQU1qQyxPQUFPa0MsYUFBYSxDQUFDO3dCQUN0Q0MsU0FBU0g7d0JBQ1RJLFVBQVVuQyxRQUFRQyxHQUFHLENBQUNDLGNBQWM7b0JBQ3hDO29CQUNBLE1BQU1rQyxVQUFVSixPQUFPSyxVQUFVO29CQUVqQyxNQUFNekIsS0FBSyxNQUFNZiwwQ0FBaUJBO29CQUNsQyxNQUFNeUMsZUFBZSxNQUFNMUIsR0FBR0UsVUFBVSxDQUFDLFNBQVNDLE9BQU8sQ0FBQzt3QkFBRVIsT0FBTzZCLFFBQVE3QixLQUFLO29CQUFDO29CQUVqRixJQUFJLENBQUMrQixjQUFjO3dCQUNmLE1BQU0xQixHQUFHRSxVQUFVLENBQUMsU0FBU3lCLFNBQVMsQ0FBQzs0QkFDbkNoQyxPQUFPNkIsUUFBUTdCLEtBQUs7NEJBQ3BCRixNQUFNK0IsUUFBUS9CLElBQUk7NEJBQ2xCbUMsT0FBT0osUUFBUUssT0FBTzs0QkFDdEJDLFdBQVcsSUFBSUM7d0JBQ25CO29CQUNKO2dCQUNKLEVBQUUsT0FBT0MsT0FBTztvQkFDWkMsUUFBUUQsS0FBSyxDQUFDLHdDQUF3Q0E7b0JBQ3RELE9BQU8sT0FBTyx3Q0FBd0M7Z0JBQzFEO1lBQ0o7WUFDQSxPQUFPO1FBQ1g7SUFDSjtBQUNKLEVBQUU7QUFFRixNQUFNRSxVQUFVckQsZ0RBQVFBLENBQUNVO0FBRWlCIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vYXNlX2dyb3VwLWQvLi9hcHAvYXBpL2F1dGgvWy4uLm5leHRhdXRoXS9yb3V0ZS5qcz9kYTFhIl0sInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBOZXh0QXV0aCBmcm9tIFwibmV4dC1hdXRoXCI7XHJcbmltcG9ydCBDcmVkZW50aWFsc1Byb3ZpZGVyIGZyb20gXCJuZXh0LWF1dGgvcHJvdmlkZXJzL2NyZWRlbnRpYWxzXCI7XHJcbmltcG9ydCBHb29nbGVQcm92aWRlciBmcm9tIFwibmV4dC1hdXRoL3Byb3ZpZGVycy9nb29nbGVcIjtcclxuaW1wb3J0IGJjcnlwdCBmcm9tIFwiYmNyeXB0anNcIjtcclxuaW1wb3J0IGNvbm5lY3RUb0RhdGFiYXNlIGZyb20gXCIuLi8uLi8uLi8uLi9kYlwiO1xyXG5pbXBvcnQgeyBPQXV0aDJDbGllbnQgfSBmcm9tIFwiZ29vZ2xlLWF1dGgtbGlicmFyeVwiO1xyXG5cclxuY29uc3QgY2xpZW50ID0gbmV3IE9BdXRoMkNsaWVudChwcm9jZXNzLmVudi5BVVRIX0dPT0dMRV9JRCk7XHJcblxyXG5leHBvcnQgY29uc3QgYXV0aE9wdGlvbnMgPSB7XHJcbiAgICBwcm92aWRlcnM6IFtcclxuICAgICAgICBDcmVkZW50aWFsc1Byb3ZpZGVyKHtcclxuICAgICAgICAgICAgbmFtZTogXCJDcmVkZW50aWFsc1wiLFxyXG4gICAgICAgICAgICBjcmVkZW50aWFsczoge1xyXG4gICAgICAgICAgICAgICAgZW1haWw6IHsgbGFiZWw6IFwiRW1haWxcIiwgdHlwZTogXCJlbWFpbFwiIH0sXHJcbiAgICAgICAgICAgICAgICBwYXNzd29yZDogeyBsYWJlbDogXCJQYXNzd29yZFwiLCB0eXBlOiBcInBhc3N3b3JkXCIgfSxcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgYXN5bmMgYXV0aG9yaXplKGNyZWRlbnRpYWxzKSB7XHJcbiAgICAgICAgICAgICAgICBjb25zdCBkYiA9IGF3YWl0IGNvbm5lY3RUb0RhdGFiYXNlKCk7XHJcbiAgICAgICAgICAgICAgICBjb25zdCB1c2VyID0gYXdhaXQgZGIuY29sbGVjdGlvbihcInVzZXJzXCIpLmZpbmRPbmUoeyBlbWFpbDogY3JlZGVudGlhbHMuZW1haWwgfSk7XHJcblxyXG4gICAgICAgICAgICAgICAgaWYgKHVzZXIgJiYgYXdhaXQgYmNyeXB0LmNvbXBhcmUoY3JlZGVudGlhbHMucGFzc3dvcmQsIHVzZXIucGFzc3dvcmQpKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgaWQ6IHVzZXIuX2lkLnRvU3RyaW5nKCksXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGVtYWlsOiB1c2VyLmVtYWlsLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBuYW1lOiB1c2VyLm5hbWVcclxuICAgICAgICAgICAgICAgICAgICB9O1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgcmV0dXJuIG51bGw7XHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgfSksXHJcbiAgICAgICAgR29vZ2xlUHJvdmlkZXIoe1xyXG4gICAgICAgICAgICBjbGllbnRJZDogcHJvY2Vzcy5lbnYuQVVUSF9HT09HTEVfSUQsXHJcbiAgICAgICAgICAgIGNsaWVudFNlY3JldDogcHJvY2Vzcy5lbnYuQVVUSF9HT09HTEVfU0VDUkVULFxyXG4gICAgICAgIH0pLFxyXG4gICAgXSxcclxuICAgIHNlc3Npb246IHsgc3RyYXRlZ3k6IFwiand0XCIgfSxcclxuICAgIGNhbGxiYWNrczoge1xyXG4gICAgICAgIGFzeW5jIGp3dCh7IHRva2VuLCB1c2VyIH0pIHtcclxuICAgICAgICAgICAgaWYgKHVzZXIpIHtcclxuICAgICAgICAgICAgICAgIHRva2VuLmlkID0gdXNlci5pZDtcclxuICAgICAgICAgICAgICAgIHRva2VuLmVtYWlsID0gdXNlci5lbWFpbDtcclxuICAgICAgICAgICAgICAgIHRva2VuLm5hbWUgPSB1c2VyLm5hbWU7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgcmV0dXJuIHRva2VuO1xyXG4gICAgICAgIH0sXHJcbiAgICAgICAgYXN5bmMgc2Vzc2lvbih7IHNlc3Npb24sIHRva2VuIH0pIHtcclxuICAgICAgICAgICAgaWYgKHRva2VuKSB7XHJcbiAgICAgICAgICAgICAgICBzZXNzaW9uLnVzZXIuaWQgPSB0b2tlbi5pZDtcclxuICAgICAgICAgICAgICAgIHNlc3Npb24udXNlci5lbWFpbCA9IHRva2VuLmVtYWlsO1xyXG4gICAgICAgICAgICAgICAgc2Vzc2lvbi51c2VyLm5hbWUgPSB0b2tlbi5uYW1lO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHJldHVybiBzZXNzaW9uO1xyXG4gICAgICAgIH0sXHJcbiAgICAgICAgYXN5bmMgc2lnbkluKHsgdXNlciwgYWNjb3VudCB9KSB7XHJcbiAgICAgICAgICAgIGlmIChhY2NvdW50LnByb3ZpZGVyID09PSBcImdvb2dsZVwiKSB7XHJcbiAgICAgICAgICAgICAgICBjb25zdCB7IGlkX3Rva2VuIH0gPSBhY2NvdW50O1xyXG4gICAgICAgICAgICAgICAgdHJ5IHtcclxuICAgICAgICAgICAgICAgICAgICAvLyBWZXJpZnkgdGhlIEdvb2dsZSBJRCB0b2tlblxyXG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IHRpY2tldCA9IGF3YWl0IGNsaWVudC52ZXJpZnlJZFRva2VuKHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgaWRUb2tlbjogaWRfdG9rZW4sXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGF1ZGllbmNlOiBwcm9jZXNzLmVudi5BVVRIX0dPT0dMRV9JRCxcclxuICAgICAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgICAgICAgICBjb25zdCBwYXlsb2FkID0gdGlja2V0LmdldFBheWxvYWQoKTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgY29uc3QgZGIgPSBhd2FpdCBjb25uZWN0VG9EYXRhYmFzZSgpO1xyXG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IGV4aXN0aW5nVXNlciA9IGF3YWl0IGRiLmNvbGxlY3Rpb24oXCJ1c2Vyc1wiKS5maW5kT25lKHsgZW1haWw6IHBheWxvYWQuZW1haWwgfSk7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIGlmICghZXhpc3RpbmdVc2VyKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGF3YWl0IGRiLmNvbGxlY3Rpb24oXCJ1c2Vyc1wiKS5pbnNlcnRPbmUoe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZW1haWw6IHBheWxvYWQuZW1haWwsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBuYW1lOiBwYXlsb2FkLm5hbWUsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpbWFnZTogcGF5bG9hZC5waWN0dXJlLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY3JlYXRlZEF0OiBuZXcgRGF0ZSgpLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9IGNhdGNoIChlcnJvcikge1xyXG4gICAgICAgICAgICAgICAgICAgIGNvbnNvbGUuZXJyb3IoXCJHb29nbGUgSUQgdG9rZW4gdmVyaWZpY2F0aW9uIGZhaWxlZDpcIiwgZXJyb3IpO1xyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBmYWxzZTsgLy8gUHJldmVudCBzaWduLWluIGlmIHZlcmlmaWNhdGlvbiBmYWlsc1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHJldHVybiB0cnVlO1xyXG4gICAgICAgIH0sXHJcbiAgICB9LFxyXG59O1xyXG5cclxuY29uc3QgaGFuZGxlciA9IE5leHRBdXRoKGF1dGhPcHRpb25zKTtcclxuXHJcbmV4cG9ydCB7IGhhbmRsZXIgYXMgR0VULCBoYW5kbGVyIGFzIFBPU1QgfVxyXG4iXSwibmFtZXMiOlsiTmV4dEF1dGgiLCJDcmVkZW50aWFsc1Byb3ZpZGVyIiwiR29vZ2xlUHJvdmlkZXIiLCJiY3J5cHQiLCJjb25uZWN0VG9EYXRhYmFzZSIsIk9BdXRoMkNsaWVudCIsImNsaWVudCIsInByb2Nlc3MiLCJlbnYiLCJBVVRIX0dPT0dMRV9JRCIsImF1dGhPcHRpb25zIiwicHJvdmlkZXJzIiwibmFtZSIsImNyZWRlbnRpYWxzIiwiZW1haWwiLCJsYWJlbCIsInR5cGUiLCJwYXNzd29yZCIsImF1dGhvcml6ZSIsImRiIiwidXNlciIsImNvbGxlY3Rpb24iLCJmaW5kT25lIiwiY29tcGFyZSIsImlkIiwiX2lkIiwidG9TdHJpbmciLCJjbGllbnRJZCIsImNsaWVudFNlY3JldCIsIkFVVEhfR09PR0xFX1NFQ1JFVCIsInNlc3Npb24iLCJzdHJhdGVneSIsImNhbGxiYWNrcyIsImp3dCIsInRva2VuIiwic2lnbkluIiwiYWNjb3VudCIsInByb3ZpZGVyIiwiaWRfdG9rZW4iLCJ0aWNrZXQiLCJ2ZXJpZnlJZFRva2VuIiwiaWRUb2tlbiIsImF1ZGllbmNlIiwicGF5bG9hZCIsImdldFBheWxvYWQiLCJleGlzdGluZ1VzZXIiLCJpbnNlcnRPbmUiLCJpbWFnZSIsInBpY3R1cmUiLCJjcmVhdGVkQXQiLCJEYXRlIiwiZXJyb3IiLCJjb25zb2xlIiwiaGFuZGxlciIsIkdFVCIsIlBPU1QiXSwic291cmNlUm9vdCI6IiJ9\n//# sourceURL=webpack-internal:///(rsc)/./app/api/auth/[...nextauth]/route.js\n");

/***/ }),

/***/ "(rsc)/./db.js":
/*!***************!*\
  !*** ./db.js ***!
  \***************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

eval("\nconst { MongoClient, ServerApiVersion } = __webpack_require__(/*! mongodb */ \"mongodb\");\n// Retrieve MongoDB URI from environment variables\nif (!process.env.MONGODB_URI) {\n    throw new Error('Invalid/Missing environment variable: \"MONGODB_URI\"');\n}\nconst uri = process.env.MONGODB_URI;\nconst options = {\n    serverApi: {\n        version: ServerApiVersion.v1,\n        deprecationErrors: true\n    },\n    //setting maxPoolSize to 20 will limit connections to database\n    maxPoolSize: 20\n};\nlet client;\nlet cachedDb = null; // Cache database instance for reuse\nasync function connectToDatabase() {\n    // Check if we're already connected and return cached DB\n    if (cachedDb) {\n        return cachedDb;\n    }\n    if (!client) {\n        // Initialize a new MongoDB client if not already initialized\n        client = new MongoClient(uri, options);\n        await client.connect();\n        console.log(\"Connected to MongoDB!\");\n    }\n    // Connect to specific database\n    const db = client.db(\"devdb\");\n    cachedDb = db; // Caches the DB connection for future requests\n    // Ensure indexes and reviews setup\n    await initializeIndexes(db);\n    await checkAndCreateReviews(db);\n    return db;\n}\nasync function initializeIndexes(db) {\n    const collection = db.collection(\"recipes\");\n    const errors = [];\n    try {\n        // Get existing indexes\n        const existingIndexes = await collection.listIndexes().toArray();\n        const indexNames = existingIndexes.map((index)=>index.name);\n        // Only attempt to drop if the index exists\n        if (indexNames.includes(\"recipe_search_index\")) {\n            try {\n                await collection.dropIndex(\"recipe_search_index\");\n                // Wait a short time to ensure the index drop is complete\n                await new Promise((resolve)=>setTimeout(resolve, 1000));\n            } catch (error) {\n                if (error.code !== 27) {\n                    // Skip if index doesn't exist\n                    errors.push(`Failed to drop index recipe_search_index: ${error.message}`);\n                }\n            }\n        }\n        // Create new indexes\n        const indexOperations = [\n            {\n                operation: async ()=>{\n                    try {\n                        await collection.createIndex({\n                            title: \"text\",\n                            description: \"text\",\n                            tags: \"text\"\n                        }, {\n                            weights: {\n                                title: 10,\n                                description: 5,\n                                tags: 3\n                            },\n                            name: \"recipe_search_index\",\n                            background: true\n                        });\n                    } catch (error) {\n                        if (error.code !== 85) {\n                            throw error;\n                        }\n                    }\n                },\n                name: \"recipe_search_index\"\n            },\n            {\n                operation: ()=>collection.createIndex({\n                        category: 1\n                    }, {\n                        background: true\n                    }),\n                name: \"category_index\"\n            },\n            {\n                operation: ()=>collection.createIndex({\n                        tags: 1\n                    }, {\n                        background: true\n                    }),\n                name: \"tags_index\"\n            },\n            {\n                operation: ()=>collection.createIndex({\n                        \"ingredients.name\": 1\n                    }, {\n                        background: true\n                    }),\n                name: \"ingredients_index\"\n            },\n            {\n                operation: ()=>collection.createIndex({\n                        instructions: 1\n                    }, {\n                        background: true\n                    }),\n                name: \"instructions_index\"\n            },\n            {\n                operation: ()=>collection.createIndex({\n                        category: 1,\n                        createdAt: -1\n                    }, {\n                        background: true\n                    }),\n                name: \"category_date_index\"\n            },\n            // New index operations\n            {\n                operation: ()=>collection.createIndex({\n                        \"reviews.rating\": 1,\n                        \"reviews.createdAt\": -1\n                    }, {\n                        background: true\n                    }),\n                name: \"Reviews compound index\"\n            },\n            {\n                operation: ()=>collection.createIndex({\n                        \"reviews.userId\": 1\n                    }, {\n                        background: true\n                    }),\n                name: \"Review user index\"\n            },\n            {\n                operation: ()=>collection.createIndex({\n                        averageRating: -1\n                    }, {\n                        background: true\n                    }),\n                name: \"Average rating index\"\n            }\n        ];\n        // Execute each index operation with retries\n        for (const { operation, name } of indexOperations){\n            let retries = 3;\n            while(retries > 0){\n                try {\n                    await operation();\n                    break;\n                } catch (error) {\n                    retries--;\n                    if (retries === 0) {\n                        if (error.code !== 85) {\n                            errors.push(`Failed to create index ${name}: ${error.message}`);\n                        }\n                    } else {\n                        // Wait before retrying\n                        await new Promise((resolve)=>setTimeout(resolve, 1000));\n                    }\n                }\n            }\n        }\n        if (errors.length > 0) {\n            // Log errors but don't throw\n            console.error(`Index initialization completed with warnings: ${errors.join(\"; \")}`);\n        }\n    } catch (error) {\n        // Log error but don't throw\n        console.error(`Index initialization error: ${error.message}`);\n    }\n}\n// Function to check and create reviews if not present\nasync function checkAndCreateReviews(db) {\n    const collection = db.collection(\"recipes\");\n    try {\n        // Find all recipes without reviews\n        const recipesWithoutReviews = await collection.find({\n            reviews: {\n                $exists: false\n            }\n        }).toArray();\n        // Update each recipe to add an empty reviews array if it does not exist\n        if (recipesWithoutReviews.length > 0) {\n            const updatePromises = recipesWithoutReviews.map((recipe)=>{\n                return collection.updateOne({\n                    _id: recipe._id\n                }, {\n                    $set: {\n                        reviews: []\n                    }\n                } // Create an empty array for reviews\n                );\n            });\n            await Promise.all(updatePromises);\n            console.log(`${updatePromises.length} recipes updated with empty reviews array.`);\n        } else {\n            console.log(\"No recipes without reviews found.\");\n        }\n    } catch (error) {\n        console.error(`Error checking and creating reviews: ${error.message}`);\n    }\n}\nmodule.exports = connectToDatabase;\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,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Q0FBQyxDQUFDLHFDQUFxQyxFQUFFQSxNQUFNRyxPQUFPLENBQUMsQ0FBQztJQUN2RTtBQUNGO0FBR0EwQixPQUFPQyxPQUFPLEdBQUduRCIsInNvdXJjZXMiOlsid2VicGFjazovL2FzZV9ncm91cC1kLy4vZGIuanM/NTY2NSJdLCJzb3VyY2VzQ29udGVudCI6WyJjb25zdCB7IE1vbmdvQ2xpZW50LCBTZXJ2ZXJBcGlWZXJzaW9uIH0gPSByZXF1aXJlKCdtb25nb2RiJyk7XHJcblxyXG4vLyBSZXRyaWV2ZSBNb25nb0RCIFVSSSBmcm9tIGVudmlyb25tZW50IHZhcmlhYmxlc1xyXG5pZiAoIXByb2Nlc3MuZW52Lk1PTkdPREJfVVJJKSB7XHJcbiAgdGhyb3cgbmV3IEVycm9yKCdJbnZhbGlkL01pc3NpbmcgZW52aXJvbm1lbnQgdmFyaWFibGU6IFwiTU9OR09EQl9VUklcIicpO1xyXG59XHJcblxyXG5jb25zdCB1cmkgPSBwcm9jZXNzLmVudi5NT05HT0RCX1VSSTtcclxuY29uc3Qgb3B0aW9ucyA9IHtcclxuICBzZXJ2ZXJBcGk6IHtcclxuICAgIHZlcnNpb246IFNlcnZlckFwaVZlcnNpb24udjEsXHJcbiAgICBkZXByZWNhdGlvbkVycm9yczogdHJ1ZSxcclxuICB9LFxyXG4gIC8vc2V0dGluZyBtYXhQb29sU2l6ZSB0byAyMCB3aWxsIGxpbWl0IGNvbm5lY3Rpb25zIHRvIGRhdGFiYXNlXHJcbiAgbWF4UG9vbFNpemU6IDIwLCBcclxufTtcclxuXHJcbmxldCBjbGllbnQ7XHJcbmxldCBjYWNoZWREYiA9IG51bGw7IC8vIENhY2hlIGRhdGFiYXNlIGluc3RhbmNlIGZvciByZXVzZVxyXG5cclxuYXN5bmMgZnVuY3Rpb24gY29ubmVjdFRvRGF0YWJhc2UoKSB7XHJcbiAgLy8gQ2hlY2sgaWYgd2UncmUgYWxyZWFkeSBjb25uZWN0ZWQgYW5kIHJldHVybiBjYWNoZWQgREJcclxuICBpZiAoY2FjaGVkRGIpIHtcclxuICAgIHJldHVybiBjYWNoZWREYjtcclxuICB9XHJcblxyXG4gIGlmICghY2xpZW50KSB7XHJcbiAgICAvLyBJbml0aWFsaXplIGEgbmV3IE1vbmdvREIgY2xpZW50IGlmIG5vdCBhbHJlYWR5IGluaXRpYWxpemVkXHJcbiAgICBjbGllbnQgPSBuZXcgTW9uZ29DbGllbnQodXJpLCBvcHRpb25zKTtcclxuICAgIGF3YWl0IGNsaWVudC5jb25uZWN0KCk7XHJcbiAgICBjb25zb2xlLmxvZygnQ29ubmVjdGVkIHRvIE1vbmdvREIhJyk7XHJcbiAgfVxyXG5cclxuICAvLyBDb25uZWN0IHRvIHNwZWNpZmljIGRhdGFiYXNlXHJcbiAgY29uc3QgZGIgPSBjbGllbnQuZGIoJ2RldmRiJyk7IFxyXG4gIGNhY2hlZERiID0gZGI7IC8vIENhY2hlcyB0aGUgREIgY29ubmVjdGlvbiBmb3IgZnV0dXJlIHJlcXVlc3RzXHJcbiAgXHJcbiAgLy8gRW5zdXJlIGluZGV4ZXMgYW5kIHJldmlld3Mgc2V0dXBcclxuICBhd2FpdCBpbml0aWFsaXplSW5kZXhlcyhkYik7XHJcbiAgYXdhaXQgY2hlY2tBbmRDcmVhdGVSZXZpZXdzKGRiKTtcclxuICBcclxuICByZXR1cm4gZGI7XHJcbn1cclxuXHJcbmFzeW5jIGZ1bmN0aW9uIGluaXRpYWxpemVJbmRleGVzKGRiKSB7XHJcbiAgY29uc3QgY29sbGVjdGlvbiA9IGRiLmNvbGxlY3Rpb24oXCJyZWNpcGVzXCIpO1xyXG4gIGNvbnN0IGVycm9ycyA9IFtdO1xyXG5cclxuICB0cnkge1xyXG4gICAgLy8gR2V0IGV4aXN0aW5nIGluZGV4ZXNcclxuICAgIGNvbnN0IGV4aXN0aW5nSW5kZXhlcyA9IGF3YWl0IGNvbGxlY3Rpb24ubGlzdEluZGV4ZXMoKS50b0FycmF5KCk7XHJcbiAgICBjb25zdCBpbmRleE5hbWVzID0gZXhpc3RpbmdJbmRleGVzLm1hcCgoaW5kZXgpID0+IGluZGV4Lm5hbWUpO1xyXG5cclxuICAgIC8vIE9ubHkgYXR0ZW1wdCB0byBkcm9wIGlmIHRoZSBpbmRleCBleGlzdHNcclxuICAgIGlmIChpbmRleE5hbWVzLmluY2x1ZGVzKFwicmVjaXBlX3NlYXJjaF9pbmRleFwiKSkge1xyXG4gICAgICB0cnkge1xyXG4gICAgICAgIGF3YWl0IGNvbGxlY3Rpb24uZHJvcEluZGV4KFwicmVjaXBlX3NlYXJjaF9pbmRleFwiKTtcclxuICAgICAgICAvLyBXYWl0IGEgc2hvcnQgdGltZSB0byBlbnN1cmUgdGhlIGluZGV4IGRyb3AgaXMgY29tcGxldGVcclxuICAgICAgICBhd2FpdCBuZXcgUHJvbWlzZSgocmVzb2x2ZSkgPT4gc2V0VGltZW91dChyZXNvbHZlLCAxMDAwKSk7XHJcbiAgICAgIH0gY2F0Y2ggKGVycm9yKSB7XHJcbiAgICAgICAgaWYgKGVycm9yLmNvZGUgIT09IDI3KSB7XHJcbiAgICAgICAgICAvLyBTa2lwIGlmIGluZGV4IGRvZXNuJ3QgZXhpc3RcclxuICAgICAgICAgIGVycm9ycy5wdXNoKGBGYWlsZWQgdG8gZHJvcCBpbmRleCByZWNpcGVfc2VhcmNoX2luZGV4OiAke2Vycm9yLm1lc3NhZ2V9YCk7XHJcbiAgICAgICAgfVxyXG4gICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgLy8gQ3JlYXRlIG5ldyBpbmRleGVzXHJcbiAgICBjb25zdCBpbmRleE9wZXJhdGlvbnMgPSBbXHJcbiAgICAgIHtcclxuICAgICAgICBvcGVyYXRpb246IGFzeW5jICgpID0+IHtcclxuICAgICAgICAgIHRyeSB7XHJcbiAgICAgICAgICAgIGF3YWl0IGNvbGxlY3Rpb24uY3JlYXRlSW5kZXgoXHJcbiAgICAgICAgICAgICAgeyB0aXRsZTogXCJ0ZXh0XCIsIGRlc2NyaXB0aW9uOiBcInRleHRcIiwgdGFnczogXCJ0ZXh0XCIgfSxcclxuICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICB3ZWlnaHRzOiB7IHRpdGxlOiAxMCwgZGVzY3JpcHRpb246IDUsIHRhZ3M6IDMgfSxcclxuICAgICAgICAgICAgICAgIG5hbWU6IFwicmVjaXBlX3NlYXJjaF9pbmRleFwiLFxyXG4gICAgICAgICAgICAgICAgYmFja2dyb3VuZDogdHJ1ZSxcclxuICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICk7XHJcbiAgICAgICAgICB9IGNhdGNoIChlcnJvcikge1xyXG4gICAgICAgICAgICBpZiAoZXJyb3IuY29kZSAhPT0gODUpIHtcclxuICAgICAgICAgICAgICB0aHJvdyBlcnJvcjtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgfVxyXG4gICAgICAgIH0sXHJcbiAgICAgICAgbmFtZTogXCJyZWNpcGVfc2VhcmNoX2luZGV4XCIsXHJcbiAgICAgIH0sXHJcbiAgICAgIHtcclxuICAgICAgICBvcGVyYXRpb246ICgpID0+IGNvbGxlY3Rpb24uY3JlYXRlSW5kZXgoeyBjYXRlZ29yeTogMSB9LCB7IGJhY2tncm91bmQ6IHRydWUgfSksXHJcbiAgICAgICAgbmFtZTogXCJjYXRlZ29yeV9pbmRleFwiLFxyXG4gICAgICB9LFxyXG4gICAgICB7XHJcbiAgICAgICAgb3BlcmF0aW9uOiAoKSA9PiBjb2xsZWN0aW9uLmNyZWF0ZUluZGV4KHsgdGFnczogMSB9LCB7IGJhY2tncm91bmQ6IHRydWUgfSksXHJcbiAgICAgICAgbmFtZTogXCJ0YWdzX2luZGV4XCIsXHJcbiAgICAgIH0sXHJcbiAgICAgIHtcclxuICAgICAgICBvcGVyYXRpb246ICgpID0+IGNvbGxlY3Rpb24uY3JlYXRlSW5kZXgoeyBcImluZ3JlZGllbnRzLm5hbWVcIjogMSB9LCB7IGJhY2tncm91bmQ6IHRydWUgfSksXHJcbiAgICAgICAgbmFtZTogXCJpbmdyZWRpZW50c19pbmRleFwiLFxyXG4gICAgICB9LFxyXG4gICAgICB7XHJcbiAgICAgICAgb3BlcmF0aW9uOiAoKSA9PiBjb2xsZWN0aW9uLmNyZWF0ZUluZGV4KHsgaW5zdHJ1Y3Rpb25zOiAxIH0sIHsgYmFja2dyb3VuZDogdHJ1ZSB9KSxcclxuICAgICAgICBuYW1lOiBcImluc3RydWN0aW9uc19pbmRleFwiLFxyXG4gICAgICB9LFxyXG4gICAgICB7XHJcbiAgICAgICAgb3BlcmF0aW9uOiAoKSA9PiBjb2xsZWN0aW9uLmNyZWF0ZUluZGV4KHsgY2F0ZWdvcnk6IDEsIGNyZWF0ZWRBdDogLTEgfSwgeyBiYWNrZ3JvdW5kOiB0cnVlIH0pLFxyXG4gICAgICAgIG5hbWU6IFwiY2F0ZWdvcnlfZGF0ZV9pbmRleFwiLFxyXG4gICAgICB9LFxyXG4gICAgICAvLyBOZXcgaW5kZXggb3BlcmF0aW9uc1xyXG4gICAgICB7XHJcbiAgICAgICAgb3BlcmF0aW9uOiAoKSA9PiBjb2xsZWN0aW9uLmNyZWF0ZUluZGV4KHsgXCJyZXZpZXdzLnJhdGluZ1wiOiAxLCBcInJldmlld3MuY3JlYXRlZEF0XCI6IC0xIH0sIHsgYmFja2dyb3VuZDogdHJ1ZSB9KSxcclxuICAgICAgICBuYW1lOiBcIlJldmlld3MgY29tcG91bmQgaW5kZXhcIixcclxuICAgICAgfSxcclxuICAgICAge1xyXG4gICAgICAgIG9wZXJhdGlvbjogKCkgPT4gY29sbGVjdGlvbi5jcmVhdGVJbmRleCh7IFwicmV2aWV3cy51c2VySWRcIjogMSB9LCB7IGJhY2tncm91bmQ6IHRydWUgfSksXHJcbiAgICAgICAgbmFtZTogXCJSZXZpZXcgdXNlciBpbmRleFwiLFxyXG4gICAgICB9LFxyXG4gICAgICB7XHJcbiAgICAgICAgb3BlcmF0aW9uOiAoKSA9PiBjb2xsZWN0aW9uLmNyZWF0ZUluZGV4KHsgYXZlcmFnZVJhdGluZzogLTEgfSwgeyBiYWNrZ3JvdW5kOiB0cnVlIH0pLFxyXG4gICAgICAgIG5hbWU6IFwiQXZlcmFnZSByYXRpbmcgaW5kZXhcIixcclxuICAgICAgfSxcclxuICAgIF07XHJcblxyXG4gICAgLy8gRXhlY3V0ZSBlYWNoIGluZGV4IG9wZXJhdGlvbiB3aXRoIHJldHJpZXNcclxuICAgIGZvciAoY29uc3QgeyBvcGVyYXRpb24sIG5hbWUgfSBvZiBpbmRleE9wZXJhdGlvbnMpIHtcclxuICAgICAgbGV0IHJldHJpZXMgPSAzO1xyXG4gICAgICB3aGlsZSAocmV0cmllcyA+IDApIHtcclxuICAgICAgICB0cnkge1xyXG4gICAgICAgICAgYXdhaXQgb3BlcmF0aW9uKCk7XHJcbiAgICAgICAgICBicmVhaztcclxuICAgICAgICB9IGNhdGNoIChlcnJvcikge1xyXG4gICAgICAgICAgcmV0cmllcy0tO1xyXG4gICAgICAgICAgaWYgKHJldHJpZXMgPT09IDApIHtcclxuICAgICAgICAgICAgaWYgKGVycm9yLmNvZGUgIT09IDg1KSB7XHJcbiAgICAgICAgICAgICAgZXJyb3JzLnB1c2goYEZhaWxlZCB0byBjcmVhdGUgaW5kZXggJHtuYW1lfTogJHtlcnJvci5tZXNzYWdlfWApO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAvLyBXYWl0IGJlZm9yZSByZXRyeWluZ1xyXG4gICAgICAgICAgICBhd2FpdCBuZXcgUHJvbWlzZSgocmVzb2x2ZSkgPT4gc2V0VGltZW91dChyZXNvbHZlLCAxMDAwKSk7XHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgaWYgKGVycm9ycy5sZW5ndGggPiAwKSB7XHJcbiAgICAgIC8vIExvZyBlcnJvcnMgYnV0IGRvbid0IHRocm93XHJcbiAgICAgIGNvbnNvbGUuZXJyb3IoYEluZGV4IGluaXRpYWxpemF0aW9uIGNvbXBsZXRlZCB3aXRoIHdhcm5pbmdzOiAke2Vycm9ycy5qb2luKFwiOyBcIil9YCk7XHJcbiAgICB9XHJcbiAgfSBjYXRjaCAoZXJyb3IpIHtcclxuICAgIC8vIExvZyBlcnJvciBidXQgZG9uJ3QgdGhyb3dcclxuICAgIGNvbnNvbGUuZXJyb3IoYEluZGV4IGluaXRpYWxpemF0aW9uIGVycm9yOiAke2Vycm9yLm1lc3NhZ2V9YCk7XHJcbiAgfVxyXG59XHJcblxyXG4vLyBGdW5jdGlvbiB0byBjaGVjayBhbmQgY3JlYXRlIHJldmlld3MgaWYgbm90IHByZXNlbnRcclxuYXN5bmMgZnVuY3Rpb24gY2hlY2tBbmRDcmVhdGVSZXZpZXdzKGRiKSB7XHJcbiAgY29uc3QgY29sbGVjdGlvbiA9IGRiLmNvbGxlY3Rpb24oXCJyZWNpcGVzXCIpO1xyXG5cclxuICB0cnkge1xyXG4gICAgLy8gRmluZCBhbGwgcmVjaXBlcyB3aXRob3V0IHJldmlld3NcclxuICAgIGNvbnN0IHJlY2lwZXNXaXRob3V0UmV2aWV3cyA9IGF3YWl0IGNvbGxlY3Rpb24uZmluZCh7IHJldmlld3M6IHsgJGV4aXN0czogZmFsc2UgfSB9KS50b0FycmF5KCk7XHJcbiAgICBcclxuICAgIC8vIFVwZGF0ZSBlYWNoIHJlY2lwZSB0byBhZGQgYW4gZW1wdHkgcmV2aWV3cyBhcnJheSBpZiBpdCBkb2VzIG5vdCBleGlzdFxyXG4gICAgaWYgKHJlY2lwZXNXaXRob3V0UmV2aWV3cy5sZW5ndGggPiAwKSB7XHJcbiAgICAgIGNvbnN0IHVwZGF0ZVByb21pc2VzID0gcmVjaXBlc1dpdGhvdXRSZXZpZXdzLm1hcChyZWNpcGUgPT4ge1xyXG4gICAgICAgIHJldHVybiBjb2xsZWN0aW9uLnVwZGF0ZU9uZShcclxuICAgICAgICAgIHsgX2lkOiByZWNpcGUuX2lkIH0sXHJcbiAgICAgICAgICB7ICRzZXQ6IHsgcmV2aWV3czogW10gfSB9IC8vIENyZWF0ZSBhbiBlbXB0eSBhcnJheSBmb3IgcmV2aWV3c1xyXG4gICAgICAgICk7XHJcbiAgICAgIH0pO1xyXG4gICAgICBhd2FpdCBQcm9taXNlLmFsbCh1cGRhdGVQcm9taXNlcyk7XHJcbiAgICAgIGNvbnNvbGUubG9nKGAke3VwZGF0ZVByb21pc2VzLmxlbmd0aH0gcmVjaXBlcyB1cGRhdGVkIHdpdGggZW1wdHkgcmV2aWV3cyBhcnJheS5gKTtcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIGNvbnNvbGUubG9nKFwiTm8gcmVjaXBlcyB3aXRob3V0IHJldmlld3MgZm91bmQuXCIpO1xyXG4gICAgfVxyXG4gIH0gY2F0Y2ggKGVycm9yKSB7XHJcbiAgICBjb25zb2xlLmVycm9yKGBFcnJvciBjaGVja2luZyBhbmQgY3JlYXRpbmcgcmV2aWV3czogJHtlcnJvci5tZXNzYWdlfWApO1xyXG4gIH1cclxufVxyXG5cclxuXHJcbm1vZHVsZS5leHBvcnRzID0gY29ubmVjdFRvRGF0YWJhc2U7Il0sIm5hbWVzIjpbIk1vbmdvQ2xpZW50IiwiU2VydmVyQXBpVmVyc2lvbiIsInJlcXVpcmUiLCJwcm9jZXNzIiwiZW52IiwiTU9OR09EQl9VUkkiLCJFcnJvciIsInVyaSIsIm9wdGlvbnMiLCJzZXJ2ZXJBcGkiLCJ2ZXJzaW9uIiwidjEiLCJkZXByZWNhdGlvbkVycm9ycyIsIm1heFBvb2xTaXplIiwiY2xpZW50IiwiY2FjaGVkRGIiLCJjb25uZWN0VG9EYXRhYmFzZSIsImNvbm5lY3QiLCJjb25zb2xlIiwibG9nIiwiZGIiLCJpbml0aWFsaXplSW5kZXhlcyIsImNoZWNrQW5kQ3JlYXRlUmV2aWV3cyIsImNvbGxlY3Rpb24iLCJlcnJvcnMiLCJleGlzdGluZ0luZGV4ZXMiLCJsaXN0SW5kZXhlcyIsInRvQXJyYXkiLCJpbmRleE5hbWVzIiwibWFwIiwiaW5kZXgiLCJuYW1lIiwiaW5jbHVkZXMiLCJkcm9wSW5kZXgiLCJQcm9taXNlIiwicmVzb2x2ZSIsInNldFRpbWVvdXQiLCJlcnJvciIsImNvZGUiLCJwdXNoIiwibWVzc2FnZSIsImluZGV4T3BlcmF0aW9ucyIsIm9wZXJhdGlvbiIsImNyZWF0ZUluZGV4IiwidGl0bGUiLCJkZXNjcmlwdGlvbiIsInRhZ3MiLCJ3ZWlnaHRzIiwiYmFja2dyb3VuZCIsImNhdGVnb3J5IiwiaW5zdHJ1Y3Rpb25zIiwiY3JlYXRlZEF0IiwiYXZlcmFnZVJhdGluZyIsInJldHJpZXMiLCJsZW5ndGgiLCJqb2luIiwicmVjaXBlc1dpdGhvdXRSZXZpZXdzIiwiZmluZCIsInJldmlld3MiLCIkZXhpc3RzIiwidXBkYXRlUHJvbWlzZXMiLCJyZWNpcGUiLCJ1cGRhdGVPbmUiLCJfaWQiLCIkc2V0IiwiYWxsIiwibW9kdWxlIiwiZXhwb3J0cyJdLCJzb3VyY2VSb290IjoiIn0=\n//# sourceURL=webpack-internal:///(rsc)/./db.js\n");

/***/ })

};
;

// load runtime
var __webpack_require__ = require("../../../../webpack-runtime.js");
__webpack_require__.C(exports);
var __webpack_exec__ = (moduleId) => (__webpack_require__(__webpack_require__.s = moduleId))
var __webpack_exports__ = __webpack_require__.X(0, ["vendor-chunks/next","vendor-chunks/@opentelemetry","vendor-chunks/next-auth","vendor-chunks/@babel","vendor-chunks/jose","vendor-chunks/google-auth-library","vendor-chunks/openid-client","vendor-chunks/gaxios","vendor-chunks/uuid","vendor-chunks/node-fetch","vendor-chunks/gtoken","vendor-chunks/oauth","vendor-chunks/debug","vendor-chunks/json-bigint","vendor-chunks/@panva","vendor-chunks/yallist","vendor-chunks/preact-render-to-string","vendor-chunks/oidc-token-hash","vendor-chunks/https-proxy-agent","vendor-chunks/ecdsa-sig-formatter","vendor-chunks/bcryptjs","vendor-chunks/agent-base","vendor-chunks/supports-color","vendor-chunks/safe-buffer","vendor-chunks/preact","vendor-chunks/ms","vendor-chunks/is-stream","vendor-chunks/has-flag","vendor-chunks/extend","vendor-chunks/buffer-equal-constant-time","vendor-chunks/bignumber.js","vendor-chunks/base64-js"], () => (__webpack_exec__("(rsc)/./node_modules/next/dist/build/webpack/loaders/next-app-loader.js?name=app%2Fapi%2Fauth%2F%5B...nextauth%5D%2Froute&page=%2Fapi%2Fauth%2F%5B...nextauth%5D%2Froute&appPaths=&pagePath=private-next-app-dir%2Fapi%2Fauth%2F%5B...nextauth%5D%2Froute.js&appDir=C%3A%5CUsers%5CSoftware.Engineer37%5CDocuments%5Case_groupd%5CASE_2024_GROUP_D%5Capp&pageExtensions=tsx&pageExtensions=ts&pageExtensions=jsx&pageExtensions=js&rootDir=C%3A%5CUsers%5CSoftware.Engineer37%5CDocuments%5Case_groupd%5CASE_2024_GROUP_D&isDev=true&tsconfigPath=tsconfig.json&basePath=&assetPrefix=&nextConfigOutput=&preferredRegion=&middlewareConfig=e30%3D!")));
module.exports = __webpack_exports__;

})();