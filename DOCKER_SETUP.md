# MaLearn E-Learning Platform - Docker Development Guide

## Overview

MaLearn is an open e-learning platform that enables anyone to create and sell online courses. This guide covers setting up the development environment using Docker.

## Prerequisites

- Docker Desktop installed and running
- Node.js 18+ (for local development)
- pnpm package manager
- Git

## Quick Start

### 1. Clone and Setup

```bash
# Clone the repository
git clone <repository-url>
cd ma-learn

# Create environment file
cp .env.example .env

# Edit .env file with your configuration
nano .env
```

### 2. Start Development Environment

```bash
# Using the convenience script
./docker-dev.sh up

# Or using Make
make dev

# Or using Docker Compose directly
docker-compose up -d
```

### 3. Access the Application

- **Application**: http://localhost:3000
- **Admin Panel**: http://localhost:3000/admin
- **MongoDB**: mongodb://localhost:27017
- **MongoDB Express**: http://localhost:8081 (admin/admin)
- **Redis**: redis://localhost:6379
- **Redis Commander**: http://localhost:8082

## Development Commands

### Docker Development Script

The `docker-dev.sh` script provides convenient commands:

```bash
# Start development environment
./docker-dev.sh up

# Stop development environment
./docker-dev.sh down

# Restart services
./docker-dev.sh restart

# View logs
./docker-dev.sh logs

# Open application shell
./docker-dev.sh shell

# Open MongoDB shell
./docker-dev.sh db-shell

# Open Redis shell
./docker-dev.sh redis-shell

# Clean up everything
./docker-dev.sh clean

# Check application health
./docker-dev.sh health
```

### Makefile Commands

```bash
# Setup development environment
make setup

# Start development
make dev

# Run tests
make test

# Run linter
make lint

# Build application
make build

# Clean up
make clean

# View all commands
make help
```

## Project Structure

```
ma-learn/
├── src/                    # Source code
│   ├── app/               # Next.js app directory
│   ├── collections/       # Payload collections
│   ├── components/        # React components
│   └── hooks/            # Custom hooks
├── scripts/              # Utility scripts
│   └── mongo-init.js     # MongoDB initialization
├── docker-compose.yml    # Docker services
├── docker-compose.override.yml  # Development overrides
├── Dockerfile           # Production image
├── nginx.conf          # Nginx configuration
├── docker-dev.sh       # Development script
├── Makefile           # Development shortcuts
└── .env.example       # Environment template
```

## Environment Configuration

### Required Variables

```env
# Database
DATABASE_URI=mongodb://mongo:27017/malearn

# Payload CMS
PAYLOAD_SECRET=your-secret-key-here

# Application
NEXT_PUBLIC_SERVER_URL=http://localhost:3000
NEXT_PUBLIC_PLATFORM_NAME=MaLearn
```

### Payment Configuration

```env
# Stripe (Fiat Currency)
STRIPE_SECRET_KEY=sk_test_...
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_test_...

# Cryptocurrency
NEXT_PUBLIC_ENABLE_CRYPTO_PAYMENTS=true
NEXT_PUBLIC_SUPPORTED_CHAINS=ethereum,polygon,bsc
```

### Email Configuration

```env
# SMTP Settings
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=your-email@gmail.com
SMTP_PASSWORD=your-app-password
```

## Database Management

### MongoDB

```bash
# Access MongoDB shell
make dev-db

# Reset database
make db-reset

# Seed database
make db-seed

# Backup database
make backup

# Restore database
make restore BACKUP_PATH=./backups/backup-20240101-120000
```

### MongoDB Express

Access the web-based MongoDB management tool at http://localhost:8081

- Username: admin
- Password: admin

## Redis Management

### Redis Commander

Access the Redis management interface at http://localhost:8082

### Redis CLI

```bash
# Access Redis shell
make dev-redis

# Or directly
./docker-dev.sh redis-shell
```

## Testing

```bash
# Run all tests
make test

# Run integration tests
make test-int

# Run e2e tests
make test-e2e
```

## Code Quality

```bash
# Run linter
make lint

# Fix linting issues
make lint-fix

# Security scan
make security-scan
```

## Production Deployment

### Build Production Images

```bash
# Build production images
make prod-build

# Start production environment
make prod

# Stop production environment
make prod-down
```

### Production Configuration

1. Update `.env` with production values
2. Configure SSL certificates
3. Set up proper authentication
4. Configure backup strategies

## Troubleshooting

### Common Issues

1. **Port conflicts**: Change ports in `docker-compose.yml`
2. **Permission issues**: Check Docker user permissions
3. **Database connection**: Verify MongoDB is running
4. **Build failures**: Clean Docker cache with `make clean`

### Debug Commands

```bash
# Check container status
make monitor

# View logs
make logs

# Check application health
make health

# Open application shell
make dev-shell
```

### Performance Optimization

1. **Node modules volume**: Uses Docker volume for faster installs
2. **Bind mounts**: Excludes `.next` directory for better performance
3. **Hot reload**: Enabled in development mode
4. **Database indexes**: Configured in `mongo-init.js`

## E-Learning Features

### Course Management
- Course creation and editing
- Video/document uploads
- Progress tracking
- Quizzes and assessments

### Payment Integration
- Stripe for fiat currency
- Cryptocurrency support
- Subscription management
- Revenue tracking

### User Management
- Role-based access control
- Student progress tracking
- Instructor dashboards
- Admin panel

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Run tests and linting
5. Submit a pull request

## Support

- Documentation: `/docs`
- Issues: GitHub Issues
- Discussions: GitHub Discussions

## License

MIT License - see LICENSE file for details
