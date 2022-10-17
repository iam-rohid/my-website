import { socialLinks } from "@src/data/social-links";
import {
  FiFacebook,
  FiGithub,
  FiInstagram,
  FiLink,
  FiLinkedin,
  FiTwitch,
  FiTwitter,
  FiYoutube,
} from "react-icons/fi";
import SidebarSocialLink from "./sidebar-social-link";

const links = socialLinks
  .filter((item) => item.isFeatured)
  .map((link) => ({
    href: `/${link.id}`,
    icon:
      link.id === "twitter" ? (
        <FiTwitter />
      ) : link.id === "facebook" ? (
        <FiFacebook />
      ) : link.id === "instagram" ? (
        <FiInstagram />
      ) : link.id === "linked-in" ? (
        <FiLinkedin />
      ) : link.id === "github" ? (
        <FiGithub />
      ) : link.id === "twitch" ? (
        <FiTwitch />
      ) : link.id === "youtube" ? (
        <FiYoutube />
      ) : (
        <FiLink />
      ),
    label: link.label,
  }));

const SidebarSocialLinks = () => {
  return (
    <section className="my-8">
      <div className="mb-2 pl-7 hidden xl:block">
        <p className="text-lg text-gray-500 dark:text-gray-400">Online</p>
      </div>
      <nav className="px-2 xl:px-4">
        {links.map((link) => (
          <SidebarSocialLink key={link.href} {...link} />
        ))}
      </nav>
    </section>
  );
};

export default SidebarSocialLinks;
