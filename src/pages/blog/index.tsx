import BaseLayout from "@src/components/layouts/base-layout";
import { CustomNextPage } from "@src/types/next";

const Blog: CustomNextPage = () => {
  return <div>In development</div>;
};

Blog.getLayout = (page) => <BaseLayout>{page}</BaseLayout>;
export default Blog;
