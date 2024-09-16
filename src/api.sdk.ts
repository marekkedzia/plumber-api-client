import {ApiClient} from "./api.client";
import {ClientCredentials} from "./interfaces/client.credentials";

export class PlumberApiSDK {
    protected apiClient: ApiClient;

    constructor(clientCredentials: ClientCredentials) {
        this.apiClient = new ApiClient(clientCredentials);
    }
}
