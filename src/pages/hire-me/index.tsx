import BaseLayout from "@src/components/layouts/base-layout";
import { CustomNextPage } from "@src/types/next";

const HireMe: CustomNextPage = () => {
  return <div>HideMe</div>;
};

HireMe.getLayout = (page) => <BaseLayout>{page}</BaseLayout>;

export default HireMe;
