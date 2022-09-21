"use strict";
exports.__esModule = true;
exports.client = void 0;
var client_1 = require("tinacms/dist/client");
var types_1 = require("./types");
exports.client = (0, client_1.createClient)({ url: 'https://content.tinajs.io/content/4d3ce4e3-2c98-4ff5-ac34-9700701ca86a/github/main', token: '172a97516366fffd8a50a9a5bfd69b7e5a2bc5bc', queries: types_1.queries });
exports["default"] = exports.client;
