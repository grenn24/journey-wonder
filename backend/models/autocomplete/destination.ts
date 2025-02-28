import mongoose from "mongoose";
import config from "config";

const db = mongoose.createConnection(
		config.get("DATABASE_URL_3")
	);
export const City = db.model(
	"City",
	new mongoose.Schema({}, { strict: false }),
	"city"
);
export const Region = db.model(
	"Region",
	new mongoose.Schema({}, { strict: false }),
	"region"
);
export const State = db.model(
	"State",
	new mongoose.Schema({}, { strict: false }),
	"state"
);
export const Country = db.model(
	"Country",
	new mongoose.Schema({}, { strict: false }),
	"country"
);