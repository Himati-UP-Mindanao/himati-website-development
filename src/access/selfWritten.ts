import type { Access } from 'payload'

export const selfWritten: Access = ({ req: { user } }) => {
  if (!user) return false;
  return { author: { equals: user.id } };
}