import type { Access } from 'payload'

export const writer: Access = ({ req: { user } }) => {
  if (!user) return false;
  return user.role.includes('writer');
}