import { GlobalConfig } from 'payload'
import { BasePageFields } from './global-page-config'

export const AboutPage: GlobalConfig = {
  slug: 'about-page',
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
          slug: 'aboutIntroSection',
          fields: [
            {
              name: 'heading',
              type: 'text',
              required: true,
              defaultValue: 'About Us',
            },
            {
              name: 'personalStatement',
              type: 'textarea',
              required: true,
              label: 'Personal Statement',
            },
            {
              name: 'missionStatement',
              type: 'textarea',
              required: true,
              label: 'Mission Statement',
            },
          ],
        },
        {
          slug: 'teamSection',
          fields: [
            {
              name: 'heading',
              type: 'text',
              required: true,
              defaultValue: 'Meet Our Team',
            },
            {
              name: 'teamMembers',
              type: 'array',
              fields: [
                {
                  name: 'name',
                  type: 'text',
                  required: true,
                },
                {
                  name: 'position',
                  type: 'text',
                  required: true,
                },
                {
                  name: 'bio',
                  type: 'textarea',
                },
                {
                  name: 'photo',
                  type: 'upload',
                  relationTo: 'media',
                },
              ],
            },
          ],
        },
      ],
    },
  ],
}
