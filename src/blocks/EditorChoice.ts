import type { Block } from "payload";

export const EditorChoice: Block = {
  slug: "editor-choice",
  labels: {
    singular: "Editor's Choice",
    plural: "Editor's Choices",
  },
  fields: [
    {
      name: "highlight",
      label: "Highlighted",
      type: "array",
      minRows: 1,
      fields: [
        {
          name: "display",
          label: "Article Display",
          type: "group",
          fields: [
            {
              name: "type",
              label: "Type of Display",
              type: "radio",
              required: true,
              options: [
                {
                  label: "Text on Image",
                  value: "text-on-image",
                },
                {
                  label: "Normal",
                  value: "normal",
                }
              ]
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
              admin: {
                condition: (_, siblingData) => siblingData?.['type'] === 'normal',
              },
            },
            {
              name: "tag",
              label: "Tag",
              type: "text",
              admin: {
                condition: (_, siblingData) => siblingData?.['type'] === 'text-on-image',
              },
            }
          ]

        },
      ]
    }
  ],
};