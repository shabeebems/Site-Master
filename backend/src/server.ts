import dotenv from 'dotenv';
dotenv.config();

import express from "express";
import cron from "node-cron"
import cors from 'cors';
import connectDB from "./config/db";
import authRoutes from "./routes/authRoutes";
import contractorRoutes from "./routes/contractorRoutes";
import cookieParser from 'cookie-parser';
import { cronJob } from './utils/cron';
// import { errorHandling } from './middlewares/errorHandling';


connectDB();
const app = express();
const PORT = process.env.PORT;

cron.schedule("* * * * *", cronJob)

app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ limit: '10mb', extended: true }));

app.use(cookieParser());
// app.use(express.json());
app.use(cors({
  origin: 'http://localhost:3000',
  credentials: true
}));

app.use('/api/auth', authRoutes);
app.use('/api/contractor', contractorRoutes);

// app.use(errorHandling)

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
