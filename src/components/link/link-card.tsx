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
      className="relative flex w-full flex-row gap-4 rounded-2xl bg-primary-extralight p-4
        hover:before:absolute hover:before:-bottom-2 hover:before:-left-2 hover:before:-right-2 hover:before:-top-2 
        before:rounded-3xl before:border-4 before:border-primary-extralight
        before:absolute before:top-2 before:bottom-2 before:left-2 before:right-2 before:transition-all before:"
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
