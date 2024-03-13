import Image from "next/image";
interface LinkCardProps {
  props: {
    name: string;
    href: string;
    avatar_src: string;
    description: string;
  };
}

const LinkCard: React.FC<LinkCardProps> = ({ props }) => {
  return (
    <a
      className="relative flex h-min w-full flex-row gap-4 rounded-2xl bg-primary-extralight p-4 sm:w-72
        hover:before:absolute hover:before:-bottom-2 hover:before:-left-2 hover:before:-right-2 hover:before:-top-2 
        hover:before:rounded-3xl hover:before:border-4 hover:before:border-primary-extralight"
      href="https://google.com"
      target="_blank"
    >
      <Image
        alt={`${props.name} Avatar`}
        className="h-14 w-14 rounded-xl"
        height={60}
        width={60}
        src={props.avatar_src}
      />
      <div>
        <h1 className="text-lg font-bold text-primary">{props.name}</h1>
        <p className="text-primary/80">{props.description}</p>
      </div>
    </a>
  );
};

export default LinkCard;
