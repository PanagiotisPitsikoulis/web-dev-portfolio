import { GlobalConfig } from 'payload'
import { BasePageFields } from './global-page-config'

export const BlogPage: GlobalConfig = {
  slug: 'blog-page',
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
          slug: 'blogListSection',
          fields: [
            {
              name: 'heading',
              type: 'text',
              required: true,
              defaultValue: 'Latest Blog Posts',
            },
            {
              name: 'subheading',
              type: 'text',
            },
            {
              name: 'posts',
              type: 'relationship',
              relationTo: 'posts',
              hasMany: true,
              required: true,
            },
          ],
        },
      ],
    },
  ],
}
