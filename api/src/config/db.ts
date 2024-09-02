import mongoose from 'mongoose';
import dotenv from 'dotenv';
import { storeDataInDB } from '../controllers/charactersController';

dotenv.config();

const connectDB = async () => {
  try {
   
    await mongoose.connect(process.env.MONGO_URI!, {
      serverSelectionTimeoutMS: 1000, // Incrementa el timeout a 20 segundos
    });
    await storeDataInDB();
    console.log('Connected to MongoDB');
  } catch (error) {
    console.error((error as Error).message);
    process.exit(1);
  }
};

export default connectDB;