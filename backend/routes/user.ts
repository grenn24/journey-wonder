import express from "express"
import { getAllUsers, getUserByID,createUser, updateUser, deleteAllUsers, deleteUserByID } from "../controllers/user";
const router = express.Router();


// Define the route handlers
router.get("", (request, response)=>{
    getAllUsers(request, response);
})
router.get("/:ID", (request, response) => {
	getUserByID(request, response);
});
router.post("", (request, response) => {
	createUser(request, response);
});
router.put("/:ID", (request, response) => {
	updateUser(request, response);
});
router.delete("/:ID", (request, response) => {
	deleteUserByID(request, response);
});
router.delete("", (request, response) => {
	deleteAllUsers(request, response);
});

export default router;
