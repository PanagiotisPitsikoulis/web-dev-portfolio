import { getPayload, GlobalSlug } from 'payload'
import { Metadata } from 'next'
import config from '@/payload.config'

export async function generatePageMetadata(pageSlug: GlobalSlug): Promise<Metadata> {
  const payloadConfig = await config
  const payload = await getPayload({ config: payloadConfig })

  if (pageSlug === 'layout') {
    return {}
  }

  const data = await payload.findGlobal({
    slug: pageSlug,
  })

  return {
    title: data?.meta?.title,
    description: data?.meta?.description,
    keywords: data?.meta?.keywords,
    openGraph: {
      // images: [
      //   {
      //     url: data?.meta?.image,
      //     alt: data?.meta?.title || 'Page Image',
      //   },
      // ],
    },
  }
}
