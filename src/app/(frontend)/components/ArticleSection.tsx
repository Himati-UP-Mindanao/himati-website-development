import React from 'react'
import ArticleCard from './ArticleCard'
import Link from 'next/link'
import { Article } from '@/payload-types'
import { getScopes } from '../api/fetchPayload'

const ArticleSection = async ({ slug, articles }: { slug: string; articles: Article[] }) => {
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
      {categorizedArticles.map((item, index) => (
        <div key={index} className="space-y-12">
          <h1>Hello</h1>
          {/* Title and View all button */}
          <div className="md:flex md:justify-between md:items-center">
            <h2 className="text-xl font-bold text-negative-900">{item.scope}</h2>
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
      ))}
    </>
  )
}

export default ArticleSection
