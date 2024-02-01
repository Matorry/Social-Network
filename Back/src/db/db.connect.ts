import "dotenv/config";
import mongoose from "mongoose";

export const dbConnect = async () => {
  try {
    const user = process.env.DB_USER;
    const passwd = process.env.DB_PASSWD;
    const uri = `mongodb+srv://${user}:${passwd}@cluster0.kwgkdev.mongodb.net/simplesocialnetwork?retryWrites=true&w=majority`;
    await mongoose.connect(uri);
    console.log("Connected to MongoDB");
  } catch (error) {
    console.error(`Error connecting to MongoDB: ${error}`);
    throw error;
  }
};
