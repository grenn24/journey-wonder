import mongoose from "mongoose";
import Itinerary from "./itinerary";

const activitySchema = new mongoose.Schema({
	itinerary: {
		type: mongoose.Schema.Types.ObjectId,
		ref: "itineraries",
	},
	type: {
		type: String,
		enum: ["Walking", "Train", "Flight", "Drive"],
		required: true,
	},
	title: {
		type: String,
		required: true,
	},
	description: {
		type: String,
	},
	location: {
		type: String,
	},
	startTime: {
		type: Date,
		required: true,
	},
	endTime: {
		type: Date,
		required: true,
	},
	notes: {
		type: String,
	},
});

const Activity = mongoose.model("activities",activitySchema);

export default Activity;