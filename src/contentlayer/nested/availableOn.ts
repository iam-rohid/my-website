import { defineNestedType } from "contentlayer/source-files";

export const Platform = defineNestedType(() => ({
  name: "Platform",
  fields: {
    url: { type: "string", required: true },
  },
}));

export const AvailableOn = defineNestedType(() => ({
  name: "AvailableOn",
  fields: {
    web: { type: "nested", of: Platform },
    ios: { type: "nested", of: Platform },
    android: { type: "nested", of: Platform },
    macOs: { type: "nested", of: Platform },
    windows: { type: "nested", of: Platform },
    linux: { type: "nested", of: Platform },
  },
}));
