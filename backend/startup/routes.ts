import express, { Express } from "express";
import user from "../routes/user";
import auth from "../routes/auth";
import itinerary from "../routes/itinerary";
import error from "../middlewares/error";
import morgan from "morgan";
import cors from "../middlewares/cors";
const Joi = require("joi");
Joi.ObjectID = require("joi-objectid")(Joi);

const routes = (app: Express) => {
	const apiRouter = express.Router();

	// middlewares
	app.use(cors);
	apiRouter.use(express.json());
	apiRouter.use(express.urlencoded({ extended: true }));
	if (app.get("env") === "development") {
		apiRouter.use(morgan("tiny"));
	}

	// Auth-related routes
	apiRouter.use("/auth", auth);

	// User-related routes
	apiRouter.use("/user", user);

	// Itinerary-related routes
	apiRouter.use("/itinerary", itinerary);

	// Log errors
	apiRouter.use(error);

	// Handle missed api routes
	apiRouter.use((_, res) => {
		res.status(404).send("Api route not found");
	});

	app.use("/api", apiRouter);
};

export default routes;
