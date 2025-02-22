import HtmlRenderer from '@/app/(frontend)/components/HtmlRenderer'
import { getArticle, getArticles, getProfilePhoto } from '@/app/(frontend)/api/fetchPayload'
import { getUserFullName } from '@/app/(frontend)/utilities/utils'
import { FeaturedPhoto, HimatiUser } from '@/payload-types'
import Image from 'next/image'
import React from 'react'
import { payloadSlateToDomConfig, slateToHtml } from 'slate-serializers'
import { ResolvingMetadata } from 'next'

type Props = { 
  params: Promise<{ id: string }>
}

export async function generateMetadata({ params }: Props, parent: ResolvingMetadata) {
  const id = (await params).id
  const result = await getArticle(id);
  if (!result) return null

  const article = {
    ...result,
    photo: result['include-featured-photo'] ? (result.photo as FeaturedPhoto) : null,
  }

  const previousImages = (await parent)?.openGraph?.images ?? []

  return {
    title: article.title,
    openGraph: {
      images: [...previousImages, { url: article.photo?.url}],
    },
  }
}

export const generateStaticParams = async () => {
  const articles = await getArticles()

  if(!articles) return []
  
  return articles.docs.map((article) => ({
    id: String(article.id),
  }))
}

const IndividualPage = async ({ params }: { params: Promise<{ id: string }> }) => {
  const { id } = await params
  const article = await getArticle(id)

  const content = {
    ...article,
    createdAt: new Date(article.createdAt).toLocaleDateString('en-PH', {
      month: 'long',
      day: '2-digit',
      year: 'numeric',
    }),
    updatedAt: new Date(article.updatedAt).toLocaleDateString('en-PH', {
      month: 'long',
      day: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
      hour12: false, // Use 24-hour format, set to `true` for AM/PM
    }),
    photo: article['include-featured-photo'] ? (article.photo as FeaturedPhoto) : null,
    author: article.author as HimatiUser,
  }

  const member_photo = await getProfilePhoto(content.author.id!)

  return (
    <main className="px-8 py-2 lg:py-12 max-w-screen-xl mx-auto font-acronym lg:space-y-12 animate-fade-in">
      {/* Image */}
      {content.photo && (
        <div className="aspect-video w-full relative">
          <Image
            src={content.photo.url || ''}
            alt={content.photo['alt-text'] || content.title}
            fill
            priority
            sizes="(max-width: 1280px) 100vw, (max-width: 1200px) 50vw, 33vw"
            className="object-cover object-top"
          />
        </div>
      )}
      {/* Content */}
      <div className="grid md:grid-cols-8 gap-5">
        <div className="md:col-span-2 flex flex-col justify-between">
          {/* Date info  */}
          <div className="font-guardian space-y-3">
            <p>
              Published on: <br /> {content.createdAt}
            </p>
            <p>
              Updated on: <br /> {content.updatedAt}
            </p>
          </div>

          {/* Author Info */}
          <div>
            {/* Profile */}
            <div className="w-20 aspect-square rounded-full relative bg-neutral-600">
              {member_photo && (
                <Image
                  src={member_photo.url || ''}
                  alt={member_photo.title || 'Profile Photo'}
                  fill
                  priority
                  className="object-cover object-center rounded-full"
                  sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, 33vw"
                />
              )}
            </div>
            <h3 className='font-bold text-sm font-acronym'>{getUserFullName(content.author)}</h3>
          </div>
        </div>

        {/* Main Content */}
        <div className="md:col-span-6 space-y-5">
          <h1 className='font-acronym text-4xl font-bold pb-5 border-b-2'>{content.title}</h1>
          <div className='font-guardian'>
            <HtmlRenderer className='space-y-5' html={slateToHtml(content.content, payloadSlateToDomConfig) || ''} />
          </div>
        </div>
      </div>
    </main>
  )
}

export default IndividualPage
