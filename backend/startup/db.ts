import mongoose from "mongoose";
import config from "config";
import createDebug from "debug";
import logger from "../utilities/winston";
import { Express } from "express";

const dbDebug = createDebug("db");

// Establish connection with mongodb, resolves with a mongoose instance
const db = async (app: Express): Promise<mongoose.Connection> => {
	app.locals.destinationDb = mongoose.createConnection(
		config.get("DATABASE_URL_3")
	);
	return mongoose
		.connect(config.get("DATABASE_URL"))
		.then((conn) => {
			dbDebug(`Connected to Database`);
			app.locals.db = conn.connection;
			return conn.connection;
		})
		.catch((err) => {
			dbDebug(err);
			logger("/logs/db.log").verbose(err);
			return err;
		});
};

export default db;
