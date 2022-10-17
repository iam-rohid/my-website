import { defineDocumentType } from "contentlayer/source-files";

export const Page = defineDocumentType(() => ({
  name: "Page",
  contentType: "mdx",
  filePathPattern: "./pages/*.mdx",
  fields: {
    title: {
      type: "string",
      required: true,
    },
    draft: {
      type: "boolean",
    },
  },
  computedFields: {
    slug: {
      type: "string",
      resolve: (doc) => {
        const pathBlocks = doc._raw.flattenedPath.split("/");
        return pathBlocks[pathBlocks.length - 1];
      },
    },
  },
}));
