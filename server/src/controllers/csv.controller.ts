import { Request, Response } from "express";
import fs from "fs";
import csv from "csv-parser";
import { csvQueue } from "../jobs/worker.js";

// Extend Request type to include multer's file property
interface MulterRequest extends Request {
  file?: Express.Multer.File;
}

export const processCSVFile = async (
  req: MulterRequest,
  res: Response
): Promise<void> => {
  if (!req.file) {
    await res.status(400).json({ error: "No file uploaded" });
    return;
  }

  const filePath = req.file.path;
  const results: { name: string; email: string }[] = [];

  fs.createReadStream(filePath)
    .pipe(csv())
    .on("data", (data) => results.push(data))
    .on("end", async () => {
      for (const user of results) {
        await csvQueue.add(user);
        console.log(`📌 Job added for ${user.name} - ${user.email}`);
      }

      res
        .status(200)
        .json({ message: "CSV uploaded successfully. Processing started." });
    });
};
