import Axios from "axios";
import type { AxiosRequestConfig } from "axios";

export const AXIOS_INSTANCE = Axios.create({
	baseURL: "",
});

export const setApiBaseUrl = (baseUrl: string) => {
	AXIOS_INSTANCE.defaults.baseURL = baseUrl;
};

export type AccessTokenProvider = () => Promise<string | null> | string | null;

let accessTokenProvider: AccessTokenProvider | null = null;

export const setAccessTokenProvider = (provider: AccessTokenProvider | null) => {
	accessTokenProvider = provider;
};

export const customInstance = async <T>(config: AxiosRequestConfig, options?: AxiosRequestConfig): Promise<T> => {
	const mergedConfig: AxiosRequestConfig = { ...config, ...options };
	if (accessTokenProvider) {
		const token = await accessTokenProvider();
		if (token) {
			mergedConfig.headers = {
				...(mergedConfig.headers ?? {}),
				Authorization: `Bearer ${token}`,
			};
		}
	}

	const res = await AXIOS_INSTANCE.request<T>(mergedConfig);
	return res.data;
};
