import type { CollectionConfig, Field } from "payload";

export const Issues: CollectionConfig = {
  slug: "issues",
  labels: {
    singular: "Issue",
    plural: "Issues",
  },
  admin: {
    useAsTitle: "title",
  },
  fields: [
    {
      name: "title",
      label: "Title",
      type: "text",
      required: true,
    },
    {
      name: "link",
      label: "Link",
      type: "text",
      required: true,
    },
    {
      name: "cover-photo",
      label: "Cover Photo",
      type: "upload",
      required: true,
      relationTo: "featured-photo",
    },
  ] as Field[],
}

export const IssueCoverPhoto: CollectionConfig = {
  slug: "issue-cover-photo",
  labels: {
    singular: "Issue Cover Photo",
    plural: "Issue Cover Photos",
  },
  fields: [
    {
      name: "alt",
      label: "Alt Text",
      type: "text",
      required: true,
    },
  ],
  upload: true,
}