import { getPayload, GlobalSlug } from 'payload'
import config from '@/payload.config'
import { Metadata } from 'next'
import { generatePageMetadata } from '@/lib/generate-page-metadata'
import React from 'react'
import { renderBlock } from '@/components/blocks/render-block'

export async function generateMetadata(): Promise<Metadata> {
  return await generatePageMetadata('landing-page')
}

export default async function Page({ params }: { params: Promise<{ slug: GlobalSlug }> }) {
  try {
    const awaitedParams = await params
    const slug = (awaitedParams?.slug?.[0] || 'landing-page') as GlobalSlug

    if (!slug) {
      throw new Error('Slug is required and cannot be empty')
    }

    if (slug === 'layout') {
      throw new Error('The "layout" slug is reserved and cannot be used')
    }

    const payloadConfig = await config
    const payload = await getPayload({ config: payloadConfig })

    // Ensure data exists before continuing
    const data = await payload.findGlobal({ slug })
    if (!data) {
      throw new Error(`No global data found for slug: ${slug}`)
    }

    const sections = data?.sections || []

    if (sections.length === 0) {
      throw new Error(`No sections found for the slug: ${slug}`)
    }

    return (
      <>
        {sections.map((section, index) => (
          <div id={index.toString()} key={index}>
            {renderBlock(section)}
          </div>
        ))}
      </>
    )
  } catch (error) {
    console.error('Error in Page component:', error)
    return null
  }
}
