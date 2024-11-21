# Use the official Node.js 20 image as a base
FROM node:20-alpine AS builder

# Set working directory
WORKDIR /app

# Define build argument for the API URL
ARG NEXT_PUBLIC_API_URL

# Set the environment variable for Next.js
ENV NEXT_PUBLIC_API_URL=$NEXT_PUBLIC_API_URL

# Install dependencies
COPY package.json package-lock.json ./
RUN npm ci

# Copy the Next.js source files
COPY . .

# Build the Next.js project
RUN npm run build

# Production image
FROM node:20-alpine AS runner

# Set working directory
WORKDIR /app

# Copy the necessary files and folders from the builder stage
COPY --from=builder /app/package.json /app/package-lock.json ./
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/public ./public

# Install only production dependencies
RUN npm ci --only=production

# Expose port 8080
EXPOSE 8080

# Run Next.js
CMD ["npm", "run", "start"]
