import mongoose from "mongoose";
import Itinerary, { ItineraryType } from "../models/itinerary";
import EventModel, { EventType } from "../models/event";
import StayEvent from "../models/stayEvent";

class ItineraryService {
	async getAllItineraries() {
		const itineraries = await Itinerary.find().exec();
		return itineraries;
	}

	async getItineraryByID(itineraryID: string, fullDetails: boolean = false) {
		try {
			const query = Itinerary.findById(itineraryID);
			console.log(fullDetails);
			if (fullDetails) {
				query
					.populate("events")
					.populate("author", "-passwordHash")
					.populate("travellers", "-passwordHash");
			}

			const itinerary = await query.exec();
			if (!itinerary) {
				throw new mongoose.Error.DocumentNotFoundError(
					"Itinerary not found"
				);
			}
			return itinerary;
		} catch (err) {
			throw err;
		}
	}

	async createItinerary(itinerary: any) {
		try {
			const eventPromises = itinerary.events.map((event: any) => {
				const discriminators = EventModel.discriminators;
				let SubEvent;
				if (discriminators) {
					SubEvent = discriminators[`${event.subcategory} Event`];
					return SubEvent.create(event).then((event) => event._id);
				} else {
					SubEvent = EventModel;
					return SubEvent.create(event).then((event) => event._id);
				}
			});
			itinerary.events = await Promise.all(eventPromises);
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
			).exec();
			if (!updatedItinerary) {
				throw new mongoose.Error.DocumentNotFoundError(
					"User not found"
				);
			}
			return updatedItinerary;
		} catch (err) {
			throw err;
		}
	}

	async deleteItineraryByID(itineraryID: string) {
		try {
			const deletedItinerary = await Itinerary.findById(
				itineraryID
			).exec();
			await Itinerary.deleteOne({ _id: itineraryID });
			if (!deletedItinerary) {
				throw new mongoose.Error.DocumentNotFoundError(
					"Itinerary not found"
				);
			}
			return deletedItinerary;
		} catch (err) {
			throw err;
		}
	}

	async deleteAllItineraries() {
		try {
			return await Itinerary.deleteMany({}).exec();
		} catch (err) {
			throw err;
		}
	}

	// check whether itinerary author id matches the user id
	async validateAuthor(itineraryID: string, userID: string) {
		const itinerary = await Itinerary.findById(itineraryID).exec();
		if (!itinerary) {
			throw new mongoose.Error.DocumentNotFoundError(
				"Itinerary not found"
			);
		}
		if (itinerary.author.toString() !== userID) {
			return false;
		} else {
			return true;
		}
	}
}

const itineraryService = new ItineraryService();
export default itineraryService;
