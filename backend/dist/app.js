"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const health_routes_1 = __importDefault(require("./routes/health.routes"));
const auth_routes_1 = __importDefault(require("./routes/auth.routes"));
const url_routes_1 = __importDefault(require("./routes/url.routes"));
const error_middleware_1 = __importDefault(require("./middleware/error.middleware"));
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.use((0, cookie_parser_1.default)());
app.use("/health", health_routes_1.default);
app.use("/api/v1/auth", auth_routes_1.default);
app.use("/api/v1/url", url_routes_1.default);
app.use(error_middleware_1.default);
exports.default = app;
