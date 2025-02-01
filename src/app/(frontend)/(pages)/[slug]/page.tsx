import React from 'react'
import HighlightSection from '../../components/HighlightSection'
import ArticleSection from '../../components/ArticleSection'
import { notFound } from 'next/navigation'
import IssueSection from '../../components/IssueSection'

export const revalidate = 60

const VALID_SLUGS = ['news', 'features', 'kultura', 'opinion', 'pamati']

const Page = async ({ params }: { params: Promise<{ slug: string }> }) => {
  const slug = (await params).slug

  if (!VALID_SLUGS.includes(slug)) {
    return notFound()
  }

  return (
    <main className="px-8 py-2 lg:py-32 max-w-screen-xl mx-auto font-acronym space-y-16">
      {/* Highlight Section */}
      <HighlightSection slug={slug} />

      {/* Articles Sections */}
      <ArticleSection slug={slug} />

      {/* Issues Section */}
      <IssueSection slug={slug} />
    </main>
  )
}

export default Page
