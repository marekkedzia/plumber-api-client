"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ApiCallError = void 0;
class ApiCallError {
    code;
    data;
    constructor(code, data) {
        this.code = code || "INTERNAL_ERROR";
        this.data = data || "Unknown error occurred.";
    }
}
exports.ApiCallError = ApiCallError;
//# sourceMappingURL=api.call.error.js.map