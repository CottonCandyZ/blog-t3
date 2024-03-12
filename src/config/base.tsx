import {
  ArticleIcon,
  LinkIcon,
  AboutIcon,
  GithubIcon,
  TwitterIcon,
  BgmIcon,
  ToysIcon,
} from "~/components/icons";

const BASE = {
  card_router: [
    { name: "文章", href: "/", icon: ArticleIcon },
    { name: "玩具", href: "/toys", icon: ToysIcon },
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
  // Global default to show code line number
  CodeLineNumber: false,
};
export default BASE;