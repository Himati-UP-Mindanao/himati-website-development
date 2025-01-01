import type { Access } from 'payload'

export const superAdmin: Access = ({ req: { user } }) => {
  if (!user) return false;
  return user.role.includes('super-admin');
}

export const admin: Access = ({ req: { user } }) => {
  if (!user) return false;
  return user.role.includes('admin');
}