import config from '@payload-config'
import { getPayload } from 'payload'

const seedData = async () => {
  const payload = await getPayload({ config })

  console.log('🌱 Seeding MaLearn E-Learning Platform...')

  try {
    // Create admin user
    const adminUser = await payload.create({
      collection: 'users',
      data: {
        name: 'MaLearn Admin',
        email: 'admin@malearn.com',
        password: 'admin123',
        role: 'admin',
        profile: {
          bio: 'Platform Administrator',
          title: 'System Administrator',
        },
      },
    })
    console.log('✓ Admin user created')

    // Create sample instructor
    const instructor = await payload.create({
      collection: 'users',
      data: {
        name: 'John Doe',
        email: 'instructor@malearn.com',
        password: 'instructor123',
        role: 'instructor',
        profile: {
          bio: 'Experienced software developer and educator with 10+ years in the industry.',
          title: 'Senior Software Engineer',
          website: 'https://johndoe.dev',
        },
        instructorProfile: {
          expertise: [
            { area: 'JavaScript' },
            { area: 'React' },
            { area: 'Node.js' },
            { area: 'TypeScript' },
          ],
          experience: 10,
          qualifications: [
            {
              title: 'B.S. Computer Science',
              institution: 'MIT',
              year: 2010,
            },
            {
              title: 'AWS Certified Solutions Architect',
              institution: 'Amazon Web Services',
              year: 2020,
            },
          ],
        },
      },
    })
    console.log('✓ Instructor user created')

    // Create sample student
    const student = await payload.create({
      collection: 'users',
      data: {
        name: 'Jane Smith',
        email: 'student@malearn.com',
        password: 'student123',
        role: 'student',
        profile: {
          bio: 'Aspiring web developer eager to learn new technologies.',
          title: 'Junior Developer',
        },
      },
    })
    console.log('✓ Student user created')

    // Create categories
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

    // Create sample courses
    const reactCourse = await payload.create({
      collection: 'courses',
      data: {
        title: 'Complete React Developer Course',
        slug: 'complete-react-developer-course',
        description:
          'Master React from basics to advanced topics including hooks, context, and modern patterns.',
        shortDescription:
          'Learn React from scratch with hands-on projects and real-world examples.',
        instructor: instructor.id,
        category: webDevCategory.id,
        tags: [
          { tag: 'React' },
          { tag: 'JavaScript' },
          { tag: 'Frontend' },
          { tag: 'Web Development' },
        ],
        price: {
          fiatPrice: 99.99,
          cryptoPrice: [
            { currency: 'eth', price: 0.05 },
            { currency: 'btc', price: 0.002 },
          ],
        },
        duration: {
          hours: 40,
          lessons: 150,
        },
        difficulty: 'intermediate',
        language: 'en',
        requirements: [
          { requirement: 'Basic knowledge of HTML and CSS' },
          { requirement: 'Basic JavaScript understanding' },
          { requirement: 'Computer with internet connection' },
        ],
        whatYouWillLearn: [
          { outcome: 'Build modern React applications' },
          { outcome: 'Understand React hooks and context' },
          { outcome: 'Master state management' },
          { outcome: 'Deploy React applications' },
        ],
        curriculum: [
          {
            sectionTitle: 'Getting Started with React',
            lessons: [
              {
                title: 'What is React?',
                type: 'video',
                duration: 15,
                isFree: true,
              },
              {
                title: 'Setting up Development Environment',
                type: 'video',
                duration: 20,
                isFree: true,
              },
              {
                title: 'Your First React Component',
                type: 'video',
                duration: 25,
                isFree: false,
              },
            ],
          },
          {
            sectionTitle: 'React Fundamentals',
            lessons: [
              {
                title: 'Components and Props',
                type: 'video',
                duration: 30,
                isFree: false,
              },
              {
                title: 'State and Event Handling',
                type: 'video',
                duration: 35,
                isFree: false,
              },
              {
                title: 'Quiz: React Basics',
                type: 'quiz',
                duration: 10,
                isFree: false,
              },
            ],
          },
        ],
        status: 'published',
        featured: true,
        seo: {
          metaTitle: 'Complete React Developer Course - Learn React from Scratch',
          metaDescription:
            'Master React development with this comprehensive course. Learn hooks, context, state management, and build real projects.',
          keywords: 'react, javascript, frontend, web development, hooks, context',
        },
      },
    })
    console.log('✓ React course created')

    // Create Python course
    const pythonCourse = await payload.create({
      collection: 'courses',
      data: {
        title: 'Python for Data Science',
        slug: 'python-for-data-science',
        description:
          'Learn Python programming focused on data analysis, visualization, and machine learning.',
        shortDescription:
          'Master Python for data science with pandas, matplotlib, and scikit-learn.',
        instructor: instructor.id,
        category: dataScienceCategory.id,
        tags: [
          { tag: 'Python' },
          { tag: 'Data Science' },
          { tag: 'Machine Learning' },
          { tag: 'Analytics' },
        ],
        price: {
          fiatPrice: 79.99,
          cryptoPrice: [
            { currency: 'eth', price: 0.04 },
            { currency: 'btc', price: 0.0015 },
          ],
        },
        duration: {
          hours: 35,
          lessons: 120,
        },
        difficulty: 'beginner',
        language: 'en',
        requirements: [
          { requirement: 'Basic computer skills' },
          { requirement: 'No prior programming experience needed' },
        ],
        whatYouWillLearn: [
          { outcome: 'Master Python fundamentals' },
          { outcome: 'Analyze data with pandas' },
          { outcome: 'Create visualizations with matplotlib' },
          { outcome: 'Build machine learning models' },
        ],
        status: 'published',
        featured: false,
        seo: {
          metaTitle: 'Python for Data Science - Complete Beginner Course',
          metaDescription:
            'Learn Python programming for data science. Master pandas, matplotlib, and machine learning from scratch.',
          keywords: 'python, data science, machine learning, pandas, matplotlib',
        },
      },
    })
    console.log('✓ Python course created')

    // Create Node.js course
    const nodeCourse = await payload.create({
      collection: 'courses',
      data: {
        title: 'Node.js Backend Development',
        slug: 'nodejs-backend-development',
        description:
          'Learn to build scalable backend applications with Node.js, Express, and MongoDB. Master REST APIs, authentication, and deployment.',
        shortDescription:
          'Complete Node.js course covering server-side development, APIs, and database integration.',
        instructor: instructor.id,
        category: webDevCategory.id,
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
        description:
          'Learn the principles of user interface and user experience design. Master Figma, design thinking, and create stunning digital experiences.',
        shortDescription:
          'Complete UI/UX design course covering design principles, Figma, and user research.',
        instructor: instructor.id,
        category: designCategory.id,
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
        description:
          'Dive deep into machine learning algorithms and techniques using Python. Learn supervised and unsupervised learning, neural networks, and real-world applications.',
        shortDescription:
          'Comprehensive machine learning course with Python, scikit-learn, and TensorFlow.',
        instructor: instructor.id,
        category: dataScienceCategory.id,
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

    // Create sample quiz
    const reactQuiz = await payload.create({
      collection: 'quizzes',
      data: {
        title: 'React Basics Quiz',
        description: 'Test your understanding of React fundamentals',
        course: reactCourse.id,
        questions: [
          {
            question: 'What is React?',
            type: 'multiple_choice',
            options: [
              { text: 'A JavaScript library for building user interfaces', isCorrect: true },
              { text: 'A database management system', isCorrect: false },
              { text: 'A server-side framework', isCorrect: false },
              { text: 'A CSS framework', isCorrect: false },
            ],
            explanation:
              'React is a JavaScript library developed by Facebook for building user interfaces, particularly for web applications.',
            points: 1,
          },
          {
            question: 'React components must return a single parent element.',
            type: 'true_false',
            options: [
              { text: 'True', isCorrect: true },
              { text: 'False', isCorrect: false },
            ],
            explanation:
              'React components must return a single parent element or use React Fragment to wrap multiple elements.',
            points: 1,
          },
          {
            question: 'What is the purpose of props in React?',
            type: 'short_answer',
            correctAnswer:
              'Props are used to pass data from parent components to child components.',
            explanation:
              'Props (properties) are read-only data passed from parent to child components.',
            points: 2,
          },
        ],
        settings: {
          passingScore: 75,
          timeLimit: 15,
          allowedAttempts: 3,
          randomizeQuestions: false,
          showCorrectAnswers: true,
          showScore: true,
        },
        status: 'published',
      },
    })
    console.log('✓ React quiz created')

    // Create sample enrollment
    const enrollment = await payload.create({
      collection: 'enrollments',
      data: {
        student: student.id,
        course: reactCourse.id,
        enrolledAt: new Date(),
        status: 'active',
        progress: {
          completedLessons: [
            {
              lessonId: 'lesson-1',
              completedAt: new Date(),
              watchTime: 900, // 15 minutes
            },
          ],
          overallProgress: 10,
          lastAccessedAt: new Date(),
        },
        payment: {
          paymentMethod: 'stripe',
          paymentStatus: 'completed',
          transactionId: 'txn_test_123456',
          amount: 99.99,
          currency: 'usd',
          paidAt: new Date(),
        },
      },
    })
    console.log('✓ Sample enrollment created')

    console.log('\n🎉 MaLearn seeding completed successfully!')
    console.log('\nLogin credentials:')
    console.log('Admin: admin@malearn.com / admin123')
    console.log('Instructor: instructor@malearn.com / instructor123')
    console.log('Student: student@malearn.com / student123')
    console.log('\nAccess the admin panel at: http://localhost:3000/admin')
  } catch (error) {
    console.error('Error seeding data:', error)
  }
}

seedData()
