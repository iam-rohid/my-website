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
import { format } from "date-fns";
import { GetStaticPaths, GetStaticProps } from "next";
import Head from "next/head";
import Link from "next/link";
import Image from "next/future/image";

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
      <main className="flex-1 px-4 lg:px-8 py-8 lg:py-16 space-y-8 overflow-hidden border-r border-gray-100 dark:border-gray-800 transition-[border]">
        <header>
          <h1 className="text-3xl lg:text-4xl font-bold mb-4">
            {category.title}
          </h1>
          <div className="flex gap-4 flex-wrap text-gray-500 dark:text-gray-400 mt-4 text-lg">
            <p>{posts.length} Posts</p>
          </div>
        </header>
        <div className="grid md:grid-cols-2 gap-4 lg:gap-8">
          {posts.map((item) => (
            <article key={item._id}>
              <Link href={`/blog/${item.slug}`}>
                <a className="mb-4 block">
                  <Image
                    src={item.coverImage.url}
                    alt={item.coverImage.alt}
                    width={item.coverImage.width}
                    height={item.coverImage.height}
                    className="rounded-lg aspect-video object-cover"
                  />
                </a>
              </Link>
              <Link href={`/blog/${item.slug}`}>
                <a>
                  <h3 className="text-xl font-medium mb-2">{item.title}</h3>
                </a>
              </Link>

              <p className="line-clamp-2 text-gray-600 dark:text-gray-300 my-2">
                {item.excerpt}
              </p>
              <div className="flex items-center gap-2 flex-wrap text-gray-500 dark:text-gray-400">
                <p>{format(new Date(item.date), "MMM dd, yyyy")}</p>
                <p>{item.readingTime}</p>
                {item.isDraft && <p>Draft</p>}
              </div>
            </article>
          ))}
        </div>
      </main>
      <aside className="w-64 hidden lg:block px-4 py-8">
        <CategoriesList categories={categories} />
      </aside>
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
