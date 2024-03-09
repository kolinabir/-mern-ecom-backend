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
exports.cartController = void 0;
const http_status_1 = __importDefault(require("http-status"));
const catchAsync_1 = __importDefault(require("../Utils/catchAsync"));
const sendResponse_1 = __importDefault(require("../Utils/sendResponse"));
const cart_service_1 = require("./cart.service");
const getAllCartItems = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield cart_service_1.cartService.getAllCartItemsOfAnUserFromDB(req.params.id, req.user);
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: 'All Cart Items fetched successfully',
        data: result,
    });
}));
const addNewProductToCart = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const id = ((_a = req.user) === null || _a === void 0 ? void 0 : _a._id) || null;
    const result = yield cart_service_1.cartService.addNewProductToCartIntoDB(req.body, id);
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: 'Product added to cart successfully',
        data: result,
    });
}));
const deleteProductFromCartByQuantity = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _b;
    const result = yield cart_service_1.cartService.deleteProductQuantityFromCartInDB(req.params.id, (_b = req.user) === null || _b === void 0 ? void 0 : _b._id);
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: 'Product deleted from cart successfully',
        data: result,
    });
}));
const deleteProductFromCart = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _c;
    const result = yield cart_service_1.cartService.deleteProductFromCartFromDB(req.params.id, (_c = req.user) === null || _c === void 0 ? void 0 : _c._id);
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: 'Product deleted from cart successfully',
        data: result,
    });
}));
exports.cartController = {
    addNewProductToCart,
    getAllCartItems,
    deleteProductFromCartByQuantity,
    deleteProductFromCart,
};
