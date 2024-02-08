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
exports.cartService = void 0;
const http_status_1 = __importDefault(require("http-status"));
const AppError_1 = __importDefault(require("../../error/AppError"));
const user_model_1 = require("../User/user.model");
const product_model_1 = require("../Product/product.model");
const cart_model_1 = require("./cart.model");
const addNewProductToCartIntoDB = (payload, _id) => __awaiter(void 0, void 0, void 0, function* () {
    const { products } = payload;
    if (_id) {
        const isUserExist = yield user_model_1.User.findById(_id);
        if (!isUserExist) {
            throw new AppError_1.default(http_status_1.default.NOT_FOUND, 'User not found');
        }
    }
    if (products.length > 0) {
        products.forEach((product) => __awaiter(void 0, void 0, void 0, function* () {
            const isProductExist = yield product_model_1.Product.findById(product.productId);
            if (!isProductExist) {
                throw new AppError_1.default(http_status_1.default.NOT_FOUND, 'Product not found');
            }
        }));
    }
    //check if the ordered product is exist in cart and if exist then increase the quantity
    const cartItems = yield cart_model_1.Cart.find({ cartAddedBy: _id });
    if (cartItems.length > 0) {
        for (const cartItem of cartItems) {
            for (const product of payload.products) {
                const existingProductIndex = cartItem.products.findIndex((item) => item.productId === product.productId);
                if (existingProductIndex !== -1) {
                    // If the product already exists in the cart, update its quantity
                    yield cart_model_1.Cart.findByIdAndUpdate(cartItem._id, {
                        $inc: {
                            [`products.${existingProductIndex}.quantity`]: product.quantity,
                        },
                    });
                }
                else {
                    // If the product is not in the cart, add it
                    yield cart_model_1.Cart.findByIdAndUpdate(cartItem._id, {
                        $push: { products: product },
                    });
                }
            }
        }
    }
    return cartItems;
});
const getAllCartItemsOfAnUserFromDB = (id, user) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield cart_model_1.Cart.find({ cartAddedBy: id }).populate({
        path: 'products.productId',
        select: 'title price image description category sellerName size color companyName',
    });
    if (user.role === 'user') {
        result.forEach((order) => {
            var _a;
            const isOrderBelongsToUser = ((_a = order === null || order === void 0 ? void 0 : order.cartAddedBy) === null || _a === void 0 ? void 0 : _a.toString()) === user._id;
            if (!isOrderBelongsToUser) {
                throw new AppError_1.default(http_status_1.default.UNAUTHORIZED, 'Unauthorized');
            }
        });
    }
    let totalPrice = 0;
    for (const order of result) {
        for (const product of (order === null || order === void 0 ? void 0 : order.products) || []) {
            const productDetails = yield product_model_1.Product.findById(product.productId);
            if (productDetails) {
                totalPrice += ((product === null || product === void 0 ? void 0 : product.quantity) || 0) * ((productDetails === null || productDetails === void 0 ? void 0 : productDetails.price) || 0);
            }
        }
    }
    return {
        orders: result,
        totalPrice: totalPrice,
    };
});
exports.cartService = {
    addNewProductToCartIntoDB,
    getAllCartItemsOfAnUserFromDB,
};
