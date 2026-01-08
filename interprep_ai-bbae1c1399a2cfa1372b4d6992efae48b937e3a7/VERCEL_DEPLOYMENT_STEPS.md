# 🚀 Vercel Deployment Steps

## ✅ Pre-Deployment Checklist
- [x] Application working locally
- [x] Production builds successful
- [x] Environment variables prepared
- [x] Vercel configuration ready

## 📋 Deployment Steps

### Method 1: GitHub Integration (Recommended)

#### Step 1: Push to GitHub
```bash
# Initialize git repository (if not already done)
git init
git add .
git commit -m "Initial commit - ready for deployment"

# Create GitHub repository and push
git remote add origin https://github.com/yourusername/interprepai.git
git branch -M main
git push -u origin main
```

#### Step 2: Connect to Vercel
1. Go to [vercel.com](https://vercel.com)
2. Sign up/Login with GitHub
3. Click "New Project"
4. Import your GitHub repository
5. Configure project settings:
   - **Framework Preset**: Vite
   - **Build Command**: `npm run build && npm run build:backend`
   - **Output Directory**: `dist`
   - **Install Command**: `npm install`

#### Step 3: Add Environment Variables
In Vercel Dashboard → Settings → Environment Variables, add:

```
VITE_GEMINI_API_KEY=AIzaSyCRIyyGgC24d7kBqTZ-i-1AToloRxqKrpg
GEMINI_API_KEY=AIzaSyCRIyyGgC24d7kBqTZ-i-1AToloRxqKrpg
MONGODB_URI=mongodb+srv://ssanjay67372_db_user:q5dREEI9nSYdgjPD@cluster0.uouykyr.mongodb.net/InterprepAI?retryWrites=true&w=majority&appName=InterprepAI
JWT_SECRET=be3e70c929164df8d725ef858313df0959ad534503b282cfd4a9e8a486899de4
JWT_EXPIRES_IN=7d
JWT_REFRESH_SECRET=eddf0bea1fc3ee477c489588c302a942dcb2e8090f3373888c4279d267b46f1d
JWT_REFRESH_EXPIRES_IN=30d
NODE_ENV=production
CORS_ORIGIN=https://your-project-name.vercel.app
VITE_API_URL=
```

#### Step 4: Deploy
1. Click "Deploy"
2. Wait for build to complete
3. Get your deployment URL

#### Step 5: Update CORS Origin
1. Copy your Vercel deployment URL
2. Update `CORS_ORIGIN` environment variable with your actual URL
3. Redeploy

### Method 2: Vercel CLI

#### Step 1: Login to Vercel
```bash
vercel login
# Follow the prompts to authenticate
```

#### Step 2: Deploy
```bash
vercel --prod
# Follow the prompts to configure your project
```

## 🧪 Post-Deployment Testing

### 1. Health Check
Visit: `https://your-app.vercel.app/api/health`
Expected: `{"status": "Server is running"}`

### 2. Frontend Test
Visit: `https://your-app.vercel.app`
Expected: Landing page loads without errors

### 3. API Test
Test registration: `POST https://your-app.vercel.app/api/auth/register`

### 4. Database Connection
Check Vercel function logs for MongoDB connection success

## 🔧 Troubleshooting

### Build Failures
- Check build logs in Vercel dashboard
- Ensure all dependencies are in package.json
- Verify environment variables are set

### API Errors
- Check function logs in Vercel dashboard
- Verify MongoDB connection string
- Check CORS configuration

### Frontend Issues
- Check browser console for errors
- Verify API endpoints are accessible
- Check network tab for failed requests

## 📊 Performance Monitoring

After deployment, monitor:
- Function execution time
- Database connection performance
- Frontend loading speed
- Error rates in logs

## 🔄 Continuous Deployment

Once connected to GitHub:
- Every push to main branch triggers automatic deployment
- Preview deployments for pull requests
- Rollback capability through Vercel dashboard

## ✅ Success Indicators

Your deployment is successful when:
- [ ] Build completes without errors
- [ ] Health endpoint returns 200
- [ ] Frontend loads correctly
- [ ] User registration works
- [ ] Database operations succeed
- [ ] No console errors

## 🎉 You're Live!

Once deployed, your InterprepAI application will be available at:
`https://your-project-name.vercel.app`

Share this URL to start using your AI-powered interview platform!