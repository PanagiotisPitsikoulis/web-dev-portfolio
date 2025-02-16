import { BlogPage } from '@/payload-types'

export function renderBlogPageSection(section: NonNullable<BlogPage['sections']>[number]) {
  switch (section.blockType) {
    default:
      return null
  }
}
