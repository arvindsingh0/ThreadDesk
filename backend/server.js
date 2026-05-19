import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import uploadRoutes from "./routes/uploadRoutes.js";
import rateLimit from "express-rate-limit";
import chatRoutes from "./routes/chatRoutes.js";
import authRoutes from "./routes/authRoutes.js";

dotenv.config();

const app = express();

const limiter = rateLimit({

  windowMs: 15 * 60 * 1000,

  max: 150,

  message: {
    success: false,
    message: "Too many requests. Please try again later.",
  },

});

app.use(cors({
  origin: true,
  credentials: true,
}));

app.use(limiter);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/api/upload", uploadRoutes);
app.use("/api/chat", chatRoutes);
app.use("/api/auth", authRoutes);

const PORT = process.env.PORT || 5001;

/* TEST ROUTE */
app.get("/", (req, res) => {
  res.send("ThreadDesk backend running...");
});

/* DATABASE CONNECTION */
const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);

    console.log("MongoDB Connected");

    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });

  } catch (error) {

    console.log("Mongo connection failed, retrying...");
    console.log(error.message);

    setTimeout(connectDB, 5000);
  }
};

connectDB();