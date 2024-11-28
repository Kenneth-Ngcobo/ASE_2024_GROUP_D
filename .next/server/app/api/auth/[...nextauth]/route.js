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

/***/ "(rsc)/./node_modules/next/dist/build/webpack/loaders/next-app-loader.js?name=app%2Fapi%2Fauth%2F%5B...nextauth%5D%2Froute&page=%2Fapi%2Fauth%2F%5B...nextauth%5D%2Froute&appPaths=&pagePath=private-next-app-dir%2Fapi%2Fauth%2F%5B...nextauth%5D%2Froute.js&appDir=C%3A%5CUsers%5CSoftware.Engineer51%5CDocuments%5CGitHub%5CASE_2024_GROUP_D%5CASE_2024_GROUP_D%5Capp&pageExtensions=tsx&pageExtensions=ts&pageExtensions=jsx&pageExtensions=js&rootDir=C%3A%5CUsers%5CSoftware.Engineer51%5CDocuments%5CGitHub%5CASE_2024_GROUP_D%5CASE_2024_GROUP_D&isDev=true&tsconfigPath=tsconfig.json&basePath=&assetPrefix=&nextConfigOutput=&preferredRegion=&middlewareConfig=e30%3D!":
/*!**********************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/next/dist/build/webpack/loaders/next-app-loader.js?name=app%2Fapi%2Fauth%2F%5B...nextauth%5D%2Froute&page=%2Fapi%2Fauth%2F%5B...nextauth%5D%2Froute&appPaths=&pagePath=private-next-app-dir%2Fapi%2Fauth%2F%5B...nextauth%5D%2Froute.js&appDir=C%3A%5CUsers%5CSoftware.Engineer51%5CDocuments%5CGitHub%5CASE_2024_GROUP_D%5CASE_2024_GROUP_D%5Capp&pageExtensions=tsx&pageExtensions=ts&pageExtensions=jsx&pageExtensions=js&rootDir=C%3A%5CUsers%5CSoftware.Engineer51%5CDocuments%5CGitHub%5CASE_2024_GROUP_D%5CASE_2024_GROUP_D&isDev=true&tsconfigPath=tsconfig.json&basePath=&assetPrefix=&nextConfigOutput=&preferredRegion=&middlewareConfig=e30%3D! ***!
  \**********************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   originalPathname: () => (/* binding */ originalPathname),\n/* harmony export */   patchFetch: () => (/* binding */ patchFetch),\n/* harmony export */   requestAsyncStorage: () => (/* binding */ requestAsyncStorage),\n/* harmony export */   routeModule: () => (/* binding */ routeModule),\n/* harmony export */   serverHooks: () => (/* binding */ serverHooks),\n/* harmony export */   staticGenerationAsyncStorage: () => (/* binding */ staticGenerationAsyncStorage)\n/* harmony export */ });\n/* harmony import */ var next_dist_server_future_route_modules_app_route_module_compiled__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! next/dist/server/future/route-modules/app-route/module.compiled */ \"(rsc)/./node_modules/next/dist/server/future/route-modules/app-route/module.compiled.js\");\n/* harmony import */ var next_dist_server_future_route_modules_app_route_module_compiled__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(next_dist_server_future_route_modules_app_route_module_compiled__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var next_dist_server_future_route_kind__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! next/dist/server/future/route-kind */ \"(rsc)/./node_modules/next/dist/server/future/route-kind.js\");\n/* harmony import */ var next_dist_server_lib_patch_fetch__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! next/dist/server/lib/patch-fetch */ \"(rsc)/./node_modules/next/dist/server/lib/patch-fetch.js\");\n/* harmony import */ var next_dist_server_lib_patch_fetch__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(next_dist_server_lib_patch_fetch__WEBPACK_IMPORTED_MODULE_2__);\n/* harmony import */ var C_Users_Software_Engineer51_Documents_GitHub_ASE_2024_GROUP_D_ASE_2024_GROUP_D_app_api_auth_nextauth_route_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./app/api/auth/[...nextauth]/route.js */ \"(rsc)/./app/api/auth/[...nextauth]/route.js\");\n\n\n\n\n// We inject the nextConfigOutput here so that we can use them in the route\n// module.\nconst nextConfigOutput = \"\"\nconst routeModule = new next_dist_server_future_route_modules_app_route_module_compiled__WEBPACK_IMPORTED_MODULE_0__.AppRouteRouteModule({\n    definition: {\n        kind: next_dist_server_future_route_kind__WEBPACK_IMPORTED_MODULE_1__.RouteKind.APP_ROUTE,\n        page: \"/api/auth/[...nextauth]/route\",\n        pathname: \"/api/auth/[...nextauth]\",\n        filename: \"route\",\n        bundlePath: \"app/api/auth/[...nextauth]/route\"\n    },\n    resolvedPagePath: \"C:\\\\Users\\\\Software.Engineer51\\\\Documents\\\\GitHub\\\\ASE_2024_GROUP_D\\\\ASE_2024_GROUP_D\\\\app\\\\api\\\\auth\\\\[...nextauth]\\\\route.js\",\n    nextConfigOutput,\n    userland: C_Users_Software_Engineer51_Documents_GitHub_ASE_2024_GROUP_D_ASE_2024_GROUP_D_app_api_auth_nextauth_route_js__WEBPACK_IMPORTED_MODULE_3__\n});\n// Pull out the exports that we need to expose from the module. This should\n// be eliminated when we've moved the other routes to the new format. These\n// are used to hook into the route.\nconst { requestAsyncStorage, staticGenerationAsyncStorage, serverHooks } = routeModule;\nconst originalPathname = \"/api/auth/[...nextauth]/route\";\nfunction patchFetch() {\n    return (0,next_dist_server_lib_patch_fetch__WEBPACK_IMPORTED_MODULE_2__.patchFetch)({\n        serverHooks,\n        staticGenerationAsyncStorage\n    });\n}\n\n\n//# sourceMappingURL=app-route.js.map//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKHJzYykvLi9ub2RlX21vZHVsZXMvbmV4dC9kaXN0L2J1aWxkL3dlYnBhY2svbG9hZGVycy9uZXh0LWFwcC1sb2FkZXIuanM/bmFtZT1hcHAlMkZhcGklMkZhdXRoJTJGJTVCLi4ubmV4dGF1dGglNUQlMkZyb3V0ZSZwYWdlPSUyRmFwaSUyRmF1dGglMkYlNUIuLi5uZXh0YXV0aCU1RCUyRnJvdXRlJmFwcFBhdGhzPSZwYWdlUGF0aD1wcml2YXRlLW5leHQtYXBwLWRpciUyRmFwaSUyRmF1dGglMkYlNUIuLi5uZXh0YXV0aCU1RCUyRnJvdXRlLmpzJmFwcERpcj1DJTNBJTVDVXNlcnMlNUNTb2Z0d2FyZS5FbmdpbmVlcjUxJTVDRG9jdW1lbnRzJTVDR2l0SHViJTVDQVNFXzIwMjRfR1JPVVBfRCU1Q0FTRV8yMDI0X0dST1VQX0QlNUNhcHAmcGFnZUV4dGVuc2lvbnM9dHN4JnBhZ2VFeHRlbnNpb25zPXRzJnBhZ2VFeHRlbnNpb25zPWpzeCZwYWdlRXh0ZW5zaW9ucz1qcyZyb290RGlyPUMlM0ElNUNVc2VycyU1Q1NvZnR3YXJlLkVuZ2luZWVyNTElNUNEb2N1bWVudHMlNUNHaXRIdWIlNUNBU0VfMjAyNF9HUk9VUF9EJTVDQVNFXzIwMjRfR1JPVVBfRCZpc0Rldj10cnVlJnRzY29uZmlnUGF0aD10c2NvbmZpZy5qc29uJmJhc2VQYXRoPSZhc3NldFByZWZpeD0mbmV4dENvbmZpZ091dHB1dD0mcHJlZmVycmVkUmVnaW9uPSZtaWRkbGV3YXJlQ29uZmlnPWUzMCUzRCEiLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7O0FBQXNHO0FBQ3ZDO0FBQ2M7QUFDOEU7QUFDM0o7QUFDQTtBQUNBO0FBQ0Esd0JBQXdCLGdIQUFtQjtBQUMzQztBQUNBLGNBQWMseUVBQVM7QUFDdkI7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBLFlBQVk7QUFDWixDQUFDO0FBQ0Q7QUFDQTtBQUNBO0FBQ0EsUUFBUSxpRUFBaUU7QUFDekU7QUFDQTtBQUNBLFdBQVcsNEVBQVc7QUFDdEI7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUN1SDs7QUFFdkgiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9hc2VfZ3JvdXAtZC8/ZTQ5NCJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBBcHBSb3V0ZVJvdXRlTW9kdWxlIH0gZnJvbSBcIm5leHQvZGlzdC9zZXJ2ZXIvZnV0dXJlL3JvdXRlLW1vZHVsZXMvYXBwLXJvdXRlL21vZHVsZS5jb21waWxlZFwiO1xuaW1wb3J0IHsgUm91dGVLaW5kIH0gZnJvbSBcIm5leHQvZGlzdC9zZXJ2ZXIvZnV0dXJlL3JvdXRlLWtpbmRcIjtcbmltcG9ydCB7IHBhdGNoRmV0Y2ggYXMgX3BhdGNoRmV0Y2ggfSBmcm9tIFwibmV4dC9kaXN0L3NlcnZlci9saWIvcGF0Y2gtZmV0Y2hcIjtcbmltcG9ydCAqIGFzIHVzZXJsYW5kIGZyb20gXCJDOlxcXFxVc2Vyc1xcXFxTb2Z0d2FyZS5FbmdpbmVlcjUxXFxcXERvY3VtZW50c1xcXFxHaXRIdWJcXFxcQVNFXzIwMjRfR1JPVVBfRFxcXFxBU0VfMjAyNF9HUk9VUF9EXFxcXGFwcFxcXFxhcGlcXFxcYXV0aFxcXFxbLi4ubmV4dGF1dGhdXFxcXHJvdXRlLmpzXCI7XG4vLyBXZSBpbmplY3QgdGhlIG5leHRDb25maWdPdXRwdXQgaGVyZSBzbyB0aGF0IHdlIGNhbiB1c2UgdGhlbSBpbiB0aGUgcm91dGVcbi8vIG1vZHVsZS5cbmNvbnN0IG5leHRDb25maWdPdXRwdXQgPSBcIlwiXG5jb25zdCByb3V0ZU1vZHVsZSA9IG5ldyBBcHBSb3V0ZVJvdXRlTW9kdWxlKHtcbiAgICBkZWZpbml0aW9uOiB7XG4gICAgICAgIGtpbmQ6IFJvdXRlS2luZC5BUFBfUk9VVEUsXG4gICAgICAgIHBhZ2U6IFwiL2FwaS9hdXRoL1suLi5uZXh0YXV0aF0vcm91dGVcIixcbiAgICAgICAgcGF0aG5hbWU6IFwiL2FwaS9hdXRoL1suLi5uZXh0YXV0aF1cIixcbiAgICAgICAgZmlsZW5hbWU6IFwicm91dGVcIixcbiAgICAgICAgYnVuZGxlUGF0aDogXCJhcHAvYXBpL2F1dGgvWy4uLm5leHRhdXRoXS9yb3V0ZVwiXG4gICAgfSxcbiAgICByZXNvbHZlZFBhZ2VQYXRoOiBcIkM6XFxcXFVzZXJzXFxcXFNvZnR3YXJlLkVuZ2luZWVyNTFcXFxcRG9jdW1lbnRzXFxcXEdpdEh1YlxcXFxBU0VfMjAyNF9HUk9VUF9EXFxcXEFTRV8yMDI0X0dST1VQX0RcXFxcYXBwXFxcXGFwaVxcXFxhdXRoXFxcXFsuLi5uZXh0YXV0aF1cXFxccm91dGUuanNcIixcbiAgICBuZXh0Q29uZmlnT3V0cHV0LFxuICAgIHVzZXJsYW5kXG59KTtcbi8vIFB1bGwgb3V0IHRoZSBleHBvcnRzIHRoYXQgd2UgbmVlZCB0byBleHBvc2UgZnJvbSB0aGUgbW9kdWxlLiBUaGlzIHNob3VsZFxuLy8gYmUgZWxpbWluYXRlZCB3aGVuIHdlJ3ZlIG1vdmVkIHRoZSBvdGhlciByb3V0ZXMgdG8gdGhlIG5ldyBmb3JtYXQuIFRoZXNlXG4vLyBhcmUgdXNlZCB0byBob29rIGludG8gdGhlIHJvdXRlLlxuY29uc3QgeyByZXF1ZXN0QXN5bmNTdG9yYWdlLCBzdGF0aWNHZW5lcmF0aW9uQXN5bmNTdG9yYWdlLCBzZXJ2ZXJIb29rcyB9ID0gcm91dGVNb2R1bGU7XG5jb25zdCBvcmlnaW5hbFBhdGhuYW1lID0gXCIvYXBpL2F1dGgvWy4uLm5leHRhdXRoXS9yb3V0ZVwiO1xuZnVuY3Rpb24gcGF0Y2hGZXRjaCgpIHtcbiAgICByZXR1cm4gX3BhdGNoRmV0Y2goe1xuICAgICAgICBzZXJ2ZXJIb29rcyxcbiAgICAgICAgc3RhdGljR2VuZXJhdGlvbkFzeW5jU3RvcmFnZVxuICAgIH0pO1xufVxuZXhwb3J0IHsgcm91dGVNb2R1bGUsIHJlcXVlc3RBc3luY1N0b3JhZ2UsIHN0YXRpY0dlbmVyYXRpb25Bc3luY1N0b3JhZ2UsIHNlcnZlckhvb2tzLCBvcmlnaW5hbFBhdGhuYW1lLCBwYXRjaEZldGNoLCAgfTtcblxuLy8jIHNvdXJjZU1hcHBpbmdVUkw9YXBwLXJvdXRlLmpzLm1hcCJdLCJuYW1lcyI6W10sInNvdXJjZVJvb3QiOiIifQ==\n//# sourceURL=webpack-internal:///(rsc)/./node_modules/next/dist/build/webpack/loaders/next-app-loader.js?name=app%2Fapi%2Fauth%2F%5B...nextauth%5D%2Froute&page=%2Fapi%2Fauth%2F%5B...nextauth%5D%2Froute&appPaths=&pagePath=private-next-app-dir%2Fapi%2Fauth%2F%5B...nextauth%5D%2Froute.js&appDir=C%3A%5CUsers%5CSoftware.Engineer51%5CDocuments%5CGitHub%5CASE_2024_GROUP_D%5CASE_2024_GROUP_D%5Capp&pageExtensions=tsx&pageExtensions=ts&pageExtensions=jsx&pageExtensions=js&rootDir=C%3A%5CUsers%5CSoftware.Engineer51%5CDocuments%5CGitHub%5CASE_2024_GROUP_D%5CASE_2024_GROUP_D&isDev=true&tsconfigPath=tsconfig.json&basePath=&assetPrefix=&nextConfigOutput=&preferredRegion=&middlewareConfig=e30%3D!\n");

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

eval("\nconst { MongoClient, ServerApiVersion } = __webpack_require__(/*! mongodb */ \"mongodb\");\nif (!process.env.MONGODB_URI) {\n    throw new Error('Invalid/Missing environment variable: \"MONGODB_URI\"');\n}\nconst uri = process.env.MONGODB_URI;\nconst options = {\n    serverApi: {\n        version: ServerApiVersion.v1,\n        deprecationErrors: true\n    },\n    maxPoolSize: 20\n};\nconst env = \"development\";\nlet clientPromise;\nif (env === \"development\") {\n    if (!global._mongoClientPromise) {\n        const client = new MongoClient(uri, options);\n        global._mongoClientPromise = client.connect();\n    }\n    clientPromise = global._mongoClientPromise;\n} else {\n    const client = new MongoClient(uri, options);\n    clientPromise = client.connect();\n}\nlet cachedDb = null; // Cache database instance for reuse\nasync function connectToDatabase() {\n    const client = await clientPromise;\n    const db = client.db(\"devdb\");\n    if (cachedDb) {\n        return cachedDb;\n    }\n    cachedDb = db; // Caches the DB connection for future requests\n    // Ensure indexes and reviews setup\n    await initializeIndexes(db);\n    await checkAndCreateReviews(db);\n    return db;\n}\nasync function initializeIndexes(db) {\n    const collection = db.collection(\"recipes\");\n    const errors = [];\n    try {\n        const existingIndexes = await collection.listIndexes().toArray();\n        const indexNames = existingIndexes.map((index)=>index.name);\n        if (indexNames.includes(\"recipe_search_index\")) {\n            try {\n                await collection.dropIndex(\"recipe_search_index\");\n                await new Promise((resolve)=>setTimeout(resolve, 1000));\n            } catch (error) {\n                if (error.code !== 27) {\n                    errors.push(`Failed to drop index recipe_search_index: ${error.message}`);\n                }\n            }\n        }\n        const indexOperations = [\n            {\n                operation: async ()=>{\n                    try {\n                        await collection.createIndex({\n                            title: \"text\",\n                            description: \"text\",\n                            tags: \"text\"\n                        }, {\n                            weights: {\n                                title: 10,\n                                description: 5,\n                                tags: 3\n                            },\n                            name: \"recipe_search_index\",\n                            background: true\n                        });\n                    } catch (error) {\n                        if (error.code !== 85) {\n                            throw error;\n                        }\n                    }\n                },\n                name: \"recipe_search_index\"\n            },\n            {\n                operation: ()=>collection.createIndex({\n                        category: 1\n                    }, {\n                        background: true\n                    }),\n                name: \"category_index\"\n            },\n            {\n                operation: ()=>collection.createIndex({\n                        tags: 1\n                    }, {\n                        background: true\n                    }),\n                name: \"tags_index\"\n            },\n            {\n                operation: ()=>collection.createIndex({\n                        \"ingredients.name\": 1\n                    }, {\n                        background: true\n                    }),\n                name: \"ingredients_index\"\n            },\n            {\n                operation: ()=>collection.createIndex({\n                        instructions: 1\n                    }, {\n                        background: true\n                    }),\n                name: \"instructions_index\"\n            },\n            {\n                operation: ()=>collection.createIndex({\n                        category: 1,\n                        createdAt: -1\n                    }, {\n                        background: true\n                    }),\n                name: \"category_date_index\"\n            },\n            {\n                operation: ()=>collection.createIndex({\n                        \"reviews.rating\": 1,\n                        \"reviews.createdAt\": -1\n                    }, {\n                        background: true\n                    }),\n                name: \"Reviews compound index\"\n            },\n            {\n                operation: ()=>collection.createIndex({\n                        \"reviews.userId\": 1\n                    }, {\n                        background: true\n                    }),\n                name: \"Review user index\"\n            },\n            {\n                operation: ()=>collection.createIndex({\n                        averageRating: -1\n                    }, {\n                        background: true\n                    }),\n                name: \"Average rating index\"\n            }\n        ];\n        for (const { operation, name } of indexOperations){\n            let retries = 3;\n            while(retries > 0){\n                try {\n                    await operation();\n                    break;\n                } catch (error) {\n                    retries--;\n                    if (retries === 0) {\n                        if (error.code !== 85) {\n                            errors.push(`Failed to create index ${name}: ${error.message}`);\n                        }\n                    } else {\n                        await new Promise((resolve)=>setTimeout(resolve, 1000));\n                    }\n                }\n            }\n        }\n        if (errors.length > 0) {\n            console.error(`Index initialization completed with warnings: ${errors.join(\"; \")}`);\n        }\n    } catch (error) {\n        console.error(`Index initialization error: ${error.message}`);\n    }\n}\nasync function checkAndCreateReviews(db) {\n    const collection = db.collection(\"recipes\");\n    try {\n        const recipesWithoutReviews = await collection.find({\n            reviews: {\n                $exists: false\n            }\n        }).toArray();\n        if (recipesWithoutReviews.length > 0) {\n            const updatePromises = recipesWithoutReviews.map((recipe)=>{\n                return collection.updateOne({\n                    _id: recipe._id\n                }, {\n                    $set: {\n                        reviews: []\n                    }\n                } // Create an empty array for reviews\n                );\n            });\n            await Promise.all(updatePromises);\n            console.log(`${updatePromises.length} recipes updated with empty reviews array.`);\n        } else {\n            console.log(\"No recipes without reviews found.\");\n        }\n    } catch (error) {\n        console.error(`Error checking and creating reviews: ${error.message}`);\n    }\n}\nmodule.exports = connectToDatabase;\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,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LE9BQU9DLE9BQU8sR0FBR2xEIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vYXNlX2dyb3VwLWQvLi9kYi5qcz81NjY1Il0sInNvdXJjZXNDb250ZW50IjpbImNvbnN0IHsgTW9uZ29DbGllbnQsIFNlcnZlckFwaVZlcnNpb24gfSA9IHJlcXVpcmUoJ21vbmdvZGInKTtcclxuXHJcblxyXG5pZiAoIXByb2Nlc3MuZW52Lk1PTkdPREJfVVJJKSB7XHJcbiAgdGhyb3cgbmV3IEVycm9yKCdJbnZhbGlkL01pc3NpbmcgZW52aXJvbm1lbnQgdmFyaWFibGU6IFwiTU9OR09EQl9VUklcIicpO1xyXG59XHJcblxyXG5jb25zdCB1cmkgPSBwcm9jZXNzLmVudi5NT05HT0RCX1VSSTtcclxuY29uc3Qgb3B0aW9ucyA9IHtcclxuICBzZXJ2ZXJBcGk6IHtcclxuICAgIHZlcnNpb246IFNlcnZlckFwaVZlcnNpb24udjEsXHJcbiAgICBkZXByZWNhdGlvbkVycm9yczogdHJ1ZSxcclxuICB9LFxyXG4gIG1heFBvb2xTaXplOiAyMCwgLy8gTWF4aW11bSBwb29sIHNpemVcclxufTtcclxuXHJcbmNvbnN0IGVudiA9IHByb2Nlc3MuZW52Lk5PREVfRU5WO1xyXG5cclxubGV0IGNsaWVudFByb21pc2U7XHJcblxyXG5pZiAoZW52ID09PSAnZGV2ZWxvcG1lbnQnKSB7XHJcbiAgaWYgKCFnbG9iYWwuX21vbmdvQ2xpZW50UHJvbWlzZSkge1xyXG4gICAgY29uc3QgY2xpZW50ID0gbmV3IE1vbmdvQ2xpZW50KHVyaSwgb3B0aW9ucyk7XHJcbiAgICBnbG9iYWwuX21vbmdvQ2xpZW50UHJvbWlzZSA9IGNsaWVudC5jb25uZWN0KCk7XHJcbiAgfVxyXG4gIGNsaWVudFByb21pc2UgPSBnbG9iYWwuX21vbmdvQ2xpZW50UHJvbWlzZTtcclxufSBlbHNlIHtcclxuICBjb25zdCBjbGllbnQgPSBuZXcgTW9uZ29DbGllbnQodXJpLCBvcHRpb25zKTtcclxuICBjbGllbnRQcm9taXNlID0gY2xpZW50LmNvbm5lY3QoKTtcclxufVxyXG5cclxubGV0IGNhY2hlZERiID0gbnVsbDsgLy8gQ2FjaGUgZGF0YWJhc2UgaW5zdGFuY2UgZm9yIHJldXNlXHJcblxyXG5hc3luYyBmdW5jdGlvbiBjb25uZWN0VG9EYXRhYmFzZSgpIHtcclxuICBjb25zdCBjbGllbnQgPSBhd2FpdCBjbGllbnRQcm9taXNlO1xyXG4gIGNvbnN0IGRiID0gY2xpZW50LmRiKCdkZXZkYicpO1xyXG5cclxuICBpZiAoY2FjaGVkRGIpIHtcclxuICAgIHJldHVybiBjYWNoZWREYjtcclxuICB9XHJcbiAgY2FjaGVkRGIgPSBkYjsgLy8gQ2FjaGVzIHRoZSBEQiBjb25uZWN0aW9uIGZvciBmdXR1cmUgcmVxdWVzdHNcclxuICBcclxuICAvLyBFbnN1cmUgaW5kZXhlcyBhbmQgcmV2aWV3cyBzZXR1cFxyXG4gIGF3YWl0IGluaXRpYWxpemVJbmRleGVzKGRiKTtcclxuICBhd2FpdCBjaGVja0FuZENyZWF0ZVJldmlld3MoZGIpO1xyXG4gIFxyXG4gIHJldHVybiBkYjtcclxufVxyXG5cclxuYXN5bmMgZnVuY3Rpb24gaW5pdGlhbGl6ZUluZGV4ZXMoZGIpIHtcclxuICBjb25zdCBjb2xsZWN0aW9uID0gZGIuY29sbGVjdGlvbigncmVjaXBlcycpO1xyXG4gIGNvbnN0IGVycm9ycyA9IFtdO1xyXG5cclxuICB0cnkge1xyXG4gICAgY29uc3QgZXhpc3RpbmdJbmRleGVzID0gYXdhaXQgY29sbGVjdGlvbi5saXN0SW5kZXhlcygpLnRvQXJyYXkoKTtcclxuICAgIGNvbnN0IGluZGV4TmFtZXMgPSBleGlzdGluZ0luZGV4ZXMubWFwKChpbmRleCkgPT4gaW5kZXgubmFtZSk7XHJcblxyXG4gICAgaWYgKGluZGV4TmFtZXMuaW5jbHVkZXMoJ3JlY2lwZV9zZWFyY2hfaW5kZXgnKSkge1xyXG4gICAgICB0cnkge1xyXG4gICAgICAgIGF3YWl0IGNvbGxlY3Rpb24uZHJvcEluZGV4KCdyZWNpcGVfc2VhcmNoX2luZGV4Jyk7XHJcbiAgICAgICAgYXdhaXQgbmV3IFByb21pc2UoKHJlc29sdmUpID0+IHNldFRpbWVvdXQocmVzb2x2ZSwgMTAwMCkpO1xyXG4gICAgICB9IGNhdGNoIChlcnJvcikge1xyXG4gICAgICAgIGlmIChlcnJvci5jb2RlICE9PSAyNykge1xyXG4gICAgICAgICAgZXJyb3JzLnB1c2goYEZhaWxlZCB0byBkcm9wIGluZGV4IHJlY2lwZV9zZWFyY2hfaW5kZXg6ICR7ZXJyb3IubWVzc2FnZX1gKTtcclxuICAgICAgICB9XHJcbiAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBjb25zdCBpbmRleE9wZXJhdGlvbnMgPSBbXHJcbiAgICAgIHtcclxuICAgICAgICBvcGVyYXRpb246IGFzeW5jICgpID0+IHtcclxuICAgICAgICAgIHRyeSB7XHJcbiAgICAgICAgICAgIGF3YWl0IGNvbGxlY3Rpb24uY3JlYXRlSW5kZXgoXHJcbiAgICAgICAgICAgICAgeyB0aXRsZTogJ3RleHQnLCBkZXNjcmlwdGlvbjogJ3RleHQnLCB0YWdzOiAndGV4dCcgfSxcclxuICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICB3ZWlnaHRzOiB7IHRpdGxlOiAxMCwgZGVzY3JpcHRpb246IDUsIHRhZ3M6IDMgfSxcclxuICAgICAgICAgICAgICAgIG5hbWU6ICdyZWNpcGVfc2VhcmNoX2luZGV4JyxcclxuICAgICAgICAgICAgICAgIGJhY2tncm91bmQ6IHRydWUsXHJcbiAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICApO1xyXG4gICAgICAgICAgfSBjYXRjaCAoZXJyb3IpIHtcclxuICAgICAgICAgICAgaWYgKGVycm9yLmNvZGUgIT09IDg1KSB7XHJcbiAgICAgICAgICAgICAgdGhyb3cgZXJyb3I7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgIH1cclxuICAgICAgICB9LFxyXG4gICAgICAgIG5hbWU6ICdyZWNpcGVfc2VhcmNoX2luZGV4JyxcclxuICAgICAgfSxcclxuICAgICAge1xyXG4gICAgICAgIG9wZXJhdGlvbjogKCkgPT4gY29sbGVjdGlvbi5jcmVhdGVJbmRleCh7IGNhdGVnb3J5OiAxIH0sIHsgYmFja2dyb3VuZDogdHJ1ZSB9KSxcclxuICAgICAgICBuYW1lOiAnY2F0ZWdvcnlfaW5kZXgnLFxyXG4gICAgICB9LFxyXG4gICAgICB7XHJcbiAgICAgICAgb3BlcmF0aW9uOiAoKSA9PiBjb2xsZWN0aW9uLmNyZWF0ZUluZGV4KHsgdGFnczogMSB9LCB7IGJhY2tncm91bmQ6IHRydWUgfSksXHJcbiAgICAgICAgbmFtZTogJ3RhZ3NfaW5kZXgnLFxyXG4gICAgICB9LFxyXG4gICAgICB7XHJcbiAgICAgICAgb3BlcmF0aW9uOiAoKSA9PiBjb2xsZWN0aW9uLmNyZWF0ZUluZGV4KHsgJ2luZ3JlZGllbnRzLm5hbWUnOiAxIH0sIHsgYmFja2dyb3VuZDogdHJ1ZSB9KSxcclxuICAgICAgICBuYW1lOiAnaW5ncmVkaWVudHNfaW5kZXgnLFxyXG4gICAgICB9LFxyXG4gICAgICB7XHJcbiAgICAgICAgb3BlcmF0aW9uOiAoKSA9PiBjb2xsZWN0aW9uLmNyZWF0ZUluZGV4KHsgaW5zdHJ1Y3Rpb25zOiAxIH0sIHsgYmFja2dyb3VuZDogdHJ1ZSB9KSxcclxuICAgICAgICBuYW1lOiAnaW5zdHJ1Y3Rpb25zX2luZGV4JyxcclxuICAgICAgfSxcclxuICAgICAge1xyXG4gICAgICAgIG9wZXJhdGlvbjogKCkgPT4gY29sbGVjdGlvbi5jcmVhdGVJbmRleCh7IGNhdGVnb3J5OiAxLCBjcmVhdGVkQXQ6IC0xIH0sIHsgYmFja2dyb3VuZDogdHJ1ZSB9KSxcclxuICAgICAgICBuYW1lOiAnY2F0ZWdvcnlfZGF0ZV9pbmRleCcsXHJcbiAgICAgIH0sXHJcbiAgICAgIHtcclxuICAgICAgICBvcGVyYXRpb246ICgpID0+IGNvbGxlY3Rpb24uY3JlYXRlSW5kZXgoeyAncmV2aWV3cy5yYXRpbmcnOiAxLCAncmV2aWV3cy5jcmVhdGVkQXQnOiAtMSB9LCB7IGJhY2tncm91bmQ6IHRydWUgfSksXHJcbiAgICAgICAgbmFtZTogJ1Jldmlld3MgY29tcG91bmQgaW5kZXgnLFxyXG4gICAgICB9LFxyXG4gICAgICB7XHJcbiAgICAgICAgb3BlcmF0aW9uOiAoKSA9PiBjb2xsZWN0aW9uLmNyZWF0ZUluZGV4KHsgJ3Jldmlld3MudXNlcklkJzogMSB9LCB7IGJhY2tncm91bmQ6IHRydWUgfSksXHJcbiAgICAgICAgbmFtZTogJ1JldmlldyB1c2VyIGluZGV4JyxcclxuICAgICAgfSxcclxuICAgICAge1xyXG4gICAgICAgIG9wZXJhdGlvbjogKCkgPT4gY29sbGVjdGlvbi5jcmVhdGVJbmRleCh7IGF2ZXJhZ2VSYXRpbmc6IC0xIH0sIHsgYmFja2dyb3VuZDogdHJ1ZSB9KSxcclxuICAgICAgICBuYW1lOiAnQXZlcmFnZSByYXRpbmcgaW5kZXgnLFxyXG4gICAgICB9LFxyXG4gICAgXTtcclxuXHJcbiAgICBmb3IgKGNvbnN0IHsgb3BlcmF0aW9uLCBuYW1lIH0gb2YgaW5kZXhPcGVyYXRpb25zKSB7XHJcbiAgICAgIGxldCByZXRyaWVzID0gMztcclxuICAgICAgd2hpbGUgKHJldHJpZXMgPiAwKSB7XHJcbiAgICAgICAgdHJ5IHtcclxuICAgICAgICAgIGF3YWl0IG9wZXJhdGlvbigpO1xyXG4gICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgfSBjYXRjaCAoZXJyb3IpIHtcclxuICAgICAgICAgIHJldHJpZXMtLTtcclxuICAgICAgICAgIGlmIChyZXRyaWVzID09PSAwKSB7XHJcbiAgICAgICAgICAgIGlmIChlcnJvci5jb2RlICE9PSA4NSkge1xyXG4gICAgICAgICAgICAgIGVycm9ycy5wdXNoKGBGYWlsZWQgdG8gY3JlYXRlIGluZGV4ICR7bmFtZX06ICR7ZXJyb3IubWVzc2FnZX1gKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgYXdhaXQgbmV3IFByb21pc2UoKHJlc29sdmUpID0+IHNldFRpbWVvdXQocmVzb2x2ZSwgMTAwMCkpO1xyXG4gICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIGlmIChlcnJvcnMubGVuZ3RoID4gMCkge1xyXG4gICAgICBjb25zb2xlLmVycm9yKGBJbmRleCBpbml0aWFsaXphdGlvbiBjb21wbGV0ZWQgd2l0aCB3YXJuaW5nczogJHtlcnJvcnMuam9pbignOyAnKX1gKTtcclxuICAgIH1cclxuICB9IGNhdGNoIChlcnJvcikge1xyXG4gICAgY29uc29sZS5lcnJvcihgSW5kZXggaW5pdGlhbGl6YXRpb24gZXJyb3I6ICR7ZXJyb3IubWVzc2FnZX1gKTtcclxuICB9XHJcbn1cclxuXHJcbmFzeW5jIGZ1bmN0aW9uIGNoZWNrQW5kQ3JlYXRlUmV2aWV3cyhkYikge1xyXG4gIGNvbnN0IGNvbGxlY3Rpb24gPSBkYi5jb2xsZWN0aW9uKCdyZWNpcGVzJyk7XHJcblxyXG4gIHRyeSB7XHJcbiAgICBjb25zdCByZWNpcGVzV2l0aG91dFJldmlld3MgPSBhd2FpdCBjb2xsZWN0aW9uLmZpbmQoeyByZXZpZXdzOiB7ICRleGlzdHM6IGZhbHNlIH0gfSkudG9BcnJheSgpO1xyXG4gICAgXHJcbiAgICBpZiAocmVjaXBlc1dpdGhvdXRSZXZpZXdzLmxlbmd0aCA+IDApIHtcclxuICAgICAgY29uc3QgdXBkYXRlUHJvbWlzZXMgPSByZWNpcGVzV2l0aG91dFJldmlld3MubWFwKHJlY2lwZSA9PiB7XHJcbiAgICAgICAgcmV0dXJuIGNvbGxlY3Rpb24udXBkYXRlT25lKFxyXG4gICAgICAgICAgeyBfaWQ6IHJlY2lwZS5faWQgfSxcclxuICAgICAgICAgIHsgJHNldDogeyByZXZpZXdzOiBbXSB9IH0gLy8gQ3JlYXRlIGFuIGVtcHR5IGFycmF5IGZvciByZXZpZXdzXHJcbiAgICAgICAgKTtcclxuICAgICAgfSk7XHJcbiAgICAgIGF3YWl0IFByb21pc2UuYWxsKHVwZGF0ZVByb21pc2VzKTtcclxuICAgICAgY29uc29sZS5sb2coYCR7dXBkYXRlUHJvbWlzZXMubGVuZ3RofSByZWNpcGVzIHVwZGF0ZWQgd2l0aCBlbXB0eSByZXZpZXdzIGFycmF5LmApO1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgY29uc29sZS5sb2coJ05vIHJlY2lwZXMgd2l0aG91dCByZXZpZXdzIGZvdW5kLicpO1xyXG4gICAgfVxyXG4gIH0gY2F0Y2ggKGVycm9yKSB7XHJcbiAgICBjb25zb2xlLmVycm9yKGBFcnJvciBjaGVja2luZyBhbmQgY3JlYXRpbmcgcmV2aWV3czogJHtlcnJvci5tZXNzYWdlfWApO1xyXG4gIH1cclxufVxyXG5cclxubW9kdWxlLmV4cG9ydHMgPSBjb25uZWN0VG9EYXRhYmFzZTtcclxuIl0sIm5hbWVzIjpbIk1vbmdvQ2xpZW50IiwiU2VydmVyQXBpVmVyc2lvbiIsInJlcXVpcmUiLCJwcm9jZXNzIiwiZW52IiwiTU9OR09EQl9VUkkiLCJFcnJvciIsInVyaSIsIm9wdGlvbnMiLCJzZXJ2ZXJBcGkiLCJ2ZXJzaW9uIiwidjEiLCJkZXByZWNhdGlvbkVycm9ycyIsIm1heFBvb2xTaXplIiwiY2xpZW50UHJvbWlzZSIsImdsb2JhbCIsIl9tb25nb0NsaWVudFByb21pc2UiLCJjbGllbnQiLCJjb25uZWN0IiwiY2FjaGVkRGIiLCJjb25uZWN0VG9EYXRhYmFzZSIsImRiIiwiaW5pdGlhbGl6ZUluZGV4ZXMiLCJjaGVja0FuZENyZWF0ZVJldmlld3MiLCJjb2xsZWN0aW9uIiwiZXJyb3JzIiwiZXhpc3RpbmdJbmRleGVzIiwibGlzdEluZGV4ZXMiLCJ0b0FycmF5IiwiaW5kZXhOYW1lcyIsIm1hcCIsImluZGV4IiwibmFtZSIsImluY2x1ZGVzIiwiZHJvcEluZGV4IiwiUHJvbWlzZSIsInJlc29sdmUiLCJzZXRUaW1lb3V0IiwiZXJyb3IiLCJjb2RlIiwicHVzaCIsIm1lc3NhZ2UiLCJpbmRleE9wZXJhdGlvbnMiLCJvcGVyYXRpb24iLCJjcmVhdGVJbmRleCIsInRpdGxlIiwiZGVzY3JpcHRpb24iLCJ0YWdzIiwid2VpZ2h0cyIsImJhY2tncm91bmQiLCJjYXRlZ29yeSIsImluc3RydWN0aW9ucyIsImNyZWF0ZWRBdCIsImF2ZXJhZ2VSYXRpbmciLCJyZXRyaWVzIiwibGVuZ3RoIiwiY29uc29sZSIsImpvaW4iLCJyZWNpcGVzV2l0aG91dFJldmlld3MiLCJmaW5kIiwicmV2aWV3cyIsIiRleGlzdHMiLCJ1cGRhdGVQcm9taXNlcyIsInJlY2lwZSIsInVwZGF0ZU9uZSIsIl9pZCIsIiRzZXQiLCJhbGwiLCJsb2ciLCJtb2R1bGUiLCJleHBvcnRzIl0sInNvdXJjZVJvb3QiOiIifQ==\n//# sourceURL=webpack-internal:///(rsc)/./db.js\n");

/***/ })

};
;

// load runtime
var __webpack_require__ = require("../../../../webpack-runtime.js");
__webpack_require__.C(exports);
var __webpack_exec__ = (moduleId) => (__webpack_require__(__webpack_require__.s = moduleId))
var __webpack_exports__ = __webpack_require__.X(0, ["vendor-chunks/next","vendor-chunks/next-auth","vendor-chunks/@babel","vendor-chunks/debug","vendor-chunks/https-proxy-agent","vendor-chunks/agent-base","vendor-chunks/ecdsa-sig-formatter","vendor-chunks/ms","vendor-chunks/supports-color","vendor-chunks/safe-buffer","vendor-chunks/buffer-equal-constant-time","vendor-chunks/has-flag","vendor-chunks/jose","vendor-chunks/google-auth-library","vendor-chunks/openid-client","vendor-chunks/gaxios","vendor-chunks/uuid","vendor-chunks/node-fetch","vendor-chunks/gtoken","vendor-chunks/oauth","vendor-chunks/json-bigint","vendor-chunks/@panva","vendor-chunks/yallist","vendor-chunks/preact-render-to-string","vendor-chunks/oidc-token-hash","vendor-chunks/bcryptjs","vendor-chunks/preact","vendor-chunks/is-stream","vendor-chunks/extend","vendor-chunks/bignumber.js","vendor-chunks/base64-js"], () => (__webpack_exec__("(rsc)/./node_modules/next/dist/build/webpack/loaders/next-app-loader.js?name=app%2Fapi%2Fauth%2F%5B...nextauth%5D%2Froute&page=%2Fapi%2Fauth%2F%5B...nextauth%5D%2Froute&appPaths=&pagePath=private-next-app-dir%2Fapi%2Fauth%2F%5B...nextauth%5D%2Froute.js&appDir=C%3A%5CUsers%5CSoftware.Engineer51%5CDocuments%5CGitHub%5CASE_2024_GROUP_D%5CASE_2024_GROUP_D%5Capp&pageExtensions=tsx&pageExtensions=ts&pageExtensions=jsx&pageExtensions=js&rootDir=C%3A%5CUsers%5CSoftware.Engineer51%5CDocuments%5CGitHub%5CASE_2024_GROUP_D%5CASE_2024_GROUP_D&isDev=true&tsconfigPath=tsconfig.json&basePath=&assetPrefix=&nextConfigOutput=&preferredRegion=&middlewareConfig=e30%3D!")));
module.exports = __webpack_exports__;

})();