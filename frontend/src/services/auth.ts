import { Dispatch } from "@reduxjs/toolkit";
import createApiClient from "../utilities/apiClient";
import { setEmail, setMembershipTier, setName, setUserID } from "../redux/slices/user";


class AuthService {
	apiClient = createApiClient("/auth"); // api client for auth routes

	login(body: Object, dispatch:Dispatch) {
		const response = this.apiClient
			.post<Object, any>("/log-in", body)
			.then((res) => {
				const { headers, data } = res;
				dispatch(setUserID(data._id));
				dispatch(setName(data.name));
				dispatch(setEmail(data.email));
				dispatch(setMembershipTier(data.membershipTier));
				sessionStorage.setItem(
					"X-Access-Token",
					headers["x-access-token"]
				);
			
				return res;
			});
		return response;
	}

	logout() {
		const response = this.apiClient.get("/log-out").then((res) => {
			sessionStorage.removeItem("X-Access-Token");
			return res;
		});
		return response;
	}

	refreshAccessToken() {
		const response = this.apiClient
			.get("/refresh-access-token")
			.then((res) => {
				const { headers } = res;
				sessionStorage.setItem(
					"X-Access-Token",
					headers["x-access-token"]
				);
				return res;
			});
		return response;
	}
}

const authService = new AuthService();
export default authService;
