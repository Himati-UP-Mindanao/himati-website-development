import React from 'react'
import { getIssues } from '../lib/api/fetchPayload'
import Image from 'next/image'
import { FeaturedPhoto } from '@/payload-types'

const IssueSection = async ({ slug }: { slug: string }) => {
  const res = await getIssues(4)

  if (!res || !res.docs) return null

  const issues = res.docs.map((issue) => ({
    ...issue,
    'cover-photo': issue['cover-photo'] as FeaturedPhoto,
  }))

  return (
    <div className="space-y-12">
      {issues.length > 0 && (
        <>
          <div className="md:flex md:justify-between md:items-center">
            <h2 className="text-xl font-bold text-negative-900">Issues</h2>
            <p>View all</p>
          </div>
          <div className="grid md:grid-cols-4 gap-5">
            {issues.map((issue, index) => (
              <div key={index} className="space-y-3">
                <div className="relative aspect-[3/4]">
                  <Image
                    src={issue['cover-photo'].url || ''}
                    alt={issue['cover-photo']['alt-text'] || ''}
                    fill
                    priority
                    className="object-cover object-top"
                    sizes='(max-width: 640px) 100vw, (max-width: 768px) 50vw, 33vw'
                  />
                </div>
                <h2 className="font-bold text-lg">{issue.title}</h2>
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  )
}

export default IssueSection
