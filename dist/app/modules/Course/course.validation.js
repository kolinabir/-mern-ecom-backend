"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateCourseValidationSchema = exports.createCourseValidationSchema = void 0;
const zod_1 = require("zod");
const tagsValidationSchema = zod_1.z.object({
    name: zod_1.z.string().min(3).max(255),
});
const updateTagsValidationSchema = zod_1.z.object({
    name: zod_1.z.string().min(3).max(255).optional(),
});
exports.createCourseValidationSchema = zod_1.z.object({
    body: zod_1.z.object({
        title: zod_1.z.string().min(3).max(255),
        instructor: zod_1.z.string().min(3).max(255),
        categoryID: zod_1.z.string().min(3).max(255),
        price: zod_1.z.number().min(0),
        tags: zod_1.z.array(tagsValidationSchema),
        startDate: zod_1.z.string(),
        endDate: zod_1.z.string(),
        language: zod_1.z.string().min(3).max(255),
        provider: zod_1.z.string().min(3).max(255),
        details: zod_1.z.object({
            level: zod_1.z.string().min(3).max(255),
            description: zod_1.z.string().min(3).max(255),
        }),
    }),
});
exports.updateCourseValidationSchema = zod_1.z.object({
    body: zod_1.z.object({
        title: zod_1.z.string().min(3).max(255).optional(),
        instructor: zod_1.z.string().min(3).max(255).optional(),
        categoryID: zod_1.z.string().min(3).max(255).optional(),
        price: zod_1.z.number().min(0).optional(),
        tags: zod_1.z.array(updateTagsValidationSchema).optional(),
        startDate: zod_1.z.string().optional(),
        endDate: zod_1.z.string().optional(),
        language: zod_1.z.string().min(3).max(255).optional(),
        provider: zod_1.z.string().min(3).max(255).optional(),
        details: zod_1.z
            .object({
            level: zod_1.z.string().min(3).max(255).optional(),
            description: zod_1.z.string().min(3).max(255).optional(),
        })
            .optional(),
    }),
});
