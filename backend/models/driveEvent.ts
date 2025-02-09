import mongoose from "mongoose";
import Event from "./event";

const driveEventSchema = new mongoose.Schema({
	distance: String,
	vehicle: {
        type:String,
		model: String,
	},
	start: {
		name: {
			type: String,
			required: true,
		},
		address: String,
	},
	end: {
		name: {
			type: String,
			required: true,
		},
		address: String,
	},
});

const DriveEvent = Event.discriminator("driveEvents", driveEventSchema);
export default DriveEvent;
