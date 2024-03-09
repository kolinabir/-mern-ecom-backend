"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.productRoutes = void 0;
const express_1 = require("express");
const auth_1 = __importDefault(require("../../middleWares/auth"));
const user_constant_1 = require("../User/user.constant");
const product_controller_1 = require("./product.controller");
const validateRequest_1 = __importDefault(require("../../middleWares/validateRequest"));
const product_validation_1 = require("./product.validation");
const router = (0, express_1.Router)();
router.post('/', (0, auth_1.default)(user_constant_1.USER_ROLE.admin), (0, validateRequest_1.default)(product_validation_1.ProductValidations.createProductValidationSchema), product_controller_1.ProductControllers.createNewProduct);
//get quantity of zero
router.get('/quantity/zero', (0, auth_1.default)(user_constant_1.USER_ROLE.admin), product_controller_1.ProductControllers.getQuantityOfZero);
router.get('/category/:id', product_controller_1.ProductControllers.getProductsByCategory);
router.get('/', product_controller_1.ProductControllers.getAllProducts);
router.get('/:id', product_controller_1.ProductControllers.getSingleProduct);
router.patch('/:id', (0, auth_1.default)(user_constant_1.USER_ROLE.admin), product_controller_1.ProductControllers.updateProduct);
router.delete('/:id', (0, auth_1.default)(user_constant_1.USER_ROLE.admin), product_controller_1.ProductControllers.deleteProduct);
exports.productRoutes = router;
