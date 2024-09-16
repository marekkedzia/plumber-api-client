"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PlumberApiSDK = void 0;
const api_client_1 = require("./api.client");
class PlumberApiSDK {
    apiClient;
    constructor(clientCredentials) {
        this.apiClient = new api_client_1.ApiClient(clientCredentials);
    }
}
exports.PlumberApiSDK = PlumberApiSDK;
//# sourceMappingURL=api.sdk.js.map