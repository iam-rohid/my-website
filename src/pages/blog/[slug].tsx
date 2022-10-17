import { GetStaticPaths, GetStaticProps } from "next";
import {
  allPosts,
  allCategories,
  Category,
  Post,
} from "contentlayer/generated";
import { CustomNextPage } from "@src/types/next";
import BaseLayout from "@src/components/layouts/base-layout";
import { format } from "date-fns";
import { useMDXComponent } from "next-contentlayer/hooks";
import Head from "next/head";
import Link from "next/link";
import { postsFilter } from "@src/utils/postsFilter";
import Image from "next/future/image";

type Props = {
  post: Post;
  category: Category | null;
};

const components = {
  // eslint-disable-next-line jsx-a11y/alt-text
  Image: (props: any) => <Image {...props} />,
};

const BlogPost: CustomNextPage<Props> = (props) => {
  const { post, category } = props;
  const MDXContent = useMDXComponent(post.body.code);

  return (
    <>
      <Head>
        <title>{post.title}</title>
        <meta name="description" content={post.excerpt} />
      </Head>
      <main className="flex-1 px-4 lg:px-8 py-8 lg:py-16 space-y-8 overflow-hidden border-r border-gray-100 dark:border-gray-800 transition-[border]">
        <header>
          <h1 className="text-3xl lg:text-4xl font-bold">{post.title}</h1>
          <div className="flex gap-4 flex-wrap text-gray-500 dark:text-gray-400 mt-4 text-lg mb-6">
            <p>{format(new Date(post.date), "MMMM dd, yyyy")}</p>
            <p>{post.readingTime}</p>
            {!!category && (
              <Link href={`/categories/${category.slug}`}>
                <a className="no-underline">{category.title}</a>
              </Link>
            )}
          </div>
          <Image
            src={post.coverImage.url}
            alt={post.coverImage.alt}
            width={post.coverImage.width}
            height={post.coverImage.height}
            className="rounded-md md:rounded-xl aspect-video object-cover"
          />
        </header>
        <article className="prose dark:prose-invert lg:prose-lg max-w-none">
          <div className="">
            <MDXContent components={components} />
          </div>
        </article>
      </main>
      <aside className="w-64 hidden lg:block"></aside>
    </>
  );
};

BlogPost.getLayout = (page) => <BaseLayout>{page}</BaseLayout>;

export default BlogPost;

export const getStaticPaths: GetStaticPaths = async () => {
  const slugs = allPosts.filter(postsFilter).map((post) => post.slug);

  return {
    paths: slugs.map((slug) => ({
      params: {
        slug,
      },
    })),
    fallback: false,
  };
};

export const getStaticProps: GetStaticProps<Props> = async ({ params }) => {
  if (!params) {
    return {
      notFound: true,
    };
  }

  const slug = params["slug"];
  const post = allPosts.find((item) => item.slug === slug);

  if (!post) {
    return {
      notFound: true,
    };
  }

  const category =
    allCategories.find((item) => item.slug === post.category) || null;

  return {
    props: {
      post,
      category,
    },
  };
};
