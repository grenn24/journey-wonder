import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse } from "axios";
import authService from "../services/auth";


/*
interface Response<T> {
	response: AxiosResponse<T>;
	abort: () => void;
}

401 Unauthorised: Missing access tokens
403 Forbidden: Insufficient permissions
*/

class ApiClient {
	private client: AxiosInstance;

	constructor(
		baseURL: string,
		requestConfigInterceptor?: (config: AxiosRequestConfig<any>) => void,
		responseErrorInterceptor?: (status: number, body: Object) => void
	) {
		const client = axios.create({
			baseURL,
			headers: {
				"Content-Type": "application/json", // dont include x-access-token as default headers (since it will change frequently)
				Accept: "application/json",
			},
		});
		client.interceptors.request.use(
			(config) => {
				// Do something before request is sent
				requestConfigInterceptor && requestConfigInterceptor(config);
				return config;
			},
			(err) => {
				// An error occurred while setting up the request
				console.error(
					"An error occurred while setting up the request:" +
						err.message
				);
				return Promise.reject(err);
			}
		);
		client.interceptors.response.use(
			// http status code within 2xx
			(response) => ({ body: response.data, ...response }),
			// http status code outside 2xx
			(err) => {
				// Error response received
				if (err.response) {
					console.log(err);
					responseErrorInterceptor &&
						responseErrorInterceptor(
							err.response.status,
							err.response.data
						);
					return Promise.reject<{
						body: string;
						status: number;
					}>({
						body: err.response.data,
						status: err.response.status,
					});
				} else if (err.request) {
					// Request was made but no response was received
					console.error("No response from server:" + err.request);
				} else {
					// An error occurred while handling the response
					console.error(
						"An error occurred while handling the response:" +
							err.message
					);
				}
			}
		);
		this.client = client;
	}

	// GET request
	public async get<T>(
		url: string,
		config?: AxiosRequestConfig
	): Promise<AxiosResponse<T>> {
		try {
			const response = await this.client.get<T>(url, {
				withCredentials: true,
				...config,
				headers: {
					...config?.headers,
					"X-Access-Token": sessionStorage.getItem("X-Access-Token"),
				},
			});
			return response;
		} catch (err: any) {
			// Missing or invalid access token
			if (err.status === 401) {
				try {
					await authService.refreshAccessToken();
					const response = await this.client.get<T>(url, {
						withCredentials: true,
						...config,
						headers: {
							...config?.headers,
							"X-Access-Token":
								sessionStorage.getItem("X-Access-Token"),
						},
					});

					return response;
				} catch (err: any) {
					// Missing or invalid refresh token
					if (err.status === 400) {
						window.location.href = "/guest";
					}
				}
			}
			return Promise.reject(err);
		}
	}

	// POST request
	public async post<T, R>(
		url: string,
		data: T,
		config?: AxiosRequestConfig
	): Promise<AxiosResponse<R>> {
		try {
			const response = await this.client.post<T, AxiosResponse<R>>(
				url,
				data,
				{
					withCredentials: true,
					...config,
					headers: {
						...config?.headers,
						"X-Access-Token":
							sessionStorage.getItem("X-Access-Token"),
					},
				}
			);
			return response;
		} catch (err: any) {
			// Missing or invalid access token
			if (err.status === 401) {
				try {
					await authService.refreshAccessToken();
					const response = this.client.post<T, AxiosResponse<R>>(
						url,
						data,
						{
							withCredentials: true,
							...config,
							headers: {
								...config?.headers,
								"X-Access-Token":
									sessionStorage.getItem("X-Access-Token"),
							},
						}
					);
					return response;
				} catch (err: any) {
					// Missing or invalid refresh token
					if (err.status === 400) {
						window.location.href = "/guest";
					}
				}
			}
			throw err;
		}
	}

	// PUT request
	public async put<T, R>(
		url: string,
		data: T,
		config?: AxiosRequestConfig
	): Promise<AxiosResponse<R>> {
		try {
			const response = await this.client.put<T, AxiosResponse<R>>(
				url,
				data,
				{
					withCredentials: true,
					...config,
					headers: {
						...config?.headers,
						"X-Access-Token":
							sessionStorage.getItem("X-Access-Token"),
					},
				}
			);
			return response;
		} catch (err: any) {
			// Missing or invalid access token
			if (err.status === 401) {
				try {
					await authService.refreshAccessToken();
					const response = await this.client.put<T, AxiosResponse<R>>(
						url,
						data,
						{
							withCredentials: true,
							...config,
							headers: {
								...config?.headers,
								"X-Access-Token":
									sessionStorage.getItem("X-Access-Token"),
							},
						}
					);
					return response;
				} catch (err: any) {
					// Missing or invalid refresh token
					if (err.status === 400) {
						window.location.href = "/guest";
					}
				}
			}
			return Promise.reject(err);
		}
	}

	// DELETE request
	public async delete<T>(
		url: string,
		config?: AxiosRequestConfig
	): Promise<AxiosResponse<T>> {
		try {
			const response = await this.client.delete<T>(url, {
				withCredentials: true,
				...config,
				headers: {
					...config?.headers,
					"X-Access-Token": sessionStorage.getItem("X-Access-Token"),
				},
			});
			return response;
		} catch (err: any) {
			// Missing or invalid access token
			if (err.status === 401) {
				try {
					await authService.refreshAccessToken();
					const response = await this.client.delete<T>(url, {
						withCredentials: true,
						...config,
						headers: {
							...config?.headers,
							"X-Access-Token":
								sessionStorage.getItem("X-Access-Token"),
						},
					});
					return response;
				} catch (err: any) {
					// Missing or invalid refresh token
					if (err.status === 400) {
						window.location.href = "/guest";
					}
				}
			}
			return Promise.reject(err);
		}
	}

	// PATCH request
	public patch<T, R>(
		url: string,
		data: T,
		config?: AxiosRequestConfig
	): Promise<AxiosResponse<R>> {
		return this.client.patch<T, AxiosResponse<R>>(url, data, {
			withCredentials: true,
			...config,
			headers: {
				...config?.headers,
				"X-Access-Token": sessionStorage.getItem("X-Access-Token"),
			},
		});
	}
}

const createApiClient = (
	parentPath: string,
	requestConfigInterceptor: (
		config: AxiosRequestConfig<any>
	) => void = () => {},
	responseErrorInterceptor: (status: number, body: Object) => void = () => {}
) =>
	new ApiClient(
		import.meta.env.VITE_BACKEND_BASEURL + parentPath,
		requestConfigInterceptor,
		responseErrorInterceptor
	);
export default createApiClient;
