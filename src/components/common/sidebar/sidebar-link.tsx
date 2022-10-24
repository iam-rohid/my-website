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
      <a className="group block py-1 xl:py-0">
        <div
          className={clsx(
            "flex h-12 w-12 items-center justify-center rounded-full group-hover:bg-gray-100 dark:group-hover:bg-gray-800 xl:w-fit xl:px-3",
            isActive
              ? "font-medium text-gray-900 dark:text-gray-50"
              : "text-gray-600 group-hover:text-gray-900 dark:text-gray-300 dark:group-hover:text-gray-50"
          )}
        >
          <span className="text-3xl">{isActive ? activeIcon : icon}</span>
          <div className="hidden flex-1 xl:flex">
            <span className="flex-1 truncate px-4 text-xl">{label}</span>
          </div>
        </div>
      </a>
    </Link>
  );
};
export default SidebarLink;
