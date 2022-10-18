import MDXContent from "@src/components/common/mdx-content";
import BaseLayout from "@src/components/layouts/base-layout";
import { CustomNextPage } from "@src/types/next";
import { allProjects, Project } from "contentlayer/generated";
import { format, isBefore } from "date-fns";
import { GetStaticPaths, GetStaticProps } from "next";
import Image from "next/future/image";
import Head from "next/head";
import Link from "next/link";
import { MdOpenInNew } from "react-icons/md";

interface Props {
  project: Project;
}

const Project: CustomNextPage<Props> = (props) => {
  const { project } = props;
  return (
    <>
      <Head>
        <title>{project.title}</title>
        <meta name="description" content={project.excerpt} />
      </Head>
      <main className="flex-1 border-x border-gray-100 dark:border-gray-800 transition-[border]">
        <header>
          <Image
            src={project.coverImage.url}
            alt={project.coverImage.alt}
            width={project.coverImage.width}
            height={project.coverImage.height}
            className="w-full aspect-[4/1] object-cover"
          />
          <div className="px-4 lg:px-8">
            <Image
              src={project.icon.url}
              alt={project.icon.alt}
              width={project.icon.width}
              height={project.icon.height}
              className="w-32 lg:w-40 aspect-square rounded-2xl lg:rounded-3xl object-cover -mt-8 lg:-mt-14 shadow-xl mb-8"
            />
            <h1 className="text-3xl lg:text-4xl font-bold mb-6">
              {project.title}
            </h1>
            <div className="text-gray-600 dark:text-gray-300">
              <p className="text-lg mb-1">
                Name: <b>{project.name}</b>
              </p>
              <p className="text-lg mb-1">
                Release Date:{" "}
                <b>
                  {isBefore(new Date(project.releaseDate), new Date())
                    ? format(new Date(project.releaseDate), "MMMM dd, yyyy")
                    : "Comming Soon"}
                </b>
              </p>
              <p className="text-lg mb-1">
                Available On:{" "}
                {project.availableOn.web && (
                  <Link href={project.availableOn.web.url}>
                    <a
                      target="_blank"
                      className="font-medium inline-flex items-center gap-1 hover:text-primary-500 dark:hover:text-primary-400 transition-[color]"
                    >
                      Web
                      <MdOpenInNew />
                    </a>
                  </Link>
                )}
                {project.availableOn.ios && (
                  <Link href={project.availableOn.ios.url}>
                    <a
                      target="_blank"
                      className="font-medium inline-flex items-center gap-1 hover:text-primary-500 dark:hover:text-primary-400 transition-[color]"
                    >
                      iOS
                      <MdOpenInNew />
                    </a>
                  </Link>
                )}
                {project.availableOn.android && (
                  <Link href={project.availableOn.android.url}>
                    <a
                      target="_blank"
                      className="font-medium inline-flex items-center gap-1 hover:text-primary-500 dark:hover:text-primary-400 transition-[color]"
                    >
                      Android
                      <MdOpenInNew />
                    </a>
                  </Link>
                )}
                {project.availableOn.macOs && (
                  <Link href={project.availableOn.macOs.url}>
                    <a
                      target="_blank"
                      className="font-medium inline-flex items-center gap-1 hover:text-primary-500 dark:hover:text-primary-400 transition-[color]"
                    >
                      Mac
                      <MdOpenInNew />
                    </a>
                  </Link>
                )}
                {project.availableOn.windows && (
                  <Link href={project.availableOn.windows.url}>
                    <a
                      target="_blank"
                      className="font-medium inline-flex items-center gap-1 hover:text-primary-500 dark:hover:text-primary-400 transition-[color]"
                    >
                      Windows
                      <MdOpenInNew />
                    </a>
                  </Link>
                )}
                {project.availableOn.linux && (
                  <Link href={project.availableOn.linux.url}>
                    <a
                      target="_blank"
                      className="font-medium inline-flex items-center gap-1 hover:text-primary-500 dark:hover:text-primary-400 transition-[color]"
                    >
                      Linux
                      <MdOpenInNew />
                    </a>
                  </Link>
                )}
              </p>
              {project.repoUrl && (
                <Link href={project.repoUrl}>
                  <a
                    target={"_blank"}
                    className="inline-flex font-medium items-center gap-1 hover:text-primary-500 dark:hover:text-primary-400 transition-[color] text-lg"
                  >
                    Source Code
                    <MdOpenInNew />
                  </a>
                </Link>
              )}
            </div>
          </div>
        </header>
        <article className="prose dark:prose-invert lg:prose-lg max-w-none px-4 lg:px-8 py-16">
          <MDXContent code={project.body.code} />
        </article>
      </main>
      <aside className="w-64 hidden lg:block px-4 py-8"></aside>
    </>
  );
};

Project.getLayout = (page) => <BaseLayout>{page}</BaseLayout>;

export default Project;

export const getStaticPaths: GetStaticPaths = () => {
  const slugs = allProjects.map((item) => item.slug);
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
  if (!params) return { notFound: true };

  const slug = params["slug"];
  const project = allProjects.find((item) => item.slug === slug);

  if (!project) return { notFound: true };
  return {
    props: {
      project,
    },
  };
};
