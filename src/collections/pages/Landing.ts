import { GlobalConfig } from 'payload'
import { BasePageFields } from './global-page-config'

export const LandingPage: GlobalConfig = {
  slug: 'landing-page',
  admin: {
    group: 'Pages',
  },
  fields: [...BasePageFields],
}
