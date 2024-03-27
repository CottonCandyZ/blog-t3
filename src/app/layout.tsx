import "~/styles/globals.scss";
import "~/styles/markdown.scss";
import Footer from "~/components/footer";
import MobileNav from "~/components/mobile-nav";
import RootProvider from "~/components/root-provider";
import HeaderWithWrapper from "~/components/header-with-wapper";
import MainWrapper from "~/components/main-wrapper";
export const dynamic = 'force-dynamic';
const themeNumber = Math.floor(Math.random() * 8) + 1;
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`scroll-smooth theme-${themeNumber}`}>
      <RootProvider>
        <HeaderWithWrapper />
        <MobileNav />
        <MainWrapper>{children}</MainWrapper>
        <Footer />
      </RootProvider>
    </html>
  );
}
