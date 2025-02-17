import { GlobalConfig } from 'payload'
import { BasePageFields } from './global-page-config'

export const ResumePage: GlobalConfig = {
  slug: 'resume-page',
  admin: {
    group: 'Pages',
  },
  fields: [...BasePageFields],
}
