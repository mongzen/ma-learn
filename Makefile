# MaLearn E-Learning Platform Makefile
# Provides convenient shortcuts for common development tasks

.PHONY: help dev prod clean install test lint build deploy health

# Default target
.DEFAULT_GOAL := help

# Colors
GREEN := \033[0;32m
YELLOW := \033[1;33m
RED := \033[0;31m
NC := \033[0m # No Color

help: ## Show this help message
	@echo "$(GREEN)MaLearn E-Learning Platform$(NC)"
	@echo ""
	@echo "Available commands:"
	@awk 'BEGIN {FS = ":.*?## "} /^[a-zA-Z_-]+:.*?## / {printf "  $(YELLOW)%-15s$(NC) %s\n", $$1, $$2}' $(MAKEFILE_LIST)

# Development Commands
dev: ## Start development environment
	@echo "$(GREEN)Starting MaLearn development environment...$(NC)"
	@./docker-dev.sh up

dev-down: ## Stop development environment
	@echo "$(GREEN)Stopping MaLearn development environment...$(NC)"
	@./docker-dev.sh down

dev-restart: ## Restart development environment
	@echo "$(GREEN)Restarting MaLearn development environment...$(NC)"
	@./docker-dev.sh restart

dev-logs: ## Show development logs
	@./docker-dev.sh logs

dev-shell: ## Open shell in development container
	@./docker-dev.sh shell

dev-db: ## Open MongoDB shell
	@./docker-dev.sh db-shell

dev-redis: ## Open Redis shell
	@./docker-dev.sh redis-shell

# Production Commands
prod: ## Start production environment
	@echo "$(GREEN)Starting MaLearn production environment...$(NC)"
	@./docker-dev.sh prod-up

prod-build: ## Build production images
	@echo "$(GREEN)Building MaLearn production images...$(NC)"
	@./docker-dev.sh prod-build

prod-down: ## Stop production environment
	@echo "$(GREEN)Stopping MaLearn production environment...$(NC)"
	@./docker-dev.sh prod-down

# Installation and Setup
install: ## Install dependencies
	@echo "$(GREEN)Installing dependencies...$(NC)"
	@pnpm install

setup: ## Initial setup (create .env, install deps)
	@echo "$(GREEN)Setting up MaLearn development environment...$(NC)"
	@if [ ! -f .env ]; then cp .env.example .env; echo "$(YELLOW)Created .env file from .env.example$(NC)"; fi
	@pnpm install
	@echo "$(GREEN)Setup complete! Run 'make dev' to start development environment.$(NC)"

# Testing
test: ## Run all tests
	@echo "$(GREEN)Running tests...$(NC)"
	@pnpm test

test-e2e: ## Run e2e tests
	@echo "$(GREEN)Running e2e tests...$(NC)"
	@pnpm test:e2e

test-int: ## Run integration tests
	@echo "$(GREEN)Running integration tests...$(NC)"
	@pnpm test:int

# Code Quality
lint: ## Run linter
	@echo "$(GREEN)Running linter...$(NC)"
	@pnpm lint

lint-fix: ## Fix linting issues
	@echo "$(GREEN)Fixing linting issues...$(NC)"
	@pnpm lint:fix

# Build
build: ## Build the application
	@echo "$(GREEN)Building application...$(NC)"
	@pnpm build

# Utility Commands
clean: ## Clean up development environment
	@echo "$(RED)Cleaning up development environment...$(NC)"
	@./docker-dev.sh clean

health: ## Check application health
	@./docker-dev.sh health

# Database Commands
db-reset: ## Reset database (development only)
	@echo "$(YELLOW)Resetting database...$(NC)"
	@docker-compose exec mongo mongosh -u admin -p password --authenticationDatabase admin --eval "db.getSiblingDB('malearn').dropDatabase()"
	@echo "$(GREEN)Database reset complete!$(NC)"

db-seed: ## Seed database with sample data
	@echo "$(GREEN)Seeding database...$(NC)"
	@pnpm payload seed

# Monitoring
monitor: ## Show container status
	@echo "$(GREEN)Container Status:$(NC)"
	@docker-compose ps

logs: ## Show all logs
	@docker-compose logs -f

# Backup and Restore
backup: ## Backup database
	@echo "$(GREEN)Creating database backup...$(NC)"
	@mkdir -p backups
	@docker-compose exec mongo mongodump --host localhost --port 27017 -u admin -p password --authenticationDatabase admin --db malearn --out /tmp/backup
	@docker cp $$(docker-compose ps -q mongo):/tmp/backup ./backups/backup-$$(date +%Y%m%d-%H%M%S)
	@echo "$(GREEN)Backup complete!$(NC)"

restore: ## Restore database from backup (specify BACKUP_PATH)
	@if [ -z "$(BACKUP_PATH)" ]; then echo "$(RED)Please specify BACKUP_PATH: make restore BACKUP_PATH=./backups/backup-20240101-120000$(NC)"; exit 1; fi
	@echo "$(GREEN)Restoring database from $(BACKUP_PATH)...$(NC)"
	@docker cp $(BACKUP_PATH) $$(docker-compose ps -q mongo):/tmp/restore
	@docker-compose exec mongo mongorestore --host localhost --port 27017 -u admin -p password --authenticationDatabase admin --db malearn /tmp/restore/malearn
	@echo "$(GREEN)Restore complete!$(NC)"

# Security
security-scan: ## Run security scan
	@echo "$(GREEN)Running security scan...$(NC)"
	@pnpm audit
	@docker run --rm -v $(PWD):/app -w /app node:22-alpine npm audit --audit-level moderate

# SSL/TLS (for production)
ssl-generate: ## Generate SSL certificates for development
	@echo "$(GREEN)Generating SSL certificates...$(NC)"
	@mkdir -p ssl
	@openssl req -x509 -nodes -days 365 -newkey rsa:2048 -keyout ssl/nginx.key -out ssl/nginx.crt -subj "/CN=localhost"
	@echo "$(GREEN)SSL certificates generated!$(NC)"
