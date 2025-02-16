import Queue from "bull";
import axios from "axios";
import { redisClient } from "../redis.js";
import dotenv from "dotenv";

dotenv.config();

export const csvQueue = new Queue("csvQueue", {
  redis: {
    host: process.env.REDIS_HOST || "localhost",
    port: Number(process.env.REDIS_PORT) || 6379,
  },
});

const isWorkerInitialized = false; // Prevent multiple registrations

export const initQueueWorker = () => {
  if (isWorkerInitialized) {
    console.log("⚠️ Queue worker already initialized. Skipping.");
    return;
  }

  csvQueue.process(async (job) => {
    try {
      const { name, email } = job.data;
      const response = await axios.post(
        "https://jsonplaceholder.typicode.com/users",
        { name, email }
      );
      console.log(`✅ User ${name} added: `, response.data);
    } catch (error) {
      console.error(
        `❌ Error processing user ${job.data.name}:`,
        error.message
      );
    }
  });

  console.log("✅ Queue worker initialized.");
};
