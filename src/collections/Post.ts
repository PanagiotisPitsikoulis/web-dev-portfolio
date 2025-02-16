import { CollectionConfig } from 'payload'

export const Post: CollectionConfig = {
  slug: 'posts', // URL-friendly identifier for this collection
  admin: {
    useAsTitle: 'title', // Use the 'title' field as the display title in the admin panel
    defaultColumns: ['title', 'status', 'publishedDate'], // Default columns in the list view
    group: 'Data',
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      required: true,
    },
    {
      name: 'slug',
      type: 'text',
      required: true,
      unique: true, // Ensure each post has a unique slug
    },
    {
      name: 'content',
      type: 'richText', // Rich text editor for post content
      required: true,
    },
    {
      name: 'featuredImage',
      type: 'upload',
      relationTo: 'media', // Link to the `media` collection
      required: true,
    },
    {
      name: 'status',
      type: 'select',
      options: [
        { label: 'Draft', value: 'draft' },
        { label: 'Published', value: 'published' },
      ],
      defaultValue: 'draft',
    },
    {
      name: 'publishedDate',
      type: 'date',
      required: true,
      admin: {
        position: 'sidebar', // Place this field in the sidebar
      },
    },
  ],
}
