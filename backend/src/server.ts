import dotenv from 'dotenv';
dotenv.config();

import express from "express";
import cors from 'cors';
import connectDB from "./config/db";
import authRoutes from "./routes/authRoutes";
import contractorRoutes from "./routes/contractorRoutes";
import cookieParser from 'cookie-parser';


connectDB();
const app = express();
const PORT = process.env.PORT;

app.use(cookieParser());
app.use(express.json());
app.use(cors({
  origin: 'http://localhost:3000',
  credentials: true
}));

app.use('/api/auth', authRoutes);
app.use('/api/contractor', contractorRoutes);

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
