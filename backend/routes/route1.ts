import express from "express"
const router = express.Router();


// Define the route handlers
router.get("", (request, response)=>{
    response.send("hello world");
})

export default router;
