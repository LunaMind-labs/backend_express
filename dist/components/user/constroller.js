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
exports.update = exports.findAll = exports.remove = exports.login = exports.signup = void 0;
const bcrypt_1 = __importDefault(require("bcrypt"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const datasource_1 = __importDefault(require("../../datasource"));
const authenticate_1 = require("../authenticate");
const secret_key = process.env.SECRET_KEY || 'Alguna llave secreta';
const signup = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const data = req.body;
        data.last_session = data.last_session || null;
        const encrypted_password = yield bcrypt_1.default.hash(data.password, 10);
        const new_user = {
            name: data.name,
            dni: data.dni,
            career: data.career,
            city: data.city,
            email: data.email,
            phone_number: data.phone_number,
            password: encrypted_password,
            last_session: new Date(data.last_session),
        };
        const user = yield datasource_1.default.user.create({ data: new_user });
        const token = jsonwebtoken_1.default.sign({ id: user.id, email: user.email }, secret_key, {
            expiresIn: 86400
        });
        res.status(201).json({ ok: true, message: "User created successfully", data: user, token: token });
    }
    catch (error) {
        console.log(error);
        res.status(500).json({ ok: false, message: error });
    }
});
exports.signup = signup;
const login = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { email, password } = req.body;
        const user = yield datasource_1.default.user.findUnique({ where: { email: email } });
        if (user == null) {
            res.status(400).json({ ok: false, message: "Incorrect email" });
        }
        else {
            const is_valid = yield bcrypt_1.default.compare(password, user.password);
            if (is_valid) {
                const token = jsonwebtoken_1.default.sign({ id: user.id, email: user.email }, secret_key, {
                    expiresIn: 86400
                });
                res.status(201).json({ ok: true, message: "Login succesful", data: user, token: token });
            }
            else {
                res.status(400).json({ ok: false, message: "Incorrect password" });
            }
        }
    }
    catch (error) {
        res.status(500).json({ ok: false, message: error });
    }
});
exports.login = login;
const remove = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = Number(req.params.idUser);
        yield datasource_1.default.user.delete({
            where: { id },
        });
        res.status(204).json({ ok: true, body: "", message: "User deleted" });
    }
    catch (error) {
        res.status(500).json({ ok: false, body: error, message: "Server Error" });
    }
});
exports.remove = remove;
const findAll = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        if ((0, authenticate_1.verify_authentication)(req, secret_key)) {
            const users = yield datasource_1.default.user.findMany();
            res.status(200).json({
                ok: true,
                data: users,
            });
        }
        else {
            res.status(400).json({ ok: false, message: 'Authentication failed' });
        }
    }
    catch (error) {
        res.status(500).json({ ok: false, message: error });
    }
});
exports.findAll = findAll;
const update = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = Number(req.params.idUser);
        const user = yield datasource_1.default.user.update({
            where: { id },
            data: req.body,
        });
        res.json({
            ok: true,
            body: user,
            message: "User updated successfully",
        });
    }
    catch (error) {
        res.status(500).json({ ok: false, body: error, message: "Server Error" });
    }
});
exports.update = update;
