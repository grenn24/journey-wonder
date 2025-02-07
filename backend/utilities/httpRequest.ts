import { Request, Response } from "express";
import mongoose from "mongoose";

export function getObjectID(request: Request, response: Response)  {
    const objectID = request.params.ID;
	// Check object id format
	if (!mongoose.Types.ObjectId.isValid(objectID)) {
		response.status(400).send({ message: "Invalid user ID format" });
        response.end();
	} else {
        return objectID;
    }
}
