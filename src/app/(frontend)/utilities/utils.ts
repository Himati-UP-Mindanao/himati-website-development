import { HimatiUser } from '@/payload-types'

export const getUserFullName = (user: HimatiUser) => {
  return `${user['first-name']} ${user['last-name']}`
}

export const revalidatePages = async () => {
  try {
    await fetch(`${process.env.NEXT_PUBLIC_APP_URL}/api/revalidate`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ secret: process.env.REVALIDATION_SECRET }),
    })
  } catch (error) {
    console.error('Error triggering revalidation:', error)
  }
}

export const collectionHooks = { 
  afterChange: [async () => revalidatePages()],
  afterDelete: [async () => revalidatePages()],
}