import type { Access } from 'payload'

export const selfWrittenOrEditor: Access = ({ req: { user } }) => {
  if (!user) return false;
  return user.role.includes('editor') || { author: { equals: user.id } };
}