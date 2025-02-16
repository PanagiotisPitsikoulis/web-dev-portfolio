import { getPayload, GlobalSlug } from 'payload'
import config from '@/payload.config'
import { Metadata } from 'next'
import { generatePageMetadata } from '@/lib/engine/metadata/generate-page-metadata'
import { renderBlock } from '@/lib/engine/render-block'

export async function generateMetadata(): Promise<Metadata> {
  return await generatePageMetadata('landing-page')
}

export default async function HomePage({ params }: { params: Promise<{ slug: GlobalSlug }> }) {
  const awaitedParams = await params
  const slug = (awaitedParams?.slug?.[0] || 'landing-page') as GlobalSlug

  if (!slug) {
    throw new Error('Slug not found')
  }

  if (slug === 'layout') {
    throw new Error('Wrong slug')
  }

  const payloadConfig = await config
  const payload = await getPayload({ config: payloadConfig })

  const data = await payload.findGlobal({
    slug,
  })

  const sections = data?.sections || []

  return (
    <div>
      {sections.map((section, index) => (
        <section id={index.toString()} key={index} className="min-h-screen">
          {renderBlock(section, slug)}
        </section>
      ))}
    </div>
  )
}
