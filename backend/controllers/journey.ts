import { NextFunction, Request, Response } from "express";
import { HttpError } from "../middlewares/error";
import journeyService from "../services/journey";
import mongoose from "mongoose";
import fs from "fs";
import Journey, { JourneyType } from "../models/journey";

class JourneyController {
	async getAllJourneys(request: Request, response: Response) {
		const itineraries = await journeyService.getAllJourneys();
		response.status(200).send(itineraries);
	}

	async getJourneyByID(request: Request, response: any) {
		const user = response.locals.user;
		const itineraryID = response.locals._id;
		const fullDetails = request.query["full-details"] === "true";
		if (
			user.role !== "Admin" &&
			!await journeyService.validateTraveller(itineraryID, user.email)
		) {
			return response.status(403).send({ message: "Access denied" });
		}
		const itinerary = await journeyService.getJourneyByID(
			itineraryID,
			fullDetails
		);
		return response.status(200).send(itinerary);
	}

	async createJourney(request: Request, response: Response) {
		const journey = request.body;

		Journey.validate(journey);
		if (request.file) {
			journey.image = fs.readFileSync(request.file.path);
		}
		response.status(200).send(await journeyService.createJourney(journey));
	}

	async updateJourney(request: Request, response: Response) {
		const user = response.locals.user;
		const journeyID = response.locals._id;
		let journey = request.body;
		if (request.file) {
			journey.picture = fs.readFileSync(request.file.path);
		}
		// Verify that user created the journey
		if (!journeyService.validateAuthor(journeyID, user.userID)) {
			return response.status(403).send({ message: "Access denied" });
		}
		journey = await journeyService.updateJourney(journey, journeyID);
		response.status(200).send(journey);
	}

	async deleteJourneyByID(request: Request, response: Response) {
		const user = response.locals.user;
		const journeyID = response.locals._id;
		if (
			user.role !== "Admin" &&
			!journeyService.validateAuthor(journeyID, user.userID)
		) {
			return response.status(403).send({ message: "Access denied" });
		}
		const deletedJourney = await journeyService.deleteJourneyByID(
			journeyID
		);
		response.status(200).send(deletedJourney);
	}

	async deleteAllJourneys(request: Request, response: Response) {
		const { deletedCount } = await journeyService.deleteAllJourneys();
		response.status(200).send({ journeysDeleted: deletedCount });
	}

	catchErrors(handler: any) {
		return async (
			request: Request,
			response: Response,
			next: NextFunction
		) => {
			try {
				await handler(request, response);
			} catch (err: any) {
				// Custom response error
				if (err instanceof HttpError) {
					response.status(404).send(err);
				}
				// Document not found
				else if (err instanceof mongoose.Error.DocumentNotFoundError) {
					response.status(404).send({ message: "Journey not found" });
					return;

					// Validation Error
				} else if (err instanceof mongoose.Error.ValidationError) {
					response.status(400).send({ message: err.message });
					return;
					// Internal server errors
				} else {
					next(err);
				}
			}
		};
	}
}

const journeyController = new JourneyController();
export default journeyController;
