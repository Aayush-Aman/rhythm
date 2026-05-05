# Stage 1: Build
FROM node:20-alpine AS builder

# Create app directory
WORKDIR /usr/src/app

# Copy manifest files
COPY package*.json ./

# Install ALL dependencies (including devDeps for build steps/TS)
RUN npm install

# Copy the rest of your source code
COPY . .

# Optional: Build step (uncomment if using TypeScript)
# RUN npm run build

# Stage 2: Production
FROM node:20-alpine AS runner

# Set environment to production
ENV NODE_ENV=production

WORKDIR /usr/src/app

# Only copy the production dependencies and built files
COPY --from=builder /usr/src/app/package*.json ./
RUN npm ci --only=production

# If using TypeScript, copy the compiled dist folder
# COPY --from=builder /usr/src/app/dist ./dist

COPY --from=builder /usr/src/app .

# Use a non-root user for security
USER node

# Expose the port your app runs on
EXPOSE 3000

CMD ["node", "index.js"]