import { NextFunction, Request, Response } from "express";
import userService from "../services/user";
import mongoose from "mongoose";
import User from "../models/user";
import { HttpError } from "../middlewares/error";
import fs from "fs";

class UserController {
	async getAllUsers(request: Request, response: Response) {
		const users = await userService.getAllUsers();
		response.status(200).send(users);
	}

	async getUserByID(request: Request, response: Response) {
		const userID = response.locals._id;
		response.status(200).send(await userService.getUserByID(userID));
	}

	async getCurrentUser(request: Request, response: Response) {
		const userID = response.locals.currentUser.userID;
		response.status(200).send(await userService.getUserByID(userID));
	}

	async createUser(request: any, response: Response) {
		const user = request.body;
		User.validate(user);
		if (request.file) {
			user.avatar = fs.readFileSync(request.file.path);
		}
		response.status(200).send(await userService.createUser(user));
	}

	// query existing user, update its fields, save
	async updateUser(request: Request, response: Response) {
		const userID = response.locals._id;
		let user = request.body;
		user = await userService.updateUser(user, userID);
		response.status(200).send(user);
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
		return async (
			request: Request,
			response: Response,
			next: NextFunction
		) => {
			try {
				await handler(request, response);
			} catch (err: any) {
				if (err instanceof HttpError) {
					// Custom response error
					response.status(400).send(err);
					return;
				} else if (
					err instanceof mongoose.Error.DocumentNotFoundError
				) {
					// Document not found
					response.status(400).send({ message: "User not found" });
					return;
				} else if (err instanceof mongoose.Error.ValidationError) {
					// Validation Error
					response.status(400).send({ message: err.message });
					return;
				} else if (err.errorResponse?.code === 11000) {
					// Duplicate Keys in Existing Document
					response.status(400).send({
						message: "Duplicate keys in existing document",
						errorDetail: err,
					});
					return;
				} else {
					// Internal Server Errors
					next(err);
				}
			}
		};
	}
}

const userController = new UserController();
export default userController;
