import mongoose from "mongoose";
import Event from "./event";

const driveEventSchema = new mongoose.Schema({
	distance: String,
	vehicle: {
		type: String,
		model: String,
	},
	start: {
		type: {
			name: {
				type: String,
				required: true,
			},
			address: String,
		},
		required: true,
	},
	end: {
		type: {
			name: {
				type: String,
				required: true,
			},
			address: String,
		},
		required:true
	},
});

const DriveEvent = Event.discriminator("Drive Event", driveEventSchema);
export default DriveEvent;
