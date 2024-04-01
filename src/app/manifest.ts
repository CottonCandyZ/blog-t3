import type { MetadataRoute } from 'next'
 
export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Cotton Candy's Blog",
    short_name: 'Cotton Blog',
    description: 'Cotton Blog',
    start_url: '/',
    display: 'standalone',
    background_color: '#fff',
    theme_color: '#fff',
    icons: [
      {
        src: '/icons/512.png',
        sizes: '512x512',
        type: 'image/png',
      },
    ],
  }
}