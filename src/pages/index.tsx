import BaseLayout from "@src/components/layouts/base-layout";
import type { CustomNextPage } from "@src/types/next";

const HomePage: CustomNextPage = () => {
  return (
    <main className="w-full px-4 lg:px-8 my-8 lg:my-16 space-y-8 lg:pr-56 xl:pr-64">
      <div className="relative w-full aspect-video rounded-xl bg-gray-100 dark:bg-gray-800 transition-[background-color]"></div>
      <article className="prose dark:prose-invert max-w-none">
        <h1>Hi! 👋, I&apos;m Rohid</h1>
        <p>
          Lorem ipsum, dolor sit amet consectetur adipisicing elit. Expedita,
          cum. Reprehenderit repellendus et magnam.
        </p>
        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Veritatis
          laborum minima dolorum consequatur animi non iusto incidunt et
          voluptas fuga, eos distinctio excepturi consequuntur dolorem dolor
          nisi soluta autem est!
        </p>
      </article>
    </main>
  );
};

HomePage.getLayout = (page) => <BaseLayout>{page}</BaseLayout>;

export default HomePage;
