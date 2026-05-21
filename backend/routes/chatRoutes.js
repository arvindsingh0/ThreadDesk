import express from "express";
import {
  askPublicQuestion,
  askQuestion,
} from "../controllers/chatController.js";
import protect from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/public", askPublicQuestion);
router.post("/", protect, askQuestion);

export default router;
