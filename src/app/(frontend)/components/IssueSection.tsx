import React from 'react'
import { FeaturedPhoto, Issue } from '@/payload-types'
import IssueCard from './IssueCard'
import Link from 'next/link'
import { getIssues } from '../api/fetchPayload'

const IssueSection = async ({ limit } : { limit?: number }) => {
  const dbResponse = await getIssues(limit);

  if (!dbResponse || dbResponse.totalDocs === 0) {
    return null
  }

  const issues = dbResponse.docs as Issue[]

  if (!issues || !issues.length) return null;

  const clean_data= issues.map((issue) => ({
    ...issue,
    'cover-photo': issue['cover-photo'] as FeaturedPhoto,
  }))

  return (
    <div className="space-y-4 lg:space-y-12">
      {clean_data.length > 0 && (
        <>
          <div className="flex justify-between items-center">
            <h2 className="lg:text-xl font-bold text-negative-900">Issues</h2>
            <Link href="/issues" className="hover:underline underline-offset-4">
              View all
            </Link>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 lg:gap-5">
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
