import type { CollectionConfig, Field } from "payload";
import { v4 as uuidv4 } from "uuid";

import { admin, superAdmin } from "@/access/admin";
import { adminOrSelf } from "@/access/adminOrSelf";

import { sendWelcomeEmail } from "@/utilities/sendWelcomeEmail";
import { HimatiPositions } from "@/constants/HimatiPositions";

export const HimatiUsers: CollectionConfig = {
  slug: "himati-users",
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
  hooks: {
    afterChange: [
      sendWelcomeEmail,
    ],
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
      required: true,
      options: HimatiPositions,
    }
  ] as Field[],
};

export default HimatiUsers;
