import express from "express";
import auth from "../middlewares/auth";
import userController from "../controllers/user";
import { getID, multer } from "../middlewares/request";

const user = express.Router();

// Define the route handlers
user.get("",auth("Admin"), userController.getAllUsers.bind(userController));
user.get(
	"/me",
	auth("User"),
	userController.catchErrors(userController.getCurrentUser.bind(userController))
);
user.get(
	"/:ID",
	auth("User"),
	getID,
	userController.catchErrors(userController.getUserByID.bind(userController))
);
user.post(
	"",
	auth("Admin"),
	multer.single("avatar"),
	userController.catchErrors(userController.createUser.bind(userController))
);
user.put(
	"/:ID",
	auth("User"),
	getID,
	userController.catchErrors(userController.updateUser.bind(userController))
);
user.delete(
	"/:ID",
	auth("User"),
	getID,
	userController.catchErrors(userController.deleteUserByID.bind(userController))
);
user.delete(
	"",auth("Admin"),
	userController.catchErrors(userController.deleteAllUsers.bind(userController))
);

export default user;
