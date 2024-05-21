import { visit } from 'unist-util-visit'
import type { Plugin } from 'unified'
import type { Image, Root } from 'mdast'
import { getImageMetaAndPlaceHolder } from '~/server/tools/image'

export interface ImageProps {
  src: string
  width: number
  height: number
  backgroundImage: string
  backgroundPosition: string
  backgroundSize: string
  backgroundRepeat: string
}

const remarkImageInfo: Plugin<[], Root> = () => {
  return async (tree) => {
    const promises: (() => Promise<void>)[] = []
    visit(tree, 'image', (node: Image) => {
      promises.push(async () => {
        const { src, width, height, ...BlurCss }
          = await getImageMetaAndPlaceHolder(node.url)

        node.data = {
          hProperties: { src, width, height, ...BlurCss },
        }
      })
    })
    await Promise.allSettled(promises.map(t => t()))
  }
}

export default remarkImageInfo
