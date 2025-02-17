import { Field } from 'payload'
import { Client } from './client'
import { Media } from '@/payload-types'

export const registerGallerySmall: { fields: Field[]; slug: string } = {
  slug: 'gallerySmall',
  fields: [
    {
      name: 'heading',
      type: 'text',
      required: true,
      label: 'Heading',
    },
    {
      name: 'description',
      type: 'textarea',
    },
    {
      name: 'demoUrl',
      type: 'text',
      required: true,
      label: 'Demo URL',
    },
    {
      name: 'moreText',
      type: 'text',
      label: 'More Text',
      defaultValue: 'More',
    },
    {
      name: 'items',
      type: 'array',
      label: 'Gallery Items',
      fields: [
        {
          name: 'id',
          type: 'text',
          required: true,
          label: 'Item ID',
        },
        {
          name: 'title',
          type: 'text',
          required: true,
          label: 'Title',
        },
        {
          name: 'summary',
          type: 'text',
          required: true,
          label: 'Summary',
        },
        {
          name: 'url',
          type: 'text',
          required: true,
          label: 'URL',
        },
        {
          name: 'image',
          type: 'upload',
          relationTo: 'media',
          required: true,
          label: 'Image',
        },
      ],
    },
  ],
}

interface GallerySmallItem {
  id: string
  title: string
  summary: string
  url: string
  image: Media
}

interface GallerySmallProps {
  description?: string
  moreText?: string
  heading?: string
  demoUrl?: string
  items?: GallerySmallItem[]
}

function GallerySmall({
  heading = 'Gallery',
  demoUrl = 'https://www.shadcnblocks.com',
  moreText = 'View Item',
  description = 'Discover the latest trends, tips, and best practices in modern web development. From UI components to design systems, stay updated with our expert insights.',
  items = [
    {
      id: 'item-1',
      title: 'Build Modern UIs',
      summary: 'Create stunning user interfaces with our comprehensive design system.',
      url: '#',
      image: { url: 'https://shadcnblocks.com/images/block/placeholder-dark-1.svg' } as Media,
    },
    {
      id: 'item-2',
      title: 'Computer Vision Technology',
      summary:
        'Powerful image recognition and processing capabilities that allow AI systems to analyze, understand, and interpret visual information from the world.',
      url: '#',
      image: { url: 'https://shadcnblocks.com/images/block/placeholder-dark-1.svg' } as Media,
    },
    {
      id: 'item-3',
      title: 'Machine Learning Automation',
      summary:
        'Self-improving algorithms that learn from data patterns to automate complex tasks and make intelligent decisions with minimal human intervention.',
      url: '#',
      image: { url: 'https://shadcnblocks.com/images/block/placeholder-dark-1.svg' } as Media,
    },
    {
      id: 'item-4',
      title: 'Predictive Analytics',
      summary:
        'Advanced forecasting capabilities that analyze historical data to predict future trends and outcomes, helping businesses make data-driven decisions.',
      url: '#',
      image: { url: 'https://shadcnblocks.com/images/block/placeholder-dark-1.svg' } as Media,
    },
    {
      id: 'item-5',
      title: 'Neural Network Architecture',
      summary:
        'Sophisticated AI models inspired by human brain structure, capable of solving complex problems through deep learning and pattern recognition.',
      url: '#',
      image: { url: 'https://shadcnblocks.com/images/block/placeholder-dark-1.svg' } as Media,
    },
  ],
}: GallerySmallProps) {
  return (
    <>
      <Client
        demoUrl={demoUrl}
        heading={heading}
        items={items}
        description={description}
        moreText={moreText}
      />
    </>
  )
}

export { GallerySmall, type GallerySmallProps, type GallerySmallItem }
