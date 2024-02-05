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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProductServices = void 0;
/* eslint-disable @typescript-eslint/no-explicit-any */
const AppError_1 = __importDefault(require("../../error/AppError"));
const category_model_1 = require("../Category/category.model");
const review_model_1 = require("../Review/review.model");
const product_model_1 = require("./product.model");
const createProductIntoDB = (payload, _id) => __awaiter(void 0, void 0, void 0, function* () {
    const checkIfCategoryExists = yield category_model_1.Category.findOne({
        _id: payload.category,
    });
    if (!checkIfCategoryExists) {
        throw new AppError_1.default(404, 'Category not found');
    }
    const result = yield product_model_1.Product.create(Object.assign(Object.assign({}, payload), { addedBy: _id }));
    return result;
});
const getAllProductsFromDB = () => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield product_model_1.Product.find()
        .populate({
        path: 'category',
        select: 'name',
    })
        .populate({
        path: 'addedBy',
        select: 'username',
    })
        .populate({
        // by virtual from product.model.ts
        path: 'reviews',
        select: 'review rating createdAt createdBy',
    });
    const productsWithAverageRating = yield Promise.all(result.map((product) => __awaiter(void 0, void 0, void 0, function* () {
        const averageRating = yield product
            .populate('reviews')
            .then((populatedProduct) => populatedProduct.averageRating); // Update the type declaration of populatedProduct
        return Object.assign(Object.assign({}, product.toJSON()), { averageRating });
    })));
    return productsWithAverageRating;
});
const getSingleProductFromDB = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield product_model_1.Product.findById(id)
        .populate({
        path: 'category',
        select: 'name',
    })
        .populate({
        path: 'addedBy',
        select: 'username',
    });
    const review = yield review_model_1.Review.find({ productID: id }).select('review rating createdAt createdBy');
    return Object.assign(Object.assign({}, result === null || result === void 0 ? void 0 : result.toObject()), { review });
});
const updateProductFromDB = (id, payload) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield product_model_1.Product.findByIdAndUpdate(id, payload, {
        new: true,
        runValidators: true,
    });
    return result;
});
const deleteProductFromDB = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield product_model_1.Product.findByIdAndDelete(id);
    return result;
});
const getProductByCategoryFromDB = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield product_model_1.Product.find({ category: id }).populate({
        path: 'category',
        select: 'name',
    });
    return result;
});
exports.ProductServices = {
    createProductIntoDB,
    getAllProductsFromDB,
    getSingleProductFromDB,
    updateProductFromDB,
    deleteProductFromDB,
    getProductByCategoryFromDB,
};
