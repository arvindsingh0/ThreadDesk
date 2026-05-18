import express from "express";

import upload from "../middleware/uploadMiddleware.js";
import protect from "../middleware/authMiddleware.js";

import {
  uploadDocument,
} from "../controllers/uploadController.js";

const router = express.Router();

router.post(
  "/",
  protect,
  upload.single("pdf"),
  uploadDocument
);

export default router;