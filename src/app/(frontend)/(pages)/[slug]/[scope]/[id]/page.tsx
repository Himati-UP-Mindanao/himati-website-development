import HtmlRenderer from '@/app/(frontend)/components/HtmlRenderer'
import { getArticle, getArticles, getProfilePhoto } from '@/app/(frontend)/api/fetchPayload'
import { getUserFullName } from '@/app/(frontend)/utilities/utils'
import { FeaturedPhoto, HimatiUser } from '@/payload-types'
import Image from 'next/image'
import React from 'react'
import { payloadSlateToDomConfig, slateToHtml } from 'slate-serializers'
import { ResolvingMetadata } from 'next'
import { notFound } from 'next/navigation'

type Props = {
  params: Promise<{ id: string }>
}

export async function generateMetadata({ params }: Props, parent: ResolvingMetadata) {
  const id = (await params).id
  const result = await getArticle(id)
  if (!result) return null

  const article = {
    ...result,
    photo: result['include-featured-photo'] ? (result.photo as FeaturedPhoto) : null,
  }

  const previousImages = (await parent)?.openGraph?.images ?? []

  return {
    title: article.title,
    openGraph: {
      images: [...previousImages, { url: article.photo?.url }],
    },
  }
}

export const generateStaticParams = async () => {
  const articles = await getArticles()

  if (!articles) return []

  return articles.docs.map((article) => ({
    id: String(article.id),
  }))
}

const IndividualPage = async ({ params }: { params: Promise<{ id: string }> }) => {
  const { id } = await params
  const article = await getArticle(id)

  if (!article) notFound()
  if (article._status === 'draft') notFound()

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
    <main className="lg:py-12 max-w-screen-xl mx-auto font-acronym lg:space-y-12 animate-fade-in">
      {/* Image */}
      {content.photo && (
        <div className="aspect-video w-full relative lg:py-2 lg:px-8">
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
      <div className="px-8 py-4 grid md:grid-cols-8 gap-5">
        <div className="md:col-span-2 order-1 lg:-order-1">
          {/* Author Info */}
          <div className='flex flex-col items-center gap-2'>
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
            <h3 className="font-bold text-sm font-acronym">{getUserFullName(content.author)}</h3>
          </div>
        </div>

        {/* Main Content */}
        <div className="md:col-span-6 space-y-5">
          <div className="py-2 space-y-2 border-b-2">
            <h1 className="font-acronym text-xl lg:text-4xl font-bold">
              {content.title}
            </h1>
            <h4 className='text-sm lg:text-base text-neutral-800'>Published {content.createdAt}</h4>
          </div>
          <div className="font-guardian py-2 border-b-2 lg:border-none">
            <HtmlRenderer
              className="space-y-5"
              html={slateToHtml(content.content, payloadSlateToDomConfig) || ''}
            />
          </div>
        </div>
      </div>
    </main>
  )
}

export default IndividualPage
