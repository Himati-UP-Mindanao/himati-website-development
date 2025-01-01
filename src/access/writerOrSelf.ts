import type { Access } from 'payload'

export const writerOrSelf: Access = ({ req: { user } }) => {
  if (!user) return false;
  return user.role.includes('writer') || {
    author: { equals: user.id }
  };
}