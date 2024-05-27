import fs from 'node:fs/promises'
import path from 'node:path'
import process from 'node:process'
import { cache } from 'react'
import { getPlaiceholder } from '~/server/tools/image/plaiceholder'

export type ImageProps = Awaited<ReturnType<typeof getImageMetaAndPlaceHolder>>

export const getImageMetaAndPlaceHolder = cache(async (src: string) => {
  const buffer = await fs.readFile(path.join(process.cwd(), 'public', src))

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
})
