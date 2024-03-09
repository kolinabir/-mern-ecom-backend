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
exports.orderService = void 0;
const http_status_1 = __importDefault(require("http-status"));
const AppError_1 = __importDefault(require("../../error/AppError"));
const user_model_1 = require("../User/user.model");
const order_model_1 = require("./order.model");
const product_model_1 = require("../Product/product.model");
const queryBuilder_1 = __importDefault(require("../../builder/queryBuilder"));
const cart_model_1 = require("../Cart/cart.model");
const addNewOrderIntoDB = (payload, _id) => __awaiter(void 0, void 0, void 0, function* () {
    const { products } = payload;
    if (_id) {
        const isUserExist = yield user_model_1.User.findById(_id);
        if (!isUserExist) {
            throw new AppError_1.default(http_status_1.default.NOT_FOUND, 'User not found');
        }
    }
    if (products.length > 0) {
        for (const product of products) {
            const isProductExist = yield product_model_1.Product.findById(product.productId);
            if (!isProductExist) {
                throw new AppError_1.default(http_status_1.default.NOT_FOUND, 'Product not found');
            }
        }
        const result = yield order_model_1.Order.create(Object.assign(Object.assign({}, payload), { orderedBy: _id, cartAdded: false }));
        // Check if the ordered products are in the user's cart and remove them
        const cartItems = yield cart_model_1.Cart.findOne({ cartAddedBy: _id });
        if (cartItems) {
            const updatedProducts = cartItems.products.filter((cartProduct) => {
                return !products.some((orderedProduct) => cartProduct.productId.equals(orderedProduct.productId));
            });
            // Update the user's cart with the remaining products
            yield cart_model_1.Cart.findByIdAndUpdate(cartItems._id, { products: updatedProducts });
        }
        return result;
    }
});
const getAllOrdersFromDB = (query) => __awaiter(void 0, void 0, void 0, function* () {
    const searchableFields = [
        'products.productId',
        'status',
        'orderedBy',
        'phoneNumber',
        'cartAdded',
    ];
    const orderQuery = new queryBuilder_1.default(order_model_1.Order.find(), query)
        .search(searchableFields)
        .filter()
        .sort()
        .paginate()
        .fields();
    const result = yield orderQuery.modelQuery.populate({
        path: 'products.productId',
        select: 'title price image',
    });
    return result;
});
const getSingleOrderFromDB = (id, user) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const result = yield order_model_1.Order.findById(id);
    if (user.role === 'user') {
        const isOrderBelongsToUser = ((_a = result === null || result === void 0 ? void 0 : result.orderedBy) === null || _a === void 0 ? void 0 : _a.toString()) === user._id;
        if (!isOrderBelongsToUser) {
            throw new AppError_1.default(http_status_1.default.UNAUTHORIZED, 'Unauthorized');
        }
    }
    return result;
});
const getAllOrdersOfAnUserFromDB = (id, user) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield order_model_1.Order.find({ orderedBy: id, cartAdded: false }).populate({
        path: 'products.productId',
        select: 'title price image description category sellerName size color companyName',
    });
    if (user.role === 'user') {
        result.forEach((order) => {
            var _a;
            const isOrderBelongsToUser = ((_a = order === null || order === void 0 ? void 0 : order.orderedBy) === null || _a === void 0 ? void 0 : _a.toString()) === user._id;
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
        totalPrice,
    };
});
const cartItemToOrderIntoDB = (id, user) => __awaiter(void 0, void 0, void 0, function* () {
    var _b;
    const result = yield order_model_1.Order.findByIdAndUpdate(id, { cartAdded: false });
    if (user.role === 'user') {
        const isOrderBelongsToUser = ((_b = result === null || result === void 0 ? void 0 : result.orderedBy) === null || _b === void 0 ? void 0 : _b.toString()) === user._id;
        if (!isOrderBelongsToUser) {
            throw new AppError_1.default(http_status_1.default.UNAUTHORIZED, 'Unauthorized');
        }
    }
    return result;
});
const getOrderByMonthFromDB = (user, query) => __awaiter(void 0, void 0, void 0, function* () {
    const { month, year, status } = query;
    // Ensure that month and year are provided
    if (!month || !year) {
        throw new Error('Month and year are required parameters.');
    }
    // Parse month and year as integers
    const parsedMonth = parseInt(month, 10);
    const parsedYear = parseInt(year, 10);
    // Validate month and year values
    if (isNaN(parsedMonth) ||
        isNaN(parsedYear) ||
        parsedMonth < 1 ||
        parsedMonth > 12) {
        throw new Error('Invalid month or year value.');
    }
    // Calculate the start and end dates for the given month and year
    const startDate = new Date(parsedYear, parsedMonth - 1, 1);
    const endDate = new Date(parsedYear, parsedMonth, 0, 23, 59, 59, 999);
    // Construct the query object for filtering by status
    const statusQuery = status ? { status: status } : {};
    // Fetch orders within the specified date range and status
    const orders = yield order_model_1.Order.find(Object.assign({ orderedDate: { $gte: startDate, $lte: endDate } }, statusQuery))
        .populate({
        path: 'products.productId',
        select: 'title price image',
    })
        .exec();
    // Calculate the sum of all orders' prices
    let totalPrice = 0;
    for (const order of orders) {
        for (const product of order.products) {
            const productDetails = yield product_model_1.Product.findById(product.productId);
            if (productDetails) {
                totalPrice += (product.quantity || 0) * (productDetails.price || 0);
            }
        }
    }
    return { orders, totalPrice };
});
exports.orderService = {
    addNewOrderIntoDB,
    getAllOrdersFromDB,
    getSingleOrderFromDB,
    getAllOrdersOfAnUserFromDB,
    cartItemToOrderIntoDB,
    getOrderByMonthFromDB,
};
