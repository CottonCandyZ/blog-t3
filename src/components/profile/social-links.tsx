import { CONFIG } from "~/config";

export default function SocialLinks() {
  const social_link = CONFIG.social_link;
  return (
    <ul className="flex w-max justify-center gap-1">
      {social_link.map((item, index) => (
        <ListItem
          key={index}
          content={item.name}
          Icon={item.icon}
          href={item.href}
        />
      ))}
    </ul>
  );
}

function ListItem({
  content,
  Icon,
  href,
}: {
  content: string;
  Icon: React.FC<{ className?: string; color?: string }>;
  href: string;
}) {
  return (
    <li className="active:scale-95">
      <a
        href={href}
        target="_blank"
        after-content={content}
        className="group relative flex size-10 cursor-pointer items-center justify-center rounded-full 
      border-primary-light transition-all duration-500 after:absolute
      after:-bottom-5 after:rounded-2xl after:bg-primary-small after:px-1.5
      after:py-1 after:text-xs after:text-white after:opacity-0
      after:shadow-md after:transition
      after:duration-500 after:content-[attr(after-content)]
      hover:bg-primary-small hover:shadow-md hover:after:translate-y-2 hover:after:opacity-100"
      >
        <Icon className="size-6 text-primary transition-all duration-500 ease-out group-hover:text-white" />
      </a>
    </li>
  );
}
