import { cache } from "react";
import { getPayload } from "payload";
import config from "@payload-config";

const payload = await getPayload({ config });

export const getPage = cache(async (pageName: string) => {
  const results = await payload.find({
    collection: "pages",
    depth: 1,
    where: {
      "page-name": {
        equals: pageName,
      },
    },
  });

  return results;
})

export const getArticles = cache(async (category: string) => {
  const results = await payload.find({
    collection: "articles",
    depth: 1,
    where: {
      category: {
        equals: category
      }
    },
    sort: '-createdAt',
  })

  return results;
})

export const getCategorizedArticles = cache(async (category: string) => {
  const articles = await getArticles(category);

  if (!articles) {
    return null;
  }

  const { docs } = articles;

  const scopes = category === "news" ? ["University", "Local", "National"] : [...new Set(docs.map((doc) => doc.scope))];

  const categorizedArticles = scopes.map((scope) => {
    return {
      "scope": scope.charAt(0).toUpperCase() + scope.slice(1),
      articles: docs.filter((doc) => doc.scope.toLowerCase() === scope.toLowerCase()).slice(0, 3),
    }
  })

  return categorizedArticles;
})