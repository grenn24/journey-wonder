import { Request, Response } from "express";
import UserService from "../services/userService";
import mongoose from "mongoose";
import { getObjectID } from "../utilities/requestUtilities";

const userService = new UserService();

export async function getAllUsers(request: Request, response: Response) {
	const users = await userService.getAllUsers();
	response.send(users);
}

export async function getUserByID(request: Request, response: Response) {
	const userID = getObjectID(request, response);
	try {
		const user = await userService.getUserByID(userID);
		if (!user) {
			return response.status(404).json({ message: "User not found" });
		}
		response.send(user);
	} catch (err) {
		response.status(500).send(err);
	}
}

export async function createUser(request: Request, response: Response) {
	const user = request.body;
	try {
		const userCreated = await userService.createUser(user);
		response.send(userCreated);
	} catch (err: any) {
		// Duplicate keys error
		if (err instanceof mongoose.Error.ValidationError) {
			response
				.status(400)
				.send({ message: "Missing required fields", errorDetail: err });
		} else if (err.errorResponse.code === 11000) {
			response
				.status(400)
				.send({ message: "Duplicate keys", errorDetail: err });
		} else {
			response.status(500).send(err);
		}
	}
}

// query existing user, update its fields, save
export async function updateUser(request: Request, response: Response) {
	const userID = getObjectID(request, response);
	try {
		const existingUser = await userService.getUserByID(userID);
		if (!existingUser) {
			return response.status(404).json({ message: "User not found" });
		}
        
	} catch (err) {
		response.status(500).send(err);
	}
	
}

export async function deleteUserByID(request: Request, response: Response) {
	const userID = request.params.userID;
	// Check user id format
	if (!mongoose.Types.ObjectId.isValid(userID)) {
		return response.status(400).json({ message: "Invalid user ID format" });
	}
	const user = request.body;
	try {
		const { deletedCount } = await userService.deleteUserByID(userID);
		if (deletedCount === 0) {
			response.status(404).json({ message: "User not found" });
		}
		response.status(200).send({ usersDeleted: deletedCount });
	} catch (err) {
		response.status(500).send(err);
	}
}

export async function deleteAllUsers(request: Request, response: Response) {
	const user = request.body;
	try {
		const { deletedCount } = await userService.deleteAllUsers();
		response.status(200).send({ usersDeleted: deletedCount });
	} catch (err) {
		response.status(500).send(err);
	}
}
