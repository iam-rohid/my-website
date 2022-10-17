import { defineDocumentType } from "contentlayer/source-files";

export const Category = defineDocumentType(() => ({
  name: "Category",
  contentType: "mdx",
  filePathPattern: "./categories/*.mdx",
  fields: {
    title: {
      type: "string",
      required: true,
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
