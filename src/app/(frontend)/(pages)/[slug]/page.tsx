import React from 'react'
import HighlightSection from '../../components/HighlightSection'
import ArticleSection from '../../components/ArticleSection'
import { notFound } from 'next/navigation'

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
      <div className="space-y-12">
        {/* Title and View all button */}
        <div className="md:flex md:justify-between md:items-center">
          <h2 className="text-xl font-bold text-negative-900">Issues</h2>
          <p>View all</p>
        </div>
        <div className="grid md:grid-cols-4 gap-5">
          {[1, 2, 3, 4].map((_, index) => (
            <div key={index} className="space-y-3">
              {/* Image holder */}
              <div className="border border-black aspect-[3/4]">Image</div>
              <h2 className="font-bold text-lg">HIMATI March 2023 Issue</h2>
            </div>
          ))}
        </div>
      </div>
    </main>
  )
}

export default Page
