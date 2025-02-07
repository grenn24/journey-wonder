import mongoose from "mongoose";
import User from "../models/user";
import lodash from "lodash";
import bcrypt from "bcrypt";

class UserService {
	async getAllUsers() {
		const users = await User.find();
		return users;
	}

	async getUserByID(userID: string) {
		try {
			const user = await User.findById(userID);
			if (!user) {
				throw new mongoose.Error.DocumentNotFoundError("User not found");
			}
			return lodash.pick(user, ["_id", "name", "email", "createdAt"]);;
		} catch (err) {
			throw err;
		}
	}

	async createUser(user: any) {
		try {
			const salt = await bcrypt.genSalt(10);
			user.passwordHash = await bcrypt.hash(user.password, salt);
			return lodash.pick(await User.create(user), [
				"_id",
				"name",
				"email",
				"createdAt",
			]);
		} catch (err) {
			throw err;
		}
	}

	async updateUser(user: typeof User, userID: string) {
		try {
			const updatedUser = await User.findByIdAndUpdate(userID, user, {
				new: true,
			});
			if (!updatedUser) {
				throw new mongoose.Error.DocumentNotFoundError("User not found");
			}
			return lodash.pick(updatedUser, ["_id", "name", "email", "createdAt"]);
		} catch (err) {
			throw err;
		}
	}

	async deleteUserByID(userID: string) {
		try {
			const deletedUser = await User.findByIdAndDelete(userID);
			if (!deletedUser) {
				throw new mongoose.Error.DocumentNotFoundError("User not found");
			}
			return lodash.pick(deletedUser, ["_id", "name", "email", "createdAt"]);
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
