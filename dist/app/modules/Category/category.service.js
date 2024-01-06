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
exports.CategoryService = void 0;
const category_model_1 = require("./category.model");
const createCategoryIntoDB = (payload, _id) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield category_model_1.Category.create(Object.assign(Object.assign({}, payload), { createdBy: _id }));
    return result;
});
const getAllCategoriesFromDB = () => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield category_model_1.Category.find().populate({
        path: 'createdBy',
        select: 'username ',
    });
    return result;
});
const getSingleCategoryByIDFromDB = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield category_model_1.Category.findById(id).populate({
        path: 'createdBy',
        select: 'username ',
    });
    return result;
});
const updateCategoryByIDFromDB = (id, payload) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield category_model_1.Category.findByIdAndUpdate(id, payload, {
        new: true,
        runValidators: true,
    });
    return result;
});
const deleteCategoryByIDFromDB = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield category_model_1.Category.findByIdAndDelete(id);
    return result;
});
exports.CategoryService = {
    createCategoryIntoDB,
    getAllCategoriesFromDB,
    getSingleCategoryByIDFromDB,
    updateCategoryByIDFromDB,
    deleteCategoryByIDFromDB,
};
