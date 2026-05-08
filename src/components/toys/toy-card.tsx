import NextImage from '~/components/next-image'
import { getImageMetaAndPlaceHolder } from '~/server/tools/image'

interface ToyCardProps {
  title: string
  description: string
  href: string
  img_alt: string
  img_src: string
}

const ToyCard: React.FC<ToyCardProps> = async ({ title, description, href, img_alt, img_src }) => {
  const img = {
    ...(await getImageMetaAndPlaceHolder(img_src)),
    alt: img_alt,
  }
  return (
    <a className="block" href={href} target="_blank">
      <h3 className="text-base font-semibold text-primary md:text-lg">{title}</h3>
      <p className="mt-1.5 text-sm text-primary-dark md:mt-2 md:text-base">{description}</p>
      <div className="mt-3 overflow-hidden rounded-md border border-primary-extralight md:border-2">
        <NextImage {...img} className="h-24 object-cover md:h-28" />
      </div>
    </a>
  )
}

export default ToyCard
