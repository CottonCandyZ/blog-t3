import fs from "node:fs/promises";
import path from "path";
import { getPlaiceholder } from "~/server/tools/plaiceholder";

export async function getImageMetaAndPlaceHolder(src: string) {
  // WAIT TO FIX: Placeholder sharp is old and has a conflict problem with nexjs.
  const buffer = await fs.readFile(path.join(process.cwd(), "public", src));

  const {
    metadata: { height, width },
    base64,
  } = await getPlaiceholder(buffer);
  // const {height, width} = await sharp(path.join(process.cwd(), "public", src)).metadata()

  return {
    src,
    width,
    height,
    blurDataURL: base64,
  };
}
