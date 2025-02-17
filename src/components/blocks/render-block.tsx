import { BlogSmall } from '@/components/blocks/blog-small'
import { Cta } from '@/components/blocks/call-to-action'
import { Career } from '@/components/blocks/career'
import { Contact } from '@/components/blocks/contact'
import { Faq } from '@/components/blocks/faq'
import { FeatureLarge } from '@/components/blocks/feature-large'
import { Features } from '@/components/blocks/features'
import { FeaturesBoxes } from '@/components/blocks/features-boxes'
import { Footer } from '@/components/blocks/footer'
import { Hero } from '@/components/blocks/hero'
import { HeroSmartphone } from '@/components/blocks/hero-smartphone'
import { Navbar } from '@/components/blocks/navbar'
import { LandingPage } from '@/payload-types'
import { GallerySmall } from './gallery-small'

export function renderBlock(section: NonNullable<LandingPage['sections']>[number]) {
  switch (section.blockType) {
    case 'blogSmall':
      return <BlogSmall {...(section as any)} />
    case 'hero':
      return <Hero {...(section as any)} />
    case 'heroSmartphone':
      return <HeroSmartphone {...(section as any)} />
    case 'featuresBoxes':
      return <FeaturesBoxes {...(section as any)} />
    case 'features':
      return <Features {...(section as any)} />
    case 'faq':
      return <Faq {...(section as any)} />
    case 'contact':
      return <Contact {...(section as any)} />
    case 'career':
      return <Career {...(section as any)} />
    case 'navbar':
      return <Navbar {...(section as any)} />
    case 'cta':
      return <Cta {...(section as any)} />
    case 'featuresLarge':
      return <FeatureLarge {...(section as any)} />
    case 'footer':
      return <Footer {...(section as any)} />
    case 'gallerySmall':
      return <GallerySmall {...(section as any)} />
    default:
      return null
  }
}
