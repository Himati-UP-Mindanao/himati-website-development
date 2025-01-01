import type { Block } from "payload";

export const EditorialBoard: Block = {
  slug: "editorial-board",
  labels: {
    singular: "Editorial Board",
    plural: "Editorial Boards",
  },
  fields: [
    {
      name: "title",
      label: "Title",
      type: "text",
      defaultValue: "Editorial Board",
    },
    {
      name: "blurb",
      label: "Blurb",
      type: "text",
      defaultValue: "Meet our Editorial Board for the Academic Year 2024-2025.",
    },
    {
      name: "members",
      label: "Members",
      type: "array",
      minRows: 1,
      fields: [
        {
          name: "member-info",
          label: "Member Information",
          type: "relationship",
          relationTo: "himati-users",
          required: true,
          hooks: {
            afterRead:[
              async ({value, req}) => {
                const data = await req.payload.findByID({
                  collection: "himati-users",
                  id: value,
                });

                return {
                  "first-name": data["first-name"],
                  "last-name": data["last-name"],
                  "position": data["position"],
                }
              },
            ]
          }
        },
        {
          name: "degree-program",
          label: "Degree Program",
          type: "text",
        },
        {
          name: "member-image",
          label: "Member Image",
          type: "upload",
          required: true,
          relationTo: "profile-photo",
        }
      ]
    }
  ]
}