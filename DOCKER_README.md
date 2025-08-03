# FROSTLORD Docker Setup

This project uses Docker to run the Medusa backend alongside the Next.js storefront.

## Prerequisites

- Docker
- Docker Compose
- Git

## Quick Start

1. **Start the Docker containers:**
   ```bash
   npm run docker:up
   ```

2. **Check the logs:**
   ```bash
   npm run docker:logs
   ```

3. **Stop the containers:**
   ```bash
   npm run docker:down
   ```

## Services

- **PostgreSQL Database**: `frostlord_postgres` (port 5432)
- **Redis**: `frostlord_redis` (port 6379)
- **Medusa Backend**: `frostlord_backend` (port 9000)

## Access Points

- **Medusa Admin**: http://localhost:9000/app
- **Medusa API**: http://localhost:9000
- **Next.js Storefront**: http://localhost:8000 (run separately with `npm run dev`)

## Create Admin User

To create an admin user for the Medusa Admin dashboard:

```bash
docker compose run --rm medusa npx medusa user -e admin@frostlord.com -p yourpassword
```

## Environment Variables

The following environment variables are configured:

- `NODE_ENV=development`
- `DATABASE_URL=postgres://postgres:postgres@postgres:5432/frostlord_store`
- `REDIS_URL=redis://redis:6379`

## Troubleshooting

1. **Port conflicts**: If you have other projects using the same ports, update the `docker-compose.yml` file to use different ports.

2. **Container conflicts**: If you have other Medusa projects, the container names are unique to avoid conflicts.

3. **Database issues**: The SSL is disabled for local development as per Medusa's Docker documentation.

## Development

- The backend code is in the `backend/` directory
- The storefront code is in the root directory
- Both can be developed simultaneously 