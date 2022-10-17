import { defineDocumentType } from "contentlayer/source-files";

export const GlobalConfig = defineDocumentType(() => ({
  name: "GlobalConfig",
  filePathPattern: `configs/global.json`,
  contentType: "data",
  isSingleton: true,
  fields: {
    title: {
      type: "string",
      description: "Site default title",
      required: true,
    },
  },
}));
