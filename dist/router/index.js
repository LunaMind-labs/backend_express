"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.router = void 0;
const components_1 = require("../components");
const routes = [
    ["users", components_1.userRouter],
    ["organizaciones", components_1.orgaRouter],
    ["comunidades", components_1.comunidadRouter]
];
const router = (app) => {
    routes.forEach(([path, controller]) => app.use(`/api/v1/${path}`, controller));
};
exports.router = router;
