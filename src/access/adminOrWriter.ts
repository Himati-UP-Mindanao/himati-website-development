import type { Access } from "payload";

export const adminOrWriter: Access = ({ req: { user } }) => {
  if (!user) return false;
  return (
    user.role.includes("super-admin") ||
    user.role.includes("admin") ||
    user.role.includes("writer")
  )
};