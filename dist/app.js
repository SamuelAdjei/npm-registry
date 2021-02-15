"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createApp = void 0;
var express = require("express");
var package_1 = require("./package");
/**
 * Bootstrap the application framework
 */
function createApp() {
    var app = express();
    app.use(express.json());
    app.get('/package/:name', package_1.getPackage);
    app.get('/package/:name/:version', package_1.getPackage);
    return app;
}
exports.createApp = createApp;
//# sourceMappingURL=app.js.map
