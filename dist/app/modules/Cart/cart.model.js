"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Cart = void 0;
const mongoose_1 = require("mongoose");
const CartSchema = new mongoose_1.Schema({
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
    cartAddedBy: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: 'User',
    },
    cartAddedDate: {
        type: Date,
        default: Date.now,
    },
});
exports.Cart = (0, mongoose_1.model)('Cart', CartSchema);
