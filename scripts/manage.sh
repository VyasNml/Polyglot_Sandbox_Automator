#!/bin/bash

case "$1" in

  setup)
    echo "Checking Docker..."
    docker --version

    echo "Checking Git..."
    git --version

    echo "Pulling base images..."
    docker pull python:3.11-alpine
    docker pull node:20-alpine
    docker pull redis:7-alpine
    ;;

  build)
    echo "Building runner images..."

    docker build -t python-runner ./containers/python
    docker build -t node-runner ./containers/nodejs

    echo "Building compose services..."
    docker compose build
    ;;

  test)
    echo "Starting services..."
    docker compose up -d

    echo "Waiting for startup..."
    sleep 5

    echo "Testing Python execution..."

    PYTHON_RESPONSE=$(curl -s -X POST http://localhost:3000/execute \
    -H "Content-Type: application/json" \
    -d "{\"language\":\"python\",\"code\":\"print('Hello World')\"}")

    echo "$PYTHON_RESPONSE"

    echo ""

    echo "Testing Node.js execution..."

    NODE_RESPONSE=$(curl -s -X POST http://localhost:3000/execute \
    -H "Content-Type: application/json" \
    -d "{\"language\":\"node\",\"code\":\"console.log('Hello World')\"}")

    echo "$NODE_RESPONSE"

    echo ""

    echo "Stopping services..."
    docker compose down
    ;;

  clean)
    echo "Cleaning containers/images..."

    docker compose down --rmi local --volumes --remove-orphans

    ;;

  logs)
    docker compose logs -f
    ;;

  *)
    echo "Usage: ./scripts/manage.sh {setup|build|test|clean|logs}"
    ;;

esac