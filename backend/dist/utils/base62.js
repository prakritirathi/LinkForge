"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.encodeBase62 = void 0;
const BASE62 = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
const encodeBase62 = (num) => {
    if (num === 0) {
        return "0";
    }
    let result = "";
    while (num > 0) {
        result = BASE62[num % 62] + result;
        num = Math.floor(num / 62);
    }
    return result;
};
exports.encodeBase62 = encodeBase62;
