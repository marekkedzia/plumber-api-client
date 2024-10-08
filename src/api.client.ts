import axios, {AxiosInstance, AxiosResponse, InternalAxiosRequestConfig} from "axios";
import {ClientCredentials} from "./interfaces/client.credentials";
import {HttpMethod, HttpStatus} from "./interfaces/http.utils";
import {ApiCallError} from "./interfaces/api.call.error";

export class ApiClient {
    private api: AxiosInstance;

    constructor(private clientCredentials: ClientCredentials) {
        this.api = axios.create();
        this.api.interceptors.request.use(this.requestInterceptor);
    }

    call = async (parameters: {
        method: HttpMethod,
        path: string,
        body?: unknown,
    }): Promise<AxiosResponse> => {
        const requestFunc = async (): Promise<AxiosResponse> => this.api.request({
            method: parameters.method,
            url: `${this.clientCredentials.url}${parameters.path}`,
            data: parameters.body,
        });

        const retryCondition = (error: Error) => {
            //@ts-ignore
            return !!error?.status && error.status >= HttpStatus.INTERNAL_SERVER_ERROR;
        };

        return this.makeRetryCall(requestFunc, retryCondition);
    };

    buildQuery = (queryParameters: { [key: string]: string }): string => {
        return `?${Object.keys(queryParameters).map(key => `${key}=${queryParameters[key]}`).join('&')} `;
    };

    private requestInterceptor = async (request: InternalAxiosRequestConfig): Promise<InternalAxiosRequestConfig> => {
        request.headers["Authorization"] = this.clientCredentials.authHeader;
        return request;
    };

    private makeRetryCall = async (
        requestFunc: () => Promise<AxiosResponse>,
        retryCondition: ((error: Error) => boolean),
        beforeRetryHook?: () => Promise<void> | void,
        retries = 3,
    ): Promise<AxiosResponse> => {
        const calculateRetryDelay = (retryCount: number, multiplierInMillis = 1000) =>
            Math.pow(2, retryCount) * multiplierInMillis;

        const makeRetryCallRec = async (attempt = 0): Promise<AxiosResponse> => {
            attempt += 1;
            return requestFunc().catch(async (error): Promise<AxiosResponse> => {
                if (attempt > retries || !retryCondition(error)) {
                    throw new ApiCallError(error.code, JSON.stringify(error.response?.data));
                }

                if (beforeRetryHook)
                    await beforeRetryHook();

                await new Promise((resolve) => setTimeout(resolve, calculateRetryDelay(attempt)));
                return makeRetryCallRec(attempt);
            });
        };

        return makeRetryCallRec();
    };
}
