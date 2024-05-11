import ClientWrapper from "~/components/client-wrapper";
import { CONFIG } from "~/config";
import { getAllTags } from "~/server/fetch/posts";
import { getImageMetaAndPlaceHolder } from "~/server/tools/image";

export default async function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  const tags = await getAllTags();
  const profilePic = await getImageMetaAndPlaceHolder(
    CONFIG.profile_card.image,
  );
  return <ClientWrapper tags={tags} profilePic={profilePic} >{children}</ClientWrapper>;
}
