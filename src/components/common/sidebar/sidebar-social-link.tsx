import clsx from "clsx";
import Link from "next/link";
import { FC, ReactNode } from "react";

export interface SidebarSocialLinkProps {
  label: string;
  href: string;
  icon: ReactNode;
}

const SidebarSocialLink: FC<SidebarSocialLinkProps> = ({
  href,
  label,
  icon,
}) => {
  return (
    <Link href={href}>
      <a className="group py-1 xl:py-0 block">
        <div
          className={clsx(
            "flex items-center rounded-full w-12 h-12 xl:h-10 justify-center xl:w-fit xl:px-3 group-hover:bg-gray-100 dark:group-hover:bg-gray-800 transition-[color,background-color]",
            "text-gray-600 dark:text-gray-300 group-hover:text-gray-900 dark:group-hover:text-gray-50"
          )}
        >
          <span className="text-2xl">{icon}</span>
          <div className="flex-1 hidden xl:flex">
            <span className="px-4 text-lg flex-1 truncate">{label}</span>
          </div>
        </div>
      </a>
    </Link>
  );
};

export default SidebarSocialLink;
