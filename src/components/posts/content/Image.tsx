import Image from "next/image";
export default function NextImage({
  src,
  alt,
  width,
  height,
  // base64,
}: {
  src: string;
  alt: string;
  width: number;
  height: number;
  // base64: string;
  // title?: string;
}) {
  return (
    <Image
      className="mdx-img w-full"
      width={width}
      height={height}
      // placeholder="blur"
      // blurDataURL={base64}
      src={src}
      alt={alt}
    />
  );
}
