import {
  HomeIcon,
  ArticleIcon,
  LinkIcon,
  AboutIcon,
  GithubIcon,
  TwitterIcon,
  BgmIcon,
} from "~/config/icons";

export const CONFIG = {
  card_info: { name: "棉花糖", at: "@ccz", description: "👋" },
  card_router: [
    { name: "我", href: "/", icon: HomeIcon },
    { name: "文章", href: "/posts", icon: ArticleIcon },
    { name: "友链", href: "/link", icon: LinkIcon },
    { name: "关于", href: "/about", icon: AboutIcon },
  ],
  outer_link: [
    {
      name: "GitHub",
      href: "https://github.com/CottonCandyZ",
      icon: GithubIcon,
    },
    {
      name: "Twitter",
      href: "https://twitter.com/cotton_candyZG",
      icon: TwitterIcon,
    },
    {
      name: "Bangumi",
      href: "https://bgm.tv/user/cotton_candyz",
      icon: BgmIcon,
    },
  ],
  footer_info: { name: "CottonCandyZ" },
};
