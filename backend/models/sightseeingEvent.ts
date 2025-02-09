import mongoose from "mongoose";
import Event from "./event";

const sightseeingEventSchema = new mongoose.Schema({
	tourGuide:{
		agency:String,
		groupNumber:String,
		name:String,
		telephone:String,
		website:String
	}
});

const SightseeingEvent = Event.discriminator(
	"sightseeingEvents",
	sightseeingEventSchema
);
export default SightseeingEvent;
