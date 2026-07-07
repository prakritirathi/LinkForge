"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.login = exports.signup = void 0;
const auth_service_1 = require("../services/auth.service");
const signup = async (req, res) => {
    const { name, email, password } = req.body;
    const result = await (0, auth_service_1.signup)({
        name,
        email,
        password,
    });
    return res.status(200).json(result);
};
exports.signup = signup;
const login = async (req, res) => {
    const { email, password } = req.body;
    const result = await (0, auth_service_1.login)({
        email,
        password,
    });
    return res.status(result.success ? 200 : 401).json(result);
};
exports.login = login;
