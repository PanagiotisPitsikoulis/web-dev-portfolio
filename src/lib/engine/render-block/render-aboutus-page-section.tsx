import { AboutPage } from '@/payload-types'

export function renderAboutusPageSection(section: NonNullable<AboutPage['sections']>[number]) {
  switch (section.blockType) {
    default:
      return null
  }
}
