import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse } from "axios";

interface Response<T> {
	response: AxiosResponse<T>;
	abort: () => void;
}

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
				"Content-Type": "application/json",
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
					return Promise.reject({
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
	public get<T>(
		url: string,
		config?: AxiosRequestConfig
	): Promise<AxiosResponse<T>> {
		const response = this.client.get<T>(url, {
			withCredentials: true,
			...config,
		});
		return response;
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
