# Development Dockerfile for Medusa Backend
FROM node:20-alpine

# Set working directory
WORKDIR /app

# Copy package files from backend directory
COPY backend/package*.json ./

# Install all dependencies using npm
RUN npm install

# Copy backend source code
COPY backend/ .

# Expose the port Medusa runs on
EXPOSE 9000

# Start with migrations and then the development server
CMD ["npm", "run", "dev"]