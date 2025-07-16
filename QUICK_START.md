# MaLearn E-Learning Platform - Quick Start Guide

## 🚀 Getting Started in 5 Minutes

### Step 1: Prerequisites Check
```bash
# Check if Docker is installed
docker --version

# Check if Node.js is installed
node --version

# Check if pnpm is installed
pnpm --version
```

### Step 2: Clone and Setup
```bash
# Clone the repository
git clone <repository-url>
cd ma-learn

# Create environment file
cp .env.example .env

# Install dependencies
pnpm install
```

### Step 3: Start Services
```bash
# Start database services
docker-compose up -d mongo redis

# Start the application
pnpm dev
```

### Step 4: Access the Platform
- **Application**: http://localhost:3000
- **Admin Panel**: http://localhost:3000/admin

### Step 5: Create Your First Admin User
1. Go to http://localhost:3000/admin
2. Click "Create First User"
3. Fill in your details:
   - **Name**: Your Name
   - **Email**: admin@malearn.com
   - **Password**: admin123
   - **Role**: Admin

## 🎯 What's Next?

### Create Your First Course
1. Login to admin panel
2. Go to "E-Learning" → "Courses"
3. Click "Create New"
4. Fill in course details:
   - Title: "My First Course"
   - Description: Course overview
   - Price: Set your pricing
   - Category: Choose or create category

### Add Course Content
1. In course editor, go to "Curriculum" section
2. Add sections and lessons
3. Upload videos, documents, or create quizzes
4. Set lesson types (video, text, quiz, etc.)

### Test Student Experience
1. Create a test student account
2. Enroll in your course
3. Test the learning experience
4. Check progress tracking

## 🔧 Development Commands

```bash
# Development
make dev              # Start development environment
make dev-logs         # View application logs
make dev-shell        # Open application shell

# Database
make dev-db           # Access MongoDB shell
make dev-redis        # Access Redis shell

# Testing
make test             # Run all tests
make lint             # Run linter
```

## 💡 Tips for Success

1. **Start Simple**: Create a basic course first
2. **Test Early**: Always test as both instructor and student
3. **Use Docker**: Simplifies development setup
4. **Check Logs**: Use `make dev-logs` for debugging
5. **Backup Data**: Use `make backup` before major changes

## 🆘 Common Issues

### Port Already in Use
```bash
# If port 3000 is busy
lsof -ti:3000 | xargs kill -9
```

### Database Connection Issues
```bash
# Restart MongoDB
docker-compose restart mongo
```

### Application Won't Start
```bash
# Clean restart
make clean
make dev
```

## 📚 Next Steps

1. **Read the Documentation**: Check `DOCKER_SETUP.md`
2. **Explore Collections**: Understand the data structure
3. **Customize UI**: Modify components in `src/components`
4. **Add Features**: Extend collections and APIs
5. **Deploy**: Use production setup when ready

## 🎉 You're Ready!

Your MaLearn platform is now running. Start creating amazing courses and building your educational empire!

---

**Need help?** Check the full documentation or open an issue on GitHub.
