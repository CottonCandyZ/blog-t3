import { CONFIG } from "~/config/base";

export default function Footer() {
  return (
    <div className="mt-auto flex flex-col items-center gap-1 py-5">
      <span className="font-semibold text-white">
        Build with{" "}
        <a href="https://nextjs.org" className="text-primary-medium">
          Next.js
        </a>{" "}
        • Deployed on{" "}
        <a href="https://vercel.com" className="text-primary-medium">
          Vercel
        </a>
      </span>
      <span className=" font-extralight text-white">
        &copy;{new Date().getFullYear()}&nbsp;{CONFIG.footer_info.name}
      </span>
    </div>
  );
}
