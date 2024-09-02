"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.register = exports.login = void 0;
const authController_1 = require("../controllers/authController");
const errorHelper_1 = require("../helpers/errorHelper");
const { SECRET_KEY } = process.env;
const jwt = require('jsonwebtoken');
const login = async (req, res) => {
    const { username, password } = req.body;
    try {
        const userValidation = await (0, authController_1.validationUser)(username, password);
        const newToken = jwt.sign({ id: userValidation._id, username: userValidation.username }, SECRET_KEY, { expiresIn: '1m' });
        const userResponse = {
            user: userValidation.username,
            auth: true,
            jwt: newToken
        };
        res.json(userResponse);
    }
    catch (error) {
        (0, errorHelper_1.errorHelper)(res, 404, error.message);
    }
};
exports.login = login;
const register = async (req, res) => {
    const { username, password } = req.body;
    try {
        const newUser = await (0, authController_1.signUp)(username, password);
        res.status(201).json({ newUser });
    }
    catch (error) {
        (0, errorHelper_1.errorHelper)(res, 500, error.message);
    }
};
exports.register = register;
