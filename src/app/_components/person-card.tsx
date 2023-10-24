import Image from "next/image";
import NavigationBar from "./navigation-bar";

export default function InfoCard() {
  return (
    <>
      <div className="h-[500px] w-96 flex-col items-center justify-center rounded-3xl  bg-white">
        <div className="mb-5 mt-5 text-lg font-normal text-red-700">
          <NavigationBar />
        </div>
        <div className="flex justify-center mb-10 mt-10">
          <Image
            className="h-52 w-52 rounded-b-full"
            src="/images/avatar.jpg"
            width={250}
            height={250}
            alt="Avatar of the author" />
        </div>
      </div>
    </>
  );
}
