import { cn } from '@/lib/utils'
import { buttonVariants } from '@/components/ui/button'

import { Field } from 'payload'

export const registerCareer: { fields: Field[]; slug: string } = {
  slug: 'career',
  fields: [
    {
      name: 'heading',
      type: 'text',
      label: 'Heading',
      defaultValue: 'Job Openings',
    },
    {
      name: 'jobs',
      type: 'array',
      label: 'Job Categories',
      fields: [
        {
          name: 'category',
          type: 'text',
          label: 'Category Name',
        },
        {
          name: 'openings',
          type: 'array',
          label: 'Job Openings',
          fields: [
            {
              name: 'title',
              type: 'text',
              label: 'Job Title',
            },
            {
              name: 'location',
              type: 'text',
              label: 'Location',
            },
            {
              name: 'url',
              type: 'text',
              label: 'Application Link',
            },
          ],
        },
      ],
    },
  ],
}

interface CareerJobOpening {
  title: string
  location: string
  url: string
}

interface CareerJobCategory {
  category: string
  openings: CareerJobOpening[]
}

interface CareerProps {
  heading?: string
  jobs?: CareerJobCategory[]
}

function Career({
  heading = 'Job Openings',
  jobs = [
    {
      category: 'Engineering',
      openings: [
        {
          title: 'Senior Frontend Developer',
          location: 'Remote',
          url: '#',
        },
        {
          title: 'UI/UX Designer',
          location: 'San Francisco',
          url: '#',
        },
        {
          title: 'React Developer',
          location: 'Remote',
          url: '#',
        },
        {
          title: 'Technical Lead',
          location: 'London',
          url: '#',
        },
      ],
    },
    {
      category: 'Design',
      openings: [
        {
          title: 'Product Designer',
          location: 'Remote',
          url: '#',
        },
        {
          title: 'Visual Designer',
          location: 'Berlin',
          url: '#',
        },
      ],
    },
  ],
}: CareerProps) {
  return (
    <section className="py-8">
      <div className="container">
        <div>
          <div className="text-center lg:text-left">
            <h1 className="text-left text-3xl font-medium md:text-4xl">{heading}</h1>
          </div>
          <div className="mx-auto mt-6 flex flex-col gap-16 md:mt-14">
            {jobs.map((jobCategory) => (
              <div key={jobCategory.category} className="grid">
                <h2 className="border-b pb-4 text-xl font-bold">{jobCategory.category}</h2>
                {jobCategory.openings.map((job) => (
                  <div key={job.title} className="flex items-center justify-between border-b py-4">
                    <a href={job.url} className="font-semibold hover:underline">
                      {job.title}
                    </a>
                    <div
                      className={cn(
                        buttonVariants({
                          variant: 'outline',
                          size: 'sm',
                        }),
                        'pointer-events-none rounded-full',
                      )}
                    >
                      {job.location}
                    </div>
                  </div>
                ))}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

export { Career, type CareerProps, type CareerJobCategory, type CareerJobOpening }
