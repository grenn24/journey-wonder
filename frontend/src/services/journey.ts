import { JourneyType } from "../../../backend/models/journey";
import createApiClient from "../utilities/apiClient";

class JourneyService {
	apiClient = createApiClient(
		"/journey",
		() => {},
		(status) => {
			// check for http error due to access control or permissions (for e.g. non-author trying to access itinerary)
			if (status === 403) {
			}
		}
	);

	createJourney(journey: any) {
		const response = this.apiClient.post<JourneyType, JourneyType>(
			"",
			journey,
			{ headers: { "Content-Type": "multipart/form-data" } }
		);
		return response;
	}

	getJourneyByID(journeyID : string) {
		const response = this.apiClient.get<JourneyType>(
			`/${journeyID}`
		);
		return response;
	}
}

const journeyService = new JourneyService();
export default journeyService;
