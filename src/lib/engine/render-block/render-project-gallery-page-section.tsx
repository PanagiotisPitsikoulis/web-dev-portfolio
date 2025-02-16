import { ProjectsGalleryPage } from '@/payload-types'

export function renderProjectsGalleryPageSection(
  section: NonNullable<ProjectsGalleryPage['sections']>[number],
) {
  switch (section.blockType) {
    default:
      return null
  }
}
