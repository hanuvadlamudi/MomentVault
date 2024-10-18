import mongoose from "mongoose";
const MONGO_URL = process.env.MONGO_URL;

export const connectDB = async()=>{mongoose.connect(MONGO_URL)
     .then(()=>{
        console.log("MongoDB connected successfully...");
     }).catch((err)=>{
        console.log("Error in MongoDB connection...",err)
     })
}
