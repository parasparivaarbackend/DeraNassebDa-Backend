import mongoose from "mongoose";


export const connectDB = async () => {
  try {
    await mongoose
      .connect(`${process.env.MONGODB_URL}`, {
        dbName: "DeraNassebDa",
      })
      .then((res) => console.log("MongoDB connected successfully"))
      .catch("Error in connecting to mongoDB");
  } catch (error) {
    console.log(error);
  }
};
