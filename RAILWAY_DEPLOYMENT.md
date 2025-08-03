# 🚂 Railway Deployment Guide for FROSTLORD

## Overview

This guide will help you deploy your FROSTLORD Medusa backend to Railway, a modern platform for deploying applications with built-in PostgreSQL and Redis support.

## Prerequisites

1. **Railway Account**: Sign up at [railway.app](https://railway.app)
2. **GitHub Account**: Your code should be in a GitHub repository
3. **Domain** (optional): For custom domain setup

## Step 1: Prepare Your Repository

Ensure your backend directory structure is correct:
```
backend/
├── package.json
├── medusa-config.js
├── railway.json
└── src/
    ├── api/
    ├── subscribers/
    └── workflows/
```

## Step 2: Deploy to Railway

### Method 1: Railway Dashboard
1. Go to [railway.app](https://railway.app)
2. Click "New Project"
3. Select "Deploy from GitHub repo"
4. Choose your repository
5. Set the root directory to `backend`
6. Railway will automatically detect it's a Node.js project

### Method 2: Railway CLI
```bash
# Install Railway CLI
npm install -g @railway/cli

# Login to Railway
railway login

# Initialize project
railway init

# Deploy
railway up
```

## Step 3: Configure Environment Variables

In your Railway project dashboard, add these environment variables:

### Required Variables
```
DATABASE_URL=postgres://user:password@host:port/database
REDIS_URL=redis://user:password@host:port
JWT_SECRET=your_very_long_random_secret_key
COOKIE_SECRET=your_very_long_random_cookie_secret
NODE_ENV=production
```

### Optional Variables
```
MEDUSA_BACKEND_URL=https://your-app.railway.app
STORE_CORS=https://your-frontend-domain.com
ADMIN_CORS=https://your-frontend-domain.com
AUTH_CORS=https://your-frontend-domain.com
```

## Step 4: Add Database and Redis

### Option A: Railway's Built-in Services
1. In your Railway project, click "New"
2. Select "Database" → "PostgreSQL"
3. Select "Database" → "Redis"
4. Railway will automatically link them to your app

### Option B: External Services
- **PostgreSQL**: Use Railway, Supabase, or any PostgreSQL provider
- **Redis**: Use Railway, Upstash, or any Redis provider

## Step 5: Deploy and Verify

1. **Deploy**: Railway will automatically deploy when you push to your main branch
2. **Check Logs**: Monitor deployment in Railway dashboard
3. **Health Check**: Visit `https://your-app.railway.app/health`

## Step 6: Post-Deployment Setup

### Create Admin User
```bash
# Connect to your Railway app
railway shell

# Create admin user
npx medusa user -e admin@frostlord.com -p yourpassword
```

### Create API Keys
```bash
# Generate publishable key
node create-key-simple.js
```

### Run Migrations
```bash
# In Railway shell
npm run migrate
npm run seed
```

## Step 7: Configure Frontend

Update your frontend environment variables:

```env
NEXT_PUBLIC_MEDUSA_BACKEND_URL=https://your-app.railway.app
NEXT_PUBLIC_MEDUSA_PUBLISHABLE_KEY=pk_37291f8962359377af93619eb1b750c5c036ecd10f92f4d990694fbd1604fa10
NEXT_PUBLIC_SITE_URL=https://your-frontend-domain.com
```

## Railway Configuration

Your `backend/railway.json` is already configured:

```json
{
  "$schema": "https://railway.app/railway.schema.json",
  "build": {
    "builder": "NIXPACKS"
  },
  "deploy": {
    "startCommand": "npm run build && npm run start",
    "healthcheckPath": "/health",
    "healthcheckTimeout": 300,
    "restartPolicyType": "ON_FAILURE",
    "restartPolicyMaxRetries": 5,
    "numReplicas": 1
  }
}
```

## Cost Optimization

- **Railway**: ~$5/month for backend + database + Redis
- **Free Tier**: Available for development/testing
- **Scaling**: Automatic scaling based on traffic

## Troubleshooting

### Common Issues

1. **Build Failures**
   - Check Railway logs for build errors
   - Ensure all dependencies are in `package.json`
   - Verify Node.js version compatibility

2. **Database Connection Issues**
   - Verify `DATABASE_URL` format
   - Check if database is accessible from Railway
   - Ensure SSL settings are correct

3. **Redis Connection Issues**
   - Verify `REDIS_URL` format
   - Check if Redis is accessible from Railway

4. **CORS Errors**
   - Update CORS settings in environment variables
   - Ensure frontend domain is included

### Debug Commands

```bash
# Check Railway logs
railway logs

# Connect to Railway shell
railway shell

# Check environment variables
railway variables

# Restart deployment
railway service restart
```

## Security Best Practices

1. **Environment Variables**: Never commit secrets to Git
2. **HTTPS**: Railway provides automatic HTTPS
3. **CORS**: Configure properly for production
4. **Secrets**: Use strong, random secrets for JWT and cookies
5. **Database**: Use connection pooling for production

## Monitoring

Railway provides:
- **Logs**: Real-time application logs
- **Metrics**: CPU, memory, and network usage
- **Alerts**: Automatic alerts for issues
- **Health Checks**: Automatic health monitoring

## Support

- [Railway Documentation](https://docs.railway.app)
- [Medusa Documentation](https://docs.medusajs.com)
- [Railway Discord](https://discord.gg/railway)

## Migration from Docker

If you're migrating from Docker:

1. **Remove Docker files**: Already done ✅
2. **Update scripts**: Already done ✅
3. **Configure Railway**: Follow this guide
4. **Update documentation**: Already done ✅
5. **Test deployment**: Deploy and verify

Your backend is now ready for Railway deployment! 🚂 