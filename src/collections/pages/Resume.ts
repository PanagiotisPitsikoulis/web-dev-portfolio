import { GlobalConfig } from 'payload'
import { BasePageFields } from './global-page-config'

export const ResumePage: GlobalConfig = {
  slug: 'resume-page',
  admin: {
    group: 'Pages',
  },
  fields: [
    ...BasePageFields,
    {
      name: 'sections',
      type: 'blocks',
      blocks: [
        {
          slug: 'personalStatementSection',
          fields: [
            {
              name: 'heading',
              type: 'text',
              required: true,
              defaultValue: 'Personal Statement',
            },
            {
              name: 'statement',
              type: 'textarea',
              required: true,
            },
          ],
        },
        {
          slug: 'workExperienceSection',
          fields: [
            {
              name: 'experiences',
              type: 'array',
              fields: [
                {
                  name: 'company',
                  type: 'text',
                  required: true,
                },
                {
                  name: 'position',
                  type: 'text',
                  required: true,
                },
                {
                  name: 'startDate',
                  type: 'date',
                  required: true,
                },
                {
                  name: 'endDate',
                  type: 'date',
                },
                {
                  name: 'description',
                  type: 'textarea',
                },
              ],
            },
          ],
        },
        {
          slug: 'educationSection',
          fields: [
            {
              name: 'education',
              type: 'array',
              fields: [
                {
                  name: 'institution',
                  type: 'text',
                  required: true,
                },
                {
                  name: 'degree',
                  type: 'text',
                  required: true,
                },
                {
                  name: 'startYear',
                  type: 'number',
                  required: true,
                },
                {
                  name: 'endYear',
                  type: 'number',
                },
              ],
            },
          ],
        },
        {
          slug: 'skillsSection',
          fields: [
            {
              name: 'skills',
              type: 'array',
              fields: [
                {
                  name: 'skill',
                  type: 'text',
                  required: true,
                },
                {
                  name: 'proficiency',
                  type: 'select',
                  options: [
                    { label: 'Beginner', value: 'beginner' },
                    { label: 'Intermediate', value: 'intermediate' },
                    { label: 'Advanced', value: 'advanced' },
                    { label: 'Expert', value: 'expert' },
                  ],
                },
              ],
            },
          ],
        },
        {
          slug: 'certificationsSection',
          fields: [
            {
              name: 'certifications',
              type: 'array',
              fields: [
                {
                  name: 'title',
                  type: 'text',
                  required: true,
                },
                {
                  name: 'organization',
                  type: 'text',
                  required: true,
                },
                {
                  name: 'year',
                  type: 'number',
                  required: true,
                },
              ],
            },
          ],
        },
        {
          slug: 'hobbiesSection',
          fields: [
            {
              name: 'hobbies',
              type: 'array',
              fields: [
                {
                  name: 'hobby',
                  type: 'text',
                  required: true,
                },
                {
                  name: 'description',
                  type: 'textarea',
                },
              ],
            },
          ],
        },
        {
          slug: 'languagesSection',
          fields: [
            {
              name: 'languages',
              type: 'array',
              fields: [
                {
                  name: 'language',
                  type: 'text',
                  required: true,
                },
                {
                  name: 'proficiency',
                  type: 'select',
                  options: [
                    { label: 'Basic', value: 'basic' },
                    { label: 'Conversational', value: 'conversational' },
                    { label: 'Fluent', value: 'fluent' },
                    { label: 'Native', value: 'native' },
                  ],
                },
              ],
            },
          ],
        },
      ],
    },
  ],
}
