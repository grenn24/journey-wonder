import ApiClient from "../utilities/apiClient";
import config from "config";
import User from "../../../backend/models/user"

class UserService {
	apiClient = new ApiClient(import.meta.env.VITE_BACKEND_BASEURL + "/user");
	getUserByID(userID: string) {
		const controller = new AbortController();
		const response = this.apiClient.get<typeof User>(`/${userID}`, {
			signal: controller.signal,
		});
		return { response, abort: () => controller.abort() };
	}
	deleteUserByID(userID: string) {
		const response = this.apiClient.delete(`/${userID}`, {});
		return response;
	}
}

const userService =  new UserService();
export default userService;