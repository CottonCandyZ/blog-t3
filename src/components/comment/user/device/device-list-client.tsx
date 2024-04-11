"use client"
import { useState } from "react";
import DeviceInfo from "~/components/comment/user/device/device-info";

const DeviceListClient: React.FC<{
  devices: {
    createAt: Date;
    credentialID: string;
  }[];
}> = ({ devices }) => {
  const [message, setMessage] = useState("");
  return (
    <div>
      <ul className="flex flex-col gap-2">
        {devices.map((item, index) => (
          <li key={item.credentialID}>
            <DeviceInfo index={index} {...item} setMessage={setMessage}></DeviceInfo>
          </li>
        ))}
      </ul>
      {message == "" ? null : (
        <p className="py-2.5 font-medium text-primary">{message}</p>
      )}
    </div>
  );
};
export default DeviceListClient;