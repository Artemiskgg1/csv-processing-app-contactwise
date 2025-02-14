import express from "express";
import multer from "multer";
import path from "path";
import { processCSVFile } from "../controllers/csv.controller.js";
import { fileURLToPath } from "url";

const router = express.Router();
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const upload = multer({ dest: path.join(__dirname, "../../uploads") });

router.post("/upload", upload.single("file"), processCSVFile);

export default router;
