"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { CONFIG } from "~/config/base";

export default function NavigationBar({ className }: { className?: string }) {
  const pathname = usePathname();
  const router_content = CONFIG.card_router;
  return (
    <nav className={className}>
      <ul className="flex justify-center space-x-4">
        {router_content.map((item, index) => (
          <ListItem
            key={index}
            content={item.name}
            href={item.href}
            Icon={item.icon}
            current={pathname == item.href}
          />
        ))}
      </ul>
    </nav>
  );
}

function ListItem({
  content,
  Icon,
  href,
  current = false,
}: {
  content: string;
  Icon: React.FC<{ className?: string }>;
  href: string;
  current?: boolean;
}) {
  return current ? (
    <li>
      <Link
        href={href}
        className="pointer-events-none relative z-0 flex 
    items-center px-3 before:absolute before:bottom-0 before:left-0 before:right-0 
    before:-z-10 before:h-full before:rounded-xl before:bg-primary-medium text-white"
      >
        <Icon className="mr-1 text-[1em]"></Icon>
        {content}
      </Link>
    </li>
  ) : (
    <li>
      <Link
        href={href}
        className="group relative z-0 flex 
        items-center before:absolute before:bottom-0 before:left-0 before:right-0 before:-z-10 before:h-0.5 before:rounded-xl 
      before:bg-primary-medium before:transition-all before:duration-150 hover:px-3 hover:before:h-full hover:text-white"
      >
        <Icon className="mr-0 text-[0px] 
        group-hover:mr-1 group-hover:animate-backshake group-hover:text-[1em] group-hover:transition-all
        group-hover:duration-150" />
        {content}
      </Link>
    </li>
  );
}
