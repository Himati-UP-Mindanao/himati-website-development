import React from 'react'
import { Article, FeaturedPhoto, HimatiUser } from '@/payload-types'
import Image from 'next/image'
import { getUserFullName } from '../utilities/utils'
import HtmlRenderer from './HtmlRenderer'
import { payloadSlateToDomConfig, slateToHtml } from 'slate-serializers'
import Link from 'next/link'

const ArticleCard = ({ article }: { article: Article }) => {
  const content = {
    ...article,
    createdAt: new Date(article.createdAt).toLocaleDateString('en-PH', {
      month: 'long',
      day: '2-digit',
      year: 'numeric',
    }),
    photo: article.photo as FeaturedPhoto,
    author: article.author as HimatiUser,
  }

  return (
    <Link href={`/${content.category}/${content.scope}/${content.id}`} className="space-y-3 group hover:scale-105 transition-all duration-200">
      {/* Image holder */}
      <div className="aspect-video relative bg-neutral-900">
        {content.photo && (
          <Image
            src={content.photo.url || '/test_image.png'}
            alt={content.photo['alt-text'] || 'Test_image'}
            sizes="(max-width: 392px) 100vw, (max-width: 768px) 50vw, 33vw"
            className="object-cover object-top"
            fill
            priority
          />
        )}
      </div>

      <div className="space-y-3">
        <div className="space-y-1">
          <h5 className="font-bold text-xl group-hover:underline">{article.title}</h5>
          <div className="flex gap-6 text-neutral-600">
            <p className="font-bold"> {getUserFullName(content.author)}</p>
            <p>{content.createdAt}</p>
          </div>
        </div>
        <div>
          <HtmlRenderer
            className="line-clamp-2"
            html={slateToHtml(content.content, payloadSlateToDomConfig) || ''}
          />
        </div>
      </div>
    </Link>
  )
}

export default ArticleCard
