const BASE = {
  profile_card: {
    name: 'CottonCZ',
    description: 'Just For Fun!',
    image: '/profile/AvatarSample.webp',
  },
  nav_router: [
    // https://icon-sets.iconify.design/mingcute/
    { name: 'Home', href: '/', icon: 'i-mingcute-home-2-line' },
    { name: 'Toys', href: '/toys', icon: 'i-mingcute-toy-horse-line' },
    { name: 'Links', href: '/link', icon: 'i-mingcute-link-line' },
    { name: 'About', href: '/about', icon: 'i-mingcute-message-4-line' },
  ],
  social_link: [
    {
      name: 'GitHub',
      href: 'https://github.com/CottonCandyZ',
      icon: 'i-mingcute-github-line',
    },
    {
      name: 'Twitter',
      href: 'https://twitter.com/cotton_candyZG',
      icon: 'i-mingcute-social-x-line',
    },
    {
      name: 'Bangumi',
      href: 'https://bgm.tv/user/cotton_candyz',
      icon: 'i-mingcute-tv-2-line',
    },
  ],
  toy_cards: [
    {
      title: 'ToysTitle',
      project_list: [
        {
          title: 'Toy Sample',
          description: 'Toy Description',
          href: 'https://github.com/CottonCandyZ/',
          img_alt: 'Describe how loss and sampler work',
          img_src: '/toyImages/example.webp',
        },
        {
          title: 'Toy Sample',
          description:
            'Toy Description Toy Description Toy Description Toy Description Toy Description',
          href: 'https://github.com/CottonCandyZ/',
          img_alt: 'Describe how loss and sampler work',
          img_src: '/toyImages/example.webp',
        },
        {
          title: 'Toy Sample',
          description: 'Toy Description',
          href: 'https://github.com/CottonCandyZ/',
          img_alt: 'Describe how loss and sampler work',
          img_src: '/toyImages/example.webp',
        },
      ],
    },
  ],
  friend_link: [
    {
      name: 'Blog Name',
      description: 'Blog description',
      href: 'https://google.com',
      avatar_src: '/linkAvatar/AvatarSample.webp',
    },
    {
      name: 'Blog Name',
      description: 'Blog description Blog description',
      href: 'https://google.com',
      avatar_src: '/linkAvatar/AvatarSample.webp',
    },
    {
      name: 'Blog Name',
      description: 'Blog description Blog description',
      href: 'https://google.com',
      avatar_src: '/linkAvatar/AvatarSample.webp',
    },
    {
      name: 'Blog Name',
      description: 'Blog description',
      href: 'https://google.com',
      avatar_src: '/linkAvatar/AvatarSample.webp',
    },
  ],
  footer_info: { name: 'CottonCandyZ' },
}
export default BASE
