import { admin, superAdmin } from "@/access/admin";
import { EditorialBoard } from "@/blocks/EditorialBoard";
import { TitleParagraphPair } from "@/blocks/TitleParagraphPair";
import type { CollectionConfig } from "payload";

export const Pages: CollectionConfig = {
  slug: "pages",
  admin: {
    useAsTitle: "page-name",
  },
  access: {
    create: superAdmin,
    read: () => true,
    update: ({ req }) => superAdmin({req}) || admin({req}),
    delete: superAdmin,
  },
  fields: [
    {
      name: "page-name",
      label: "Page Name",
      type: "text",
    },
    {
      name: "layout",
      label: "Layout",
      type: "blocks",
      minRows: 1,
      blocks: [
        TitleParagraphPair,
        EditorialBoard,
      ]
    }
  ]
}