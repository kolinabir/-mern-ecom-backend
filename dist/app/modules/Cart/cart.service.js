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
        // Check if user exists
        const isUserExist = yield user_model_1.User.findById(_id);
        if (!isUserExist) {
            throw new AppError_1.default(http_status_1.default.NOT_FOUND, 'User not found');
        }
    }
    if (products.length > 0) {
        for (const product of products) {
            // Check if product exists
            const isProductExist = yield product_model_1.Product.findById(product.productId);
            if (!isProductExist) {
                throw new AppError_1.default(http_status_1.default.NOT_FOUND, 'Product not found');
            }
        }
        const cart = yield cart_model_1.Cart.findOne({ cartAddedBy: _id });
        if (cart) {
            // If the cart exists, update or add products
            for (const product of products) {
                const existingProductIndex = cart.products.findIndex((item) => item.productId.toString() === product.productId.toString());
                if (existingProductIndex !== -1) {
                    // If the product already exists in the cart, update its quantity
                    cart.products[existingProductIndex].quantity += product.quantity;
                }
                else {
                    // If the product is not in the cart, add it
                    cart.products.push({
                        productId: product.productId,
                        quantity: product.quantity,
                    });
                }
            }
            // Save the updated cart
            yield cart.save();
        }
        else {
            // If the cart doesn't exist, create a new cart with the provided products
            const newCart = new cart_model_1.Cart({
                cartAddedBy: _id,
                products: products.map((product) => ({
                    productId: product.productId,
                    quantity: product.quantity,
                })),
            });
            yield newCart.save();
        }
    }
    const result = yield cart_model_1.Cart.findOne({ cartAddedBy: _id }).populate({
        path: 'products.productId',
        select: 'title price image description category sellerName size color companyName',
    });
    return result;
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
const deleteProductQuantityFromCartInDB = (productId, _id) => __awaiter(void 0, void 0, void 0, function* () {
    const isCartExist = yield cart_model_1.Cart.findOne({ cartAddedBy: _id });
    if (isCartExist) {
        // Find the product index in the cart
        const productIndex = isCartExist.products.findIndex((product) => product.productId.toString() === productId);
        if (productIndex !== -1) {
            // If the product exists in the cart, decrease its quantity by one
            isCartExist.products[productIndex].quantity -= 1;
            // If the quantity becomes zero, remove the product from the array
            if (isCartExist.products[productIndex].quantity <= 0) {
                isCartExist.products.splice(productIndex, 1);
            }
            // Save the updated cart
            const result = yield isCartExist.save();
            return result;
        }
        else {
            throw new AppError_1.default(http_status_1.default.NOT_FOUND, 'Product not found in the cart');
        }
    }
    else {
        throw new AppError_1.default(http_status_1.default.NOT_FOUND, 'Cart not found');
    }
});
const deleteProductFromCartFromDB = (productId, _id) => __awaiter(void 0, void 0, void 0, function* () {
    // this will delete the whole product from cart
    const isCartExist = yield cart_model_1.Cart.findOne({ cartAddedBy: _id });
    if (isCartExist) {
        // Find the product index in the cart
        const productIndex = isCartExist.products.findIndex((product) => product.productId.toString() === productId);
        if (productIndex !== -1) {
            // If the product exists in the cart, remove the product from the array
            isCartExist.products.splice(productIndex, 1);
            // Save the updated cart
            const result = yield isCartExist.save();
            return result;
        }
        else {
            throw new AppError_1.default(http_status_1.default.NOT_FOUND, 'Product not found in the cart');
        }
    }
    else {
        throw new AppError_1.default(http_status_1.default.NOT_FOUND, 'Cart not found');
    }
});
exports.cartService = {
    addNewProductToCartIntoDB,
    getAllCartItemsOfAnUserFromDB,
    deleteProductQuantityFromCartInDB,
    deleteProductFromCartFromDB,
};
