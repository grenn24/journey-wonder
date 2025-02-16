import Joi from "joi";
const JoiObjectId = require("joi-objectid")(Joi);
import mongoose, { InferSchemaType } from "mongoose";
import { eventJoiSchema } from "./event";
import { HttpError } from "../middlewares/error";
import Event from "./event";

const itinerarySchema = new mongoose.Schema({
	author: {
		type: mongoose.Schema.Types.ObjectId,
		ref: "User",
		required: true,
	},
	travellers: [
		{
			email: {
				type: String,
				required: true,
				lowercase: true,
				maxLength: 255,
			},
			permission: {
				type: String,
				enum: ["Read","Edit"],
				required: true,
			},
		},
	],
	title: {
		type: String,
		required: true,
		maxLength: 512,
	},
	description: {
		type: String,
	},
	destination: {
		type: String,
		required: true,
	},
	startDate: {
		type: Date,
		required: true,
	},
	endDate: {
		type: Date,
		required: true,
	},
	events: [
		{
			type: mongoose.Schema.Types.ObjectId,
			ref: "Event",
			default: [],
		},
	],
	picture: Buffer,
	visibility: {
		type: String,
		enum: ["Private", "Public"],
		default: "Private",
	},
	createdAt: {
		type: Date,
		default: Date.now,
	},
});

itinerarySchema.pre("deleteMany", async function () {
	try {
		const itinerariesToDelete = await Itinerary.find(this.getFilter());
		for (const itinerary of itinerariesToDelete) {
			if (itinerary.events.length > 0) {
				await Event.deleteMany({ _id: { $in: itinerary.events } });
			}
		}
	} catch (err) {
		throw err;
	}
});

itinerarySchema.pre("deleteOne", async function () {
	try {
		const itineraryToDelete = await Itinerary.findOne(this.getFilter());
		if (itineraryToDelete && itineraryToDelete.events.length > 0) {
			await Event.deleteMany({ _id: { $in: itineraryToDelete.events } });
		}
	} catch (err) {
		throw err;
	}
});

itinerarySchema.statics.validate = validateItinerary;

export function validateItinerary(itinerary: any) {
	const itinerarySchema = Joi.object({
		title: Joi.string().max(512).required(),
		description: Joi.string(),
		destination: Joi.string().required(),
		startDate: Joi.date().required(),
		endDate: Joi.date().required(),
		events: Joi.array().items(Joi.object()),
		visibility: Joi.string().valid("Private", "Public").default("Private"),
		author: JoiObjectId().required(),
		travellers: Joi.array().items(JoiObjectId()).min(1).required(),
		picture: Joi.binary(),
	});

	let result = itinerarySchema.validate(itinerary);
	if (result.error) {
		throw new HttpError(result.error.details[0].message, "INVALID_FIELDS");
	}
}

const Itinerary = mongoose.model("Itinerary", itinerarySchema);

export default Itinerary;
export type ItineraryType = InferSchemaType<typeof itinerarySchema>;
