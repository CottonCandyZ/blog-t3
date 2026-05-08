import '~/styles/globals.scss'
import type { Metadata } from 'next'
import { Noto_Sans, Noto_Sans_Mono, Noto_Sans_SC } from 'next/font/google'
import Footer from '~/components/footer'
import MobileNav from '~/components/nav/mobile-nav'
import ThemeWrapper from '~/components/theme-wrapper'
import HeaderWithWrapper from '~/components/header/header-with-wrapper'
import MainWrapper from '~/components/main-wrapper'

const noto_sans = Noto_Sans({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-noto-sans',
})
const noto_sans_sc = Noto_Sans_SC({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-noto-sans-sc',
})
const noto_sans_mono = Noto_Sans_Mono({
  subsets: ['latin'],
  weight: ['500', '600'],
  variable: '--font-noto-sans-mono',
})

export const metadata: Metadata = {
  title: {
    default: 'Cotton',
    template: '%s | Cotton',
  },
  description: 'Cotton',
}

const themeBootstrapScript = `
(() => {
  const presetHexes = ['#0891b2', '#16a34a', '#ea580c', '#db2777'];
  const defaultHex = presetHexes[0];
  const normalizeHex = (value) => {
    if (!value) return undefined;
    const normalized = String(value).trim();
    if (/^#[0-9a-f]{6}$/i.test(normalized)) return normalized.toLowerCase();
    if (/^#[0-9a-f]{3}$/i.test(normalized)) {
      return '#' + normalized.slice(1).split('').map((char) => char + char).join('').toLowerCase();
    }
    return undefined;
  };
  const hexToRgb = (hex) => {
    const value = hex.replace('#', '');
    return {
      r: parseInt(value.slice(0, 2), 16),
      g: parseInt(value.slice(2, 4), 16),
      b: parseInt(value.slice(4, 6), 16),
    };
  };
  const clamp = (value) => Math.max(0, Math.min(255, Math.round(value)));
  const rgbVar = ({ r, g, b }) => \`\${clamp(r)} \${clamp(g)} \${clamp(b)}\`;
  const mix = (color, base, weight) => ({
    r: color.r * weight + base.r * (1 - weight),
    g: color.g * weight + base.g * (1 - weight),
    b: color.b * weight + base.b * (1 - weight),
  });
  const variables = (hex, dark) => {
    const primary = hexToRgb(hex);
    const rgb = (value) => hexToRgb(value);
    if (dark) {
      return {
        '--color-primary-bg': rgbVar(mix(primary, rgb('#181a20'), 0.06)),
        '--color-primary-dark': rgbVar(mix(primary, rgb('#e5e7eb'), 0.14)),
        '--color-primary': rgbVar(mix(primary, rgb('#f8fafc'), 0.6)),
        '--color-primary-small': rgbVar(mix(primary, rgb('#cbd5e1'), 0.44)),
        '--color-primary-medium': rgbVar(mix(primary, rgb('#334155'), 0.3)),
        '--color-primary-light': rgbVar(mix(primary, rgb('#1f2937'), 0.18)),
        '--color-primary-extralight': rgbVar(mix(primary, rgb('#101114'), 0.06)),
        '--color-candy-soft': rgbVar(mix(primary, rgb('#f8fafc'), 0.42)),
        '--color-candy-highlight': rgbVar(mix(primary, rgb('#e5e7eb'), 0.24)),
        '--color-candy-stick': rgbVar(mix(primary, rgb('#d7f3ff'), 0.1)),
        '--color-candy-stick-shadow': rgbVar(mix(primary, rgb('#bdebff'), 0.14)),
        '--color-code-bg': rgbVar(mix(primary, rgb('#151720'), 0.05)),
        '--color-code-header': rgbVar(mix(primary, rgb('#242433'), 0.12)),
      };
    }
    return {
      '--color-primary-bg': rgbVar(rgb('#ffffff')),
      '--color-primary-dark': rgbVar(mix(primary, rgb('#000000'), 0.4)),
      '--color-primary': rgbVar(primary),
      '--color-primary-small': rgbVar(mix(primary, rgb('#ffffff'), 0.65)),
      '--color-primary-medium': rgbVar(mix(primary, rgb('#ffffff'), 0.4)),
      '--color-primary-light': rgbVar(mix(primary, rgb('#ffffff'), 0.15)),
      '--color-primary-extralight': rgbVar(mix(primary, rgb('#ffffff'), 0.1)),
      '--color-candy-soft': rgbVar(mix(primary, rgb('#ffffff'), 0.15)),
      '--color-candy-highlight': rgbVar(mix(primary, rgb('#ffffff'), 0.1)),
      '--color-candy-stick': rgbVar(rgb('#d7f3ff')),
      '--color-candy-stick-shadow': rgbVar(rgb('#bdebff')),
      '--color-code-bg': rgbVar(mix(primary, rgb('#ffffff'), 0.025)),
      '--color-code-header': rgbVar(mix(primary, rgb('#ffffff'), 0.07)),
    };
  };
  try {
    const legacyColor = Number(localStorage.getItem('cotton-theme-color'));
    const fallbackHex = presetHexes.includes(presetHexes[legacyColor - 1]) ? presetHexes[legacyColor - 1] : defaultHex;
    const colorHex = normalizeHex(localStorage.getItem('cotton-theme-color-hex')) || fallbackHex;
    const storedMode = localStorage.getItem('cotton-theme-mode');
    const mode = storedMode === 'light' || storedMode === 'dark' || storedMode === 'auto' ? storedMode : 'auto';
    const dark = mode === 'dark' || (mode === 'auto' && window.matchMedia('(prefers-color-scheme: dark)').matches);
    const root = document.documentElement;
    root.classList.remove('theme-1', 'theme-1-dark', 'theme-2', 'theme-2-dark', 'theme-3', 'theme-3-dark', 'theme-4', 'theme-4-dark');
    root.classList.add(dark ? 'theme-1-dark' : 'theme-1');
    Object.entries(variables(colorHex, dark)).forEach(([name, value]) => root.style.setProperty(name, value));
  } catch {}
})();
`

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      suppressHydrationWarning
      lang="zh-CN"
      className={`antialiased ${noto_sans.variable} ${noto_sans_sc.variable} ${noto_sans_mono.variable}`}
    >
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeBootstrapScript }} />
      </head>
      <ThemeWrapper>
        <HeaderWithWrapper />
        <MobileNav />
        <MainWrapper>{children}</MainWrapper>
        <Footer />
      </ThemeWrapper>
    </html>
  )
}
