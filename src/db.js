import mongoose from "mongoose";
import dotenv from 'dotenv/config';


export const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URL)
        console.log('DB is connected');
    } catch (error) {
        console.log(error);
        console.log('DB is not connected');
    }
};