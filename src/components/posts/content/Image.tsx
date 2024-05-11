import Image from "next/image";
import { type ImageProps } from "~/server/fetch/posts/custom-remark-plugin/remark-image-info";
export default function NextImage({
  src,
  alt,
  width,
  height,
  blurDataURL,
}: ImageProps) {
  return (
    <Image
      className="mdx-img w-full"
      width={width}
      height={height}
      placeholder="blur"
      blurDataURL={blurDataURL}
      src={src}
      alt={alt}
    />
  );
}
