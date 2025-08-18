#!/bin/bash

# Validation script for NeuraForge OS restructure
echo "🔍 Validating NeuraForge OS structure..."

# Check if all required directories exist
echo "📁 Checking directory structure..."
required_dirs=(
    "apps/web"
    "apps/api"
    "packages/ui"
    "packages/core"
    "packages/database"
    "packages/shared"
    "packages/ai"
    "packages/config/typescript"
    "docs"
    "tools/scripts"
    ".github/workflows"
    ".vscode"
)

for dir in "${required_dirs[@]}"; do
    if [ -d "$dir" ]; then
        echo "✅ $dir"
    else
        echo "❌ $dir (missing)"
    fi
done

# Check if all required files exist
echo ""
echo "📄 Checking required files..."
required_files=(
    "package.json"
    "turbo.json"
    "tsconfig.json"
    ".gitignore"
    ".prettierrc"
    ".env.example"
    "README.md"
    "docs/README.md"
    "docs/ARCHITECTURE.md"
    "docs/DEVELOPMENT.md"
    ".vscode/settings.json"
    ".github/workflows/ci.yml"
)

for file in "${required_files[@]}"; do
    if [ -f "$file" ]; then
        echo "✅ $file"
    else
        echo "❌ $file (missing)"
    fi
done

# Test if bun commands work
echo ""
echo "🧪 Testing bun commands..."
if bun run lint --dry-run &> /dev/null; then
    echo "✅ bun run lint"
else
    echo "❌ bun run lint (failed)"
fi

if bun run type-check &> /dev/null; then
    echo "✅ bun run type-check"
else
    echo "❌ bun run type-check (failed)"
fi

echo ""
echo "🎉 Validation complete!"
echo "If any items are marked with ❌, please address them before proceeding."
