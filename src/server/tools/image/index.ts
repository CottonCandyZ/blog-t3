import fs from "node:fs/promises";
import path from "path";
import { cache } from "react";
import { getPlaiceholder } from "~/server/tools/image/plaiceholder";

export const getImageMetaAndPlaceHolder = cache(async (src: string) => {
  const buffer = await fs.readFile(path.join(process.cwd(), "public", src));

  const {
    metadata: { height, width },
    base64,
  } = await getPlaiceholder(buffer);

  return {
    src,
    width,
    height,
    blurDataURL: base64,
  };
});

