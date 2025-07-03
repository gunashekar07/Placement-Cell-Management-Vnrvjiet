#!/bin/bash

# Restart script for the job portal application

echo "🛑 Stopping any existing server process..."
pkill -f "node backend/server.js" || true

echo "🧹 Cleaning node modules cache..."
cd backend
npm cache clean --force

echo "🔍 Checking public directories..."
mkdir -p public/resume public/profile

echo "📋 Setting directory permissions..."
chmod -R 755 public

echo "🔄 Restarting server..."
node server.js 