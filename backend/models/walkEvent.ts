import mongoose from "mongoose";
import Event, { eventJoiSchema } from "./event";
import Joi from "joi";

const walkEventSchema = new mongoose.Schema({
	distance: String,
	start: {
		type: {
			name: {
				type: String,
				required: true,
			},
			address: String,
		},
		required: true,
	},
	end: {
		type: {
			name: {
				type: String,
				required: true,
			},
			address: String,
		},
		required: true,
	},
});

export const walkEventJoiSchema = eventJoiSchema.concat(
	Joi.object({
		distance: Joi.string(),
		start: Joi.object(
			Joi.object({ name: Joi.string().required(), address: Joi.string() })
		).required(),
	})
);

const WalkEvent = Event.discriminator("Walk Event", walkEventSchema);
export default WalkEvent;
