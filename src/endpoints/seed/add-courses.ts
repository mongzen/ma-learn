import config from '@payload-config'
import { getPayload } from 'payload'
import fs from 'fs'
import path from 'path'

const addMoreCourses = async () => {
  const payload = await getPayload({ config })

  console.log('🌱 Adding more courses to MaLearn...')

  try {
    // Get existing instructor and categories
    const instructors = await payload.find({
      collection: 'users',
      where: { role: { equals: 'instructor' } },
      limit: 1
    })

    const categories = await payload.find({
      collection: 'categories',
      limit: 10
    })

    if (instructors.docs.length === 0) {
      console.log('❌ No instructor found in database')
      return
    }

    const instructor = instructors.docs[0]
    const webDevCategory = categories.docs.find(c => c.slug === 'web-development')
    const dataScienceCategory = categories.docs.find(c => c.slug === 'data-science')  
    const designCategory = categories.docs.find(c => c.slug === 'design')

    // Check for existing media files first
    const existingMedia = await payload.find({
      collection: 'media',
      limit: 1
    })

    let dummyMedia
    if (existingMedia.docs.length > 0) {
      dummyMedia = existingMedia.docs[0]
      console.log('✓ Using existing media file')
    } else {
      // Skip media creation for now and use null
      console.log('! No media files found, courses will be created without thumbnails')
      dummyMedia = null
    }

    // Create Node.js course
    const nodeCourse = await payload.create({
      collection: 'courses',
      data: {
        title: 'Node.js Backend Development',
        slug: 'nodejs-backend-development',
        description: {
          root: {
            type: 'root',
            children: [
              {
                type: 'paragraph',
                version: 1,
                children: [
                  {
                    type: 'text',
                    version: 1,
                    text: 'Learn to build scalable backend applications with Node.js, Express, and MongoDB. Master REST APIs, authentication, and deployment.',
                  },
                ],
              },
            ],
            direction: 'ltr',
            format: '',
            indent: 0,
            version: 1,
          },
        },
        shortDescription:
          'Complete Node.js course covering server-side development, APIs, and database integration.',
        instructor: instructor.id,
        category: webDevCategory?.id,
        thumbnail: dummyMedia?.id,
        tags: [
          { tag: 'Node.js' },
          { tag: 'Backend' },
          { tag: 'Express' },
          { tag: 'MongoDB' },
          { tag: 'API' },
        ],
        price: {
          fiatPrice: 89.99,
          cryptoPrice: [
            { currency: 'eth', price: 0.045 },
            { currency: 'btc', price: 0.0018 },
          ],
        },
        duration: {
          hours: 45,
          lessons: 180,
        },
        difficulty: 'intermediate',
        language: 'en',
        requirements: [
          { requirement: 'Basic JavaScript knowledge' },
          { requirement: 'Understanding of HTTP protocols' },
          { requirement: 'Basic command line skills' },
        ],
        whatYouWillLearn: [
          { outcome: 'Build REST APIs with Express.js' },
          { outcome: 'Database integration with MongoDB' },
          { outcome: 'Authentication and authorization' },
          { outcome: 'Deploy applications to production' },
          { outcome: 'Error handling and logging' },
        ],
        curriculum: [
          {
            sectionTitle: 'Node.js Fundamentals',
            lessons: [
              {
                title: 'Introduction to Node.js',
                type: 'video',
                duration: 20,
                isFree: true,
              },
              {
                title: 'Setting up Development Environment',
                type: 'video',
                duration: 15,
                isFree: true,
              },
              {
                title: 'Node.js Modules and NPM',
                type: 'video',
                duration: 25,
                isFree: false,
              },
            ],
          },
          {
            sectionTitle: 'Express.js Framework',
            lessons: [
              {
                title: 'Getting Started with Express',
                type: 'video',
                duration: 30,
                isFree: false,
              },
              {
                title: 'Routing and Middleware',
                type: 'video',
                duration: 40,
                isFree: false,
              },
              {
                title: 'Building REST APIs',
                type: 'video',
                duration: 45,
                isFree: false,
              },
            ],
          },
        ],
        status: 'published',
        featured: true,
        seo: {
          metaTitle: 'Node.js Backend Development - Complete Course',
          metaDescription:
            'Master Node.js backend development with Express, MongoDB, and REST APIs. Build scalable server applications.',
          keywords: 'nodejs, backend, express, mongodb, rest api, server development',
        },
      },
    })
    console.log('✓ Node.js course created')

    // Create UI/UX Design course
    const uiuxCourse = await payload.create({
      collection: 'courses',
      data: {
        title: 'UI/UX Design Fundamentals',
        slug: 'ui-ux-design-fundamentals',
        description: {
          root: {
            type: 'root',
            children: [
              {
                type: 'paragraph',
                version: 1,
                children: [
                  {
                    type: 'text',
                    version: 1,
                    text: 'Learn the principles of user interface and user experience design. Master Figma, design thinking, and create stunning digital experiences.',
                  },
                ],
              },
            ],
            direction: 'ltr',
            format: '',
            indent: 0,
            version: 1,
          },
        },
        shortDescription:
          'Complete UI/UX design course covering design principles, Figma, and user research.',
        instructor: instructor.id,
        category: designCategory?.id,
        thumbnail: dummyMedia?.id,
        tags: [
          { tag: 'UI Design' },
          { tag: 'UX Design' },
          { tag: 'Figma' },
          { tag: 'Design Thinking' },
          { tag: 'User Research' },
        ],
        price: {
          fiatPrice: 69.99,
          cryptoPrice: [
            { currency: 'eth', price: 0.035 },
            { currency: 'btc', price: 0.0014 },
          ],
        },
        duration: {
          hours: 30,
          lessons: 100,
        },
        difficulty: 'beginner',
        language: 'en',
        requirements: [
          { requirement: 'Basic computer skills' },
          { requirement: 'Interest in design and creativity' },
          { requirement: 'No prior design experience needed' },
        ],
        whatYouWillLearn: [
          { outcome: 'Master UI/UX design principles' },
          { outcome: 'Create professional designs in Figma' },
          { outcome: 'Conduct user research and testing' },
          { outcome: 'Build design systems and components' },
          { outcome: 'Create wireframes and prototypes' },
        ],
        curriculum: [
          {
            sectionTitle: 'Design Fundamentals',
            lessons: [
              {
                title: 'Introduction to UI/UX Design',
                type: 'video',
                duration: 25,
                isFree: true,
              },
              {
                title: 'Design Principles and Theory',
                type: 'video',
                duration: 30,
                isFree: true,
              },
              {
                title: 'Color Theory and Typography',
                type: 'video',
                duration: 35,
                isFree: false,
              },
            ],
          },
          {
            sectionTitle: 'Figma Mastery',
            lessons: [
              {
                title: 'Getting Started with Figma',
                type: 'video',
                duration: 20,
                isFree: false,
              },
              {
                title: 'Creating Components and Variants',
                type: 'video',
                duration: 40,
                isFree: false,
              },
              {
                title: 'Prototyping and Interactions',
                type: 'video',
                duration: 45,
                isFree: false,
              },
            ],
          },
        ],
        status: 'published',
        featured: false,
        seo: {
          metaTitle: 'UI/UX Design Fundamentals - Complete Beginner Course',
          metaDescription:
            'Learn UI/UX design from scratch. Master Figma, design principles, and create beautiful user experiences.',
          keywords: 'ui design, ux design, figma, design thinking, user research, prototyping',
        },
      },
    })
    console.log('✓ UI/UX Design course created')

    // Create Machine Learning course
    const mlCourse = await payload.create({
      collection: 'courses',
      data: {
        title: 'Machine Learning with Python',
        slug: 'machine-learning-with-python',
        description: {
          root: {
            type: 'root',
            children: [
              {
                type: 'paragraph',
                version: 1,
                children: [
                  {
                    type: 'text',
                    version: 1,
                    text: 'Dive deep into machine learning algorithms and techniques using Python. Learn supervised and unsupervised learning, neural networks, and real-world applications.',
                  },
                ],
              },
            ],
            direction: 'ltr',
            format: '',
            indent: 0,
            version: 1,
          },
        },
        shortDescription:
          'Comprehensive machine learning course with Python, scikit-learn, and TensorFlow.',
        instructor: instructor.id,
        category: dataScienceCategory?.id,
        thumbnail: dummyMedia?.id,
        tags: [
          { tag: 'Machine Learning' },
          { tag: 'Python' },
          { tag: 'Scikit-learn' },
          { tag: 'TensorFlow' },
          { tag: 'Deep Learning' },
        ],
        price: {
          fiatPrice: 129.99,
          cryptoPrice: [
            { currency: 'eth', price: 0.065 },
            { currency: 'btc', price: 0.0026 },
          ],
        },
        duration: {
          hours: 60,
          lessons: 200,
        },
        difficulty: 'advanced',
        language: 'en',
        requirements: [
          { requirement: 'Strong Python programming skills' },
          { requirement: 'Basic understanding of mathematics and statistics' },
          { requirement: 'Experience with NumPy and Pandas' },
        ],
        whatYouWillLearn: [
          { outcome: 'Master machine learning algorithms' },
          { outcome: 'Build predictive models with scikit-learn' },
          { outcome: 'Create neural networks with TensorFlow' },
          { outcome: 'Handle real-world datasets' },
          { outcome: 'Deploy ML models to production' },
        ],
        curriculum: [
          {
            sectionTitle: 'ML Fundamentals',
            lessons: [
              {
                title: 'Introduction to Machine Learning',
                type: 'video',
                duration: 30,
                isFree: true,
              },
              {
                title: 'Types of Machine Learning',
                type: 'video',
                duration: 25,
                isFree: true,
              },
              {
                title: 'Setting up ML Environment',
                type: 'video',
                duration: 20,
                isFree: false,
              },
            ],
          },
          {
            sectionTitle: 'Supervised Learning',
            lessons: [
              {
                title: 'Linear and Logistic Regression',
                type: 'video',
                duration: 50,
                isFree: false,
              },
              {
                title: 'Decision Trees and Random Forest',
                type: 'video',
                duration: 45,
                isFree: false,
              },
              {
                title: 'Support Vector Machines',
                type: 'video',
                duration: 40,
                isFree: false,
              },
            ],
          },
          {
            sectionTitle: 'Deep Learning',
            lessons: [
              {
                title: 'Neural Networks Basics',
                type: 'video',
                duration: 60,
                isFree: false,
              },
              {
                title: 'Convolutional Neural Networks',
                type: 'video',
                duration: 55,
                isFree: false,
              },
              {
                title: 'Building with TensorFlow',
                type: 'video',
                duration: 50,
                isFree: false,
              },
            ],
          },
        ],
        status: 'published',
        featured: true,
        seo: {
          metaTitle: 'Machine Learning with Python - Advanced Course',
          metaDescription:
            'Master machine learning with Python, scikit-learn, and TensorFlow. Build predictive models and neural networks.',
          keywords: 'machine learning, python, scikit-learn, tensorflow, deep learning, neural networks',
        },
      },
    })
    console.log('✓ Machine Learning course created')

    console.log('\n🎉 Successfully added 3 new courses to MaLearn!')
    console.log('\nNew courses added:')
    console.log('1. Node.js Backend Development - $89.99')
    console.log('2. UI/UX Design Fundamentals - $69.99')
    console.log('3. Machine Learning with Python - $129.99')
    console.log('\nAccess the admin panel at: http://localhost:3000/admin to manage courses')
  } catch (error) {
    console.error('Error adding courses:', error)
  }
}

addMoreCourses()
