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
exports.findAll = exports.login = exports.signup = void 0;
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
        const new_orga = {
            name: data.name,
            description: data.description,
            work_area: data.work_area,
            web_page: data.web_page,
            ruc: data.ruc,
            email: data.email,
            contact_name: data.contact_name,
            contact_number: data.contact_number,
            city: data.city,
            location: data.location,
            business_name: data.business_name,
            password: encrypted_password,
            last_session: new Date(data.last_session),
        };
        const orga = yield datasource_1.default.orga.create({ data: new_orga });
        const token = jsonwebtoken_1.default.sign({ id: orga.id, email: orga.email }, secret_key, {
            expiresIn: 86400
        });
        res.status(201).json({ ok: true, message: "organization created successfully", data: orga, token: token });
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
        const orga = yield datasource_1.default.orga.findUnique({ where: { email: email } });
        if (orga == null) {
            res.status(400).json({ ok: false, message: "Incorrect email" });
        }
        else {
            const is_valid = yield bcrypt_1.default.compare(password, orga.password);
            if (is_valid) {
                const token = jsonwebtoken_1.default.sign({ id: orga.id, email: orga.email }, secret_key, {
                    expiresIn: 86400
                });
                res.status(201).json({ ok: true, message: "Login succesful", data: orga, token: token });
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
const findAll = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        if ((0, authenticate_1.verify_authentication)(req, secret_key)) {
            const orgas = yield datasource_1.default.orga.findMany();
            res.status(200).json({
                ok: true,
                data: orgas,
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
