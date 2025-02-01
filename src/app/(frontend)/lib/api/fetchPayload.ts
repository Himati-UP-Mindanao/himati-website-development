import { cache } from 'react'
import { getPayload } from 'payload'
import config from '@payload-config'

const payload = await getPayload({ config })

export const getPage = cache(async (pageName: string, depth?: number) => {
  const results = await payload.find({
    collection: 'pages',
    depth: depth || 1,
    where: {
      'page-name': {
        equals: pageName.charAt(0).toUpperCase() + pageName.slice(1),
      },
    },
  })

  return results
})

export const getArticles = cache(
  async (category: string, scope: string | null = null, limit: number = 25) => {
    const conditions: any[] = [
      {
        category: {
          equals: category,
        },
      },
    ]

    if (scope) {
      conditions.push({ scope: { equals: scope === "local" ? scope.charAt(0).toUpperCase() + scope.slice(1) : scope } })
    }

    const results = await payload.find({
      collection: 'articles',
      depth: 1,
      where: {
        and: conditions,
      },
      sort: '-createdAt',
      limit: limit,
    })

    return results
  },
)

export const getCategorizedArticles = cache(async (category: string) => {
  const articles = await getArticles(category)

  if (!articles) {
    return null
  }

  const { docs } = articles

  const scopes =
    category === 'news'
      ? ['University', 'Local', 'National']
      : [...new Set(docs.map((doc) => doc.scope))]

  const categorizedArticles = scopes.map((scope) => {
    return {
      scope: scope.charAt(0).toUpperCase() + scope.slice(1),
      articles: docs.filter((doc) => doc.scope.toLowerCase() === scope.toLowerCase()).slice(0, 3),
    }
  })

  return categorizedArticles
})

export const getIssues = cache(async (limit: number = 20) => {
  const results = await payload.find({
    collection: 'issues',
    depth: 1,
    sort: '-createdAt',
    limit: limit,
  })

  return results
})
