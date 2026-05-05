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
      title: '深度学习',
      project_list: [
        {
          title: 'LFSA: CLIP Based Text-Image Person Search',
          description: '利用 CLIP 做文本行人重识别，换上重新设计的 loss 和 sampler',
          href: 'https://github.com/CottonCandyZ/LFSA',
          img_alt: 'Describe how loss and sampler work',
          img_src: '/toyImages/LFSA.webp',
        },
      ],
    },
  ],
  friend_link: [
    {
      name: 'AULyPcのBlog',
      description: '今日も生きててえらい ☁',
      href: 'https://blog.aulypc0x0.online',
      avatar_src: '/linkAvatar/favicon_amiya.webp',
    },
  ],
  footer_info: { name: 'CottonCandyZ' },
}
export default BASE
