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
	travellers: {
		type: [
			{
				email: {
					type: String,
					required: true,
					lowercase: true,
					maxLength: 255,
				},
				permission: {
					type: String,
					enum: ["Read", "Edit"],
					required: true,
				},
			},
		],
		minlength: 1,
		required: true,
	},
	title: {
		type: String,
		required: true,
		maxLength: 512,
	},
	description: {
		type: String,
	},
	destinations: {
		type: [
			{
				name: {
					type: String,
					required: true,
				},
				type: {
					type: String,
					enum: ["City", "Country", "Region", "State"],
					required: true,
				},
			},
		],
		minlength: 1,
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
	events: {
		type: [
			{
				type: mongoose.Schema.Types.ObjectId,
				ref: "Event",
			},
		],
		default: [],
	},
	image: Buffer,
	visibility: {
		type: String,
		enum: ["Public", "Travellers", "Only Me"],
		default: "Travellers",
	},
	createdAt: {
		type: Date, // UTC +00:00
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
		destinations: Joi.array()
			.items(
				Joi.object({
					name: Joi.string().required(),
					type: Joi.string().required(),
				})
			)
			.min(1)
			.required(),
		startDate: Joi.date().required(),
		endDate: Joi.date().required(),
		events: Joi.array().items(Joi.object()).default([]),
		visibility: Joi.string()
			.valid("Public", "Travellers", "Only Me")
			.default("Travellers"),
		author: JoiObjectId().required(),
		travellers: Joi.array()
			.items(
				Joi.object({
					email: Joi.string().email().required(),
					permission: Joi.string().valid("Edit", "Read").required(),
				})
			)
			.min(1)
			.required(),
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
