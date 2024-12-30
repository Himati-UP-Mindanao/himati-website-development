import type { CollectionConfig } from "payload";
import { slateEditor } from "@payloadcms/richtext-slate";
import { v4 as uuidv4 } from "uuid";
import { radio } from "node_modules/payload/dist/fields/validations";

const Articles: CollectionConfig = {
  slug: "articles",
  admin: {
    useAsTitle: "title",
  },
  access: {
    create: () => true,
    read: () => true,
    update: () => true,
    delete: () => true,
  },
  versions: {
    drafts: true,
  },
  fields: [
    {
      name: "id",
      type: "text",
      access: {
        update: () => false,
      },
      hooks: {
        beforeValidate: [() => uuidv4()],
      },
      admin: {
        condition: () => false,
      },
    },
    {
      name: "title",
      label: "Title",
      type: "text",
      required: true,
    },
    {
      name: "author",
      label: "Author",
      type: "relationship",
      relationTo: "himati-users",
      required: true,
      defaultValue: ({ user }) => user!.id,
      access: {
        create: () => true,
        update: () => true,
      },
    },
    {
      name: "category",
      label: "Category",
      type: "radio",
      required: true,
      options: [
        {
          label: "News",
          value: "news",
        },
        {
          label: "Features",
          value: "features",
        },
        {
          label: "Kultura",
          value: "kultura",
        },
        {
          label: "Opinion",
          value: "opinion",
        },
      ],
    },
    {
      name: "content",
      label: "Content",
      type: "richText",
      required: true,
      editor: slateEditor({
        admin: {
          elements: [
            "h1",
            "h2",
            "h3",
            "h4",
            "h5",
            "h6",
            "blockquote",
            "ul",
            "ol",
            "indent",
            "link",
            "relationship",
            "textAlign",
          ],
        },
      }),
    },
    {
      name: "include-featured-photo",
      label: "Include Featured Photo?",
      type: "checkbox",
      defaultValue: false,
    },
    {
      name: "photo",
      type: "upload",
      relationTo: "featured-photo",
      required: true,
      admin: {
        condition: (data) => {
          return data["include-featured-photo"];
        },
      },
    },
    {
      name: "scope",
      label: "Scope",
      type: "radio",
      required: true,
      options: [
        {
          label: "University",
          value: "university",
        },
        {
          label: "Local",
          value: "Local",
        },
        {
          label: "National",
          value: "national",
        },
      ],
    }

  ],
};

export default Articles;
