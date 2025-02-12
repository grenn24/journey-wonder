import express from "express";
import authController from "../controllers/auth";

const auth = express.Router();

// Define the route handlers
auth.post("/log-in", authController.login.bind(authController));

export default auth;