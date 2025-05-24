import React from 'react'

interface VideoProps {
  src?: string
  width?: string | number
  height?: string | number
  controls?: boolean
  playsInline?: boolean
  preload?: 'none' | 'metadata' | 'auto'
  autoPlay?: boolean
  muted?: boolean
  loop?: boolean
  className?: string
  children?: React.ReactNode
}

const Video: React.FC<VideoProps> = ({
  src,
  height,
  width = 800,
  controls = true,
  playsInline = true,
  preload = 'none',
  autoPlay = false,
  muted = false,
  loop = false,
  className = '',
  children,
  ...props
}) => {
  return (
    <video
      className={`rounded-md ${className}`}
      width={width}
      height={height}
      controls={controls}
      playsInline={playsInline}
      preload={preload}
      autoPlay={autoPlay}
      muted={muted}
      loop={loop}
      {...props}
    >
      {src && <source src={src} type={src.endsWith('.mp4') ? 'video/mp4' : src.endsWith('.webm') ? 'video/webm' : undefined} />}
      {children}
      Your browser does not support the video tag.
    </video>
  )
}

export default Video
