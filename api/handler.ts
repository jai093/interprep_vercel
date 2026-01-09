import { VercelRequest, VercelResponse } from '@vercel/node';
import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import mongoose from 'mongoose';
import { connectDB } from '../backend/config/db';

// Routes
import authRoutes from '../backend/routes/authRoutes';
import candidateRoutes from '../backend/routes/candidateRoutes';
import recruiterRoutes from '../backend/routes/recruiterRoutes';
import assessmentRoutes from '../backend/routes/assessmentRoutes';

// Environment variables are automatically available in Vercel
// No need to load .env.local in production

const app = express();

// Middleware
app.use(helmet({
  contentSecurityPolicy: false, // Disable CSP for API routes
}));

// Configure CORS
app.use(cors({
  origin: (origin, callback) => {
    // Allow requests with no origin (like mobile apps or curl requests)
    if (!origin) return callback(null, true);

    const allowedOrigins = [
      process.env.CORS_ORIGIN,
      process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : null,
      'http://localhost:3000',
      'http://localhost:3001',
      'http://localhost:5173'
    ].filter(Boolean).map(s => String(s).split(',')).flat().map(s => s.trim());

    if (allowedOrigins.includes('*') || allowedOrigins.includes(origin)) {
      return callback(null, true);
    }

    // Allow any Vercel deployment subdomain
    if (origin && origin.endsWith('.vercel.app')) {
      return callback(null, true);
    }

    console.log(`CORS: Allowing origin: ${origin}`);
    return callback(null, true); // Allow all origins for now to debug
  },
  credentials: true,
}));

app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ limit: '50mb', extended: true }));

// Simplified logging for Vercel
app.use((req, res, next) => {
  console.log(`${req.method} ${req.path}`);
  next();
});

// Health check
app.get('/api/health', (req, res) => {
  res.status(200).json({ 
    status: 'Server is running',
    timestamp: new Date().toISOString(),
    env: process.env.NODE_ENV,
    mongoUri: process.env.MONGODB_URI ? 'Set' : 'Not Set'
  });
});

// DB Connection Middleware
app.use(async (req, res, next) => {
  try {
    if (mongoose.connection.readyState !== 1) {
      console.log('Connecting to MongoDB...');
      await connectDB();
      console.log('MongoDB connected successfully');
    }
    next();
  } catch (error) {
    console.error('Database Connection Error:', error);
    res.status(500).json({
      error: 'Database connection failed',
      details: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
});

// API Routes
app.use('/api/auth', authRoutes);
app.use('/api/candidate', candidateRoutes);
app.use('/api/recruiter', recruiterRoutes);
app.use('/api/assessments', assessmentRoutes);

// 404 handler
app.use('/api*', (req, res) => {
  res.status(404).json({ error: 'Route not found' });
});

// Global Error Handler
app.use((err: any, req: express.Request, res: express.Response, next: express.NextFunction) => {
  console.error('Unhandled API Error:', err);
  res.status(err.status || 500).json({
    error: err.message || 'Internal Server Error',
    details: process.env.NODE_ENV === 'development' ? err.stack : undefined
  });
});

export default app;
