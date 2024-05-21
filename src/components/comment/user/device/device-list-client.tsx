'use client'
import { useState } from 'react'
import DeviceInfo from '~/components/comment/user/device/device-info'
import type { aaguid } from '~/server/fetch/user'

const DeviceListClient: React.FC<{
  devices: {
    createAt: Date
    credentialID: string
    aaguid: string
  }[]
  aaguid: Record<string, aaguid> | undefined
}> = ({ devices, aaguid }) => {
  const [message, setMessage] = useState('')
  if (!aaguid)
    setMessage('获取设备名列表失败，设备名可能不会正确显示')

  return (
    <div>
      <ul className="flex flex-col">
        {devices.map((item) => {
          let aaguidInfo
          if (aaguid)
            aaguidInfo = aaguid[item.aaguid] ?? undefined

          return (
            <li key={item.credentialID}>
              <DeviceInfo
                aaguidInfo={aaguidInfo}
                {...item}
                setMessage={setMessage}
              >
              </DeviceInfo>
            </li>
          )
        })}
      </ul>
      {message === ''
        ? null
        : (
          <p className="py-2.5 font-medium text-primary">{message}</p>
          )}
    </div>
  )
}
export default DeviceListClient
