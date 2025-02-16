import { postgresAdapter } from '@payloadcms/db-postgres'
import { payloadCloudPlugin } from '@payloadcms/payload-cloud'
import { lexicalEditor } from '@payloadcms/richtext-lexical'
import path from 'path'
import { buildConfig } from 'payload'
import { fileURLToPath } from 'url'
import sharp from 'sharp'

import { Users } from './collections/Users'
import { Media } from './collections/Media'
import { Form } from './collections/Form'
import { Projects } from './collections/Project'
import { Post } from './collections/Post'
import { Layout } from './collections/Layout'
import { AboutPage } from './collections/pages/About'
import { BlogPage } from './collections/pages/Blog'
import { ContactPage } from './collections/pages/Contact'
import { LandingPage } from './collections/pages/Landing'
import { ProjectsGalleryPage } from './collections/pages/Projects'
import { ResumePage } from './collections/pages/Resume'

const filename = fileURLToPath(import.meta.url)
const dirname = path.dirname(filename)

export default buildConfig({
  admin: {
    user: Users.slug,
    importMap: {
      baseDir: path.resolve(dirname),
    },
  },
  localization: {
    defaultLocale: 'en',
    locales: ['en', 'el'],
  },
  collections: [Users, Media, Form, Projects, Post],
  globals: [Layout, AboutPage, LandingPage, BlogPage, ContactPage, ProjectsGalleryPage, ResumePage],
  editor: lexicalEditor(),
  secret: process.env.PAYLOAD_SECRET || '',
  typescript: {
    outputFile: path.resolve(dirname, 'payload-types.ts'),
  },
  db: postgresAdapter({
    pool: {
      connectionString: process.env.DATABASE_URI || '',
    },
  }),
  sharp,
  plugins: [payloadCloudPlugin()],
})
