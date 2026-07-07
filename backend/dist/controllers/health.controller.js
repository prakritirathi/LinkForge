"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const health_services_1 = __importDefault(require("../services/health.services"));
class HealthController {
    getHealth(req, res) {
        const health = health_services_1.default.getHealth();
        res.status(200).json(health);
    }
}
exports.default = new HealthController();
