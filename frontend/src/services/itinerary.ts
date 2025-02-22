import ApiClient from "../utilities/apiClient";
import config from "config";
import { ItineraryType } from "../../../backend/models/itinerary";
import createApiClient from "../utilities/apiClient";
import authService from "./auth";

class ItineraryService {
	apiClient = createApiClient(
		"/itinerary",
		() => {},
		(status) => {
			// check for http error due to access control or permissions (for e.g. non-author trying to access itinerary)
			if (status === 403) {
				
			}
		}
	);

	createItinerary(itinerary: ItineraryType) {
		const response = this.apiClient.post<ItineraryType, ItineraryType>(
			"",
			itinerary
		);
		return response;
	}
}

const itineraryService = new ItineraryService();
export default itineraryService;
