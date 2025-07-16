import type { CollectionConfig } from 'payload'
import { authenticated } from '../access/authenticated'
import { authenticatedOrPublished } from '../access/authenticatedOrPublished'

export const Courses: CollectionConfig = {
  slug: 'courses',
  labels: {
    singular: 'Course',
    plural: 'Courses',
  },
  admin: {
    useAsTitle: 'title',
    defaultColumns: ['title', 'instructor', 'price', 'status', 'updatedAt'],
    group: 'E-Learning',
  },
  access: {
    read: authenticatedOrPublished,
    create: authenticated,
    update: authenticated,
    delete: authenticated,
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      required: true,
      label: 'Course Title',
    },
    {
      name: 'slug',
      type: 'text',
      required: true,
      unique: true,
      label: 'Course Slug',
      admin: {
        position: 'sidebar',
      },
      hooks: {
        beforeChange: [
          ({ value, data }) => {
            if (!value && data?.title) {
              return data.title
                .toLowerCase()
                .replace(/[^a-z0-9\s-]/g, '')
                .replace(/\s+/g, '-')
                .replace(/-+/g, '-')
            }
            return value
          },
        ],
      },
    },
    {
      name: 'description',
      type: 'richText',
      required: true,
      label: 'Course Description',
    },
    {
      name: 'shortDescription',
      type: 'textarea',
      required: true,
      label: 'Short Description',
      maxLength: 200,
    },
    {
      name: 'instructor',
      type: 'relationship',
      relationTo: 'users',
      required: true,
      label: 'Instructor',
      filterOptions: {
        role: {
          equals: 'instructor',
        },
      },
    },
    {
      name: 'category',
      type: 'relationship',
      relationTo: 'categories',
      required: true,
      label: 'Course Category',
    },
    {
      name: 'tags',
      type: 'array',
      label: 'Tags',
      fields: [
        {
          name: 'tag',
          type: 'text',
          required: true,
        },
      ],
    },
    {
      name: 'thumbnail',
      type: 'upload',
      relationTo: 'media',
      required: true,
      label: 'Course Thumbnail',
    },
    {
      name: 'trailer',
      type: 'upload',
      relationTo: 'media',
      label: 'Course Trailer Video',
      filterOptions: {
        mimeType: {
          contains: 'video',
        },
      },
    },
    {
      name: 'price',
      type: 'group',
      label: 'Pricing',
      fields: [
        {
          name: 'fiatPrice',
          type: 'number',
          required: true,
          label: 'Fiat Price (USD)',
          min: 0,
        },
        {
          name: 'cryptoPrice',
          type: 'array',
          label: 'Cryptocurrency Prices',
          fields: [
            {
              name: 'currency',
              type: 'select',
              required: true,
              options: [
                { label: 'Ethereum (ETH)', value: 'eth' },
                { label: 'Bitcoin (BTC)', value: 'btc' },
                { label: 'Polygon (MATIC)', value: 'matic' },
                { label: 'Binance Coin (BNB)', value: 'bnb' },
              ],
            },
            {
              name: 'price',
              type: 'number',
              required: true,
              min: 0,
            },
          ],
        },
      ],
    },
    {
      name: 'duration',
      type: 'group',
      label: 'Course Duration',
      fields: [
        {
          name: 'hours',
          type: 'number',
          required: true,
          label: 'Duration (Hours)',
          min: 0,
        },
        {
          name: 'lessons',
          type: 'number',
          required: true,
          label: 'Number of Lessons',
          min: 1,
        },
      ],
    },
    {
      name: 'difficulty',
      type: 'select',
      required: true,
      label: 'Difficulty Level',
      options: [
        { label: 'Beginner', value: 'beginner' },
        { label: 'Intermediate', value: 'intermediate' },
        { label: 'Advanced', value: 'advanced' },
      ],
    },
    {
      name: 'language',
      type: 'select',
      required: true,
      label: 'Course Language',
      options: [
        { label: 'English', value: 'en' },
        { label: 'Thai', value: 'th' },
        { label: 'Spanish', value: 'es' },
        { label: 'French', value: 'fr' },
        { label: 'German', value: 'de' },
        { label: 'Chinese', value: 'zh' },
        { label: 'Japanese', value: 'ja' },
      ],
    },
    {
      name: 'requirements',
      type: 'array',
      label: 'Requirements',
      fields: [
        {
          name: 'requirement',
          type: 'text',
          required: true,
        },
      ],
    },
    {
      name: 'whatYouWillLearn',
      type: 'array',
      label: 'What You Will Learn',
      fields: [
        {
          name: 'outcome',
          type: 'text',
          required: true,
        },
      ],
    },
    {
      name: 'curriculum',
      type: 'array',
      label: 'Course Curriculum',
      fields: [
        {
          name: 'sectionTitle',
          type: 'text',
          required: true,
          label: 'Section Title',
        },
        {
          name: 'lessons',
          type: 'array',
          label: 'Lessons',
          fields: [
            {
              name: 'title',
              type: 'text',
              required: true,
              label: 'Lesson Title',
            },
            {
              name: 'type',
              type: 'select',
              required: true,
              label: 'Lesson Type',
              options: [
                { label: 'Video', value: 'video' },
                { label: 'Text', value: 'text' },
                { label: 'Quiz', value: 'quiz' },
                { label: 'Assignment', value: 'assignment' },
                { label: 'Download', value: 'download' },
              ],
            },
            {
              name: 'duration',
              type: 'number',
              label: 'Duration (Minutes)',
              min: 0,
            },
            {
              name: 'content',
              type: 'group',
              label: 'Lesson Content',
              fields: [
                {
                  name: 'video',
                  type: 'upload',
                  relationTo: 'media',
                  label: 'Video File',
                  admin: {
                    condition: (data, siblingData) => siblingData.type === 'video',
                  },
                  filterOptions: {
                    mimeType: {
                      contains: 'video',
                    },
                  },
                },
                {
                  name: 'text',
                  type: 'richText',
                  label: 'Text Content',
                  admin: {
                    condition: (data, siblingData) => siblingData.type === 'text',
                  },
                },
                {
                  name: 'quiz',
                  type: 'relationship',
                  relationTo: 'quizzes',
                  label: 'Quiz',
                  admin: {
                    condition: (data, siblingData) => siblingData.type === 'quiz',
                  },
                },
                {
                  name: 'downloadFile',
                  type: 'upload',
                  relationTo: 'media',
                  label: 'Download File',
                  admin: {
                    condition: (data, siblingData) => siblingData.type === 'download',
                  },
                },
              ],
            },
            {
              name: 'isFree',
              type: 'checkbox',
              label: 'Free Preview',
              defaultValue: false,
            },
          ],
        },
      ],
    },
    {
      name: 'status',
      type: 'select',
      required: true,
      label: 'Course Status',
      options: [
        { label: 'Draft', value: 'draft' },
        { label: 'Published', value: 'published' },
        { label: 'Archived', value: 'archived' },
      ],
      defaultValue: 'draft',
      admin: {
        position: 'sidebar',
      },
    },
    {
      name: 'featured',
      type: 'checkbox',
      label: 'Featured Course',
      defaultValue: false,
      admin: {
        position: 'sidebar',
      },
    },
    {
      name: 'certificateTemplate',
      type: 'upload',
      relationTo: 'media',
      label: 'Certificate Template',
      admin: {
        position: 'sidebar',
      },
    },
    {
      name: 'seo',
      type: 'group',
      label: 'SEO Settings',
      fields: [
        {
          name: 'metaTitle',
          type: 'text',
          label: 'Meta Title',
          maxLength: 60,
        },
        {
          name: 'metaDescription',
          type: 'textarea',
          label: 'Meta Description',
          maxLength: 160,
        },
        {
          name: 'keywords',
          type: 'text',
          label: 'Keywords (comma separated)',
        },
      ],
    },
    {
      name: 'analytics',
      type: 'group',
      label: 'Analytics',
      admin: {
        position: 'sidebar',
      },
      fields: [
        {
          name: 'enrollmentCount',
          type: 'number',
          label: 'Total Enrollments',
          defaultValue: 0,
          admin: {
            readOnly: true,
          },
        },
        {
          name: 'completionRate',
          type: 'number',
          label: 'Completion Rate (%)',
          defaultValue: 0,
          admin: {
            readOnly: true,
          },
        },
        {
          name: 'averageRating',
          type: 'number',
          label: 'Average Rating',
          defaultValue: 0,
          admin: {
            readOnly: true,
          },
        },
        {
          name: 'totalRevenue',
          type: 'number',
          label: 'Total Revenue (USD)',
          defaultValue: 0,
          admin: {
            readOnly: true,
          },
        },
      ],
    },
  ],
  hooks: {
    beforeChange: [
      ({ data, req }) => {
        // Set instructor to current user if user is instructor
        if (req.user?.role === 'instructor' && !data.instructor) {
          data.instructor = req.user.id
        }
        return data
      },
    ],
  },
  timestamps: true,
}
