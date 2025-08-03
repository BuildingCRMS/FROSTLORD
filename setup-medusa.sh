#!/bin/bash

echo "🚀 Starting FROSTLORD Medusa Setup..."

# Stop any existing containers
echo "📦 Stopping existing containers..."
docker compose down

# Start database and Redis
echo "🗃️  Starting database and Redis..."
docker compose up postgres redis -d

# Wait for database to be ready
echo "⏳ Waiting for database to be ready..."
sleep 10

# Build the Medusa image
echo "🔨 Building Medusa backend..."
docker compose build medusa

# Run migrations using Docker
echo "🔄 Running database migrations..."
docker compose run --rm medusa npm run migrate

# Seed the database
echo "🌱 Seeding database..."
docker compose run --rm medusa npm run seed

# Start all services
echo "🌟 Starting all services..."
docker compose up -d

echo "✅ Setup complete!"
echo ""
echo "🌐 Services:"
echo "   • Medusa Backend: http://localhost:9000"
echo "   • Medusa Admin: http://localhost:9000/app"
echo "   • Frontend: Run 'npm run dev' in a new terminal"
echo ""
echo "📝 To check logs: docker compose logs -f"
echo "📝 To stop: docker compose down"
