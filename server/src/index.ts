import express, { Application } from "express";
import cors from "cors";
import dotenv from "dotenv";
import csvRoutes from "./routes/csv.route.js";
import { initQueueWorker } from "./jobs/worker.js";

dotenv.config();

const app: Application = express();
const PORT = process.env.PORT || 7000;

app.use(cors());
app.use(express.json());

// CSV File Routes
app.use("/api/csv", csvRoutes);

// Start Queue Worker
initQueueWorker();

app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});
