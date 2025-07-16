import type { CollectionConfig } from 'payload'
import { authenticated } from '../access/authenticated'

export const Quizzes: CollectionConfig = {
  slug: 'quizzes',
  labels: {
    singular: 'Quiz',
    plural: 'Quizzes',
  },
  admin: {
    useAsTitle: 'title',
    defaultColumns: ['title', 'course', 'questionCount', 'passingScore'],
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
      name: 'title',
      type: 'text',
      required: true,
      label: 'Quiz Title',
    },
    {
      name: 'description',
      type: 'textarea',
      label: 'Quiz Description',
    },
    {
      name: 'course',
      type: 'relationship',
      relationTo: 'courses',
      required: true,
      label: 'Course',
    },
    {
      name: 'questions',
      type: 'array',
      label: 'Quiz Questions',
      fields: [
        {
          name: 'question',
          type: 'richText',
          required: true,
          label: 'Question',
        },
        {
          name: 'type',
          type: 'select',
          required: true,
          label: 'Question Type',
          options: [
            { label: 'Multiple Choice', value: 'multiple_choice' },
            { label: 'True/False', value: 'true_false' },
            { label: 'Short Answer', value: 'short_answer' },
            { label: 'Essay', value: 'essay' },
          ],
        },
        {
          name: 'options',
          type: 'array',
          label: 'Answer Options',
          admin: {
            condition: (data, siblingData) =>
              siblingData.type === 'multiple_choice' || siblingData.type === 'true_false',
          },
          fields: [
            {
              name: 'text',
              type: 'text',
              required: true,
              label: 'Option Text',
            },
            {
              name: 'isCorrect',
              type: 'checkbox',
              label: 'Correct Answer',
              defaultValue: false,
            },
          ],
        },
        {
          name: 'correctAnswer',
          type: 'textarea',
          label: 'Correct Answer',
          admin: {
            condition: (data, siblingData) =>
              siblingData.type === 'short_answer' || siblingData.type === 'essay',
          },
        },
        {
          name: 'explanation',
          type: 'richText',
          label: 'Answer Explanation',
        },
        {
          name: 'points',
          type: 'number',
          label: 'Points',
          min: 1,
          defaultValue: 1,
        },
      ],
    },
    {
      name: 'settings',
      type: 'group',
      label: 'Quiz Settings',
      fields: [
        {
          name: 'passingScore',
          type: 'number',
          label: 'Passing Score (%)',
          min: 0,
          max: 100,
          defaultValue: 70,
        },
        {
          name: 'timeLimit',
          type: 'number',
          label: 'Time Limit (minutes)',
          min: 0,
          admin: {
            description: 'Set to 0 for no time limit',
          },
        },
        {
          name: 'allowedAttempts',
          type: 'number',
          label: 'Maximum Attempts',
          min: 1,
          defaultValue: 3,
        },
        {
          name: 'randomizeQuestions',
          type: 'checkbox',
          label: 'Randomize Questions',
          defaultValue: false,
        },
        {
          name: 'showCorrectAnswers',
          type: 'checkbox',
          label: 'Show Correct Answers After Completion',
          defaultValue: true,
        },
        {
          name: 'showScore',
          type: 'checkbox',
          label: 'Show Score to Student',
          defaultValue: true,
        },
      ],
    },
    {
      name: 'status',
      type: 'select',
      required: true,
      label: 'Quiz Status',
      options: [
        { label: 'Draft', value: 'draft' },
        { label: 'Published', value: 'published' },
        { label: 'Archived', value: 'archived' },
      ],
      defaultValue: 'draft',
    },
  ],
  hooks: {
    beforeChange: [
      ({ data }) => {
        // Calculate question count
        if (data.questions) {
          data.questionCount = data.questions.length
        }
        return data
      },
    ],
  },
  timestamps: true,
}
