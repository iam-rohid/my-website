import { makeSource } from "contentlayer/source-files";
import rehypeHighlight from "rehype-highlight";
import * as documentTypes from "./src/contentlayer";

export default makeSource({
  contentDirPath: "content",
  documentTypes,
  onExtraFieldData: "ignore",
  onUnknownDocuments: "skip-ignore",
  mdx: {
    rehypePlugins: [rehypeHighlight],
    remarkPlugins: [],
  },
});
