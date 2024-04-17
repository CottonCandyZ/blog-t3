import {
  LinkIcon,
  AboutIcon,
  GithubIcon,
  TwitterIcon,
  BgmIcon,
  ToysIcon,
  HomeIcon,
} from "~/components/icons";

const BASE = {
  profile_card: {
    name: "CottonCZ",
    description: "Just For Fun!",
  },
  nav_router: [
    { name: "Home", href: "/", icon: HomeIcon },
    { name: "Toys", href: "/toys", icon: ToysIcon },
    { name: "Links", href: "/link", icon: LinkIcon },
    { name: "About", href: "/about", icon: AboutIcon },
  ],
  social_link: [
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
  toy_cards: [
    {
      title: "ToysTitle",
      project_list: [
        {
          title: "Toy Sample",
          description: "Toy Description",
          href: "https://github.com/CottonCandyZ/",
          img_alt: "Describe how loss and sampler work",
          img_src: "/toyImages/example.webp",
        },
        {
          title: "Toy Sample",
          description:
            "Toy Description Toy Description Toy Description Toy Description Toy Description",
          href: "https://github.com/CottonCandyZ/",
          img_alt: "Describe how loss and sampler work",
          img_src: "/toyImages/example.webp",
        },
        {
          title: "Toy Sample",
          description: "Toy Description",
          href: "https://github.com/CottonCandyZ/",
          img_alt: "Describe how loss and sampler work",
          img_src: "/toyImages/example.webp",
        },
      ],
    },
  ],
  friend_link: [
    {
      name: "Blog Name",
      description: "Blog description",
      href: "https://google.com",
      avatar_src: "/linkAvatar/AvatarSample.webp",
    },
    {
      name: "Blog Name",
      description: "Blog description Blog description",
      href: "https://google.com",
      avatar_src: "/linkAvatar/AvatarSample.webp",
    },
    {
      name: "Blog Name",
      description: "Blog description Blog description",
      href: "https://google.com",
      avatar_src: "/linkAvatar/AvatarSample.webp",
    },
    {
      name: "Blog Name",
      description: "Blog description",
      href: "https://google.com",
      avatar_src: "/linkAvatar/AvatarSample.webp",
    },
  ],
  footer_info: { name: "CottonCandyZ" },
};
export default BASE;
