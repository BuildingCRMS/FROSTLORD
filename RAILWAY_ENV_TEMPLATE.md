# Railway Environment Variables Setup

## 🚀 How to Set Environment Variables in Railway

1. **Go to your Railway project dashboard**
2. **Click on the "Variables" tab**
3. **Add each variable below**

## 📋 Required Environment Variables

### Database & Core
```bash
DATABASE_URL=postgres://username:password@host:port/database
REDIS_URL=redis://username:password@host:port
JWT_SECRET=your-super-secret-jwt-key-here
COOKIE_SECRET=your-super-secret-cookie-key-here
NODE_ENV=production
```

### Medusa Configuration
```bash
MEDUSA_BACKEND_URL=https://your-app.railway.app
ADMIN_CORS=https://your-admin-domain.com
STORE_CORS=https://your-storefront-domain.com
```

### Stripe (if using)
```bash
STRIPE_SECRET_KEY=sk_test_... or sk_live_...
STRIPE_WEBHOOK_SECRET=whsec_...
```

## 🔧 How to Get These Values

### DATABASE_URL & REDIS_URL
1. **In Railway dashboard, go to "New" → "Database"**
2. **Choose PostgreSQL** (for DATABASE_URL)
3. **Choose Redis** (for REDIS_URL)
4. **Copy the connection strings** from the "Connect" tab

### JWT_SECRET & COOKIE_SECRET
Generate random strings:
```bash
# JWT_SECRET (64 characters)
openssl rand -hex 32

# COOKIE_SECRET (32 characters)
openssl rand -hex 16
```

### MEDUSA_BACKEND_URL
This will be your Railway app URL: `https://your-app-name.railway.app`

## ⚠️ Important Notes

- **Don't commit these values** to your code
- **Set them in Railway Variables tab**
- **Railway will automatically inject them** into your app
- **Restart your deployment** after adding variables
