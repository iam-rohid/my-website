import { Head, Html, Main, NextScript } from "next/document";

const MyDocument = () => {
  return (
    <Html lang="en">
      <Head>
        <script
          dangerouslySetInnerHTML={{
            __html: `
          const cs = localStorage.getItem("color-scheme");
          if(cs === "dark" || (cs !== "light" && window.matchMedia &&
          window.matchMedia("(prefers-color-scheme: dark)").matches)) {
            document.documentElement.classList.add("dark")
          }
        `,
          }}
        ></script>
      </Head>
      <body className="bg-white text-gray-600 dark:bg-gray-900 dark:text-gray-300">
        <Main />
        <NextScript />
      </body>
    </Html>
  );
};

export default MyDocument;
