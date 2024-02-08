"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const category_routes_1 = require("../modules/Category/category.routes");
const review_routes_1 = require("../modules/Review/review.routes");
const auth_route_1 = require("../modules/Auth/auth.route");
const product_routes_1 = require("../modules/Product/product.routes");
const order_routes_1 = require("../modules/Order/order.routes");
const cart_routes_1 = require("../modules/Cart/cart.routes");
const router = (0, express_1.Router)();
const modulesRoutes = [
    {
        path: '/categories',
        router: category_routes_1.categoryRoutes,
    },
    {
        path: '/reviews',
        router: review_routes_1.reviewRoutes,
    },
    {
        path: '/auth',
        router: auth_route_1.AuthRoute,
    },
    {
        path: '/product',
        router: product_routes_1.productRoutes,
    },
    {
        path: '/order',
        router: order_routes_1.orderRoutes,
    },
    {
        path: '/cart',
        router: cart_routes_1.cartRoutes,
    },
];
modulesRoutes.forEach((route) => router.use(route.path, route.router));
exports.default = router;
