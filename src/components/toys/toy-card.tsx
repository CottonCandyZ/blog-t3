import NextImage from "~/components/Image";
import { getImageMetaAndPlaceHolder } from "~/server/tools/image";

interface ToyCardProps {
  title: string;
  description: string;
  href: string;
  img_alt: string;
  img_src: string;
}

const ToyCard: React.FC<ToyCardProps> = async (props) => {
  const img = {
    ...(await getImageMetaAndPlaceHolder(props.img_src)),
    alt: props.img_src,
  };
  return (
    <a className="block" href={props.href} target="_blank">
      <h3 className="text-lg font-semibold text-primary">{props.title}</h3>
      <p className="mt-2 text-primary-dark">{props.description}</p>
      <div className="rounded-md border-2 border-primary-extralight overflow-hidden">
      <NextImage
        {...img}
        className="h-28 object-cover"
      />
      </div>

    </a>
  );
};

export default ToyCard;
