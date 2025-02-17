import { GlobalConfig } from 'payload'
import { BasePageFields } from './global-page-config'

export const ContactPage: GlobalConfig = {
  slug: 'contact-page',
  admin: {
    group: 'Pages',
  },
  fields: [...BasePageFields],
}
