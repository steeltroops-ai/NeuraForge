#!/bin/bash

# Setup script for NeuraForge OS
echo "🚀 Setting up NeuraForge OS..."

# Check if bun is installed
if ! command -v bun &> /dev/null; then
    echo "❌ Bun is not installed. Please install Bun first:"
    echo "curl -fsSL https://bun.sh/install | bash"
    exit 1
fi

# Install dependencies
echo "📦 Installing dependencies..."
bun install

# Copy environment file if it doesn't exist
if [ ! -f .env ]; then
    echo "📝 Creating .env file from template..."
    cp .env.example .env
    echo "⚠️  Please update .env with your actual configuration values"
fi

# Run initial build to verify everything works
echo "🔨 Running initial build..."
bun run build

echo "✅ Setup complete!"
echo ""
echo "🎉 You can now start development with:"
echo "   bun run dev"
echo ""
echo "📚 Check out the documentation in ./docs/"
