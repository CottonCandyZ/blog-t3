"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { CONFIG } from "~/config/base";
import clsx from "clsx";

export default function NavigationBar({ className }: { className?: string }) {
  const pathname = usePathname();
  const router_content = CONFIG.card_router;
  return (
    <nav className={className}>
      <ul className="flex justify-center gap-4">
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
  return (
    <li>
      <Link
        href={href}
        className={clsx(
          `relative z-0 flex items-center
          before:absolute before:bottom-0 before:left-0 before:right-0 before:-z-10
           before:rounded-xl before:bg-primary-medium`,
          {
            [`pointer-events-none px-3 text-white before:h-full`]:
              current === true,
            [`group before:h-0.5 before:bg-primary-light before:transition-all before:duration-200 hover:px-3 hover:text-white
            hover:before:h-full hover:before:bg-primary-medium`]:
              current == false,
          },
        )}
      >
        <Icon
          className={clsx({
            [`mr-1 text-[1em]`]: current === true,
            [`mr-0 text-[0px] 
          group-hover:mr-1 group-hover:animate-backshake group-hover:text-[1em] 
          group-hover:transition-all group-hover:duration-200`]:
              current === false,
          })}
        ></Icon>
        {content}
      </Link>
    </li>
  );
}
