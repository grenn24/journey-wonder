"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
require("dotenv/config");
var config_1 = require("config");
var debug_1 = require("debug");
var startupDebug = (0, debug_1.default)("app:startup");
var app = (0, express_1.default)();
require("./startup/logging").default();
require("./startup/config").default();
require("./startup/db").default();
require("./startup/middlewares").default(app);
require("./startup/routes").default(app);
// Start the server
var port = config_1.default.get("PORT") || 3000;
app.listen(port, function () {
    startupDebug("Server running at http://localhost:".concat(port));
});
