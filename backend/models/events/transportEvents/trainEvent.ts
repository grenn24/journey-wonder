import mongoose from "mongoose";
import Event from "../../event";

const trainEventSchema = new mongoose.Schema({
	distance: String,
	bookingNumber: String,
	train: {
		carrier: String,
		trainNumber: String,
		seats: [
			{
				traveller: {
					type: mongoose.Schema.Types.ObjectId,
					ref: "users",
				},
				seatNumber: {
					type: String,
					required: true,
				},
			},
		],
		class: String,
		model: String,
	},
	departure: {
		type: {
			country: String,
			name: { type: String, required: true },
			address: String,
			platform: String,
		},
		required: true,
	},
	arrival: {
		type: {
			country: String,
			name: { type: String, required: true },
			address: String,
			platform: String,
		},
		required: true,
	},
});

const TrainEvent = Event.discriminator("Train Event", trainEventSchema);
export default TrainEvent;
