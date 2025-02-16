import { CollectionConfig } from 'payload'

export const Form: CollectionConfig = {
  slug: 'form',
  fields: [
    {
      name: 'title',
      type: 'text',
      required: true,
    },
    {
      name: 'description',
      type: 'textarea',
    },
    {
      name: 'fields',
      type: 'array',
      fields: [
        {
          name: 'fieldLabel',
          type: 'text',
          required: true,
        },
        {
          name: 'fieldType',
          type: 'select',
          options: [
            { label: 'Text', value: 'text' },
            { label: 'Textarea', value: 'textarea' },
            { label: 'Number', value: 'number' },
            { label: 'Email', value: 'email' },
            { label: 'Date', value: 'date' },
          ],
          required: true,
        },
        {
          name: 'required',
          type: 'checkbox',
          defaultValue: false,
        },
      ],
    },
  ],
  admin: {
    useAsTitle: 'title', // Use the 'title' field as the display title in the admin panel
    group: 'Data',
  },
}
