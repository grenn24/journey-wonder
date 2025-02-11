import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse } from "axios";

interface Response<T> extends AxiosResponse<T> {
	body: any
}

class ApiClient {
	private client: AxiosInstance;

	constructor(baseURL: string) {
		const client = axios.create({
			baseURL,
			headers: {
				"Content-Type": "application/json",
			},
		});
		client.interceptors.response.use(
			// status code within 2xx
			(response) => ({body:response.data, ...response}),
			// status code outside 2xx
			(err) => {
				// response received
				if (err.response) {
					console.log(err);
					return Promise.reject({body:err.response.data, status:err.response.status});		
				} else if (err.request) {
				// Request was made but no response was received
					console.error("No response from server:" + err.request);
				} else {
				// An error occurred while setting up the request
					console.error(
						"Error while setting up request or handling the response:" +
							err.message
					);
				}
			}
		);
		this.client = client;
	}

	// GET request
	public get<T>(
		url: string,
		config?: AxiosRequestConfig
	): Promise<AxiosResponse<T>> {
		return this.client.get<T>(url, { withCredentials: true, ...config });
	}

	// POST request
	public post<T, R>(
		url: string,
		data: T,
		config?: AxiosRequestConfig
	): Promise<AxiosResponse<R>> {
		return this.client.post<T, AxiosResponse<R>>(url, data, {
			withCredentials: true,
			...config,
		});
	}

	// PUT request
	public put<T, R>(
		url: string,
		data: T,
		config?: AxiosRequestConfig
	): Promise<AxiosResponse<R>> {
		return this.client.put<T, AxiosResponse<R>>(url, data, {
			withCredentials: true,
			...config,
		});
	}

	// DELETE request
	public delete<T>(
		url: string,
		config?: AxiosRequestConfig
	): Promise<AxiosResponse<T>> {
		return this.client.delete<T>(url, { withCredentials: true, ...config });
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
		});
	}
}

export default ApiClient;
