import express from "express";
import AuthController from "../controllers/auth";

const router = express.Router();
const authController = new AuthController();

// Define the route handlers
router.post("/log-in", authController.login.bind(authController));

export default router;