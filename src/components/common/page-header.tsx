import { FC, PropsWithChildren, ReactNode } from "react";

interface PageHeaderProps extends PropsWithChildren {
  title: ReactNode;
  subtitle: ReactNode;
}

const PageHeader: FC<PageHeaderProps> = (props) => {
  const { children, title, subtitle } = props;
  return (
    <header>
      <h1 className="mb-4 text-2xl font-bold text-gray-900 dark:text-gray-50 md:text-3xl lg:text-4xl">
        {title}
      </h1>
      {subtitle && (
        <div className="my-4 flex flex-wrap gap-4 lg:text-lg">{subtitle}</div>
      )}
      {children}
    </header>
  );
};

export default PageHeader;
