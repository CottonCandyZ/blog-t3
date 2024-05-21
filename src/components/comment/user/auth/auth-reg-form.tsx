'use client'
import {
  startAuthentication,
  startRegistration,
} from '@simplewebauthn/browser'
import { useState } from 'react'
import { useFormStatus } from 'react-dom'
import clsx from 'clsx'
import { ERROR_MESSAGE } from '~/server/message'
import {
  AuthOptAction,
  RegOptAction,
  vAuthResAction,
  vRegResAction,
} from '~/server/action/webauthn'

function AuthButton({ Auth }: { Auth: (formData: FormData) => Promise<void> }) {
  const { pending } = useFormStatus()
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
    focus-visible:outline-offset-2 focus-visible:outline-primary-small`,
        {
          'bg-primary-extralight shadow-inner': pending,
        },
      )}
    >
      验证
    </button>
  )
}
function RegButton({ Reg }: { Reg: (formData: FormData) => Promise<void> }) {
  const { pending } = useFormStatus()
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
    focus-visible:outline-offset-2 focus-visible:outline-primary-small`,
        {
          'bg-primary-extralight shadow-inner': pending,
        },
      )}
    >
      注册
    </button>
  )
}

function AuthRegForm() {
  const [message, setMessage] = useState('')
  async function Reg(formData: FormData) {
    setMessage('请等待认证框弹出') // 这个暂时不会工作！！
    const optionRes = await RegOptAction(formData)
    setMessage(optionRes.message)
    if (!optionRes.data)
      return

    let localRes
    try {
      localRes = await startRegistration(optionRes.data)
    }
    catch (e) {
      console.error(e)
      setMessage(ERROR_MESSAGE.CLIENT_USER_CANCELED)
      return
    }
    setMessage('已经发送过去啦，请耐心等待服务器认证...')
    const verifyRes = await vRegResAction(localRes)
    setMessage(verifyRes.message)
  }
  async function Auth() {
    setMessage('请等待认证框弹出')
    const optionRes = await AuthOptAction()
    setMessage(optionRes.message)
    if (!optionRes.data)
      return

    let localRes
    try {
      localRes = await startAuthentication(optionRes.data)
    }
    catch (e) {
      console.error(e)
      setMessage(ERROR_MESSAGE.CLIENT_USER_CANCELED)
      return
    }
    setMessage('已经发送过去啦，请耐心等待验证...')
    const verifyRes = await vAuthResAction(localRes)
    setMessage(verifyRes.message)
  }

  return (
    <form className="flex flex-row flex-wrap gap-2">
      <div className="w-32 sm:w-20">
        <AuthButton Auth={Auth} />
      </div>
      <div className="flex basis-96 flex-wrap gap-2">
        <div className="grow basis-[19rem]">
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
            placeholder="名字，别太长，验证可以不用填哦"
            autoComplete="username webauthn"
            className="block w-full rounded-md border-0 bg-primary-bg px-3.5 py-2.5
      shadow-sm ring-1 ring-inset ring-primary-light placeholder:font-bold placeholder:text-primary-light
      focus:outline-none focus:ring-2 focus:ring-inset focus:ring-primary-small"
          />
        </div>
        <RegButton Reg={Reg} />
        <p className="flex-1 py-2.5 font-medium text-primary">{message}</p>
      </div>
    </form>
  )
}

export default AuthRegForm
