import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded())

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