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
import { compareDesc, format, isAfter } from "date-fns";
import { GetStaticProps } from "next";
import Image from "next/future/image";
import Head from "next/head";
import Link from "next/link";

interface Props {
  posts: (Post & {
    _category: Category | null;
  })[];
  categories: Category[];
}

const Blog: CustomNextPage<Props> = (props) => {
  const { categories, posts } = props;
  return (
    <>
      <Head>
        <title>Blog - Rohid</title>
        <meta name="description" content={"All posts"} />
      </Head>
      <main className="flex-1 px-4 lg:px-8 py-8 lg:py-16 space-y-8 overflow-hidden border-x border-gray-100 dark:border-gray-800 transition-[border]">
        <header>
          <h1 className="text-3xl lg:text-4xl font-bold mb-4">Blog</h1>
          <div className="flex gap-4 flex-wrap text-gray-500 dark:text-gray-400 mt-4 text-lg">
            <p>
              {posts.length} Post{posts.length > 1 ? "s" : ""}
            </p>
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
                <a className="hover:text-primary-500 dark:hover:text-primary-400 transition-[color]">
                  <h3 className="text-xl font-medium mb-2">{item.title}</h3>
                </a>
              </Link>

              <p className="line-clamp-2 text-gray-600 dark:text-gray-300 my-2">
                {item.excerpt}
              </p>
              <div className="flex items-center gap-2 flex-wrap text-gray-500 dark:text-gray-400">
                <p>{item.readingTime}</p>
                {item._category && (
                  <Link href={`/categories/${item._category.slug}`}>
                    <a className="hover:text-primary-500 dark:hover:text-primary-400 transition-[color]">
                      {item._category.title}
                    </a>
                  </Link>
                )}
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

Blog.getLayout = (page) => <BaseLayout>{page}</BaseLayout>;
export default Blog;

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
