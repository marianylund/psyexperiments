## Build stage: compile the frontend static files
FROM node:20-alpine AS builder

WORKDIR /app

# Install dependencies
COPY package*.json ./
RUN npm ci

# Copy source and build
COPY . .
RUN npm run build


## Runtime stage: serve with Nginx
FROM nginx:1.27-alpine AS runtime

# Copy built assets to Nginx html directory
COPY --from=builder /app/.jspsych-builder /usr/share/nginx/html

# Change Nginx to listen on 8080 instead of 80
RUN sed -i 's/listen\s\+80;/listen 8080;/' /etc/nginx/conf.d/default.conf

# Expose default HTTP port
EXPOSE 8080

# Use the default Nginx start command
CMD ["nginx", "-g", "daemon off;"]


