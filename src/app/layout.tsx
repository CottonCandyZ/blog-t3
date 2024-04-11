import "~/styles/globals.scss";
import "~/styles/markdown.scss";
import Footer from "~/components/footer";
import MobileNav from "~/components/mobile-nav";
import ThemeWrapper from "~/components/theme-wrapper";
import HeaderWithWrapper from "~/components/header-with-wrapper";
import MainWrapper from "~/components/main-wrapper";
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`scroll-smooth antialiased`}>
      <ThemeWrapper>
        <HeaderWithWrapper />
        <MobileNav />
        <MainWrapper>{children}</MainWrapper>
        <Footer />
      </ThemeWrapper>
    </html>
  );
}
