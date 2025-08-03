#!/bin/sh

# Change to backend directory
cd backend

# Run migrations and start server
echo "Running database migrations..."
npm run migrate

echo "Seeding database..."
npm run seed || echo "Seeding failed, continuing..."

echo "Starting Medusa development server..."
npm run dev