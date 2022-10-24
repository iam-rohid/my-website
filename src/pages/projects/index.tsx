import BaseLayout from "@src/components/layouts/base-layout";
import Image from "next/future/image";
import { CustomNextPage } from "@src/types/next";
import { allProjects, type Project } from "contentlayer/generated";
import Head from "next/head";
import Link from "next/link";
import { GetStaticProps } from "next";
import { compareDesc } from "date-fns";
import { MdOpenInNew } from "react-icons/md";
import PageHeader from "@src/components/common/page-header";

interface Props {
  projects: Project[];
}

const Projects: CustomNextPage<Props> = (props) => {
  const { projects } = props;
  return (
    <main className="flex flex-1">
      <Head>
        <title>Projects - Rohid</title>
        <meta name="description" content={"All Projects"} />
      </Head>

      <div className="flex-1 space-y-12 py-8 px-4 lg:space-y-16 lg:py-16 lg:px-8">
        <PageHeader
          title="Projects"
          subtitle={`${projects.length} Project${
            projects.length > 1 ? "s" : ""
          }`}
        />

        <div className="grid gap-8 md:grid-cols-2">
          {projects.map((item) => (
            <article key={item._id} className="text-center">
              <Link href={`/projects/${item.slug}`}>
                <a className="mx-auto mb-6 block">
                  <Image
                    src={item.icon.url}
                    alt={item.icon.alt}
                    width={item.icon.width}
                    height={item.icon.height}
                    className="mx-auto aspect-square w-32 rounded-3xl object-cover shadow-xl"
                  />
                </a>
              </Link>
              <Link href={`/projects/${item.slug}`}>
                <a className="hover:text-primary-500 dark:hover:text-primary-400">
                  <h3 className="mb-2 text-xl font-medium">{item.title}</h3>
                </a>
              </Link>

              <p className="my-2 text-gray-600 line-clamp-3 dark:text-gray-300">
                {item.excerpt}
              </p>
              <div className="flex flex-wrap justify-center gap-4">
                {item.availableOn.web && (
                  <Link href={item.availableOn.web.url}>
                    <a
                      target="_blank"
                      className="flex items-center gap-1 hover:text-primary-500 dark:hover:text-primary-400"
                    >
                      Web
                      <MdOpenInNew className="inline" />
                    </a>
                  </Link>
                )}
                {item.availableOn.ios && (
                  <Link href={item.availableOn.ios.url}>
                    <a
                      target="_blank"
                      className="flex items-center gap-1 hover:text-primary-500 dark:hover:text-primary-400"
                    >
                      iOS
                      <MdOpenInNew className="inline" />
                    </a>
                  </Link>
                )}
                {item.availableOn.android && (
                  <Link href={item.availableOn.android.url}>
                    <a
                      target="_blank"
                      className="flex items-center gap-1 hover:text-primary-500 dark:hover:text-primary-400"
                    >
                      Android
                      <MdOpenInNew className="inline" />
                    </a>
                  </Link>
                )}
                {item.availableOn.macOs && (
                  <Link href={item.availableOn.macOs.url}>
                    <a
                      target="_blank"
                      className="flex items-center gap-1 hover:text-primary-500 dark:hover:text-primary-400"
                    >
                      Mac
                      <MdOpenInNew className="inline" />
                    </a>
                  </Link>
                )}
                {item.availableOn.windows && (
                  <Link href={item.availableOn.windows.url}>
                    <a
                      target="_blank"
                      className="flex items-center gap-1 hover:text-primary-500 dark:hover:text-primary-400"
                    >
                      Windows
                      <MdOpenInNew className="inline" />
                    </a>
                  </Link>
                )}
                {item.availableOn.linux && (
                  <Link href={item.availableOn.linux.url}>
                    <a
                      target="_blank"
                      className="flex items-center gap-1 hover:text-primary-500 dark:hover:text-primary-400"
                    >
                      Linux
                      <MdOpenInNew className="inline" />
                    </a>
                  </Link>
                )}
                {item.repoUrl && (
                  <Link href={item.repoUrl}>
                    <a
                      target="_blank"
                      className="flex items-center gap-1 hover:text-primary-500 dark:hover:text-primary-400"
                    >
                      Source
                      <MdOpenInNew className="inline" />
                    </a>
                  </Link>
                )}
              </div>
            </article>
          ))}
        </div>
      </div>

      <aside className="w-64 border-l  border-gray-100 px-4 py-8 dark:border-gray-800 max-lg:hidden"></aside>
    </main>
  );
};

Projects.getLayout = (page) => <BaseLayout>{page}</BaseLayout>;

export default Projects;

export const getStaticProps: GetStaticProps<Props> = async () => {
  const projects = allProjects.sort((a, b) =>
    compareDesc(new Date(a.releaseDate), new Date(b.releaseDate))
  );
  return {
    props: {
      projects,
    },
  };
};
