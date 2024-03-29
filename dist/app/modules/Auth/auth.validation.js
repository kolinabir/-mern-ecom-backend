"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthValidation = void 0;
const zod_1 = require("zod");
const loginValidationSchema = zod_1.z.object({
    body: zod_1.z.object({
        username: zod_1.z.string({
            required_error: 'Username is required',
        }),
        password: zod_1.z
            .string({
            required_error: 'Password is required',
        })
            .min(8)
            .max(100),
    }),
});
const changePasswordValidationSchema = zod_1.z.object({
    body: zod_1.z.object({
        oldPassword: zod_1.z.string({
            required_error: 'Old Password is required',
        }),
        newPassword: zod_1.z
            .string({
            required_error: 'New Password is required',
        })
            .min(8)
            .max(100),
    }),
});
exports.AuthValidation = {
    loginValidationSchema,
    changePasswordValidationSchema,
};
