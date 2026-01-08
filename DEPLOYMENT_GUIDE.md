# 🚀 Deployment Guide - InterprepAI

## ✅ Application Status
**All critical issues have been resolved!** The application is now ready for deployment with:
- ✅ Fixed build configurations
- ✅ Added missing TypeScript dependencies
- ✅ Environment variable validation
- ✅ Error boundary for React components
- ✅ Security improvements (placeholder credentials)
- ✅ Both frontend and backend builds working

## 🔧 Pre-Deployment Setup

### 1. Environment Variables Setup

**IMPORTANT**: Replace all placeholder values with your actual credentials:

```bash
# Get your Gemini API key from: https://aistudio.google.com/apikey
VITE_GEMINI_API_KEY=your-actual-gemini-api-key
GEMINI_API_KEY=your-actual-gemini-api-key

# MongoDB Atlas connection string
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/database

# Generate strong JWT secrets (use a tool like: openssl rand -hex 32)
JWT_SECRET=your-strong-jwt-secret-here
JWT_REFRESH_SECRET=your-strong-refresh-secret-here

# For production deployment
NODE_ENV=production
CORS_ORIGIN=https://your-vercel-app.vercel.app
```

### 2. MongoDB Atlas Configuration

1. **Network Access**: Add `0.0.0.0/0` to allow Vercel serverless functions
2. **Database User**: Ensure your user has read/write permissions
3. **Connection String**: Use the format shown above

## 🌐 Vercel Deployment

### Option 1: Vercel CLI (Recommended)
```bash
# Install Vercel CLI
npm install -g vercel

# Deploy to production
vercel --prod
```

### Option 2: GitHub Integration
1. Push your code to GitHub
2. Connect repository to Vercel
3. Add environment variables in Vercel dashboard
4. Deploy automatically on push

### Environment Variables in Vercel Dashboard

Go to your Vercel project → Settings → Environment Variables and add:

```
VITE_GEMINI_API_KEY=your-actual-gemini-api-key
GEMINI_API_KEY=your-actual-gemini-api-key
MONGODB_URI=your-mongodb-connection-string
JWT_SECRET=your-strong-jwt-secret
JWT_EXPIRES_IN=7d
JWT_REFRESH_SECRET=your-strong-refresh-secret
JWT_REFRESH_EXPIRES_IN=30d
NODE_ENV=production
CORS_ORIGIN=https://your-vercel-app.vercel.app
VITE_API_URL=
```

## 🧪 Testing After Deployment

### 1. Health Check
Visit: `https://your-app.vercel.app/api/health`
Expected response: `{"status": "Server is running"}`

### 2. Frontend Loading
Visit: `https://your-app.vercel.app`
Should load the landing page without errors

### 3. API Endpoints
Test these endpoints:
- `POST /api/auth/register` - User registration
- `POST /api/auth/login` - User login
- `GET /api/candidate/profile` - Protected route (requires auth)

## 🔍 Troubleshooting

### Common Issues:

1. **Environment Variables Not Loading**
   - Ensure all variables are set in Vercel dashboard
   - Redeploy after adding variables

2. **MongoDB Connection Errors**
   - Check network access settings (0.0.0.0/0)
   - Verify connection string format
   - Ensure database user has proper permissions

3. **CORS Errors**
   - Update `CORS_ORIGIN` to match your Vercel domain
   - Redeploy after updating

4. **Build Failures**
   - Check build logs in Vercel dashboard
   - Ensure all dependencies are in package.json

## 📊 Performance Optimizations

The application includes several optimizations:
- Code splitting warnings (consider implementing for large bundles)
- Error boundaries for graceful error handling
- Environment variable validation
- Proper CORS configuration
- MongoDB connection pooling

## 🔒 Security Features

- JWT token authentication
- Password hashing with bcrypt
- Helmet.js security headers
- CORS protection
- Input validation with express-validator
- Environment variable validation

## 🚀 Local Development

To run locally:
```bash
# Install dependencies
npm install

# Start development servers
npm run dev

# Or start individually:
npm run dev:client  # Frontend on port 3000
npm run dev:server  # Backend on port 5000
```

## 📝 Build Commands

```bash
# Build frontend
npm run build

# Build backend
npm run build:backend

# Build both (for Vercel)
npm run build && npm run build:backend
```

## ✅ Deployment Checklist

- [ ] Replace all placeholder environment variables
- [ ] Configure MongoDB Atlas network access
- [ ] Set up Vercel environment variables
- [ ] Test health endpoint after deployment
- [ ] Verify frontend loads correctly
- [ ] Test user registration/login flow
- [ ] Check browser console for errors
- [ ] Test API endpoints with authentication

Your application is now production-ready! 🎉