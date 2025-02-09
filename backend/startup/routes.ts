import express, { Express } from "express";
import user from "../routes/user";
import auth from "../routes/auth";
import error from "../middlewares/error";
import morgan from "morgan";
const Joi = require("joi");
Joi.ObjectID = require("joi-objectid")(Joi);

const routes = (app: Express) => {
	const apiRouter = express.Router();

    // Api middlewares
    apiRouter.use(express.json());
    apiRouter.use(express.urlencoded({ extended: true }));
    if (app.get("env") === "development") {
        apiRouter.use(morgan("tiny"));
    }

	// Auth-related routes
	apiRouter.use("/auth", auth);

	// User-related routes
	apiRouter.use("/user", user);

	// Log errors
	apiRouter.use(error);

	// Handle missed api routes
	apiRouter.use((_, res) => {
		res.status(404).send("Api route not found");
	});

	app.use("/api", apiRouter);
};

export default routes;
