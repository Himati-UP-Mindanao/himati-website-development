import type { Access } from 'payload'

export const selfWrittenOrAdmin: Access = ({ req: { user } }) => {
  if (!user) return false;
  return user.role.includes("super-admin") || user.role.includes("admin") || { author: { equals: user.id } };
}