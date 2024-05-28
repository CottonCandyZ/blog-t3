import Image from 'next/image'
import notFound from '~/config/not-found.webp'

export default function NotFound() {
  return (
    <div className="mt-4 flex min-h-[calc(-120px+100dvh)] items-center justify-center">
      <Image src={notFound} className="w-3/4" alt="404 Not Found image" />
    </div>
  )
}
