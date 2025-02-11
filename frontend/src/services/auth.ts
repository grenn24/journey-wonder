import ApiClient from "../utilities/apiClient";
import config from "config";

class AuthService {
	apiClient = new ApiClient(import.meta.env.VITE_BACKEND_BASEURL + "/auth");
	login(body:any) {
		const response = this.apiClient.post("log-in", body);
		return response;
	}
}

const authService = new AuthService();
export default authService;
