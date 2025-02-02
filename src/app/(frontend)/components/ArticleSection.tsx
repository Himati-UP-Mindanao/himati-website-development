import React from 'react'
import ArticleCard from './ArticleCard';
import Link from 'next/link';
import { Article } from '@/payload-types';

interface ArticleSectionProps {
  scope: string;
  articles: Article[];
}

const ArticleSection = async ({ slug, articles }:  { slug: string, articles: ArticleSectionProps[]} ) => {

  return (
    <>
      {articles.map((article, index) => (
        <div key={index} className="space-y-12">
          {/* Title and View all button */}
          <div className="md:flex md:justify-between md:items-center">
            <h2 className="text-xl font-bold text-negative-900">{article.scope}</h2>
            <Link  href={`${slug}/${article.scope.toLowerCase()}`} className='hover:underline underline-offset-4'>View all</Link>
          </div>
          <div className="grid md:grid-cols-3 gap-5">
            {article.articles.map((article, index) => (
              <ArticleCard key={index} article={article} />
            ))}
          </div>
        </div>
      ))}
    </>
  )
}

export default ArticleSection
