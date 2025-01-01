import type { Block } from "payload";

export const Carousel: Block = {
  slug: "carousel",
  labels: {
    singular: "Carousel",
    plural: "Carousels Slides",
  },
  fields: [
    {
      name: "slides",
      label: "Slides",
      type: "array",
      minRows: 1,
      maxRows: 10,
      fields: [
        {
          name: "tag",
          label: "Tag",
          type: "text",
          required: true,
        },
        {
          name: "article",
          label: "Article",
          type: "relationship",
          relationTo: "articles",
          required: true,
        },
        {
          name: "preview-text",
          label: "Preview Text",
          type: "text",
          required: true,
        }
      ],
    },
  ],
};