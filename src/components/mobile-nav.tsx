"use client";
import clsx from "clsx";
import Link from "next/link";
import { useState } from "react";
import { CloseIcon, NavIcon } from "~/components/icons";
import { CONFIG } from "~/config";

const MobileNav: React.FC = (props) => {
  const [expend, setExpend] = useState(false);
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
      <div className={clsx(" fixed inset-0 z-10",
          {
            "pointer-events-auto": expend,
            "pointer-events-none": !expend,
          },
      )}>
        <button
          onClick={() => setExpend(false)}
          className={clsx(
            "absolute inset-0 z-10 h-screen w-screen backdrop-blur-xl transition-opacity duration-500",
            {
              "opacity-1 touch-none": expend,
              "opacity-0 touch-auto": !expend,
            },
          )}
        ></button>
        <nav className="absolute bottom-20 left-0 z-20 flex h-2/4 w-3/4 flex-col justify-between">
          <div className="flex flex-col gap-3">
            {CONFIG.card_router.map((item, index) => {
              return (
                <Link
                  key={index}
                  href={item.href}
                  className={clsx(
                    `-translate-x-full py-3 pl-10 text-4xl font-bold tracking-widest text-primary transition-transform
                    duration-${(index + 4) * 100}`,
                    {
                      "translate-x-0": expend,
                      "-translate-x-full": !expend,
                    },
                  )}
                  onClick={() => setExpend(false)}
                >
                  {item.name}
                </Link>
              );
            })}
          </div>
        </nav>
      </div>
    </div>
  );
};

export default MobileNav;
