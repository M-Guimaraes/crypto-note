import 'reflect-metadata';
import express from 'express';
import cookieParser from 'cookie-parser';
import rateLimit from 'express-rate-limit';

import transactionRoutes from '@/interfaces/http/routes/transaction.route';
import authRoutes from '@/interfaces/http/routes/auth.route';

import { errorHandler } from '@/interfaces/http/middlewares/error-handler';

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // Limit each IP to 100 requests per windowMs
});

const app = express();

app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));
app.use(limiter);

app.use('/api', transactionRoutes);
app.use('/api', authRoutes);

app.use(errorHandler);

const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log(`🚀 Server running at http://localhost:${port}`);
});
