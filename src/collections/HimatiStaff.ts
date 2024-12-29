import type { CollectionConfig, Field, CollectionBeforeOperationHook } from "payload";
import { v4 as uuidv4 } from "uuid";

import { admin, superAdmin } from "@/access/admin";
import { adminOrSelf } from "@/access/adminOrSelf";

export const HimatiStaff: CollectionConfig = {
  slug: "himati-staff",
  auth: true,
  admin: {
    useAsTitle: "email",
  },
  access: {
    create: ({req}) => admin({req}) || superAdmin({req}),
    read: adminOrSelf,
    update: adminOrSelf,
    delete: superAdmin,
  },
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
          access: {
            create: ({req}) => admin({req}) || superAdmin({req}),
            update: ({req}) => admin({req}) || superAdmin({req}),
          }
        },
        {
          name: "last-name",
          type: "text",
          required: true,
          access: {
            create: ({req}) => admin({req}) || superAdmin({req}),
            update: ({req}) => admin({req}) || superAdmin({req}),
          }
        },
      ],
    },
    {
      type: "row",
      fields: [
        {
          name: "role",
          type: "select",
          required: true,
          saveToJWT: true,
          hasMany: true,
          access: {
            create: ({req}) => admin({req}) || superAdmin({req}),
            update: ({req}) => admin({req}) || superAdmin({req}),
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
          name: "position",
          type: "radio",
          access: {
            create: ({req}) => admin({req}) || superAdmin({req}),
            update: ({req}) => admin({req}) || superAdmin({req}),
          },
          admin: {
            layout: "vertical",
          },
          options: [
            {
              label: "Not Applicable (N/A)",
              value: "not-applicable",
              default: true,
            },
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
      ]
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
