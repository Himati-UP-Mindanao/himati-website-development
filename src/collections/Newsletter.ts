import type { CollectionConfig } from "payload";

export const Newsletter: CollectionConfig = {
  slug: "newsletter",
  labels: {
    singular: "Newsletter",
    plural: "Newsletters",
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