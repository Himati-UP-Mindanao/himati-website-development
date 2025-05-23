import React from 'react'
import ArticleCard from './ArticleCard'
import Link from 'next/link'
import { Article } from '@/payload-types'
import { getArticles, getScopes } from '../api/fetchPayload'

const ArticleSection = async ({ slug }: { slug: string }) => {
  const articlesResponse = await getArticles(slug)

  if (!articlesResponse || articlesResponse.totalDocs === 0) {
    return null
  }
  const articles = articlesResponse.docs as Article[]

  const scopes = await getScopes(slug)
  if (!scopes) return null

  const categorizedArticles = scopes.map((scope) => ({
    scope: scope,
    articles: articles
      .filter((article) => article.scope.toLowerCase() === scope.toLowerCase())
      .slice(0, 3),
  }))

  return (
    <>
      {categorizedArticles.map((item, index) =>
        // Check if the articles array is empty
        item.articles.length === 0 ? null : (
          // If not, render the section
          <div key={index} className="space-4 lg:space-y-12">
            {/* Title and View all button */}
            <div className="flex justify-between items-center">
              <h2 className="lg:text-xl font-bold text-negative-900 py-3">{item.scope}</h2>
              <Link
                href={`${slug}/${item.scope.toLowerCase()}`}
                className="hover:underline underline-offset-4"
              >
                View all
              </Link>
            </div>
            <div className="grid md:grid-cols-3 gap-5">
              {item.articles.map((article, index) => (
                <ArticleCard key={index} article={article} />
              ))}
            </div>
          </div>
        ),
      )}
    </>
  )
}

export default ArticleSection
