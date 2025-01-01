import { slateEditor } from "@payloadcms/richtext-slate";
import type { Block } from "payload";

export const TitleParagraphPair: Block = {
  slug: "title-paragraph-pair",
  labels: {
    singular: "Title Paragraph Pair",
    plural: "Title Paragraph Pairs",
  },
  fields: [
    {
      name: "title",
      label: "Title",
      type: "richText",
      required: true,
      editor: slateEditor({
        admin: {
          elements: [
            'h1',
            'h2',
            'h3',
            'h4',
            'h5',
            'h6',
            "textAlign"
          ],
        }
      }),
    },
    {
      name: "paragraph",
      label: "Paragraph",
      type: "richText",
      required: true,
      editor: slateEditor({
        admin: {
          elements: [
            'ul',
            'ol',
            'blockquote',
            'link',
            'textAlign',
            'indent'
          ],
        }
      }),
    },
  ],
}