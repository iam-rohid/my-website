import { defineDocumentType } from "contentlayer/source-files";
import { AvailableOn } from "../nested/availableOn";
import { Image } from "../nested/image";

export const Project = defineDocumentType(() => ({
  name: "Project",
  contentType: "mdx",
  filePathPattern: `projects/**/*.mdx`,
  fields: {
    title: { type: "string", required: true },
    name: { type: "string", required: true },
    excerpt: { type: "string", required: true },
    availableOn: { type: "nested", of: AvailableOn, required: true },
    coverImage: { type: "nested", of: Image, required: true },
    icon: { type: "nested", of: Image, required: true },
    releaseDate: { type: "date", required: true },
    screenshots: {
      type: "list",
      of: Image,
      required: true,
    },
    repoUrl: { type: "string" },
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
