import express from 'express';
import dotenv from 'dotenv';
import connectDB from './config/database.js';
import authRoutes from './routes/authRoutes.js';
import userRoutes from './routes/postRoutes.js';
import requestCounter from './middlewares/requestCounter.js';
import rateLimiter from './middlewares/rateLimiter.js';
import errorCounter from './middlewares/errorCounter.js';
import responseTimeChecker from './middlewares/resposeTimeCounter.js';

dotenv.config();
const app = express();

// Connect Database
connectDB();

// Init Middleware
app.use(express.json(), requestCounter, rateLimiter, errorCounter, responseTimeChecker); 

// Define Routes
app.use('/api/v1/auth', authRoutes);
app.use('/api/v1/users', userRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
