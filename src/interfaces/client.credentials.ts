export type ClientCredentials = {
    authHeader: () => (Promise<string> | string),
    url: string,
}
