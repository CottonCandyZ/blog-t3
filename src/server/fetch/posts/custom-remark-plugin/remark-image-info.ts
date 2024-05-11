import { visit } from "unist-util-visit";
import type { Plugin } from "unified";
import type { Image, Root } from "mdast";
import { getImageMetaAndPlaceHolder } from "~/server/tools/image";

export interface ImageProps {
  src: string;
  width: number;
  height: number;
  blurDataURL: string;
}

const remarkImageInfo: Plugin<[], Root> = () => {
  return async (tree) => {
    const promises: (() => Promise<void>)[] = [];
    visit(tree, "image", (node: Image) => {
      promises.push(async () => {
        const { src, width, height, blurDataURL } = await getImageMetaAndPlaceHolder(
          node.url,
        );

        node.data = {
          hProperties: { src, width, height, blurDataURL },
        };
      });
    });
    await Promise.allSettled(promises.map((t) => t()));
  };
};

export default remarkImageInfo;
