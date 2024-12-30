import { adminOrSelf } from "@/access/adminOrSelf";
import { equal } from "assert";
import { select } from "node_modules/payload/dist/fields/validations";
import type { CollectionConfig, Field } from "payload";
import { v4 as uuidv4 } from "uuid";

const ProfilePhoto: CollectionConfig = {
  slug: "profile-photo",
  admin: {
    useAsTitle: "title",
  },
  upload: true,
  access: {
    create: () => true,
    // read: isPublished,
    read: () => true,
    update: () => true,
    delete: () => true,
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
      type: "text",
      access: {
        create: () => false,
        update: () => false,
      },
      admin: {
        position: "sidebar",
      },
      hooks: {
        beforeChange: [
          async ({ data, req }) => {
            if (data && data.author) {
              const name = await req.payload.findByID({
                collection: "himati-users",
                id: data.author,
                })

              return `${name["first-name"]} ${name["last-name"]}'s Profile Photo`;
            }
          },
          ],
        },
      },
      {
      name: "author",
      label: "Profile Picture For",
      type: "relationship",
      relationTo: "himati-users",
      required: true,
      defaultValue: ({ user }) => user!.id,
      access: {
        create: adminOrSelf,
        update: adminOrSelf,
      },
    },
  ] as Field[],
  // hooks: {
  //   // Limit retuned fields for articles
  //   afterRead: [
  //     ({ doc, req }) => {
  //       const {
  //         id,
  //         "alt-text": altText,
  //         cutline,
  //         "taken-by": takenBy,
  //         url,
  //         focalX,
  //         focalY,
  //       } = doc;
  //       if (req.baseUrl.includes("articles")) {
  //         return { id, altText, cutline, takenBy, url, focalX, focalY };
  //       }
  //       return {};
  //     },
  //   ],
  // },
};

export default ProfilePhoto;
