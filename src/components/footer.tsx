export default function Footer() {
  return (
    <div className="my-5">
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
    </div>
  );
}
