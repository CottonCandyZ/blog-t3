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
        `block h-min w-full shrink-0 rounded-md px-3.5 py-2.5 text-center text-base
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
      <div className="w-32 sm:w-20">
        <AuthButton Auth={Auth} />
      </div>
      <div className="flex basis-96 flex-wrap gap-2">
        <div className="basis-[19rem] grow">
          {/* <label
            htmlFor="username"
            className="block text-base font-semibold text-primary"
          >
            Name
          </label> */}
          <input
            type="text"
            id="username"
            name="username"
            placeholder="名字，别太长，登陆可以不用填哦"
            autoComplete="username webauthn"
            className="block w-full rounded-md border-0 px-3.5 py-2.5
      shadow-sm ring-1 ring-inset ring-primary-light placeholder:font-bold placeholder:text-primary-light 
      focus:outline-none focus:ring-2 focus:ring-inset focus:ring-primary-medium"
          />
        </div>
        <RegButton Reg={Reg} />
        <p className="py-2.5 font-medium text-primary flex-1">
          {message.message}
        </p>
      </div>
    </form>
  );
};

export default AuthRegForm;
