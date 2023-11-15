import InfoCard from "~/components/person-card";

export const metadata = {
  title: "我的",
  // description: "我的小屋",
  // icons: [{ rel: "icon", url: "/favicon.ico" }],
};

export default function Page() {
  return (
    <div className="flex min-h-[calc(100dvh-100px)] items-center">
      <InfoCard home={true} />
    </div>
  );
}
