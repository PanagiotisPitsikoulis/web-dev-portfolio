import { GlobalConfig } from 'payload'
import { BasePageFields } from './global-page-config'

export const BlogPage: GlobalConfig = {
  slug: 'blog-page',
  admin: {
    group: 'Pages',
  },
  fields: [...BasePageFields],
}
