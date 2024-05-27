import NextImage from '~/components/next-image'
import { getImageMetaAndPlaceHolder } from '~/server/tools/image'

export default async function Image({ alt, src }: { alt: string; src: string }) {
  const info = await getImageMetaAndPlaceHolder(src)
  return <NextImage alt={alt} {...info} />
}
