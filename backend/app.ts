import express from "express";
import "dotenv/config";
import config from "config";
import createDebug from "debug";

const startupDebug = createDebug("app:startup");
const app = express();

require("./startup/logging").default();
require("./startup/config").default();
require("./startup/db").default();
require("./startup/middlewares").default(app);
require("./startup/routes").default(app);

// Start the server
const port = config.get("PORT") || 3000;
app.listen(port, () => {
	startupDebug(`Server running at http://localhost:${port}`);
});
