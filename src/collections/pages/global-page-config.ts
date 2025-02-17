import { fields } from '@/components/blocks/blocks-registry'
import { Field } from 'payload'

export const metadata: Field = {
  name: 'meta',
  type: 'group',
  label: 'SEO Metadata',
  fields: [
    {
      name: 'title',
      type: 'text',
      label: 'Meta Title',
    },
    {
      name: 'description',
      type: 'textarea',
      label: 'Meta Description',
    },
    {
      name: 'keywords',
      type: 'text',
      label: 'Meta Keywords',
    },
    {
      name: 'og_image',
      type: 'upload',
      label: 'Open Graph Image',
      relationTo: 'media',
    },
  ],
}

export const BasePageFields: Field[] = [
  {
    name: 'title',
    type: 'text',
    label: 'Page Title',
    required: true,
  },
  {
    name: 'slug',
    type: 'text',
    label: 'Slug',
    required: true,
    unique: true,
  },
  {
    name: 'published',
    type: 'checkbox',
    label: 'Published',
    defaultValue: false,
  },
  metadata,
  {
    ...fields,
  },
]
