"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.verify_authentication = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
function verify_authentication(req, secret_key) {
    const usertoken = req.headers.authorization || '';
    let is_verified = true;
    jsonwebtoken_1.default.verify(usertoken, secret_key, (err, payload) => {
        if (err) {
            is_verified = false;
        }
    });
    return is_verified;
}
exports.verify_authentication = verify_authentication;
