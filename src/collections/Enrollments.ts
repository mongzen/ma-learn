import type { CollectionConfig } from 'payload'
import { authenticated } from '../access/authenticated'

export const Enrollments: CollectionConfig = {
  slug: 'enrollments',
  labels: {
    singular: 'Enrollment',
    plural: 'Enrollments',
  },
  admin: {
    useAsTitle: 'id',
    defaultColumns: ['student', 'course', 'enrolledAt', 'progress', 'status'],
    group: 'E-Learning',
  },
  access: {
    read: authenticated,
    create: authenticated,
    update: authenticated,
    delete: authenticated,
  },
  fields: [
    {
      name: 'student',
      type: 'relationship',
      relationTo: 'users',
      required: true,
      label: 'Student',
      filterOptions: {
        role: {
          equals: 'student',
        },
      },
    },
    {
      name: 'course',
      type: 'relationship',
      relationTo: 'courses',
      required: true,
      label: 'Course',
    },
    {
      name: 'enrolledAt',
      type: 'date',
      required: true,
      label: 'Enrollment Date',
      defaultValue: () => new Date(),
    },
    {
      name: 'status',
      type: 'select',
      required: true,
      label: 'Enrollment Status',
      options: [
        { label: 'Active', value: 'active' },
        { label: 'Completed', value: 'completed' },
        { label: 'Dropped', value: 'dropped' },
        { label: 'Suspended', value: 'suspended' },
      ],
      defaultValue: 'active',
    },
    {
      name: 'progress',
      type: 'group',
      label: 'Course Progress',
      fields: [
        {
          name: 'completedLessons',
          type: 'array',
          label: 'Completed Lessons',
          fields: [
            {
              name: 'lessonId',
              type: 'text',
              required: true,
              label: 'Lesson ID',
            },
            {
              name: 'completedAt',
              type: 'date',
              required: true,
              label: 'Completed At',
            },
            {
              name: 'watchTime',
              type: 'number',
              label: 'Watch Time (seconds)',
              min: 0,
            },
          ],
        },
        {
          name: 'overallProgress',
          type: 'number',
          label: 'Overall Progress (%)',
          min: 0,
          max: 100,
          defaultValue: 0,
        },
        {
          name: 'lastAccessedAt',
          type: 'date',
          label: 'Last Accessed',
        },
      ],
    },
    {
      name: 'payment',
      type: 'group',
      label: 'Payment Information',
      fields: [
        {
          name: 'paymentMethod',
          type: 'select',
          required: true,
          label: 'Payment Method',
          options: [
            { label: 'Credit Card', value: 'credit_card' },
            { label: 'PayPal', value: 'paypal' },
            { label: 'Stripe', value: 'stripe' },
            { label: 'Cryptocurrency', value: 'crypto' },
            { label: 'Free', value: 'free' },
          ],
        },
        {
          name: 'paymentStatus',
          type: 'select',
          required: true,
          label: 'Payment Status',
          options: [
            { label: 'Pending', value: 'pending' },
            { label: 'Completed', value: 'completed' },
            { label: 'Failed', value: 'failed' },
            { label: 'Refunded', value: 'refunded' },
          ],
        },
        {
          name: 'transactionId',
          type: 'text',
          label: 'Transaction ID',
        },
        {
          name: 'amount',
          type: 'number',
          label: 'Amount Paid',
          min: 0,
        },
        {
          name: 'currency',
          type: 'select',
          label: 'Currency',
          options: [
            { label: 'USD', value: 'usd' },
            { label: 'ETH', value: 'eth' },
            { label: 'BTC', value: 'btc' },
            { label: 'MATIC', value: 'matic' },
            { label: 'BNB', value: 'bnb' },
          ],
          defaultValue: 'usd',
        },
        {
          name: 'paidAt',
          type: 'date',
          label: 'Payment Date',
        },
      ],
    },
    {
      name: 'certificate',
      type: 'group',
      label: 'Certificate',
      fields: [
        {
          name: 'issued',
          type: 'checkbox',
          label: 'Certificate Issued',
          defaultValue: false,
        },
        {
          name: 'issuedAt',
          type: 'date',
          label: 'Certificate Issued At',
          admin: {
            condition: (data) => data.certificate?.issued,
          },
        },
        {
          name: 'certificateUrl',
          type: 'text',
          label: 'Certificate URL',
          admin: {
            condition: (data) => data.certificate?.issued,
          },
        },
        {
          name: 'certificateId',
          type: 'text',
          label: 'Certificate ID',
          admin: {
            condition: (data) => data.certificate?.issued,
          },
        },
      ],
    },
    {
      name: 'reviews',
      type: 'array',
      label: 'Student Reviews',
      fields: [
        {
          name: 'rating',
          type: 'number',
          required: true,
          label: 'Rating (1-5)',
          min: 1,
          max: 5,
        },
        {
          name: 'comment',
          type: 'textarea',
          label: 'Review Comment',
        },
        {
          name: 'reviewedAt',
          type: 'date',
          required: true,
          label: 'Review Date',
          defaultValue: () => new Date(),
        },
      ],
    },
    {
      name: 'notes',
      type: 'textarea',
      label: 'Private Notes',
      admin: {
        description: 'Internal notes (not visible to student)',
      },
    },
  ],
  hooks: {
    beforeChange: [
      ({ data, req, operation }) => {
        // Set student to current user if they're a student
        if (operation === 'create' && req.user?.role === 'student') {
          data.student = req.user.id
        }
        return data
      },
    ],
    afterChange: [
      ({ doc, req, operation }) => {
        // Update course enrollment count
        if (operation === 'create') {
          // This would need to be implemented to update course stats
          console.log('New enrollment created:', doc.id)
        }
      },
    ],
  },
  timestamps: true,
}
