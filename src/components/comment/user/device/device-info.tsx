'use client'

import clsx from 'clsx'
import dayjs from 'dayjs'
import Image from 'next/image'
import type { Dispatch, SetStateAction } from 'react'
import { useFormStatus } from 'react-dom'
import { removeUserDeviceAction } from '~/server/action/webauthn'
import type { aaguid } from '~/server/fetch/user'

function RemoveButton() {
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
      移除
    </button>
  )
}

const DeviceInfo: React.FC<{
  credentialID: string
  createAt: Date
  aaguidInfo: aaguid | undefined
  setMessage: Dispatch<SetStateAction<string>>
}> = ({ credentialID, createAt, setMessage, aaguidInfo }) => {
  async function removeDevice() {
    setMessage((await removeUserDeviceAction(credentialID)).message)
  }
  return (
    <div className="flex flex-row items-center justify-between border-b border-primary-extralight py-2">
      <div className="flex flex-row items-center gap-2">
        {aaguidInfo
          ? (
            <Image
              className="size-8"
              src={aaguidInfo.icon_light}
              alt="Authenticator Icon"
              width={32}
              height={32}
            />
            )
          : null}
        <div className="font-medium text-primary">
          <div>
            {aaguidInfo ? <span>{aaguidInfo.name}</span> : <span>Unknown</span>}
          </div>
          <div>
            <span>创建于 </span>
            <time suppressHydrationWarning>
              {dayjs(createAt.toISOString()).format('YY.MM.DD HH:mm')}
            </time>
          </div>
        </div>
      </div>

      <form action={removeDevice}>
        <RemoveButton />
      </form>
    </div>
  )
}
export default DeviceInfo
