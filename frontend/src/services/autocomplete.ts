import { UserType } from "../../../backend/models/user";
import createApiClient from "../utilities/apiClient";
import authService from "./auth";
import Joi from "joi";

interface Destination {
	name: string;
	key: number;
	type: string;
	value: string;
}
class AutocompleteService {
	apiClient = createApiClient(
		"/autocomplete",
		() => {},
		(status) => {
			// check for http error due to access control or permissions (for e.g. non-author trying to access itinerary)
			if (status === 403) {
				// check for http error due to authorisation (missing or invalid access token)
			} else if (status === 401) {
				// attempt to refresh access tokens
				authService.refreshAccessToken().catch(({ status }) => {
					// refresh token missing or invalid, redirect to guest page
					if (status === 400) {
						window.location.href = "/guest";
					}
				});
			}
		}
	);

	// abort all ongoing autocomplete requests
	controller = new AbortController();
	abort = () => this.controller.abort();

	searchDestinations(query: string) {
		const { signal } = this.controller;
		const response = this.apiClient
			.get<Destination[]>(`/destination?query=${query}`, { signal })
			.then(({ data }) => data)
			.catch(() => {});
		return response;
	}
}

const autocompleteService = new AutocompleteService();
export default autocompleteService;
