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
      <a className="group block py-1 xl:py-0" target={"_blank"}>
        <div
          className={clsx(
            "flex h-12 w-12 items-center justify-center rounded-full group-hover:bg-gray-100 dark:group-hover:bg-gray-800 xl:h-10 xl:w-fit xl:px-3",
            "group-hover:text-gray-900 dark:group-hover:text-gray-50"
          )}
        >
          <span className="text-2xl">{icon}</span>
          <div className="hidden flex-1 xl:flex">
            <span className="flex-1 truncate px-4 text-lg">{label}</span>
          </div>
        </div>
      </a>
    </Link>
  );
};

export default SidebarSocialLink;
