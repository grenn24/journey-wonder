import express from "express";
import authController from "../controllers/auth";

const auth = express.Router();

// Define the route handlers
auth.post("/log-in", authController.catchErrors(authController.login.bind(authController)));

auth.get(
	"/log-out",
	authController.catchErrors(authController.logout.bind(authController))
);

auth.get("/refresh-access-token", authController.catchErrors(authController.refreshAccessToken.bind(authController)));

export default auth;