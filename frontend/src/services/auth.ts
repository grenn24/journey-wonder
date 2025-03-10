import { Dispatch } from "@reduxjs/toolkit";
import createApiClient from "../utilities/apiClient";
import {
	setEmail,
	setFreeTrialUsed,
	setMembershipTier,
	setName,
	setUserID,
} from "../redux/slices/user";
import { useGoogleLogin } from "@react-oauth/google";
import { UserType } from "../../../backend/models/user";

class AuthService {
	apiClient = createApiClient("/auth"); // api client for auth routes

	login(body: Object, dispatch: Dispatch) {
		return new Promise((resolve, reject) => {
			grecaptcha.ready(() => {
				grecaptcha
					.execute(import.meta.env.VITE_RECAPTCHA_SITE_KEY, {
						action: "submit",
					})
					.then((token) => {
						// submit login request to backend server
						this.apiClient
							.post<Object, any>("/log-in", {
								...body,
								recaptchaToken: token,
							})
							.then((res) => {
								const { headers, data } = res;
								dispatch(setUserID(data._id));
								dispatch(setName(data.name));
								dispatch(setEmail(data.email));
								dispatch(
									setMembershipTier(data.membershipTier)
								);
								dispatch(setFreeTrialUsed(data.freeTrialUsed));
								sessionStorage.setItem(
									"X-Access-Token",
									headers["x-access-token"]
								);

								resolve(res);
							})
							.catch((err) => reject(err));
					});
			});
		});
	}

	signUp(body: Object, dispatch: Dispatch) {
		return new Promise((resolve, reject) => {
			grecaptcha.ready(() => {
				grecaptcha
					.execute(import.meta.env.VITE_RECAPTCHA_SITE_KEY, {
						action: "submit",
					})
					.then((token) => {
						// submit login request to backend server
						this.apiClient
							.post<Object, any>("/sign-up", {
								...body,
								recaptchaToken: token,
							})
							.then((res) => {
								const { headers, data } = res;
								dispatch(setUserID(data._id));
								dispatch(setName(data.name));
								dispatch(setEmail(data.email));
								dispatch(
									setMembershipTier(data.membershipTier)
								);
								dispatch(setFreeTrialUsed(data.freeTrialUsed));
								sessionStorage.setItem(
									"X-Access-Token",
									headers["x-access-token"]
								);

								resolve(res);
							})
							.catch((err) => reject(err));
					});
			});
		});
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
			.get("/refresh-access-token", {})
			.then((res) => {
				const { headers } = res;
				sessionStorage.removeItem("X-Access-Token");
				sessionStorage.setItem(
					"X-Access-Token",
					headers["x-access-token"]
				);
				return res;
			})
			.catch((err) => {
				// If refresh token is invalid, redirect to guest page
				if (err.status === 400) {
					window.location.href = "/guest";
				}
				return err;
			});
		return response;
	}

	googleLogin(accessToken: string, dispatch: Dispatch) {
		const response = this.apiClient
			.post<{},any>(
				"/oauth?provider=google",
			{},
				{
					headers: {
						Authorization: "Bearer " + accessToken,
					},
				}
			)
			.then(({headers, data}) => {

				dispatch(setUserID(data._id));
				dispatch(setName(data.name));
				dispatch(setEmail(data.email));
				dispatch(setMembershipTier(data.membershipTier));
				dispatch(setFreeTrialUsed(data.freeTrialUsed));
				sessionStorage.setItem(
					"X-Access-Token",
					headers["x-access-token"]
				);
			});
		return response;
	}
}

const authService = new AuthService();
export default authService;
