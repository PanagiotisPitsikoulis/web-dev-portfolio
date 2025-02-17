import { ModeToggle } from '../ui/mode-toggle'

import { Field } from 'payload'

export const registerFooter: { fields: Field[]; slug: string } = {
  slug: 'footer',
  fields: [
    {
      name: 'logo',
      type: 'group',
      label: 'Logo',
      fields: [
        {
          name: 'src',
          type: 'upload',
          relationTo: 'media',
          required: true,
          label: 'Logo Image',
        },
        {
          name: 'alt',
          type: 'text',
          required: true,
          label: 'Logo Alt Text',
        },
        {
          name: 'title',
          type: 'text',
          required: true,
          label: 'Logo Title',
        },
        {
          name: 'url',
          type: 'text',
          required: true,
          label: 'Logo URL',
        },
      ],
    },
    {
      name: 'menuItems',
      type: 'array',
      label: 'Menu Items',
      fields: [
        {
          name: 'title',
          type: 'text',
          required: true,
          label: 'Section Title',
        },
        {
          name: 'links',
          type: 'array',
          label: 'Links',
          fields: [
            {
              name: 'text',
              type: 'text',
              required: true,
              label: 'Link Text',
            },
            {
              name: 'url',
              type: 'text',
              required: true,
              label: 'Link URL',
            },
          ],
        },
      ],
    },
    {
      name: 'copyright',
      type: 'text',
      required: true,
      label: 'Copyright Text',
    },
    {
      name: 'bottomLinks',
      type: 'array',
      label: 'Bottom Links',
      fields: [
        {
          name: 'text',
          type: 'text',
          required: true,
          label: 'Link Text',
        },
        {
          name: 'url',
          type: 'text',
          required: true,
          label: 'Link URL',
        },
      ],
    },
  ],
}

export interface MenuItem {
  title: string
  links: {
    text: string
    url: string
  }[]
}

export interface FooterProps {
  logo?: {
    url: string
    src: string
    alt: string
    title: string
  }
  menuItems?: MenuItem[]
  copyright?: string
  bottomLinks?: {
    text: string
    url: string
  }[]
}

const Footer = ({
  logo = {
    src: 'https://www.shadcnblocks.com/images/block/block-1.svg',
    alt: 'blocks for shadcn/ui',
    title: 'Shadcnblocks.com',
    url: 'https://www.shadcnblocks.com',
  },
  menuItems = [
    {
      title: 'Product',
      links: [
        { text: 'Overview', url: '#' },
        { text: 'Pricing', url: '#' },
        { text: 'Marketplace', url: '#' },
        { text: 'Features', url: '#' },
        { text: 'Integrations', url: '#' },
        { text: 'Pricing', url: '#' },
      ],
    },
    {
      title: 'Company',
      links: [
        { text: 'About', url: '#' },
        { text: 'Team', url: '#' },
        { text: 'Blog', url: '#' },
        { text: 'Careers', url: '#' },
        { text: 'Contact', url: '#' },
        { text: 'Privacy', url: '#' },
      ],
    },
    {
      title: 'Resources',
      links: [
        { text: 'Help', url: '#' },
        { text: 'Sales', url: '#' },
        { text: 'Advertise', url: '#' },
      ],
    },
    {
      title: 'Social',
      links: [
        { text: 'Twitter', url: '#' },
        { text: 'Instagram', url: '#' },
        { text: 'LinkedIn', url: '#' },
      ],
    },
  ],
  copyright = '© 2024 Copyright. All rights reserved.',
  bottomLinks = [
    { text: 'Terms and Conditions', url: '#' },
    { text: 'Privacy Policy', url: '#' },
  ],
}: FooterProps) => {
  return (
    <section className="py-32">
      <div className="container">
        <footer>
          <div className="grid grid-cols-2 gap-8 lg:grid-cols-6">
            <div className="col-span-2 mb-8 lg:mb-0">
              <div className="flex items-center gap-2 lg:justify-start">
                <a href="https://shadcnblocks.com">
                  <img src={logo.src} alt={logo.alt} title={logo.title} className="h-10" />
                </a>
                <p className="text-xl font-semibold">{logo.title}</p>
              </div>
              <div className="mt-4">
                <ModeToggle />
              </div>
            </div>
            {menuItems.map((section, sectionIdx) => (
              <div key={sectionIdx}>
                <h3 className="mb-4 font-bold">{section.title}</h3>
                <ul className="space-y-4 text-muted-foreground">
                  {section.links.map((link, linkIdx) => (
                    <li key={linkIdx} className="font-medium hover:text-primary">
                      <a href={link.url}>{link.text}</a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
          <div className="mt-24 flex flex-col justify-between gap-4 border-t pt-8 text-sm font-medium text-muted-foreground md:flex-row md:items-center">
            <p>{copyright}</p>
            <ul className="flex gap-4">
              {bottomLinks.map((link, linkIdx) => (
                <li key={linkIdx} className="underline hover:text-primary">
                  <a href={link.url}>{link.text}</a>
                </li>
              ))}
            </ul>
          </div>
        </footer>
      </div>
    </section>
  )
}

export { Footer }
