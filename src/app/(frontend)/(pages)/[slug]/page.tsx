import React from 'react'
import HighlightSection from '../../components/HighlightSection'
import ArticleSection from '../../components/ArticleSection'
import IssueSection from '../../components/IssueSection'
import {
  getCategorizedArticles,
  getIssues,
  getPage,
  getQuickLinks,
} from '../../lib/api/fetchPayload'

export const revalidate = 900 // 15 minutes

export const dynamicParams = false

export const generateStaticParams = async () => {
  console.log('Generating static params')
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

const Page = async ({ params }: { params: Promise<{ slug: string }> }) => {
  const slug = (await params).slug

  const [pageData, articles, issues] = await Promise.all([
    getPage(slug, 2),
    getCategorizedArticles(slug),
    getIssues(),
  ])

  const layout = pageData.docs[0]?.layout

  return (
    <main className="px-8 py-2 lg:py-32 max-w-screen-xl mx-auto font-acronym space-y-16">
      {/* Highlight Section */}
      <HighlightSection layout={layout} />

      {/* Articles Sections */}
      {articles && <ArticleSection slug={slug} articles={articles} />}

      {/* Issues Section */}
      <IssueSection issues={issues.docs} />
    </main>
  )
}

export default Page
