import BaseLayout from "@src/components/layouts/base-layout";
import { CustomNextPage } from "@src/types/next";
import { allProjects, type Project } from "contentlayer/generated";
import Head from "next/head";
import { GetStaticProps } from "next";
import { compareDesc } from "date-fns";
import PageHeader from "@src/components/common/page-header";
import ProjectCard from "@src/components/common/project-card";

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
            <ProjectCard project={item} key={item._id} />
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
