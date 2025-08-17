# NeuraForge OS Monorepo Container

This directory contains the NeuraForge OS project structure.

## Main Project

The main NeuraForge OS application is located in the `neuraforge-os/` subdirectory.

To work with the project:

```bash
cd neuraforge-os
bun install
bun run dev
```

## Structure

- `neuraforge-os/` - Main NeuraForge OS monorepo with apps and packages
- `index.ts` - Legacy entry point (not used)
- `tsconfig.json` - TypeScript configuration for this container

## Quick Commands

From this directory, you can run:

```bash
# Start development servers
npm run dev

# Build the project
npm run build

# Install dependencies
npm run install
```

These commands will automatically navigate to the `neuraforge-os/` directory and execute the appropriate commands.