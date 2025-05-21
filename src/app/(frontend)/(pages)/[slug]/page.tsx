import React, { Suspense } from 'react'
import HighlightSection from '../../components/HighlightSection'
import ArticleSection from '../../components/ArticleSection'
import IssueSection from '../../components/IssueSection'
import { getQuickLinks } from '../../api/fetchPayload'
import { Metadata, ResolvingMetadata } from 'next'

type Props = {
  params: Promise<{ slug: string }>
}

export async function generateMetadata(
  { params }: Props,
  parent: ResolvingMetadata,
): Promise<Metadata> {
  const slug = (await params).slug

  const previousImages = (await parent)?.openGraph?.images ?? []

  return {
    title: slug.charAt(0).toUpperCase() + slug.slice(1),
    openGraph: {
      images: [...previousImages],
    },
  }
}

export const generateStaticParams = async () => {
  const valid_slugs = await getQuickLinks()

  if (!valid_slugs) return []

  // Remove the About and Home in the valid slugs
  valid_slugs.splice(
    valid_slugs.findIndex((slug) => slug.title === 'About'),
    1,
  )
  valid_slugs.splice(
    valid_slugs.findIndex((slug) => slug.title === 'Home'),
    1,
  )

  // Remove the Pamati and Cultures in the valid slugs
  valid_slugs.splice(
    valid_slugs.findIndex((slug) => slug.title === 'Pamati'),
    1,
  )
  valid_slugs.splice(
    valid_slugs.findIndex((slug) => slug.title === 'Cultures'),
    1,
  )

  return valid_slugs.map((slug) => ({
    slug: String(slug.title.toLowerCase()),
  }))
}

const Page = async ({ params }: Props) => {
  const slug = (await params).slug

  return (
    <main className="px-8 py-2 lg:py-32 max-w-screen-xl mx-auto font-acronym space-y-16 animate-fade-in">
      {/* Highlight Section */}
      <Suspense fallback={<div className="h-96 bg-gray-200 animate-pulse rounded-lg" />}>
        <HighlightSection slug={slug} />
      </Suspense>

      {/* Articles Sections */}
      <Suspense fallback={<div className="h-96 bg-gray-200 animate-pulse rounded-lg" />}>
        <ArticleSection slug={slug} />
      </Suspense>

      {/* Issues Section */}
      <Suspense fallback={<div className="h-96 bg-gray-200 animate-pulse rounded-lg" />}>
        <IssueSection />
      </Suspense>
    </main>
  )
}

export default Page
