'use client'
import { startRegistration } from '@simplewebauthn/browser'
import clsx from 'clsx'
import type { Dispatch, SetStateAction } from 'react'
import { useFormStatus } from 'react-dom'
import { addDeviceOptAction, addDeviceVResAction } from '~/server/action/webauthn'

import { ERROR_MESSAGE } from '~/server/message'

function AddButton() {
  const { pending } = useFormStatus()
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
    focus-visible:outline-offset-2 focus-visible:outline-primary-small`,
        {
          'bg-primary-extralight shadow-inner': pending,
        },
      )}
    >
      添加设备
    </button>
  )
}

const AddDevice: React.FC<{ setMessage: Dispatch<SetStateAction<string>> }> = ({ setMessage }) => {
  async function add() {
    // setMessage("请等待认证框弹出"); // 这个暂时不会工作！！
    const optionRes = await addDeviceOptAction()
    setMessage(optionRes.message)
    if (!optionRes.data) return

    let localRes
    try {
      localRes = await startRegistration(optionRes.data)
    } catch (e) {
      setMessage(ERROR_MESSAGE.ADD_DEVICE_CANCELED)
      return
    }
    setMessage('已经发送过去啦，请耐心等待服务器认证...')
    const verifyRes = await addDeviceVResAction(localRes)
    setMessage(verifyRes.message)
  }
  return (
    <form action={add}>
      <AddButton />
    </form>
  )
}

export default AddDevice
