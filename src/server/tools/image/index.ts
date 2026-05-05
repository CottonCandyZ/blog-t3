import fs from 'node:fs/promises'
import path from 'node:path'
import process from 'node:process'
import { cache } from 'react'
import { getPlaiceholder } from '~/server/tools/image/plaiceholder'

export type ImageProps = Awaited<ReturnType<typeof getImageMetaAndPlaceHolder>>

export async function loadAsset(src: string): Promise<Buffer> {
  const decoded = decodeURIComponent(src)

  // 判断是否远程资源
  const isRemote = /^https?:\/\//i.test(decoded)

  if (isRemote) {
    const res = await fetch(decoded)
    if (!res.ok) {
      throw new Error(`Failed to fetch: ${decoded}`)
    }
    return Buffer.from(await res.arrayBuffer())
  }

  // 本地资源（默认在 public 目录下）
  const filePath = path.join(process.cwd(), 'public', decoded)
  return fs.readFile(filePath)
}

export const getImageMetaAndPlaceHolder = async (src: string) => {
  const buffer = await loadAsset(src)

  const {
    metadata: { height, width },
    css,
  } = await getPlaiceholder(buffer, { size: 10 })

  return {
    src,
    width,
    height,
    blurCss: css,
  }
}
