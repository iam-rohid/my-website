import { useMDXComponent } from "next-contentlayer/hooks";
import { FC } from "react";

import Image from "next/future/image";

const components = {
  // eslint-disable-next-line jsx-a11y/alt-text
  Image: (props: any) => <Image {...props} />,
};

interface Props {
  code: string;
  globals?: Record<string, unknown> | undefined;
}

const MDXContent: FC<Props> = ({ code, globals }) => {
  const Content = useMDXComponent(code, globals);
  return <Content components={components} />;
};

export default MDXContent;
