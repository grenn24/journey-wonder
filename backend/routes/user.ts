import express from "express";
import auth from "../middlewares/auth";
import UserController from "../controllers/user";

const router = express.Router();
const userController = new UserController();

// Define the route handlers
router.get("", (request, response) => {
	userController.getAllUsers(request, response);
});
router.get("/me", auth("User"), (request, response) => {
	userController.getCurrentUser(request, response);
});
router.get("/:ID", auth("User"), (request, response) => {
	userController.getUserByID(request, response);
});
router.post("", (request, response) => {
	userController.createUser(request, response);
});
router.put("/:ID", auth("User"), (request, response) => {
	userController.updateUser(request, response);
});
router.delete("/:ID", auth("User"), (request, response) => {
	userController.deleteUserByID(request, response);
});
router.delete("", (request, response) => {
	userController.deleteAllUsers(request, response);
});

export default router;
