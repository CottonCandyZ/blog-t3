import "~/styles/globals.scss";
import Footer from "~/components/footer";
import MobileNav from "~/components/mobile-nav";
import ThemeWrapper from "~/components/theme-wrapper";
import HeaderWithWrapper from "~/components/header-with-wrapper";
import MainWrapper from "~/components/main-wrapper";
import { cookies } from "next/headers";
import { Noto_Sans, Noto_Sans_Mono, Noto_Sans_SC } from "next/font/google";
const noto_sans = Noto_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-noto-sans",
});
const noto_sans_sc = Noto_Sans_SC({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-noto-sans-sc",
});
const noto_sans_mono = Noto_Sans_Mono({
  subsets: ["latin"],
  weight: ["500", "600"],
  variable: "--font-noto-sans-mono",
});
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const theme = cookies().get("theme")?.value;
  return (
    <html
      lang="en"
      className={`antialiased ${noto_sans.variable} ${noto_sans_sc.variable} ${noto_sans_mono.variable}`}
    >
      <ThemeWrapper theme={theme}>
        <HeaderWithWrapper />
        <MobileNav />
        <MainWrapper>{children}</MainWrapper>
        <Footer />
      </ThemeWrapper>
    </html>
  );
}
