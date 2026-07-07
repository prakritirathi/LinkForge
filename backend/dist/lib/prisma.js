"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("dotenv/config");
const client_1 = require("@prisma/client");
const adapter_pg_1 = require("@prisma/adapter-pg");
const databaseUrl = process.env.DATABASE_URL;
if (!databaseUrl) {
    throw new Error("DATABASE_URL is not set");
}
const adapter = new adapter_pg_1.PrismaPg({
    connectionString: databaseUrl,
});
const prisma = new client_1.PrismaClient({
    adapter,
});
exports.default = prisma;
