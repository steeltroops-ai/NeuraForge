# Use Bun runtime
FROM oven/bun:1.2.20-alpine AS base

# Set working directory
WORKDIR /app

# Copy package files
COPY package.json bun.lockb* ./

# Install dependencies
RUN bun install --frozen-lockfile --production

# Copy source code
COPY . .

# Build the application
RUN bun run build

# Expose port
EXPOSE $PORT

# Health check
HEALTHCHECK --interval=30s --timeout=3s --start-period=5s --retries=3 \
  CMD curl -f http://localhost:$PORT/health || exit 1

# Start the application
CMD ["bun", "run", "start"]
