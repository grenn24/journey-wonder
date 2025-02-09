import mongoose from "mongoose";
import Event from "./event";

const stayEventSchema = new mongoose.Schema({
	bookingNumber:String,
	telephone:String,
	website:String,
});

const StayEvent = Event.discriminator("stayEvents", stayEventSchema);
export default StayEvent;
