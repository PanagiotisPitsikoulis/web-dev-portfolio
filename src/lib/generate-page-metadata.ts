import { getPayload, GlobalSlug } from 'payload'
import { Metadata } from 'next'
import config from '@/payload.config'

export async function generatePageMetadata(pageSlug: GlobalSlug): Promise<Metadata> {
  try {
    const payloadConfig = await config
    const payload = await getPayload({ config: payloadConfig })

    if (pageSlug === 'layout') {
      return {}
    }

    const data = await payload.findGlobal({
      slug: pageSlug,
    })

    if (!data) {
      return {}
    }

    return {
      title: data?.meta?.title,
      description: data?.meta?.description,
      keywords: data?.meta?.keywords,
      openGraph: {
        images: [
          {
            //@ts-ignore
            url: data?.meta?.og_image?.url,
            alt: data?.meta?.title || 'Page Image',
          },
        ],
      },
    }
  } catch (error) {
    console.error(error)
    return {}
  }
}
