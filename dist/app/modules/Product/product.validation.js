"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProductValidations = void 0;
const zod_1 = require("zod");
const createProductValidationSchema = zod_1.z.object({
    body: zod_1.z.object({
        title: zod_1.z.string().min(3).max(255),
        price: zod_1.z.number().min(1),
        image: zod_1.z.array(zod_1.z.string().min(3).max(255)),
        description: zod_1.z.string().min(3),
        companyName: zod_1.z.string().min(3).max(255),
        quantity: zod_1.z.number().min(1),
    }),
});
const updateProductValidationSchema = zod_1.z.object({
    body: zod_1.z.object({
        title: zod_1.z.string().min(3).max(255).optional(),
        price: zod_1.z.number().min(1).optional(),
        image: zod_1.z.array(zod_1.z.string().min(3).max(255)),
        description: zod_1.z.string().min(3).max(255).optional(),
        companyName: zod_1.z.string().min(3).max(255).optional(),
        quantity: zod_1.z.number().min(1),
    }),
});
exports.ProductValidations = {
    createProductValidationSchema,
    updateProductValidationSchema,
};
