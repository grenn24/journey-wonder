import Joi from "joi";
import mongoose,{InferSchemaType} from "mongoose";
import JoiPasswordComplexity from "joi-password-complexity";
import jwt from "jsonwebtoken";
import config from "config";
import { HttpError } from "../middlewares/error";

const secretKey: string = config.get("SECRET_KEY");
const userSchema = new mongoose.Schema(
	{
		name: {
			type: String,
			required: [true, "Name is required"],
			maxLength: 70,
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
			required: [true, "Password is required"],
			minLength:8,
			maxLength:64
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
						role: this.role,
						type: "accessToken",
					},
					secretKey,
					{
						expiresIn: "15m",
					}
				);
			},
		},
	}
);

// Add a validate method to the model
userSchema.statics.validate = validatePost;

export function validatePost(user: any) {
	const userSchema = Joi.object({
		name: Joi.string().max(70).required(),
		email: Joi.string().max(255).email().required(),
		password: Joi.string().min(8).max(64).required(),
		birthday: Joi.date(),
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

const User = mongoose.model("user", userSchema);

export default User;

export type UserType = InferSchemaType<typeof userSchema>;