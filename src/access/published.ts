import type { Access } from 'payload'

export const published : Access = ({ req: { user } }) => {
  if (!user) {
    return {
      _status: { equals: 'published' }
    }
  } else return true
}