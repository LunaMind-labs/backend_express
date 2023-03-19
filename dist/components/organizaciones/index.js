"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const controller_1 = require("./controller");
const orgaRouter = (0, express_1.Router)();
orgaRouter.post("/signup", controller_1.signup);
orgaRouter.post("/login", controller_1.login);
exports.default = orgaRouter;
