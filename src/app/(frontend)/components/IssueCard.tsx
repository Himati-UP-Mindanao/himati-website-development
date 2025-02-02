import { FeaturedPhoto, Issue } from '@/payload-types'
import Image from 'next/image'
import React from 'react'

const IssueCard = ({ issue }: { issue: Issue }) => {
  const cleaned_issue = {
    ...issue,
    'cover-photo': issue['cover-photo'] as FeaturedPhoto,
  }

  return (
    <div className="space-y-3">
      <div className="relative aspect-[3/4]">
        <Image
          src={cleaned_issue['cover-photo'].url || ''}
          alt={cleaned_issue['cover-photo']['alt-text'] || ''}
          fill
          priority
          className="object-cover object-top"
          sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, 33vw"
        />
      </div>
      <h2 className="font-bold text-lg">{cleaned_issue.title}</h2>
    </div>
  )
}

export default IssueCard
