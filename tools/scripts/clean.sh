#!/bin/bash

# Clean script for NeuraForge OS
echo "🧹 Cleaning NeuraForge OS..."

# Remove node_modules
echo "Removing node_modules..."
find . -name "node_modules" -type d -prune -exec rm -rf '{}' +

# Remove build artifacts
echo "Removing build artifacts..."
find . -name ".next" -type d -prune -exec rm -rf '{}' +
find . -name "dist" -type d -prune -exec rm -rf '{}' +
find . -name ".turbo" -type d -prune -exec rm -rf '{}' +
find . -name "*.tsbuildinfo" -type f -delete

# Remove lock files
echo "Removing lock files..."
find . -name "bun.lock" -type f -delete
find . -name "package-lock.json" -type f -delete
find . -name "yarn.lock" -type f -delete

echo "✅ Cleanup complete!"
echo "Run 'bun install' to reinstall dependencies."
