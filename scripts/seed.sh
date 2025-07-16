#!/bin/bash

# MaLearn Database Seeding Script
# This script seeds the database with sample data for development

echo "🌱 Seeding MaLearn E-Learning Platform Database..."

# Check if MongoDB is running
if ! docker-compose ps | grep -q "mongo.*Up"; then
    echo "❌ MongoDB is not running. Please start it first with:"
    echo "   docker-compose up -d mongo"
    exit 1
fi

# Check if the application is running
if ! curl -s http://localhost:3000/api/health > /dev/null; then
    echo "❌ Application is not running. Please start it first with:"
    echo "   pnpm dev"
    exit 1
fi

echo "✅ Prerequisites checked"

# Use the Payload CLI to seed the database
echo "🔄 Running database seed..."

# Create a temporary seed file
cat > /tmp/seed.js << 'EOF'
const axios = require('axios');

const seedData = async () => {
  const baseURL = 'http://localhost:3000/api';

  try {
    // Create admin user
    console.log('Creating admin user...');
    const adminResponse = await axios.post(`${baseURL}/users`, {
      name: 'MaLearn Admin',
      email: 'admin@malearn.com',
      password: 'admin123',
      role: 'admin'
    });
    console.log('✓ Admin user created');

    // Create instructor user
    console.log('Creating instructor user...');
    const instructorResponse = await axios.post(`${baseURL}/users`, {
      name: 'John Doe',
      email: 'instructor@malearn.com',
      password: 'instructor123',
      role: 'instructor'
    });
    console.log('✓ Instructor user created');

    // Create student user
    console.log('Creating student user...');
    const studentResponse = await axios.post(`${baseURL}/users`, {
      name: 'Jane Smith',
      email: 'student@malearn.com',
      password: 'student123',
      role: 'student'
    });
    console.log('✓ Student user created');

    console.log('\n🎉 Database seeding completed successfully!');
    console.log('\nLogin credentials:');
    console.log('Admin: admin@malearn.com / admin123');
    console.log('Instructor: instructor@malearn.com / instructor123');
    console.log('Student: student@malearn.com / student123');
    console.log('\nAccess the admin panel at: http://localhost:3000/admin');

  } catch (error) {
    console.error('Error seeding data:', error.response?.data || error.message);
  }
};

seedData();
EOF

# Run the seed script
node /tmp/seed.js

# Clean up
rm /tmp/seed.js

echo "✅ Seeding process completed!"
