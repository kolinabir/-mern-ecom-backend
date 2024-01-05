"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const zod_1 = require("zod");
const config_1 = __importDefault(require("../config"));
const handleZodErrors_1 = __importDefault(require("../interface/handleZodErrors"));
const handleValidationError_1 = __importDefault(require("../interface/handleValidationError"));
const handleCastError_1 = __importDefault(require("../interface/handleCastError"));
const handleDuplicateError_1 = __importDefault(require("../interface/handleDuplicateError"));
const AppError_1 = __importDefault(require("../error/AppError"));
const globalErrorHandler = (err, req, res, next) => {
    //setting default values
    let statusCode = err.statusCode || 500;
    let errorMessage = 'Internal Server Error';
    let message = 'Error';
    let errorDetails = [
        {
            path: '',
            message: 'Something went wrong',
            kind: 'Error',
            value: 'Something went wrong',
            name: 'Error',
            reason: 'Something went wrong',
            stringValue: 'Something went wrong',
        },
    ];
    if (err instanceof zod_1.ZodError) {
        //handle zod error
        message = 'Zod Error';
        const simplifiedError = (0, handleZodErrors_1.default)(err);
        statusCode = simplifiedError === null || simplifiedError === void 0 ? void 0 : simplifiedError.statusCode;
        errorMessage = simplifiedError === null || simplifiedError === void 0 ? void 0 : simplifiedError.message;
        errorDetails = simplifiedError === null || simplifiedError === void 0 ? void 0 : simplifiedError.errorSources;
    }
    else if ((err === null || err === void 0 ? void 0 : err.name) === 'ValidationError') {
        //handle mongoose validation error
        message = 'Validation Error';
        const simplifiedError = (0, handleValidationError_1.default)(err);
        statusCode = simplifiedError === null || simplifiedError === void 0 ? void 0 : simplifiedError.statusCode;
        errorMessage = simplifiedError === null || simplifiedError === void 0 ? void 0 : simplifiedError.message;
        errorDetails = simplifiedError === null || simplifiedError === void 0 ? void 0 : simplifiedError.errorSources;
    }
    else if ((err === null || err === void 0 ? void 0 : err.name) === 'CastError') {
        //handle mongoose cast error
        message = 'Cast Error';
        const simplifiedError = (0, handleCastError_1.default)(err);
        statusCode = simplifiedError === null || simplifiedError === void 0 ? void 0 : simplifiedError.statusCode;
        errorMessage = simplifiedError === null || simplifiedError === void 0 ? void 0 : simplifiedError.message;
        errorDetails = simplifiedError === null || simplifiedError === void 0 ? void 0 : simplifiedError.errorSources;
    }
    else if ((err === null || err === void 0 ? void 0 : err.code) === 11000) {
        //handle mongoose duplicate error
        message = 'Duplicate Entry';
        const simplifiedError = (0, handleDuplicateError_1.default)(err);
        statusCode = simplifiedError === null || simplifiedError === void 0 ? void 0 : simplifiedError.statusCode;
        errorMessage = simplifiedError === null || simplifiedError === void 0 ? void 0 : simplifiedError.message;
        errorDetails = simplifiedError === null || simplifiedError === void 0 ? void 0 : simplifiedError.errorSources;
    }
    else if (err instanceof AppError_1.default) {
        //handle app error
        statusCode = err === null || err === void 0 ? void 0 : err.statusCode;
        errorMessage = err === null || err === void 0 ? void 0 : err.message;
        if (errorMessage == 'You are not authorized to access this route') {
            return res.status(statusCode).json({
                success: false,
                message: 'Unauthorized Access ',
                errorMessage: 'You do not have the necessary permissions to access this resource.',
                errorDetails: null,
                // err,
                stack: null,
            });
        }
        // if (errorMessage == 'Password change failed') {
        //   return res.status(statusCode).json({
        //     success: false,
        //     message: 'Unauthorized Access ',
        //     errorMessage,
        //     errorDetails: null,
        //     // err,
        //     stack: null,
        //   })
        // }
        errorDetails = [
            {
                path: '',
                message: err === null || err === void 0 ? void 0 : err.message,
            },
        ];
    }
    else if (err instanceof Error) {
        errorMessage = err === null || err === void 0 ? void 0 : err.message;
        errorDetails = [
            {
                path: '',
                message: err === null || err === void 0 ? void 0 : err.message,
            },
        ];
    }
    return res.status(statusCode).json({
        success: false,
        message,
        errorMessage,
        errorDetails,
        // err,
        stack: config_1.default.NODE_ENV === 'development' ? err === null || err === void 0 ? void 0 : err.stack : null,
    });
};
exports.default = globalErrorHandler;
