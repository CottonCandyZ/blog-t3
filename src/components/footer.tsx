import { CONFIG } from "~/config";

export default function Footer() {
  return (
    <footer className="mt-auto flex flex-col items-center gap-1 py-5 bg-black">
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
      <span className="font-normal text-white">
        &copy;{new Date().getFullYear()}&nbsp;{CONFIG.footer_info.name}
      </span>
    </footer>
  );
}
