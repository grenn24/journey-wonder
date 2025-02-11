import { NextFunction, Request, Response } from "express";
import UserService from "../services/user";
import mongoose from "mongoose";
import User from "../models/user";
import { HttpError } from "../middlewares/error";

class UserController {
	userService = new UserService();

	async getAllUsers(request: Request, response: Response) {
		const users = await this.userService.getAllUsers();
		response.send(users);
	}

	async getUserByID(request: Request, response: Response) {
		const userID = response.locals._id;
		response.send(await this.userService.getUserByID(userID));
	}

	async getCurrentUser(request: Request, response: Response) {
		const userID = response.locals.currentUser.userID;
		response.send(await this.userService.getUserByID(userID));
	}

	async createUser(request: any, response: Response) {
		const user = request.body;
		const error = User.validate(user);

		if (error) {
			response.status(400).send(error);
			return;
		}
		user.avatar = request.file;
		response.send(await this.userService.createUser(user));
	}

	// query existing user, update its fields, save
	async updateUser(request: Request, response: Response) {
		const userID = response.locals._id;
		let user = request.body;
		user = await this.userService.updateUser(user, userID);
		response.send(user);
	}

	async deleteUserByID(request: Request, response: Response) {
		const userID = response.locals._id;
		const deletedUser = await this.userService.deleteUserByID(userID);
		response.status(200).send(deletedUser);
	}

	async deleteAllUsers(request: Request, response: Response) {
		const { deletedCount } = await this.userService.deleteAllUsers();
		response.status(200).send({ usersDeleted: deletedCount });
	}

	catchErrors(handler: any) {
		return async (request: Request, response: Response, next: NextFunction) => {
			try {
				await handler(request, response);
			} catch (err: any) {
				if (err instanceof HttpError) {
					response.status(400).send(err);
				}
				else if (err instanceof mongoose.Error.DocumentNotFoundError) {
					response.status(400).send({ message: "User not found" });
					// Validation Error
				} else if (err instanceof mongoose.Error.ValidationError) {
					response.status(400).send({ message: err.message });
					// Duplicate Keys in Existing Document
				} else if (err.errorResponse?.code === 11000) {
					response.status(400).send({
						message: "Duplicate keys in existing document",
						errorDetail: err,
					});
				} else {
					next(err);
				}
			}
		};
	}
}

export default UserController;
