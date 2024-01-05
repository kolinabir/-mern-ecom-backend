"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.reviewRoutes = void 0;
const express_1 = require("express");
const review_controllers_1 = require("./review.controllers");
const auth_1 = __importDefault(require("../../middleWares/auth"));
const user_constant_1 = require("../User/user.constant");
const router = (0, express_1.Router)();
router.post('/', (0, auth_1.default)(user_constant_1.USER_ROLE.user), review_controllers_1.ReviewControllers.createReview);
router.get('/', review_controllers_1.ReviewControllers.getAllReviews);
// router.get('/:id', ReviewControllers.getSingleCourseByID)
// router.patch('/:id', CourseControllers.updateCourseByID)
// // router.delete('/:id', CategoryControllers.deleteCategoryByID)
exports.reviewRoutes = router;
