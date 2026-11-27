
# Stage 1: Build NestJS application
FROM node:22-alpine AS build

WORKDIR /app

# Copy dependency files
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy backend source
COPY . .

# Build NestJS application
RUN npm run build

# Stage 2: Production runtime
FROM node:22-alpine

WORKDIR /app

ENV NODE_ENV=production

# Copy package files
COPY package*.json ./

# Install production dependencies
RUN npm install --omit=dev

# Copy compiled application
COPY --from=build /app/dist ./dist

EXPOSE 3000

CMD ["node", "dist/main.js"]
