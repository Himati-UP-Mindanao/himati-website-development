import type { CollectionConfig, Field } from "payload";
import { v4 as uuidv4 } from "uuid";

const ProfilePhoto: CollectionConfig = {
  slug: "profile-photo",
  admin: {
    useAsTitle: "id",
  },
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
      name: "author",
      label: "Entry Uploaded By",
      type: "relationship",
      relationTo: "himati-staff",
      required: true,
      defaultValue: ({ user }) => user!.id,
      access: {
        create: () => true,
        update: () => true,
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
