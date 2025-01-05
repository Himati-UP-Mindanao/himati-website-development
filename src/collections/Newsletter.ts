import { superAdmin } from "@/access/admin";
import type { CollectionConfig } from "payload";

export const Newsletter: CollectionConfig = {
  slug: "newsletter",
  labels: {
    singular: "Newsletter Subscriber",
    plural: "Newsletter Subscribers",
  },
  admin: {
    hidden({ user }) {
      if (!user) return true;
      return !user.role.includes("super-admin") && !user.role.includes("admin");
    }
  },
  access: {
    create: () => true,
    read: () => true,
    update: superAdmin,
    delete: superAdmin,
  },
  fields: [
    {
      name: "email",
      label: "Email Address",
      type: "email",
      required: true,
      admin: {
        readOnly: true,
      }
    },
  ]
}