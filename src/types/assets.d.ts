declare module '*.webp' {
  import type { StaticImageData } from 'next/image'

  const content: StaticImageData
  export default content
}
