import Image from "next/image";
import NavigationBar from "./navigation-bar";

export default function InfoCard() {
  return (
    <>
      <div className="mx-auto flex-col items-center justify-center space-y-5 rounded-3xl bg-white  py-5">
        <NavigationBar className="w-80 text-lg font-normal text-red-700" />
        <Image
          className="mx-auto block h-52 w-52 rounded-b-full"
          src="/images/avatar.jpg"
          width={250}
          height={250}
          alt="Avatar of the author"
        />
      </div>
    </>
  );
}
