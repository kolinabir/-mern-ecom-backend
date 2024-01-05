"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.coursesCustomRoutes = void 0;
const express_1 = require("express");
const course_controllers_1 = require("./course.controllers");
const validateRequest_1 = __importDefault(require("../../middleWares/validateRequest"));
const course_validation_1 = require("./course.validation");
const auth_1 = __importDefault(require("../../middleWares/auth"));
const user_constant_1 = require("../User/user.constant");
const router = (0, express_1.Router)();
router.get('/', course_controllers_1.CourseControllers.getAllCourses);
router.get('/:id/review', course_controllers_1.CourseControllers.getSingleCourseByID);
router.patch('/:id', (0, auth_1.default)(user_constant_1.USER_ROLE.admin), (0, validateRequest_1.default)(course_validation_1.updateCourseValidationSchema), course_controllers_1.CourseControllers.updateCourseByID);
exports.coursesCustomRoutes = router;
