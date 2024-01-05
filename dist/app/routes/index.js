"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const category_routes_1 = require("../modules/Category/category.routes");
const course_routes_1 = require("../modules/Course/course.routes");
const review_routes_1 = require("../modules/Review/review.routes");
const courses_routes_1 = require("../modules/Course/courses.routes");
const auth_route_1 = require("../modules/Auth/auth.route");
const router = (0, express_1.Router)();
const modulesRoutes = [
    {
        path: '/categories',
        router: category_routes_1.categoryRoutes,
    },
    {
        path: '/course',
        router: course_routes_1.coursesRoutes,
    },
    {
        path: '/courses',
        router: courses_routes_1.coursesCustomRoutes,
    },
    {
        path: '/reviews',
        router: review_routes_1.reviewRoutes,
    },
    {
        path: '/auth',
        router: auth_route_1.AuthRoute,
    },
];
modulesRoutes.forEach((route) => router.use(route.path, route.router));
exports.default = router;
