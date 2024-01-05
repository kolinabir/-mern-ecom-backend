"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const handleCastError = (err) => {
    console.log(err);
    const errorSources = [
        {
            path: err === null || err === void 0 ? void 0 : err.path,
            message: err === null || err === void 0 ? void 0 : err.message,
            kind: err === null || err === void 0 ? void 0 : err.kind,
            value: err === null || err === void 0 ? void 0 : err.value,
        },
    ];
    const statusCode = 400;
    return {
        statusCode,
        message: 'Invalid ID',
        errorSources,
    };
};
exports.default = handleCastError;
