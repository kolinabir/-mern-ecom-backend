"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.categoryRoutes = void 0;
const express_1 = require("express");
const category_controllers_1 = require("./category.controllers");
const auth_1 = __importDefault(require("../../middleWares/auth"));
const user_constant_1 = require("../User/user.constant");
const router = (0, express_1.Router)();
router.post('/', (0, auth_1.default)(user_constant_1.USER_ROLE.admin), category_controllers_1.CategoryControllers.createCategory);
router.get('/', category_controllers_1.CategoryControllers.getAllCategories);
router.get('/:id', category_controllers_1.CategoryControllers.getSingleCategoryByID);
router.patch('/:id', category_controllers_1.CategoryControllers.updateCategoryByID);
router.delete('/:id', category_controllers_1.CategoryControllers.deleteCategoryByID);
exports.categoryRoutes = router;
