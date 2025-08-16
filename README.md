# FROSTLORD

A modern ecommerce platform built with Medusa.js backend and Next.js frontend.

## Project Structure

This project is organized as a monorepo with separate frontend and backend:

```
frostlord/
├── backend/          # Medusa.js backend server
├── storefront/       # Next.js frontend application
├── package.json      # Root package.json for managing both projects
└── README.md         # This file
```

## Prerequisites

- Node.js 18.x or higher
- npm 8.x or higher
- PostgreSQL database
- Redis (for Medusa workflows)

## Quick Start

### 1. Install Dependencies

```bash
# Install root dependencies
npm install

# Install backend dependencies
cd backend && npm install

# Install frontend dependencies
cd ../storefront && npm install

# Or use the convenience script
npm run install:all
```

### 2. Environment Setup

#### Backend (.env in backend/ directory)
```bash
DATABASE_URL=postgres://username:password@localhost:5432/frostlord
REDIS_URL=redis://localhost:6379
JWT_SECRET=your-jwt-secret
COOKIE_SECRET=your-cookie-secret
STRIPE_SECRET_KEY=your-stripe-secret-key
STRIPE_WEBHOOK_SECRET=your-stripe-webhook-secret
```

#### Frontend (.env.local in storefront/ directory)
```bash
NEXT_PUBLIC_MEDUSA_BACKEND_URL=http://localhost:9000
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=your-stripe-publishable-key
```

### 3. Database Setup

```bash
cd backend
npm run seed
```

### 4. Start Development Servers

```bash
# Start both backend and frontend
npm run dev

# Or start them separately
npm run dev:backend    # Backend on port 9000
npm run dev:frontend   # Frontend on port 8000
```

## Available Scripts

### Root Level
- `npm run dev` - Start both backend and frontend in development mode
- `npm run build` - Build both projects
- `npm run start` - Start both projects in production mode
- `npm run install:all` - Install dependencies for all projects
- `npm run clean` - Clean all node_modules directories

### Backend
- `npm run dev` - Start Medusa development server
- `npm run build` - Build Medusa backend
- `npm run seed` - Seed database with sample data
- `npm run start` - Start production server

### Frontend
- `npm run dev` - Start Next.js development server
- `npm run build` - Build Next.js application
- `npm run start` - Start production server
- `npm run lint` - Run ESLint

## Development

### Backend Development
The backend is built with Medusa.js 2.0 and includes:
- Custom modules for email notifications
- MinIO file storage integration
- Stripe payment processing
- MeiliSearch integration
- Custom API endpoints

### Frontend Development
The frontend is built with Next.js 15 and includes:
- Modern UI components with Radix UI
- Tailwind CSS for styling
- MDX support for content
- Responsive design
- Ecommerce features (cart, checkout, etc.)

## Deployment

### Railway Deployment
Both backend and frontend are configured for Railway deployment:
- Backend: Uses `railway.json` configuration
- Frontend: Configured for Next.js deployment

### Environment Variables
Make sure to set all required environment variables in your deployment platform.

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## License

This project is licensed under the MIT License - see the LICENSE file for details.
