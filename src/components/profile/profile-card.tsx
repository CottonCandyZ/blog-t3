import Image from "next/image";
import Link from "next/link";
import { AboutIcon } from "~/components/icons";
import SocialLinks from "~/components/profile/social-links";
import { CONFIG } from "~/config";
import { type ImageProps } from "~/server/fetch/posts/custom-remark-plugin/remark-image-info";

const ProfileCard = ({ profilePic }: { profilePic: ImageProps }) => {
  return (
    <div className="flex flex-col items-center gap-2 p-3 ">
      <Link
        href="/about"
        className="group relative max-w-60 overflow-hidden rounded-xl active:scale-95"
      >
        <Image
          src={profilePic.src}
          blurDataURL={profilePic.blurDataURL}
          placeholder="blur"
          height={profilePic.height}
          width={profilePic.width}
          alt="Picture of the author"
        />
        <div className="absolute inset-0 flex items-center justify-center bg-primary-light/40 opacity-0 transition-all group-hover:opacity-100">
          <AboutIcon className="size-20 text-white" />
        </div>
      </Link>

      <span
        className="relative text-lg font-bold
      after:absolute after:-bottom-1 after:left-7 after:right-7 after:h-1 after:rounded-xl after:bg-primary-small"
      >
        {CONFIG.profile_card.name}
      </span>
      <p className="font-medium text-primary-small">
        {CONFIG.profile_card.description}
      </p>
      <div>
        <SocialLinks />
      </div>
    </div>
  );
};

export default ProfileCard;
