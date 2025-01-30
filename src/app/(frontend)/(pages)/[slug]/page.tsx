import React from 'react'
import Image from 'next/image'
import { getCategorizedArticles } from '../../lib/api/fetchPayload'
import ArticleCard from '../../components/ArticleCard'

export const revalidate = 60

const Page = async ({ params }: { params: Promise<{ slug: string }> }) => {
  const articles = await getCategorizedArticles((await params).slug)

  if (!articles) {
    return <div>Something went wrong</div>
  }

  return (
    <main className="px-8 py-2 lg:py-32 max-w-screen-xl mx-auto font-acronym space-y-16">
      {/* 1st Section */}
      <div className="grid md:grid-cols-3 gap-9 py-6">
        <div className="md:col-span-2 space-y-3">
          {/* Image Holder */}
          <div className="aspect-[2/1] w-full">
            <Image
              src={'/test_image.png'}
              alt="Test_image"
              width={2896}
              height={1376}
              className="w-full h-full"
            />
          </div>
          <div className="space-y-6">
            <div className="space-y-2">
              <h2 className="md:text-4xl font-bold">First Day Rage and Freshie Convocation</h2>
              <div className="md:flex md:gap-4 text-neutral-600">
                <p className="font-bold">David Aaron Lopez</p>
                <p>August 29, 2023</p>
              </div>
            </div>
            <p className="text-neutral-900 line-clamp-4">
              The UP Mindanao community officially welcomes its 353 First Year Students in the 2023
              University Convocation at the DC-UP Sports Complex Training Gym, UP Mindanao. During
              the program, incoming members of the University Student Council and College Student
              Councils will also be taking their oath in office for the Academic Year 2023-2024.
            </p>
          </div>
        </div>

        <div className="md:flex md:flex-col md:gap-6">
          {[1, 2].map((_, index) => (
            <div key={index} className="space-y-3">
              {/* Image holder */}
              <div className="w-full aspect-[2/1]">
                <Image
                  src={'/test_image.png'}
                  alt="Test_image"
                  width={2896}
                  height={1376}
                  className="w-full h-full"
                />
              </div>
              <div>
                <h5 className="font-bold text-xl">First Day Rage and Freshie Convocation</h5>
                <div className="flex gap-6 text-neutral-600">
                  <p className="font-bold">David Aaron Lopez</p>
                  <p>August 29, 2023</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Articles Sections */}
      {articles.map((article, index) => (
        <div key={index} className="space-y-12">
          {/* Title and View all button */}
          <div className="md:flex md:justify-between md:items-center">
            <h2 className="text-xl font-bold text-negative-900">{article.scope}</h2>
            <p>View all</p>
          </div>
          <div className="grid md:grid-cols-3 gap-5">
            {article.articles.map((article, index) => (
              <ArticleCard key={index} article={article} />
            ))}
          </div>
        </div>
      ))}

      {/* Issues Section */}
      <div className="space-y-12">
        {/* Title and View all button */}
        <div className="md:flex md:justify-between md:items-center">
          <h2 className="text-xl font-bold text-negative-900">Issues</h2>
          <p>View all</p>
        </div>
        <div className="grid md:grid-cols-4 gap-5">
          {[1, 2, 3, 4].map((_, index) => (
            <div key={index} className="space-y-3">
              {/* Image holder */}
              <div className="border border-black aspect-[3/4]">Image</div>
              <h2 className="font-bold text-lg">HIMATI March 2023 Issue</h2>
            </div>
          ))}
        </div>
      </div>
    </main>
  )
}

export default Page
