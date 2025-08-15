import mongoose from "mongoose";
import dotenv from 'dotenv';

dotenv.config();

const MONGODB_URI = process.env.MONGODB_URI;

if (!MONGODB_URI) {
  throw new Error("Please define MONGODB_URI in .env file");
}

// Mongoose 6+ no longer requires these options as they are default.
// const connectionOptions = {
//   useNewUrlParser: true,
//   useUnifiedTopology: true,
//   connectTimeoutMS: 10000,
// };

async function connectDB() {
  if (mongoose.connection.readyState >= 1) {
    console.log("Using existing DB connection");
    return;
  }

  try {
    // We connect without the deprecated options object.
    await mongoose.connect(MONGODB_URI);
    console.log("MongoDB connected successfully");
  } catch (error) {
    console.error("MongoDB connection error:", error.message);
    process.exit(1);
  }
}

export default connectDB;