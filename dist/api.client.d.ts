import { AxiosResponse } from "axios";
import { ClientCredentials } from "./interfaces/client.credentials";
import { HttpMethod } from "./interfaces/http.utils";
export declare class ApiClient {
    private clientCredentials;
    private api;
    constructor(clientCredentials: ClientCredentials);
    call: (parameters: {
        method: HttpMethod;
        path: string;
        body?: unknown;
    }) => Promise<AxiosResponse>;
    buildQuery: (queryParameters: {
        [key: string]: string;
    }) => string;
    private requestInterceptor;
    private makeRetryCall;
}
