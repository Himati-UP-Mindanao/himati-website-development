import { admin, superAdmin } from "@/access/admin";
import type { GlobalConfig } from "payload";

export const QuickLinks: GlobalConfig = {
  slug: "quick-links",
  admin: {
    hidden({user}) {
      if (!user) return true;
      return !user.role.includes("super-admin") && !user.role.includes("admin");
    }
  },
  access: {
    read: () => true,
    update: ({ req }) => admin({ req }) || superAdmin({ req }),
  },
  fields: [
    {
      name: "links",
      label: "Links",
      type: "array",
      minRows: 1,
      fields: [
        {
          name: "title",
          label: "Title",
          type: "text",
          required: true,
        },
        {
          name: "url",
          label: "URL",
          type: "text",
          required: true,
        },
      ]
    },
  ],
};

