import mongoose from "mongoose";

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI);
    console.log("Database connected!!");
  } catch (error) {
    console.error(error.message);
    process.exit(1);
  }
};

export default connectDB;
