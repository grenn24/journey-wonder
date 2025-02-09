import mongoose from "mongoose";
import Event from "./event";

const flightSchema = new mongoose.Schema({
	flight: {
		airline: String,
		flightNumber: String,
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
		airport: {
			name: { type: String, required: true },
			address: String,
		},
		terminal: String,
		gate: String,
	},
	arrival: {
		country: String,
		airport: {
			name: { type: String, required: true },
			address: String,
		},
		terminal: String,
		gate: String,
	},
});

const Flight = mongoose.model("flights", flightSchema);

const flightEventSchema = new mongoose.Schema({
	departure: {
		country: String,
	},
	arrival: {
		country: String,
	},
	distance: String,
	bookingNumber: String,
	flights: [Flight],
});

const FlightEvent = Event.discriminator("flightEvents", flightEventSchema);
export default FlightEvent;
