import CategoriesList from "@src/components/common/categories-list";
import PageHeader from "@src/components/common/page-header";
import PostRow from "@src/components/common/post-row";
import BaseLayout from "@src/components/layouts/base-layout";
import { CustomNextPage } from "@src/types/next";
import { postsFilter } from "@src/utils/postsFilter";
import {
  allCategories,
  allPosts,
  Category,
  Post,
} from "contentlayer/generated";
import { compareDesc } from "date-fns";
import { GetStaticProps } from "next";
import Head from "next/head";
import { FC } from "react";

interface Props {
  posts: (Post & {
    _category: Category | null;
  })[];
  categories: Category[];
}

const Blog: CustomNextPage<Props> = (props) => {
  const { categories, posts } = props;
  return (
    <main className="flex flex-1">
      <Head>
        <title>Blog - Rohid</title>
        <meta name="description" content={"All posts"} />
      </Head>

      <div className="flex-1 space-y-12 py-8 px-4 lg:space-y-16 lg:py-16 lg:px-8">
        <PageHeader
          title="Blog"
          subtitle={`${posts.length} Post${posts.length > 1 ? "s" : ""}`}
        />

        <div className="space-y-12 lg:space-y-16">
          {posts.map((item) => (
            <PostRow
              key={item._id}
              publishedAt={new Date(item.date)}
              title={item.title}
              subtitle={item.excerpt}
              slug={item.slug}
              isDraft={item.isDraft}
              readingTime={item.readingTime}
              thumbnail={{
                src: item.coverImage.url,
                alt: item.coverImage.alt,
                width: item.coverImage.width,
                height: item.coverImage.height,
              }}
              category={
                item._category
                  ? {
                      name: item._category.title,
                      url: `/categories/${item._category.slug}`,
                    }
                  : undefined
              }
            />
          ))}
        </div>
      </div>

      <LocalSidebar categories={categories} />
    </main>
  );
};

Blog.getLayout = (page) => <BaseLayout>{page}</BaseLayout>;
export default Blog;

const LocalSidebar: FC<{
  categories: Category[];
}> = ({ categories }) => {
  return (
    <aside className="w-64 border-l  border-gray-100 px-4 py-8 dark:border-gray-800 max-lg:hidden">
      <CategoriesList categories={categories} />
    </aside>
  );
};

export const getStaticProps: GetStaticProps<Props> = async () => {
  const categories = allCategories.sort((a, b) =>
    a.title.localeCompare(b.title)
  );
  const posts = allPosts
    .filter(postsFilter)
    .sort((a, b) => compareDesc(new Date(a.date), new Date(b.date)))
    .map((item) => ({
      ...item,
      _category:
        categories.find((category) => category.slug === item.category) || null,
    }));
  return {
    props: {
      posts,
      categories,
    },
  };
};
