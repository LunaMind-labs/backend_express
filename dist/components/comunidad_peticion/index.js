"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const controller_1 = require("./controller");
const comunidadRouter = (0, express_1.Router)();
comunidadRouter.post("/pedidosC", controller_1.pedidosC);
exports.default = comunidadRouter;
