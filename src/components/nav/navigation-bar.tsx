"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { CONFIG } from "~/config";
import clsx from "clsx";

export default function NavigationBar() {
  const pathname = usePathname();
  const router_content = CONFIG.nav_router;
  return (
    <nav>
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
          `relative z-0 mx-auto flex w-max items-center
          leading-8 transition-all duration-300 before:absolute before:bottom-0
           before:left-0 before:right-0 before:-z-10 before:rounded-xl before:bg-primary-light active:scale-90 active:duration-0
           `,
          {
            [`pointer-events-none px-3 text-white before:h-full before:bg-primary-small before:shadow-sm`]:
              current === true,
            [`group before:h-1 before:bg-primary-light before:transition-all before:duration-300 hover:px-3 hover:text-white
            hover:before:h-full hover:before:bg-primary-small hover:before:shadow-sm`]:
              current == false,
          },
        )}
      >
        <Icon
          className={clsx(`text-white`, {
            [`mr-1 text-[1em]`]: current === true,
            [`group-hover:animate-backshake mr-0 text-[0px] transition-all duration-300 group-hover:mr-1 group-hover:text-[1em]`]:
              current === false,
          })}
        ></Icon>
        {content}
      </Link>
    </li>
  );
}
