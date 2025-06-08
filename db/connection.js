import mongoose from 'mongoose';
import { dbname } from '../service/constant.js';
export const connectdb = async(params) => {
    try {
        await mongoose.connect(`${process.env.MONGODB_URI}${dbname}`, {
            
        });
        console.log('Connected to MongoDB');
    } catch (error) {
        console.error('Error connecting to MongoDB:', error);
    }

}