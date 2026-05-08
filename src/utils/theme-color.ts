export const themePresetHexes = ['#0891b2', '#16a34a', '#ea580c', '#db2777'] as const
export const defaultThemeColorHex = themePresetHexes[0]

type Rgb = {
  r: number
  g: number
  b: number
}

function clampChannel(value: number) {
  return Math.max(0, Math.min(255, Math.round(value)))
}

function rgbToVar({ r, g, b }: Rgb) {
  return `${clampChannel(r)} ${clampChannel(g)} ${clampChannel(b)}`
}

function hexToRgb(hex: string): Rgb {
  const value = hex.replace('#', '')
  const normalized =
    value.length === 3
      ? value
          .split('')
          .map((char) => `${char}${char}`)
          .join('')
      : value

  return {
    r: Number.parseInt(normalized.slice(0, 2), 16),
    g: Number.parseInt(normalized.slice(2, 4), 16),
    b: Number.parseInt(normalized.slice(4, 6), 16),
  }
}

function rgbToHex({ r, g, b }: Rgb) {
  return `#${[r, g, b]
    .map((channel) => clampChannel(channel).toString(16).padStart(2, '0'))
    .join('')}`
}

function mixRgb(color: Rgb, base: Rgb, weight: number): Rgb {
  return {
    r: color.r * weight + base.r * (1 - weight),
    g: color.g * weight + base.g * (1 - weight),
    b: color.b * weight + base.b * (1 - weight),
  }
}

export function normalizeHexColor(value: string | null | undefined) {
  if (!value) return undefined
  const normalized = value.trim()
  if (/^#[0-9a-f]{6}$/i.test(normalized)) return normalized.toLowerCase()
  if (/^#[0-9a-f]{3}$/i.test(normalized)) {
    return `#${normalized
      .slice(1)
      .split('')
      .map((char) => `${char}${char}`)
      .join('')}`.toLowerCase()
  }
  return undefined
}

export function getThemePresetNumber(hex: string) {
  const target = hexToRgb(hex)
  let closestIndex = 0
  let closestDistance = Number.POSITIVE_INFINITY

  themePresetHexes.forEach((preset, index) => {
    const color = hexToRgb(preset)
    const distance =
      (target.r - color.r) ** 2 + (target.g - color.g) ** 2 + (target.b - color.b) ** 2
    if (distance < closestDistance) {
      closestIndex = index
      closestDistance = distance
    }
  })

  return closestIndex + 1
}

export function hexToHue(hex: string) {
  const { r, g, b } = hexToRgb(hex)
  const red = r / 255
  const green = g / 255
  const blue = b / 255
  const max = Math.max(red, green, blue)
  const min = Math.min(red, green, blue)
  const delta = max - min

  if (delta === 0) return 0
  if (max === red) return Math.round(60 * (((green - blue) / delta) % 6) + 360) % 360
  if (max === green) return Math.round(60 * ((blue - red) / delta + 2))
  return Math.round(60 * ((red - green) / delta + 4))
}

export function hueToHex(hue: number) {
  const normalizedHue = ((hue % 360) + 360) % 360
  const isMiddleHue = normalizedHue >= 45 && normalizedHue <= 205
  const saturation = isMiddleHue ? 0.48 : 0.6
  const lightness = isMiddleHue ? 0.36 : 0.4
  const chroma = (1 - Math.abs(2 * lightness - 1)) * saturation
  const x = chroma * (1 - Math.abs(((normalizedHue / 60) % 2) - 1))
  const m = lightness - chroma / 2
  const sector = Math.floor(normalizedHue / 60)
  const [r, g, b] =
    sector === 0
      ? [chroma, x, 0]
      : sector === 1
        ? [x, chroma, 0]
        : sector === 2
          ? [0, chroma, x]
          : sector === 3
            ? [0, x, chroma]
            : sector === 4
              ? [x, 0, chroma]
              : [chroma, 0, x]

  return rgbToHex({
    r: (r + m) * 255,
    g: (g + m) * 255,
    b: (b + m) * 255,
  })
}

export function getThemeColorVariables(hex: string, isDark: boolean) {
  const primary = hexToRgb(hex)
  const white = hexToRgb('#ffffff')
  const black = hexToRgb('#000000')

  if (isDark) {
    return {
      '--color-primary-bg': rgbToVar(mixRgb(primary, hexToRgb('#181a20'), 0.06)),
      '--color-primary-dark': rgbToVar(mixRgb(primary, hexToRgb('#e5e7eb'), 0.14)),
      '--color-primary': rgbToVar(mixRgb(primary, hexToRgb('#f8fafc'), 0.6)),
      '--color-primary-small': rgbToVar(mixRgb(primary, hexToRgb('#cbd5e1'), 0.44)),
      '--color-primary-medium': rgbToVar(mixRgb(primary, hexToRgb('#334155'), 0.3)),
      '--color-primary-light': rgbToVar(mixRgb(primary, hexToRgb('#1f2937'), 0.18)),
      '--color-primary-extralight': rgbToVar(mixRgb(primary, hexToRgb('#101114'), 0.06)),
      '--color-candy-soft': rgbToVar(mixRgb(primary, hexToRgb('#f8fafc'), 0.42)),
      '--color-candy-highlight': rgbToVar(mixRgb(primary, hexToRgb('#e5e7eb'), 0.24)),
      '--color-candy-stick': rgbToVar(mixRgb(primary, hexToRgb('#d7f3ff'), 0.1)),
      '--color-candy-stick-shadow': rgbToVar(mixRgb(primary, hexToRgb('#bdebff'), 0.14)),
      '--color-code-bg': rgbToVar(mixRgb(primary, hexToRgb('#151720'), 0.05)),
      '--color-code-header': rgbToVar(mixRgb(primary, hexToRgb('#242433'), 0.12)),
    }
  }

  return {
    '--color-primary-bg': rgbToVar(white),
    '--color-primary-dark': rgbToVar(mixRgb(primary, black, 0.4)),
    '--color-primary': rgbToVar(primary),
    '--color-primary-small': rgbToVar(mixRgb(primary, white, 0.65)),
    '--color-primary-medium': rgbToVar(mixRgb(primary, white, 0.4)),
    '--color-primary-light': rgbToVar(mixRgb(primary, white, 0.15)),
    '--color-primary-extralight': rgbToVar(mixRgb(primary, white, 0.1)),
    '--color-candy-soft': rgbToVar(mixRgb(primary, white, 0.15)),
    '--color-candy-highlight': rgbToVar(mixRgb(primary, white, 0.1)),
    '--color-candy-stick': rgbToVar(hexToRgb('#d7f3ff')),
    '--color-candy-stick-shadow': rgbToVar(hexToRgb('#bdebff')),
    '--color-code-bg': rgbToVar(mixRgb(primary, white, 0.025)),
    '--color-code-header': rgbToVar(mixRgb(primary, white, 0.07)),
  }
}

export function applyThemeColorVariables(hex: string, isDark: boolean) {
  const variables = getThemeColorVariables(hex, isDark)
  Object.entries(variables).forEach(([name, value]) => {
    document.documentElement.style.setProperty(name, value)
  })
}
