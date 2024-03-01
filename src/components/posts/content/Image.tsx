import Image from "next/image";
export default function NextImage({
  src,
  alt,
}: {
  src: string;
  alt: string;
  title?: string;
}) {
  return <Image className="mdx-img" src={src} alt={alt} placeholder="blur" />;
}
