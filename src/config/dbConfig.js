import mongoose from "mongoose";

export const dbConnection = async () => {
  try {
    const connection = await mongoose.connect(process.env.MONGO);
    connection
      ? console.log("MongoDb is connected")
      : console.log("Cannot connect");
  } catch (error) {
    console.log(error);
    throw error;
  }
};
