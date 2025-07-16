import config from '@payload-config'
import { getPayload } from 'payload'

const addCategories = async () => {
  const payload = await getPayload({ config })

  console.log('🌱 Adding categories to MaLearn...')

  try {
    // Check existing categories
    const existingCategories = await payload.find({
      collection: 'categories',
      limit: 10
    })

    console.log('Found existing categories:', existingCategories.docs.map(c => c.slug))

    // Add categories if they don't exist
    const categoriesToAdd = [
      { title: 'Web Development', slug: 'web-development' },
      { title: 'Data Science', slug: 'data-science' },
      { title: 'Design', slug: 'design' }
    ]

    for (const cat of categoriesToAdd) {
      const exists = existingCategories.docs.find(c => c.slug === cat.slug)
      if (!exists) {
        await payload.create({
          collection: 'categories',
          data: cat
        })
        console.log(`✓ Created category: ${cat.title}`)
      } else {
        console.log(`- Category already exists: ${cat.title}`)
      }
    }

    console.log('✓ Categories setup complete')
  } catch (error) {
    console.error('Error adding categories:', error)
  }
}

addCategories()
