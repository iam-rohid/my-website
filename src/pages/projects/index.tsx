import BaseLayout from "@src/components/layouts/base-layout";
import Image from "next/future/image";
import { CustomNextPage } from "@src/types/next";
import { allProjects, type Project } from "contentlayer/generated";
import Head from "next/head";
import Link from "next/link";
import { GetStaticProps } from "next";
import { compareDesc } from "date-fns";
import { MdOpenInNew } from "react-icons/md";

interface Props {
  projects: Project[];
}

const Projects: CustomNextPage<Props> = (props) => {
  const { projects } = props;
  return (
    <>
      <Head>
        <title>Projects - Rohid</title>
        <meta name="description" content={"All posts"} />
      </Head>
      <main className="flex-1 px-4 lg:px-8 py-8 lg:py-16 space-y-8 overflow-hidden border-x border-gray-100 dark:border-gray-800 transition-[border]">
        <header>
          <h1 className="text-3xl lg:text-4xl font-bold mb-4">Projects</h1>
          <div className="flex gap-4 flex-wrap text-gray-500 dark:text-gray-400 mt-4 text-lg">
            <p>
              {projects.length} Project{projects.length > 1 ? "s" : ""}
            </p>
          </div>
        </header>
        <div className="grid md:grid-cols-2 gap-8">
          {projects.map((item) => (
            <article key={item._id} className="text-center">
              <Link href={`/projects/${item.slug}`}>
                <a className="mb-6 block mx-auto">
                  <Image
                    src={item.icon.url}
                    alt={item.icon.alt}
                    width={item.icon.width}
                    height={item.icon.height}
                    className="rounded-3xl aspect-square w-32 object-cover mx-auto shadow-xl"
                  />
                </a>
              </Link>
              <Link href={`/projects/${item.slug}`}>
                <a className="hover:text-primary-500 dark:hover:text-primary-400 transition-[color]">
                  <h3 className="text-xl font-medium mb-2">{item.title}</h3>
                </a>
              </Link>

              <p className="line-clamp-3 text-gray-600 dark:text-gray-300 my-2">
                {item.excerpt}
              </p>
              <div className="flex justify-center gap-4 flex-wrap">
                {item.availableOn.web && (
                  <Link href={item.availableOn.web.url}>
                    <a
                      target="_blank"
                      className="flex items-center gap-1 hover:text-primary-500 dark:hover:text-primary-400 transition-[color]"
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
                      className="flex items-center gap-1 hover:text-primary-500 dark:hover:text-primary-400 transition-[color]"
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
                      className="flex items-center gap-1 hover:text-primary-500 dark:hover:text-primary-400 transition-[color]"
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
                      className="flex items-center gap-1 hover:text-primary-500 dark:hover:text-primary-400 transition-[color]"
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
                      className="flex items-center gap-1 hover:text-primary-500 dark:hover:text-primary-400 transition-[color]"
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
                      className="flex items-center gap-1 hover:text-primary-500 dark:hover:text-primary-400 transition-[color]"
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
                      className="flex items-center gap-1 hover:text-primary-500 dark:hover:text-primary-400 transition-[color]"
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
      </main>
      <aside className="w-64 hidden lg:block px-4 py-8"></aside>
    </>
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
