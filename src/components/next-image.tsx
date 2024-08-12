'use client'
import Image from 'next/image'
import { useState } from 'react'
import { ImageProps } from '~/server/tools/image'

export default function NextImage({
  src,
  alt,
  width,
  height,
  className,
  blurCss,
}: ImageProps & { alt: string; className?: string }) {
  const [load, setLoad] = useState(false)
  return (
    <div className="mdx-img relative flex w-full justify-center overflow-hidden">
      {!load && <div className="absolute inset-0 size-full scale-150 blur-2xl" style={blurCss} />}
      <Image
        className={className}
        onLoad={() => setLoad(true)}
        width={width}
        height={height}
        src={src}
        alt={alt}
      />
    </div>
  )
}