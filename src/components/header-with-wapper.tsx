"use client";
import { usePathname } from "next/navigation";
import Header from "~/components/header";
import SocialLinks from "~/components/social-links";

const HeaderWithWrapper = () => {
  const pathname = usePathname();
  return (
    <>
      {pathname == "/" && (
        <div className="hidden h-10 bg-primary-extralight md:block"></div>
      )}
      <div className="sticky top-0 z-[5] mx-auto max-w-6xl px-5 py-3 md:px-10">
        <Header />
      </div>
      {!pathname.startsWith("/posts") && (
        <>
          <div className="relative col-span-full h-36 bg-primary-extralight">
            <div className="absolute -top-[4rem] h-16 w-full bg-primary-extralight"></div>
            <div className="sticky top-0 z-[4] h-20 bg-primary-extralight md:h-14"></div>
            <div className="mx-auto flex max-w-6xl flex-row justify-end px-5 py-3 md:px-10">
              <SocialLinks />
            </div>
          </div>
          <div className="sticky top-0 z-[4] h-16 bg-white"></div>
        </>
      )}
    </>
  );
};

export default HeaderWithWrapper;
