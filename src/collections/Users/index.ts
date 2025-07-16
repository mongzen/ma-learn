import type { CollectionConfig } from 'payload'

import { anyone } from '../../access/anyone'
import { authenticated } from '../../access/authenticated'

export const Users: CollectionConfig = {
  slug: 'users',
  access: {
    admin: authenticated,
    create: anyone, // Allow public registration
    delete: authenticated,
    read: authenticated,
    update: authenticated,
  },
  admin: {
    defaultColumns: ['name', 'email', 'role'],
    useAsTitle: 'name',
    group: 'Users',
  },
  auth: {
    tokenExpiration: 7200, // 2 hours
    verify: false, // Disable email verification for development
    forgotPassword: {
      generateEmailHTML: (args: any) => {
        return `<a href="${process.env.NEXT_PUBLIC_SERVER_URL}/reset-password?token=${args?.token}">Reset Password</a>`
      },
    },
  },
  fields: [
    {
      name: 'name',
      type: 'text',
      required: true,
      label: 'Full Name',
    },
    {
      name: 'role',
      type: 'select',
      required: true,
      label: 'User Role',
      options: [
        { label: 'Student', value: 'student' },
        { label: 'Instructor', value: 'instructor' },
        { label: 'Admin', value: 'admin' },
      ],
      defaultValue: 'student',
      admin: {
        position: 'sidebar',
      },
    },
    {
      name: 'profile',
      type: 'group',
      label: 'Profile Information',
      fields: [
        {
          name: 'avatar',
          type: 'upload',
          relationTo: 'media',
          label: 'Profile Picture',
        },
        {
          name: 'bio',
          type: 'textarea',
          label: 'Biography',
          maxLength: 500,
        },
        {
          name: 'title',
          type: 'text',
          label: 'Professional Title',
        },
        {
          name: 'website',
          type: 'text',
          label: 'Website URL',
        },
        {
          name: 'socialLinks',
          type: 'array',
          label: 'Social Links',
          fields: [
            {
              name: 'platform',
              type: 'select',
              required: true,
              options: [
                { label: 'Twitter', value: 'twitter' },
                { label: 'LinkedIn', value: 'linkedin' },
                { label: 'Facebook', value: 'facebook' },
                { label: 'Instagram', value: 'instagram' },
                { label: 'YouTube', value: 'youtube' },
                { label: 'GitHub', value: 'github' },
              ],
            },
            {
              name: 'url',
              type: 'text',
              required: true,
              label: 'Profile URL',
            },
          ],
        },
      ],
    },
    {
      name: 'instructorProfile',
      type: 'group',
      label: 'Instructor Profile',
      admin: {
        condition: (data) => data.role === 'instructor',
      },
      fields: [
        {
          name: 'expertise',
          type: 'array',
          label: 'Areas of Expertise',
          fields: [
            {
              name: 'area',
              type: 'text',
              required: true,
            },
          ],
        },
        {
          name: 'experience',
          type: 'number',
          label: 'Years of Experience',
          min: 0,
        },
        {
          name: 'qualifications',
          type: 'array',
          label: 'Qualifications',
          fields: [
            {
              name: 'title',
              type: 'text',
              required: true,
              label: 'Qualification Title',
            },
            {
              name: 'institution',
              type: 'text',
              required: true,
              label: 'Institution',
            },
            {
              name: 'year',
              type: 'number',
              label: 'Year Obtained',
            },
          ],
        },
        {
          name: 'bankingInfo',
          type: 'group',
          label: 'Banking Information',
          admin: {
            description: 'For payment processing',
          },
          fields: [
            {
              name: 'bankName',
              type: 'text',
              label: 'Bank Name',
            },
            {
              name: 'accountNumber',
              type: 'text',
              label: 'Account Number',
              admin: {
                description: 'Will be encrypted',
              },
            },
            {
              name: 'routingNumber',
              type: 'text',
              label: 'Routing Number',
            },
            {
              name: 'walletAddress',
              type: 'text',
              label: 'Crypto Wallet Address',
              admin: {
                description: 'For cryptocurrency payments',
              },
            },
          ],
        },
      ],
    },
    {
      name: 'preferences',
      type: 'group',
      label: 'Preferences',
      fields: [
        {
          name: 'language',
          type: 'select',
          label: 'Preferred Language',
          options: [
            { label: 'English', value: 'en' },
            { label: 'Thai', value: 'th' },
            { label: 'Spanish', value: 'es' },
            { label: 'French', value: 'fr' },
            { label: 'German', value: 'de' },
            { label: 'Chinese', value: 'zh' },
            { label: 'Japanese', value: 'ja' },
          ],
          defaultValue: 'en',
        },
        {
          name: 'timezone',
          type: 'text',
          label: 'Timezone',
          defaultValue: 'UTC',
        },
        {
          name: 'notifications',
          type: 'group',
          label: 'Notification Settings',
          fields: [
            {
              name: 'email',
              type: 'checkbox',
              label: 'Email Notifications',
              defaultValue: true,
            },
            {
              name: 'courseUpdates',
              type: 'checkbox',
              label: 'Course Updates',
              defaultValue: true,
            },
            {
              name: 'marketing',
              type: 'checkbox',
              label: 'Marketing Communications',
              defaultValue: false,
            },
          ],
        },
      ],
    },
    {
      name: 'stats',
      type: 'group',
      label: 'User Statistics',
      admin: {
        position: 'sidebar',
        readOnly: true,
      },
      fields: [
        {
          name: 'coursesCreated',
          type: 'number',
          label: 'Courses Created',
          defaultValue: 0,
          admin: {
            condition: (data) => data.role === 'instructor',
          },
        },
        {
          name: 'coursesEnrolled',
          type: 'number',
          label: 'Courses Enrolled',
          defaultValue: 0,
          admin: {
            condition: (data) => data.role === 'student',
          },
        },
        {
          name: 'coursesCompleted',
          type: 'number',
          label: 'Courses Completed',
          defaultValue: 0,
          admin: {
            condition: (data) => data.role === 'student',
          },
        },
        {
          name: 'totalEarnings',
          type: 'number',
          label: 'Total Earnings (USD)',
          defaultValue: 0,
          admin: {
            condition: (data) => data.role === 'instructor',
          },
        },
        {
          name: 'lastLogin',
          type: 'date',
          label: 'Last Login',
        },
      ],
    },
  ],
  hooks: {
    beforeChange: [
      ({ data, req, operation }) => {
        // Set default role for new users
        if (operation === 'create' && !data.role) {
          data.role = 'student'
        }
        return data
      },
    ],
  },
  timestamps: true,
}
