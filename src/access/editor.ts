import type { Access } from 'payload'

export const editor: Access = ({ req: { user } }) => {
  if (!user) return false;
  return user.role.includes('editor')
}