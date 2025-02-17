import {
  BatteryCharging,
  GitPullRequest,
  Layers,
  RadioTower,
  SquareKanban,
  WandSparkles,
} from 'lucide-react'
import { JSX } from 'react'

import { Field } from 'payload'

export const registerFeatures: { fields: Field[]; slug: string } = {
  slug: 'features',
  fields: [
    {
      name: 'heading',
      type: 'text',
      required: true,
      label: 'Heading',
    },
    {
      name: 'reasons',
      type: 'array',
      label: 'Reasons',
      fields: [
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
          name: 'icon',
          type: 'upload',
          relationTo: 'media',
          required: true,
          label: 'Icon',
        },
      ],
    },
  ],
}

interface FeaturesReason {
  title: string
  description: string
  icon: JSX.Element
}

interface FeaturesProps {
  heading?: string
  reasons?: FeaturesReason[]
}

function Features({
  heading = 'Why Work With Us?',
  reasons = [
    {
      title: 'Quality',
      description:
        'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Saepe est aliquid exercitationem, quos explicabo repellat?',
      icon: <GitPullRequest className="size-6" />,
    },
    {
      title: 'Experience',
      description:
        'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Saepe est aliquid exercitationem, quos explicabo repellat?',
      icon: <SquareKanban className="size-6" />,
    },
    {
      title: 'Support',
      description:
        'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Saepe est aliquid exercitationem, quos explicabo repellat?',
      icon: <RadioTower className="size-6" />,
    },
    {
      title: 'Innovation',
      description:
        'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Saepe est aliquid exercitationem, quos explicabo repellat?',
      icon: <WandSparkles className="size-6" />,
    },
    {
      title: 'Results',
      description:
        'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Saepe est aliquid exercitationem, quos explicabo repellat?',
      icon: <Layers className="size-6" />,
    },
    {
      title: 'Efficiency',
      description:
        'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Saepe est aliquid exercitationem, quos explicabo repellat?',
      icon: <BatteryCharging className="size-6" />,
    },
  ],
}: FeaturesProps) {
  return (
    <section className="py-32">
      <div className="container">
        <div className="mb-10 md:mb-20">
          <h2 className="mb-2 text-center text-3xl font-semibold lg:text-5xl">{heading}</h2>
        </div>
        <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-3">
          {reasons.map((reason, i) => (
            <div key={i} className="flex flex-col">
              <div className="mb-5 flex size-16 items-center justify-center rounded-full bg-accent">
                {reason.icon}
              </div>
              <h3 className="mb-2 text-xl font-semibold">{reason.title}</h3>
              <p className="text-muted-foreground">{reason.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export { Features, type FeaturesProps, type FeaturesReason }
