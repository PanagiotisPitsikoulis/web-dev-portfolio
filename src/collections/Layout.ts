import { GlobalConfig } from 'payload'

export const Layout: GlobalConfig = {
  slug: 'layout',
  admin: {
    group: 'Layout',
  },

  fields: [
    {
      name: 'layout_navbarLinks',
      type: 'array',
      label: 'Navbar Links',
      fields: [
        {
          name: 'layout_label',
          type: 'text',
          required: true,
        },
        {
          name: 'layout_url',
          type: 'text',
          required: true,
        },
      ],
    },
    {
      name: 'layout_footerLinks',
      type: 'array',
      label: 'Footer Links',
      fields: [
        {
          name: 'layout_label',
          type: 'text',
          required: true,
        },
        {
          name: 'layout_url',
          type: 'text',
          required: true,
        },
      ],
    },
    {
      name: 'layout_hideOnRoutes',
      type: 'array',
      label: 'Hide Navbar and Footer On Routes',
      fields: [
        {
          name: 'layout_route',
          type: 'text',
          required: true,
        },
      ],
    },
  ],
}
