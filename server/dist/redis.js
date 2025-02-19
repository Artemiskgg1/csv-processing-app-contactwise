import Redis from "ioredis";
import dotenv from "dotenv";
dotenv.config();
const isProduction = process.env.NODE_ENV === "production";
const redisUrl = isProduction
    ? process.env.REDIS_URL
    : "redis://localhost:6379";
export const redisClient = new Redis.default(redisUrl);
