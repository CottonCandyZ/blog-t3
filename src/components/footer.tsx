import { CONFIG } from "~/config";

export default function Footer() {
  return (
    <footer className="mx-auto max-w-6xl gap-1 px-2 md:px-10">
      <div className="flex w-full flex-col items-center rounded-t-2xl bg-primary-bg p-4 shadow-cxs">
        <span className="font-semibold">
          Build with{" "}
          <a href="https://nextjs.org" className="text-primary-small">
            Next.js
          </a>{" "}
          • Deployed on{" "}
          <a href="https://vercel.com" className="text-primary-small">
            Vercel
          </a>
        </span>
        <span className="font-normal">
          &copy;{new Date().getFullYear()}&nbsp;{CONFIG.footer_info.name}
        </span>
      </div>
    </footer>
  );
}
