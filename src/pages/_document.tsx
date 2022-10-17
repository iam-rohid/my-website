import { Head, Main, NextScript } from "next/document";

const MyDocument = () => {
  return (
    <html lang="en">
      <Head>
        <script
          dangerouslySetInnerHTML={{
            __html: `
          const cs = localStorage.getItem("color-scheme");
          if(cs === "dark" || (cs === "auto" && window.matchMedia &&
          window.matchMedia("(prefers-color-scheme: dark)").matches)) {
            document.documentElement.classList.add("dark")
          }
        `,
          }}
        ></script>
      </Head>
      <body className="bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-50 transition-[color,background-color]">
        <Main />
        <NextScript />
      </body>
    </html>
  );
};

export default MyDocument;
