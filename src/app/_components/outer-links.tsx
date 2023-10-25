import { CONFIG } from "~/config/base";


export default function OuterLinks() {
  const outer_link = CONFIG.outer_link;
  return (
    <ul className="flex justify-center space-x-4">
      {
        outer_link.map((item, index) => 
        <ListItem key={index} content={item.name} Icon={item.icon} href={item.herf}/>)
      }
    </ul>
  );
}

function ListItem({
  content,
  Icon,
  href,
}: {
  content: string;
  Icon: React.FC<{ className?: string, color?:string}>;
  href: string;
}) {
  return (
    <li>
      <a href={href}
        after-content={content}
        className="group relative flex h-10 w-10 cursor-pointer items-center justify-center rounded-full border-2
      border-red-200 after:absolute after:-bottom-2 after:rounded-2xl
      after:bg-red-400 after:p-1.5 after:text-xs
      after:text-white after:opacity-0 after:transition after:duration-300
      after:content-[attr(after-content)] hover:bg-red-400
      hover:transition-all hover:duration-500
      hover:after:translate-y-8 hover:after:opacity-100"
      >
        <Icon className="text-red-400 h-6 w-6 group-hover:text-white group-hover:transition-all group-hover:duration-700" />
        
      </a>
    </li>
  );
}
