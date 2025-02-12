import mongoose from "mongoose";
import Itinerary, { ItineraryType } from "../models/itinerary";
import Event, { EventType } from "../models/event";

class ItineraryService {
	async getAllItineraries() {
		const itineraries = await Itinerary.find();
		return itineraries;
	}

	async getItineraryByID(itineraryID: string) {
		try {
			const itinerary = await Itinerary.findById(itineraryID);
			if (!itinerary) {
				throw new mongoose.Error.DocumentNotFoundError("Itinerary not found");
			}
			return itinerary;
		} catch (err) {
			throw err;
		}
	}

	async createItinerary(itinerary: any) {
		try {
			
			for (let i = 0 ; i < itinerary.events.length; i++) {
				const event = await Event.create(itinerary.events[i]);
				itinerary.events[i] = event._id;
			}

			return await Itinerary.create(itinerary);
		} catch (err) {
			throw err;
		}
	}

	async updateItinerary(itinerary: ItineraryType, itineraryID: string) {
		try {
			const updatedItinerary = await Itinerary.findByIdAndUpdate(
				itineraryID,
				itinerary,
				{
					new: true,
				}
			);
			if (!updatedItinerary) {
				throw new mongoose.Error.DocumentNotFoundError("User not found");
			}
			return updatedItinerary;
		} catch (err) {
			throw err;
		}
	}

	async deleteItineraryByID(itineraryID: string) {
		try {
			const deletedItinerary = await Itinerary.findByIdAndDelete(itineraryID);
			if (!deletedItinerary) {
				throw new mongoose.Error.DocumentNotFoundError("Itinerary not found");
			}
			return deletedItinerary;
		} catch (err) {
			throw err;
		}
	}

	async deleteAllItineraries() {
		try {
			return await Itinerary.deleteMany({});
		} catch (err) {
			throw err;
		}
	}
}

const itineraryService = new ItineraryService();
export default itineraryService;
