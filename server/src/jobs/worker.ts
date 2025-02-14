import Queue from "bull";
import axios from "axios";
import { redisClient } from "../redis.js";

export const csvQueue = new Queue("csvQueue", {
  redis: { host: "redis", port: 6379 },
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
