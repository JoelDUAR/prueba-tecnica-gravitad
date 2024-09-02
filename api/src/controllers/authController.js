"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.signUp = exports.validationUser = void 0;
const User_1 = __importDefault(require("../models/User"));
const crypto_js_1 = __importDefault(require("crypto-js"));
const validationUser = async (username, password) => {
    const validatedUser = await User_1.default.findOne({ username });
    if (!validatedUser) {
        throw new Error('Invalid username');
    }
    const userPassword = crypto_js_1.default.SHA256(password).toString();
    let PasswordsMatched = userPassword === validatedUser.password;
    if (!PasswordsMatched) {
        throw new Error('Invalid password');
    }
    return validatedUser;
};
exports.validationUser = validationUser;
const signUp = async (username, password) => {
    let encryptedPassword = crypto_js_1.default.SHA256(password).toString();
    const newUser = new User_1.default({ username, password: encryptedPassword });
    await newUser.save();
    return newUser;
};
exports.signUp = signUp;
