"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthRoute = void 0;
const express_1 = require("express");
const validateRequest_1 = __importDefault(require("../../middleWares/validateRequest"));
const auth_validation_1 = require("./auth.validation");
const auth_controller_1 = require("./auth.controller");
const user_validation_1 = require("../User/user.validation");
const user_controller_1 = require("../User/user.controller");
const auth_1 = __importDefault(require("../../middleWares/auth"));
const user_constant_1 = require("../User/user.constant");
const router = (0, express_1.Router)();
router.post('/login', (0, validateRequest_1.default)(auth_validation_1.AuthValidation.loginValidationSchema), auth_controller_1.AuthController.loginUser);
router.post('/change-password', (0, auth_1.default)(user_constant_1.USER_ROLE.user, user_constant_1.USER_ROLE.admin), (0, validateRequest_1.default)(auth_validation_1.AuthValidation.changePasswordValidationSchema), auth_controller_1.AuthController.changePassword);
router.post('/register', (0, validateRequest_1.default)(user_validation_1.UserValidations.createUserValidationSchema), user_controller_1.UserController.createUser);
exports.AuthRoute = router;
