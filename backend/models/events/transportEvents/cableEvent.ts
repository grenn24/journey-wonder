import mongoose from "mongoose";
import Event from "../../event";

const cableEventSchema = new mongoose.Schema({
	distance: String,
	bookingNumber: String,
	cable: {
		carrier: String,
		cableNumber: String,
		seats: [
			{
				traveller: {
					type: mongoose.Schema.Types.ObjectId,
					ref: "users",
				},
				seatNumber: String,
			},
		],
		class: String,
		model: String,
	},
	departure: {
		type: {
			station: {
				name: { type: String, required: true },
				address: String,
			},
			platform: String,
		},
		required: true,
	},
	arrival: {
		type: {
			station: {
				name: { type: String, required: true },
				address: String,
			},
			platform: String,
		},
		required: true,
	},
});

const CableEvent = Event.discriminator("Cable Event", cableEventSchema,"cable event");
export default CableEvent;
