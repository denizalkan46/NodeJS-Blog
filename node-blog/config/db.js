import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log('MongoDB bağlandı');
  } catch (err) {
    console.error('MongoDB bağlantı hatası:', err);
    process.exit(1);
  }
};

export default connectDB;
