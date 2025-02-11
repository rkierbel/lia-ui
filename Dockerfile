# Build stage
FROM node:20-alpine as builder

WORKDIR /app

# Copy package files
COPY package*.json ./

# Install dependencies
RUN npm ci

# Copy source code
COPY . .

# Build the app
RUN npm run build

# Production stage
FROM nginx:alpine

# Copy built assets from builder stage
COPY --from=builder /app/dist/lia-ui/browser /usr/share/nginx/html

# Copy nginx configuration
COPY nginx.conf /etc/nginx/conf.d/default.conf.template

COPY docker-entrypoint.sh /
RUN chmod +x /docker-entrypoint.sh

# Set default environment variables
ENV CONTAINER_PORT=8080
ENV HOST=localhost

EXPOSE ${CONTAINER_PORT}

# Start nginx
ENTRYPOINT ["/docker-entrypoint.sh"]
