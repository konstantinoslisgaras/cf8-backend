import mongoose from "mongoose";

export const connectDB = async() => {
  try {
    await mongoose.connect("mongodb+srv://kostas8:dlxTsOisB3fh6MS0@cluster0.l5o5nxa.mongodb.net/codingfactory?retryWrites=true&w=majority");
    console.log("MongoDB connected");
  } catch (err) {
    console.log("MongoDB connection error:", err);
    process.exit(1);
  }
} 