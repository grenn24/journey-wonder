import mongoose from "mongoose";
import Event, { eventJoiSchema } from "../../event";
import Joi from "joi";
const JoiObjectId = require("joi-objectid")(Joi);

const flightSchema = new mongoose.Schema({
	bookingNumber: String,
	distance: String,
	airline: {
		type: String,
		required: true,
	},
	flightNumber: String,
	seats: [
		{
			traveller: {
				type: mongoose.Schema.Types.ObjectId,
				ref: "users",
			},
			seatNumber: {
				type: String,
				required: true,
			},
		},
	],
	class: String,
	model: String,
	departure: {
		type: {
			country: {
				type: String,
				required: true,
			},
			airport: {
				type: {
					name: { type: String, required: true },
					address: String,
				},
				required: true,
			},
			terminal: String,
			gate: String,
		},
		required: true,
	},
	arrival: {
		type: {
			country: {
				type: String,
				required: true,
			},
			airport: {
				type: {
					name: { type: String, required: true },
					address: String,
				},
				required: true,
			},
			terminal: String,
			gate: String,
		},
		required: true,
	},
});

const flightEventSchema = new mongoose.Schema({
	origin: {
		type: String,
		required: true,
	},
	destination: {
		type: String,
		required: true,
	},
	flights: {
		type: [flightSchema],
		validate: {
			validator: function (v: any) {
				return v && v.length >= 1;
			},
			message: "At least one flight is required",
		},
	},
});

export const flightEventJoiSchema = eventJoiSchema.concat(
	Joi.object({
		origin: Joi.string().required(),
		destination: Joi.string().required(),
		flights: Joi.array()
			.items(
				Joi.object({
					bookingNumber: Joi.string(),
					distance: Joi.string(),
					airline: Joi.string().required(),
					flightNumber: Joi.string(),
					seats: Joi.array().items(
						Joi.object({
							seatNumber: Joi.string().required(),
							traveller: JoiObjectId(),
						})
					),
					class: Joi.string(),
					model: Joi.string(),
					departure: Joi.object({
						country: Joi.string().required(),
						airport: Joi.object({
							name: Joi.string().required,
							address: Joi.string(),
						}).required(),
						terminal: Joi.string(),
						gate: Joi.string(),
					}).required(),
					arrival: Joi.object({
						country: Joi.string().required(),
						airport: Joi.object({
							name: Joi.string().required,
							address: Joi.string(),
						}).required(),
						terminal: Joi.string(),
						gate: Joi.string(),
					}).required(),
				})
			)
			.min(1)
			.required(),
	})
);

const FlightEvent = Event.discriminator("Flight Event", flightEventSchema,"flight event");
export default FlightEvent;
