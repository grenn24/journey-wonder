import express from "express";
import auth from "../middlewares/auth";
import itineraryController from "../controllers/itinerary";
import { getID, multer } from "../middlewares/request";

const itinerary = express.Router();

// Define the route handlers
itinerary.get(
	"",
	auth("Admin"),
	itineraryController.catchErrors(itineraryController.getAllItineraries.bind(itineraryController))
);
itinerary.get(
	"/:ID",
	auth("User"),
	getID,
	itineraryController.catchErrors(itineraryController.getItineraryByID.bind(itineraryController))
);
itinerary.post(
	"",
	multer.single("picture"),
	auth("User"),
	itineraryController.catchErrors(itineraryController.createItinerary.bind(itineraryController))
);
itinerary.put(
	"",
	multer.single("picture"),
	auth("User"),
	itineraryController.catchErrors(
		itineraryController.updateItinerary.bind(itineraryController)
	)
);
itinerary.delete(
	"/:ID",
	auth("User"),
	getID,
	itineraryController.catchErrors(
		itineraryController.deleteItineraryByID.bind(itineraryController)
	)
);
itinerary.delete(
	"",
	auth("Admin"),
	itineraryController.catchErrors(itineraryController.deleteAllItineraries.bind(itineraryController))
);
export default itinerary;
