import BaseLayout from "@src/components/layouts/base-layout";
import type { CustomNextPage } from "@src/types/next";
import type { GetStaticProps } from "next";
import { allPages, type Page } from "contentlayer/generated";
import MDXContent from "@src/components/common/mdx-content";
import Head from "next/head";

interface Props {
  page: Page;
}

const Home: CustomNextPage<Props> = ({ page }) => {
  return (
    <>
      <Head>
        <title>{page.title}</title>
      </Head>
      <main className="flex-1 space-y-8 overflow-hidden border-x border-gray-100 px-4 py-8 dark:border-gray-800 lg:space-y-16 lg:px-8 lg:py-16">
        <article className="prose max-w-none dark:prose-invert">
          <MDXContent code={page.body.code} />
        </article>
      </main>
      <aside className="hidden w-72 lg:block"></aside>
    </>
  );
};

Home.getLayout = (page) => <BaseLayout>{page}</BaseLayout>;

export default Home;

export const getStaticProps: GetStaticProps = () => {
  const homePage = allPages.find((page) => page.slug === "home");

  if (!homePage)
    return {
      notFound: true,
    };

  return {
    props: {
      page: homePage,
    },
  };
};
