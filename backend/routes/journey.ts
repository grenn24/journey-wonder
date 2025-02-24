import express from "express";
import auth from "../middlewares/auth";
import journeyController from "../controllers/journey";
import { getID, multer } from "../middlewares/request";

const journey = express.Router();

// Define the route handlers
journey.get(
	"",
	auth("Admin"),
	journeyController.catchErrors(journeyController.getAllJourneys.bind(journeyController))
);
journey.get(
	"/:ID",
	auth("User"),
	getID,
	journeyController.catchErrors(journeyController.getJourneyByID.bind(journeyController))
);
journey.post(
	"",
	multer.single("image"),
	auth("User"),
	journeyController.catchErrors(journeyController.createJourney.bind(journeyController))
);
journey.put(
	"",
	multer.single("image"),
	auth("User"),
	journeyController.catchErrors(
		journeyController.updateJourney.bind(journeyController)
	)
);
journey.delete(
	"/:ID",
	auth("User"),
	getID,
	journeyController.catchErrors(
		journeyController.deleteJourneyByID.bind(journeyController)
	)
);
journey.delete(
	"",
	auth("Admin"),
	journeyController.catchErrors(journeyController.deleteAllJourneys.bind(journeyController))
);
export default journey;
