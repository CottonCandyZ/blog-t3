'use client'
import clsx from 'clsx'
import { type PropsWithChildren, useState } from 'react'
import { useFormStatus } from 'react-dom'
import AddDevice from '~/components/comment/user/device/add-device'
import { LogoutAction } from '~/server/action/webauthn'

function LogOutButton({
  Logout,
}: {
  Logout: (formData: FormData) => Promise<void>
}) {
  const { pending } = useFormStatus()
  return (
    <button
      type="submit"
      formAction={Logout}
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
      登出
    </button>
  )
}
const UserInfo: React.FC<
  PropsWithChildren<{ user: { label: number, name: string, id: string } }>
> = ({ user, children }) => {
  const [toggleDevice, setToggleDevice] = useState(false)
  const [message, setMessage] = useState('')
  return (
    <div className="">
      <div className="flex flex-wrap items-end justify-between gap-2">
        <div>
          <span className="text-pretty text-2xl text-primary-dark">Hi! </span>
          <span className="text-2xl font-medium text-primary">{user.name}</span>
          <span className="text-sm text-primary-light">
            {' '}
            #
            {user.label}
          </span>
        </div>
        <div className="flex gap-2">
          <div className="shrink-0">
            <form>
              <LogOutButton Logout={LogoutAction} />
            </form>
          </div>
          <div className="shrink-0">
            <AddDevice setMessage={setMessage} />
          </div>
          <button
            className={clsx(
              `block h-min shrink-0 rounded-md px-3.5 py-2.5 text-center text-base
              font-semibold text-primary shadow-sm 
              ring-1 ring-inset ring-primary-light 
              hover:bg-primary-extralight hover:shadow-inner
              focus-visible:outline focus-visible:outline-2 
              focus-visible:outline-offset-2 focus-visible:outline-primary-small`,
              {
                'bg-primary-extralight shadow-inner': toggleDevice,
              },
            )}
            type="button"
            onClick={() => {
              setToggleDevice(toggle => !toggle)
            }}
          >
            设备管理
          </button>
        </div>
      </div>
      {message === ''
        ? null
        : (
          <p className="py-2.5 font-medium text-primary">{message}</p>
          )}
      {toggleDevice ? <div className="mt-4">{children}</div> : null}
    </div>
  )
}
export default UserInfo
