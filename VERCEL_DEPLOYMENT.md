# 🚀 Vercel Deployment Guide for FROSTLORD

## Prerequisites

1. **Vercel Account**: Sign up at [vercel.com](https://vercel.com)
2. **GitHub Account**: Connect your repository
3. **Backend Hosting**: Deploy Medusa backend separately (Railway, Render, etc.)

## Step 1: Deploy Backend First

### Railway Backend Deployment
1. Go to [railway.app](https://railway.app)
2. Create new project from GitHub
3. Set root directory to `backend`
4. Add environment variables:
   ```
   DATABASE_URL=your_postgres_url
   REDIS_URL=your_redis_url
   JWT_SECRET=your_jwt_secret
   COOKIE_SECRET=your_cookie_secret
   NODE_ENV=production
   ```
5. Add PostgreSQL and Redis services in Railway
6. Deploy and get your backend URL
7. Run migrations: `npm run migrate` in Railway shell
8. Create admin user: `npx medusa user -e admin@frostlord.com -p yourpassword`

### Alternative: Render
1. Go to [render.com](https://render.com)
2. Create new Web Service
3. Connect your repository
4. Set build command: `cd backend && npm install && npm run build`
5. Set start command: `cd backend && npm run start`

## Step 2: Configure Environment Variables

In your Vercel project settings, add these environment variables:

```
NEXT_PUBLIC_MEDUSA_BACKEND_URL=https://your-backend-url.railway.app
NEXT_PUBLIC_MEDUSA_PUBLISHABLE_KEY=pk_37291f8962359377af93619eb1b750c5c036ecd10f92f4d990694fbd1604fa10
NEXT_PUBLIC_SITE_URL=https://your-vercel-domain.vercel.app
```

## Step 3: Deploy Frontend to Vercel

### Method 1: Vercel CLI
```bash
# Install Vercel CLI
npm i -g vercel

# Login to Vercel
vercel login

# Deploy
vercel --prod
```

### Method 2: GitHub Integration
1. Go to [vercel.com/dashboard](https://vercel.com/dashboard)
2. Click "New Project"
3. Import your GitHub repository
4. Configure build settings:
   - Framework Preset: Next.js
   - Root Directory: `./` (root)
   - Build Command: `npm run build`
   - Output Directory: `.next`
5. Add environment variables
6. Deploy

## Step 4: Post-Deployment Setup

1. **Create Admin User**:
   ```bash
   # Connect to your backend
   npx medusa user -e admin@frostlord.com -p admin123
   ```

2. **Create API Key** (if not already done):
   ```bash
   # Use the script we created
   node backend/create-key-simple.js
   ```

3. **Set up Initial Data**:
   - Access admin dashboard: `https://your-backend-url.railway.app/app`
   - Create regions, products, etc.

## Environment Variables Reference

### Frontend (Vercel)
```
NEXT_PUBLIC_MEDUSA_BACKEND_URL=https://your-backend-url.railway.app
NEXT_PUBLIC_MEDUSA_PUBLISHABLE_KEY=pk_37291f8962359377af93619eb1b750c5c036ecd10f92f4d990694fbd1604fa10
NEXT_PUBLIC_SITE_URL=https://your-vercel-domain.vercel.app
```

### Backend (Railway/Render)
```
DATABASE_URL=postgres://user:password@host:port/database
REDIS_URL=redis://user:password@host:port
JWT_SECRET=your_jwt_secret
COOKIE_SECRET=your_cookie_secret
STORE_CORS=https://your-vercel-domain.vercel.app
ADMIN_CORS=https://your-vercel-domain.vercel.app
AUTH_CORS=https://your-vercel-domain.vercel.app
```

## Troubleshooting

### Common Issues

1. **CORS Errors**: Make sure your backend CORS settings include your Vercel domain
2. **API Key Issues**: Ensure the publishable key is correctly set in Vercel
3. **Build Failures**: Check that all dependencies are in `package.json`
4. **Image Loading**: Verify image domains in `next.config.js`

### Debug Commands
```bash
# Check build locally
npm run build

# Test production build
npm run start

# Check environment variables
echo $NEXT_PUBLIC_MEDUSA_BACKEND_URL
```

## Cost Optimization

- **Railway**: ~$5/month for backend
- **Vercel**: Free tier for frontend
- **Database**: Use Railway's PostgreSQL or external service
- **Redis**: Use Railway's Redis or external service

## Security Notes

1. Never commit `.env` files
2. Use environment variables for all secrets
3. Enable HTTPS only
4. Set up proper CORS policies
5. Use strong JWT secrets

## Support

- [Vercel Documentation](https://vercel.com/docs)
- [Railway Documentation](https://docs.railway.app)
- [Medusa Documentation](https://docs.medusajs.com) 