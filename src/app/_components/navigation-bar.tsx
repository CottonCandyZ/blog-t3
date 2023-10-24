"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { CONFIG } from "~/config/base";


export default function NavigationBar() {
  const pathname = usePathname();
  const router_content = CONFIG.card_router;
  return (
    <nav>
      <ul className="flex justify-center space-x-4">
        {router_content.map((item, index) => {
          return pathname == item.href ? (
            <ListItem key={index} href={item.href} current={true}>
              <item.icon className="text-[1em] mr-1"/>
              {item.name}
            </ListItem>
          ) : (
            <ListItem key={index} href={item.href}>
              <item.icon className="text-[0px] mr-0 
        group-hover:text-[1em] group-hover:mr-1 group-hover:transition-all group-hover:duration-150
        group-hover:animate-backshake"/>
              {item.name}
            </ListItem>
          );
        })}
      </ul>
    </nav>
  );
}

function ListItem({
  children,
  href,
  current = false,
}: {
  children: React.ReactNode;
  href: string;
  current?: boolean;
}) {
  return current ? (
    <li className="inline-block">
      <Link
        href={href}
        className="relative z-0 flex items-center 
    pl-3 pr-3 before:absolute before:bottom-0 before:left-0 before:right-0 before:-z-10 
    before:h-full before:rounded-xl before:bg-red-200 pointer-events-none"
      >
        {children}
      </Link>
    </li>
  ) : (
    <li className="inline-block">
      <Link
        href={href}
        className="relative z-0 flex items-center 
        before:duration-150 before:absolute before:bottom-0 before:left-0 before:right-0 before:-z-10 before:h-0.5 before:rounded-xl 
      before:bg-red-200 before:transition-all hover:pl-3 hover:pr-3 hover:before:h-full group"
      >
        {children}
      </Link>
    </li>
  );
}
