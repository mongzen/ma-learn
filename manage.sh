#!/bin/bash

# MaLearn Platform Management Script

set -e

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
BLUE='\033[0;34m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Function to print colored messages
print_message() {
    local color=$1
    local message=$2
    echo -e "${color}${message}${NC}"
}

# Function to check if Docker is running
check_docker() {
    if ! command -v docker &> /dev/null; then
        print_message $RED "Docker is not installed or not in PATH"
        exit 1
    fi

    if ! docker info &> /dev/null; then
        print_message $RED "Docker is not running. Please start Docker Desktop."
        exit 1
    fi
}

# Function to start the development environment
start_dev() {
    print_message $BLUE "🚀 Starting MaLearn Development Environment..."

    # Check if Docker is running
    check_docker

    # Start Docker services
    print_message $YELLOW "Starting Docker services (MongoDB, Redis, Nginx)..."
    docker-compose up -d

    # Wait for services to be ready
    print_message $YELLOW "Waiting for services to be ready..."
    sleep 5

    # Check if dependencies are installed
    if [ ! -d "node_modules" ]; then
        print_message $YELLOW "Installing dependencies..."
        pnpm install
    fi

    # Start Next.js development server
    print_message $YELLOW "Starting Next.js development server..."
    pnpm dev
}

# Function to stop the development environment
stop_dev() {
    print_message $BLUE "🛑 Stopping MaLearn Development Environment..."

    # Stop Docker services
    print_message $YELLOW "Stopping Docker services..."
    docker-compose down

    # Kill any running Next.js processes
    print_message $YELLOW "Stopping Next.js processes..."
    pkill -f "next dev" || true

    print_message $GREEN "✅ Development environment stopped successfully!"
}

# Function to reset the database
reset_db() {
    print_message $BLUE "🔄 Resetting Database..."

    # Stop services
    docker-compose down

    # Remove volumes
    docker volume rm malearn_mongodb_data 2>/dev/null || true
    docker volume rm malearn_redis_data 2>/dev/null || true

    # Start services again
    docker-compose up -d

    # Wait for services to be ready
    sleep 10

    # Run seed script
    print_message $YELLOW "Seeding database with initial data..."
    export PAYLOAD_SECRET="your-secret-key-here-change-this-in-production"
    export DATABASE_URI="mongodb://localhost:27017/malearn"
    npx tsx src/endpoints/seed/simple-seed.ts

    print_message $GREEN "✅ Database reset and seeded successfully!"
}

# Function to show status
show_status() {
    print_message $BLUE "📊 MaLearn Platform Status"
    echo

    # Check Docker services
    print_message $YELLOW "Docker Services:"
    docker-compose ps
    echo

    # Check if Next.js is running
    print_message $YELLOW "Next.js Development Server:"
    if pgrep -f "next dev" > /dev/null; then
        print_message $GREEN "✅ Running on http://localhost:3000"
    else
        print_message $RED "❌ Not running"
    fi

    echo
    print_message $YELLOW "Access Points:"
    echo "  Frontend: http://localhost:3000"
    echo "  Admin Panel: http://localhost:3000/admin"
    echo "  API: http://localhost:3000/api"
    echo

    print_message $YELLOW "Login Credentials:"
    echo "  Admin: admin@malearn.com / admin123"
    echo "  Instructor: instructor@malearn.com / instructor123"
    echo "  Student: student@malearn.com / student123"
}

# Function to run tests
run_tests() {
    print_message $BLUE "🧪 Running Tests..."

    # Run unit tests
    print_message $YELLOW "Running unit tests..."
    pnpm test

    # Run E2E tests
    print_message $YELLOW "Running E2E tests..."
    pnpm test:e2e
}

# Function to build for production
build_prod() {
    print_message $BLUE "🏗️  Building for Production..."

    # Install dependencies
    print_message $YELLOW "Installing dependencies..."
    pnpm install --frozen-lockfile

    # Build the application
    print_message $YELLOW "Building application..."
    pnpm build

    print_message $GREEN "✅ Production build completed successfully!"
}

# Function to show help
show_help() {
    print_message $BLUE "MaLearn Platform Management Script"
    echo
    echo "Usage: $0 [command]"
    echo
    echo "Commands:"
    echo "  start       Start the development environment"
    echo "  stop        Stop the development environment"
    echo "  reset       Reset the database and reseed"
    echo "  status      Show platform status"
    echo "  test        Run tests"
    echo "  build       Build for production"
    echo "  help        Show this help message"
    echo
    echo "Examples:"
    echo "  $0 start     # Start development environment"
    echo "  $0 status    # Check platform status"
    echo "  $0 reset     # Reset database and reseed"
}

# Main script logic
case "${1:-help}" in
    start)
        start_dev
        ;;
    stop)
        stop_dev
        ;;
    reset)
        reset_db
        ;;
    status)
        show_status
        ;;
    test)
        run_tests
        ;;
    build)
        build_prod
        ;;
    help|*)
        show_help
        ;;
esac
