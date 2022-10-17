import clsx from "clsx";
import Link from "next/link";
import { useRouter } from "next/router";
import { ReactNode, FC, useMemo } from "react";

export interface SidebarLinkProps {
  label: string;
  href: string;
  icon: ReactNode;
  activeIcon: ReactNode;
}

const SidebarLink: FC<SidebarLinkProps> = ({
  label,
  href,
  icon,
  activeIcon,
}) => {
  const router = useRouter();
  const isActive = useMemo(() => router.asPath === href, [href, router]);
  return (
    <Link href={href}>
      <a className="group py-1 xl:py-0 block">
        <div
          className={clsx(
            "flex items-center rounded-full w-12 h-12 justify-center xl:w-fit xl:px-3 group-hover:bg-gray-100 dark:group-hover:bg-gray-800 transition-[color,background-color]",
            isActive
              ? "text-gray-900 dark:text-gray-50 font-medium"
              : "text-gray-600 dark:text-gray-300 group-hover:text-gray-900 dark:group-hover:text-gray-50"
          )}
        >
          <span className="text-3xl">{isActive ? activeIcon : icon}</span>
          <div className="flex-1 hidden xl:flex">
            <span className="px-4 text-xl flex-1 truncate">{label}</span>
          </div>
        </div>
      </a>
    </Link>
  );
};
export default SidebarLink;
