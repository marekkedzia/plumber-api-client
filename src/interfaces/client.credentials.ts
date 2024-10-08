import {AxiosHeaderValue} from "axios";

export type ClientCredentials = {
    authHeader: () => (Promise<AxiosHeaderValue> | AxiosHeaderValue),
    url: string,
}
