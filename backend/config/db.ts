import mongoose from 'mongoose';

// Environment variables are automatically available in Vercel
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/interprepai';

export const connectDB = async (): Promise<void> => {
  try {
    // Check if already connected
    if (mongoose.connection.readyState === 1) {
      console.log('✓ MongoDB already connected');
      return;
    }

    // Disconnect if in connecting state
    if (mongoose.connection.readyState === 2) {
      await mongoose.disconnect();
    }

    await mongoose.connect(MONGODB_URI, {
      serverSelectionTimeoutMS: 10000, // Increased timeout for Vercel
      socketTimeoutMS: 45000,
      bufferCommands: false, // Disable mongoose buffering
    });
    console.log('✓ MongoDB connected successfully');
  } catch (error) {
    console.error('✗ MongoDB connection failed:', error);
    throw error;
  }
};

export const disconnectDB = async (): Promise<void> => {
  try {
    await mongoose.disconnect();
    console.log('✓ MongoDB disconnected successfully');
  } catch (error) {
    console.error('✗ MongoDB disconnection failed:', error);
  }
};

export default mongoose;
