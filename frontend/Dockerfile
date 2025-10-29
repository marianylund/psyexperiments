## Build stage: compile the frontend static files
FROM node:20-alpine AS builder

WORKDIR /app

# Install dependencies
COPY package*.json ./
RUN npm ci

# Copy source code
COPY . .

# Build each src/*.js file and organize outputs
RUN mkdir -p /app/html && \
    for file in src/*.js; do \
        filename=$(basename "$file" .js); \
        echo "Building $filename..."; \
        npm run build "$filename"; \
        mkdir -p "/app/html/$filename"; \
        cp -r /app/.jspsych-builder/* "/app/html/$filename/"; \
    done

RUN cp -r landing_page/* /app/html/

## Runtime stage: serve with Nginx
FROM nginx:1.27-alpine AS runtime

# Copy built assets
COPY --from=builder /app/html /usr/share/nginx/html

# Copy custom Nginx config (listening on 8080)
COPY --from=builder /app/nginx.conf /etc/nginx/nginx.conf

# Expose HTTP port
EXPOSE 8080

# Start Nginx
CMD ["nginx", "-g", "daemon off;"]
