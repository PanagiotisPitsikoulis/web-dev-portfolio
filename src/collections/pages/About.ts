import { GlobalConfig } from 'payload'
import { BasePageFields } from './global-page-config'

export const AboutPage: GlobalConfig = {
  slug: 'about-page',
  admin: {
    group: 'Pages',
  },
  fields: [...BasePageFields],
}
