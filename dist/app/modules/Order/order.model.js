"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Order = void 0;
const mongoose_1 = require("mongoose");
const OrderSchema = new mongoose_1.Schema({
    products: [
        {
            productId: {
                type: mongoose_1.Schema.Types.ObjectId,
                required: true,
                ref: 'Product',
                errorMessages: {
                    required: 'Product is required',
                },
            },
            quantity: {
                type: Number,
                required: true,
                errorMessages: {
                    required: 'Quantity is required',
                },
            },
        },
    ],
    customerName: {
        type: String,
        required: true,
        errorMessages: {
            required: 'Customer name is required',
        },
    },
    address: {
        type: String,
        required: false,
        errorMessages: {
            required: 'Address is required',
        },
    },
    phoneNumber: {
        type: String,
        required: true,
        errorMessages: {
            required: 'Phone number is required',
        },
    },
    email: {
        type: String,
    },
    additionalInfo: {
        type: String,
    },
    status: {
        type: String,
        enum: ['pending', 'cancelled', 'delivered', 'processing'],
        default: 'pending',
        errorMessages: {
            enum: 'Invalid status',
        },
    },
    orderedBy: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: 'User',
    },
    orderedDate: {
        type: Date,
        default: Date.now,
        errorMessages: {
            default: 'Invalid ordered date',
        },
    },
    cartAdded: {
        type: Boolean,
    },
});
exports.Order = (0, mongoose_1.model)('Order', OrderSchema);
