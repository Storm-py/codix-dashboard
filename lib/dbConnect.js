import mongoose from "mongoose";
const dbConnect = async () => {
  if (mongoose.connection.readyState >= 1) {
    console.log("mongodb is Already Connected!");
    return;
  }
  try {
    await mongoose.connect(process.env.MONGODB_URL);
    console.log("Mongodb is Now Connected");
  } catch (error) {
    console.log(error, "Error From Mongodb Connection Error");
  }
};
export default dbConnect;