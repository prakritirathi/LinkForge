"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class HealthService {
    getHealth() {
        return {
            status: "OK",
            message: "LinkForge API is running",
        };
    }
}
exports.default = new HealthService();
