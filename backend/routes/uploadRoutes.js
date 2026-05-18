import express from "express";
import upload from "../middleware/uploadMiddleware.js";
import { uploadDocument } from "../controllers/uploadController.js";

const router = express.Router();

router.post("/", upload.single("pdf"), uploadDocument);

export default router;