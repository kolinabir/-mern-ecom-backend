"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserValidations = void 0;
const zod_1 = require("zod");
const createUserValidationSchema = zod_1.z.object({
    body: zod_1.z.object({
        username: zod_1.z.string().min(3).max(255),
        email: zod_1.z.string().email().min(3).max(255),
        password: zod_1.z.string().min(6).max(255),
        role: zod_1.z.enum(['user', 'admin']),
    }),
});
exports.UserValidations = {
    createUserValidationSchema,
};
