import NextImage from '~/components/Image'
import { getImageMetaAndPlaceHolder } from '~/server/tools/image'

interface LinkCardProps {
  name: string
  href: string
  avatar_src: string
  description: string
}

const LinkCard: React.FC<LinkCardProps> = async ({ avatar_src, name, description, href }) => {
  const avatar_img = {
    ...(await getImageMetaAndPlaceHolder(avatar_src)),
    alt: `${name} Avatar`,
  }
  return (
    <a
      className="relative flex min-w-80 flex-row gap-4 rounded-2xl bg-primary-bg p-4
        shadow-cxs before:absolute before:inset-2 before:rounded-3xl before:border-4
        before:border-primary-bg before:transition-all hover:before:absolute
        hover:before:-inset-2"
      href={href}
      target="_blank"
      rel="noreferrer noopener"
    >
      <div className="size-14 overflow-hidden rounded-xl">
        <NextImage {...avatar_img} />
      </div>
      <div>
        <h1 className="text-lg font-bold text-primary">{name}</h1>
        <p className="text-primary/80">{description}</p>
      </div>
    </a>
  )
}

export default LinkCard
