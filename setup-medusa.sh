#!/bin/bash

echo "🚀 Starting FROSTLORD Medusa Setup for Railway Deployment..."

echo "📋 Prerequisites:"
echo "   • Railway account (https://railway.app)"
echo "   • PostgreSQL database (Railway or external)"
echo "   • Redis instance (Railway or external)"
echo ""

echo "🔧 Local Development Setup:"
echo "1. Install dependencies:"
echo "   npm install"
echo "   cd backend && npm install"
echo ""

echo "2. Configure environment variables:"
echo "   • Copy .env.example to .env"
echo "   • Update DATABASE_URL, REDIS_URL, JWT_SECRET, COOKIE_SECRET"
echo ""

echo "3. Run database migrations:"
echo "   npm run backend:migrate"
echo ""

echo "4. Seed the database:"
echo "   npm run backend:seed"
echo ""

echo "5. Start development servers:"
echo "   Backend: npm run backend:dev"
echo "   Frontend: npm run dev (in another terminal)"
echo ""

echo "🚀 Railway Deployment:"
echo "1. Push your code to GitHub"
echo "2. Connect your repository to Railway"
echo "3. Add environment variables in Railway dashboard"
echo "4. Deploy!"
echo ""

echo "📚 Available Scripts:"
echo "   npm run backend:dev      - Start Medusa backend"
echo "   npm run backend:build    - Build backend for production"
echo "   npm run backend:start    - Start backend in production mode"
echo "   npm run backend:migrate  - Run database migrations"
echo "   npm run backend:seed     - Seed database"
echo "   npm run dev              - Start Next.js frontend"
