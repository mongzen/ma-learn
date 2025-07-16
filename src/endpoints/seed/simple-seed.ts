import config from '@payload-config'
import * as dotenv from 'dotenv'
import { getPayload } from 'payload'

// Load environment variables
dotenv.config()

const seedData = async () => {
  const payload = await getPayload({ config })

  console.log('🌱 Seeding MaLearn E-Learning Platform...')

  try {
    // Create admin user
    console.log('Creating admin user...')
    const adminUser = await payload.create({
      collection: 'users',
      data: {
        name: 'MaLearn Admin',
        email: 'admin@malearn.com',
        password: 'admin123',
        role: 'admin',
      },
    })
    console.log('✓ Admin user created')

    // Create instructor user
    console.log('Creating instructor user...')
    const instructor = await payload.create({
      collection: 'users',
      data: {
        name: 'John Doe',
        email: 'instructor@malearn.com',
        password: 'instructor123',
        role: 'instructor',
      },
    })
    console.log('✓ Instructor user created')

    // Create student user
    console.log('Creating student user...')
    const student = await payload.create({
      collection: 'users',
      data: {
        name: 'Jane Smith',
        email: 'student@malearn.com',
        password: 'student123',
        role: 'student',
      },
    })
    console.log('✓ Student user created')

    // Create categories
    console.log('Creating categories...')
    const webDevCategory = await payload.create({
      collection: 'categories',
      data: {
        title: 'Web Development',
        slug: 'web-development',
      },
    })

    const dataScienceCategory = await payload.create({
      collection: 'categories',
      data: {
        title: 'Data Science',
        slug: 'data-science',
      },
    })

    const designCategory = await payload.create({
      collection: 'categories',
      data: {
        title: 'Design',
        slug: 'design',
      },
    })
    console.log('✓ Categories created')

    console.log('\n🎉 MaLearn basic seeding completed successfully!')
    console.log('\nLogin credentials:')
    console.log('Admin: admin@malearn.com / admin123')
    console.log('Instructor: instructor@malearn.com / instructor123')
    console.log('Student: student@malearn.com / student123')
    console.log('\nAccess the admin panel at: http://localhost:3000/admin')
    console.log('You can now create courses, quizzes, and test the platform!')
  } catch (error) {
    console.error('Error seeding data:', error)
    process.exit(1)
  }

  process.exit(0)
}

seedData()
