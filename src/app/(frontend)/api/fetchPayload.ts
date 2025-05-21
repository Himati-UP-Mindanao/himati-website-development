import { BasePayload, getPayload, Where } from 'payload'
import config from '@payload-config'
import { notFound } from 'next/navigation'

let payloadInstance: BasePayload | null = null

export const getPayloadInstance = async () => {
  if (!payloadInstance) {
    payloadInstance = await getPayload({ config })
  }

  return payloadInstance
}

export const getPage = async (pageName: string, depth?: number) => {
  const payload = await getPayloadInstance()

  try {
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
  } catch (error) {
    console.error(error)
    notFound()
  }
}

export const getArticles = async (category?: string, scope?: string, limit: number = 25) => {
  const payload = await getPayloadInstance()

  const conditions: Where[] = [
    {
      _status: {
        equals: 'published',
      },
    },
  ]

  if (category) {
    conditions.push({
      category: {
        equals: category,
      },
    })
  }

  if (scope) {
    conditions.push({
      scope: {
        equals: scope,
      },
    })
  }

  try {
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
  } catch (error) {
    console.error(error)
    notFound()
  }
}

export const getArticle = async (id: string) => {
  const payload = await getPayloadInstance()

  try {
    const result = await payload.findByID({
      collection: 'articles',
      id,
      depth: 2,
    })

    return result
  } catch (error) {
    console.error(error)
    notFound()
  }
}

export const getIssues = async (limit: number = 20) => {
  const payload = await getPayloadInstance()
  try {
    const results = await payload.find({
      collection: 'issues',
      depth: 1,
      sort: '-createdAt',
      limit: limit,
    })

    if (!results) throw new Error('No issues found')
    return results
  } catch (error) {
    console.log(error)
    notFound()
  }
}

export const getQuickLinks = async () => {
  const payload = await getPayloadInstance()

  try {
    const results = await payload.findGlobal({
      slug: 'quick-links',
      depth: 1,
    })
    if (!results) throw new Error('No quick links found')

    return results.links
  } catch (error) {
    console.error(error)
    return null
  }
}

export const getScopes = async (category: string) => {
  const articles = await getArticles(category)

  if (!articles) {
    return null
  }

  const { docs } = articles

  const scopes =
    category === 'news'
      ? ['University', 'Local', 'National']
      : [...new Set(docs.map((doc) => doc.scope))]

  return scopes
}

export const getProfilePhoto = async (id: string) => {
  const payload = await getPayloadInstance()

  try {
    const result = await payload.find({
      collection: 'profile-photo',
      where: {
        author: {
          equals: id,
        },
      },
    })

    return result.docs[0]
  } catch (error) {
    console.error(error)
    notFound()
  }
}
