import { admin, superAdmin } from "@/access/admin";
import { editor } from "@/access/editor";
import type { CollectionConfig, Field } from "payload";

export const Issues: CollectionConfig = {
  slug: "issues",
  labels: {
    singular: "Issue",
    plural: "Issues",
  },
  admin: {
    useAsTitle: "title",
    hidden({user}) {
      if (!user) return true;
      return !user.role.includes("super-admin") && !user.role.includes("admin") && !user.role.includes("editor");
    }
  },
  access: {
    create: ({req}) => superAdmin({req}) || admin({req}) || editor({req}),
    read: () => true,
    update: ({req}) => superAdmin({req}) || admin({req}) || editor({req}),
    delete: ({req}) => superAdmin({req}),
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
  admin: {
    hidden({user}) {
      if (!user) return true;
      return !user.role.includes("super-admin") && !user.role.includes("admin") && !user.role.includes("editor");
    }
  },
  access: {
    create: ({req}) => superAdmin({req}) || admin({req}) || editor({req}),
    read: () => true,
    update: ({req}) => superAdmin({req}) || admin({req}) || editor({req}),
    delete: ({req}) => superAdmin({req}),
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