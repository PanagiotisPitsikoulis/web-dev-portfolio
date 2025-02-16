import { GlobalConfig } from 'payload'
import { BasePageFields } from './global-page-config'

export const ContactPage: GlobalConfig = {
  slug: 'contact-page',
  admin: {
    group: 'Pages',
  },
  fields: [
    ...BasePageFields,
    {
      name: 'sections',
      type: 'blocks',
      blocks: [
        {
          slug: 'contactFormSection',
          fields: [
            {
              name: 'heading',
              type: 'text',
              required: true,
              defaultValue: 'Contact Us',
            },
            {
              name: 'form',
              type: 'relationship',
              relationTo: 'form',
              required: true,
            },
          ],
        },
      ],
    },
  ],
}
