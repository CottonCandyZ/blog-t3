import Image from "next/image";

interface ToyCardProps {
  props: {
    title: string;
    description: string;
    href: string;
    img_alt: string;
    img_src: string;
  };
}

const ToyCard: React.FC<ToyCardProps> = ({ props }) => {
  return (
    <a
      className="h-min w-full rounded-xl border-2 border-primary-light p-4 hover:border-primary sm:w-80"
      href={props.href}
      target="_blank"
    >
      <h3 className="text-lg font-semibold text-primary">{props.title}</h3>
      <p className="mt-2 text-primary-dark">{props.description}</p>
      <Image
        className="mt-2 h-28 rounded-md border-2 border-primary-extralight object-cover"
        alt={props.img_alt}
        height={500}
        width={500}
        src={props.img_src}
      />
    </a>
  );
};

export default ToyCard;