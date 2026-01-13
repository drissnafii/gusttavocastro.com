# Makefile for Driss Nafii Portfolio
# Usage: make <command>

.PHONY: help install dev build start lint analyze debug clean deploy test

# Default target
help:
	@echo "Available commands:"
	@echo "  make install    - Install dependencies with Bun"
	@echo "  make dev        - Start development server"
	@echo "  make build      - Build the application for production"
	@echo "  make start      - Start production server (after build)"
	@echo "  make lint       - Run ESLint to check code quality"
	@echo "  make analyze    - Analyze bundle with Next.js 16.1 Bundle Analyzer"
	@echo "  make debug      - Start dev server with debugging enabled"
	@echo "  make clean      - Clean build artifacts and node_modules"
	@echo "  make deploy     - Deploy to production (Vercel)"
	@echo "  make test       - Run tests (if available)"
	@echo "  make setup      - Initial setup (install + build)"
	@echo "  make restart    - Clean install and restart dev server"

# Install dependencies
install:
	@echo "📦 Installing dependencies with Bun..."
	bun install

# Start development server (Bun runtime)
dev:
	@echo "🚀 Starting development server with Bun runtime..."
	bun --bun next dev

# Build for production (Bun runtime)
build:
	@echo "🏗️  Building for production with Bun runtime..."
	bun --bun next build

# Start production server (Bun runtime)
start:
	@echo "▶️  Starting production server with Bun runtime..."
	bun --bun next start

# Run linting
lint:
	@echo "🔍 Running ESLint..."
	bun --bun next lint

# Analyze bundle (Next.js 16.1 feature)
analyze:
	@echo "📊 Analyzing bundle with Next.js Bundle Analyzer..."
	bun --bun next build --analyze

# Start dev server with debugging
debug:
	@echo "🐛 Starting development server with debugging..."
	bun --bun next dev --inspect

# Clean build artifacts and dependencies
clean:
	@echo "🧹 Cleaning build artifacts..."
	rm -rf .next
	rm -rf node_modules
	rm -f bun.lock

# Deploy to production
deploy:
	@echo "🚀 Deploying to production..."
	bun run deploy

# Run tests (placeholder for future tests)
test:
	@echo "🧪 Running tests..."
	@echo "No tests configured yet. Add your test command here."

# Initial setup
setup: install build
	@echo "✅ Setup complete! Run 'make dev' to start development."

# Clean install and restart
restart: clean install dev

# Development helpers
check:
	@echo "🔍 Checking project status..."
	@echo "Bun version: $(shell bun --version)"
	@echo "Next.js: 16.1.1"
	@echo "Runtime: Bun (not Node.js)"

# Show project info
info:
	@echo "📋 Project Information:"
	@echo "Name: Driss Nafii Portfolio"
	@echo "Domain: drissnafii.me"
	@echo "Framework: Next.js 16.1.1 (with Turbopack)"
	@echo "Runtime: Bun (replacing Node.js)"
	@echo "Package Manager: Bun"
	@echo "Styling: Stitches"
	@echo "Bundler: Turbopack (default in Next.js 16+)"