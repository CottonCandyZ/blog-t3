"use client";

import clsx from "clsx";
import dayjs from "dayjs";
import type { Dispatch, SetStateAction } from "react";
import { useFormStatus } from "react-dom";
import { removeUserDeviceAction } from "~/server/action/webauthn";



function RemoveButton() {
  const { pending } = useFormStatus();
  return (
    <button
      type="submit"
      disabled={pending}
      className={clsx(
        `block h-min shrink-0 rounded-md px-3.5 py-2.5 text-center text-base
    font-semibold text-primary shadow-sm 
    ring-1 ring-inset ring-primary-light 
    hover:bg-primary-extralight hover:shadow-inner
    focus-visible:outline focus-visible:outline-2 
    focus-visible:outline-offset-2 focus-visible:outline-primary-medium`,
        {
          "bg-primary-extralight shadow-inner": pending,
        },
      )}
    >
      移除
    </button>
  );
}

const DeviceInfo: React.FC<{
  index: number,
  credentialID: string;
  createAt: Date;
  setMessage: Dispatch<SetStateAction<string>>;
}> = ({ index, credentialID, createAt, setMessage }) => {
  async function removeDevice() {
    setMessage((await removeUserDeviceAction(credentialID)).message);
  }
  return (
    <div className="flex flex-row justify-between items-center">
      <div className="text-primary font-medium ">
        <span >设备 {index + 1} 创建于 </span>
        <time suppressHydrationWarning>{dayjs(createAt.toISOString()).format("YY.MM.DD HH:mm")}</time>
      </div>
      <form action={removeDevice}>
        <RemoveButton />
      </form>
    </div>
  );
};
export default DeviceInfo;
