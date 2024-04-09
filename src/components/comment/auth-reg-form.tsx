"use client";
import {
  generateAuthenticationOpt,
  generateRegistrationOpt,
  verifyAuthenticationRes,
  verifyRegistrationRes,
} from "~/lib/comments/session-and-user";
import {
  startAuthentication,
  startRegistration,
} from "@simplewebauthn/browser";
import { useState } from "react";
import { useFormStatus } from "react-dom";
import clsx from "clsx";
import { ERROR_MESSAGE } from "~/lib/comments/message";

function AuthButton({ Auth }: { Auth: (formData: FormData) => Promise<void> }) {
  const { pending } = useFormStatus();
  return (
    <button
      type="submit"
      formAction={Auth}
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
      登陆
    </button>
  );
}
function RegButton({ Reg }: { Reg: (formData: FormData) => Promise<void> }) {
  const { pending } = useFormStatus();
  return (
    <button
      type="submit"
      formAction={Reg}
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
      注册
    </button>
  );
}

const AuthRegForm = () => {
  const [message, setMessage] = useState({ message: "" });
  async function Reg(formData: FormData) {
    setMessage({ message: "请等待认证框弹出" }); // 这个暂时不会工作！！
    const optionRes = await generateRegistrationOpt(formData);
    if (!optionRes.options) {
      setMessage({ ...optionRes });
      return;
    }
    let localRes;
    try {
      localRes = await startRegistration(optionRes.options);
    } catch {
      setMessage({ message: ERROR_MESSAGE.USER_CANCELED });
      return;
    }
    setMessage({ message: "已经发送过去啦，请耐心等待服务器验证..." });
    const verifyRes = await verifyRegistrationRes(localRes);
    setMessage({ ...verifyRes });
  }
  async function Auth(formData: FormData) {
    setMessage({ message: "请等待认证框弹出" });
    const optionRes = await generateAuthenticationOpt(formData);
    setMessage({ ...optionRes });
    if (!optionRes.options) {
      return;
    }
    let localRes;
    try {
      localRes = await startAuthentication(optionRes.options);
    } catch {
      setMessage({ message: ERROR_MESSAGE.USER_CANCELED });
      return;
    }
    setMessage({ message: "已经发送过去啦，请耐心等待验证..." });
    const verifyRes = await verifyAuthenticationRes(localRes);
    setMessage({ ...verifyRes });
  }

  return (
    <form className="flex flex-row flex-wrap gap-2">
      <div className="flex w-full flex-row flex-wrap gap-2">
        <div className="grow basis-80">
          <label
            htmlFor="userId"
            className="block text-base font-semibold text-primary"
          >
            ID
          </label>
          <input
            type="text"
            id="userId"
            name="userId"
            placeholder="需要是唯一的！"
            autoComplete="username webauthn"
            className="mt-1 block w-full rounded-md border-0 px-3.5 py-2
      shadow-sm ring-1 ring-inset ring-primary-light placeholder:font-bold placeholder:text-primary-light 
      focus:outline-none focus:ring-2 focus:ring-inset focus:ring-primary-medium"
          />
        </div>
        <div className="grow basis-80">
          <label
            htmlFor="userName"
            className="block text-base font-semibold text-primary"
          >
            名字
          </label>
          <input
            type="text"
            id="userName"
            name="userName"
            placeholder="可选的！空则同 ID 登陆时不需要"
            className="mt-1 block w-full rounded-md border-0 px-3.5 py-2
      shadow-sm ring-1 ring-inset ring-primary-light placeholder:font-bold placeholder:text-primary-light 
      focus:outline-none focus:ring-2 focus:ring-inset focus:ring-primary-medium"
          />
        </div>
      </div>
      <div className="mt-1 flex flex-row gap-2">
        <AuthButton Auth={Auth} />
        <RegButton Reg={Reg} />
        <p className="px-3.5 py-2.5 font-medium text-primary">
          {message.message}
        </p>
      </div>
    </form>
  );
};

export default AuthRegForm;
