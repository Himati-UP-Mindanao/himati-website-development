import React from 'react'
import { getCategorizedArticles, getPage } from '../../lib/api/fetchPayload'
import ArticleCard from '../../components/ArticleCard'
import HighlightSection from '../../components/HighlightSection'

export const revalidate = 60

const Page = async ({ params }: { params: Promise<{ slug: string }> }) => {
  const articles = await getCategorizedArticles((await params).slug)
  const pageContent = await getPage((await params).slug, 2)

  if (!articles || !pageContent.docs[0].layout) {
    return <div>Something went wrong</div>
  }

  const layouts = pageContent.docs[0].layout

  return (
    <main className="px-8 py-2 lg:py-32 max-w-screen-xl mx-auto font-acronym space-y-16">
      {/* Highlight Section */}
      <HighlightSection layout={layouts} />

      {/* Articles Sections */}
      {articles.map((article, index) => (
        <div key={index} className="space-y-12">
          {/* Title and View all button */}
          <div className="md:flex md:justify-between md:items-center">
            <h2 className="text-xl font-bold text-negative-900">{article.scope}</h2>
            <p>View all</p>
          </div>
          <div className="grid md:grid-cols-3 gap-5">
            {article.articles.map((article, index) => (
              <ArticleCard key={index} article={article} />
            ))}
          </div>
        </div>
      ))}

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
