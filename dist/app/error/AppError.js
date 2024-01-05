"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CustomUnauthorizedError = void 0;
class AppError extends Error {
    constructor(statusCode, message, stack = '') {
        super(message);
        this.statusCode = statusCode;
        if (stack) {
            this.stack = stack;
        }
        else {
            Error.captureStackTrace(this, this.constructor);
        }
    }
}
exports.default = AppError;
class CustomUnauthorizedError extends Error {
    constructor(message = 'Unauthorized Access', errorMessage, errorDetails) {
        super(message);
        this.name = 'CustomUnauthorizedError';
        this.success = false;
        this.errorMessage =
            errorMessage ||
                'You do not have the necessary permissions to access this resource.';
        this.errorDetails = errorDetails;
    }
}
exports.CustomUnauthorizedError = CustomUnauthorizedError;
