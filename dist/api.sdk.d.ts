import { ApiClient } from "./api.client";
import { ClientCredentials } from "./schemas/client.credentials";
export declare class PlumberApiSDK {
    protected apiClient: ApiClient;
    constructor(clientCredentials: ClientCredentials);
}
