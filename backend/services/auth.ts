import mongoose from "mongoose";
import User from "../models/user";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import config from "config";
import { HttpError } from "../middlewares/error";

class AuthService {
	async login(email: string, password: string) {
		try {
			const user = await User.findOne({ email }).exec();
			
			if (!user) {
				throw new HttpError("Invalid email or password", "INVALID_EMAIL_PASSWORD");
			}

			const isValid = await bcrypt.compare(password, user.passwordHash);
			if (!isValid) {
				throw new HttpError(
					"Invalid email or password",
					"INVALID_EMAIL_PASSWORD"
				);
			}

			return { accessToken: user.generateAccessToken() };
		} catch (err) {
			throw err;
		}
	}
}

const authService = new AuthService;
export default authService;