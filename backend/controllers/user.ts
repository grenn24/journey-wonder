import { Request, Response } from "express";
import UserService from "../services/user";
import mongoose from "mongoose";
import { getObjectID } from "../utilities/httpRequest";
import { validateUser } from "../models/user";

const userService = new UserService();

export async function getAllUsers(request: Request, response: Response) {
	const users = await userService.getAllUsers();
	response.send(users);
}

export async function getUserByID(request: Request, response: Response) {
	const userID = getObjectID(request, response);
	if (!userID) {
		return;
	}
	try {
		response.send(await userService.getUserByID(userID));
	} catch (err) {
		if (err instanceof mongoose.Error.DocumentNotFoundError) {
			response.status(400).send({ message: "User not found" });
		} else {
			response.status(500).send(err);
		}
	}
}

export async function createUser(request: Request, response: Response) {
	const user = request.body;
	const error = validateUser(user);
	if (error) {
		return response.status(400).send(error);
	}
	try {
		response.send(await userService.createUser(user));
	} catch (err: any) {
		// Validation Error
		if (err instanceof mongoose.Error.ValidationError) {
			response.status(400).send({ message: err.message });
		// Duplicate Keys in Existing Document
		} else if (err.errorResponse?.code === 11000) {
			response
				.status(400)
				.send({
					message: "Duplicate keys in existing document",
					errorDetail: err,
				});
		} else {
			response.status(500).send(err);
		}
	}
}

// query existing user, update its fields, save
export async function updateUser(request: Request, response: Response) {
	const userID = getObjectID(request, response);
	if (!userID) {
		return;
	}
	let user = request.body;
	try {
		user = await userService.updateUser(user, userID);
		response.send(user);
	} catch (err: any) {
		
		if (err instanceof mongoose.Error.DocumentNotFoundError) {
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
			response.status(500).send(err);
		}
	}
}

export async function deleteUserByID(request: Request, response: Response) {
	const userID = getObjectID(request, response);
	if (!userID) {
		return;
	}
	try {
		const deletedUser = await userService.deleteUserByID(userID);

		response.status(200).send(deletedUser);
	} catch (err) {
		if (err instanceof mongoose.Error.DocumentNotFoundError) {
			response.status(400).send({ message: "User not found" });
		} else {
			response.status(500).send(err);
		}
	}
}

export async function deleteAllUsers(request: Request, response: Response) {
	try {
		const { deletedCount } = await userService.deleteAllUsers();
		response.status(200).send({ usersDeleted: deletedCount });
	} catch (err) {
		response.status(500).send(err);
	}
}
