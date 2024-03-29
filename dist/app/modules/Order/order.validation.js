"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.orderValidateSchema = void 0;
const zod_1 = require("zod");
const createOrderValidationSchema = zod_1.z.object({
    body: zod_1.z.object({
        products: zod_1.z.array(zod_1.z.object({
            productId: zod_1.z.string().min(3).max(255),
            quantity: zod_1.z.number().min(1),
        })),
        customerName: zod_1.z.string().min(3).max(255),
        address: zod_1.z.string().min(3).max(255),
        phoneNumber: zod_1.z.number(),
    }),
});
exports.orderValidateSchema = {
    createOrderValidationSchema,
};
