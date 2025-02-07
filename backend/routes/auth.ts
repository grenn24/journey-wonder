import express from "express";
import { login } from "../controllers/auth";

const router = express.Router();

// Define the route handlers
router.post("/log-in", (request, response)=>{
    login(request, response);
})

export default router;