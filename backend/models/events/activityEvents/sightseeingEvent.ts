import mongoose from "mongoose";
import Event from "../../event";

const sightseeingEventSchema = new mongoose.Schema({
	tourGuide: {
		agency: String,
		groupNumber: String,
		name: String,
		telephone: String,
		website: String,
	},
});

const SightseeingEvent = Event.discriminator(
	"Sightseeing Event",
	sightseeingEventSchema,"sightseeing event"
);
export default SightseeingEvent;
