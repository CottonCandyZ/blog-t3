import Image from "next/image";
import { getImageMetaAndPlaceHolder } from "~/server/tools/image";

interface ToyCardProps {
  title: string;
  description: string;
  href: string;
  img_alt: string;
  img_src: string;
}

const ToyCard: React.FC<ToyCardProps> = async (props) => {
  const img = await getImageMetaAndPlaceHolder(props.img_src);
  return (
    <a className="block" href={props.href} target="_blank">
      <h3 className="text-lg font-semibold text-primary">{props.title}</h3>
      <p className="mt-2 text-primary-dark">{props.description}</p>
      <Image
        className="mt-2 h-28 rounded-md border-2 border-primary-extralight object-cover"
        alt={props.img_alt}
        blurDataURL={img.blurDataURL}
        placeholder="blur"
        height={img.height}
        width={img.width}
        src={props.img_src}
      />
    </a>
  );
};

export default ToyCard;
