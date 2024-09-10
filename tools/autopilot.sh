#!/usr/bin/env bash

set -e

echo "📖 This script will help you running the qualification-register-web for the first time. It will try to setup everything"
echo "with default values so you can run it directly."

if [ -e .env ]; then
  echo "⚠️ Configuration file already exists. Skipping."
else
  cp .env.autopilot .env
fi

# Run the container
echo "➡️ Running the application docker container"
docker compose up -d

echo "🏁 Autopilot completed. You should be able to go to your web browser and access the application at http://localhost:8508."
