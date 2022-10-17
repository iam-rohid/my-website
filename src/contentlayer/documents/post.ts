import { defineDocumentType } from "contentlayer/source-files";
import { Image } from "../nested/image";
import { SEO } from "../nested/seo";
import readingTime from "reading-time";

export const Post = defineDocumentType(() => ({
  name: "Post",
  filePathPattern: `posts/**/*.mdx`,
  contentType: "mdx",
  fields: {
    isDraft: { type: "boolean" },
    title: { type: "string", required: true },
    excerpt: { type: "string", required: true },
    coverImage: { type: "nested", of: Image, required: true },
    date: { type: "date", required: true },
    category: { type: "string" },
    tags: { type: "list", of: { type: "string" } },
    relatedPosts: { type: "list", of: { type: "string" } },
    seo: { type: "nested", of: SEO },
  },
  computedFields: {
    slug: {
      type: "string",
      resolve: (doc) => {
        const pathBlocks = doc._raw.flattenedPath.split("/");
        return pathBlocks[pathBlocks.length - 1];
      },
    },
    readingTime: {
      type: "string",
      resolve: (post) => {
        return readingTime(post.body.raw).text;
      },
    },
  },
}));
