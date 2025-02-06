import { Request, Response } from "express";
import mongoose from "mongoose";

export function getObjectID(request: Request, response: Response) : string {
    const objectID = request.params.ID;
	// Check object id format
	if (!mongoose.Types.ObjectId.isValid(objectID)) {
		response.status(400).json({ message: "Invalid user ID format" });
        return "";
	} else {
        return objectID;
    }
}
