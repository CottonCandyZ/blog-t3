import "~/styles/globals.scss";
import "~/styles/markdown.scss";
import Footer from "~/components/footer";
import MobileNav from "~/components/mobile-nav";
import ThemeWrapper from "~/components/theme-wrapper";
import HeaderWithWrapper from "~/components/header-with-wapper";
import MainWrapper from "~/components/main-wrapper";
import { cookies } from "next/headers";
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const theme = cookies().get("theme")?.value;
  return (
    <html lang="en" className={`scroll-smooth antialiased`}>
      <ThemeWrapper themeCookie={theme}>
        <HeaderWithWrapper />
        <MobileNav />
        <MainWrapper>{children}</MainWrapper>
        <Footer />
      </ThemeWrapper>
    </html>
  );
}
