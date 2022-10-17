import { Post } from "contentlayer/generated";
import { isBefore } from "date-fns";

const isProd = process.env.NODE_ENV === "production";

export const postsFilter = (post: Post): Boolean => {
  return (
    !isProd || (!post.isDraft && isBefore(new Date(post.date), new Date()))
  );
};
