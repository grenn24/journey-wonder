import express, { Express } from "express";
import user from "../routes/user";
import auth from "../routes/auth";
import journey from "../routes/journey";
import error from "../middlewares/error";
const Joi = require("joi");
Joi.ObjectID = require("joi-objectid")(Joi);

const routes = (app: Express) => {
	const apiRouter = express.Router();

	// Auth-related routes
	apiRouter.use("/auth", auth);

	// User-related routes
	apiRouter.use("/user", user);

	// Journey-related routes
	apiRouter.use("/journey", journey);

	// Log errors
	apiRouter.use(error);

	// Handle missed api routes
	apiRouter.use((_, res) => {
		res.status(404).send("Api route not found");
	});

	app.use("/api", apiRouter);
};

export default routes;
