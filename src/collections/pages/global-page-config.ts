import { Field } from 'payload'

export const BasePageFields: Field[] = [
  {
    name: 'title',
    type: 'text',
    required: true,
  },
  {
    name: 'slug',
    type: 'text',
    required: true,
    unique: true,
  },
  {
    name: 'meta',
    type: 'group',
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
    ],
  },
  {
    name: 'published',
    type: 'checkbox',
    defaultValue: false,
  },
]
