"use client";
import clsx from "clsx";
import Link from "next/link";
import { useContext } from "react";
import { CloseIcon, NavIcon } from "~/components/icons";
import { RootContext } from "~/components/root-provider";
import { CONFIG } from "~/config";

const MobileNav: React.FC = () => {
  const {
    mobileNavExpend: { value: expend, setter: setExpend },
  } = useContext(RootContext);
  return (
    <div className="relative h-0 md:hidden">
      <button
        className="fixed right-8 top-4 z-20 text-primary-dark"
        onClick={() => setExpend(!expend)}
      >
        {expend ? (
          <CloseIcon className="h-9 w-9 text-primary" />
        ) : (
          <NavIcon className="h-9 w-9 text-primary-dark" />
        )}
      </button>
      <div
        className={clsx("fixed inset-0 z-10", {
          "pointer-events-none": !expend,
        })}
      >
        <button
          onClick={() => setExpend(false)}
          className={clsx(
            "absolute inset-0 z-10 backdrop-blur-xl transition-opacity duration-500",
            {
              "opacity-1 touch-none": expend,
              "touch-auto opacity-0": !expend,
            },
          )}
        ></button>
        <nav className="absolute bottom-20 left-0 z-20 flex h-2/4 w-3/4 flex-col justify-between">
          <ul className="flex flex-col gap-3">
            {CONFIG.nav_router.map((item, index) => {
              return (
                <li key={index} className={clsx(
                  `-translate-x-full py-3 pl-10 text-4xl font-bold tracking-widest text-primary transition-transform
                duration-${(index + 4) * 100}`,
                  {
                    "translate-x-0": expend,
                    "-translate-x-full": !expend,
                  },
                )}>
                  <Link
                    href={item.href}
                    onClick={() => setExpend(false)}
                  >
                    {item.name}
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>
      </div>
    </div>
  );
};

export default MobileNav;
