"use strict";
exports.__esModule = true;
exports.client = void 0;
var client_1 = require("tinacms/dist/client");
var types_1 = require("./types");
exports.client = (0, client_1.createClient)({ url: 'http://localhost:4001/graphql', token: '172a97516366fffd8a50a9a5bfd69b7e5a2bc5bc', queries: types_1.queries });
exports["default"] = exports.client;
