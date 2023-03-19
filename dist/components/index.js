"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.comunidadRouter = exports.orgaRouter = exports.userRouter = void 0;
var user_1 = require("./user");
Object.defineProperty(exports, "userRouter", { enumerable: true, get: function () { return __importDefault(user_1).default; } });
var organizaciones_1 = require("./organizaciones");
Object.defineProperty(exports, "orgaRouter", { enumerable: true, get: function () { return __importDefault(organizaciones_1).default; } });
var comunidad_peticion_1 = require("./comunidad_peticion");
Object.defineProperty(exports, "comunidadRouter", { enumerable: true, get: function () { return __importDefault(comunidad_peticion_1).default; } });
