import mongoose from "mongoose";
import config from "./config.js";

const connectDB = async () => {
  try {
    await mongoose.connect(config.MONGO_URI);
    console.log("MongoDB Connected successfully");
  } catch (error) {
    console.warn("[MongoDB Notice]: Connection failed (Check connection string or network whitelist):", error.message);
  }
};

export default connectDB;
