import { ContactPage } from '@/payload-types'

export function renderContactPageSection(section: NonNullable<ContactPage['sections']>[number]) {
  switch (section.blockType) {
    default:
      return null
  }
}
