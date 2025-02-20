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
			// check for error due to insufficient permissions (itinerary traveller permissions)
			if (status === 403) {
				// attempt to refresh access tokens
				authService.refreshAccessToken().catch(({ status }) => {
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

