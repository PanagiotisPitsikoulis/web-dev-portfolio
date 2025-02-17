import { Mail, MapPin, Phone } from 'lucide-react'
import { JSX } from 'react'
import { Field } from 'payload'

export const registerContact: { fields: Field[]; slug: string } = {
  slug: 'contact',
  fields: [
    {
      name: 'subheading',
      type: 'text',
      label: 'Subheading',
      defaultValue: 'Reach Us',
    },
    {
      name: 'heading',
      type: 'text',
      label: 'Heading',
      defaultValue: 'Speak with Our Friendly Team',
    },
    {
      name: 'description',
      type: 'textarea',
      label: 'Description',
      defaultValue: "We'd love to assist you. Fill out the form or drop us an email.",
    },
    {
      name: 'contactDetails',
      type: 'array',
      label: 'Contact Details',
      fields: [
        {
          name: 'icon',
          type: 'text',
          label: 'Icon (Lucide name)',
        },
        {
          name: 'title',
          type: 'text',
          label: 'Title',
        },
        {
          name: 'description',
          type: 'textarea',
          label: 'Description',
        },
        {
          name: 'link',
          type: 'group',
          label: 'Link',
          fields: [
            {
              name: 'text',
              type: 'text',
              label: 'Link Text',
            },
            {
              name: 'url',
              type: 'text',
              label: 'Link URL',
            },
          ],
        },
      ],
    },
  ],
}

interface ContactDetail {
  icon: JSX.Element
  title: string
  description: string
  link: {
    text: string
    url: string
  }
}

interface ContactProps {
  subheading?: string
  heading?: string
  description?: string
  contactDetails?: ContactDetail[]
}

function Contact({
  subheading = 'Reach Us',
  heading = 'Speak with Our Friendly Team',
  description = "We'd love to assist you. Fill out the form or drop us an email.",
  contactDetails = [
    {
      icon: <Mail className="h-6 w-auto" />,
      title: 'Email Us',
      description: 'Our team is ready to assist.',
      link: {
        text: 'abc@example.com',
        url: 'mailto:abc@example.com',
      },
    },
    {
      icon: <MapPin className="h-6 w-auto" />,
      title: 'Visit Us',
      description: 'Drop by our office for a chat.',
      link: {
        text: '1234 Street Name, City Name',
        url: '#',
      },
    },
    {
      icon: <Phone className="h-6 w-auto" />,
      title: 'Call Us',
      description: "We're available Mon-Fri, 9am-5pm.",
      link: {
        text: '+123 456 7890',
        url: 'tel:+1234567890',
      },
    },
  ],
}: ContactProps) {
  return (
    <section className="py-32">
      <div className="container">
        <div className="mb-14">
          <span className="text-sm font-semibold">{subheading}</span>
          <h1 className="mb-3 mt-1 text-balance text-3xl font-semibold md:text-4xl">{heading}</h1>
          <p className="text-lg text-muted-foreground">{description}</p>
        </div>
        <div className="grid gap-10 md:grid-cols-3">
          {contactDetails.map((detail, index) => (
            <div key={index}>
              <span className="mb-3 flex size-12 flex-col items-center justify-center rounded-full bg-accent">
                {detail.icon}
              </span>
              <p className="mb-2 text-lg font-semibold">{detail.title}</p>
              <p className="mb-3 text-muted-foreground">{detail.description}</p>
              <a href={detail.link.url} className="font-semibold hover:underline">
                {detail.link.text}
              </a>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export { Contact, type ContactProps, type ContactDetail }
