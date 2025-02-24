import mongoose, { Mongoose } from "mongoose";
import Journey, { JourneyType } from "../models/journey";
import EventModel, { EventType } from "../models/event";
import { arrayContains } from "../utilities/array";

class JourneyService {
	async getAllJourneys() {
		const journeys = await Journey.find().exec();
		return journeys;
	}

	async getJourneyByID(journeyID: string, fullDetails: boolean = false) {
		try {
			const query = Journey.findById(journeyID);
			if (fullDetails) {
				query
					.populate("events")
					.populate("author", "-passwordHash")
					.populate("travellers", "-passwordHash");
			}
			const journey = await query.exec();

			if (!journey) {
				throw new mongoose.Error.DocumentNotFoundError(
					"Journey not found"
				);
			}
			return journey;
		} catch (err) {
			throw err;
		}
	}

	async createJourney(journey: any) {
		try {
			if (journey.event) {
				const eventPromises = journey.events.map((event: any) => {
					const discriminators = EventModel.discriminators;
					let SubEvent;
					if (discriminators) {
						SubEvent = discriminators[`${event.subcategory} Event`];
						return SubEvent.create(event).then(
							(event) => event._id
						);
					} else {
						SubEvent = EventModel;
						return SubEvent.create(event).then(
							(event) => event._id
						);
					}
				});
				journey.events = await Promise.all(eventPromises);
			}
			return await Journey.create(journey);
		} catch (err) {
			throw err;
		}
	}

	async updateJourney(journey: JourneyType, journeyID: string) {
		try {
			const updatedJourney = await Journey.findByIdAndUpdate(
				journeyID,
				journey,
				{
					new: true,
				}
			).exec();
			if (!updatedJourney) {
				throw new mongoose.Error.DocumentNotFoundError(
					"User not found"
				);
			}
			return updatedJourney;
		} catch (err) {
			throw err;
		}
	}

	async deleteJourneyByID(itineraryID: string) {
		try {
			const deletedJourney = await Journey.findById(itineraryID).exec();
			await Journey.deleteOne({ _id: itineraryID });
			if (!deletedJourney) {
				throw new mongoose.Error.DocumentNotFoundError(
					"Journey not found"
				);
			}
			return deletedJourney;
		} catch (err) {
			throw err;
		}
	}

	async deleteAllJourneys() {
		try {
			return await Journey.deleteMany({}).exec();
		} catch (err) {
			throw err;
		}
	}

	// check whether journey author id matches the user id
	async validateAuthor(journeyID: string, userID: string) {
		const journey = await Journey.findById(journeyID).exec();
		if (!journey) {
			throw new mongoose.Error.DocumentNotFoundError("Journey not found");
		} else if (journey.author.toString() !== userID) {
			return false;
		} else {
			return true;
		}
	}

	// check whether the user is included in travellers list 
	async validateTraveller(journeyID: string, userEmail: string) {
		const journey = await Journey.findById(journeyID).exec();
		if (!journey) {
			throw new mongoose.Error.DocumentNotFoundError("Journey not found");
		} else if (arrayContains(journey.travellers, userEmail, (x,y)=>x.email === y)) {
			return true
		} else {
			return false;
		}
	}
}

const journeyService = new JourneyService();
export default journeyService;
