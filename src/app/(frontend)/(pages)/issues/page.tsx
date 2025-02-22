import React from 'react'
import { getIssues } from '../../api/fetchPayload'
import { FeaturedPhoto } from '@/payload-types'
import IssueCard from '../../components/IssueCard'

const IssuePage = async () => {
  const res = await getIssues(4)

  if (!res || !res.docs) return null

  const issues = res.docs.map((issue) => ({
    ...issue,
    'cover-photo': issue['cover-photo'] as FeaturedPhoto,
  }))

  return (
    <main className="px-8 py-2 lg:py-32 max-w-screen-xl mx-auto font-acronym space-y-16 animate-fade-in">
      <h1 className='text-4xl font-bold text-negative-900'>Issues</h1>
      <div className='grid md:grid-cols-5 gap-5'>
        {issues.length > 0 && (
          issues.map((issue) => (
            <IssueCard key={issue.id} issue={issue} />
          ))
        )}
      </div>
    </main>
  )
}

export default IssuePage
