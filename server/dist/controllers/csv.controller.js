import fs from "fs";
import csv from "csv-parser";
import { csvQueue } from "../jobs/worker.js";
export const processCSVFile = async (req, res) => {
    if (!req.file) {
        await res.status(400).json({ error: "No file uploaded" });
        return;
    }
    const filePath = req.file.path;
    const results = [];
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
