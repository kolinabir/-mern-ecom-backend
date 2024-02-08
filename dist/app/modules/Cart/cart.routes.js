"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.cartRoutes = void 0;
const express_1 = require("express");
const auth_1 = __importDefault(require("../../middleWares/auth"));
const user_constant_1 = require("../User/user.constant");
const validateRequest_1 = __importDefault(require("../../middleWares/validateRequest"));
const cart_controller_1 = require("./cart.controller");
const cart_validation_1 = require("./cart.validation");
const router = (0, express_1.Router)();
router.post('/addProductToCart', (0, auth_1.default)(user_constant_1.USER_ROLE.user), (0, validateRequest_1.default)(cart_validation_1.cartValidateSchema.addCartValidationSchema), cart_controller_1.cartController.addNewProductToCart);
router.get('/:id', (0, auth_1.default)(user_constant_1.USER_ROLE.admin, user_constant_1.USER_ROLE.user), cart_controller_1.cartController.getAllCartItems);
exports.cartRoutes = router;
