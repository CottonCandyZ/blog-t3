import NextImage from '~/components/Image'
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
      <h3 className="text-lg font-semibold text-primary">{title}</h3>
      <p className="mt-2 text-primary-dark">{description}</p>
      <div className="overflow-hidden rounded-md border-2 border-primary-extralight">
        <NextImage
          {...img}
          className="h-28 object-cover"
        />
      </div>

    </a>
  )
}

export default ToyCard
