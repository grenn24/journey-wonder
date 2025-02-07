import express, { Express } from "express";
import user from "../routes/user";
import auth from "../routes/auth";

const setupRouters = (app: Express) => {
	const apiRouter = express.Router();

	// Auth-related routes
	apiRouter.use("/auth", auth);

	// User-related routes
	apiRouter.use("/user", user);

	// Handle missed api routes
	apiRouter.use((_, res) => {
		res.status(404).send("Api route not found");
	});

	app.use("/api", apiRouter);
};

export default setupRouters;
