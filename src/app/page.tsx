import InfoCard from "~/components/person-card";

export const metadata = {
  title: "棉花糖",
  description: "棉花糖的 Blog",
  icons: [{ rel: "icon", url: "/favicon.ico" }],
};

export default function Page() {
  return (
    <div className="mt-auto flex items-center">
      <InfoCard home={true} />
    </div>
  );
}
