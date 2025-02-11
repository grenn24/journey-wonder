import Joi from "joi";
import mongoose from "mongoose";
import JoiPasswordComplexity from "joi-password-complexity";
import jwt from "jsonwebtoken";
import config from "config";

const secretKey: string = config.get("SECRET_KEY");
const userSchema = new mongoose.Schema(
	{
		name: {
			type: String,
			required: [true, "Name is required"],
		},
		email: {
			type: String,
			required: [true, "Email is required"],
			unique: true,
			lowercase: true,
		},
		passwordHash: {
			type: String,
			required: [true, "Password is required"],
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
					{ userID: this._id, name: this.name, role: this.role, type:"accessToken" },
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
		name: Joi.string().required(),
		email: Joi.string().email().required(),
		password: Joi.string().min(8).max(64).required(),
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
		return { message: result.error.details[0].message };
	}
	result = JoiPasswordComplexity(passwordOptions).validate(user.password);
	if (result.error) {
		return {
			message:
				"Password must be at least 8 characters long, have at least 1 lowercase, uppercase, number, special symbol",
		};
	}
}

const User = mongoose.model("users", userSchema);

export default User;
