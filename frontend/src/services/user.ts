import ApiClient from "../utilities/apiClient";
import config from "config";
import { UserType } from "../../../backend/models/user";
import createApiClient from "../utilities/apiClient";
import authService from "./auth";
import Joi from "Joi";

const emailSchema = Joi.object({
	email: Joi.string().email({ tlds: { allow: false } }).required(),
});


class UserService {
	apiClient = createApiClient(
		"/user",
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

	getUserByID(userID: string) {
		const response = this.apiClient.get<UserType>(`/${userID}`);
		return response;
	}
	deleteUserByID(userID: string) {
		const response = this.apiClient.delete<UserType>(`/${userID}`, {});
		return response;
	}

	validateEmail(email: string) {
		const { error } = emailSchema.validate({email});
		return error;
	}
}

const userService = new UserService();
export default userService;

