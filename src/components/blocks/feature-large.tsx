import { Tabs, TabsContent, TabsList, TabsTrigger } from '@radix-ui/react-tabs'
import { Layout, Pointer, Zap } from 'lucide-react'

import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'

import { Field } from 'payload'
import { Media } from '@/payload-types'

export const registerFeatureLarge: { fields: Field[]; slug: string } = {
  slug: 'featuresLarge',
  fields: [
    {
      name: 'badge',
      type: 'text',
      required: true,
      label: 'Badge',
    },
    {
      name: 'heading',
      type: 'text',
      required: true,
      label: 'Heading',
    },
    {
      name: 'description',
      type: 'textarea',
      required: true,
      label: 'Description',
    },
    {
      name: 'tabs',
      type: 'array',
      label: 'Tabs',
      fields: [
        {
          name: 'value',
          type: 'text',
          required: true,
          label: 'Tab Value',
        },
        {
          name: 'icon',
          type: 'upload',
          relationTo: 'media',
          required: true,
          label: 'Icon',
        },
        {
          name: 'label',
          type: 'text',
          required: true,
          label: 'Label',
        },
        {
          name: 'content',
          type: 'group',
          label: 'Tab Content',
          fields: [
            {
              name: 'badge',
              type: 'text',
              required: true,
              label: 'Content Badge',
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
            {
              name: 'buttonText',
              type: 'text',
              required: true,
              label: 'Button Text',
            },
            {
              name: 'imageSrc',
              type: 'upload',
              relationTo: 'media',
              required: true,
              label: 'Image Source',
            },
            {
              name: 'imageAlt',
              type: 'text',
              required: true,
              label: 'Image Alt Text',
            },
          ],
        },
      ],
    },
  ],
}

export interface TabContent {
  badge: string
  title: string
  description: string
  buttonText: string
  imageSrc: Media
  imageAlt: string
}

export interface Tab {
  value: string
  icon: Media
  label: string
  content: TabContent
}

export interface FeatureLargeProps {
  badge?: string
  heading?: string
  description?: string
  tabs?: Tab[]
}

const FeatureLarge = ({
  badge = 'shadcnblocks.com',
  heading = 'A Collection of Components Built With Shadcn & Tailwind',
  description = 'Join us to build flawless web solutions.',
  tabs = [
    {
      value: 'tab-1',
      icon: { url: 'https://shadcnblocks.com/images/block/placeholder-dark-1.svg' } as Media,
      label: 'Boost Revenue',
      content: {
        badge: 'Modern Tactics',
        title: 'Make your site a true standout.',
        description:
          'Discover new web trends that help you craft sleek, highly functional sites that drive traffic and convert leads into customers.',
        buttonText: 'See Plans',
        imageSrc: { url: 'https://shadcnblocks.com/images/block/placeholder-dark-1.svg' } as Media,
        imageAlt: 'placeholder',
      },
    },
    {
      value: 'tab-2',
      icon: { url: 'https://shadcnblocks.com/images/block/placeholder-dark-2.svg' } as Media,
      label: 'Higher Engagement',
      content: {
        badge: 'Expert Features',
        title: 'Boost your site with top-tier design.',
        description:
          'Use stellar design to easily engage users and strengthen their loyalty. Create a seamless experience that keeps them coming back for more.',
        buttonText: 'See Tools',
        imageSrc: { url: 'https://shadcnblocks.com/images/block/placeholder-dark-2.svg' } as Media,
        imageAlt: 'placeholder',
      },
    },
    {
      value: 'tab-3',
      icon: { url: 'https://shadcnblocks.com/images/block/placeholder-dark-3.svg' } as Media,
      label: 'Stunning Layouts',
      content: {
        badge: 'Elite Solutions',
        title: 'Build an advanced web experience.',
        description:
          'Lift your brand with modern tech that grabs attention and drives action. Create a digital experience that stands out from the crowd.',
        buttonText: 'See Options',
        imageSrc: { url: 'https://shadcnblocks.com/images/block/placeholder-dark-3.svg' } as Media,
        imageAlt: 'placeholder',
      },
    },
  ],
}: FeatureLargeProps) => {
  return (
    <section className="py-8">
      <div className="container mx-auto">
        <div className="flex flex-col items-center gap-4 text-center">
          <Badge variant="outline">{badge}</Badge>
          <h1 className="max-w-2xl text-3xl font-semibold md:text-4xl">{heading}</h1>
          <p className="text-muted-foreground w-xl">{description}</p>
        </div>
        <Tabs defaultValue={tabs[0].value} className="mt-8">
          <TabsList className="container flex flex-col items-center justify-center gap-4 sm:flex-row md:gap-10">
            {tabs.map((tab) => (
              <TabsTrigger
                key={tab.value}
                value={tab.value}
                className="flex items-center gap-2 rounded-xl px-4 py-3 text-sm font-semibold text-muted-foreground data-[state=active]:bg-muted data-[state=active]:text-primary"
              >
                <img
                  src={tab.icon.url}
                  alt={tab.label}
                  className="h-auto w-4 shrink-0 dark:invert"
                />
              </TabsTrigger>
            ))}
          </TabsList>
          <div className="mx-auto mt-8 max-w-screen-xl rounded-2xl bg-muted/70 p-6 lg:p-16">
            {tabs.map((tab) => (
              <TabsContent
                key={tab.value}
                value={tab.value}
                className="grid place-items-start lg:grid-cols-2 gap-10"
              >
                <div className="flex flex-col justify-between gap-5 h-[20rem] lg:h-[30rem]">
                  <Badge variant="outline" className="w-fit bg-background">
                    {tab.content.badge}
                  </Badge>
                  <div className="gap-5 flex flex-col">
                    <h3 className="text-3xl font-semibold lg:text-5xl line-clamp-2">
                      {tab.content.title}
                    </h3>
                    <p className="text-muted-foreground lg:text-lg line-clamp-4">
                      {tab.content.description}
                    </p>
                  </div>
                  <Button className="w-fit gap-2" size="lg">
                    {tab.content.buttonText}
                  </Button>
                </div>
                <img
                  src={tab.content.imageSrc.url}
                  alt={tab.content.imageAlt}
                  className="rounded-xl object-cover w-full h-[20rem] lg:h-[30rem]"
                />
              </TabsContent>
            ))}
          </div>
        </Tabs>
      </div>
    </section>
  )
}

export { FeatureLarge }
