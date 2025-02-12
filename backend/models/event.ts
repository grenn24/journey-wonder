import Joi from "joi";
import mongoose, { InferSchemaType } from "mongoose";

const categories: Record<string, string[]> = {
	Transport: ["Train", "Flight", "Cable", "Drive","Boat"],
	Accommodation: ["Stay"],
	Activity: ["Walk", "Food", "Sightseeing", "Theme Park"],
};

const eventSchema = new mongoose.Schema({
	orderIndex: {
		type: Number,
		required: true,
	},
	category: {
		type: String,
		enum: Object.keys(categories),
		required: true,
	},
	subcategory: {
		type: String,
		validate: {
			validator: function (this: any, value: any) {
				return categories[this.category].includes(value);
			},
			message: (props: any) =>
				`"${props.value}" is not a valid subcategory for category "${props.instance.category}"`,
		},
		required: true,
	},
	title: {
		type: String,
		maxLength: 256,
	},
	description: {
		type: String,
	},
	location: {
		name: String,
		address: String,
	},
	startTime: {
		type: Date,
		required: true,
	},
	endTime: {
		type: Date,
		required: true,
	},
	notes: {
		type: String,
	},
	files: [Buffer],
});

export const eventJoiSchema = Joi.object({
	orderIndex: Joi.number().required(), // starts at 0
	category: Joi.string()
		.valid(...Object.keys(categories))
		.required(),
	subcategory: Joi.string()
		.valid(...Object.values(categories).flat())
		.required(),
	title: Joi.string().max(256),
	description: Joi.string(),
	location: Joi.object({
		name: Joi.string().required(),
		address: Joi.string().required(),
	}),
	startTime: Joi.date().required(),
	endTime: Joi.date().required(),
	notes: Joi.string(),
	files: Joi.array().items(Joi.binary()),
});



const Event = mongoose.model("Event", eventSchema);

export default Event;
export type EventType = InferSchemaType<typeof eventSchema>;
