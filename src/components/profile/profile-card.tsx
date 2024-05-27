import Image from 'next/image'
import Link from 'next/link'

import SocialLinks from '~/components/profile/social-links'
import { CONFIG } from '~/config'
import profileImage from '~/config/profile-image.webp'

function ProfileCard() {
  return (
    <div className="flex flex-col items-center gap-2 p-3 ">
      <Link
        href="/about"
        className="group relative max-w-60 overflow-hidden rounded-xl active:scale-95"
      >
        <Image src={profileImage} placeholder="blur" alt="Picture of the author" />
        <div className="absolute inset-0 flex items-center justify-center bg-primary-light/40 opacity-0 transition-all group-hover:opacity-100">
          <span className="i-mingcute-message-4-line size-20 text-white" />
        </div>
      </Link>

      <span
        className={`relative text-lg font-bold
      after:absolute after:inset-x-7 after:-bottom-1 after:h-1 after:rounded-xl after:bg-primary-small`}
      >
        {CONFIG.profile_card.name}
      </span>
      <p className="font-medium text-primary-small">{CONFIG.profile_card.description}</p>
      <div>
        <SocialLinks />
      </div>
    </div>
  )
}

export default ProfileCard
