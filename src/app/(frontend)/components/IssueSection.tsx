import React from 'react'
import { FeaturedPhoto, Issue } from '@/payload-types'
import IssueCard from './IssueCard'
import Link from 'next/link'

const IssueSection = async ({ issues }: { issues: Issue[] }) => {
  if (!issues || !issues.length) return null;

  const clean_data= issues.map((issue) => ({
    ...issue,
    'cover-photo': issue['cover-photo'] as FeaturedPhoto,
  }))

  return (
    <div className="space-y-12">
      {clean_data.length > 0 && (
        <>
          <div className="md:flex md:justify-between md:items-center">
            <h2 className="text-xl font-bold text-negative-900">Issues</h2>
            <Link href="/issues" className="hover:underline underline-offset-4">
              View all
            </Link>
          </div>
          <div className="grid md:grid-cols-4 gap-5">
            {clean_data.map((issue) => (
              <IssueCard key={issue.id} issue={issue} />
            ))}
          </div>
        </>
      )}
    </div>
  )
}

export default IssueSection
