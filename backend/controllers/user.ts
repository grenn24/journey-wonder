import { NextFunction, Request, Response } from "express";
import userService from "../services/user";
import mongoose from "mongoose";
import User from "../models/user";
import { HttpError } from "../middlewares/error";
import fs from "fs";

class UserController {
	async getAllUsers(request: Request, response: Response) {
		const users = await userService.getAllUsers();
		response.send(users);
	}

	async getUserByID(request: Request, response: Response) {
		const userID = response.locals._id;
		response.send(await userService.getUserByID(userID));
	}

	async getCurrentUser(request: Request, response: Response) {
		const userID = response.locals.currentUser.userID;
		response.send(await userService.getUserByID(userID));
	}

	async createUser(request: any, response: Response) {
		const user = request.body;
		User.validate(user);
		if (request.file) {
			user.avatar = fs.readFileSync(request.file.path);
		}
		response.send(await userService.createUser(user));
	}

	// query existing user, update its fields, save
	async updateUser(request: Request, response: Response) {
		const userID = response.locals._id;
		let user = request.body;
		user = await userService.updateUser(user, userID);
		response.send(user);
	}

	async deleteUserByID(request: Request, response: Response) {
		const userID = response.locals._id;
		const deletedUser = await userService.deleteUserByID(userID);
		response.status(200).send(deletedUser);
	}

	async deleteAllUsers(request: Request, response: Response) {
		const { deletedCount } = await userService.deleteAllUsers();
		response.status(200).send({ usersDeleted: deletedCount });
	}

	catchErrors(handler: any) {
		return async (request: Request, response: Response, next: NextFunction) => {
			try {
				await handler(request, response);
			} catch (err: any) {
				// Custom response error
				if (err instanceof HttpError) {
					response.status(400).send(err);
				}
				// Document not found
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
					// Internal Server Errors
				} else {
					next(err);
				}
			}
		};
	}
}

const userController = new UserController();
export default userController;
