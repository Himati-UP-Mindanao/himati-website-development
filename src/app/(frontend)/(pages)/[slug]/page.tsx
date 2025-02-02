import React from 'react'
import HighlightSection from '../../components/HighlightSection'
import ArticleSection from '../../components/ArticleSection'
import IssueSection from '../../components/IssueSection'

export const revalidate =  900 // 15 minutes

export const dynamicParams = false;

export const generateStaticParams = async () => { 
  const VALID_SLUGS: string[] = ['news', 'features', 'kultura', 'opinion', 'pamati']

  return VALID_SLUGS.map((slug) => ({
    slug: String(slug),
  }))
}


const Page = async ({ params }: { params: Promise<{ slug: string }> }) => {
  const slug = (await params).slug

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
