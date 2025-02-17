import { GlobalConfig } from 'payload'
import { BasePageFields } from './global-page-config'

export const ProjectsGalleryPage: GlobalConfig = {
  slug: 'projects-gallery-page',
  admin: {
    group: 'Pages',
  },
  fields: [...BasePageFields],
}
