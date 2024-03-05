import {
  ArticleIcon,
  LinkIcon,
  AboutIcon,
  GithubIcon,
  TwitterIcon,
  BgmIcon,
  PhotoIcon,
} from "~/components/icons";

const BASE = {
  card_info: { name: "棉花糖", description: "喜欢 Coding 的前端新玩家 😶‍🌫️" },
  card_router: [
    { name: "文章", href: "/", icon: ArticleIcon },
    { name: "相册", href: "/photos", icon: PhotoIcon },
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