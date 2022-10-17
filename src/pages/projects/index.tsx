import BaseLayout from "@src/components/layouts/base-layout";
import { CustomNextPage } from "@src/types/next";

const Projects: CustomNextPage = () => {
  return <div>Projects</div>;
};

Projects.getLayout = (page) => <BaseLayout>{page}</BaseLayout>;

export default Projects;
