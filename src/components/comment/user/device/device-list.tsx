'use client'
import { use } from 'react'
import DeviceListClient from '~/components/comment/user/device/device-list-client'
import type { AaguidPromise, DeviceInfoPromise } from '~/server/fetch/user'

function DeviceList({
  deviceInfoPromise,
  aaguidPromise,
}: {
  deviceInfoPromise: DeviceInfoPromise
  aaguidPromise: AaguidPromise
}) {
  const authenticators = use(deviceInfoPromise).data
  const aaguid = use(aaguidPromise).data

  return authenticators ? (
    <DeviceListClient devices={authenticators} aaguid={aaguid} />
  ) : (
    <p className="text-base font-medium text-primary">Session 消失了</p>
  )
}

export default DeviceList
