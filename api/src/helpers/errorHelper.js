"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.errorHelper = void 0;
const errorHelper = async (res, status, error) => {
    return res.status(status).json({ auth: false, message: error });
};
exports.errorHelper = errorHelper;
