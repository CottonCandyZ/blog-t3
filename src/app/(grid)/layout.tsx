import ClientWrapper from "~/components/client-wrapper";
import { getAllTags } from "~/server/fetch/posts";

export default async function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  const tags = await getAllTags();
  return <ClientWrapper tags={tags}>{children}</ClientWrapper>;
}
