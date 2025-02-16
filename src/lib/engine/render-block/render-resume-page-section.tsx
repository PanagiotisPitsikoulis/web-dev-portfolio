import { ResumePage } from '@/payload-types'

export function renderResumePageSection(section: NonNullable<ResumePage['sections']>[number]) {
  switch (section.blockType) {
    default:
      return null
  }
}
