import Joi from "joi";
import mongoose, { InferSchemaType } from "mongoose";
import JoiPasswordComplexity from "joi-password-complexity";
import jwt from "jsonwebtoken";
import config from "config";
import { HttpError } from "../middlewares/error";
import { v4 as uuidv4 } from "uuid";
import {generate} from "random-words";

const secretKey: string = config.get("SECRET_KEY");
const userSchema = new mongoose.Schema(
	{
		name: {
			type: String,
			required: [true, "Name is required"],
			maxLength: 70,
		},
		username: {
			type: String,
			maxLength: 35,
			unique: true,
		},
		email: {
			type: String,
			required: [true, "Email is required"],
			unique: true,
			lowercase: true,
			maxLength: 255,
		},
		passwordHash: {
			type: String,
		},
		birthday: Date,
		membershipTier: {
			type: String,
			enum: ["Free", "Basic", "Premium"],
			default: "Free",
		},
		membershipStartDate: { type: Date },
		membershipEndDate: { type: Date },
		billingCycle: {
			type: String,
			enum: ["Monthly", "Annually"],
		},
		role: {
			type: String,
			enum: ["User", "Admin"],
			default: "User",
		},
		avatar: Buffer,
		createdAt: { type: Date, default: Date.now },
	},
	{
		methods: {
			generateAccessToken() {
				return jwt.sign(
					{
						userID: this._id,
						name: this.name,
						email: this.email,
						membershipTier: this.membershipTier,
						role: this.role,
						type: "accessToken",
					},
					secretKey,
					{
						expiresIn: "15m",
					}
				);
			},
			generateRefreshToken(expiresIn: any) {
				return jwt.sign(
					{ userID: this._id, role: this.role, type: "refreshToken" },
					secretKey,
					{
						expiresIn: expiresIn,
					}
				);
			},
		},
	}
);
const User = mongoose.model("User", userSchema);

// Add a validate method to the model
userSchema.statics.validate = validateUser;
userSchema.statics.generateUniqueUsername = generateUniqueUsername;

export function validateUser(user: any) {
	const userSchema = Joi.object({
		name: Joi.string().max(70).required(),
		username: Joi.string().max(35).allow(""),
		email: Joi.string().max(255).email().required(),
		password: Joi.string().min(8).max(64).required(),
		birthday: Joi.date(),
		recaptchaToken:Joi.string()
	});
	const passwordOptions = {
		min: 8,
		max: 64,
		lowerCase: 1,
		upperCase: 1,
		numeric: 1,
		symbol: 1,
	};
	let result = userSchema.validate(user);
	if (result.error) {
		throw new HttpError(result.error.details[0].message, "INVALID_FIELDS");
	}
	result = JoiPasswordComplexity(passwordOptions).validate(user.password);
	if (result.error) {
		throw new HttpError(
			"Password must be at least 8 characters long, have at least 1 lowercase, uppercase, number, special symbol",
			"INVALID_FIELDS"
		);
	}
}

export async function generateUniqueUsername() {
	
	let words = generate(2);

	if (Array.isArray(words)) {
		words = words.join("-")
	}
	let username = `${words}-${uuidv4().split("-")[0]}`;

	// Repeat until no duplicates
	while (
		await User.findOne({
			username: username,
		}).exec()
	) {
			let words = generate(2);
			if (Array.isArray(words)) {
				words = words.join("-");
			}
			username = `${words}-${uuidv4().split("-")[0]}`;
	}

	return username;
}

export default User;

export type UserType = InferSchemaType<typeof userSchema>;
