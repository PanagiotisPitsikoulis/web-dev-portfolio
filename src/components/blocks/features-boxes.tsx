import { Timer, Zap, ZoomIn } from 'lucide-react'
import { JSX } from 'react'

import { Field } from 'payload'
import { Media } from '@/payload-types'

export const registerFeaturesBoxes: { fields: Field[]; slug: string } = {
  slug: 'featuresBoxes',
  fields: [
    {
      name: 'subheading',
      type: 'text',
      required: true,
      label: 'Subheading',
    },
    {
      name: 'heading',
      type: 'text',
      required: true,
      label: 'Heading',
    },
    {
      name: 'features',
      type: 'array',
      label: 'Features',
      fields: [
        {
          name: 'icon',
          type: 'upload',
          relationTo: 'media',
          required: true,
          label: 'Icon',
        },
        {
          name: 'title',
          type: 'text',
          required: true,
          label: 'Title',
        },
        {
          name: 'description',
          type: 'textarea',
          required: true,
          label: 'Description',
        },
      ],
    },
  ],
}

interface FeatureBox {
  icon: Media
  title: string
  description: string
}

interface FeaturesBoxesProps {
  subheading?: string
  heading?: string
  features?: FeatureBox[]
}

function FeaturesBoxes({
  subheading = 'OUR VALUES',
  heading = 'Why Choose Us?',
  features = [
    {
      icon: { url: '' } as Media,
      title: 'Performance',
      description:
        'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Sunt beatae tenetur totam aut blanditis ipsa quaerat neque eaque, atque doloremque! Eligendi.',
    },
    {
      icon: { url: '' } as Media,
      title: 'Quality',
      description:
        'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Sunt beatae tenetur totam aut blanditis ipsa quaerat neque eaque, atque doloremque! Eligendi.',
    },
    {
      icon: { url: '' } as Media,
      title: 'Innovation',
      description:
        'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Sunt beatae tenetur totam aut blanditis ipsa quaerat neque eaque, atque doloremque! Eligendi.',
    },
  ],
}: FeaturesBoxesProps) {
  return (
    <section className="py-8">
      <div className="container">
        <p className="mb-4 text-sm text-muted-foreground lg:text-base">{subheading}</p>
        <h2 className="text-3xl font-medium lg:text-4xl">{heading}</h2>
        <div className="mt-14 grid gap-6 lg:mt-20 lg:grid-cols-3">
          {features.map((feature, index) => (
            <div key={index} className="rounded-lg bg-accent p-5">
              <span className="mb-8 flex size-12 items-center justify-center rounded-full bg-background">
                <img
                  src={feature.icon.url}
                  alt={feature.icon.alt}
                  className="h-auto w-5 shrink-0 dark:invert"
                />
              </span>
              <h3 className="mb-2 text-xl font-medium">{feature.title}</h3>
              <p className="leading-7 text-muted-foreground">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export { FeaturesBoxes, type FeaturesBoxesProps, type FeatureBox }
