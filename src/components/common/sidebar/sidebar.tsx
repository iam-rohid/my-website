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
    <aside className="h-screen sticky top-0 left-0 w-16 xl:w-64 flex flex-col border-r border-gray-100 dark:border-gray-800 overflow-y-auto transition-[border]">
      <div className="flex-1 my-4 xl:my-8">
        <div className="mb-6 px-2 xl:px-8 flex-col">
          <Link href="/">
            <a className="relative w-12 xl:w-16 h-12 xl:h-16 rounded-full overflow-hidden mb-4 block">
              <Image
                src="https://pbs.twimg.com/profile_images/1481868973537132544/0NSx-X8V_400x400.jpg"
                alt="Profile Pic"
                layout="fill"
                className="absolute inset-0 w-full h-full object-cover"
              />
            </a>
          </Link>
          <div className="hidden xl:block">
            <p className="font-bold text-2xl">Rohid</p>
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
