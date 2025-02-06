import express, { Express } from "express";
import route1 from "../routes/route1";

const setupRouters = (app: Express) => {
	const apiRouter = express.Router();
	
	apiRouter.use("/route1", route1);

    // Handle missed api routes
	apiRouter.use((_, res) => {
		res.status(404).send("Api route not found");
	});

	app.use("/api", apiRouter);
};

export default setupRouters;
