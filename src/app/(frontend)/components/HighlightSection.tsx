import { Article, FeaturedPhoto, HimatiUser, Page } from '@/payload-types'
import Image from 'next/image'
import React from 'react'
import { getUserFullName } from '../utilities/utils'
import Link from 'next/link'
import { getPage } from '../api/fetchPayload'

const HighlightSection = async ({ slug }: { slug: string }) => {
  const page = await getPage(slug, 2)

  if (!page || page.totalDocs === 0) {
    return <div className="p-10 text-center mx-auto">Something went wrong</div>
  }

  const layout = page.docs[0].layout as Page['layout']

  if (!layout) {
    return <div className="p-10 text-center mx-auto">Something went wrong</div>
  }

  const highlights = layout.find(
    (block): block is Extract<typeof block, { blockType: 'editor-choice' }> =>
      block.blockType === 'editor-choice',
  )

  const content = highlights?.highlight?.map((highlight) => {
    const article = highlight.display.article as Article
    return {
      article: {
        ...article,
        createdAt: new Date(article.createdAt).toLocaleDateString('en-PH', {
          year: 'numeric',
          month: 'long',
          day: 'numeric',
        }),
        photo: article.photo as FeaturedPhoto,
        author: article.author as HimatiUser,
      },
      previewText: highlight.display['preview-text'],
    }
  })

  return (
    <>
      {content && (
        <section>
          <h2 className="text-xl font-bold text-negative-900">TOP NEWS</h2>
          <div className="grid md:grid-cols-3 gap-9 py-6">
            <Link
              href={`${content[0].article.category}/${content[0].article.scope}/${content[0].article.id}`}
              className="md:col-span-2 space-y-3 hover:scale-[103%] hover:cursor-pointer group transition-all duration-200"
            >
              {/* Image Holder */}
              <div className="aspect-video w-full relative">
                <Image
                  src={content[0].article.photo.url || '/test_image.png'}
                  alt={content[0].article.photo['alt-text'] || 'Test_image'}
                  fill
                  priority
                  sizes="(max-width: 1200px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  className="object-cover object-top"
                />
              </div>
              <div className="space-y-6">
                <div className="space-y-2">
                  <h2 className="md:text-4xl font-bold group-hover:underline">
                    {content[0].article.title}
                  </h2>
                  <div className="md:flex md:gap-4 text-neutral-600">
                    <p className="font-bold">{getUserFullName(content[0].article.author)}</p>
                    <p>{content[0].article.createdAt}</p>
                  </div>
                </div>
                <p className="text-neutral-900 line-clamp-4">{content[0].previewText}</p>
              </div>
            </Link>

            <div className="md:flex md:flex-col md:gap-6">
              {content.slice(1).map((highlight, index) => (
                <Link
                  href={`${highlight.article.category}/${highlight.article.scope}/${highlight.article.id}`}
                  key={index}
                  className="space-y-3 group hover:scale-105 transition-all duration-200"
                >
                  {/* Image holder */}
                  <div className="w-full aspect-video relative">
                    <Image
                      src={highlight.article.photo.url || '/test_image.png'}
                      alt={highlight.article.photo['alt-text'] || 'Test_image'}
                      fill
                      priority
                      sizes="(max-width: 720px) 100vw, (max-width: 1200px) 50vw, 33vw"
                      className="object-cover object-top"
                    />
                  </div>
                  <div>
                    <h5 className="font-bold text-xl group-hover:underline">
                      {highlight.article.title}
                    </h5>
                    <div className="flex gap-6 text-neutral-600">
                      <p className="font-bold">{getUserFullName(highlight.article.author)}</p>
                      <p>{highlight.article.createdAt}</p>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}
    </>
  )
}

export default HighlightSection
