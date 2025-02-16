import Redis from "ioredis";
import dotenv from "dotenv";

dotenv.config(); // Load environment variables

const REDIS_HOST = process.env.REDIS_HOST || "localhost";
const REDIS_PORT = Number(process.env.REDIS_PORT) || 6379;

export const redisClient = new Redis.default({
  host: REDIS_HOST,
  port: REDIS_PORT,
});

redisClient.on("connect", () => console.log("✅ Redis connected"));
redisClient.on("error", (err) => console.error("❌ Redis error:", err));
