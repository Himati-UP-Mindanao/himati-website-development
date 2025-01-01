import { APIError, type CollectionConfig } from "payload";
import { slateEditor } from "@payloadcms/richtext-slate";
import { v4 as uuidv4 } from "uuid";
import { superAdmin } from "@/access/admin";
import { editor } from "@/access/editor";
import { writer } from "@/access/writer";
import { selfWrittenOrEditor } from "@/access/selfWrittenOrEditor";


const Articles: CollectionConfig = {
  slug: "articles",
  admin: {
    useAsTitle: "title",
  },
  access: {
    create: writer,
    read: () => true,
    update: selfWrittenOrEditor,
    delete: superAdmin,
    readVersions: ({ req }) => superAdmin({ req }) || editor({ req }),
  },
  versions: {
    drafts: true,
  },
  hooks: {
    beforeChange: [
      async ({ data, req, originalDoc }) => {
        const isPublishing = data._status === "published";
        const wasDraft = originalDoc?._status === "draft";
        const isEditor = req.user?.role.includes("editor");

        
        if ((isPublishing && Object.keys(originalDoc).length === 0) || (isPublishing && wasDraft)) {
          if (!isEditor) {
            throw new APIError("You must be an editor to publish articles", 403, undefined, true);
          }
        } 
      },
    ],
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
        create: () => false,
        update: () => false,
      },
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
      admin: {
        position: "sidebar",
      }
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
        position: "sidebar",
      },
    },
    {
      name: "category",
      label: "Category",
      type: "radio",
      required: true,
      admin: {
        position: "sidebar",
      },
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
      name: "scope",
      label: "Scope",
      type: "radio",
      required: true,
      admin: {
        position: "sidebar",
      },
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
    },
  ],
};

export default Articles;
