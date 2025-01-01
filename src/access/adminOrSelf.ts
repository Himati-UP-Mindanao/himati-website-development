import type { Access } from 'payload'

export const adminOrSelf: Access = ({ req: { user } }) => {
  if (!user) return false;
  return (
    user.role.includes('super-admin') || 
    user.role.includes('admin') || 
    { id: { equals: user.id } }
  );
}
