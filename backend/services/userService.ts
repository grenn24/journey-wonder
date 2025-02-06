import mongoose from "mongoose";
import User from "../models/userModel";

class UserService {
	async getAllUsers() {
		const users = await User.find();
		return users;
	}

	async getUserByID(userID: string) {
		try {
			return await User.findById(userID);
		} catch (err) {
			throw err;
		}
	}

	async createUser(user: typeof User) {
		try {
			return await User.create(user);
		} catch (err) {
			throw err;
		}
	}

	async updateUser(user: typeof User, userID: string) {
		try {
			let existingUser = await this.getUserByID(userID);
            // user not found
			if (!existingUser) {
				throw new mongoose.Error.DocumentNotFoundError("User not found");
			}
			Object.assign(existingUser, user);
			return await existingUser.save();
		} catch (err) {
			throw err;
		}
	}

	async deleteUserByID(userID: string) {
		try {
			return await User.deleteOne({ _id: userID });
		} catch (err) {
			throw err;
		}
	}

	async deleteAllUsers() {
		try {
			return await User.deleteMany({});
		} catch (err) {
			throw err;
		}
	}
}

export default UserService;
