// MongoDB initialization script for MaLearn E-Learning Platform
print('Starting MongoDB initialization for MaLearn...')

// Switch to the malearn database
db = db.getSiblingDB('malearn')

// Create application user
db.createUser({
  user: 'malearn_user',
  pwd: 'malearn_password',
  roles: [
    {
      role: 'readWrite',
      db: 'malearn',
    },
  ],
})

// Create collections with proper indexes
// Users collection
db.createCollection('users')
db.users.createIndex({ email: 1 }, { unique: true })
db.users.createIndex({ role: 1 })
db.users.createIndex({ createdAt: 1 })

// Courses collection
db.createCollection('courses')
db.courses.createIndex({ title: 1 })
db.courses.createIndex({ instructor: 1 })
db.courses.createIndex({ category: 1 })
db.courses.createIndex({ price: 1 })
db.courses.createIndex({ status: 1 })
db.courses.createIndex({ createdAt: 1 })
db.courses.createIndex({ updatedAt: 1 })

// Enrollments collection
db.createCollection('enrollments')
db.enrollments.createIndex({ userId: 1, courseId: 1 }, { unique: true })
db.enrollments.createIndex({ userId: 1 })
db.enrollments.createIndex({ courseId: 1 })
db.enrollments.createIndex({ enrolledAt: 1 })

// Payments collection
db.createCollection('payments')
db.payments.createIndex({ userId: 1 })
db.payments.createIndex({ courseId: 1 })
db.payments.createIndex({ paymentMethod: 1 })
db.payments.createIndex({ status: 1 })
db.payments.createIndex({ createdAt: 1 })
db.payments.createIndex({ transactionId: 1 }, { unique: true })

// Categories collection
db.createCollection('categories')
db.categories.createIndex({ name: 1 }, { unique: true })
db.categories.createIndex({ slug: 1 }, { unique: true })

// Reviews collection
db.createCollection('reviews')
db.reviews.createIndex({ courseId: 1 })
db.reviews.createIndex({ userId: 1 })
db.reviews.createIndex({ rating: 1 })
db.reviews.createIndex({ createdAt: 1 })

// Media collection (for file uploads)
db.createCollection('media')
db.media.createIndex({ filename: 1 })
db.media.createIndex({ mimeType: 1 })
db.media.createIndex({ createdAt: 1 })

print('MongoDB initialization completed successfully!')
