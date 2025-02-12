import mongoose from "mongoose";
import Event from "./event";

const trainEventSchema = new mongoose.Schema({
	distance: String,
	bookingNumber: String,
	train: {
		carrier: String,
		trainNumber: String,
		seats: [
			{
				traveller: { type: mongoose.Schema.Types.ObjectId, ref: "users" },
				seatNumber: String,
			},
		],
		class: String,
		model: String,
	},
	departure: {
		country: String,
		station: {
			name: { type: String, required: true },
			address: String,
		},
		platform: String,
	},
	arrival: {
		country: String,
		station: {
			name: { type: String, required: true },
			address: String,
		},
		platform: String,
	},
});

const TrainEvent = Event.discriminator("Train Event",trainEventSchema);
export default TrainEvent;