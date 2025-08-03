# 🏔️ FROSTLORD - Modern E-commerce Platform

A modern e-commerce platform built with **Medusa** (backend) and **Next.js** (frontend), deployed on **Railway** and **Vercel**.

## 🚀 Quick Start

### Prerequisites
- Node.js 18+ 
- npm or yarn
- Railway account (for backend)
- Vercel account (for frontend)

### Local Development

1. **Clone the repository**
   ```bash
   git clone <your-repo-url>
   cd FROSTLORD
   ```

2. **Install dependencies**
   ```bash
   npm install
   cd backend && npm install
   ```

3. **Set up environment variables**
   ```bash
   # Copy example files
   cp .env.example .env
   cp backend/.env.example backend/.env
   
   # Update with your values
   # DATABASE_URL, REDIS_URL, JWT_SECRET, COOKIE_SECRET
   ```

4. **Start development servers**
   ```bash
   # Terminal 1: Backend
   npm run backend:dev
   
   # Terminal 2: Frontend
   npm run dev
   ```

## 🚂 Railway Deployment (Backend)

Your backend is configured for Railway deployment:

1. **Push to GitHub**
2. **Connect to Railway**: [railway.app](https://railway.app)
3. **Set root directory**: `backend`
4. **Add environment variables** (see RAILWAY_DEPLOYMENT.md)
5. **Deploy!**

### Railway Configuration
- ✅ Automatic builds and deployments
- ✅ Built-in PostgreSQL and Redis
- ✅ Health checks and monitoring
- ✅ SSL/HTTPS included

## 🌐 Vercel Deployment (Frontend)

Deploy your frontend to Vercel:

1. **Connect GitHub repository**
2. **Configure build settings**
3. **Add environment variables**
4. **Deploy!**

See `VERCEL_DEPLOYMENT.md` for detailed instructions.

## 📁 Project Structure

```
FROSTLORD/
├── backend/                 # Medusa backend
│   ├── src/
│   │   ├── api/            # API endpoints
│   │   ├── subscribers/    # Event subscribers
│   │   └── workflows/      # Business workflows
│   ├── medusa-config.js    # Medusa configuration
│   └── railway.json        # Railway deployment config
├── src/                    # Next.js frontend
│   ├── app/               # App router pages
│   ├── modules/           # Feature modules
│   └── lib/               # Utilities and config
├── e2e/                   # End-to-end tests
└── preset/                # UI theme configuration
```

## 🛠️ Available Scripts

### Development
```bash
npm run dev              # Start Next.js frontend
npm run backend:dev      # Start Medusa backend
npm run backend:build    # Build backend for production
npm run backend:start    # Start backend in production mode
```

### Database
```bash
npm run backend:migrate  # Run database migrations
npm run backend:seed     # Seed database with sample data
```

### Testing
```bash
npm run test-e2e         # Run end-to-end tests
npm run test:serial      # Run tests serially
```

## 🔧 Configuration

### Environment Variables

**Backend (.env)**
```env
DATABASE_URL=postgres://user:password@host:port/database
REDIS_URL=redis://user:password@host:port
JWT_SECRET=your_jwt_secret
COOKIE_SECRET=your_cookie_secret
NODE_ENV=production
```

**Frontend (.env)**
```env
NEXT_PUBLIC_MEDUSA_BACKEND_URL=https://your-backend.railway.app
NEXT_PUBLIC_MEDUSA_PUBLISHABLE_KEY=pk_37291f8962359377af93619eb1b750c5c036ecd10f92f4d990694fbd1604fa10
NEXT_PUBLIC_SITE_URL=https://your-frontend.vercel.app
```

## 📚 Documentation

- [Railway Deployment Guide](RAILWAY_DEPLOYMENT.md)
- [Vercel Deployment Guide](VERCEL_DEPLOYMENT.md)
- [Medusa Documentation](https://docs.medusajs.com)
- [Next.js Documentation](https://nextjs.org/docs)

## 🧪 Testing

Run the test suite:
```bash
npm run test-e2e
```

## 🚀 Production Deployment

1. **Backend**: Deploy to Railway
2. **Frontend**: Deploy to Vercel
3. **Database**: Use Railway PostgreSQL
4. **Cache**: Use Railway Redis
5. **CDN**: Vercel's global CDN

## 💰 Cost Optimization

- **Railway**: ~$5/month (backend + database + Redis)
- **Vercel**: Free tier for frontend
- **Total**: ~$5/month for full production setup

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests
5. Submit a pull request

## 📄 License

MIT License - see LICENSE file for details.

## 🆘 Support

- [Medusa Discord](https://discord.gg/medusajs)
- [Railway Discord](https://discord.gg/railway)
- [Next.js Discord](https://discord.gg/nextjs)

---

Built with ❤️ using [Medusa](https://medusajs.com) and [Next.js](https://nextjs.org)
