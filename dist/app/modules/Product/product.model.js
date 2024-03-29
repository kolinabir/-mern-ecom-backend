"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Product = void 0;
const mongoose_1 = require("mongoose");
const review_model_1 = require("../Review/review.model");
const productSchema = new mongoose_1.Schema({
    title: {
        type: String,
        required: true,
        unique: true,
    },
    price: {
        type: Number,
        required: true,
    },
    image: {
        type: [String],
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    category: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: 'Category',
        required: true,
    },
    companyName: {
        type: String,
        required: true,
    },
    sellerName: {
        type: String,
    },
    policy: {
        type: String,
    },
    color: [String],
    addedBy: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: 'User',
    },
    sizes: [String],
    quantity: {
        type: Number,
        required: true,
    },
}, {
    timestamps: true,
    toJSON: {
        virtuals: true,
    },
    toObject: {
        virtuals: true,
    },
});
//review bug will be fixed
// review wont show when fetching all products
productSchema.virtual('reviews', {
    ref: 'Review',
    localField: '_id',
    foreignField: 'productID',
});
productSchema.virtual('averageRating').get(function () {
    return __awaiter(this, void 0, void 0, function* () {
        const result = yield review_model_1.Review.find({
            productID: this._id,
        }).select('rating');
        if (result.length === 0) {
            return 0; // Return 0 if there are no reviews
        }
        const totalRating = result.reduce((sum, review) => sum + review.rating, 0);
        return totalRating / result.length;
    });
});
exports.Product = (0, mongoose_1.model)('Product', productSchema);
