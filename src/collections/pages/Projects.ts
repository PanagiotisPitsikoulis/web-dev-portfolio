import { GlobalConfig } from 'payload'
import { BasePageFields } from './global-page-config'

export const ProjectsGalleryPage: GlobalConfig = {
  slug: 'projects-gallery-page',
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
          slug: 'projectsGallerySection',
          fields: [
            {
              name: 'heading',
              type: 'text',
              required: true,
              defaultValue: 'Projects Gallery',
            },
            {
              name: 'projects',
              type: 'relationship',
              relationTo: 'projects', // Dynamically fetch projects
              hasMany: true,
              required: true,
            },
          ],
        },
        {
          slug: 'featuredProjectsSection',
          fields: [
            {
              name: 'heading',
              type: 'text',
              defaultValue: 'Featured Projects',
            },
            {
              name: 'featuredProjects',
              type: 'relationship',
              relationTo: 'projects',
              hasMany: true,
              required: false,
            },
          ],
        },
        {
          slug: 'testimonialsSection',
          fields: [
            {
              name: 'heading',
              type: 'text',
              defaultValue: 'What Clients Say',
            },
            {
              name: 'testimonials',
              type: 'array',
              fields: [
                {
                  name: 'author',
                  type: 'text',
                  required: true,
                },
                {
                  name: 'quote',
                  type: 'textarea',
                  required: true,
                },
                {
                  name: 'authorImage',
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
