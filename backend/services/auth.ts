import mongoose from "mongoose";
import User from "../models/user";
import bcrypt from "bcrypt";

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
		return true;
	}
}

export default AuthService;
