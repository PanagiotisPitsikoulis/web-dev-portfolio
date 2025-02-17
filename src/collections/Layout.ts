import { registerFooter } from '@/components/blocks/footer'
import { registerNavbar } from '@/components/blocks/navbar'
import { GlobalConfig } from 'payload'
import { metadata } from './pages/global-page-config'

export const Layout: GlobalConfig = {
  slug: 'layout',
  admin: {
    group: 'Layout',
  },
  fields: [
    metadata,
    {
      name: 'layout_navigation',
      type: 'blocks',
      label: 'Navigation Links',
      blocks: [registerNavbar, registerFooter],
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
