import React from 'react'
import { Article } from '@/payload-types'
import Image from 'next/image'
import { getUserFullName } from '../lib/utils'
import HtmlRenderer from './HtmlRenderer'
import { payloadSlateToDomConfig, slateToHtml } from 'slate-serializers'

const ArticleCard = ({ article }: { article: Article }) => {
  return (
    <div className="space-y-3">
      {/* Image holder */}
      <div className="aspect-video relative bg-neutral-900">
        {article.photo && (
          <Image
            src={
              article.photo
                ? ((typeof article.photo === 'string' ? article.photo : article.photo.url) ?? '')
                : ''
            }
            alt={
              article.photo
                ? typeof article.photo === 'string'
                  ? article.photo
                  : (article.photo['alt-text'] ?? 'Article Image')
                : 'Article Image'
            }
            fill
            sizes='(max-width: 392px) 100vw, (max-width: 768px) 50vw, 33vw'
            priority
            className="object-cover object-top"
          />
        )}
      </div>
      <div className="space-y-3">
        <div className="space-y-1">
          <h5 className="font-bold text-xl">{article.title}</h5>
          <div className="flex gap-6 text-neutral-600">
            <p className="font-bold">
              {typeof article.author === 'string'
                ? article.author
                : getUserFullName(article.author)}
            </p>
            <p>
              {new Date(article.createdAt).toLocaleDateString('en-PH', {
                month: 'long',
                day: '2-digit',
                year: 'numeric',
              })}
            </p>
          </div>
        </div>
        <div>
          <HtmlRenderer className='line-clamp-4' html={slateToHtml(article.content, payloadSlateToDomConfig) || ""} />
        </div>
      </div>
    </div>
  )
}

export default ArticleCard
