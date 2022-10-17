import { socialLinks } from "@src/data/social-links";
import { GetStaticPaths, GetStaticProps } from "next";

const LinkPage = () => {
  return null;
};

export default LinkPage;

export const getStaticPaths: GetStaticPaths = () => {
  const paths = socialLinks.map((link) => ({
    params: { link: link.id },
  }));

  return {
    paths,
    fallback: false,
  };
};

export const getStaticProps: GetStaticProps = ({ params }) => {
  if (!params) {
    return {
      notFound: true,
    };
  }
  const linkId = params["link"];
  if (typeof linkId !== "string") {
    return {
      notFound: true,
    };
  }

  const link = socialLinks.find((item) => item.id === linkId);

  if (!link) {
    return {
      notFound: true,
    };
  }

  return {
    redirect: {
      destination: link.url,
      permanent: true,
    },
  };
};
