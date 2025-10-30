import mongoose from "mongoose";
import path from "path";
import dotenv from "dotenv";
dotenv.config({
  path: path.resolve(__dirname, '..', '.env')
});

const MONGO_URI = process.env.MONGO_URI || "mystring";
export const connectDB = async() => {
  try {
    console.log("Attempting to connect with URI:", MONGO_URI);
    await mongoose.connect(MONGO_URI);
    console.log("MongoDB connected");
  } catch (err) {
    console.log("MongoDB connection error:", err);
    process.exit(1);
  }
} 