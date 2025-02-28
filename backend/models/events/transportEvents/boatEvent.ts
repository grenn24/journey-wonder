import mongoose from "mongoose";
import Event from "../../event";

const boatEventSchema = new mongoose.Schema({
	distance: String,
	bookingNumber: String,
	cable: {
		carrier: String,
		boatNumber: String,
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
			port: {
				name: { type: String, required: true },
				address: String,
			},
			gate: String,
		},
		required: true,
	},
	arrival: {
		type: {
			port: {
				name: { type: String, required: true },
				address: String,
			},
			gate: String,
		},
		required: true,
	},
});

const BoatEvent = Event.discriminator("Boat Event", boatEventSchema,"boat event");
export default BoatEvent;
