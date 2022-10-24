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
      <main className="flex flex-1">
        <div className="flex-1 space-y-12 lg:space-y-16">
          <header>
            <Image
              src={project.coverImage.url}
              alt={project.coverImage.alt}
              width={project.coverImage.width}
              height={project.coverImage.height}
              className="aspect-[4/1] w-full object-cover"
            />
            <div className="px-4 lg:px-8">
              <Image
                src={project.icon.url}
                alt={project.icon.alt}
                width={project.icon.width}
                height={project.icon.height}
                className="-mt-8 mb-8 aspect-square w-32 rounded-2xl object-cover shadow-xl lg:-mt-14 lg:w-40 lg:rounded-3xl"
              />
              <h1 className="mb-6 text-3xl font-bold lg:text-4xl">
                {project.title}
              </h1>
              <div className="text-gray-600 dark:text-gray-300">
                <p className="mb-1 text-lg">
                  Name: <b>{project.name}</b>
                </p>
                <p className="mb-1 text-lg">
                  Release Date:{" "}
                  <b>
                    {isBefore(new Date(project.releaseDate), new Date())
                      ? format(new Date(project.releaseDate), "MMMM dd, yyyy")
                      : "Comming Soon"}
                  </b>
                </p>
                <p className="mb-1 text-lg">
                  Available On:{" "}
                  {project.availableOn.web && (
                    <Link href={project.availableOn.web.url}>
                      <a
                        target="_blank"
                        className="inline-flex items-center gap-1 font-medium hover:text-primary-500 dark:hover:text-primary-400"
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
                        className="inline-flex items-center gap-1 font-medium hover:text-primary-500 dark:hover:text-primary-400"
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
                        className="inline-flex items-center gap-1 font-medium hover:text-primary-500 dark:hover:text-primary-400"
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
                        className="inline-flex items-center gap-1 font-medium hover:text-primary-500 dark:hover:text-primary-400"
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
                        className="inline-flex items-center gap-1 font-medium hover:text-primary-500 dark:hover:text-primary-400"
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
                        className="inline-flex items-center gap-1 font-medium hover:text-primary-500 dark:hover:text-primary-400"
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
                      className="inline-flex items-center gap-1 text-lg font-medium hover:text-primary-500 dark:hover:text-primary-400"
                    >
                      Source Code
                      <MdOpenInNew />
                    </a>
                  </Link>
                )}
              </div>
            </div>
          </header>

          <article className="prose max-w-none px-4 py-16 dark:prose-invert lg:prose-lg lg:px-8">
            <MDXContent code={project.body.code} />
          </article>
        </div>
        <aside className="w-64 border-l  border-gray-100 px-4 py-8 dark:border-gray-800 max-lg:hidden"></aside>
      </main>
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
