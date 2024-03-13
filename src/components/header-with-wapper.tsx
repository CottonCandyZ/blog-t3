"use client";
import clsx from "clsx";
import { usePathname } from "next/navigation";
import { useContext } from "react";
import Header from "~/components/header";
import { RootContext } from "~/components/root-provider";
import SocialLinks from "~/components/social-links";

const HeaderWithWrapper = () => {
  const pathname = usePathname();
  const {
    postTitle: { value: title },
  } = useContext(RootContext);
  return (
    <>
      {pathname == "/" && (
        <div className="hidden h-10 bg-primary-extralight md:block"></div>
      )}
      <div className="sticky top-0 z-[5] mx-auto max-w-6xl px-5 py-3 md:px-10">
        <Header />
      </div>
      <div
        className={clsx("relative col-span-full bg-primary-extralight", {
          "h-36": !pathname.startsWith("/posts"),
          "h-64": pathname.startsWith("/posts"),
        })}
      >
        <div className="absolute -top-[4rem] h-16 w-full bg-primary-extralight"></div>
        <div className="sticky top-0 z-[4] h-12 bg-primary-extralight"></div>
        {pathname.startsWith("/posts") && (
          <h1 className="relative z-[2] mx-auto mt-10 max-w-6xl px-5 text-4xl font-bold text-primary md:px-10">
            {title}
          </h1>
        )}
        {!pathname.startsWith("/posts") &&<div className=" mx-auto max-w-6xl px-5 py-3 md:px-10 flex flex-row justify-end h-40">
        <SocialLinks />
        </div>}

      </div>
      
      <div className="sticky top-0 z-[4] h-16 bg-white"></div>
    </>
  );
};

export default HeaderWithWrapper;
