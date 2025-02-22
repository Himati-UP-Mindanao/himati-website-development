import { getArticles } from '@/app/(frontend)/api/fetchPayload'
import { MdOutlineKeyboardArrowRight } from 'react-icons/md'
import React from 'react'
import ArticleCard from '@/app/(frontend)/components/ArticleCard'
import Link from 'next/link'
import { ResolvingMetadata } from 'next'

type Props = {
  params: Promise<{ scope: string; slug: string }>
}

export async function generateMetadata(
  { params }: Props,
  parent: ResolvingMetadata,
) {
  const scope = (await params).scope

  const previousImages = (await parent)?.openGraph?.images ?? []

  return {
    title: scope.charAt(0).toUpperCase() + scope.slice(1),
    openGraph: {
      images: [...previousImages],
    },
  }
}

const page = async ({ params }: Props) => {
  const category = (await params).slug
  const scope = (await params).scope

  const res = await getArticles(category, scope)
  if (!res) return null

  const { docs } = res

  return (
    <main className="px-8 py-2 lg:py-32 max-w-screen-xl mx-auto font-acronym space-y-16 animate-fade-in">
      <div className="text-4xl font-bold text-negative-900 flex items-center gap-2">
        <Link href={`/${category.toLowerCase()}`} className="hover:underline underline-offset-4">
          {category.charAt(0).toUpperCase() + category.slice(1)}
        </Link>
        <MdOutlineKeyboardArrowRight size={36} />
        {scope.charAt(0).toUpperCase() + scope.slice(1)}
      </div>

      <div className="md: grid md:grid-cols-3 gap-x-5 gap-y-9">
        {docs.length > 0 &&
          docs.map((article, index) => <ArticleCard key={index} article={article} />)}
      </div>
    </main>
  )
}

export default page
