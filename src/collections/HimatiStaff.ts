import type { CollectionConfig, Field } from "payload";
import { v4 as uuidv4 } from "uuid";

export const HimatiStaff: CollectionConfig = {
  slug: "himati-staff",
  auth: true,
  admin: {
    useAsTitle: "email",
  },
  access: {
    create: () => true,
    read: () => true,
    update: () => true,
    delete: () => true,
  },
  // hooks: {
  //   afterChange: [
  //     async ({ doc, req, previousDoc, operation }) => {
  //       if (operation === "create") {
  //       }
  //     },
  //   ],
  // },
  fields: [
    {
      name: "id",
      type: "text",
      admin: {
        condition: () => false,
      },
      access: {
        update: () => false,
      },
      hooks: {
        beforeValidate: [() => uuidv4()],
      },
    },
    {
      type: "row",
      fields: [
        {
          name: "first-name",
          type: "text",
          required: true,
        },
        {
          name: "last-name",
          type: "text",
          required: true,
        },
      ],
    },
    {
      name: "role",
      type: "select",
      required: true,
      saveToJWT: true,
      hasMany: true,
      access: {
        create: () => true,
      },
      options: [
        {
          label: "Super Admin",
          value: "super-admin",
        },
        {
          label: "Admin",
          value: "admin",
        },
        {
          label: "Writer",
          value: "writer",
        },
        {
          label: "Editor",
          value: "editor",
        },
      ],
    },
    {
      name: "bio",
      type: "textarea",
      admin: {
        condition: (data) => {
          return data.role === "writer";
        },
      },
    },
    {
      name: "position",
      type: "radio",
      access: {
        create: () => true,
        update: () => true,
      },
      options: [
        {
          label: "Editor-in-Chief",
          value: "editor-in-chief",
        },
        {
          label: "Associate Editor",
          value: "associate-editor",
        },
        {
          label: "Managing Editor",
          value: "managing-editor",
        },
        {
          label: "News Editor",
          value: "news-editor",
        },
        {
          label: "Opinion Editor",
          value: "opinion-editor",
        },
        {
          label: "Features Editor",
          value: "features-editor",
        },
        {
          label: "Sports Editor",
          value: "sports-editor",
        },
        {
          label: "Layout Writer",
          value: "layout-writer",
        },
        {
          label: "Staff Writer",
          value: "staff-writer",
        },
      ],
    },
    {
      label: "Bionote",
      name: "bionote",
      type: "textarea",
    },
    {
      name: "photo",
      type: "upload",
      relationTo: "profile-photo",
      // required: true,
    },
  ] as Field[],
};

export default HimatiStaff;
