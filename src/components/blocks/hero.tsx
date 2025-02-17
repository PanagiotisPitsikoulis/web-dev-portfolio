import { AspectRatio } from '@/components/ui/aspect-ratio'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Button } from '@/components/ui/button'
import { Spotlight } from '../ui/spotlight'
import { Field } from 'payload'
import { Media } from '@/payload-types'

export const registerHero: { fields: Field[]; slug: string } = {
  slug: 'hero',
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
      label: 'Description',
    },
    {
      name: 'button',
      type: 'group',
      label: 'Button',
      fields: [
        {
          name: 'text',
          type: 'text',
          required: true,
          label: 'Button Text',
        },
        {
          name: 'url',
          type: 'text',
          required: true,
          label: 'Button URL',
        },
      ],
    },
    {
      name: 'testimonial',
      type: 'group',
      label: 'Testimonial',
      fields: [
        {
          name: 'quote',
          type: 'text',
          required: true,
          label: 'Quote',
        },
        {
          name: 'author',
          type: 'text',
          required: true,
          label: 'Author',
        },
        {
          name: 'role',
          type: 'text',
          required: true,
          label: 'Role',
        },
        {
          name: 'company',
          type: 'text',
          required: true,
          label: 'Company',
        },
        {
          name: 'avatars',
          type: 'array',
          label: 'Avatars',
          fields: [
            {
              name: 'image',
              type: 'upload',
              relationTo: 'media',
              required: true,
              label: 'Avatar Image',
            },
            {
              name: 'fallback',
              type: 'text',
              required: true,
              label: 'Fallback Text',
            },
          ],
        },
      ],
    },
    {
      name: 'images',
      type: 'group',
      label: 'Images',
      fields: [
        {
          name: 'first',
          type: 'upload',
          relationTo: 'media',
          required: true,
          label: 'First Image',
        },
        {
          name: 'second',
          type: 'upload',
          relationTo: 'media',
          required: true,
          label: 'Second Image',
        },
        {
          name: 'third',
          type: 'upload',
          relationTo: 'media',
          required: true,
          label: 'Third Image',
        },
        {
          name: 'fourth',
          type: 'upload',
          relationTo: 'media',
          required: true,
          label: 'Fourth Image',
        },
      ],
    },
  ],
}

export interface Testimonial {
  quote: string
  author: string
  role: string
  company: string
  avatars: Array<{
    image: Media
    fallback: string
  }>
}

export interface HeroProps {
  heading?: string
  description?: string
  button?: {
    text: string
    url: string
  }
  testimonial?: Testimonial
  images: {
    first: Media
    second: Media
    third: Media
    fourth: Media
  }
}

function Hero({
  heading = 'Blocks built with Shadcn & Tailwind',
  description = 'Finely crafted components built with React, Tailwind and Shadcn UI. Developers can copy and paste these blocks directly into their project.',
  button = {
    text: 'Get Started',
    url: '#',
  },
  testimonial = {
    quote: 'Focused strategy, swift delivery',
    author: 'John Doe',
    role: 'CEO',
    company: 'Company',
    avatars: [
      {
        image: { url: 'https://shadcnblocks.com/images/block/avatar-1.webp' } as Media,
        fallback: 'AB',
      },
      {
        image: { url: 'https://shadcnblocks.com/images/block/avatar-2.webp' } as Media,
        fallback: 'CD',
      },
      {
        image: { url: 'https://shadcnblocks.com/images/block/avatar-3.webp' } as Media,
        fallback: 'EF',
      },
    ],
  },
  images = {
    first: { url: 'https://shadcnblocks.com/images/block/placeholder-1.svg' } as Media,
    second: { url: 'https://shadcnblocks.com/images/block/placeholder-dark-2.svg' } as Media,
    third: { url: 'https://shadcnblocks.com/images/block/placeholder-dark-3.svg' } as Media,
    fourth: { url: 'https://shadcnblocks.com/images/block/placeholder-dark-7-tall.svg' } as Media,
  },
}: HeroProps) {
  return (
    <section>
      <div className="container">
        <Spotlight />
        <div className="flex flex-col items-center gap-8 md:flex-row">
          <div className="flex-1">
            <div className="flex flex-col gap-4 lg:gap-8">
              <h1 className="max-w-[80%] text-4xl font-semibold leading-tighter text-foreground lg:text-5xl xl:text-7xl">
                {heading}
              </h1>
              <p className="text-lg leading-relaxed text-muted-foreground xl:text-xl">
                {description}
              </p>
            </div>
            <div className="my-6 lg:my-10">
              <Button asChild size="lg">
                <a href={button.url}>{button.text}</a>
              </Button>
            </div>
            <div className="flex flex-wrap items-center gap-3">
              <div className="relative flex -space-x-[1.5rem]">
                {testimonial.avatars.map((avatar, index) => (
                  <Avatar
                    key={index}
                    className={`relative z-${index + 1}0 flex h-12 w-12 flex-shrink-0 rounded-full border-2 border-white object-cover`}
                  >
                    <AvatarImage src={avatar.image.url!} alt={avatar.image.alt} />
                    <AvatarFallback>{avatar.fallback}</AvatarFallback>
                  </Avatar>
                ))}
              </div>
              <div>
                <p className="mb-1 text-sm italic text-muted2-foreground">
                  &quot;{testimonial.quote}&quot;
                </p>
                <p className="text-sm font-medium text-muted2-foreground">
                  {testimonial.author}, {testimonial.role} @{testimonial.company}
                </p>
              </div>
            </div>
          </div>
          <div className="w-full flex-1">
            <div className="w-full max-w-[50rem]">
              <AspectRatio ratio={1 / 1} className="h-full w-full">
                <div className="grid h-full w-full grid-cols-2 grid-rows-2 gap-[3.5%]">
                  <div className="overflow-hidden rounded-[5.2%] border border-muted bg-muted">
                    <img
                      src={images.first.url}
                      alt={images.first.alt}
                      className="object-fit h-full w-full object-center"
                    />
                  </div>
                  <div className="relative overflow-hidden rounded-[5.2%] border border-muted bg-muted">
                    <div className="absolute left-[5%] top-1/2 w-[110%] max-w-[25rem] -translate-y-1/2 overflow-hidden rounded-md">
                      <AspectRatio ratio={1.739130435 / 1}>
                        <img
                          src={images.second.url}
                          alt={images.second.alt}
                          className="size-full object-cover object-center"
                        />
                      </AspectRatio>
                    </div>
                  </div>
                  <div className="relative overflow-hidden rounded-[5.2%] border border-muted bg-muted">
                    <div className="absolute left-[9%] top-[9%] w-[200%] max-w-[37.5rem] overflow-hidden rounded-md">
                      <AspectRatio ratio={1.6 / 1}>
                        <img
                          src={images.third.url}
                          alt={images.third.alt}
                          className="size-full object-cover object-center"
                        />
                      </AspectRatio>
                    </div>
                  </div>
                  <div className="relative overflow-hidden rounded-[5.2%] border border-muted bg-muted">
                    <div className="relative left-[50%] top-[12%] w-[70%] max-w-[17.5rem] -translate-x-[50%]">
                      <AspectRatio ratio={0.52 / 1}>
                        <img
                          src="https://shadcnblocks.com/images/block/mockups/phone-1.png"
                          alt={'Phone Image'}
                          className="absolute z-20 w-full"
                        />
                        <img
                          src={images.fourth.url}
                          alt={images.fourth.alt}
                          className="absolute z-10 w-full rounded-[16%]"
                        />
                      </AspectRatio>
                    </div>
                  </div>
                </div>
              </AspectRatio>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export { Hero }
