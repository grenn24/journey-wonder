import express from "express";
import auth from "../middlewares/auth";
import UserController from "../controllers/user";
import { getID, multer } from "../middlewares/request";

const router = express.Router();
const userController = new UserController();

// Define the route handlers
router.get("",auth("Admin"), userController.getAllUsers.bind(userController));
router.get(
	"/me",
	auth("User"),
	userController.catchErrors(userController.getCurrentUser.bind(userController))
);
router.get(
	"/:ID",
	auth("User"),
	getID,
	userController.catchErrors(userController.getUserByID.bind(userController))
);
router.post("", multer.single("avatar"),userController.catchErrors(userController.createUser.bind(userController)));
router.put(
	"/:ID",
	auth("User"),
	getID,
	userController.catchErrors(userController.updateUser.bind(userController))
);
router.delete(
	"/:ID",
	auth("User"),
	getID,
	userController.catchErrors(userController.deleteUserByID.bind(userController))
);
router.delete(
	"",auth("Admin"),
	userController.catchErrors(userController.deleteAllUsers.bind(userController))
);

export default router;
