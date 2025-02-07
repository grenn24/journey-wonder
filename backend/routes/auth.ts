import express from "express";
import AuthController from "../controllers/auth";

const router = express.Router();
const authController = new AuthController();

// Define the route handlers
router.post("/log-in", (request, response)=>{
    authController.login(request, response);
})

export default router;