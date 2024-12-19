import express from 'express';
import connectDB from './config/db.js';
import authRoutes from './routes/authRoutes.js';
import blogRoutes from './routes/blogRoutes.js';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
app.use(express.json());

connectDB();

app.use('/api/auth', authRoutes);
app.use('/api/blogs', blogRoutes);

app.listen(process.env.PORT || 5000, () => {
  console.log(`Sunucu ${process.env.PORT || 5000} portunda çalışıyor`);
});
