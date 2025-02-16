import { GlobalConfig } from 'payload'
import { BasePageFields } from './global-page-config'

export const LandingPage: GlobalConfig = {
  slug: 'landing-page',
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
          slug: 'heroSection',
          fields: [
            {
              name: 'heading',
              type: 'text',
              required: true,
            },
            {
              name: 'subheading',
              type: 'text',
            },
            {
              name: 'ctaText',
              type: 'text',
              required: true,
            },
            {
              name: 'ctaLink',
              type: 'text',
              required: true,
            },
            {
              name: 'backgroundImage',
              type: 'upload',
              relationTo: 'media',
              required: true,
            },
          ],
        },
        {
          slug: 'featuresSection',
          fields: [
            {
              name: 'features',
              type: 'array',
              fields: [
                {
                  name: 'title',
                  type: 'text',
                  required: true,
                },
                {
                  name: 'description',
                  type: 'textarea',
                  required: true,
                },
                {
                  name: 'icon',
                  type: 'upload',
                  relationTo: 'media',
                },
              ],
            },
          ],
        },
        {
          slug: 'projectGallerySection',
          fields: [
            {
              name: 'projects',
              type: 'array',
              fields: [
                {
                  name: 'title',
                  type: 'text',
                  required: true,
                },
                {
                  name: 'description',
                  type: 'textarea',
                },
                {
                  name: 'image',
                  type: 'upload',
                  relationTo: 'media',
                  required: true,
                },
                {
                  name: 'projectLink',
                  type: 'text',
                },
              ],
            },
          ],
        },
        {
          slug: 'blogSection',
          fields: [
            {
              name: 'heading',
              type: 'text',
              required: true,
            },
            {
              name: 'posts',
              type: 'array',
              fields: [
                {
                  name: 'title',
                  type: 'text',
                  required: true,
                },
                {
                  name: 'excerpt',
                  type: 'textarea',
                  required: true,
                },
                {
                  name: 'link',
                  type: 'text',
                  required: true,
                },
              ],
            },
          ],
        },
        {
          slug: 'contactSection',
          fields: [
            {
              name: 'heading',
              type: 'text',
              required: true,
            },
            {
              name: 'subheading',
              type: 'text',
            },
            {
              name: 'email',
              type: 'text',
              required: true,
            },
            {
              name: 'phone',
              type: 'text',
            },
            {
              name: 'socialLinks',
              type: 'array',
              fields: [
                {
                  name: 'platform',
                  type: 'text',
                  required: true,
                },
                {
                  name: 'url',
                  type: 'text',
                  required: true,
                },
              ],
            },
          ],
        },
      ],
    },
  ],
}
