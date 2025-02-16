import { GlobalSlug } from 'payload'
import { renderLandingPageSection } from './render-landing-page-section'
import { renderAboutusPageSection } from './render-aboutus-page-section'
import { renderBlogPageSection } from './render-blog-page-section'
import { renderContactPageSection } from './render-contact-page-section'
import { renderProjectsGalleryPageSection } from './render-project-gallery-page-section'
import { renderResumePageSection } from './render-resume-page-section'

export function renderBlock(block: any, pageSlug: GlobalSlug) {
  switch (pageSlug) {
    case 'landing-page':
      return renderLandingPageSection(block)
    case 'about-page':
      return renderAboutusPageSection(block)
    case 'blog-page':
      return renderBlogPageSection(block)
    case 'contact-page':
      return renderContactPageSection(block)
    case 'projects-gallery-page':
      return renderProjectsGalleryPageSection(block)
    case 'resume-page':
      return renderResumePageSection(block)
    default:
      return null
  }
}
