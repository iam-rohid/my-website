import BaseLayout from "@src/components/layouts/base-layout";
import { CustomNextPage } from "@src/types/next";

const HireMe: CustomNextPage = () => {
  return (
    <>
      <main className="flex-1 border-x border-gray-100 dark:border-gray-800"></main>
    </>
  );
};

HireMe.getLayout = (page) => <BaseLayout>{page}</BaseLayout>;

export default HireMe;
