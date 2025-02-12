import mongoose from "mongoose";
import Event, { eventJoiSchema } from "./event";
import Joi from "joi";

const mealTypes = ["Breakfast", "Brunch", "Lunch", "Tea", "Dinner", "Supper"];
const foodEventSchema = new mongoose.Schema({
	reservationNumber: String,
	mealType: {
		type: String,
		enum: mealTypes,
		required: true,
	},
	telephone: String,
	website: String,
});

export const foodEventJoiSchema = eventJoiSchema.concat(
	Joi.object({
		reservationNumber: Joi.string(),
		mealType: Joi.string().valid(...mealTypes),
		telephone: Joi.string(),
		website: Joi.string(),
	})
);

const FoodEvent = Event.discriminator("Food Event", foodEventSchema);
export default FoodEvent;
