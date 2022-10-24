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
import PageHeader from "@src/components/common/page-header";

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
      <main className="flex flex-1 overflow-hidden">
        <div className="flex-1 space-y-12 overflow-hidden py-8 px-4 lg:space-y-16 lg:py-16 lg:px-8">
          <PageHeader
            title={post.title}
            subtitle={
              <>
                <p>{format(new Date(post.date), "MMMM dd, yyyy")}</p>
                <p>{post.readingTime}</p>
                {!!category && (
                  <Link href={`/categories/${category.slug}`}>
                    <a className="hover:text-gray-900 dark:hover:text-gray-50">
                      {category.title}
                    </a>
                  </Link>
                )}
              </>
            }
          >
            <Image
              src={post.coverImage.url}
              alt={post.coverImage.alt}
              width={post.coverImage.width}
              height={post.coverImage.height}
              className="mt-8 aspect-video rounded-md object-cover md:rounded-xl"
            />
          </PageHeader>

          <article className="prose max-w-none dark:prose-invert lg:prose-lg">
            <MDXContent components={components} />
          </article>
        </div>
        <aside className="w-64 border-l  border-gray-100 px-4 py-8 dark:border-gray-800 max-lg:hidden"></aside>
      </main>
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
