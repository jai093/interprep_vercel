// Environment variables are automatically available in Vercel
// No need to load dotenv in production

// Validate required environment variables
const requiredEnvVars = [
  'JWT_SECRET',
  'JWT_REFRESH_SECRET',
  'MONGODB_URI',
  'GEMINI_API_KEY'
];

const missingEnvVars = requiredEnvVars.filter(varName => !process.env[varName]);

if (missingEnvVars.length > 0) {
  console.error('❌ Missing required environment variables:', missingEnvVars.join(', '));
  console.error('Please check your Vercel environment variables and ensure all required variables are set.');
  // Don't exit in serverless environment, just log the error
}

export const JWT_CONFIG = {
  secret: process.env.JWT_SECRET || 'your-secret-key-change-in-production',
  expiresIn: process.env.JWT_EXPIRES_IN || '7d',
  refreshSecret: process.env.JWT_REFRESH_SECRET || 'your-refresh-secret-key-change-in-production',
  refreshExpiresIn: process.env.JWT_REFRESH_EXPIRES_IN || '30d',
};

export const SERVER_CONFIG = {
  port: process.env.PORT || 5000,
  nodeEnv: process.env.NODE_ENV || 'development',
  corsOrigin: process.env.CORS_ORIGIN || 'http://localhost:3000,http://localhost:3001,http://localhost:5173',
};
