import express from "express";
import dotenv from "dotenv";
dotenv.config();
import setupRouters from "./utilities/setupRouters";
import morgan from "morgan";
import config from "config";
import createDebug from "debug";
import mongoose from "mongoose";

const startupDebug = createDebug("app:startup");
const dbDebug = createDebug("db");
const app = express();

// Middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
if (app.get("env") === "development") {
	app.use(morgan("tiny"));
}

// Connect to MongoDB
mongoose
	.connect(config.get("DATABASE_URL"))
	.then(() => dbDebug(`Connected to Database`))
	.catch((err) => dbDebug(err));

// Setup route handlers
setupRouters(app);

// Start the server
app.on("connection", () => {});
app.on("error", (err) => {
	console.error(`Server error: ${err}`);
});
const port = config.get("PORT") || 3000;
app.listen(port, () => {
	startupDebug(`Server running at http://localhost:${port}`);
});
