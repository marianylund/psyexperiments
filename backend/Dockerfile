FROM node:20-alpine

# Create app directory
WORKDIR /usr/src/app

# Set production environment
ENV NODE_ENV=production

# Install dependencies
COPY --chown=node:node package*.json ./
RUN npm ci --omit=dev

# Bundle app source
COPY --chown=node:node . .

# Use non-root user provided by the Node image
USER node

# The app listens on 3001 (see backend/index.js)
EXPOSE 3001

# Start the server
CMD ["npm", "start"]


