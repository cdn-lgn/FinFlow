import mongoose from "mongoose";

async function connectDB() {
  try {
    const connection = mongoose.connect(process.env.MONGO_URI);

    console.log("=//=//=//=== connected to DB  ===//=//=//=");
  } catch (error) {
    console.log("error ---> ", error);
    process.exit(1);
  }
}

export default connectDB
