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
exports.ReviewService = void 0;
const review_model_1 = require("./review.model");
const createReviewIntoDB = (payload, _id) => __awaiter(void 0, void 0, void 0, function* () {
    // const checkIfCategoryExists = await Course.findOne({
    //   _id: payload.productID,
    // })
    // if (!checkIfCategoryExists) {
    //   throw new AppError(404, 'Course not found')
    // }
    const result = yield review_model_1.Review.create(Object.assign(Object.assign({}, payload), { createdBy: _id }));
    return result;
});
const getAllReviewsFromDB = () => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield review_model_1.Review.find()
        .populate({
        path: 'productID',
        select: 'title price categoryID quantity',
    })
        .populate({
        path: 'createdBy',
        select: 'username',
    });
    return result;
});
exports.ReviewService = {
    createReviewIntoDB,
    getAllReviewsFromDB,
};
