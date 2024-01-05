"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Course = void 0;
const mongoose_1 = require("mongoose");
const tagSchema = new mongoose_1.Schema({
    name: {
        type: String,
        required: true,
    },
    isDeleted: {
        type: Boolean,
        default: false,
    },
}, {
    _id: false,
});
const detailsSchema = new mongoose_1.Schema({
    level: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
});
const courseSchema = new mongoose_1.Schema({
    title: {
        type: String,
        required: true,
        unique: true,
    },
    instructor: {
        type: String,
        required: true,
    },
    categoryID: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: 'Category',
        required: true,
    },
    price: {
        type: Number,
        required: true,
    },
    tags: [tagSchema],
    startDate: {
        type: Date,
        required: true,
    },
    endDate: {
        type: Date,
        required: true,
    },
    language: {
        type: String,
        required: true,
    },
    provider: {
        type: String,
        required: true,
    },
    details: detailsSchema,
    createdBy: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: 'User',
    },
}, {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
});
courseSchema.virtual('durationInWeeks').get(function () {
    return Math.ceil((this.endDate.getTime() - this.startDate.getTime()) /
        (1000 * 3600 * 24 * 7));
});
exports.Course = (0, mongoose_1.model)('Course', courseSchema);
