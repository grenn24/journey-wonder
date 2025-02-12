import mongoose from "mongoose";
import Event, { eventJoiSchema } from "./event";
import Joi from "joi";

const stayEventSchema = new mongoose.Schema({
	bookingNumber: String,
	telephone: String,
	website: String,
});

export const stayEventJoiSchema = eventJoiSchema.concat(
	Joi.object({
		bookingNumber: Joi.string(),
		telephone: Joi.string(),
		website: Joi.string(),
	})
);

const StayEvent = Event.discriminator("Stay Event", stayEventSchema);
export default StayEvent;
