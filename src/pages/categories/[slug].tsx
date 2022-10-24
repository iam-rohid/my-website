import CategoriesList from "@src/components/common/categories-list";
import BaseLayout from "@src/components/layouts/base-layout";
import { CustomNextPage } from "@src/types/next";
import { postsFilter } from "@src/utils/postsFilter";
import {
  allCategories,
  allPosts,
  Category,
  Post,
} from "contentlayer/generated";
import { GetStaticPaths, GetStaticProps } from "next";
import Head from "next/head";
import Link from "next/link";
import Image from "next/future/image";
import PostRow from "@src/components/common/post-row";
import PageHeader from "@src/components/common/page-header";

interface Props {
  category: Category;
  categories: Category[];
  posts: Post[];
}

const Category: CustomNextPage<Props> = (props) => {
  const { categories, category, posts } = props;
  return (
    <>
      <Head>
        <title>{category.title} - Rohid</title>
        <meta name="description" content={"All posts"} />
      </Head>
      <main className="flex flex-1">
        <div className="flex-1 space-y-12 py-8 px-4 lg:space-y-16 lg:py-16 lg:px-8">
          <PageHeader
            title={category.title}
            subtitle={`${posts.length} Post${posts.length > 1 ? "s" : ""}`}
          />

          <div className="space-y-16">
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
              />
            ))}
          </div>
        </div>
        <aside className="w-64 border-l  border-gray-100 px-4 py-8 dark:border-gray-800 max-lg:hidden">
          <CategoriesList categories={categories} />
        </aside>
      </main>
    </>
  );
};

Category.getLayout = (page) => <BaseLayout>{page}</BaseLayout>;

export default Category;

export const getStaticPaths: GetStaticPaths = () => {
  const slugs = allCategories.map((item) => item.slug);
  return {
    paths: slugs.map((slug) => ({ params: { slug } })),
    fallback: false,
  };
};

export const getStaticProps: GetStaticProps<Props> = async ({ params }) => {
  if (!params) return { notFound: true };
  const categories = allCategories.sort((a, b) =>
    a.title.localeCompare(b.title)
  );

  const slug = params["slug"];
  const category = categories.find((item) => item.slug === slug);
  if (!category) return { notFound: true };

  const posts = allPosts
    .filter(postsFilter)
    .filter((item) => item.category === slug);

  return {
    props: {
      categories,
      category,
      posts,
    },
  };
};
