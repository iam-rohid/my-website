import Image from "next/image";
import Link from "next/link";
import {
  MdEmojiEmotions,
  MdFeed,
  MdGridView,
  MdHome,
  MdOutlineEmojiEmotions,
  MdOutlineFeed,
  MdOutlineGridView,
  MdOutlineHome,
} from "react-icons/md";
import SidebarLink from "./sidebar-link";
import ThemeSwitcher from "./theme-switcher";
import SidebarSocialLinks from "./sidebar-social-links";

const Sidebar = () => {
  return (
    <aside className="sticky top-0 left-0 flex h-screen w-16 flex-col overflow-y-auto border-r border-gray-100  dark:border-gray-800 xl:w-64">
      <div className="my-4 flex-1 xl:my-8">
        <div className="mb-6 flex-col px-2 xl:px-8">
          <Link href="/">
            <a className="relative mb-4 block h-12 w-12 overflow-hidden rounded-full xl:h-16 xl:w-16">
              <Image
                src="https://pbs.twimg.com/profile_images/1481868973537132544/0NSx-X8V_400x400.jpg"
                alt="Profile Pic"
                layout="fill"
                className="absolute inset-0 h-full w-full object-cover"
              />
            </a>
          </Link>
          <div className="hidden xl:block">
            <p className="text-2xl font-bold">Rohid</p>
          </div>
        </div>
        <nav className="px-2 xl:px-4">
          <SidebarLink
            icon={<MdOutlineHome />}
            activeIcon={<MdHome />}
            label="Home"
            href="/"
          />
          <SidebarLink
            icon={<MdOutlineFeed />}
            activeIcon={<MdFeed />}
            label="Blog"
            href="/blog"
          />
          <SidebarLink
            icon={<MdOutlineGridView />}
            activeIcon={<MdGridView />}
            label="Projects"
            href="/projects"
          />
          <SidebarLink
            icon={<MdOutlineEmojiEmotions />}
            activeIcon={<MdEmojiEmotions />}
            label="Hire Me"
            href="/hire-me"
          />
        </nav>
        <SidebarSocialLinks />
      </div>
      <ThemeSwitcher />
    </aside>
  );
};

export default Sidebar;
