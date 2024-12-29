import type { CollectionConfig } from "payload";
import { v4 as uuidv4 } from "uuid";

const FeaturedPhoto: CollectionConfig = {
  slug: "featured-photo",
  admin: {
    useAsTitle: "id",
  },
  upload: true,
  access: {
    create: () => true,
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
      label: "Entry Created By",
      type: "relationship",
      relationTo: "himati-staff",
      required: true,
      defaultValue: ({ user }) => user!.id,
      access: {
        create: () => true,
        update: () => true,
      },
    },
    {
      name: "taken-by",
      label: "Taken By",
      type: "relationship",
      relationTo: "himati-staff",
      required: true,
    },
    {
      name: "cutline",
      type: "text",
    },
    {
      name: "alt-text",
      type: "textarea",
    },
  ],
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

export default FeaturedPhoto;
