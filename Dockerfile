# Use Node.js 18 Alpine as base image
FROM node:18-alpine

# Set working directory
WORKDIR /app

# Copy package files
COPY handover-app/package*.json ./

# Install all dependencies (including devDependencies for build)
RUN npm ci

# Copy source code
COPY handover-app/ ./

# Build the application
RUN npm run build

# Use nginx to serve the built app
FROM nginx:alpine

# Copy built files from previous stage
COPY --from=0 /app/dist /usr/share/nginx/html

# Copy nginx configuration (optional)
# COPY nginx.conf /etc/nginx/nginx.conf

# Expose port 80
EXPOSE 80

# Start nginx
CMD ["nginx", "-g", "daemon off;"]