"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.orderRoutes = void 0;
const express_1 = require("express");
const order_controller_1 = require("./order.controller");
const validateRequest_1 = __importDefault(require("../../middleWares/validateRequest"));
const order_validation_1 = require("./order.validation");
const auth_1 = __importDefault(require("../../middleWares/auth"));
const user_constant_1 = require("../User/user.constant");
const router = (0, express_1.Router)();
router.post('/', (req, res, next) => {
    if (req.headers.authorization) {
        (0, auth_1.default)(user_constant_1.USER_ROLE.user)(req, res, next);
    }
    else {
        next(); // unregister user also can order !!
    }
}, (0, validateRequest_1.default)(order_validation_1.orderValidateSchema.createOrderValidationSchema), order_controller_1.orderController.addNewOrder);
router.post('/addProductToCart', (0, auth_1.default)(user_constant_1.USER_ROLE.user), (0, validateRequest_1.default)(order_validation_1.orderValidateSchema.createOrderValidationSchema), order_controller_1.orderController.addNewProductToCart);
router.get('/', (0, auth_1.default)(user_constant_1.USER_ROLE.admin), order_controller_1.orderController.getAllOrders);
router.get('/date', (0, auth_1.default)(user_constant_1.USER_ROLE.admin), order_controller_1.orderController.getOrderByMonth);
router.get('/:id', (0, auth_1.default)(user_constant_1.USER_ROLE.admin, user_constant_1.USER_ROLE.user), order_controller_1.orderController.getSingleOrder);
router.get('/user/:id', (0, auth_1.default)(user_constant_1.USER_ROLE.admin, user_constant_1.USER_ROLE.user), order_controller_1.orderController.getAllOrdersOfAnUser);
router.get('/user/cart/:id', (0, auth_1.default)(user_constant_1.USER_ROLE.admin, user_constant_1.USER_ROLE.user), order_controller_1.orderController.getAllCartItems);
router.patch('/user/cartToOrder/:id', (0, auth_1.default)(user_constant_1.USER_ROLE.user), order_controller_1.orderController.cartItemToOrder);
exports.orderRoutes = router;
