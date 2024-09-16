"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ApiClient = void 0;
const tslib_1 = require("tslib");
const axios_1 = tslib_1.__importDefault(require("axios"));
const http_utils_1 = require("./schemas/http.utils");
const api_call_error_1 = require("./schemas/api.call.error");
class ApiClient {
    clientCredentials;
    api;
    constructor(clientCredentials) {
        this.clientCredentials = clientCredentials;
        this.api = axios_1.default.create();
        this.api.interceptors.request.use(this.requestInterceptor);
    }
    call = async (parameters) => {
        const retryCondition = (error) => {
            const axiosError = error;
            return !!axiosError?.status && axiosError.status >= http_utils_1.HttpStatus.INTERNAL_SERVER_ERROR;
        };
        const requestFunc = async () => this.api.request({
            method: parameters.method,
            url: `${this.clientCredentials.url}${parameters.path}`,
            data: parameters.body,
        });
        return this.makeRetryCall(requestFunc, retryCondition);
    };
    buildQuery = (queryParameters) => `?${Object.keys(queryParameters).map(key => `${key}=${queryParameters[key]}`).join('&')} `;
    requestInterceptor = async (request) => {
        request.headers["Authorization"] = this.clientCredentials.authHeader;
        return request;
    };
    makeRetryCall = async (requestFunc, retryCondition, beforeRetryHook, retries = 3) => {
        const calculateRetryDelay = (retryCount, multiplierInMillis = 1000) => Math.pow(2, retryCount) * multiplierInMillis;
        const makeRetryCallRec = async (attempt = 0) => {
            attempt += 1;
            return requestFunc().catch(async (error) => {
                if (attempt > retries || !retryCondition(error)) {
                    const axiosError = error;
                    throw new api_call_error_1.ApiCallError(axiosError.code, JSON.stringify(axiosError.response?.data));
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
exports.ApiClient = ApiClient;
//# sourceMappingURL=api.client.js.map