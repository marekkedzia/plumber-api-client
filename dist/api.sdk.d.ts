import { ApiClient } from "./api.client";
import { ClientCredentials } from "./interfaces/client.credentials";
export declare class PlumberApiSDK {
    protected apiClient: ApiClient;
    constructor(clientCredentials: ClientCredentials);
}
