# # Stage 1: Build
# FROM node:20-alpine AS builder

# # Create app directory
# WORKDIR /usr/src/app

# # Copy manifest files
# COPY package*.json ./

# # Install ALL dependencies (including devDeps for build steps/TS)
# RUN npm install

# # Copy the rest of your source code
# COPY . .

# # Optional: Build step (uncomment if using TypeScript)
# # RUN npm run build

# # Stage 2: Production
# FROM node:20-alpine AS runner

# # Set environment to production
# ENV NODE_ENV=production

# WORKDIR /usr/src/app

# # Only copy the production dependencies and built files
# COPY --from=builder /usr/src/app/package*.json ./
# RUN npm ci --only=production

# # If using TypeScript, copy the compiled dist folder
# # COPY --from=builder /usr/src/app/dist ./dist

# COPY --from=builder /usr/src/app .

# # Use a non-root user for security
# USER node

# # Expose the port your app runs on
# EXPOSE 3000

# CMD ["node", "index.js"]



# Stage 1: Build
FROM node:20-alpine AS builder

# Define Build Arguments
ARG PORT
ARG MONGO_URI
ARG ADMIN_EMAIL
ARG CLOUDINARY_API_KEY
ARG CLOUDINARY_API_SECRET
ARG CLOUDINARY_CLOUD_NAME
ARG NODE_ENV
ARG CLERK_PUBLISHABLE_KEY
ARG CLERK_SECRET_KEY
ARG FRONTEND_URL

WORKDIR /usr/src/app

COPY package*.json ./
RUN npm install
COPY . .

# Stage 2: Production
FROM node:20-alpine AS runner

# Re-declare ARGs in the second stage to make them available
ARG PORT
ARG MONGO_URI
ARG ADMIN_EMAIL
ARG CLOUDINARY_API_KEY
ARG CLOUDINARY_API_SECRET
ARG CLOUDINARY_CLOUD_NAME
ARG NODE_ENV
ARG CLERK_PUBLISHABLE_KEY
ARG CLERK_SECRET_KEY
ARG FRONTEND_URL

# Set Runtime Environment Variables
ENV PORT=${PORT}
ENV MONGO_URI=${MONGO_URI}
ENV ADMIN_EMAIL=${ADMIN_EMAIL}
ENV CLOUDINARY_API_KEY=${CLOUDINARY_API_KEY}
ENV CLOUDINARY_API_SECRET=${CLOUDINARY_API_SECRET}
ENV CLOUDINARY_CLOUD_NAME=${CLOUDINARY_CLOUD_NAME}
ENV NODE_ENV=production
ENV CLERK_PUBLISHABLE_KEY=${CLERK_PUBLISHABLE_KEY}
ENV CLERK_SECRET_KEY=${CLERK_SECRET_KEY}
ENV FRONTEND_URL=${FRONTEND_URL}

WORKDIR /usr/src/app

# Copy dependency manifests and install production-only deps
COPY --from=builder /usr/src/app/package*.json ./
RUN npm ci --only=production

# Copy the rest of the application code
COPY --from=builder /usr/src/app .

USER node

EXPOSE 3000

CMD ["node", "src/index.js"]
