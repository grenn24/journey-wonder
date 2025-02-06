import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse } from "axios";

class ApiClient {
	private client: AxiosInstance;

	constructor(baseURL: string) {
		this.client = axios.create({
			baseURL,
			headers: {
				"Content-Type": "application/json",
			},
		});
	}

	// GET request
	public get<T>(
		url: string,
		config?: AxiosRequestConfig
	): Promise<AxiosResponse<T>> {
		return this.client.get<T>(url, config);
	}

	// POST request
	public post<T, R>(
		url: string,
		data: T,
		config?: AxiosRequestConfig
	): Promise<AxiosResponse<R>> {
		return this.client.post<T, AxiosResponse<R>>(url, data, config);
	}

	// PUT request
	public put<T, R>(
		url: string,
		data: T,
		config?: AxiosRequestConfig
	): Promise<AxiosResponse<R>> {
		return this.client.put<T, AxiosResponse<R>>(url, data, config);
	}

	// DELETE request
	public delete<T>(
		url: string,
		config?: AxiosRequestConfig
	): Promise<AxiosResponse<T>> {
		return this.client.delete<T>(url, config);
	}

	// PATCH request
	public patch<T, R>(
		url: string,
		data: T,
		config?: AxiosRequestConfig
	): Promise<AxiosResponse<R>> {
		return this.client.patch<T, AxiosResponse<R>>(url, data, config);
	}
}

export default ApiClient;
