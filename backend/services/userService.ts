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

	async deleteUserByID(userID: string) {
		try {
			return await User.deleteOne({_id:userID});
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
