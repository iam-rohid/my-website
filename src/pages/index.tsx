import BaseLayout from "@src/components/layouts/base-layout";
import type { CustomNextPage } from "@src/types/next";
import type { GetStaticProps } from "next";
import { allPages, type Page } from "contentlayer/generated";
import Image from "next/future/image";
import { useMDXComponent } from "next-contentlayer/hooks";
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
      <main className="flex-1 px-4 lg:px-8 py-8 lg:py-16 space-y-8 lg:space-y-16 overflow-hidden border-r border-gray-100 dark:border-gray-800 transition-[border]">
        <article className="prose dark:prose-invert max-w-none">
          <MDXContent code={page.body.code} />
        </article>
      </main>
      <aside className="w-72 hidden lg:block"></aside>
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
