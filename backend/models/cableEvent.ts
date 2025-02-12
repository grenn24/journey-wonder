import mongoose from "mongoose";
import Event from "./event";

const cableEventSchema = new mongoose.Schema({
	distance: String,
	bookingNumber: String,
	cable: {
		carrier: String,
		cableNumber: String,
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
		station: {
			name: { type: String, required: true },
			address: String,
		},
		platform: String,
	},
	arrival: {
		station: {
			name: { type: String, required: true },
			address: String,
		},
		platform: String,
	},
});

const CableEvent = Event.discriminator("Cable Event", cableEventSchema);
export default CableEvent;
