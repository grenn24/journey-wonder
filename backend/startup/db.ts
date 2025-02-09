import mongoose from "mongoose";
import config from "config";
import createDebug from "debug";
import logger from "../utilities/winston";

const dbDebug = createDebug("db");

const db = () =>
	mongoose
		.connect(config.get("DATABASE_URL"))
		.then(() => dbDebug(`Connected to Database`))
		.catch((err) => {
			dbDebug(err);
			logger("/logs/db.log").verbose(err);
		});

export default db;
