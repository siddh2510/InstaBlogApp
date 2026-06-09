import express from 'express';
import cors from 'cors';
import path from 'path';
import { fileURLToPath } from 'url';
import dotenv from 'dotenv';
import connectDb from './config/db.js';
import userRoutes from './routes/userRoutes.js';
import postRoutes from './routes/postRoutes.js';

const PORT = process.env.PORT || 5000;
dotenv.config();

const app = express();
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));
app.use('/uploads', express.static(path.join(__dirname, 'config', 'uploads')));

app.use('/api/users', userRoutes);
app.use('/api/posts', postRoutes);

app.use((req, res) => {
  res.status(404).json({ success: false, message: 'Route not found' });
});

connectDb();

app.listen(PORT, () => {
  console.log(`Server is running on ${PORT}`);
});