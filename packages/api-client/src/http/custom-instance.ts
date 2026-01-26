import Axios from "axios";
import type { AxiosRequestConfig } from "axios";

export const AXIOS_INSTANCE = Axios.create({
	baseURL: "",
});

export const setApiBaseUrl = (baseUrl: string) => {
	AXIOS_INSTANCE.defaults.baseURL = baseUrl;
};

export const customInstance = async <T>(config: AxiosRequestConfig, options?: AxiosRequestConfig): Promise<T> => {
	const res = await AXIOS_INSTANCE.request<T>({ ...config, ...options });
	return res.data;
};
