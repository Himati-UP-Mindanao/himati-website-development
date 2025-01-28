import { cache } from "react";
import { getPayload } from "payload";
import config from "@payload-config";

const payload = await getPayload({ config });

export const getPage = cache(async (pageName: string) => {
  const results = await payload.find({
    collection: "pages",
    depth: 3,
    where: {
      "page-name": {
        equals: pageName,
      },
    },
  });

  return results
})
