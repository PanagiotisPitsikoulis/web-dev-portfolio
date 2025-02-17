import { registerBlogSmall } from './blog-small'
import { registerCTA } from './call-to-action'
import { registerCareer } from './career'
import { registerContact } from './contact'
import { registerFaq } from './faq'
import { registerFeatureLarge } from './feature-large'
import { registerFeatures } from './features'
import { registerFeaturesBoxes } from './features-boxes'
import { registerFooter } from './footer'
import { registerGallerySmall } from './gallery-small'
import { registerHero } from './hero'
import { registerHeroSmartphone } from './hero-smartphone'
import { registerNavbar } from './navbar'
import { Block, Field } from 'payload'

const blocks: Block[] = [
  registerFooter,
  registerNavbar,
  registerCTA,
  registerCareer,
  registerFeatureLarge,
  registerHero,
  registerHeroSmartphone,
  registerFeaturesBoxes,
  registerFeatures,
  registerFaq,
  registerBlogSmall,
  registerContact,
  registerGallerySmall,
]

export const fields: Field = {
  name: 'sections',
  type: 'blocks',
  label: 'Page Sections',
  blocks,
}
