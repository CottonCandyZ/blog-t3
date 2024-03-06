import Image from "next/image";
export default function NextImage({
  src,
  alt,
}: {
  src: string;
  alt: string;
  title?: string;
}) {
  return (
      <Image className="mdx-img w-full h-auto" width={0} height={0} sizes="100vw" src={src} alt={alt} />
  );
}
