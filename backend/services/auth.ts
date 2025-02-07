import mongoose from "mongoose";
import User from "../models/user";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import config from "config";

class AuthService {
	async login(email: string, password: string) {
		const user = await User.findOne({ email });
		
		if (!user) {
			throw new mongoose.Error("Invalid email or password");
		}

		const isValid = await bcrypt.compare(password, user.passwordHash);
		if (!isValid) {
			throw new mongoose.Error("Invalid email or password");
		}
		
		return {accessToken: user.generateAccessToken()};
	}
}

export default AuthService;
