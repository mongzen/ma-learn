#!/bin/bash

# MaLearn E-Learning Platform Docker Development Script
# This script provides easy commands to manage the Docker development environment

set -e

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Function to print colored output
print_info() {
    echo -e "${BLUE}[INFO]${NC} $1"
}

print_success() {
    echo -e "${GREEN}[SUCCESS]${NC} $1"
}

print_warning() {
    echo -e "${YELLOW}[WARNING]${NC} $1"
}

print_error() {
    echo -e "${RED}[ERROR]${NC} $1"
}

# Check if Docker is running
check_docker() {
    if ! docker info > /dev/null 2>&1; then
        print_error "Docker is not running. Please start Docker Desktop and try again."
        exit 1
    fi
}

# Create .env file if it doesn't exist
setup_env() {
    if [ ! -f .env ]; then
        print_info "Creating .env file from .env.example..."
        cp .env.example .env
        print_warning "Please update the .env file with your configuration values"
    fi
}

# Development commands
dev_up() {
    print_info "Starting MaLearn development environment..."
    setup_env
    docker-compose up -d
    print_success "Development environment started!"
    print_info "Application: http://localhost:3000"
    print_info "MongoDB: mongodb://localhost:27017"
    print_info "Redis: redis://localhost:6379"
}

dev_down() {
    print_info "Stopping MaLearn development environment..."
    docker-compose down
    print_success "Development environment stopped!"
}

dev_restart() {
    print_info "Restarting MaLearn development environment..."
    docker-compose restart
    print_success "Development environment restarted!"
}

dev_logs() {
    print_info "Showing logs for MaLearn development environment..."
    docker-compose logs -f
}

dev_shell() {
    print_info "Opening shell in MaLearn application container..."
    docker-compose exec malearn-app sh
}

dev_db_shell() {
    print_info "Opening MongoDB shell..."
    docker-compose exec mongo mongosh -u admin -p password --authenticationDatabase admin
}

dev_redis_shell() {
    print_info "Opening Redis shell..."
    docker-compose exec redis redis-cli -a redis_password
}

dev_clean() {
    print_warning "This will remove all containers, volumes, and images. Are you sure? (y/N)"
    read -r response
    if [[ "$response" =~ ^[Yy]$ ]]; then
        print_info "Cleaning up development environment..."
        docker-compose down -v --remove-orphans
        docker system prune -f
        print_success "Development environment cleaned!"
    else
        print_info "Operation cancelled."
    fi
}

# Production commands
prod_build() {
    print_info "Building production images..."
    docker-compose -f docker-compose.yml --profile production build
    print_success "Production images built!"
}

prod_up() {
    print_info "Starting production environment..."
    docker-compose -f docker-compose.yml --profile production up -d
    print_success "Production environment started!"
    print_info "Application: http://localhost"
}

prod_down() {
    print_info "Stopping production environment..."
    docker-compose -f docker-compose.yml --profile production down
    print_success "Production environment stopped!"
}

# Health check
health_check() {
    print_info "Checking application health..."
    if curl -f http://localhost:3000/api/health > /dev/null 2>&1; then
        print_success "Application is healthy!"
    else
        print_error "Application is not responding!"
        exit 1
    fi
}

# Help function
show_help() {
    echo -e "${BLUE}MaLearn E-Learning Platform Docker Management${NC}"
    echo ""
    echo "Usage: $0 [command]"
    echo ""
    echo "Development Commands:"
    echo "  up          Start development environment"
    echo "  down        Stop development environment"
    echo "  restart     Restart development environment"
    echo "  logs        Show application logs"
    echo "  shell       Open shell in application container"
    echo "  db-shell    Open MongoDB shell"
    echo "  redis-shell Open Redis shell"
    echo "  clean       Clean up all containers and volumes"
    echo ""
    echo "Production Commands:"
    echo "  prod-build  Build production images"
    echo "  prod-up     Start production environment"
    echo "  prod-down   Stop production environment"
    echo ""
    echo "Utility Commands:"
    echo "  health      Check application health"
    echo "  help        Show this help message"
}

# Main script logic
main() {
    check_docker

    case "${1:-help}" in
        up)
            dev_up
            ;;
        down)
            dev_down
            ;;
        restart)
            dev_restart
            ;;
        logs)
            dev_logs
            ;;
        shell)
            dev_shell
            ;;
        db-shell)
            dev_db_shell
            ;;
        redis-shell)
            dev_redis_shell
            ;;
        clean)
            dev_clean
            ;;
        prod-build)
            prod_build
            ;;
        prod-up)
            prod_up
            ;;
        prod-down)
            prod_down
            ;;
        health)
            health_check
            ;;
        help)
            show_help
            ;;
        *)
            print_error "Unknown command: $1"
            show_help
            exit 1
            ;;
    esac
}

# Run the main function
main "$@"
