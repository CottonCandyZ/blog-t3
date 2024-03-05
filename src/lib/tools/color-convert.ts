function componentToHex(c: number) {
  const hex = c.toString(16);
  return hex.length == 1 ? "0" + hex : hex;
}

function rgbToHex(r: number, g: number, b: number) {
  return "#" + componentToHex(r) + componentToHex(g) + componentToHex(b);
}
export function rgbStringToHex(input: string) {
  const rgb = input.split(" ");
  return rgbToHex(Number(rgb[0]), Number(rgb[1]), Number(rgb[2]));
}
