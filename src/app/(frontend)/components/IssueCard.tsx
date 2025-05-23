import { FeaturedPhoto, Issue } from '@/payload-types'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

const IssueCard = ({ issue }: { issue: Issue }) => {
  const cleaned_issue = {
    ...issue,
    'cover-photo': issue['cover-photo'] as FeaturedPhoto,
  }

  return (
    <Link href="#" className="space-y-3 group hover:scale-105 transition-all max-w-[164px]">
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
      <h2 className="font-bold lg:text-lg group-hover:underline">{cleaned_issue.title}</h2>
    </Link>
  )
}

export default IssueCard
