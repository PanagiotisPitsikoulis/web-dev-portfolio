import { Button } from '@/components/ui/button'

import { Field } from 'payload'

export const registerCTA: { fields: Field[]; slug: string } = {
  slug: 'cta',
  fields: [
    {
      name: 'heading',
      type: 'text',
      label: 'Heading',
      defaultValue: 'Ready to Get Started?',
    },
    {
      name: 'description',
      type: 'textarea',
      label: 'Description',
      defaultValue:
        'Join thousands of satisfied customers using our platform to build amazing websites.',
    },
    {
      name: 'buttons',
      type: 'group',
      label: 'Buttons',
      fields: [
        {
          name: 'primary',
          type: 'group',
          label: 'Primary Button',
          fields: [
            {
              name: 'text',
              type: 'text',
              label: 'Button Text',
              defaultValue: 'Get Started',
            },
            {
              name: 'url',
              type: 'text',
              label: 'Button URL',
              defaultValue: 'https://www.shadcnblocks.com',
            },
          ],
        },
        {
          name: 'secondary',
          type: 'group',
          label: 'Secondary Button',
          fields: [
            {
              name: 'text',
              type: 'text',
              label: 'Button Text',
              defaultValue: 'Learn More',
            },
            {
              name: 'url',
              type: 'text',
              label: 'Button URL',
              defaultValue: 'https://www.shadcnblocks.com',
            },
          ],
        },
      ],
    },
  ],
}

interface CtaProps {
  heading?: string
  description?: string
  buttons?: {
    primary?: {
      text: string
      url: string
    }
    secondary?: {
      text: string
      url: string
    }
  }
}

function Cta({
  heading = 'Ready to Get Started?',
  description = 'Join thousands of satisfied customers using our platform to build amazing websites.',
  buttons = {
    primary: {
      text: 'Get Started',
      url: 'https://www.shadcnblocks.com',
    },
    secondary: {
      text: 'Learn More',
      url: 'https://www.shadcnblocks.com',
    },
  },
}: CtaProps) {
  return (
    <section className="py-8">
      <div className="container">
        <div className="flex w-full flex-col gap-16 overflow-hidden rounded-lg bg-accent p-8 md:rounded-xl lg:flex-row lg:items-center lg:p-16">
          <div className="flex-1">
            <h3 className="mb-3 text-2xl font-semibold md:mb-4 md:text-4xl lg:mb-6">{heading}</h3>
            <p className="text-muted-foreground lg:text-lg">{description}</p>
          </div>
          <div className="flex shrink-0 flex-col gap-2 sm:flex-row">
            {buttons.secondary && (
              <Button variant="outline" asChild>
                <a href={buttons.secondary.url}>{buttons.secondary.text}</a>
              </Button>
            )}
            {buttons.primary && (
              <Button asChild>
                <a href={buttons.primary.url}>{buttons.primary.text}</a>
              </Button>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}

export { Cta, type CtaProps }
