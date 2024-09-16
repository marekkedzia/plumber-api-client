export class ApiCallError {
    code: string;
    data: string;

    constructor(code?: string, data?: string) {
        this.code = code || "INTERNAL_ERROR";
        this.data = data || "Unknown error occurred.";
    }
}
