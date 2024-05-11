"use client";
import Image from "next/image";
import { useState } from "react";
import { type ImageProps } from "~/server/fetch/posts/custom-remark-plugin/remark-image-info";
export default function NextImage({
  src,
  alt,
  width,
  height,
  className,
  ...BlurCss
}: ImageProps & { alt: string; className?: string }) {
  const [load, setLoad] = useState(false);
  return (
    <div className="mdx-img relative w-full overflow-hidden">
      {!load && (
        <div
          className="absolute inset-0 h-full w-full scale-150 transform blur-2xl filter"
          style={BlurCss}
        />
      )}
      <Image
        className={className}
        onLoad={() => setLoad(true)}
        width={width}
        height={height}
        src={src}
        alt={alt}
      />
    </div>
  );
}
