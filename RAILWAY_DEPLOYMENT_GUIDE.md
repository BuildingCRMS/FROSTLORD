# 🚀 Railway Deployment Guide - Both Frontend & Backend

## 📋 Prerequisites
- ✅ Railway account created
- ✅ GitHub repository connected to Railway
- ✅ Project structure configured (completed above)

## 🚀 Step 1: Railway Project Setup

### 1.1 Create New Railway Project
1. **Go to [railway.app](https://railway.app)**
2. **Click "New Project"**
3. **Choose "Deploy from GitHub repo"**
4. **Select your FROSTLORD repository**
5. **Click "Deploy"**

### 1.2 Configure Root Directory
1. **In your Railway project dashboard**
2. **Go to Settings → General**
3. **Set Root Directory to: `.` (leave empty or just `.`)**
4. **This tells Railway to deploy from the root directory**

## 🗄️ Step 2: Add Database Services

### 2.1 Add PostgreSQL Database
1. **In Railway dashboard, click "New"**
2. **Choose "Database" → "PostgreSQL"**
3. **Wait for it to be created**
4. **Copy the DATABASE_URL from "Connect" tab**

### 2.2 Add Redis Database
1. **Click "New" again**
2. **Choose "Database" → "Redis"**
3. **Wait for it to be created**
4. **Copy the REDIS_URL from "Connect" tab**

## 🔧 Step 3: Set Environment Variables

### 3.1 Go to Variables Tab
1. **In your Railway project dashboard**
2. **Click on "Variables" tab**

### 3.2 Add Required Variables
Add these one by one:

```bash
# Database URLs (copy from Step 2)
DATABASE_URL=postgres://... (from PostgreSQL)
REDIS_URL=redis://... (from Redis)

# Security (generate random strings)
JWT_SECRET=your-64-character-random-string
COOKIE_SECRET=your-32-character-random-string

# Environment
NODE_ENV=production

# Medusa URLs (update with your actual Railway URL)
MEDUSA_BACKEND_URL=https://your-app-name.railway.app
ADMIN_CORS=https://your-app-name.railway.app
STORE_CORS=https://your-app-name.railway.app
```

### 3.3 Generate Secret Keys
If you don't have secret keys, use these commands:
```bash
# JWT_SECRET (64 characters)
openssl rand -hex 32

# COOKIE_SECRET (32 characters)
openssl rand -hex 16
```

## 🚀 Step 4: Deploy

### 4.1 Trigger Deployment
1. **After setting all variables, go to "Deployments" tab**
2. **Click "Deploy" or push new code to GitHub**
3. **Wait for build to complete**

### 4.2 Monitor Build Process
Watch the build logs for:
- ✅ Dependencies installed
- ✅ Backend built successfully
- ✅ Frontend built successfully
- ✅ Both services started

## 🔍 Step 5: Verify Deployment

### 5.1 Check Backend Health
1. **Go to your Railway app URL**
2. **Add `/health` to the end**
3. **Should return a health status**

### 5.2 Check Frontend
1. **Your Railway app should show the frontend**
2. **Both services should be running on the same domain**

## 🚨 Troubleshooting

### Build Fails
- Check that all environment variables are set
- Verify Root Directory is set to `.` (root)
- Check build logs for specific errors

### Database Connection Fails
- Verify DATABASE_URL and REDIS_URL are correct
- Check that database services are running
- Ensure JWT_SECRET and COOKIE_SECRET are set

### Frontend Errors
- Check that all frontend dependencies are in package.json
- Verify build process completes successfully

## 🎯 Expected Result

After successful deployment:
- **Backend**: Running on Railway with PostgreSQL + Redis
- **Frontend**: Served from Railway, connected to backend
- **Single URL**: Both services accessible from one Railway domain
- **Auto-scaling**: Railway handles scaling automatically

## 📞 Need Help?

- Check Railway logs in the dashboard
- Verify all environment variables are set
- Ensure database services are running
- Check that Root Directory is set to `.`
