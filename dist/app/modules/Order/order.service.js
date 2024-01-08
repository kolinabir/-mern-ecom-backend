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
const addNewOrderIntoDB = (payload, _id) => __awaiter(void 0, void 0, void 0, function* () {
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
    const result = yield order_model_1.Order.create(Object.assign(Object.assign({}, payload), { orderedBy: _id }));
    return result;
});
const getAllOrdersFromDB = (query) => __awaiter(void 0, void 0, void 0, function* () {
    const searchableFields = [
        'products.productId',
        'status',
        'orderedBy',
        'phoneNumber',
    ];
    const orderQuery = new queryBuilder_1.default(order_model_1.Order.find(), query)
        .search(searchableFields)
        .filter()
        .sort()
        .paginate()
        .fields();
    const result = yield orderQuery.modelQuery;
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
    const result = yield order_model_1.Order.find({ orderedBy: id });
    if (user.role === 'user') {
        result.forEach((order) => {
            var _a;
            const isOrderBelongsToUser = ((_a = order === null || order === void 0 ? void 0 : order.orderedBy) === null || _a === void 0 ? void 0 : _a.toString()) === user._id;
            if (!isOrderBelongsToUser) {
                throw new AppError_1.default(http_status_1.default.UNAUTHORIZED, 'Unauthorized');
            }
        });
    }
    return result;
});
exports.orderService = {
    addNewOrderIntoDB,
    getAllOrdersFromDB,
    getSingleOrderFromDB,
    getAllOrdersOfAnUserFromDB,
};
