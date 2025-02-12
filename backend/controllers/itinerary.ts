import { NextFunction, Request, Response } from "express";
import { HttpError } from "../middlewares/error";
import itineraryService from "../services/itinerary";
import mongoose from "mongoose";
import fs from "fs";
import Itinerary, { ItineraryType } from "../models/itinerary";

class ItineraryController {
	async getAllItineraries(request: Request, response: Response) {
		const itineraries = await itineraryService.getAllItineraries();
		response.send(itineraries);
	}

	async getItineraryByID(request: Request, response: any) {
		const itineraryID = response.locals._id;
		response.send(await itineraryService.getItineraryByID(itineraryID));
	}

	async createItinerary(request: Request, response: Response) {
		const itinerary: ItineraryType = request.body;
		Itinerary.validate(itinerary);
		if (request.file) {
			itinerary.picture = fs.readFileSync(request.file.path);
		}
		response.send(await itineraryService.createItinerary(itinerary));
	}

	async updateItinerary(request: Request, response: Response) {
		const itineraryID = response.locals._id;
		let itinerary = request.body;
		if (request.file) {
			itinerary.picture = fs.readFileSync(request.file.path);
		}

		itinerary = await itineraryService.updateItinerary(itinerary, itineraryID);
		response.send(itinerary);
	}

	async deleteItineraryByID(request: Request, response: Response) {
		const itineraryID = response.locals._id;
		const deletedItinerary = await itineraryService.deleteItineraryByID(
			itineraryID
		);
		response.status(200).send(deletedItinerary);
	}

	async deleteAllItineraries(request: Request, response: Response) {
		const { deletedCount } = await itineraryService.deleteAllItineraries();
		response.status(200).send({ itinerariesDeleted: deletedCount });
	}

	catchErrors(handler: any) {
		return async (request: Request, response: Response, next: NextFunction) => {
			try {
				await handler(request, response);
			} catch (err: any) {
				// Custom response error
				if (err instanceof HttpError) {
					response.status(400).send(err);
				}
				// Document not found
				else if (err instanceof mongoose.Error.DocumentNotFoundError) {
					response.status(400).send({ message: "User not found" });
					// Validation Error
				} else if (err instanceof mongoose.Error.ValidationError) {
					response.status(400).send({ message: err.message });
					// Internal server errors
				} else {
					next(err);
				}
			}
		};
	}
}

const itineraryController = new ItineraryController();
export default itineraryController;
